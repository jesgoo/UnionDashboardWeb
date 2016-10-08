/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Tue May 26 2015 14:24:38 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */
(function () {
    mf.index.market.plan = new er.Action({
        model: mf.index.market.model.plan,
        view: new er.View({
            template: 'mf_index_market_plan',
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
        onentercomplete: function () {
            console.log('onentercomplete');
            var action = this;
            var model = action.model;
            var planCount = esui.get('planCount');
            var dataList = model.get('list');
            var planList = model.get('planList');
            var planListFieldInConfig = mf.mockFieldInConfig(planList);
            var operateData = mf.operateDataInConfigField(planList);
            var emptyPlan = mf.initEntityInConfig(planList);

            var table = esui.get('planList');
            table.order = 'asc';
            table.orderBy = planListFieldInConfig('id');
            var saveRow = function (rowIndex) {
                var row = table.datasource[rowIndex];
                if (mf.tableSavingValidator(row, table.fields)) {
                    mf.parallelAjax({
                        type: 'POST',
                        url: '/plan' + (row._isNew ? '' : '/' + operateData.get(row, 'id')),
                        data: mf.getValueEntity(planList, mf.grepDataInConfig(row, planList))
                    }, function (result) {
                        var newData = result[0];
                        mf.setValueEntity(planList, newData);
                        if (row._isNew) {
                            dataList.unshift(newData);
                            planCount.setContent(dataList.length);
                        } else {
                            var idField = planListFieldInConfig('id');
                            var index = mf.m.utils.indexOfArray(dataList, row[idField], idField);
                            index > -1 && (dataList[index] = newData);
                        }
                        table.datasource[rowIndex] = newData;
                        table.render();
                    });
                } else {
                    return false;
                }
            };
            var refreshTable = mf.mockPager(dataList, {
                pager: esui.get('planPager'),
                pageSizer: esui.get('planPageSize'),
                table: table
            }, {
                editToSave: function (value, options, editor) {
                    var row = table.datasource[options.rowIndex];
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
                                var text = esui.get('planName').getValue();
                                var filter;
                                if (text) {
                                    var valueRegExp = mf.m.utils.makeRegExp(text, 'i');
                                    filter = function (obj) {
                                        return valueRegExp.test(operateData.get(obj, 'name'));
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
                                var newRow = $.deepExtend({}, emptyPlan);
                                newRow = mf.grepDataInConfig(newRow, planList);
                                newRow._isNew = true;
                                table.datasource = table.datasource || [];
                                table.datasource.unshift(newRow);
                                table.render();
                            }
                        },
                        {
                            cmd: 'delete_add',
                            handle: function (options) {
                                table.datasource.splice(options.index, 1);
                                table.render();
                            }
                        },
                        {
                            cmd: 'save',
                            handle: function (options) {
                                return saveRow(options.index);
                            }
                        },
                        {
                            cmd: 'copy',
                            handle: function (options) {
                                var row = table.datasource[options.index];
                                var newRow = $.deepExtend({}, emptyPlan, row);
                                newRow = mf.grepDataInConfig(newRow, planList);
                                newRow._isModify = true;
                                newRow._isNew = true;
                                table.datasource.unshift(newRow);
                                table.render();
                            }
                        },
                        {
                            cmd: 'unit',
                            handle: function (options) {
                                var row = table.datasource[options.index];
                                var planId = operateData.get(row, 'id');
                                if (planId) {
                                    var url = '/market/unit~' + $.param({
                                            planId: planId,
                                            planName: operateData.get(row, 'name')
                                        });
                                    mf.m.utils.nextTick(function () {
                                        er.locator.redirect(url);
                                    });
                                }
                            }
                        }
                    ],
                    {
                        region: '#' + action.view.target,
                        rewrite: true
                    }
                )
            );
            if (model.get('addNew')) {
                $('[data-cmd=add]','#' + action.view.target).trigger('click');
            }
        },
        onleave: function () {
            console.log('onleave');
            var commands = this.model.get('commands');
            commands && mf.clickCommand.dispose(commands);
        }
    });
})();