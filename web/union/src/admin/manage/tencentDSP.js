/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Fri Oct 16 2015 10:42:31 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */
(function () {
    mf.admin.manage.tencentDSP = new er.Action({
        model: mf.admin.manage.model.tencentDSP,
        view: new er.View({
            template: 'mf_admin_manage_tencentDSP',
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
        onafterrepaint: function () {
            console.log('onafterrepaint');
        },
        onafterrender: function () {
            console.log('onafterrender');
            mf.loaded();
            var action = this;
            var model = action.model;
            var dataList = model.get('list');
            var config = model.get('config');
            var DSPList = model.get('DSPList');
            var DSPFieldInConfig = mf.mockFieldInConfig(DSPList);
            var operateData = mf.operateDataInConfigField(DSPList);
            var emptyDSP = mf.initEntityInConfig(DSPList);

            var table = esui.get('tencentDSPlist');
            table.order = 'asc';
            table.orderBy = DSPFieldInConfig('id');

            var selectedResource = +model.get('selectedResource');
            var isOnlyForListing = model.get('listing');
            isOnlyForListing && (table.select = 'single');

            var saveRow = function (rowIndex) {
                var row = table.datasource[rowIndex];
                if (mf.tableSavingValidator(row, table.fields)) {
                    mf.parallelAjax({
                        type: 'POST',
                        url: '/admin/tencentadslot' + (row._isNew ? '' : '/' + operateData.get(row, 'id')),
                        data: mf.grepDataInConfig(row, DSPList)
                    }, function (result) {
                        var newData = result[0];
                        if (row._isNew) {
                            dataList.unshift(newData);
                        } else {
                            var idField = DSPFieldInConfig('id');
                            var index = mf.m.utils.indexOfArray(dataList, row[idField], idField);
                            index > -1 && (dataList[index] = newData);
                        }
                        table.datasource[rowIndex] = newData;
                        table.render();
                        var singleSelectID = table.__getId('singleSelect');
                        table.datasource.forEach(function (n, index) {
                            if (n.id === selectedResource) {
                                $('#' + singleSelectID + index).prop('checked', true);
                            }
                        });
                    });
                } else {
                    return false;
                }
            };
            var refreshTable = mf.mockPager(dataList, {
                pager: esui.get('tencentDSPpager'),
                pageSizer: esui.get('tencentDSPpageSize'),
                table: table
            }, {
                editToSave: function (value, options, editor) {
                    var row = table.datasource[options.rowIndex];
                    if (!row._isNew){
                        return saveRow(options.rowIndex);
                    }
                },
                afterRender: function () {
                    var singleSelectID = table.__getId('singleSelect');
                    table.datasource.forEach(function (n, index) {
                        if (n.id === selectedResource) {
                            $('#' + singleSelectID + index).prop('checked', true);
                        }
                    });
                    console.log('afterRender selectedResource', selectedResource);
                }
            });
            table.onselect = function (index, isInit) {
                if (isInit) return true;
                selectedResource = table.datasource[index].id;
                console.log('afterSelect selectedResource', selectedResource, index);
            };
            action.getSelectedResource = function () {
                console.log('get selectedResource', selectedResource);
                return selectedResource;
            };
            refreshTable();
            model.set(
                'commands',
                mf.clickCommand.register(
                    [
                        {
                            cmd: 'search_tencent_dsp',
                            handle: function (options) {
                                var text = esui.get('tencentDescription').getValue();
                                var filter;
                                if (text) {
                                    var valueRegExp = mf.m.utils.makeRegExp(text, 'i');
                                    filter = function (obj) {
                                        return valueRegExp.test(operateData.get(obj, 'description'))
                                               || valueRegExp.test(operateData.get(obj, 'adslot'))
                                               || valueRegExp.test(operateData.get(obj, 'media'));
                                    };
                                }
                                refreshTable({
                                    page: 0,
                                    filter: filter
                                });
                            }
                        },
                        {
                            cmd: 'add_tencent_dsp',
                            handle: function (options) {
                                var newRow = $.deepExtend({}, emptyDSP);
                                newRow = mf.grepDataInConfig(newRow, DSPList);
                                newRow._isNew = true;
                                table.datasource = table.datasource || [];
                                table.datasource.unshift(newRow);
                                table.render();
                            }
                        },
                        {
                            cmd: 'delete_add_tencent_dsp',
                            handle: function (options) {
                                table.datasource.splice(options.index, 1);
                                table.render();
                            }
                        },
                        {
                            cmd: 'save_tencent_dsp',
                            handle: function (options) {
                                return saveRow(options.index);
                            }
                        }
                    ],
                    {
                        region: '#' + action.view.target,
                        rewrite: true
                    }
                )
            );
        },
        onleave: function () {
            console.log('onleave');
            var action = this;
            var commands = action.model.get('commands');
            commands && mf.clickCommand.dispose(commands);

        }
    });
})();