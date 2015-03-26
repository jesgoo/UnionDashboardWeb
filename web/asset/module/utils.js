/**
 * @file Generated by er-sync, module
 * @author Luics<xukai01@baidu.com>
 * @date Mon Dec 02 2013 15:21:47 GMT+0800 (中国标准时间)
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * 功能型函数集合
 * shortcut mf.m.utils
 */
(function (exports, module, _undefined) {
    var utils = {};
    utils.toBoolean = function (str) {
        if (typeof str === 'string') {
            if (str === 'true') {
                return true;
            } else if (str === 'false') {
                return false;
            } else {
                return null;
            }
        }
        return !!str;
    };
    utils.hasValue = function (value) {
        return value !== null && value !== _undefined;
    };
    /*
     * 对象形数组内查找
     * 
     * 策略
     * 给定包含多个相似对象的数组，。
     * 所需参数按前后顺序表示
     * 第一个参数 number 位移 表示查找的开始位置 此参数可选，若无此参数则第二参数表示第一参数
     * 第二个参数 array 数组 包含的各个项是结构相似的对象
     * 第三个参数 * 查找值  可以是 function ,接受参数 index, item  this === item
     * 第三个参数为非function时 第四个及以上参数 string 表示对象结构里的键及键值的下n级键  无此参数则类似 $.inArray()
     * 
     * @return {number} 查找值在数组内的序号，如果无则返回 -1
     * 例：
     * 数组arr = [{a:{b,1}}, {a:{b,2}}, {a:{b,3}}, {a:{b,2}}] ，查找a 中有 b  = 2 的对象序号
     * 调用 mf.m.utils.indexOfArray(arr, 2, 'a' , 'b')， 返回 1;
     * 继续查找a 中有 b  = 2 的对象序号
     * 调用 mf.m.utils.indexOfArray(2, arr, 2, 'a' , 'b')， 返回 3;
     * */
    utils.indexOfArray = function (a, v) {
        var ags = [].slice.call(arguments);
        var al = ags.length;
        var be = 0, oj = 2;
        if (typeof(a) === 'number') {
            be = a;
            a = v;
            v = ags[2];
            oj = 3;
        }
        if (!$.isArray(a)) {
            return -1;
        }
        v = (function (fn) {
            if (typeof fn === 'function') {
                return v;
            } else {
                return function (index, item) {
                    for (var j = oj; j < al; j++) {
                        if (!$.isPlainObject(item)) {
                            break;
                        }
                        item = item[ags[j]];
                    }
                    return item == fn && j == al;
                };
            }
        })(v);
        for (var i = be, length = a.length; i < length; i++) {
            if (v.call(a[i], i, a[i])) {
                return i;
            }
        }
        return -1;
    };

    /*
     * 深度搜索
     * 
     * 策略
     * 给定包含对象的数组，下探subKey，存在则递归。不存在则搜索目前级别数组是否存在键值为v的对象。
     * 下探深度通过optionDeep控制
     * 其中a,v [,...] 同indexOfArray一样
     * 第一个参数 string 表示查找的下一级键名
     * 第二个参数 array 数组 包含的各个项是结构相似的对象
     * 第三个参数 * 查找值
     * 第四个及以上参数 string 和 mf.m.utils.indexOfArray 相似
     * 最后一个参数 number 不小于0的数字，可选 表示下探下一层的深度 1表示只下探一层， 默认无限级下探
     * 
     * @return {object} 表示找到v对象，其上一级在v的parent里。
     * 例：
     * 数组arr = [{n: 1,c[{n:11, c:[{n:111}, {n:112}]}]},{n: 2,c[{n:21, c:[{n:211}, {n:212}]}]}] ，查找n值为212的项
     * 调用 mf.m.utils.deepSearch('c', arr, 212, 'n')， 返回 {n:212, parent:{n:21, parent:{n:2}}};
     * */
    utils.deepSearch = function () {
        var args = [].slice.call(arguments, 0);
        var optionDeep = args.slice(-1)[0];
        if (typeof optionDeep !== 'number') {
            optionDeep = -1;
            args.push(optionDeep);
        }
        var subKey = args[0];
        if (typeof subKey !== 'string') {
            subKey = '';
            args.unshift('');
        }
        var a = [].concat(args[1]);
        var r;
        var l = a.length;
        var i = 0;
        args[args.length - 1] -= 1;
        if (optionDeep && subKey) {
            for (; i < l; i++) {
                if (a[i][subKey]) {
                    args[1] = a[i][subKey];
                    r = arguments.callee.apply(null, args);
                    if (r) {
                        var parent = r;
                        while (parent.parent) {
                            parent = parent.parent;
                        }
                        parent = parent.parent = $.extend({}, a[i]);
                        delete parent[subKey];
                        break;
                    }
                }
            }
        }
        if (!r) {
            args[1] = a;
            i = utils.indexOfArray.apply(null, args.slice(1, -1));
            if (i > -1) {
                r = $.extend({}, a[i]);
            }
        }
        return r;
    };

    /**
     * 节流函数
     * 保证fn在一定时间内只执行一次
     *
     * @param {Function} fn 执行函数
     * @param {number=100} interval 节流间隔
     */
    utils.throttle = function (fn, interval) {
        interval = interval || 100;
        var timestamp;
        var args = [].slice.call(arguments, 2);
        var lastArgs = [];
        return function () {
            var me = this;
            lastArgs = [].slice.call(arguments, 0);
            if (!timestamp) {
                timestamp = setTimeout(function () {
                    timestamp = null;
                    fn.apply(me, args.concat(lastArgs));
                    lastArgs = [];
                }, interval);
            }
        }
    };

    /**
     * 下一个时序执行
     * 可以只传入一个fn
     * @param {function} fn 将要执行的函数
     * 也可传入多个，第一个指定fn的this指针，第二个是fn，第三个及以后是传入fn的参数
     */
    utils.nextTick = function () {
        var args = [].slice.call(arguments);
        var fn = args[0];
        var me = {};
        if (!$.isFunction(fn)) {
            me = fn;
            fn = args[1];
            args.shift();
        }
        setTimeout(function () {
            fn && fn.apply(me, args.slice((1)));
        }, 0);
    };
    /**
     * 下一个时序执行函数的包装
     * 可以只传入一个fn
     * @param {function} fn 将要执行的函数
     * @param {*} context 将要执行的函数this指针
     * @return {function}
     */
    utils.nextTickWrapper = function (fn, context) {
        var argsWrapper = [].slice.call(arguments).slice(2);
        return function () {
            var args = [].slice.call(arguments);
            args.unshift(fn);
            args.unshift(context || this);
            args = args.concat(argsWrapper);
            utils.nextTick.apply(null, args);
        }
    };
    /**
     * 将source里的key按照rules的key映射成rules的value
     * @param {Object} source 源
     * @param {Object} rules 映射规则
     * @return {Object}
     */
    utils.reflect = function (source, rules) {
        for (var i in rules) {
            if (i in source) {
                source[rules[i]] = source[i];
                delete source[i];
            }
        }
        return source;
    };
    
    /**
     * url http和https的自动填补util函数
     * @param {string} value url字符串
     */
    utils.urlUtil = function (value) {
        var tempValue = value.replace(/^\s*(https?(\:\/\/|%3a%2f%2f))+/ig, '');
        var prefix = (/^\s*https/i.test(value) ? 's' : '');
        return ['http' + prefix + '://' + tempValue, tempValue];
    };
    
    /**
     * 按4个空格缩进的格式化json对象为文本
     * @param {*} obj 待格式化的目标
     * @param {number} deep 缩进层级
     * @return {string}
     */
    var inspect = function (obj, deep) {
        deep = deep || 0;
        var indent = new Array(deep * 4).join(' ');
        var indentNext = new Array(deep * 4 + 4).join(' ');
        if ($.isArray(obj)) {
            return '[\n' + $.map(obj, function (n, i) {
                return indentNext + inspect(n, deep + 1);
            }).join(',\n') + '\n' + indent + ']';
        } else if ($.isPlainObject(obj)) {
            return '{\n' + $.map(obj, function (n, i) {
                return indentNext + '"' + i + '": ' + inspect(n, deep + 1);
            }).join(',\n') + '\n' + indent + '}';
        } else if (typeof obj == 'string') {
            return '"' + obj + '"';
        } else {
            return obj;
        }
    };
    utils.inspect = inspect;
    
    /**
     * 按4个空格缩进的格式化json文本，便于查看使用
     * @param {*} target 待格式化的目标，若为字符串时，将试转换为对象
     * @return {string}
     */
    utils.JSONFormat = function (target) {
        if (!target) {
            throw 'formatJSON get an empty target';
        }
        if (typeof target == 'string') {
            try {
                target = new Function('return ' + target)();
            } catch (e) {
            }
        }
        return inspect(target, 0);
    };
    
    /**
     * 将字符串的第一个字符变成大写形式
     * @param {string} str 待格式化的目标
     * @return {string}
     */
    utils.toFirstUpperCase = function (str) {
        return str.slice(0, 1).toUpperCase() + str.slice(1);
    };
    /*
    * 递归获取或设置对象内容
    * */
    utils.recursion = {
        get: function (obj, field, defaultValue) {
            field = field.split('.');
            var targetValue = obj;
            for (var i = 0, l = field.length; i < l; i += 1) {
                targetValue = targetValue[field[i]];
                if (!targetValue && i + 1 < l) {
                    break;
                }
            }
            return targetValue !== _undefined ? targetValue : defaultValue;
        },
        set: function (obj, field, value) {
            field = field.split('.');
            var valueField = field.pop();
            var subField = obj;
            var targetField;
            for (var i = 0, l = field.length; i < l; i += 1) {
                subField[field[i]] = targetField = subField[field[i]] || {};
                subField = targetField;
            }
            subField[valueField] = value;
            return obj;
        },
        del: function (obj, field) {
            field = field.split('.');
            var subField = obj, targetValue, start = -1, l = field.length;
            for (var i = 0; i < l; i += 1) {
                targetValue = subField[field[i]];
                if (!utils.hasValue(targetValue)) {
                    start = i;
                    break;
                }
                subField = targetValue;
            }
            for (;start > -1; start -= 1) {
                targetValue = utils.recursion.get(obj, field.slice(0, start - 1).join);
                if (!utils.hasValue(targetValue)) {
                    start = i;
                    break;
                }
            }
            return obj;
        }
    };

     module.exports = exports.utils = utils;
})(mf && mf.m || exports || {}, mf || module);