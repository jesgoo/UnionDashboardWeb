/**
 * @file Generated by er-sync
 * @author Luics<xukai01@baidu.com>
 * @date Tue Mar 31 2015 10:59:06 GMT+0800 (CST)
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 */
(function () {
    var FIELDS = function (model) {
        var mediaId = model.get('media');
        return [
            {
                "field": "adslot",
                "title": "广告位ID",
                "content": function (item, index) {
                    return item.name ? '<a data-cmd="adslot" data-media="' + mediaId + '"  data-adslot="' + item.adslot + '">' + item.adslot + '</a>' : item.adslot;
                },
                "sortable": 1
            },
            {
                "field": "name",
                "title": "广告位名称",
                "content": function (item, index) {
                    return item.name ? '<a data-cmd="adslot" data-media="' + mediaId + '"  data-adslot="' + item.adslot + '">' + item.name + '</a>' : '-';
                },
                "sortable": 1
            },
            {
                "field": "request",
                "title": "请求数",
                "content": mf.getFieldContentLess('request'),
                "sortable": 1
            }/*,
             {
             "field": "served_request",
             "title": "有效请求数",
             "content": "served_request",
             "sortable": 1
             }*/,
            {
                "field": "impression",
                "title": "展现数",
                "content": mf.getFieldContentLess('impression'),
                "sortable": 1
            },
            {
                "field": "click",
                "title": "点击数",
                "content": mf.getFieldContentLess('click'),
                "sortable": 1
            },
            {
                "field": "income",
                "title": "收入",
                "content": mf.getFieldContentMoney('income'),
                "sortable": 1
            },
            {
                "field": "fr",
                "title": "填充率",
                "content": mf.getFieldContentPercent('fr'),
                "sortable": 1
            },
            {
                "field": "ctr",
                "title": "点击率",
                "content": mf.getFieldContentPercent('ctr'),
                "sortable": 1
            },
            {
                "field": "cpm",
                "title": "千次展现收入",
                "content": mf.getFieldContentMoney('cpm'),
                "sortable": 1
            }/*,
             {
             "field": "acp",
             "title": "平均点击单价",
             "content": "acp",
             "sortable": 1
             }*/
        ];
    };
    mf.index.report.model.dayPositions = new er.Model({
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
                {
                    url: '/report/media/' + loader.get('media') + '/adslot/daily/' + loader.get('date').replace(/\-/g, ''),
                    errorMessage: '所属广告位单日数据获取失败，请重试。'
                }
            ], function (config, reportData) {

                loader.set('config', config);
                var orderBy = 'income';
                reportData.sort(function (a, b) {
                    return a[orderBy] > b[orderBy] ? -1 : 1;
                });

                loader.set('order', 'desc');
                loader.set('orderBy', orderBy);
                loader.set('lists', reportData);
                loader.set('fields', FIELDS(loader));

                loader.start();
            });
        })
    });
})();