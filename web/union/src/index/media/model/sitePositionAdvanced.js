/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Fri Dec 25 2015 13:38:46 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */
(function () {
    var FIELDS = function (model) {
        return [];
    };
    mf.index.media.model.sitePositionAdvanced = new er.Model({
        QUERY_MAP: {},
        LOADER_LIST: ['modelLoader'],
        modelLoader: new er.Model.Loader(function () {
            console.log('modelLoader');
            var loader = this;
            
            // TODO Generated by er-sync
            // loader.stop();
            // mf.get(
            //    'index/media/sitePositionAdvanced?' + loader.getQueryString(),
            //    function (model) {
            //       mf.initModel({loader: loader, model: model, fields: FIELDS});
            //       loader.start();
            //    }
            // );
        })
    });
})();