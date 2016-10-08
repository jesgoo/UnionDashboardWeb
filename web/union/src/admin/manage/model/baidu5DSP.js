/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Tue Dec 08 2015 10:52:03 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */
(function () {
    var FIELDS = function (model, config, loader) {
        var lists = config.lists.DSPList;
        var isOnlyForListing = loader.get('listing');
        var operateData = mf.operateDataInConfigField(lists);
        var needFieldLists = {
            'id': {
                stable:1,
                width: 60
            },
            'media': {
                stable:1,
                width: 100,
                editable: function (item, index, col) {
                    return !!item._isNew;
                },
                validator: function (value, item) {
                    return !value && '媒体ID不能为空';
                }
            },
            'adslot': {
                stable:1,
                width: 100,
                editable: function (item, index, col) {
                    return !!item._isNew;
                },
                validator: function (value, item) {
                    return !value && '广告位ID不能为空';
                }
            },
            'description': {},
            'createTime': {
                stable:1,
                width: 140
            },
            'modifyTime': {
                stable:1,
                width: 140
            },
            'operation': {
                title: '操作',
                stable:1,
                width: 80,
                content: function (item, index) {
                    var ops = [];
                    if (item._isModify) {
                        ops.unshift('<a data-cmd="save_baidu_dsp" data-index="' + index + '">保存</a>');
                    }
                    if (item._isNew) {
                        ops.unshift('<a data-cmd="delete_add_baidu_dsp" data-index="' + index + '">删除</a>');
                    }
                    return ops.join('&nbsp;');
                }
            }
        };
        if (isOnlyForListing) {
            delete needFieldLists.createTime;
            delete needFieldLists.modifyTime;
            delete needFieldLists.operation;
        }

        return mf.mockTableFields(needFieldLists, lists);
    };
    mf.admin.manage.model.baidu5DSP = new er.Model({
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
                '/admin/baidu5adslot'
            ], function (config, entities) {

                mf.initEntities({
                    loader: loader,
                    entities: entities,
                    fields: FIELDS(entities, config, loader)
                });
                loader.set('config', config);
                loader.set('DSPList', config.lists.DSPList);
                loader.start();
            });
        })
    });
})();