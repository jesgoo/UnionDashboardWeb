module.exports = function (_) {return function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='(function (jesgoo) {\r\n    var gel = window.errorLog || [];\r\n    gel.push(\'ck\');\r\n    var runCount = 0;\r\n    var hasJesgoo = 0;\r\n    var runner = function () {\r\n        if (jesgoo && !hasJesgoo) {\r\n            jesgoo.triggerCK();\r\n            hasJesgoo = 1;\r\n        }\r\n        if (hasJesgoo) {\r\n            var list = [\r\n                jesgoo.monitorID,\r\n                \'jesgoo-link\',\r\n                \'jg-link\'\r\n            ], $a;\r\n            for (var i = 0; i < list.length; i+=1) {\r\n                $a = document.getElementById(list[i]);\r\n                if ($a) break;\r\n            }\r\n        }\r\n        if (!$a) {\r\n            runCount += 1;\r\n            setTimeout(runner, 25);\r\n        } else {\r\n            var origin_href = $a.href;\r\n            var clickCount = 0;\r\n            gel.push(\'ckr\');\r\n            $a.onclick = (function (fn) {\r\n                return function (e) {\r\n                    var ckString = \'.\' + jesgoo.getCk($a, e);\r\n                    if (jesgoo.ckValue && $a.href) {\r\n                        $a.href = origin_href + ckString;\r\n                        clickCount += 1;\r\n                    }\r\n                    if ($a.href && clickCount < 2) {\r\n                        click_monitor($a.parentNode);\r\n                        clickCount += 1;\r\n                    }\r\n                    return fn && fn.apply(this, arguments);\r\n                }\r\n            })($a.onclick);\r\n        }\r\n    };\r\n    runner();\r\n    function click_monitor(container) {\r\n       [].forEach.call(container.childNodes, function (n) {\r\n            if (n.name == \'click\' && n.value) {\r\n                var image = new Image();\r\n                image.src = n.value;\r\n                image.style.display = \'none\';\r\n                container.appendChild(image);\r\n            }\r\n        });\r\n    }\r\n})(this.jesgoo);\r\n';
return __p;
};};