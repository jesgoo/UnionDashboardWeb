/**
 * @file Generated by er-sync
 * @author Luics<xukai01@baidu.com>
 * @date Thu Apr 30 2015 14:09:52 GMT+0800 (CST)
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 */
(function () {
    var FIELDS = function (model, config, name) {
        var lists = config.lists.siteTemplateList;
        var operateData = mf.operateDataInConfigField(lists);
        var needFieldLists = {
            'id': {
                stable:1,
                width: 80
                /*content: function (item, index) {
                 return '<a data-cmd="edit" data-index="' + index + '">' + operateData.get(item, 'id', '') + '</a>'
                 }*/
            },
            'adslot': {},
            'adType': {},
            'version': {},
            'percent': {
                title: function () {
                    return '流量百分比' +
                           '<div ui="type:Tip;title:<h6>说明</h6>;content:<p>同一类型的模版百分比总和应为100；</p><p>百分比为 0 表示关闭该模版</p>;skin:help;arrow:tl;"></div>';
                },
                content: function (item) {
                    var percent = operateData.get(item, 'percent') || 0;
                    return percent + '%';
                },
                validator: function (value, item) {
                    if (!(value >=0 && value <= 100)) {
                        return '值不在范围内，请修改。（范围：0 ~ 100）';
                    }
                }
            },
            'operation': {
                title: '操作',
                content: function (item, index) {
                    var ops = [];
                    if (item._isNew) {
                        ops.unshift('<a data-cmd="delete_add_template" data-index="' + index + '" data-name="' + name + '">删除</a>');
                    } else if (!(item._isModify || item._isNew)) {
                        ops.unshift('<a data-cmd="editor_template" data-index="' + index + '" data-name="' + name + '">编辑模版样式</a>');
                    } else {
                        ops.unshift('请保存修改后再编辑模版样式');
                    }
                    return ops.join('&nbsp;');
                }
            },
            'modifyTime': {}
        };
        return mf.mockTableFields(needFieldLists, lists);
    };
    mf.index.media.model.siteTemplate = new er.Model({
        QUERY_MAP: {
            "adslot" : "adslot"
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
                '/template?adslot=' + loader.get('adslot')
            ], function (config, templates) {
                var lists = config.lists.siteTemplateList;
                var operateData = mf.operateDataInConfigField(lists);

                var adTypeList = {};
                adTypeList[config.maps.adTypeMap[config.maps.adType.image]] = {
                    name: '纯图片 Banner',
                    action: 'mf.index.media.templateBannerImage',
                    list: []
                };
                adTypeList[config.maps.adTypeMap[config.maps.adType.text_icon]] = {
                    name: '图文混排 Banner',
                    action: 'mf.index.media.templateBannerTextIcon',
                    list: []
                };
                adTypeList[config.maps.adTypeMap[config.maps.adType.free]] = {
                    name: '自定义图文 Banner',
                    action: 'mf.index.media.templateBannerFree',
                    list: []
                };
                $.each(templates, function (index, template) {
                    var adType = operateData.get(template, 'adType');
                    adType == config.maps.adType.text && (adType = config.maps.adType.text_icon);
                    adTypeList[config.maps.adTypeMap[adType]].list.push(template);
                });

                var adslotData = loader.get('adslotData') || {};
                var height = adslotData.height || 0;
                var heightValue;
                if (height == -1) {
                    height = 480
                }
                height = 1.2 * height;
                heightValue = height + 'px';

                adslotData.heightValue = heightValue;

                loader.set('adslotData', adslotData);
                loader.set('fields', FIELDS);
                loader.set('config', config);
                loader.set('adTypeList', adTypeList);
                loader.start();
            });
        })
    });
})();