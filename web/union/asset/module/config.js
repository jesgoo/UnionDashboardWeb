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
            "sitePositionTypeMap": [
                {
                    "name": "Banner",
                    "value": 1,
                    "heightRange": [60, 200],
                    "heightDefault": 60
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
                }/*,
                 {
                 "name": "文字链",
                 "value": 16,
                 "heightRange": [10, 40],
                 "heightDefault": 20
                 }*/
            ],
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
                    "value": false
                },
                {
                    "name": "开启",
                    "value": true
                }
            ],
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
                    "defaultValue": "",
                    "title": "媒体ID",
                    "request": false,
                    "sortable": true
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
                    "defaultValue": 2,
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
                    "defaultValue": 60,
                    "title": "高度(px)",
                    "editable": true,
                    "edittype": "int"
                },
                "autoPlayInterval": {
                    "field": "config.autoPlayInterval",
                    "defaultValue": 0,
                    "title": "轮播时间(px)",
                    "editable": true,
                    "edittype": "int"
                }
            },
            "appMediaList": {
                "id": {
                    "field": "id",
                    "defaultValue": "",
                    "title": "媒体ID",
                    "sortable": true
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
                    "field": "createTime",
                    "defaultValue": "",
                    "title": "创建时间",
                    "sortable": true
                },
                "modifyTime": {
                    "field": "modifyTime",
                    "defaultValue": "",
                    "title": "修改时间",
                    "sortable": true
                }
            }
        }
    };
    exports.config = config;
})(mf && mf.m || exports || {}, mf || module);