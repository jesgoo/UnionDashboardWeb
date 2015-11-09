(function (jesgoo) {
    var gel = window.errorLog || [];
    gel.push('ck');
    var runCount = 0;
    var hasJesgoo = 0;
    var runner = function () {
        if (jesgoo && !hasJesgoo) {
            jesgoo.triggerCK();
            hasJesgoo = 1;
        }
        if (hasJesgoo) {
            var list = [
                jesgoo.monitorID,
                'jesgoo-link',
                'jg-link'
            ], $a;
            for (var i = 0; i < list.length; i+=1) {
                $a = document.getElementById(list[i]);
                if ($a) break;
            }
        }
        if (!$a) {
            runCount += 1;
            setTimeout(runner, 25);
        } else {
            var origin_href = $a.href;
            var clickCount = 0;
            gel.push('ckr');
            $a.onclick = (function (fn) {
                return function (e) {
                    var ckString = '.' + jesgoo.getCk($a, e);
                    if (jesgoo.ckValue && $a.href) {
                        $a.href = origin_href + ckString;
                        clickCount += 1;
                    }
                    if ($a.href && clickCount < 2) {
                        click_monitor($a.parentNode);
                        clickCount += 1;
                    }
                    return fn && fn.apply(this, arguments);
                }
            })($a.onclick);
        }
    };
    runner();
    function click_monitor(container) {
       [].forEach.call(container.childNodes, function (n) {
            if (n.name == 'click' && n.value) {
                var image = new Image();
                image.src = n.value;
                image.style.display = 'none';
                container.appendChild(image);
            }
        });
    }
})(this.jesgoo);
