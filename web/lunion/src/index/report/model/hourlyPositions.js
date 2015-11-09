/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Tue Mar 31 2015 11:50:48 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */
(function () {
    var FIELDS = function (model) {
        var mediaId = model.get('media');
        return [
            {
                "field": "adslot",
                "title": "广告位ID",
                "content": function (item, index) {
                    return item.name ? '<a data-cmd="step_adslot" data-adslot="' + item.adslot + '" data-name="' + item.name + '">' + item.adslot + '</a>' : item.adslot;
                    //return item.name ? '<a data-cmd="adslot" data-media="' + mediaId + '" data-adslot="' + item.adslot + '">' + item.adslot + '</a>' : item.adslot;
                },
                "sortable": 1
            },
            {
                "field": "name",
                "title": "广告位名称",
                "content": function (item, index) {
                    return item.name ? '<a data-cmd="step_adslot" data-adslot="' + item.adslot + '" data-name="' + item.name + '">' + item.name + '</a>' : '';
                    //return item.name ? '<a data-cmd="adslot" data-media="' + mediaId + '" data-adslot="' + item.adslot + '">' + item.name + '</a>' : '-';
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
            }/*,
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
            }*/,
            {
                "field": "ctr",
                "title": "点击率",
                "content": mf.getFieldContentPercent('ctr'),
                "sortable": 1
            }/*,
            {
                "field": "cpm",
                "title": "千次展现收入",
                "content": mf.getFieldContentMoney('cpm'),
                "sortable": 1
            },
             {
             "field": "acp",
             "title": "平均点击单价",
             "content": "acp",
             "sortable": 1
             }*/
        ];
    };
    mf.index.report.model.hourlyPositions = new er.Model({
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
                    url: '/report/media/' + loader.get('media') + '/adslot/daily/' + loader.get('date').replace(/\-/g, '') + '/traffic',
                    errorMessage: '所属广告位分小时数据加载失败，请重试。'
                }
            ], function (config, reportData) {

                var timeSelects = $.map(reportData, function (list, date) {
                    $.each(list, function (index, row) {
                        row.ctr = row.ctr ? row.ctr : row.impression ? row.click / row.impression : 0;
                    });
                    return {
                        text : ('00' + date + '时').substr(-3),
                        id : date
                    };
                });
                if (!timeSelects.length) {
                    timeSelects.push({
                        text : '暂无',
                        id : 'null'
                    });
                    reportData['null'] = [];

                }
                loader.set('config', config);

                loader.set('order', 'desc');
                loader.set('orderBy', 'adslot');
                loader.set('timeSelects', timeSelects);
                loader.set('reportData', reportData);
                loader.set('fields', FIELDS(loader));

                loader.start();
            });
        })
    });
})();