/**
 * @file Generated by er-sync
 * @author Luics<xukai01@baidu.com>
 * @date Mon May 25 2015 17:58:03 GMT+0800 (CST)
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 */
mf.index = {};

er.config.TEMPLATE_LIST = [
    'asset/adv-index.html'
];
er.config.DEFAULT_INDEX = "/account/info";
mf.authority = mf.m.authority('adv', 'index');
mf.cookieKeyMap = {
    'username': 'adv_username',
    'display_name': 'adv_display_name',
    'authority': 'adv_user_authority'
};
mf.authority.register(
    {
        LOGIN: 1 // 登录
    }
);
mf.authority.isUserLogin = function () {
    return er.permission.isAllow('LOGIN');
};
$(function () {
    if ('index' === mf.getErPage()) {//generate tab
        // mf.updateNav1();
    }
});

mf.urlDebugRouter.reg({
    // 登录
    '/index/index/login': '/login',
    // 用户信息
    '/index/index/user': '/user',
    // 配置文件
    '/index/config': '/config',
    // 计划列表
    '/index/market/plan': /^\/plan\/?/i,
    // 策略列表
    '/index/market/unit': /^\/unit\/?/i,
    // 创意列表
    '/index/market/idea': /^\/idea\/?/i
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