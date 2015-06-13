/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Tue Mar 31 2015 10:59:06 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */
(function () {
    mf.index.report.dailyPositions = new er.Action({
        model: mf.index.report.model.dailyPositions,
        view: new er.View({
            template: 'mf_index_report_dailyPositions',
            UI_PROP: {
                dailyPositionsDateRegion: {
                    range: mf.index.reportRange
                }
            }
        }),
        STATE_MAP: {
            'dateRegion':  mf.getDateString(mf.getDate(-7)) + ',' +
                           mf.getDateString(mf.getDate(-1))
        },

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
            var model = action.model;

            var dateRegion = esui.get('dailyPositionsDateRegion');
            dateRegion.onchange = mf.m.utils.nextTickWrapper(function (value, name, index) {
                console.log('date change', name, index);
                mf.subActionRefresh(action, {
                    dateRegion: dateRegion.getValue()
                });
            }, dateRegion);

            var dailyPositionsListTable = esui.get('dailyPositionsList');
            var dailyPositionsDateSelect = esui.get('dailyPositionsDateSelect');
            dailyPositionsListTable.onsort = mf.m.utils.nextTickWrapper(function (orderField, order) {
                var orderBy = orderField.field;
                order = order == 'asc' ? 1 : -1;
                dailyPositionsListTable.datasource.sort(function (a, b) {
                    return a[orderBy] > b[orderBy] ? order : -order;
                });
                dailyPositionsListTable.render();
            }, dailyPositionsListTable);
            dailyPositionsDateSelect.onchange = function (values, value) {
                dailyPositionsListTable.datasource = model.get('reportData')[value];
                dailyPositionsListTable.onsort({ field: dailyPositionsListTable.orderBy }, dailyPositionsListTable.order);
            };
        },
        onentercomplete: function () {
            console.log('onentercomplete');
            var dailyPositionsDateSelect = esui.get('dailyPositionsDateSelect');
            dailyPositionsDateSelect.setValue(dailyPositionsDateSelect.datasource[0].id, { dispatch: true });
        },
        onleave: function () {
            console.log('onleave');
        }
    });
})();