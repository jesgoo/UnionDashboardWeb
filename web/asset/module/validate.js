/**
 * @file
 * @author Jefferson<dengyijun@baidu.com>
 * @date Fri Dec 07 2012 13:40:38 GMT+0800 (中国标准时间)
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 */

(function(exports, module) {
    /**
     * 表单元素校验的组件
     */
    var validate = function() {
        var that = {}; //this
        var registry = {}; //reg之后记录，unreg之后置空，key是esui controlId
        var info = {}; //错误报告信息，也用它写入dom innerHTML，key同上
        var errorDom = {}; //错误的dom innerHTML，key同上
        var binded = {}; //防止事件被重复绑定，key同上
        var model; //传回model，可以激发onmodelchange事件
        var CONST_REG = {
            email: /^\s*[a-zA-Z0-9_+.-]+\@([a-zA-Z0-9\-_]+\.)+[a-zA-Z0-9]{2,4}$/,
            phone: /^\s*[+＋]?([0-9０-９]+[-－])*[0-9０-９]+$/,
            float2: /^\s*[+-]?([1-9１-９][0-9０-９]*|[0０])(\.[0-9０-９]{1,2})?\s*$/, //最多只有两位小数
            float1: /^\s*[+-]?([1-9１-９][0-9０-９]*|[0０])(\.[0-9０-９])?\s*$/, //最多只有一位小数
            'float': /^\s*[+-]?([1-9１-９][0-9０-９]*|[0０])(\.[0-9０-９]+)?\s*$/ //最多只有一位小数
        };
        that.regexp = CONST_REG; //返回一个引用

        /**
         * 注入model
         * @param {er.Model} newModel
         */
        that.setModel = function(newModel) {
            model = newModel;
            if (!model || !model.set) model = null;
        };

        /**
         * 为key为id的registry注入第index条规则
         * @param {string} id
         * @param {object} rule
         * @param {number=} index
         */
        that.setRule = function(id, rule, index) {
            if (!id || !$.isPlainObject(rule)) return;
            if (registry[id]) registry[id][index || 0] = rule;
        };

        /**
         * 注册事件的通用函数
         * @param {string|HtmlElement} node Dom节点或节点id
         * @param {string} eventType 事件名称
         * @param {Function} handler 处理函数
         * @param {string=} scope 控制this指针
         */
        function on(node, eventType, handler, scope) {
            node = typeof node == 'string' ?
                document.getElementById(node) : node;
            scope = scope || node;
            if (document.all) {
                node.attachEvent("on" + eventType, function() {
                    handler.apply(scope, arguments);
                });
            }
            else {
                node.addEventListener(eventType, function() {
                    handler.apply(scope, arguments);
                }, false);
            }
        }

        /**
         * 给id，返回当前控件或dom input，以及它的content
         * @param {string} id esuiId或者domId
         */
        function getEsui(id) {
            var euiObj = esui.get(id);
            var eui, content;
            if (euiObj) {
                content = euiObj.getValue();
                if (content === euiObj.placeholder) content = '';
                eui = euiObj.main;
                if (euiObj.isChecked && !euiObj.isChecked()) {
                    content = '';
                }
            }
            else {
                eui = document.getElementById(id);
                if (!eui) return [null, '', null];
                content = (eui.type === 'text' || eui.type !== 'file')
                    ? eui.value.replace(/^\s+/, '').replace(/\s+$/, '') : '';
                if (content === eui.holder) content = '';
            }
            return [eui, content, euiObj];
        }

        /**
         * 注册一个domId的校验规则组
         * @param {Object} opt
         * @param {string} opt.id esuiId或者domI
         * @param {string=} opt.msgId 出错信息的显示domId
         * @param {Array<Object>} opt.rule 规则组
         */
        that.reg = function(opt) {
            var id = opt.id;
            if (!id || !$.isArray(opt.rule)) return;
            registry[id] = opt.rule;
            errorDom[id] = opt.msgId || (id + 'Error');
            var inp = getEsui(id)[0];
            var holderClass = 'ui-text-virtual';
            inp.holder = opt.placeholder || '';
            if (inp.value === '') {
                inp.value = inp.holder || '';
                baidu.dom.addClass(inp, holderClass);
            }
            if (inp.type !== 'file') {
                if (!binded[id]) {
                    on(inp, 'blur', function() {
                        if (inp.value === '') {
                            inp.value = inp.holder || '';
                            baidu.dom.addClass(inp, holderClass);
                        }
                        if (that.checkSingle(id)) {
                            var content = getEsui(id)[1];
                            if (model) model.set(id, content);
                            if (opt.callback) opt.callback(content);
                        }
                    });
                    on(inp, 'focus', function() {
                        if (inp.value === inp.holder) {
                            inp.value = '';
                            baidu.dom.removeClass(inp, holderClass);
                        }
                    });
                }
                else binded[id] = true;
            }
        };

        /**
         * 注册取消
         * @param {Object/string} opt
         */
        that.unreg = function(opt) {
            var id = opt;
            if ($.isPlainObject(opt)) id = opt.id;
            if (id) registry[id] = undefined;
        };

        that.getFullWidthLength = function(text, ignoreHTML) {
            var chinaReg = /^[\u4e00-\u9fa5]+$/;
            text = text || '';
            if (ignoreHTML) {
                text = text.replace(/<([a-z]+).*?>(.*?)<\/\1>/gi, '$2');
            }
            var i = text.length;
            var l = i;
            while (i--) {
                if (chinaReg.test(text[i])) l++;
            }
            return l;
        };

        /**
         * 校验某个domId，将各个规则的校验返回信息，放到info变量中
         * @param {string} id domId
         */
        that.validate = function(id) {
            var arr = registry[id];
            var opObj = getEsui(id);
            if (!arr || !$.isArray(arr)) return;
            var content = opObj[1];
            info[id] = [];
            for (var i = 0; i < arr.length; ++i) {
                var isFloat = CONST_REG['float'];
                var tpl = arr[i].tpl;
                if ({}.toString.call(tpl) === '[object Function]') {
                    var temp = tpl.call(opObj[2], content, that);
                    if (!(temp === true || temp === undefined)) {
                        info[id].push(temp || arr[i].msg);
                    }
                }
                else if (tpl === 'notNull') {
                    if (content === '') {
                        info[id].push(arr[i].msg || ('不能为空'));
                    }
                }
                else if (tpl === 'limitS') { //汉字也作为1个字符
                    if (content !== '') {
                        var max = arr[i].max || 9999;
                        var min = arr[i].min || 0;
                        var temp = [];
                        var lens = content.length;
                        if (lens > max) temp.push('字符数量超出上限' + max);
                        if (lens < min) temp.push('字符数量低于下限' + min);
                        if (temp.length > 0) {
                            info[id].push(arr[i].msg || temp.join('，'));
                        }
                    }
                }
                else if (tpl === 'limit') { //汉字作为2个字符检测
                    if (content !== '') {
                        var max = arr[i].max || 9999;
                        var min = arr[i].min || 0;
                        var temp = [];
                        var lens = that.getFullWidthLength(content);
                        if (lens > max) temp.push('字符数量超出上限' + max);
                        if (lens < min) temp.push('字符数量低于下限' + min);
                        if (temp.length > 0) {
                            info[id].push(arr[i].msg || temp.join('，'));
                        }
                    }
                }
                else if (tpl === 'gt') {
                    if (content !== '' && isFloat.test(content)) {
                        var target = arr[i].target;
                        var value = parseFloat(content);
                        if (!value && value !== 0 || value > target) {
                            info[id].push(arr[i].msg);
                        }
                    }
                }
                else if (tpl === 'lt') {
                    if (content !== '' && isFloat.test(content)) {
                        var target = arr[i].target;
                        var value = parseFloat(content);
                        if (!value && value !== 0 || value < target) {
                            info[id].push(arr[i].msg);
                        }
                    }
                }
                else if (tpl === 'regex') {
                    if (content !== '') {
                        var regx = arr[i].regx;
                        if ($.isArray(regx)) {
                            var op = arr[i].operator;
                            var bool = op === 'AND';
                            for (var rh = 0; rh < regx.length; ++rh) {
                                var nowBool = regx[rh].test(content);
                                if (op === 'OR' && nowBool) bool = true;
                                if (op === 'AND' && !nowBool) bool = false;
                            }
                            if (!bool) info[id].push(arr[i].msg);
                        }
                        else if (!regx.test(content)) info[id].push(arr[i].msg);
                    }
                }
                else if (tpl === 'email') {
                    if (content !== '') {
                        var regx = CONST_REG.email;
                        var max = arr[i].max || 1;
                        var emArr = [content];
                        if (max > 1) emArr = content.split(/[，,]/);
                        if (max < emArr.length) info[id].push(arr[i].msg);
                        else for (var yj = 0; yj < emArr.length; ++yj) {
                            if (!regx.test(emArr[yj])) {
                                info[id].push(arr[i].msg);
                                break;
                            }
                        }
                    }
                }
            }
            info[id] = info[id].join('，');
        };

        /**
         * 校验数组信息的获取
         * @param {string} id info中的key
         */
        that.getInfo = function(id) {
            return info[id];
        };

        /**
         * 每次校验结束后需要清空校验缓存信息数组
         */
        that.clear = function() {
            info = [];
        };

        /**
         * 将校验信息数组填入各个出错显示的innerHTML
         */
        that.result = function() {
            var b = true;
            var recordDiv;
            for (var attr in info) {
                var div = document.getElementById(errorDom[attr]);
                if (info[attr].length > 0) {
                    b = false;
                    div.innerHTML = info[attr];
                    //将比较前面的post错误定位显示
                    if (typeof recordDiv === 'undefined') {
                        recordDiv = div;
                        //div.scrollIntoView(); //体验下来感觉不好
                    }
                }
                else div.innerHTML = '';
            }
            info = [];
            return b;
        };

        /**
         * 支持单个input控件（blur）的校验
         * @param id domId
         */
        that.checkSingle = function(id) {
            info = [];
            that.validate(id);
            return that.result();
        };

        /**
         * 支持整个form表单提交的校验
         */
        that.check = function() {
            info = [];
            for (var attr in registry) that.validate(attr);
            return that.result();
        };
        return that;
    };
    exports.validate = validate;
})(mf && mf.m || exports || {}, mf || module);