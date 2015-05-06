/**
 * Created by yangyuelong on 15/5/5.
 */
(function (_) {
    var templateCache = {};
    if (!_) return false;
    _.mixin({
        regTemplate: function (templateName, templateString, settings) {
            templateName = templateName.replace(/\.tpl$/i, '');
            settings = settings || {};
            settings.variable = settings.variable || 'data';
            var compiledFunc = templateCache[templateName] = _.template(templateString, settings);
            compiledFunc.orgString = templateString;
            return this;
        },
        templateCache: function (templateName, compiledFunc) {
            if (compiledFunc && templateName) {
                return (templateCache[templateName] = compiledFunc);
            } else {
                return templateName && templateCache[templateName] || templateCache;
            }
        },
        templateList: function (templateName, data) {
            var args = [].slice.call(arguments, 1);
            var compiledFunc = templateCache[templateName];
            return compiledFunc && compiledFunc.apply(_, args) || '';
        },
        removeTemplate: function (templateName) {
            if (!templateName) {
                templateCache = {};
            } else {
                delete templateCache[templateName];
            }
            return this;
        }
    });
})(window._);