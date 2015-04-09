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

### /index/channel

Request 

`GET /index/channel.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "entities": [
            {
                "id": "ac1f1b2a",
                "modified_time": "2014年11月25日",
                "name": "传域"
            }
        ]
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
                "id": "0c1ea115",
                "name": "中国zhongguojia",
                "note": "没有note",
                "create_time": "2014年1月1日 0时0分0秒",
                "modify_time": "2014年1月1日 0时0分1秒",
                "config": {"splash":{"on":false,"interval":86400000}}
            },
            {
                "id": "0068028f",
                "name": "中国ZhongGuohong",
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
                "id": "s63c825f",
                "name": "广告位1",
                "type": 1,
                "subtype": 1,
                "modify_time": "2014年1月1日 0时0分1秒",
                "config": {
                    "close": false,
                    "blank": false,
                    "place": 1,
                    "height": 60,
                    "autoPlayInterval": 1000
                }
            },
            {
                "id": "s23c815f",
                "name": "广告位2",
                "type": 10,
                "subtype": 1,
                "modify_time": "2014年1月1日 0时0分1秒",
                "config": {
                    "test": true,
                    "close": true,
                    "blank": true,
                    "place": 2,
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

### /index/report/index

Request 

`GET /index/report/index.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "entities": {}
    }

### /index/report/dailyTotal

Request 

`GET /index/report/dailyTotal.json`

    :::javascript
    {}

Response

    :::javascript
    {
        "success": true,
        //"success": false,
        //"errorType": "NoLogin",
        "entities": [
            {
                "click": 0,
                "cpm": 0,
                "ctr": 0,
                "date": "2015-03-29",
                "fr": 1,
                "impression": 1,
                "income": 0,
                "request": 1,
                "served_request": 1
            },
            {
                "click": 2,
                "cpm": 0,
                "ctr": 0.019230769230769232,
                "date": "2015-03-27",
                "fr": 1,
                "impression": 104,
                "income": 0,
                "request": 104,
                "served_request": 104
            },
            {
                "click": 2,
                "cpm": 8.277511961722487,
                "ctr": 0.009569377990430622,
                "date": "2015-03-26",
                "fr": 1,
                "impression": 209,
                "income": 1.73,
                "request": 209,
                "served_request": 209
            },
            {
                "click": 14,
                "cpm": 25.018450184501845,
                "ctr": 0.025830258302583026,
                "date": "2015-03-25",
                "fr": 1,
                "impression": 542,
                "income": 13.56,
                "request": 548,
                "served_request": 548
            },
            {
                "click": 0,
                "cpm": 0,
                "ctr": 0,
                "date": "2015-03-20",
                "fr": 1,
                "impression": 2,
                "income": 0,
                "request": 2,
                "served_request": 2
            }
        ]
    }

### /index/report/dailyMedias

Request 

`GET /index/report/dailyMedias.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "entities": {
            "2015-03-20": [
                {
                    "click": 35644,
                    "cpm": 0,
                    "ctr": 0.0036541585583317257,
                    "impression": 9754366,
                    "income": 0,
                    "media": "8421da7c",
                    "name": "HXW_WAP",
                    "request": 10512981,
                    "served_request": 10512981
                }
            ],
            "2015-03-21": [
                {
                    "click": 47478,
                    "cpm": 0,
                    "ctr": 0.004196432793480936,
                    "impression": 11313895,
                    "income": 0,
                    "media": "0068028f",
                    "name": "GMW_wap",
                    "request": 12474729,
                    "served_request": 12474729
                }
            ],
            "2015-03-22": [
                {
                    "click": 57886,
                    "cpm": 0,
                    "ctr": 0.004566223733130467,
                    "impression": 12676996,
                    "income": 0,
                    "media": "0068028f",
                    "name": "GMW_wap",
                    "request": 13591279,
                    "served_request": 13591279
                }
            ],
            "2015-03-23": [
                {
                    "click": 97427,
                    "cpm": 6.960743425769625,
                    "ctr": 0.00527833553347504,
                    "impression": 18457902,
                    "income": 128480.72,
                    "media": "0068028f",
                    "name": "GMW_wap",
                    "request": 19862293,
                    "served_request": 19862293
                }
            ],
            "2015-03-24": [
                {
                    "click": 90499,
                    "cpm": 7.426431976407718,
                    "ctr": 0.005138723211341157,
                    "impression": 17611184,
                    "income": 130788.26,
                    "media": "0068028f",
                    "name": "GMW_wap",
                    "request": 18928019,
                    "served_request": 18928019
                }
            ],
            "2015-03-25": [
                {
                    "click": 82097,
                    "cpm": 9.943783471198069,
                    "ctr": 0.006432973760578848,
                    "impression": 12761905,
                    "income": 126901.62,
                    "media": "2c2a3191",
                    "name": "ZYMT_05",
                    "request": 13729318,
                    "served_request": 13729318
                }
            ],
            "2015-03-26": [
                {
                    "click": 109593,
                    "cpm": 10.432539333039752,
                    "ctr": 0.0076302702966143734,
                    "impression": 14362925,
                    "income": 149841.78,
                    "media": "b51a3a3c",
                    "name": "ZGTQW_WAP",
                    "request": 15449983,
                    "served_request": 15449983
                }
            ],
            "2015-03-27": [
                {
                    "click": 107066,
                    "cpm": 10.533392899395746,
                    "ctr": 0.006098591136929907,
                    "impression": 17555858,
                    "income": 184922.75,
                    "media": "190a2880",
                    "name": "酷六_iOS",
                    "request": 19141994,
                    "served_request": 19141994
                }
            ],
            "2015-03-28": [
                {
                    "click": 110236,
                    "cpm": 8.558428206355323,
                    "ctr": 0.005680657838275635,
                    "impression": 19405499,
                    "income": 166080.57,
                    "media": "0068028f",
                    "name": "GMW_wap",
                    "request": 20624825,
                    "served_request": 20624825
                }
            ],
            "2015-03-29": [
                {
                    "click": 114431,
                    "cpm": 8.976594471985623,
                    "ctr": 0.00573081213857837,
                    "impression": 19967676,
                    "income": 179241.73,
                    "media": "2c2a3191",
                    "name": "ZYMT_05",
                    "request": 21122701,
                    "served_request": 21122701
                }
            ]
        }
    }

### /index/report/dayMedias

Request 

`GET /index/report/dayMedias.json`

    :::javascript
    {}

Response

    :::javascript
    {"success":true,"entities":[{"click":0,"cpm":0,"ctr":0,"fr":1,"impression":2,"income":0,"media":"0068028f","name":"GMW_wap","request":2,"served_request":2},{"click":29,"cpm":0.3118570248554479,"ctr":0.0021776676428625066,"fr":1,"impression":13317,"income":4.153,"media":"0c1ea115","name":"酷六_Android","request":15002,"served_request":15002},{"click":0,"cpm":0,"ctr":0,"fr":1,"impression":4,"income":0,"media":"10950478","name":"HBXW_WAP","request":4,"served_request":4},{"click":32,"cpm":1.5422993492407808,"ctr":0.008676789587852495,"fr":1,"impression":3688,"income":5.688,"media":"190a2880","name":"酷六_iOS","request":3907,"served_request":3907},{"click":251,"cpm":0.9048407877783913,"ctr":0.006599879046041387,"fr":1,"impression":38031,"income":34.412,"media":"1cce955b","name":"ZYMT_01","request":40706,"served_request":40706},{"click":21331,"cpm":5.2109991735301655,"ctr":0.03799445695232124,"fr":1,"impression":561424,"income":2925.58,"media":"2c2a3191","name":"ZYMT_05","request":593074,"served_request":593074},{"click":11713,"cpm":1.6377072472951046,"ctr":0.01124487581962885,"fr":1,"impression":1041630,"income":1705.885,"media":"31d70528","name":"HQW_WAP","request":1106576,"served_request":1106576},{"click":2684,"cpm":1.548874899600927,"ctr":0.011286748163380305,"fr":1,"impression":237801,"income":368.324,"media":"3425594b","name":"ZLW_WAP","request":250646,"served_request":250646},{"click":928,"cpm":1.4976837699289847,"ctr":0.010910972111179043,"fr":1,"impression":85052,"income":127.381,"media":"3aa19cd2","name":"ZYMT_03","request":90274,"served_request":90274},{"click":0,"cpm":0,"ctr":0,"fr":1,"impression":65,"income":0,"media":"4446ef75","name":"KX_APP_Android","request":72,"served_request":72},{"click":0,"cpm":4.15,"ctr":0,"fr":1,"impression":40,"income":0.166,"media":"554a477d","name":"ZYMT_04","request":41,"served_request":41},{"click":1,"cpm":15.909090909090908,"ctr":0.09090909090909091,"fr":1,"impression":11,"income":0.175,"media":"8421da7c","name":"HXW_WAP","request":12,"served_request":12},{"click":9,"cpm":2.9148211243611586,"ctr":0.007666098807495741,"fr":1,"impression":1174,"income":3.422,"media":"8f088bba","name":"ZGRBW_WAP","request":1216,"served_request":1216},{"click":3785,"cpm":8.380754090894303,"ctr":0.061566739321383256,"fr":1,"impression":61478,"income":515.232,"media":"91422a89","name":"YTYY_WAP","request":64182,"served_request":64182},{"click":0,"cpm":0,"ctr":0,"fr":1,"impression":4,"income":0,"media":"923cabe7","name":"JRTT_WAP","request":4,"served_request":4},{"click":6431,"cpm":2.8165197787782708,"ctr":0.02119602117294978,"fr":1,"impression":303406,"income":854.549,"media":"a128b7a2","name":"FX_WAP","request":314731,"served_request":314731},{"click":1,"cpm":0.6167247386759582,"ctr":0.003484320557491289,"fr":1,"impression":287,"income":0.177,"media":"a34e29b4","name":"SCW_WAP","request":290,"served_request":290},{"click":0,"cpm":2.9999999999999996,"ctr":0,"fr":1,"impression":3,"income":0.009,"media":"a3e3c42f","name":"BMH_WAP","request":3,"served_request":3},{"click":74349,"cpm":1.605845545319763,"ctr":0.010626640022765756,"fr":1,"impression":6996473,"income":11235.255,"media":"b51a3a3c","name":"ZGTQW_WAP","request":7241321,"served_request":7241321},{"click":0,"cpm":0,"ctr":0,"fr":1,"impression":23,"income":0,"media":"cd840472","name":"动力场_iOS","request":22,"served_request":22},{"click":20935,"cpm":0.31511927638501236,"ctr":0.0023762203171093536,"fr":1,"impression":8810210,"income":2776.267,"media":"e1805105","name":"起点Mobile","request":9509058,"served_request":9509058},{"click":0,"cpm":0,"ctr":0,"fr":1,"impression":3,"income":0,"media":"fc40f3cc","name":"XLJSW_WAP","request":3,"served_request":3},{"click":5025,"cpm":0.8234661098618696,"ctr":0.008070992611628655,"fr":1,"impression":622600,"income":512.69,"media":"fc9cc001","name":"酷六Mobile","request":648748,"served_request":648748},{"click":3016,"cpm":0.8455686060858556,"ctr":0.004832791193295624,"fr":1,"impression":624070,"income":527.694,"media":"fc9cc002","name":"起点M站北上广","request":681838,"served_request":681838},{"click":1762,"cpm":1.2126687310224573,"ctr":0.008828628405936526,"fr":1,"impression":199578,"income":242.022,"media":"fd4d0637","name":"ZYMT_02","request":211075,"served_request":211075}]}

### /index/report/dailyChannel

Request 

`GET /index/report/dailyChannel.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "entities": [
            {
                "channel_income": 0,
                "click": 352,
                "cpm": 0,
                "ctr": 0.007048458149779736,
                "fr": 1,
                "impression": 49940,
                "income": 0,
                "media": "fc9f3010",
                "media_income": 0,
                "name": "fc9f3010-齐济15",
                "request": 54055,
                "served_request": 54055
            },
            {
                "channel_income": 0,
                "click": 18,
                "cpm": 0.4164904862579281,
                "ctr": 0.03805496828752643,
                "fr": 1,
                "impression": 473,
                "income": 0.197,
                "media": "fc7f3061",
                "media_income": 0.197,
                "name": "fc7f3061——沈菲",
                "request": 565,
                "served_request": 565
            },
            {
                "channel_income": 0,
                "click": 9963,
                "cpm": 0,
                "ctr": 0.03022085521107279,
                "fr": 1,
                "impression": 329673,
                "income": 0,
                "media": "fc7f3060",
                "media_income": 0,
                "name": "fc7f3060--沈菲",
                "request": 353484,
                "served_request": 353484
            },
            {
                "channel_income": 0,
                "click": 1923,
                "cpm": 0,
                "ctr": 0.03903379681315335,
                "fr": 1,
                "impression": 49265,
                "income": 0,
                "media": "fc7f3058",
                "media_income": 0,
                "name": "fc7f3058--沈菲",
                "request": 57415,
                "served_request": 57415
            },
            {
                "channel_income": 0,
                "click": 30888,
                "cpm": 0.0003599955871508672,
                "ctr": 0.02989124649439781,
                "fr": 1.0001018836244489,
                "impression": 1033346,
                "income": 0.372,
                "media": "fc7f3057",
                "media_income": 0.372,
                "name": "fc7f3057--沈菲",
                "request": 1227015,
                "served_request": 1226890
            },
            {
                "channel_income": 0,
                "click": 10233,
                "cpm": 0,
                "ctr": 0.00940332576141852,
                "fr": 1.0003038124916648,
                "impression": 1088232,
                "income": 0,
                "media": "fc7f3032",
                "media_income": 0,
                "name": "hyx1--沈菲",
                "request": 1267614,
                "served_request": 1267229
            },
            {
                "channel_income": 0,
                "click": 22636,
                "cpm": 0.456372954207307,
                "ctr": 0.019695295438132445,
                "fr": 1.000647768673907,
                "impression": 1149310,
                "income": 524.514,
                "media": "fc7f3031",
                "media_income": 524.514,
                "name": "blm1--沈菲",
                "request": 1266704,
                "served_request": 1265884
            },
            {
                "channel_income": 0,
                "click": 1,
                "cpm": 0,
                "ctr": 0.16666666666666666,
                "fr": 1,
                "impression": 6,
                "income": 0,
                "media": "fc7f3030",
                "media_income": 0,
                "name": "zys1--沈菲",
                "request": 6,
                "served_request": 6
            },
            {
                "channel_income": 0,
                "click": 183736,
                "cpm": 0.329655011363333,
                "ctr": 0.018304868878335625,
                "fr": 1.000000187366601,
                "impression": 10037548,
                "income": 3308.928,
                "media": "fc7f3024",
                "media_income": 3308.928,
                "name": "LX-沈菲",
                "request": 10674263,
                "served_request": 10674261
            },
            {
                "channel_income": 0,
                "click": 0,
                "cpm": 0,
                "ctr": 0,
                "fr": 1,
                "impression": 17,
                "income": 0,
                "media": "fc7f3009",
                "media_income": 0,
                "name": "blm--沈菲",
                "request": 17,
                "served_request": 17
            },
            {
                "channel_income": 0,
                "click": 3941,
                "cpm": 0,
                "ctr": 0.012947503638508063,
                "fr": 1.0186865049806983,
                "impression": 304383,
                "income": 0,
                "media": "fc7f3008",
                "media_income": 0,
                "name": "渠道2-沈菲",
                "request": 329595,
                "served_request": 323549
            },
            {
                "channel_income": 0,
                "click": 148603,
                "cpm": 0.6503511195238826,
                "ctr": 0.05068228713698607,
                "fr": 1.0002256238422869,
                "impression": 2932050,
                "income": 1906.862,
                "media": "fc7f3001",
                "media_income": 1906.862,
                "name": "渠道1--沈菲",
                "request": 4583883,
                "served_request": 4582849
            },
            {
                "channel_income": 0,
                "click": 0,
                "cpm": 0,
                "ctr": 0,
                "fr": 1,
                "impression": 2,
                "income": 0,
                "media": "b0aa3e19",
                "media_income": 0,
                "name": "ZHW_WAP",
                "request": 2,
                "served_request": 2
            },
            {
                "channel_income": 0,
                "click": 0,
                "cpm": 0,
                "ctr": 0,
                "fr": 1,
                "impression": 2,
                "income": 0,
                "media": "a34e29b4",
                "media_income": 0,
                "name": "SCW_WAP",
                "request": 2,
                "served_request": 2
            },
            {
                "channel_income": 0,
                "click": 10519,
                "cpm": 0.004156442645228843,
                "ctr": 0.03347750397026202,
                "fr": 1,
                "impression": 314211,
                "income": 1.306,
                "media": "8aeeff96",
                "media_income": 1.306,
                "name": "沈菲3060",
                "request": 335431,
                "served_request": 335431
            },
            {
                "channel_income": 0,
                "click": 34685,
                "cpm": 9.467415911687628,
                "ctr": 0.036830447210931164,
                "fr": 1,
                "impression": 941748,
                "income": 8915.92,
                "media": "50cd9dc7",
                "media_income": 8915.92,
                "name": "sf0010沈菲",
                "request": 863671,
                "served_request": 863671
            },
            {
                "channel_income": 0,
                "click": 0,
                "cpm": 0,
                "ctr": 0,
                "fr": 1,
                "impression": 1,
                "income": 0,
                "media": "2c2a3191",
                "media_income": 0,
                "name": "ZYMT_05",
                "request": 1,
                "served_request": 1
            },
            {
                "channel_income": 0,
                "click": 0,
                "cpm": 0,
                "ctr": 0,
                "fr": 1,
                "impression": 1,
                "income": 0,
                "media": "10950478",
                "media_income": 0,
                "name": "HBXW_WAP",
                "request": 1,
                "served_request": 1
            },
            {
                "channel_income": 0,
                "click": 7,
                "cpm": 0,
                "ctr": 0.09722222222222222,
                "fr": 1,
                "impression": 72,
                "income": 0,
                "media": "00000123",
                "media_income": 0,
                "name": "捷酷测试应用",
                "request": 91,
                "served_request": 91
            }
        ]
    }

### /index/report/dailyMedia

Request 

`GET /index/report/dailyMedia.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "entities": [
            {
                "click": 15858,
                "cpm": 40.2679769420807,
                "ctr": 0.03482404611583859,
                "date": "2015-03-29",
                "impression": 455375,
                "income": 18337.03,
                "request": 481528,
                "served_request": 481528
            },
            {
                "click": 18295,
                "cpm": 39.86973155972177,
                "ctr": 0.03596832349668332,
                "date": "2015-03-28",
                "impression": 508642,
                "income": 20279.42,
                "request": 538793,
                "served_request": 538793
            },
            {
                "click": 12098,
                "cpm": 39.567473177401446,
                "ctr": 0.03205727807264161,
                "date": "2015-03-27",
                "impression": 377387,
                "income": 14932.25,
                "request": 401991,
                "served_request": 401991
            },
            {
                "click": 12493,
                "cpm": 32.29837876226263,
                "ctr": 0.03310579119475522,
                "date": "2015-03-26",
                "impression": 377366,
                "income": 12188.31,
                "request": 405052,
                "served_request": 405052
            },
            {
                "click": 7922,
                "cpm": 52.129116125540165,
                "ctr": 0.035147341987808015,
                "date": "2015-03-25",
                "impression": 225394,
                "income": 11749.59,
                "request": 241513,
                "served_request": 241513
            },
            {
                "click": 4841,
                "cpm": 45.54894356322547,
                "ctr": 0.033112401589614156,
                "date": "2015-03-24",
                "impression": 146199,
                "income": 6659.21,
                "request": 157660,
                "served_request": 157660
            },
            {
                "click": 744,
                "cpm": 48.59350136029978,
                "ctr": 0.038191057953903804,
                "date": "2015-03-23",
                "impression": 19481,
                "income": 946.65,
                "request": 21571,
                "served_request": 21571
            },
            {
                "click": 700,
                "cpm": 0,
                "ctr": 0.03572704537334762,
                "date": "2015-03-22",
                "impression": 19593,
                "income": 0,
                "request": 21772,
                "served_request": 21772
            },
            {
                "click": 671,
                "cpm": 0,
                "ctr": 0.03793103448275862,
                "date": "2015-03-21",
                "impression": 17690,
                "income": 0,
                "request": 19807,
                "served_request": 19807
            },
            {
                "click": 380,
                "cpm": 0,
                "ctr": 0.03700457688187749,
                "date": "2015-03-20",
                "impression": 10269,
                "income": 0,
                "request": 11362,
                "served_request": 11362
            }
        ]
    }

### /index/report/hourlyMedia

Request 

`GET /index/report/hourlyMedia.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "entities": [
            {
                "click": 32383,
                "hour": 0,
                "impression": 1056,
                "request": 34219,
                "served_request": 34219
            },
            {
                "click": 23806,
                "hour": 1,
                "impression": 836,
                "request": 25134,
                "served_request": 25134
            },
            {
                "click": 15266,
                "hour": 2,
                "impression": 509,
                "request": 16105,
                "served_request": 16105
            },
            {
                "click": 9720,
                "hour": 3,
                "impression": 340,
                "request": 10243,
                "served_request": 10243
            },
            {
                "click": 6084,
                "hour": 4,
                "impression": 229,
                "request": 6426,
                "served_request": 6426
            },
            {
                "click": 5274,
                "hour": 5,
                "impression": 188,
                "request": 5519,
                "served_request": 5519
            },
            {
                "click": 6924,
                "hour": 6,
                "impression": 249,
                "request": 7277,
                "served_request": 7277
            },
            {
                "click": 12096,
                "hour": 7,
                "impression": 480,
                "request": 12802,
                "served_request": 12802
            },
            {
                "click": 15561,
                "hour": 8,
                "impression": 535,
                "request": 16517,
                "served_request": 16517
            },
            {
                "click": 17892,
                "hour": 9,
                "impression": 615,
                "request": 18937,
                "served_request": 18937
            },
            {
                "click": 19417,
                "hour": 10,
                "impression": 647,
                "request": 20440,
                "served_request": 20440
            },
            {
                "click": 19210,
                "hour": 11,
                "impression": 609,
                "request": 20284,
                "served_request": 20284
            },
            {
                "click": 20607,
                "hour": 12,
                "impression": 725,
                "request": 21831,
                "served_request": 21831
            },
            {
                "click": 23312,
                "hour": 13,
                "impression": 767,
                "request": 24705,
                "served_request": 24705
            },
            {
                "click": 22202,
                "hour": 14,
                "impression": 831,
                "request": 23549,
                "served_request": 23549
            },
            {
                "click": 21100,
                "hour": 15,
                "impression": 800,
                "request": 22387,
                "served_request": 22387
            },
            {
                "click": 20218,
                "hour": 16,
                "impression": 671,
                "request": 21340,
                "served_request": 21340
            },
            {
                "click": 18701,
                "hour": 17,
                "impression": 640,
                "request": 19721,
                "served_request": 19721
            },
            {
                "click": 17049,
                "hour": 18,
                "impression": 598,
                "request": 18032,
                "served_request": 18032
            },
            {
                "click": 18820,
                "hour": 19,
                "impression": 724,
                "request": 19996,
                "served_request": 19996
            },
            {
                "click": 22190,
                "hour": 20,
                "impression": 772,
                "request": 23510,
                "served_request": 23510
            },
            {
                "click": 25650,
                "hour": 21,
                "impression": 841,
                "request": 27041,
                "served_request": 27041
            },
            {
                "click": 30433,
                "hour": 22,
                "impression": 1085,
                "request": 32145,
                "served_request": 32145
            },
            {
                "click": 31460,
                "hour": 23,
                "impression": 1111,
                "request": 33368,
                "served_request": 33368
            }
        ]
    }

### /index/report/hourlyPositions

Request 

`GET /index/report/hourlyPositions.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "entities": {
            "0": [
                {
                    "adslot": "s2f03eb1",
                    "click": 32383,
                    "impression": 1056,
                    "request": 34219,
                    "served_request": 34219
                }
            ],
            "1": [
                {
                    "adslot": "s2f03eb1",
                    "click": 23806,
                    "impression": 836,
                    "request": 25134,
                    "served_request": 25134
                }
            ],
            "2": [
                {
                    "adslot": "s2f03eb1",
                    "click": 15266,
                    "impression": 509,
                    "request": 16105,
                    "served_request": 16105
                }
            ],
            "3": [
                {
                    "adslot": "s2f03eb1",
                    "click": 9720,
                    "impression": 340,
                    "request": 10243,
                    "served_request": 10243
                }
            ],
            "4": [
                {
                    "adslot": "s2f03eb1",
                    "click": 6084,
                    "impression": 229,
                    "request": 6426,
                    "served_request": 6426
                }
            ],
            "5": [
                {
                    "adslot": "s2f03eb1",
                    "click": 5274,
                    "impression": 188,
                    "request": 5519,
                    "served_request": 5519
                }
            ],
            "6": [
                {
                    "adslot": "s2f03eb1",
                    "click": 6924,
                    "impression": 249,
                    "request": 7277,
                    "served_request": 7277
                }
            ],
            "7": [
                {
                    "adslot": "s2f03eb1",
                    "click": 12096,
                    "impression": 480,
                    "request": 12802,
                    "served_request": 12802
                }
            ],
            "8": [
                {
                    "adslot": "s2f03eb1",
                    "click": 15561,
                    "impression": 535,
                    "request": 16517,
                    "served_request": 16517
                }
            ],
            "9": [
                {
                    "adslot": "s2f03eb1",
                    "click": 17892,
                    "impression": 615,
                    "request": 18937,
                    "served_request": 18937
                }
            ],
            "10": [
                {
                    "adslot": "s2f03eb1",
                    "click": 19417,
                    "impression": 647,
                    "request": 20440,
                    "served_request": 20440
                }
            ],
            "11": [
                {
                    "adslot": "s2f03eb1",
                    "click": 19210,
                    "impression": 609,
                    "request": 20284,
                    "served_request": 20284
                }
            ],
            "12": [
                {
                    "adslot": "s2f03eb1",
                    "click": 20607,
                    "impression": 725,
                    "request": 21831,
                    "served_request": 21831
                }
            ],
            "13": [
                {
                    "adslot": "s2f03eb1",
                    "click": 23312,
                    "impression": 767,
                    "request": 24705,
                    "served_request": 24705
                }
            ],
            "14": [
                {
                    "adslot": "s2f03eb1",
                    "click": 22202,
                    "impression": 831,
                    "request": 23549,
                    "served_request": 23549
                }
            ],
            "15": [
                {
                    "adslot": "s2f03eb1",
                    "click": 21100,
                    "impression": 800,
                    "request": 22387,
                    "served_request": 22387
                }
            ],
            "16": [
                {
                    "adslot": "s2f03eb1",
                    "click": 20218,
                    "impression": 671,
                    "request": 21340,
                    "served_request": 21340
                }
            ],
            "17": [
                {
                    "adslot": "s2f03eb1",
                    "click": 18701,
                    "impression": 640,
                    "request": 19721,
                    "served_request": 19721
                }
            ],
            "18": [
                {
                    "adslot": "s2f03eb1",
                    "click": 17049,
                    "impression": 598,
                    "request": 18032,
                    "served_request": 18032
                }
            ],
            "19": [
                {
                    "adslot": "s2f03eb1",
                    "click": 18820,
                    "impression": 724,
                    "request": 19996,
                    "served_request": 19996
                }
            ],
            "20": [
                {
                    "adslot": "s2f03eb1",
                    "click": 22190,
                    "impression": 772,
                    "request": 23510,
                    "served_request": 23510
                }
            ],
            "21": [
                {
                    "adslot": "s2f03eb1",
                    "click": 25650,
                    "impression": 841,
                    "request": 27041,
                    "served_request": 27041
                }
            ],
            "22": [
                {
                    "adslot": "s2f03eb1",
                    "click": 30433,
                    "impression": 1085,
                    "request": 32145,
                    "served_request": 32145
                }
            ],
            "23": [
                {
                    "adslot": "s2f03eb1",
                    "click": 31460,
                    "impression": 1111,
                    "request": 33368,
                    "served_request": 33368
                }
            ]
        }
    }

### /index/report/dailyPosition

Request 

`GET /index/report/dailyPosition.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "entities": [
            {
                "click": 39,
                "cpm": 10.429955947136563,
                "ctr": 0.006872246696035243,
                "date": "2015-03-29",
                "fr": 1,
                "impression": 5675,
                "income": 59.19,
                "request": 5742,
                "served_request": 5742
            },
            {
                "click": 41,
                "cpm": 8.80409646514701,
                "ctr": 0.0067723818962669305,
                "date": "2015-03-28",
                "fr": 1,
                "impression": 6054,
                "income": 53.3,
                "request": 6130,
                "served_request": 6130
            },
            {
                "click": 38,
                "cpm": 8.490994645464871,
                "ctr": 0.006165828330358592,
                "date": "2015-03-27",
                "fr": 1,
                "impression": 6163,
                "income": 52.33,
                "request": 6212,
                "served_request": 6212
            },
            {
                "click": 28,
                "cpm": 5.881198715661791,
                "ctr": 0.0049946485907955765,
                "date": "2015-03-26",
                "fr": 1,
                "impression": 5606,
                "income": 32.97,
                "request": 5675,
                "served_request": 5675
            },
            {
                "click": 28,
                "cpm": 7.301816680429397,
                "ctr": 0.005780346820809248,
                "date": "2015-03-25",
                "fr": 1,
                "impression": 4844,
                "income": 35.37,
                "request": 4877,
                "served_request": 4877
            },
            {
                "click": 41,
                "cpm": 7.321311475409836,
                "ctr": 0.006721311475409836,
                "date": "2015-03-24",
                "fr": 1,
                "impression": 6100,
                "income": 44.66,
                "request": 6192,
                "served_request": 6192
            },
            {
                "click": 54,
                "cpm": 8.461142563046835,
                "ctr": 0.009264024704065878,
                "date": "2015-03-23",
                "fr": 1,
                "impression": 5829,
                "income": 49.32,
                "request": 5917,
                "served_request": 5917
            },
            {
                "click": 38,
                "cpm": 0,
                "ctr": 0.005709134615384615,
                "date": "2015-03-22",
                "fr": 1,
                "impression": 6656,
                "income": 0,
                "request": 6738,
                "served_request": 6738
            },
            {
                "click": 48,
                "cpm": 0,
                "ctr": 0.008078088185796028,
                "date": "2015-03-21",
                "fr": 1,
                "impression": 5942,
                "income": 0,
                "request": 6353,
                "served_request": 6353
            },
            {
                "click": 67,
                "cpm": 0,
                "ctr": 0.01060965954077593,
                "date": "2015-03-20",
                "fr": 1,
                "impression": 6315,
                "income": 0,
                "request": 6487,
                "served_request": 6487
            }
        ]
    }

### /index/report/dayPositions

Request 

`GET /index/report/dayPositions.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "entities": [
            {
                "adslot": "s0000001",
                "click": 0,
                "cpm": 0,
                "ctr": 0,
                "fr": 0,
                "impression": 3,
                "income": 0,
                "name": "横幅",
                "request": 0,
                "served_request": 0
            },
            {
                "adslot": "s63c825f",
                "click": 67,
                "cpm": 0,
                "ctr": 0.01060965954077593,
                "fr": 1,
                "impression": 6315,
                "income": 0,
                "name": "酷六ios_插屏",
                "request": 6487,
                "served_request": 6487
            }
        ]
    }

### /index/report/dailyPositions

Request 

`GET /index/report/dailyPositions.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "entities": {
            "2015-03-20": [
                {
                    "adslot": "s0000001",
                    "click": 0,
                    "cpm": 0,
                    "ctr": 0,
                    "fr": 0,
                    "impression": 3,
                    "income": 0,
                    "request": 0,
                    "served_request": 0
                },
                {
                    "adslot": "s63c825f",
                    "click": 67,
                    "cpm": 0,
                    "ctr": 0.01060965954077593,
                    "fr": 1,
                    "impression": 6315,
                    "income": 0,
                    "request": 6487,
                    "served_request": 6487
                }
            ],
            "2015-03-21": [
                {
                    "adslot": "s63c825f",
                    "click": 48,
                    "cpm": 0,
                    "ctr": 0.008078088185796028,
                    "fr": 1,
                    "impression": 5942,
                    "income": 0,
                    "request": 6353,
                    "served_request": 6353
                }
            ],
            "2015-03-22": [
                {
                    "adslot": "s63c825f",
                    "click": 38,
                    "cpm": 0,
                    "ctr": 0.005709134615384615,
                    "fr": 1,
                    "impression": 6656,
                    "income": 0,
                    "request": 6738,
                    "served_request": 6738
                }
            ],
            "2015-03-23": [
                {
                    "adslot": "s63c825f",
                    "click": 54,
                    "cpm": 8.461142563046835,
                    "ctr": 0.009264024704065878,
                    "fr": 1,
                    "impression": 5829,
                    "income": 49.32,
                    "request": 5917,
                    "served_request": 5917
                }
            ],
            "2015-03-24": [
                {
                    "adslot": "s63c825f",
                    "click": 41,
                    "cpm": 7.321311475409836,
                    "ctr": 0.006721311475409836,
                    "fr": 1,
                    "impression": 6100,
                    "income": 44.66,
                    "request": 6192,
                    "served_request": 6192
                }
            ],
            "2015-03-25": [
                {
                    "adslot": "s63c825f",
                    "click": 28,
                    "cpm": 7.301816680429397,
                    "ctr": 0.005780346820809248,
                    "fr": 1,
                    "impression": 4844,
                    "income": 35.37,
                    "request": 4877,
                    "served_request": 4877
                }
            ],
            "2015-03-26": [
                {
                    "adslot": "s63c825f",
                    "click": 28,
                    "cpm": 5.881198715661791,
                    "ctr": 0.0049946485907955765,
                    "fr": 1,
                    "impression": 5606,
                    "income": 32.97,
                    "request": 5675,
                    "served_request": 5675
                }
            ],
            "2015-03-27": [
                {
                    "adslot": "s63c825f",
                    "click": 38,
                    "cpm": 8.490994645464871,
                    "ctr": 0.006165828330358592,
                    "fr": 1,
                    "impression": 6163,
                    "income": 52.33,
                    "request": 6212,
                    "served_request": 6212
                },
                {
                    "adslot": "s7e5b474",
                    "click": 1,
                    "cpm": 0,
                    "ctr": 0.018518518518518517,
                    "fr": 1,
                    "impression": 54,
                    "income": 0,
                    "request": 54,
                    "served_request": 54
                }
            ],
            "2015-03-28": [
                {
                    "adslot": "s63c825f",
                    "click": 41,
                    "cpm": 8.80409646514701,
                    "ctr": 0.0067723818962669305,
                    "fr": 1,
                    "impression": 6054,
                    "income": 53.3,
                    "request": 6130,
                    "served_request": 6130
                }
            ],
            "2015-03-29": [
                {
                    "adslot": "s63c825f",
                    "click": 39,
                    "cpm": 10.429955947136563,
                    "ctr": 0.006872246696035243,
                    "fr": 1,
                    "impression": 5675,
                    "income": 59.19,
                    "request": 5742,
                    "served_request": 5742
                }
            ]
        }
    }

### /index/report/hourlyPosition

Request 

`GET /index/report/hourlyPosition.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "entities": [
            {
                "click": 321,
                "impression": 18457902,
                "hour": 9,
                "request": 19862293,
                "served_request": 19862293
            },
            {
                "click": 32,
                "impression": 18457902,
                "hour": 21,
                "request": 19862293,
                "served_request": 19862293
            },
            {
                "click": 21,
                "impression": 18457902,
                "hour": 15,
                "request": 19862293,
                "served_request": 19862293
            }
        ]
    }

