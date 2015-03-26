/**
 * @file {#ersync}
 * @author {#author}
 * @date {#date}
 * {#copyright}
 */
(function () {
    mf.{#page}.{#module}.{#action} = new er.Action({
        model: mf.{#page}.{#module}.model.{#action},
        view: new er.View({
            template: 'mf_{#page}_{#module}_{#action}',
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
        },
        onleave: function () {
            console.log('onleave');
        }
    });
})();