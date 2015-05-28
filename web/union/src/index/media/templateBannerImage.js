/**
 * @file Generated by er-sync
 * @author Luics<xukai01@baidu.com>
 * @date Tue Apr 14 2015 14:15:42 GMT+0800 (CST)
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 */
(function () {
    /*var getCustomLayout = function (scaleOption) {
        var from = scaleOption.from;
        var to = scaleOption.to;
        var width = scaleOption.width;
        var data = {
            'btnArea': 'left:' + (from / width * 100) + '%; width: ' + ((to - from) / width) * 100 + '%;'
        };
        if (to - from < 1) {
            data.btnArea = 'display: none;'
        }
        return data;
    };*/

    var scaleConfig = {
        width: baseWidth,
        text: {},
        marker: function (value, position) {
            if (position == "right") {
                value = '止' + value + 'px';
            } else {
                value = '按钮起' + value + 'px';
            }
            return value;
        },
        from: baseWidth - 32,
        to: baseWidth,
        template: 'custom_image'
    };

    /*function getContentConfig(data) {
        var configs = {};
        configs.imageArea = {
            text: '图片区域',
            name: 'imageAreaStyle',
            properties: [
                propertyConfig.backgroundColor,
                propertyConfig.transform,
                propertyConfig.animation
            ]
        };
        configs.btnArea = {
            text: '按钮区域',
            name: 'btnAreaStyle',
            properties: [
                propertyConfig.textAlign,
                propertyConfig.backgroundColor,
                propertyConfig.transform,
                propertyConfig.animation
            ]
        };
        configs.btn = {
            text: '按钮',
            name: 'btnContentStyle',
            properties: [
                propertyConfig.content,
                propertyConfig.font,
                propertyConfig.backgroundColor,
                propertyConfig.transform
            ]
        };
        configs = baidu.object.clone(configs);
        configs.btnArea.properties[3].children[0].value = 3;
        return new PropertyConfig(configs, data);
    }*/

    mf.index.media.templateBannerImage = new er.Action({
        model: mf.index.media.model.templateBannerImage,
        view: new er.View({
            template: 'mf_index_media_templateBannerImage',
            UI_PROP: {}
        }),
        STATE_MAP: {},

        onentercomplete: function () {
            console.log('onentercomplete');
            var action = this;
            var model = action.model;

            var config = model.get('config');
            var templateID = model.get('template');
            var styleName = model.get('styleName');

            var refreshActionNewESUI = mf.m.utils.nextTickWrapper(function () {
                $.extend(action._controlMap, esui.init(this));
            });
            var templateData = model.get('templateData') || {};

            if (templateData.scale) {
                scaleConfig.from = templateData.scale.from || 0;
                scaleConfig.to = templateData.scale.to || 0;
            }

            var property = propertyList[styleName](propertyConfig);
            var getCustomLayout = layoutList[styleName];
            var getMockData = new MockData(mf.index.media.model.mockData_image);

            property = baidu.object.clone(property);
            property.btnArea.properties[3].children[0].value = 3;

            var customTemplate = initCustomEditor({
                templateID: templateID,
                styleName: styleName,
                scaleConfig: scaleConfig,
                contentConfig: new PropertyConfig(property, templateData.content),
                getCustomLayout: getCustomLayout,
                refreshESUI: refreshActionNewESUI,
                mockData: getMockData
            });
            customTemplate.preview();

            action.save = function () {
                return customTemplate.toJSON();
            };

            var elementID = templateID + '_' + styleName;
            var configSelect = esui.get('configSelect_' + elementID);
            if (configSelect) {
                configSelect.onchange = function (values, value) {
                    var item = mf.m.utils.deepSearch(configSelect.datasource, value, 'value');
                    if (item && item.data) {
                        var scaleData = item.data.scale;
                        var layoutData = getCustomLayout(item.data.scale);
                        var demoContent = new PropertyConfig(baidu.object.clone(property), item.data.content);
                        demoContent.setJSON(item.data.content);
                        var contentData = demoContent.getData();
                        var templateData = getMockData.get();
                        var customJS = generator(styleName, contentData, layoutData, scaleData, true);
                        mf.m.preview.previewCustomJS(null, templateData, 'configDemo_' + elementID, customJS);
                        $('#configDemoArea_' + elementID).show();
                        copyStyle.enable();
                    }
                };
                var copyStyle = esui.get('copyStyle_' + elementID);
                copyStyle.onclick = function () {
                    copyStyle.disable();
                    var value = configSelect.getValue()[0];
                    var item = mf.m.utils.deepSearch(configSelect.datasource, value, 'value');
                    action.reloadBaseDemo && action.reloadBaseDemo(item.data, value);
                };

                var defaultDemo = model.get('defaultDemo');
                if (defaultDemo) {
                    configSelect.setValue(defaultDemo, { dispatch: true });
                }
            }

            var saveBtn = esui.get('saveStyle_' + templateID + '_' + styleName);
            if (saveBtn) {
                saveBtn.onclick = function () {
                    console.log('save');
                    var result = customTemplate.toJSON();
                    var getData = customTemplate.contentConfig.getData();
                    mf.m.utils.writeInNewWindow(result);
                    mf.m.utils.writeInNewWindow(getData);
                };
            }
            var closeStyle = esui.get('closeStyle_' + templateID + '_' + styleName);
            if (closeStyle) {
                closeStyle.onclick = function () {
                    console.log('close');
                };
            }

            if (window.__DEBUG) {
                $('.operation-area', '#' + action.view.target).show()
            }

            refreshActionNewESUI.call(document.getElementById(action.view.target));
        },
        onleave: function () {
            console.log('onleave');
        }
    });
})();