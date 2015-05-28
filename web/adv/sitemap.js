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
    
    mf.MAP.index = (function () {
        // page级别模块
        var index = {
            "__module": {
                "regionTypes": {"private": true}
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
                "list": [],
                "label": label || ''
            };
        };

        //Module index
        index.index = {
            "login": indexNav2('登录'),
            "register": indexNav2('注册'),
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

        var marketNav2 = function (label) {
            return {
                "nav1": "market",
                "list": [
                    {"nav2": "/market/plan"},
                    {"nav2": "/market/unit", "parentPath": "/market/plan"},
                    {"nav2": "/market/idea"}
                ],
                "label": label || ''
            };
        };
        //Module market
        index.market = {
            "plan": authorityAction(marketNav2('投放计划')),
            "unit": authorityAction(marketNav2('策略设置')),
            "idea": authorityAction(marketNav2('创意设置')),
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
            "__mockData": {}
        };

        index.__nav1 = {
            "account": {
                "label": "账户信息",
                "url": "#/account/info"
            },
            "market": {
                "label": "推广管理",
                "url": "#/market/plan"
            },
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