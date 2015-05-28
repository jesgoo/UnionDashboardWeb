(function (jesgoo) {
    if (!jesgoo) {
        return;
    }
    jesgoo.triggerCK();
    var runCount = 0;
    var runner = function () {
        var list = [
            jesgoo.monitorID,
            'jesgoo-link',
            'jg-link'
        ], $a;
        for (var i = 0; i < list.length; i+=1) {
            $a = document.getElementById(list[i]);
            if ($a) break;
        }
        if (!$a) {
            runCount += 1;
            setTimeout(runner, 50);
        } else {
            $a.onclick = (function (fn) {
                return function () {
                    var ckString = '.' + jesgoo.getCk();
                    if (jesgoo.ckValue) {
                        $a.href += ckString;
                        $a.onclick = null;
                    }
                    return fn && fn.apply(this, arguments);
                }
            })($a.onclick);
        }
    };
    runner();
})(this.jesgoo);