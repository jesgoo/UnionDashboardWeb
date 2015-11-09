/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Tue Mar 17 2015 09:45:32 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */
(function () {
    mf.index.media.app = new er.Action({
        model: mf.index.media.model.app,
        view: new er.View({
            template: 'mf_index_media_app',
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
        },
        onentercomplete: function () {
            console.log('onentercomplete');
            var action = this;
            var model = action.model;
            var popupsCount = esui.get('popupsCount');
            var appMediaCount = esui.get('appMediaCount');
            var dataList = model.get('list');
            var appMediaList = model.get('appMediaList');
            var appMediaListFieldInConfig = mf.mockFieldInConfig(appMediaList);
            var operateData = mf.operateDataInConfigField(appMediaList);
            var emptyAppMedia = mf.initEntityInConfig(appMediaList);

            var table = esui.get('list');
            table.order = 'asc';
            table.orderBy = appMediaListFieldInConfig('id');
            var saveRow = function (rowIndex) {
                var row = table.datasource[rowIndex];
                if (mf.tableSavingValidator(row, table.fields)) {
                    mf.parallelAjax({
                        type: 'POST',
                        url: '/media' + (row._isNew ? '' : '/' + operateData.get(row, 'id')),
                        data: mf.grepDataInConfig(row, appMediaList)
                    }, function (result) {
                        var newData = result[0];
                        if (row._isNew) {
                            dataList.unshift(newData);
                            appMediaCount.setContent(dataList.length);
                        } else {
                            var idField = appMediaListFieldInConfig('id');
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
                pager: esui.get('pager'),
                pageSizer: esui.get('pageSize'),
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
                                var text = esui.get('appMediaName').getValue();
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
                                var newRow = $.deepExtend({}, emptyAppMedia);
                                newRow = mf.grepDataInConfig(newRow, appMediaList);
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
                                var newRow = $.deepExtend({}, emptyAppMedia, row);
                                newRow = mf.grepDataInConfig(newRow, appMediaList);
                                newRow._isModify = true;
                                newRow._isNew = true;
                                table.datasource.unshift(newRow);
                                table.render();
                            }
                        },
                        {
                            cmd: 'add_adslot',
                            handle: function (options) {
                                var row = table.datasource[options.index];
                                var appId = operateData.get(row, 'id');
                                if (appId) {
                                    var url = '/media/appPosition~' + $.param({
                                            addNew: 1,
                                            appId: appId,
                                            appName: operateData.get(row, 'name')
                                        });
                                    mf.m.utils.nextTick(function () {
                                        er.locator.redirect(url);
                                    });
                                }
                            }
                        },
                        {
                            cmd: 'position',
                            handle: function (options) {
                                var row = table.datasource[options.index];
                                var appId = operateData.get(row, 'id');
                                if (appId) {
                                    var url = '/media/appPosition~' + $.param({
                                            appId: appId,
                                            appName: operateData.get(row, 'name')
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