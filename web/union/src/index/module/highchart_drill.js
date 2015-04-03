/**
 * @file Generated by er-sync, module
 * @author Luics<xukai01@baidu.com>
 * @date Wed Apr 01 2015 15:20:58 GMT+0800 (CST)
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * shortcut mf.m.highchart_drill
 */
(function (exports, module) {
    var highchart_drill = function (element, lists, date) {
        lists = [].concat(lists);
        if (lists.length < 1) {
            $(element).hide();
            return;
        }
        var drillData = {};
        $.each(lists, function (index, item) {
            $.each(item, function (key, value) {
                if (key === 'media' || key === 'name' || key === 'fr' || key === 'served_request') {
                    return true;
                }
                drillData[key] || (drillData[key] = []);
                drillData[key].push([item.name, value]);
            });
        });
        $.each(drillData.ctr || [], function (index) {
            drillData.ctr[index][1] = Math.round(drillData.ctr[index][1] * 100000) / 1000;
        });
        var statisticsData = {};
        $.each(drillData, function (key, values) {
            statisticsData[key] = values.reduce(function (memory, value) {
                return memory + value[1];
            }, 0);
        });
        statisticsData.click = statisticsData.click * 100;
        statisticsData.income = statisticsData.income * 1000;
        statisticsData.ctr = statisticsData.request > 0 ? (statisticsData.click / 100) / statisticsData.request : 0;
        statisticsData.cpm = statisticsData.request > 0 ? statisticsData.income / statisticsData.impression : 0;
        statisticsData.ctr = Math.round(statisticsData.ctr * 1000000000);
        statisticsData.cpm = Math.round(statisticsData.cpm * 10000000);
        console.log('char data', drillData, statisticsData);
        $(element).show().highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: null
            },
            colors: ["#1c62b8", "#f6505c", "#f6c928", "#19b2b7", "#8772cd", "#eb6f25"],
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            tooltip: {
                // headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                // pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>',
                formatter: function () {
                    var t;
                    switch (this.point.drilldown) {
                        case 'click':
                            t = Math.round(this.point.y / 100);
                            break;
                        case 'income':
                            t = Math.round(this.point.y / 1000);
                            break;
                        case 'ctr':
                            t = (this.point.y / 10000000).toFixed(2);
                            break;
                        case 'cpm':
                            t = (this.point.y / 10000000).toFixed(2);
                            break;
                        default :
                            t = this.point.y;
                    }
                    var s = '<span style="font-size:11px">' + this.series.name + '</span><br>';
                    s += '<span style="color:' + this.point.color + '">' + this.point.name + '</span>: <b>' + t
                         + '</b><br/>'
                    return s;
                }
            },
            xAxis: [
                {
                    type: 'category',
                    lineColor: '#e5e5e5',
                    tickColor: '#e5e5e5',
                    labels: {
                        style: {
                            color: '#7a7a7a'
                        },
                        rotation: -45,
                        align: 'right'
                    },
                    tickPosition: 'inside',
                    tickLength: 4,
                    tickmarkPlacement: 'on'
                }
            ],
            yAxis: [
                { // Primary yAxis
                    gridLineWidth: 1,
                    gridLineColor: '#e5e5e5',
                    title: {
                        text: null
                    },
                    labels: {
                        enabled: false
                    }
                }, { // Secondary yAxis
                    gridLineWidth: 1,
                    gridLineColor: '#e5e5e5',
                    title: {
                        text: null
                    },
                    labels: {
                        enabled: false
                    }
                }, { // Tertiary yAxis
                    gridLineWidth: 1,
                    gridLineColor: '#e5e5e5',
                    title: {
                        text: null
                    },
                    labels: {
                        enabled: false
                    }
                }, { // 4th yAxis
                    gridLineWidth: 1,
                    gridLineColor: '#e5e5e5',
                    title: {
                        text: null
                    },
                    labels: {
                        enabled: false
                    }
                }, { // 5th yAxis
                    gridLineWidth: 1,
                    gridLineColor: '#e5e5e5',
                    title: {
                        text: null
                    },
                    min: 0,
                    labels: {
                        enabled: false
                    }
                }
            ],
            series: [
                {
                    name: date,
                    colorByPoint: true,
                    data: [
                        {
                            name: '总收入',
                            y: statisticsData.income,
                            drilldown: 'income',
                            yAxis: 2,
                            tooltip: {
                                valueDecimals: 2,
                                valuePrefix: '¥'
                            }
                        }, {
                            name: '总展现数',
                            y: statisticsData.impression,
                            drilldown: 'impression',
                            yAxis: 0
                        }, {
                            name: '总点击数',
                            y: statisticsData.click,
                            drilldown: 'click',
                            yAxis: 1
                        }, {
                            name: '总请求数',
                            y: statisticsData.request,
                            drilldown: 'request',
                            yAxis: 0
                        }, {
                            name: '平均点击率',
                            yAxis: 3,
                            y: Math.round(statisticsData.ctr * 100) / 100,
                            drilldown: 'ctr'
                        }, /*{
                         name: '平均填充率',
                         yAxis: 4,
                         y: (statisticsData.fr * 100),
                         drilldown: 'fr'
                         }, */{
                            name: '平均千次展现收入',
                            yAxis: 3,
                            y: Math.round(statisticsData.cpm * 100) / 100,
                            drilldown: 'cpm'
                        }
                    ]
                }
            ],
            drilldown: {
                series: [
                    {
                        name: '收入',
                        id: 'income',
                        data: drillData.income,
                        tooltip: {
                            valueSuffix: ' 元'
                        }
                    }, {
                        name: '展现',
                        id: 'impression',
                        data: drillData.impression,
                        tooltip: {
                            valueSuffix: ' 次'
                        }
                    }, {
                        name: '点击',
                        id: 'click',
                        data: drillData.click,
                        tooltip: {
                            valueSuffix: ' 次'
                        }
                    }, {
                        name: '请求',
                        id: 'request',
                        data: drillData.request,
                        tooltip: {
                            valueSuffix: ' 次'
                        }
                    }, {
                        name: '点击率',
                        id: 'ctr',
                        data: drillData.ctr,
                        tooltip: {
                            valueSuffix: ' %'
                        }
                    }/*, {
                     name: '填充率',
                     id: 'fr',
                     data: drillData.fr,
                     tooltip: {
                     valueSuffix: ' %'
                     }
                     }*/, {
                        name: '千次展现收入',
                        id: 'cpm',
                        data: drillData.cpm
                    }
                ]
            }
        });
    };
    exports.highchart_drill = highchart_drill;
})(mf && mf.m || exports || {}, mf || module);