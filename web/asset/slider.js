/**
 * @file 图片横幅滑动控件
 * @author Jefferson<dengyijun@baidu.com>
 */

(function(obj) {
    /**
     * @param {Object} opt
     * @param {int} opt.num 一共几张图片
     * @param {int} opt.per 每张图片的宽/高
     * @param {string} opt.outerId 外容器id
     * @param {string} opt.innerId 内容器id
     * @param {int=} opt.animInv 切换完成时间
     * @param {int=} opt.slideInv 切换间隔时间
     * @param {boolean=} opt.css 容器是否需要自动加长宽属性css
     * @param {Object=} opt.dot 圆点的配置，可见，切换事件，底部位置左中右
     */
    obj.slider = function(opt) {
        var browser = parseInt($.browser.version, 10);
        browser = document.all && browser < 9 ? false : true;
        var hover = false;
        var per = opt.per;
        var container = $('#' + opt.outerId);
        var items = $('#' + opt.innerId);
        var animInv = opt.animInv || 300;
        var slideInv = opt.slideInv || 5000;
        var needCss = opt.css || false;
        var dotOpt = opt.dot || {
            visible: true,
            event: 'click',
            pos: 'center',
            offsetLeft: 0
        };
        var onDotChange = opt.onDotChange || function () {};
        var pid = 0;
        var imgNum = opt.num || 5;

        /**
         * 切换圆点事件绑定
         */
        var switchDot = function() {
            if (dotOpt.visible) {
                var eleId = opt.innerId + 'Dots';
                var j = getCurrentDot(eleId) + 1;
                var dots = $('#' + eleId).find('span');
                $(dots[j - 1]).removeClass('current');
                if (j < imgNum) $(dots[j]).addClass('current');
                else $(dots[0]).addClass('current');
            }
            onDotChange(dots.filter('.current').index());
        };

        /**
         * FIXME jq的animate scrollLeft{Top}在ie8-下出坑，还要自己修，真心坑爹
         * @param {Object} opt
         * @param {HtmlElement} opt.container 主体
         * @param {string} opt.event scrollLeft或者scrollTop
         * @param {int} opt.org 动画前的scrL或者scrT
         * @param {int} opt.dest 动画后的scrL或者scrT
         * @param {int} opt.interval 动画时间
         * @param {Function=} opt.callback 回调函数
         */
        var jqScroll = function(opt) {
            var ele = opt.container || container;
            var event = opt.event || 'scrollLeft';
            var now = opt.org;
            var total = Math.floor(opt.interval / 30) + 1;
            var times = total;
            var timer = setInterval(function() {
                if (--times < 0) { //动画结束
                    clearInterval(timer);
                    if (opt.callback) opt.callback();
                } else {
                    now += (opt.dest - opt.org) / total;
                    if (event === 'scrollLeft') ele.scrollLeft(now);
                    else ele.scrollTop(now);
                }
            }, opt.interval / total);
        };

        /**
         * 往左横移图片
         */
        var scrollToLeft = function() {
            if (!hover) {
                if (browser) {
                    container.animate({
                        "scrollLeft": per
                    }, animInv, "linear", function() {
                        items.append(items.children().first());
                        container.scrollLeft(0);
                    });
                }
                else jqScroll({
                    org: $(container).scrollLeft(), dest: per,
                    interval: animInv, callback: function() {
                        items.append(items.children().first());
                        container.scrollLeft(0);
                    }
                });
                switchDot();
            }
        };
        
        /**
         * 往上横移图片
         */
        var scrollToTop = function() {
            if (!hover) {
                if (browser) {
                    container.animate({
                        "scrollTop": per
                    }, animInv, "linear", function() {
                        items.append(items.children().first());
                        container.scrollTop(0);
                    });
                }
                else jqScroll({
                    event: 'scrollTop', interval: animInv,
                    org: $(container).scrollTop(), dest: per,
                    callback: function() {
                        items.append(items.children().first());
                        container.scrollTop(0);
                    }
                });
                switchDot();
            }
        };
        
        /**
         * 如果鼠标悬浮在某张图片上，则不再自动切换
         */
        var regMouse = function() {
            container.mouseover(function() {
                hover = true;
            }).mouseout(function() {
                hover = false;
            });
        };
        
        /**
         * 为容器自动加长宽属性css
         * @param {string} str 可以是width或者height
         */
        var setCss = function(str) {
            container.css('overflow', 'hidden');
            container.css(str, per + 'px');
            items.css(str, (per * imgNum) + 'px');
        };
        
        /**
         * 得到当前哪个圆点处于active状态
         */
        var getCurrentDot = function(eleId) {
            var dots = $('#' + eleId).find('span');
            var j = 0;
            for (; j < dots.length; ++j) {
                if (dots[j].className.indexOf('current') > -1) return j;
            }
            return -1;
        };
        
        /**
         * 注册圆点事件
         * @param {string} eleId dom元素id
         * @param {string} str 可以是width或者height
         */
        var regDot = function(eleId, str) {
            var dots = $('#' + eleId).find('span');
            $(dots).each(function(i, dot) {
                $(dot).bind(dotOpt.event, function() {
                    var j = getCurrentDot(eleId);
                    if (j !== i) {
                        $(dots[j]).removeClass('current');
                        $(dot).addClass('current');
                        if (str === 'height') jumpTop(j, i);
                        else if (str === 'width') jumpLeft(j, i);
                    }
                });
            });
        };
        
        /**
         * 跨多张图切换圆点——垂直滚动
         * @param {int} start 起始offset位置
         * @param {int} dest 终点offset位置
         */
        var jumpTop = function(start, dest) {
            var time = animInv * 0.3 * (dest - start);
            if (start > dest) {
                for (var i = 0; i < start - dest; i++) {
                    items.prepend(items.children().last());
                }
                container.scrollTop(per * (start - dest));
                if (browser) {
                    container.animate({
                        "scrollTop": 0
                    }, animInv - time, "linear");
                }
                else jqScroll({
                    event: 'scrollTop', interval: animInv - time,
                    org: per * (start - dest), dest: 0
                });
            }
            else {
                if (browser) {
                    container.animate({
                        "scrollTop": per * (dest - start)
                    }, animInv + time, "linear", function() {
                        for (var i = 0; i < dest - start; i++) {
                            items.append(items.children().first());
                        }
                        container.scrollTop(0);
                    });
                }
                else jqScroll({
                    event: 'scrollTop', interval: animInv + time,
                    org: container.scrollTop(), dest: per * (dest - start),
                    callback: function() {
                        for (var i = 0; i < dest - start; i++) {
                            items.append(items.children().first());
                        }
                        container.scrollTop(0);
                    }
                });
            }
            clearInterval(pid);
            pid = setInterval(scrollToTop, slideInv);
            onDotChange(dest);
        };
        
        /**
         * 跨多张图切换圆点——水平滚动
         * @param {int} start 起始offset位置
         * @param {int} dest 终点offset位置
         */
        var jumpLeft = function(start, dest, notActive) {
            var time = animInv * 0.3 * (dest - start);
            if (start > dest) {
                for (var i = 0; i < start - dest; ++i) {
                    items.prepend(items.children().last());
                }
                container.scrollLeft(per * (start - dest));
                if (browser) {
                    container.animate({
                        "scrollLeft": 0
                    }, animInv - time, "linear");
                }
                else jqScroll({
                    interval: animInv - time,
                    org: per * (start - dest), dest: 0
                });
            }
            else {
                if (browser) {
                    container.animate({
                        "scrollLeft": per * (dest - start)
                    }, animInv + time, "linear", function() {
                        for (var i = 0; i < dest - start; ++i) {
                            items.append(items.children().first());
                        }
                        container.scrollLeft(0);
                    });
                }
                else jqScroll({
                    org: container.scrollLeft(), dest: per * (dest - start),
                    interval: animInv + time, callback: function() {
                        for (var i = 0; i < dest - start; i++) {
                            items.append(items.children().first());
                        }
                        container.scrollLeft(0);
                    }
                });
            }
            if (!notActive) {
                clearInterval(pid);
                pid = setInterval(scrollToLeft, slideInv);
            }
            onDotChange(dest);
        };
        
        /**
         * 渲染圆点
         */
        var renderDot = function() {
            container.css('position', 'relative');
            var posStr = '';
            var dotOffsetLeft = dotOpt.offsetLeft || 0;
            if (dotOpt.pos === 'right') posStr = 'right:18px';
            else if (dotOpt.pos === 'left') posStr = 'left:18px';
            else if (dotOpt.pos === 'center') {
                var px = container.css('width');
                var myWidth = imgNum < 8 ? 60 : imgNum * 8;
                px = px.substring(0, px.indexOf('px'));
                px = parseInt(px, 10);
                posStr = 'left:' + (px / 2 - myWidth - dotOffsetLeft) + 'px';
            }
            var html = [
                '<div id="' + opt.innerId + 'Dots" ',
                'class="slide_dot" style="' + posStr + '">'
            ];
            for (var i = 1; i <= imgNum; i++) {
                html.push('<span class="dot_list');
                if (i === 1) html.push(' current');
                html.push('"></span>');
            }
            html.push('</div>');
            container.parent().append(html.join(''));
            var dotId = opt.innerId + 'Dots';
            if (imgNum < 2) $('#' + dotId).hide();
            return dotId;
        };
        
        /**
         * 初始化，str可以是height或者width
         */
        var reg = function(str) {
            regMouse();
            if (needCss) setCss(str);
            if (dotOpt.visible) regDot(renderDot(), str);
        };
        return {
            horizontal: function(notActive) {
                reg('width');
                if (!notActive && items.width() > per) {
                    pid = setInterval(scrollToLeft, slideInv);
                }
            },
            vertical: function(notActive) {
                reg('height');
                if (!notActive && items.height() > per) {
                    pid = setInterval(scrollToTop, slideInv);
                }
            },
            stop: function() {
                if (pid <= 0) clearInterval(pid);
                container.stop(true, true);
            },
            jumpTop: jumpTop,
            jumpLeft: jumpLeft
        };
    };
})(window.mf || window || exports || module || {});