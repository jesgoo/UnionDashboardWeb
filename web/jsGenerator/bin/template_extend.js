var templateCache = {};
var path = require('path');
var fs = require('fs');
var commonConfig = require('./config');
module.exports = function (_) {
    var loadTemplate = function (templateName) {
        try {
            templateName = /\.\w+$/i.test(templateName) ? templateName : (templateName + '.tpl');

            //console.info('load tpl ', path.join(commonConfig.templateSourcePath, templateName));
            var compiledFunc = _.template(
                fs.readFileSync(
                    path.join(commonConfig.templateSourcePath, templateName), {encoding: 'utf-8'}
                ),
                {
                    variable: commonConfig.templateVariable
                }
            );
        } catch (e) {
            throw 'Has no template ' + templateName + e;
        }
        return compiledFunc;
    };
    var loadTemplateCompileFunc = function (templateName) {
        try {
            //console.info('load compiled tpl js', path.join(commonConfig.templatePath, templateName));
            var compiledFunc = require(path.join(commonConfig.templatePath, templateName))(_);
        } catch (e) {
            //console.warn('compiled js ' + templateName + ' has missed.');
            compiledFunc = loadTemplate(templateName);
        }
        return compiledFunc;
    };
    return {
        regTemplate: function (templateName, templateString, settings) {
            templateName = templateName.replace(/\.tpl$/i, '');
            settings = settings || {};
            settings.variable = settings.variable || commonConfig.templateVariable;
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
            var compiledFunc;
            var args = [].slice.call(arguments, 1);
            if (commonConfig.loadTemplateEnforce) {
                compiledFunc = loadTemplate(templateName);
            } else {
                compiledFunc = loadTemplateCompileFunc(templateName);
            }
            templateCache[templateName] = compiledFunc;
            return compiledFunc.apply(_, args);
        },
        removeTemplate: function (templateName) {
            if (!templateName) {
                templateCache = {};
            } else {
                delete templateCache[templateName];
            }
            return this;
        }
    }
};