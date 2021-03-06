/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Tue May 19 2015 17:17:10 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */
mf.admin = {};

er.config.TEMPLATE_LIST = [
    'asset/union-admin.html'
];
// er.config.DEFAULT_INDEX = "/admin/account";
// mf.authority = mf.m.authority('union', 'admin');
// mf.cookieKeyMap = mf.COOKIE_KEY_MAP.union.admin;

er.config.DEFAULT_INDEX = "/account/userList";
//er.config.DEFAULT_INDEX = "/index/dailyReport";
mf.authority = mf.m.authority('union', 'admin');
mf.cookieKeyMap = {
    'username': 'union_admin_username',
    'display_name': 'union_admin_display_name',
    'authority': 'union_admin_authority',
    'userUser_name': 'union_username',
    'userDisplay_name': 'union_display_name',
    'userAuthority': 'union_user_authority'
};
mf.authority.register(
    {
        LOGIN: 1 // 登录
    }
);
mf.authority.isUserLogin = function () {
    return er.permission.isAllow('LOGIN');
};
mf.userLoad = '/index/login~force=1';

mf.urlDebugRouter.reg({
    // 登录
    '/admin/index/login': '/login',
    // 用户信息
    '/admin/user': '/user',
    // 单广告位单日分小时
    '/admin/account/mockLogin': /^\/admin\/login$/i,
    // 单广告位单日分小时
    '/admin/account/mockLoginBack': /^\/admin\/login\/back$/i,
    // 单广告位单日分小时
    '/admin/account/userList': /^\/alluser$/i,
    // 单广告位单日分小时
    '/admin/manage/template': /^\/longtask\/rebuildtemplate/i,
    // 单广告位单日分小时
    '/admin/manage/strategy': /^\/dspstrategy/i,
    // 单广告位单日分小时
    '/admin/manage/templateTaskStatus': /^\/longtask\/status\/.*$/i,
    // 单广告位单日分小时
    '/admin/manage/percentage': /^\/admin\/percentage/i,
    // 单广告位单日分小时
    '/admin/manage/mediaDSPID': /^\/admin\/mediaadslot(?:\/[0-9a-f]{8}\/\/[0-9a-f]+\/[0-9]+\/[0-9]+)?/i,
    '/admin/manage/media': /^\/admin\/media/i,
    '/admin/manage/adslotDSPID': /^\/admin\/adslotdsp(?:s\/[0-9a-f]{7}\/[0-9]+\/[0-9]+)?/i,
    // 单广告位单日分小时
    '/admin/manage/adslot': /^\/admin\/adslot/i,
    // 单广告位单日分小时
    '/admin/manage/channel': /^\/admin\/channel/i,
    '/admin/manage/baidu5DSP': /^\/admin\/baidu5adslot(?:\/[0-9]+)?/i,
    '/admin/manage/baiduDSP': /^\/admin\/baiduadslot(?:\/[0-9]+)?/i,
    '/admin/manage/tencentDSP': /^\/admin\/tencentadslot(?:\/[0-9]+)?/i,
    '/admin/manage/userDSPID': /^\/admin\/useradslot(?:\/[0-9]+\/[0-9]+\/[0-9]+\/[0-9]+)?/i,
    '/admin/manage/domainDSPID': /^\/admin\/domainadslot(?:\/[0-9a-zA-Z._\-]+\/[0-9]+\/[0-9]+\/[0-9]+)?/i
});

$(function () {
    if ('admin' === mf.getErPage()) {//generate tab
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