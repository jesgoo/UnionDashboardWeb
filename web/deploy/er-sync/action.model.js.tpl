/**
 * @file {#ersync}
 * @author {#author}
 * @date {#date}
 * {#copyright}
 */
(function () {
    var FIELDS = function (model) {
        return [];
    };
    mf.{#page}.{#module}.model.{#action} = new er.Model({
        QUERY_MAP: {},
        LOADER_LIST: ['modelLoader'],
        modelLoader: new er.Model.Loader(function () {
            console.log('modelLoader');
            var loader = this;
            
            // TODO {#ersync}
            // loader.stop();
            // mf.get(
            //    '{#page}/{#module}/{#action}?' + loader.getQueryString(),
            //    function (model) {
            //       mf.initModel({loader: loader, model: model, fields: FIELDS});
            //       loader.start();
            //    }
            // );
        })
    });
})();