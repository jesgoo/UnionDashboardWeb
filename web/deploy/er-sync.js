/**
 * @file ER(Enterprise RIA) Sync
 *
 * @author Luy<xukai01@baidu.com>
 * @date 2012-11-04
 */
var fs = require('fs'),
    copy = require('fs.extra').copy,
    path = require('path'),
    fm = require('util').format;

/**
 * 根据sitemap.js自动生成或同步整个站点的项目结构;
 * 同时生成调试数据及前后端数据接口文件
 *
 * @constructor
 * @param {string} site
 * @param {string} basedir
 */
function Sync(site, basedir) {
    console.log('Sync', site, 'at', basedir);
    if (!site || !basedir) {
        console.error('empty param');
        return;
    }

    this.basedir = basedir;
    this.site = site;
    this.MAP_FILE = 'sitemap.js';
    this.moduleFiles = [];  //for PROP_FILE
    this.pageFiles = [];  //for PROP_FILE
    this.dataFiles = [];  //for DATA_INC_FILE
    this.jsFiles = [];  //for PROP_FILE
    this.cssFiles = []; //for PROP_FILE
    this.htmlFiles = [];//for PROP_FILE
    this.propCache = [];//for PROP_FILE_CATCH
    this.cache = {}; //tpl cache

    this.BASE_ASSET_DIR = path.join(basedir, 'asset');
    this.BASE_MODULE_DIR = path.join(this.BASE_ASSET_DIR, 'module');
    this.SITE_DIR = path.join(basedir, site);
    this.ASSET_DIR = path.join(this.SITE_DIR, 'asset');
    this.ASSET_IMG_DIR = path.join(this.ASSET_DIR, 'img');
    this.ASSET_MODULE_DIR = path.join(this.ASSET_DIR, 'module');
    this.DATA_DIR = path.join(this.SITE_DIR, 'data');
    this.DATA_INC_FILE = path.join(this.DATA_DIR, site + '-data.inc');
    this.SRC_DIR = path.join(this.SITE_DIR, 'src');
    this.BUILD_FILE = path.join(this.SITE_DIR, 'build.xml');
    this.BUILD_PAGE_FILE = path.join(this.SITE_DIR, 'build-page.xml');
    this.PROP_FILE = path.join(this.SITE_DIR, 'gen.properties');
    this.FAVICON_FILE = path.join(this.SITE_DIR, 'favicon.ico');
    this.SITE_JS_FILE = path.join(this.ASSET_DIR, site + '.js');
    this.SITE_MAP_JS_FILE = path.join(this.SITE_DIR, this.MAP_FILE);
    this.SITE_CSS_FILE = path.join(this.ASSET_DIR, site + '.css');
    this.SITE_HTML_FILE = path.join(this.ASSET_DIR, site + '.html');

    var TPL_DIR = path.join(__dirname, 'er-sync');
    this.BUILD_TPL = path.join(TPL_DIR, 'build.xml.tpl');
    this.BUILD_PAGE_TPL = path.join(TPL_DIR, 'build-page.xml.tpl');
    this.PROP_TPL = path.join(TPL_DIR, 'gen.properties.tpl');
    this.FAVICON_TPL = path.join(TPL_DIR, 'favicon.ico');
    this.MODULE_TPL = path.join(TPL_DIR, 'module.tpl');
    this.SITE_JS_TPL = path.join(TPL_DIR, 'site.js.tpl');
    this.SITE_CSS_TPL = path.join(TPL_DIR, 'site.css.tpl');
    this.SITE_HTML_TPL = path.join(TPL_DIR, 'site.html.tpl');
    this.PAGE_JS_TPL = path.join(TPL_DIR, 'page.js.tpl');
    this.PAGE_HTML_TPL = path.join(TPL_DIR, 'page.html.tpl');
    this.MODULE_JS_TPL = path.join(TPL_DIR, 'module.js.tpl');
    this.MODULE_ACTIONS_JS_TPL = path.join(TPL_DIR, 'module.actions.js.tpl');
    this.MODULE_MODEL_JS_TPL = path.join(TPL_DIR, 'module.model.js.tpl');
    this.ACTION_JS_TPL = path.join(TPL_DIR, 'action.js.tpl');
    this.ACTION_CSS_TPL = path.join(TPL_DIR, 'action.css.tpl');
    this.ACTION_HTML_TPL = path.join(TPL_DIR, 'action.html.tpl');
    this.ACTION_MODEL_JS_TPL = path.join(TPL_DIR, 'action.model.js.tpl');
    this.ACTION_DATA_TPL = path.join(TPL_DIR, 'action.data.js.tpl');
    this.DATA_INC_TPL = path.join(TPL_DIR, 'data.inc.tpl');
    this.syncSite();
}

exports.Sync = Sync;

Sync.ENCODING = 'utf-8';
//Sync.prototype.syncCommonModule = function (basedir) {
//    var me = Sync.prototype;
//    console.log('Sync module');
//    var BASE_ASSET_DIR = path.join(basedir, 'asset');
//    var MODULE_DIR = path.join(BASE_ASSET_DIR, 'module');
//    me.syncDir(MODULE_DIR);
//    var MODULE_MAP = path.join(BASE_ASSET_DIR, 'module.js');
//    if (!fs.existsSync(MODULE_MAP)) {
//        console.error(MODULE_MAP + ' not found');
//        return;
//    }
//    var modules = require(MODULE_MAP).MODULE;
//    for (var i in modules) {
//        var moduleFile = path.join(MODULE_DIR, i + '.js');
//        var captions = modules[i];
//        me.syncFile(moduleFile, me.render(me.MODULE_TPL, {
//            id: i,
//            caption: captions || '',
//            namespace: 'mf'
//        }))
//    }
//};

/**
 * Sync site
 * 同步文件，存在则跳过
 * 数据源：{site}/asset/map.js
 * 同步文件：{site}/src
 * 粒度大小：site > page > module > action
 *
 * @public
 */
Sync.prototype.syncSite = function () {
    var me = this;
    var mapPath = me.SITE_MAP_JS_FILE;
    //准入条件
    if (!fs.existsSync(mapPath)) {
        console.error(me.MAP_FILE + ' not found');
        return;
    }
    //sitemap.js可作为模块运行于node环境
    me.map = require(mapPath).MAP;

    //site环境创建
    console.log('Sync', me.site);
    me.syncDir(me.ASSET_DIR);
    me.syncDir(me.ASSET_MODULE_DIR);
    me.syncDir(me.ASSET_IMG_DIR);
    me.syncDir(me.SRC_DIR);
    me.syncDir(me.DATA_DIR);
    me.syncFile(me.BUILD_FILE, me.render(me.BUILD_TPL, {}));
    fs.existsSync(me.FAVICON_FILE) || copy(me.FAVICON_TPL, me.FAVICON_FILE);//此处为异步，小风险    
    me.syncFile(me.SITE_JS_FILE, me.render(me.SITE_JS_TPL, { site: me.site }));
    me.syncFile(me.SITE_CSS_FILE, me.render(me.SITE_CSS_TPL, {site: me.site}));
    me.syncFile(me.SITE_HTML_FILE, me.render(me.SITE_HTML_TPL, {site: me.site}));
    me.MODULE_LIST = [];
    me.privateModuleJSFiles = [];
    me.privateModuleCSSFiles = [];
    me.privateModuleHTMLFiles = [];
    me.commonModuleJSFiles = [];
    me.commonModuleCSSFiles = [];
    me.commonModuleHTMLFiles = [];
    var module = me.map.__module || {};
    for (var m in module) {
        if (module.hasOwnProperty(m)) {
            if (module[m].private) {
                var moduleFile = path.join(me.ASSET_MODULE_DIR, m + '.js');
                if (!fs.existsSync(moduleFile)) {
                    me.syncFile(moduleFile, me.render(me.MODULE_TPL, {
                        id: m,
                        namespace: 'mf'
                    }))
                }
                if (fs.existsSync(path.join(me.ASSET_MODULE_DIR, m + '.css'))) {
                    me.privateModuleCSSFiles.push(m + '.css');
                }
                if (fs.existsSync(path.join(me.ASSET_MODULE_DIR, m + '.html'))) {
                    me.privateModuleHTMLFiles.push(m + '.html');
                }
                console.log('load site private module', m);
                me.privateModuleJSFiles.push(m + '.js');
            } else {
                console.log('load site common module', m);
                if (fs.existsSync(path.join(me.BASE_MODULE_DIR, m + '.css'))) {
                    me.commonModuleCSSFiles.push(m + '.css');
                }
                if (fs.existsSync(path.join(me.BASE_MODULE_DIR, m + '.html'))) {
                    me.commonModuleHTMLFiles.push(m + '.html');
                }
                me.commonModuleJSFiles.push(m + '.js');
                me.MODULE_LIST.push(m);
            }
        }
    }
    me.propCache.push(me.site + 'sitecommonmodulejs.files=' + me.commonModuleJSFiles.join(' '));
    me.propCache.push(me.site + 'sitecommonmodulecss.files=' + me.commonModuleCSSFiles.join(' '));
    me.propCache.push(me.site + 'sitecommonmodulehtml.files=' + me.commonModuleHTMLFiles.join(' '));
    me.propCache.push(me.site + 'siteprivatemodulejs.files=' + me.privateModuleJSFiles.join(' '));
    me.propCache.push(me.site + 'siteprivatemodulecss.files=' + me.privateModuleCSSFiles.join(' '));
    me.propCache.push(me.site + 'siteprivatemodulehtml.files=' + me.privateModuleHTMLFiles.join(' '));
    //pages
    for (var page in me.map) {
        if (me.map.hasOwnProperty(page)) {
            if (page.indexOf('__') === 0) {
                continue;
            }
            me.syncPage(page);
        }
    }

    me.syncDir(me.BASE_MODULE_DIR);
    me.MODULE_LIST.forEach(function (m) {
        var moduleFile = path.join(me.BASE_MODULE_DIR, m + '.js');
        if (!fs.existsSync(moduleFile)) {
            me.syncFile(moduleFile, me.render(me.MODULE_TPL, {
                id: m,
                namespace: 'mf'
            }))
        }
    });
    //最后完成PROP_FILE替换
    me.propCache.push(Sync.ENCODING);
    fs.writeFileSync(me.PROP_FILE, me.propCache.join('\n'));
    console.log('Sync', me.PROP_FILE);
    //最后完成页面公共文件替换
    fs.writeFileSync(me.BUILD_PAGE_FILE, fm('<?xml version="1.0"?><project default="buildPage"><target name="buildPage">%s</target></project>', me.pageFiles.join('\n')));
    console.log('Sync', me.BUILD_PAGE_FILE);

    //生成数据接口文件
    var dataInc = [];
    for (var i = 0; i < me.dataFiles.length; ++i) {
        var dataPath = me.dataFiles[i];
        var dataAbsPath = path.join(me.DATA_DIR, dataPath);
        var data = fs.readFileSync(dataAbsPath, Sync.ENCODING);

        var REQ_TOKEN = 'exports.request = ';
        var RES_TOKEN = 'exports.response = ';

        var dataFormatter = require(dataAbsPath);
        var req = dataFormatter.request;
        var isPost = !!dataFormatter.POST;
        var p = '/' + dataPath.replace(/\\/g, '/').replace(/\.js$/, ''); //windows path seprator
        var url = fm('%s %s.json', isPost ? 'POST' : 'GET', p);
        if (!isPost) {
            var qs = [];
            for (var q in req) {
                if (req.hasOwnProperty(q)) {
                    qs.push(fm('%s=%s', q, encodeURIComponent(req[q])));
                }
            }
            url += (qs.length ? '?' + qs.join('&') : '');
        }
        //remove trail, add intent, remove last colon
        var reqTxt = data.substring(data.indexOf(REQ_TOKEN) + REQ_TOKEN.length, data.indexOf(RES_TOKEN))
            .replace(/^\s*|\s*$/g, '').replace(/\n/g, '\n    ').replace(/\s*;$/g, '');
        var resTxt = data.substring(data.indexOf(RES_TOKEN) + RES_TOKEN.length)
            .replace(/^\s*|\s*$/g, '').replace(/\n/g, '\n    ').replace(/\s*;$/g, '');
        //console.log(req, res);

        dataInc.push(me.render(me.DATA_INC_TPL, {
            path: p,
            request: reqTxt,
            response: resTxt,
            requestUrl: url
        }));
    }

    fs.writeFileSync(me.DATA_INC_FILE, dataInc.join(''), Sync.ENCODING);
    console.log('Sync', me.DATA_INC_FILE);
};

/**
 * Sync page
 *
 * @public
 */
Sync.prototype.syncPage = function (page) {
    var me = this;
    console.log('Sync', me.site, page);

    var PAGE_HTML_FILE = path.join(me.SITE_DIR, page + '.html');
    var PAGE_DIR = path.join(me.SRC_DIR, page);
    var PAGE_MODULE_DIR = path.join(me.SRC_DIR, page, 'module');
    var PAGE_JS_FILE = path.join(me.SRC_DIR, page + '.js');
    me.jsFiles = [];
    me.cssFiles = [];
    me.htmlFiles = [];
    me.privateModuleJSFiles = [];
    me.privateModuleCSSFiles = [];
    me.privateModuleHTMLFiles = [];
    me.siteCommonModuleJSFiles = [];
    me.siteCommonModuleCSSFiles = [];
    me.siteCommonModuleHTMLFiles = [];
    me.commonModuleJSFiles = [];
    me.commonModuleCSSFiles = [];
    me.commonModuleHTMLFiles = [];

    me.pageFiles.push(me.render(me.BUILD_PAGE_TPL, { page: page, site: me.site }));

    me.syncDir(PAGE_DIR);
    me.syncDir(PAGE_MODULE_DIR);

    var mockData = me.map[page]['__mockData'];
    if (mockData) {
        me.syncMockData(page, '', mockData);
    }

    var module = me.map[page]['__module'] || {};
    for (var m in module) {
        if (module.hasOwnProperty(m)) {
            console.log('load page module', m);
            if (module[m].private) {
                var moduleFile = path.join(PAGE_MODULE_DIR, m + '.js');
                if (!fs.existsSync(moduleFile)) {
                    me.syncFile(moduleFile, me.render(me.MODULE_TPL, {
                        id: m,
                        namespace: 'mf'
                    }))
                }
                if (fs.existsSync(path.join(PAGE_MODULE_DIR, m + '.css'))) {
                    me.privateModuleCSSFiles.push(m + '.css');
                }
                if (fs.existsSync(path.join(PAGE_MODULE_DIR, m + '.html'))) {
                    me.privateModuleHTMLFiles.push(m + '.html');
                }
                console.log('load page private module', m);
                me.privateModuleJSFiles.push(m + '.js');
            } else {
                moduleFile = path.join(me.ASSET_MODULE_DIR, m + '.js');
                if (fs.existsSync(moduleFile)) {
                    if (fs.existsSync(path.join(me.ASSET_MODULE_DIR, m + '.css'))) {
                        me.siteCommonModuleCSSFiles.push(m + '.css');
                    }
                    if (fs.existsSync(path.join(me.ASSET_MODULE_DIR, m + '.html'))) {
                        me.siteCommonModuleHTMLFiles.push(m + '.html');
                    }
                    console.log('load site private module', m);
                    me.siteCommonModuleJSFiles.push(m + '.js');
                } else {
                    console.log('load page common module', m);
                    if (fs.existsSync(path.join(me.BASE_MODULE_DIR, m + '.css'))) {
                        me.commonModuleCSSFiles.push(m + '.css');
                    }
                    if (fs.existsSync(path.join(me.BASE_MODULE_DIR, m + '.html'))) {
                        me.commonModuleHTMLFiles.push(m + '.html');
                    }
                    me.commonModuleJSFiles.push(m + '.js');
                    me.MODULE_LIST.push(m);
                }
            }
        }
    }

    me.syncFile(PAGE_HTML_FILE, me.render(me.PAGE_HTML_TPL, {site: me.site, page: page}));
    me.syncFile(PAGE_JS_FILE, me.render(me.PAGE_JS_TPL, {site: me.site, page: page}));

    me.jsFiles.push(fm('%s.js', page));

    var modules = me.map[page];
    for (var module in modules) {
        if (modules.hasOwnProperty(module) && module.indexOf('__') != 0) {//排除__nav
            me.syncModule(page, module);
        }
    }

    me.propCache.push(me.render(me.PROP_TPL, {
        'commonmodulejs': me.commonModuleJSFiles.join(' '),
        'siteCommonmodulejs': me.siteCommonModuleJSFiles.join(' '),
        'privatemodulejs': me.privateModuleJSFiles.join(' '),
        'commonmodulecss': me.commonModuleCSSFiles.join(' '),
        'siteCommonmodulecss': me.siteCommonModuleCSSFiles.join(' '),
        'privatemodulecss': me.privateModuleCSSFiles.join(' '),
        'commonmodulehtml': me.commonModuleHTMLFiles.join(' '),
        'siteCommonmodulehtml': me.siteCommonModuleHTMLFiles.join(' '),
        'privatemodulehtml': me.privateModuleHTMLFiles.join(' '),
        'js': me.jsFiles.join(' '),
        'css': me.cssFiles.join(' '),
        'html': me.htmlFiles.join(' '),
        'page': page
    }));
};

/**
 * Sync module
 *
 * @public
 * @param {string} page
 * @param {string} module
 */
Sync.prototype.syncModule = function (page, module) {
    var me = this;
    console.log('Sync', me.site, page, module);

    var MODULE_DIR = path.join(me.SRC_DIR, page, module);
    var MODULE_ACTIONS_JS_FILE = path.join(me.SRC_DIR, page, module + '.actions.js');
    var MODULE_JS_FILE = path.join(me.SRC_DIR, page, module + '.js');
    var MODULE_MODEL_DIR = path.join(MODULE_DIR, 'model');
    var MODULE_MODEL_JS_FILE = path.join(MODULE_DIR, 'model.js');

    me.syncDir(MODULE_DIR);
    me.syncFile(MODULE_MODEL_JS_FILE, me.render(me.MODULE_MODEL_JS_TPL, {site: me.site, page: page, module: module}));
    me.syncDir(MODULE_MODEL_DIR);

    me.jsFiles.push(fm('%s/%s.actions.js', page, module));
    me.jsFiles.push(fm('%s/%s.js', page, module));
    me.jsFiles.push(fm('%s/%s/model.js', page, module));

    var actions = me.map[page][module];
    var action;
    var routes = [];
    for (action in actions) {
        if (actions.hasOwnProperty(action) && action.indexOf('__') != 0) {//排除__mockData
            var actionItem = {
                path: fm('/%s/%s', module, action),
                action: fm('mf.%s.%s.%s', page, module, action)
            };
            var actionsMap = actions[action];
            if (actionsMap.authority) {
                actionItem.authority = actionsMap.authority;
            }
            if (actionsMap.noAuthLocation) {
                actionItem.noAuthLocation = actionsMap.noAuthLocation;
            }
            routes.push(actionItem);
        }
    }
    fs.writeFileSync(MODULE_ACTIONS_JS_FILE,
        me.render(me.MODULE_ACTIONS_JS_TPL, {site: me.site, page: page, module: module, actions: JSON.stringify(routes)}),
        Sync.ENCODING);
    console.log('Sync', MODULE_ACTIONS_JS_FILE);
    me.syncFile(MODULE_JS_FILE, me.render(me.MODULE_JS_TPL, {site: me.site, page: page, module: module}));

    for (action in actions) {
        if (actions.hasOwnProperty(action)) {
            if (action.indexOf('__') === 0) {
                me.syncMockData(page, module, actions[action]);
            }
            else {
                me.syncAction(page, module, action);
            }
        }
    }
};

/**
 * Sync action
 *
 * @public
 * @param {string} page
 * @param {string} module
 * @param {string} action
 */
Sync.prototype.syncAction = function (page, module, action) {
    var me = this;
    console.log('Sync', me.site, page, module, action);

    var MODULE_DIR = path.join(me.SRC_DIR, page, module);
    var ACTION_JS_FILE = path.join(MODULE_DIR, action + '.js');
    var ACTION_CSS_FILE = path.join(MODULE_DIR, action + '.css');
    var ACTION_HTML_FILE = path.join(MODULE_DIR, action + '.html');
    var ACTION_MODEL_JS_FILE = path.join(MODULE_DIR, 'model', action + '.js');
    var ACTION_DATA_PAGE_DIR = path.join(me.DATA_DIR, page);
    var ACTION_DATA_DIR = path.join(me.DATA_DIR, page, module);
    var ACTION_DATA_FILE = path.join(me.DATA_DIR, page, module, action + '.js');

    me.syncFile(ACTION_JS_FILE, me.render(me.ACTION_JS_TPL, {site: me.site, page: page, module: module, action: action}));
    me.syncFile(ACTION_CSS_FILE, me.render(me.ACTION_CSS_TPL, {site: me.site, page: page, module: module, action: action}));
    me.syncFile(ACTION_HTML_FILE, me.render(me.ACTION_HTML_TPL, {site: me.site, page: page, module: module, action: action}));
    me.syncFile(ACTION_MODEL_JS_FILE, me.render(me.ACTION_MODEL_JS_TPL, {site: me.site, page: page, module: module, action: action}));
    me.syncDir(ACTION_DATA_PAGE_DIR);
    me.syncDir(ACTION_DATA_DIR);
    me.syncFile(ACTION_DATA_FILE, me.render(me.ACTION_DATA_TPL, {site: me.site, page: page, module: module, action: action}));

    me.jsFiles.push(fm('%s/%s/model/%s.js', page, module, action));
    me.jsFiles.push(fm('%s/%s/%s.js', page, module, action));
    me.cssFiles.push(fm('%s/%s/%s.css', page, module, action));
    me.htmlFiles.push(fm('%s/%s/%s.html', page, module, action));
    me.dataFiles.push(fm('%s/%s/%s.js', page, module, action));
};

/**
 * Sync mockData
 *
 * @public
 * @param {string} page
 * @param {string} module
 * @param {string} dataNames
 */
Sync.prototype.syncMockData = function (page, module, dataNames) {
    var me = this;
    var ACTION_DATA_DIR = path.join(me.DATA_DIR, page, module);
    me.syncDir(ACTION_DATA_DIR);
    for (var name in dataNames) {
        console.log('Sync', me.site, page, module, name, 'mockData');
        var ACTION_DATA_FILE = path.join(ACTION_DATA_DIR, name + '.js');
        me.syncFile(ACTION_DATA_FILE, me.render(me.ACTION_DATA_TPL, {site: me.site, page: page, module: module, action: name}));
        me.dataFiles.push(fm('%s%s%s.js', page ? page + '/' : '', module ? module + '/' : '', name));
    }
};

/**
 * 获取模板文件内容
 * 有缓存
 *
 * @public
 * @param {string} tplPath 模板文件路径
 * @return {string}
 */
Sync.prototype.getTpl = function (tplPath) {
    var me = this;
    me.cache = me.cache || {};
    if (me.cache[tplPath]) {
        return me.cache[tplPath];
    }
    else {
        var content = fs.readFileSync(tplPath, Sync.ENCODING);
        me.cache[tplPath] = content;

        return content;
    }
};

/**
 * 渲染模板文件
 *
 * @public
 * @param {string} tplPath 模板文件路径
 * @param {object} data 替换列表
 * @see tangram baidu.string.format 简化版，移除浏览器兼容处理
 */
Sync.prototype.render = function (tplPath, data) {
    data = data || {};
    var me = this;

    //版权信息
    data.ersync = data.ersync || 'Generated by er-sync';
    data.author = data.author || 'Luics<xukai01@baidu.com>';
    data.date = data.date || new Date();
    data.copyright = data.copyright || 'Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved';

    var source = me.getTpl(tplPath);

    return source.replace(/\{#(.+?)\}/g, function (match, key) {//match==$1, key==$2
        var replacer = data[key];
        return ('undefined' == typeof replacer ? '' : replacer);
    });
};

/**
 * 同步目录
 *
 * @public
 * @param {string} dir
 */
Sync.prototype.syncDir = function (dir) {
    if (!fs.existsSync(dir)) {
        console.log('\t', dir);
        fs.mkdirSync(dir);
    }
};

/**
 * 同步文件
 *
 * @public
 * @param {string} descPath
 * @param {string} data
 */
Sync.prototype.syncFile = function (descPath, data) {
    if (!fs.existsSync(descPath)) {
        console.log('\t', descPath);
        fs.writeFileSync(descPath, data, Sync.ENCODING);
    }
};