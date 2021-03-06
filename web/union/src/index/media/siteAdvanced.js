/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Thu Apr 21 2016 12:37:38 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */
(function () {
    mf.index.media.siteAdvanced = new er.Action({
        model: mf.index.media.model.siteAdvanced,
        view: new er.View({
            template: 'mf_index_media_siteAdvanced',
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
        },
        onentercomplete: function () {
            console.log('onentercomplete');
            mf.loaded();
            var action = this;
            var model = action.model;
            var $configArea = $('#' + action.view.target + ' .config-area');
            var jsonEditor = new mf.m.jsonEditor($configArea);
            jsonEditor.setData(model.get('requestData') || {});
            action.setValue = function (config) {
                var advancedConfig = jsonEditor.getData();
                ['splash', 'see'].forEach(function (n) {
                    if (!(n in advancedConfig)) {
                        delete config[n];
                    }
                });
                mf.m.utils.extend(config, advancedConfig);
                return advancedConfig;
            }
        },
        onleave: function () {
            console.log('onleave');
            var commands = this.model.get('commands');
            commands && mf.clickCommand.dispose(commands);
        }
    });
})();