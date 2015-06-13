/**
 * @file 定义站点地图
 * 注： 该文件需要保持JSON文本格式，用于文档生成（如key使用双引号）
 */
mf = typeof mf === 'undefined' ? {} : mf;

(function () {
    var authorityActionBase = function (obj, authority, noAuthLocation) {
        var list = {};
        for (var i in obj) {
            list[i] = obj[i];
        }
        if (authority) {
            list.authority = authority;
        }
        if (noAuthLocation) {
            list.noAuthLocation = noAuthLocation;
        }
        return list;
    };
    // site级别模块
    mf.MAP = {
        "__module": {
            "model": {},
            "authority": {},
            "commandElement": {},
            "utils": {},
            "validate": {},
            "processBar": {},
            "uiOperateButton": {},
            "uiFilterSelect": {},
            "highcharts": {},
            "preview": {"private": true},
            "config": {"private": true}
        }
    };
    // Page about
    
    // Page index
    mf.MAP.monitor = (function () {
        // page级别模块
        var page = {
            "__module": {
                "highchart_monitor": {"private": true}
            },
            "__mockData": {}
        };

        var mainNav2 = function (label) {
            return {
                "nav1": "main",
                "list": [
                    {"nav2": "/main/index"}
                ],
                "label": label || ''
            };
        };

        //Module index
        page.main = {
            "index": mainNav2('监控首页'),
            "__mockData": {}
        };

        var analyzeNav2 = function (label) {
            return {
                "nav1": "analyze",
                "list": [
                    {"nav2": "/analyze/clickArea"}
                ],
                "label": label || ''
            };
        };

        //Module index
        page.analyze = {
            "clickArea": analyzeNav2('点击区域'),
            "__mockData": {}
        };

        //配置1级菜单(以下简称nav1）
        page.__nav1 = {//配置1级菜单(以下简称nav1)
            "main": {
                "label": "首页",
                "url": "#/main/index",
                "hideNav2": true
            },
            "analyze": {
                "label": "数据",
                "url": "#/analyze/clickArea"
            }
        };
        //nav2
        page.__nav2 = {
            "\/": {
                "nav1": 'main',
                "label": "首页"
            }
        };
        return page;
    })();

    // Page index
    mf.MAP.test = (function () {
        // page级别模块
        var page = {
            "__module": {
                "jesgoo-ck": {"private": true}
            },
            "__mockData": {}
        };

        var mainNav2 = function (label) {
            return {
                "nav1": "main",
                "list": [
                    {"nav2": "/main/index"}
                ],
                "label": label || ''
            };
        };

        //Module index
        page.main = {
            "index": mainNav2('测试'),
            "__mockData": {}
        };

        //配置1级菜单(以下简称nav1）
        page.__nav1 = {//配置1级菜单(以下简称nav1)
            "main": {
                "label": "首页",
                "url": "#/main/index",
                "hideNav2": true
            }
        };
        //nav2
        page.__nav2 = {
            "\/": {
                "nav1": 'main',
                "label": "首页"
            }
        };
        return page;
    })();

    mf.MAP.admin = (function () {
        // page级别模块
        var page = {
            "__module": {},
            "__mockData": {
                "user": {}
            }
        };

        var authorityAction = function (obj, authority, noAuthLocation) {
            obj = obj || {};
            authority = 'LOGIN' + (authority ? '&' + authority : '');
            noAuthLocation = noAuthLocation || '/index/login';
            return authorityActionBase(obj, authority, noAuthLocation);
        };

        var indexNav2 = function (label) {
            return {
                "nav1": "index",
                "list": [
                    //{"nav2": "/index/login"}
                ],
                "label": label || ''
            };
        };

        //Module index
        page.index = {
            "login": indexNav2('登录'),
            "__mockData": {}
        };

        var accountNav2 = function (label) {
            return {
                "nav1": "account",
                "list": [
                    {"nav2": "/account/userList"}
                ],
                "label": label || ''
            };
        };

        //Module account
        page.account = {
            "userList": authorityAction(accountNav2('用户列表')),
            "__mockData": {
                "mockLoginBack": {},
                "mockLogin": {}
            }
        };

        var manageNav2 = function (label) {
            return {
                "nav1": "manage",
                "list": [
                    {"nav2": "/manage/template"},
                    {"nav2": "/manage/strategy"}
                ],
                "label": label || ''
            };
        };

        //Module manage
        page.manage = {
            "template": authorityAction(manageNav2('新模版js更新')),
            "strategy": authorityAction(manageNav2('DSP策略配置')),
            "__mockData": {
                "templateTaskStatus": {}
            }
        };

        //配置1级菜单(以下简称nav1）
        page.__nav1 = {//配置1级菜单(以下简称nav1)
            /*"index": {
             "label": "首页",
             "url": "#/index/login",
             "hideNav2": true
             },*/
            "account": {
                "label": "账户管理",
                "url": "#/account/userList"
            },
            "manage": {
                "label": "系统管理",
                "url": "#/manage/template"
            }
        };
        //nav2
        page.__nav2 = {
            "\/": {
                "nav1": 'index',
                "label": "首页"
            }
        };
        return page;
    })();

    mf.MAP.index = (function () {
        // page级别模块
        var index = {
            "__module": {
                "underscore": {},
                "underscore_extend": {},
                "highchart_overview": {},
                "highchart_hourview": {},
                "highchart_drill": {},
                "highchart_medias": {},
                "template_source": {"private": true},
                "template_common": {"private": true},
                "jqxcore": {},
                "jqxdata": {},
                //"jqxdata.export": {},
                "jqxrangeselector": {},
                "jqxtabs": {},
                "jqxbuttons": {},
                "jqx.base": {},
                "jqx.darkblue": {},
                "jqxscrollbar": {},
                "jqxdatatable": {},
                "jqxtreegrid": {},
                "jqxlistbox": {},
                "jqxdropdownlist": {},
                "jqxcheckbox": {},
                "jqxcolorpicker": {},
                "jqxinput": {},
                "jqxwindow": {},
                "jqxdropdownbutton": {}
            },
            "__mockData": {
                "config": {},
                "user": {},
                "channel": {}
            }
        };

        var authorityAction = function (obj, authority, noAuthLocation) {
            obj = obj || {};
            authority = 'LOGIN' + (authority ? '&' + authority : '');
            noAuthLocation = noAuthLocation || '/index/login';
            return authorityActionBase(obj, authority, noAuthLocation);
        };

        var indexNav2 = function (label) {
            return {
                "nav1": "index",
                "list": [
                    {"nav2": "/index/dailyReport"}
                ],
                "label": label || ''
            };
        };

        //Module index
        index.index = {
            "login": indexNav2('登录'),
            "register": indexNav2('注册'),
            "dailyReport": authorityAction(indexNav2('日况')),
            "__mockData": {}
        };

        var mediaNav2 = function (label) {
            return {
                "nav1": "media",
                "list": [
                    {"nav2": "/media/site"},
                    {"nav2": "/media/sitePosition", parentPath: "/media/site"},
                    {"nav2": "/media/app"},
                    {"nav2": "/media/appPosition", parentPath: "/media/app"}
                ],
                "label": label || ''
            };
        };

        //Module media
        index.media = {
            "site": authorityAction(mediaNav2('网站管理')),
            "sitePosition": authorityAction(mediaNav2('网站广告位')),
            "app": authorityAction(mediaNav2('应用管理')),
            "appPosition": authorityAction(mediaNav2('应用广告位')),
            "siteTemplate": authorityAction(mediaNav2('网站自定义模版')),
            "templateBannerTextIcon": authorityAction(mediaNav2('Banner 图文')),
            "templateBannerImage": authorityAction(mediaNav2('Banner 图片')),
            "templateBannerFree": authorityAction(mediaNav2('Banner 自定义图文')),
            "__mockData": {}
        };

        var accountNav2 = function (label) {
            return {
                "nav1": "account",
                "list": [
                    {"nav2": "/account/info"},
                    {"nav2": "/account/password"}
                ],
                "label": label || ''
            };
        };
        //Module account
        index.account = {
            "info": authorityAction(accountNav2('基本信息')),
            "password": authorityAction(accountNav2('密码设置')),
            "__mockData": {}
        };

        var reportNav2 = function (label) {
            return {
                "nav1": "report",
                "list": [
                    {"nav2": "/report/index"}
                ],
                "label": label || ''
            };
        };
        //Module report
        index.report = {
            "index": authorityAction(reportNav2('数据报表')),
            "total": authorityAction(reportNav2('总体数据报表')),
            "media": authorityAction(reportNav2('媒体报表')),
            "position": authorityAction(reportNav2('广告位报表')),
            "dailyTotal": authorityAction(reportNav2('账户总体多日')),
            "dailyMedias": authorityAction(reportNav2('多媒体多日')),
            "dayMedias": authorityAction(reportNav2('多媒体单日')),
            "dailyChannel": authorityAction(reportNav2('单渠道多日')),
            "dailyMedia": authorityAction(reportNav2('单媒体多日')),
            "hourlyMedia": authorityAction(reportNav2('单媒体单日分小时')),
            "hourlyPositions": authorityAction(reportNav2('单媒体全部广告位单日分小时')),
            "dailyPosition": authorityAction(reportNav2('单广告位多日')),
            "dayPositions": authorityAction(reportNav2('单媒体多广告位单日')),
            "dailyPositions": authorityAction(reportNav2('单媒体多广告位多日')),
            "hourlyPosition": authorityAction(reportNav2('单广告位单日分小时')),
            "__mockData": {}
        };

        //配置1级菜单(以下简称nav1）
        index.__nav1 = {//配置1级菜单(以下简称nav1)
            /*"index": {
             "label": "首页",
             "url": "#/index/dailyReport",
             "hideNav2": true
             },*/
            "media": {
                "label": "媒体管理",
                "url": "#/media/site"
            }/*,
             "account": {
             "label": "账户信息",
             "url": "#/account/info"
             }*/,
            "report": {
                "label": "数据报表",
                "url": "#/report/index",
                "hideNav2": true
            }
        };
        //nav2
        index.__nav2 = {
            "\/": {
                "nav1": 'index',
                "label": "首页"
            }
        };
        return index;
    })();

    mf.MAP.ud = (function () {
        // page级别模块
        var index = {
            "__module": {
                "highchart_overview": {},
                "highchart_drill": {},
                "highchart_medias": {}
            },
            "__mockData": {
                "user": {}
            }
        };

        var authorityAction = function (obj, authority, noAuthLocation) {
            obj = obj || {};
            authority = 'LOGIN' + (authority ? '&' + authority : '');
            noAuthLocation = noAuthLocation || '/index/login';
            return authorityActionBase(obj, authority, noAuthLocation);
        };

        var indexNav2 = function (label) {
            return {
                "nav1": "index",
                "list": [
                ],
                "label": label || ''
            };
        };

        //Module index
        index.index = {
            "login": indexNav2('登录'),
            "__mockData": {}
        };

        var accountNav2 = function (label) {
            return {
                "nav1": "account",
                "list": [
                    {"nav2": "/account/info"},
                    {"nav2": "/account/password"}
                ],
                "label": label || ''
            };
        };
        //Module account
        index.account = {
            "info": authorityAction(accountNav2('基本信息')),
            "password": authorityAction(accountNav2('密码设置')),
            "__mockData": {}
        };

        var reportNav2 = function (label) {
            return {
                "nav1": "report",
                "list": [
                    {"nav2": "/report/index"}
                ],
                "label": label || ''
            };
        };
        //Module report
        index.report = {
            "index": authorityAction(reportNav2('数据报表')),
            "total": authorityAction(reportNav2('总体数据报表')),
            "media": authorityAction(reportNav2('媒体报表')),
            "position": authorityAction(reportNav2('广告位报表')),
            "dailyTotal": authorityAction(reportNav2('账户总体多日')),
            "dailyMedias": authorityAction(reportNav2('多媒体多日')),
            "dayMedias": authorityAction(reportNav2('多媒体单日')),
            "dailyMedia": authorityAction(reportNav2('单媒体多日')),
            "dailyPosition": authorityAction(reportNav2('单广告位多日')),
            "dayPositions": authorityAction(reportNav2('单媒体多广告位单日')),
            "dailyPositions": authorityAction(reportNav2('单媒体多广告位多日')),
            "__mockData": {}
        };

        //配置1级菜单(以下简称nav1）
        index.__nav1 = {//配置1级菜单(以下简称nav1)
            /*"index": {
             "label": "首页",
             "url": "#/index/dailyReport",
             "hideNav2": true
             },
            "media": {
                "label": "媒体管理",
                "url": "#/media/site"
            },
             "account": {
             "label": "账户信息",
             "url": "#/account/info"
             },*/
            "report": {
                "label": "数据报表",
                "url": "#/report/index",
                "hideNav2": true
            }
        };
        //nav2
        index.__nav2 = {
            "\/": {
                "nav1": 'index',
                "label": "首页"
            }
        };
        return index;
    })();

    for (var page in mf.MAP) {
        if (page.indexOf('__') > -1) {
            continue;
        }
        var n2 = mf.MAP[page].__nav2 = mf.MAP[page].__nav2 || {};
        for (var module in mf.MAP[page]) {
            if (module.indexOf('__') > -1) {
                continue;
            }
            for (var model in mf.MAP[page][module]) {
                var n2Key = '/' + module + '/' + model;
                if (model.indexOf('__') > -1 || n2[n2Key]) {
                    continue;
                }
                var modelValue = mf.MAP[page][module][model];
                n2[n2Key] = {
                    "nav1": modelValue.nav1 || (function (o) {
                        for (var i in o) {
                            return i;
                        }
                    })(mf.MAP[page].__nav1),
                    "label": modelValue.label || model,
                    "list": modelValue.list || modelValue
                };
            }
        }
    }
})();

/**
 * 该文件同时被node读取，生成站点文件（/src/**）
 */
if (typeof exports !== 'undefined') {
    exports.MAP = mf.MAP;
}