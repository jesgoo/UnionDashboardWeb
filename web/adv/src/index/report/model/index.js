/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Mon May 25 2015 17:58:03 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
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
                    url: '/plan',
                    cache: true
                }
            ], function (config, plans) {
                loader.set('config', config);
                loader.set('planList', config.lists.planList);
                loader.set('unitList', config.lists.unitList);
                loader.set('ideaList', config.lists.ideaList);
                loader.set('plans', plans);
                loader.start();
            });
        })
    });
})();