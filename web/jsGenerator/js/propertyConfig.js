(function () {// Establish the root object, `window` in the browser, or `exports` on the server.
    var root = this;

    function PropertyConfig(config, initData) {
        this.fields = config;
        this.data = {};
        this.setJSON(initData);
        this.init();
    }

    // Export the Underscore object for **Node.js**, with
    // backwards-compatibility for the old `require()` API. If we're in
    // the browser, add `_` as a global object.
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = PropertyConfig;
        }
        exports.PropertyConfig = PropertyConfig;
    } else {
        root.PropertyConfig = PropertyConfig;
    }

    PropertyConfig.prototype.init = function () {};
    PropertyConfig.prototype.setJSON = function (initData) {
        var me = this;
        initData = initData || {};
        function recursionValue(data, properties) {
            properties.forEach(function (orgData) {
                if (orgData.children) {
                    recursionValue(data[orgData.dataField] || {}, orgData.children);
                    return true;
                } else {
                    orgData.value = data[orgData.dataField] || orgData.value || '';
                }
            });
        }
        for (var name in me.fields) {
            var field = me.fields[name];
            recursionValue(initData[name] || {}, field.properties);
        }
    };
    PropertyConfig.prototype.toJSON = function () {
        var me = this;
        var result = {};

        function recursionValue(object, records, properties) {
            records.forEach(function (record, index) {
                var orgData = properties[index], value;
                if (orgData.children) {
                    object[orgData.dataField] = {};
                    recursionValue(object[orgData.dataField], record.records, orgData.children);
                    return true;
                } else {
                    object[orgData.dataField] = record.value;
                }
            });
        }
        for (var name in me.fields) {
            var field = me.fields[name];
            result[name] = {};
            recursionValue(result[name], me.data[name].records, field.properties);
        }
        return result;
    };
    PropertyConfig.prototype.getData = function () {
        var me = this;
        var result = {};
        var animate = [];
        for (var name in me.fields) {
            var field = me.fields[name];
            var value = field.value;
            if (!value) {
                value = field.value = me.getValue(name);
            }
            value.css.length && (result[field.name] = value.css.join('\n'));
            value.animate.length && animate.push(value.animate.join('\n'));
        }
        result.animation = animate.join('\n');
        return result;
    };
    PropertyConfig.prototype.getValue = function (name) {
        var me = this;
        var result = {
            animate: [],
            css: []
        };

        function recursionValue(properties) {
            properties.forEach(function (orgData) {
                var value;
                if (orgData.valueFactory) {
                    value = orgData.valueFactory(orgData, orgData);
                } else if (orgData.children) {
                    recursionValue(orgData.children);
                    return true;
                } else {
                    value = orgData.value
                }
                if (orgData.cssField) {
                    value && result.css.push(orgData.cssField + ':' + value + ';');
                } else if (orgData.animationField && value.length) {
                    var animationName = '\'' + orgData.animationField + '_' + name + '\'';
                    value.unshift(animationName);
                    var animationString = value.pop();
                    result.animate.push('@-webkit-keyframes ' + animationName + ' {' + animationString + '}');
                    result.css.push('-webkit-animation:' + value.join(' ') + ';');
                }
            });
        }
        recursionValue(me.fields[name].properties);
        me.fields[name].value = result;
        return result;
    };
}.call(this));