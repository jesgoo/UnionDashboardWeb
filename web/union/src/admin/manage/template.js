/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Tue May 19 2015 19:37:10 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */
(function () {
    function listeningTask(id) {
        mf.parallelAjax([
            '/longtask/status/' + id
        ], function (entities) {
            entities.output && (entities.outputHTML = entities.output.replace(/(未生效)/g, '<span class="error">$1</span>').split('\n').reverse().join('<br>'));
            $('#result').html(
                mf.etplFetch('task_info', entities)
            );
            var runTask = esui.get('runTask');
            if (entities.done) {
                runTask && runTask.enable();
            } else {
                runTask && runTask.disable();
                setTimeout(listeningTask.bind(null, id), 1000);
            }
        });
    }
    mf.admin.manage.template = new er.Action({
        model: mf.admin.manage.model.template,
        view: new er.View({
            template: 'mf_admin_manage_template',
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
        },
        onentercomplete: function () {
            console.log('onentercomplete');
            mf.loaded();
            var action = this;
            var model = action.model;
            var runTask = esui.get('runTask');
            runTask.onclick = function () {
                mf.parallelAjax([
                    '/longtask/rebuildtemplate'
                ], function (entities) {
                    listeningTask(entities.id);
                    runTask.disable();
                });
            };
        },
        onleave: function () {
            console.log('onleave');
        }
    });
})();