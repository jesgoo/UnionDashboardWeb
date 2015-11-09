/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Wed Jun 03 2015 16:56:54 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */
(function () {
    mf.admin.manage.strategy = new er.Action({
        model: mf.admin.manage.model.strategy,
        view: new er.View({
            template: 'mf_admin_manage_strategy',
            UI_PROP: {
                dataEditor: {
                    closeButton: 0,
                    mask: {
                        level: 2,
                        type: 'data'
                    }
                },
                ruleEditor: {
                    closeButton: 0,
                    mask: {
                        level: 3,
                        type: 'rule'
                    }
                },
                resultEditor: {
                    closeButton: 0,
                    mask: {
                        level: 4,
                        type: 'result'
                    }
                },
                infoEditor: {
                    closeButton: 0,
                    mask: {
                        level: 5,
                        type: 'info'
                    }
                }
            }
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
        onentercomplete: function () {
            console.log('onentercomplete');
            mf.loaded();
            var action = this;
            var model = action.model;
            var strategyTable = esui.get('strategyTable');
            var pager = esui.get('strategyPager');
            var pageSizer = esui.get('strategyPageSize');
            var strategyCount = esui.get('strategyCount');
            var dataList = model.get('list');
            var emptyStrategy = {};
            strategyTable.order = 'desc';
            strategyTable.orderBy = 'modified_time';
            var saveRow = function (rowIndex) {
                var row = strategyTable.datasource[rowIndex];
                if (mf.tableSavingValidator(row, strategyTable.fields)) {
                    var postRow = $.deepExtend({}, row);
                    delete postRow.create_time;
                    delete postRow.modified_time;
                    return mf.parallelAjax({
                        type: 'POST',
                        url: '/dspstrategy' + (row._isNew ? '' : '/' + row.id),
                        data: row
                    }, function (result) {
                        var newData = result[0];
                        if (postRow._isNew) {
                            dataList.unshift(newData);
                            strategyCount.setContent(dataList.length);
                        } else {
                            var index = mf.m.utils.indexOfArray(dataList, newData.id, 'id');
                            index > -1 && (dataList[index] = newData);
                        }
                        console.log('post', rowIndex, newData, strategyTable.datasource[rowIndex]);
                        strategyTable.datasource[rowIndex] = newData;
                        strategyTable.render();
                    });
                } else {
                    return false;
                }
            };
            var refreshTable = mf.mockPager(dataList, {
                pager: pager,
                pageSizer: pageSizer,
                table: strategyTable
            });
            refreshTable();

            var dataEditor = esui.get('dataEditor');
            var dataTable = esui.get('dataTable');
            dataEditor.oncommand = function (opt) {
                var index = opt.index;
                if (index === 0) {
                    var rowIndex = model.get('currentEditingListRow');
                    var row = strategyTable.datasource[rowIndex];
                    row.data = row.data || {};
                    row.data.data = dataTable.datasource;
                    row._isModify = true;
                    strategyTable.render();
                }
            };

            var ruleEditor = esui.get('ruleEditor');
            var ruleTable = esui.get('ruleTable');
            ruleTable.onedit = function (value, options, editor) {
                var row = ruleTable.datasource[options.rowIndex];
                row[options.field.field] = value;
                ruleTable.render();
            };
            ruleEditor.oncommand = function (opt) {
                var index = opt.index;
                if (index === 0) {
                    var rowIndex = model.get('currentEditingDataRow');
                    var row = dataTable.datasource[rowIndex];
                    row.rules = ruleTable.datasource;
                    dataTable.render();
                }
            };

            var resultEditor = esui.get('resultEditor');
            var resultTable = esui.get('resultTable');
            resultTable.onedit = function (value, options, editor) {
                var row = resultTable.datasource[options.rowIndex];
                row[options.field.field] = value;
                resultTable.render();
            };
            resultEditor.oncommand = function (opt) {
                var index = opt.index;
                if (index === 0) {
                    var rowIndex = model.get('currentEditingDataRow');
                    var row = dataTable.datasource[rowIndex];
                    row.result = resultTable.datasource.sort(function (a, b) {
                        return a.percent > b.percent ? 1 : -1;
                    });
                    dataTable.render();
                }
            };

            var infoEditor = esui.get('infoEditor');
            var infoTable = esui.get('infoTable');
            infoTable.onedit = function (value, options, editor) {
                var row = infoTable.datasource[options.rowIndex];
                row[options.field.field] = value;
                infoTable.render();
            };
            infoEditor.oncommand = function (opt) {
                var index = opt.index;
                if (index === 0) {
                    var rowIndex = model.get('currentEditingResultRow');
                    var infoField = model.get('currentEditingResultField');
                    var row = resultTable.datasource[rowIndex];
                    row[infoField] = infoTable.datasource;
                    resultTable.render();
                }
            };

            model.set(
                'commands',
                mf.clickCommand.register(
                    [
                        {
                            cmd: 'search',
                            handle: function (options) {
                                var text = esui.get('strategyName').getValue();
                                var filter;
                                if (text) {
                                    var valueRegExp = mf.m.utils.makeRegExp(text, 'i');
                                    filter = function (obj) {
                                        return valueRegExp.test(obj.id);
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
                                var newRow = $.deepExtend({}, emptyStrategy);
                                newRow._isNew = true;
                                strategyTable.datasource = strategyTable.datasource || [];
                                strategyTable.datasource.unshift(newRow);
                                strategyTable.render();
                            }
                        },
                        {
                            cmd: 'delete_add',
                            handle: function (options) {
                                strategyTable.datasource.splice(options.index, 1);
                                strategyTable.render();
                            }
                        },
                        {
                            cmd: 'save',
                            handle: function (options) {
                                return saveRow(options.index);
                            }
                        },
                        {
                            cmd: 'edit-data',
                            handle: function (options) {
                                var row = strategyTable.datasource[options.index];
                                dataEditor.show();
                                dataTable.datasource = baidu.object.clone((row.data || {}).data || []);
                                dataTable.render();
                                model.set('currentEditingListRow', options.index);
                            }
                        },
                        {
                            cmd: 'add-data',
                            handle: function (options) {
                                dataTable.datasource.unshift({});
                                dataTable.render();
                            }
                        },
                        {
                            cmd: 'delete-data',
                            handle: function (options) {
                                dataTable.datasource.splice(options.index, 1);
                                dataTable.render();
                            }
                        },
                        {
                            cmd: 'edit-rule',
                            handle: function (options) {
                                var row = dataTable.datasource[options.index];
                                ruleEditor.show();
                                ruleTable.datasource = baidu.object.clone(row.rules || []);
                                ruleTable.render();
                                model.set('currentEditingDataRow', options.index);
                            }
                        },
                        {
                            cmd: 'add-rule',
                            handle: function (options) {
                                ruleTable.datasource.unshift({});
                                ruleTable.render();
                            }
                        },
                        {
                            cmd: 'delete-rule',
                            handle: function (options) {
                                ruleTable.datasource.splice(options.index, 1);
                                ruleTable.render();
                            }
                        },
                        {
                            cmd: 'edit-result',
                            handle: function (options) {
                                var row = dataTable.datasource[options.index];
                                resultEditor.show();
                                resultTable.datasource = baidu.object.clone(row.result || []);
                                resultTable.render();
                                model.set('currentEditingDataRow', options.index);
                            }
                        },
                        {
                            cmd: 'add-result',
                            handle: function (options) {
                                resultTable.datasource.unshift({});
                                resultTable.render();
                            }
                        },
                        {
                            cmd: 'delete-result',
                            handle: function (options) {
                                resultTable.datasource.splice(options.index, 1);
                                resultTable.render();
                            }
                        },
                        {
                            cmd: 'edit-info',
                            handle: function (options) {
                                var row = resultTable.datasource[options.index];
                                infoEditor.show();
                                infoTable.datasource = baidu.object.clone(row[options.field] || []);
                                infoTable.render();
                                model.set('currentEditingResultRow', options.index);
                                model.set('currentEditingResultField', options.field);
                            }
                        },
                        {
                            cmd: 'add-info',
                            handle: function (options) {
                                infoTable.datasource.unshift({});
                                infoTable.render();
                            }
                        },
                        {
                            cmd: 'delete-info',
                            handle: function (options) {
                                infoTable.datasource.splice(options.index, 1);
                                infoTable.render();
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