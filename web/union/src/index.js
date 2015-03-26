/**
 * @file Generated by er-sync
 * @author Luics<xukai01@baidu.com>
 * @date Tue Mar 17 2015 09:45:32 GMT+0800 (CST)
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 */
mf.index = {};

er.config.TEMPLATE_LIST = [
    'asset/union-index.html'
];
er.config.DEFAULT_INDEX = "/media/site";
//er.config.DEFAULT_INDEX = "/index/dailyReport";
mf.authority = mf.m.authority('union', 'index');
mf.cookieKeyMap = {
    'name': 'union_username',
    'authority': 'union_adminauthority'
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
    '/index/index/login': '/login',
    '/index/config': '/config',
    '/index/media/site': /^\/media\/?/i,
    '/index/media/sitePosition': /^\/adslot\/?/i
});

mf.windowMinWidth = 600;
mf.userLoad = '/index/login~force=1';

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