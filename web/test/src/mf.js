(function() {
    if (top !== window) {
        var theMF = typeof mf !== 'undefined' ? mf : top.mf;
        if (theMF && !theMF.isLoginPage()) {
            window._key = Math.random() * 100000;
            top.mf.screenPage.find(window._key, function(shell) {
                shell();
            });
        }
    }
    else $(function() {
        var minWidth = window.mf && window.mf.windowMinWidth || 1270;
        $(window).on('resize', function() {
            var body = $('body');
            var mw = $(window).width();
            if (mw < minWidth) body.css('width', minWidth);
            else body.css('width', 'auto');
        }).resize();
    });
})();
/*
 * @file Mobads FE ER 扩展库
 */

(function () {
    /**
     * Action Extension
     *
     * @lends er.Action
     */
    var actionExtension = {

        /**
         * 获取表单的POST data
         * 用于参数自动收集
         *
         * 扩展：
         * input没有填写name属性时，可使用id替代
         *
         * @protected
         * @param {object} opt_inputList 控件数组
         * @param {object} opt_queryMap 参数表
         * @return {object}
         */
        getDataByForm: function (opt_inputList, opt_queryMap) {
            var action = this;
            var queryMap = opt_queryMap || action.INPUT_QUERY_MAP || {},
                inputList = opt_inputList || action.view.getInputList(),
                finished = {},
                uiAdapter = er.extend.ui.adapter,
                i, len,
                input,
                inputName,
                value,
            //queryString,
                data = {};

            //Jan 5th 2013
            //By Yijun，表单中的hidden input
            var hiddens = document.getElementsByTagName('input');
            for (i = 0, len = hiddens.length; i < len; ++i) {
                input = hiddens[i];
                if (input.type === 'hidden') {
                    inputName = input.name;
                    if (inputName) {
                        // 已拼接的参数不重复拼接
                        if (finished[ inputName ]) {
                            continue;
                        }
                        finished[ inputName ] = 1;
                        inputName = queryMap[ inputName ] || inputName;
                        data[ inputName ] = encodeURIComponent(input.value);
                    }
                }
                else if (/^_innerui/.test(input.id) && input.checked) {
                    // buttonselect 对应fieldName的表单提交赋值
                    inputName = input.name;
                    if (inputName && !/_innerui/.test(inputName)) {
                        inputName = queryMap[ inputName ] || inputName;
                        if (finished[ inputName ] 
                            && /^(\d+\|?)+$/.test(data[ inputName ])) {
                            data[ inputName ] += '|';
                        }
                        data[ inputName ] = (finished[ inputName ]
                            ? data[ inputName ]
                            : '')
                            + encodeURIComponent(input.value);
                        if (!finished[ inputName ]) {
                            finished[ inputName ] = 1;
                        }
                    }
                }
                else if (input.type === 'text' && !/\sui\s/i.test(input.outerHTML)) {
                    inputName = input.name;
                    if (inputName) {
                        // 已拼接的参数不重复拼接
                        if (finished[ inputName ]) {
                            continue;
                        }
                        finished[ inputName ] = 1;
                        inputName = queryMap[ inputName ] || inputName;
                        data[ inputName ] = encodeURIComponent(input.value);
                    }
                }

            }

            for (i = 0, len = inputList.length; i < len; ++i) {
                input = inputList[i];

                if (uiAdapter.isInput(input)
                    && !uiAdapter.isDisabled(input)
                    ) {
                    //填写name属性时，可使用id替代
                    inputName = uiAdapter.getInputName(input) || input.id;
                    if ('function' == typeof input.getQueryString) {
                        console.log('getDataByForm function', inputName);
                        // 拼接参数，传入data给控件自有拼接方式，函数添加data项即可
                        var queryString = input.getQueryString(data);
                    }
                    else if (inputName) {
                        console.log('getDataByForm', inputName);
                        // 已拼接的参数不重复拼接
                        if (finished[ inputName ]) {
                            continue;
                        }

                        // 记录拼接状态
                        finished[ inputName ] = 1;

                        // 读取参数名映射
                        inputName = queryMap[ inputName ] || inputName;

                        // 获取input值
                        if (uiAdapter.isInputBox(input)) {
                            //Dec 12th 2012
                            //By Yijun，可能有某个checkbox组中仅仅一个checkbox
                            value = input.getGroup().getValue();
                            if ($.isArray(value)) {
                                value = value.join(',');
                            }
                        }
                        else {
                            value = input.getValue();
                        }

                        // 拼接参数
                        data[inputName] = encodeURIComponent(value);
                    }
                }
            }

            return data;
        },

        /**
         * 表单页触发所有元素的验证
         *
         * @protected
         * @param {object} opt_inputList 控件数组
         * @return {boolean}
         */
        validateForm: function (opt_inputList) {
            var inputList = opt_inputList || this.view.getInputList(),
                uiAdapter = er.extend.ui.adapter,
                i, len, input, val,
                valid = true,
                action = this;

            for (i = 0, len = inputList.length; i < len; i++) {
                input = inputList[i];
                if (uiAdapter.isInput(input)
                    && !uiAdapter.isDisabled(input)) {
                    val = input.validate();
                    if (valid) { // 单个控件验证失败则失败
                        valid = val;
                    }
                }
            }
            return valid;
        },

        /**
         * 为表单页所有Input元素绑定验证
         * 请在onafterrender中调用此方法
         *
         * @protected
         * @param {object} opt_inputList 控件数组
         */
        validateBind: function (opt_inputList) {
            if (this.validateBind.__called) {//once
                return;
            }
            this.validateBind.__called = 1;

            var inputList = opt_inputList || this.view.getInputList(),
            //uiAdapter = er.extend.ui.adapter,
                i, len, input,
                action = this;

            for (i = 0, len = inputList.length; i < len; i++) {
                input = inputList[i];
                input.onblur = function () {
                    action.validateForm();
                }
            }
        }
    };

    er.Action.extend(actionExtension);

    mf.Action = function (opt) {
        er.Action.call(this, opt);
        //er.Action.apply(this, arguments);
    };

    //mf.Action.prototype = {
    //    // 你的扩展方法
    //};

    baidu.inherits(mf.Action, er.Action);

    er.Model.prototype.getQueryString = (function (fn) {
        return function (maps) {
            var me = this;
            mf.queryMapEncode(me, maps);
            return fn.call(me, maps);
        };
    })(er.Model.prototype.getQueryString);

    er.permission.isAllow = (function (fn) {
        var allowAnd = function (name) {
            name = name.split('&');
            var isAllow = true;
            for (var i = 0, l = name.length; i < l; i++) {
                isAllow = isAllow && fn(name[i]);
            }
            return isAllow;
        };
        var allowOr = function (name) {
            name = name.split('|');
            var isAllow = false;
            for (var i = 0, l = name.length; i < l; i++) {
                isAllow = isAllow || allowAnd(name[i]);
            }
            return isAllow;
        };
        return function (name) {
            name = name || '';
            var isAllow = allowOr(name);
            return isAllow;
        }
    })(er.permission.isAllow);
})();
/*
 * @file Mobads FE ESUI 扩展库
 */

/*
 * ESUI (Enterprise Simple UI)
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * path:    esui/Plain.js
 * desc:    纯文本显示控件，解决文本和esui垂直对齐问题
 * author:  xukai01
 */

/**
 * 纯文本显示控件
 *
 * @param {Object} options 控件初始化参数
 */
esui.Plain = function (options) {
    // 类型声明，用于生成控件子dom的id和class
    this._type = 'plain';

    // 标识鼠标事件触发自动状态转换
    this._autoState = 1;

    esui.Control.call(this, options);
};

esui.Plain.prototype = {
    /**
     * plain的html模板
     *
     * @private
     */
    _tplPlain: '<div id="{2}" class="{1}">{0}</div>',

    /**
     * 获取button主区域的html
     *
     * @private
     * @return {string}
     */
    _getMainHtml: function () {
        var me = this;

        return esui.util.format(
            me._tplPlain,
            me.content || '&nbsp;',
            me.__getClass('label'),
            me.__getId('label')
        );
    },

    /**
     * 渲染控件
     *
     * @public
     */
    render: function () {
        var me = this;
        esui.Control.prototype.render.call(me);
        this.setPlain(this.content);
        this.setTitle(this.title);
    },

    /**
     * 设置显示内容（不经过html编码）
     *
     * @public
     * @param {string} content
     */
    setContent: function (content) {
        this.content = content || '';
        this.main.innerHTML = this._getMainHtml();
    },

    /**
     * 设置显示文字（经过html编码）
     *
     * @public
     * @param {string} text
     */
    setPlain: function (text) {
        text = text || '';
        this.setContent(baidu.encodeHTML(text));
    },

    /**
     * 设置自动提示的title
     *
     * @public
     * @param {string} title
     */
    setTitle: function (title) {
        this.title = title || '';
        this.main.setAttribute('title', this.title);
    },

    /**
     * 创建控件主元素
     *
     * @protected
     * @return {HTMLElement}
     */
    __createMain: function () {
        return document.createElement('span');
    }
};

baidu.inherits(esui.Plain, esui.Control);

/**
 * @file 月历日程控件
 * @author Yijun Deng(dengyijun@baidu.com)
 */

(function () {
    /**
     * 月历日程控件的构造函数
     * @constructor
     * @param {Object} opt
     *   opt.mode {string=} 默认空串，另外可以取small
     *   opt.showMode {number=} 是否生成切换链接 1则生成
     *   opt.datasource {Object<string, Array>=} 以日期为key的event集
     */
    esui.CalendarEvent = function (opt) {
        esui.Control.call(this, opt);

        /**
         * 类型声明, 用于生成控件子dom的id和class
         * @type {string}
         * @protected
         */
        this._type = 'calendarevent';

        /**
         * 标识鼠标事件触发自动状态转换
         * @type {number}
         * @protected
         */
        this._autoState = 0;

        this._init();
    };

    /**
     * 初始化，设置默认值；并根据当前日期设置this._year和this._month
     * @private
     */
    esui.CalendarEvent.prototype._init = function () {
        // 初始化，以下数据在生成控件时若无配置，则按以下默认值进行配置
        this.__initOption('mode', '');
        this.__initOption('nowDate', new Date());
        this.__initOption('showMode', 1);
        this.__initOption('datasource', {});

        /**
         * 当前年份
         * @type {number}
         * @private
         */
        this._year = this.nowDate.getFullYear();

        /**
         * 当前月份
         * @type {number}
         * @private
         */
        this._month = this.nowDate.getMonth();
    };

    /**
     * 绘制控件
     * @public
     */
    esui.CalendarEvent.prototype.render = function () {
        esui.Control.prototype.render.call(this);
        var main = this.main;
        if (this.mode === 'small') {
            baidu.dom.addClass(main, 'ui-calendarevent-small');
        } else {
            baidu.dom.removeClass(main, 'ui-calendarevent-small');
        }
        main.innerHTML = [
            '<table>',
            this._getCaption(),
            '<tbody>',
            this._getHeader(),
            this._getBody(),
            '</tbody>',
            '</table>'
        ].join('');
    };

    var format = esui.util.format;
    var CAPTION_TPL = '<span class="date">{0}年{1}月&nbsp;</span>';

    /**
     * 生成caption的html
     * @private
     * @return {string} 拼出的html
     */
    esui.CalendarEvent.prototype._getCaption = function () {
        return '<caption>' + format(CAPTION_TPL, this._year, this._month + 1)
            + this._getModeSwitcherHtml() + '</caption>';
    };

    var TH_TPL = '<th><span>星期</span>{0}</th>';
    var WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

    /**
     * 生成header的html，即表头周日到周六7列
     * @private
     * @return {string} 拼出的html
     */
    esui.CalendarEvent.prototype._getHeader = function () {
        var header = ['<tr>'];
        for (var i = 0, day; day = WEEKDAYS[i++];) {
            header.push(format(TH_TPL, day));
        }
        header.push('</tr>');
        return header.join('');
    };

    var DAY_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // 各个模板——上月补余，下月补余，本月（含事件），本月（无事件）
    var PREV_TPL = '<td class="previous">{0}</td>';
    var NEXT_TPL = '<td class="next">{0}</td>';
    var ACTIVE_TPL = '<td class="active">{0}</td>';
    var NORMAL_TPL = '<td>{0}</td>';

    /**
     * 生成body的html
     * @private
     * @return {string} 拼出的html
     */
    esui.CalendarEvent.prototype._getBody = function () {
        var year = this._year;
        var month = this._month;
        // 得到当月1号是周几
        var firstDay = new Date();
        firstDay.setFullYear(year);
        firstDay.setMonth(month);
        firstDay.setDate(1);
        var day = firstDay.getDay();

        // 分别计算出上个月/本月的总天数，需要考虑闰年
        var isLeepYear = this._isLeepYear(year);
        var daysOfLast = DAY_IN_MONTH[(month + 11) % 12]
            + (month === 2 && isLeepYear ? 1 : 0);
        var daysOfThis = DAY_IN_MONTH[month]
            + (month === 1 && isLeepYear ? 1 : 0);

        // 以下开始生成body
        var body = ['<tr>'];
        // 补全上个月的末几天
        for (var i = 1; i <= day; ++i) {
            body.push(format(PREV_TPL, (daysOfLast - day + i)));
        }

        // 本月（如有事件，则用<ul><li></li></ul>的形式拼出）
        for (var i = 1; i <= daysOfThis; ++i) {
            var item = this.datasource[i];
            if (baidu.lang.isArray(item)) {
                var temp = [i, '<ul>'];
                for (var j = 0; j < item.length; ++j) {
                    temp.push(format('<li>{0}</li>', item[j]));
                }
                temp.push('</ul>');
                body.push(format(ACTIVE_TPL, temp.join('')));
            } else {
                body.push(format(NORMAL_TPL, i));
            }
            if ((i + day) % 7 === 0) {
                body.push('</tr><tr>');
            }
        }

        // 补全下个月的头几天
        day = (day + daysOfThis) % 7;
        day = 8 - (day === 0 ? 7 : day);
        for (var i = 1; i < day; ++i) {
            body.push(format(NEXT_TPL, i));
        }
        body.push('</tr>');
        return body.join('');
    };

    var NORMAL_MODE = '普通模式';
    var MINI_MODE = '迷你模式';
    var NO_EVENT = '<a class="disable">{0}</a>';

    /**
     * 根据showMode判断是否生成“切换模式”链接，如果是showMode==1则生成链接
     * @private
     * @return {string}
     */
    esui.CalendarEvent.prototype._getModeSwitcherHtml = function () {
        if (this.showMode != 1) {
            return '';
        }
        var HAS_EVENT = '<a onclick="' + this.__getStrRef()
            + '.changeMode()">{0}</a>';
        return this.mode !== 'small'
            ? format(NO_EVENT, NORMAL_MODE) + format(HAS_EVENT, MINI_MODE)
            : format(HAS_EVENT, NORMAL_MODE) + format(NO_EVENT, MINI_MODE);
    };

    /**
     * 是闰年则true，否则返回false
     * @private
     * @param {number} year
     * @return {boolean} 是否是闰年
     */
    esui.CalendarEvent.prototype._isLeepYear = function (year) {
        return year % 400 === 0 || year % 4 === 0 && year % 100 > 0;
    };

    /**
     * 切换模式（普通/迷你）
     * @public
     */
    esui.CalendarEvent.prototype.changeMode = function () {
        this.mode = this.mode === 'small' ? '' : 'small';
        this.render();
    };

    /**
     * 设置year
     * @public
     * @param {number} year
     */
    esui.CalendarEvent.prototype.setYear = function (year) {
        this._year = year;
        this.onchange(year, this._month);
        this.render();
    };

    /**
     * 获取year
     * @public
     * @return {number}
     */
    esui.CalendarEvent.prototype.getYear = function () {
        return this._year;
    };

    /**
     * 设置month
     * @public
     * @param {number} month
     */
    esui.CalendarEvent.prototype.setMonth = function (month) {
        this._month = month;
        this.onchange(this._year, month);
        this.render();
    };

    /**
     * 获取month
     * @public
     * @return {number}
     */
    esui.CalendarEvent.prototype.getMonth = function () {
        return this._month;
    };

    /**
     * 设置datasource，即每天的events
     * @public
     * @param {Object} datasource 比如{ '1': ['a', 'b'], '23': ['c'] }
     * @param {boolean=} forceRendering 是否强制激发render，true则激发
     */
    esui.CalendarEvent.prototype.setDatasource
        = function (datasource, forceRendering) {
        this.datasource = datasource;
        if (forceRendering) {
            this.render();
        }
    };

    /**
     * 获取datasource
     * @public
     * @return {Object} datasource
     */
    esui.CalendarEvent.prototype.getDatasource = function () {
        return this.datasource;
    };

    var EMPTY_FUNC = function () {
    };

    /**
     * 用于监听onchange的函数，用户可以重写
     * @public
     */
    esui.CalendarEvent.prototype.onchange = EMPTY_FUNC;

    /**
     * 释放控件
     * @protected
     */
    esui.CalendarEvent.prototype.__dispose = function () {
        var main = this.main;
        esui.Control.prototype.__dispose.call(this);
        main.innerHTML = '';
        main.parentNode && main.parentNode.removeChild(main);
    };

    baidu.inherits(esui.CalendarEvent, esui.Control);
})();

/*
 * esui (ECOM Simple UI)
 * Copyright 2013 Baidu Inc. All rights reserved.
 *
 * desc:    slide控件
 * author:  zhangzhiqiang(Ecom)<zhangzhiqiang04@baidu.com>
 */

/**
 * @param {Object} options makeSlide函数的所有参数在options对象中
 * @param {Number} options.slideMin、options.slideMax slide选择中的最小值和最大值
 * @param {Number} options.slideBarLength slide选择条的长度
 * @param {Number} options.slideInterval slide选择中的间隔大小
 * @param {Boolean} options.isVertical 可选参数，若opt_isVertical为true则为纵向的slide，否则默认为横向的slide
 * @param {Boolean} options.rulingBottom 可选参数，选择横向slide标尺放置的位置，为true时标尺放在下方
 * @param {Boolean} options.rulingLeft 可选参数，选择纵向slide标尺放置的位置，为true时标尺放在右方
 * @param {Boolean} options.showControlBarNum 可选参数，选择是否显示slide控制按钮上的数字，为true时显示
 * @param {Boolean} options.hideRulingNum 可选参数，选择是否显示标尺上的数字，为true时不显示
 * @param {Boolean} options.hideRuling 可选参数，选择是否显示标尺刻度，为true时不显示
 * @param {Boolean} options.showValueHolder 可选参数，选择是否显示slide下面的当前值提示，为true时不显示
 */
esui.Slide = function (options) {
    // 类型声明, 用于生成控件子dom的id和class
    this._type = "slide";

    // 标识鼠标事件触发自动状态转换
    this._autoState = 0;

    // this = new esui.Control(options);
    esui.Control.call(this, options);
    // 初始化数据，以下数据若在生成控件的时候没有配置，则按以下默认值进行配置
    this.__initOption('slideMin', 1);
    this.__initOption('slideMax', 4);
    this.__initOption('slideBarLength', 500);
    this.__initOption('slideInterval', 1);
};

esui.Slide.prototype = {
    /**
     * 渲染控件
     * @public
     **/
    render: function () {
        var me = this;
        if (!me._isRendered) {
            esui.Control.prototype.render.call(me);
        }

        var slideMin = parseInt(me.slideMin, 10);
        var slideMax = parseInt(me.slideMax, 10);
        var slideInterval = parseInt(me.slideInterval, 10);
        var slideBarLength = parseInt(me.slideBarLength, 10);
        var opt_isVertical = me.opt_isVertical;
        if (slideInterval < 1 || slideInterval > slideMax) {
            alert('你会看到这个信息是因为你把' + me.id
                + '的间隔设置为小于1或者大于最大值了;\n'
                + '请将间隔设置为最大值和1之间并尽量能整除的整数');
            return;
        }
        function initSlideBar() {               //初始化一个滑动条
            var slideBar = document.createElement('div');
            slideBar.className = 'slideBar';
            var slideBarSelected = document.createElement('div');
            slideBarSelected.className = 'slideBarSelected';
            var slideBarLeft = document.createElement('div');
            var slideBarRight = document.createElement('div');
            if (!opt_isVertical) {
                slideBar.className += ' slideBarHorizontal';
                slideBarSelected.className += ' slideBarSelectedHorizontal';
                slideBar.style.width = slideBarLength + 'px';
                slideBarLeft.className = 'slideBarLeft';
                slideBarRight.className = 'slideBarRight';
            }
            else {
                slideBar.className += ' slideBarVertical';
                slideBar.style.height = slideBarLength + 'px';
                slideBarSelected.className += ' slideBarSelectedVertical';
                slideBarLeft.className = 'slideBarBottom';
                slideBarRight.className = 'slideBarTop';
            }
            slideBar.appendChild(slideBarSelected);
            slideBar.appendChild(slideBarLeft);
            slideBar.appendChild(slideBarRight);
            return slideBar;
        }

        //初始化一个控制条
        function initControlBar() {
            var controlBar = document.createElement('div');
            controlBar.className = 'controlBar';
            controlBar.innerHTML = slideMin;
            //判断是否显示在控制按钮上面的数字值
            if (!me.opt_showControlBarNum) {
                controlBar.style.textIndent = '-10000em';
            }
            //判断是否为纵向的slide
            if (!opt_isVertical) {
                controlBar.className += ' controlBarHorizontal';
                controlBar.style.left = '0';
            }
            else {
                controlBar.className += ' controlBarVertical';
                controlBar.style.bottom = '0';
            }
            controlBar.title = slideMin;
            return controlBar;
        }

        //初始化标尺
        function initSlideRuling() {
            var slideRulingBox = document.createElement('div');
            slideRulingBox.className = 'slideRulingBox';
            var slideRuling = document.createElement('ul');
            slideRuling.className = 'slideRuling';
            if (!me.opt_hideRulingNum) {
                var slideRulingNum = document.createElement('ul');
                slideRulingNum.className = 'slideRulingNum';
            }
            if (me.opt_hideRuling) {
                slideRuling.style.display = 'none';
            }
            var slideRulingLiCount = (slideMax - slideMin) / slideInterval;
            var slideRulingWidth = slideBarLength / slideRulingLiCount;
            slideRulingLiCount = Math.floor(slideRulingLiCount);
            if (!opt_isVertical) {
                slideRuling.className += ' slideRulingHorizontal';
                if (me.opt_rulingBottom) {
                    slideRuling.style.top = '25px';
                    slideRulingNum.style.top = '32px';
                }
                if (!me.opt_hideRulingNum) {
                    slideRulingNum.className += ' slideRulingNumHorizontal';
                    slideRulingNum.style.left = -slideRulingWidth / 2 + 'px';
                    for (var i = 0; i <= slideRulingLiCount; i++) {
                        slideRuling.innerHTML += '<li style="left:' + slideRulingWidth * i
                            + 'px" title="' + (slideInterval * i + slideMin)
                            + '"><!-- --></li>';
                        slideRulingNum.innerHTML += '<li style="left:' + slideRulingWidth * i
                            + 'px;width:' + slideRulingWidth + 'px" title="'
                            + (slideInterval * i + slideMin) + '">'
                            + (slideInterval * i + slideMin) + '</li>';
                    }
                }
                else {
                    for (var i = 0; i <= slideRulingLiCount; i++) {
                        slideRuling.innerHTML += '<li style="left:' + slideRulingWidth * i
                            + 'px" title="'
                            + (slideInterval * i + slideMin) + '"></li>';
                    }
                }

            }
            else {
                slideRuling.className += ' slideRulingVertical';
                slideRuling.style.height = slideBarLength + 'px';
                var alignRight = '';
                if (me.opt_rulingLeft) {
                    slideRuling.style.right = '50px';
                    var alignRight = 'right:90px;';
                }
                if (!me.opt_hideRulingNum) {
                    slideRulingNum.className += ' slideRulingNumVertical';
                    slideRulingNum.style.height = slideBarLength + 'px';
                    slideRulingNum.style.bottom = -slideRulingWidth / 2 + 'px';
                    for (var i = 0; i <= slideRulingLiCount; i++) {
                        slideRuling.innerHTML += '<li style="bottom:' + slideRulingWidth * i
                            + 'px" title="' + (slideInterval * i + slideMin)
                            + '"><!-- --></li>';
                        slideRulingNum.innerHTML += '<li style="bottom:' + slideRulingWidth * i
                            + 'px;height:' + slideRulingWidth + 'px;line-height:'
                            + slideRulingWidth + 'px;' + alignRight + '" title="'
                            + (slideInterval * i + slideMin)
                            + '">' + (slideInterval * i + slideMin) + '</li>';
                    }
                }
                else {
                    for (var i = 0; i <= slideRulingLiCount; i++) {
                        slideRuling.innerHTML += '<li style="bottom:' + slideRulingWidth * i
                            + 'px" title="'
                            + (slideInterval * i + slideMin) + '"></li>';
                    }
                }
            }
            slideRulingBox.appendChild(slideRuling);
            if (!me.opt_hideRulingNum) {
                slideRulingBox.appendChild(slideRulingNum);
            }
            return slideRulingBox;
        }

        var slideBar = initSlideBar();      //初始化各个子块
        var controlBar = initControlBar();
        var slideRuling = initSlideRuling();
        var currentValueHolder = document.createElement('span');
        currentValueHolder.className = 'currentValueHolder';
        if (!me.opt_showValueHolder) {
            currentValueHolder.style.textIndent = '-10000em';
        }
        currentValueHolder.innerHTML = '当前值为' + slideMin;
        slideBar.appendChild(slideRuling);
        function slideBarClickHandler(e, setValue) {
            var nowValue = controlBar.innerHTML;
            e = e || window.event || {};
            var target = e.target || e.srcElement || {nodeName: 'div'};
            if (setValue && opt_isVertical) {
                target.className = 'slideBarVertical';
            }
            //点击刻度值，添加动画变化
            controlBar.style['-moz-transition'] = 'all 0.2s ease-out';
            controlBar.style['-webkit-transition'] = 'all 0.2s ease-out';
            controlBar.style['transition'] = 'all 0.2s ease-out';
            slideBar.firstChild.style['-moz-transition'] = 'all 0.2s ease-out';
            slideBar.firstChild.style['-webkit-transition'] = 'all 0.2s ease-out';
            slideBar.firstChild.style['transition'] = 'all 0.2s ease-out';
            if (target.nodeName.toLowerCase() == 'li') {
                controlBar.innerHTML = target.title;
                if (!opt_isVertical) {
                    controlBar.style.left = target.style.left;
                    slideBar.firstChild.style.width = target.style.left;
                }
                else {
                    controlBar.style.bottom = target.style.bottom;
                    slideBar.firstChild.style.height = target.style.bottom;
                }
            }
            else if (target.className == 'slideBarRight') {
                var newValue = slideMax;
                controlBar.innerHTML = newValue;
                controlBar.style.left = slideBarLength + 'px';
                slideBar.firstChild.style.width = slideBarLength + 'px';
            }
            else if (target.className == 'slideBarLeft') {
                var newValue = slideMin;
                controlBar.innerHTML = newValue;
                controlBar.style.left = '0';
                slideBar.firstChild.style.width = '0';
            }
            else if (target.className == 'slideBarBottom') {
                var newValue = slideMin;
                controlBar.innerHTML = newValue;
                controlBar.style.bottom = '0';
                slideBar.firstChild.style.height = '0';
            }
            else if (target.className == 'slideBarTop') {
                var newValue = slideMax;
                controlBar.innerHTML = newValue;
                controlBar.style.bottom = slideBarLength + 'px';
                slideBar.firstChild.style.height = slideBarLength + 'px';
            }
            else {
                if (!opt_isVertical) {
                    var offsetX = e.offsetX || e.layerX;
                    var value = setValue || offsetX / slideBarLength
                        * (slideMax - slideMin) + slideMin;
                    value = Math.round(value);
                    var newOffsetX = (value - slideMin) / (slideMax - slideMin)
                        * slideBarLength;
                    controlBar.style.left = newOffsetX + 'px';
                    slideBar.firstChild.style.width = newOffsetX + 'px';
                }
                else {
                    var offsetY = e.offsetY || e.layerY;
                    if (target.className.indexOf('slideBarVertical') != -1) {
                        var offsetBottom = slideBarLength - offsetY;
                    }
                    else {
                        var offsetBottom = parseInt(slideBar.firstChild.style.height, 10) - offsetY;
                    }
                    var value = setValue || offsetBottom / slideBarLength
                        * (slideMax - slideMin) + slideMin;
                    value = Math.round(value);
                    var newOffsetBottom = (value - slideMin) / (slideMax - slideMin)
                        * slideBarLength;
                    controlBar.style.bottom = newOffsetBottom + 'px';
                    slideBar.firstChild.style.height = newOffsetBottom + 'px';
                }
                controlBar.innerHTML = value;
            }
            controlBar.title = controlBar.innerHTML;
            currentValueHolder.innerHTML = '当前值为' + controlBar.innerHTML;
            var newValue = controlBar.innerHTML;
            if (newValue != nowValue) {
                me.onchange(nowValue, newValue);
            }
        }

        slideBar.onclick = function (e) {
            slideBarClickHandler(e);
        };
        slideBar.onmouseover = slideBar.onmousemove = function (e) {
            e = e || window.event;
            var target = e.target || e.srcElement;
            if (target.nodeName.toLowerCase() == 'div') {
                if (target.className == 'slideBarRight') {
                    slideBar.title = slideMax;
                }
                else if (target.className == 'slideBarLeft') {
                    slideBar.title = slideMin;
                }
                else if (target.className == 'slideBarBottom') {
                    slideBar.title = slideMin;
                }
                else if (target.className == 'slideBarTop') {
                    slideBar.title = slideMax;
                }
                else {
                    if (!opt_isVertical) {
                        var offsetX = e.offsetX || e.layerX;
                        var value = offsetX / slideBarLength
                            * (slideMax - slideMin) + slideMin;
                        slideBar.title = Math.round(value);
                    }
                    else {
                        var offsetY = e.offsetY || e.layerY;
                        if (target.className.indexOf('slideBarVertical') != -1) {
                            var offsetBottom = slideBarLength - offsetY;
                        }
                        else {
                            var offsetBottom = parseInt(slideBar.firstChild.style.height, 10) - offsetY;
                        }
                        var value = offsetBottom / slideBarLength
                            * (slideMax - slideMin) + slideMin;
                        slideBar.title = Math.round(value);
                    }
                }
            }
        };
        controlBar.onmousedown = function (e) {
            var self = this;
            e = e || window.event;
            var nowValue = controlBar.innerHTML;
            var nowClientXState = e.clientX;
            var nowClientYState = e.clientY;
            var nowLeftState = parseFloat(self.style.left);   //记录下点击时的当前状态left值
            var nowBottomState = parseFloat(self.style.bottom);   //记录下点击时的当前状态bottom值
            if (e.button == 0 || e.button == 1) {
                var mousemoveHandler = function (e) {
                    //拖动时去掉渐变的属性
                    controlBar.style['-moz-transition'] = 'all 0s ease-out';
                    controlBar.style['-webkit-transition'] = 'all 0s ease-out';
                    controlBar.style['transition'] = 'all 0s ease-out';
                    slideBar.firstChild.style['-moz-transition'] = 'all 0s ease-out';
                    slideBar.firstChild.style['-webkit-transition'] = 'all 0s ease-out';
                    slideBar.firstChild.style['transition'] = 'all 0s ease-out';
                    e = e || window.event;
                    if (!opt_isVertical) {
                        var moveWidth = e.clientX - nowClientXState;
                        var newLeftState = nowLeftState + moveWidth;
                        if (newLeftState < 0) {
                            newLeftState = 0;
                        }
                        else if (newLeftState > slideBarLength) {
                            newLeftState = slideBarLength;
                        }
                        self.style.left = newLeftState + 'px';
                        slideBar.firstChild.style.width = newLeftState + 'px';
                        var value = newLeftState / slideBarLength
                            * (slideMax - slideMin) + slideMin;
                    }
                    else {
                        var moveWidth = nowClientYState - e.clientY;
                        var newBottomState = nowBottomState + moveWidth;
                        if (newBottomState < 0) {
                            newBottomState = 0;
                        }
                        else if (newBottomState > slideBarLength) {
                            newBottomState = slideBarLength;
                        }
                        self.style.bottom = newBottomState + 'px';
                        slideBar.firstChild.style.height = newBottomState + 'px';
                        var value = newBottomState / slideBarLength
                            * (slideMax - slideMin) + slideMin;
                    }
                    var newValue = Math.round(value);
                    self.innerHTML = newValue;
                    self.title = newValue;
                    currentValueHolder.innerHTML = '当前值为' + newValue;
                };
                var mouseupHandler = function () {
                    baidu.un(document, 'mouseup', mouseupHandler);
                    baidu.un(document, 'mousemove', mousemoveHandler);
                    var newValue = controlBar.innerHTML;
                    var newOffset = (newValue - slideMin) / (slideMax - slideMin)
                        * slideBarLength;
                    if (!opt_isVertical) {
                        controlBar.style.left = newOffset + 'px';
                        slideBar.firstChild.style.width = newOffset + 'px';
                    }
                    else {
                        controlBar.style.bottom = newOffset + 'px';
                        slideBar.firstChild.style.height = newOffset + 'px';
                    }
                    if (nowValue != newValue) {
                        me.onchange(nowValue, newValue);
                    }
                };
                baidu.on(document, 'mousemove', mousemoveHandler);
                baidu.on(document, 'mouseup', mouseupHandler);
            }
            return false;
        };

        //初始化一个slide
        function initSlide() {
            var slideBox = document.createElement('div');
            var slideClass = 'slide-box';
            var slideId = me.__getId('box');
            slideBox.className = slideClass;
            slideBox.id = slideId;
            slideBox.onselectstart = function () {
                return false;
            };
            slideBox.style['-webkit-user-select'] = 'none';
            slideBox.style['-moz-user-select'] = 'none';
            slideBox.style['-ms-user-select'] = 'none';
            slideBox.style['-khtml-user-select'] = 'none';
            //判断是否为纵向的slide
            if (!opt_isVertical) {
                slideBox.className += ' slide-horizontal';
                slideBox.style.width = slideBarLength + 'px';
            }
            else {
                slideBox.className += ' slide-vertical';
                slideBox.style.height = slideBarLength + 'px';
            }
            //将子块放置到slideBox中
            slideBox.appendChild(controlBar);
            slideBox.appendChild(slideBar);
            slideBox.appendChild(currentValueHolder);
            return slideBox;
        }

        var newSlide = initSlide();
        me.main.appendChild(newSlide);

        /**
         * 暴露出来的公共方法
         * @public getValue方法，获取控件中的值
         * @public setValue方法，设置控件的值
         * @public onchange函数，用户自己定义的方法，在控件值改变时触发该函数
         */
        me.getValue = function () {
            return controlBar.innerHTML;
        };
        me.setValue = function (newValue) {
            if (newValue >= slideMin && newValue <= slideMax) {
                slideBarClickHandler({}, newValue);
                var nowValue = controlBar.innerHTML;
                if (nowValue != newValue) {
                    me.onchange(nowValue, newValue);
                }
                console.log('已被设置为' + newValue);
            }
            else {
                alert('超出范围了，请设在' + slideMin + '-' + slideMax + '之间');
                return false;
            }
        };
        //onchange方法具有两个可选参数，一个是change前的值，一个是change后的值
        me.onchange = new Function();
    }
};

baidu.inherits(esui.Slide, esui.Control);

/*
 * esui (ECOM Simple UI)
 * Copyright 2013 Baidu Inc. All rights reserved.
 *
 * path:    esui/Line.js
 * desc:    线绘制控件
 * author:  wangjuexin
 */

esui.Line = function (options) {
    // 类型声明, 用于生成控件子dom的id和class
    this._type = "line";

    // 标识鼠标事件触发自动状态转换
    this._autoState = 0;

    // this = new esui.Control(options);
    esui.Control.call(this, options);

    this.__initOption('start', { x: 0, y: 0 });
    this.__initOption('end', { x: 0, y: 0 });

};

esui.Line.prototype = {

    /**
     * 绘制控件
     *
     * @public
     */
    render: function () {
        var me = this;
        var main = me.main;
        var width = Math.abs(me.end.x - me.start.x) + 1;
        var height = Math.abs(me.end.y - me.start.y) + 1;
        var left = Math.min(me.end.x, me.start.x);
        var top = Math.min(me.end.y, me.start.y);

        main.style.cssText = 'position:absolute; width: ' + width + 'px; height: '
            + height + 'px; left: ' + left + 'px; top: ' + top + 'px; z-index: -1;';

        //修正父节点定位问题
        var position = this.__getStyle(main.parentNode, 'position');
        if (position != 'relative' || position != 'absolute' || position != 'fixed') {
            main.parentNode.style.position = 'relative';
        }

        var k = (me.end.y - me.start.y) / (me.end.x - me.start.x);
        var y1 = me.start.x;
        if (width >= height) {
            for (var i = 0; i < width; i++) {
                var pixel = document.createElement('div');
                var pTop = i * k;
                if (k < 0) {
                    pTop = i * k + height;
                }
                var pLeft = i;
                pixel.style.cssText = 'width: 1px; height: 1px; background-color: #000; position: absolute; top: '
                    + pTop + 'px; left: ' + pLeft + 'px;';
                main.appendChild(pixel);
            }
        } else {
            for (var i = 0; i < height; i++) {
                var pixel = document.createElement('div');
                var pLeft = i / k;
                if (k < 0) {
                    pLeft = i / k + width;
                }
                var pTop = i;
                pixel.style.cssText = 'width: 1px; height: 1px; background-color: #000; position: absolute; top: '
                    + pTop + 'px; left: ' + pLeft + 'px;';
                main.appendChild(pixel);
            }
        }

        if (!me._isRendered) {
            esui.Control.prototype.render.call(me);
        }
    },

    /**
     * 释放控件
     *
     * @private
     */
    __dispose: function () {
        var main = this.main;
        esui.Control.prototype.__dispose.call(this);
        main.innerHTML = '';
        main.parentNode && main.parentNode.removeChild(main);
    },

    /**
     * 获取计算样式
     *
     * @private
     * @param {HTMLElement|String} elem 要查找样式的节点或节点id
     * @param {String} pro 要查找的属性名
     * @return {String} 查找到的属性值
     */
    __getStyle: function (elem, pro) {
        elem = ('string' == typeof elem) ? document.getElementById('elem') : elem;
        if (!elem) {
            return null;
        }
        if (elem.style[pro]) { //内联
            return elem.style[pro];
        }
        else if (elem.currentStyle) {   //IE
            return elem.currentStyle[pro];
        }
        else if (window.getComputedStyle) {  //W3C标准
            var s = window.getComputedStyle(elem, null);
            return s[pro];
        }
        else if (document.defaultView && document.defaultView.getComputedStyle) {    //FF,CHROME等
            pro = pro.replace(/([A-Z])/g, "-$1"); //如marginLeft转为margin-Left
            pro = pro.toLowerCase();   //再转为小写margin-left
            var s = document.defaultView.getComputedStyle(elem, "");
            return s && s.getPropertyValue(pro);
        }
        else {
            return null;
        }
    }
};

baidu.inherits(esui.Line, esui.Control);

/*
 * esui (ECOM Simple UI)
 * Copyright 2013 Baidu Inc. All rights reserved.
 * 
 * path:    esui/TreeSelect.js
 * desc:    树状选择控件
 * author:  killeryyl, xukai01
 */

///import esui.Control;
///import baidu.lang.inherits;
///import baidu.lang.isArray;
///import baidu.event.fire;
///import baidu.dom.addClass;
///import baidu.dom.removeClass;
///import baidu.dom.hasClass;

/**
 * 树状选择控件
 *
 * @param {Object} options 控件初始化参数
 * @param {Array} options.datasource 控件初始化参数 源数据
 * @param {Array = []} options.value 控件初始化参数 源选项值
 * @param {Number = 0} options.maxItem 控件初始化参数 最大显示条目
 * @param {String = "id"} options.valueField 控件初始化参数 值在数据源里的字段
 * @param {String = "text"} options.textField 控件初始化参数 显示文本在数据源里的字段
 * @param {boolean = "false"} options.disabled 控件初始化参数 禁用控件
 */

    // 类型声明，用于生成控件子dom的id和class
esui.TreeSelect = function (options) {
    // 类型声明，用于生成控件子dom的id和class
    this._type = 'treeSelect';

// 标识鼠标事件触发自动状态转换
    this._autoState = 1;

    esui.Control.call(this, options);

// 参数初始化
    this.__initOption('maxItem', null, 'MAX_ITEM');
    this.__initOption('valueField', null, 'VALUE_FILED');
    this.__initOption('textField', null, 'TEXT_FILED');

};
esui.TreeSelect.MAX_ITEM = 0;        // 树结构最大显示选项数目设置，超出则出现滚动条
esui.TreeSelect.VALUE_FILED = 'id';     //指定值字段
esui.TreeSelect.TEXT_FILED = 'text';    //指定显示文本字段
esui.TreeSelect.prototype = {

    /**
     * 绘制控件
     *
     * @public
     */
    render: function () {
        var me = this;

        if (!me._isRendered) {
            esui.Control.prototype.render.call(me);
            me._isRendered = 1;
        }

        me._renderTreeSelect();
        if (me.dataLength > 0) {
            me.setValue(me.value, true, false);
            me.disabled && me.__setDisabled(true, true);
        }
        return me;
    },

    // 选择项容器
    _tplUl: '<ul{1}>{0}</ul>',

    // 选择项
    _tplLi: '<li>' +
        '<div class="{2}" onclick="{6}">' +
        '<span class="{3}" onclick="{7}"></span>' +
        '<input type="checkbox" id="{0}" value="{1}"{5}>' +
        '<label for="{0}">{4}</label>' +
        '</div>' +
        '{8}' +
        '</li>',

    /**
     * 获取唯一ID
     *
     * @private
     * @param {string} suffix
     */
    _getUniqueID: function (suffix) {
        return 'Unique' + Math.round((new Date()).getTime() * Math.random(), 0) + (suffix || '' );
    },

    /**
     * 绘制树状选择列表
     *
     * @private
     */

    _renderTreeSelect: function () {
        var me = this;
        var main = me.main;
        var data = [].concat(me.datasource || []);
        var dataLength = 0;
        var html = [];
        var strRef = me.__getStrRef();
        var maxItem = me.maxItem;
        var iconHasChildClass = ' ' + me.__getClass('icon-hasChild');
        var divClass = me.__getClass('node');
        var iconClass = me.__getClass('node-icon');
        var subTreeClass = ' class="' + me.__getClass('subtree') + '"';
        var valueField = me.valueField;
        var textField = me.textField;
        var disabled = ' disabled="disabled"';
        var selected = ' checked chk="1"';
        var mainWidth;
        var itemHeight;

        function getNodeListHtml(nodeData, parentSelected, parentDisabled, deep) {
            var nodeListHtml = '', len;
            deep || (deep = '');
            parentSelected = !!parentSelected;
            parentDisabled = !!parentDisabled;
            if (baidu.lang.isArray(nodeData)) {
                len = nodeData.length;
                for (var i = 0; i < len; i++) {
                    nodeListHtml += getNodeListHtml(nodeData[i], parentSelected,
                        parentDisabled, deep + i);
                }
                nodeListHtml = esui.util.format(
                    me._tplUl,
                    nodeListHtml,
                    deep == '' ? '' : subTreeClass
                );
            }
            else {
                parentSelected = parentSelected || !!nodeData.selected;
                parentDisabled = parentDisabled || !!nodeData.disabled;
                var uniqueID = me._getUniqueID(nodeData[valueField] + deep);
                var hasChild = baidu.lang.isArray(nodeData.children)
                    && nodeData.children.length > 0;
                var attributes = '';
                parentSelected && (attributes += selected);
                parentDisabled && (attributes += disabled);
                dataLength++;
                nodeListHtml = esui.util.format(me._tplLi,
                    uniqueID,
                    nodeData[valueField],
                    divClass,
                    iconClass + (hasChild ? iconHasChildClass : ''),
                    nodeData[textField],
                    attributes,
                    strRef + '._nodeClickHandler(event, this)',
                    strRef + '._nodeExpandHandler(event, this)',
                    hasChild
                        ? getNodeListHtml(nodeData.children, parentSelected,
                        parentDisabled, deep)
                        : ''
                );
            }
            return nodeListHtml;
        }

        main.style.width = 'auto';
        main.style.height = 'auto';
        main.innerHTML = getNodeListHtml(data);
        mainWidth = main.offsetWidth;

        if (dataLength > maxItem && maxItem > 0) {
            itemHeight = parseInt(esui.util.getStyle(main.firstChild.firstChild.firstChild, 'height'));
            main.style.height = maxItem * ( itemHeight + 1 ) + 'px';
        }
        if (me.width) {
            mainWidth > me.width
                ? main.style.width = mainWidth + 'px'
                : main.style.width = me.width + 'px';
        }
        me.dataLength = dataLength;
    },

    onchange: new Function(),
    oncollapse: new Function(),
    onexpand: new Function(),

    /**
     * 获取当前选中的值
     *
     * @public
     * @param {boolean} opt_getAll 忽略父级已选获取全部
     * @return {string}
     */
    getValue: function (opt_getAll) {
        var value = [];
        var me = this;
        var i;
        var len;

        function getSelectedValue(element) {
            var eleInput, subElements, i, len;
            for (i = 0, len = element.childNodes.length; i < len; i++) {
                subElements = element.childNodes[i];
                eleInput = me.__getInput(subElements);
                if (eleInput.checked) {
                    value.push(eleInput.value);
                }
                else if (subElements.childNodes.length == 2) {
                    getSelectedValue(subElements.childNodes[1]);
                }
            }
        }

        if (opt_getAll === true) {
            var elements = me._getInputByValue(true);
            for (i = 0, len = elements.length; i < len; i++) {
                if (elements[i].checked) {
                    value.push(elements[i].value);
                }
            }
        }
        else {
            for (i = 0, len = me.main.childNodes.length; i < len; i++) {
                getSelectedValue(me.main.childNodes[i]);
            }
        }
        return value;
    },

    /**
     * 清空选中值
     *
     * @public
     * @param {boolean} opt_isDispatch
     * @param {boolean} opt_recoverInit 恢复默认值
     */
    clearSelection: function (opt_isDispatch, opt_recoverInit) {
        var eleInputs = this.main.getElementsByTagName("input");
        var len = eleInputs.length;
        opt_recoverInit = !!opt_recoverInit;
        for (var i = 0; i < len; i++) {
            eleInputs[i].checked = opt_recoverInit
                && eleInputs[i].getAttribute("chk") == '1';
        }
        this._setHasChildStatus();
        opt_isDispatch === true && this.__onchangeHandler(null);
        return this;
    },

    /**
     * 设置节点下属子选项状态
     *
     * @private
     * @param {HTMLElement} fromElement 起始节点
     * @return {HTMLElement}
     */
    _setHasChildStatus: function (fromElement) {
        var parentElement;
        var sibling;
        var originalSelectFlag = true;
        var selectFlag = true;
        var disabledFlag = true;
        var breakFlag = false;
        var i;
        var len;
        fromElement || (fromElement = this.main);
        if (fromElement.nodeName == "INPUT") {
            parentElement = fromElement.parentNode.parentNode.parentNode;
            if (parentElement.parentNode.nodeName == "DIV") {
                return false;
            }
            sibling = parentElement.getElementsByTagName("input");
            for (i = 0, len = sibling.length; i < len; i++) {
                originalSelectFlag = originalSelectFlag && sibling[i].checked
                sibling[i].disabled || (selectFlag = selectFlag && sibling[i].checked);
                disabledFlag = disabledFlag && sibling[i].disabled;
            }
            sibling = this.__getInput(parentElement.parentNode);
            sibling.checked = !disabledFlag && selectFlag || originalSelectFlag;
            sibling.disabled = disabledFlag;
            this._setHasChildStatus(sibling);
        }
        else if (fromElement.nodeName == "DIV") {
            sibling = fromElement.childNodes;
            for (i = 0, len = sibling.length; i < len; i++) {
                this._setHasChildStatus(sibling[i]);
            }
        }
        else {
            sibling = fromElement.childNodes;
            for (i = 0, len = sibling.length; i < len; i++) {
                if (sibling[i].childNodes.length == 2) {
                    this._setHasChildStatus(sibling[i].childNodes[1]);
                    breakFlag = true;
                }
            }
            if (!breakFlag && len > 0) {
                this._setHasChildStatus(this.__getInput(sibling[0]));
            }
        }
        return this;
    },

    /**
     * 获取li的直属选项
     *
     * @private
     * @param {HTMLElement} elementLi
     * @return {HTMLElement}
     */
    __getInput: function (elementLi) {
        return elementLi.firstChild.getElementsByTagName('input')[0];
    },

    /**
     * 根据值获取选项
     *
     * @private
     * @param {string | array | number} value 值
     * @param {boolean} _isAll 忽略值获取全部
     * @return {Array}
     */
    _getInputByValue: function (_isAll, value) {
        if (this.dataLength < 1) {
            return [];
        }
        _isAll !== true && _isAll !== false && (value = _isAll);
        var me = this;
        var eleInputs = me.main.getElementsByTagName("input");
        var eleLen = eleInputs.length;
        var getInputs = [];

        if (_isAll === true) {
            getInputs = eleInputs;
        }
        else {
            value = [].concat(value);
            var valLen = value.length;
            var item;
            for (var i = 0; i < valLen; i++) {
                for (var j = 0; j < eleLen; j++) {
                    item = eleInputs[j].getAttribute('value');
                    if (item == value[i]) {
                        getInputs.push(eleInputs[j]);
                        break;
                    }
                }
            }
        }
        return getInputs;
    },

    /**
     * 根据值设置子选项
     *
     * @private
     * @param {HTMLElement} beginNode 开始选项
     * @param {boolean = false} _ignoreDisabled 忽略已禁用选项
     */
    _selectChildren: function (beginNode, _ignoreDisabled) {
        var children = beginNode.parentNode.nextSibling;
        var selected = beginNode.checked;
        var input;
        if (children) {
            children = children.childNodes;
            for (var i = 0, len = children.length; i < len; i++) {
                input = this.__getInput(children[i]);
                if (_ignoreDisabled || !input.disabled) {
                    input.checked = selected;
                    this._selectChildren(input, _ignoreDisabled);
                }
            }
        }
        return this;
    },
    /**
     * 根据值选择选项
     *
     * @public
     * @param {string | array | number} value 值
     * @param {boolean} opt_clearSelection 是否清空当前选择
     * @param {boolean} opt_isDispatch 是否发送事件
     * @param {boolean} _isSelect
     */
    setValue: function (value, opt_isClearSelection, opt_isDispatch, _isSelect) {
        _isSelect === false || (_isSelect = true);
        if (this.dataLength < 1) {
            return null;
        }
        value = [].concat(value);
        var eleInputs = this._getInputByValue(false, value),
            eleLen = eleInputs.length;
        if (opt_isClearSelection !== false && eleLen > 0) {
            this.clearSelection(false, false);
        }
        for (var j = 0; j < eleLen; j++) {
            eleInputs[j].checked = _isSelect;
            this._selectChildren(eleInputs[j], eleInputs[j].disabled);
        }
        this._setHasChildStatus();
        opt_isDispatch === true && j > 0 && this.__onchangeHandler(null);
        return this;
    },

    /**
     * 根据值取消选项
     *
     * @public
     * @param {string | array | number} value 值
     * @param {boolean} opt_isDispatch 是否发送事件
     */
    cancelValue: function (value, opt_isDispatch) {
        return this.setValue(value, false, opt_isDispatch, false);
    },

    /**
     * 设置控件为禁用
     * @public
     * @param {boolean = false } opt_isAll 是否全部
     * @param {string | array | number} value 值
     */
    disable: function (opt_isAll, value) {
        return this.__setDisabled(opt_isAll, true, value);
    },

    /**
     * 设置控件为可用
     *
     * @public
     * @param {boolean = false } opt_isAll 是否全部
     * @param {string | array | number} value 值
     */
    enable: function (opt_isAll, value) {
        return this.__setDisabled(opt_isAll, false, value);
    },

    /**
     * 设置控件为可用\禁用
     *
     * @private
     * @param {boolean} _isAll 是否全部
     * @param {boolean} _disabled 失效
     * @param {string | array | number} value 值
     */
    __setDisabled: function (_isAll, _disabled, value) {
        var eleInputs = this._getInputByValue(_isAll, value);
        var eleLen = eleInputs.length;
        for (var j = 0; j < eleLen; j++) {
            eleInputs[j].disabled = _disabled;
            this._disableChildren(eleInputs[j]);
        }
        this._setHasChildStatus();
        return this;
    },
    /**
     * 设置控件子类为可用\禁用
     *
     * @private
     * @param {HTMLElement} beginNode 开始节点
     */
    _disableChildren: function (beginNode) {
        var children = beginNode.parentNode.nextSibling;
        var disabled = beginNode.disabled;
        var input;
        if (children) {
            children = children.childNodes;
            for (var i = 0, len = children.length; i < len; i++) {
                input = this.__getInput(children[i]);
                input.disabled = disabled;
                this._disableChildren(input);
            }
        }
        return this;
    },
    __onchangeHandler: function (value) {
        this.onchange(this.getValue(), value);
    },

    /**
     * 展开/折叠列表事件
     *
     * @private
     * @param {HTMLElement} node 操作节点
     */
    _nodeExpandHandler: function (event, node) {
        var expandClass = this.__getClass('icon-expanded');
        var value = [node.nextSibling.value];
        if (baidu.dom.hasClass(node, expandClass)) {
            this.expand(false, value, true, true);
        }
        else {
            this.expand(false, value, true, false);
        }
    },
    /**
     * 节点展开
     *
     * @public
     * @param {boolean} opt_isAll 是否全部
     * @param {string | array | number} value 值
     * @param {boolean} opt_isDispatch 是否发送事件
     * @param {boolean} _isCollapse
     */
    expand: function (opt_isAll, value, opt_isDispatch, _isCollapse) {
        (value === true || value === false) && (opt_isDispatch = value);
        var me = this;
        var expandClass = me.__getClass('icon-expanded');
        var subTreeExpandClass = me.__getClass('subtree-expanded');
        var eleInputs = me._getInputByValue(opt_isAll, value);
        var eleLen = eleInputs.length;
        var icon, subUl, parentLi;
        value = [];
        for (var j = 0; j < eleLen; j++) {
            icon = eleInputs[j].previousSibling;
            subUl = icon.parentNode.nextSibling;
            if (!subUl || subUl.nodeName != 'UL') {
                continue;
            }
            parentLi = subUl.parentNode;
            value.push(eleInputs[j].value);
            if (_isCollapse) {
                baidu.dom.removeClass(icon, expandClass);
                baidu.dom.removeClass(subUl, subTreeExpandClass);
            }
            else {
                do {
                    baidu.dom.addClass(icon, expandClass);
                    baidu.dom.addClass(subUl, subTreeExpandClass);
                    parentLi = parentLi.parentNode.parentNode;
                    icon = parentLi.firstChild.firstChild;
                    subUl = parentLi.lastChild;
                } while (parentLi.nodeName != 'DIV');
            }
        }
        opt_isDispatch === true
        && ( _isCollapse ? me.oncollapse(value) : me.onexpand(value));
        return me;
    },
    /**
     * 节点收起
     *
     * @public
     * @param {boolean} opt_isAll 是否全部
     * @param {string | array | number} value 值
     * @param {boolean} opt_isDispatch 是否发送事件
     */
    collapse: function (opt_isAll, value, opt_isDispatch) {
        return this.expand(opt_isAll, value, opt_isDispatch, true);
    },
    /**
     * 选项点击事件
     *
     * @private
     * @param {HTMLElement} node 选项
     */
    _nodeClickHandler: function (event, node) {
        var me = this;
        event = event || window.event;
        var target = event.target || event.srcElement;
        if (target.nodeName == "INPUT"
            || (target.nodeName == "LABEL" && (target = target.previousSibling))
            ) {
            if (!target.disabled) {
                me._selectChildren(target);
                this._setHasChildStatus(target);
                this.__onchangeHandler(target.value);
            }
        }
    },
    /**
     * 释放控件
     *
     * @private
     */
    __dispose: function () {
        this.onchange = null;
        this.onexpande = null;
        this.oncollapse = null;
        esui.Control.prototype.__dispose.call(this);
    }
};

baidu.inherits(esui.TreeSelect, esui.Control);

/*
 * esui (ECOM Simple UI)
 * Copyright 2013 Baidu Inc. All rights reserved.
 * 
 * path:    esui/ButtonSelect.js
 * desc:    按钮型选择控件类
 * author:  Yuelong Yang, xukai01
 */

///import esui.util;
///import esui.Control;
///import baidu.lang.inherits;
///import baidu.dom.addClass;
///import baidu.dom.removeClass;
///import baidu.dom.hasClass;

/**
 * @file  按钮型选择控件
 * @author Yuelong Yang(yangyuelong@baidu.com)
 * 将原生input:Radio|CheckBox的功能聚合为一个控件
 * 控件便于批量渲染单、复选按钮；批量设置按钮状态；统一管理用户的选择交互事件
 * 通过skin皮肤切换Input控件的表现形式
 * 默认为skin为gray，即灰色样式的按钮形状
 * 也可使用simple，即原生的input形状
 * 后续亦可根据业务需要按照已有css格式添加各种表现形式的皮肤
 */

(function () {

    /**
     * 将字符形式的布尔值转换为布尔类型，或将任意值类型转为布尔类型
     *
     * @param {*} value
     * @return {boolean}
     */
    function toBoolean(value) {
        return !!value && !((/^false$/i).test(value));
    }

    /**
     * 目标是否为Object对象
     *
     * @param {*} o 目标
     * @return {boolean}
     */
    function isPlainObject(o) {
        return Object.prototype.toString.call(o) === '[object Object]';
    }

    /**
     * 选项模版
     *
     * @const
     * @type {string}
     */
    var TEMPLATE_ITEM = [
        '<input type="{1}" id="{0}" value="{2}" name="{5}">',
        '<label class="{4}" for="{0}">{3}{6}</label>'
    ].join('');

    /**
     * 按钮型选择控件的类型名称, 用于生成控件子dom的id和class，Camel命名
     *
     * @const
     * @type {string}
     */
    var BUTTON_SELECT_TYPE = 'buttonSelect';

    /**
     * 对浏览器渲染Input产生影响的属性，如checked, disabled, readonly
     * 最后一个留空，以便于在字符最后增加一个 ，方便查找
     *
     * @const
     * @type {string}
     */
    var INPUT_ELEMENT_FIELD = [
        'checked',
        'disabled',
        'readonly',
        ''].join(',');
	
    /**
     * 提示模版
     *
     * @const
     * @type {string}
     */
    var TOOLTIP = [
        '<div ui="type:Tip;id:${id}Tip;title:${title};content:${content};arrow:${arrow};skin:${skin};"></div>'
    ].join('');

    /**
     * 按钮型选择控件类
     * @constructor
     * @extends esui.Control
     * @param {Object} opt
     *   opt.valueField {string=} 数据集里选项值的字段，默认id
     *   opt.textField {string=} 数据集里选项显示文本的字段，默认text
     *   opt.datasource {Array.<Object>=} 以valueField值为key的数据集
     *   opt.value{Array.<*>=}  初始选中值
     *   opt.eachLine {number=} 每行显示选项数目，0则不限，默认为0
     *   opt.single{string|boolean=}  全局单选模式
     *   -> true：单选（默认） false：复选
     *   opt.disabled {boolean=} 控件禁用，默认false控件可用
     *   opt.hasTopRadios{string|boolean=} 边侧按钮顶部有圆角边，默认true
     *   opt.hasBottomRadios{string|boolean=}  边侧按钮底部有圆角边，默认true
     *   opt.hasLeftRadios {string|boolean=} 左侧按钮左部有圆角边，默认true
     *   opt.hasRightRadios {string|boolean=} 右侧按钮右部有圆角边，默认true
     *   opt.fieldName{string=} 该选项组的在form表单里字段名
     */
    function ButtonSelect(opt) {
        // 继承基类控件
        esui.Control.call(this, opt);

        // 类型声明
        this._type = BUTTON_SELECT_TYPE;

        /**
         * 标识鼠标事件触发自动状态转换
         * @type {number}
         * @protected
         */
        this._autoState = 0;

        this._init();

        // 规范数据格式，含义见类注释
        // 在元素的ui属性里，只能定义字符串类型的值
        // 以下将型如false,true的字符串转换为正确的布尔值
        /**
         * 边侧按钮顶部有圆角边
         *
         * @private
         * @type {boolean}
         */
        this._hasTopRadio = toBoolean(this.hasTopRadio);
        /**
         * 边侧按钮底底有圆角边
         *
         * @private
         * @type {boolean}
         */
        this._hasBottomRadio = toBoolean(this.hasBottomRadio);
        /**
         * 左侧按钮左部有圆角边
         *
         * @private
         * @type {boolean}
         */
        this._hasLeftRadio = toBoolean(this.hasLeftRadio);
        /**
         * 右侧按钮右部有圆角边
         *
         * @private
         * @type {boolean}
         */
        this._hasRightRadio = toBoolean(this.hasRightRadio);
        /**
         * 按钮禁用，此属性在esui.Control类里有定义，这里只作值类型转换
         *
         * @private
         * @type {boolean}
         */
        this.disabled = toBoolean(this.disabled);
        /**
         * 全局单选模式
         *
         * @private
         * @type {boolean}
         */
        this._single = toBoolean(this.single);
    }

    /**
     * 数据源中选项值字段的默认键名
     *
     * @const
     * @type {string}
     */
    ButtonSelect.VALUE_FIELD = 'id';

    /**
     * 数据源中选项显示文本字段的默认键名
     *
     * @const
     * @type {string}
     */
    ButtonSelect.TEXT_FIELD = 'text';

    /**
     * 每行显示选项数目，超出则插入lineSplit
     *
     * @const
     * @type {number}
     */
    ButtonSelect.EACH_LINE = 4;

    /**
     * 默认皮肤，有悬浮层显示下级，不支持滚动条
     *
     * @const
     * @type {string}
     */
    ButtonSelect.SKIN = 'gray';

    /**
     * 默认全局按钮单选状态
     *
     * @const
     * @type {boolean}
     */
    ButtonSelect.SINGLE = true;

    /**
     * 初始化类
     *
     * @private
     */
    ButtonSelect.prototype._init = function () {
        // 参数初始化
        this.__initOption('eachLine', null, 'EACH_LINE');
        this.__initOption('valueField', null, 'VALUE_FIELD');
        this.__initOption('textField', null, 'TEXT_FIELD');
        this.__initOption('skin', null, 'SKIN');
        this.__initOption('single', true, 'SINGLE');
        this.__initOption('disabled', false);
        this.__initOption('hasTopRadio', true);
        this.__initOption('hasBottomRadio', true);
        this.__initOption('hasLeftRadio', true);
        this.__initOption('hasRightRadio', true);
        this.__initOption('fieldName', null);
        this.__initOption('lineSplit', '<br />');
    };

    /**
     * 控件数据源
     *
     * @public
     * @type {Array.<Object>}
     */
    ButtonSelect.prototype.datasource = [];

    /**
     * 控件原始选项选择情况缓存
     *
     * @private
     * @type {Array.<*>}
     */
    ButtonSelect.prototype._oraginalSelect = [];

    /**
     * 控件原始选项禁用情况缓存
     *
     * @private
     * @type {Array.<*>}
     */
    ButtonSelect.prototype._oraginalDisable = [];

    /**
     * 控件选项的规范副本
     *
     * @private
     * @type {Array.<*>}
     */
    ButtonSelect.prototype._storage = [];

    /**
     * 绘制控件
     *
     * @public
     * @return {ButtonSelect}
     */
    ButtonSelect.prototype.render = function () {

        // _isRendered 在类Control有定义
        if (!this._isRendered) {
            esui.Control.prototype.render.call(this);
            this.__setEvent();
        }

        this.main.innerHTML = this._getButtonSelectHTML();
        baidu.object.extend(this._controlMap, esui.init(this.main));
        this._setStorage();

        // 若没有有效的选项，就不进行初始化处理了
        if (this.getDataLength() > 0) {
            // 处理选项的初始可用状态
            this._setDisabled(
                true,
                this.disabled ? undefined : this._oraginalDisable
            );
            // 处理选项的初始选中状态
            if (this._oraginalSelect.length > 0) {
                this.setValue(
                    this._oraginalSelect,
                    {
                        clear: false,
                        dispatch: true
                    }
                );
            }
            // 根据控件的值处理选项的选中状态
            if (this.value) {
                this.setValue(this.value, { dispatch: true });
            }
        }
        return this;
    };

    /**
     * 获取控件数据长度
     *
     * @public
     * @return {number}
     */
    ButtonSelect.prototype.getDataLength = function () {
        return this._storage.length;
    };

    /**
     * 映射选项并缓存，加速操作
     *
     * @private
     */
    ButtonSelect.prototype._setStorage = function () {
        // 清空缓存
        this._storage = [];
        // 遍历控件dom树，添加选项缓存
        var elemInputs = this.main.getElementsByTagName('input');
        for (var i = 0, tmpEleInput; tmpEleInput = elemInputs[i++];) {
            var tmpData = {
                value: tmpEleInput.value,
                disabled: false,
                checked: false,
                elemInput: tmpEleInput,
                elemLabel: tmpEleInput.nextSibling,
                single: tmpEleInput.type === 'radio',
                controlTip: this._controlMap[tmpEleInput.id + 'Tip']
            };
            tmpData.text = tmpData.elemLabel.innerHTML;
            this._storage.push(tmpData);
        }
    };

    /**
     * 获取选项按钮样式壳
     *
     * @private
     * @param {number} eachLine 每一行选项数量
     * @param {number} max 最大选项数量
     * @return {function}
     */
    ButtonSelect.prototype._getClassWrap = function (eachLine, max) {
        eachLine = eachLine || 1; // 防止出现0
        var baseClass = this.__getClass('button');
        var singleClass = this.__getClass('button-single');
        var leftClass = [this.__getClass('button-left')];
        var rightClass = [this.__getClass('button-right')];
        if (this._hasTopRadio) {
            if (this._hasLeftRadio) {
                leftClass.push(this.__getClass('border-radios-tl'));
            }
            if (this._hasRightRadio) {
                rightClass.push(this.__getClass('border-radios-tr'));
            }
        }
        if (this._hasBottomRadio) {
            if (this._hasLeftRadio) {
                leftClass.push(this.__getClass('border-radios-bl'));
            }
            if (this._hasRightRadio) {
                rightClass.push(this.__getClass('border-radios-br'));
            }
        }
        /**
         * 获取选项按钮样式
         *
         * @private
         * @param {number} index 选项所在行的序号，从0开始
         * @param {boolean} isSingle 是否单选选项
         * @return {string}
         */
        return function (index, isSingle) {
            var tmpClass = [baseClass];
            if (index % eachLine === 0) {
                tmpClass = tmpClass.concat(leftClass);
            }
            if (index % eachLine === eachLine - 1 || index === max - 1) {
                tmpClass = tmpClass.concat(rightClass);
            }
            if (isSingle) {
                tmpClass.push(singleClass);
            }
            return tmpClass.join(' ');
        }
    };

    /**
     * 获取选项按钮文本
     *
     * @private
     * @return {string}
     */
    ButtonSelect.prototype._getButtonSelectHTML = function () {
        var data = [].concat(this.datasource || []);
        var len = data.length;
        var eachLine = this.eachLine || len;
        var guid = esui.util.getGUID;
        var uniqueName = this.fieldName || guid();
        var getButtonClass = this._getClassWrap(eachLine, len);
        // 作为生成html文本的缓冲区，最后以join方式一并返回
        var html = [];
        // 清空上次缓存的相关选项值
        this._oraginalSelect = [];
        this._oraginalDisable = [];
        for (var i = 0, itemData; itemData = data[i]; i++) {
            var uniqueID = guid();
            var tmpValue = itemData[this.valueField];
            if (itemData.checked || itemData.selected) {
                this._oraginalSelect.push(tmpValue);
            }
            if (itemData.disabled) {
                this._oraginalDisable.push(tmpValue);
            }
            var tmpSingle = itemData.single
                || (itemData.single !== false && this._single);
            var tooltip = '';
            var tip = itemData.tip; 
            if (tip) {
                var tooltipOption = {};
                if (typeof tip === 'string') {
                    tooltipOption.content = tip;
                } else {
                    tooltipOption = baidu.object.clone(tip);
                }
                tooltipOption.title = baidu.string.encodeHTML(tooltipOption.title || '');
                tooltipOption.content = baidu.string.encodeHTML(tooltipOption.content || '');
                tooltipOption.id = uniqueID;
                'arrow' in tooltipOption || (tooltipOption.arrow = 1);
                'skin' in tooltipOption || (tooltipOption.skin = 'help');
                tooltip = esui.util.format(
                    TOOLTIP,
                    tooltipOption
                );
            }
            html.push(
                esui.util.format(
                    TEMPLATE_ITEM,
                    uniqueID,
                    tmpSingle ? 'radio' : 'checkbox',
                    itemData[this.valueField],
                    itemData[this.textField],
                    getButtonClass(i, tmpSingle),
                    uniqueName,
                    tooltip
                )
            );
            if (i % eachLine === eachLine - 1 && i < len - 1) {
                html.push(this.lineSplit);
            }
        }
        return html.join('');
    };

    /**
     * 获取选项的对应字段的数据，默认情况下仅获取选中选项
     *
     * @private
     * @param {string} field 数据字段
     * @param {boolean=} isGetAll 是否获取全部，默认false
     * @return {array.<*>}
     */
    ButtonSelect.prototype._getFieldValue = function (field, isGetAll) {
        var data = [];
        if (this.getDataLength() < 1) {
            return data;
        }
        for (var i = 0, historyItem; historyItem = this._storage[i++];) {
            if (isGetAll || historyItem.checked) {
                data.push(historyItem[field]);
            }
        }
        return data;
    };

    /**
     * 获取值，默认情况下仅获取选中选项
     *
     * @public
     * @param {?boolean=} isGetAll 是否获取全部，默认false
     * @return {array.<string>}
     */
    ButtonSelect.prototype.getValue = function (isGetAll) {
        return this._getFieldValue('value', isGetAll);
    };

    /**
     * 获取提示tooltip的控制句柄
     * @public
     * @param {number} index 节点索引，即第index + 1 个Select的提示
     * @return {Control|undefined}
     */
    ButtonSelect.prototype.getTip = function(index) {
        return (this._storage[this._storage.length - index - 1] || {}).controlTip;
    };
    
    /**
     * 获取选中选项的文本
     *
     * @public
     * @param {?boolean=} isGetAll 是否获取全部，默认false
     * @return {array.<string>}
     */
    ButtonSelect.prototype.getText = function (isGetAll) {
        return this._getFieldValue('text', isGetAll);
    };

    /**
     * 根据值获取选项索引
     *
     * @private
     * @param {*|Array.<*>=} targetValue 需要获取的选项值
     * 如果不提供此参数将选取全部
     * @return {Array.<number>}
     */
    ButtonSelect.prototype._getValueIndex = function (targetValue) {
        var storage = this._storage;
        var indexes = [];
        // 当且仅当targetValue无值时才选择全部
        // 不使用 !targetValue 判断是避免值为 null , 0 等情况下产生误判。
        if (targetValue === undefined) {
            for (var i = 0; storage[i]; i++) {
                indexes.push(i);
            }
        } else {
            targetValue = [].concat(targetValue);
            for (var i = 0, tmpData; tmpData = storage[i]; i++) {
                for (var j = 0, tmpValue; tmpValue = targetValue[j]; j++) {
                    if (tmpValue == tmpData.value) {
                        indexes.push(i);
                        targetValue.splice(j, 1);
                        break;
                    }
                }
            }
        }
        return indexes;
    };

    /**
     * 修改按钮
     *
     * @private
     * @param {Object} opt
     *   opt.targetValue {*}  被修改的选项值
     *   opt.isAll {boolean}  是否获取全部
     *   opt.field {string}  被修改的选项字段
     *   opt.value {*}  字段目标值
     *   opt.className {string=}  样式目标值
     *   opt.eventName {string=}  触发事件名
     * @return {ButtonSelect}
     */
    ButtonSelect.prototype._modifyButton = function (opt) {
        opt = opt || {};
        var indexes = this._getValueIndex(opt.targetValue);
        if (indexes.length < 1) {
            return this;
        }
        var storage = this._storage;
        var setModify = function (data) {
            // 在修改缓存的同时也修改元素的相应属性
            // 确保按钮在skin为simple时有正确的表现形式
            if (INPUT_ELEMENT_FIELD.indexOf(opt.field + ',') > -1) {
                data.elemInput[opt.field] = opt.value;
            }
            data[opt.field] = opt.value;
            if (opt.className) {
                baidu.dom[(opt.value ? 'add' : 'remove') + 'Class'](
                    data.elemLabel, opt.className
                );
            }
        };
        // 返回值中返回了最后处理的选项文本和值
        var lastItem = null;
        // 所有选项中存在单选的选项
        var hasSingle = false;
        for (var i = 0, tmpData; tmpData = storage[indexes[i++]];) {
            hasSingle = hasSingle || tmpData.single;
            tmpData[opt.field] === opt.value || setModify(tmpData);
            lastItem = tmpData;
        }
        // 下面这段是为了让同名radio与checkbox在各个浏览器里的点击切换保证一致
        // 现多个同名的checkbox已被选中
        // 此时选择同名的radio，则这些checkbox选中值不会被清除
        // 上面这个是标准浏览器的表现，在IE6/7/8中会出现怪异现象，故有此兼容措施
        if (hasSingle && opt.field === 'checked' && opt.value === true) {
            this.clearSelection();
            for (var i = 0; tmpData = storage[indexes[i++]];) {
                tmpData.single && (lastItem = tmpData);
            }
            setModify(lastItem);
            for (var i = 0; tmpData = storage[indexes[i++]];) {
                tmpData.single || setModify(tmpData);
            }
        }
        if (opt.eventName && lastItem) {
            var eventHandler = this['_on' + opt.eventName + 'Handler'];
            eventHandler && eventHandler.call(this, lastItem.value,
                lastItem.text);
        }
        return this;
    };

    /**
     * 设置控件为可用\禁用
     *
     * @private
     * @param {boolean} _disabled 失效状态
     * @param {?*=} targetValue 被设置的选项值
     * @return {ButtonSelect}
     */
    ButtonSelect.prototype._setDisabled = function (_disabled, targetValue) {
        var me = this;
        return me._modifyButton({
            targetValue: targetValue,
            field: 'disabled',
            value: _disabled,
            className: me.__getClass('button-disabled')
        });
    };

    /**
     * 设置控件为禁用
     *
     * @public
     * @return {ButtonSelect}
     */
    ButtonSelect.prototype.disable = function () {
        var args = [].slice.call(arguments, 0);
        args.unshift(true);
        return this._setDisabled.apply(this, args);
    };

    /**
     * 设置控件为可用
     *
     * @public
     * @return {ButtonSelect}
     */
    ButtonSelect.prototype.enable = function () {
        var args = [].slice.call(arguments, 0);
        args.unshift(false);
        return this._setDisabled.apply(this, args);
    };

    /**
     * 控件值变化事件
     *
     * @private
     * @param {*} value 触发事件的选项值
     * @param {string} text 触发事件的选项文本
     * @return {ButtonSelect}
     */
    ButtonSelect.prototype._onchangeHandler = function (value, text) {
        this.onchange.call(this, this.getValue(), value, text);
        return this;
    };

    /**
     * 控件值变化事件函数，用户可以重写
     *
     * @public
     */
    ButtonSelect.prototype.onchange = function () {
    };

    /**
     * 控件整体事件委托
     *
     * @private
     * @return {ButtonSelect}
     */
    ButtonSelect.prototype.__setEvent = function () {
        var me = this;
        me.main.onclick = function (event) {
            //下面两行是以主流浏览器为主，兼容IE的事件属性操作
            event = event || window.event;
            var target = event.target || event.srcElement;
            //为兼容 DOCTYPE 在html和xhtml中nodeName有大写也有小写的问题
            if (target && target.nodeName.toLowerCase() === "input") {
                if (!target.disabled) {
                    me._setValue(
                        target.checked,
                        target.value,
                        {
                            clear: target.type === 'radio' && target.checked,
                            dispatch: true
                        }
                    );
                }
            }
        };
        return me;
    };

    /**
     * 设定控件值，并根据值刷新选项选择情况
     *
     * @private
     * @param {boolean=} _isChecked 选项修改后的选中状态，默认true
     * @param {?*=} value 值
     * @param {?Object=} opt
     *   opt.clear {boolean=} 清空当前选择，默认false不清空
     *   opt.dispatch {boolean=} 发送事件，默认false不触发
     * @return {ButtonSelect}
     */
    ButtonSelect.prototype._setValue = function (_isChecked, value, opt) {
        if (this.getDataLength() < 1) {
            return this;
        }
        _isChecked === false || (_isChecked = true);
        if (isPlainObject(value)) {
            opt = value;
            value = undefined;
        }
        opt = opt || {};
        if (opt.clear) {
            this.clearSelection();
        }
        return this._modifyButton({
            targetValue: value,
            value: _isChecked,
            field: 'checked',
            className: this.__getClass('button-activation'),
            eventName: opt.dispatch ? 'change' : null
        });
    };

    /**
     * 清除选中值
     *
     * @public
     * @param {Object=} opt
     *   opt.recover {boolean=} 恢复初始值，默认false不恢复
     *   opt.dispatch {boolean=} 发送事件
     * @return {ButtonSelect}
     */
    ButtonSelect.prototype.clearSelection = function (opt) {
        opt = opt || {};
        opt.recover = !!opt.recover;
        this._setValue(
            false,
            { dispatch: opt.dispatch && !opt.recover }
        );
        opt.recover && this._setValue(
            true,
            this._oraginalSelect,
            { dispatch: opt.dispatch }
        );
        return this;
    };
    /**
     * 根据值选择选项
     *
     * @public
     * @return {ButtonSelect}
     */
    ButtonSelect.prototype.setValue = function () {
        var args = [].slice.call(arguments, 0);
        args.unshift(true);
        return this._setValue.apply(this, args);
    };

    /**
     * 根据值取消选项
     *
     * @public
     * @return {ButtonSelect}
     */
    ButtonSelect.prototype.cancelValue = function () {
        var args = [].slice.call(arguments, 0);
        args.unshift(false);
        return this._setValue.apply(this, args);
    };

    /**
     * 销毁控件
     *
     * @private
     */
    ButtonSelect.prototype.__dispose = function () {
        esui.Control.prototype.__dispose.call(this);
        this.onchange = null;
    };

    baidu.inherits(ButtonSelect, esui.Control);
    esui.ButtonSelect = ButtonSelect;
})();

esui.util.getStyle = function (el, style) {
    if (!+"\v1") {
        style = style.replace(/\-(\w)/g, function (all, letter) {
            return letter.toUpperCase();
        });
        return el.currentStyle[style];
    }
    else {
        return document.defaultView.getComputedStyle(el, null).getPropertyValue(style)
    }
};
/*
 * esui (ECOM Simple UI)
 * Copyright 2013 Baidu Inc. All rights reserved.
 * 
 * path:    esui/PlainView.js
 * desc:    平面显示控件
 * author:  killeryyl, xukai01
 */

///import esui.Control;
///import baidu.lang.inherits;
///import baidu.lang.isArray;
///import baidu.event.fire;
///import baidu.dom.addClass;
///import baidu.dom.removeClass;
///import baidu.dom.hasClass;

/**
 * 平面显示控件
 *
 * @param {Object} options 控件初始化参数
 * @param {Array} options.datasource 控件初始化参数 源数据
 * @param {Array = []} options.value 控件初始化参数 源选项值
 * @param {Number = 0} options.maxItem 控件初始化参数 最大显示条目
 * @param {String = "id"} options.valueField 控件初始化参数 值在数据源里的字段
 * @param {String = "text"} options.textField 控件初始化参数 显示文本在数据源里的字段
 * @param {boolean = "false"} options.disabled 控件初始化参数 禁用控件
 */

    // 类型声明，用于生成控件子dom的id和class
esui.PlainView = function (options) {
    // 类型声明，用于生成控件子dom的id和class
    this._type = 'plainView';

// 标识鼠标事件触发自动状态转换
    this._autoState = 0;

    esui.Control.call(this, options);

// 参数初始化
    this.__initOption('valueField', null, 'VALUE_FILED');
    this.__initOption('textField', null, 'TEXT_FILED');
    this.__initOption('delete', true, 'DELETE');
    this.autoLocate = this.convertBoolean(this.autoLocate || false);
    this.setData(this.datasource);
};
esui.PlainView.VALUE_FILED = 'id';     //指定值字段
esui.PlainView.TEXT_FILED = 'text';    //指定显示文本字段
esui.PlainView.DELETE = true;    //可删除
esui.PlainView.prototype = {

    /**
     * 赋予数据
     *
     * @public
     */
    setData: function (data) {
        var me = this;
        var valueField = me.valueField;
        var map = {};
        me.datasource = data = [].concat(data || []);
        /*var i = data.length;
         while (i--) {
         map[data[i][valueField]] = i;
         }
         me.dataMap = map;*/
        return me;
    },
    /**
     * 绘制控件
     *
     * @public
     */
    render: function () {
        var me = this;
        if (!me._isRendered) {
            esui.Control.prototype.render.call(me);
            me._isRendered = 1;
            me.height && (me.main.style.height = me.height);
            me.width && (me.main.style.width = me.width);
            me._setEvent();
        }
        var valueMap = me.valueMap = {};
        me.checkedCount = 0;
        me.main.innerHTML = me._getPlain();
        var lastClass = me.__getClass('last');
        var items = me.main.getElementsByTagName('span');
        var i = me.dataLength = items.length;
        if (i) {
            me.main.lastChild.className = lastClass;
        }
        while (i--) {
            var item = items[i];
            var value = item.getAttribute('data-value');
            var node = item.parentNode.parentNode.parentNode;
            var parent = node.parentNode;
            var mapItem = {
                valid: true,
                text: item.previousSibling.data
            };
            if (/dt/i.test(node.nodeName)) {
                mapItem.node = parent;
                parent.value = value
                parent.sub || (parent.sub = []);
            }
            else {
                mapItem.node = node;
                mapItem.parent = parent;
                node.value = value;
                if (parent.sub) {
                    parent.sub.push(value);
                }
                else {
                    parent.sub = [value];
                }
            }
            valueMap[value] = mapItem;
        }
        me.cancelValue(true, {});
        if (me.dataLength > 0) {
            me.setValue(me.value, {});
        }
        return me;
    },

    encodeHTML: function (source) {
        return String(source)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    },

    convertBoolean: function (value) {
        if (value === 'false') {
            value = false;
        }
        else if (value === 'true') {
            value = true;
        }
        return value;
    },

    // 项
    _tplDD: '<d{0}>' +
        '<a title="{2}"><div>{2}' +
        '<span data-value="{1}" {3}>×</span></div>' +
        '</a>' +
        '</d{0}>',
    /**
     * 绘制单个块
     *
     * @param {string| Array.string} value 绘制块的父级value
     */
    _getPlain: function () {
        var me = this;
        var data = me.datasource;
        var html = [];
        var valueField = me.valueField;
        var textField = me.textField;
        var i = data.length;
        var convertBoolean = me.convertBoolean;
        var clearClass = me.__getClass('row-clear');
        var getSingle = (function () {
            var encodeHTML = me.encodeHTML;
            var canDeleteProperty = convertBoolean(me['delete'])
                ? '' : 'style="display:none"';
            var tpl = me._tplDD;
            return function () {
                var a = [].slice.call(arguments, 0);
                a.push(canDeleteProperty);
                a.unshift(tpl);
                a[3] = encodeHTML(a[3]);
                return esui.util.format.apply(null, a);
            }
        })();
        while (i--) {
            var obj = data[i];
            var singleHtml = ['<dl>'];
            singleHtml.push(getSingle('t', obj[valueField], obj[textField]))
            var children = obj.children;
            if (children) {
                for (var j = 0, l = children.length; j < l; j += 1) {
                    var plain = children[j];
                    singleHtml.push(
                        getSingle('d', plain[valueField], plain[textField])
                    );
                }
            }
            singleHtml.push('<div class="' + clearClass + '"></div>');
            singleHtml.push('</dl>');
            html.unshift(singleHtml.join(''));
        }
        return html.join('');
    },
    _setEvent: function () {
        var me = this
        var lastClass = me.__getClass('last');
        var valueMap = me.valueMap;
        me.main.onclick = function (e) {
            e = e || window.event;
            var t = e.target || e.srcElement;
            if (/span/i.test(t.nodeName)) {
                var value = t.getAttribute('data-value');
                me.checkedCount -= 1;
                me.cancelValue(value, {dispatch: true});
            }
        };
    },

    _hasValidChild: function (parent) {
        var me = this
        var valueMap = me.valueMap;
        var children = parent.sub;
        var i = children.length;
        while (i--) {
            if (valueMap[children[i]].valid) {
                return true;
            }
        }
        return false;
    },

    isAllChecked: function () {
        return this.checkedCount === this.dataLength;
    },
    onchange: new Function(),
    onset: new Function(),
    ondelete: new Function(),

    /**
     * 获取当前选中的值
     *
     * @public
     * @param {boolean|string} opt_getAll 获取全部值, 为'detail'时忽略包含已选子级的值
     * @return {string} 返回已选值
     */
    getValue: function (opt_getAll) {
        var valueList = {};
        var pValueList = {};
        var value = [];
        var me = this;
        var valueMap = me.valueMap;
        var getDetail = opt_getAll === 'detail';
        for (var i in valueMap) {
            var item = valueMap[i];
            if (opt_getAll === true) {
                valueList[i] = 3;
            }
            else if (item.valid) {
                if (item.parent) {
                    var pv = item.parent.value;
                    if (pValueList[pv]) {
                        pValueList[pv]++;
                    }
                    else {
                        pValueList[pv] = 1
                    }
                }
                else {
                    pValueList[i] = pValueList[i] || 0;
                }
                valueList[i] = item.parent ? 2 : 1;
            }
        }
        for (var i in pValueList) {
            var sub = valueMap[i].node.sub;
            var j = sub.length;
            if (pValueList[i] === j) {
                if (!getDetail) {
                    while (j--) {
                        valueList[sub[j]] = 0;
                    }
                }
            }
            else {
                valueList[i] = 0;
            }
        }
        for (var i in valueList) {
            if (valueList[i] > 0) {
                value.push(i);
            }
        }
        return value;
    },
    /**
     * 获取当前选中的值
     *
     * @public
     * @param {boolean} opt_getAll 忽略父级已选获取全部
     * @return {string}
     */
    getText: function (opt_getAll, maxItem) {
        var text = [];
        var me = this;
        var m = maxItem || -1;
        var valueMap = me.valueMap;
        for (var i in valueMap) {
            if (m && (valueMap[i].valid || opt_getAll)) {
                text.push(valueMap[i].text);
                m--;
            }
        }
        return text;
    },
    locateItem: function (node) {
        var me = this;
        if (!me.autoLocate) {
            return false;
        }
        var main = me.main;
        var h = main.scrollTop - node.offsetTop + main.offsetTop + main.clientHeight;
        var s = 0;
        s = h < 0 ? h - main.clientHeight : s;
        s = h > main.clientHeight ? h - main.clientHeight : s;
        main.scrollTop -= s;
        console.log('plain view', h, s, main.scrollTop, main.clientHeight, node.offsetTop, main.offsetTop);
    },
    setValue: function (value, opt, _isSet) {
        _isSet === false || (_isSet = true);
        var me = this
        var oValue = value;
        var text;
        var valueMap = me.valueMap;
        var lastClass = me.__getClass('last');
        opt = opt || {};
        opt.append === false || (opt.append = true);
        if (value === true) {
            opt.notLocate = true;
            me.setValue(me.getValue(true), opt, _isSet);
        }
        else {
            if (_isSet && !opt.append) {
                me.cancelValue(true, {notLocate: true});
            }
            value = [].concat(value || []);
            var i = value.length;
            while (i--) {
                var item = valueMap[value[i]];
                if (!item) {
                    continue;
                }
                var node = item.node;
                var parent = item.parent;
                var next = node;
                item.valid = _isSet;
                if ((node.style.display === 'none' ? false : true) !== _isSet) {
                    me.checkedCount += _isSet ? 1 : -1;
                }
                node.style.display = _isSet
                    ? (parent ? 'inline-block' : 'block')
                    : 'none';
                if (_isSet) {
                    if (parent) {
                        me.setValue(parent.value, {onlyParent: true, notLocate: true}, true);
                    }
                    else if (!opt.onlyParent) {
                        me.setValue(node.sub, {notLocate: true});
                    }
                    while (next = next.previousSibling) {
                        if (next.className === lastClass) {
                            next.className = null;
                            node.className = lastClass;
                            break;
                        }
                    }
                    next = node;
                    if (next.className !== lastClass) {
                        while (next = next.nextSibling) {
                            if (next.style.display !== 'none') {
                                break;
                            }
                        }
                        if (!next) {
                            node.className = lastClass;
                        }
                    }
                }
                if (!_isSet) {
                    if (parent && !opt.onlySub) {
                        if (!me._hasValidChild(parent)) {
                            me.setValue(parent.value, {notLocate: true}, false);
                        }
                    }
                    else if (!parent) {
                        me.setValue(node.sub, {onlySub: true, notLocate: true}, false);
                        if (node.className === lastClass) {
                            node.className = null;
                            while (next = next.previousSibling) {
                                if (next.style.display !== 'none') {
                                    next.className = lastClass;
                                    break;
                                }
                            }
                        }
                    }
                }
                i === 0 && !opt.notLocate && _isSet && me.locateItem(node);
            }
            opt.dispatch === true && me.__onchangeHandler(_isSet, oValue);
        }
        return this;
    },

    /**
     * 根据值取消选项
     *
     * @public
     * @param {string | array | number} value 值
     * @param {boolean} opt_isDispatch 是否发送事件
     */
    cancelValue: function (value, opt) {
        return this.setValue(value, opt, false);
    },
    __onchangeHandler: function (isSet, value) {
        var me = this;
        var values = me.getValue();
        var r;
        if (isSet) {
            r = me.onset(values, value);
        }
        else {
            r = me.ondelete(values, value);
        }
        if (r === false) {
            me.setValue(value, {}, !isSet);
        }
        else {
            this.onchange(values, value);
        }
    },

    /**
     * 释放控件
     *
     * @private
     */
    __dispose: function () {
        this.ondelete = null;
        this.onset = null;
        this.onchange = null;
        esui.Control.prototype.__dispose.call(this);
    }
}
;

baidu.inherits(esui.PlainView, esui.Control);

/*
 * esui (ECOM Simple UI)
 * Copyright 2013 Baidu Inc. All rights reserved.
 * 
 * path:    esui/PlainSelect.js
 * desc:    平面选择控件
 * author:  killeryyl, dengyijun
 */

///import esui.Control;
///import baidu.lang.inherits;
///import baidu.dom.addClass;
///import baidu.dom.removeClass;

/**
 * 树状选择控件
 *
 * @param {Object} options 控件初始化参数
 * @param {Array} options.datasource 控件初始化参数 源数据
 * @param {Array = []} options.value 控件初始化参数 源选项值
 * @param {Number = 0} options.maxItem 控件初始化参数 最大显示条目
 * @param {String = "id"} options.valueField 控件初始化参数 值在数据源里的字段
 * @param {String = "text"} options.textField 控件初始化参数 显示文本在数据源里的字段
 * @param {boolean = "false"} options.disabled 控件初始化参数 禁用控件
 */

    // 类型声明，用于生成控件子dom的id和class
esui.PlainSelect = function (options) {
    // 类型声明，用于生成控件子dom的id和class
    this._type = 'plainSelect';

// 标识鼠标事件触发自动状态转换
    this._autoState = 0;

    esui.Control.call(this, options);

// 参数初始化
    this.__initOption('valueField', null, 'VALUE_FILED');
    this.__initOption('textField', null, 'TEXT_FILED');
    this.__initOption('perLine', null, 'PER_LINE');
    this.__initOption('skin', null, 'SKIN');
    this.__initOption('selectAll', true);
    this.__initOption('disabled', false);
    this.__initOption('searchable', false);
    this.__initOption('single', false);
    this.__initOption('name', esui.util.getGUID());
    this.perLine = parseInt(this.perLine, 10);
    this.perLine = this.perLine < 1 ? 4 : this.perLine;
    this.skin = this.skin || [];
    this.setData(this.datasource);
};
esui.PlainSelect.VALUE_FILED = 'id';     //指定S值字段
esui.PlainSelect.TEXT_FILED = 'text';    //指定显示文本字段
esui.PlainSelect.PER_LINE = 4;    //每行选项数目
esui.PlainSelect.SKIN = 'layer';    //皮肤，默认layer表示有悬浮层显示下级，不能支持滚动条。plain表示全平面显示，支持滚动条
esui.PlainSelect.prototype = {

    /**
     * 赋予数据
     *
     * @public
     */
    setData: function (data) {
        var me = this;
        var valueField = me.valueField;
        var map = {};
        me.datasource = data = [].concat(data || []);
        return me;
    },
    /**
     * 绘制控件
     *
     * @public
     */
    render: function () {
        var me = this;
        me.disabled = me.convertBoolean(me.disabled);
        me.searchable = me.convertBoolean(me.searchable);
        me.selectAll = me.convertBoolean(me.selectAll);
        me.single = me.convertBoolean(me.single);
        if (!me._isRendered) {
            esui.Control.prototype.render.call(me);
            me._isRendered = 1;
            if (me.single) {
                baidu.addClass(me.main, me.__getClass('single'));
            }
            me.width && (me.main.style.width = me.width);
            me.height && (me.main.style.height = me.height);
            me._setEvent();
        }
        var valueMap = me.valueMap = {};
        me.checkedCount = 0;
        me.subCount = 0;
        var skinName = me.skin.join(',');
        var skin = {name: /plain/i.test(skinName) ? RegExp.lastMatch : '', inline: /inline/i.test(skinName) && /plain/i.test(skinName)};
        switch (skin.name) {
            case 'plain':
                skin.getHTMLFn = me._getPlainHTML;
                skin.scrollWidth = 20;
                skin.perLine = 1;
                skin.parseHTML = function (item, value, opt) {
                    opt = opt || {};
                    var parent = item.parentNode.parentNode.parentNode;
                    var mapItem = {
                        node: item,
                        text: item.nextSibling.firstChild.data
                    };
                    if (/dt/i.test(parent.nodeName)) {
                        item.sub || (item.sub = []);
                    }
                    else {
                        parent = parent.parentNode.firstChild
                            .firstChild.firstChild.firstChild;
                        mapItem.parent = parent;
                        if (parent.sub) {
                            parent.sub.push(value);
                        }
                        else {
                            parent.sub = [value];
                        }
                    }
                    return mapItem;
                }
                break;
            default:
                skin.getHTMLFn = me._getLayerHTML;
                skin.scrollWidth = 0;
                skin.perLine = me.perLine;
                skin.parseHTML = function (item, value) {
                    var parent = item.parentNode;
                    var mapItem = {
                        node: item,
                        text: item.nextSibling.firstChild.data
                    };
                    if (/div/i.test(parent.nodeName)) {
                        item.sub || (item.sub = []);
                    }
                    else {
                        parent = parent.parentNode.parentNode.parentNode
                            .previousSibling.firstChild;
                        mapItem.parent = parent;
                        if (parent.sub) {
                            parent.sub.push(value);
                        }
                        else {
                            parent.sub = [value];
                        }
                    }
                    return mapItem;
                }
        }
        me.main.innerHTML = me._getHTML(skin);
        me.searchResultBox = me.main.firstChild.firstChild.lastChild;
        if (!me.searchable) {
            me.main.firstChild.style.display = 'none';
        }
        var lastClass = me.__getClass('last');
        me.main.lastChild.className = lastClass;
        me._selectAllButton = document.getElementById(me.__getId('selectAll'));
        var items = me.main.lastChild.getElementsByTagName('input');
        var i = me.dataLength = items.length;
        while (i--) {
            var item = items[i];
            var value = item.value;
            valueMap[value] = skin.parseHTML.call(me, item, value, skin);
        }
        for (i in valueMap) {
            var node = valueMap[i].node;
            if (node.sub) {
                me.subCount += 1;
                if (node.sub.length === 0) {
                    node.sub = null;
                }
                else {
                    me.subCount += 1;
                }
            }
        }
        if (me.dataLength > 0) {
            var last = me.main.lastChild;
            var divItem = last.getElementsByTagName('dd');
            if (divItem.length < 1) {
                divItem = last.getElementsByTagName('dt');
            }
            divItem = divItem[0].firstChild.firstChild;
            var perLine = me.perLine;
            if (skin.inline) {
                perLine += 1;
            }
            var divWidth = parseInt(esui.util.getStyle(divItem, 'width'), 10) || 88;
            var divHeight = parseInt(esui.util.getStyle(divItem, 'height'), 10) || 18;
            var calc = (divWidth + 13) * perLine + 40 + skin.scrollWidth;
            me.main.style.width = calc + 'px';
            me.setValue(me.value, {});
            if (skin.inline) {
                items = me.main.lastChild.getElementsByTagName('dt');
                i = items.length;
                perLine -= 1;
                while (i--) {
                    var item = items[i].firstChild.firstChild;
                    var sub = item.firstChild.sub;
                    if (sub) {
                        calc = (divHeight + 9)
                            * (Math.floor(sub.length / perLine - 0.1) + 1);
                        calc -= 9;
                        item.style.lineHeight = item.style.height = calc + 'px';
                    }
                }
                ;
            }
        }
        if (!me.selectAll || me.dataLength < 1) {
            me._selectAllButton.parentNode.style.display = 'none';
        }
        return me;
    },

    // 项
    _tplItem: '<{0} title="{2}">' +
        '<input type="{6}" value="{1}" id="{3}" name="{4}" {5}>' +
        '<label for="{3}">{2}</label>' +
        '</{0}>',
    _tplRow: '<div class="{1}">{0}<div class="{2}"></div></div>',
    _tplSearch: '<div class="{0}">' +
        '<a>' +
        '<button></button>' +
        '<div class="{1}"><input type="text" name="searchKey"></div>' +
        '<div class="{2}"></div>' +
        '</a>' +
        '</div>',
    _tplResult: '<input type="checkbox" value="{0}" id="_search_{2}" name="{2}">' +
        '<label for="_search_{2}">{1}</label>',
    _tplPreResult: '<span>{0}</span><span>&gt;</span>',
    encodeHTML: function (source) {
        return String(source)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    },

    convertBoolean: function (value) {
        if (value === 'false') {
            value = false;
        }
        else if (value === 'true') {
            value = true;
        }
        return value;
    },
    /**
     * 绘制整体
     *
     * @param {string| Array.string} value 绘制块的父级value
     */
    _getHTML: function (opt) {
        opt = opt || {};
        var me = this;
        var data = me.datasource;
        var single = me.single;
        var getHTMLFn = opt.getHTMLFn;
        var html = [];
        var perLine = opt.perLine;
        var valueField = me.valueField;
        var textField = me.textField;
        var noSubClass = ' class="' + me.__getClass('noSub') + '"';
        var rowClass = me.__getClass('row');
        var oddClass = me.__getClass('row-odd');
        var clearClass = me.__getClass('row-clear');
        var name = me.name;
        var getSingle = (function () {
            var encodeHTML = me.encodeHTML;
            var disabled = me.disabled
                ? 'disabled="disabled"' : '';
            var tpl = me._tplItem;
            var inputType = single ? 'radio' : 'checkbox';
            name += single ? '_unique_radio_' + esui.util.getGUID() : '';
            var uniqueName = 0;
            return function () {
                var a = [].slice.call(arguments, 0);
                var b = a.slice(3);
                a.length = 3;
                a.push(esui.util.getGUID());
                a.push(name + single ? uniqueName++ : '');
                a.push(disabled);
                a.push(b[0] || inputType);
                a.unshift(tpl);
                a[1] = encodeHTML(a[1]);
                a[2] = encodeHTML(a[2]);
                return esui.util.format.apply(null, a);
            }
        })();
        var i = data.length;
        var temp = [];
        while (i--) {
            var obj = data[i];
            temp.unshift(getHTMLFn.call(me, i, obj, noSubClass, valueField, textField, getSingle));
            if (i % perLine === 0 && temp) {
                html.unshift(esui.util.format(me._tplRow, temp.join(''),
                    rowClass + (html.length % 2 ? ' ' + oddClass : ''), clearClass));
                temp.length = 0;
            }
        }
        html.unshift('<dl>');
        html.push('</dl>');
        var selectAllId = me.__getId('selectAll');
        html.unshift(esui.util.format(
            me._tplRow, '<input type="checkbox" id="' + selectAllId
                + '" /><label for="' + selectAllId + '">全选</label>',
            rowClass + ' ' + oddClass + ' ' + me.__getClass('selectAll'), clearClass));
        html.unshift(esui.util.format(
            me._tplSearch,
            me.__getClass('search'), me.__getClass('search-key'),
            me.__getClass('search-result')));
        return html.join('');
    },
    /**
     * 绘制单个块 skin为layer时
     *
     * @param {string| Array.string} value 绘制块的父级value
     */
    _getLayerHTML: function (i, obj, noSubClass, valueField, textField, getSingle) {
        var singleHtml = [];
        singleHtml.push('<dd><a');
        var children = obj.children;
        children || (singleHtml.push(noSubClass));
        singleHtml.push('>');
        singleHtml.push(
            getSingle('div', obj[valueField], obj[textField], 'checkbox')
        );
        if (children) {
            var odd = 0;
            singleHtml.push('<table cellspacing="0"><tbody>');
            for (var j = 0, l = children.length; j < l; j += 1) {
                if (odd == 0) {
                    singleHtml.push('<tr>');
                }
                var plain = children[j];
                singleHtml.push(
                    getSingle('td', plain[valueField], plain[textField])
                );
                odd += 1;
                if (odd == 2) {
                    odd = 0
                    singleHtml.push('</tr>');
                }
            }
            if (odd) {
                singleHtml.push('</tr>');
            }
            singleHtml.push('</tbody></table>');
        }
        singleHtml.push('</a></dd>');
        return singleHtml.join('');
    },
    /**
     * 绘制单个块 skin为plain时
     *
     * @param {string| Array.string} value 绘制块的父级value
     */
    _getPlainHTML: function (i, obj, noSubClass, valueField, textField, getSingle) {
        var temp = [];
        temp.push('<dt><a');
        var children = obj.children;
        children || (temp.push(noSubClass));
        temp.push('>');
        temp.push(
            getSingle('div', obj[valueField], obj[textField], 'checkbox')
        );
        temp.push('</a></dt>');
        if (children) {
            for (var j = 0, l = children.length; j < l; j += 1) {
                var plain = children[j];
                temp.push('<dd><a>');
                temp.push(
                    getSingle('div', plain[valueField], plain[textField])
                );
                temp.push('</a></dd>');
            }
        }
        return temp.join('');
    },
    _setEvent: function () {
        var me = this
        var lastClass = me.__getClass('last');
        var valueMap = me.valueMap;
        me.main.onclick = function (e) {
            e = e || window.event;
            var t = e.target || e.srcElement;
            if (/input/i.test(t.nodeName)) {
                var type = t.type;
                if (/selectAll/i.test(t.id)) {
                    var tempValue = me.getValue();
                    me.setValue(true, {dispatch: !t.checked || !me.single}, t.checked);
                    if (me.single && t.checked) {
                        me.setValue(tempValue, {dispatch: true}, true);
                    }
                }
                else if (/checkbox|radio/i.test(type)) {
                    if (/_search/i.test(t.id)) {
                        t.parentNode.removeChild(t.nextSibling);
                        t.parentNode.removeChild(t);
                    }
                    else {
                        me.checkedCount += t.checked ? 1 : -1;
                    }
                    me.setValue(t.value, {dispatch: true, event: true}, t.checked);
                }
                else {
                    setTimeout(function (stop, oValue) {
                        var value = t.value;
                        if (value !== oValue) {
                            me.searchKey(t.value);
                        }
                        t.onblur = function () {
                            stop = true;
                        }
                        var fn = arguments.callee;
                        setTimeout(function () {
                                if (!stop) {
                                    fn(stop, value);
                                }
                            }
                            , 300);
                    }, 300);
                }
            }
            else if (/button/i.test(t.nodeName)) {
                me.searchKey(t.nextSibling.firstChild.value);
            }
        };
    },

    searchKey: function (keys) {
        keys = keys || '';
        keys = keys.split(/\s*[,，]\s*/);
        var me = this;
        var result = {};
        var value;
        var valueMap = me.valueMap;
        var tplPreResult = me._tplPreResult;
        var tplResult = me._tplResult;
        var resultHTML = [];
        var format = esui.util.format;
        var preResult = me.pre ? format(tplPreResult, me.pre) : '';
        for (var i = 0, l = keys.length; i < l; i += 1) {
            var key = keys[i];
            for (var j in valueMap) {
                var value = valueMap[j];
                if (!result[j] && !value.node.checked && value.text.indexOf(key) > -1) {
                    result[j] = ['<b>', value.text, '</b>'];
                    if (value.parent) {
                        result[j].unshift(format(tplPreResult, valueMap[value.parent.value].text));
                    }
                    result[j].unshift(preResult);
                    resultHTML.push(
                        format(tplResult, j, result[j].join(''), esui.util.getGUID())
                    );
                }
            }
        }
        me.searchResultBox.innerHTML = resultHTML.join('');
    },
    _isAllChildChecked: function (parent) {
        var me = this;
        var valueMap = me.valueMap;
        var children = parent.sub;
        var i = children.length;
        while (i--) {
            if (!valueMap[children[i]].node.checked) {
                return false;
            }
        }
        return true;
    },

    _hasChildChecked: function (parent) {
        var me = this
        var valueMap = me.valueMap;
        var children = parent.sub;
        var i = children.length;
        while (i--) {
            if (valueMap[children[i]].node.checked) {
                return true;
            }
        }
        return false;
    },

    isAllChecked: function () {
        return this.checkedCount === this.dataLength;
    },

    onchange: new Function(),
    onselect: new Function(),
    ondeselect: new Function(),

    /**
     * 获取当前选中的值
     *
     * @public
     * @param {boolean|string} opt_getAll 获取全部值, 为'detail'时忽略包含已选子级的值
     * @return {string} 返回已选值
     */
    getValue: function (opt_getAll) {
        var valueList = {};
        var value = [];
        var me = this;
        var valueMap = me.valueMap;
        var getDetail = opt_getAll === 'detail';
        var partialCheckedClass = me.__getClass('partial');
        for (var i in valueMap) {
            var item = valueMap[i];
            if (opt_getAll === true) {
                valueList[i] = 3;
            }
            else if (item.node.checked && item.node.className !== partialCheckedClass) {
                if (getDetail) {
                    valueList[i] = 1;
                }
                else {
                    if (item.parent) {
                        var pv = item.parent.value;
                        if (!valueList[pv]) {
                            if (valueMap[pv].node.checked && valueMap[pv].node.className !== partialCheckedClass) {
                                valueList[pv] = 2;
                            }
                            else {
                                valueList[i] = 1;
                            }
                        }
                    }
                    else {
                        valueList[i] = 1;
                    }
                }
            }
        }
        for (var i in valueList) {
            value.push(i);
        }
        return value;
    },
    /**
     * 获取当前选中的值
     *
     * @public
     * @param {boolean} opt_getAll 忽略父级已选获取全部
     * @return {string}
     */
    getText: function (opt_getAll, maxItem) {
        var text = [];
        var me = this;
        var m = maxItem || -1;
        var valueMap = me.valueMap;
        var partialCheckedClass = me.__getClass('partial');
        for (var i in valueMap) {
            if (m && (valueMap[i].node.checked && valueMap[i].node.className !== partialCheckedClass || opt_getAll)) {
                text.push(valueMap[i].text);
                m--;
            }
        }
        return text;
    },

    setValue: function (value, opt, _isSet) {
        _isSet === false || (_isSet = true);
        var me = this;
        var single = me.single;
        var oValue = value;
        var text;
        var valueMap = me.valueMap;
        opt = opt || {};
        opt.append === false || (opt.append = true);
        if (value === true) {
            me.setValue(me.getValue(true), opt, _isSet);
        }
        else {
            var partialCheckedClass = me.__getClass('partial');
            if (_isSet && !opt.append) {
                me.cancelValue(true);
            }
            var value = [].concat(value || []);
            var i = value.length;
            while (i--) {
                var item = valueMap[value[i]];
                if (!item) {
                    continue;
                }
                var node = item.node;
                var parent = item.parent;
                var sub = node.sub;
                if (node.checked !== _isSet) {
                    me.checkedCount += _isSet ? 1 : -1;
                }
                me._selectAllButton.checked = (me.checkedCount === me.dataLength
                    || (single && me.checkedCount === me.subCount));
                node.checked = _isSet;
                if (single) {
                    if (_isSet) {
                        if (sub && !opt.onlyParent) {
                            me.setValue(node.value, {onlyParent: true}, false);
                            me.setValue(sub.slice(-1)[0], {}, true);
                        }
                        else if (!opt.onlySub && parent) {
                            me.setValue(parent.sub, {onlySub: true}, false);
                            me.setValue(node.value, {onlySub: true}, true);
                            parent.className = partialCheckedClass;
                            me.setValue(parent.value, {onlyParent: true}, true);
                        }
                    }
                    else {
                        if (sub && !opt.onlyParent) {
                            me.setValue(sub, {onlySub: true}, false);
                            node.className = null;
                        }
                    }
                }
                else if (_isSet) {
                    if (parent && !opt.onlySub) {
                        if (me._isAllChildChecked(parent)) {
                            parent.className = null;
                        }
                        else {
                            parent.className = partialCheckedClass;
                        }
                        me.setValue(parent.value, {onlyParent: true}, true);
                    }
                    if (sub && !opt.onlyParent) {
                        me.setValue(sub, {onlySub: true});
                    }
                }
                else if (node.className === partialCheckedClass && !opt.onlyParent && opt.event) {
                    node.className = null;
                    me.setValue(node.value, {}, true);
                    _isSet = !single;
                }
                else {
                    if (node.className === partialCheckedClass) {
                        node.className = null;
                    }
                    if (parent && !opt.onlySub) {
                        if (me._hasChildChecked(parent)) {
                            parent.className = partialCheckedClass;
                        }
                        else {
                            parent.className = null;
                            me.setValue(parent.value, {onlyParent: true}, false);
                        }
                    }
                    if (sub && !opt.onlyParent) {
                        me.setValue(sub, {onlySub: true}, false);
                    }
                }
            }
            opt.dispatch === true && me.__onchangeHandler(_isSet, oValue);
        }
        return this;
    },

    /**
     * 根据值取消选项
     *
     * @public
     * @param {string | array | number} value 值
     * @param {boolean} opt_isDispatch 是否发送事件
     */
    cancelValue: function (value, opt) {
        return this.setValue(value, opt, false);
    },
    __onchangeHandler: function (isSet, value) {
        var me = this;
        var values = me.getValue();
        var r;
        if (isSet) {
            r = me.onselect(values, value);
        }
        else {
            r = me.ondeselect(values, value);
        }
        if (r === false) {
            me.setValue(value, {}, !isSet);
        }
        else {
            this.onchange(values, value);
        }
    },

    /**
     * 释放控件
     *
     * @private
     */
    __dispose: function () {
        this.ondeselect = null;
        this.onselect = null;
        this.onchange = null;
        esui.Control.prototype.__dispose.call(this);
    }
};

baidu.inherits(esui.PlainSelect, esui.Control);

// 增加内建表格编辑部件 - select类型
esui.Table.EditorManager.add('select',
    new esui.Table.Editor({
        /**
         * 编辑器类型
         *
         * @public
         */
        type: 'select',

        /**
         * 编辑器层内容模板
         *
         * @public
         */
        tpl: '<div ui="type:Select;id:{5}" style="margin-right: 0.5em;"></div>'
             + '<div ui="id:{0};type:Button;skin:em" style="display: none;">{2}</div>'
             + '<div ui="id:{1};type:Button;">{3}</div>'
             + '<div id="{4}" class="ui-table-editor-error"></div>',
        selectId: '_ctrlTableEditorSelectInput',

        /**
         * 初始化编辑器浮层
         *
         * @public
         */
        initLayer: function () {
            this.fillLayer([this.selectId]);
            var controlMap = this.initLayerControl();
            this.selectCtrl = controlMap[this.selectId];
            this.initButton(controlMap);
        },

        /**
         * 设置当前编辑器的值
         *
         * @public
         * @param {string} value 值内容
         */
        setValue: function (value) {
            var field = this.currentOptions.field;
            this.selectCtrl.datasource = field.datasource;
            this.selectCtrl.value = value;
            this.selectCtrl.width = field.width || 100;
            this.selectCtrl.render();
            this.selectCtrl.onchange = this.getOkHandler();
        },

        /**
         * 获取当前编辑器所编辑的值
         *
         * @public
         * @return {string}
         */
        getValue: function () {
            return this.selectCtrl.getValue();
        },
        
        getOkHandler: function () {
            var me = this;
            return function (value) {
                if (me.currentOptions.field.validator) {
                    var err = me.currentOptions.field.validator.call(me.currentTable, value, me.currentTable.datasource[me.currentOptions.rowIndex]);
                    if (err) {
                        me.setError(err);
                        return;
                    }
                }
                me.doOk();
            };
        }

    }));
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
/**
 * @file 文件上传控件
 * @author Jefferson<dengyijun@baidu.com>
 * @date Fri Dec 07 2012 13:40:38 GMT+0800 (中国标准时间)
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 */

(function () {

    /**
     * 文件上传控件，页面中有一个form，里面各个file类型的input，支持异步上传
     * 将form的action设置为可配项，并将target定到某个hidden的iframe中
     * 轮询该iframe，直到得到返回值，回调参数有上传物料的url，支持图片预览功能
     */
    mf.Upload = function () {
        var pid = -1; //setInterval的pid，定时器轮询hidden iframe
        var fInterval = 1000;
        var formId = ''; //formId 缺省是myForm
        var frameOpt = {};
        //frameOpt.fetchId {string=} 去hidden iframe 中的某个id去取url 缺省空串
        //frameOpt.frameId {string=} 缺省是hiddenFrame
        //frameOpt.errorMsg {string=} 出错标记，默认failed

        var act = ''; //记下页面初始时的action，异步上传完成后设回
        var indId; //激发upload的dom id（一个页面中可能有多个file input）
        var eleArr = []; //file input数组，某次提交要disable其他所有input
        var callMap = {}; //回调函数map，根据indId作为key
        var styleMap = {};

        /**
         * 注册事件的通用函数
         * @param {string} node Dom节点或节点id
         * @param {string} eventType 事件名称
         * @param {Function} handler 处理函数
         * @param {string=} scope 控制this指针
         */
        function on(node, eventType, handler, scope) {
            node = typeof node == 'string' ?
                document.getElementById(node) : node;
            scope = scope || node;
            if (document.all) {
                node.attachEvent("on" + eventType, function () {
                    handler.apply(scope, arguments);
                });
            } else {
                node.addEventListener(eventType, function () {
                    handler.apply(scope, arguments);
                }, false);
            }
        }

        /**
         * 绑定单个domId的上传
         * @param {Object} idCfg
         * @param {string} idCfg.id domId
         * @param {string=} idCfg.effect 事件名，默认是change
         * @param {string=} idCfg.btnId 非change态的，click激发提交的btnId
         * @param {string} idCfg.action 提交该input时可配置的表单action
         * @param {Array=} idCfg.vali 各个校验规则，待扩展
         * @param {function=} idCfg.beforeSubmit 提交前的预处理
         */
        function bind(idCfg) {
            var id = idCfg.id || '';
            var ele = document.getElementById(id);
            var effect = idCfg.effect || 'change';
            var invoker;
            if (ele) {
                eleArr.push(ele);
                callMap[id] = idCfg.callback;
                //invoker是自己，则是文件的onchange；
                //否则可以是点击上传按钮激发，那invoker就是该按钮
                if (effect === 'change') {
                    invoker = ele;
                }
                else {
                    invoker = document.getElementById(idCfg.btnId);
                }

                if (invoker) {
                    on(invoker, effect, function () {
                        if (ele.value === '') {
                            return;
                        }
                        var tempV = vali(idCfg.vali || []);
                        if (tempV.result) {
                            //其他input都置为失效
                            for (var i = 0; i < eleArr.length; ++i) {
                                if (eleArr[i].id !== id) {
                                    eleArr[i].disabled = true;
                                }
                            }
                            if (idCfg.beforeSubmit) {
                                idCfg.beforeSubmit();
                            }
                            var fm = document.getElementById(formId);
                            //将form的action置为当前input的配置值
                            fm.action = idCfg.action || act;
                            var outId = location.search.match(
                                /outId=(\d+)(?=\&|$)/);
                            if (outId 
                                && !/outId=(\d+)(?=\&|$)/.test(fm.action)) {
                                fm.action += (fm.action.indexOf('?') >= 0
                                    ? '&' : '?')
                                    + 'outId=' + outId[1];
                            }
                            fm.submit();
                            indId = id;

                            mf.loading();
                            //开始轮询
                            pid = window.setInterval(fetchUrl, fInterval);
                        }
                        else {
                            errorMsg(id, tempV.msg);
                        }
                    });
                }
            }
        }

        /**
         * 校验流程
         * @param {Object} cfg 校验相关的配置项
         */
        function vali(cfg) {
            var msg = [];
            var result = true;
            //TODO 先正常返回，待扩展
            return {
                result: result,
                msg: msg.join('')
            };
        }

        /**
         * 上传后，进行轮询，成功则激发回调函数
         */
        function fetchUrl() {
            var f = document.getElementById(frameOpt.frameId);
            f = f.contentWindow.document;
            var fEle = f.getElementById(frameOpt.fetchId);
            var success = '';
            var callback = callMap[indId];
            if (fEle) {
                success = fEle.innerHTML;
            }
            else {
                success = f.body.innerHTML;
            }
            success = success.replace(/^\s+/, '').replace(/\s+$/, '');

            //hidden iframe中有了返回值
            if (success !== '') {
                //过滤hidden frame中的某些预期之外的标签
                success = success.replace(frameOpt.filter, '');
                var ind1 = success.indexOf('{');
                var ind2 = success.lastIndexOf('}');
                success = success.substring(ind1, ind2 + 1);

                //清掉hidden frame中的返回信息
                f.body.innerHTML = '';
                //清掉定时器的pid
                window.clearInterval(pid);
                mf.loaded();
                //将form的action重新置为预设值
                document.getElementById(formId).action = act;

                //pid置位，并将其他file类型input重新置为有效
                pid = -1;
                for (var i = 0; i < eleArr.length; ++i) {
                    if (eleArr[i].id !== indId) {
                        eleArr[i].disabled = false;
                    }
                }

                var jsobj;
                try {
                    jsobj = T.json.decode(success);
                }
                catch (e) {
                    console.log('catch ', e, success);
                }
                //判断是上传成功还是出错返回
                if (!jsobj || !jsobj.model) {
                    console.log(success, jsobj);
                    errorMsg(indId, '上传文件失败！请稍候再试' +
                        '或联系管理员解决。');
                    return;
                }
                jsobj = jsobj.model;
                var uurl = '';
                //判断是否已经session失效，若是则重定向
                if (jsobj.sessionTimeout) {
                    location.reload();
                }
                else if (jsobj.formError) {
                    var html = [];
                    var err = jsobj.formError;
                    for (var attr in err) {
                        html.push(err[attr]);
                    }
                    if (jsobj.lbsUpload) {
                        callback({ lbsUpload: html.join('，') });
                    } else {
                        if (jsobj.showDetail) {
                            var aTpl = '<a target="_blank" href="{1}">' +
                                '{0}</a>';
                            html.push(
                                mf.f(aTpl, '查看详情', jsobj.showDetail));
                        }
                        errorMsg(indId, html.join('，'));
                    }
                } else {
                    mf.uploadSucceed();
                    if (jsobj.file) {
                        uurl = jsobj.file;
                    }
                    errorMsg(indId, '');
                    if (jsobj.locations) { //lbs特殊情况
                        if (callback) {
                            callback(uurl, jsobj.locations);
                        }
                        return;
                    }
                }
                showLink(indId + 'Link', uurl);
                showView(indId + 'View', uurl === '');
                injectHidden('lastName_' + indId, uurl);
                if (callback && uurl !== '') {
                    callback(uurl, jsobj);
                }
            }
        }

        /**
         * 上传成功后，显示相关物料的链接
         * @param {string} id domId
         * @param {string} url href
         */
        function showLink(id, url) {
            var showLink = document.getElementById(id);
            if (showLink) {
                showLink.getElementsByTagName('a')[0].href = url;
                showLink.style.display = url === ''
                    ? 'none' : styleMap[indId];
            }
        }

        /**
         * 上传成功后，显示预览链接
         * @param {string} id domId
         * @param {boolean=} unshow 如果是true则不显示
         */
        function showView(id, unshow) {
            var showLink = document.getElementById(id);
            if (showLink) {
                showLink.style.display = unshow ? 'none' : styleMap[indId];
            }
        }

        /**
         * 上传成功后，将信息注入到hidden input
         * @param {string} id domId
         * @param {string} url href
         */
        function injectHidden(id, url) {
            var hidden = document.getElementById(id);
            if (hidden) {
                hidden.value = url;
            }
        }

        /**
         * 上传失败后，显示失败信息
         * @param {string} id domId
         * @param {string} msg innerHTML
         */
        function errorMsg(id, msg) {
            id = 'lastName_' + id + 'Error';
            var errorDiv = document.getElementById(id);
            if (errorDiv) {
                errorDiv.innerHTML = msg;
            }
        }

        /**
         * 为解决浏览器兼容性，所以隐藏file类型的input控件，用esui的button取代
         * @param {Object} idCfg
         */
        function hide(idCfg) {
            var id = idCfg.id;
            var btnId = idCfg.btnId || (idCfg.id + 'Upload');
            var btn = document.getElementById(btnId);
            var ele = document.getElementById(id);
            styleMap[id] = idCfg.style || 'block';
            if (btn) {
                if (document.all) {
                    ele.className = idCfg.className || 'myFile';
                    ele.hideFocus = true;
                } else {
                    ele.style.display = 'none';
                    on(btn, 'click', function () {
                        ele.click();
                    });
                }
                btn.style.display = styleMap[id];
            }
        }

        return {
            /**
             * 注册一个页面的所有file类型的input
             * @param {Object} cfg
             * @param {Array<Object>=} cfg.ids 相关input的id数组
             * @param {string=} cfg.action 整个页面表单原先的action
             * @param {string=} cfg.formId 表单的id
             * @param {Object=} cfg.frameOpt hiddenFrame的配置项
             * @param {Object=} cfg.info 和cfg.ids对应，适用于一次注册单个
             */
            reg: function (cfg) {
                var ids = cfg.ids || [];
                if (formId === '') {
                    formId = cfg.formId || 'myForm';
                }
                var fm = document.getElementById(formId);
                if (!fm) {
                    return;
                }
                if (act === '') {
                    act = cfg.action || fm.action;
                }

                if (!frameOpt.frameId) {
                    frameOpt = cfg.frameOpt || {
                        frameId: 'hiddenFrame',
                        fetchId: '',
                        errorMsg: 'failed',
                        filter: /<\/{0,1}[a-z]+>/g
                    };
                    if (!document.getElementById(frameOpt.frameId)) {
                        var myFrame = document.createElement("iframe");
                        myFrame.id = frameOpt.frameId;
                        myFrame.name = frameOpt.frameId;
                        myFrame.style.display = 'none';
                        document.body.appendChild(myFrame);
                    }
                }
                if (ids.length === 0) {
                    ids = [cfg.info];
                }
                for (var i = 0; i < ids.length; ++i) {
                    bind(ids[i]);
                    if (!(ids[i].hide)) {
                        hide(ids[i]);
                    }
                }
            }
        };
    };
})();
/**
 * @file Generated by er-sync
 * @author Jeffersondyj<dengyijun@baidu.com>
 * @date Tus July 30 2013 13:23:38 GMT+0800 (China Standard Time)
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 */

/**
 * ma和app公用的相关函数
 */

(function () {
    /**
     * @param {Object} opt
     *   model {Object} 后端回传的data
     *   reflect {Object=} 字段映射规则
     *   keys {Array} 回传data的索引，用来的和dom中的eleId绑定
     * @public
     */
    mf.postError = function (opt) {
        var model = opt.model;
        var leftError = {};
        var keys = opt.keys || [];
        for (var i in model) {
            var index = mf.m.utils.deepSearch(keys, i, 'key');
            var id = index > -1 ? keys[index].dom : i;
            var dom = $('#' + id + 'Error');
            if (dom.length) {
                dom.html(model[i]).show();
                dom[0].scrollIntoView(); //将比较前面的post错误定位显示
            } else {
                leftError[i] = model[i];
            }
        }
        if (!$.isEmptyObject(leftError)) {
            mf.formErrorHandler({
                formError: leftError,
                reflect: opt.reflect
            });
        }
    };
    var commandElement = mf.m.commandElement;
    if (commandElement) {
        mf.clickCommand = commandElement('click');
        /*
         * 全局“展开/收起”命令
         * 命令元素必须包含 data-cmd="toggleExpend" data-target="targetId"
         * 可选参数
         * data-open="展开时文本"
         * data-close="收起时文本"
         * data-method="" 收起展开时对应的方式，visibility | display , 默认 display
         * 元素可选事件 onshow, onhide，事件需预先赋值给targetId元素。
         * 事件返回false时将中断行为
         */
        mf.clickCommand.register(
            {
                cmd: 'toggleExpend',
                handle: function (options) {
                    var target = document.getElementById(options.target);
                    if (!target) {
                        return true;
                    }
                    var ele = this.target;
                    var txtOpen = ele.txtOpen || options.open;
                    var txtClose = ele.txtClose || options.close;
                    var method = options.method || 'display';
                    var onshow = target.onshow;
                    var onhide = target.onhide;
                    if (ele.isOpened) {
                        if (onhide && onhide() === false) {
                            return true;
                        }
                        txtOpen = txtOpen || ele.innerHTML || '收起';
                        ele.isOpened = false;
                        ele.txtOpen = txtOpen;
                        ele.innerHTML = txtClose || '展开';
                        method === 'visibility'
                            ? target.style.visibility = 'hidden'
                            : target.style.display = 'none';
                    } else {
                        if (onshow && onshow() === false) {
                            return true;
                        }
                        txtClose = txtClose || ele.innerHTML || '展开';
                        ele.isOpened = true;
                        ele.txtClose = txtClose;
                        ele.innerHTML = txtOpen || '收起';
                        if (/absolute|fixed/i.test($(target).css('position'))) {
                            target.style.top = ($(ele).offset().top
                                - $(ele.parentNode).offset().top + 26) + 'px';
                        }
                        method === 'visibility'
                            ? target.style.visibility = 'visible'
                            : target.style.display = 'block';
                    }
                }
            }
        );
    }
})();
