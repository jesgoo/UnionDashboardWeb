/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Tue Mar 17 2015 23:01:23 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */
(function () {
    var FIELDS = function (model) {
        return [];
    };
    mf.index.account.model.info = new er.Model({
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
                    url: '/user'
                }
            ], function (config, user) {
                loader.set('userType', config.maps.userTypeMap);
                if(!(user.type === 0 || user.type >0)) {
                    user.type = 1;
                }
                for(var i in user) {
                    loader.set(i, user[i]);
                }
                loader.start();
            });
        })
    });
})();