/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Mon Sep 28 2015 14:26:57 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */
(function () {
    var FIELDS = function (model) {
        return [
            {
                "field": "date",
                "title": "日期",
                "content": "date",
                "sortable": 1
            },
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
                "field": "cost",
                "title": "消费",
                "content": mf.getFieldContentMoney('cost'),
                "sortable": 1,
                "align": "right"
            },
            {
                "field": "ctr",
                "title": "点击率",
                "content": mf.getFieldContentPercent('ctr'),
                "sortable": 1,
                "align": "right"
            },
            {
                "field": "cpm",
                "title": "千次展现消费",
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
    mf.index.report.model.dailyIdea = new er.Model({
        QUERY_MAP: {},
        LOADER_LIST: ['modelLoader'],
        modelLoader: new er.Model.Loader(function () {
            console.log('modelLoader');
            var loader = this;
            loader.stop();
            var dateRegion = loader.get('dateRegion').replace(/\-/g, '').split(',');
            mf.parallelAjax([
                {
                    url: '/config',
                    cache: true
                },
                {
                    url: '/report/cost/' + dateRegion[0] + '-' + dateRegion[1],
                    errorMessage: '创意分日汇总数据获取失败，请重试。'
                }
            ], function (config, reportData) {
                var unit = loader.get('unit');
                var idea = loader.get('idea');
                loader.set('config', config);

                var reportList = $.map(reportData, function (data, date) {
                    var item = {
                        date: date,
                        list: data
                    };
                    data.filter(function (n) {
                        return n.unit_id == unit && n.idea_id == idea;
                    }).reduce(function (memory, n) {
                        memory.impression = (memory.impression || 0) + n.impression;
                        memory.cost = (memory.cost || 0) + n.cost;
                        memory.click = (memory.click || 0) + n.click;
                        return memory;
                    }, item);
                    return item;
                });
                reportList.forEach(function (n) {
                    n.cost = n.cost || 0;
                    n.click = n.click || 0;
                    n.impression = n.impression || 0;
                    n.cost /= 1000;
                    n.ctr = (n.impression ? n.click / n.impression : 0 )* 100;
                    n.cpm = (n.impression ? n.cost / n.impression : 0) * 1000;
                });
                var orderBy = 'date';
                reportList.sort(function (a, b) {
                    return a[orderBy] > b[orderBy] ? -1 : 1;
                });
                loader.set('order', 'desc');
                loader.set('orderBy', orderBy);

                loader.set('lists', reportList);
                loader.set('fields', FIELDS(loader));

                loader.start();
            });
        })
    });
})();