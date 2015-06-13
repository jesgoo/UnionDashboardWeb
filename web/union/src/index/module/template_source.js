(function (){
    var root = this;
    var generator = function (adTypeName, contentData, layoutData, scaleData, debug) {

        var templateResult = _.templateList(adTypeName, {
            content: contentData,
            layout: layoutData,
            scale: scaleData || {},
            debug: debug
        });

        _.regTemplate('custom_tpl_source', templateResult.replace(/<\\\\%/g, '<%').replace(/%\\\\>/g, '%>'), {

        });
        var customJS = _.templateList('custom_js', {
            source: _.templateCache('custom_tpl_source').source,
            debug: debug
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
        'free': function (scaleOption) {
            return {};
        },
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
            areaWidth[3] = areaWidth[textAreaIndex] + areaWidth[iconAreaIndex];
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
            data.noIcon = area[3];
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
            data.noImage = 'background-image:url(http://ubmcmm.baidustatic.com/media/v1/0f000FtbHOko08TnpKpGO6.gif);background-size:100% 100%;';
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
(function () {
    var root = this;
    var getEmValue = function (value) {
        value = +value;
        isNaN(value) && (value = 0);
        return value !== 0 ? (value / 10) + 'em' : '0';
    };
    var getPxValue = function (value) {
        value = +value;
        isNaN(value) && (value = 0);
        return value !== 0 ? value + 'px' : '0';
    };
    var propertyEmFactory = function (record, item) {
        var size = +(record.value || item.value);
        size = +size;
        isNaN(size) && (size = 0);
        return size !== 0 ? getEmValue(size) : '';
    };
    var toUnicode = function (str) {
        var result = [];
        for (var i = 0, l = str.length; i < l; i += 1) {
            var code = str.charCodeAt(i);
            if (code > 255) {
                result[i] = eval('("\\u' + code.toString(16) + '")');
            } else {
                result[i] = str.charAt(i);
            }
        }
        return result.join('');
    };
    var propertyColor = {
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
    };
    var propertyBorder = {
        "valueFactory": function (record, item) {
            var values = record.children.map(function (n, i) {
                return n.value || item.children[i].value;
            });
            var result = [];
            values[0] = +values[0];
            if (values[0] >= 0 && values[1] !== '') {
                result.push(values[0] + 'px');
                result.push(values[1]);
                result.push(values[2]);
            }
            return result.join(' ');
        },
        "children": [
            {
                "property": "边框粗细(px)",
                "value": "0",
                "dataField": "width",
                "type": "number"
            },
            {
                "property": "边框样式" +
                            '<div ui="type:Tip;title:<h6>说明</h6>;content:<p>任何符合css border style 的值。</p><p>常用备选值：</p><p>solid</p><p>dashed</p><p>dotted</p><p>inset</p><p>outset</p><p>none</p>;skin:help;arrow:tl;"></div>',
                "value": "",
                "dataField": "style",
                "type": "string"
            },
            {
                "property": "边框颜色",
                "dataField": "color",
                "value": "",
                "children": propertyColor.children,
                "valueFactory": propertyColor.valueFactory
            }
        ]
    };
    var propertyConfig = {
        enable: {
            "property": "是否可用",
            "propertyField": "enable",
            "value": "true",
            "type": "bool"
        },
        html: {
            "property": "按钮文本",
            "dataField": "html",
            "propertyField": "html",
            "valueFactory": function (record, item) {
                var text = record.value || item.value || '';
                text.replace(/<\\\\%([\s\S]*?)%\\\\>/g, '<%$1%>');
                return text ? text.replace(/<%([\s\S]*?)%>/g, '<\\\\%$1%\\\\>') : '';
            },
            "value": "<%=data.Title%>\n<br>\n<%=data.Description1%>",
            "type": "dialog"
        },
        content: {
            "property": "按钮文本",
            "dataField": "content",
            "cssField": "content",
            "valueFactory": function (record, item) {
                var text = record.value || item.value || '';
                text.replace(/^'|'$/g, '');
                return text ? '\'' + toUnicode(text) + '\'' : '';
            },
            "value": "查看",
            "type": "string"
        },
        textAlign: {
            "property": "对齐方式",
            "dataField": "textAlign",
            "cssField": "text-align",
            "valueFactory": function (record, item) {
                var value = (record.value || item.value).toLowerCase();
                if (value !== 'center') {
                    return value;
                }
            },
            "value": "center",
            "type": "align"
        },
        font: {
            "property": "文本设定",
            "value": "",
            "dataField": "font",
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
                    "value": "#000000",
                    "children": propertyColor.children,
                    "valueFactory": propertyColor.valueFactory
                },
                {
                    "property": "文本阴影",
                    "cssField": "text-shadow",
                    "dataField": "textShadow",
                    "value": "",
                    "valueFactory": function (record, item) {
                        var values = record.children.map(function (n, i) {
                            return n.value || item.children[i].value;
                        });
                        var result = [];
                        values[0] = +values[0];
                        values[1] = +values[1];
                        values[2] = +values[2];
                        if (values[3] !== '' && (values[0] !== 0 || values[1] !== 0 || values[2] !== 0)) {
                            result.push(getPxValue(values[0]));
                            result.push(getPxValue(values[1]));
                            result.push(getPxValue(values[2]));
                            result.push(values[4]);
                        }
                        return result.join(' ');
                    },
                    "children": [
                        {
                            "property": "水平位置(px)",
                            "value": "0",
                            "dataField": "hShadow",
                            "type": "number"
                        },
                        {
                            "property": "垂直位置(px)",
                            "value": "0",
                            "dataField": "vShadow",
                            "type": "number"
                        },
                        {
                            "property": "模糊距离(px)",
                            "value": "0",
                            "dataField": "blur",
                            "type": "number"
                        },
                        {
                            "property": "阴影颜色",
                            "dataField": "color",
                            "value": "",
                            "children": propertyColor.children,
                            "valueFactory": propertyColor.valueFactory
                        }
                    ]
                }
            ]
        },
        radius: {
            "property": "圆角设定(半径:px)",
            "value": "",
            "dataField": "borderRadius",
            "type": "string",
            "children": [
                {
                    "property": "全部角",
                    "value": "0",
                    "dataField": "borderRadius",
                    "cssField": "border-radius",
                    "valueFactory": propertyEmFactory,
                    "type": "number"
                },
                {
                    "property": "左上角",
                    "value": "0",
                    "dataField": "borderTopLeftRadius",
                    "cssField": "border-top-left-radius",
                    "valueFactory": propertyEmFactory,
                    "type": "number"
                },
                {
                    "property": "左下角",
                    "value": "0",
                    "dataField": "borderBottomLeftRadius",
                    "cssField": "border-bottom-left-radius",
                    "valueFactory": propertyEmFactory,
                    "type": "number"
                },
                {
                    "property": "右上角",
                    "value": "0",
                    "dataField": "borderTopRightRadius",
                    "cssField": "border-top-right-radius",
                    "valueFactory": propertyEmFactory,
                    "type": "number"
                },
                {
                    "property": "右下角",
                    "value": "0",
                    "dataField": "borderBottomRightRadius",
                    "cssField": "border-bottom-right-radius",
                    "valueFactory": propertyEmFactory,
                    "type": "number"
                }
            ]
        },
        padding: {
            "property": "内边距(px)",
            "value": "",
            "dataField": "padding",
            "type": "string",
            "children": [
                {
                    "property": "全部边距",
                    "value": "0",
                    "dataField": "padding",
                    "cssField": "padding",
                    "valueFactory": propertyEmFactory,
                    "type": "number"
                },
                {
                    "property": "上边距",
                    "value": "0",
                    "dataField": "paddingTop",
                    "cssField": "padding-top",
                    "valueFactory": propertyEmFactory,
                    "type": "number"
                },
                {
                    "property": "下边距",
                    "value": "0",
                    "dataField": "paddingBottom",
                    "cssField": "padding-bottom",
                    "valueFactory": propertyEmFactory,
                    "type": "number"
                },
                {
                    "property": "右边距",
                    "value": "0",
                    "dataField": "paddingRight",
                    "cssField": "padding-right",
                    "valueFactory": propertyEmFactory,
                    "type": "number"
                },
                {
                    "property": "左边距",
                    "value": "0",
                    "dataField": "paddingLeft",
                    "cssField": "padding-left",
                    "valueFactory": propertyEmFactory,
                    "type": "number"
                }
            ]
        },
        margin: {
            "property": "外边距(px)",
            "value": "",
            "dataField": "margin",
            "type": "string",
            "children": [
                {
                    "property": "全部边距",
                    "value": "0",
                    "dataField": "margin",
                    "cssField": "margin",
                    "valueFactory": propertyEmFactory,
                    "type": "number"
                },
                {
                    "property": "上边距",
                    "value": "0",
                    "dataField": "marginTop",
                    "cssField": "margin-top",
                    "valueFactory": propertyEmFactory,
                    "type": "number"
                },
                {
                    "property": "下边距",
                    "value": "0",
                    "dataField": "marginBottom",
                    "cssField": "margin-bottom",
                    "valueFactory": propertyEmFactory,
                    "type": "number"
                },
                {
                    "property": "右边距",
                    "value": "0",
                    "dataField": "marginRight",
                    "cssField": "margin-right",
                    "valueFactory": propertyEmFactory,
                    "type": "number"
                },
                {
                    "property": "左边距",
                    "value": "0",
                    "dataField": "marginLeft",
                    "cssField": "margin-left",
                    "valueFactory": propertyEmFactory,
                    "type": "number"
                }
            ]
        },
        shadow: {
            "property": "阴影设定",
            "value": "",
            "cssField": "box-shadow",
            "dataField": "boxShadow",
            "valueFactory": function (record, item) {
                var values = record.children.map(function (n, i) {
                    return n.value || item.children[i].value;
                });
                var result = [];
                values[0] = +values[0];
                values[1] = +values[1];
                values[2] = +values[2];
                values[3] = +values[3];
                if (values[4] !== '' && (values[0] !== 0 || values[1] !== 0 || values[2] !== 0 || values[3] !== 0)) {
                    result.push(getPxValue(values[0]));
                    result.push(getPxValue(values[1]));
                    result.push(getPxValue(values[2]));
                    result.push(getPxValue(values[3]));
                    result.push(values[4]);
                    values[5] && result.push(values[5]);
                }
                return result.join(' ');
            },
            "children": [
                {
                    "property": "水平位置(px)",
                    "value": "0",
                    "dataField": "hShadow",
                    "type": "number"
                },
                {
                    "property": "垂直位置(px)",
                    "value": "0",
                    "dataField": "vShadow",
                    "type": "number"
                },
                {
                    "property": "模糊距离(px)",
                    "value": "0",
                    "dataField": "blur",
                    "type": "number"
                },
                {
                    "property": "阴影尺寸(px)",
                    "value": "0",
                    "dataField": "spread",
                    "type": "number"
                },
                {
                    "property": "阴影颜色",
                    "dataField": "color",
                    "value": "",
                    "type": "color",
                    "children": propertyColor.children,
                    "valueFactory": propertyColor.valueFactory
                },
                {
                    "property": "阴影样式" +
                                '<div ui="type:Tip;title:<h6>说明</h6>;content:<p>常用备选值：</p><p>inset 内部阴影</p><p>outset 外部阴影，默认值</p>;skin:help;arrow:tl;"></div>',
                    "value": "",
                    "dataField": "style",
                    "type": "string"
                }
            ]
        },
        border: {
            "property": "边框设定",
            "value": "",
            "dataField": "border",
            "children": [
                {
                    "property": "全边框样式",
                    "value": "",
                    "dataField": "border",
                    "cssField": "border",
                    "valueFactory": propertyBorder.valueFactory,
                    "type": "string",
                    "children": propertyBorder.children
                },
                {
                    "property": "上边框",
                    "value": "",
                    "dataField": "borderTop",
                    "cssField": "border-top",
                    "valueFactory": propertyBorder.valueFactory,
                    "type": "string",
                    "children": propertyBorder.children
                },
                {
                    "property": "下边框",
                    "value": "",
                    "dataField": "borderBottom",
                    "cssField": "border-bottom",
                    "valueFactory": propertyBorder.valueFactory,
                    "type": "string",
                    "children": propertyBorder.children
                },
                {
                    "property": "右边框",
                    "value": "",
                    "dataField": "borderRight",
                    "cssField": "border-right",
                    "valueFactory": propertyBorder.valueFactory,
                    "type": "string",
                    "children": propertyBorder.children
                },
                {
                    "property": "左边框",
                    "value": "",
                    "dataField": "borderLeft",
                    "cssField": "border-left",
                    "valueFactory": propertyBorder.valueFactory,
                    "type": "string",
                    "children": propertyBorder.children
                }
            ]
        },
        backgroundColor: {
            "property": "背景颜色",
            "cssField": "background-color",
            "dataField": "backgroundColor",
            "value": "",
            "children": propertyColor.children,
            "valueFactory": propertyColor.valueFactory
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
                    "dataField": "frames",
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
(function () {
    var root = this;

    var baseFontSize = 10;
    var baseWidth = 320 * 12 / baseFontSize;

    function getEmValue(value) {
        return value / baseFontSize + 'em';
    }

    var propertyList = {
        'free': function (propertyConfig) {
            var configs = {};
            configs.html = {
                text: '内容',
                name: 'html',
                properties: [
                    propertyConfig.html
                ]
            };
            configs.banner = {
                text: 'Banner整体',
                name: 'bannerStyle',
                properties: [
                    propertyConfig.backgroundColor,
                    propertyConfig.radius,
                    propertyConfig.shadow,
                    propertyConfig.transform,
                    propertyConfig.animation
                ]
            };
            return configs;
        },
        'text_icon': function (propertyConfig) {
            var configs = {};
            configs.banner = {
                text: 'Banner整体',
                name: 'bannerStyle',
                properties: [
                    propertyConfig.backgroundColor,
                    propertyConfig.radius,
                    propertyConfig.shadow,
                    propertyConfig.transform,
                    propertyConfig.animation
                ]
            };
            configs.iconArea = {
                text: '图标区域',
                name: 'iconAreaStyle',
                properties: [
                    propertyConfig.backgroundColor,
                    propertyConfig.border,
                    propertyConfig.radius,
                    propertyConfig.padding,
                    propertyConfig.shadow,
                    propertyConfig.transform,
                    propertyConfig.animation
                ]
            };
            configs.image = {
                text: '图标',
                name: 'iconStyle',
                properties: [
                    propertyConfig.backgroundColor,
                    propertyConfig.border,
                    propertyConfig.radius,
                    propertyConfig.shadow,
                    propertyConfig.transform,
                    propertyConfig.animation
                ]
            };
            configs.textArea = {
                text: '文本区域',
                name: 'textAreaStyle',
                properties: [
                    propertyConfig.backgroundColor,
                    propertyConfig.border,
                    propertyConfig.radius,
                    propertyConfig.padding,
                    propertyConfig.shadow,
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
                    propertyConfig.border,
                    propertyConfig.radius,
                    propertyConfig.padding,
                    propertyConfig.shadow,
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
                    propertyConfig.border,
                    propertyConfig.radius,
                    propertyConfig.padding,
                    propertyConfig.shadow,
                    propertyConfig.transform
                ]
            };
            configs.textDescriptionArea = {
                text: '描述区域',
                name: 'jgDescriptionStyle',
                properties: [
                    propertyConfig.textAlign,
                    propertyConfig.backgroundColor,
                    propertyConfig.border,
                    propertyConfig.radius,
                    propertyConfig.padding,
                    propertyConfig.shadow,
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
                    propertyConfig.border,
                    propertyConfig.radius,
                    propertyConfig.padding,
                    propertyConfig.shadow,
                    propertyConfig.transform
                ]
            };
            configs.btnArea = {
                text: '按钮区域',
                name: 'btnAreaStyle',
                properties: [
                    propertyConfig.textAlign,
                    propertyConfig.backgroundColor,
                    propertyConfig.border,
                    propertyConfig.radius,
                    propertyConfig.padding,
                    propertyConfig.shadow,
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
                    propertyConfig.border,
                    propertyConfig.radius,
                    propertyConfig.padding,
                    propertyConfig.shadow,
                    propertyConfig.transform,
                    propertyConfig.animation
                ]
            };
            return configs;
        },
        'image': function (propertyConfig) {
            var configs = {};
            configs.banner = {
                text: 'Banner整体',
                name: 'bannerStyle',
                properties: [
                    propertyConfig.backgroundColor,
                    propertyConfig.radius,
                    propertyConfig.shadow,
                    propertyConfig.transform,
                    propertyConfig.animation
                ]
            };
            configs.imageArea = {
                text: '图片区域',
                name: 'imageAreaStyle',
                properties: [
                    propertyConfig.backgroundColor,
                    propertyConfig.border,
                    propertyConfig.radius,
                    propertyConfig.padding,
                    propertyConfig.shadow,
                    propertyConfig.transform,
                    propertyConfig.animation
                ]
            };
            configs.image = {
                text: '图片',
                name: 'imageStyle',
                properties: [
                    propertyConfig.backgroundColor,
                    propertyConfig.border,
                    propertyConfig.radius,
                    propertyConfig.shadow,
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
                    propertyConfig.border,
                    propertyConfig.radius,
                    propertyConfig.padding,
                    propertyConfig.shadow,
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
                    propertyConfig.border,
                    propertyConfig.radius,
                    propertyConfig.padding,
                    propertyConfig.shadow,
                    propertyConfig.transform,
                    propertyConfig.animation
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
__p+='body,html,div,p,img,h1,h2,h3,h4,h5,h6 {\n    padding:0;\n    margin:0;\n    border-width:0;\n}\nbody,\nhtml\n {\n    height: 100%;\n    width: 100%;\n    text-align: center;\n}\nhtml {\n    background: #fff;\n    color: #000;\n    font: 12px/1 "microsoft yahei" , Arial, sonti, Verdana, Geneva, Helvetica, sans-serif;\n}\nbody {\n    font-size: 100%;\n    font-family: inherit;\n    background-color: #f2f2f2;\n}\ntable {\n    border-collapse: collapse;\n    border-spacing: 0;\n}\ndiv, img {\n    box-sizing: border-box;\n}\na {\n    color:inherit;\n    text-decoration: none;\n    display: none;\n}\na.jq-banner, .jq-banner a{\n    display: initial\n}\n.logImg {\n    width: 1px;\n    height: 1px;\n    position: absolute;\n    left:0;\n    top:0;\n    opacity: 0;\n}\n.layout-area {\n    padding: 0;\n    margin: 0;\n    display: table;\n    height: 100%;\n    table-layout: fixed;\n}\na.jg-banner {\n    color:inherit;\n    text-decoration:none;\n}\n.jg-banner {\n    display: block;\n    width: 100%;\n    height: 100%;\n    position: relative;\n    text-align: center;\n}\n.jg-banner .jq-container {\n    display: table-cell;\n    vertical-align: middle;\n    width: 100%;\n    height: 100%;\n}\n\n.jg-banner .btn-area .jg-btn:before {\n    word-break: break-all;\n    box-sizing: border-box;\n    display: inline-block;\n}\n.no-image .image-area,\n.no-image .icon-area {\n    display: none;\n}';
return __p;
});
_('base_foot').templateCache(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='</body>\n</html>';
return __p;
});
_('base_head').templateCache(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<!doctype html>\n<html style="height: 100%;">\n<head>\n    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">\n    <meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1.0, minimal-ui">\n    <link rel="stylesheet" type="text/css" href="//cdn.jesgoo.com/sdk/banner/javascript/jesgoo.css">\n</head>\n<body style="height: 100%;">\n';
return __p;
});
_('custom_js').templateCache(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='(function () {\n    var jesgooData = this.jesgoo_data || {};\n    var html = ('+
((__t=(data.source))==null?'':__t)+
'.call(this, jesgooData.d));\n    var doc = this.document;\n    if(!doc){\n        console.log(html);\n        return;\n    }\n    setTimeout(function () {\n        doc.open();doc.write(html);doc.close();\n        '+
((__t=(_.templateList('rsa_monitor', data)))==null?'':__t)+
'\n        '+
((__t=(_.templateList('resize', data)))==null?'':__t)+
'\n    }, 0);\n}.call(this))\n';
return __p;
});
_('free').templateCache(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+=''+
((__t=(_.templateList('base_head', data)))==null?'':__t)+
'\n<style>\n.jg-banner {\n'+
((__t=(data.content.bannerStyle))==null?'':__t)+
'\n}\n'+
((__t=(data.content.animation))==null?'':__t)+
'\n</style>\n'+
((__t=(_.templateList('impression_monitor', data)))==null?'':__t)+
'\n<a id="jg-link" class="jg-banner jg-free" href="<\\\\%=data.ClickUrl%\\\\>" target="_blank">\n    '+
((__t=(data.content.html))==null?'':__t)+
'\n</a>\n'+
((__t=(_.templateList('base_foot', data)))==null?'':__t)+
'';
return __p;
});
_('image').templateCache(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+=''+
((__t=(_.templateList('base_head', data)))==null?'':__t)+
'\n<style>\n.btn-area {\n    position: absolute;\n    top:0;\n}\n.image-area {\n    width: 100%;\n    height: 100%;\n    display: block;\n}\n.image-area .jg-image {\n    display: block;\n}\n.image-area img {\n    height: 100%;\n    width: 100%;\n}\n.no-image {\n'+
((__t=(data.layout.noImage))==null?'':__t)+
'\n}\n.jg-banner {\n'+
((__t=(data.content.bannerStyle))==null?'':__t)+
'\n}\n.btn-area {\n'+
((__t=(data.layout.btnArea))==null?'':__t)+
'\n'+
((__t=(data.content.btnAreaStyle))==null?'':__t)+
'\n}\n.btn-area .jg-btn:before {\n'+
((__t=(data.content.btnContentStyle))==null?'':__t)+
'\n}\n.image-area {\n'+
((__t=(data.layout.imageArea))==null?'':__t)+
'\n'+
((__t=(data.content.imageAreaStyle))==null?'':__t)+
'\n}\n.image-area img{\n'+
((__t=(data.content.imageStyle))==null?'':__t)+
'\n}\n'+
((__t=(data.content.animation))==null?'':__t)+
'\n</style>\n<a id="jg-link" class="jg-banner jg-image layout-area" href="<\\\\%=data.ClickUrl%\\\\>" target="_blank">\n    <div class="layout-area image-area">\n        <div class="jg-image jq-container">\n            <img src="<\\\\%=data.ImageUrl%\\\\>" onerror="this.parentNode.parentNode.parentNode.className+=\' no-image\'" />\n        </div>\n    </div>\n    <div class="layout-area btn-area">\n        <div class="jg-btn jq-container"></div>\n    </div>\n</a>\n'+
((__t=(_.templateList('impression_monitor', data)))==null?'':__t)+
'\n'+
((__t=(_.templateList('base_foot', data)))==null?'':__t)+
'';
return __p;
});
_('impression_monitor').templateCache(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='';
 if (!data.debug) { 
__p+='\n<\\\\%\nvar impressionUrl = data.ImpressionUrl || [];\nfor (var i = 0, l = impressionUrl.length; i < l; i += 1) {\n%\\\\>\n<img class="logImg" src="<\\\\%=impressionUrl[i]%\\\\>"/>\n<\\\\%\n}\n%\\\\>\n';
 } 
__p+='\n';
return __p;
});
_('resize-2.0').templateCache(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='function setCookie(name, value) {\n    if(window.localStorage&&window.localStorage.setItem ){\n        window.localStorage.setItem(name,value);\n    }\n    var oDate = new Date();\n    oDate.setDate(oDate.getDate() + 365*24*3600*1000);\n    document.cookie = name + "=" + value + ";Domain=.jesgoo.com;Path=/;expires=" + oDate;\n    document.cookie = name + "=" + value + ";Domain=.moogos.com;Path=/;expires=" + oDate;\n}\n\n\nfunction getCookie(name) {\n    if(window.localStorage&&window.localStorage.getItem && window.localStorage.getItem(name)){\n        return window.localStorage.getItem(name);\n    }\n    var arr = document.cookie.split("; ");\n    for (var i = 0; i < arr.length; i++) {\n        var arr2 = arr[i].split("=");\n        if (arr2[0] == name) {\n            return arr2[1];\n        }\n    }\n    return "";\n}\n\nwindow.onload = function() {\n    var aEle = document.getElementById("jesgoo-link");\n    if (aEle) {\n        var attrJSON = aEle.getAttribute("extra");\n        var attrObj = eval("(" + attrJSON + ")");\n\n        /*//点击监控\n        var s = document.getElementById("jesgoo-id-container");\n        s && s.addEventListener(\'click\',\n            function(evt) {\n                //cnzz点击监控不准，暂时下线\n                // _czc && _czc.push(["_trackEvent", "content", "1", attrObj.adid ? attrObj.adid : ""]);\n                var clkMonitor = attrObj.clkMonitor || [];\n                if(typeof clkMonitor == "object" && clkMonitor.length > 0){\n                    var target = evt.target;\n                    var maxDepth = s ? s.getElementsByTagName(\'*\').length : 0;\n                    while (maxDepth && target.nodeType !== 9 && target.tagName.toLowerCase() !== \'a\') {\n                        target = target.parentNode;\n                        maxDepth--;\n                    }\n\n                    if (target.tagName.toLowerCase() === \'a\') {\n\n                        for (var i = 0; i < clkMonitor.length; i++) {\n                            var img = document.createElement("img");\n                            img.setAttribute("src", clkMonitor[i]);\n                            img.setAttribute("style", "display:none");\n                            document.body.appendChild(img);\n                        }\n                    }\n                }\n            },\n            true\n        );*/\n\n        var btn = document.getElementById(\'jesgoo-btn\');\n        if(btn){\n            if (attrObj.act == 2) {\n                btn.innerHTML = eval(\'("\\\\u4e\' + \'0b\\\\u8f\' + \'7d")\');\n            } else {\n                btn.innerHTML = eval(\'("\\\\u67\' + \'e5\\\\u7\' + \'70b")\');\n            }\n            btn.style.display = "block"\n        }\n\n    }\n\n    var ua = window.navigator.userAgent.toLowerCase();\n    try{\n        var snTs = window.localStorage.getItem("snTs") || 0;\n        if (!getCookie("JESGOOSN") && (ua.indexOf("android") >= 0 || ua.indexOf("adr") >= 0) && new Date().getTime() - snTs > 1800 * 1000) {\n            window.localStorage.setItem("snTs",new Date().getTime());\n            window.jsonp1 = function(cuidJson) {\n                var cuid = cuidJson.cuid;\n                var sn = cuid.substring(cuid.indexOf(\'|\') + 1);\n                sn = sn.split(\'\').reverse().join(\'\');\n                setCookie("JESGOOSN",sn);\n                _czc && _czc.push(["_trackEvent", "id", "available", getCookie("JESGOOID")]);\n            }\n            var confScript = document.createElement(\'script\');\n            confScript.setAttribute("src", "http://127.0.0.1:7777/getcuid?callback=jsonp1&_=" + new Date().getTime());\n            document.body.appendChild(confScript);\n            _czc && _czc.push(["_trackEvent", "id", "total", getCookie("JESGOOID")]);\n        }\n    }catch(e){\n        console.log("localStorage securety error");\n    }\n\n}\n\nfunction resetFontsize() {\n    var win = window;\n    var winW = win.innerWidth;\n    var winH = win.innerHeight;\n    var fzW, fzH;\n    if (winW / winH < 5 / 2) {\n        fzW = winW / 300 * 20;\n\n        fzH = 1000;\n    } else {\n\n        fzW = 1000;\n        fzH = winH / 96 * 20;\n    }\n    var fz = fzW > fzH ? fzH : fzW;\n\n    document.body.style.fontSize = fz + \'px\';\n}\n\nresetFontsize();';
return __p;
});
_('resize').templateCache(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='(function () {\n    var html = document.documentElement;\n    var field = \'currentFontSize\';\n    var baseSize = 10;\n    var BaseWidth = 320;\n    window.addEventListener(\'resize\', setFontSize);\n    setFontSize();\n    function setFontSize() {\n        var w = html.clientWidth;\n        var h = html.clientHeight;\n        var scale = w / BaseWidth;\n        var fontSize = Math.floor(scale * baseSize);\n        fontSize = fontSize < baseSize ? baseSize : fontSize;\n        if (fontSize === html[field]) {\n            return false;\n        }\n        html.style.fontSize = fontSize + \'px\';\n        html[field] = fontSize;\n    }\n})();';
return __p;
});
_('rsa').templateCache(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='(function (global) {\r\n    function parseBigInt(str, r) {\r\n        return new BigInteger(str, r)\r\n    }\r\n\r\n    function linebrk(s, n) {\r\n        var ret = "";\r\n        var i = 0;\r\n        while (i + n < s.length) {\r\n            ret += s.substring(i, i + n) + "\\n";\r\n            i += n\r\n        }\r\n        return ret + s.substring(i, s.length)\r\n    }\r\n\r\n    function byte2Hex(b) {\r\n        if (b < 16) {\r\n            return "0" + b.toString(16)\r\n        } else {\r\n            return b.toString(16)\r\n        }\r\n    }\r\n\r\n    function pkcs1pad2PP(s, n) {\r\n        if (n < s.length + 11) {\r\n            console.log("Message too long for RSA");\r\n            return null\r\n        }\r\n        var ba = new Array();\r\n        var i = s.length - 1;\r\n        while (i >= 0 && n > 0) {\r\n            var c = s.charCodeAt(i--);\r\n            if (c < 128) {\r\n                ba[--n] = c\r\n            } else {\r\n                if ((c > 127) && (c < 2048)) {\r\n                    ba[--n] = (c & 63) | 128;\r\n                    ba[--n] = (c >> 6) | 192\r\n                } else {\r\n                    ba[--n] = (c & 63) | 128;\r\n                    ba[--n] = ((c >> 6) & 63) | 128;\r\n                    ba[--n] = (c >> 12) | 224\r\n                }\r\n            }\r\n        }\r\n        ba[--n] = 0;\r\n        var rng = new SecureRandom();\r\n        var x = new Array();\r\n        while (n > 2) {\r\n            x[0] = 0;\r\n            while (x[0] == 0) {\r\n                rng.nextBytes(x)\r\n            }\r\n            ba[--n] = x[0]\r\n        }\r\n        ba[--n] = 2;\r\n        ba[--n] = 0;\r\n        return new BigInteger(ba)\r\n    }\r\n\r\n    function RSAKeyPassPort() {\r\n        this.n = null;\r\n        this.e = 0;\r\n        this.d = null;\r\n        this.p = null;\r\n        this.q = null;\r\n        this.dmp1 = null;\r\n        this.dmq1 = null;\r\n        this.coeff = null\r\n    }\r\n\r\n    function RSASetPublicPP(N, E) {\r\n        if (N != null && E != null && N.length > 0 && E.length > 0) {\r\n            this.n = parseBigInt(N, 16);\r\n            this.e = parseInt(E, 16)\r\n        } else {\r\n            alert("Invalid RSA public key")\r\n        }\r\n    }\r\n\r\n    function RSADoPublicPP(x) {\r\n        return x.modPowInt(this.e, this.n)\r\n    }\r\n\r\n    function RSAEncryptPP(text) {\r\n        var m = pkcs1pad2PP(text, (this.n.bitLength() + 7) >> 3);\r\n        if (m == null) {\r\n            return null\r\n        }\r\n        var c = this.doPublic(m);\r\n        if (c == null) {\r\n            return null\r\n        }\r\n        var h = c.toString(16);\r\n        if ((h.length & 1) == 0) {\r\n            return h\r\n        } else {\r\n            return "0" + h\r\n        }\r\n    }\r\n\r\n    RSAKeyPassPort.prototype.doPublic = RSADoPublicPP;\r\n    var rsaSwitch = "on";\r\n    RSAKeyPassPort.prototype.setPublic = RSASetPublicPP;\r\n    RSAKeyPassPort.prototype.encrypt = RSAEncryptPP;\r\n    var rng_state;\r\n    var rng_pool;\r\n    var rng_pptr;\r\n\r\n    function rng_seed_int(x) {\r\n        rng_pool[rng_pptr++] ^= x & 255;\r\n        rng_pool[rng_pptr++] ^= (x >> 8) & 255;\r\n        rng_pool[rng_pptr++] ^= (x >> 16) & 255;\r\n        rng_pool[rng_pptr++] ^= (x >> 24) & 255;\r\n        if (rng_pptr >= rng_psize) {\r\n            rng_pptr -= rng_psize\r\n        }\r\n    }\r\n\r\n    function rng_seed_time() {\r\n        rng_seed_int(new Date().getTime())\r\n    }\r\n\r\n    if (rng_pool == null) {\r\n        rng_pool = new Array();\r\n        rng_pptr = 0;\r\n        var t;\r\n        if (navigator.appName == "Netscape" && navigator.appVersion < "5" && window.crypto) {\r\n            var z = window.crypto.random(32);\r\n            for (t = 0; t < z.length; ++t) {\r\n                rng_pool[rng_pptr++] = z.charCodeAt(t) & 255\r\n            }\r\n        }\r\n        while (rng_pptr < rng_psize) {\r\n            t = Math.floor(65536 * Math.random());\r\n            rng_pool[rng_pptr++] = t >>> 8;\r\n            rng_pool[rng_pptr++] = t & 255\r\n        }\r\n        rng_pptr = 0;\r\n        rng_seed_time()\r\n    }\r\n    function rng_get_byte() {\r\n        if (rng_state == null) {\r\n            rng_seed_time();\r\n            rng_state = prng_newstate();\r\n            rng_state.init(rng_pool);\r\n            for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) {\r\n                rng_pool[rng_pptr] = 0\r\n            }\r\n            rng_pptr = 0\r\n        }\r\n        return rng_state.next()\r\n    }\r\n\r\n    function rng_get_bytes(ba) {\r\n        var i;\r\n        for (i = 0; i < ba.length; ++i) {\r\n            ba[i] = rng_get_byte()\r\n        }\r\n    }\r\n\r\n    function SecureRandom() {\r\n    }\r\n\r\n    SecureRandom.prototype.nextBytes = rng_get_bytes;\r\n    function Arcfour() {\r\n        this.i = 0;\r\n        this.j = 0;\r\n        this.S = new Array()\r\n    }\r\n\r\n    function ARC4init(key) {\r\n        var i, j, t;\r\n        for (i = 0; i < 256; ++i) {\r\n            this.S[i] = i\r\n        }\r\n        j = 0;\r\n        for (i = 0; i < 256; ++i) {\r\n            j = (j + this.S[i] + key[i % key.length]) & 255;\r\n            t = this.S[i];\r\n            this.S[i] = this.S[j];\r\n            this.S[j] = t\r\n        }\r\n        this.i = 0;\r\n        this.j = 0\r\n    }\r\n\r\n    function ARC4next() {\r\n        var t;\r\n        this.i = (this.i + 1) & 255;\r\n        this.j = (this.j + this.S[this.i]) & 255;\r\n        t = this.S[this.i];\r\n        this.S[this.i] = this.S[this.j];\r\n        this.S[this.j] = t;\r\n        return this.S[(t + this.S[this.i]) & 255]\r\n    }\r\n\r\n    Arcfour.prototype.init = ARC4init;\r\n    Arcfour.prototype.next = ARC4next;\r\n    function prng_newstate() {\r\n        return new Arcfour()\r\n    }\r\n\r\n    var rng_psize = 256;\r\n    var dbits;\r\n    var canary = 244837814094590;\r\n    var j_lm = ((canary & 16777215) == 15715070);\r\n\r\n    function BigInteger(a, b, c) {\r\n        if (a != null) {\r\n            if ("number" == typeof a) {\r\n                this.fromNumber(a, b, c)\r\n            } else {\r\n                if (b == null && "string" != typeof a) {\r\n                    this.fromString(a, 256)\r\n                } else {\r\n                    this.fromString(a, b)\r\n                }\r\n            }\r\n        }\r\n    }\r\n\r\n    function nbi() {\r\n        return new BigInteger(null)\r\n    }\r\n\r\n    function am1(i, x, w, j, c, n) {\r\n        while (--n >= 0) {\r\n            var v = x * this[i++] + w[j] + c;\r\n            c = Math.floor(v / 67108864);\r\n            w[j++] = v & 67108863\r\n        }\r\n        return c\r\n    }\r\n\r\n    function am2(i, x, w, j, c, n) {\r\n        var xl = x & 32767, xh = x >> 15;\r\n        while (--n >= 0) {\r\n            var l = this[i] & 32767;\r\n            var h = this[i++] >> 15;\r\n            var m = xh * l + h * xl;\r\n            l = xl * l + ((m & 32767) << 15) + w[j] + (c & 1073741823);\r\n            c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);\r\n            w[j++] = l & 1073741823\r\n        }\r\n        return c\r\n    }\r\n\r\n    function am3(i, x, w, j, c, n) {\r\n        var xl = x & 16383, xh = x >> 14;\r\n        while (--n >= 0) {\r\n            var l = this[i] & 16383;\r\n            var h = this[i++] >> 14;\r\n            var m = xh * l + h * xl;\r\n            l = xl * l + ((m & 16383) << 14) + w[j] + c;\r\n            c = (l >> 28) + (m >> 14) + xh * h;\r\n            w[j++] = l & 268435455\r\n        }\r\n        return c\r\n    }\r\n\r\n    if (j_lm && (navigator.appName == "Microsoft Internet Explorer")) {\r\n        BigInteger.prototype.am = am2;\r\n        dbits = 30\r\n    } else {\r\n        if (j_lm && (navigator.appName != "Netscape")) {\r\n            BigInteger.prototype.am = am1;\r\n            dbits = 26\r\n        } else {\r\n            BigInteger.prototype.am = am3;\r\n            dbits = 28\r\n        }\r\n    }\r\n    BigInteger.prototype.DB = dbits;\r\n    BigInteger.prototype.DM = ((1 << dbits) - 1);\r\n    BigInteger.prototype.DV = (1 << dbits);\r\n    var BI_FP = 52;\r\n    BigInteger.prototype.FV = Math.pow(2, BI_FP);\r\n    BigInteger.prototype.F1 = BI_FP - dbits;\r\n    BigInteger.prototype.F2 = 2 * dbits - BI_FP;\r\n    var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";\r\n    var BI_RC = new Array();\r\n    var rr, vv;\r\n    rr = "0".charCodeAt(0);\r\n    for (vv = 0; vv <= 9; ++vv) {\r\n        BI_RC[rr++] = vv\r\n    }\r\n    rr = "a".charCodeAt(0);\r\n    for (vv = 10; vv < 36; ++vv) {\r\n        BI_RC[rr++] = vv\r\n    }\r\n    rr = "A".charCodeAt(0);\r\n    for (vv = 10; vv < 36; ++vv) {\r\n        BI_RC[rr++] = vv\r\n    }\r\n    function int2char(n) {\r\n        return BI_RM.charAt(n)\r\n    }\r\n\r\n    function intAt(s, i) {\r\n        var c = BI_RC[s.charCodeAt(i)];\r\n        return (c == null) ? -1 : c\r\n    }\r\n\r\n    function bnpCopyTo(r) {\r\n        for (var i = this.t - 1; i >= 0; --i) {\r\n            r[i] = this[i]\r\n        }\r\n        r.t = this.t;\r\n        r.s = this.s\r\n    }\r\n\r\n    function bnpFromInt(x) {\r\n        this.t = 1;\r\n        this.s = (x < 0) ? -1 : 0;\r\n        if (x > 0) {\r\n            this[0] = x\r\n        } else {\r\n            if (x < -1) {\r\n                this[0] = x + DV\r\n            } else {\r\n                this.t = 0\r\n            }\r\n        }\r\n    }\r\n\r\n    function nbv(i) {\r\n        var r = nbi();\r\n        r.fromInt(i);\r\n        return r\r\n    }\r\n\r\n    function bnpFromString(s, b) {\r\n        var k;\r\n        if (b == 16) {\r\n            k = 4\r\n        } else {\r\n            if (b == 8) {\r\n                k = 3\r\n            } else {\r\n                if (b == 256) {\r\n                    k = 8\r\n                } else {\r\n                    if (b == 2) {\r\n                        k = 1\r\n                    } else {\r\n                        if (b == 32) {\r\n                            k = 5\r\n                        } else {\r\n                            if (b == 4) {\r\n                                k = 2\r\n                            } else {\r\n                                this.fromRadix(s, b);\r\n                                return\r\n                            }\r\n                        }\r\n                    }\r\n                }\r\n            }\r\n        }\r\n        this.t = 0;\r\n        this.s = 0;\r\n        var i = s.length, mi = false, sh = 0;\r\n        while (--i >= 0) {\r\n            var x = (k == 8) ? s[i] & 255 : intAt(s, i);\r\n            if (x < 0) {\r\n                if (s.charAt(i) == "-") {\r\n                    mi = true\r\n                }\r\n                continue\r\n            }\r\n            mi = false;\r\n            if (sh == 0) {\r\n                this[this.t++] = x\r\n            } else {\r\n                if (sh + k > this.DB) {\r\n                    this[this.t - 1] |= (x & ((1 << (this.DB - sh)) - 1)) << sh;\r\n                    this[this.t++] = (x >> (this.DB - sh))\r\n                } else {\r\n                    this[this.t - 1] |= x << sh\r\n                }\r\n            }\r\n            sh += k;\r\n            if (sh >= this.DB) {\r\n                sh -= this.DB\r\n            }\r\n        }\r\n        if (k == 8 && (s[0] & 128) != 0) {\r\n            this.s = -1;\r\n            if (sh > 0) {\r\n                this[this.t - 1] |= ((1 << (this.DB - sh)) - 1) << sh\r\n            }\r\n        }\r\n        this.clamp();\r\n        if (mi) {\r\n            BigInteger.ZERO.subTo(this, this)\r\n        }\r\n    }\r\n\r\n    function bnpClamp() {\r\n        var c = this.s & this.DM;\r\n        while (this.t > 0 && this[this.t - 1] == c) {\r\n            --this.t\r\n        }\r\n    }\r\n\r\n    function bnToString(b) {\r\n        if (this.s < 0) {\r\n            return "-" + this.negate().toString(b)\r\n        }\r\n        var k;\r\n        if (b == 16) {\r\n            k = 4\r\n        } else {\r\n            if (b == 8) {\r\n                k = 3\r\n            } else {\r\n                if (b == 2) {\r\n                    k = 1\r\n                } else {\r\n                    if (b == 32) {\r\n                        k = 5\r\n                    } else {\r\n                        if (b == 4) {\r\n                            k = 2\r\n                        } else {\r\n                            return this.toRadix(b)\r\n                        }\r\n                    }\r\n                }\r\n            }\r\n        }\r\n        var km = (1 << k) - 1, d, m = false, r = "", i = this.t;\r\n        var p = this.DB - (i * this.DB) % k;\r\n        if (i-- > 0) {\r\n            if (p < this.DB && (d = this[i] >> p) > 0) {\r\n                m = true;\r\n                r = int2char(d)\r\n            }\r\n            while (i >= 0) {\r\n                if (p < k) {\r\n                    d = (this[i] & ((1 << p) - 1)) << (k - p);\r\n                    d |= this[--i] >> (p += this.DB - k)\r\n                } else {\r\n                    d = (this[i] >> (p -= k)) & km;\r\n                    if (p <= 0) {\r\n                        p += this.DB;\r\n                        --i\r\n                    }\r\n                }\r\n                if (d > 0) {\r\n                    m = true\r\n                }\r\n                if (m) {\r\n                    r += int2char(d)\r\n                }\r\n            }\r\n        }\r\n        return m ? r : "0"\r\n    }\r\n\r\n    function bnNegate() {\r\n        var r = nbi();\r\n        BigInteger.ZERO.subTo(this, r);\r\n        return r\r\n    }\r\n\r\n    function bnAbs() {\r\n        return (this.s < 0) ? this.negate() : this\r\n    }\r\n\r\n    function bnCompareTo(a) {\r\n        var r = this.s - a.s;\r\n        if (r != 0) {\r\n            return r\r\n        }\r\n        var i = this.t;\r\n        r = i - a.t;\r\n        if (r != 0) {\r\n            return (this.s < 0) ? -r : r\r\n        }\r\n        while (--i >= 0) {\r\n            if ((r = this[i] - a[i]) != 0) {\r\n                return r\r\n            }\r\n        }\r\n        return 0\r\n    }\r\n\r\n    function nbits(x) {\r\n        var r = 1, t;\r\n        if ((t = x >>> 16) != 0) {\r\n            x = t;\r\n            r += 16\r\n        }\r\n        if ((t = x >> 8) != 0) {\r\n            x = t;\r\n            r += 8\r\n        }\r\n        if ((t = x >> 4) != 0) {\r\n            x = t;\r\n            r += 4\r\n        }\r\n        if ((t = x >> 2) != 0) {\r\n            x = t;\r\n            r += 2\r\n        }\r\n        if ((t = x >> 1) != 0) {\r\n            x = t;\r\n            r += 1\r\n        }\r\n        return r\r\n    }\r\n\r\n    function bnBitLength() {\r\n        if (this.t <= 0) {\r\n            return 0\r\n        }\r\n        return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ (this.s & this.DM))\r\n    }\r\n\r\n    function bnpDLShiftTo(n, r) {\r\n        var i;\r\n        for (i = this.t - 1; i >= 0; --i) {\r\n            r[i + n] = this[i]\r\n        }\r\n        for (i = n - 1; i >= 0; --i) {\r\n            r[i] = 0\r\n        }\r\n        r.t = this.t + n;\r\n        r.s = this.s\r\n    }\r\n\r\n    function bnpDRShiftTo(n, r) {\r\n        for (var i = n; i < this.t; ++i) {\r\n            r[i - n] = this[i]\r\n        }\r\n        r.t = Math.max(this.t - n, 0);\r\n        r.s = this.s\r\n    }\r\n\r\n    function bnpLShiftTo(n, r) {\r\n        var bs = n % this.DB;\r\n        var cbs = this.DB - bs;\r\n        var bm = (1 << cbs) - 1;\r\n        var ds = Math.floor(n / this.DB), c = (this.s << bs) & this.DM, i;\r\n        for (i = this.t - 1; i >= 0; --i) {\r\n            r[i + ds + 1] = (this[i] >> cbs) | c;\r\n            c = (this[i] & bm) << bs\r\n        }\r\n        for (i = ds - 1; i >= 0; --i) {\r\n            r[i] = 0\r\n        }\r\n        r[ds] = c;\r\n        r.t = this.t + ds + 1;\r\n        r.s = this.s;\r\n        r.clamp()\r\n    }\r\n\r\n    function bnpRShiftTo(n, r) {\r\n        r.s = this.s;\r\n        var ds = Math.floor(n / this.DB);\r\n        if (ds >= this.t) {\r\n            r.t = 0;\r\n            return\r\n        }\r\n        var bs = n % this.DB;\r\n        var cbs = this.DB - bs;\r\n        var bm = (1 << bs) - 1;\r\n        r[0] = this[ds] >> bs;\r\n        for (var i = ds + 1; i < this.t; ++i) {\r\n            r[i - ds - 1] |= (this[i] & bm) << cbs;\r\n            r[i - ds] = this[i] >> bs\r\n        }\r\n        if (bs > 0) {\r\n            r[this.t - ds - 1] |= (this.s & bm) << cbs\r\n        }\r\n        r.t = this.t - ds;\r\n        r.clamp()\r\n    }\r\n\r\n    function bnpSubTo(a, r) {\r\n        var i = 0, c = 0, m = Math.min(a.t, this.t);\r\n        while (i < m) {\r\n            c += this[i] - a[i];\r\n            r[i++] = c & this.DM;\r\n            c >>= this.DB\r\n        }\r\n        if (a.t < this.t) {\r\n            c -= a.s;\r\n            while (i < this.t) {\r\n                c += this[i];\r\n                r[i++] = c & this.DM;\r\n                c >>= this.DB\r\n            }\r\n            c += this.s\r\n        } else {\r\n            c += this.s;\r\n            while (i < a.t) {\r\n                c -= a[i];\r\n                r[i++] = c & this.DM;\r\n                c >>= this.DB\r\n            }\r\n            c -= a.s\r\n        }\r\n        r.s = (c < 0) ? -1 : 0;\r\n        if (c < -1) {\r\n            r[i++] = this.DV + c\r\n        } else {\r\n            if (c > 0) {\r\n                r[i++] = c\r\n            }\r\n        }\r\n        r.t = i;\r\n        r.clamp()\r\n    }\r\n\r\n    function bnpMultiplyTo(a, r) {\r\n        var x = this.abs(), y = a.abs();\r\n        var i = x.t;\r\n        r.t = i + y.t;\r\n        while (--i >= 0) {\r\n            r[i] = 0\r\n        }\r\n        for (i = 0; i < y.t; ++i) {\r\n            r[i + x.t] = x.am(0, y[i], r, i, 0, x.t)\r\n        }\r\n        r.s = 0;\r\n        r.clamp();\r\n        if (this.s != a.s) {\r\n            BigInteger.ZERO.subTo(r, r)\r\n        }\r\n    }\r\n\r\n    function bnpSquareTo(r) {\r\n        var x = this.abs();\r\n        var i = r.t = 2 * x.t;\r\n        while (--i >= 0) {\r\n            r[i] = 0\r\n        }\r\n        for (i = 0; i < x.t - 1; ++i) {\r\n            var c = x.am(i, x[i], r, 2 * i, 0, 1);\r\n            if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {\r\n                r[i + x.t] -= x.DV;\r\n                r[i + x.t + 1] = 1\r\n            }\r\n        }\r\n        if (r.t > 0) {\r\n            r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1)\r\n        }\r\n        r.s = 0;\r\n        r.clamp()\r\n    }\r\n\r\n    function bnpDivRemTo(m, q, r) {\r\n        var pm = m.abs();\r\n        if (pm.t <= 0) {\r\n            return\r\n        }\r\n        var pt = this.abs();\r\n        if (pt.t < pm.t) {\r\n            if (q != null) {\r\n                q.fromInt(0)\r\n            }\r\n            if (r != null) {\r\n                this.copyTo(r)\r\n            }\r\n            return\r\n        }\r\n        if (r == null) {\r\n            r = nbi()\r\n        }\r\n        var y = nbi(), ts = this.s, ms = m.s;\r\n        var nsh = this.DB - nbits(pm[pm.t - 1]);\r\n        if (nsh > 0) {\r\n            pm.lShiftTo(nsh, y);\r\n            pt.lShiftTo(nsh, r)\r\n        } else {\r\n            pm.copyTo(y);\r\n            pt.copyTo(r)\r\n        }\r\n        var ys = y.t;\r\n        var y0 = y[ys - 1];\r\n        if (y0 == 0) {\r\n            return\r\n        }\r\n        var yt = y0 * (1 << this.F1) + ((ys > 1) ? y[ys - 2] >> this.F2 : 0);\r\n        var d1 = this.FV / yt, d2 = (1 << this.F1) / yt, e = 1 << this.F2;\r\n        var i = r.t, j = i - ys, t = (q == null) ? nbi() : q;\r\n        y.dlShiftTo(j, t);\r\n        if (r.compareTo(t) >= 0) {\r\n            r[r.t++] = 1;\r\n            r.subTo(t, r)\r\n        }\r\n        BigInteger.ONE.dlShiftTo(ys, t);\r\n        t.subTo(y, y);\r\n        while (y.t < ys) {\r\n            y[y.t++] = 0\r\n        }\r\n        while (--j >= 0) {\r\n            var qd = (r[--i] == y0) ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);\r\n            if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) {\r\n                y.dlShiftTo(j, t);\r\n                r.subTo(t, r);\r\n                while (r[i] < --qd) {\r\n                    r.subTo(t, r)\r\n                }\r\n            }\r\n        }\r\n        if (q != null) {\r\n            r.drShiftTo(ys, q);\r\n            if (ts != ms) {\r\n                BigInteger.ZERO.subTo(q, q)\r\n            }\r\n        }\r\n        r.t = ys;\r\n        r.clamp();\r\n        if (nsh > 0) {\r\n            r.rShiftTo(nsh, r)\r\n        }\r\n        if (ts < 0) {\r\n            BigInteger.ZERO.subTo(r, r)\r\n        }\r\n    }\r\n\r\n    function bnMod(a) {\r\n        var r = nbi();\r\n        this.abs().divRemTo(a, null, r);\r\n        if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {\r\n            a.subTo(r, r)\r\n        }\r\n        return r\r\n    }\r\n\r\n    function Classic(m) {\r\n        this.m = m\r\n    }\r\n\r\n    function cConvert(x) {\r\n        if (x.s < 0 || x.compareTo(this.m) >= 0) {\r\n            return x.mod(this.m)\r\n        } else {\r\n            return x\r\n        }\r\n    }\r\n\r\n    function cRevert(x) {\r\n        return x\r\n    }\r\n\r\n    function cReduce(x) {\r\n        x.divRemTo(this.m, null, x)\r\n    }\r\n\r\n    function cMulTo(x, y, r) {\r\n        x.multiplyTo(y, r);\r\n        this.reduce(r)\r\n    }\r\n\r\n    function cSqrTo(x, r) {\r\n        x.squareTo(r);\r\n        this.reduce(r)\r\n    }\r\n\r\n    Classic.prototype.convert = cConvert;\r\n    Classic.prototype.revert = cRevert;\r\n    Classic.prototype.reduce = cReduce;\r\n    Classic.prototype.mulTo = cMulTo;\r\n    Classic.prototype.sqrTo = cSqrTo;\r\n    function bnpInvDigit() {\r\n        if (this.t < 1) {\r\n            return 0\r\n        }\r\n        var x = this[0];\r\n        if ((x & 1) == 0) {\r\n            return 0\r\n        }\r\n        var y = x & 3;\r\n        y = (y * (2 - (x & 15) * y)) & 15;\r\n        y = (y * (2 - (x & 255) * y)) & 255;\r\n        y = (y * (2 - (((x & 65535) * y) & 65535))) & 65535;\r\n        y = (y * (2 - x * y % this.DV)) % this.DV;\r\n        return (y > 0) ? this.DV - y : -y\r\n    }\r\n\r\n    function Montgomery(m) {\r\n        this.m = m;\r\n        this.mp = m.invDigit();\r\n        this.mpl = this.mp & 32767;\r\n        this.mph = this.mp >> 15;\r\n        this.um = (1 << (m.DB - 15)) - 1;\r\n        this.mt2 = 2 * m.t\r\n    }\r\n\r\n    function montConvert(x) {\r\n        var r = nbi();\r\n        x.abs().dlShiftTo(this.m.t, r);\r\n        r.divRemTo(this.m, null, r);\r\n        if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {\r\n            this.m.subTo(r, r)\r\n        }\r\n        return r\r\n    }\r\n\r\n    function montRevert(x) {\r\n        var r = nbi();\r\n        x.copyTo(r);\r\n        this.reduce(r);\r\n        return r\r\n    }\r\n\r\n    function montReduce(x) {\r\n        while (x.t <= this.mt2) {\r\n            x[x.t++] = 0\r\n        }\r\n        for (var i = 0; i < this.m.t; ++i) {\r\n            var j = x[i] & 32767;\r\n            var u0 = (j * this.mpl + (((j * this.mph + (x[i] >> 15) * this.mpl) & this.um) << 15)) & x.DM;\r\n            j = i + this.m.t;\r\n            x[j] += this.m.am(0, u0, x, i, 0, this.m.t);\r\n            while (x[j] >= x.DV) {\r\n                x[j] -= x.DV;\r\n                x[++j]++\r\n            }\r\n        }\r\n        x.clamp();\r\n        x.drShiftTo(this.m.t, x);\r\n        if (x.compareTo(this.m) >= 0) {\r\n            x.subTo(this.m, x)\r\n        }\r\n    }\r\n\r\n    function montSqrTo(x, r) {\r\n        x.squareTo(r);\r\n        this.reduce(r)\r\n    }\r\n\r\n    function montMulTo(x, y, r) {\r\n        x.multiplyTo(y, r);\r\n        this.reduce(r)\r\n    }\r\n\r\n    Montgomery.prototype.convert = montConvert;\r\n    Montgomery.prototype.revert = montRevert;\r\n    Montgomery.prototype.reduce = montReduce;\r\n    Montgomery.prototype.mulTo = montMulTo;\r\n    Montgomery.prototype.sqrTo = montSqrTo;\r\n    function bnpIsEven() {\r\n        return ((this.t > 0) ? (this[0] & 1) : this.s) == 0\r\n    }\r\n\r\n    function bnpExp(e, z) {\r\n        if (e > 4294967295 || e < 1) {\r\n            return BigInteger.ONE\r\n        }\r\n        var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e) - 1;\r\n        g.copyTo(r);\r\n        while (--i >= 0) {\r\n            z.sqrTo(r, r2);\r\n            if ((e & (1 << i)) > 0) {\r\n                z.mulTo(r2, g, r)\r\n            } else {\r\n                var t = r;\r\n                r = r2;\r\n                r2 = t\r\n            }\r\n        }\r\n        return z.revert(r)\r\n    }\r\n\r\n    function bnModPowInt(e, m) {\r\n        var z;\r\n        if (e < 256 || m.isEven()) {\r\n            z = new Classic(m)\r\n        } else {\r\n            z = new Montgomery(m)\r\n        }\r\n        return this.exp(e, z)\r\n    }\r\n\r\n    BigInteger.prototype.copyTo = bnpCopyTo;\r\n    BigInteger.prototype.fromInt = bnpFromInt;\r\n    BigInteger.prototype.fromString = bnpFromString;\r\n    BigInteger.prototype.clamp = bnpClamp;\r\n    BigInteger.prototype.dlShiftTo = bnpDLShiftTo;\r\n    BigInteger.prototype.drShiftTo = bnpDRShiftTo;\r\n    BigInteger.prototype.lShiftTo = bnpLShiftTo;\r\n    BigInteger.prototype.rShiftTo = bnpRShiftTo;\r\n    BigInteger.prototype.subTo = bnpSubTo;\r\n    BigInteger.prototype.multiplyTo = bnpMultiplyTo;\r\n    BigInteger.prototype.squareTo = bnpSquareTo;\r\n    BigInteger.prototype.divRemTo = bnpDivRemTo;\r\n    BigInteger.prototype.invDigit = bnpInvDigit;\r\n    BigInteger.prototype.isEven = bnpIsEven;\r\n    BigInteger.prototype.exp = bnpExp;\r\n    BigInteger.prototype.toString = bnToString;\r\n    BigInteger.prototype.negate = bnNegate;\r\n    BigInteger.prototype.abs = bnAbs;\r\n    BigInteger.prototype.compareTo = bnCompareTo;\r\n    BigInteger.prototype.bitLength = bnBitLength;\r\n    BigInteger.prototype.mod = bnMod;\r\n    BigInteger.prototype.modPowInt = bnModPowInt;\r\n    BigInteger.ZERO = nbv(0);\r\n    BigInteger.ONE = nbv(1);\r\n\r\n    var passportPubKey = \'\';\r\n    var passportPubKeyIndex = \'00\';\r\n    var RSAEncrypt = function (input) {\r\n        if (!passportPubKey) {\r\n            return input;\r\n        }\r\n        var rsa = new RSAKeyPassPort();\r\n        rsa.setPublic(passportPubKey, "10001");\r\n        var res = rsa.encrypt(input);\r\n        if (res == null) {\r\n            return input;\r\n        }\r\n        return res\r\n    };\r\n\r\n    var Ck = function () {\r\n        var uniqueInstance;\r\n        var bd, html;\r\n        var touchStartTime;\r\n        var touchEndTime;\r\n        var pressTime;\r\n        var initTime;\r\n        var touchX;\r\n        var touchY;\r\n        var clinetH;\r\n        var clinetW;\r\n        var isStartScroll;\r\n        var scrollLastY;\r\n        var scrollStartY;\r\n        var scrollStartTime;\r\n        var scrollLastTime;\r\n        var scrollTotalTime;\r\n        var scrollDirection;\r\n        var scrollNum;\r\n        var scrollTotalChange;\r\n        var validDirection;\r\n        var imTimeSign;\r\n        var scrollBoundary = 10;\r\n        var numReg = /\\d+/;\r\n\r\n        function constructor() {\r\n            /**\r\n             * 机型判断\r\n             */\r\n            bd = document.body;\r\n            html = document.documentElement;\r\n            clinetH = html.clientHeight;\r\n            clinetW = html.clientWidth;\r\n            touchStartTime = -1;\r\n            touchEndTime = -1;\r\n            pressTime = -1;\r\n            touchX = -1;\r\n            touchY = -1;\r\n            scrollLastY = -1;\r\n            scrollStartY = -1;\r\n            scrollStartTime = -1;\r\n            scrollLastTime = -1;\r\n            scrollTotalTime = -1;\r\n            scrollDirection = \'none\';\r\n            scrollNum = -1;\r\n            scrollTotalChange = -1;\r\n            validDirection = \'none\';\r\n            initTime = new Date().getTime();\r\n            addListener();\r\n            return {\r\n                getCkValue: getCkValue,\r\n                clearCount: clearCount\r\n            };\r\n        }\r\n\r\n        /**\r\n         * 事件监听\r\n         */\r\n        function addListener() {\r\n            bd.addEventListener(\'touchstart\', onTouchStart, true);\r\n            bd.addEventListener(\'touchend\', onTouchEnd, true);\r\n            /**\r\n             * 如果是iOS系统通过 touchmove 模拟触发 scroll 事件\r\n             */\r\n            bd.addEventListener(\'touchmove\', onTouchMove, true);\r\n            window.addEventListener(\'scroll\', onScrollEvent, true);\r\n        }\r\n\r\n        /**\r\n         * 在触摸按下的时候,滚轮计算处理和记录按下时间和坐标\r\n         * @param  {Event} event\r\n         */\r\n        function onTouchStart(event) {\r\n            var touch = event.touches.item(0);\r\n            touchX = touch.pageX;\r\n            touchY = touch.pageY;\r\n            countScrollOnTouchStart();\r\n            touchStartTime = getEventTime(event);\r\n        }\r\n\r\n        function onTouchEnd(event) {\r\n            touchEndTime = getEventTime(event);\r\n            pressTime = touchEndTime - touchStartTime;\r\n        }\r\n\r\n        function onTouchMove(event) {\r\n            triggerScrollEventForIphone(event);\r\n        }\r\n\r\n        /**\r\n         * 为ios模拟scroll事件持续触发\r\n         * @param  {evnt} event\r\n         */\r\n        function triggerScrollEventForIphone(event) {\r\n            onScrollEvent(event);\r\n        }\r\n\r\n        function onScrollEvent(event) {\r\n            /**\r\n             * 标记开始滚动和开始坐标\r\n             */\r\n            if (!isStartScroll) {\r\n                isStartScroll = true;\r\n                scrollStartY = window.scrollY;\r\n            }\r\n\r\n            var nowScrollY = window.scrollY;\r\n            var scrollValue = Math.abs(nowScrollY - scrollLastY);\r\n            var nowDirection = getScrollDirection(scrollLastY, nowScrollY) || scrollDirection;\r\n\r\n            if (isValidScroll(scrollValue, nowDirection)) {\r\n                scrollLastTime = getEventTime(event);\r\n                if (validDirection === \'none\') {\r\n                    validDirection = scrollDirection;\r\n                    scrollStartTime = getEventTime(event);\r\n                }\r\n                if (validDirection !== scrollDirection) {\r\n                    scrollCount();\r\n                    scrollStartTime = getEventTime(event);\r\n                    validDirection = scrollDirection;\r\n                }\r\n            }\r\n\r\n            /**\r\n             * 记录下次使用值\r\n             */\r\n            scrollLastY = nowScrollY;\r\n        }\r\n\r\n        /**\r\n         * 以一次touchstart事件作为上一次完整scroll的结束，并计数\r\n         */\r\n        function countScrollOnTouchStart() {\r\n            if (isStartScroll && validDirection !== \'none\') {\r\n                scrollCount();\r\n                scrollTotalChange = 0;\r\n                isStartScroll = false;\r\n                scrollDirection = \'none\';\r\n            }\r\n        }\r\n\r\n        /**\r\n         * 是否是一次有效的滚动\r\n         * @param {int} scroll 滚动距离.\r\n         * @param {string} nowDirection 滚动方向.\r\n         * @return {boolen}\r\n         */\r\n        function isValidScroll(scrollValue, nowDirection) {\r\n            if (scrollDirection === \'none\') {\r\n                scrollDirection = nowDirection;\r\n            }\r\n\r\n            if (nowDirection !== scrollDirection) {\r\n                scrollDirection = nowDirection;\r\n                scrollTotalChange = 0;\r\n            } else {\r\n                scrollTotalChange += scrollValue;\r\n            }\r\n            return scrollTotalChange > scrollBoundary;\r\n        }\r\n\r\n        /**\r\n         * 获取滚动方向\r\n         * @param  {int} startY 开始滚动坐标Y.\r\n         * @param  {int} nowY 当前滚动坐标Y.\r\n         * @return {string} \'up\' or \'down\' 如果nowY 和 startY 相等，就返回false.\r\n         */\r\n        function getScrollDirection(startY, nowY) {\r\n            if (nowY > startY) {\r\n                return \'up\';\r\n            } else if (nowY < startY) {\r\n                return \'down\';\r\n            } else {\r\n                return false;\r\n            }\r\n        }\r\n\r\n        /**\r\n         * 滚动计数\r\n         * 记录滚动次数和滚动时间\r\n         */\r\n        function scrollCount() {\r\n            scrollNum === -1 && scrollNum++;\r\n            scrollNum++;\r\n            scrollTotalTime += scrollLastTime - scrollStartTime;\r\n            validDirection = \'none\';\r\n        }\r\n\r\n        /*\r\n         * 获取ck的键值\r\n         * 形如\r\n         * 0:value1,1:value2,2:value3\r\n         0 touchX x\r\n         1 touchY y\r\n         2 pressTime x\r\n         3 scrollNum y\r\n         4 version\r\n         5 clinetH\r\n         6 clinetW\r\n         7 eventTime 初始化ck到获取ck的时间间隔，单位 100毫秒\r\n         * */\r\n        function getCkValue() {\r\n            var eventTime = Math.floor((new Date().getTime() - initTime) / 100);\r\n            var keyList = {\r\n                \'0\': Math.ceil(touchX) || 0,\r\n                \'1\': Math.ceil(touchY) || 0,\r\n                \'2\': Math.round(pressTime) || 0,\r\n                \'3\': scrollNum,\r\n                \'4\': 1,\r\n                \'5\': clinetH,\r\n                \'6\': clinetW,\r\n                \'7\': eventTime\r\n            };\r\n            var value = [];\r\n            for (var i in keyList) {\r\n                if (keyList[i] > -1) {\r\n                    value.push(i + \':\' + keyList[i]);\r\n                }\r\n            }\r\n            value = value.join(\',\');\r\n            return value;\r\n        }\r\n\r\n        function clearCount() {\r\n            scrollNum = 0;\r\n            scrollTotalTime = 0;\r\n        }\r\n\r\n        /**\r\n         * 如果时间为0，产生date.time来替代，主要为了firefox 写的，Firefox的event.timeStamp都为0;\r\n         */\r\n        function getEventTime(event) {\r\n            if (event.timeStamp !== 0) {\r\n                return event.timeStamp;\r\n            } else {\r\n                var date = new Date();\r\n                return date.getTime();\r\n            }\r\n        }\r\n\r\n        return {\r\n            getInstance: function () {\r\n                if (!uniqueInstance) {\r\n                    uniqueInstance = constructor();\r\n                }\r\n                return uniqueInstance;\r\n            }\r\n        };\r\n    };\r\n    var ckInstance;\r\n    /*\r\n     * 暴露rsa加密，防止侦查，使用jesgoo的名字\r\n     * */\r\n    global.jesgoo = {\r\n        setPubKey: function (key, keyIndex) {\r\n            passportPubKey = key;\r\n            keyIndex >= 0 && (passportPubKeyIndex = keyIndex);\r\n        },\r\n        RSAEncrypt: RSAEncrypt,\r\n        triggerCK: function () {\r\n            return global.jesgoo.ckInstance = ckInstance = Ck().getInstance();\r\n        },\r\n        getCk: function () {\r\n            if (!ckInstance) return \'\';\r\n            var ckValue = ckInstance.getCkValue();\r\n            global.jesgoo.ckValue = ckValue;\r\n            ckValue = passportPubKeyIndex + RSAEncrypt(ckValue);\r\n            return ckValue;\r\n        }\r\n    };\r\n})(this);';
return __p;
});
_('rsa_key').templateCache(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='(function (jesgoo) {\r\n    if (!jesgoo) {\r\n        return;\r\n    }\r\n    /*\r\n     * rsa 加密的公钥\r\n     * */\r\n    // 1024 bit 最大限度加密116字符\r\n    //var passportPubKey = "B64306200B3CBF826A2DC8D249460E26E88789CB3728C55B3852A7AD2C92C1CFE5EFA98BD0AC37D908398709F830E63565844363EE8D4DA3F92F6D33694B4EAE65457A2088636E2FC97DE602F60E20BCA96BB445D8041F8674FCE88056A3F52ED543280FF60003B41BB78BAABB28D4AA40054A83A4800846F7A4D875CBC10851";\r\n    // jesgoo.setPubKey(passportPubKey, \'01\');\r\n    // 512 bit 最大限度加密63字符\r\n    var passportPubKey = "C751765F67613457DFC41A9840862663DD3C9F2A97D98D3AA38BB21A3F3B19B778A5367E162191FA190AAD5A77E3F3F201F5D123E802E6D7F68DEC18CC630E03";\r\n    jesgoo.setPubKey(passportPubKey, \'02\');\r\n    // 256 bit 最大限度加密31字符\r\n    //var passportPubKey = "FE7C1FA60C9097849A976B0F8632D599068BBCFFCF7B73B218A429BB708D8A63";\r\n    /*\r\n     * 为需要的url增加ck\r\n     * */\r\n    //console.log(jesgoo.getCk());\r\n})(this.jesgoo);';
return __p;
});
_('rsa_monitor').templateCache(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='(function (jesgoo) {\r\n    var runCount = 0;\r\n    var hasJesgoo = 0;\r\n    var runner = function () {\r\n        if (jesgoo && !hasJesgoo) {\r\n            jesgoo.triggerCK();\r\n            hasJesgoo = 1;\r\n        }\r\n        if (hasJesgoo) {\r\n            var list = [\r\n                jesgoo.monitorID,\r\n                \'jesgoo-link\',\r\n                \'jg-link\'\r\n            ], $a;\r\n            for (var i = 0; i < list.length; i+=1) {\r\n                $a = document.getElementById(list[i]);\r\n                if ($a) break;\r\n            }\r\n        }\r\n        if (!$a) {\r\n            runCount += 1;\r\n            setTimeout(runner, 25);\r\n        } else {\r\n            $a.onclick = (function (fn) {\r\n                return function () {\r\n                    var ckString = \'.\' + jesgoo.getCk();\r\n                    if (jesgoo.ckValue) {\r\n                        $a.href += ckString;\r\n                        $a.onclick = null;\r\n                    }\r\n                    return fn && fn.apply(this, arguments);\r\n                }\r\n            })($a.onclick);\r\n        }\r\n    };\r\n    runner();\r\n})(this.jesgoo);';
return __p;
});
_('text_icon').templateCache(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+=''+
((__t=(_.templateList('base_head', data)))==null?'':__t)+
'\n<style>\n.icon-area img {\nheight: auto;\nwidth: auto;\nmax-width: 100%;\nmax-height: 100%;\n}\n.text-area {\noverflow: hidden;\n}\n.text-area .jg-description,\n.text-area .jg-title {\noverflow: hidden;\nwhite-space: nowrap;\ntext-overflow: ellipsis;\n}\n.jg-banner {\n'+
((__t=(data.content.bannerStyle))==null?'':__t)+
'\n}\n.icon-area {\n'+
((__t=(data.layout.iconArea))==null?'':__t)+
'\n'+
((__t=(data.content.iconAreaStyle))==null?'':__t)+
'\n}\n.icon-area img{\n'+
((__t=(data.content.iconStyle))==null?'':__t)+
'\n}\n.btn-area {\n'+
((__t=(data.layout.btnArea))==null?'':__t)+
'\n'+
((__t=(data.content.btnAreaStyle))==null?'':__t)+
'\n}\n.btn-area .jg-btn:before {\n'+
((__t=(data.content.btnContentStyle))==null?'':__t)+
'\n}\n.text-area {\n'+
((__t=(data.layout.textArea))==null?'':__t)+
'\n'+
((__t=(data.content.textAreaStyle))==null?'':__t)+
'\n}\n.no-image .text-area {\n'+
((__t=(data.layout.noIcon))==null?'':__t)+
'\n}\n.text-area .text-container {\n'+
((__t=(data.content.textContainerStyle))==null?'':__t)+
'\n}\n.text-area .jg-title {\n'+
((__t=(data.content.jgTitleStyle))==null?'':__t)+
'\n}\n.text-area .jg-title .text {\n'+
((__t=(data.content.jgTitleTextStyle))==null?'':__t)+
'\n}\n.text-area .jg-description {\n'+
((__t=(data.content.jgDescriptionStyle))==null?'':__t)+
'\n}\n.text-area .jg-description .text {\n'+
((__t=(data.content.jgDescriptionTextStyle))==null?'':__t)+
'\n}\n'+
((__t=(data.content.animation))==null?'':__t)+
'\n</style>\n<a id="jg-link" class="jg-banner jg-text-icon layout-area" href="<\\\\%=data.ClickUrl%\\\\>" target="_blank">\n    ';

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
((__t=(_.templateList('impression_monitor', data)))==null?'':__t)+
'\n'+
((__t=(_.templateList('base_foot', data)))==null?'':__t)+
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