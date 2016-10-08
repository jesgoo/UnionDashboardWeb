/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Sat Jun 13 2015 10:52:52 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */
mf.ud = {};

er.config.TEMPLATE_LIST = [
    'asset/union-ud.html'
];
er.config.DEFAULT_INDEX = "/report/index";
//er.config.DEFAULT_INDEX = "/index/dailyReport";
mf.authority = mf.m.authority('union', 'index');
mf.cookieKeyMap = {
    'username': 'union_ud_username',
    'display_name': 'union_ud_display_name',
    'authority': 'union_ud_authority'
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
    '/ud/index/login': '/login',
    // 用户信息
    '/ud/user': '/user',
    // 配置文件
    '/ud/config': '/config',
    // 渠道列表
    '/index/channel': /^\/channel\/?/i,
    // 网站媒体列表
    '/index/media/site': /^\/ud\/media\/?/i,
    // 网站媒体广告位列表
    '/index/media/sitePosition': /^\/ud\/adslot\/?/i,
    // 账户总体多日
    '/ud/report/dailyTotal': /^\/report\/daily\/\d{8}\-\d{8}$/i,
    // 多媒体多日
    '/ud/report/dailyMedias': /^\/ud\/report\/media\/daily\/\d{8}-\d{8}$/i,
    // 多媒体单日
    '/ud/report/dayMedias': /^\/ud\/report\/media\/daily\/\d{8}$/i,
    // 单渠道多日
    '/ud/report/dailyChannel': /^\/report\/channel\/[0-9a-z]{8}\/media\/total\/\d{8}\-\d{8}$/i,
    // 单媒体多日
    '/ud/report/dailyMedia': /^\/report\/media\/[0-9a-z]{8}\/daily\/\d{8}\-\d{8}$/i,
    // 单媒体单日分小时
    '/ud/report/hourlyMedia': /^\/report\/media\/[0-9a-z]{8}\/daily\/\d{8}\/traffic$/i,
    // 单媒体多广告位多日
    '/ud/report/dailyPositions': /^\/report\/media\/[0-9a-z]{8}\/adslot\/daily\/\d{8}\-\d{8}$/i,
    // 单媒体多广告位单日
    '/ud/report/dayPositions': /^\/report\/media\/[0-9a-z]{8}\/adslot\/daily\/\d{8}$/i,
    // 单媒体全部广告位单日分小时
    '/ud/report/hourlyPositions': /^\/report\/media\/[0-9a-z]{8}\/adslot\/daily\/\d{8}\/traffic$/i,
    // 单广告位多日
    '/ud/report/dailyPosition': /^\/report\/adslot\/s[0-9a-z]{7}\/daily\/\d{8}\-\d{8}$/i,
    // 单广告位单日分小时
    '/ud/report/hourlyPosition': /^\/report\/adslot\/s[0-9a-z]{7}\/daily\/\d{8}\/traffic$/i,
    // 单广告位单日分小时
    '/ud/media/siteTemplate': /^\/template(?:\/.+)?$/i
});

mf.windowMinWidth = 980;
mf.defaultPage = 'index';
mf.userLoad = '/index/login~force=1';

mf.ud.reportRange = {
    begin: new Date('2014-11-23'),
    end: mf.getDate(-1)
};
mf.ud.reportRangeToday = {
    begin: new Date('2014-11-23'),
    end: mf.getDate()
};
$(function () {
    if ('ud' === mf.getErPage()) {//generate tab
        mf.clickCommand.register({
            cmd: 'loginOut',
            handle: function () {
                T.cookie.set(mf.cookieKeyMap.authority, 0);
                window.location.reload();
                return false;
            },
            rewrite: true
        });
    }
});

mf.getUserInfo = mf.m.utils.throttle(function () {
    var getUrl = mf.ajaxParamFactory({
        url: '/user'
    });
    $.getJSON(getUrl.url, function (result) {
        if (result.success) {
            var user = result.entities;
            console.log('user', user);
            $.each([
                'username',
                'display_name'
            ], function (index, field) {
                var key = mf.cookieKeyMap[field];
                key && T.cookie.set(key, user[field] || '');
            });
            $('#' + mf.USERNAME_ID).html(user.display_name || user.username);
        }
    });
}, 200);

mf.onenter = (function (fn) {
    return function () {
        fn.apply(this, arguments);
        mf.getUserInfo();
    }
})(mf.onenter);