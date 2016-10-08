/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Mon Jun 01 2015 17:04:02 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */
(function () {
    function previewMaterial(model) {
        var config = model.get('config');
        var resources = model.get('resources');
        var data = {};
        data.title = model.get('title');
        data.description = model.get('description');
        data.imageID = model.get('image');
        var imageIndex = mf.m.utils.indexOfArray(resources, data.imageID, 'id');
        var key = mf.m.utils.getKey(config.maps.displayType, +model.get('display'));
        var html = '暂无预览';
        console.log('previewMaterial', data.imageID, imageIndex, key, model.get('display'));
        if (imageIndex > -1) {
            data.image = resources[imageIndex]['file_name'];
        }
        if (data.title || data.description || data.image) {
            html = mf.etplFetch('adv_preview_' + key, data);
        }
        $('#preview-material').html(html);
    }

    function previewResource(model) {
        var config = model.get('config');
        var resources = model.get('resources');
        var data = {};
        data.appID = model.get('appResource');
        var appIndex = mf.m.utils.indexOfArray(resources, data.appID, 'id');
        var html = '暂无';
        console.log('previewResource', data.appID, appIndex);
        if (appIndex > -1) {
            data.app = resources[appIndex]['file_name'];
            var appLogo = resources[appIndex]['app_logo'];
            if (mf.m.utils.hasValue(appLogo)) {
                var logoIndex = mf.m.utils.indexOfArray(resources, appLogo, 'id');
                if (logoIndex > -1) {
                    data.image = resources[logoIndex]['file_name'];
                }
            }
            data.appName = resources[appIndex]['app_name'];
            data.appPackage = resources[appIndex]['app_package'];
            data.appVersion = resources[appIndex]['app_version'];
            data.size = resources[appIndex]['file_size'];
            data.size = mf.getEnglishNumber(Math.ceil((+data.size || 0) / 1024)) + ' KB';
            html = mf.etplFetch('adv_preview_app_resource', data);
        }
        $('#localResource').html(html);
    }

    mf.index.market.ideaDetail = new er.Action({
        model: mf.index.market.model.ideaDetail,
        view: new er.View({
            template: 'mf_index_market_ideaDetail',
            UI_PROP: {
                resourceLoader: {
                    closeButton: 0,
                    mask: {
                        level: 6,
                        type: 'resource'
                    }
                }
            }
        }),
        STATE_MAP: {},

        onenter: function () {
            console.log('onenter');
            mf.onenter();
        },
        onafterloadmodel: function () {
            console.log('onafterloadmodel');
            var model = this.model;
            var config = model.get('config');
            model.set('positionTypeMap', config.maps.positionTypeMap);
            model.set('positionTypeMap', config.maps.positionTypeMap);
            model.set('displayTypeMap', config.maps.displayTypeMap);
            model.set('actionTypeMap', config.maps.actionTypeMap);
            model.set('targetTypeMap', config.maps.targetTypeMap);
        },
        onafterrender: function () {
            console.log('onafterrender');
        },
        onentercomplete: function () {
            console.log('onentercomplete');
            mf.loaded();
            var action = this;
            var model = action.model;
            var config = model.get('config');
            var resources = model.get('resources');

            var V = mf.m.validate();
            V.setModel(model);
            V.reg(
                {
                    id: 'name',
                    rule: [
                        {
                            tpl: 'notNull', msg: '创意名称不能为空'
                        }
                    ]
                }
            );
            V.reg(
                {
                    id: 'title',
                    rule: [
                        {
                            tpl: 'notNull', msg: '创意名称不能为空'
                        },
                        {
                            tpl: 'limit', max: 40, msg: '标题最长为40个字符'
                        }
                    ]
                }
            );
            V.reg(
                {
                    id: 'image',
                    rule: [
                        {
                            tpl: 'notNull', msg: '图片不能为空'
                        }
                    ]
                }
            );
            V.reg(
                {
                    id: 'description',
                    rule: [
                        {
                            tpl: 'limit', max: 60, msg: '描述最长为60个字符'
                        }
                    ]
                }
            );
            V.reg(
                {
                    id: 'targetUrl',
                    rule: [
                        {
                            tpl: 'notNull', msg: '请填写一个外部资源'
                        }
                    ]
                }
            );
            V.reg(
                {
                    id: 'appResource',
                    rule: [
                        {
                            tpl: 'notNull', msg: '请指定一个本地资源'
                        }
                    ]
                }
            );

            var display = esui.get('display');
            var targetType = esui.get('targetType');
            display.onchange = function (values, value) {
                $('#idea-detail')
                    .removeClass('detail-text-icon detail-text detail-image')
                    .addClass('detail-' + mf.m.utils.getKey(config.maps.displayType, +value));
                model.set('display', value);
                if (value == config.maps.displayType.text || value == config.maps.displayType.text_icon) {
                    V.toggle('title', true);
                    V.toggle('description', true);
                } else {
                    V.toggle('title', false);
                    V.toggle('description', false);
                }
                if (value == config.maps.displayType.image) {
                    V.toggle('image', true);
                } else {
                    V.toggle('image', false);
                }
            };
            display.setValue(model.get('display'), {dispatch: true});
            targetType.onchange = function (values, value) {
                $('#action-detail')
                    .removeClass('action-local action-remote')
                    .addClass('action-' + mf.m.utils.getKey(config.maps.targetType, +value));
                model.set('targetType', value);
                if (value == config.maps.targetType.local) {
                    V.toggle('appResource', true);
                    V.toggle('targetUrl', false);
                } else {
                    V.toggle('appResource', false);
                    V.toggle('targetUrl', true);
                }
            };
            targetType.setValue(model.get('targetType'), {dispatch: true});

            action.subAction = {};
            var resourceLoader = esui.get('resourceLoader');
            resourceLoader.oncommand = function (opt) {
                var index = opt.index;
                if (index === 0) {
                    var selectedResource = action.subAction.resource.getSelectedResource();
                    if (!(selectedResource >= 0) || selectedResource === null) {
                        return false;
                    }
                    selectedResource = +selectedResource;
                    var field = model.get('currentEditingField');
                    var id = model.get('currentEditingId');
                    model.set(field, selectedResource);
                    esui.get(id).setValue(selectedResource);
                    V.checkSingle('appResource');
                    resourceLoader.hide();
                }
                action.subAction.resource.leave();
                action.subAction.resource = null;
            };

            var chooseImage = esui.get('chooseImage');
            chooseImage.onclick = function () {
                resourceLoader.show();
                if (action.subAction.resource) {
                    action.subAction.resource.leave();
                }
                action.subAction.resource = er.controller.loadSub(
                    resourceLoader.getBody().id,
                    'mf.index.market.resource',
                    {
                        queryMap: {
                            selectedResource: model.get('image'),
                            targetTab: config.maps.resourceType.image,
                            resources: model.get('resources'),
                            config: model.get('config'),
                            listing: true
                        }
                    }
                );
                model.set('currentEditingField', 'image');
                model.set('currentEditingId', 'image');
            };
            var chooseApp = esui.get('chooseApp');
            chooseApp.onclick = function () {
                resourceLoader.show();
                if (action.subAction.resource) {
                    action.subAction.resource.leave();
                }
                action.subAction.resource = er.controller.loadSub(
                    resourceLoader.getBody().id,
                    'mf.index.market.resource',
                    {
                        queryMap: {
                            selectedResource: model.get('appResource'),
                            targetTab: config.maps.resourceType.app,
                            resources: model.get('resources'),
                            config: model.get('config'),
                            listing: true
                        }
                    }
                );
                model.set('currentEditingField', 'appResource');
                model.set('currentEditingId', 'appResource');
            };
            model.onchange = mf.m.utils.throttle(function (event) {
                console.log(event);
                switch (event.name) {
                    case 'image':
                    case 'title':
                    case 'description':
                        mf.m.utils.nextTick(previewMaterial, model);
                        break;
                    case 'appResource':
                        mf.m.utils.nextTick(previewResource, model);
                        break;
                }
            });
            mf.m.utils.nextTick(previewMaterial, model);
            mf.m.utils.nextTick(previewResource, model);


            action.getIdea = function () {
                var idea;
                if (V.check()) {
                    idea = {};
                    idea.id = esui.get('id').getValue();
                    idea.id && (idea.id = +idea.id);
                    idea.name = esui.get('name').getValue();
                    idea.image = +esui.get('image').getValue();
                    idea.title = esui.get('title').getValue();
                    idea.description = esui.get('description').getValue();
                    idea.targetUrl = esui.get('targetUrl').getValue();
                    idea.appResource = +esui.get('appResource').getValue();
                    idea.targetResource = idea.appResource;
                    idea.type = +esui.get('type').getValue()[0];
                    idea.display = +esui.get('display').getValue()[0];
                    idea.actionType = +esui.get('actionType').getValue()[0];
                    idea.targetType = +esui.get('targetType').getValue()[0];
                    ['image', 'appResource', 'targetResource'].forEach(function (n) {
                        if (idea[n] === 0) {
                            delete idea[n];
                        }
                    });
                } else {
                    idea = false;
                }
                console.log('idea', idea);
                return idea;
            }
        },
        onleave: function () {
            console.log('onleave');
            for (var i in this.subAction) {
                this.subAction[i] && this.subAction[i].leave();
            }
            this.subAction = null;
        }
    });
})();