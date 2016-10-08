/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Fri Mar 27 2015 15:20:13 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */
(function () {
    mf.index.report.hourlyMedia = new er.Action({
        model: mf.index.report.model.hourlyMedia,
        view: new er.View({
            template: 'mf_index_report_hourlyMedia',
            UI_PROP: {
                hourlyMediaDateRegion: {
                    range: mf.index.reportRange
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
            console.log('onafterrepaint');
            var hourlyMediaListTable = esui.get('hourlyMediaList');
            hourlyMediaListTable.onsort({ field: hourlyMediaListTable.orderBy }, hourlyMediaListTable.order);
        },
        onafterrender: function () {
            console.log('onafterrender');
            var action = this;
            var model = action.model;
            var hourlyMediaDateSelect = esui.get('hourlyMediaDateSelect');
            var hourlyMediaListTable = esui.get('hourlyMediaList');
            hourlyMediaListTable.onsort = mf.m.utils.nextTickWrapper(function (orderField, order) {
                var orderBy = orderField.field;
                order = order == 'asc' ? 1 : -1;
                if (hourlyMediaListTable.datasource) {
                    hourlyMediaListTable.datasource.sort(function (a, b) {
                        return a[orderBy] > b[orderBy] ? order : -order;
                    });
                    hourlyMediaListTable.render();
                }
            }, hourlyMediaListTable);
            hourlyMediaDateSelect.onchange = mf.m.utils.nextTickWrapper(function (values, value) {
                mf.subActionRefresh(action, {
                    date: value
                });
            }, hourlyMediaDateSelect);

            var hourlyMediaDateRegion = esui.get('hourlyMediaDateRegion');
            hourlyMediaDateRegion.onchange = mf.m.utils.nextTickWrapper(function () {
                model.set('dateRegion', hourlyMediaDateRegion.getValue());
                renderDateSelector();
            });
            renderDateSelector();
            function renderDateSelector () {
                var dateRegion = hourlyMediaDateRegion.getValueAsObject();
                var dateLength = (dateRegion.end - dateRegion.begin) / 24 / 3600000;
                console.log('dateLength', dateLength);
                hourlyMediaDateSelect.datasource = $.map(
                    new Array(dateLength),
                    function (n, index) {
                        var current = mf.getDate(index, dateRegion.begin);
                        return {
                            text : mf.getDateString(current),
                            id : mf.getDateString(current, 'yyyyMMdd')
                        };
                    });
                var currentDateIndex = mf.m.utils.indexOfArray(
                    hourlyMediaDateSelect.datasource,
                    hourlyMediaDateSelect.value,
                    'id'
                );
                if (currentDateIndex == -1) {
                    hourlyMediaDateSelect.value = hourlyMediaDateSelect.datasource[0].id;
                }
                hourlyMediaDateSelect.render();
            }
        },
        onentercomplete: function () {
            console.log('onentercomplete');
            var action = this;
            var model = action.model;
            mf.m.highchart_hourview('#hourlyMediaChart', model.get('lists'));
        },
        onleave: function () {
            console.log('onleave');
        }
    });
})();