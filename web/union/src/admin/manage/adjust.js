/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Tue Jun 23 2015 14:12:36 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */
(function () {
    function setAdjust(item) {
        item.min_acp = item.min_acp / 1000;
        item.max_acp = item.max_acp / 1000;
        item.min_ecpm = item.min_ecpm / 1000;
        item.max_ecpm = item.max_ecpm / 1000;
        return item;
    }
    function resetAdjust(item) {
        item.min_acp = Math.round(item.min_acp * 1000);
        item.max_acp = Math.round(item.max_acp * 1000);
        item.min_ecpm = Math.round(item.min_ecpm * 1000);
        item.max_ecpm = Math.round(item.max_ecpm * 1000);
        return item;
    }
    mf.admin.manage.adjust = new er.Action({
        model: mf.admin.manage.model.adjust,
        view: new er.View({
            template: 'mf_admin_manage_adjust',
            UI_PROP: {}
        }),
        STATE_MAP: {
            page: 0,
            pageSize: mf.PAGER_MODEL.pageSize,
            pageSizes: mf.PAGER_MODEL.pageSizes
        },

        onenter: function () {
            console.log('onenter');
            mf.onenter();
        },
        onafterloadmodel: function () {
            console.log('onafterrepaint');
            var model = this.model;
            model.set('list', (model.get('list') || []).map(setAdjust));
        },
        onafterrender: function () {
            console.log('onafterrender');
        },
        onentercomplete: function () {
            console.log('onentercomplete');
            mf.loaded();
            var action = this;
            var model = action.model;
            var adjustTable = esui.get('adjustTable');
            var pager = esui.get('adjustPager');
            var pageSizer = esui.get('adjustPageSize');
            var dataList = model.get('list');
            var mediaNames = model.get('mediaNames');
            var emptyAdjust = model.get('emptyAdjust');
            adjustTable.order = 'desc';
            adjustTable.orderBy = 'modified_time';

            var saveRow = function (rowIndex) {
                var row = adjustTable.datasource[rowIndex];
                var existRow;
                dataList.forEach(function (n){
                    if (n.media === row.media && n.adslot === row.adslot) {
                        existRow = n;
                        return false;
                    }
                });
                if (existRow && row._isNew) {
                    var dialog = esui.Dialog.alert({
                        title: '操作失败',
                        content: '您当前创建的策略已存在，不可重复创建。'
                    });
                    return false;
                } else if (mf.tableSavingValidator(row, adjustTable.fields)) {
                    var postRow = $.deepExtend({}, row);
                    delete postRow.create_time;
                    delete postRow.modified_time;
                    delete postRow.mediaName;
                    delete postRow.adslotName;
                    return mf.parallelAjax({
                        type: 'POST',
                        url: '/admin/media/judge' + (row._isNew ? '' : '/' + row.media + '/' + row.adslot),
                        data: resetAdjust(postRow)
                    }, function (result) {
                        var newData = setAdjust(result[0]);
                        if (postRow._isNew) {
                            newData.mediaName = mediaNames[newData.media];
                            dataList.unshift(newData);
                        } else {
                            var index = mf.m.utils.indexOfArray(dataList, newData.media, 'media');
                            index > -1 && (dataList[index] = newData);
                        }
                        console.log('post', rowIndex, newData, adjustTable.datasource[rowIndex]);
                        adjustTable.datasource[rowIndex] = newData;
                        adjustTable.render();
                    });
                } else {
                    return false;
                }
            };
            var refreshTable = mf.mockPager(dataList, {
                pager: pager,
                pageSizer: pageSizer,
                table: adjustTable
            }, {
                editToSave: function (value, options, editor) {
                    var row = adjustTable.datasource[options.rowIndex];
                    if (!row._isNew){
                        return saveRow(options.rowIndex);
                    }
                }
            });
            refreshTable();

            model.set(
                'commands',
                mf.clickCommand.register(
                    [
                        {
                            cmd: 'search',
                            handle: function (options) {
                                var text = esui.get('mediaName').getValue();
                                var filter;
                                if (text) {
                                    var valueRegExp = mf.m.utils.makeRegExp(text, 'i');
                                    filter = function (obj) {
                                        return valueRegExp.test(obj.mediaName);
                                    };
                                }
                                refreshTable({
                                    page: 0,
                                    filter: filter
                                });
                            }
                        },
                        {
                            cmd: 'add',
                            handle: function (options) {
                                var newRow = $.deepExtend({}, emptyAdjust);
                                newRow._isNew = true;
                                adjustTable.datasource = adjustTable.datasource || [];
                                adjustTable.datasource.unshift(newRow);
                                adjustTable.render();
                            }
                        },
                        {
                            cmd: 'delete_add',
                            handle: function (options) {
                                adjustTable.datasource.splice(options.index, 1);
                                adjustTable.render();
                            }
                        },
                        {
                            cmd: 'save',
                            handle: function (options) {
                                return saveRow(options.index);
                            }
                        }
                    ]
                )
            );
        },
        onleave: function () {
            console.log('onleave');
            var commands = this.model.get('commands');
            commands && mf.clickCommand.dispose(commands);
        }
    });
})();