/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Mon Sep 07 2015 13:21:21 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 *
 * ！！此文件同时用于生成前后端接口文档，对象的定义是合法的JSON格式（如key使用双引号）
 */

/**
 * 兼容node和browser环境
 */
if (typeof exports === 'undefined') {
    exports = {};
}


exports.request = {};


exports.response = {
    "success": true,
    "entities": {
        "201502": {
            "income": 321,
            "status": 0,// 0 是无可提现金额 1 财务审核中 2可以申请提现 3 提现审批中 4 提现完成
            "errorMsg": "错误信息不能提现",
            "discount": -100
        },
        "201503": {
            "income": 600,
            "status": 2,// 0 是无可提现金额 1 财务审核中 2可以申请提现 3 提现审批中 4 提现完成
            "discount": 100
        },
        "201501": {
            "income": 900,
            "status": 2,// 0 是无可提现金额 1 财务审核中 2可以申请提现 3 提现审批中 4 提现完成
            "discount": -100,
            "comment": "不能提"
        },
        "201504": {
            "income": 1500,
            "status": 3,// 0 是无可提现金额 1 财务审核中 2可以申请提现 3 提现审批中 4 提现完成
            "discount": -200,
            "comment": "不能提"
        },
        "201505": {
            "income": 500,
            "status": 4,// 0 是无可提现金额 1 财务审核中 2可以申请提现 3 提现审批中 4 提现完成
            "discount": 0,
            "comment": ""
        }
    }
};/*exports.response = {
    "success": true,
    "entities": {
        "201502": {
            "income": 321,
            "status": 0,// 0 是无可提现金额 1 财务审核中 2可以申请提现 3 提现审批中 4 提现完成
            "errorMsg": "错误信息不能提现",
            "discount": [
                {
                    "media_id": "123",
                    "media_ame": "媒体123",
                    "channel_id": "",
                    "channel_name": "",
                    "discount": 123,
                    "comment": "作弊扣款"
                },
                {
                    "media_id": "",
                    "media_ame": "",
                    "channel_id": "123",
                    "channel_name": "渠道123",
                    "discount": 123,
                    "comment": "作弊扣款"
                }
            ]
        },
        "201503": {
            "income": 600,
            "status": 2,// 0 是无可提现金额 1 财务审核中 2可以申请提现 3 提现审批中 4 提现完成
            "discount": [
                {
                    "media_id": "123",
                    "media_ame": "媒体123",
                    "channel_id": "",
                    "channel_name": "",
                    "discount": 123,
                    "comment": "作弊扣款"
                },
                {
                    "media_id": "",
                    "media_ame": "",
                    "channel_id": "123",
                    "channel_name": "渠道123",
                    "discount": 123,
                    "comment": "作弊扣款"
                }
            ]
        }
    }
};*/