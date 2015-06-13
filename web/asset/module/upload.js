/**
 * @file Generated by er-sync, module
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Mon Dec 02 2013 15:21:47 GMT+0800 (中国标准时间)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 * 功能型函数集合
 * shortcut mf.m.utils
 */
(function (exports, module) {

    /**
     * 默认上传地址
     * @const
     * @type {string}
     */
    var DEFAULT_ACTION = '/user/uploadFile.json';

    /**
     * 获取文件上传唯一ID
     * @return {string}
     */
    var getUniqueID = (function () {
        var count = 1;
        return function () {
            return '_uploadFileIframe' + (count++);
        };
    })();

    /**
     * 文件上传控件
     * 支持 chrome, firefox, ie 9 +
     * @param {Object=} opt 参看init
     * @public
     */
    var Upload = function (opt) {
        opt = opt || {};
        this.init(opt);
    };

    /**
     * 初始化参数
     * @param {Object=} opt
     *   opt.action {string=} 上传地址
     *   opt.multiple {boolean=false} 是否支持单次多文件上传
     *   opt.name {string=upload} 指定上传文件参数名
     *   opt.param {Object=} 上传时需额外提交的参数
     *     {
     *       key1: value1,
     *       key2: value2
     *     }
     * @public
     */
    Upload.prototype.init = function (opt) {
        opt = opt || {};
        this.action = opt.action || DEFAULT_ACTION;
        this.multiple = 'multiple' in opt ? opt.multiple : !!this.multiple;
        this.name = opt.name || 'upload';
        this.param = opt.param || {};
        this._ready();
        return this;
    };

    /**
     * 准备上传控件，方便下次上传
     * @protected
     */
    Upload.prototype._ready = function () {
        this._renew();
        this._createControl();
    };

    /**
     * 创建上传控件
     * @protected
     */
    Upload.prototype._createControl = function () {
        var me = this;
        var uniqueID = getUniqueID();
        if (!me._iframe) {
            me._iframe = $('<iframe/>', {
                id: uniqueID,
                name: uniqueID,
                css: {
                    display: 'none'
                }
            }).appendTo('body');
        }
        if (!me._form) {
            me._form = $('<form/>', {
                css: {
                    display: 'none'
                }
            });
            me._form.prop('target', uniqueID);
            me._form.appendTo('body');
            me._form.prop('method', 'post');
            me._form.prop('action', this.action);
            me._form.prop('enctype', 'multipart/form-data');
        }
        if (!me._input) {
            me._input = $('<input/>', {
                type: 'file',
                name: me.name
            }).appendTo(me._form);
            me._input.prop('multiple', me.multiple);
        }
        if (!me._paramHiddents) {
            me._paramHiddents = {};
            $.each(me.param, function (i, n) {
                me.addParam(i, n);
            });
        }
        me._input[0].onchange = function () {
            if (me._start) {
                me._start();
            }
            me._iframe[0].onload = function () {
                var result = me._iframe[0].contentWindow
                    .document.body.innerText, data;
                me._iframe[0].onload = null;
                try {
                    data = JSON.parse(result);
                }
                catch (e) {
                    data = {
                        success: false,
                        model: {
                            formError: {}
                        }
                    };
                    data.message = data.model.formError[me.name] = result
                        || '网络传输错误，请稍候重试。'
                        + '若多次出现此问题，请联系管理员';
                }
                if (me._complete) {
                    me._complete(data);
                }
                setTimeout(function () {
                    me._ready();
                }, 0);
            };
            me._form[0].submit();
        };
    };

    /**
     * 开启上传
     * @param {Object=} opt 上传参数
     *   start {function=} 上传前的回调，若不指定则使用控件的start
     *   complete {function=} 上传完成的回调，若不指定则使用控件的complete
     * @public
     */
    Upload.prototype.upload = function (opt) {
        opt = opt || {};
        if (opt.start) {
            this._start = opt.start;
        } else if (this.start) {
            this._start = this.start;
        }
        if (opt.complete) {
            this._complete = opt.complete;
        } else if (this.complete) {
            this._complete = this.complete;
        }
        this._input[0].click();
    };

    /**
     * 文件上传前的回调
     * @private
     */
    Upload.prototype._start = function () {
    };
    
    /**
     * 文件上传前的回调
     * 可覆盖
     * @public
     */
    Upload.prototype.start = function () {
    };

    /**
     * 文件上传完成后的回调
     * @private
     */
    Upload.prototype._complete = function () {
    };

    /**
     * 文件上传完成后的回调
     * 可覆盖
     * @public
     * @param {Object} result 上传成功后返回的JSON值
     */
    Upload.prototype.complete = function (result) {
    };

    /**
     * 增加传递参数
     * @public
     * @param {string} name 参数名
     * @param {string|number} value 参数值
     * @return {Uploade}
     */
    Upload.prototype.addParam = function (name, value) {
        this._paramHiddents[name] = $('<input/>', {
            type: 'hidden',
            name: name,
            value: value
        }).appendTo(this._form);
        return this;
    };

    /**
     * 移除参数
     * @public
     * @param {string} name 参数名
     * @return {Uploade}
     */
    Upload.prototype.removeParam = function (name) {
        this._paramHiddents[name] && this._paramHiddents[name].remove();
        return this;
    };

    /**
     * 重置上传控件
     * @private
     */
    Upload.prototype._renew = function () {
        this._input = null;
        this._paramHiddents = null;
        this._form && this._form.remove();
        this._form = null;
        this._iframe && this._iframe.remove();
        this._iframe = null;
    };

    /**
     * 销毁上传控件
     * @public
     */
    Upload.prototype.dispose = function () {
        this._renew();
        this.start = null;
        this._start = null;
        this.complete = null;
        this._complete = null;
        this.param = null;
    };

    module.exports = exports.Upload = Upload;
})(mf && mf.m || exports || {}, mf || module);