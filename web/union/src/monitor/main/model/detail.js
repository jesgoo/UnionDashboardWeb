/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Thu Aug 27 2015 12:44:55 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */
(function () {
    var FIELDS = function (model) {
        return [];
    };
    mf.monitor.main.model.detail = new er.Model({
        QUERY_MAP: {},
        LOADER_LIST: ['modelLoader'],
        modelLoader: new er.Model.Loader(function () {
            console.log('modelLoader');
            var loader = this;
            
            // TODO Generated by er-sync
            // loader.stop();
            // mf.get(
            //    'monitor/main/detail?' + loader.getQueryString(),
            //    function (model) {
            //       mf.initModel({loader: loader, model: model, fields: FIELDS});
            //       loader.start();
            //    }
            // );
        })
    });
})();