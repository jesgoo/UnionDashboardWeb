(function (){
    var root = this;
    var generator = function (adTypeName, contentData, layoutData, scaleData) {

        var templateResult = _.templateList(adTypeName, {
            content: contentData,
            layout: layoutData,
            scale: scaleData || {}
        });

        _.regTemplate('custom_tpl_source', templateResult.replace(/<\\\\%/g, '<%').replace(/%\\\\>/g, '%>'), {

        });
        var customJS = _.templateList('custom_js', {
            source: _.templateCache('custom_tpl_source').source
        });
        return customJS;
    };
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = generator;
            _ = require('underscore');
        }
        exports.generator = generator;
    } else {
        root.generator = generator;
    }
}.call(this));