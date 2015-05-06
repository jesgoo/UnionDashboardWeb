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
                    "value": "from {-webkit-transform:translateY(-2em) scale(0.3);;background: rgba(96, 203, 27,0.5);-webkit-box-shadow: 0 0 5px rgba(255, 255, 255, 0.3) inset, 0 0 3px rgba(220, 120, 200, 0.5);color: red; }"
                             + "25% {background: rgba(196, 203, 27,0.8);-webkit-box-shadow: 0 0 10px rgba(255, 155, 255, 0.5) inset, 0 0 8px rgba(120, 120, 200, 0.8);color: blue;}"
                             + "50% {-webkit-transform:scale(0.8);background: rgba(196, 203, 127,1);-webkit-box-shadow: 0 0 5px rgba(155, 255, 255, 0.3) inset, 0 0 3px rgba(220, 120, 100, 1);color: orange;}"
                             + "75% {background: rgba(196, 203, 27,0.8);-webkit-box-shadow: 0 0 10px rgba(255, 155, 255, 0.5) inset, 0 0 8px rgba(120, 120, 200, 0.8);color: black;}"
                             + "to {-webkit-transform:translateY(2em) scale(0.5);;background: rgba(96, 203, 27,0.5);-webkit-box-shadow: 0 0 5px rgba(255, 255, 255, 0.3) inset, 0 0 3px rgba(220, 120, 200, 0.5);color: green;}",
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