(function() {
    if (top !== window) {
        var theMF = typeof mf !== 'undefined' ? mf : top.mf;
        if (theMF && !theMF.isLoginPage()) {
            window._key = Math.random() * 100000;
            top.mf.screenPage.find(window._key, function(shell) {
                shell();
            });
        }
    }
    else $(function() {
        var minWidth = window.mf && window.mf.windowMinWidth || 1270;
        $(window).on('resize', function() {
            var body = $('body');
            var mw = $(window).width();
            if (mw < minWidth) body.css('width', minWidth);
            else body.css('width', 'auto');
        }).resize();
    });
})();