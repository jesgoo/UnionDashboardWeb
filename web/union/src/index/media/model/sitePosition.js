/**
 * @file Generated by er-sync
 * @author Luics<xukai01@baidu.com>
 * @date Wed Mar 18 2015 14:40:37 GMT+0800 (CST)
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 */
(function () {
    var FIELDS = function (model, config) {
        var lists = config.lists.sitePositionList;
        var operateData = mf.operateDataInConfigField(lists);
        var listFieldInConfig = mf.mockFieldInConfig(lists);
        var needFieldLists = {
            'id': {
                stable:1,
                width: 80
                /*content: function (item, index) {
                 return '<a data-cmd="edit" data-index="' + index + '">' + operateData.get(item, 'id', '') + '</a>'
                 }*/
            },
            'media': {},
            'modifyTime': {},
            'name': {
                width: 120
                //breakLine: 1
                /*content: function (item, index) {
                 return '<a data-cmd="edit" data-index="' + index + '">' + operateData.get(item, 'name', '') + '</a>'
                 }*/
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
                    if (!(item._isModify || item._isNew)) {
                        ops.unshift('<a data-cmd="code" data-index="' + index + '">获取代码</a>');
                    }
                    return ops.join('&nbsp;');
                }
            },
            'type': {
                subEntry:1,
                isSubEntryShow: function (item, index, col) {
                    return operateData.get(item, 'type') === config.maps.sitePositionType.banner;
                },
                datasource: config.maps.sitePositionTypeMap,
                content: function (item) {
                    var r = mf.m.utils.deepSearch('children', config.maps.sitePositionTypeMap,
                        operateData.get(item, 'type'), 'value', 0);
                    return r ? r.name || '-' : '-';
                }
            },
            'displayType': {
                datasource: config.maps.sitePositionDisplayTypeMap,
                content: function (item, index, col, textClass) {
                    if (operateData.get(item, 'type') !== config.maps.sitePositionType.popups) {
                        var r = mf.m.utils.deepSearch('children', config.maps.sitePositionDisplayTypeMap,
                            operateData.get(item, 'displayType'), 'value', 0);
                        return r ? r.name || '-' : '-';
                    } else {
                        textClass.push('ui-table-cell-editor-disabled');
                        return '-';
                    }
                }
            },
            'position': {
                datasource: config.maps.displayPositionMap,
                content: function (item, index, col, textClass) {
                    if (operateData.get(item, 'displayType') == config.maps.sitePositionDisplayType['float']
                        && operateData.get(item, 'type') != config.maps.sitePositionType.popups) {
                        var r = mf.m.utils.deepSearch('children', config.maps.displayPositionMap,
                            operateData.get(item, 'position'), 'value', 0);
                        return r ? r.name || '-' : '-';
                    } else {
                        textClass.push('ui-table-cell-editor-disabled');
                        return '-';
                    }
                }
            },
            'hasCloseBtn': {
                datasource: config.maps.judgeMap,
                content: function (item, index, col, textClass) {
                    var type = operateData.get(item, 'type');
                    if (type != config.maps.sitePositionType.text
                        && type != config.maps.sitePositionType.video) {
                        var r = mf.m.utils.deepSearch('children', config.maps.judgeMap,
                            operateData.get(item, 'hasCloseBtn'), 'value', 0);
                        return r ? r.name || '-' : '-';
                    } else {
                        textClass.push('ui-table-cell-editor-disabled');
                        return '-';
                    }
                }
            },
            'blank': {
                datasource: config.maps.judgeMap,
                content: function (item, index, col, textClass) {
                    var displayType = operateData.get(item, 'displayType');
                    if (displayType == config.maps.sitePositionDisplayType['float']) {
                        var r = mf.m.utils.deepSearch('children', config.maps.judgeMap,
                            operateData.get(item, 'blank'), 'value', 0);
                        return r ? r.name || '-' : '-';
                    } else {
                        textClass.push('ui-table-cell-editor-disabled');
                        return '-';
                    }
                }
            },
            'height': {
                title: function () {
                    return '高度(px)' +
                           '<div ui="type:Tip;title:<h6>说明</h6>;content:<p>高度为 -1 时表示全屏</p><br>所有高度设置的对应宽度为320，当遇到更大的屏幕时采取等比例放大的方式<br>如高度设为60，当遇到480的屏幕宽度时，高度被等比例放大为90;skin:help;arrow:tl;"></div>'
                },
                content: function (item) {
                    var height = operateData.get(item, 'height') || 0;
                    if (height == -1) {
                        return '100%';
                    } else {
                        return '320px * ' + height + 'px';
                    }
                },
                validator: function (value, item) {
                    var type = mf.m.utils.deepSearch('children', config.maps.sitePositionTypeMap,
                        operateData.get(item, 'type'), 'value', 0);
                    if (value == -1) {
                        // －1 表示全屏
                        return '';
                    }
                    var heightRange = type.heightRange;
                    if (value < heightRange[0] || value > heightRange[1]) {
                        return '值不在范围内，请修改。（范围：' + heightRange[0] + ' ~ ' + heightRange[1] + '）';
                    }
                }
            },
            'autoPlayInterval': {
                content: function (item, index, col, textClass) {
                    var type = operateData.get(item, 'type');
                    if (type == config.maps.sitePositionType.text
                        || type == config.maps.sitePositionType.video) {
                        return operateData.get(item, 'autoPlayInterval') || 0;
                    } else {
                        textClass.push('ui-table-cell-editor-disabled');
                        return '-';
                    }
                },
                validator: function (value, item) {
                    return operateData.get(item, 'autoPlayInterval') && value < 1 && '不能小于0';
                }
            }
        };
        return mf.mockTableFields(needFieldLists, lists);
    };
    mf.index.media.model.sitePosition = new er.Model({
        QUERY_MAP: {
            media: 'siteId'
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
                '/adslot' + '?' + loader.getQueryString()
            ], function (config, adslots) {
                mf.initEntities({
                    loader: loader,
                    entities: adslots,
                    fields: FIELDS(adslots, config)
                });
                loader.set('config', config);
                loader.set('sitePositionList', config.lists.sitePositionList);
                loader.set('sitePositionCount', adslots.length);
                loader.start();
            });
        })
    });
})();