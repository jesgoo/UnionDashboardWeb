/**
 * @file Generated by er-sync, module
 * @author Yuelong Yang<yangyuelong@baidu.com>
 * @date Sat May 17 2014 13:40:47 GMT+0800 (中国标准时间)
 * shortcut mf.m.reportChart
 */
(function (exports, module) {
    var baseChart = {};
    baseChart.option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: [],
            x: 'left',
            y: 'top'
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        animation: false,
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: []
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                },
                splitArea: { show: true }
            }
        ],
        series: [
        ]
    };
    baseChart.baseSeries = {
        type: 'line',
        itemStyle: {
            normal: {
                lineStyle: {
                    shadowColor: 'rgba(0,0,0,0.2)',
                    shadowBlur: 5,
                    shadowOffsetX: 3,
                    shadowOffsetY: 3
                }
            }
        },
        data: []/*,
         markPoint: {
         data: [
         { type: 'max', name: '最大展示' },
         { type: 'min', name: '最小展示' }
         ]
         },
         markLine: {
         data: [
         {
         type: 'average', 
         name: '平均展示'
         }
         ]
         }*/
    };
    baseChart.showNum = $.extend({
        name: '总展示数',
        itemStyle: {
            normal: {
                lineStyle: {
                    color: '#e76665'
                }
            }
        }
    }, baseChart.baseSeries);
    baseChart.clickNum = $.extend({
        name: '总点击数'
    }, baseChart.baseSeries);
    baseChart.clickRate = $.extend({
        name: '点击率'
    }, baseChart.baseSeries);
    baseChart.avgClickCost = $.extend({
        name: '平均每次点击费用'
    }, baseChart.baseSeries);
    baseChart.totalCost = $.extend({
        name: '总消费'
    }, baseChart.baseSeries);

    var reportChart = new er.Action({
        view: new er.View({
            template: 'report_chart'
        }),
        onafterloadmodel: function () {
            console.log('chart onafterloadmodel');
            var model = this.model;
            var chart = baidu.object.clone(baseChart);
            var option = model.get('option') || {};
            $.extend(chart, option);
            model.set('chart', chart);
            var reportList = model.get('reportList') || [];
            model.set('reportList', reportList);
            if (!reportList.length) {
                return false;
            }
            reportList.sort(function (a, b) {
                return a.date > b.date ? 1 : -1;
            });
            var summary = {
                totalCost: 0,
                showNum: 0,
                CPMA: 0,
                clickNum: 0,
                clickRate: 0,
                avgClickCost: 0
            };
            var xAxis = [];
            for (var i = 0, row; row = reportList[i]; i++) {
                xAxis.push(row.date);
                summary.totalCost += row.totalCost;
                summary.showNum += row.showNum;
                summary.clickNum += row.clickNum;
                summary.CPMA += (row.CPM || 0) * row.showNum / 1000;
            }
            chart.option.xAxis[0].data = xAxis;
            summary.avgClickCost = !summary.clickNum
                ? 0
                : mf.printRound(
                    (summary.totalCost - summary.CPMA) / summary.clickNum
            );
            summary.clickRate = !summary.showNum
                ? 0 : mf.printRound(summary.clickNum / summary.showNum * 100);
            model.set('weekday', model.get('weekday') || '自定义');
            var from = model.get('from');
            var to = model.get('to');
            model.set('date', mf.f(from !== to ? '{0} 至 {1}' : '{0}', from, to));
            model.set('showNum', summary.showNum);
            model.set('clickNum', summary.clickNum);
            model.set('CPMA', summary.CPMA);
            model.set('totalCost', mf.printFloat(summary.totalCost, 2));
            // 点击率<1
            model.set('clickRate',
                mf.print(
                    summary.clickRate,
                    mf.printFloat(summary.clickRate, 2)
                )
            );
            model.set('avgClickCost',
                mf.print(
                    summary.avgClickCost,
                    mf.printFloat(summary.avgClickCost, 2)
                )
            );
        },
        onafterrender: function () {
            console.log('chart onafterrender');
            var container = this.view.target;
            if (typeof container == 'string') {
                container = '#' + container;
            }
            container = $(container);
            var myChart = echarts.init($('.chart', container)[0]);
            this.model.set('myChart', myChart);

        },
        onentercomplete: function () {
            console.log('chart onentercomplete');
            var model = this.model;
            var chart = model.get('chart');
            var reportList = model.get('reportList');
            var myChart = model.get('myChart');
            var chartConfig = model.get('chartConfig') || {
                legend: [
                    'showNum',
                    'clickNum',
                    'clickRate',
                    'avgClickCost',
                    'totalCost'
                ]
            };
            chart.option.series = $.map(chartConfig.legend, function (n, i) {
                return chart[n];
            });
            chart.option.legend.data = $.map(chart.option.series, function (n) {
                return n.name;
            });
            myChart.setOption(chart.option, true);
            var yAxisConfig = {
                avgClickCost: {
                    max: 0,
                    formatter: '￥{value}',
                    precision: 2
                },
                showNum: {
                    max: 0,
                    formatter: '{value}'
                },
                clickNum: {
                    max: 0,
                    formatter: '{value}'
                },
                totalCost: {
                    max: 0,
                    formatter: '￥{value}'
                },
                clickRate: {
                    max: 0,
                    formatter: '{value}%',
                    precision: 3
                }
            };
            for (var i = 0, row; row = reportList[i]; i++) {
                for (var j in yAxisConfig) {
                    yAxisConfig[j].max = Math.max(yAxisConfig[j].max, row[j]);
                    yAxisConfig[j].min = yAxisConfig[j].max;
                }
            }
            for (var i = 0, row; row = reportList[i]; i++) {
                for (var j in yAxisConfig) {
                    yAxisConfig[j].min = Math.min(yAxisConfig[j].min, row[j]);
                }
            }

            /**
             * 图例被选择时触发
             *
             * @param {Object} params echarts 传入的事件参数
             */
            var myChartLegendSelected = function (params) {
                var selected = $.map(params.selected, function (n, i) {
                    if (n) {
                        var index = $.inArray(i, chart.option.legend.data);
                        return chartConfig.legend[index];
                    }
                });
                if (!selected.length) {
                    return true;
                }
                // 处理reportList里的杠杆
                for (var j in yAxisConfig) {
                    chart[j].data = [];
                }
                var yAxisMax = yAxisConfig[selected[0]].max;
                $.each(selected, function (i, n) {
                    yAxisConfig[n].lever = yAxisMax / (yAxisConfig[n].max || 1);
                });
                var yAxisMin = yAxisMax;
                for (var i = 0, row; row = reportList[i]; i++) {
                    $.each(selected, function (i, n) {
                        var newData = row[n] * yAxisConfig[n].lever;
                        yAxisMin = Math.min(yAxisMin, newData);
                        chart[n].data.push(newData);
                    });
                }
                mf.m.utils.nextTick(function () {
                    var firstAxisConfig = yAxisConfig[selected[0]];
                    myChart.setOption({
                        legend: {
                            selected: params.selected
                        },
                        yAxis: [
                            {
                                min: yAxisMin,
                                max: yAxisMax,
                                scale: true,
                                precision: firstAxisConfig.precision || 0,
                                axisLabel: {
                                    formatter: firstAxisConfig.formatter
                                }
                            }
                        ],
                        tooltip: {
                            formatter: function (params) {
                                var label = $.map(params, function (n, i) {
                                    var axisConfig = yAxisConfig[
                                        chartConfig.legend[
                                            $.inArray(n[0], chart.option.legend.data)
                                            ]
                                        ];
                                    return n[0] + ':'
                                        + axisConfig.formatter.replace(
                                            '{value}',
                                            (n[2] / axisConfig.lever).toFixed(
                                                    axisConfig.precision || 0
                                            )
                                        );
                                });
                                label.unshift(params[0][1]);
                                return label.join('<br>');
                            }
                        },
                        series: chart.option.series
                    });
                });
                return true;
            };
            myChart.on(echarts.config.EVENT.LEGEND_SELECTED, myChartLegendSelected);
            myChartLegendSelected({
                selected: myChart.component.legend.getSelectedMap()
            });
        },
        onleave: function () {
            console.log('chart onleave');
            var model = this.model;
            var myChart = model.get('myChart');
            myChart.dispose();
        }
    });
    // 注册action
    new er.Module({
        config: {
            action: [
                {
                    path: '/report/chart',
                    action: 'mf.m.reportChart'
                }
            ]
        }
    });
    // 返回action引用
    exports.reportChart = reportChart;
})(mf && mf.m || exports || {}, mf || module);