/**
 * @file Generated by er-sync, module
 * @author Luics<xukai01@baidu.com>
 * @date Fri Mar 07 2014 11:15:21 GMT+0800 (中国标准时间)
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * shortcut mf.m.processBar
 */
(function(exports, module) {
    /**
     * 对于路标的class控制，通过传入当前step来实现路标的既定样式
     * @param {Object} opt
     * @param {int} opt.step 当前step，新建时0123代表4个步骤
     */
    var processBar = function(opt) {
        var eleClass = opt.ele || 'process-bar';
        var arrowClass = opt.arrow || 'process-arrow';
        var passed = opt.passed || 'process-bar-pass';
        var active = opt.active || 'process-bar-activation';
        var arrowPassed = opt.arrowPassed || 'process-arrow-pass';
        var arrowActive = opt.arrowActive || 'process-arrow-activation';
        var step = opt.step;
        $('.' + eleClass + ':eq(' + step + ')').addClass(active);
        $('.' + arrowClass + ':eq(' + step + ')').addClass(arrowActive);
        $('.' + eleClass + ':lt(' + step + ')').addClass(passed);
        $('.' + arrowClass + ':lt(' + step + ')').addClass(arrowPassed);
    };
    exports.processBar = processBar;
})(mf && mf.m || exports || {}, mf || module);