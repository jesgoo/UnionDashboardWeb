(function (){
    var root = this;
    var baseFontSize = 10;
    var baseWidth = 320 * 12 / baseFontSize;
    var layoutList = {
        'free': function (scaleOption) {
            return {};
        },
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
            areaWidth[3] = areaWidth[textAreaIndex] + areaWidth[iconAreaIndex];
            var area = [];
            for (var i = 0; i < areaWidth.length; i += 1){
                var n = areaWidth[i];
                area[i]  = n <= 0.3 ? 'display: none;' : 'width: ' + n + '%;'
            }
            area[0] += 'float:left;';
            area[2] += 'float:right;';
            var data = {};
            for (var name in scaleOption.layout) {
                data[name] = area[scaleOption.layout[name]];
            }
            data.noIcon = area[3];
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
            data.noImage = 'background-image:url(http://ubmcmm.baidustatic.com/media/v1/0f000FtbHOko08TnpKpGO6.gif);background-size:100% 100%;';
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