/**
 * @file Generated by er-sync, module
 * @author Luics<xukai01@baidu.com>
 * @date Wed Apr 01 2015 15:20:58 GMT+0800 (CST)
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * shortcut mf.m.highchart_drill
 */
(function (exports, module) {

    var renderChart = function (item, element, drillData,statisticsData){

        var chartSeries = [];
        var drilldownSeries = [];
        var toolOption = {
            'income' : {
                valueDecimals: 2,
                valuePrefix: '¥ '
            },
            'impression' : {
                valueSuffix : ' 次'
            },
            'click' : {
                valueSuffix : ' 次'
            },
            'request' : {
                valueSuffix : ' 次'
            },
            'ctr' : {
                valueDecimals: 2,
                valueSuffix: ' %'
            },
            'cpm' : {
                valueDecimals: 2,
                valuePrefix: '¥ '   
            }
        };
        $.each(statisticsData[item], function (date, value) {
             chartSeries.push({
                name : date,
                y : value,
                drilldown : date
             })
        });

        $.each(drillData[item], function (date, value) {
            drilldownSeries.push({
                name: item,
                id: date,
                data: value
            });
        });

        console.log(chartSeries);
        console.log(drilldownSeries);
        $('#chart3').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text:null
            },
            colors : ["#1c62b8","#f6505c","#f6c928","#19b2b7","#8772cd","#eb6f25"],
            credits:{
                enabled:false
            },
            legend: {
                enabled: false
            },
            exporting:{
                enabled:false
            },
            plotOptions : {
                series: {
                    cursor: 'pointer',
                    events: {
                        click : function (event){
                            if( event.point.media ){
                                $(element).attr({
                                    'data-cmd': 'media',
                                    'data-media': event.point.media
                                });
                                $(element).trigger('click');  
                            }                            
                        }
                    }
                }   
            },
            tooltip: toolOption[item],
            xAxis: [{
                type: 'category',
                lineColor:'#e5e5e5',
                tickColor:'#e5e5e5',
                labels:{
                    style:{
                        color:'#7a7a7a',
                    },
                    rotation: -45,
                    align: 'right'
                },
                tickPosition:'inside',
                tickLength:4,
                tickmarkPlacement:'on'
            }],
            yAxis: [{ // Primary yAxis
                gridLineWidth: 1,
                gridLineColor:'#e5e5e5',
                title: {
                    text: null
                },
            }],
            series: [{
                name : item,
                colorByPoint: true,
                data : chartSeries
            }],
            drilldown:{
                series:drilldownSeries
            }
        });

    }


    var highchart_medias = function (element, lists) {
        
        lists = lists || {};
        if ( $.isEmptyObject(lists) ) {
            $(element).hide();
            return;
        };

        $(element).off('click.tab').on('click.tab', '.chart-tab .tab-item', function(event) {
                event.preventDefault();
                $('.tab-item').removeClass('cur');
                $(this).addClass('cur'); 
                var tabId = $(this).attr('id');
                tabId = tabId.replace('tab-','');
                renderChart(tabId, element, drillData, statisticsData);
        });

        var drillData = {
            'income' : {},
            'impression' : {},
            'click' : {},
            'request' : {},
            'ctr' : {},
            'cpm' : {}
        };
        var statisticsData = {};

        $.each(lists, function (date, datelist) {
            $.each(drillData, function (key, val) {
                drillData[key][date] = [];
            });
        });
        $.each(lists, function (date, datelist) {
            $.each(datelist, function (i, media) {
                $.each(media, function (key, val) {
                    if( drillData[key] ){
                        drillData[key][date].push( { 'name': media.name, 'y': val, 'media': media.media} );
                    }
                });
            });
        });
        console.log(drillData);
        $.each(drillData, function (key, datelist) {
            statisticsData[key] = {}
             $.each(datelist, function (date, values) {
                 statisticsData[key][date] = values.reduce(function (memory, value) {
                    return memory + value['y'];
                 },0);
             });
        });

        
        
        $.each(statisticsData.ctr, function (date, value) {
            statisticsData.ctr[date] = statisticsData.request[date] > 0 ? statisticsData.click[date] / statisticsData.request[date] : 0;
        });

        $.each(statisticsData.cpm, function (date, value) {
            statisticsData.cpm[date] = statisticsData.request[date] > 0 ? statisticsData.income[date] / (statisticsData.request[date] / 1000) : 0;
        });

        renderChart('income', element,drillData,statisticsData);

    };
    exports.highchart_medias = highchart_medias;
})(mf && mf.m || exports || {}, mf || module);