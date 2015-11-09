/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Tue Mar 17 2015 09:45:32 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */
mf.index = {};

er.config.TEMPLATE_LIST = [
    'asset/union-index.html'
];
er.config.DEFAULT_INDEX = "/account/index";
//er.config.DEFAULT_INDEX = "/index/dailyReport";
mf.authority = mf.m.authority('union', 'index');
mf.cookieKeyMap = {
    'username': 'union_username',
    'display_name': 'union_display_name',
    'default_channel': 'union_default_channel',
    'authority': 'union_user_authority',
    'adminAuthority': 'union_admin_authority',
    'udAuthority': 'union_ud_authority'
};

mf.authority.register(
    {
        LOGIN: 1 // 登录
    }
);

mf.authority.isUserLogin = function () {
    return er.permission.isAllow('LOGIN');
};

mf.urlDebugRouter.reg({
    // 登录
    '/index/index/login': '/login',
    // 用户信息
    '/index/user': '/user',
    // 用户信息
    '/index/account/settlement': '/withdraw',
    // 配置文件
    '/index/config': '/config',
    // 渠道列表
    '/index/channel': /^\/channel\/?/i,
    // 网站媒体列表
    '/index/media/site': /^\/media\/?/i,
    // 网站媒体广告位列表
    '/index/media/sitePosition': /^\/adslot\/?/i,
    // 账户总体多日
    '/index/report/dailyTotal': /^\/report\/daily\/\d{8}\-\d{8}$/i,
    // 多媒体多日
    '/index/report/dailyMedias': /^\/report\/media\/daily\/\d{8}-\d{8}$/i,
    // 多媒体单日
    '/index/report/dayMedias': /^\/report\/media\/daily\/\d{8}$/i,
    // 单渠道多日
    '/index/report/dailyChannel': /^\/report\/channel\/[0-9a-z]{8}\/media\/total\/\d{8}\-\d{8}$/i,
    // 单媒体多日
    '/index/report/dailyMedia': /^\/report\/media\/[0-9a-z]{8}\/daily\/\d{8}\-\d{8}$/i,
    // 单媒体单日分小时
    '/index/report/hourlyMedia': /^\/report\/media\/[0-9a-z]{8}\/daily\/\d{8}\/traffic$/i,
    // 单媒体多广告位多日
    '/index/report/dailyPositions': /^\/report\/media\/[0-9a-z]{8}\/adslot\/daily\/\d{8}\-\d{8}$/i,
    // 单媒体多广告位单日
    '/index/report/dayPositions': /^\/report\/media\/[0-9a-z]{8}\/adslot\/daily\/\d{8}$/i,
    // 单媒体全部广告位单日分小时
    '/index/report/hourlyPositions': /^\/report\/media\/[0-9a-z]{8}\/adslot\/daily\/\d{8}\/traffic$/i,
    // 单广告位多日
    '/index/report/dailyPosition': /^\/report\/adslot\/s[0-9a-z]{7}\/daily\/\d{8}\-\d{8}$/i,
    // 单广告位单日分小时
    '/index/report/hourlyPosition': /^\/report\/adslot\/s[0-9a-z]{7}\/daily\/\d{8}\/traffic$/i,
    // 单广告位单日分小时
    '/index/media/siteTemplate': /^\/template(?:\/.+)?$/i
});

mf.windowMinWidth = 980;
mf.defaultPage = 'index';
mf.userLoad = '/index/login~force=1';

mf.index.reportRange = {
    begin: new Date('2014-11-23'),
    end: mf.getDate(-1)
};
mf.index.reportRangeToday = {
    begin: new Date('2014-11-23'),
    end: mf.getDate()
};
$(function () {
    if ('index' === mf.getErPage()) {//generate tab
        mf.clickCommand.register({
            cmd: 'loginOut',
            handle: function () {
                mf.loginOut();
                return false;
            },
            rewrite: true
        });
    }
    function mockLogin(name, opt) {
        // 暂时这样吧，用户信息以后再加入
        var user = {
            authority : opt.authority || 255
        };
        user.authority = parseInt(user.authority || 0);
        if (user.authority > 0) {
            user.authority |= 1;
        }

        T.cookie.set(opt.cookie, user.authority);
        return window.open(opt.page , name, '', '_blank');
    }
    var passageway = {
        admin : {
            page: '/admin.html',
            cookie: mf.cookieKeyMap.adminAuthority
        },
        ud : {
            page: '/ud.html',
            cookie: mf.cookieKeyMap.udAuthority
        }
    };
    $('.passageway').click(function () {
        var name = $(this).data('name');
        mockLogin(name, passageway[name]);
    });
    mf.getUserInfo();
});

mf.getUserInfo = function () {
    var getUrl = mf.ajaxParamFactory({
        url: '/user'
    });
    $.getJSON(getUrl.url, function (result) {
        console.log('getUserInfo', result);
        if (result.success) {
            mf.loginIn(result);
        }
    });
};

mf.loginIn = function (result) {
    var user = result.entities;
    console.log('user', user);
    var expObj = {expires: 3600000 * 24 * 15};
    $.each([
        'username',
        'display_name',
        'default_channel'
    ], function (index, field) {
        var key = mf.cookieKeyMap[field];
        key && T.cookie.set(key, user[field] || '', expObj);
    });
    $('#' + mf.USERNAME_ID).html(user.display_name || user.username);
    if (user.is_admin) {
        $('.passageway[data-name=admin]').show();
    }
    if (user.is_ud) {
        $('.passageway[data-name=ud]').show();
    }
    var authority = 255;
    T.cookie.set(mf.cookieKeyMap.authority, authority);
    mf.authority.parse(authority);
    global_previousName = user.username;
};

mf.loginOut = function () {
    var getUrl = mf.ajaxParamFactory({
        url: '/logout'
    });
    $.getJSON(getUrl.url, function (result) {
        T.cookie.set(mf.cookieKeyMap.authority, 0);
        mf.authority.parse(0);
        er.locator.redirect('/index/login');
    });
};

//mf.onenter = (function (fn) {
//    return function () {
//        fn.apply(this, arguments);
//        mf.getUserInfo();
//    }
//})(mf.onenter);

var global_previousName = T.cookie.get(mf.cookieKeyMap.username);
(function () {
    setInterval(function () {
        var currentName = T.cookie.get(mf.cookieKeyMap.username);
        if (global_previousName !== currentName) {
            T.cookie.set(mf.cookieKeyMap.authority, 0);
            er.locator.redirect(mf.userLoad);
        }
        global_previousName = currentName;
    }, 3000);
})();
