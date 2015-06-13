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
            //targetEditor.content = targetEditor.getBody().innerHTML = mf.etplFetch('unit_target_html');
            //$.extend(action._controlMap, esui.init(targetEditor.getBody()));

            var osTarget = esui.get('osTarget');
            var regionPlain = esui.get('regionPlain');
            var regionView = esui.get('regionView');
            var regionClearView = $('#regionClearView');
            regionPlain.onselect = function (values, value) {
                regionView.setValue(value);
            };
            regionPlain.ondeselect = function (values, value) {
                regionView.cancelValue(value);
            };
            regionView.ondelete = function (values, value) {
                regionPlain.cancelValue(value);
            };
            regionPlain.onchange = regionView.onchange = function (values) {
                if (values.length) {
                    regionClearView.show();
                }
                else {
                    regionClearView.hide();
                }
            };
            if (regionClearView.length) {
                regionClearView.unbind('click.clear').bind('click.clear',
                    function () {
                        var values = regionView.getValue();
                        regionView.cancelValue(values, {dispatch: true});
                    }
                );
            }
            //var confirmTarget = esui.get('confirmTarget');
            //var cancelTarget = esui.get('confirmTarget');
            targetEditor.oncommand = function (opt) {
                var index = opt.index;
                if (index === 0) {
                    var regions;
                    var os = osTarget.getValue()[0];
                    var rowIndex = model.get('currentEditingRow');
                    var row = table.datasource[rowIndex];
                    if (regionPlain.isAllChecked()) {
                        regions = [];
                    } else {
                        regions = regionPlain.getValue();
                    }
                    operateData.set(row, 'regions', regions);
                    operateData.set(row, 'os', os);
                    if (!row._isNew) {
                        var savor = saveRow(rowIndex);
                        savor && savor.done(function () {
                            targetEditor.hide();
                        });
                        return false;
                    }
                }
            };

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
                                osTarget.setValue(operateData.get(row, 'os', -1), { dispatch: true, clear: true });
                                regionPlain.setValue(operateData.get(row, 'regions') || [], { dispatch: true, append: false });
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