/**
 * @file Generated by er-sync, module
 * @author Luics<xukai01@baidu.com>
 * @date Thu Nov 14 2013 10:54:14 GMT+0800 (中国标准时间)
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * 带联想记忆的queryInput
 * shortcut mf.m.queryInput
 */
(function(exports, module) {
    var queryInput = function (opt) {
        var key = opt.key || 'query';
        var input = opt.input;
        if (typeof input === 'string') {
            input = esui.get(input);
        }
        var wrap = opt.wrap || 'queryTable';
        if (typeof wrap === 'string') {
            wrap = document.getElementById(wrap);
        }

        var map = {};
        function deal(arr) {
            var ans = [];
            ans.push('<tbody>');
            for (var j = 0; j < arr.length; j++) {
                ans.push('<tr class="m1"><td>' + arr[j] + '</td></tr>');
            }
            ans.push('</tbody>');
            $($(wrap).find('table')[0]).html(ans.join(''));
            wrap.style.width = (input.main.offsetWidth - 2) + 'px';
            wrap.style.left = input.main.offsetLeft + 'px';
            wrap.style.top = input.main.offsetTop + input.main.offsetHeight + 'px';
            $(wrap).show();
        }
        wrap.onclick = function (e) {
            e = e || window.event;
            var target = e.target || e.srcElement;
            if (target.nodeName.toLowerCase() !== 'td') return;
            input.setValue(target.innerHTML);
            $(':submit').click();
        };

        var bindId = 'click.' + opt.input;
        $(document).unbind(bindId);
        $(document).bind(bindId, function (e) {
            e = e || window.event;
            var target = e.target || e.srcElement;
            if (target !== input.main) $(wrap).hide();
        });

        $(input.main).bind('focus keyup', function (e) {
            var v = input.getValue();
            v = v.replace(/^\s+/, '').replace(/\s+$/, '');
            if (!v) {
                $(wrap).hide();
                return;
            }
            if (map[v]) {
                deal(map[v]);
                return;
            }
            var url = opt.url + '?' + key + '=' + encodeURIComponent(v);
            mf.get(url, function(model) {
                if (model && model.result && model.msg) {
                    var arr = model.msg.split("|");
                    deal(arr);
                    map[v] = arr;
                }
                else $(wrap).hide();
            });
        });
    };
    exports.queryInput = queryInput;
})(mf && mf.m || exports || {}, mf || module);