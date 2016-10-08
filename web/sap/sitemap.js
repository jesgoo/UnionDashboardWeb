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
            "config": {"private": true},
            "highchart_drill_cost": {"private": true},
            "highchart_drill": {"private": true},
            "highchart_overview": {"private": true}
        }
    };
    // Page admin
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
                "userCharge": {},
                "mockLoginBack": {},
                "mockLogin": {}
            }
        };

        /*var manageNav2 = function (label) {
            return {
                "nav1": "manage",
                "list": [
                    {"nav2": "/manage/dspID"},
                    {"nav2": "/manage/percentage"},
                    {"nav2": "/manage/adjust"},
                    {"nav2": "/manage/strategy"},
                    {"nav2": "/manage/template"}
                ],
                "label": label || ''
            };
        };*/

        //Module manage
        /*page.manage = {
            "percentage": authorityAction(manageNav2('媒体分成配置')),
            "adjust": authorityAction(manageNav2('价格均衡')),
            "template": authorityAction(manageNav2('新模版js更新')),
            "strategy": authorityAction(manageNav2('DSP策略配置')),
            "dspID": authorityAction(manageNav2('DSP_ID配置')),
            "adslotDSPID": authorityAction(manageNav2('广告位DSP配置')),
            "mediaDSPID": authorityAction(manageNav2('媒体DSP配置')),
            "userDSPID": authorityAction(manageNav2('用户DSP配置')),
            "domainDSPID": authorityAction(manageNav2('域名DSP配置')),
            "baiduDSP": authorityAction(manageNav2('百度DSP_ID配置')),
            "baidu5DSP": authorityAction(manageNav2('百度DSP_5.0_ID配置')),
            "tencentDSP": authorityAction(manageNav2('腾讯DSP_ID配置')),
            "__mockData": {
                "templateTaskStatus": {},
                "channel": {},
                "media": {},
                "adslot": {}
            }
        };*/

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
            }/*,
            "manage": {
                "label": "系统管理",
                "url": "#/manage/dspID"
            }*/
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
    // Page index
    
    mf.MAP.index = (function () {
        // page级别模块
        var index = {
            "__module": {
                "regionTypes": {"private": true},
                "Upload": {}
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
                    {"nav2": "/account/index"},
                    //{"nav2": "/account/info"},
                    {"nav2": "/account/password"}
                ],
                "label": label || ''
            };
        };
        //Module account
        index.account = {
            "index": authorityAction(accountNav2('账户一览')),
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
                    {"nav2": "/market/idea"},
                    {"nav2": "/market/ideaDetail", "parentPath": "/market/idea"},
                    {"nav2": "/market/resource"}
                ],
                "label": label || ''
            };
        };
        //Module market
        index.market = {
            "plan": authorityAction(marketNav2('投放计划')),
            "unit": authorityAction(marketNav2('策略设置')),
            "target": authorityAction(marketNav2('定向投放')),
            "idea": authorityAction(marketNav2('创意设置')),
            "ideaDetail": authorityAction(marketNav2('创意编辑')),
            "resource": authorityAction(marketNav2('素材管理')),
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
            "plan": authorityAction(reportNav2('计划报表')),
            "unit": authorityAction(reportNav2('策略报表')),
            "idea": authorityAction(reportNav2('创意报表')),
            "dailyTotal": authorityAction(reportNav2('账户总体多日')),
            "dayPlan": authorityAction(reportNav2('计划单日')),
            "dayOS": authorityAction(reportNav2('操作系统单日')),
            "dayRegion": authorityAction(reportNav2('地域分布单日')),
            "dailyPlan": authorityAction(reportNav2('单计划多日')),
            "dayUnit": authorityAction(reportNav2('单计划多策略单日')),
            "dailyUnit": authorityAction(reportNav2('单策略多日')),
            "dayIdea": authorityAction(reportNav2('单策略多创意单日')),
            "dailyIdea": authorityAction(reportNav2('单创意多日')),
            "__mockData": {
                "cost_total": {},
                "cost_os": {},
                "cost_region": {}
            }
        };

        index.__nav1 = {
            "account": {
                "label": "账户信息",
                "url": "#/account/index"
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