/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Fri May 15 2015 10:27:15 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */
(function () {
    
    // 获取中位数
    /*function getMedian(numberList, ll, rr, k, _undefined) {
        ll === _undefined && (ll = 0);
        rr === _undefined && (rr = numberList.length - 1);
        k === _undefined && (k = Math.floor(numberList.length / 2));
        var m = numberList[ll + k - 1], t = 0;
        var i = 0, j = 0;
        numberList[ll + k - 1] = numberList[rr];
        numberList[rr] = m;
        for (i = ll - 1, j = ll; j != rr; j += 1) {
            if (numberList[j] < m) {
                t = numberList[++i];
                numberList[i] = numberList[j];
                numberList[j] = t;
            }
        }
        t = numberList[++i];
        numberList[i] = numberList[j];
        numberList[j] = t;
        if (k == i - ll + 1) {
            return m;
        }
        if (k > i - ll + 1) {
            return getMedian(numberList, i + 1, rr, k - i + ll - 1);
        } else {
            return getMedian(numberList, ll, i - 1, k);
        }
    }*/
    
    /*Int FindMinK(Int data[], int l, int r, int k)
     {
     int m = data[l+k-1], t = 0;
     int i, j;
     data[l+k-1] = data[r], data[r] = m;
     for (i = l-1, j = l; j != r; ++j)
     if (data[j]<m)
     t=data[++i], data[i]=data[j], data[j]=t;
     t=data[++i], data[i]=data[j], data[j]=t;
     if (k==i-l+1) return m;
     if (k>i-l+1) return FindMinK(data, i+1, r, k-i+l-1);
     else    return FindMinK(data, l, i-1, k);
     }*/
    
    function clickArea(container, data) {
        var $container = $(container);
        if (!data) {
            return false;
        }
        var chartData = data.map(function (n) {
            return [
                n.x,
                n.y,
                n.width,
                n.height
            ]
        });
        $container.children().remove();
        $('<div/>').prependTo($container).highcharts({
            chart: {
                type: 'scatter',
                zoomType: 'xy'
            },
            title: {
                text: '点击区域热力图'
            },
            credits: {
                enabled: false
            },
            xAxis: {
                title: {
                    enabled: true,
                    text: 'X (px)'
                },
                min: 0,
                offset: 10,
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true,
                opposite: true
            },
            yAxis: {
                title: {
                    text: 'Y (px)'
                },
                min: 0,
                offset: 10,
                reversed: true
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'bottom',
                x: -30,
                y: -30,
                floating: true,
                backgroundColor: '#FFFFFF',
                borderWidth: 1
            },
            series: [
                {
                    name: '标准点击坐标',
                    color: 'rgba(223, 83, 83, .1)',
                    data: chartData
                }
            ],
            plotOptions: {
                scatter: {
                    marker: {
                        radius: 5,
                        states: {
                            hover: {
                                enabled: true,
                                lineColor: 'rgb(100,100,100)'
                            }
                        }
                    },
                    states: {
                        hover: {
                            marker: {
                                enabled: false
                            }
                        }
                    },
                    tooltip: {
                        pointFormat: 'X {point.x} , Y {point.y}'
                    }
                }
            }
        });
    }
    
    mf.monitor.analyze.clickArea = new er.Action({
        model: mf.monitor.analyze.model.clickArea,
        view: new er.View({
            template: 'mf_monitor_analyze_clickArea',
            UI_PROP: {}
        }),
        STATE_MAP: {},
        
        onenter: function () {
            console.log('onenter');
            mf.onenter();
        },
        onafterrepaint: function () {
            console.log('onafterrepaint');
        },
        onafterrender: function () {
            console.log('onafterrender');
            var action = this;
            var model = action.model;
            /*esui.get('adslot').onblur = function () {
             var adslot = this.getValue();
             console.log('adslot', adslot);
             model.set('adslot', adslot);
             };*/
            esui.get('date').onchange = function (date) {
                console.log('date', date);
                model.set('date', mf.getDateString(date));
            };
            esui.get('original').onclick = function () {
                clickArea('#clickAreaChart', model.get('data'));
            };
            esui.get('standard').onclick = function () {
                clickArea('#clickAreaChart', model.get('resizeData'));
            };
            esui.get('abnormal').onclick = function () {
                clickArea('#clickAreaChart', model.get('abnormalData'));
                // mf.m.utils.writeInNewWindow(model.get('abnormalData'), { type: 'json' });
            };
            esui.get('abnormalCheck').onclick = function () {
                mf.m.utils.writeInNewWindow(model.get('abnormalData'), { type: 'json' });
            };
            var funcEditor = ace.edit("func");
            funcEditor.session.setMode("ace/mode/json");
            funcEditor.setTheme("ace/theme/tomorrow");
            funcEditor.setValue(localStorage.getItem('func') || 'var rnd = function () { return Math.random(); };\n'
                                                                + 'var x = rnd();\n'
                                                                + 'var y = rnd();\n'
                                                                + 'return {x: x, y: y};');
            esui.get('run').onclick = function (date) {
                var mockData = [];
                var clickCount = +esui.get('clickCount').getValue() || 0;
                var func = new Function('index', funcEditor.getValue());
                var height = +esui.get('height').getValue() || 80;
                try {
                    for (var i = 0; i < clickCount; i++) {
                        var mockItem = func(i);
                        mockItem.x = Math.round(mockItem.x * (mockItem.width || 320));
                        mockItem.y = Math.round(mockItem.y * (mockItem.height || height));
                        mockData.push(mockItem);
                    }
                } catch (e) {
                    alert('执行有误,' + e.toString())
                }
                localStorage.setItem('func', funcEditor.getValue());
                model.set('mockData', mockData);
                clickArea('#clickAreaChart', mockData);
            };
            esui.get('search').onclick = mf.m.utils.nextTickWrapper(function () {
                model.set('adslot', esui.get('adslot').getValue());
                model.set('media', esui.get('media').getValue());
                model.set('height', esui.get('height').getValue());
                if (model.get('adslot') && model.get('media')) {
                    action.refresh(model.QUERY_MAP);
                } else {
                    mf.msg('没有ID');
                }
            });
        },
        onentercomplete: function () {
            console.log('onentercomplete');
            var action = this;
            var model = action.model;
            window.c = model.get('data');
            window.rc = model.get('resizeData');
            esui.get('standard').onclick();
            mf.loaded();
        },
        onleave: function () {
            console.log('onleave');
        }
    });
})();

/*
 var width = 320;
 var height = 80;
 return {x: Math.round()}
 
 
 
 
* */