/**
 * @file Generated by er-sync, module
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Tue Oct 08 2013 12:26:41 GMT+0800 (中国标准时间)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 * 权限解析模块
 * shortcut mf.m.authority
 */
(function(exports, module) {
    var keys = {
        hao: {
            admin: {},
            user: {}
        }
    };
    function enhanceAllow (fn) {
        er.permission.isAllow = function (name) {
            var allow = false;
            var nameOr = (name || '').split('|');
            for (var i = 0; i < nameOr.length; ++i) {
                var nameAnd = nameOr[i].split('&');
                var nameOrValue = true;
                for (var j = 0; j < nameAnd.length; ++j) {
                    nameOrValue = nameOrValue && fn(nameAnd[j]);
                }
                allow = allow || nameOrValue;
            }
            return allow;
        };
    }
    var authority = function(site, page) {
        site = site || 'hao';
        page = page || 'user';
        keys[site] = keys[site] || {};
        var tempKeys = keys[site][page] = keys[site][page] || {};
        enhanceAllow(er.permission.isAllow);
        return {
            parse: function (value) {
                value = value || 0;
                var auth = {};
                if (typeof value === 'string') {
                    if (value === 'false') value = 0;
                    else if (value === 'true') value = 1;
                    else {
                        try {
                            value = JSON.parse(value);
                        }
                        catch (e) {
                            try {
                                value = parseInt(value);
                            }
                            catch (e) {
                                value = 0;
                            }
                        }
                    }
                }
                if (typeof value === 'number') {
                    for (var valueKey in tempKeys) {
                        auth[valueKey] = (value & tempKeys[valueKey]) === tempKeys[valueKey];
                    }
                }
                else for (valueKey in value) {
                    var key = tempKeys[valueKey];
                    var temp = value[valueKey];
                    for (var attr in key) auth[attr] = (temp & key[attr]) === key[attr];
                }
                er.permission.init(auth);
                console.log('parse %cauthority result', 'color:#990;', auth);
                return auth;
            },
            isAdminLogin: function () {
                return er.permission.isAllow('LOGIN');
            },
            isAppUserBinded: function () {
                return er.permission.isAllow('BIND_USER');
            },
            keys: tempKeys,
            register: function(authorityMap){
                for(var i in authorityMap){
                    tempKeys[i] = authorityMap[i];
                }
            }
        };
    };
    exports.authority = authority;
})(mf && mf.m || exports || {}, mf || module);