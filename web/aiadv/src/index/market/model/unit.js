/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Tue May 26 2015 14:24:38 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */
(function () {
    var FIELDS = function (model, config) {
        var lists = config.lists.unitList;
        var operateData = mf.operateDataInConfigField(lists);
        var needFieldLists = {
            'id': {
                stable:1,
                width: 60
                /*content: function (item, index) {
                 return '<a data-cmd="edit" data-index="' + index + '">' + operateData.get(item, 'id', '') + '</a>'
                 }*/
            },
            'plan': {},
            'name': {
                //breakLine: 1
                /*content: function (item, index) {
                 return '<a data-cmd="edit" data-index="' + index + '">' + operateData.get(item, 'name', '') + '</a>'
                 }*/
            },
            'status': {
                stable:1,
                width: 70,
                datasource: config.maps.unitStatusTypeMap,
                content: function (item) {
                    var r = mf.m.utils.deepSearch('children', config.maps.unitStatusTypeMap, operateData.get(item, 'status'), 'value', 0);
                    return r ? r.name || '-' : '-';
                }
            },
            'type': {
                editable: function (item, index, col) {
                    return !!item._isNew;
                },
                datasource: config.maps.positionTypeMap,
                content: function (item, index, col, textClass) {
                    var r = mf.m.utils.deepSearch('children', config.maps.positionTypeMap,
                        operateData.get(item, 'type'), 'value', 0);
                    return r ? r.name || '-' : '-';
                }
            },
            'charge': {
                editable: function (item, index, col) {
                    return config.maps.chargeType.CPS !== operateData.get(item, 'charge');
                },
                datasource: config.maps.chargeTypeMap.slice(0,-1),
                content: function (item, index, col, textClass) {
                    var r = mf.m.utils.deepSearch('children', config.maps.chargeTypeMap,
                        operateData.get(item, 'charge'), 'value', 0);
                    return r ? r.name || '-' : '-';
                }
            },
            'bid': {
                content: function (item) {
                    return mf.getEnglishNumber(operateData.get(item, 'bid', 0));
                },
                validator: function (value, item) {
                    return (!value || value < 0) && '策略出价不能少于0';
                }
            },
            'target': {
                stable:1,
                width: 140,
                title: '定向投放',
                //subEntry:1,
                /*isSubEntryShow: function (item, index, col) {
                    return !item._isNew && operateData.get(item, 'type') === config.maps.sitePositionType.banner;
                },
                editable: function (item, index, col) {
                    return !!item._isNew;
                },*/
                content: function (item, index) {
                    var text = [];
                    if (operateData.get(item, 'os') != config.maps.osType.all) {
                        text.push('操作系统');
                    }
                    if (operateData.get(item, 'regions', []).length) {
                        text.push('地域');
                    }
                    if (operateData.get(item, 'hours', []).filter(function (n) { return parseInt(n.join(''), 2) === 16777215}).length !== 7) {
                        text.push('时段');
                    }
                    text = text.join(' ') || '系统自动投放';
                    return '<a data-index="' + index + '" data-cmd="target">' + text + '</a>'
                }
            },
            'ideas': {
                content: function (item, index, col, textClass) {
                    var text = operateData.get(item, 'ideas', []).length;
                    text = text ? '<span class="error">' + text + '</span> 个创意受用' : '未指定受用的创意' ;
                    return '<a data-index="' + index + '" data-cmd="ideas">' + text + '</a>'
                }
            },
            'modifyTime': {
                stable:1,
                width: 120
            },
            'operation': {
                stable: 1,
                width: 96,
                title: '操作',
                content: function (item, index) {
                    var ops = [];
                    if (item._isModify) {
                        ops.unshift('<a data-cmd="save" data-index="' + index + '">保存</a>');
                    }
                    /* else if (!item._isNew) {
                     ops.unshift('<a data-cmd="edit" data-index="' + index + '">修改</a>');
                     }*/
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
    var IDEA_FIELDS = function (model, config) {
        var lists = config.lists.ideaList;
        var operateData = mf.operateDataInConfigField(lists);
        var needFieldLists = {
            'id': {
                stable:1,
                width: 60
                /*content: function (item, index) {
                 return '<a data-cmd="edit" data-index="' + index + '">' + operateData.get(item, 'id', '') + '</a>'
                 }*/
            },
            'name': {
                //breakLine: 1
                /*content: function (item, index) {
                 return '<a data-cmd="edit" data-index="' + index + '">' + operateData.get(item, 'name', '') + '</a>'
                 }*/
            }
        };
        return mf.mockTableFields(needFieldLists, lists);
    };
    mf.index.market.model.unit = new er.Model({
        QUERY_MAP: {
            plan: 'planId'
        },
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
                '/unit' + '?' + loader.getQueryString(),
                '/idea',
                '/resource'
            ], function (config, entities, ideas, resources) {

                mf.setValueEntities(config.lists.unitList, entities);
                mf.initEntities({
                    loader: loader,
                    entities: entities,
                    fields: FIELDS(entities, config)
                });
                loader.set('config', config);
                loader.set('unitList', config.lists.unitList);
                loader.set('ideaList', config.lists.ideaList);
                loader.set('unitCount', entities.length);
                loader.set('osTypeMap', config.maps.osTypeMap);
                loader.set('regionMap', mf.m.regionTypes);

                loader.set('ideas', ideas);
                loader.set('resources', resources);
                loader.set('ideaFields', IDEA_FIELDS(ideas, config));

                loader.start();
            });
        })
    });
})();