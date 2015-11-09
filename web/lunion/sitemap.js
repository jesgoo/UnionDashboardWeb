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
            "download": {},
            "preview": {"private": true},
            "config": {"private": true}
        }
    };
    // Page about
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
                "template_common": {"private": true}
            },
            "__mockData": {
                "config": {},
                "user": {},
                "channel": {}
            }
        };

        var authorityAction = function (obj, authority, noAuthLocation) {
            return authorityActionBase(obj || {}, 'LOGIN' + (authority ? '&' + authority : ''), noAuthLocation || '/index/login');
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
            "loginJesgoo": indexNav2('登录'),
            "register": indexNav2('注册'),
            "__mockData": {}
        };

        var accountNav2 = function (label) {
            return {
                "nav1": "account",
                "list": [
                    {"nav2": "/account/index"},
                    {"nav2": "/account/info"}
                ],
                "label": label || ''
            };
        };
        //Module account
        index.account = {
            "index": authorityAction(accountNav2('账户一览'), 'VALID', '/account/info'),
            "info": authorityAction(accountNav2('开发者信息')),
            "__mockData": {}
        };

        var mediaNav2 = function (label, authority) {
            return authorityAction({
                "nav1": "media",
                "list": [
                    {"nav2": "/media/app"},
                    {"nav2": "/media/appPosition", parentPath: "/media/app"}
                ],
                "label": label || ''
            }, 'VALID' + (authority ? '&' + authority : ''));
        };

        //Module media
        index.media = {
            "app": mediaNav2('应用管理'),
            "appPosition": mediaNav2('应用广告位'),
            "__mockData": {}
        };

        var reportNav2 = function (label, authority) {
            return authorityAction({
                "nav1": "report",
                "list": [
                    {"nav2": "/report/index"}
                ],
                "label": label || ''
            }, 'VALID' + (authority ? '&' + authority : ''));
        };
        //Module report
        index.report = {
            "index": reportNav2('数据报表'),
            "total": reportNav2('总体数据报表'),
            "media": reportNav2('媒体报表'),
            "position": reportNav2('广告位报表'),
            "dailyTotal": reportNav2('账户总体多日'),
            "dailyMedias": reportNav2('多媒体多日'),
            "dayMedias": reportNav2('多媒体单日'),
            "dailyChannel": reportNav2('单渠道多日'),
            "dailyMedia": reportNav2('单媒体多日'),
            "hourlyMedia": reportNav2('单媒体单日分小时'),
            "hourlyPositions": reportNav2('单媒体全部广告位单日分小时'),
            "dailyPosition": reportNav2('单广告位多日'),
            "dayPositions": reportNav2('单媒体多广告位单日'),
            "dailyPositions": reportNav2('单媒体多广告位多日'),
            "hourlyPosition": reportNav2('单广告位单日分小时'),
            "__mockData": {}
        };

        //配置1级菜单(以下简称nav1）
        index.__nav1 = {//配置1级菜单(以下简称nav1)
            /*"index": {
             "label": "首页",
             "url": "#/index/dailyReport",
             "hideNav2": true
             },*/
            "account": {
                "label": "账户信息",
                "url": "#/account/index"
            },
            "media": {
                "label": "媒体管理",
                "url": "#/media/app",
                "authority": "VALID",
                "hideNav2": true
            },
            "report": {
                "label": "数据报表",
                "url": "#/report/index",
                "authority": "VALID",
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