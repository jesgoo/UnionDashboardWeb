/**
 * @file 定义站点地图
 * 注： 该文件需要保持JSON文本格式，用于文档生成（如key使用双引号）
 */
mf = typeof mf === 'undefined' ? {} : mf;

(function () {
    var authorityAction = function (obj, authority, noAuthLocation) {
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
            "fixedInScroll": {},
            "commandElement": {},
            "utils": {},
            "validate": {},
            "processBar": {},
            "uiOperateButton": {},
            "uiFilterSelect": {},
            "databaseSQL": {},
            "datafileEdit": {}
        }
    };
    // Page about
    
    // Page admin index
    mf.MAP.index = (function () {
        // page级别模块
        var admin = {
            "__module": {
            },
            "__mockData": {
            }
        };
        var adminAuthorityAction = function (obj, authority, noAuthLocation) {
            obj = obj || {};
            authority = 'LOGIN' + (authority ? '&' + authority : '');
            noAuthLocation = noAuthLocation || '/index/login';
            return authorityAction(obj, authority, noAuthLocation);
        };
        var INDEX_NAV2 = function (label) {
            return {
                "nav1": "index",
                "list": [
                    {"nav2": "/index/main"},
                    {"nav2": "/index/changePwd"}
                ],
                "label": label || ''
            };
        };

        //Module index
        admin.index = {
            "login": INDEX_NAV2('登录'),
            "main": adminAuthorityAction(INDEX_NAV2('站点概况')),
            "changePwd": adminAuthorityAction(INDEX_NAV2('密码设置'))
        };

        var USER_NAV2 = adminAuthorityAction({
            "nav1": 'user',
            "list": [
                {"nav2": "/user/listApplication"}
            ],
            "label": ''
        });

        
        //Module user 用户管理
        admin.user = {
            "listApplication": USER_NAV2,
            "__mockData": {
                "operateApplication": {},
                "exportApplication": {}
            }
        };

        var SYSTEM_NAV2 = function (label) {
            return adminAuthorityAction(
                {
                    "nav1": 'system',
                    "list": [
                        {"nav2": "/admin/editContent"},
                        {"nav2": "/admin/database"}
                    ],
                    "label": label || ''
                },
                'SYSTEM'
            );
        };
        //Module admin 管理员管理
        admin.admin = {
            "editContent": SYSTEM_NAV2('内容管理'),
            "database": SYSTEM_NAV2('数据库'),
            "__mockData": {
                "getDataFile": {},
                "saveDataFile": {},
                "publishWeb": {}
            }
        };
        //配置1级菜单(以下简称nav1）
        admin.__nav1 = {//配置1级菜单(以下简称nav1）
            "index": {
                "label": "首页",
                "url": "#/index/main",
                "hideNav2": false
            },
            "system": {
                "label": "系统管理",
                "url": "#/admin/editContent",
                "authority": "SYSTEM"
            },
            "user": {
                "label": "账户管理",
                "url": "#/user/listApplication",
                "hideNav2": true
            }
        };
        //nav2
        admin.__nav2 = {
            "\/": {
                "nav1": 'index',
                "label": "首页"
            }
        };
        return admin;
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