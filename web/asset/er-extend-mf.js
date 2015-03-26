/*
 * @file Mobads FE ER 扩展库
 */

(function () {
    /**
     * Action Extension
     *
     * @lends er.Action
     */
    var actionExtension = {

        /**
         * 获取表单的POST data
         * 用于参数自动收集
         *
         * 扩展：
         * input没有填写name属性时，可使用id替代
         *
         * @protected
         * @param {object} opt_inputList 控件数组
         * @param {object} opt_queryMap 参数表
         * @return {object}
         */
        getDataByForm: function (opt_inputList, opt_queryMap) {
            var action = this;
            var queryMap = opt_queryMap || action.INPUT_QUERY_MAP || {},
                inputList = opt_inputList || action.view.getInputList(),
                finished = {},
                uiAdapter = er.extend.ui.adapter,
                i, len,
                input,
                inputName,
                value,
            //queryString,
                data = {};

            //Jan 5th 2013
            //By Yijun，表单中的hidden input
            var hiddens = document.getElementsByTagName('input');
            for (i = 0, len = hiddens.length; i < len; ++i) {
                input = hiddens[i];
                if (input.type === 'hidden') {
                    inputName = input.name;
                    if (inputName) {
                        // 已拼接的参数不重复拼接
                        if (finished[ inputName ]) {
                            continue;
                        }
                        finished[ inputName ] = 1;
                        inputName = queryMap[ inputName ] || inputName;
                        data[ inputName ] = encodeURIComponent(input.value);
                    }
                }
                else if (/^_innerui/.test(input.id) && input.checked) {
                    // buttonselect 对应fieldName的表单提交赋值
                    inputName = input.name;
                    if (inputName && !/_innerui/.test(inputName)) {
                        inputName = queryMap[ inputName ] || inputName;
                        if (finished[ inputName ] 
                            && /^(\d+\|?)+$/.test(data[ inputName ])) {
                            data[ inputName ] += '|';
                        }
                        data[ inputName ] = (finished[ inputName ]
                            ? data[ inputName ]
                            : '')
                            + encodeURIComponent(input.value);
                        if (!finished[ inputName ]) {
                            finished[ inputName ] = 1;
                        }
                    }
                }
                else if (input.type === 'text' && !/\sui\s/i.test(input.outerHTML)) {
                    inputName = input.name;
                    if (inputName) {
                        // 已拼接的参数不重复拼接
                        if (finished[ inputName ]) {
                            continue;
                        }
                        finished[ inputName ] = 1;
                        inputName = queryMap[ inputName ] || inputName;
                        data[ inputName ] = encodeURIComponent(input.value);
                    }
                }

            }

            for (i = 0, len = inputList.length; i < len; ++i) {
                input = inputList[i];

                if (uiAdapter.isInput(input)
                    && !uiAdapter.isDisabled(input)
                    ) {
                    //填写name属性时，可使用id替代
                    inputName = uiAdapter.getInputName(input) || input.id;
                    if ('function' == typeof input.getQueryString) {
                        console.log('getDataByForm function', inputName);
                        // 拼接参数，传入data给控件自有拼接方式，函数添加data项即可
                        var queryString = input.getQueryString(data);
                    }
                    else if (inputName) {
                        console.log('getDataByForm', inputName);
                        // 已拼接的参数不重复拼接
                        if (finished[ inputName ]) {
                            continue;
                        }

                        // 记录拼接状态
                        finished[ inputName ] = 1;

                        // 读取参数名映射
                        inputName = queryMap[ inputName ] || inputName;

                        // 获取input值
                        if (uiAdapter.isInputBox(input)) {
                            //Dec 12th 2012
                            //By Yijun，可能有某个checkbox组中仅仅一个checkbox
                            value = input.getGroup().getValue();
                            if ($.isArray(value)) {
                                value = value.join(',');
                            }
                        }
                        else {
                            value = input.getValue();
                        }

                        // 拼接参数
                        data[inputName] = encodeURIComponent(value);
                    }
                }
            }

            return data;
        },

        /**
         * 表单页触发所有元素的验证
         *
         * @protected
         * @param {object} opt_inputList 控件数组
         * @return {boolean}
         */
        validateForm: function (opt_inputList) {
            var inputList = opt_inputList || this.view.getInputList(),
                uiAdapter = er.extend.ui.adapter,
                i, len, input, val,
                valid = true,
                action = this;

            for (i = 0, len = inputList.length; i < len; i++) {
                input = inputList[i];
                if (uiAdapter.isInput(input)
                    && !uiAdapter.isDisabled(input)) {
                    val = input.validate();
                    if (valid) { // 单个控件验证失败则失败
                        valid = val;
                    }
                }
            }
            return valid;
        },

        /**
         * 为表单页所有Input元素绑定验证
         * 请在onafterrender中调用此方法
         *
         * @protected
         * @param {object} opt_inputList 控件数组
         */
        validateBind: function (opt_inputList) {
            if (this.validateBind.__called) {//once
                return;
            }
            this.validateBind.__called = 1;

            var inputList = opt_inputList || this.view.getInputList(),
            //uiAdapter = er.extend.ui.adapter,
                i, len, input,
                action = this;

            for (i = 0, len = inputList.length; i < len; i++) {
                input = inputList[i];
                input.onblur = function () {
                    action.validateForm();
                }
            }
        }
    };

    er.Action.extend(actionExtension);

    mf.Action = function (opt) {
        er.Action.call(this, opt);
        //er.Action.apply(this, arguments);
    };

    //mf.Action.prototype = {
    //    // 你的扩展方法
    //};

    baidu.inherits(mf.Action, er.Action);

    er.Model.prototype.getQueryString = (function (fn) {
        return function (maps) {
            var me = this;
            mf.queryMapEncode(me, maps);
            return fn.call(me, maps);
        };
    })(er.Model.prototype.getQueryString);

    er.permission.isAllow = (function (fn) {
        var allowAnd = function (name) {
            name = name.split('&');
            var isAllow = true;
            for (var i = 0, l = name.length; i < l; i++) {
                isAllow = isAllow && fn(name[i]);
            }
            return isAllow;
        };
        var allowOr = function (name) {
            name = name.split('|');
            var isAllow = false;
            for (var i = 0, l = name.length; i < l; i++) {
                isAllow = isAllow || allowAnd(name[i]);
            }
            return isAllow;
        };
        return function (name) {
            name = name || '';
            var isAllow = allowOr(name);
            return isAllow;
        }
    })(er.permission.isAllow);
})();