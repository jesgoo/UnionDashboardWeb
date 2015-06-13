/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Fri Mar 27 2015 15:20:13 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */
(function () {
    var guide = function (action, element) {
        var reportGuide = $(element, '#' + action.view.target);
        return function (deepSearchItem) {
            console.log('rend guide', deepSearchItem);
            var guideHTML = [
                deepSearchItem.text
            ];
            while (deepSearchItem.parent) {
                deepSearchItem = deepSearchItem.parent;
                guideHTML.unshift('<a data-cmd="' +
                               deepSearchItem.guideCmd +
                               (deepSearchItem[deepSearchItem.guideCmd]
                                   ? '" data-' + deepSearchItem.guideCmd + '="'
                               + deepSearchItem[deepSearchItem.guideCmd]
                                   : '') +
                               '">' + deepSearchItem.text +
                               '</a>');
            }
            reportGuide.html("<em>报表路径</em>&nbsp;" + guideHTML.join('&nbsp;➡️&nbsp;'));
        };
    };
    mf.index.report.index = new er.Action({
        model: mf.index.report.model.index,
        view: new er.View({
            template: 'mf_index_report_index',
            UI_PROP: {
                side: {
                    marginTop: 0
                },
                myTree: {
                    collapsed: 0,
                    expandSelected: false,
                    clickExpand: false
                }
            }
        }),
        STATE_MAP: {},

        onenter: function () {
            console.log('onenter');
            mf.onenter();
        },
        onafterloadmodel: function () {
            console.log('onafterrepaint');
            var model = this.model;
            var operateData = mf.operateDataInConfigField(model.get('siteMediaList'));
            var mediaTree = $.map(model.get('medias') || [], function (media) {
                var mediaId = operateData.get(media, 'id');
                var mediaName = operateData.get(media, 'name');
                return {
                    text: mediaName,
                    id: '_report_dailyMedia/' + mediaId,
                    media: mediaId,
                    guideCmd: 'media',
                    hideChildren: true,
                    reports: {
                        media: {
                            action: 'media',
                            queryMap: {
                                media: mediaId
                            }
                        }
                    },
                    children: [
                        {
                            text: '载入中...',
                            id: '_load_/adslot?media=' + mediaId
                        }
                    ]
                }
            });
            var channelTree = $.map(model.get('channels') || [], function (channel) {
                var channelId = channel.id;
                var channelName = channel.name;
                return {
                    text: channelName,
                    id: '_report_dailyChannel/' + channelId,
                    media: channelId,
                    guideCmd: 'media',
                    reports: {
                        dailyChannel: {
                            action: 'dailyChannel',
                            queryMap: {
                                channel: channelId
                            }
                        }
                    }
                }
            });
            var treeSource = {
                id: '_report_dailyTotal',
                text: '我的账户',
                guideCmd: 'total',
                reports: {
                    total: {
                        action: 'total'
                    }
                },
                children: channelTree.concat(mediaTree)
            };
            model.set('treeSource', treeSource);
        },
        onafterrender: function () {
            console.log('onafterrender');
            var action = this;
            var model = action.model;
            var methodReg = /^_(\w+)_(.+?)(?:\/(.*))?$/;
            action.subAction = {};
            var operatePositionData = mf.operateDataInConfigField(model.get('sitePositionList'));
            var myTree = esui.get('myTree');
            var treeSource = model.get('treeSource');
            myTree.onexpand = function (value, cb) {
                var item = this._dataMap[value];
                item.hideChildren = false;
                var method = methodReg.exec(item.children[0].id);
                if (method && method[1] === 'load' && !item.loaded) {
                    item.loaded = true;
                    mf.parallelAjax({
                        url: method[2]
                    }, function (adslots) {
                        var tree = $.map(adslots, function (adslot) {
                            var adslotId = operatePositionData.get(adslot, 'id');
                            var adslotName = operatePositionData.get(adslot, 'name');
                            return {
                                text: adslotName,
                                id: '_report_position/' + adslotId,
                                adslot: adslotId,
                                guideCmd: 'adslot',
                                reports: {
                                    position: {
                                        action: 'position',
                                        queryMap: {
                                            adslot: adslotId,
                                            media: item.id
                                        }
                                    }
                                }
                            }
                        });
                        item.children = tree;
                        myTree.render();
                        cb && cb();
                    });
                }
            };
            myTree.onclappse = function (value) {
                this._dataMap[value].hideChildren = true;
            };
            myTree.onchange = function (value, item) {
                parseSelectTree(value, mf.m.utils.deepSearch('children', treeSource, value, 'id'));
            };
            myTree.select('_report_dailyTotal');
            var reportLoader = mf.index.reportBind(action, '#reportArea');
            var guidePainter = guide(action, '#reportGuide');
            parseSelectTree('_report_dailyTotal', treeSource);

            function parseSelectTree(value, item) {
                var method = value.match(/^_(\w+)_(.+?)(?:\/(.*))?$/);
                console.log('select tree node', method, item);
                if (!method) {
                    return false;
                } else if (method[1] === 'report' && item.reports) {
                    guidePainter(item);
                    reportLoader(item.reports);
                }
            }

            model.set(
                'commands',
                mf.clickCommand.register(
                    [
                        {
                            cmd: 'total',
                            handle: function (options) {
                                parseSelectTree(treeSource.id, treeSource);
                                myTree.select(treeSource.id);
                            }
                        },
                        {
                            cmd: 'step_media',
                            handle: function (options) {
                                window.open('#/report/dailyMedia~media=' + options.media + '&name=' + options.name);
                            }
                        },
                        {
                            cmd: 'media',
                            handle: function (options) {
                                var mediaItem = mf.m.utils.deepSearch('children', treeSource, options.media, 'media');
                                if (mediaItem) {
                                    parseSelectTree(mediaItem.id, mediaItem);
                                    myTree.select(mediaItem.id);
                                } else {
                                    esui.Dialog.alert(
                                        {
                                            title: '跳转提示',
                                            content: '<p>没有找到对应的报表。</p>\
                                                     <p>请刷新重试或咨询管理员。</p>'
                                        }
                                    );
                                }
                            }
                        },
                        {
                            cmd: 'adslot',
                            handle: function (options) {
                                var adslotItem = mf.m.utils.deepSearch('children', treeSource, options.adslot,
                                    'adslot');
                                if (adslotItem) {
                                    parseSelectTree(adslotItem.id, adslotItem);
                                    myTree.expand(adslotItem.parent.id);
                                    myTree.select(adslotItem.id);
                                } else {
                                    var mediaItem = mf.m.utils.deepSearch('children', treeSource, options.media,
                                        'media');
                                    if (mediaItem && !mediaItem.loaded) {
                                        myTree.onexpand(mediaItem.id, function () {
                                            var adslotItem = mf.m.utils.deepSearch('children', treeSource,
                                                options.adslot, 'adslot');
                                            if (adslotItem) {
                                                parseSelectTree(adslotItem.id, adslotItem);
                                                myTree.select(adslotItem.id);
                                            } else {
                                                esui.Dialog.alert(
                                                    {
                                                        title: '跳转提示',
                                                        content: '<p>没有找到对应的广告位报表。</p>\
                                                     <p>请刷新重试或咨询管理员。</p>'
                                                    }
                                                );
                                            }
                                        });
                                    } else {
                                        esui.Dialog.alert(
                                            {
                                                title: '跳转提示',
                                                content: '<p>没有找到对应的媒体信息。</p>\
                                                     <p>请刷新重试或咨询管理员。</p>'
                                            }
                                        );
                                    }

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
        },
        onentercomplete: function () {
            console.log('onentercomplete');
            mf.loaded();
            var action = this;
            var model = action.model;
        },
        onleave: function () {
            console.log('onleave');
            var action = this;
            $.each(action.subAction || {}, function (name, subAction) {
                subAction && subAction.leave();
            });
            action.subAction = null;
            var commands = action.model.get('commands');
            commands && mf.clickCommand.dispose(commands);
        }
    });
})();