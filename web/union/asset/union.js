/**
 * @file Generated by er-sync
 * @author Luics<xukai01@baidu.com>
 * @date Tue Mar 17 2015 09:45:32 GMT+0800 (CST)
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 */
$(function () {
    console.log('er.init union');
    try {
        mf.authority.parse(mf.getUser().authority);
    }
    catch (e) {
    }

    mf.ajaxResponse['/config'] = mf.m.config;
    er.init();
});

mf.union = mf.union || {};

/**
 * 加强mf.js中的定义
 */
mf.onenter = (function (fn) {
    return function (opt) {
        opt = opt || {};
        opt.sep = '|';
        fn(this, opt);
    };
})(mf.onenter);

/*
 * 重写表格编辑启动器值获取逻辑，支持嵌套对象
 * */
esui.Table.prototype.startEdit = function (type, rowIndex, columnIndex) {
    if (this.editable) {
        var entrance = baidu.g(this._getBodyCellId(rowIndex, columnIndex));
        var tlOffset = -5;
        var pos = baidu.dom.getPosition(entrance);
        var field = this._fields[columnIndex];

        this._currentEditor = esui.Table.EditorManager.startEdit(this, type, {
            left: pos.left + tlOffset,
            top: pos.top + tlOffset,
            rowIndex: rowIndex,
            columnIndex: columnIndex,
            field: field,
            value: mf.m.utils.recursion.get(this.datasource[rowIndex], field.field)
        });
    }
};
/*
 * 重写选择列表的值对比逻辑
 * */

/**
 * 根据值选择选项
 *
 * @public
 * @param {string} value 值
 */
esui.Select.prototype.setValue = function (value) {
    var me = this,
        len,
        i;

    if (esui.util.hasValue(value)) {
        for (i = 0, len = me.datasource.length; i < len; i++) {
            if (me.datasource[i].value === value) {
                me.setSelectedIndex(i);
                return;
            }
        }
    }

    me.value = null;
    me.setSelectedIndex(-1);
};

(function () {
    var dataTypes = {
        'json': {
            contentType: 'application/json',
            encode: JSON.stringify
        }
    };
    mf.ajaxResponse = {};
    /*
     * 解析后端传来的报表数据，兼容前期的数据格式
     * */
    mf.parseReportData = function (data) {
        var fields = [];
        var lists = [];
        if (!(data.column_names && data.rows && data.column_titles)) {
            return null;
        }
        var column = data.column_names;
        for (var row = 0, rowLength = data.rows.length; row < rowLength; row += 1) {
            var rowData = data.rows[row];
            lists[row] = {};
            for (var col = 0, colLength = column.length; col < colLength; col += 1) {
                lists[row][column[col]] = rowData[col];
            }
        }
        for (var col = 0, colLength = column.length; col < colLength; col += 1) {
            fields[col] = {
                field: column[col],
                title: data.column_titles[col]
            };
        }
        return {
            fields: fields,
            lists: lists
        }
    };
    /*
     * debug 模式下的url映射
     * */
    mf.urlDebugRouter = {
        routers: {},
        reg: function (routers) {
            $.extend(mf.urlDebugRouter.routers, routers);
        },
        get: function (url) {
            var direct;
            $.each(mf.urlDebugRouter.routers, function (destination, rule) {
                if (typeof rule === 'string') {
                    if (url === rule) {
                        direct = destination;
                        return false;
                    }
                } else if (typeof rule.test === 'function') {
                    if (rule.test(url)) {
                        direct = destination;
                        return false;
                    }
                }
            });
            return direct;
        }
    };
    /*
     * jQuery ajax参数构造
     *
     * @param {Object} param ajax参数
     *   {string} url
     *   {string} type
     *   {string = json} dataType
     *   {Object} data
     *   {boolean = false} cache 缓存请求结果
     * @param {Object} opt 额外参数
     *   {boolean = true} notAppendExt 增加url的后缀扩展名
     *   {string = json} ext 后缀名
     *
     * @return {Object} jQuery ajax 接受的参数
     * */
    mf.ajaxParamFactory = function (param, opt) {
        param = param || {};
        opt = opt || {};
        console.log('ajax factory', param);

        param.type = param.type || 'GET';
        param.data = param.data || {};
        param.requestType = param.requestType || 'json';
        param.dataType = param.dataType || 'json';
        param.cache = param.cache === true;
        if (param.type === 'GET') {
            param.requestType = null;
        }
        var requestType = dataTypes[param.requestType];
        /*
         if (dataTypes[param.dataType]) {
         param.contentType = param.contentType || contentTypes[param.dataType];
         }
         */
        if (requestType) {
            param.data = requestType.encode ? requestType.encode(param.data) : param.data;
            param.contentType = param.contentType || requestType.contentType;
        }

        var url = param.url.split('?');
        var query = url[1] || '';
        url = url[0] || '';
        param.originalUrl = url;
        // mock 调试的路由，在debug.js里
        if (mf.DEBUG) {
            url = mf.urlDebugRouter.get(url) || url;
        }

        if (!opt.notAppendExt) {
            opt.ext = opt.ext || (
                mf.DEBUG ? 'json' : ''
            );
            url += opt.ext ? '.' + opt.ext : '';
        }
        // 为url增加一些额外的参数
        //var outId = location.search.match(/outId=([\w\d]+)(?=\&|$)/);
        //if (outId) {
        //    query += '&outId=' + outId[1];
        //}

        param.url = url + (
            query ? '?' : ''
        ) + query;
        console.log('ajax factory output', param);

        return param;
    };
    /*
     * ajax返回结果解析
     *
     * {Object} data
     * */
    function dataParse(data, filterFn) {
        if (!data.success) {
            if (data.errorType === 'NoLogin') {
                throw 'sessionTimeout';
            } else if (data.message) {
                throw data.message;
            } else {
                throw '请求失败，请稍后重试。<br>';
            }
        }
        return filterFn ? filterFn(data)
            : (mf.parseReportData(data) || data.entities || []);
    }

    var hasShowLogin = false;
    /*
     * ajax错误处理
     *
     * {string} msg 错误信息
     *   sessionTimeout 超时登录
     * */
    function errorHandle() {
        var args = [].slice.call(arguments);
        return function (msg) {
            mf.loaded();
            console.log('errorHandle', msg, args);
            if (msg === 'sessionTimeout') {
                //回话超时登录
                if (typeof(mf.userLoad) === 'function') {
                    mf.userLoad(function () {
                        mf.parallelAjax.apply(null, args);
                    });
                } else {
                    if (hasShowLogin) {
                        return;
                    }
                    hasShowLogin = true;
                    esui.Dialog.alert({
                        title: '提示信息',
                        content: '登录超时，操作无法完成，请重新登录！',
                        onok: typeof(mf.userLoad) === 'string' ? function () {
                            T.cookie.set(mf.cookieKeyMap.authority, 0);
                            hasShowLogin = false;
                            er.locator.redirect(mf.userLoad);
                        } : function () {
                            hasShowLogin = false;
                        }
                    });
                }
            } else {
                esui.Dialog.alert({
                    title: '提示信息', content: msg
                });
            }
        };
    }

    /*
     * 并行ajax请求
     * */
    mf.parallelAjax = function (targets, cb, context) {
        targets = [].concat(targets);
        var deferredList = [];
        for (var i = 0, target; (
            target = targets[i]
        ); i += 1) {
            if (typeof target === 'string') {
                target = {
                    url: target
                };
            }
            target = mf.ajaxParamFactory(target);
            deferredList[i] = (function (ajaxParam) {
                var deferred = $.Deferred();
                if (mf.ajaxResponse[target.originalUrl]) {
                    console.log('ajaxResponse ', target.originalUrl);
                    deferred.resolve(mf.ajaxResponse[target.originalUrl]);
                } else {
                    $.ajax(ajaxParam)
                        .done(function (data) {
                            try {
                                data = dataParse(data, ajaxParam.dataFilter);
                            } catch (e) {
                                deferred.reject(e);
                                return;
                            }
                            deferred.resolve(data);
                        })
                        .fail(function (XMLHttpRequest, textStatus, errorThrown) {
                            console.log('ajax fail', XMLHttpRequest, textStatus, errorThrown);
                            deferred.reject(ajaxParam.errorMessage || '网络错误！');
                        });
                }
                return deferred.promise();
            })(target);
        }
        mf.loading();
        $.when.apply($, deferredList)
            .done(function () {
                var args = [].slice.call(arguments);
                mf.loaded();
                cb.apply(context, args);
            })
            .fail(errorHandle.call(null, targets, cb, context));
    };
})();
(function () {
    /*
     * 根据需要的字段列表从config中拿去值拼接成esui table需要的fields
     *
     * @param {Object} fieldMap 需要的字段
     * @param {Object} configMap 默认的配置字段
     *
     * @return {Array.<Object>} esui table 格式的fields
     * */
    mf.mockTableFields = function (fieldMap, configMap) {
        var fields = [];
        for (var i in fieldMap) {
            if (configMap[i] && configMap[i].isShow === false) {
                continue;
            }
            var field = $.extend(
                // 默认配置
                {
                    align: 'center',
                    content: '',
                    listKey: i
                },
                configMap[i] || {},
                fieldMap[i]
            );
            field.content = field.content || field.field;
            fields.push(field);
        }
        return fields;
    };
    /*
     * 表格保存验证器
     *
     * @param {Object} row 行数据
     * @param {Array.<Object>} fields 行数据
     * @return {boolean}
     *
     * field.validator
     * @param {*} value
     * @param {*} row
     * @param {*} configLists
     * */
    mf.tableSavingValidator = function (row, fields) {
        var err = [];
        var table = this;
        console.log('tableSavingValidator', row, fields);
        $.each(fields, function (index, field) {
            if (!field.field) {
                return true;
            }
            var value = mf.m.utils.recursion.get(row, field.field);
            if (field.validator) {
                var error = field.validator.call(table, value, row);
                if (error) {
                    err.push('【' + (field.title || '') + '】' + error);
                    return true;
                }
            }
        });
        if (err.length) {
            esui.Dialog.alert({
                title: '操作失败',
                content: err.join('<br>')
            });
            return false;
        }
        return true;
    };
    /*
     * 提交数据过滤器
     *
     * @param {Object} row 行数据
     * @param {Array.<Object>} configLists 配置数据
     * @return {Object}
     *
     * */
    mf.grepDataInConfig = function (row, configLists) {
        console.log('dataFilterInConfig', row, configLists);
        var newRow = $.deepExtend({}, row);
        $.each(configLists, function (index, field) {
            if (!field.field) {
                return true;
            }
            var value = mf.m.utils.recursion.get(newRow, field.field);
            if (field.request === false) {
                delete newRow[field.field];
                //mf.m.utils.recursion.del(newRow, field.field);
            } else if (!field.request && !mf.m.utils.hasValue(value)) {
                console.log('delete', field, String(value));
                delete newRow[field.field];
                //mf.m.utils.recursion.del(newRow, field.field);
            }
        });
        $.each(newRow, function (key) {
            if (key.charAt(0) === '_') {
                delete newRow[key];
            }
        });
        return newRow;
    };
    /*
     * 映射配置中的字段
     *
     * @param {Object} configMap 默认的配置字段
     * */
    mf.mockFieldInConfig = function (configMap, fieldName) {
        fieldName = fieldName || 'field';
        return function (key) {
            return (configMap[key] || {})[fieldName];
        };
    };
    /*
     * 获取配置中默认值字段组成的初始对象
     *
     * @param {Object} configMap 默认的配置字段
     * @param {Object＝{}} initEntity 初始对象
     * */
    mf.initEntityInConfig = function (configMap, initEntity) {
        initEntity = initEntity || {};
        $.each(configMap, function (i, n) {
            if ('defaultValue' in n) {
                mf.m.utils.recursion.set(initEntity, n.field, n.defaultValue);
            }
        });
        return initEntity;
    };
    /*
     * 获取配置中字段Key组成的映射对象
     *
     * @param {Object} data 值
     * @param {Object} configMap 默认的配置字段
     * */
    mf.reflectDataInConfig = function (data, configMap) {
        var newData = {};
        $.each(configMap, function (i, n) {
            if (n.field) {
                newData[i] = mf.m.utils.recursion.get(data, n.field, n.defaultValue);
            }
        });
        return newData;
    };
    /*
     * 根据配置中的字段操作目标值
     *
     * @param {Object} configMap 默认的配置字段
     * */
    mf.operateDataInConfigField = function (configMap) {
        var getField = mf.mockFieldInConfig(configMap);
        return {
            get: function (data, key, defaultValue) {
                return mf.m.utils.recursion.get(data, getField(key), defaultValue);
            },
            set: function (data, key, value) {
                return mf.m.utils.recursion.set(data, getField(key), value);
            }
        };
    };
    /*
     * 模拟分页
     * 数据全部加载到model中，后根据筛选截取，排序后再按分页信息截取
     *
     * @param {Array.<Object>} dataList 原始完整数据
     * @param {Object} targets 包含了需要互动的esui控件
     *
     * @return {Function}
     *   动态变更信息
     *   @param {number} pageSize
     *   @param {number} page
     *   @param {Function | undefined} filter 筛选条件
     * */
    mf.mockPager = function (dataList, targets) {
        var table = targets.table;
        var pageSizer = targets.pageSizer;
        var pager = targets.pager;
        table.onedit = function (value, options, editor) {
            var row = table.datasource[options.rowIndex];
            mf.m.utils.recursion.set(row, options.field.field, value);
            row._isModify = true;
            table.render();
        };
        pager.onchange = mf.m.utils.nextTickWrapper(function () {
            refreshTable();
        });
        pageSizer.onchange = mf.m.utils.nextTickWrapper(function () {
            refreshTable({
                page: 0
            });
        });
        table.onsort = mf.m.utils.nextTickWrapper(function () {
            refreshTable({
                page: 0
            });
        });

        var filterCache;
        return refreshTable;

        function refreshTable(opt) {
            opt = opt || {};
            if ('pageSize' in opt) {
                pageSizer.setVaue(opt.pageSize);
            } else {
                opt.pageSize = parseInt(pageSizer.getValue(), 10);
            }
            var mockList = dataList;
            if ('filter' in opt) {
                filterCache = opt.filter;
            } else {
                filterCache = null;
            }
            if (filterCache) {
                mockList = $.grep(mockList, filterCache);
            }
            var total = Math.ceil(mockList.length / opt.pageSize);
            if (pager.total !== total || 'page' in opt) {
                pager.total = total;
                pager.render();
            }
            if ('page' in opt) {
                pager.setPage(opt.page);
            } else {
                opt.page = parseInt(pager.getPage(), 10);
            }
            if ('order' in opt) {
                table.order = opt.order;
            } else {
                opt.order = table.order;
            }
            if ('orderBy' in opt) {
                table.orderBy = opt.orderBy;
            } else {
                opt.orderBy = table.orderBy;
            }
            var order = opt.order === 'asc' ? 1 : -1;
            var orderBy = opt.orderBy;
            var recursionGet = mf.m.utils.recursion.get;
            mockList.sort(function (a, b) {
                return recursionGet(a, orderBy) > recursionGet(b, orderBy) ? order : -order;
            });
            console.log('mockPager', opt);
            table.datasource = mockList.slice(
                opt.page * opt.pageSize, (opt.page + 1) * opt.pageSize
            );
            table.render();
        }
    };

})();
(function () {
    mf.initEntities = function (opt) {
        console.log('initEntities', opt);
        var loader = opt.loader;
        var entities = opt.entities;

        if (loader.get('from') && loader.get('to')) {
            loader.set('date', loader.get('from') + ',' + loader.get('to'));
        }

        var fields = opt.fields;
        if (fields) {
            loader.set('fields', $.isFunction(fields) ? fields(loader) : fields);
        }
        if (entities) {
            loader.set('list', entities);
            loader.set('listTotalSize', entities.length);
            loader.set('total',
                Math.ceil(entities.length / loader.get('pageSize')));
        }
    };
})();
(function () {
    mf.getEnglishNumber = function (number, hasUnitClass, unit) {
        var numberStr = [];
        unit = unit || ['B', 'K', 'M', 'G', 'T', 'P'];
        number = number.toPrecision().split('.');
        var integer = number[0].split('').reverse();
        var decimal = number[1];
        integer.forEach(function (value, index) {
            var position = Math.floor(index / 3);
            numberStr[position] || (numberStr[position] = '');
            numberStr[position] = value + numberStr[position];
        });
        if (decimal) {
            decimal = '.' + decimal.substr(0, 2);
        }
        if (hasUnitClass) {
            numberStr = $.map(numberStr, function (numberStrValue, index) {
                return '<span class="number-unit number-unit-' + unit[index] + '">' + numberStrValue + '</span>';
            });
        }
        return numberStr.reverse().join(',') + (decimal || '');
    };
    mf.getFieldContentPercent = function (field, unit) {
        unit = unit || '%';
        unit = '<span class="percent-unit">' + unit + '</span>';
        return function (item) {
            return (item[field] * 100).toString().substr(0, 5) + unit;
        };
    };
    mf.getFieldContentLess = function (field, unit) {
        return function (item) {
            return '<span title=" ' + item[field] + ' ">' + mf.getEnglishNumber(item[field], true, unit) + '</span>';
        };
    };
    mf.getFieldContentMoney = function (field, unit) {
        unit = unit || '¥';
        unit = '<span class="money-unit">' + unit + '</span>';
        return function (item) {
            return unit + mf.getEnglishNumber(item[field], true);
        };
    };
})();
mf.clickCommand = mf.m.commandElement('click');
