if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fn) {
        for (var i = 0, l = this.length; i < l; i += 1) {
            fn.call(window, this[i], i, this);
        }
    }
}
var gel = window.errorLog || [];
gel.push('s');

(function (log) {
    var gel = window.errorLog || [];
    gel.push('log');
    if (!log) return false;
    gel.push('logr');
    log(document.body, { type: 12 });
})(this.sendLog);

(function () {
    var html = document.documentElement;
    var field = 'currentFontSize';
    var baseSize = 10;
    var BaseWidth = 320;
    window.addEventListener('resize', setFontSize);
    setFontSize();
    function setFontSize() {
        var w = html.clientWidth;
        var h = html.clientHeight;
        var scale = w / BaseWidth;
        var fontSize = Math.floor(scale * baseSize);
        fontSize = fontSize < baseSize ? baseSize : fontSize;
        if (fontSize === html[field]) {
            return false;
        }
        html.style.fontSize = fontSize + 'px';
        html[field] = fontSize;
    }
})();