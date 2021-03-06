/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Tue Apr 14 2015 14:15:42 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */
(function () {
    var FIELDS = function (model) {
        return [];
    };
    mf.index.media.model.templateBannerImage = new er.Model({
        QUERY_MAP: {
            "template": "template"
        },
        LOADER_LIST: ['modelLoader'],
        modelLoader: new er.Model.Loader(function () {
            console.log('modelLoader');
            var loader = this;

            var styleName = loader.get('styleName') || 'image';
            var heightValue = loader.get('heightValue') || '80px';
            var config = loader.get('config') || mf.m.config;
            var template = loader.get('template') || 's0000001';
            var templateData = loader.get('templateData') || {};
            loader.set('styleName', styleName);
            loader.set('config', config);
            loader.set('toggleMap', config.maps.toggleMap);
            loader.set('templateData', templateData);
            loader.set('template', template);
            loader.set('heightValue', heightValue);

            var configMaps = mf.index.media.model['mockTemplate_' + styleName];
            configMaps && loader.set('hasConfigDemo', true);
            configMaps && loader.set('configMaps', configMaps);
        })
    });
})();