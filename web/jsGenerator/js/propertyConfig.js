(function (_undefined) {// Establish the root object, `window` in the browser, or `exports` on the server.
    var root = this;

    function PropertyConfig(config, initData) {
        this.fields = config;
        this.data = {};
        this.initData = initData;
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

    function isEmptyObject (obj) {
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                return false;
            }
        }
        return true;
    }
    function extendObject(a, b) {
        for (var i in b) {
            if (b.hasOwnProperty(i)) {
                a[i] = b[i];
            }
        }
    }
    PropertyConfig.prototype.init = function () {
        this.setJSON(this.initData);
    };

    PropertyConfig.prototype.setJSON = function (initData) {
        var me = this;
        initData = initData || {};
        function recursionValue(data, properties) {
            properties.forEach(function (orgData) {
                if (orgData.children) {
                    recursionValue(data[orgData.dataField] || {}, orgData.children);
                    return true;
                } else {
                    orgData.value = data[orgData.dataField] || orgData.value;
                    if (orgData.value === undefined) {
                        orgData.value = '';
                    }
                }
            });
        }
        for (var name in me.fields) {
            var field = me.fields[name];
            recursionValue(initData[name] || {}, field.properties);
            me.getValue(name);
        }
    };
    PropertyConfig.prototype.toJSON = function () {
        var me = this;
        var result = {};

        function recursionValue(object, properties) {
            properties.forEach(function (orgData) {
                if (orgData.children) {
                    object[orgData.dataField] = {};
                    recursionValue(object[orgData.dataField], orgData.children);
                    return true;
                } else {
                    object[orgData.dataField] = orgData.value;
                }
            });
        }
        for (var name in me.fields) {
            var field = me.fields[name];
            result[name] = {};
            recursionValue(result[name], field.properties);
        }
        return result;
    };
    PropertyConfig.prototype.getData = function () {
        var me = this;
        var result = {
        };
        var animate = [];
        for (var name in me.fields) {
            var field = me.fields[name];
            var value = field.value;
            if (!value) {
                value = field.value = me.getValue(name);
            }
            value.css.length && (result[field.name] = value.css.join('\n'));
            value.animate.length && animate.push(value.animate.join('\n'));
            isEmptyObject(value.property) || extendObject(result, value.property);
        }
        result.animation = animate.join('\n');
        return result;
    };
    PropertyConfig.prototype.getValue = function (name) {
        var me = this;
        var result = {
            property: {},
            animate: [],
            css: []
        };

        function recursionValue(properties) {
            properties.forEach(function (orgData) {
                var value;
                if (orgData.children && orgData.children.length) {
                    recursionValue(orgData.children);
                }
                if (orgData.valueFactory) {
                    value = orgData.subValue = orgData.valueFactory(orgData, orgData);
                } else {
                    value = orgData.subValue !== undefined ? orgData.subValue : orgData.value;
                }
                if (orgData.cssField) {
                    value && result.css.push(orgData.cssField + ':' + value + ';');
                } else if (orgData.animationField) {
                    if (value.length) {
                        var animationName = orgData.animationField + '_' + name;
                        value.unshift(animationName);
                        var animationString = value.pop();
                        result.animate.push('@-webkit-keyframes ' + animationName + ' {' + animationString + '}');
                        result.css.push('-webkit-animation:' + value.join(' ') + ';');
                    }
                } else if (orgData.propertyField) {
                    value !== _undefined && (result.property[orgData.propertyField] = value);
                }
            });
        }
        recursionValue(me.fields[name].properties);
        me.fields[name].value = result;
        return result;
    };
}.call(this));