/**
 * @file Mobads业务前端库
 * @author xukai01
 */

///include debug.js

/**
 * Basic Console Compatibility
 */
console = window.console || {};
console.log = console.log || new Function();
console.debug = console.debug || new Function();
console.info = console.info || new Function();
console.warn = console.warn || new Function();
console.error = console.error || new Function();

/**
 * JSON Compatibility
 */
JSON = window.JSON || {
    stringify: T.json.stringify,
    parse: T.json.parse
};

/**
 * Mobads FE
 */
var mf = {
    /**
     * __DEBUG在debug.js中定义，调试模式开关
     * 调试模式下启用mock data
     *
     * @const
     */
    DEBUG: window.__DEBUG,

    /**
     * ER刷新区域
     *
     * @const
     */
    MAIN_ID: 'Main',

    /**
     * Header配置
     *
     * @const
     */
    HEADER_ID: 'Header',
    USERNAME_ID: 'UserName',
    NAV_ID: 'Nav',
    NAV1_ID: 'Nav1',
    NAV2_ID: 'Nav2',
    NAV1_CONF: '__nav1',
    NAV2_CONF: '__nav2',
    
    /**
     * model常用变量
     * @const
     */
    MODEL_FIELD: {
        'NEED_REFRESH': 'needRefresh',
        'NEW_DATA': 'newData'
    },
    /**
     * 通知栏配置
     *
     * @const
     */
    NOTICE_ID: 'Notice',

    /**
     * 默认分页栏信息
     *
     * @const
     */
    PAGER_MODEL: {
        pageSizes: [
            {name: "10行", value: 10},
            {name: "20行", value: 20},
            {name: "50行", value: 50},
            {name: "100行", value: 100}
        ],
        pageSize: 20
    },

    /**
     * 全局缓存，如有必须挂载window下的对象，可以转移至此处
     * ma的listLog使用了，可参照其model的实现方式
     *
     * @const
     */
    G: {},

    /**
     * 其他配置
     *
     * @const
     */
    DATE_FORMAT: 'yyyy-MM-dd',
    TIME_FORMAT: 'HH:mm:ss',
    DATE_TIME_FORMAT: 'yyyy-MM-dd HH:mm'
};

/**
 * mf模块容器，主要查看module.js文件和module文件夹
 * */
mf.m = mf.exports = {};

mf.f = $.format;
/**
 * 获取全局唯一的id
 *
 * @param {number} [opt_len] 默认为64位
 */
mf.getGUID = function (opt_len) {
    var len = opt_len || 64;
    return er._util.getUID(len);
};

/*
 * mf.msg
 * mf.loading
 * */
(function () {

    /**
     * 对话框，加了点延迟显示的逻辑
     *
     * @param {Object} opt
     */
    function dialog(opt) {
        //loading延时显示
        clearTimeout(loadingTimer);
        opt = opt || {};
        var content = opt.content || '';
        var hide = opt.hide || false;
        var animate = opt.animate || false;
        var width = opt.width || false;
        var bgColor = opt.bgColor || '#000';
        var opacity = typeof opt.opacity === 'number' ? opt.opacity : 0.7;

        var WRAPPER = '.screen-wrapper';
        var BG = '.screen-bg';
        var CONTENT = '.screen-content';
        var $wrapper = $(WRAPPER);
        if (!$wrapper.length) {
            $(mf.f([
                    '<div class="{0}">',
                    '<div class="{1}"></div>',
                    '<div class="{2}"></div>',
                    '</div>'
                ].join(''),
                WRAPPER.substr(1),
                BG.substr(1),
                CONTENT.substr(1))).appendTo($(document.body));
            $wrapper = $(WRAPPER);
        }
        if (opt.onhide) {
            dialog.onhide = opt.onhide;
        }
        // hide
        if (hide) {
            animate ? $wrapper.fadeOut('slow') : $wrapper.hide();
            dialog.onhide && dialog.onhide();
            dialog.onhide = null;
            return;
        }

        // show
        // FIXED 居中显示, screen-content 导致的
        var $content = $wrapper.find(CONTENT).html(content);
        var $bg = $wrapper.find(BG);
        var vp = getViewport();
        $bg.css('width', vp.width);
        $bg.css('height', vp.height);
        $bg.css('backgroundColor', bgColor);
        $bg.css('filter', mf.f('alpha(opacity = {0})', opacity * 100));
        $bg.css('-moz-opacity', opacity);
        $bg.css('opacity', opacity);
        $content.width($($content.children()[0]).width());
        $content.height($($content.children()[0]).height());
        $content.css('left', ($(window).width() - $content.width()) / 2);
        $content.css('top', ($(window).height() - $content.height()) / 3
                            + $(window).scrollTop());
        animate ? $wrapper.fadeIn() : $wrapper.show();
    }

    /**
     * 获取当前视口尺寸
     *
     * @see esui.Mask.repaintMask
     */
    function getViewport() {
        return {
            width: Math.max(document.documentElement.clientWidth,
                Math.max(document.body.scrollWidth,
                    document.documentElement.scrollWidth)),
            height: Math.max(document.documentElement.clientHeight,
                Math.max(document.body.scrollHeight,
                    document.documentElement.scrollHeight))
        };
    }

    var LOADING_CONTENT = [
        '<div class="screen-loading">',
        '<span class="screen-loading-img"></span>',
        '<span class="screen-loading-txt">正在读取数据，请稍候...</span>',
        '</div>'
    ].join('');
    var UPLOAD_SUCCEED = [
        '<div class="screen-loading">',
        '<span class="screen-loading-img"></span>',
        '<span class="screen-loading-txt"> {0}！ </span>',
        '</div>'
    ].join('');
    var MSG_CONTENT = [
        '<div class="screen-msg">',
        '<div class="screen-msg-txt">{0}</div>',
        '<div onclick="mf.hide()" class="ui-button skin-button-em">',
        '<div class="ui-button-label skin-button-em-label" > 关闭 </div>',
        '</div>',
        '</div>'
    ].join('');
    var TIP_CONTENT = [
        '<div class="screen-tip">',
        '<div class="screen-tip-#{titleClass}"></div>',
        '<div class="screen-tip-desc">#{msg}<br/>',
        '<div onclick="er.locator.redirect(\'#{href}\');mf.hide(1);" ',
        'class="ui-button skin-button-em">',
        '<div class="ui-button-label skin-button-em-label" > #{back} </div>',
        '</div>&nbsp;&nbsp;',
        '<div onclick="er.locator.redirect(\'#{href2}\', { force: true });mf.hide(1);" ',
        'class="ui-button #{btn2Class}">',
        '<div class="ui-button-label"> #{back2} </div>',
        '</div>',
        '</div>'
    ].join('');
    var PAGE_CONTENT = [
        '<div class="screen-page" style="width:#{width}px;height:#{height}px;">',
        '   <div class="screen-page-close"></div>',
        '   <iframe id="#{id}" src="#{src}" frameborder="0" scrolling="#{scrolling}"',
        '   style="width:#{width}px;height:#{height}px;"></iframe>',
        '</div>'
    ].join('');
    var LOADING_DELAY = 0; //TODO 可以调优，目前仍然是即时显示效果较好
    var loadingTimer = 0;

    /**
     * 启动页面loading
     *
     * @param {number=} [delay]
     */
    mf.loading = function (delay) {
        // 兼容数字 0
        delay = typeof delay === 'undefined' ? LOADING_DELAY : delay;
        var OPACITY = 0;
        if (delay > 0) {
            // loadingTimer && (clearTimeout(loadingTimer), loadingTimer=0); 
            // 这么做有必要吗？
            clearTimeout(loadingTimer);
            loadingTimer = setTimeout(function () {
                dialog({content: LOADING_CONTENT, opacity: OPACITY});
            }, delay);
        }
        else {
            dialog({content: LOADING_CONTENT, opacity: OPACITY});
        }
    };

    /**
     * 结束页面loading
     */
    mf.loaded = function () {
        mf.hide();
    };

    /**
     * 上传成功
     * @param {string=} txt 默认值为“文件上传成功”
     */
    mf.uploadSucceed = function (txt) {
        dialog({
            content: mf.f(UPLOAD_SUCCEED, txt || '文件上传成功'), opacity: 0
        });
        setTimeout(function () {
            mf.hide();
        }, 2000);
    };

    /**
     * 结束页面loading
     *
     * @param {boolean} [animate] 使用动画
     */
    mf.hide = function (animate) {
        dialog({hide: true, animate: animate});
    };

    /**
     * 全屏提示对话框
     *
     * @param {string} msg
     */
    mf.msg = function (msg, onhide) {
        dialog({content: mf.f(MSG_CONTENT, msg), onhide: onhide});
    };

    /**
     * 跳转至Tip page
     *
     * @param {Object} opt
     */
    mf.redirect2Tip = function (opt) {
        opt = opt || {};
        var error = !!opt.error;//强制转为boolean
        var msg = opt.msg || (error ? '您的操作已失败' : '您的操作已成功');
        var href = opt.href;
        var back = opt.back || '返回';
        var href2 = opt.href2 || '';
        var back2 = opt.back2 || '';

        dialog({
            content: mf.f(TIP_CONTENT, {
                msg: msg,
                href: href,
                back: back,
                href2: href2,
                back2: back2,
                titleClass: error ? 'error' : 'success',
                btn2Class: href2 ? '' : 'hide'
            }),
            animate: 0
        });
    };

    mf.reload = function (opt) {
        opt = opt || {};
        opt.shell = opt.shell || function () {
        };
        var loadURL = opt.loadURL || 'index.html';
        var id = 'screenPage' + (new Date()).getTime();
        var width = opt.width || 325;
        var height = opt.height || 270;
        var scrollLeft = opt.scrollLeft || 653;
        var scrollTop = opt.scrollTop || 439;
        var scrolling = opt.scrolling || 'yes';

        dialog({
            content: mf.f(PAGE_CONTENT, {
                id: id,
                src: loadURL,
                width: width,
                height: height,
                scrolling: scrolling
            }),
            animate: 0
        });
        opt.shell = (function (shell) {
            return function () {
                mf.hide();
                shell();
            };
        })(opt.shell);
        $('.screen-page-close').click(mf.hide);
        document.getElementById(id).onload = function () {
            try {
                this.contentWindow.scrollTo(scrollLeft, scrollTop);
            }
            catch (e) {
            }
        };
        return mf.screenPage.reg(id, opt.shell);
    };

    mf.screenPage = (function () {
        var regID = [];
        var l = 0;
        var reg = function (id, shell) {
            l = regID.push({id: id, shell: shell});
            return id;
        };
        var find = function (key, callback) {
            for (var i = 0; i < l; i++) {
                var screenWindow = document.getElementById(regID[i].id);
                if (screenWindow && screenWindow.contentWindow._key === key) {
                    l--;
                    return callback(regID.splice(i, 1)[0].shell);
                }
            }
            return null;
        };
        return {
            reg: reg,
            find: find
        };
    })();

    //这个名词用来纪念adservice
    var DP_ID = '__dataProxy';
    /**
     * 文件下载
     *
     * @param {string} url
     */
    mf.download = function (url) {
        url += (url.indexOf('?') >= 0 ? '&' : '?') + '_=' + (+new Date);
        var outId = location.search.match(/outId=(\d+)(?=\&|$)/);
        if (outId) {
            url += '&outId=' + outId[1];
        }
        var $dp = $('#' + DP_ID);
        if (!$dp.length) {
            var dp = document.createElement('iframe');
            dp.onload = function () {
                var err = '';
                try {
                    var dw = this.contentWindow;
                    try {
                        var value = dw.document.body.innerHTML;
                        if (value) {
                            value = JSON.parse(value);
                            if (value && value.model
                                && value.model.formError) {
                                mf.formErrorHandler(value.model);
                            }
                        }
                    }
                    catch (e) {
                    }
                }
                catch (e) {
                }
            };
            $dp = $(dp);
            $dp.attr('id', DP_ID);
            $dp.css('visibility', 'hidden');
            $dp.css('position', 'absolute');
            $dp.css('display', 'block');
            $dp.css('width', '1px');
            $dp.css('height', '1px');
            $dp.css('overflow', 'hidden');
            $dp.appendTo(document.body);
        }
        $dp.attr('src', url);
    };

    /**
     * 封装Model数据请求，处理mock data
     *
     * 根据mf.DEBUG重写url
     *
     * mock data规范：
     *   exports.request 请求参数定义
     *   exports.response 响应数据定义
     *
     * @inner
     * @param {string} url
     * @param {function(Object)} onSuccess
     * @param {Object=} [opt]
     */
    var ajax = function (url, onSuccess, opt) {
        opt = opt || {};
        var method = opt.post ? 'POST' : 'GET';
        var data = opt.data || {};
        var ourl = url;
        var ajax = arguments.callee;
        if (!ajax.__called) {
            ajax.__called = true;
            //global error handler
            /*$(document).ajaxError(function(event, request, settings) {
             console.log(event, request, settings);
             mf.msg('网络异常，请尝试稍后操作<br>'); //;+ JSON.stringify(event)
             });*/
        }
        var query = url.indexOf('?') >= 0 ? url.split('?')[1] : '';
        url = url.substring(0,
            url.indexOf('?') >= 0 ? url.indexOf('?') : url.length);
        var outId = location.search.match(/outId=([\w\d]+)(?=\&|$)/);
        if (outId) {
            query += '&outId=' + outId[1];
        }

        /**
         * 处理服务器返回的数据
         *
         * @param {Object} result 服务器返回json解析后的对象
         */
        var onData = function (result) {
            mf.loaded();
            var model = result.model;
            if (!result.success && !model.formError) {//非表单错误处理
                if (model.global) {
                    mf.msg(model.global);
                }
                else if (model.sessionTimeout) {
                    //回话超时登录机制。确保shell里的参数结构和mf.ajax参数结构一致
                    var obj = {
                        shell: (function (ajax, url, onSuccess, opt) {
                            return function () {
                                mf.loading();
                                ajax(url, onSuccess, opt);
                            };
                        })(ajax, ourl, onSuccess, opt)
                    };
                    var erPage = mf.getErPage();
                    if (mf.hao) {
                        
                    } else if (mf.hj) {
                        if (erPage === 'admin') {
                            location.href = '#/index/login~force=1';
                            return;
                        }
                    } else { //保证其他项目也能享用超时登出
                        mf.cookieKeyMap.authority && T.cookie.set(
                            mf.cookieKeyMap.authority, 0);
                        window.location.reload();
                    }
                    console.log('sessionTimeout', model.sessionTimeout, erPage, obj);
                    mf.reload(obj);
                }
                else if (model.redirect) {
                    er.locator.redirect(model.redirect);
                }
                else {
                    mf.msg('未知错误，请联系我们<br>');
                }
            }
            else {
                console.log('ajax model', model);
                $.isFunction(onSuccess) && onSuccess(model);
            }
        };

        var errorMsg = function (XMLHttpRequest, otherInfo) {
            console.log('%cajax Error entirely', 'color:red;font-size:150%;', XMLHttpRequest, otherInfo);
            mf.msg('网络异常，请尝试稍后操作<br>');
        };
        var sessionTimeoutModel = {
            success: false,
            model: {
                sessionTimeout: 1
            }
        };
        if (mf.DEBUG) {//mock data 
            // 兼容排序处理
            // url = mf.f('data{0}.js{1}{2}', url + (query.indexOf('order=desc') >= 0 
            // ? '-desc' : ''), query ? '?' : '', query);
            // ? & 简化处理，不影响调试，表纠结！
            url = mf.f('{0}.js?{1}', url.replace(/\.html$/i, ''), query);
            if (!/[\\\/]/.test(url.charAt(0))) {
                url = '/' + url;
            }
            for (var q in data) {
                url += mf.f('&{0}={1}', q, data[q]);
            }
            $.getScript('data' + url, function () {
                onData(window.exports.response);
            });
        } else {
            url = url + (/\.html$/i.test(url) ? '' : '.json')
                  + (query ? '?' : '') + query;
            $.ajax({
                url: url,
                type: method,
                data: data,
                cache: false,
                dataType: 'json',
                success: function (result, textStatus, XMLHttpRequest) {
                    console.log('success', textStatus, XMLHttpRequest);
                    if ($.isEmptyObject(result) || $.isEmpty(result)) {
                        onData.call(XMLHttpRequest, sessionTimeoutModel);
                    }
                    else {
                        onData.call(XMLHttpRequest, result);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    var text = XMLHttpRequest.responseText;
                    console.log('error', XMLHttpRequest)
                    if (/success/i.test(text)) {
                        try {
                            text = eval('(function () { return ' + text + ';})()');
                        }
                        catch (e) {
                            errorMsg(XMLHttpRequest, 'JSON parse Error');
                            return false;
                        }
                        onData.call(XMLHttpRequest, text);
                    }
                    else {
                        errorMsg(XMLHttpRequest);
                    }
                }
            });
        }
    };

    /**
     * Http GET
     *
     * @param {string} url
     * @param {function} onSuccess
     */
    mf.get = function (url, onSuccess) {
        ajax(url, onSuccess);
    };

    /**
     * Http POST
     *
     * @param {string} url
     * @param {Object} data POST data
     * @param {function} onSuccess
     */
    mf.post = function (url, data, onSuccess) {
        ajax(url, onSuccess, {post: true, data: data});
    };
})();

/**
 * 获取当前page
 *
 * @param {string=} [url]
 * @return {String}
 */
mf.getErPage = function (url) {
    url = url || location.href;
    var page = null;
    try {
        page = /\/(\w+?)\.html([?#]|$)/.exec(url);
        if (page) {
            page = page[1];
        } else {
            page = mf.defaultPage || 'index';
        }
    }
    catch (e) {
        console.log(e);
    }
    return page;
};

/**
 * 获取当前page
 *
 * @param {string=} [url]
 * @return {String}
 */
mf.getErPath = function (url) {
    url = url || location.href;
    var path = null;
    try {
        path = /#((\/\w*?)+)(~|$)/.exec(url)[1];
    }
    catch (e) {
        console.log(e);
    }
    return path;
};
/*
 * nav render
 * */
(function () {

    /**
     * 根据sitemap生成nav1
     * 需要支持静态页link
     *
     * @param {Object} opt
     */
    mf.updateNav1 = function (opt) {
        opt = opt || {};
        var sitemap = opt.sitemap || mf.MAP;
        var $nav = $('#' + (opt.nav || mf.NAV_ID));
        var $nav1 = $('#' + (opt.nav1 || mf.NAV1_ID));
        var highlight = opt.highlight || '';
        var hideNav = opt.hideNav || [];
        var HL_C = 'on';
        var PRE_NAV1 = '__nav1_';
        var HOVER_C = 'hover';
        var page = mf.getErPage();
        if (!$nav1.length) {
            return;
        }
        if (!mf.updateNav1.__called) {//create nav1
            mf.updateNav1.__called = 1;
            var tabs = sitemap[page][mf.NAV1_CONF];

            //ui
            var html = ['<ul>'];
            var TPL = [
                '<li id="__nav1_{3}">',
                '<sup class="l"></sup>',
                '<a class="nav-1-{3}" {0} href="{1}"><span>{2}</span></a>',
                '<sup class="r"></sup>',
                '</li>'
            ].join('');
            var user = mf.getUser();
            for (var k in tabs) {
                if (tabs.hasOwnProperty(k)) {
                    var tab = tabs[k];
                    if (tab.authority && !er.permission.isAllow(tab.authority)) {
                        continue;
                    }
                    var url = tab.url;
                    // 财务为例，如果该客户在秋实平台只消费技术服务资金池，则显示www2的财务标签
                    if (tab.urlExtSwitch && user[tab.urlExtSwitch] === '1') {
                        url = tab.urlExt;
                    }
                    url = mf.f(url, {userid: user.userid});
                    if ($.inArray(k, hideNav) === -1) { //隐藏相应标签
                        html.push(mf.f(TPL,
                            url.indexOf('#') === 0 ? '' : 'target="_blank"',
                            url, tab.label, k));
                    }
                }
            }
            html.push('</ul>');
            $nav1.html(html.join(''));

            //bind events
            $nav1.find('a').focus(function () {
                $(this).blur();
            });
            $nav1.find('li').mouseover(function () {
                $(this).hasClass(HL_C) || $(this).addClass(HOVER_C);
            }).mouseout(function () {
                $(this).removeClass(HOVER_C);
            });
        }
        if (highlight) {
            $nav1.find('li').removeClass(HL_C);
            $nav1.find(mf.f('li[id=__nav1_{0}]', highlight)).addClass(HL_C);
        }
        $nav.show();
    };

    var SEP = '<span class="nav-2-sep">{0}</span>';
    /**
     * 根据path和sitemap生成nav1
     * 需要支持静态页link
     *
     * @param {Object} [opt]
     * @param {boolean=} opt.hide
     * @param {string=} opt.sep
     * @param {string=} opt.nav2
     */
    mf.updateNav2 = function (opt) {
        opt = opt || {};
        var hide = opt.hide || false;
        var sep = mf.f(SEP, opt.sep) || '';
        var $nav2 = $('#' + (opt.nav2 || mf.NAV2_ID));
        if (opt.nav2Html) {//支持自定义nav2, ma创意添加过程会使用到
            $nav2.html(opt.nav2Html);
            return;
        }

        var sitemap = opt.sitemap || mf.MAP;
        var nav1s = sitemap[mf.getErPage()][mf.NAV1_CONF];
        var nav2s = sitemap[mf.getErPage()][mf.NAV2_CONF];
        var path = opt.path || mf.getErPath();
        // sitemap.js中__nav2可以不存在
        // tip页等没有nav
        if (!nav2s || !nav2s[path]) {
            return;
        }
        var nav2 = nav2s[path];
        mf.updateNav1({highlight: nav2.nav1});
        if (!$nav2.length) {
            return;
        }
        var html = [];
        var TLP1 = '<span class="nav-2-item"><b>{0}</b></span>';
        var TLP2 = '<span class="nav-2-item">'
                   + '<a href="{0}" class="{2}" {3}>{1}</a></span>';
        for (var k in nav2.list) {
            if (nav2.list.hasOwnProperty(k)) {
                var tab = nav2.list[k];
                var conf = er.controller.getActionConfigByPath(tab.nav2);
                if (conf && conf.authority && !er.permission.isAllow(conf.authority)) {
                    continue;
                }
                if (tab.parentPath) {
                    if (tab.nav2 === path) {
                        opt.path = tab.parentPath;
                        mf.updateNav2(opt);
                        return;
                    }
                } else {
                    var boo = tab.nav2.indexOf('/') === 0;
                    html.push(mf.f(TLP2, (boo ? '#' : '') + tab.nav2,
                        nav2s[tab.nav2].label,
                        (tab.parent ? ' nav-2-back ' : '') +
                        (tab.nav2 === path ? ' nav-2-current' : ''),
                        boo ? '' : 'target="_blank"'));
                }
            }
        }
        $nav2.html(html.join(sep));
        !html.length || hide || !nav1s[nav2.nav1] || nav1s[nav2.nav1].hideNav2
            ? $nav2.hide() : $nav2.show();
    };
})();
/*
 * mf.notice
 * */
(function () {

    var NOTICE_ID = '__mfNoticePanel';
    var NOTICE = mf.f('<div id="{0}" class="notice"></div>', NOTICE_ID);
    var NOTICE_CLOSE = '<a href="javascript:;" class="notice-close" ></a>';
    var NOTICE_ICON = '<span class="notice-icon" ></span>';
    /**
     * 设置页面级别的通知
     *
     * @param {object=} opt
     * @param {object=} opt.msg 消息
     * @param {function=} opt.onClose
     * @param {object=} opt.level 消息级别，默认为 'warn'，['error' 'warn' 'info']
     */
    mf.notice = function (opt) {
        var hide = opt.hide || false;
        var $notice = $('#' + NOTICE_ID);
        if (hide) {
            $notice.hide();
            return;
        }

        var msg = opt.msg || '';
        var html = [];
        html.push(NOTICE_ICON);
        html.push(msg);

        if (!$notice.length) {
            $(NOTICE).insertAfter('#' + mf.HEADER_ID);
            $notice = $('#' + NOTICE_ID);
            console.log($notice);
        }

        var onClose = $.isFunction(opt.onClose) ? opt.onClose : new Function();
        $notice.empty().html(html.join(''))
            .append($(NOTICE_CLOSE).click(function () {
                $notice.hide();
                onClose();
            })).show();
    };
})();
/**
 * Sugar for Action onenter
 */
mf.onenter = function (action, opt) {
    opt = opt || {};
    opt.sep = '|';
    mf.notice({hide: 1});
    mf.loading();
    var user = mf.getUser();
    console.log('user', user);
    if (user) {
        $('#' + mf.USERNAME_ID).html(user.name);
        if (action && action.model && action.model.set) {
            action.model.set('userInfo', user);
        }
    }
    mf.updateNav2(opt);
};
(function () {

    /**
     * 按照指定日偏移量，获取日期对象
     *
     * @param {number} offset 单位天，可以为负数
     * @return {Date}
     */
    mf.getDate = function (offset, date) {
        offset = offset || 0;
        newDate = date ? new Date(date) : new Date();
        newDate.setTime(newDate.getTime() + 86400 * 1000 * offset);
        return newDate;
    };

    /**
     * MultiCalendar默认可选范围的起点, mobads正式对外的那一天(2011-7-25)
     *
     * @type {Date}
     */
    var ORIGIN = new Date(2011, 7, 25);

    /**
     * MultiCalendar默认可选时间范围
     *
     * @type {Object}
     */
    mf.DEF_DATE_RANGE = {begin: ORIGIN, end: mf.getDate(0)};

    /**
     * MultiCalendar默认初始时间
     *
     * @type {Object}
     */
    mf.DEF_DATE_VALUE = {begin: mf.getDate(-6), end: mf.getDate(0)};

    /**
     * 获取Date对象日期部分的字符串
     *
     * @return {string}
     */
    mf.getDateString = function (date, format) {
        date = date || new Date();
        return T.date.format(date, format || mf.DATE_FORMAT);
    };
    /**
     * 获取Date对象日期部分与小时分钟部分的字符串
     *
     * @return {string}
     */
    mf.getDateTimeString = function (date, format) {
        date = date || new Date();
        return T.date.format(date, format || mf.DATE_TIME_FORMAT);
    };
})();
/**
 * 初始化Model
 *
 * @param {Object} opt
 * @param {er.Model.Loader} opt.loader
 * @param {Object} opt.model
 * @param {Array=} opt.fields
 */
mf.initModel = function (opt) {
    console.log('initModel', opt);
    var loader = opt.loader;
    var model = opt.model;
    //客户端model
    loader.set('pageSizes', mf.PAGER_MODEL.pageSizes);
    if (loader.get('from') && loader.get('to')) {
        loader.set('date', loader.get('from') + ',' + loader.get('to'));
    }

    //服务器Model，可覆盖客户端model
    var selectTxtMap = {
        App: '应用', ProductType: '广告', Channel: '渠道',
        DataType: '数据', OsType: '操作系统',
        Selfpromote: '推广', Status: '状态'
    };
    for (var k in model) {
        if (model.hasOwnProperty(k)) {
            var data = model[k];
            if (k.indexOf('_select') === 0 && $.isArray(data)) {
                var suffix = selectTxtMap[k.substring(7)] || '';
                data.unshift({name: '全部' + suffix, value: ''});
            }
            loader.set(k, data);
        }
    }

    var fields = opt.fields;
    if (fields) {
        loader.set('fields', $.isFunction(fields) ? fields(loader) : fields);
    }
    //扩展通用list model
    var list = model.list;
    if (list) {
        loader.set('list', list.data);
        loader.set('listTotalSize', list.totalSize);
        loader.set('total',
            Math.ceil(list.totalSize / loader.get('pageSize')));
    }

    //扩展report model
    var flashList = model.flashList;
    if (flashList) {
        flashList.data.length < 1 && flashList.data.push({
            "date": loader.get('from'),
            "showNum": 0,
            "clickNum": 0,
            "clickRate": 0,
            "avgClickCost": 0,
            "CPM": 0,
            "CPC": 0,
            "dldNum": 0,
            "totalCost": 0,
            "avgDldCost": 0
        });
        loader.set('flashList', flashList.data);
    }
};

/**
 * 初始化Table控件组合
 *
 * @param {Object} opt
 * @param {er.Action} opt.action
 * @param {er.Model} opt.model
 */
mf.initList = function (opt) {
    var action = opt.action;
    var model = action.model;
    var listId = opt.listId || 'list';
    var listOrderField = opt.listOrderField || 'order';
    var listOrderByField = opt.listOrderByField || 'orderBy';
    var pageSizeId = opt.pageSizeId || 'pageSize';
    var pageSizeField = opt.pageSizeField || 'pageSize';
    var pagerId = opt.pagerId || 'pager';
    var pagerField = opt.pagerField || 'page';
    var list = esui.get(listId);

    if (list) {
        list.onsort = function (field, order) {
            model.set(listOrderField, order);
            model.set(listOrderByField, field.field);
            mf.searchSubmit($.extend({}, opt, {clearSelf: 1}));
        };
        var scroll = $(list.main).parents('.list-table-scroll');
        var scrollTable = $('.scroll-wrapper', scroll)[0];
        var scrollBox = $('.scroll-box', scroll);
        var eventFlag = 'resize.scrollTable';
        $(window).unbind(eventFlag);
        if (scroll.length) {
            $(window).bind(eventFlag, function () {
                scrollBox.unbind('scroll.table');
                if (scrollTable.scrollWidth > scroll[0].scrollWidth) {
                    scrollBox.show();
                    $('div', scrollBox).width(scrollTable.scrollWidth);
                    scrollBox.bind('scroll.table', function () {
                        scrollTable.scrollLeft = this.scrollLeft;
                    });
                }
                else {
                    scrollBox.hide();
                }
            }).trigger(eventFlag);
        }
    }
    if (esui.get(pageSizeId)) {
        esui.get(pageSizeId).onchange = function (pageSize) {
            model.set(pageSizeField, pageSize);
            mf.searchSubmit($.extend({}, opt, {reset: this.startNumber}));
        };
    }
    if (esui.get(pagerId)) {
        esui.get(pagerId).onchange = function (page) {
            model.set(pagerField, page);
            mf.searchSubmit($.extend({}, opt));
        };
    }
};

/**
 * 初始化Multi Calendar
 *
 * @param {Object} opt
 * @param {er.Action} opt.action
 */
mf.initMultiCalendar = function (opt) {
    var action = opt.action;
    opt.reset = $.isEmpty(opt.reset) ? 1 : opt.reset;
    opt.clearSelf = $.isEmpty(opt.clearSelf) ? 1 : opt.clearSelf;
    var model = action.model;
    var base = model.BASE;
    if (esui.get('date')) {
        esui.get('date').onchange = function (value) {
            var from = baidu.date.format(value.begin, mf.DATE_FORMAT);
            var to = baidu.date.format(value.end, mf.DATE_FORMAT);
            model.set('from', from);
            model.set('to', to);
            if (base) {
                base.from = from;
                base.to = to;
            }
            mf.searchSubmit(opt);
        };
    }
};

/**
 * 初始化查询或搜索按钮
 *
 * @param {Object} opt
 * @param {er.Action} opt.action
 */
mf.initSearch = function (opt) {
    var action = opt.action;
    var searchId = opt.searchId || 'search';
    opt.word = $.isEmpty(opt.word) ? 1 : opt.word;
    opt.reset = $.isEmpty(opt.reset) ? 1 : opt.reset;
    opt.clearSelf = $.isEmpty(opt.clearSelf) ? 1 : opt.clearSelf;
    opt.onbefore = $.isFunction(opt.onbefore)
        ? opt.onbefore : function () {
    };
    var model = action.model;
    if (esui.get(searchId)) {
        esui.get(searchId).onclick = function () {
            if (opt.onbefore.call(this, opt) !== false) {
                mf.searchSubmit(opt);
            }
        };
    }
};

/**
 * 查询提交
 *
 * @param {Object} opt
 * @param {er.Action} opt.action
 * @param {boolean=} opt.reset
 */
mf.searchSubmit = function (opt) {
    opt = opt || {};
    var action = opt.action || {};
    var model = action.model || {};
    !$.isEmpty(opt.reset) && model.set('page', opt.reset);
    opt.word && (function (i) {
        var uiKey = opt.word == 1 ? 'keyWord' : opt.word;
        var word = esui.get(uiKey + i);
        if (word) {
            model.set(uiKey + i, word.getValue());
            i = i || 0;
            arguments.callee(++i);
        }
    })('');
    var base = model.BASE;
    if (base && base.cache) {
        opt.clearCache && (base.cache = {});
        if (opt.clearSelf) {
            delete base.cache[base.cacheId];
            var suffix = base.cacheId.split('_')[0];
            for (var i in base.cache) {
                if (i.indexOf(suffix) === 0) {
                    delete base.cache[i];
                }
            }
        }
    }
    mf.loading();
    if (opt.isSub) {
        mf.subActionRefresh(action, opt.queryMap);
    }
    else {
        mf.queryMapEncode(model, opt.queryMap);
        action.refresh(opt.queryMap || model.QUERY_MAP);
    }
};

mf.subActionRefresh = function (action, opt_queryMap) {
    var model = action.model;
    model.set('_loadDirectLy', true);
    for (var i in (opt_queryMap || {})) {
        model.set(i, opt_queryMap[i]);
    }
    action.__fireEvent('onenter');
    action.__fireEvent('onbeforeloadmodel');
    model.load.call(model, function () {
        action.__fireEvent('onafterloadmodel');
        action.view.repaint();
        action.__fireEvent('onafterrepaint');
        action.__fireEvent('onentercomplete');
    });
};

mf.queryMapEncode = function (model, maps) {
    console.log('queryMapEncode', model.QUERY_MAP)
    maps = maps || model.QUERY_MAP;
    for (var i in maps) {
        if (/^(.+)Encode$/.test(maps[i])) {
            model.set(maps[i], encodeURIComponent(model.get(RegExp.$1) || ''));
        }
    }
};

/**
 * 解析查询用的文本到keyword
 * */
mf.parseQueryMap = function (model, queryMap) {
    queryMap = queryMap || model.QUERY_MAP || {};
    $.each(queryMap, function (i, n) {
        var value = model.get(i);
        if (value) {
            if (/^(.+)Encode$/.test(n)) {
                model.set(RegExp.$1, /%[a-f0-9]{2}/i.test(value)
                    ? decodeURIComponent(value) : value);
            }
            else {
                model.set(n, value);
            }
        }
    });
};

/**
 * 各个站点及页面所用cookie键值的遍历
 * 在页面的page.js里根据需要取COOKIE_KEY_MAP里的值覆盖cookieKeyMap
 * */
mf.cookieKeyMap = {};
mf.COOKIE_KEY_MAP = {
    _default: {
        name: 'debug',
        userid: '9527',
        authority: '0',
        extFinance: '0',
        extAccount: '0'
    }
};

/**
 * 获取用户信息
 * cookie方案
 *
 * @return {Object}
 */
mf.getUser = function () {
    var keyMap = mf.cookieKeyMap;
    var user = {};
    for (var i in keyMap) {
        user[i] = T.cookie.get(keyMap[i]) || mf.COOKIE_KEY_MAP._default[i] || '';
    }
    return user;
};

var NAN = 'NaN';
/**
 * 统一处理数字输出，针对NaN和无穷的情况
 *
 * @param {number} flo 浮点数
 * @param {string} def 精度
 * @param {string=} dis 占位符
 * @return {string}
 */
mf.print = function (flo, def, dis) {
    dis = dis || NAN;
    return isNaN(flo) || Number.POSITIVE_INFINITY == flo ? NAN : def;
};

/**
 * 浮点数打印
 *
 * @param {number} flo 浮点数
 * @param {number=} [power] 精度
 * @return {string}
 */
mf.printFloat = function (flo, power) {
    power = power || 0;
    var f = flo + '';
    if (power <= 0) {//整型
        return Math.floor(flo) + '';
    }
    var pad = f.indexOf('.') < 0
        ? '' : f.substring(f.indexOf('.') + 1, f.indexOf('.') + 1 + power);
    var len = power - pad.length;
    for (var i = 0; i < len; ++i) {
        pad += '0';
    }
    return Math.floor(flo) + '.' + pad;
};

/**
 * 浮点数截断
 *
 * @param {number} flo 浮点数
 * @param {number=} [power] 截断精度
 * @return {number}
 */
mf.trimFloat = function (flo, power) {
    power = typeof power !== 'undefined' ? power : 2;
    return parseFloat(mf.printFloat(flo, power));
};

/**
 * 金额打印
 *
 * @param {number} num
 * @param {number=} [power] 精度
 * @param {string=} [unit] 货币单位
 * @return {string}
 */
mf.printMoney = function (num, power, unit) {
    power = typeof power !== 'undefined' ? power : 2;
    unit = unit || '￥';
    return unit + mf.printFloat(num, power);
};

/**
 * 2位小数四舍五入
 *
 * @param {number} num
 */
mf.printRound = function (num) {
    return Math.floor(num * 100 + 0.5) / 100;
};

/**
 * 截断冒泡
 */
mf.cancelBubble = function (e) {
    e = e || window.event;
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    else {
        e.cancelBubble = true;
    }
};

/**
 * FIXME 密码的输入框，坑的地方在于，本来想改input的type的，结果ie7不让改
 * @param {string} id
 * @param {string} showId
 */
mf.fixPassword = function (id, showId) {
    var ctrl = esui.get(id);
    var ele, showEle;
    if (ctrl) {
        ele = ctrl.main;
        showEle = esui.get(showId).main;
    }
    else {
        ele = document.getElementById(id);
        showEle = document.getElementById(showId);
    }
    $(showEle).bind('focus', function () {
        $(ele).show().focus();
        $(showEle).hide();
    });
    $(ele).bind('blur', function () {
        var val = ctrl ? ctrl.getValue() : ele.value;
        if (val === '') {
            $(showEle).show();
            $(ele).hide();
        }
    });
};

mf.isLoginPage = function () {
    return mf.getErPage() === 'index' ||
           mf.getErPage() === 'admin' && mf.getErPath() === '/index/login';
};

/**
 * 列表切换
 * 当切换的选项仅有一项时，可以理解为列表过滤。可以配置列表的选项属性。
 * TODO 拓展配置列表的多重属性，强化功能
 * @param {Object} opt
 *   box {string} 按钮ui id
 *   list {string} 列表ui id
 *   fields {Array.<Object>} 切换数据
 *   {id:'1', value: '0|1|2|3', text: '这一行', select: 'multi'}
 *   select {string} 切换选项状态 multi || single || null;
 */
mf.initSwitchTable = function (opt) {
    opt = opt || {};
    var switchBox = esui.get(opt.box);
    var switchTable = esui.get(opt.list);
    var switchOptions = opt.fields || [];
    var listField;
    if (switchOptions.length && switchBox && switchTable) {
        listField = switchTable.fields;
        switchBox.value = switchBox.datasource !== switchOptions
            ? switchOptions[0].id : switchBox.getValue()[0];
        switchBox.datasource = switchOptions;
        switchBox.onchange = function (values, value) {
            var option = mf.m.utils.deepSearch('', switchOptions, value, 'id');
            if (!option) {
                return false;
            }
            var field = [];
            $.each(option.value.split('|'), function (i, n) {
                n && field.push(listField[n]);
            });
            switchTable.fields = field;
            if ('select' in option) {
                switchTable.select = option.select;
            }
            switchTable.render();
        };
        switchBox.render();
    }
    if (switchBox) {
        if (switchOptions.length < 2) {
            $(switchBox.main).hide();
        } else {
            $(switchBox.main).show();
        }
    }
};
mf.switchStatusText = function (status, field) {
    return function (datas, success, failed) {
        var findFiled = this.field;
        $.each(success, function (i, n) {
            var valueIndex = mf.m.utils.indexOfArray(datas, n, findFiled);
            if (valueIndex > -1) {
                datas[valueIndex][field] = status;
            }
        });
    };
};

/**
 * 表单错误信息提示
 * 当返回的错误信息无具体ele显示时就弹框逐条显示
 * @param {Object} result 返回的信息
 *   formError {Array.<Object>} 错误信息
 *   reflect {Object=} 字段映射
 * @public
 */
mf.formErrorHandler = function (result, onok) {
    if (result.reflect) {
        mf.m.utils.reflect(result.formError, result.reflect);
    }
    esui.Dialog.alert({
        title: '操作失败',
        content: $.map(result.formError || [],
            function (n, i) {
                return i + ' : ' + n;
            }).join('<br />'),
        onok: onok
    });
};


mf.loadModelByBase = function (c, loader, f) {
    mf.loading();
    if (c.loaded) {
        mf.loaded();
        f(c.model);
    }
    else {
        loader.stop();
        mf.get(c.loaderSrc + (c.loaderSrc.indexOf('?') > -1 ? '&' : '?')
               + loader.getQueryString(c.queryMap
        ), function (model) {
            mf.loaded();
            if (model.formError) {
                mf.formErrorHandler(model);
                return false;
            }
            model.page = loader.get('page');
            model.pageSize = loader.get('pageSize');
            c.model = model;
            c.loaded = true;
            f(c.model);
            loader.start();
        });
    }
};

/*
 * 开启含有iframe的对话框
 */
mf.setPage = function (title, data, url, closeCallback) {
    var dlg = window.MaskDialog = esui.util.create('Dialog', {
        id: '__DialogAlert' + esui.Dialog._increment(),
        width: 1020,
        height: 500,
        autoPosition: 1,
        draggable: 1,
        mask: {level: 10000},
        data: data
    });
    dlg.show();
    dlg.setTitle(title);
    dlg.getBody().innerHTML = '<iframe frameborder="0" scrolling="auto" src="'
                              + url + '" style="width:100%; height:500px;"></iframe>';
    dlg.close = function () {
        closeCallback = closeCallback || function () {
        };
        dlg.onhide();
        closeCallback();
    };
    dlg.onhide = function () {
        dlg.hide();
        dlg.dispose();
        window.MaskDialog = null;
    };
};

/*
 * 重写表格编辑启动器值获取逻辑，支持嵌套对象
 * */
esui.Table.prototype.startEdit = function (type, rowIndex, columnIndex) {
    if (this.editable) {
        var entrance = baidu.g(this._getBodyCellId(rowIndex, columnIndex));
        var tlOffset = -5;
        var pos = baidu.dom.getPosition(entrance);
        var field = this._fields[columnIndex];

        this._currentEditor = esui.Table.EditorManager.startEdit(this, type, {
            left: pos.left + tlOffset,
            top: pos.top + tlOffset,
            rowIndex: rowIndex,
            columnIndex: columnIndex,
            field: field,
            value: mf.m.utils.recursion.get(this.datasource[rowIndex], field.field)
        });
    }
};
/*
 * 重写选择列表的值对比逻辑
 * */

/**
 * 根据值选择选项
 *
 * @public
 * @param {string} value 值
 */
esui.Select.prototype.setValue = function (value) {
    var me = this,
        len,
        i;

    if (esui.util.hasValue(value)) {
        for (i = 0, len = me.datasource.length; i < len; i++) {
            if (me.datasource[i].value === value) {
                me.setSelectedIndex(i);
                return;
            }
        }
    }

    me.value = null;
    me.setSelectedIndex(-1);
};
/*
 * mf.parallelAjax
 * */
(function () {
    var dataTypes = {
        'json': {
            contentType: 'application/json',
            encode: JSON.stringify
        }
    };
    mf.ajaxResponse = {};
    /*
     * 解析后端传来的报表数据，兼容前期的数据格式
     * */
    mf.parseReportData = function (data) {
        var fields = [];
        var lists = [];
        if (!(data.column_names && data.rows && data.column_titles)) {
            return null;
        }
        var column = data.column_names;
        for (var row = 0, rowLength = data.rows.length; row < rowLength; row += 1) {
            var rowData = data.rows[row];
            lists[row] = {};
            for (var col = 0, colLength = column.length; col < colLength; col += 1) {
                lists[row][column[col]] = rowData[col];
            }
        }
        for (var col = 0, colLength = column.length; col < colLength; col += 1) {
            fields[col] = {
                field: column[col],
                title: data.column_titles[col]
            };
        }
        return {
            fields: fields,
            lists: lists
        }
    };
    /*
     * debug 模式下的url映射
     * */
    mf.urlDebugRouter = {
        routers: {},
        reg: function (routers) {
            $.extend(mf.urlDebugRouter.routers, routers);
        },
        get: function (url) {
            var direct;
            $.each(mf.urlDebugRouter.routers, function (destination, rule) {
                if (typeof rule === 'string') {
                    if (url === rule) {
                        direct = destination;
                        return false;
                    }
                } else if (typeof rule.test === 'function') {
                    if (rule.test(url)) {
                        direct = destination;
                        return false;
                    }
                }
            });
            return direct;
        }
    };
    /*
     * jQuery ajax参数构造
     *
     * @param {Object} param ajax参数
     *   {string} url
     *   {string} type
     *   {string = json} dataType
     *   {Object} data
     *   {boolean = false} cache 缓存请求结果
     * @param {Object} opt 额外参数
     *   {boolean = true} notAppendExt 增加url的后缀扩展名
     *   {string = json} ext 后缀名
     *
     * @return {Object} jQuery ajax 接受的参数
     * */
    mf.ajaxParamFactory = function (param, opt) {
        param = param || {};
        opt = opt || {};
        console.log('ajax factory', param);

        param.type = param.type || 'GET';
        param.data = param.data || {};
        param.requestType = param.requestType || 'json';
        param.dataType = param.dataType || 'json';
        param.cache = param.cache === true;
        if (param.type === 'GET') {
            param.requestType = null;
        }
        var requestType = dataTypes[param.requestType];
        /*
         if (dataTypes[param.dataType]) {
         param.contentType = param.contentType || contentTypes[param.dataType];
         }
         */
        if (requestType) {
            param.data = requestType.encode ? requestType.encode(param.data) : param.data;
            param.contentType = param.contentType || requestType.contentType;
        }

        var url = param.url.split('?');
        var query = url[1] || '';
        url = url[0] || '';
        param.originalUrl = url;
        // mock 调试的路由，在debug.js里
        if (mf.DEBUG) {
            url = mf.urlDebugRouter.get(url) || url;
        }

        if (!opt.notAppendExt) {
            opt.ext = opt.ext || (
                mf.DEBUG ? 'json' : ''
            );
            url += opt.ext ? '.' + opt.ext : '';
        }
        // 为url增加一些额外的参数
        //var outId = location.search.match(/outId=([\w\d]+)(?=\&|$)/);
        //if (outId) {
        //    query += '&outId=' + outId[1];
        //}

        param.url = url + (
            query ? '?' : ''
        ) + query;
        console.log('ajax factory output', param);

        return param;
    };
    /*
     * ajax返回结果解析
     *
     * {Object} data
     * */
    function dataParse(data, filterFn) {
        if (!data.success) {
            if (data.errorType === 'NoLogin') {
                throw 'sessionTimeout';
            } else if (data.message) {
                throw data.message;
            } else {
                throw '请求失败，请稍后重试。<br>';
            }
        }
        return filterFn ? filterFn(data)
            : (mf.parseReportData(data) || data.entities || []);
    }

    var hasShowLogin = false;
    /*
     * ajax错误处理
     *
     * {string} msg 错误信息
     *   sessionTimeout 超时登录
     * */
    function errorHandle() {
        var args = [].slice.call(arguments);
        return function (msg) {
            mf.loaded();
            console.log('errorHandle', msg, args);
            if (msg === 'sessionTimeout') {
                //回话超时登录
                if (typeof(mf.userLoad) === 'function') {
                    mf.userLoad(function () {
                        mf.parallelAjax.apply(null, args);
                    });
                } else {
                    if (hasShowLogin) {
                        return;
                    }
                    hasShowLogin = true;
                    esui.Dialog.alert({
                        title: '提示信息',
                        content: '登录超时，操作无法完成，请重新登录！',
                        onok: typeof(mf.userLoad) === 'string' ? function () {
                            T.cookie.set(mf.cookieKeyMap.authority, 0);
                            hasShowLogin = false;
                            er.locator.redirect(mf.userLoad);
                        } : function () {
                            hasShowLogin = false;
                        }
                    });
                }
            } else {
                esui.Dialog.alert({
                    title: '提示信息', content: msg
                });
            }
        };
    }

    /*
     * 并行ajax请求
     * */
    mf.parallelAjax = function (targets, cb, context) {
        targets = [].concat(targets);
        var deferredList = [];
        for (var i = 0, target; (
            target = targets[i]
        ); i += 1) {
            if (typeof target === 'string') {
                target = {
                    url: target
                };
            }
            target = mf.ajaxParamFactory(target);
            deferredList[i] = (function (ajaxParam) {
                var deferred = $.Deferred();
                if (mf.ajaxResponse[target.originalUrl]) {
                    console.log('ajaxResponse ', target.originalUrl);
                    deferred.resolve(mf.ajaxResponse[target.originalUrl]);
                } else {
                    $.ajax(ajaxParam)
                        .done(function (data) {
                            try {
                                data = dataParse(data, ajaxParam.dataFilter);
                            } catch (e) {
                                deferred.reject(e);
                                return;
                            }
                            deferred.resolve(data);
                        })
                        .fail(function (XMLHttpRequest, textStatus, errorThrown) {
                            console.log('ajax fail', XMLHttpRequest, textStatus, errorThrown);
                            deferred.reject(ajaxParam.errorMessage || '网络错误！');
                        });
                }
                return deferred.promise();
            })(target);
        }
        mf.loading();
        $.when.apply($, deferredList)
            .done(function () {
                var args = [].slice.call(arguments);
                mf.loaded();
                cb.apply(context, args);
            })
            .fail(errorHandle.call(null, targets, cb, context));
    };
})();
/*
 * 根据需要的字段列表从config中拿去值拼接成esui table需要的fields
 *
 * @param {Object} fieldMap 需要的字段
 * @param {Object} configMap 默认的配置字段
 *
 * @return {Array.<Object>} esui table 格式的fields
 * */
mf.mockTableFields = function (fieldMap, configMap) {
    var fields = [];
    for (var i in fieldMap) {
        if (configMap[i] && configMap[i].isShow === false) {
            continue;
        }
        var field = $.extend(
            // 默认配置
            {
                align: 'center',
                content: '',
                listKey: i
            },
            configMap[i] || {},
            fieldMap[i]
        );
        field.content = field.content || field.field;
        fields.push(field);
    }
    return fields;
};
/*
 * 表格保存验证器
 *
 * @param {Object} row 行数据
 * @param {Array.<Object>} fields 行数据
 * @return {boolean}
 *
 * field.validator
 * @param {*} value
 * @param {*} row
 * @param {*} configLists
 * */
mf.tableSavingValidator = function (row, fields) {
    var err = [];
    var table = this;
    console.log('tableSavingValidator', row, fields);
    $.each(fields, function (index, field) {
        if (!field.field) {
            return true;
        }
        var value = mf.m.utils.recursion.get(row, field.field);
        if (field.validator) {
            var error = field.validator.call(table, value, row);
            if (error) {
                err.push('【' + (field.title || '') + '】' + error);
                return true;
            }
        }
    });
    if (err.length) {
        esui.Dialog.alert({
            title: '操作失败',
            content: err.join('<br>')
        });
        return false;
    }
    return true;
};
/*
 * 提交数据过滤器
 *
 * @param {Object} row 行数据
 * @param {Array.<Object>} configLists 配置数据
 * @return {Object}
 *
 * */
mf.grepDataInConfig = function (row, configLists) {
    console.log('dataFilterInConfig', row, configLists);
    var newRow = $.deepExtend({}, row);
    $.each(configLists, function (index, field) {
        if (!field.field) {
            return true;
        }
        var value = mf.m.utils.recursion.get(newRow, field.field);
        if (field.request === false) {
            delete newRow[field.field];
            //mf.m.utils.recursion.del(newRow, field.field);
        } else if (!field.request && !mf.m.utils.hasValue(value)) {
            console.log('delete', field, String(value));
            delete newRow[field.field];
            //mf.m.utils.recursion.del(newRow, field.field);
        }
    });
    $.each(newRow, function (key) {
        if (key.charAt(0) === '_') {
            delete newRow[key];
        }
    });
    return newRow;
};
/*
 * 映射配置中的字段
 *
 * @param {Object} configMap 默认的配置字段
 * */
mf.mockFieldInConfig = function (configMap, fieldName) {
    fieldName = fieldName || 'field';
    return function (key) {
        return (configMap[key] || {})[fieldName];
    };
};
/*
 * 获取配置中默认值字段组成的初始对象
 *
 * @param {Object} configMap 默认的配置字段
 * @param {Object＝{}} initEntity 初始对象
 * */
mf.initEntityInConfig = function (configMap, initEntity) {
    initEntity = initEntity || {};
    $.each(configMap, function (i, n) {
        if ('defaultValue' in n) {
            mf.m.utils.recursion.set(initEntity, n.field, n.defaultValue);
        }
    });
    return initEntity;
};
/*
 * 获取配置中字段Key组成的映射对象
 *
 * @param {Object} data 值
 * @param {Object} configMap 默认的配置字段
 * */
mf.reflectDataInConfig = function (data, configMap) {
    var newData = {};
    $.each(configMap, function (i, n) {
        if (n.field) {
            newData[i] = mf.m.utils.recursion.get(data, n.field, n.defaultValue);
        }
    });
    return newData;
};
/*
 * 根据配置中的字段操作目标值
 *
 * @param {Object} configMap 默认的配置字段
 * */
mf.operateDataInConfigField = function (configMap) {
    var getField = mf.mockFieldInConfig(configMap);
    return {
        get: function (data, key, defaultValue) {
            return mf.m.utils.recursion.get(data, getField(key), defaultValue);
        },
        set: function (data, key, value) {
            return mf.m.utils.recursion.set(data, getField(key), value);
        }
    };
};
/*
 * 模拟分页
 * 数据全部加载到model中，后根据筛选截取，排序后再按分页信息截取
 *
 * @param {Array.<Object>} dataList 原始完整数据
 * @param {Object} targets 包含了需要互动的esui控件
 *
 * @return {Function}
 *   动态变更信息
 *   @param {number} pageSize
 *   @param {number} page
 *   @param {Function | undefined} filter 筛选条件
 * */
mf.mockPager = function (dataList, targets) {
    var table = targets.table;
    var pageSizer = targets.pageSizer;
    var pager = targets.pager;
    table.onedit = function (value, options, editor) {
        var row = table.datasource[options.rowIndex];
        mf.m.utils.recursion.set(row, options.field.field, value);
        row._isModify = true;
        table.render();
    };
    pager.onchange = mf.m.utils.nextTickWrapper(function () {
        refreshTable();
    });
    pageSizer.onchange = mf.m.utils.nextTickWrapper(function () {
        refreshTable({
            page: 0
        });
    });
    table.onsort = mf.m.utils.nextTickWrapper(function () {
        refreshTable({
            page: 0
        });
    });

    var filterCache;
    return refreshTable;

    function refreshTable(opt) {
        opt = opt || {};
        if ('pageSize' in opt) {
            pageSizer.setVaue(opt.pageSize);
        } else {
            opt.pageSize = parseInt(pageSizer.getValue(), 10);
        }
        var mockList = dataList;
        if ('filter' in opt) {
            filterCache = opt.filter;
        } else {
            filterCache = null;
        }
        if (filterCache) {
            mockList = $.grep(mockList, filterCache);
        }
        var total = Math.ceil(mockList.length / opt.pageSize);
        if (pager.total !== total || 'page' in opt) {
            pager.total = total;
            pager.render();
        }
        if ('page' in opt) {
            pager.setPage(opt.page);
        } else {
            opt.page = parseInt(pager.getPage(), 10);
        }
        if ('order' in opt) {
            table.order = opt.order;
        } else {
            opt.order = table.order;
        }
        if ('orderBy' in opt) {
            table.orderBy = opt.orderBy;
        } else {
            opt.orderBy = table.orderBy;
        }
        var order = opt.order === 'asc' ? 1 : -1;
        var orderBy = opt.orderBy;
        var recursionGet = mf.m.utils.recursion.get;
        mockList.sort(function (a, b) {
            return recursionGet(a, orderBy) > recursionGet(b, orderBy) ? order : -order;
        });
        console.log('mockPager', opt);
        table.datasource = mockList.slice(
            opt.page * opt.pageSize, (opt.page + 1) * opt.pageSize
        );
        table.render();
    }
};

mf.initEntities = function (opt) {
    console.log('initEntities', opt);
    var loader = opt.loader;
    var entities = opt.entities;

    if (loader.get('from') && loader.get('to')) {
        loader.set('date', loader.get('from') + ',' + loader.get('to'));
    }

    var fields = opt.fields;
    if (fields) {
        loader.set('fields', $.isFunction(fields) ? fields(loader) : fields);
    }
    if (entities) {
        loader.set('list', entities);
        loader.set('listTotalSize', entities.length);
        loader.set('total',
            Math.ceil(entities.length / loader.get('pageSize')));
    }
};
mf.etplFetch = function (tplName, data) {
    var contextId = '_fetch';
    var contextOption = {
        contextId: contextId
    };
    er.context.addPrivate(contextId);
    $.each(data, function (i, n) {
        er.context.set(i, n, contextOption);
    });
    var target = {};
    console.log('render etpl', tplName, data);
    er.template.merge(
        target,
        tplName,
        contextId
    );
    er.context.removePrivate(contextId);
    return target.innerHTML;
};
mf.getEnglishNumber = function (number, hasUnitClass, unit) {
    var numberStr = [];
    unit = unit || ['B', 'K', 'M', 'G', 'T', 'P'];
    number = number.toPrecision().split('.');
    var integer = number[0].split('').reverse();
    var decimal = number[1];
    integer.forEach(function (value, index) {
        var position = Math.floor(index / 3);
        numberStr[position] || (numberStr[position] = '');
        numberStr[position] = value + numberStr[position];
    });
    if (decimal) {
        decimal = '.' + decimal.substr(0, 2);
    }
    if (hasUnitClass) {
        numberStr = $.map(numberStr, function (numberStrValue, index) {
            return '<span class="number-unit number-unit-' + unit[index] + '">' + numberStrValue + '</span>';
        });
    }
    return numberStr.reverse().join(',') + (decimal || '');
};
mf.getFieldContentPercent = function (field, unit) {
    unit = unit || '%';
    unit = '<span class="percent-unit">' + unit + '</span>';
    return function (item) {
        return (item[field] * 100).toString().substr(0, 5) + unit;
    };
};
mf.getFieldContentLess = function (field, unit) {
    return function (item) {
        return '<span title=" ' + item[field] + ' ">' + mf.getEnglishNumber(item[field], true, unit) + '</span>';
    };
};
mf.getFieldContentMoney = function (field, unit) {
    unit = unit || '¥';
    unit = '<span class="money-unit">' + unit + '</span>';
    return function (item) {
        return unit + mf.getEnglishNumber(item[field], true);
    };
};
