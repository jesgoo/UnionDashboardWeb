/**
 * @file Generated by er-sync
 * @author Luics<xukai01@baidu.com>
 * @date Mon May 25 2015 17:58:03 GMT+0800 (CST)
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 */
(function () {
    mf.index.account.password = new er.Action({
        model: mf.index.account.model.password,
        view: new er.View({
            template: 'mf_index_account_password',
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
        },
        onleave: function () {
            console.log('onleave');
        }
    });
})();