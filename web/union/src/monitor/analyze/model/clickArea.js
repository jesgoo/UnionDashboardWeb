/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Fri May 15 2015 10:27:15 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */
(function () {
    mf.monitor.analyze.model.clickArea = new er.Model({
        QUERY_MAP: {
            "date": "date",
            "height": "height",
            "media": "media",
            "adslot": "adslot"
        },
        LOADER_LIST: ['modelLoader'],
        modelLoader: new er.Model.Loader(function () {
            console.log('modelLoader');
            var loader = this;
            if (!loader.get('date')) {
                loader.set('date', mf.getDateString(mf.getDate(-1)))
            }
            loader.set('dateValue', new Date(Date.parse(loader.get('date'))));
            loader.get('height') || loader.set('height', 80);
            if (loader.get('adslot') && loader.get('media')) {
                loader.stop();
                mf.parallelAjax(
                    [
                        {
                            url: 'http://sh01.jesgoo.com/clickheatmap/click_hot.' + loader.get('media') + '_'
                                 + loader.get('adslot') + '.'
                                 + loader.get('date'),
                            dataFilter: function (data) {
                                return data;
                            }
                        }
                    ],
                    function (data) {
                        var width = 320;
                        var height = +loader.get('height') || 80;
                        data = (data || []).filter(function (n) {
                            return ('touch_x' in n) && ('touch_y' in n) && ('width' in n);
                        }).map(function (n) {
                            n.x = n.touch_x;
                            n.y = n.touch_y;
                            n.standard_x = Math.round(n.x * width / n.width);
                            n.standard_y = Math.round(n.y * height / n.height);
                            n.abnormal = n.width < 50 || n.height < 10 || n.width > 3000 || n.height > 1500
                                         || n.x > n.width || n.y > n.height
                                         || n.standard_x > width || n.standard_y > height;
                            return n;
                        });
                        var abnormalData = data.filter(function (n) {
                            return n.abnormal;
                        });
    
                        var resizeData = data.filter(function (n) {
                            return !n.abnormal;
                        }).map(function (n) {
                            return {
                                width: n.width,
                                height: n.height,
                                x: n.standard_x,
                                y: n.standard_y
                            };
                        });
                        loader.set('data', data);
                        loader.set('clickCountString', '正常 ' + resizeData.length.toString() + '个, 异常' + abnormalData.length.toString() + '个');
                        loader.set('abnormalData', abnormalData);
                        loader.set('resizeData', resizeData);
                        
                        loader.start();
                    }
                );
            }
        })
    });
})();