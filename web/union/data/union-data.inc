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
        "model": {}
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
                "create_time": "2014年1月1日 0时0分0秒",
                "modify_time": "2014年1月1日 0时0分1秒",
                "config": {"splash":{"on":false,"interval":86400000}}
            },
            {
                "id": "124",
                "name": "中国2",
                "note": "没有note2",
                "create_time": "2015年1月1日 0时0分0秒",
                "modify_time": "2015年1月1日 0时0分1秒"
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
                "modify_time": "2014年1月1日 0时0分1秒",
                "config": {
                    "close": false,
                    "place": 1,
                    "height": 60,
                    "autoPlayInterval": 1000
                }
            },
            {
                "id": "XX0002",
                "name": "广告位2",
                "type": 10,
                "subtype": 1,
                "modify_time": "2014年1月1日 0时0分1秒",
                "config": {
                    "test": true,
                    "close": true,
                    "place": 1,
                    "height": 401,
                    "autoPlayInterval": 0
                }
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

