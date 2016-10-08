/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Fri Oct 16 2015 11:16:08 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */
(function () {
    var FIELDS = function (entities, config, model) {
        var lists = config.lists.mediaDSPList;
        var baiduAdslots = model.get('baiduAdslots');
        var tencentAdslots = model.get('tencentAdslots');
        var baidu5Adslots = model.get('baidu5Adslots');
        var operateData = mf.operateDataInConfigField(lists);
        var needFieldLists = {
            'media': {
                stable: 1,
                width: 90,
                editable: function (item, index, col) {
                    return !!item._isNew;
                },
                validator: function (value, item) {
                    return !value && '媒体ID不能为空';
                }
            },
            'type': {
                stable: 1,
                width: 90,
                editable: function (item, index, col) {
                    return !!item._isNew;
                },
                validator: function (value, item) {
                    return !value && '未指定广告类型';
                },
                datasource: config.maps.adslotTypeMap,
                content: function (item, index, col, textClass) {
                    var r = mf.m.utils.deepSearch('children', config.maps.adslotTypeMap,
                        operateData.get(item, 'type'), 'value', 0);
                    return !r ? '-' : r.name;
                }
            },
            'dsp_type': {
                stable: 1,
                width: 90,
                editable: function (item, index, col) {
                    return !!item._isNew;
                },
                datasource: config.maps.dspAdslotTypeMap,
                validator: function (value, item) {
                    return !value && '未指定DSP类型';
                },
                content: function (item, index, col, textClass) {
                    var r = mf.m.utils.deepSearch('children', config.maps.dspAdslotTypeMap,
                        operateData.get(item, 'dsp_type'), 'value', 0);
                    return !r ? '-' : r.name;
                }
            },
            'platform': {
                stable: 1,
                width: 90,
                editable: function (item, index, col) {
                    return !!item._isNew;
                },
                datasource: config.maps.platformMap,
                content: function (item, index, col, textClass) {
                    var r = mf.m.utils.deepSearch('children', config.maps.platformMap,
                        operateData.get(item, 'platform'), 'value', 0);
                    return !r ? '-' : r.name;
                }
            },
            'status': {
                stable: 1,
                width: 70,
                datasource: config.maps.validMap,
                content: function (item, index, col, textClass) {
                    var r = mf.m.utils.deepSearch('children', config.maps.validMap,
                        operateData.get(item, 'status'), 'value', 0);
                    return !r ? '-' : r.name;
                }
            },
            'baidu': {
                content: function (item, index, col, textClass) {
                    textClass.push('ui-table-cell-with-cmd');
                    var r = mf.m.utils.deepSearch('children', baiduAdslots,
                        operateData.get(item, 'baidu'), 'id');
                    return '<a data-cmd="set_dsp" data-field="baidu" data-index="' + index + '">' + (!r ? '暂无': 'ID:' + r.id + ' ' + r.description) + '</a>' + (r ? '<a class="ui-table-float-cmd float-right" data-cmd="delete_dsp" data-field="baidu" data-index="' + index + '">清除</a>' : '');
                }
            },
            'tencent': {
                content: function (item, index, col, textClass) {
                    textClass.push('ui-table-cell-with-cmd');
                    var r = mf.m.utils.deepSearch('children', tencentAdslots,
                        operateData.get(item, 'tencent'), 'id');
                    return '<a data-cmd="set_dsp" data-field="tencent" data-index="' + index + '">' + (!r ? '暂无': 'ID:' + r.id + ' ' + r.description) +'</a>'+ (r ? '<a class="ui-table-float-cmd float-right" data-cmd="delete_dsp" data-field="tencent" data-index="' + index + '">清除</a>' :'');
                }
            },
            'baidu5': {
                content: function (item, index, col, textClass) {
                    textClass.push('ui-table-cell-with-cmd');
                    var r = mf.m.utils.deepSearch('children', baidu5Adslots,
                        operateData.get(item, 'baidu5'), 'id');
                    return '<a data-cmd="set_dsp" data-field="baidu5" data-index="' + index + '">' + (!r ? '暂无': 'ID:' + r.id + ' ' + r.description) + '</a>' + (r ? '<a class="ui-table-float-cmd float-right" data-cmd="delete_dsp" data-field="baidu5" data-index="' + index + '">清除</a>' : '');
                }
            },
            /*'createTime': {
                stable:1,
                width: 130
            },
            */'modifyTime': {
                stable:1,
                width: 130
            },
            'operation': {
                title: '操作',
                stable:1,
                width: 80,
                content: function (item, index) {
                    var ops = [];
                    if (item._isModify) {
                        ops.unshift('<a data-cmd="save" data-index="' + index + '">保存</a>');
                    }
                    if (item._isNew) {
                        ops.unshift('<a data-cmd="delete_add" data-index="' + index + '">删除</a>');
                    } else {
                        ops.unshift('<a data-cmd="copy" data-index="' + index + '">复制</a>');
                    }
                    return ops.join('&nbsp;');
                }
            }
        };
        return mf.mockTableFields(needFieldLists, lists);
    };
    mf.admin.manage.model.mediaDSPID = new er.Model({
        QUERY_MAP: {},
        LOADER_LIST: ['modelLoader'],
        modelLoader: new er.Model.Loader(function () {
            console.log('modelLoader');
            var loader = this;
            loader.stop();

            mf.parallelAjax([
                {
                    url: '/config',
                    cache: true
                },
                '/admin/mediaadslot',
                '/admin/baiduadslot',
                '/admin/tencentadslot',
                '/admin/baidu5adslot'
            ], function (config, entities, baiduAdslots, tencentAdslots, baidu5Adslots) {

                loader.set('baiduAdslots', baiduAdslots);
                loader.set('tencentAdslots', tencentAdslots);
                loader.set('baidu5Adslots', baidu5Adslots);
                mf.initEntities({
                    loader: loader,
                    entities: entities,
                    fields: FIELDS(entities, config, loader)
                });
                loader.set('config', config);
                loader.set('mediaDSPList', config.lists.mediaDSPList);
                loader.start();
            });
        })
    });
})();