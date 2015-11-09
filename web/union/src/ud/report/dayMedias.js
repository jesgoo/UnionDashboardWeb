/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Fri Mar 27 2015 15:20:13 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */
(function () {

    mf.ud.report.dayMedias = new er.Action({
        model: mf.ud.report.model.dayMedias,
        view: new er.View({
            template: 'mf_ud_report_dayMedias',
            UI_PROP: {
                dayMediasDate: {
                    range: mf.ud.reportRange
                }
            }
        }),
        STATE_MAP: {
            date: mf.getDateString(mf.getDate(-1)),
            page: 0,
            pageSize: mf.PAGER_MODEL.pageSizes[0].value,
            pageSizes: mf.PAGER_MODEL.pageSizes
        },

        onenter: function () {
            console.log('onenter');
        },
        onafterrepaint: function () {
            console.log('onafterrepaint');
        },
        onafterrender: function () {
            console.log('onafterrender');
            var action = this;
            var model = action.model;

            var date = esui.get('dayMediasDate');
            date.onchange = mf.m.utils.nextTickWrapper(function (value) {
                console.log('date change', value);
                mf.subActionRefresh(action, {
                    valueAsDate: value,
                    date: mf.getDateString(value)
                });
            }, date);

            var dayMediasListTable = esui.get('dayMediasList');
            dayMediasListTable.onsort = mf.m.utils.nextTickWrapper(function (orderField, order) {
                var orderBy = orderField.field;
                order = order == 'asc' ? 1 : -1;
                dayMediasListTable.datasource.sort(function (a, b) {
                    return a[orderBy] > b[orderBy] ? order : -order;
                });
                dayMediasListTable.render();
            }, dayMediasListTable);
        },
        onentercomplete: function () {
            console.log('onentercomplete');
            var action = this;
            var model = action.model;
            var $element = $('#dayMediasChart');
            mf.m.highchart_drill('#dayMediasChart',
                model.get('lists'), model.get('date'),
                function (event) {
                    if (event.point.media) {
                        $element.attr({
                            'data-cmd': 'step_media',
                            'data-media': event.point.media,
                            'data-name': event.point.name
                        });
                        $element.trigger('click');
                        $element.attr({
                            'data-cmd': null,
                            'data-media': null,
                            'data-name': null
                        });
                    }
                }
            );

            mf.mockPager(model.get('lists'), {
                pager: esui.get('dayMediasPager'),
                pageSizer: esui.get('dayMediasPageSize'),
                table: esui.get('dayMediasList')
            })();
        },
        onleave: function () {
            console.log('onleave');
        }
    });
})();