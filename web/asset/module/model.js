/**
 * @file Generated by er-sync, module
 * @author Luics<xukai01@baidu.com>
 * @date Wed Sep 25 2013 11:53:46 GMT+0800 (中国标准时间)
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * 模拟的model，防止没有er是，model的set,get方法能正常运作
 * shortcut mf.m.model
 */
(function(exports, module) {
    var context = {};
    var model = {
        get: function(field) {
            return context[field];
        },
        set: function(field, value) {
            context[field] = value;
        }
    };
    exports.model = model;
})(mf && mf.m || exports || {}, mf || module);