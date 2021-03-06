/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Sat Aug 01 2015 14:45:56 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */
(function () {
    mf.index.account.info = new er.Action({
        model: mf.index.account.model.info,
        view: new er.View({
            template: 'mf_index_account_info',
            UI_PROP: {}
        }),
        STATE_MAP: {},

        onenter: function () {
            console.log('onenter');
            mf.onenter();
        },
        onafterrepaint: function () {
            console.log('onafterrepaint');
        },
        onafterrender: function () {
            console.log('onafterrender');
            var action = this;
            var V = mf.m.validate();

            V.reg(
                {
                    id: 'company',
                    rule: [
                        {
                            tpl: 'notNull', msg: '企业名称不能为空'
                        }
                    ]
                }
            );
            V.reg(
                {
                    id: 'payee',
                    rule: [
                        {
                            tpl: 'notNull', msg: '联系人姓名不能为空'
                        }
                    ]
                }
            );
            V.reg(
                {
                    id: 'phone',
                    rule: [
                        {
                            tpl: 'notNull', msg: '联系电话不能为空'
                        },
                        {
                            tpl: 'regex', regx: V.regexp.phone, msg: '联系电话输入有误'
                        }
                    ]
                }
            );
            V.reg(
                {
                    id: 'qq',
                    rule: [
                        {
                            tpl: 'notNull', msg: 'QQ不能为空'
                        }
                    ]
                }
            );
            V.reg(
                {
                    id: 'bank',
                    rule: [
                        {
                            tpl: 'notNull', msg: '收款银行名称不能为空'
                        }
                    ]
                }
            );
            V.reg(
                {
                    id: 'bank_address',
                    rule: [
                        {
                            tpl: 'notNull', msg: '收款银行开户地不能为空'
                        }
                    ]
                }
            );
            V.reg(
                {
                    id: 'bank_account',
                    rule: [
                        {
                            tpl: 'notNull', msg: '银行账号不能为空'
                        },
                        {
                            tpl: 'limitS', min: 1, max: 50, msg: '请填写正确的银行账号'
                        }
                    ]
                }
            );
            V.reg(
                {
                    id: 'tax_number',
                    rule: [
                        {
                            tpl: 'notNull', msg: '税号不能为空'
                        },
                        {
                            tpl: 'limitS', min: 5, msg: '请填写正确的税号'
                        }
                    ]
                }
            );
            V.reg(
                {
                    id: 'agreement',
                    rule: [
                        {
                            tpl: 'notNull', msg: '请阅读并同意用户协议'
                        }
                    ]
                }
            );
            V.reg(
                {
                    id: 'captcha',
                    rule: [
                        {
                            tpl: 'notNull', msg: '验证码不能为空'
                        }
                    ]
                }
            );


            esui.get('submit').onclick = function () {
                if (!action.validateForm() || !V.check()) {
                    return;
                }
                mf.loading();
                mf.parallelAjax(
                    {
                        url: '/user',
                        type: 'POST',
                        data: {
                            company: esui.get('company').getValue(),
                            payee: esui.get('payee').getValue(),
                            phone: esui.get('phone').getValue(),
                            email: esui.get('email').getValue(),
                            qq: esui.get('qq').getValue(),
                            bank: esui.get('bank').getValue(),
                            bank_address: esui.get('bank_address').getValue(),
                            bank_account: esui.get('bank_account').getValue(),
                            tax_number: esui.get('tax_number').getValue(),
                            captcha: esui.get('captcha').getValue(),
                            type: 1
                        }
                    },
                    function (result) {
                        // 暂时这样吧，用户信息以后再加入
                        var user = {
                            authority: 255
                        };
                        user.authority = parseInt(user.authority || 0);
                        if (user.authority > 0) {
                            user.authority |= 3;
                        }

                        T.cookie.set(mf.cookieKeyMap.authority, user.authority);
                        mf.authority.parse(user.authority);
                        if (action.model.get('force')) {
                            checkCrossLogin();
                        } else {
                            esui.Dialog.alert({
                                title: '操作提示',
                                content: '信息保存成功'
                            });
                        }
                    }
                ).fail(function () {
                        $('#captcha_img').trigger('click');
                    });
            };

            $('#captcha_img').click(function () {
                this.src = '/captcha?t=' + (new Date().getTime());
                $(this).show();
            }).trigger('click');

        },
        onentercomplete: function () {
            console.log('onentercomplete');
            mf.loaded();
        },
        onleave: function () {
            console.log('onleave');
        }
    });
})();