/**
 * 统一预览入口。考虑
 * 1.sdk使用的样式在浏览器上的表现差异
 * 2.AdBuilder不能完成大部分的预览工作
 * 3.所有预览都能满足等比例缩放
 *
 * User: yangyuelong
 * Date: 13-9-3
 * Time: 下午2:34
 *
 */
(function (exports, module) {
    var previewJS = function (data, target) {
        var contextId = '_previewJS';
        var adslot = 's0000000';
        var sdkConfig = {
            maxage: 3600 * 24,
            adslots: [
                {
                    adslot: adslot,
                    appId: '123',
                    close: data.hasCloseBtn,
                    prod: data.type,
                    type: mf.m.config.maps.sitePositionDisplayTypeConvert[data.displayType] || '',
                    height: data.height,
                    blank: data.blank,
                    place: mf.m.config.maps.displayPositionTypeConvert[data.position] || '',
                    autoPlayInterval: data.autoPlayInterval
                }
            ],
            splash: {on: false},
            expire: new Date().getTime() + 3600 * 24 * 1000
        };
        var contextOption = {
            contextId: contextId
        };
        er.context.addPrivate(contextId);
        $.each(data, function (i, n) {
            er.context.set(i, n, contextOption);
        });
        er.context.set('domain', location.host.replace(/^union\./i, 'cdn.'), contextOption);
        er.context.set('adslot', adslot, contextOption);
        er.context.set('aid', adslot, contextOption);
        var container = {
            innerHTML: 'invalid'
        };
        er.template.merge(
            container,
            'position_preview_js',
            contextId
        );
        er.context.removePrivate(contextId);

        localStorage.setItem(/*'adslotConf_' + */sdkConfig.adslots[0].adslot, JSON.stringify(sdkConfig));
        target = $('#' + target);
        target.children().remove();
        var iframe = $('<iframe/>', {
            'class': 'position-wrapper',
            frameborder: '0',
            scrolling: 'no'
        }).appendTo(target).get(0);
        mf.m.utils.writeInIframe(iframe.contentWindow, container.innerHTML);
    };
    var previewCustomJS = function (data) {
        var $container;
        if (data === null) {
            data = {
                jsSource: arguments[3],
                data: arguments[1]
            };
            $container = $('#' + arguments[2]);
        } else {
            var $target = $('#' + arguments[1]);
            $target.children().remove();
            var parentContent = previewHTML(data);
            $target.append(parentContent);
            $container = $target.find('.position-banner');
        }

        $container.children().remove();

        var jsSource = data.jsSource || '';
        var js = data.js || '';
        if (js !== 'result' && js !== '') {
            js = '//cdn.jesgoo.com/newtpl/js/' + js;
        }
        var customData = {
            version: 'test',
            js: js,
            jsSource: jsSource,
            data: JSON.stringify(data.data || {})
        };

        var contextId = '_previewCustomJS';
        var contextOption = {
            contextId: contextId
        };
        er.context.addPrivate(contextId);

        $.each(customData, function (i, n) {
            er.context.set(i, n, contextOption);
        });

        var container = {
            innerHTML: 'invalid'
        };
        er.template.merge(
            container,
            'position_preview_custom_js',
            contextId
        );
        er.context.removePrivate(contextId);


        var $iframe = $('<iframe/>', {
            'class': 'position-container',
            frameborder: '0',
            scrolling: 'no'
        }).appendTo($container).get(0);

        //console.log('previewCustomJS', customData, container);
        if (window.__DEBUG) {
            if (!$('#coder').length) {
                $('<textarea id="coder" style="width: 100%;height: 20em;"></textarea><textarea id="coder1" style="width: 100%;height: 20em;"></textarea>').appendTo('#Main');
            }
            $('#coder1').val(container.innerHTML);
        }

        mf.m.utils.writeInIframe($iframe.contentWindow, container.innerHTML);
    };
    var previewHTML = function (data, target) {
        var contextId = '_previewHTML';
        var contextOption = {
            contextId: contextId
        };
        er.context.addPrivate(contextId);
        $.each(data, function (i, n) {
            er.context.set(i, n, contextOption);
        });
        var positionExtraClass = ['position-content'];
        if (data.displayType == 2 && data.position == 2) {
            positionExtraClass.push('position-absolute-bottom');
        }
        var height = parseInt(data.height || 0, 10);
        var heightValue;
        if (height === -1) {
            heightValue = '100%';
        } else{
            if (height < 20) {
                height = 20;
            }
            height = height / 12;
            heightValue = height + 'em';
        }
        if (data.type == 10) {
            if (height == -1) {
                height = 800;
            }
            var width = height / 500 * 600;
            if (width > 26.66) {
                width = 26.66;
                height = width / 600 * 500;
            }
            heightValue = height + 'em';
            er.context.set('relativeWidth', width + 'em', contextOption);
            er.context.set('halfRelativeWidth', width / 2 + 'em', contextOption);
        }
        er.context.set('relativeHeight', heightValue, contextOption);
        er.context.set('positionExtraClass', positionExtraClass.join(' '), contextOption);

        if (typeof target === 'string') {
            target = document.getElementById(target) || document.getElementsByClassName(target)[0]
        }
        target = target || {};
        console.log('preview', data);
        er.template.merge(
            target,
            'position_preview',
            contextId
        );
        er.context.removePrivate(contextId);
        return target.innerHTML;
    };
    exports.preview = {
        writeInIframe: mf.m.utils.writeInIframe,
        previewHTML: previewHTML,
        previewJS: previewJS,
        previewCustomJS: previewCustomJS
    };
})(mf && mf.m || exports || {}, mf || module);
