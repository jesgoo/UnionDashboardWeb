/**
 * @file Generated by er-sync
 * @author Luics<xukai01@baidu.com>
 * @date Fri Mar 27 2015 15:20:13 GMT+0800 (CST)
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * dailyChannel 单渠道多日 http://union.moogos.com/report/channel/ac1f1b2a/media/total/20150320-20150330
 * dailyTotal 账户总体多日 http://union.jesgoo.com/report/daily/20150320-20150330
 //* hourMedia 账户全媒体单日分小时 http://union.jesgoo.com/report/media/daily/20150320/traffic
 * dailyMedias 多媒体多日 http://union.jesgoo.com/report/media/daily/20150320-20150330
 * dayMedias 多媒体单日 http://union.jesgoo.com/report/media/daily/20150320
 * dailyMedia 单媒体多日 http://union.jesgoo.com/report/media/15d3be2c/daily/20150320-20150330
 * hourlyMedia 单媒体单日分小时 http://union.jesgoo.com/report/media/15d3be2c/daily/20150320/traffic
 * hourlyPositions 单媒体全部广告位单日分小时 http://union.jesgoo.com/report/media/15d3be2c/adslot/daily/20150329/traffic
 * dailyPosition 单广告位多日 http://union.jesgoo.com/report/adslot/s63c825f/daily/20150320-20150330
 * dayPositions 单媒体多广告位单日 http://union.jesgoo.com/report/media/190a2880/adslot/daily/20150320
 * dailyPositions 单媒体多广告位多日 http://union.jesgoo.com/report/media/190a2880/adslot/daily/20150320-20150330
 * hourlyPosition 单广告位单日分小时 http://union.jesgoo.com/report/adslot/s63c825f/daily/20150320/traffic
 */
(function () {
    var FIELDS = function (model) {
        return [];
    };
    mf.index.report.model.index = new er.Model({
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
                    url: '/channel',
                    cache: true
                },
                '/media'
            ], function (config, channels, medias) {
                loader.set('config', config);
                loader.set('siteMediaList', config.lists.siteMediaList);
                loader.set('sitePositionList', config.lists.sitePositionList);
                loader.set('medias', medias);
                loader.set('channels', channels);

                loader.start();
            });
        })
    });
})();