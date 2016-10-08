/**
 * @file Generated by er-sync, module
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Thu Mar 26 2015 13:27:35 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 * shortcut mf.m.config
 */
(function (exports, module) {
    var config = {
        "maps": {
            "adslotType": {
                "banner": 1,
                "wall": 2,
                "recommend": 3,
                "popups": 4,
                "insert": 5,
                "push": 6,
                "native": 9,
                "square": 10,
                "video": 12,
                "text": 13
            },
            "adslotTypeMap": [
                {"name": "横幅", "value": 1},
                {"name": "积分墙", "value": 2},
                {"name": "推荐墙", "value": 3},
                {"name": "开屏", "value": 4},
                {"name": "插屏", "value": 5},
                {"name": "推送", "value": 6},
                {"name": "原生", "value": 9},
                {"name": "方形图片", "value": 10},
                {"name": "视频", "value": 12},
                {"name": "文字链", "value": 13}
            ],
            "dspAdslotType": {
                "banner": 1,
                "wall": 2,
                "recommend": 3,
                "popups": 4,
                "insert": 5,
                "push": 6,
                "native": 9,
                "square": 10,
                "video": 12,
                "text": 13
            },
            "dspAdslotTypeMap": [
                {"name": "横幅", "value": 1},
                {"name": "积分墙", "value": 2},
                {"name": "推荐墙", "value": 3},
                {"name": "开屏", "value": 4},
                {"name": "插屏", "value": 5},
                {"name": "推送", "value": 6},
                {"name": "原生", "value": 9},
                {"name": "方形图片", "value": 10},
                {"name": "视频", "value": 12},
                {"name": "文字链", "value": 13}
            ],
            "userTypeMap": [
                {"name": "未定", "value": 0},
                {"name": "企业账户", "value": 2},
                {"name": "个人账户", "value": 1}
            ],
            "adType": {
                "text": 1,
                "image": 2,
                "html": 3,
                "video": 4,
                "text_icon": 5,
                "free": 6
            },
            "adTypeMap": {
                "1": "text",
                "2": "image",
                "3": "html",
                "4": "video",
                "5": "text_icon",
                "6": "free"
            },
            "mediaType": {
                "app": 0,
                "site": 1
            },
            "sitePositionType": {
                "banner": 1,
                "popups": 4,
                "square": 10,
                "video": 12,
                "text": 13
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
                    "heightRange": [180, 480],
                    "heightDefault": 240
                },
                {
                    "name": "文字链",
                    "value": 13,
                    "heightRange": [13, 40],
                    "heightDefault": 13
                }
            ],
            "sitePositionDisplayType": {
                "inbed": 1,
                "float": 2
            },
            "sitePositionDisplayTypeConvert": {
                "1": "inbed",
                "2": "float"
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
            "appPositionType": {
                "banner": 1,
                "initialization": 4,
                "insert": 5,
                "native": 9
            },
            "appPositionTypeMap": [
                {
                    "name": "Banner",
                    "value": 1
                },
                {
                    "name": "开屏",
                    "value": 4
                },
                {
                    "name": "插屏",
                    "value": 5
                },
                {
                    "name": "原生",
                    "value": 9
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
            "validMap": [
                {
                    "name": "有效",
                    "value": 0
                },
                {
                    "name": "无效",
                    "value": 1
                }
            ],
            "platformMap": [
                {
                    "name": "所有",
                    "value": 0
                },
                {
                    "name": "安卓",
                    "value": 1
                },
                {
                    "name": "苹果",
                    "value": 2
                }
            ],
            "displayPositionType": {
                "top": 1,
                "bottom": 2,
                "center": 3
            },
            "displayPositionTypeConvert": {
                "1": "top",
                "2": "bottom",
                "3": "center"
            },
            "displayPositionMap": [
                {
                    "name": "顶部",
                    "value": 1
                },
                {
                    "name": "底部",
                    "value": 2
                },
                {
                    "name": "中间",
                    "value": 3
                }
            ],
            "dspName": [
                {
                    "name": 'Qiushi',
                    "value": 0
                },
                {
                    "name": 'Jesgoo',
                    "value": 1
                },
                {
                    "name": 'Tencent',
                    "value": 2
                },
                {
                    "name": 'Cy',
                    "value": 3
                },
                {
                    "name": 'Bidder',
                    "value": 4
                },
                {
                    "name": 'Xf',
                    "value": 5
                },
                {
                    "name": 'Yk',
                    "value": 6
                },
                {
                    "name": 'Inmobi',
                    "value": 7
                },
                {
                    "name": 'yeahmobi',
                    "value": 8
                },
                {
                    "name": 'adview',
                    "value": 9
                },
                {
                    "name": 'HuDongTong',
                    "value": 10
                },
                {
                    "name": 'newbaidu',
                    "value": 11
                },
                {
                    "name": 'MadHouse',
                    "value": 12
                },
                {
                    "name": 'mopan',
                    "value": 13
                },
                {
                    "name": 'sohu',
                    "value": 14
                },
                {
                    "name": 'feifan',
                    "value": 15
                },
                {
                    "name": 'miaozhen',
                    "value": 16
                },
                {
                    "name": 'liangpai',
                    "value": 17
                },
                {
                    "name": 'youdao',
                    "value": 18
                },
                {
                    "name": '卓易',
                    "value": 19
                },
                {
                    "name": '欧朋',
                    "value": 20
                },
                {
                    "name": '玩转',
                    "value": 21
                }
            ]
        },
        "lists": {
            "siteMediaList": {
                "id": {
                    "field": "id",
                    "title": "媒体ID",
                    "request": false,
                    "sortable": true,
                    "isShow": false
                },
                "media": {
                    "field": "media",
                    "title": "媒体ID",
                    "request": false,
                    "isShow": false
                },
                "mediaType": {
                    "field": "type",
                    "defaultValue": 1,
                    "title": "网站媒体类型",
                    "isShow": false
                },
                "name": {
                    "field": "name",
                    "defaultValue": "新的网站媒体名称",
                    "title": "媒体名称",
                    "sortable": true,
                    "editable": true,
                    "edittype": "string",
                    "request": true
                },
                "note": {
                    "field": "comment",
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
                "splash": {
                    "field": "config.splash",
                    "title": "弹开屏"
                },
                "see": {
                    "field": "config.see",
                    "title": "你看"
                },
                "experiment": {
                    "field": "experiment",
                    "title": "实验配置"
                }
            },
            "sitePositionList": {
                "id": {
                    "field": "id",
                    "title": "广告位ID",
                    "request": false,
                    "sortable": true
                },
                "adslot": {
                    "field": "adslot",
                    "title": "广告位ID",
                    "request": false
                },
                "media": {
                    "field": "media",
                    "title": "媒体ID",
                    "request": true,
                    "isShow": false
                },
                "name": {
                    "field": "name",
                    "defaultValue": "新的网站媒体广告位名称",
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
                "experiment": {
                    "field": "experiment",
                    "title": "实验配置"
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
                    "title": "轮播(ms)",
                    "editable": true,
                    "edittype": "int"
                },
                "blank": {
                    "field": "config.blank",
                    "defaultValue": false,
                    "title": "自动留白",
                    "editable": true,
                    "edittype": "select"
                },
                "cache": {
                    "field": "config.cache",
                    "defaultValue": 0,
                    "title": "缓存(ms)"
                },
                "lucky": {
                    "field": "config.lucky",
                    "defaultValue": false,
                    "title": "幸运大转盘"
                },
                "logable": {
                    "field": "config.logable",
                    "defaultValue": false,
                    "title": "日志"
                },
                "needTop": {
                    "field": "config.needTop",
                    "defaultValue": false,
                    "title": "顶部"
                },
                "needVisual": {
                    "field": "config.needVisual",
                    "defaultValue": false,
                    "title": "容器可视"
                },
                "frequency": {
                    "field": "config.frequency",
                    "title": "频次控制"
                },
                "hideInterval": {
                    "field": "config.hideInterval",
                    "title": "隐匿控制"
                },
                "mask": {
                    "field": "config.mask",
                    "title": "蒙板"
                },
                "splash": {
                    "field": "config.splash",
                    "title": "弹开屏设置"
                },
                "youxiao": {
                    "field": "config.youxiao",
                    "title": "有笑JS"
                },
                "iframe": {
                    "field": "config.iframe",
                    "title": "iframe嵌入（百姓网）"
                }
            },
            "appMediaList": {
                "id": {
                    "field": "id",
                    "title": "媒体ID",
                    "request": false,
                    "sortable": true,
                    "isShow": false
                },
                "mediaType": {
                    "field": "type",
                    "defaultValue": 0,
                    "title": "应用媒体类型",
                    "isShow": false
                },
                "name": {
                    "field": "name",
                    "defaultValue": "新的应用媒体名称",
                    "title": "媒体名称",
                    "sortable": true,
                    "editable": true,
                    "edittype": "string"
                },
                "note": {
                    "field": "comment",
                    "defaultValue": "",
                    "title": "媒体备注",
                    "editable": true,
                    "edittype": "string"
                },
                "url": {
                    "field": "url",
                    "defaultValue": "",
                    "title": "下载页地址",
                    "editable": true,
                    "edittype": "string"
                },
                "package": {
                    "field": "package",
                    "defaultValue": "",
                    "title": "应用包名",
                    "sortable": true,
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
                    "defaultValue": "新的应用广告位媒体名称",
                    "title": "广告位名称",
                    "sortable": true,
                    "editable": true,
                    "edittype": "string",
                    "request": true
                },
                "type": {
                    "field": "type",
                    "defaultValue": 1,
                    "title": "广告位类型",
                    "sortable": true,
                    "editable": true,
                    "edittype": "select"
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
            },
            "userList": {
                "id": {
                    "field": "id",
                    "title": "账户ID",
                    "sortable": true,
                    "request": false
                },
                "username": {
                    "field": "username",
                    "title": "账户名",
                    "sortable": true,
                    "request": false
                },
                "display": {
                    "field": "display_name",
                    "title": "显示称谓",
                    "sortable": true,
                    "request": false
                }
            },
            "DSPList": {
                "id": {
                    "field": "id",
                    "title": "ID",
                    "sortable": true,
                    "request": false
                },
                "media": {
                    "field": "media",
                    "title": "媒体ID",
                    "sortable": true,
                    "request": true,
                    "defaultValue": "",
                    "editable": true,
                    "edittype": "string"
                },
                "adslot": {
                    "field": "adslot",
                    "title": "广告位ID",
                    "sortable": true,
                    "request": true,
                    "defaultValue": "",
                    "editable": true,
                    "edittype": "string"
                },
                "description": {
                    "field": "description",
                    "title": "说明",
                    "request": true,
                    "defaultValue": "",
                    "editable": true,
                    "edittype": "string"
                },
                "modifyTime": {
                    "field": "modified_time",
                    "title": "修改时间",
                    "sortable": true,
                    "request": false
                },
                "createTime": {
                    "field": "create_time",
                    "title": "创建时间",
                    "sortable": true,
                    "request": false
                }
            },
            "adslotDSPList": {
                "id": {
                    "field": "id",
                    "title": "广告位ID",
                    "sortable": true,
                    "defaultValue": "",
                    "editable": true,
                    "edittype": "string"
                },
                "dsp_type": {
                    "field": "dsp_adslot_type",
                    "title": "DSP类型",
                    "sortable": true,
                    "defaultValue": 1,
                    "editable": true,
                    "edittype": "select"
                },
                "platform": {
                    "field": "platform",
                    "title": "平台",
                    "sortable": true,
                    "defaultValue": 0,
                    "editable": true,
                    "edittype": "select"
                },
                "status": {
                    "field": "status",
                    "sortable": true,
                    "title": "状态",
                    "request": true,
                    "defaultValue": 0,
                    "editable": true,
                    "edittype": "select"
                },
                "baidu": {
                    "field": "baidu_adslot",
                    "title": "百度DSP ID",
                    "defaultValue": null,
                    "sortable": true,
                    "request": true
                },
                "tencent": {
                    "field": "tencent_adslot",
                    "title": "腾讯DSP ID",
                    "defaultValue": null,
                    "sortable": true,
                    "request": true
                },
                "baidu5": {
                    "field": "baidu5_adslot",
                    "title": "百度5.0 DSP ID",
                    "defaultValue": null,
                    "sortable": true,
                    "request": true
                },
                "modifyTime": {
                    "field": "modified_time",
                    "title": "修改时间",
                    "sortable": true,
                    "request": false
                },
                "createTime": {
                    "field": "create_time",
                    "title": "创建时间",
                    "sortable": true,
                    "request": false
                }
            },
            "mediaDSPList": {
                "media": {
                    "field": "media",
                    "title": "媒体ID",
                    "sortable": true,
                    "defaultValue": "",
                    "editable": true,
                    "edittype": "string"
                },
                "type": {
                    "field": "adslot",
                    "title": "广告类型",
                    "sortable": true,
                    "defaultValue": 1,
                    "editable": true,
                    "edittype": "select"
                },
                "dsp_type": {
                    "field": "dsp_adslot_type",
                    "title": "DSP类型",
                    "sortable": true,
                    "defaultValue": 1,
                    "editable": true,
                    "edittype": "select"
                },
                "platform": {
                    "field": "platform",
                    "title": "平台",
                    "sortable": true,
                    "defaultValue": 0,
                    "editable": true,
                    "edittype": "select"
                },
                "status": {
                    "field": "status",
                    "sortable": true,
                    "title": "状态",
                    "request": true,
                    "defaultValue": 0,
                    "editable": true,
                    "edittype": "select"
                },
                "baidu": {
                    "field": "baidu_adslot",
                    "title": "百度DSP ID",
                    "defaultValue": null,
                    "sortable": true,
                    "request": true
                },
                "tencent": {
                    "field": "tencent_adslot",
                    "title": "腾讯DSP ID",
                    "defaultValue": null,
                    "sortable": true,
                    "request": true
                },
                "baidu5": {
                    "field": "baidu5_adslot",
                    "title": "百度5.0 DSP ID",
                    "defaultValue": null,
                    "sortable": true,
                    "request": true
                },
                "modifyTime": {
                    "field": "modified_time",
                    "title": "修改时间",
                    "sortable": true,
                    "request": false
                },
                "createTime": {
                    "field": "create_time",
                    "title": "创建时间",
                    "sortable": true,
                    "request": false
                }
            },
            "userDSPList": {
                "user": {
                    "field": "user",
                    "title": "用户ID",
                    "sortable": true,
                    "defaultValue": "",
                    "editable": true,
                    "edittype": "string"
                },
                "type": {
                    "field": "adslot",
                    "title": "广告类型",
                    "sortable": true,
                    "defaultValue": 1,
                    "editable": true,
                    "edittype": "select"
                },
                "dsp_type": {
                    "field": "dsp_adslot_type",
                    "title": "DSP类型",
                    "sortable": true,
                    "defaultValue": 1,
                    "editable": true,
                    "edittype": "select"
                },
                "platform": {
                    "field": "platform",
                    "title": "平台",
                    "sortable": true,
                    "defaultValue": 0,
                    "editable": true,
                    "edittype": "select"
                },
                "status": {
                    "field": "status",
                    "sortable": true,
                    "title": "状态",
                    "request": true,
                    "defaultValue": 0,
                    "editable": true,
                    "edittype": "select"
                },
                "baidu": {
                    "field": "baidu_adslot",
                    "title": "百度DSP ID",
                    "defaultValue": null,
                    "sortable": true,
                    "request": true
                },
                "tencent": {
                    "field": "tencent_adslot",
                    "title": "腾讯DSP ID",
                    "defaultValue": null,
                    "sortable": true,
                    "request": true
                },
                "baidu5": {
                    "field": "baidu5_adslot",
                    "title": "百度5.0 DSP ID",
                    "defaultValue": null,
                    "sortable": true,
                    "request": true
                },
                "modifyTime": {
                    "field": "modified_time",
                    "title": "修改时间",
                    "sortable": true,
                    "request": false
                },
                "createTime": {
                    "field": "create_time",
                    "title": "创建时间",
                    "sortable": true,
                    "request": false
                }
            },
            "domainDSPList": {
                "domain": {
                    "field": "domain",
                    "title": "域名",
                    "sortable": true,
                    "defaultValue": "",
                    "editable": true,
                    "edittype": "string"
                },
                "type": {
                    "field": "adslot",
                    "title": "广告类型",
                    "sortable": true,
                    "defaultValue": 1,
                    "editable": true,
                    "edittype": "select"
                },
                "dsp_type": {
                    "field": "dsp_adslot_type",
                    "title": "DSP类型",
                    "sortable": true,
                    "defaultValue": 1,
                    "editable": true,
                    "edittype": "select"
                },
                "platform": {
                    "field": "platform",
                    "title": "平台",
                    "sortable": true,
                    "defaultValue": 0,
                    "editable": true,
                    "edittype": "select"
                },
                "status": {
                    "field": "status",
                    "sortable": true,
                    "title": "状态",
                    "request": true,
                    "defaultValue": 0,
                    "editable": true,
                    "edittype": "select"
                },
                "baidu": {
                    "field": "baidu_adslot",
                    "title": "百度DSP ID",
                    "defaultValue": null,
                    "sortable": true,
                    "request": true
                },
                "tencent": {
                    "field": "tencent_adslot",
                    "title": "腾讯DSP ID",
                    "defaultValue": null,
                    "sortable": true,
                    "request": true
                },
                "baidu5": {
                    "field": "baidu5_adslot",
                    "title": "百度5.0 DSP ID",
                    "defaultValue": null,
                    "sortable": true,
                    "request": true
                },
                "modifyTime": {
                    "field": "modified_time",
                    "title": "修改时间",
                    "sortable": true,
                    "request": false
                },
                "createTime": {
                    "field": "create_time",
                    "title": "创建时间",
                    "sortable": true,
                    "request": false
                }
            }
        }
    };
    exports.config = config;
})(mf && mf.m || exports || {}, mf || module);