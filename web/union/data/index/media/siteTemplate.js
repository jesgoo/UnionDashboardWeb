/**
 * @file Generated by er-sync
 * @author Luics<xukai01@baidu.com>
 * @date Tue Apr 14 2015 14:15:42 GMT+0800 (CST)
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 *
 * ！！此文件同时用于生成前后端接口文档，对象的定义是合法的JSON格式（如key使用双引号）
 */

/**
 * 兼容node和browser环境
 */
if (typeof exports === 'undefined') {
    exports = {};
}

/*
 *
 type AdInfo struct {
 AdType          AdType
 TEXT      AdType = 1 // 对应文件 模版ID[adslot]_序号[index]_text .js|.css
 IMAGE     AdType = 2 // 对应文件 模版ID[adslot]_序号[index]_image
 HTML      AdType = 3 // 不走模版 下游给出的是HTML格式的广告
 VIDEO     AdType = 4 // 不走模版
 TEXT_ICON AdType = 5 // 对应文件 模版ID[adslot]_序号[index]_text_icon
 AdSrc           AdSrc              不要
 InteractionType InteractionType
 NO_INTERACT InteractionType = 0
 SURFING     InteractionType = 1
 DOWNLOAD    InteractionType = 2
 DIALING     InteractionType = 3
 MESSAGE     InteractionType = 4
 MAIL        InteractionType = 5
 AdSlotType      AdSlotType
 AdSlotType_BANNER         AdSlotType = 1
 AdSlotType_OFFERWALL      AdSlotType = 2
 AdSlotType_RECOMMEND      AdSlotType = 3
 AdSlotType_INITIALIZATION AdSlotType = 4 //开屏
 AdSlotType_INSERT         AdSlotType = 5 //插屏
 AdSlotType_PUSH           AdSlotType = 6 //推送
 AdSlotType_NATIVE         AdSlotType = 7 //原生广告
 AdSlotType_SQUARE         AdSlotType = 8 //方形广告
 AdSlotType_LOCKER         AdSlotType = 11
 AdSlotType_VIDEO          AdSlotType = 12 // 视频广告
 AdSlotType_LINK           AdSlotType = 13 // 文字链
 Adid            int64              不要
 AdidStr         string
 Groupid         int64              不要
 Planid          int64              不要
 Userid          int64              不要
 Title           string
 AdName          string             不要
 Bid             int64              不要
 Price           int64              不要
 Ctr             int64              不要
 Cpm             int64              不要
 //	WuliaoType      int32           不要
 Description1    string
 Description2    string
 VideoSrc        string             不要
 VideoDuration   int // 视频播放时长   不要
 ImageUrl        string             不要
 ImageSize       SizeInfo           不要
 LogoUrl         string
 LogoSize        SizeInfo           不要
 ClickUrl        string
 ImpressionUrl   []string
 VideoImp        []VideoImp         不要
 ClickMonitor    []string
 HtmlSnippet     bytes.Buffer       不要
 Package         string 包名
 Appname         string 应用名
 PackageSize     uint32 包大小
 MatchAdSlotType uint32 //请求位置和广告类型的匹配度。 0 是完全匹配   不要
 DspMediaid      string             不要
 DspChannelid    string             不要
 MaterialReady   bool               不要
 Domain          string // 广告domain, 当前只有百度广告有，自己探测 不要

 // just for app
 DownloadUrl string 不要
 ActionUrl   string 不要
 InstallUrl  string 不要

 // for locker
 Score uint32   不要

 */
exports.request = {};


exports.response = {
    "success": true,
    "entities": [
        {
            id: 0, // 模版id
            adslot: 's12312', // 模版类型 值同 AdType
            adtype: 5, // 模版类型 值同 AdType
            percent: 80, // 流量百分比 0 - 100
            version: 'result', // cdn js文件地址
            json: {
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
            adtype: 2, // 模版类型 值同 AdType
            percent: 20, // 流量百分比 0 - 100
            version: "", // cdn js文件地址
            json: {} // 数据文件，很大一坨json
        },
        {
            id: 2, // 模版id
            adtype: 5, // 模版类型 值同 AdType
            percent: 80, // 流量百分比 0 - 100
            version: "", // cdn js文件地址
            json: {} // 数据文件，很大一坨json
        },
        {
            id: 4, // 模版id
            adtype: 5, // 模版类型 值同 AdType
            percent: 30, // 流量百分比 0 - 100
            version: '' // cdn js文件地址
        }
    ]
};

