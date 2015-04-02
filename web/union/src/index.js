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
    // 登录
    '/index/index/login': '/login',
    // 配置文件
    '/index/config': '/config',
    // 渠道列表
    '/index/channel': /^\/channel\/?/i,
    // 网站媒体列表
    '/index/media/site': /^\/media\/?/i,
    // 网站媒体广告位列表
    '/index/media/sitePosition': /^\/adslot\/?/i,
    // 账户总体多日
    '/index/report/dailyTotal': /^\/report\/daily\/\d{8}\-\d{8}/i,
    // 多媒体多日
    '/index/report/dailyMedias': /^\/report\/media\/daily\/\d{8}-\d{8}/i,
    // 多媒体单日
    '/index/report/dayMedias': /^\/report\/media\/daily\/\d{8}/i,
    // 单渠道多日
    '/index/report/dailyChannel': /^\/report\/channel\/[0-9a-z]{8}\/media\/total\/\d{8}\-\d{8}/i,
    // 单媒体多日
    '/index/report/dailyMedia': /^\/report\/media\/[0-9a-z]{8}\/daily\/\d{8}\-\d{8}/i,
    // 单媒体单日分小时
    '/index/report/hourlyMedia': /^\/report\/media\/[0-9a-z]{8}\/daily\/\d{8}\/traffic/i,
    // 单媒体多广告位多日
    '/index/report/dailyPositions': /^\/report\/media\/[0-9a-z]{8}\/adslot\/daily\/\d{8}\-\d{8}/i,
    // 单媒体多广告位单日
    '/index/report/dayPositions': /^\/report\/media\/[0-9a-z]{8}\/adslot\/daily\/\d{8}/i,
    // 单媒体全部广告位单日分小时
    '/index/report/hourlyPositions': /^\/report\/media\/[0-9a-z]{8}\/adslot\/daily\/\d{8}\/traffic/i,
    // 单广告位多日
    '/index/report/dailyPosition': /^\/report\/adslot\/s[0-9a-z]{7}\/daily\/\d{8}\-\d{8}/i,
    // 单广告位单日分小时
    '/index/report/hourlyPosition': /^\/report\/adslot\/s[0-9a-z]{7}\/daily\/\d{8}\/traffic/i
});

mf.windowMinWidth = 600;
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
