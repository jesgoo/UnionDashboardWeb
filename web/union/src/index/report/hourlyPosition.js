/**
 * @file Generated by er-sync
 * @author Luics<xukai01@baidu.com>
 * @date Tue Mar 31 2015 10:59:06 GMT+0800 (CST)
 * Copyright (c) 2012 Baidu.com, Inc. All Rights Reserved
 */
(function () {
    mf.index.report.hourlyPosition = new er.Action({
        model: mf.index.report.model.hourlyPosition,
        view: new er.View({
            template: 'mf_index_report_hourlyPosition',
            UI_PROP: {
                hourlyPositionDateRegion: {
                    range: mf.index.reportRangeToday
                }
            }
        }),
        STATE_MAP: {
            'dateRegion':  mf.getDateString(mf.getDate(-7)) + ',' +
                           mf.getDateString(mf.getDate(0)),
            'date': mf.getDateString(mf.getDate(0), 'yyyyMMdd')
        },

        onenter: function () {
            console.log('onenter');
            mf.onenter();
        },
        onafterrepaint: function () {
            console.log('onafterrender');
            var hourlyPositionListTable = esui.get('hourlyPositionList');
            hourlyPositionListTable.onsort({ field: hourlyPositionListTable.orderBy }, hourlyPositionListTable.order);
        },
        onafterrender: function () {
            console.log('onafterrender');
            var action = this;
            var model = action.model;
            var hourlyPositionDateSelect = esui.get('hourlyPositionDateSelect');
            var hourlyPositionListTable = esui.get('hourlyPositionList');
            hourlyPositionListTable.onsort = mf.m.utils.nextTickWrapper(function (orderField, order) {
                var orderBy = orderField.field;
                order = order == 'asc' ? 1 : -1;
                if (hourlyPositionListTable.datasource) {
                    hourlyPositionListTable.datasource.sort(function (a, b) {
                        return a[orderBy] > b[orderBy] ? order : -order;
                    });
                    hourlyPositionListTable.render();
                }
            }, hourlyPositionListTable);
            hourlyPositionDateSelect.onchange = mf.m.utils.nextTickWrapper(function (values, value) {
                mf.subActionRefresh(action, {
                    date: value
                });
            }, hourlyPositionDateSelect);

            var hourlyPositionDateRegion = esui.get('hourlyPositionDateRegion');
            hourlyPositionDateRegion.onchange = mf.m.utils.nextTickWrapper(function () {
                model.set('dateRegion', hourlyPositionDateRegion.getValue());
                renderDateSelector();
            });
            renderDateSelector();
            function renderDateSelector () {
                var dateRegion = hourlyPositionDateRegion.getValueAsObject();
                var dateLength = (dateRegion.end - dateRegion.begin) / 24 / 3600000;
                hourlyPositionDateSelect.datasource = $.map(
                    new Array(dateLength),
                    function (n, index) {
                        var current = mf.getDate(index, dateRegion.begin);
                        return {
                            text : mf.getDateString(current),
                            id : mf.getDateString(current, 'yyyyMMdd')
                        };
                    });
                var currentDateIndex = mf.m.utils.indexOfArray(
                    hourlyPositionDateSelect.datasource,
                    hourlyPositionDateSelect.value,
                    'id'
                );
                if (currentDateIndex == -1) {
                    hourlyPositionDateSelect.value = hourlyPositionDateSelect.datasource[0].id;
                }
                hourlyPositionDateSelect.render();
            }
        },
        onentercomplete: function () {
            console.log('onentercomplete');
            var action = this;
            var model = action.model;
            mf.m.highchart_hourview('#hourlyPositionChart', model.get('lists'));
        },
        onleave: function () {
            console.log('onleave');
        }
    });
})();