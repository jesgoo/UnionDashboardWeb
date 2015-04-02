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
            "preview": { "private": true },
            "config": { "private": true }
        }
    };
    // Page about
    
    // Page index
    mf.MAP.index = (function () {
        // page级别模块
        var index = {
            "__module": {
                "highchart_overview": { "private": true },
                "highchart_hourview": { "private": true },
                "highchart_drill": { "private": true }
            },
            "__mockData": {
                "config": {},
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
            "dailyReport": authorityAction(indexNav2('日况')),
            "__mockData": {
            }
        };

        var mediaNav2 = function (label) {
            return {
                "nav1": "media",
                "list": [
                    {"nav2": "/media/site"},
                    {"nav2": "/media/sitePosition", parentPath: "/media/site"},
                    {"nav2": "/media/app"}
                ],
                "label": label || ''
            };
        };

        //Module media
        index.media = {
            "site": authorityAction(mediaNav2('网站管理')),
            "sitePosition": authorityAction(mediaNav2('网站广告位')),
            "app": authorityAction(mediaNav2('应用管理')),
            "__mockData": {
                "siteUpdate": {},
                "appUpdate": {},
                "sitePositionUpdate": {}
            }
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
            "__mockData": {
            }
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
            "__mockData": {
            }
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
                "url": "#/media/site",
                "hideNav2": true
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