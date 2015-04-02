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
(function(exports, module) {
    var writeInIframe = function (win, html, charset) {
        var doc = win.document;
        charset = charset || 'UTF-8';
        doc.open();
        doc.write('<!doctype html><html lang="en"><head>');
        doc.write('<meta charset="' + charset + '">');
        doc.write('<style>html,body,div,p,h1,h2,h3,h4,h5,h6{margin:0;padding:0;}img{border:0;}</style></head><body>');
        doc.write(html);
        doc.write('</body></html>');
        doc.close();
    };
    var previewJS = function(data, target) {
        var contextId = '_preview';
        var contextOption = {
            contextId: contextId
        };
        er.context.addPrivate(contextId);
        $.each(data, function (i, n) {
            er.context.set(i, n, contextOption);
        });
        er.context.set('domain', location.host.replace(/^union\./i, 'api.'), contextOption);
        var container = {
            innerHTML: 'invalid'
        };
        er.template.merge(
            container,
            'position_preview_js',
            contextId
        );
        er.context.removePrivate(contextId);
        target = $('#' + target);
        target.children().remove();
        var iframe = $('<iframe/>', {
            frameborder: '0',
            scrolling: 'no'
        }).appendTo(target);
        writeInIframe(iframe.contentWindow, container.innerHTML);
    };
    var previewHTML = function(data, target) {
        var contextId = '_preview';
        var contextOption = {
            contextId: contextId
        };
        er.context.addPrivate(contextId);
        var height = parseInt(data.height || 0, 10);
        if (height < 20 ) {
            height = 20;
        }
        height = height / 12;
        $.each(data, function (i, n) {
            er.context.set(i, n, contextOption);
        });
        var positionExtraClass = ['position-content'];
        if (data.displayType == 2 && data.position == 2) {
            positionExtraClass.push('position-absolute-bottom');
        }
        if (data.type == 10) {
            var width = height / 500 * 600;
            if (width > 26.66) {
                width = 26.66;
                height = width / 600 * 500;
            }
            er.context.set('relativeWidth', width, contextOption);
            er.context.set('halfRelativeWidth', width / 2, contextOption);
        }
        er.context.set('relativeHeight', height, contextOption);
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
        writeInIframe: writeInIframe,
        previewHTML: previewHTML,
        previewJS: previewJS
    };
})(mf && mf.m || exports || {}, mf || module);
