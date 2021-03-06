/**
 * @file Generated by er-sync, module
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Sun Sep 28 2014 10:29:14 GMT+0800 (中国标准时间)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 * shortcut mf.m.datafileEdit
 */
(function (exports, module) {
    var datafileEdit = function (opt) {
        var getList = opt.list;
        var getContent = opt.content;
        var saveContent = opt.save;
        var publish = opt.publish;
        mf.get(
            getList,
            function (model) {
                var fileList = $.map(model.fileList || [], function (n) {
                    return {
                        text: n,
                        id: n
                    }
                });
                esui.get('fileList').datasource = {
                    id: 'json',
                    text: 'JSON数据文件',
                    children: fileList
                };
                esui.get('fileList').render();
            }
        );
        var fileName = esui.get('fileName');
        var fileContent = esui.get('text');
        var currentFile;
        var loadFile = function (filename) {
            currentFile = filename;
            fileName.setContent(filename + ' 获取中...');
            mf.loading();
            mf.get(getContent + '?filename=' + filename, function (model) {
                mf.loaded();
                fileName.setContent(filename + ' 编辑');
                var content = decodeURIComponent(model.content);
                fileContent.setValue(content);
            });
        };
        var saveFile = function () {
            if (!currentFile) {
                return false;
            }
            fileName.setContent(currentFile + ' 保存中...');
            var content = fileContent.getValue();
            try {
                JSON.parse(content);
            } catch (e) {
                fileName.setContent(currentFile + ' 格式错误...');
                return false;
            }
            mf.loading();
            mf.post(saveContent, {
                    filename: currentFile,
                    content: encodeURIComponent(content)
                },
                function () {
                    mf.loaded();
                    fileName.setContent(currentFile + ' 编辑');
                });
        };
        esui.get('fileList').onchange = loadFile;
        esui.get('saveFile').onclick = saveFile;

        if (publish) {
            $('.web-publish').show();
            var getPublishWeb = function () {
                var me = this;
                mf.get(publish + '?type=list', function (model) {
                    var pageList = $.map(model.list || [], function (n) {
                        return {
                            text: n,
                            id: n
                        }
                    });
                    esui.get('pageList').datasource = {
                        id: 'json',
                        text: 'page地址',
                        children: pageList
                    };
                    esui.get('pageList').render();
                });
            };
            var publishWeb = function () {
                var me = this;
                me.disable();
                var info = esui.get('publishProcess');
                info.setContent('发布中..');
                mf.loading();
                mf.get(publish + '?type=publish', function (model) {
                    mf.loaded();
                    info.setContent(model.message);
                    setTimeout(function () {
                        info.setContent('');
                        me.enable();
                    }, 3000);
                });
            };
            var previewPage = function (page) {
                mf.loading();
                mf.get(page + '?saveToFile=false&printOut=false', function (model) {
                    mf.loaded();
                    var newWindow = window.open('about:blank', null,
                            'left=0, top=0, height=' + document.documentElement.clientHeight + ',width=' + document.documentElement.clientWidth);
                    newWindow.document.write(decodeURIComponent(model.content));
                });
            };
            esui.get('publish').onclick = publishWeb;
            esui.get('pageList').onchange = previewPage;
            esui.get('getPublish').onclick = getPublishWeb;
            getPublishWeb();
        } else {
            $('.web-publish').hide();
        }
        
    };
    exports.datafileEdit = datafileEdit;
})(mf && mf.m || exports || {}, mf || module);