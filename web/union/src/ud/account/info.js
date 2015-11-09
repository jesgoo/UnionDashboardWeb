/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Sat Jun 13 2015 10:52:52 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */
(function () {
    mf.ud.account.info = new er.Action({
        model: mf.ud.account.model.info,
        view: new er.View({
            template: 'mf_ud_account_info',
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