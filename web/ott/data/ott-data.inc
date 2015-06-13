### /index/index/login

Request 

`GET /index/index/login.json?action=login&name=root&password=123456`

    :::javascript
    {
        "action": "login", //访问方式， 登录 login 或者登出 logOut， 
        // status 询问状态， 若登录成功，返回值和login成功一样，若未登录则不返回任何信息
        "name": "root", //若是登录则有用户名
        "password": "123456" //密码
    }

Response

    :::javascript
    {
        "success": true,
        "model": {
            /*"formError": {
             "name": "用户名错误",
             "password": "密码错误"
             },*/
            "admin": {
                "authority": '1',
                "name": 'root'
            }
        }
    }

### /index/index/main

Request 

`GET /index/index/main.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "model": {
            "untreatedCount": 123456,
            "list": {
                "totalSize": 111,
                "data": [
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
        }
    }

### /index/index/changePwd

Request 

`GET /index/index/changePwd.json?oldpassword=abc&newpassword=123456`

    :::javascript
    {
        "oldpassword": "abc",
        "newpassword": "123456"
    }

Response

    :::javascript
    {
        "success": true,
        "model": {
            /*"formError": {   //如果修改成功则没有formError属性
                "newpassword2": "新密码与之前有重复"
            }*/
        }
    }

### /index/user/listApplication

Request 

`GET /index/user/listApplication.json?currentPage=1&pageSize=20&status=&keyType=&keyWord=`

    :::javascript
    {
        "currentPage": "1",
        "pageSize": "20",
        "status": "",
        "keyType": "",
        "keyWord": ""
    }

Response

    :::javascript
    {
        "success": true,
        "model": {
            "list": {
                "totalSize": 111,
                "data": [
                    {"id": 1, "position": "高级客户专员", "name": "杨越龙", "age": "26", "email": "killeryyl@hotmail.com", "mobile": "13671821314", "gender": "男", "experience": "很多。", "apply_date": "Fri Sep 19 12:22:57 UTC+0800 2014", "status": 0, "view_date": null},
                    {"id": 2, "position": "投行业务专员", "name": "罗俊", "age": "24", "email": "killeryyl@vip.qq.com", "mobile": "18818252715", "gender": "女", "experience": "真的很多", "apply_date": "Fri Sep 19 18:37:26 UTC+0800 2014", "status": 0, "view_date": null},
                    {"id": 3, "position": "高级客户专员", "name": "罗静", "age": "1", "email": "776274105@qq.com", "mobile": "12456577724", "gender": "女", "experience": "倒计时了经发局开放", "apply_date": "Fri Sep 19 21:57:31 UTC+0800 2014", "status": 0, "view_date": null}
                ]
            },
            "keyWord": "", //非必须
            "keyType": "", //非必须，默认1
            "status": "",
            "keyTypes": [
                {
                    "value": "1",
                    "name": "姓名"
                },
                {
                    "value": "0",
                    "name": "手机号码"
                },
                {
                    "value": "2",
                    "name": "电子邮箱"
                }
            ],
            "statusTypes": [
                {
                    "value": "0",
                    "name": "未处理"
                },
                {
                    "value": "1",
                    "name": "已处理"
                },
                {
                    "value": "2",
                    "name": "废弃"
                }
            ]
        }
    }

### /index/user/operateApplication

Request 

`GET /index/user/operateApplication.json?id=1%7C2%7C3&action=OPEN_TC&arg=`

    :::javascript
    {
        "id": "1|2|3",//多个id用竖线分隔
        "action": "OPEN_TC",//操作指令 SET_STATUS | DELETE
        "arg": ""//操作附加参数
    }

Response

    :::javascript
    {
        "success": true,
        "model": {
            "successUserId": "1|2",//操作成功的用户id,多个id用竖线分隔
            "failedUserId": "3" //操作失败的用户id,多个id用竖线分隔
            /*"formError" : {
             "arg" : "其他错误消息"
             }*/
        }
    }

### /index/user/exportApplication

Request 

`GET /index/user/exportApplication.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "model": {}
    }

### /index/admin/editContent

Request 

`GET /index/admin/editContent.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "model": {
            "fileList": [
                "index",
                "common",
                "article"
            ]
        }
    }

### /index/admin/database

Request 

`GET /index/admin/database.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "model": {
            "fields": [
                "id",
                "name"
            ],
            "list": [
                {
                    "id": 1,
                    "name": "123"
                },
                {
                    "id": 2,
                    "name": "342"
                }
            ]
        }
    }

### /index/admin/getDataFile

Request 

`GET /index/admin/getDataFile.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "model": {
            "content": "{    \"test\": 1     }"
        }
    }

### /index/admin/saveDataFile

Request 

`GET /index/admin/saveDataFile.json?filename=index&content=%7B%7D`

    :::javascript
    {
        "filename": "index",
        "content": "{}"
    }

Response

    :::javascript
    {
        "success": true,
        "model": {}
    }

### /index/admin/publishWeb

Request 

`GET /index/admin/publishWeb.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "model": {
            message: '网站更新发布完毕，共计7个页面。',
            list: [
                "123"
            ]
        }
    }

