/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Sat Aug 01 2015 14:45:56 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */
(function () {
    var FIELDS = function (model) {
        return [];
    };
    mf.index.account.model.index = new er.Model({
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
                '/media?type=' + mf.m.config.maps.mediaType.app
            ], function (config, entities) {
                loader.set('config', config);
                loader.set('appMediaCount', (entities.length).toString());
                loader.start();
            });
        })
    });
})();