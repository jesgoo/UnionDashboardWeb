/**
 * Created with JetBrains WebStorm.
 * User: yangyuelong
 * Date: 13-9-25
 * Time: 上午10:19
 * jQuery utility extend
 */

$.extend({
    //判断空
    isEmpty: function(o) {
        return o === undefined || o === null;
    },
    //深度复制，遇到同名对象则合并，同名数组则追加
    deepExtend: function() {
        var args = [].slice.call(arguments, 0);
        var i = args.length;
        var a = args[0] || {};
        $.each(args.slice(1), function(j, o) {
            if (!$.isPlainObject(o))return true;
            $.each(o, function(i, n) {
                if ($.isPlainObject(n)) {
                    a[i] = $.deepExtend(a[i], n);
                }
                else if ($.isArray(n)) {
                    a[i] = [].concat(a[i], n);
                }
                else {
                    a[i] = n;
                }
            });
        });
        return a;
    },
    /**
     * html转义
     * @param {string} text
     * @param {boolean} _uname 转义换行符
     */
    htmlEscape: function(text, _uname) {
        var temp = (text || '') //考虑到该函数的使用范围，简单处理
            .replace(/&/g, '&amp;') //必须先于其它entity
            .replace(/>/g, '&gt;')
            .replace(/</g, '&lt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;') //&apos; ie6不支持！
            .replace(/\r/g, ''); //firefox不能识别\r
        if (_uname) return temp.replace(/\n/g, '<br>');
        else return temp;
    },
    /**
     * 字符串格式化函数
     * 1.支持变量 #{variable}
     * 2.支持函数 #{a function name defind in $item or extraItem} 函数能得到一个复合了$item和extraItem的参数
     * 3.支持循环 {{each $item}}html{{/each}} 循环体内的$item有$index键，表示当前序号
     * 4.支持简单条件判断 {{if condition}}html{{/if}} condition可以是$item里的项或函数，若是函数则执行condition($item)
     * 5.支持嵌套 #tmpl(templateSourceName,$item.some) Run like: f(templateSource,$item,$item.some)
     * 6.支持转码 #html,url{variable}
     * @param {string} source 需要格式的字符串
     * @param {Object} $item   格式化参数
     * @param {Object} extraItem   格式化额外参数
     */
    format: function(source, $item, extraItem) {
        source = $.isFunction(source) ? source($item) : String(source);
        var template = arguments.callee;
        if (arguments.length < 2) {
            return source || '';
        }
        else if ($.isArray($item)) {
            return $.map($item,function(n, i) {
                return template(source, $.extend(n, {$index: i, $item: n}), extraItem);
            }).join('');
        }
        else if ($.isPlainObject($item)) {
            if ($.isPlainObject(extraItem))$item = $.extend(extraItem, $item);
            var keyword = [
                {//{{each $item}}
                    character: /\{\{each (.*?)\}\}([\s\S]*?)\{\{\/each\}\}/g,
                    fn: function($0, $1, $2) {
                        $1 = $item[$1];
                        if ($.isEmpty($1)) {
                            return $0;
                        }
                        if (!$.isArray($1))return $2;
                        return template($2, $1, $item);
                    }
                },
                {//{{if condition}} condition($item)
                    character: /\{\{if (\!?)(.*?)\}\}([\s\S]*?)(?:\{\{else\}\}([\s\S]*?))?\{\{\/if\}\}/g,
                    fn: function($0, $3, $1, $2, $4) {
                        $1 = $item[$1];
                        $1 = $.isFunction($1) ? $1($item) : $1;
                        $3 && ($1 = !$1);
                        if ($1)return template($2, $item);
                        else if ($4)return template($4, $item);
                        else return '';
                    }
                },
                {//#tmpl(templateSource,$item.some) Run like: template(templateSource,$item,$item.some)
                    character: /\#tmpl\((.*?),(.*?)\)/g,
                    fn: function($0, $1, $2) {
                        $1 = $item[$1];
                        $2 = $item[$2];
                        if ($.isEmpty($1)) {
                            return $0;
                        }
                        return template($1, $item, $2);
                    }
                },
                {// #html{$item} #url{$item}
                    character: /\#(html|url)?\{(.*?)\}/g,
                    fn: function($0, $2, $1) {
                        if (!$.isEmpty($item[$1])) {
                            $1 = $item[$1];
                            $1 = $.isFunction($1) ? $1($item) : String($1);
                            if (typeof($1) === "undefined" || typeof($1) === "null") {
                                $1 = '';
                            }
                            if (/\#(html|url)?\{.*?\}/.test($1)) {
                                $1 = template($1, $item);
                            }
                        }
                        if ($2 === 'html') {
                            $1 = $.htmlEscape($1);
                        }
                        else if ($2 === 'url') {
                            $1 = encodeURIComponent($1);
                        }
                        return $1;
                    }
                }
            ];
            var _source = source;
            $.each(keyword, function(i, n) {
                while (n.character.test(_source))
                    _source = _source.replace(n.character, n.fn)
            });
            return _source;
        }
        else {
            var args = [].slice.call(arguments, 1);
            return source.replace(/\{([0-9]+)\}/g, function($0, $1) {
                return $.isEmpty(args[$1]) ? $0 : args[$1];
            });
        }
    }
});
