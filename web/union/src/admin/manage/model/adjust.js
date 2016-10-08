/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Tue Jun 23 2015 14:12:36 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */
(function () {
    var FIELDS = function (model) {
        var mediaList = model.get('mediaList');
        var adslotList = model.get('adslotList');
        var channelNames = model.get('channelNames');
        var mediaNames = model.get('mediaNames');
        var adslotNames = model.get('adslotNames');
        var statusType = model.get('statusType');
        mediaList.forEach(function (n, key) {
            mediaNames[n.value] = n.name;
        });
        adslotList.forEach(function (n, key) {
            adslotNames[n.value] = n.name;
        });
        var getMoneyString = mf.getFieldContentMoney('', null, 3);
        var needFieldLists = {
            media: {
                sortable: true,
                stable: 1,
                width: 200,
                title: '媒体',
                field: 'media',
                content: function (item) {
                    return mediaNames[item.media] || '-';
                },
                datasource: mediaList,
                edittype: 'select',
                editable: function (item) {
                    return !!item._isNew;
                },
                validator: function (value) {
                    if (!value) {
                        return '必须选定一个媒体！';
                    }
                }
            },
            adslot: {
                sortable: true,
                stable: 1,
                width: 200,
                title: '广告位',
                field: 'adslot',
                content: function (item) {
                    return adslotNames[item.adslot] || '-';
                },
                edittype: 'select',
                editable: function (item) {
                    return !!item._isNew && item.media;
                },
                beforeEdit: function (item, row, col, field) {
                    field.datasource = adslotList.filter(function (n) {
                        return n.media === item.media;
                    });
                    field.datasource.unshift(adslotList[0]);
                },
                validator: function (value) {
                    if (!value) {
                        return '必须选定一个媒体！';
                    }
                }
            },
            status: {
                sortable: true,
                stable: 1,
                width: 100,
                title: '状态',
                field: 'status',
                datasource: statusType,
                content: function (item) {
                    var r = mf.m.utils.deepSearch(statusType, item.status, 'value');
                    return r ? r.name : '-';
                },
                editable: 1,
                edittype: 'select'
            },
            acpMin: {
                stable: 1,
                width: 100,
                title: '最小ACP',
                field: 'min_acp',
                editable: 1,
                edittype: 'float',
                content: function (item, index) {
                    return item.min_acp ? getMoneyString(item, 'min_acp') : '-';
                },
                validator: function (value, item) {
                    value = +value;
                    if (value < 0) {
                        return '不能小于0';
                    } else if (item.max_acp > 0 && value > item.max_acp) {
                        return '不能大于已设定的【最大ACP】';
                    }
                }
            },
            acpMax: {
                stable: 1,
                width: 100,
                title: '最大ACP',
                field: 'max_acp',
                editable: 1,
                edittype: 'float',
                content: function (item, index) {
                    return item.max_acp ? getMoneyString(item, 'max_acp') : '-';
                },
                validator: function (value, item) {
                    value = +value;
                    if (value < 0) {
                        return '不能小于0';
                    } else if (value > 0 && value < item.min_acp) {
                        return '不能小于已设定的【最小ACP】';
                    }
                }
            },
            ecpmMin: {
                stable: 1,
                width: 100,
                title: '最小ECPM',
                field: 'min_ecpm',
                editable: 1,
                edittype: 'float',
                content: function (item, index) {
                    return item.min_ecpm ? getMoneyString(item, 'min_ecpm') : '-';
                },
                validator: function (value, item) {
                    value = +value;
                    if (value < 0) {
                        return '不能小于0';
                    } else if (item.max_ecpm > 0 && value > item.max_ecpm) {
                        return '不能大于已设定的【最大ECPM】';
                    }
                }
            },
            ecpmMax: {
                stable: 1,
                width: 100,
                title: '最大ECPM',
                field: 'max_ecpm',
                editable: 1,
                edittype: 'float',
                content: function (item, index) {
                    return item.max_ecpm ? getMoneyString(item, 'max_ecpm') : '-';
                },
                validator: function (value, item) {
                    value = +value;
                    if (value < 0) {
                        return '不能小于0';
                    } else if (value > 0 && value < item.min_ecpm) {
                        return '不能小于已设定的【最小ECPM】';
                    }
                }
            },
            modified_time: {
                title: '修改时间',
                sortable: true,
                field: 'modified_time'
            },
            operation: {
                stable: 1,
                width: 96,
                title: '操作',
                content: function (item, index) {
                    var ops = [];
                    if (item._isModify) {
                        ops.unshift('<a data-cmd="save" data-index="' + index + '">保存</a>');
                    }
                    if (item._isNew) {
                        ops.unshift('<a data-cmd="delete_add" data-index="' + index + '">删除</a>');
                    }
                    return ops.join('&nbsp;') || '-';
                }
            }
        };
        return mf.mockTableFields(needFieldLists, {});
    };
    mf.admin.manage.model.adjust = new er.Model({
        QUERY_MAP: {},
        LOADER_LIST: ['modelLoader'],
        modelLoader: new er.Model.Loader(function () {
            console.log('modelLoader');
            var loader = this;

            loader.stop();
            mf.parallelAjax([
                '/admin/media/judge',
                {
                    url: '/admin/media',
                    cache: true
                },
                {
                    url: '/admin/adslot',
                    cache: true
                }
            ], function (adjust, media, adslot) {

                /*
                 channel.unshift({
                 "id": "0",
                 "name": "自有渠道"
                 });
                 */
                var mediaList = media.map(function (n) {
                    return {
                        name: n.id + '_' + n.name,
                        value: n.id
                    }
                });
                mediaList.sort(function (a, b) {
                    return a.value > b.value ? 1 : -1;
                });
                var adslotList = adslot.map(function (n) {
                    return {
                        name: n.id + '_' + n.name,
                        media: n.media,
                        value: n.id
                    }
                });
                adslotList.sort(function (a, b) {
                    return a.value > b.value ? 1 : -1;
                });
                adslotList.unshift({
                    "value": "s0000000",
                    "media": "nothing",
                    "name": "所有从属广告位"
                });

                var mediaNames = {};
                var adslotNames = {};
                mediaList.forEach(function (n, index) {
                    mediaNames[n.value] = n.name;
                });
                adslotList.forEach(function (n, index) {
                    adslotNames[n.value] = n.name;
                });
                loader.set('mediaList', mediaList);
                loader.set('adslotList', adslotList);
                loader.set('mediaNames', mediaNames);
                loader.set('adslotNames', adslotNames);
                adjust.forEach(function (n) {
                    n.mediaName = mediaNames[n.media];
                    n.adslotName = adslotNames[n.adslot];
                });
                loader.set('emptyAdjust', {
                    media: '',
                    adslot: 's0000000',
                    status: 0,
                    min_acp: 0,
                    max_acp: 0,
                    min_ecpm: 0,
                    max_ecpm: 0
                });

                loader.set('statusType', [
                    {
                        name: '生效',
                        value: 0
                    },
                    {
                        name: '关闭',
                        value: 1
                    }
                ]);

                mf.initEntities({
                    loader: loader,
                    entities: adjust,
                    fields: FIELDS(loader)
                });

                loader.start();
            });
        })
    });
})();