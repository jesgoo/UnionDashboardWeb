/**
 * @file Generated by er-sync, module
 * @author Luics<xukai01@baidu.com>
 * @date Fri Mar 07 2014 11:15:21 GMT+0800 (中国标准时间)
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * shortcut mf.m.uiOperateButton
 */
(function (exports, module) {
    var uiOperateButton = function (opt) {
        var selectDatas = [];
        opt = opt || {};
        var url = opt.url || '';
        var splitChar = opt.splitChar || '|';
        var listTable = esui.get(opt.tableId || 'list');
        var operationBtn = opt.operationBtn || [];
        opt.datasource = opt.datasource || listTable && listTable.datasource || [];
        $.each(operationBtn, function (i, n) {
            var field = n.field = n.field || 'id';
            var argField = n.argField || 'arg';
            argField = [].concat(argField);
            var btn = esui.get(n.id);
            if (!btn) {
                return true;
            }
            btn[btn.type === 'Select' ? 'onchange' : 'onclick'] = function (value, selectedItem) {
                var selects = $.map(selectDatas, function (data) {
                    return data[field];
                });
                var before = (function (fn) {
                    return function (datas, ids, next) {
                        var me = this;
                        fn.call(me, datas, ids, function () {
                            next.apply(me, arguments);
                        });
                    };
                })(
                        n.before || function (datas, ids, next) {
                        next(ids);
                    }
                );
                before.call(n, selectDatas, selects, function (selects) {
                    var me = this;
                    var args = [].slice.call(arguments, 1);
                    var queryString = $.map(argField, function (n, i) {
                        return n + '=' + ($.isEmpty(args[i]) ? '' : args[i]);
                    }).join('&');
                    mf.loading();
                    url = n.url || url;
                    url += url.indexOf('?') > -1 ? '' : '?';
                    mf.get(mf.f(url + '&action=' + me.op
                                    + (btn.type === 'Select' ? '&value=' + value : '')
                            + (queryString ? '&' + queryString : ''), selects.join(splitChar)
                    ), function (result) {
                        var success = result.success || result.successUserId;
                        success = success && success.split('|') || [];
                        var failed = result.failed || result.failedUserId;
                        failed = failed && failed.split('|') || [];
                        if (me.after) {
                            me.after.apply(me, [
                                opt.datasource,
                                success,
                                failed
                            ].concat(args, result));
                        }
                        listTable && listTable.render();
                        opt.afterRender && opt.afterRender.call(me);
                        var chkType = '';
                        if (!listTable) {
                            return true;
                        }
                        if (listTable.select === 'multi') {
                            chkType = 'multiSelect';
                        }
                        else if (listTable.select === 'single') {
                            chkType = 'singleSelect';
                        }
                        //TODO 可能再次开启这个功能，即再次选中已经操作过的行
                        if (0 && chkType) {
                            chkType = listTable.__getId(chkType);
                            $.each(selects, function (index, item) {
                                var valueIndex = mf.m.utils.indexOfArray(
                                    opt.datasource, item, field);
                                if (valueIndex > -1) {
                                    var chk = baidu.G(chkType + valueIndex);
                                    chk.checked = true;
                                    chk.onclick();
                                }
                            });
                        }
                        // 选中已经操作失败的行
                        $.each(failed, function (index, item) {
                            var valueIndex = mf.m.utils.indexOfArray(opt.datasource, item, field);
                            if (valueIndex > -1) {
                                var row = baidu.G(listTable.__getId('row') + valueIndex);
                                $('table', row).css('background', '#FFd4DD');
                            }
                        });
                        if (result.formError) {
                            failed.length && (result.formError['tips']
                                = '错误行已用突出颜色标出。');
                            mf.formErrorHandler(result);
                        }
                        if (btn.type === 'Select') {
                            btn.setValue(null);
                        }
                    });
                });
            }
        });
        if (listTable) {
            listTable.onselect = function (indexs) {
                var data = this.datasource;
                var btnStatus = {};
                selectDatas = $.map(indexs, function (n, i) {
                    var selectData = data[n];
                    opt.getBtnStatus && opt.getBtnStatus.call(
                        btnStatus, selectData, selectDatas);
                    return selectData;
                });
                $.each(operationBtn, function (i, n) {
                    var id = n.id;
                    var btn = esui.get(n.id);
                    if (!btn) {
                        return true;
                    }
                    var disable;
                    disable = selectDatas.length === 0 ||
                              opt.setBtnStatus && opt.setBtnStatus.call(
                                  btnStatus, id, selectDatas);
                    if (disable) {
                        btn.disable();
                    }
                    else {
                        btn.enable();
                    }
                });
            };
        }
        return {
            trigger: function (id, indexs, value) {
                var temp = selectDatas;
                if (mf.m.utils.indexOfArray(operationBtn, id, 'id') === -1) {
                    return false;
                }
                indexs = [].concat(indexs);
                var data = opt.datasource;
                selectDatas = $.map(indexs, function (n, i) {
                    return data[n];
                });
                var btn = esui.get(id);
                if (btn.type === 'Button') {
                    btn.onclick();
                } else if (btn.type === 'Select') {
                    btn.setSelectedIndex(value, true);
                }
                selectDatas = temp;
            },
            dispose: function () {
                listTable = null;
                $.each(operationBtn, function (i, n) {
                    esui.get(n.id).onclick = null;
                });
            }
        };
    };
    exports.uiOperateButton = uiOperateButton;
})(mf && mf.m || exports || {}, mf || module);