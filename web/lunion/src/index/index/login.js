/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Thu Jul 30 2015 14:41:30 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */
/*
 Realm:
 - l.jesgoo.com

 Source:
 - browser:l.jesgoo.com

 callback:
 - http://l.jesgoo.com/callback_lenovo.html

 1) https://passport.lenovo.com/wauthen2/gateway

 lenovoid.action
 uilogin: 登录请求
 uilogout: 登出请求
 newaccount: 注册请求
 resetpassword: 重置密码请求
 myaccount: 账户管理
 必填参数

 lenovoid.realm
 应用服务安全域
 必填参数

 lenovoid.ctx
 RP 的上下文信息。回调时会回传给 RP。如果是多参数或者包 含特殊符号,需 urlencode
 可选参数

 lenovoid.lang
 RP 语言信息。目前只支持 zh_CN,后期将􏰀供 en_US 支持, 若此参数为空,则默认为浏览器语言。
 认证后的返回地址 URL,如果􏰀供则认证结果返回到该 URL 而不是 authenURL。该参数值必须在该 realm 维护的许可地址 列表中。不能带参数.此参数即是 rp-01 接口重定向的地址.
 可选参数

 lenovoid.cb
 可选参数

 lenovoid.vp
 单位为秒。表示所需 token 是用户在该时间段之前进行的口令 验证获得的。用于重新校验用户口令。
 取值为 0 时,表明即使用户之前已经登录,也需要重新输入 口令。
 取值为 1800 时,表明如果用户是在半小时之内登录的则不需 要重新输入口令,如果是半小时之前登录的,则需要重新输 入口令。
 可选参数

 lenovoid.source
 注册来源
 可选参数
 2) https://passport.lenovo.com/interserver/authen/1.2/getaccountid
 3) 回調到 USER 提供的 callback url 加上 wust key
 4)
 研发环境：
 idinner1.dev.surepush.cn/wauthen2/preLogin
 测试环境：
 https://uss.test.lenovomm.cn/wauthen2/preLogin
 */
mf.index.lenovoEnviroment = [
    {
        src:'https://idinner1.dev.surepush.cn/wauthen2/gateway',
        realm:''
    },
    {
        src:'https://uss.test.lenovomm.cn/wauthen2/gateway',
        realm: 'fm365.com'
    },
    {
        src:'https://passport.lenovo.com/wauthen2/gateway',
        realm: 'l.jesgoo.com'
    }
][2];
function checkCrossLogin(newUser) {
    if (mf.authority.isUserLogin()) {
        mf.updateNav1.__called = 0;
        if (newUser) {
            er.locator.redirect('/account/info~force=1');
        } else {
            er.locator.redirect('/account/index~force=1');
        }
        return true;
    }
    return false;
}
function crossLoginOut(cb) {
    var frame = document.createElement('iframe');
    frame.src = mf.index.lenovoEnviroment.src + '?' + $.param({
            "lenovoid.action": "uilogout",
            "lenovoid.realm": mf.index.lenovoEnviroment.realm,
            "lenovoid.source": "browser:l.jesgoo.com",
            "lenovoid.cb": "http://ad.lenovomm.com/callback_lenovo.html"
        });
    $('body').append(frame);
    frame.contentWindow.name = location.host;
    $(frame).hide();
    window.crossLogin = function (searchStr) {
        window.crossLogin = null;
        $(frame).remove();
        cb && cb();
    };}
function lenovo_login_callback(params) {
    return mf.parallelAjax(
        {
            url:'/lenovo/ecs/api/10d',
            type: 'POST',
            //requestType: 'form',
            data: params
        },
        function (result) {
            // 暂时这样吧，用户信息以后再加入
            var user = {
                authority : 1
            };
            user.authority = parseInt(user.authority || 0);
            if (user.authority > 0) {
                user.authority |= 1;
            }
            if (!result.newuser) {
                user.authority |= 2;
            }

            T.cookie.set(mf.cookieKeyMap.authority, user.authority);
            mf.authority.parse(user.authority);
            if (!checkCrossLogin(result.newuser)) {
                esui.Dialog.alert(
                    {
                        title: '登录失败',
                        content: '请联系管理员'
                    }
                );
            }
        }
    );
}
(function () {
    mf.index.index.login = new er.Action({
        model: mf.index.index.model.login,
        view: new er.View({
            template: 'mf_index_index_login',
            UI_PROP: {}
        }),
        STATE_MAP: {},
        onenter: function () {
            console.log('onenter');
            mf.onenter();
            $('body').addClass('login-modal');
            var username = T.cookie.get(mf.cookieKeyMap.username) || '';
            this.model.set('username', username);
        },
        onentercomplete: function () {
            mf.loaded();
            if (!this.model.get('force') && checkCrossLogin()) {
                return true;
            }
            var action = this;
            var frame = $('#lenovo_login');
            $(window).on('resize.login', function () {
                var h = $('body').height() - $('.header').height() - 20;
                h = h < 700 ? 700 : h;
                frame.height(h);
            }).trigger('resize.login');
            frame.get(0).contentWindow.document.write('登录中，请稍后。。。');
            frame.prop('src', mf.index.lenovoEnviroment.src + '?' + $.param({
                    "lenovoid.action": "uilogin",
                    "lenovoid.realm": mf.index.lenovoEnviroment.realm,
                    "lenovoid.source": "browser:l.jesgoo.com",
                    "lenovoid.cb": "http://ad.lenovomm.com/callback_lenovo.html"
                }));
            $('body').addClass('cross-login-modal');
            frame.get(0).contentWindow.name = location.host;
            window.crossLogin = function (searchStr) {
                var param = T.url.queryToJson((searchStr || ''));
                frame.hide();
                if (param['lenovoid.wust']) {
                    lenovo_login_callback(param).fail(function () {
                        crossLoginOut();
                        history.back(-1);
                        frame.show();
                    });
                }
            };
        },
        onleave: function () {
            $(window).off('resize.login');
        }
    });
})();