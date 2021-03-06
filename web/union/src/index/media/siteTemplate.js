/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Thu Apr 30 2015 14:09:52 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */
(function () {
    function loadTemplateEditor(action, target, subActionName, queryMap, templateData) {
        action.subAction = er.controller.loadSub(
            target,
            subActionName,
            {
                queryMap: $.extend(queryMap, {
                    templateData: templateData
                })
            }
        );
        mf.loaded();
        action.subAction.reloadBaseDemo = function (demoData, value) {
            mf.loading();
            mf.m.utils.nextTick(function () {
                action.subAction.leave();
                action.subAction = null;
                queryMap.defaultDemo = value;
                loadTemplateEditor(action, target, subActionName, queryMap, demoData);
            });
        }
    }

    mf.index.media.siteTemplate = new er.Action({
        model: mf.index.media.model.siteTemplate,
        view: new er.View({
            template: 'mf_index_media_siteTemplate',
            UI_PROP: {}
        }),
        STATE_MAP: {},

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
            mf.loaded();
            var action = this;
            var model = action.model;
            var adslot = model.get('adslot');
            var adslotData = model.get('adslotData');
            var config = model.get('config');
            var fields = model.get('fields');
            var adTypeList = model.get('adTypeList');
            var templateList = mf.etplFetch('mf_index_media_siteTemplateList', {});
            var templateListFetcher = _.template(templateList, {variable: 'data'});
            var actionViewTarget = document.getElementById(action.view.target);

            $(actionViewTarget).html(
                templateListFetcher({
                    adTypeList: adTypeList,
                    adslot: adslot
                })
            );
            var ui_prop = {};
            $.each(adTypeList, function (adTypeName, data) {
                ui_prop['list_' + adslot + '_' + adTypeName] = {
                    datasource: data.list,
                    fields: fields(model, config, adTypeName)
                };
            });
            $.extend(action._controlMap, esui.init(actionViewTarget, ui_prop));

            var preview = action.preview;
            mf.m.utils.nextTick(function () {
                $('#template_tabs_' + adslot).jqxTabs({
                    selectionTracker: true
                }).jqxTabs('select', 0);

                $.each(adTypeList, function (adTypeName, data) {
                    var table = esui.get('list_' + adslot + '_' + adTypeName);
                    table.onedit = function (value, options, editor) {
                        var row = table.datasource[options.rowIndex];
                        mf.m.utils.recursion.set(row, options.field.field, value);
                        row._isModify = true;
                        table.render();
                    };
                    table._rowOverHandler = function (rowIndex) {
                        esui.Table.prototype._rowOverHandler.call(this, rowIndex);
                        var row = table.datasource[rowIndex];
                        preview && preview(
                            operateData.get(row, 'version'),
                            new MockData(mf.index.media.model['mockData_' + adTypeName]).get()
                        );
                    };
                });
            });

            var siteTemplateList = config.lists.siteTemplateList;
            var adType = config.maps.adType;
            var siteTemplateFieldInConfig = mf.mockFieldInConfig(siteTemplateList);
            var operateData = mf.operateDataInConfigField(siteTemplateList);
            var emptySitePosition = {};
            emptySitePosition[siteTemplateFieldInConfig('adslot')] = adslot;
            emptySitePosition = mf.initEntityInConfig(siteTemplateList, emptySitePosition);
            var disposeSubAction = function () {
                if (action.subAction) {
                    action.subAction.leave();
                    action.subAction = null;
                }
            };
            model.set(
                'commands',
                mf.clickCommand.register(
                    [
                        {
                            cmd: 'add_template',
                            handle: function (options) {
                                var table = esui.get('list_' + adslot + '_' + options.name);
                                var newRow = $.deepExtend({}, emptySitePosition);
                                newRow[siteTemplateFieldInConfig('adType')] = adType[options.name];
                                newRow = mf.grepDataInConfig(newRow, siteTemplateList);
                                newRow._isNew = true;
                                newRow._isModify = true;
                                table.datasource = table.datasource || [];
                                table.datasource.unshift(newRow);
                                table.render();
                            }
                        },
                        {
                            cmd: 'delete_add_template',
                            handle: function (options) {
                                var table = esui.get('list_' + adslot + '_' + options.name);
                                table.datasource.splice(options.index, 1);
                                table.render();
                            }
                        },
                        {
                            cmd: 'save_template',
                            handle: function (options) {
                                var table = esui.get('list_' + adslot + '_' + options.name);
                                var list = table.datasource || [];
                                var percent = 0;
                                var saveList = [];
                                $.each(list, function (index, row) {
                                    percent += +operateData.get(row, 'percent');
                                    if (row._isModify) {
                                        saveList.push(
                                            {
                                                type: 'POST',
                                                url: '/template' + (row._isNew ? '' : '/' + operateData.get(row, 'id')),
                                                data: mf.grepDataInConfig(row, siteTemplateList)
                                            }
                                        );
                                    }
                                });
                                console.log('save', list, percent);
                                if (percent === 100 || percent === 0) {
                                    mf.parallelAjax(saveList, function () {
                                        $.each(arguments, function (index, result) {
                                            table.datasource[index] = result[0];
                                        });
                                        table.render();
                                    });
                                } else {
                                    var dialog = esui.Dialog.alert({
                                        title: '操作失败',
                                        content: '请保证当前页面内所有模版【流量百分比】的总和必须为 100 或 0。' +
                                                 '<br>当前总和为：' + percent
                                    });
                                }
                            }
                        },
                        {
                            cmd: 'editor_template',
                            handle: function (options) {
                                var table = esui.get('list_' + adslot + '_' + options.name);
                                var adTypeOption = adTypeList[options.name];
                                var row = table.datasource[options.index];
                                var templateID = operateData.get(row, 'id');
                                console.log('editor data', row, adTypeOption, options.name);
                                disposeSubAction();
                                var dialog = esui.Dialog.confirm({
                                    width: 960,
                                    okText: '保存修改',
                                    cancelText: '放弃修改并关闭',
                                    height: 500,
                                    title: adTypeOption.name + ' ID:' + templateID + ' 模版编辑',
                                    content: '<div class="loading">载入中...</div>',
                                    onok: function () {
                                        var saveData = mf.grepDataInConfig(row, siteTemplateList);
                                        var data = action.subAction.save();
                                        console.log('save data', data);
                                        operateData.set(saveData, 'data', data);
                                        mf.loading();
                                        mf.parallelAjax({
                                            type: 'POST',
                                            url: '/template/' + operateData.get(row, 'id'),
                                            data: saveData
                                        }, function (result) {
                                            table.datasource[options.index] = result[0];
                                            table.render();
                                        });
                                        disposeSubAction();
                                        dialog = null;
                                    },
                                    oncancel: function () {
                                        disposeSubAction();
                                        dialog = null;
                                    }
                                });
                                mf.loading();
                                mf.m.utils.nextTick(function () {
                                    loadTemplateEditor(action, dialog.getBody().id, adTypeOption.action, {
                                            styleName: options.name,
                                            config: config,
                                            heightValue: adslotData.heightValue,
                                            template: templateID
                                        }, operateData.get(row, 'data')
                                    );
                                });
                            }
                        }
                    ],
                    {
                        region: '#' + action.view.target,
                        rewrite: true
                    }
                )
            )
            ;
        },
        onleave: function () {
            console.log('onleave');
            var action = this;
            if (action.subAction) {
                action.subAction.leave();
                action.subAction = null;
            }
            var commands = this.model.get('commands');
            commands && mf.clickCommand.dispose(commands);
        }
    })
    ;
})
();