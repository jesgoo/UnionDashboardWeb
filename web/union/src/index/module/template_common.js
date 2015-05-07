function generatePreview(styleName, elementID, customLayout, getMockData) {
    return function (scaleOption, contentOption) {
        var scaleData = scaleOption;
        var layoutData = customLayout(scaleOption);
        var contentData = contentOption.getData();
        var templateData = getMockData();
        console.log('preview', contentData, layoutData, scaleData);
        var customJS = generator(styleName, contentData, layoutData, scaleData);
        mf.m.preview.previewCustomJS(null, templateData, 'layoutDemo_' + elementID, customJS);
        //$('#coder').val(html);
        //$('#coder1').val(htmlRender(templateData));
    };
}/*function generatePreview(elementID, customLayout, getMockData) {
    return function (scaleOption, contentOption) {
        var customData = customLayout(scaleOption);
        var customStyle = mf.etplFetch(scaleOption.template + '_css',
            $.extend({}, customData, contentOption.getData())
        );
        if (scaleOption.layout) {
            var layoutHtml = $.map(scaleOption.layout, function (value, name) {
                return mf.etplFetch(scaleOption.template + '_html_' + name);
            });
            layoutHtml[3] = layoutHtml[1];
            layoutHtml[1] = layoutHtml[2];
            layoutHtml[2] = layoutHtml[3];
            layoutHtml.length = 3;
        }
        var html = mf.etplFetch(scaleOption.template + '_html', {
            customStyle: customStyle,
            layoutHtml: layoutHtml && layoutHtml.join('')
        });
        var $element = $('#layoutDemo_' + elementID);
        $element.children().remove();
        var $iframe = $('<iframe frameborder="0" scrolling="no"></iframe>')
            .appendTo($element);
        var htmlRender = _.template(html, {variable: 'data'});
        var templateData = getMockData();
        mf.m.utils.writeInIframe($iframe.get(0).contentWindow, htmlRender(templateData));
        $('#coder').val(html);
        $('#coder1').val(htmlRender(templateData));
    };
}*/
var baseFontSize = 10;
var baseWidth = 320 * 12 / baseFontSize;

function getGridCreateEditor($treeGrid, uniqueName) {
    uniqueName = uniqueName || '';
    return function (rowKey, cellvalue, editor, cellText, width, height) {
        var row = $treeGrid.jqxTreeGrid('getRow', rowKey);
        switch (row["type"]) {
            case "dialog":
            case "string":
            case "number":
                var input = $("<input class='textbox' style='border: none;'/>").appendTo(editor);
                input.jqxInput({width: '100%', height: '100%'});
                break;
            case "align":
                var dropDownList = $("<div class='dropDownList' style='border: none;'></div>").appendTo(editor);
                dropDownList.jqxDropDownList({
                    width: '100%',
                    height: '100%',
                    autoDropDownHeight: true,
                    source: ["Left", "Center", "Right"]
                });
                break;
            case "color":
                var dropDownButton = $("<div style='border: none;'><div style='padding: 5px;'><div class='colorPicker"
                                       + rowKey + uniqueName + "'></div></div></div>");
                dropDownButton.appendTo(editor);
                dropDownButton.jqxDropDownButton({width: '100%', height: '100%'});
                var colorPicker = $(".colorPicker" + rowKey + uniqueName);
                colorPicker.jqxColorPicker({width: 220, height: 220});
                colorPicker.on('colorchange', function (event) {
                    dropDownButton.jqxDropDownButton('setContent',
                        getTextElementByColor(event.args.color));
                });
                dropDownButton.jqxDropDownButton('setContent',
                    getTextElementByColor(new $.jqx.color({hex: cellvalue.slice(1)})));
                break;
            case "bool":
                var checkbox = $("<div style='margin-top: 6px; margin-left: -8px; left: 50%; position: relative;' class='checkbox'/>").appendTo(editor);
                checkbox.jqxCheckBox({checked: cellvalue});
                break;
        }
    }
}
function getGridInitEditor($treeGrid, uniqueName) {
    uniqueName = uniqueName || '';
    return function (rowKey, cellvalue, editor, celltext, width, height) {
        var row = $treeGrid.jqxTreeGrid('getRow', rowKey);
        switch (row.type) {
            case "dialog":
                var $dialog = $("<div/>", {
                    html: '<div></div><div style="overflow:hidden;"></div>'
                });
                $dialog.jqxWindow({
                    width: '40em',
                    height: '20em',
                    isModal: true,
                    closeButtonAction: 'close',
                    title: '内容编辑',
                    content: '<textarea style="width:100%;height:100%;" class="dialogEditor' +
                             rowKey + uniqueName + '"></textarea>'
                });
                var $textarea = $("textarea.dialogEditor" + rowKey + uniqueName);
                $textarea.val(cellvalue);
                $dialog.on('close', function (event) {
                    $('.textbox', editor).val($textarea.val());
                    $treeGrid.jqxTreeGrid('endRowEdit', rowKey, false);
                });
                break;
            case "string":
            case "number":
                $('.textbox', editor).val(cellvalue);
                break;
            case "align":
                $('.dropDownList', editor).val(cellvalue);
                break;
            case "color":
                $('.colorPicker' + rowKey + uniqueName).val(cellvalue);
                break;
            case "bool":
                $('.checkbox', editor).val(cellvalue);
                break;
        }
        console.log('initEditor', rowKey, cellvalue, editor, row);
    }
};
function getGridGetEditorValue($treeGrid, uniqueName) {
    uniqueName = uniqueName || '';
    return function (rowKey, cellvalue, editor) {
        var row = $treeGrid.jqxTreeGrid('getRow', rowKey);
        var result;
        switch (row.type) {
            case "dialog":
            case "string":
                result = $('.textbox', editor).val();
                break;
            case "number":
                var number = parseFloat($('.textbox', editor).val());
                if (isNaN(number)) {
                    result = 0;
                }
                else {
                    result = number;
                }
                break;
            case "align":
                result = $('.dropDownList', editor).val();
                break;
            case "color":
                result = $('.colorPicker' + rowKey + uniqueName).val();
                break;
            case "bool":
                result = $('.checkbox', editor).val();
                break;
        }
        console.log('getEditorValue', rowKey, cellvalue, editor, result);
        return result;
    }
}
var uniqueCount = 0;
function getGridPropertyEditorConfig($treeGrid, properties) {
    console.log('getGridPropertyEditorConfig', $treeGrid, properties);
    var uniqueName = $treeGrid.prop('id') || uniqueCount++;
    /*var plainProperties = [];
     properties.forEach(function (n) {
     plainProperties.push(n);
     n.children && n.children.forEach(function (c) {
     plainProperties.push(c);
     });
     });*/
    return {
        //source: contentOption.data,
        altRows: true,
        autoRowHeight: false,
        editSettings: {
            saveOnPageChange: true,
            saveOnBlur: false,
            saveOnSelectionChange: true,
            cancelOnEsc: true,
            saveOnEnter: true,
            editOnDoubleClick: true,
            editOnF2: true
        },
        editable: true,
        ready: function () {
            console.log('jqxtable ready');
            var rows = $treeGrid.jqxTreeGrid('getRows');
            rows.forEach(function (row, rowIndex) {
                if (row.records.length) {
                    $treeGrid.jqxTreeGrid('lockRow', rowIndex);
                }
            });
        },
        columns: [
            {
                text: '属性',
                editable: false,
                columnType: 'none',
                dataField: 'property',
                width: 150
            },
            {
                text: '值',
                dataField: 'value',
                width: 230,
                columnType: "custom",

                // creates an editor depending on the "type" value.
                createEditor: getGridCreateEditor($treeGrid, uniqueName),
                // updates the editor's value.
                initEditor: getGridInitEditor($treeGrid, uniqueName),
                // returns the value of the custom editor.
                getEditorValue: getGridGetEditorValue($treeGrid, uniqueName),
                validation: function (cell, value) {
                    var rowKeys = cell.row.split('_');
                    var message = '';
                    var rowField = properties[+rowKeys[0]];
                    //var rowField = plainProperties[+rowKeys[0]];
                    console.log('validation', uniqueName, cell, value, rowKeys, rowField);
                    if (rowKeys[1] >= 0) {
                        rowField = rowField.children[rowKeys[1]];
                    }
                    var validator = rowField.validator;

                    if (validator) {
                        message = validator.call($treeGrid, rowField, value);
                    }
                    if (message) {
                        return {message: message, result: false};
                    }
                    return true;
                }
            }
        ]
    }
}

/*var initGrid = function (uniqueName, $treeGrid, action) {
 /!*$treeGrid.on('cellValueChanged', function (event) {
 // Update the Location and Size properties and their nested properties.
 var args = event.args;
 var row = args.row;
 console.log(uniqueName, 'cellValueChanged', row);
 var records = row.records;
 // update the nested properties when a parent value is changed.
 if (records.length > 0) {
 var values = args.value.split(',');
 for (var i = 0; i < values.length; i++) {
 var value = $.trim(values[i]);
 var rowKey = $treeGrid.jqxTreeGrid('getKey', records[i]);
 $treeGrid.jqxTreeGrid('setCellValue', rowKey, 'value', value);
 }
 }
 // update the parent value when the user changes a nested property,
 else if (row.level == 1) {
 var parent = row.parent;
 var parentRowKey = $treeGrid.jqxTreeGrid('getKey', parent);
 var value = "";
 var records = parent.records;
 if (records.length > 0) {
 for (var i = 0; i < records.length; i++) {
 var rowKey = $treeGrid.jqxTreeGrid('getKey', records[i]);
 var cellValue = $treeGrid.jqxTreeGrid('getCellValue', rowKey, 'value');
 value += cellValue;
 if (i < records.length - 1) {
 value += ", ";
 }
 }
 }
 $treeGrid.jqxTreeGrid('setCellValue', parentRowKey, 'value', value);
 }
 });*!/
 var refreshActionNewESUI = mf.m.utils.nextTickWrapper(function () {
 $.extend(action._controlMap, esui.init($treeGrid.get(0)));
 });
 $treeGrid.on('rowEndEdit', refreshActionNewESUI);
 $treeGrid.on('rowExpand', refreshActionNewESUI);
 $treeGrid.on('rowCollapse', refreshActionNewESUI);
 refreshActionNewESUI();
 };*/
function getTextElementByColor(color) {
    if (color == 'transparent' || color.hex == "") {
        return $("<div style='text-shadow: none; position: relative; padding-bottom: 4px; margin-top: 4px;'>transparent</div>");
    }
    var element = $("<div style='text-shadow: none; position: relative; padding-bottom: 4px; margin-top: 4px;'>#"
                    + color.hex + "</div>");
    var nThreshold = 105;
    var bgDelta = (color.r * 0.299) + (color.g * 0.587) + (color.b * 0.114);
    var foreColor = (255 - bgDelta < nThreshold) ? 'Black' : 'White';
    element.css('color', foreColor);
    element.css('background', "#" + color.hex);
    element.addClass('jqx-rc-all');
    return element;
}

function layoutScale(elementID, option) {
    var minDistance = option.minDistance || 0;
    var $element = $('#layoutScale_' + elementID);
    var targetMax = option.width || 100;
    var valueMin = option.min || 0;
    var valueMax = option.max || targetMax;
    var $target = $element.siblings('.layout-demo');
    $element.jqxRangeSelector({
        height: $target.outerHeight(),
        width: $target.width(),
        theme: 'darkblue',
        min: 0,
        max: targetMax,
        range: {
            from: option.from || 0,
            to: option.to || targetMax,
            min: minDistance,
            max: targetMax
        },
        padding: '0',
        majorTicksInterval: targetMax,
        minorTicksInterval: 1,
        markersFormatFunction: option.marker,
        labelsFormatFunction: function (value) {
            return option.text[value] || value;
        }
    });
    $element.off('change');
    $element.on('change', function (event) {
        var args = event.args;
        console.log('change', args);
        if (args.from < valueMin || args.to > valueMax) {
            if (args.from < valueMin) {
                args.from = valueMin;
                args.to = valueMin + Math.max(minDistance, args.to - args.from);
            } else {
                args.to = valueMax;
                args.from = valueMax - Math.max(minDistance, args.to - args.from);
            }
            event.stopImmediatePropagation();
            $(event.target).jqxRangeSelector('setRange', args.from, args.to);
        }
        return false;
    });
    $element.on('change', function (event) {
        var args = event.args;
        console.log("setScale", args);
        if (option.from !== args.from || option.to !== args.to) {
            option.from = args.from;
            option.to = args.to;
        } else {
            event.stopImmediatePropagation();
        }
    });
    return $element;
}

PropertyConfig.prototype.init = function () {
    var me = this;
    $.each(me.fields, function (name, field) {
        me.data[name] = new $.jqx.dataAdapter({
            dataType: "json",
            dataFields: [
                {name: "property", type: "string"},
                {name: "value", type: "string"},
                {name: "type", type: "string"},
                {name: "children", type: "array"}
            ],
            hierarchy: {
                root: "children"
            },
            localData: baidu.object.clone(field.properties),
            loadComplete: function () {
                me.refreshValue(name);
            }
        });
    });
};

PropertyConfig.prototype.refreshValue = function (name) {
    var me = this;
    var result = {
        animate: [],
        css: []
    };

    function recursionValue(records, properties) {
        records.forEach(function (record, index) {
            var orgData = properties[index], value;
            if (orgData.valueFactory) {
                value = orgData.valueFactory(record, orgData);
            } else if (orgData.children) {
                recursionValue(record.records, orgData.children);
                return true;
            } else {
                value = record.value
            }
            if (orgData.cssField) {
                value && result.css.push(orgData.cssField + ':' + value + ';');
            } else if (orgData.animationField && value.length) {
                var animationName = '\'' + orgData.animationField + '_' + name + '\'';
                value.unshift(animationName);
                var animationString = value.pop();
                result.animate.push('@-webkit-keyframes ' + animationName + ' {' + animationString + '}');
                result.css.push('-webkit-animation:' + value.join(' ') + ';');
            }
        });
    }

    recursionValue(me.data[name].records, me.fields[name].properties);
    me.fields[name].value = result;
    return result;
};

function MockData(data) {
    this.data = data || [];
}
MockData.prototype.get = function () {
    return this.data[Math.floor(this.data.length * Math.random())];
};

function initCustomEditor(opt) {
    var scaleConfig = opt.scaleConfig;
    var elementID = opt.templateID + '_' + opt.styleName;
    var preview = generatePreview(opt.styleName, elementID, opt.getCustomLayout, opt.mockData.get.bind(opt.mockData), opt.adslotData);

    var contentConfig = opt.contentConfig;

    var $scale = layoutScale(elementID, scaleConfig);
    $scale.on('change', function () {
        preview(scaleConfig, contentConfig);
    });
    //mf.m.utils.nextTick(null, preview, templateConfig, contentConfig);

    var $demoContainer = $('#layoutContainer_' + elementID);
    var toggleScale = esui.get('scaleToggle_' + elementID);

    toggleScale.onchange = function (values, value) {
        if (value == 2) {
            $demoContainer.addClass('scale-modal');
            $scale.fadeIn(1000);
        } else {
            $demoContainer.removeClass('scale-modal');
            $scale.fadeOut(1000);
        }
    };
    toggleScale.setValue(toggleScale.datasource[1].string, {dispatch: true});

    var $contentTab = $('#contentTab_' + elementID);
    var $ul = $('<ul/>').appendTo($contentTab);
    $.each(contentConfig.fields, function (name, field) {
        console.log('init table', name, field);
        var $treeGrid = $('<div/>', {id: 'contentImage_' + elementID + '_' + name, html: '123'});
        $ul.append($('<li/>', {html: field.text}));
        $contentTab.append($treeGrid.wrapAll($('<div/>')).parent());
        $treeGrid.on('rowEndEdit', function () {
            contentConfig.refreshValue(name);
            preview(scaleConfig, contentConfig);
        });
        var gridConfig = getGridPropertyEditorConfig($treeGrid, field.properties);
        gridConfig.source = contentConfig.data[name];
        $treeGrid.jqxTreeGrid(gridConfig);
        var refreshActionNewESUI = opt.refreshESUI.bind($treeGrid.get(0));
        $treeGrid.on('rowEndEdit', refreshActionNewESUI);
        $treeGrid.on('rowExpand', refreshActionNewESUI);
        $treeGrid.on('rowCollapse', refreshActionNewESUI);
    });
    if ($ul.find('li').length) {
        $contentTab.jqxTabs({
            //theme: 'darkblue',
            selectionTracker: true
            /*,
             animationType: 'fade'*/
        });
        $contentTab.jqxTabs('select', 0);
    }
    return {
        scaleConfig: scaleConfig,
        $scale: $scale,
        contentConfig: contentConfig,
        refresh: function () {
            $scale.jqxRangeSelector('refresh');
            $scale.jqxRangeSelector('setRange', scaleConfig.from, scaleConfig.to);
            preview(scaleConfig, contentConfig);
        },
        toJSON: function () {
            return {
                content: contentConfig.toJSON(),
                scale: {
                    from: scaleConfig.from,
                    to: scaleConfig.to
                }
            }
        },
        preview: preview.bind(null, scaleConfig, contentConfig)
    }
}

if (__DEBUG) {
    $('<textarea id="coder" style="width: 100%;height: 20em;"></textarea><textarea id="coder1" style="width: 100%;height: 20em;"></textarea>').insertAfter('#Main');
}