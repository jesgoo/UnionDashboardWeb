/**
 * @file Generated by er-sync, module
 * @author Luics<xukai01@baidu.com>
 * @date Thu Mar 26 2015 13:27:35 GMT+0800 (CST)
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 * shortcut mf.m.config
 */
(function (exports, module) {
    var config = {
        "maps": {
            "adType": {
                "text" : 1,
                "image" : 2,
                "html" : 3,
                "video" : 4,
                "text_icon" : 5
            },
            "adTypeMap": {
                "1" : "text",
                "2" : "image",
                "3" : "html",
                "4" : "video",
                "5" : "text_icon"
            },
            "mediaType": {
                "app" : 0,
                "site" : 1
            },
            "sitePositionType": {
                "banner" : 1,
                "popups" : 4,
                "square" : 10,
                "video" : 12,
                "text" : 13
            },
            "sitePositionTypeMap": [
                {
                    "name": "Banner",
                    "value": 1,
                    "heightRange": [32, 200],
                    "heightDefault": 80
                },
                {
                    "name": "弹开屏",
                    "value": 4,
                    "heightRange": [201, 480],
                    "heightDefault": 320
                },
                {
                    "name": "方形图片",
                    "value": 10,
                    "heightRange": [201, 480],
                    "heightDefault": 320
                },
                {
                    "name": "视频",
                    "value": 12,
                    "heightRange": [240, 480],
                    "heightDefault": 240
                },
                {
                    "name": "文字链",
                    "value": 13,
                    "heightRange": [13, 30],
                    "heightDefault": 13
                }
            ],
            "sitePositionDisplayType": {
                "inbed" : 1,
                "float" : 2
            },
            "sitePositionDisplayTypeConvert": {
                 "1" : "inbed",
                 "2" : "float"
            },
            "sitePositionDisplayTypeMap": [
                {
                    "name": "嵌入式",
                    "value": 1
                },
                {
                    "name": "悬浮式",
                    "value": 2
                }
            ],
            "judgeMap": [
                {
                    "name": "否",
                    "value": false
                },
                {
                    "name": "是",
                    "value": true
                }
            ],
            "toggleMap": [
                {
                    "name": "关闭",
                    "value": false,
                    "string": '1'
                },
                {
                    "name": "打开",
                    "value": true,
                    "string": '2'
                }
            ],
            "displayPositionType": {
                "top" : 1,
                "bottom" : 2
            },
            "displayPositionTypeConvert": {
                 "1": "top",
                 "2": "bottom"
            },
            "displayPositionMap": [
                {
                    "name": "顶部",
                    "value": 1
                },
                {
                    "name": "底部",
                    "value": 2
                }
            ]
        },
        "lists": {
            "siteMediaList": {
                "id": {
                    "field": "id",
                    "title": "媒体ID",
                    "request": false,
                    "sortable": true
                },
                "mediaType": {
                    "field": "type",
                    "defaultValue": 1,
                    "title": "网站媒体类型",
                    "isShow": false
                },
                "name": {
                    "field": "name",
                    "defaultValue": "",
                    "title": "媒体名称",
                    "sortable": true,
                    "editable": true,
                    "edittype": "string",
                    "request": true
                },
                "note": {
                    "field": "note",
                    "defaultValue": "",
                    "title": "媒体备注",
                    "editable": true,
                    "edittype": "string"
                },
                "createTime": {
                    "field": "create_time",
                    "title": "创建时间",
                    "request": false,
                    "sortable": true
                },
                "modifyTime": {
                    "field": "modified_time",
                    "title": "修改时间",
                    "request": false,
                    "sortable": true
                },
                "isPopups": {
                    "field": "config.splash.on",
                    "defaultValue": false,
                    "title": "弹开屏",
                    "sortable": true,
                    "editable": true,
                    "edittype": "select"
                },
                "popupInterval": {
                    "field": "config.splash.interval",
                    "defaultValue": 0,
                    "title": "时间间隔(ms)",
                    "sortable": true,
                    "editable": true,
                    "edittype": "int"
                }
            },
            "sitePositionList": {
                "id": {
                    "field": "id",
                    "title": "广告位ID",
                    "request": false,
                    "sortable": true
                },
                "media": {
                    "field": "media",
                    "title": "媒体ID",
                    "request": true,
                    "isShow": false
                },
                "name": {
                    "field": "name",
                    "defaultValue": "",
                    "title": "广告位名称",
                    "sortable": true,
                    "editable": true,
                    "edittype": "string",
                    "request": true
                },
                "modifyTime": {
                    "field": "modified_time",
                    "title": "修改时间",
                    "sortable": true,
                    "request": false,
                    "isShow": false
                },
                "type": {
                    "field": "type",
                    "defaultValue": 1,
                    "title": "广告位类型",
                    "sortable": true,
                    "editable": true,
                    "edittype": "select"
                },
                "displayType": {
                    "field": "subtype",
                    "defaultValue": 1,
                    "title": "展现形式",
                    "sortable": true,
                    "editable": true,
                    "edittype": "select"
                },
                "hasCloseBtn": {
                    "field": "config.close",
                    "defaultValue": false,
                    "title": "关闭按钮",
                    "sortable": true,
                    "editable": true,
                    "edittype": "select"
                },
                "position": {
                    "field": "config.place",
                    "defaultValue": 1,
                    "title": "悬浮位置",
                    "sortable": true,
                    "editable": true,
                    "edittype": "select"
                },
                "height": {
                    "field": "config.height",
                    "defaultValue": 80,
                    "title": "高度(px)",
                    "editable": true,
                    "edittype": "int"
                },
                "autoPlayInterval": {
                    "field": "config.autoPlayInterval",
                    "defaultValue": 0,
                    "title": "轮播时间(ms)",
                    "editable": true,
                    "edittype": "int"
                },
                "blank": {
                    "field": "config.blank",
                    "defaultValue": false,
                    "title": "自动留白",
                    "editable": true,
                    "edittype": "select"
                }
            },
            "appMediaList": {
                "id": {
                    "field": "id",
                    "title": "媒体ID",
                    "request": false,
                    "sortable": true
                },
                "mediaType": {
                    "field": "type",
                    "defaultValue": 0,
                    "title": "应用媒体类型",
                    "isShow": false
                },
                "name": {
                    "field": "name",
                    "defaultValue": "",
                    "title": "媒体名称",
                    "sortable": true,
                    "editable": true,
                    "edittype": "string"
                },
                "note": {
                    "field": "note",
                    "defaultValue": "",
                    "title": "媒体备注",
                    "editable": true,
                    "edittype": "string"
                },
                "createTime": {
                    "field": "create_time",
                    "defaultValue": "",
                    "title": "创建时间",
                    "sortable": true
                },
                "modifyTime": {
                    "field": "modified_time",
                    "defaultValue": "",
                    "title": "修改时间",
                    "sortable": true
                }
            },
            "appPositionList": {
                "id": {
                    "field": "id",
                    "title": "广告位ID",
                    "request": false,
                    "sortable": true
                },
                "media": {
                    "field": "media",
                    "title": "媒体ID",
                    "request": true,
                    "isShow": false
                },
                "name": {
                    "field": "name",
                    "defaultValue": "",
                    "title": "广告位名称",
                    "sortable": true,
                    "editable": true,
                    "edittype": "string",
                    "request": true
                },
                "modifyTime": {
                    "field": "modified_time",
                    "title": "修改时间",
                    "sortable": true,
                    "request": false,
                    "isShow": false
                }
            },
            "siteTemplateList": {
                "id": {
                    "field": "id",
                    "title": "模版ID",
                    "request": false
                },
                "adslot": {
                    "field": "adslot",
                    "title": "广告位ID",
                    "request": true,
                    "isShow": false
                },
                "adType": {
                    "field": "adtype",
                    "defaultValue": "",
                    "title": "广告类型",
                    "request": true,
                    "isShow": false
                },
                "version": {
                    "field": "version",
                    "defaultValue": "",
                    "title": "版本",
                    "request": false,
                    "isShow": false
                },
                "modifyTime": {
                    "field": "modified_time",
                    "title": "修改时间",
                    "request": false
                },
                "createTime": {
                    "field": "create_time",
                    "title": "创建时间",
                    "request": false
                },
                "percent": {
                    "field": "percent",
                    "defaultValue": 0,
                    "title": "流量分配占比(%)",
                    "editable": true,
                    "edittype": "int"
                },
                "data": {
                    "field": "json",
                    "defaultValue": {},
                    "title": "自定义模版数据",
                    "request": false
                }
            }
        }
    };
    exports.config = config;
})(mf && mf.m || exports || {}, mf || module);