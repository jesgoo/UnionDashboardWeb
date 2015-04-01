/**
 * @file Generated by er-sync
 * @author Luics<xukai01@baidu.com>
 * @date Tue Mar 31 2015 11:50:48 GMT+0800 (CST)
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 */
(function () {
    mf.index.report.hourlyPositions = new er.Action({
        model: mf.index.report.model.hourlyPositions,
        view: new er.View({
            template: 'mf_index_report_hourlyPositions',
            UI_PROP: {
                hourlyPositionsDate: {
                    range: mf.index.reportRangeToday
                }
            }
        }),
        STATE_MAP: {
            'date':  mf.getDateString(mf.getDate(0))
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

            var date = esui.get('hourlyPositionsDate');
            date.onchange = mf.m.utils.nextTickWrapper(function (value) {
                console.log('date change', value);
                mf.subActionRefresh(action, {
                    valueAsDate: value,
                    date: mf.getDateString(value)
                });
            }, date);

            var hourlyPositionsListTable = esui.get('hourlyPositionsList');
            var hourlyPositionsTimeSelect = esui.get('hourlyPositionsTimeSelect');
            hourlyPositionsListTable.onsort = mf.m.utils.nextTickWrapper(function (orderField, order) {
                var orderBy = orderField.field;
                order = order == 'asc' ? 1 : -1;
                hourlyPositionsListTable.datasource.sort(function (a, b) {
                    return a[orderBy] > b[orderBy] ? order : -order;
                });
                hourlyPositionsListTable.render();
            }, hourlyPositionsListTable);

            hourlyPositionsTimeSelect.onchange = function (values, value) {
                hourlyPositionsListTable.datasource = model.get('reportData')[value];
                hourlyPositionsListTable.onsort({ field: hourlyPositionsListTable.orderBy }, hourlyPositionsListTable.order);
            };
        },
        onentercomplete: function () {
            console.log('onentercomplete');
            var hourlyPositionsTimeSelect = esui.get('hourlyPositionsTimeSelect');
            hourlyPositionsTimeSelect.setValue(hourlyPositionsTimeSelect.datasource[0].id, { dispatch: true });
        },
        onleave: function () {
            console.log('onleave');
        }
    });
})();