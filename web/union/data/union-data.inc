### /index/config

Request 

`GET /index/config.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "entities": {
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
                    },
                    {
                        "name": "文字链",
                        "value": 16,
                        "heightRange": [10, 40],
                        "heightDefault": 20
                    }
                ],
                "sitePositionDisplayTypeMap": [
                    {
                        "name": "未设置",
                        "value": 0
                    },
                    {
                        "name": "悬浮式",
                        "value": 1
                    },
                    {
                        "name": "嵌入式",
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
                        "name": "无",
                        "value": 0
                    },
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
                    "id":{
                        "field": "id",
                        "defaultValue": "",
                        "title": "媒体ID",
                        "sortable": true
                    },
                    "name":{
                        "field": "name",
                        "defaultValue": "",
                        "title": "媒体名称",
                        "sortable": true,
                        "editable": true,
                        "edittype": "string"
                    },
                    "note":{
                        "field": "note",
                        "defaultValue": "",
                        "title": "媒体备注",
                        "editable": true,
                        "edittype": "string"
                    },
                    "createTime":{
                        "field": "createTime",
                        "defaultValue": "",
                        "title": "创建时间",
                        "sortable": true
                    },
                    "modifyTime":{
                        "field": "modifyTime",
                        "defaultValue": "",
                        "title": "修改时间",
                        "sortable": true
                    },
                    "isPopups":{
                        "field": "config.splash.on",
                        "defaultValue": false,
                        "title": "弹开屏",
                        "sortable": true,
                        "editable": true,
                        "edittype": "select"
                    },
                    "popupInterval":{
                        "field": "config.splash.interval",
                        "defaultValue": 0,
                        "title": "时间间隔(ms)",
                        "sortable": true,
                        "editable": true,
                        "edittype": "int"
                    }
                },
                "sitePositionList": {
                    "id":{
                        "field": "id",
                        "defaultValue": "",
                        "title": "广告位ID",
                        "sortable": true
                    },
                    "name":{
                        "field": "name",
                        "defaultValue": "",
                        "title": "广告位名称",
                        "sortable": true,
                        "editable": true,
                        "edittype": "string"
                    },
                    "type":{
                        "field": "type",
                        "defaultValue": 1,
                        "title": "广告位类型",
                        "sortable": true,
                        "editable": true,
                        "edittype": "select"
                    },
                    "displayType":{
                        "field": "subtype",
                        "defaultValue": 0,
                        "title": "展现形式",
                        "sortable": true,
                        "editable": true,
                        "edittype": "select"
                    },
                    "hasCloseBtn":{
                        "field": "hasCloseBtn",
                        "defaultValue": false,
                        "title": "关闭按钮",
                        "sortable": true,
                        "editable": true,
                        "edittype": "select"
                    },
                    "position":{
                        "field": "position",
                        "defaultValue": 0,
                        "title": "悬浮位置",
                        "sortable": true,
                        "editable": true,
                        "edittype": "select"
                    },
                    "height":{
                        "field": "height",
                        "defaultValue": 20,
                        "title": "高度(px)",
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
        }
    }

### /index/index/login

Request 

`GET /index/index/login.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true
    }

### /index/index/dailyReport

Request 

`GET /index/index/dailyReport.json`

    :::javascript
    {}

Response

    :::javascript
    {
        "success": true,
        "entities": [
            {
                "applyDate": "2012-11-09",
                "applyNum": 12
            },
            {
                "applyDate": "2012-11-11",
                "applyNum": 223456789
            },
            {
                "applyDate": "2012-11-12",
                "applyNum": 923456789
            },
            {
                "applyDate": "2012-11-13",
                "applyNum": 223456789
            },
            {
                "applyDate": "2012-11-14",
                "applyNum": 323456789
            },
            {
                "applyDate": "2012-11-15",
                "applyNum": 223456789
            },
            {
                "applyDate": "2012-11-16",
                "applyNum": 123456789
            },
            {
                "applyDate": "2012-11-17",
                "applyNum": 123456789
            },
            {
                "applyDate": "2012-11-18",
                "applyNum": 223456789
            }
        ]
    }

### /index/media/site

Request 

`GET /index/media/site.json`

    :::javascript
    {}

Response

    :::javascript
    {
        "success": true,
        //"success": false,
        //"errorType": "sessionTimeout",
        "entities": [
            {
                "id": "123",
                "name": "中国",
                "note": "没有note",
                "createTime": "2014年1月1日 0时0分0秒",
                "modifyTime": "2014年1月1日 0时0分1秒",
                "config": {"splash":{"on":false,"interval":86400000}}
            },
            {
                "id": "124",
                "name": "中国2",
                "note": "没有note2",
                "createTime": "2015年1月1日 0时0分0秒",
                "modifyTime": "2015年1月1日 0时0分1秒"
            }
        ]
    }

### /index/media/sitePosition

Request 

`GET /index/media/sitePosition.json`

    :::javascript
    {}

Response

    :::javascript
    {
        "success": true,
        "entities": [
            {
                "id": "XX0001",
                "name": "广告位1",
                "type": 1,
                "subtype": 1,
                "hasCloseBtn": false,
                "position": 0,
                "height": 60
            },
            {
                "id": "XX0002",
                "name": "广告位2",
                "type": 4,
                "subtype": 1,
                "hasCloseBtn": true,
                "position": 2,
                "height": 300
            },
            {
                "id": "XX0002",
                "name": "广告位2",
                "type": 10,
                "subtype": 2,
                "hasCloseBtn": false,
                "position": 1,
                "height": 300
            },
            {
                "id": "XX0002",
                "name": "广告位2",
                "type": 16,
                "subtype": 2,
                "hasCloseBtn": false,
                "position": 1,
                "height": 30
            }
        ]
    }

### /index/media/app

Request 

`GET /index/media/app.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "model": {
            "list": {
                "data": [
                    {
                        "id": "123",
                        "name": "App",
                        "note": "什么都没有",
                        "createTime": "1231。11.11",
                        "modifyTime": "1112.111.11"
                    },
                    {
                        "id": "123444",
                        "name": "App",
                        "note": "什么都没有",
                        "createTime": "1231。11.11",
                        "modifyTime": "1112.111.11"
                    }
                ],
                "totalSize": 10
            }
        }
    }

### /index/media/siteUpdate

Request 

`GET /index/media/siteUpdate.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "model": {
            'id': '1235',
            'name': 'Nothing',
            'note': '没有note',
            'createTime': '2014年1月1日 0时0分0秒',
            'modifyTime': '2014年1月1日 0时0分1秒',
            'isPopups': 1,
            'popupInterval': 3300
        }
    }

### /index/media/appUpdate

Request 

`GET /index/media/appUpdate.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "model": {
            "id": "121",
            "name": "AppNo",
            "note": "什么都没有",
            "createTime": "1231。11.11",
            "modifyTime": "1112.111.11"
        }
    }

### /index/media/sitePositionUpdate

Request 

`GET /index/media/sitePositionUpdate.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "model": {
            "id": "UPX0001",
            "name": "广告位1",
            "type": 2,
            "subtype": 0,
            "hasCloseBtn": 0,
            "position": 0,
            "height": 30
        }
    }

### /index/account/info

Request 

`GET /index/account/info.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "model": {}
    }

### /index/account/password

Request 

`GET /index/account/password.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "model": {}
    }

