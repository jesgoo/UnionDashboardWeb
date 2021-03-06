/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Sat Jun 13 2015 10:52:52 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */
(function () {
    var FIELDS = function (model) {
        return [
            {
                "field": "media",
                "title": "媒体ID",
                "content": function (item, index) {
                    return '<a data-cmd="step_media" data-media="' + item.media + '" data-name="' + item.name + '">' + item.name + '</a>';
                    //return '<a data-cmd="media" data-media="' + item.media + '">' + item.media + '</a>'
                },
                "sortable": 1
            },
            {
                "field": "name",
                "title": "媒体名称",
                "content": function (item, index) {
                    return '<a data-cmd="step_media" data-media="' + item.media + '" data-name="' + item.name + '">' + item.name + '</a>';
                    //return '<a data-cmd="media" data-media="' + item.media + '">' + item.name + '</a>'
                },
                "sortable": 1
            }/*,
            {
                "field": "request",
                "title": "请求数",
                "content": mf.getFieldContentLess('request'),
                "sortable": 1,
                "align": "right"
            },
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
                "sortable": 1,
                "align": "right"
            },
            {
                "field": "click",
                "title": "点击数",
                "content": mf.getFieldContentLess('click'),
                "sortable": 1,
                "align": "right"
            },
            {
                "field": "income",
                "title": "收入",
                "content": mf.getFieldContentMoney('income'),
                "sortable": 1,
                "align": "right"
            }/*,
             {
             "field": "fr",
             "title": "填充率",
             "content": mf.getFieldContentPercent('fr'),
             "sortable": 1
             }*/,
            {
                "field": "ctr",
                "title": "点击率",
                "content": mf.getFieldContentPercent('ctr'),
                "sortable": 1,
                "align": "right"
            },
            {
                "field": "cpm",
                "title": "千次展现收入",
                "content": mf.getFieldContentMoney('cpm'),
                "sortable": 1,
                "align": "right"
            }/*,
             {
             "field": "acp",
             "title": "平均点击单价",
             "content": "acp",
             "sortable": 1
             }*/
        ];
    };
    mf.ud.report.model.dailyMedias = new er.Model({
        QUERY_MAP: {},
        LOADER_LIST: ['modelLoader'],
        modelLoader: new er.Model.Loader(function () {
            console.log('modelLoader');
            var loader = this;
            var dateRegion = loader.get('dateRegion').replace(/\-/g, '').split(',');

            loader.stop();
            mf.parallelAjax([
                {
                    url: '/config',
                    cache: true
                },
                {
                    url: '/ud/report/media/daily/' + dateRegion[0] + '-' + dateRegion[1],
                    errorMessage: '所有媒体单日数据获取失败，请重试。'
                }
            ], function (config, reportData) {
                var dateRegionSelects = $.map(reportData, function (row, date) {
                    return {
                        text : date,
                        id : date
                    };
                });
                if (!dateRegionSelects.length) {
                    dateRegionSelects.push({
                        text : '暂无',
                        id : 'null'
                    });
                    reportData['null'] = [];
                }

                loader.set('config', config);

                loader.set('order', 'desc');
                loader.set('orderBy', 'income');
                loader.set('dateRegionSelects', dateRegionSelects);
                loader.set('reportData', reportData);
                loader.set('fields', FIELDS(loader));

                loader.start();
            });
        })
    });
})();