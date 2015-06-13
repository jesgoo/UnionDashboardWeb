/**
 * @file 文件上传控件
 * @author Jefferson<dengyijun@baidu.com>
 * @date Fri Dec 07 2012 13:40:38 GMT+0800 (中国标准时间)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */

(function () {

    /**
     * 文件上传控件，页面中有一个form，里面各个file类型的input，支持异步上传
     * 将form的action设置为可配项，并将target定到某个hidden的iframe中
     * 轮询该iframe，直到得到返回值，回调参数有上传物料的url，支持图片预览功能
     */
    mf.Upload = function () {
        var pid = -1; //setInterval的pid，定时器轮询hidden iframe
        var fInterval = 1000;
        var formId = ''; //formId 缺省是myForm
        var frameOpt = {};
        //frameOpt.fetchId {string=} 去hidden iframe 中的某个id去取url 缺省空串
        //frameOpt.frameId {string=} 缺省是hiddenFrame
        //frameOpt.errorMsg {string=} 出错标记，默认failed

        var act = ''; //记下页面初始时的action，异步上传完成后设回
        var indId; //激发upload的dom id（一个页面中可能有多个file input）
        var eleArr = []; //file input数组，某次提交要disable其他所有input
        var callMap = {}; //回调函数map，根据indId作为key
        var styleMap = {};

        /**
         * 注册事件的通用函数
         * @param {string} node Dom节点或节点id
         * @param {string} eventType 事件名称
         * @param {Function} handler 处理函数
         * @param {string=} scope 控制this指针
         */
        function on(node, eventType, handler, scope) {
            node = typeof node == 'string' ?
                document.getElementById(node) : node;
            scope = scope || node;
            if (document.all) {
                node.attachEvent("on" + eventType, function () {
                    handler.apply(scope, arguments);
                });
            } else {
                node.addEventListener(eventType, function () {
                    handler.apply(scope, arguments);
                }, false);
            }
        }

        /**
         * 绑定单个domId的上传
         * @param {Object} idCfg
         * @param {string} idCfg.id domId
         * @param {string=} idCfg.effect 事件名，默认是change
         * @param {string=} idCfg.btnId 非change态的，click激发提交的btnId
         * @param {string} idCfg.action 提交该input时可配置的表单action
         * @param {Array=} idCfg.vali 各个校验规则，待扩展
         * @param {function=} idCfg.beforeSubmit 提交前的预处理
         */
        function bind(idCfg) {
            var id = idCfg.id || '';
            var ele = document.getElementById(id);
            var effect = idCfg.effect || 'change';
            var invoker;
            if (ele) {
                eleArr.push(ele);
                callMap[id] = idCfg.callback;
                //invoker是自己，则是文件的onchange；
                //否则可以是点击上传按钮激发，那invoker就是该按钮
                if (effect === 'change') {
                    invoker = ele;
                }
                else {
                    invoker = document.getElementById(idCfg.btnId);
                }

                if (invoker) {
                    on(invoker, effect, function () {
                        if (ele.value === '') {
                            return;
                        }
                        var tempV = vali(idCfg.vali || []);
                        if (tempV.result) {
                            //其他input都置为失效
                            for (var i = 0; i < eleArr.length; ++i) {
                                if (eleArr[i].id !== id) {
                                    eleArr[i].disabled = true;
                                }
                            }
                            if (idCfg.beforeSubmit) {
                                idCfg.beforeSubmit();
                            }
                            var fm = document.getElementById(formId);
                            //将form的action置为当前input的配置值
                            fm.action = idCfg.action || act;
                            var outId = location.search.match(
                                /outId=(\d+)(?=\&|$)/);
                            if (outId 
                                && !/outId=(\d+)(?=\&|$)/.test(fm.action)) {
                                fm.action += (fm.action.indexOf('?') >= 0
                                    ? '&' : '?')
                                    + 'outId=' + outId[1];
                            }
                            fm.submit();
                            indId = id;

                            mf.loading();
                            //开始轮询
                            pid = window.setInterval(fetchUrl, fInterval);
                        }
                        else {
                            errorMsg(id, tempV.msg);
                        }
                    });
                }
            }
        }

        /**
         * 校验流程
         * @param {Object} cfg 校验相关的配置项
         */
        function vali(cfg) {
            var msg = [];
            var result = true;
            //TODO 先正常返回，待扩展
            return {
                result: result,
                msg: msg.join('')
            };
        }

        /**
         * 上传后，进行轮询，成功则激发回调函数
         */
        function fetchUrl() {
            var f = document.getElementById(frameOpt.frameId);
            f = f.contentWindow.document;
            var fEle = f.getElementById(frameOpt.fetchId);
            var success = '';
            var callback = callMap[indId];
            if (fEle) {
                success = fEle.innerHTML;
            }
            else {
                success = f.body.innerHTML;
            }
            success = success.replace(/^\s+/, '').replace(/\s+$/, '');

            //hidden iframe中有了返回值
            if (success !== '') {
                //过滤hidden frame中的某些预期之外的标签
                success = success.replace(frameOpt.filter, '');
                var ind1 = success.indexOf('{');
                var ind2 = success.lastIndexOf('}');
                success = success.substring(ind1, ind2 + 1);

                //清掉hidden frame中的返回信息
                f.body.innerHTML = '';
                //清掉定时器的pid
                window.clearInterval(pid);
                mf.loaded();
                //将form的action重新置为预设值
                document.getElementById(formId).action = act;

                //pid置位，并将其他file类型input重新置为有效
                pid = -1;
                for (var i = 0; i < eleArr.length; ++i) {
                    if (eleArr[i].id !== indId) {
                        eleArr[i].disabled = false;
                    }
                }

                var jsobj;
                try {
                    jsobj = T.json.decode(success);
                }
                catch (e) {
                    console.log('catch ', e, success);
                }
                //判断是上传成功还是出错返回
                if (!jsobj || !jsobj.model) {
                    console.log(success, jsobj);
                    errorMsg(indId, '上传文件失败！请稍候再试' +
                        '或联系管理员解决。');
                    return;
                }
                jsobj = jsobj.model;
                var uurl = '';
                //判断是否已经session失效，若是则重定向
                if (jsobj.sessionTimeout) {
                    location.reload();
                }
                else if (jsobj.formError) {
                    var html = [];
                    var err = jsobj.formError;
                    for (var attr in err) {
                        html.push(err[attr]);
                    }
                    if (jsobj.lbsUpload) {
                        callback({ lbsUpload: html.join('，') });
                    } else {
                        if (jsobj.showDetail) {
                            var aTpl = '<a target="_blank" href="{1}">' +
                                '{0}</a>';
                            html.push(
                                mf.f(aTpl, '查看详情', jsobj.showDetail));
                        }
                        errorMsg(indId, html.join('，'));
                    }
                } else {
                    mf.uploadSucceed();
                    if (jsobj.file) {
                        uurl = jsobj.file;
                    }
                    errorMsg(indId, '');
                    if (jsobj.locations) { //lbs特殊情况
                        if (callback) {
                            callback(uurl, jsobj.locations);
                        }
                        return;
                    }
                }
                showLink(indId + 'Link', uurl);
                showView(indId + 'View', uurl === '');
                injectHidden('lastName_' + indId, uurl);
                if (callback && uurl !== '') {
                    callback(uurl, jsobj);
                }
            }
        }

        /**
         * 上传成功后，显示相关物料的链接
         * @param {string} id domId
         * @param {string} url href
         */
        function showLink(id, url) {
            var showLink = document.getElementById(id);
            if (showLink) {
                showLink.getElementsByTagName('a')[0].href = url;
                showLink.style.display = url === ''
                    ? 'none' : styleMap[indId];
            }
        }

        /**
         * 上传成功后，显示预览链接
         * @param {string} id domId
         * @param {boolean=} unshow 如果是true则不显示
         */
        function showView(id, unshow) {
            var showLink = document.getElementById(id);
            if (showLink) {
                showLink.style.display = unshow ? 'none' : styleMap[indId];
            }
        }

        /**
         * 上传成功后，将信息注入到hidden input
         * @param {string} id domId
         * @param {string} url href
         */
        function injectHidden(id, url) {
            var hidden = document.getElementById(id);
            if (hidden) {
                hidden.value = url;
            }
        }

        /**
         * 上传失败后，显示失败信息
         * @param {string} id domId
         * @param {string} msg innerHTML
         */
        function errorMsg(id, msg) {
            id = 'lastName_' + id + 'Error';
            var errorDiv = document.getElementById(id);
            if (errorDiv) {
                errorDiv.innerHTML = msg;
            }
        }

        /**
         * 为解决浏览器兼容性，所以隐藏file类型的input控件，用esui的button取代
         * @param {Object} idCfg
         */
        function hide(idCfg) {
            var id = idCfg.id;
            var btnId = idCfg.btnId || (idCfg.id + 'Upload');
            var btn = document.getElementById(btnId);
            var ele = document.getElementById(id);
            styleMap[id] = idCfg.style || 'block';
            if (btn) {
                if (document.all) {
                    ele.className = idCfg.className || 'myFile';
                    ele.hideFocus = true;
                } else {
                    ele.style.display = 'none';
                    on(btn, 'click', function () {
                        ele.click();
                    });
                }
                btn.style.display = styleMap[id];
            }
        }

        return {
            /**
             * 注册一个页面的所有file类型的input
             * @param {Object} cfg
             * @param {Array<Object>=} cfg.ids 相关input的id数组
             * @param {string=} cfg.action 整个页面表单原先的action
             * @param {string=} cfg.formId 表单的id
             * @param {Object=} cfg.frameOpt hiddenFrame的配置项
             * @param {Object=} cfg.info 和cfg.ids对应，适用于一次注册单个
             */
            reg: function (cfg) {
                var ids = cfg.ids || [];
                if (formId === '') {
                    formId = cfg.formId || 'myForm';
                }
                var fm = document.getElementById(formId);
                if (!fm) {
                    return;
                }
                if (act === '') {
                    act = cfg.action || fm.action;
                }

                if (!frameOpt.frameId) {
                    frameOpt = cfg.frameOpt || {
                        frameId: 'hiddenFrame',
                        fetchId: '',
                        errorMsg: 'failed',
                        filter: /<\/{0,1}[a-z]+>/g
                    };
                    if (!document.getElementById(frameOpt.frameId)) {
                        var myFrame = document.createElement("iframe");
                        myFrame.id = frameOpt.frameId;
                        myFrame.name = frameOpt.frameId;
                        myFrame.style.display = 'none';
                        document.body.appendChild(myFrame);
                    }
                }
                if (ids.length === 0) {
                    ids = [cfg.info];
                }
                for (var i = 0; i < ids.length; ++i) {
                    bind(ids[i]);
                    if (!(ids[i].hide)) {
                        hide(ids[i]);
                    }
                }
            }
        };
    };
})();