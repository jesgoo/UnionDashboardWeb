### /monitor/main/index

Request 

`GET /monitor/main/index.json`

    :::javascript
    {
    }

Response

    :::javascript
    [
        {
            table_name: "event.log",
            counters: [
                {
                    time: 1428569527473,
                    number: 476
                },
                {
                    time: 1428569407472,
                    number: 506
                },
                {
                    time: 1428569286481,
                    number: 568
                },
                {
                    time: 1428569166481,
                    number: 572
                },
                {
                    time: 1428569045483,
                    number: 502
                },
                {
                    time: 1428568924482,
                    number: 513
                },
                {
                    time: 1428568803490,
                    number: 544
                },
                {
                    time: 1428568683490,
                    number: 506
                },
                {
                    time: 1428568562493,
                    number: 463
                },
                {
                    time: 1428564556524,
                    number: 587
                },
                {
                    time: 1428564435532,
                    number: 539
                },
                {
                    time: 1428564315532,
                    number: 485
                },
                {
                    time: 1428564195531,
                    number: 518
                },
                {
                    time: 1428564075531,
                    number: 497
                },
                {
                    time: 1428563954542,
                    number: 556
                },
                {
                    time: 1428563834542,
                    number: 578
                },
                {
                    time: 1428563714542,
                    number: 573
                },
                {
                    time: 1428563593550,
                    number: 470
                },
                {
                    time: 1428563473550,
                    number: 491
                },
                {
                    time: 1428563353550,
                    number: 556
                },
                {
                    time: 1428563233549,
                    number: 548
                },
                {
                    time: 1428563112562,
                    number: 477
                },
                {
                    time: 1428562782491,
                    number: 569
                }
            ]
        },
        {
            table_name: "show.log",
            counters: [
                {
                    time: 1428569527473,
                    number: 32114
                },
                {
                    time: 1428569407472,
                    number: 32185
                },
                {
                    time: 1428569286481,
                    number: 32295
                },
                {
                    time: 1428569166481,
                    number: 32577
                },
                {
                    time: 1428569045483,
                    number: 32261
                },
                {
                    time: 1428568924482,
                    number: 32004
                },
                {
                    time: 1428568803490,
                    number: 31710
                },
                {
                    time: 1428568683490,
                    number: 31827
                },
                {
                    time: 1428568562493,
                    number: 31937
                },
                {
                    time: 1428564556524,
                    number: 31922
                },
                {
                    time: 1428564435532,
                    number: 31723
                },
                {
                    time: 1428564315532,
                    number: 32097
                },
                {
                    time: 1428564195531,
                    number: 31087
                },
                {
                    time: 1428564075531,
                    number: 31910
                },
                {
                    time: 1428563954542,
                    number: 31222
                },
                {
                    time: 1428563834542,
                    number: 31171
                },
                {
                    time: 1428563714542,
                    number: 31679
                },
                {
                    time: 1428563593550,
                    number: 31582
                },
                {
                    time: 1428563473550,
                    number: 31265
                },
                {
                    time: 1428563353550,
                    number: 31375
                },
                {
                    time: 1428563233549,
                    number: 31835
                },
                {
                    time: 1428563112562,
                    number: 31545
                },
                {
                    time: 1428562782491,
                    number: 31091
                }
            ]
        },
        {
            table_name: "ui.log",
            counters: [
                {
                    time: 1428569527473,
                    number: 18021
                },
                {
                    time: 1428569407472,
                    number: 18457
                },
                {
                    time: 1428569286481,
                    number: 18323
                },
                {
                    time: 1428569166481,
                    number: 18294
                },
                {
                    time: 1428569045483,
                    number: 17853
                },
                {
                    time: 1428568924482,
                    number: 17904
                },
                {
                    time: 1428568803490,
                    number: 17656
                },
                {
                    time: 1428568683490,
                    number: 17685
                },
                {
                    time: 1428568562493,
                    number: 17737
                },
                {
                    time: 1428564556524,
                    number: 17648
                },
                {
                    time: 1428564435532,
                    number: 17891
                },
                {
                    time: 1428564315532,
                    number: 17893
                },
                {
                    time: 1428564195531,
                    number: 17499
                },
                {
                    time: 1428564075531,
                    number: 17886
                },
                {
                    time: 1428563954542,
                    number: 17744
                },
                {
                    time: 1428563834542,
                    number: 17548
                },
                {
                    time: 1428563714542,
                    number: 17743
                },
                {
                    time: 1428563593550,
                    number: 17599
                },
                {
                    time: 1428563473550,
                    number: 17195
                },
                {
                    time: 1428563353550,
                    number: 17401
                },
                {
                    time: 1428563233549,
                    number: 17744
                },
                {
                    time: 1428563112561,
                    number: 17663
                },
                {
                    time: 1428562782490,
                    number: 17444
                }
            ]
        }
    ]

### /index/config

Request 

`GET /index/config.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "service": {
            "navIndex": 1,
            "head": {
                "cn": "产品服务",
                "en": "Product Introduction",
                "desc": "自2010年5月成立伊始，OTT方圆奥特就坚持合规经营、风险控制、稳健获利的经营理念，在金融资本市场上具有强大的资源优势和丰富的投资管理经验。我们重视与客户发展为长期互信的战略合作伙伴关系，为不同背景、不同层次和不同区域的客户提供全方位增值服务。"
            },
            "classify": [
                {
                    "filename": "service",
                    "label": "投行服务",
                    "caption": {
                        "title": "我们拥有强大的资源优势和丰富的投资管理经验",
                        "desc": "为您提供最优解决方案，助您融资一路畅通！"
                    },
                    "list": [
                        {
                            "anchor": "shangshigongsishizhiguanli",
                            "title": "上市公司市值管理",
                            "icon": "/src/img/icon_purse_47_45.png",
                            "content": "<p><b>服务内容：</b>OTT方圆奥特市值管理部采用多种科学、合规的资本运作方法和手段，实现客户公司市值与内在价值的匹配，从而达到为客户公司整体战略服务的效果。</p><p><b>服务说明：</b>市值管理是上市公司的一种有效生存方式和成长机制。上市公司若能合理把握产业经营和资本经营的关系,充分运用整体上市、资产分拆、并购重组、定向增发、大股东增持与减持、发放股票股利、转增股本、股票回购等资本运营的手段，则能提高公司盈利能力,增加公司价值。具体来讲,当公司股价走高时,上市公司可以公司股份作为支付手段适时进行兼并收购或进行不良资产的剥离；当市场对公司某项业务单元过度看好时,可以分拆转让,以获取较高的溢价；当股票交易进入低迷期时，为防止恶意收购,可以实施股份回购。</p><p><b>服务特点：</b>专业化的交易团队；科学合规的资本运作手段。</p><p><b>适用客户：</b>上市公司。</p>"
                        },
                        {
                            "anchor": "tourongfuwu",
                            "title": "投融服务",
                            "icon": "/src/img/icon_interest_47_45.png",
                            "content": "<p><b>服务内容：</b>OTT方圆奥特投资银行部为地方企业、上市公司等提供国内和海外的投融资方案。</p><p><b>服务说明：</b>我们的投融服务，涵盖上市公司公司债、定向增发、非上市公司和上市公司集团公司企业债、中票、定向私募债的发行策划等。</p><p><b>服务特点：</b>与国内多家知名券商、银行合作，具有强大的资源优势；拥有处理复杂财务交易和法律文件的强大技术力量；富有丰富的中国和北美资本市场经验；具有丰富的地区市场知识和强大的国际运作能力。</p><p><b>适用客户：</b>地方企业、上市公司</p>"
                        },
                        {
                            "anchor": "jijinchanpin",
                            "title": "基金产品",
                            "icon": "/src/img/icon_coin_47_45.png",
                            "content": "<p><b>服务内容：</b>OTT方圆奥特基金投资部采用投资多元化策略，将证券投资基金投资于多种股票、期货，追求分散风险来获得较稳定的收益目标。</p><p><b>服务说明：</b>我们的股票投资，是在科学分析、综合考量国家宏观经济和政策、行业背景、上市公司业绩质量和成长性等因素的情况下，精选所在行业发展良好、中长期持续增长或未来阶段性高速增长、业绩质量优秀的绩优成长股作为主要投资对象。我们的期货投资，是以沪深300股指期货为投资对象，采用“趋势+高频”的交易手法来进行期货交易。</p><p><b>服务特点：</b>基金经理20年的证券投资经验，是股票选择及趋势判断的重要保障；专业化的投资交易团队，是证券买卖的必要基础。</p><p><b>服务资质：</b>OTT方圆奥特已于2013年6月28日成为中国证券投资基金业协会特别会员，于2014年5月20日获取私募基金管理人资格。</p>"
                        }
                    ]
                },
                {
                    "filename": "recognise",
                    "label": "交易投资",
                    "caption": {
                        "title": "我们拥有丰富的投资交易经验、强大的资金支持和团队支持",
                        "desc": "助您在下一个十年周期的金融大发展舞台上舞出精彩！"
                    },
                    "list": [
                        {
                            "anchor": "chengxuhuajiaoyi",
                            "title": "程序化交易",
                            "icon": "/src/img/icon_pointer_47_45.png",
                            "content": "<p><b>服务内容：</b>OTT方圆奥特程序化交易部通过强大的技术、资金等后台支持进行程序化交易系统开发，根据系统测试结果不对优化系统，并对交易实行严格风控管理。</p><p><b>服务说明：</b>程序化交易（Program Trading）又被称为量化交易、算法交易、黑盒子交易。在计算机和网络技术的支持下，设计人员将交易策略的逻辑与参数（即组合交易指令）通过电脑程序化运算，一旦预先设置好的组合交易指令被触发，则相应的买卖便立即发生。</p><p><b>服务特点：</b>此种交易方法交易速度非常快，可约束人的主观交易冲动，确保交易的一致性。</p>"
                        },
                        {
                            "anchor": "rineiqushijiaoyi",
                            "title": "日内趋势交易",
                            "icon": "/src/img/icon_line_47_45.png",
                            "content": "<p><b>服务内容：</b>OTT方圆奥特投资交易部通过强大的金融软件支持和基金资金支持进行投资交易，对交易实行严格风控管理。</p><p><b>服务说明：</b>日内趋势交易是在一日内完成买卖进出的趋势交易。交易员通过技术分析，抓住日内短期趋势波动进行交易。它讲究的是在顺应市场趋势的前提下利用技术指标来进行交易操作，心态与资金管理是取胜的关键。</p><p><b>服务特点：</b>此种交易方法比较稳健，可回避隔夜仓引致的风险。</p>"
                        },
                        {
                            "anchor": "rengonggaopinjiaoyi",
                            "title": "人工高频交易",
                            "icon": "/src/img/icon_man_47_45.png",
                            "content": "<p><b>服务内容：</b>OTT方圆奥特投资交易部通过强大的金融软件支持和基金资金支持进行投资交易，对交易实行严格风控管理。</p><p><b>服务说明：</b>人工高频交易（High Frequency Trading）最重要的是策略和速度。交易员捕捉入市后能迅速脱离入市成本的交易机会，若入市后不能立即获利，则迅速离场。</p><p><b>服务特点：</b>此种交易方法报撤单速度快，持仓时间短，交易策略灵活多变。</p>"
                        }
                    ]
                }
            ]
        },
        "about": {
            "navIndex": -1,
            "head": {
                "cn": "方圆奥特",
                "en": "OTT Traders",
                "desc": "自2010年5月成立伊始，OTT方圆奥特就坚持合规经营、风险控制、稳健获利的经营理念，在金融资本市场上具有强大的资源优势和丰富的投资管理经验。我们重视与客户发展为长期互信的战略合作伙伴关系，为不同背景、不同层次和不同区域的客户提供全方位增值服务。"
            },
            "classify": [
                {
                    "filename": "about",
                    "label": "关于我们",
                    "caption": {
                        "title": "我们是专业的金融资产管理公司",
                        "desc": "注册于中国证券投资基金业协会"
                    },
                    "list": [
                        {
                            "anchor": "gongsijianjie",
                            "title": "公司简介",
                            "icon": "/src/img/icon_logo_47_45.png",
                            "content": "<p><b>OTT方圆奥特（http://www.otttraders.com/）</b>是在中国证券投资基金业协会注册的专业金融资产管理公司，业务涵盖上市公司市值管理、投融服务、基金产品、日间趋势交易、程序化交易、人工高频交易。自2010年5月成立伊始，OTT方圆奥特就坚持合规经营、风险控制、稳健获利的经营理念，在金融资本市场上具有强大的资源优势和丰富的投资管理经验。我们重视与客户发展为长期互信的战略合作伙伴关系，为不同背景、不同层次和不同区域的客户提供全方位增值服务。</p><p><b>公司logo便是对我们企业文化的最好诠释：</b></p><p><img src=\"/src/img/icon_logo_52_52.png\" style=\"float:left;margin: 1.5em;width:4em;height: 4em;\">Logo以“OTT”三个字母为元素，来自于“一生二，二生三，三生万物”中的one two three首字母。Logo以”O”构成图形外围轮廓，中间用正负形构成“TT”两个字母，通过方正、稳重、规则、流畅的形象传递了我们安全、严谨、专业的工作态度；红色，表达了我们热情、积极进取的团队精神；“元”与“园”的形态融入其中，元，意为始，园，意为业。</p>"
                        },
                        {
                            "anchor": "zizhizhengming",
                            "title": "资质证明",
                            "icon": "/src/img/icon_qualification_47_45.png",
                            "content": "<p>我公司于2013年6月28日成为中国证券投资基金业协会特别会员，于2014年5月20日获取私募基金管理人资格。</p>"
                        }
                    ]
                },
                {
                    "filename": "contact",
                    "label": "联系我们",
                    "caption": {
                        "title": "如果您有任何问题或建议，可通过以下方式联系我们",
                        "desc": "期待与您的交流！"
                    },
                    "list": [
                        {
                            "anchor": "lianxifangshi",
                            "title": "联系方式",
                            "content": "<p>电　　话：86-021-67757638</p><p>传　　真：86-021-67757638</p><p>邮　　箱：<a href=\"mailto:OTT_Service@otttraders.com\">OTT_Service@otttraders.com</a></p><p>在线客服：<a target=\"_blank\" href=\"http://wpa.qq.com/msgrd?v=3&uin=2717237010&site=qq&menu=yes\"><img style=\"vertical-align: middle;\" border=\"0\" src=\"http://wpa.qq.com/pa?p=2:2717237010:51\" alt=\"点击这里给我发消息\" title=\"点击这里给我发消息\"/></a>（QQ：2717237010）</p><p>如果您有任何问题，可联系我们的在线客服，我们专业的客服人员将通过QQ在线解答您的问题。</p>"
                        }
                    ]
                }
            ]
        },
        "join": {
            "navIndex": 2,
            "head": {
                "cn": "人才加盟",
                "en": "Talent Recruitment",
                "desc": "自2010年5月成立伊始，OTT方圆奥特就坚持合规经营、风险控制、稳健获利的经营理念，在金融资本市场上具有强大的资源优势和丰富的投资管理经验。我们重视与客户发展为长期互信的战略合作伙伴关系，为不同背景、不同层次和不同区域的客户提供全方位增值服务。"
            },
            "classify": [
                {
                    "label": "投行加盟",
                    "caption": {
                        "title": "如果您开拓进取，社会资源丰富，善于交际，有良好的商业谈判能力",
                        "desc": "那还等什么，快点加入我们吧！"
                    },
                    "list": [
                        {
                            "anchor": "gaojikehuzhuanyuan",
                            "title": "高级客户专员",
                            "content": "<p><b>岗位描述：</b><br/>1、\t负责区域内投资银行业务，含公司债、企业债、私募债、并购与重组等企业投融资服务；<br/>2、\t实施项目尽职调查，策划设计投融资方案，确保投资银行业务安排合理、操作规范和准时完成。</p><p><b>岗位要求：</b><br/>1、\t在投资银行领域具备较高的业务水平；<br/>2、\t具有广泛的客户资源和良好的人脉关系；<br/>3、\t具有优秀的沟通能力和商务谈判能力；<br/>4、\t拥有优秀的团队合作精神、强烈的事业心和责任感；<br/>5、\t具备良好的分析和解决问题能力，拥有良好的个人品质和职业道德。</p><p>您可点击右色按钮在线申请该职位，也可您已准备好的简历投至<a href=\"mailto:OTT_HR@otttraders.com\">OTT_HR@otttraders.com</a></p>"
                        },
                        {
                            "anchor": "touhangyewuzhuanyuan",
                            "title": "投行业务专员",
                            "content": "<p><b>岗位描述：</b><br/>1、\t与客户、合作伙伴沟通；<br/>2、\t负责制定投融资方案，确保投资银行业务安排合理、操作规范和准时完成。</p><p><b>岗位要求：</b><br />1、\t金融、财经、会计相关专业本科及以上学历；<br />2、\t沟通能力强，具有良好的团队合作精神；<br />3、\t文案功底强，较强的写作分析能力和；<br />4、\t品行良好，有较强的工作责任心与事业心；<br />5、\t身体健康，能适应经常出差；<br />6、\t熟悉投资银行业务者，有相关业务经验者，有项目资源者优先考虑。</p><p>您可点击右侧按钮在线申请该职位，也可将您准备好的简历投至<a href=\"mailto:OTT_HR@otttraders.com\">OTT_HR@otttraders.com</a></p>"
                        },
                        {
                            "anchor": "touhangshichangkaifazhuanyuan",
                            "title": "投行市场开发专员",
                            "content": "<p><b>岗位描述：</b><br/>1、\t开发投资银行项目；<br/>2、\t实施项目尽职调查，策划设计投融资方案，确保投资银行业务安排合理、操作规范和准时完成。</p><p><b>岗位要求：</b><br/>1、\t金融、财经、会计相关专业本科及以上学历；<br/>2、\t具有广泛的客户资源和良好的人脉关系；<br/>3、\t沟通能力及商务谈判能力强，具有良好的团队合作精神；<br/>4、\t品行良好，有较强的工作责任心与事业心；<br/>5、\t身体健康，能适应经常出差。</p><p>您可点击右色按钮在线申请该职位，也可将已准备好的简历投至<a href=\"mailto:OTT_HR@otttraders.com\">OTT_HR@otttraders.com</a></p>"
                        }
                    ]
                },
                {
                    "label": "交易加盟",
                    "caption": {
                        "title": "如果您热爱交易，敢于挑战自我，有较强的分析能力",
                        "desc": "那还等什么，快点加入我们吧！我们将为您提供系统培训、专业金融软件支持及基金资金保障！"
                    },
                    "list": [
                        {
                            "anchor": "chengxuhuajiaoyijiameng",
                            "title": "程序化交易加盟",
                            "content": "<p><b>岗位描述：</b><br/>1、\t负责程序化交易系统开发，包括交易策略的研究、交易系统的编程和优化；<br/>2、\t负责交易策略的模拟交易测试与实盘交易测试；<br/>3、\t负责程序化交易的风险控制工作，分析并制定交易模式的风控方法，严格控制交易风险。</p><p><b>岗位描述：</b><br/>1、\t金融工程、计算机、系统工程、统计相关专业本科以上学历；<br/>2、\t对金融证券行业有浓厚兴趣，并立志于在此行业长期发展；<br/>3、\t具有一年以上金融程序化交易研究或开发经验；<br/>4、\t精通交易开拓者、金字塔、易盛、CTP等程序化交易平台中的一种或多种；<br/>5、\t拥有扎实的技术基础，精通C#、VB、C/C++等语言中的一种或多种，精通mysql、oracle、qlserver数据库中的一种或多种；<br/>6、\t具备较强的学习能力、逻辑思考能力和总结分析能力；<br/>7、\t有较强的责任感和事业心，具有优秀的团队合作精神。</p><p>您可点击右侧按钮在线申请该职位，也可将已准备好的简历投至<a href=\"mailto:OTT_HR@otttraders.com\">OTT_HR@otttraders.com</a></p>"
                        },
                        {
                            "anchor": "rineiqushijiaoyijiameng",
                            "title": "日内趋势交易加盟",
                            "content": "<p><b>岗位描述：</b><br/>1、\t对市场行情进行判断分析，根据市场波动情况进行日内趋势交易；<br/>2、\t针对期货、外汇、期权等金融产品进行日内趋势交易；<br/>3、\t公司提供系统培训、各种专业金融软件支持及基金资金保障。</p><p><b>岗位描述：</b><br/>1、\t本科及以上学历，30周岁以下；<br/>2、\t专业不限， 计算机、数学、物理、统计学等理工类优先；<br/>3、\t对金融证券行业有浓厚兴趣，并立志于在此行业长期发展；<br/>4、\t充满激情，敢于面对挑战；<br/>5、\t对数字及图表有较强理解力；<br/>6、\t有较强的逻辑思考能力和归纳总结能力；<br/>7、\t纪律性强，有良好的自我控制能力，具有团队合作精神。</p><p>您可点击右色按钮在线申请该职位，也可您已准备好的简历投至<a href=\"mailto:OTT_HR@otttraders.com\">OTT_HR@otttraders.com</a></p>"
                        },
                        {
                            "anchor": "rengonggaopinjiaoyijiameng",
                            "title": "人工高频交易加盟",
                            "content": "<p><b>岗位描述：</b><br/>1、\t对市场行情进行判断分析，根据市场波动情况进行即时交易；<br/>2、\t针对期货、外汇、期权等金融产品进行高频交易；<br/>3、\t公司提供系统培训、各种专业金融软件支持及基金资金保障。</p><p><b>岗位要求：</b><br>1、\t本科及以上学历，30周岁以下；<br>2、\t专业不限， 计算机、数学、物理、统计学等理工类优先；<br>3、\t对金融证券行业有浓厚兴趣，并立志于在此行业长期发展；<br>4、\t充满激情，敢于面对挑战；<br>5、\t对数字及图表有较强理解力；<br>6、\t有较强的逻辑思考能力和归纳总结能力；<br>7、\t纪律性强，有良好的自我控制能力，具有团队合作精神。</p><p>您可点击右侧按钮在线申请该职位，也可将已准备好的简历投至<a href=\"mailto:OTT_HR@otttraders.com\">OTT_HR@otttraders.com</a></p>"
                        }
                    ]
                }
            ]
        },
        "connection": {
            "navIndex": 3,
            "head": {
                "cn": "OTT",
                "en": "",
                "desc": "自2010年5月成立伊始，OTT方圆奥特就坚持合规经营、风险控制、稳健获利的经营理念，在金融资本市场上具有强大的资源优势和丰富的投资管理经验。我们重视与客户发展为长期互信的战略合作伙伴关系，为不同背景、不同层次和不同区域的客户提供全方位增值服务。"
            },
            "classify": [
                {
                    "label": "关联公司",
                    "caption": {
                        "title": "我公司与OTT Capital、OTT Financial 均为OTT的成员企业。",
                        "desc": "请了解我们吧！"
                    },
                    "list": [
                        {
                            "anchor": "OTT Capital",
                            "title": "OTT Capital",
                            "content": "<p>OTT CAPITAL是在加拿大安大略省证监会注册的综合性证券公司，专注于为合格投资者提供有特色的投资产品和个性化的投资管理服务，以及为公司、机构和政府提供资本市场融资服务。<br><a href=\"https://www.ottcapital.com/index.aspx\" target=\"_blank\">进入OTT Capital</a></p>"
                        },
                        {
                            "anchor": "OTT Financial",
                            "title": "OTT Financial",
                            "content": "<p>OTT方圆国际从2006年成立之初至今，一直致力于打造北美华人最信赖的资深金融服务品牌；它以广阔的视野、专业的研究、精准的判断和周到的服务，并奉行严格风险控制、稳健获利的投资理念，为移民、留学生、中小企业、商旅专业人士提供高品质的金融一站式服务。<br><a href=\"https://www.ottfinancial.com/index.aspx\" target=\"_blank\">进入OTT Financial</a></p>"
                        }
                    ]
                }
            ]
        }
    }

### /index/user

Request 

`GET /index/user.json`

    :::javascript
    {}

Response

    :::javascript
    {
        "success": true,
        "entities": {
            "default_channel": "00000001",
            "display_name": "联想",
            "username": "lenovo"
        }
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
                "media": "e2131231",
                "name": "广告位1",
                "type": 1,
                "subtype": 1,
                "modify_time": "2014年1月1日 0时0分1秒",
                "config": {
                    "close": false,
                    "blank": false,
                    "place": 1,
                    "height": 200,
                    "autoPlayInterval": 1000
                }
            },
            {
                "id": "s23c815f",
                "media": "e2131231",
                "name": "广告位2",
                "type": 10,
                "subtype": 1,
                "modify_time": "2014年1月1日 0时0分1秒",
                "config": {
                    "test": true,
                    "close": true,
                    "blank": true,
                    "place": 2,
                    "height": 100,
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

### /index/media/appPosition

Request 

`GET /index/media/appPosition.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "model": {}
    }

### /index/media/siteTemplate

Request 

`GET /index/media/siteTemplate.json`

    :::javascript
    {}

Response

    :::javascript
    {
        "success": true,
        "entities": [
            {
                id: 0, // 模版id
                adType: 5, // 模版类型 值同 AdType
                percent: 80, // 流量百分比 0 - 100
                jsSource: 'result.js', // cdn js文件地址
                data: {
                    "content": {
                        "iconArea": {
                            "backgroundColor": {
                                "color": "#60cb1b",
                                "opacity": "0"
                            },
                            "transform": {
                                "translate_x": "0",
                                "translate_y": "0",
                                "rotate_x": "0",
                                "rotate_y": "0",
                                "rotate_z": "0",
                                "skew": "0",
                                "scale": "100"
                            },
                            "animate": {
                                "duration": "0",
                                "timing_function": "ease-in-out",
                                "delay": "0",
                                "iteration_count": "0",
                                "direction": "alternate",
                                "fames": "from {-webkit-transform:translateY(-2em) scale(0.3);;background: rgba(96, 203, 27,0.5);-webkit-box-shadow: 0 0 5px rgba(255, 255, 255, 0.3) inset, 0 0 3px rgba(220, 120, 200, 0.5);color: red; }25% {background: rgba(196, 203, 27,0.8);-webkit-box-shadow: 0 0 10px rgba(255, 155, 255, 0.5) inset, 0 0 8px rgba(120, 120, 200, 0.8);color: blue;}50% {-webkit-transform:scale(0.8);background: rgba(196, 203, 127,1);-webkit-box-shadow: 0 0 5px rgba(155, 255, 255, 0.3) inset, 0 0 3px rgba(220, 120, 100, 1);color: orange;}75% {background: rgba(196, 203, 27,0.8);-webkit-box-shadow: 0 0 10px rgba(255, 155, 255, 0.5) inset, 0 0 8px rgba(120, 120, 200, 0.8);color: black;}to {-webkit-transform:translateY(2em) scale(0.5);;background: rgba(96, 203, 27,0.5);-webkit-box-shadow: 0 0 5px rgba(255, 255, 255, 0.3) inset, 0 0 3px rgba(220, 120, 200, 0.5);color: green;}"
                            }
                        },
                        "textArea": {
                            "backgroundColor": {
                                "color": "#60cb1b",
                                "opacity": "0"
                            },
                            "transform": {
                                "translate_x": "0",
                                "translate_y": "0",
                                "rotate_x": "0",
                                "rotate_y": "0",
                                "rotate_z": "0",
                                "skew": "0",
                                "scale": "100"
                            },
                            "animate": {
                                "duration": "0",
                                "timing_function": "ease-in-out",
                                "delay": "0",
                                "iteration_count": "0",
                                "direction": "alternate",
                                "fames": "from {-webkit-transform:translateY(-2em) scale(0.3);;background: rgba(96, 203, 27,0.5);-webkit-box-shadow: 0 0 5px rgba(255, 255, 255, 0.3) inset, 0 0 3px rgba(220, 120, 200, 0.5);color: red; }25% {background: rgba(196, 203, 27,0.8);-webkit-box-shadow: 0 0 10px rgba(255, 155, 255, 0.5) inset, 0 0 8px rgba(120, 120, 200, 0.8);color: blue;}50% {-webkit-transform:scale(0.8);background: rgba(196, 203, 127,1);-webkit-box-shadow: 0 0 5px rgba(155, 255, 255, 0.3) inset, 0 0 3px rgba(220, 120, 100, 1);color: orange;}75% {background: rgba(196, 203, 27,0.8);-webkit-box-shadow: 0 0 10px rgba(255, 155, 255, 0.5) inset, 0 0 8px rgba(120, 120, 200, 0.8);color: black;}to {-webkit-transform:translateY(2em) scale(0.5);;background: rgba(96, 203, 27,0.5);-webkit-box-shadow: 0 0 5px rgba(255, 255, 255, 0.3) inset, 0 0 3px rgba(220, 120, 200, 0.5);color: green;}"
                            }
                        },
                        "textTitleArea": {
                            "text_align": "Center",
                            "backgroundColor": {
                                "color": "#60cb1b",
                                "opacity": "0"
                            },
                            "transform": {
                                "translate_x": "0",
                                "translate_y": "0",
                                "rotate_x": "0",
                                "rotate_y": "0",
                                "rotate_z": "0",
                                "skew": "0",
                                "scale": "100"
                            },
                            "animate": {
                                "duration": "0",
                                "timing_function": "ease-in-out",
                                "delay": "0",
                                "iteration_count": "0",
                                "direction": "alternate",
                                "fames": "from {-webkit-transform:translateY(-2em) scale(0.3);;background: rgba(96, 203, 27,0.5);-webkit-box-shadow: 0 0 5px rgba(255, 255, 255, 0.3) inset, 0 0 3px rgba(220, 120, 200, 0.5);color: red; }25% {background: rgba(196, 203, 27,0.8);-webkit-box-shadow: 0 0 10px rgba(255, 155, 255, 0.5) inset, 0 0 8px rgba(120, 120, 200, 0.8);color: blue;}50% {-webkit-transform:scale(0.8);background: rgba(196, 203, 127,1);-webkit-box-shadow: 0 0 5px rgba(155, 255, 255, 0.3) inset, 0 0 3px rgba(220, 120, 100, 1);color: orange;}75% {background: rgba(196, 203, 27,0.8);-webkit-box-shadow: 0 0 10px rgba(255, 155, 255, 0.5) inset, 0 0 8px rgba(120, 120, 200, 0.8);color: black;}to {-webkit-transform:translateY(2em) scale(0.5);;background: rgba(96, 203, 27,0.5);-webkit-box-shadow: 0 0 5px rgba(255, 255, 255, 0.3) inset, 0 0 3px rgba(220, 120, 200, 0.5);color: green;}"
                            }
                        },
                        "textTitleText": {
                            "font": {
                                "fontSize": "12",
                                "lineHeight": "110",
                                "fontFamily": "Microsoft Yahei",
                                "color": "#000000"
                            },
                            "backgroundColor": {
                                "color": "#60cb1b",
                                "opacity": "0"
                            },
                            "transform": {
                                "translate_x": "0",
                                "translate_y": "0",
                                "rotate_x": "0",
                                "rotate_y": "0",
                                "rotate_z": "0",
                                "skew": "0",
                                "scale": "100"
                            }
                        },
                        "textDescriptionArea": {
                            "text_align": "Center",
                            "backgroundColor": {
                                "color": "#60cb1b",
                                "opacity": "0"
                            },
                            "transform": {
                                "translate_x": "0",
                                "translate_y": "0",
                                "rotate_x": "0",
                                "rotate_y": "0",
                                "rotate_z": "0",
                                "skew": "0",
                                "scale": "100"
                            },
                            "animate": {
                                "duration": "0",
                                "timing_function": "ease-in-out",
                                "delay": "0",
                                "iteration_count": "0",
                                "direction": "alternate",
                                "fames": "from {-webkit-transform:translateY(-2em) scale(0.3);;background: rgba(96, 203, 27,0.5);-webkit-box-shadow: 0 0 5px rgba(255, 255, 255, 0.3) inset, 0 0 3px rgba(220, 120, 200, 0.5);color: red; }25% {background: rgba(196, 203, 27,0.8);-webkit-box-shadow: 0 0 10px rgba(255, 155, 255, 0.5) inset, 0 0 8px rgba(120, 120, 200, 0.8);color: blue;}50% {-webkit-transform:scale(0.8);background: rgba(196, 203, 127,1);-webkit-box-shadow: 0 0 5px rgba(155, 255, 255, 0.3) inset, 0 0 3px rgba(220, 120, 100, 1);color: orange;}75% {background: rgba(196, 203, 27,0.8);-webkit-box-shadow: 0 0 10px rgba(255, 155, 255, 0.5) inset, 0 0 8px rgba(120, 120, 200, 0.8);color: black;}to {-webkit-transform:translateY(2em) scale(0.5);;background: rgba(96, 203, 27,0.5);-webkit-box-shadow: 0 0 5px rgba(255, 255, 255, 0.3) inset, 0 0 3px rgba(220, 120, 200, 0.5);color: green;}"
                            }
                        },
                        "textDescriptionText": {
                            "font": {
                                "fontSize": "12",
                                "lineHeight": "110",
                                "fontFamily": "Microsoft Yahei",
                                "color": "#000000"
                            },
                            "backgroundColor": {
                                "color": "#60cb1b",
                                "opacity": "0"
                            },
                            "transform": {
                                "translate_x": "0",
                                "translate_y": "0",
                                "rotate_x": "0",
                                "rotate_y": "0",
                                "rotate_z": "0",
                                "skew": "0",
                                "scale": "100"
                            }
                        },
                        "btnArea": {
                            "text_align": "Center",
                            "backgroundColor": {
                                "color": "#60cb1b",
                                "opacity": "0"
                            },
                            "transform": {
                                "translate_x": "0",
                                "translate_y": "0",
                                "rotate_x": "0",
                                "rotate_y": "0",
                                "rotate_z": "0",
                                "skew": "0",
                                "scale": "100"
                            },
                            "animate": {
                                "duration": 3,
                                "timing_function": "ease-in-out",
                                "delay": "0",
                                "iteration_count": "0",
                                "direction": "alternate",
                                "fames": "from {-webkit-transform:translateY(-2em) scale(0.3);;background: rgba(96, 203, 27,0.5);-webkit-box-shadow: 0 0 5px rgba(255, 255, 255, 0.3) inset, 0 0 3px rgba(220, 120, 200, 0.5);color: red; }25% {background: rgba(196, 203, 27,0.8);-webkit-box-shadow: 0 0 10px rgba(255, 155, 255, 0.5) inset, 0 0 8px rgba(120, 120, 200, 0.8);color: blue;}50% {-webkit-transform:scale(0.8);background: rgba(196, 203, 127,1);-webkit-box-shadow: 0 0 5px rgba(155, 255, 255, 0.3) inset, 0 0 3px rgba(220, 120, 100, 1);color: orange;}75% {background: rgba(196, 203, 27,0.8);-webkit-box-shadow: 0 0 10px rgba(255, 155, 255, 0.5) inset, 0 0 8px rgba(120, 120, 200, 0.8);color: black;}to {-webkit-transform:translateY(2em) scale(0.5);;background: rgba(96, 203, 27,0.5);-webkit-box-shadow: 0 0 5px rgba(255, 255, 255, 0.3) inset, 0 0 3px rgba(220, 120, 200, 0.5);color: green;}"
                            }
                        },
                        "btnContent": {
                            "content": "看一看",
                            "font": {
                                "fontSize": "12",
                                "lineHeight": "110",
                                "fontFamily": "Microsoft Yahei",
                                "color": "#000000"
                            },
                            "backgroundColor": {
                                "color": "#60cb1b",
                                "opacity": "0"
                            },
                            "transform": {
                                "translate_x": "0",
                                "translate_y": "0",
                                "rotate_x": "0",
                                "rotate_y": "0",
                                "rotate_z": "0",
                                "skew": "0",
                                "scale": "100"
                            }
                        }
                    },
                    "scale": {
                        "from": 75,
                        "to": 352,
                        "layout": {
                            "iconArea": 2,
                            "textArea": 1,
                            "btnArea": 0
                        }
                    }
                }
            },
            {
                id: 1, // 模版id
                adType: 2, // 模版类型 值同 AdType
                type: 1, // 广告位展现形式 Banner
                percent: 20, // 流量百分比 0 - 100
                jsSource: "", // cdn js文件地址
                data: {} // 数据文件，很大一坨json
            },
            {
                id: 2, // 模版id
                adType: 5, // 模版类型 值同 AdType
                type: 1, // 广告位展现形式 Banner
                percent: 80, // 流量百分比 0 - 100
                jsSource: "", // cdn js文件地址
                data: {} // 数据文件，很大一坨json
            },
            {
                id: 4, // 模版id
                adType: 5, // 模版类型 值同 AdType
                percent: 30, // 流量百分比 0 - 100
                jsSource: '' // cdn js文件地址
            }
        ]
    }

### /index/media/templateBannerTextIcon

Request 

`GET /index/media/templateBannerTextIcon.json`

    :::javascript
    {}

Response

    :::javascript
    {
        "success": true,
        "entities": {}
    }

### /index/media/templateBannerImage

Request 

`GET /index/media/templateBannerImage.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "model": {}
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

### /index/report/total

Request 

`GET /index/report/total.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "model": {}
    }

### /index/report/media

Request 

`GET /index/report/media.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "model": {}
    }

### /index/report/position

Request 

`GET /index/report/position.json`

    :::javascript
    {
    }

Response

    :::javascript
    {
        "success": true,
        "model": {}
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

