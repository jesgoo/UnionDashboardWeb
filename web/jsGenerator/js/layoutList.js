(function (){
    var root = this;
    var baseFontSize = 10;
    var baseWidth = 320 * 12 / baseFontSize;
    var layoutList = {
        'text_icon': function (scaleOption) {
            var from = scaleOption.from;
            var to = scaleOption.to;
            var width = baseWidth;
            var areaWidth = [
                (from / width * 100),
                ((to - from) / width) * 100,
                (1 - to / width) * 100
            ];
            var iconAreaIndex = scaleOption.layout.iconArea;
            var textAreaIndex = scaleOption.layout.textArea;
            if (areaWidth[iconAreaIndex] < 1) {
                areaWidth[textAreaIndex] += areaWidth[iconAreaIndex];
            }
            var area = areaWidth.map(function (n) {
                return n <= 0.3 ? 'display: none;' : 'width: ' + n + '%;'
            });
            area[0] += 'float:left;';
            area[2] += 'float:right;';
            var data = {};
            $.each(scaleOption.layout, function (name, value) {
                data[name] = area[value];
            });

            return data;
        },
        'image': function (scaleOption) {
            var from = scaleOption.from;
            var to = scaleOption.to;
            var width = baseWidth;
            var data = {
                'btnArea': 'left:' + (from / width * 100) + '%; width: ' + ((to - from) / width) * 100 + '%;'
            };
            if (to - from < 1) {
                data.btnArea = 'display: none;'
            }
            return data;
        }
    };
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = layoutList;
        }
        exports.layoutList = layoutList;
    } else {
        root.layoutList = layoutList;
    }
}.call(this));