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
(function (){
    var root = this;
    var baseFontSize = 10;
    var baseWidth = 320 * 12 / baseFontSize;
    var layoutList = {
        'text_icon': function (scaleOption) {
            var from = scaleOption.from;
            var to = scaleOption.to;
            var width = baseWidth;
            var areaWidth = [
                (from / width * 100),
                ((to - from) / width) * 100,
                (1 - to / width) * 100
            ];
            var iconAreaIndex = scaleOption.layout.iconArea;
            var textAreaIndex = scaleOption.layout.textArea;
            if (areaWidth[iconAreaIndex] < 1) {
                areaWidth[textAreaIndex] += areaWidth[iconAreaIndex];
            }
            var area = [];
            for (var i = 0; i < areaWidth.length; i += 1){
                var n = areaWidth[i];
                area[i]  = n <= 0.3 ? 'display: none;' : 'width: ' + n + '%;'
            }
            area[0] += 'float:left;';
            area[2] += 'float:right;';
            var data = {};
            for (var name in scaleOption.layout) {
                data[name] = area[scaleOption.layout[name]];
            }
            return data;
        },
        'image': function (scaleOption) {
            var from = scaleOption.from;
            var to = scaleOption.to;
            var width = baseWidth;
            var data = {
                'btnArea': 'left:' + (from / width * 100) + '%; width: ' + ((to - from) / width) * 100 + '%;'
            };
            if (to - from < 1) {
                data.btnArea = 'display: none;'
            }
            return data;
        }
    };
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = layoutList;
        }
        exports.layoutList = layoutList;
    } else {
        root.layoutList = layoutList;
    }
}.call(this));
(function (){
    var root = this;

    var propertyConfig = {
        enable: {
            "property": "是否可用",
            "propertyField": "enable",
            "value": "true",
            "type": "bool"
        },
        content: {
            "property": "按钮文本",
            "dataField": "content",
            "cssField": "content",
            "valueFactory": function (record, item) {
                return '\'' + (record.value || item.value) + '\'';
            },
            "value": "查看",
            "type": "string"
        },
        textAlign: {
            "property": "对齐方式",
            "dataField": "text_align",
            "cssField": "text-align",
            "valueFactory": function (record, item) {
                var value = (record.value || item.value).toLowerCase();
                if (value !== 'center') {
                    return value;
                }
            },
            "value": "Center",
            "type": "align"
        },
        font: {
            "property": "文本设定",
            "value": "",
            "dataField": "font",
            "type": "string",
            "children": [
                {
                    "property": "字体大小(px)",
                    "value": "12",
                    "dataField": "fontSize",
                    "cssField": "font-size",
                    "valueFactory": function (record, item) {
                        var size = +(record.value || item.value);
                        return (size * 10) + '%';
                    },
                    "validator": function (item, value) {
                        value = +value;
                        if (value < 10) {
                            return item.property + '不能少于10px';
                        }
                    },
                    "type": "number"
                },
                {
                    "property": "行高(%)",
                    "value": "110",
                    "dataField": "lineHeight",
                    "cssField": "line-height",
                    "valueFactory": function (record, item) {
                        var value = +(record.value || item.value);
                        return value / 100;
                    },
                    "validator": function (item, value) {
                        value = +value;
                        if (value < 0) {
                            return item.property + '不能少小于0';
                        }
                    },
                    "type": "number"
                },
                {
                    "property": "字体样式",
                    "value": "Microsoft Yahei",
                    "dataField": "fontFamily",
                    "cssField": "font-family",
                    "valueFactory": function (record, item) {
                        return record.value || item.value;
                    },
                    "type": "string"
                },
                {
                    "property": "文本颜色",
                    "cssField": "color",
                    "dataField": "color",
                    "valueFactory": function (record, item) {
                        return (record.value || item.value);
                    },
                    "value": "#000000",
                    "type": "color"
                }
            ]
        },
        backgroundColor: {
            "property": "背景颜色",
            "cssField": "background-color",
            "dataField": "backgroundColor",
            "value": "",
            "valueFactory": function (record, item) {
                var color = record.children[0].value;
                var opacity = +record.children[1].value;
                if (opacity > 0 && opacity < 100) {
                    color = parseInt(color.slice(1), 16);
                    return 'rgba(' + (color >> 16) + ',' + (color >> 8 & 255) + ',' + (color & 255) + ','
                           + (opacity / 100) + ')';
                } else if (opacity >= 100) {
                    return color || item.children[0].value;
                } else {
                    return '';
                }
            },
            "type": "color",
            "children": [
                {
                    "property": "颜色（RGB）",
                    "dataField": "color",
                    "value": "#60cb1b",
                    "type": "color"
                },
                {
                    "property": "透明度（%）",
                    "dataField": "opacity",
                    "value": "0",
                    "type": "number"
                }
            ]
        },
        transform: {
            "property": "位移与变换",
            "cssField": "-webkit-transform",
            "dataField": "transform",
            "value": "",
            "valueFactory": function (record, item) {
                var values = record.children.map(function (n) {
                    return +n.value;
                });
                var result = [];
                if (values[0] || values[1]) {
                    if (values[0] && values[1]) {
                        result.push('translate(' + values.slice(0, 2).map(getEmValue).join(',') + ')');
                    } else {
                        values[0] && result.push('translateX(' + getEmValue(values[0]) + ')');
                        values[1] && result.push('translateY(' + getEmValue(values[1]) + ')');
                    }
                }
                if (values[2] || values[3] || values[4]) {
                    if (values[2] && values[3] && values[4]) {
                        result.push('translate(' + values.slice(2, 5).map(function (n) {
                                return n + 'deg'
                            }).join(',') + ')');
                    } else {
                        values[2] && result.push('rotateX(' + values[2] + 'deg)');
                        values[3] && result.push('rotateY(' + values[3] + 'deg)');
                        values[4] && result.push('rotateZ(' + values[4] + 'deg)');
                    }
                }
                values[5] && result.push('skew(' + values[5] + 'deg)');
                values[6] !== 100 && result.push('scale(' + (values[6] / 100) + ')');
                return result.join(' ');
            },
            "type": "string",
            "children": [
                {
                    "property": "水平位移（px）",
                    "dataField": "translate_x",
                    "value": "0",
                    "type": "number"
                },
                {
                    "property": "垂直位移（px）",
                    "dataField": "translate_y",
                    "value": "0",
                    "type": "number"
                },
                {
                    "property": "X轴旋转（deg）",
                    "dataField": "rotate_x",
                    "value": "0",
                    "type": "number"
                },
                {
                    "property": "Y轴旋转（deg）",
                    "dataField": "rotate_y",
                    "value": "0",
                    "type": "number"
                },
                {
                    "property": "Z轴旋转（deg）",
                    "dataField": "rotate_z",
                    "value": "0",
                    "type": "number"
                },
                {
                    "property": "倾斜（deg）",
                    "dataField": "skew",
                    "value": "0",
                    "type": "number"
                },
                {
                    "property": "缩放（%）",
                    "dataField": "scale",
                    "validator": function (item, value) {
                        value = +value;
                        if (value < 1 || value > 1000) {
                            return item.property + '值范围［1-1000］';
                        }
                    },
                    "value": "100",
                    "type": "number"
                }
            ]
        },
        animation: {
            "property": "动画" +
                        '<div ui="type:Tip;title:<h6>说明</h6>;content:<p>任何符合css3的frames动画。</p>;skin:help;arrow:tl;"></div>',
            "dataField": "animate",
            "animationField": "jq-animate-image",
            "valueFactory": function (record, item) {
                var values = record.children.map(function (n) {
                    return n.value
                });
                var result = [];
                if (!values[5] || values[0] <= 0) {
                    return result;
                }
                result.push(values[0] + 's'); // animation-duration
                values[1] && result.push(values[1]); // animation-timing-function
                result.push(values[2] + 's'); // animation-delay
                values[3] > 0 && result.push(values[3]) || result.push('infinite'); // animation-iteration-count
                values[4] && result.push(values[4]); // animation-direction
                result.push(values[5]);
                return result;
            },
            "value": "",
            "type": "string",
            "children": [
                {
                    "property": "持续时长（s）",
                    "dataField": "duration",
                    "value": "0",
                    "validator": function (item, value) {
                        value = +value;
                        if (!(value >= 0)) {
                            return item.property + '不能小于0';
                        }
                    },
                    "type": "number"
                },
                {
                    "dataField": "timing_function",
                    "property": "变换速率" +
                                '<div ui="type:Tip;title:<h6>说明</h6>;content:<p>备选值：</p><p>ease</p><p>ease-in</p><p>ease-in-out</p><p>linear</p><p>cubic-bezier</p>;skin:help;arrow:tl;"></div>',
                    "value": "ease-in-out",
                    "type": "string"
                },
                {
                    "dataField": "delay",
                    "property": "开始时间（s）",
                    "value": "0",
                    "type": "number"
                },
                {
                    "dataField": "iteration_count",
                    "property": "循环播放次数" +
                                '<div ui="type:Tip;title:<h6>说明</h6>;content:<p> 0 表示无限循环；</p>;skin:help;arrow:tl;"></div>',
                    "value": "0",
                    "type": "number"
                },
                {
                    "dataField": "direction",
                    "property": "播放方向" +
                                '<div ui="type:Tip;title:<h6>说明</h6>;content:<p>normal：动画的每次循环都是向前播放</p><p>alternate：动画播放在第偶数次向前播放，第奇数次向反方向播放</p>;skin:help;arrow:tl;"></div>',
                    "value": "alternate",
                    "type": "string"
                },
                {
                    "dataField": "fames",
                    "property": "动画内容" +
                                '<div ui="type:Tip;title:<h6>说明</h6>;content:<p>动画的具体播放内容，具体可搜索css3-animation参考书写。</p>;skin:help;arrow:tl;"></div>',
                    "value": "from {-webkit-transform:scale(0.5);;background: rgba(96, 203, 27,0.5);-webkit-box-shadow: 0 0 5px rgba(255, 255, 255, 0.3) inset, 0 0 3px rgba(220, 120, 200, 0.5);color: red; }"
                             + "25% {background: rgba(196, 203, 27,0.8);-webkit-box-shadow: 0 0 10px rgba(255, 155, 255, 0.5) inset, 0 0 8px rgba(120, 120, 200, 0.8);color: blue;}"
                             + "50% {background: rgba(196, 203, 127,1);-webkit-box-shadow: 0 0 5px rgba(155, 255, 255, 0.3) inset, 0 0 3px rgba(220, 120, 100, 1);color: orange;}"
                             + "75% {background: rgba(196, 203, 27,0.8);-webkit-box-shadow: 0 0 10px rgba(255, 155, 255, 0.5) inset, 0 0 8px rgba(120, 120, 200, 0.8);color: black;}"
                             + "to {-webkit-transform:scale(1.1);;background: rgba(96, 203, 27,0.5);-webkit-box-shadow: 0 0 5px rgba(255, 255, 255, 0.3) inset, 0 0 3px rgba(220, 120, 200, 0.5);color: green;}",
                    "type": "dialog"
                }
            ]
        }
    };
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = propertyConfig;
        }
        exports.propertyConfig = propertyConfig;
    } else {
        root.propertyConfig = propertyConfig;
    }
}.call(this));
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
(function (){
    var root = this;

    var baseFontSize = 10;
    var baseWidth = 320 * 12 / baseFontSize;
    function getEmValue(value) {
        return value / baseFontSize + 'em';
    }

    var propertyList = {
        'text_icon': function (propertyConfig) {
            var configs = {};
            configs.iconArea = {
                text: '图标区域',
                name: 'iconAreaStyle',
                properties: [
                    propertyConfig.backgroundColor,
                    propertyConfig.transform,
                    propertyConfig.animation
                ]
            };
            configs.textArea = {
                text: '文本区域',
                name: 'textAreaStyle',
                properties: [
                    propertyConfig.backgroundColor,
                    propertyConfig.transform,
                    propertyConfig.animation
                ]
            };
            configs.textTitleArea = {
                text: '标题区域',
                name: 'jgTitleStyle',
                properties: [
                    propertyConfig.textAlign,
                    propertyConfig.backgroundColor,
                    propertyConfig.transform,
                    propertyConfig.animation
                ]
            };
            configs.textTitleText = {
                text: '标题',
                name: 'jgTitleTextStyle',
                properties: [
                    propertyConfig.font,
                    propertyConfig.backgroundColor,
                    propertyConfig.transform
                ]
            };
            configs.textDescriptionArea = {
                text: '描述区域',
                name: 'jgDescriptionStyle',
                properties: [
                    propertyConfig.textAlign,
                    propertyConfig.backgroundColor,
                    propertyConfig.transform,
                    propertyConfig.animation
                ]
            };
            configs.textDescriptionText = {
                text: '描述',
                name: 'jgDescriptionTextStyle',
                properties: [
                    propertyConfig.font,
                    propertyConfig.backgroundColor,
                    propertyConfig.transform
                ]
            };
            configs.btnArea = {
                text: '按钮区域',
                name: 'btnAreaStyle',
                properties: [
                    propertyConfig.textAlign,
                    propertyConfig.backgroundColor,
                    propertyConfig.transform,
                    propertyConfig.animation
                ]
            };
            configs.btnContent = {
                text: '按钮',
                name: 'btnContentStyle',
                properties: [
                    propertyConfig.content,
                    propertyConfig.font,
                    propertyConfig.backgroundColor,
                    propertyConfig.transform
                ]
            };
            return configs;
        },
        'image': function (propertyConfig) {
            var configs = {};
            configs.imageArea = {
                text: '图片区域',
                name: 'imageAreaStyle',
                properties: [
                    propertyConfig.backgroundColor,
                    propertyConfig.transform,
                    propertyConfig.animation
                ]
            };
            configs.btnArea = {
                text: '按钮区域',
                name: 'btnAreaStyle',
                properties: [
                    propertyConfig.textAlign,
                    propertyConfig.backgroundColor,
                    propertyConfig.transform,
                    propertyConfig.animation
                ]
            };
            configs.btn = {
                text: '按钮',
                name: 'btnContentStyle',
                properties: [
                    propertyConfig.content,
                    propertyConfig.font,
                    propertyConfig.backgroundColor,
                    propertyConfig.transform
                ]
            };
            return configs;
        }
    };
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = propertyList;
        }
        exports.propertyList = propertyList;
    } else {
        root.propertyList = propertyList;
    }
}.call(this));
_('base_css').templateCache(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='body,html,div,p,img,h1,h2,h3,h4,h5,h6 {\n    padding:0;\n    margin:0;\n    border-width:0;\n}\na {\n    color:inherit;\n    text-decoration: none;\n}\n.logImg {\n    width: 1px;\n    height: 1px;\n    position: absolute;\n    left:0;\n    top:0;\n    opacity: 0;\n}\n.layout-area {\n    padding: 0;\n    margin: 0;\n    display: table;\n    height: 100%;\n    table-layout: fixed;\n    box-sizing: border-box;\n}\na.jg-banner {\n    color:inherit;\n    text-decoration:none;\n}\n.jg-banner {\n    display: block;\n    width: 100%;\n    height: 100%;\n    position: relative;\n    text-align: center;\n}\n.jg-banner .jq-container {\n    display: table-cell;\n    vertical-align: middle;\n    box-sizing: border-box;\n    width: 100%;\n    height: 100%;\n}\n\n.jg-banner .btn-area .jg-btn:before {\n    word-break: break-all;\n    box-sizing: border-box;\n    display: inline-block;\n}\n.no-image .image-area,\n.no-image .icon-area {\n    display: none;\n}';
return __p;
});
_('custom_js').templateCache(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='(function () {\n    var jesgooData = this.jesgoo_data || {};\n    var html = ('+
((__t=(data.source))==null?'':__t)+
'.call(this, jesgooData.d));\n    var doc = this.document;\n    if(!doc){console.log(html);return;}\n    setTimeout(function () {\n        doc.open();doc.write(html);doc.close();\n    }, 0);\n}.call(this))\n';
return __p;
});
_('image').templateCache(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<style>\n'+
((__t=(_.templateList('base_css')))==null?'':__t)+
'\n.jg-banner .btn-area {\n    position: absolute;\n    top:0;\n}\n.jg-banner .image-area img {\nheight: 100%;\nwidth: 100%;\n}\n.jg-banner .btn-area {\n'+
((__t=(data.layout.btnArea))==null?'':__t)+
'\n'+
((__t=(data.content.btnAreaStyle))==null?'':__t)+
'\n}\n.jg-banner .btn-area .jg-btn:before {\n'+
((__t=(data.content.btnContentStyle))==null?'':__t)+
'\n}\n.jg-banner .image-area {\n'+
((__t=(data.layout.imageArea))==null?'':__t)+
'\n'+
((__t=(data.content.imageAreaStyle))==null?'':__t)+
'\n}\n'+
((__t=(data.content.animation))==null?'':__t)+
'\n</style>\n<a class="jg-banner jg-image layout-area" href="<\\\\%=data.ClickUrl%\\\\>" target="_blank">\n    <div class="layout-area image-area">\n        <div class="jg-image jq-container">\n            <img src="<\\\\%=data.ImageUrl%\\\\>" onerror="this.parentNode.parentNode.parentNode.className+=\' no-image\'" />\n        </div>\n    </div>\n    <div class="layout-area btn-area">\n        <div class="jg-btn jq-container"></div>\n    </div>\n</a>\n    '+
((__t=(_.templateList('impression_monitor')))==null?'':__t)+
'\n';
return __p;
});
_('impression_monitor').templateCache(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<\\\\%\nvar impressionUrl = data.ImpressionUrl || [];\nfor (var i = 0, l = impressionUrl.length; i < l; i += 1) {\n%\\\\>\n<img class="logImg" src="<\\\\%=impressionUrl[i]%\\\\>"/>\n<\\\\%\n}\n%\\\\>';
return __p;
});
_('text_icon').templateCache(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<style>\n'+
((__t=(_.templateList('base_css')))==null?'':__t)+
'\n.jg-banner .icon-area img {\nheight: auto;\nwidth: auto;\nmax-width: 100%;\nmax-height: 100%;\n}\n.jg-banner .text-area {\noverflow: hidden;\n}\n.jg-banner .text-area .jg-description,\n.jg-banner .text-area .jg-title {\noverflow: hidden;\nwhite-space: nowrap;\ntext-overflow: ellipsis;\n}\n.jg-banner .icon-area {\n'+
((__t=(data.layout.iconArea))==null?'':__t)+
'\n'+
((__t=(data.content.iconAreaStyle))==null?'':__t)+
'\n}\n.jg-banner .btn-area {\n'+
((__t=(data.layout.btnArea))==null?'':__t)+
'\n'+
((__t=(data.content.btnAreaStyle))==null?'':__t)+
'\n}\n.jg-banner .btn-area .jg-btn:before {\n'+
((__t=(data.content.btnContentStyle))==null?'':__t)+
'\n}\n.jg-banner .text-area {\n'+
((__t=(data.layout.textArea))==null?'':__t)+
'\n'+
((__t=(data.content.textAreaStyle))==null?'':__t)+
'\n}\n.jg-banner .text-area .text-container {\n'+
((__t=(data.content.textContainerStyle))==null?'':__t)+
'\n}\n.jg-banner .text-area .jg-title {\n'+
((__t=(data.content.jgTitleStyle))==null?'':__t)+
'\n}\n.jg-banner .text-area .jg-title .text {\n'+
((__t=(data.content.jgTitleTextStyle))==null?'':__t)+
'\n}\n.jg-banner .text-area .jg-description {\n'+
((__t=(data.content.jgDescriptionStyle))==null?'':__t)+
'\n}\n.jg-banner .text-area .jg-description .text {\n'+
((__t=(data.content.jgDescriptionTextStyle))==null?'':__t)+
'\n}\n'+
((__t=(data.content.animation))==null?'':__t)+
'\n</style>\n<a class="jg-banner jg-text-icon layout-area" href="<\\\\%=data.ClickUrl%\\\\>" target="_blank">\n    ';

    var area = [];
    var layout = data.scale.layout || {};
    for (var areaName in layout) {
        area[layout[areaName]] = areaName;
    }
    
__p+='\n    '+
((__t=(_.templateList('text_icon_' + area[0])))==null?'':__t)+
'\n    '+
((__t=(_.templateList('text_icon_' + area[2])))==null?'':__t)+
'\n    '+
((__t=(_.templateList('text_icon_' + area[1])))==null?'':__t)+
'\n</a>\n'+
((__t=(_.templateList('impression_monitor')))==null?'':__t)+
'';
return __p;
});
_('text_icon_btnArea').templateCache(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<div class="layout-area btn-area">\n    <div class="jg-btn jq-container"></div>\n</div>';
return __p;
});
_('text_icon_iconArea').templateCache(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<div class="layout-area icon-area">\n    <div class="jg-icon jq-container">\n        <img src="<\\\\%=data.LogoUrl%\\\\>" onerror="this.parentNode.parentNode.parentNode.className+=\' no-image\'" />\n    </div>\n</div>';
return __p;
});
_('text_icon_textArea').templateCache(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<div class="layout-area text-area">\n    <div class="jq-container">\n        <div class="text-container">\n            <div class="jg-title"><span class="text"><\\\\%=data.Title%\\\\></span></div>\n            <div class="jg-description"><span class="text"><\\\\%=data.Description1%\\\\></span></div>\n        </div>\n    </div>\n</div>';
return __p;
});