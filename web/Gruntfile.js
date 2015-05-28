var config = {};
process.argv.forEach(function (val, index) {
    if (/^-(\w+):?(.*)?/.test(val)) {
        config[RegExp.$1] = RegExp.$2 === '' ? true : RegExp.$2;
    }
});

(function () {
    var sites = (config.site || 'hj').split(',');
    var SITE_PORT = parseInt(config.port || 9080, 10); // 端口起点
    var sitesPorts = {};
    var watchList = {
        _base: {
            files: ['Gruntfile.js', 'build.xml', 'asset/**'],
            tasks: ['build'],
            options: { spawn: false }
        }
    };
    sites.forEach(function (n, i) {
        watchList[n] = {
            files: [n + '/*', n + '/src/**', n + '/asset/**'],
            tasks: ['build:' + n],
            options: { spawn: false }
        };
        sitesPorts[n] = SITE_PORT + i;
    });
    config.sites = sites;
    config.sitesPorts = sitesPorts;
    config.watchList = watchList;
})();

module.exports = function (grunt) {
    var sites = config.sites;
    var sitesPorts = config.sitesPorts;
    var siteDir = 'output';
    var util = require('util');
    var fm = util.format;
    var fs = require('fs');
    var path = require('path');
    var express = require('express');

    var deleteFolderRecursive = function (path) {
        var files = [];
        var self = arguments.callee;
        if (fs.existsSync(path)) {
            files = fs.readdirSync(path);
            files.forEach(function (file, index) {
                var curPath = path + "/" + file;
                if (fs.statSync(curPath).isDirectory()) { // recurse
                    self(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    };

    var isPlainObject = function (t) {
        return Object.prototype.toString.call(t) === '[object Object]';
    };
    var extendObject = function () {
        var o = arguments[0];
        [].slice.call(arguments, 1).forEach(function (n) {
            for (var i in n) {
                if (isPlainObject(n[i])) {
                    o[i] = {};
                    extendObject(o[i], n[i]);
                } else {
                    o[i] = n[i];
                }
            }
        });
        return o;
    };

    // Project configuration
    grunt.initConfig({
        watch: config.watchList
    });

    grunt.registerTask('build', 'build ant', function (site) {
        var changedSites = sites;
        if (site) {
            changedSites = [site];
        }
        var done = this.async();
        var len = changedSites.length;
        var method = config.local ? 'local' : 'debug';
        if (config.localRoot) {
            method += ' -Droot=' + config.localRoot;
        }
        console.log("[Build Start] %s total:%d  for %s", changedSites.join(','), len, method);

        changedSites.forEach(function (n) {
            var exec = require('child_process').exec;
            var pass = true;
            var cmd = fm('ant %s -Dsite=%s -DdebugLog=true -Dminimize=false -Dpackage=rd-', method, n);
            console.log(cmd);
            var ant = exec(cmd, function (error, stdout, stderr) {
                if (stderr) {
                    pass = false;
                    console.log('stderr: ' + stderr);
                    console.log('stdout: ' + stdout);
                }
                if (error !== null) {
                    pass = false;
                    console.log('exec error: ' + error);
                }
            });
            ant.on("exit", function () {
                console.log("[Build %s] %s", pass ? 'Success' : 'Fail', n);
                if (--len < 1) {
                    done(true);
                }
            });
        });
    });

    grunt.registerTask('server', 'Starting web servers', function (live) {
        var done = this.async();
        // 独立运行server task进程不退出
        // grunt server:on
        // single server
        sites.forEach(function (site, nowIndex) {
            var server = {
                port: sitesPorts[site],
                root: path.join(__dirname, siteDir, site),
                dataRoot: path.join(__dirname, site, 'data')
            };
            var app = express();
            var jsSDKCode = '';
            app.use(require('body-parser')({
                limit: 20000000  //20m
            }));
            app.all('/data*', function (req, res, next) {
                res.sendfile(server.dataRoot + req.params[0]);
            });
            app.all('/admin.asp', function (req, res, next) {
                console.log('here', req.query.u, server.dataRoot + '/' + req.query.u + '.js');
                res.sendfile(server.dataRoot + '/' + req.query.u + '.js');
            });
            app.post('/upload2', function (req, res, next) {
                var filename = req.body.filename;
                var content = req.body.content;
                var filePath = path.join(server.dataRoot, 'doc', filename);
                console.log('upload2 doc', filePath);
                if (content) {
                    fs.writeFileSync(filePath, content, { encoding: 'utf8' });
                    res.send('success create ' + filePath);
                } else {
                    res.send('no content');
                }
            });
            app.get('/doc/*', function (req, res, next) {
                var filePath = path.join(server.dataRoot, 'doc', req.params[0]);
                console.log('load doc', filePath);
                if (fs.existsSync(filePath)) {
                    res.sendfile(filePath);
                } else {
                    res.send(404, 'Sorry, we cannot find that!');
                }
            });
            app.get('/js/_jssdk.js', function (req, res) {
                res.setHeader('Content-Type', 'application/javascript');
                if (jsSDKCode) {
                    res.end(jsSDKCode);
                    return true;
                }
                var http = require('http');
                var jsCode = [];
                http.get('http://api.jesgoo.com/js/_jssdk.js', function (r) {
                    r.on('data', function (chunk) {
                        jsCode.push(chunk);
                    });
                    r.on('end', function () {
                        jsSDKCode = jsCode.join('');
                        jsSDKCode = jsSDKCode.replace('jesgoo.com/js/_jssdk.js', 'localhost:' + server.port + '/js/_jssdk.js');
                        res.end(jsSDKCode);
                    });
                });
            });
            app.use(express.static(server.root));

            var lists = [
                {
                    action: '/group/add'
                },
                {
                    action: '/user/uploadFile.json',
                    field: {
                        banners: {
                            file: function (uploadFiles) {
                                var l = [];
                                uploadFiles.forEach(function (n, i) {
                                    if (Math.round(Math.random() * 6)) {
                                        l.push({
                                            name: n.oldName,
                                            path: n.name,
                                            width: 270 + Math.round(
                                                    Math.random() * 600),
                                            height: 40 + Math.round(
                                                    Math.random() * 270)
                                        });
                                    } else {
                                        l.push({
                                            name: n.oldName,
                                            path: n.name,
                                            error: '图片尺寸不对'
                                        });
                                    }
                                });
                                return l;
                            }
                        }
                    }
                }
            ];

            var middleWare = require('connect-multiparty')();
            lists.forEach(function (list) {
                app.post(list.action, middleWare, function (req, res) {
                    var newPath = path.join(server.root, "/asset/");
                    var newName = new Date().getTime() + '-';
                    var fieldCount = 0;
                    var model = {};
                    // 获取文件清单
                    console.log('uploadFile', util.inspect(req.files, 5));
                    for (var i in req.files) {
                        var files = [].concat(req.files[i]);
                        var fileNames = [];
                        files.forEach(function (n) {
                            if (n) {
                                var fName = newName + n.name.replace(/\|/g, '');
                                var data = fs.readFileSync(n.path);
                                fileNames.push({
                                    name: "asset/" + fName,
                                    oldName: n.name
                                });
                                fs.writeFileSync(path.join(newPath, fName), data);
                            }
                        });
                        model[i] = extendObject({},
                                list.field && list.field[i] || {
                                /*locations: {
                                 message: '部分商户地址不完整；',
                                 locationList: arrLoc
                                 },*/
                                isFc: true,
                                claimUrl: "http://www.baidu.com",
                                packageName: "p.a.c.k.a.g.e",
                                versionId: "4",
                                smallLogoUrl: "asset/img/baidu.gif",
                                appSize: "36970169",
                                supportOs: "IOS ANDROID",
                                versionName: "4.0",
                                ipaInstallUrl: "http://ipaUrl.com"
                                //sessionTimeout: true
                                //formError: { a: 'a', b: 'b' },
                                //showDetail: "http://hi.baidu.com/mobads/item/fbea921a8c202026b831802d"
                            }
                        );
                        if (model[i].file) {
                            model[i].file = model[i].file(fileNames);
                        } else {
                            model[i].file = [];
                            fileNames.forEach(function (n) {
                                model[i].file.push(n.name);
                            });
                            model[i].file = model[i].file.join('|');
                        }
                        fieldCount += 1;
                    }
                    // 仅有一个文件域时就取缔分域信息
                    if (fieldCount <= 1) {
                        for (var i in model) {
                            model = model[i];
                        }
                    }
                    res.send(JSON.stringify({
                        success: true,
                        model: model
                    }));
                });
            });

            var dlList = [
                { action: '/user/report/listLogExport.json' },
                { action: '/admin/listLogExport.json' },
                { action: '/user/report/getLbsListExport.json' },
                { action: '/user/report/getReportListExport.json' },
                { action: '/user/getReportListExport.json' },
                { action: '/user/report/getReportListExportEMS.json' },
                { action: '/user/report/customReport.json' },
                { action: '/admin/getExportExpense.json' },
                { action: '/admin/exportExpense.json' },
                { action: '/admin/exportKeyword.json' },
                { action: '/user/report/appDataReportExport.json' }
            ];
            var DOWNLOAD_PATH = __dirname + '/asset/tmp/download-debug.csv';
            dlList.forEach(function (route) {
                app.get(route.action, function (req, res, next) {
                    res.download(DOWNLOAD_PATH);
                });
            });
            app.post(/index\/media\/siteTemplate.json/i, function (req, res, next) {
                var result = {
                    success: true,
                    entities: [
                        req.body
                    ]
                };
                req.body.id = req.body.id || ('t' + Math.round(Math.random() * 10000));
                res.type('json');
                if (req.body.json) {
                    //console.log('result.js ', util.inspect(req.body, { depth:null }));
                    var generator = require('child_process').exec(
                        'export SOURCE=1 && echo "' + JSON.stringify(req.body).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\\n/g, '\\\\n') + '" | node ./jsGenerator/bin/generator.js > ./output/union/result.js',
                        function (error, stdout, stderr) {
                            console.log('stdout: ' + stdout);
                            console.log('stderr: ' + stderr);
                            if (error !== null) {
                                console.log('exec error: ' + error);
                            }
                            console.log('jsGenerator one');
                        }
                    );
                    req.body.version = 'result';
                }
                res.send(result);
            });
            app.all(/\.json/i, function (req, res, next) {
                var path = server.dataRoot + req.url.replace(/\.json.*/, '.js');
                try {
                    // fixme 最好的办法就是清除require缓存，如delete require.cache[path]
                    // 但貌似不好使，具体原因未查，有空优化下
                    // 目前的替代方案是读取文件，截取response部分并清除注释
                    var data = fs.readFileSync(path, { encoding: 'utf-8' });
                    data = data.toString();
                    data = eval('(function(){'+data+';return exports.response;})()');
                    res.type('json');
                    res.send(data);
                } catch (e) {
                    res.sendfile(path);
                }
            });
            app.listen(server.port, function () {
                console.log('server [%s], [http://127.0.0.1:%s], root [%s]',
                    site, server.port, server.root);
                if (nowIndex === sites.length - 1) {
                    done(true);
                }
            });
        });
    });

    /**
     * er-sync task
     *
     * Usage:
     * $ grunt sync:gen
     */
    grunt.registerTask('sync', 'Starting er-sync', function () {
        var Sync = require('./deploy/er-sync.js').Sync;
        sites.forEach(function (n) {
            new Sync(n, __dirname);
        });
        deleteFolderRecursive(path.join(__dirname, siteDir));
    });

    /**
     * 默认启动时的执行顺序
     *
     * $ grunt
     */
    grunt.registerTask("default", ["sync", "build", "server", "watch"]);
    grunt.loadNpmTasks("grunt-contrib-watch");
};