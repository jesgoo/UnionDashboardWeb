/**
 * @file 规划线上和线下开关
 * @author Yijun Deng <dengyijun@baidu.com>
 * @date Tue Apr 21 2014 16:24:15 GMT+0800 (中国标准时间)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 * 规划线上和线下开关
 * shortcut mf.m.isFlagOn
 */
(function (exports, module) {
    var FLAGS = {};

    var Flag = function (name, desc, isOn) {
        this.name = 'ENABLE_' + name;
        this.desc = 'This flag enables ' + desc;
        this.isOn = isOn;
    };

    function addFlag(flag) {
        FLAGS[flag.name] = flag;
    }

    // addFlag(new Flag('HAIJU', 'HAIJU, 2014-12-31 online', false));
    // addFlag(new Flag('HAO123', 'HAO123, 2014-12-31 online', true));

    exports.isFlagOn = function (name) {
        var flag = FLAGS['ENABLE_' + name];
        if (flag) {
            return flag.isOn;
        }
        return false;
    };
})(mf && mf.m || exports || {}, mf || module);