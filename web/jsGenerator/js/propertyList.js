(function () {
    var root = this;

    var baseFontSize = 10;
    var baseWidth = 320 * 12 / baseFontSize;

    function getEmValue(value) {
        return value / baseFontSize + 'em';
    }

    var propertyList = {
        'free': function (propertyConfig) {
            var configs = {};
            configs.html = {
                text: '内容',
                name: 'html',
                properties: [
                    propertyConfig.html
                ]
            };
            configs.banner = {
                text: 'Banner整体',
                name: 'bannerStyle',
                properties: [
                    propertyConfig.backgroundColor,
                    propertyConfig.border,
                    propertyConfig.radius,
                    propertyConfig.shadow,
                    propertyConfig.transform,
                    propertyConfig.animation
                ]
            };
            return configs;
        },
        'text_icon': function (propertyConfig) {
            var configs = {};
            configs.banner = {
                text: 'Banner整体',
                name: 'bannerStyle',
                properties: [
                    propertyConfig.backgroundColor,
                    propertyConfig.border,
                    propertyConfig.radius,
                    propertyConfig.shadow,
                    propertyConfig.transform,
                    propertyConfig.animation
                ]
            };
            configs.iconArea = {
                text: '图标区域',
                name: 'iconAreaStyle',
                properties: [
                    propertyConfig.backgroundColor,
                    propertyConfig.border,
                    propertyConfig.radius,
                    propertyConfig.padding,
                    propertyConfig.shadow,
                    propertyConfig.transform,
                    propertyConfig.animation
                ]
            };
            configs.image = {
                text: '图标',
                name: 'iconStyle',
                properties: [
                    propertyConfig.backgroundColor,
                    propertyConfig.border,
                    propertyConfig.radius,
                    propertyConfig.shadow,
                    propertyConfig.transform,
                    propertyConfig.animation
                ]
            };
            configs.textArea = {
                text: '文本区域',
                name: 'textAreaStyle',
                properties: [
                    propertyConfig.backgroundColor,
                    propertyConfig.border,
                    propertyConfig.radius,
                    propertyConfig.padding,
                    propertyConfig.shadow,
                    propertyConfig.transform,
                    propertyConfig.animation
                ]
            };
            configs.textTitleArea = {
                text: '标题区域',
                name: 'jgTitleStyle',
                properties: [
                    propertyConfig.textAlign,
                    propertyConfig.backgroundColor,
                    propertyConfig.border,
                    propertyConfig.radius,
                    propertyConfig.padding,
                    propertyConfig.shadow,
                    propertyConfig.transform,
                    propertyConfig.animation
                ]
            };
            configs.textTitleText = {
                text: '标题',
                name: 'jgTitleTextStyle',
                properties: [
                    propertyConfig.font,
                    propertyConfig.backgroundColor,
                    propertyConfig.border,
                    propertyConfig.radius,
                    propertyConfig.padding,
                    propertyConfig.shadow,
                    propertyConfig.transform
                ]
            };
            configs.textDescriptionArea = {
                text: '描述区域',
                name: 'jgDescriptionStyle',
                properties: [
                    propertyConfig.textAlign,
                    propertyConfig.backgroundColor,
                    propertyConfig.border,
                    propertyConfig.radius,
                    propertyConfig.padding,
                    propertyConfig.shadow,
                    propertyConfig.transform,
                    propertyConfig.animation
                ]
            };
            configs.textDescriptionText = {
                text: '描述',
                name: 'jgDescriptionTextStyle',
                properties: [
                    propertyConfig.font,
                    propertyConfig.backgroundColor,
                    propertyConfig.border,
                    propertyConfig.radius,
                    propertyConfig.padding,
                    propertyConfig.shadow,
                    propertyConfig.transform
                ]
            };
            configs.btnArea = {
                text: '按钮区域',
                name: 'btnAreaStyle',
                properties: [
                    propertyConfig.textAlign,
                    propertyConfig.backgroundColor,
                    propertyConfig.border,
                    propertyConfig.radius,
                    propertyConfig.padding,
                    propertyConfig.shadow,
                    propertyConfig.transform,
                    propertyConfig.animation
                ]
            };
            configs.btnContent = {
                text: '按钮',
                name: 'btnContentStyle',
                properties: [
                    propertyConfig.content,
                    propertyConfig.font,
                    propertyConfig.backgroundColor,
                    propertyConfig.border,
                    propertyConfig.radius,
                    propertyConfig.padding,
                    propertyConfig.shadow,
                    propertyConfig.transform,
                    propertyConfig.animation
                ]
            };
            return configs;
        },
        'image': function (propertyConfig) {
            var configs = {};
            configs.banner = {
                text: 'Banner整体',
                name: 'bannerStyle',
                properties: [
                    propertyConfig.backgroundColor,
                    propertyConfig.radius,
                    propertyConfig.shadow,
                    propertyConfig.transform,
                    propertyConfig.animation
                ]
            };
            configs.imageArea = {
                text: '图片区域',
                name: 'imageAreaStyle',
                properties: [
                    propertyConfig.backgroundColor,
                    propertyConfig.border,
                    propertyConfig.radius,
                    propertyConfig.padding,
                    propertyConfig.shadow,
                    propertyConfig.transform,
                    propertyConfig.animation
                ]
            };
            configs.image = {
                text: '图片',
                name: 'imageStyle',
                properties: [
                    propertyConfig.backgroundColor,
                    propertyConfig.border,
                    propertyConfig.radius,
                    propertyConfig.shadow,
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
                    propertyConfig.border,
                    propertyConfig.radius,
                    propertyConfig.padding,
                    propertyConfig.shadow,
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
                    propertyConfig.border,
                    propertyConfig.radius,
                    propertyConfig.padding,
                    propertyConfig.shadow,
                    propertyConfig.transform,
                    propertyConfig.animation
                ]
            };
            return configs;
        }
    };
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = propertyList;
        }
        exports.propertyList = propertyList;
    } else {
        root.propertyList = propertyList;
    }
}.call(this));