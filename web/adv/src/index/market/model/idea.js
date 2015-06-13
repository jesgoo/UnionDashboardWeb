/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Wed May 27 2015 11:31:41 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */
(function () {
    var FIELDS = function (entities, config, model) {
        var lists = config.lists.ideaList;
        var operateData = mf.operateDataInConfigField(lists);
        var getField = mf.mockFieldInConfig(lists);
        var isOnlyForListing = model.get('listing');
        var needFieldLists = {
            'id': {
                stable: 1,
                width: 60,
                content: isOnlyForListing ? getField('id') : function (item, index) {
                    return '<a data-cmd="edit-idea" data-index="' + index + '">' + operateData.get(item, 'id', '') + '</a>'
                }
            },
            'name': {
                stable: 1,
                width: 150,
                content: isOnlyForListing ? getField('name') : function (item, index) {
                    return '<a data-cmd="edit-idea" data-index="' + index + '">' + operateData.get(item, 'name', '') + '</a>'
                }
            },
            'status': {
                stable: 1,
                width: 80,
                datasource: config.maps.ideaStatusTypeMap,
                content: function (item) {
                    var r = mf.m.utils.deepSearch('children', config.maps.ideaStatusTypeMap,
                        operateData.get(item, 'status'), 'value', 0);
                    return r ? r.name || '-' : '-';
                }
            },
            'type': {
                stable: 1,
                width: 80,
                datasource: config.maps.positionTypeMap,
                content: function (item, index, col, textClass) {
                    var r = mf.m.utils.deepSearch('children', config.maps.positionTypeMap,
                        operateData.get(item, 'type'), 'value', 0);
                    // 把各种不认识的推广类型都划归为banner
                    r || (r = config.maps.positionTypeMap[0]);
                    return r ? r.name || '-' : '-';
                }
            },
            'display': {
                stable: 1,
                width: 80,
                datasource: config.maps.displayTypeMap,
                content: function (item, index, col, textClass) {
                    var r = mf.m.utils.deepSearch('children', config.maps.displayTypeMap,
                        operateData.get(item, 'display'), 'value', 0);
                    return r ? r.name || '-' : '-';
                }
            },
            'preview': {
                title: "创意预览",
                breakLine: 1,
                content: function (item) {
                    var image = operateData.get(item, 'imageFilename');
                    var display = operateData.get(item, 'display');
                    var targetType = operateData.get(item, 'targetType');
                    var previewData = {};
                    if (display === config.maps.displayType.image || display === config.maps.displayType.text_icon) {
                        previewData.image = image;
                    }
                    if (display === config.maps.displayType.text || display === config.maps.displayType.text_icon) {
                        previewData.title = operateData.get(item, 'title');
                        previewData.description = operateData.get(item, 'description');
                    }
                    if (targetType === config.maps.targetType.local) {
                        previewData.target = operateData.get(item, 'downloadFilename');
                    } else {
                        previewData.target = operateData.get(item, 'targetUrl');
                    }
                    var templateName = mf.m.utils.getKey(config.maps.displayType, display);
                    return mf.etplFetch('adv_preview_' + templateName, previewData);
                }
            },
            'modifyTime': {
                stable: 1,
                width: 130
            }
        };
        return mf.mockTableFields(needFieldLists, lists);
    };
    mf.index.market.model.idea = new er.Model({
        QUERY_MAP: {},
        LOADER_LIST: ['modelLoader', 'modelParser'],
        modelLoader: new er.Model.Loader(function () {
            console.log('modelLoader');
            var loader = this;

            if (!loader.get('ideas')) {
                loader.stop();
                mf.parallelAjax([
                    {
                        url: '/config',
                        cache: true
                    },
                    '/idea',
                    '/resource'
                ], function (config, ideas, resources) {
                    loader.set('config', config);
                    loader.set('ideas', ideas);
                    loader.set('resources', resources);
                    loader.start();
                });
            }
        }),
        modelParser: new er.Model.Loader(function () {
            console.log('modelParser');
            var loader = this;
            var config = loader.get('config');
            var ideas = loader.get('ideas') || [];
            var resources = loader.get('resources');
            var lists = config.lists.ideaList;
            var getFilename = mf.adv.getResourceFilenameById(resources);
            var getField = mf.mockFieldInConfig(lists);
            var imageFilenameField = getField('imageFilename');
            var downloadFilenameField = getField('downloadFilename');
            var imageField = getField('image');
            var downloadField = getField('app');

            mf.setValueEntities(lists, ideas);

            ideas.forEach(function (n) {
                n[imageFilenameField] = getFilename(n[imageField]);
                n[downloadFilenameField] = getFilename(n[downloadField]);
            });

            mf.initEntities({
                loader: loader,
                entities: ideas,
                fields: FIELDS(ideas, config, loader)
            });


            loader.set('config', config);
            loader.set('ideaList', lists);
            loader.set('ideaCount', ideas.length);

            loader.set('ideas', ideas);
        })
    });
})();