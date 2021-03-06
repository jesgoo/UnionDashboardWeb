/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Mon May 25 2015 17:58:03 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */

$(function () {
    console.log('er.init adv');
    try {
        mf.authority.parse(mf.getUser().authority);
    }
    catch (e) {
    }
    mf.ajaxResponse['/config'] = mf.m.config;
    er.init();
});

mf.adv = mf.adv || {};

mf.clickCommand = mf.m.commandElement('click');


mf.adv.getResourceFilenameById = function (resources) {
    var getField = mf.mockFieldInConfig(mf.m.config.lists.resourceList);
    var idField = getField('id');
    var filenameField = getField('filename');
    return function (id) {
        var index = mf.m.utils.indexOfArray(resources, id, idField);
        if (index > -1) {
            return resources[index][filenameField];
        } else {
            return null;
        }
    }
};
