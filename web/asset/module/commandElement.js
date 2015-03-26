/**
 * @file Generated by er-sync, module
 * @author Luics<xukai01@baidu.com>
 * @date Mon Nov 18 2013 10:18:31 GMT+0800 (中国标准时间)
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * 带命令处理功能的元素，必要参数data-cmd，其他参数为data-param
 * shortcut mf.m.commandElement
 */
(function(exports, module) {
    var commands = {};
    var regCount = 0;
    var commandElement = function(eventType, cmdField) {
        cmdField = cmdField || 'cmd';
        commands[cmdField] = commands[cmdField] || {};
        eventType = (eventType || 'click') + '.' + cmdField;
        $('body').off(eventType).on(eventType, function(e) {
            var options = {};
            var attr = e.target.attributes;
            var optionRegExp = /^data\-\w+$/i;
            $.each(attr, function(i, n) {
                if (optionRegExp.test(n.name)) {
                    options[n.name.substring(5)] = n.value;
                }
            });
            var cmdHandle;
            var cmd = options[cmdField];
            if (!cmd) return true;
            for (var i in commands) {
                var cmdItem = commands[i];
                if (cmdItem && (cmdHandle = cmdItem[cmd]) && cmdHandle._unique == i) {
                    if (!cmdHandle.region || $(e.target).parents().filter(cmdHandle.region).length) {
                        cmdHandle.call(e, $.extend({}, cmdHandle.opt, options));
                        break;
                    }
                }
            }
        });
        var tool = {
            register: function(arr, optCommon) {
                arr = [].concat(arr);
                optCommon = optCommon || {};
                regCount += 1;
                var regs = [];
                var cmdList = {};
                $.each(arr, function(i, n) {
                    var cmd = n[cmdField];
                    var handle = n.handle;
                    if (!cmd || !handle) return false;
                    regs.push(cmd);
                    var region = n.region || optCommon.region;
                    region && (handle.region = region);
                    handle._unique = regCount;
                    handle.opt = $({}, optCommon, n);
                    cmdList[cmd] = handle;
                });
                commands[regCount] = cmdList;
                return regCount;
            },
            dispose: function(unique) {
                delete commands[unique];
            }
        };
        return tool;
    };
    commandElement.commands = commands;
    exports.commandElement = commandElement;
})(mf && mf.m || exports || {}, mf || module);