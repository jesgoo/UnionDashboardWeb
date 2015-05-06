var _ = require('underscore');
var UglifyJS = require('uglify-js2');
var PropertyConfig = require('../js/propertyConfig');
var properties = require('../js/properties');
var propertyList = require('../js/propertyList');
var layoutList = require('../js/layoutList');
var generator = require('../js/generator');
_.mixin(require('./template_extend')(_));

process.stdin.setEncoding('utf8');

var originalData = [];
process.stdin.on('readable', function() {
    var chunk = process.stdin.read();
    if (chunk !== null) {
        originalData.push(chunk);
    }
});

var maps = {
    "adType": {
        "text" : 1,
        "image" : 2,
        "html" : 3,
        "video" : 4,
        "text_icon" : 5
    },
    "adTypeMap": {
        "1" : "text",
        "2" : "image",
        "3" : "html",
        "4" : "video",
        "5" : "text_icon"
    }
};

process.stdin.on('end', function() {
    var data = JSON.parse(originalData.join(''));
    var adType = data.adType;
    adType === 1 && (adType = 5);
    var adTypeName = maps.adTypeMap[adType];

    var templateData = data.data || {};
    var scale = templateData.scale || {};
    var property = propertyList[adTypeName](properties);
    var layoutData = layoutList[adTypeName](scale);
    var contentProperty = new PropertyConfig(property, templateData.content);
    var contentData = contentProperty.getData();

    var customJS = generator(adTypeName, contentData, layoutData, templateData.scale);
    if (!process.env.SOURCE) {
        customJS = UglifyJS.minify(customJS, {
            fromString: true
        }).code;
    }
    process.stdout.write('// jesgoo\n;');
    process.stdout.write(customJS);
    process.stdout.write('\n;// jesgoo\n');
    process.exit();
});