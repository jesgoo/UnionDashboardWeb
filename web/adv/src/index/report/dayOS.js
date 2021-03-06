/**
 * @file Generated by er-sync
 * @author killeryyl<longgeyang@jesgoo.com>
 * @date Mon Sep 28 2015 12:09:08 GMT+0800 (CST)
 * Copyright (c) 2015 jesgoo.com, Inc. All Rights Reserved
 */
(function () {
    mf.index.report.dayOS = new er.Action({
        model: mf.index.report.model.dayOS,
        view: new er.View({
            template: 'mf_index_report_dayOS',
            UI_PROP: {
                dayOSDate: {
                    range: mf.index.reportRange
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
            mf.onenter();
        },
        onafterrender: function () {
            console.log('onafterrender');
            var action = this;
            var model = action.model;

            var date = esui.get('dayOSDate');
            date.onchange = mf.m.utils.nextTickWrapper(function (value) {
                console.log('date change', value);
                mf.subActionRefresh(action, {
                    valueAsDate: value,
                    date: mf.getDateString(value)
                });
            }, date);

            var dayOSListTable = esui.get('dayOSList');
            dayOSListTable.onsort = mf.m.utils.nextTickWrapper(function (orderField, order) {
                var orderBy = orderField.field;
                order = order == 'asc' ? 1 : -1;
                dayOSListTable.datasource.sort(function (a, b) {
                    return a[orderBy] > b[orderBy] ? order : -order;
                });
                dayOSListTable.render();
            }, dayOSListTable);
        },
        onentercomplete: function () {
            console.log('onentercomplete');
            var action = this;
            var model = action.model;
            var $element = $('#dayOSChart');
            mf.m.highchart_drill('#dayOSChart',
                model.get('lists'), model.get('date'),
                function (event) {
                    if (event.point.name) {
                        $element.attr({
                            'data-cmd': 'step_os',
                            'data-os': event.point.os_id,
                            'data-name': event.point.name
                        });
                        $element.trigger('click');
                        $element.attr({
                            'data-cmd': null,
                            'data-os': null,
                            'data-name': null
                        });
                    }
                }
            );
            var data = model.get('lists');
            if (data.length) {
                var total = data.reduce(function (memory, n) {
                    memory.impression += n.impression || 0;
                    memory.click += n.click || 0;
                    memory.cost += n.cost || 0;
                    return memory;
                }, {
                    os_id: null,
                    name: '总计',
                    impression: 0,
                    click: 0,
                    cost: 0,
                    ctr: 0,
                    cpm: 0
                });
                if (total.impression) {
                    total.ctr = total.click / total.impression * 100;
                    total.cpm = total.cost / total.impression * 1000;
                }
            }

            mf.mockPager(data, {
                pager: esui.get('dayOSPager'),
                pageSizer: esui.get('dayOSPageSize'),
                table: esui.get('dayOSList')
            }, {
                afterSort: function (dataList, targets, opt) {
                    total && (targets.table.datasource || []).unshift(total);
                }
            })();
        }
    });
})();