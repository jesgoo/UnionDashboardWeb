var path = require('path');
var gulp = require('gulp');
var Q = require('q');
var through = require('through2');
var gulpConcat = require('gulp-concat');
var gulpRename = require('gulp-rename');
var gulpUglify = require('gulp-uglify');
var gulpMinifyCss = require('gulp-minify-css');
var gulpClean = require('gulp-clean');
var _ = require('underscore');
var commonConfig = require('./bin/config');
var config = {};
process.argv.forEach(
    function (val) {
        if (/^(\+|\-)(\w+):?(.*)?/.test(val)) {
            config[RegExp.$2] = RegExp.$3 === '' ? RegExp.$1 === '+' : RegExp.$3;
        }
    }
);

gulp.task('tpl-compile', function () {
    var tplConfig = {
        src: config.tpl || [
             './tpl/*.tpl'
        ],
        extname: '.compile',
        destination: './tpl_compile'
    };
    return gulp.src(
        tplConfig.src
    ).pipe(through.obj(function (file, encoding, cb) {
            try {
                file.contents = new Buffer(
                    _.template(file.contents.toString(), {
                        variable: commonConfig.templateVariable
                    }).source
                );
            } catch(e) {
                console.log('compile failed');
                file.contents = new Buffer(
                    e.source
                );
            }
            cb(null, file);
        })
    ).pipe(
        gulpRename(
            {
                extname: tplConfig.extname
            }
        )
    ).pipe(
        gulp.dest(tplConfig.destination)
    )
});

gulp.task('tpl-node', ['tpl-compile'], function () {
    var tplConfig = {
        src: config.tplComplie || [
            './tpl_compile/*.compile'
        ],
        extname: '.js',
        destination: './tpl_compile'
    };
    var tpl = _.template(
        'module.exports = function (_) {'
        + 'return <%=source%>;'
        + '};'
    );
    return gulp.src(
        tplConfig.src
    ).pipe(through.obj(function (file, encoding, cb) {
            file.contents = new Buffer(
                tpl({
                    source: file.contents.toString()
                })
            );
            cb(null, file);
        })
    ).pipe(
        gulpRename(
            {
                extname: tplConfig.extname
            }
        )
    ).pipe(
        gulp.dest(tplConfig.destination)
    )
});

gulp.task('tpl-web', ['tpl-compile'], function () {
    var tplConfig = {
        src: [
            './tpl_compile/*.compile'
        ],
        filename: 'tpl.compiled.js',
        destination: './js'
    };
    var tpl = _.template(
        '_(\'<%=filename%>\').templateCache(<%=source%>);'
    );
    return gulp.src(
        tplConfig.src
    ).pipe(through.obj(function (file, encoding, cb) {
            var filename = path.basename(file.path, '.compile');
            file.contents = new Buffer(
                tpl({
                    source: file.contents.toString(),
                    filename: filename
                })
            );
            cb(null, file);
        })
    ).pipe(
        gulpConcat(tplConfig.filename)
    ).pipe(
        gulp.dest(tplConfig.destination)
    )
});

var releaseSource = '/Users/yangyuelong/workspace/jesgoo_union/web/union/src/index/module';
gulp.task('clean', function () {
    return gulp.src(releaseSource + '/template_source.js', { read: false })
        .pipe(gulpClean({ force: true }));
});

gulp.task('release', ['clean', 'tpl-node', 'tpl-web', 'test'], function () {
    var tplConfig = {
        src: [
            './js/*.js'
        ],
        filename: 'template_source.js',
        destination: releaseSource
    };
    var stream = gulp.src(
        tplConfig.src
    ).pipe(
        gulpConcat(tplConfig.filename)
    ).pipe(
        gulp.dest(tplConfig.destination)
    );
    return stream;
});

gulp.task('clean-output', function () {
    return gulp.src('./output', { read: false })
        .pipe(
            gulpClean({ force: true })
    );
});

var testSource = '/Users/yangyuelong/workspace/jesgoo_union/web/union/src/test/module';
gulp.task('ck', ['tpl-node', 'tpl-web'], function () {
    var tplConfig = {
        src: [
            './tpl/resize-2.0.tpl',
            './tpl/rsa.tpl',
            './tpl/rsa_key.tpl',
            './tpl/rsa_monitor.tpl'
        ],
        filename: 'jq_ck.js',
        destination: testSource
    };
    return gulp.src(
        tplConfig.src
    ).pipe(
        gulpConcat(tplConfig.filename)
    ).pipe(
        gulp.dest(tplConfig.destination)
    ).pipe(
        gulpUglify()
    ).pipe(
        gulpRename(
            {
                basename: 'resize-2.0-ck.min'
            }
        )
    ).pipe(
        gulp.dest('/Users/yangyuelong/workspace/jesgoo_sdk/jssdk/banner/javascript')
    )
});
gulp.task('test', ['clean-output'] ,function () {
    var tplConfig = {
        src: [
            './json/*.json'
        ]
    };
    var stream = gulp.src(
        tplConfig.src
    ).pipe(
        through.obj(function (file, encode, cb) {
            var jsonString = file.contents.toString().replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\\n/g, '\\\\n') ;
            var generator = require('child_process').exec(
                'echo "' + jsonString + '" | node ./bin/generator.js'
            );
            var content = [];
            var errorInfo = [];
            generator.stderr.on('data', function (data) {
                errorInfo.push(data);
            });

            generator.stdout.on('data', function (data) {
                content.push(data);
            });
            generator.on('close', function (code) {
                if (errorInfo.length) {
                    console.log(code, file.path, ' jsGenerator error');
                    cb(new Error(errorInfo.join('\n')), null);
                } else {
                    file.contents = new Buffer(content.join(''));
                    console.log('jsGenerator success ', file.path);
                    cb(null, file);
                }
            });
        })
    ).pipe(
        gulpRename({
            extname:'.js'
        })
    ).pipe(
        gulp.dest('./output/')
    );
    return stream;
});
