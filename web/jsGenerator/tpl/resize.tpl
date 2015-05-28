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