/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Tue May 26 2015 14:24:38 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */
(function () {
    mf.index.market.unit = new er.Action({
        model: mf.index.market.model.unit,
        view: new er.View({
            template: 'mf_index_market_unit',
            UI_PROP: {
                targetEditor: {
                    closeButton: 0
                },
                ideaEditor: {
                    closeButton: 0
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
            var table = esui.get('unitList');
            var pager = esui.get('unitPager');
            var pageSizer = esui.get('unitPageSize');
            var unitCount = esui.get('unitCount');
            var dataList = model.get('list');
            var config = model.get('config');
            var unitList = model.get('unitList');
            var unitFieldInConfig = mf.mockFieldInConfig(unitList);
            var operateData = mf.operateDataInConfigField(unitList);
            var emptySitePosition = {};
            emptySitePosition[unitFieldInConfig('plan')] = model.get('planId');
            emptySitePosition = mf.initEntityInConfig(unitList, emptySitePosition);
            table.order = 'asc';
            table.orderBy = unitFieldInConfig('id');
            var saveRow = function (rowIndex) {
                var row = table.datasource[rowIndex];
                if (mf.tableSavingValidator(row, table.fields)) {
                    return mf.parallelAjax({
                        type: 'POST',
                        url: '/unit' + (row._isNew ? '' : '/' + operateData.get(row, 'id')),
                        data: mf.getValueEntity(unitList, mf.grepDataInConfig(row, unitList))
                    }, function (result) {
                        var newData = result[0];
                        mf.setValueEntity(unitList, newData);
                        if (row._isNew) {
                            dataList.unshift(newData);
                            unitCount.setContent(dataList.length);
                        } else {
                            var idField = unitFieldInConfig('id');
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
                pager: pager,
                pageSizer: pageSizer,
                table: table
            }, {
                editToSave: function (value, options, editor) {
                    var row = table.datasource[options.rowIndex];
                    if (!row._isNew) {
                        return saveRow(options.rowIndex);
                    }
                }
            });
            refreshTable();
            $.extend(action._controlMap, esui.init(table.main));

            action.subAction = {};
            var ideasEditor = esui.get('ideaEditor');
            ideasEditor.oncommand = function (opt) {
                var index = opt.index;
                if (index === 0) {
                    var ideas = action.subAction.idea.getSelectedIdea() || [];
                    var rowIndex = model.get('currentEditingRow');
                    var row = table.datasource[rowIndex];
                    operateData.set(row, 'ideas', ideas);
                    if (!row._isNew) {
                        var savor = saveRow(rowIndex);
                        savor && savor.done(function () {
                            ideasEditor.hide();
                            action.subAction.idea.leave();
                            action.subAction.idea = null;
                        });
                        return false;
                    }
                } else {
                    action.subAction.idea.leave();
                    action.subAction.idea = null
                }
            };
            var targetEditor = esui.get('targetEditor');
            targetEditor.oncommand = function (opt) {
                var index = opt.index;
                if (index === 0) {
                    var regions = action.subAction.target.getRegions();
                    var os = action.subAction.target.getOS();
                    var hours = action.subAction.target.getHours();
                    var rowIndex = model.get('currentEditingRow');
                    var row = table.datasource[rowIndex];
                    operateData.set(row, 'regions', regions);
                    operateData.set(row, 'os', os);
                    operateData.set(row, 'hours', hours);
                    if (!row._isNew) {
                        var savor = saveRow(rowIndex);
                        savor && savor.done(function () {
                            targetEditor.hide();
                            action.subAction.target.leave();
                            action.subAction.target = null;
                        });
                        return false;
                    }
                } else {
                    action.subAction.target.leave();
                    action.subAction.target = null
                }
            };
            console.log('hours', operateData.get(table.datasource[0], 'hours'));

            model.set(
                'commands',
                mf.clickCommand.register(
                    [
                        {
                            cmd: 'search',
                            handle: function (options) {
                                var text = esui.get('unitName').getValue();
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
                                var newRow = $.deepExtend({}, emptySitePosition);
                                newRow = mf.grepDataInConfig(newRow, unitList);
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
                                var newRow = $.deepExtend({}, emptySitePosition, row);
                                newRow = mf.grepDataInConfig(newRow, unitList);
                                newRow._isModify = true;
                                newRow._isNew = true;
                                table.datasource.unshift(newRow);
                                table.render();
                            }
                        },
                        {
                            cmd: 'target',
                            handle: function (options) {
                                var row = table.datasource[options.index];
                                targetEditor.show();
                                if (action.subAction.target) {
                                    action.subAction.target.leave();
                                }
                                action.subAction.target = er.controller.loadSub(
                                    targetEditor.getBody().id,
                                    'mf.index.market.target',
                                    {
                                        queryMap: {
                                            osTypeMap: model.get('osTypeMap'),
                                            regionMap: model.get('regionMap'),
                                            os: operateData.get(row, 'os', -1),
                                            regions: operateData.get(row, 'regions') || [],
                                            hours: operateData.get(row, 'hours')
                                        }
                                    }
                                );
                                model.set('currentEditingRow', options.index);
                            }
                        },
                        {
                            cmd: 'ideas',
                            handle: function (options) {
                                var row = table.datasource[options.index];
                                ideasEditor.show();
                                if (action.subAction.idea) {
                                    action.subAction.idea.leave();
                                }
                                action.subAction.idea = er.controller.loadSub(
                                    ideasEditor.getBody().id,
                                    'mf.index.market.idea',
                                    {
                                        queryMap: {
                                            selectedIdeas: operateData.get(row, 'ideas'),
                                            ideas: model.get('ideas'),
                                            resources: model.get('resources'),
                                            config: model.get('config'),
                                            listing: true
                                        }
                                    }
                                );
                                model.set('currentEditingRow', options.index);
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
            for(var i in this.subAction) {
                this.subAction[i] && this.subAction[i].leave();
            }
            this.subAction = null;

            var commands = this.model.get('commands');
            commands && mf.clickCommand.dispose(commands);
        }
    });
})();