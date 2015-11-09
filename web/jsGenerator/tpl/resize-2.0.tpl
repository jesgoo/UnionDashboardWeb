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

var myLocalStorage = {};

try {
    myLocalStorage = window.localStorage;
    if (myLocalStorage && myLocalStorage.getItem && myLocalStorage.setItem) {
        myLocalStorage.setItem('test', 'testInfo');
        myLocalStorage.getItem('test');
        myLocalStorage.setItem('test', null);
    } else {
        throw new Error('no valid localStorage');
    }
    gel.push('l');
} catch (e) {
    myLocalStorage = {};
    myLocalStorage.setItem = function (key, value) {
    };
    myLocalStorage.getItem = function (key) {
        return null
    };
    gel.push('nl');
}

function setCookie(name, value) {
    myLocalStorage.setItem(name,value);
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + 365*24*3600*1000);
    try {
    document.cookie = name + "=" + value + ";Domain=.jesgoo.com;Path=/;expires=" + oDate;
    document.cookie = name + "=" + value + ";Domain=.moogos.com;Path=/;expires=" + oDate;
    } catch(e) {}
}

function getCookie(name) {
    if(myLocalStorage.getItem(name)){
        return myLocalStorage.getItem(name);
    }
    try {
    var arr = document.cookie.split("; ");
    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split("=");
        if (arr2[0] == name) {
            return arr2[1];
        }
    }
    } catch(e) {}
    return "";
}

function loaded() {
    var aEle = document.getElementById("jesgoo-link");
    var attrJSON = aEle.getAttribute("extra");
    try {
        var attrObj = eval("(" + attrJSON + ")");
    } catch (e) {
        gel.push('eval error:' + attrJSON);
        var attrObj = {};
    }

    var btn = document.getElementById('jesgoo-btn');
    var text;
    if(btn){
        if (/^zh/i.test(navigator.language)) {
            if (attrObj.act == 2) {
                text = eval('("\\u4e' + '0b\\u8f' + '7d")');
            } else {
                text = eval('("\\u67' + 'e5\\u7' + '70b")');
            }
        } else {
            if (attrObj.act == 2) {
                text = 'Get';
            } else {
                text = 'More';
            }
        }
        btn.innerHTML = text;
        btn.style.display = "block"
    }

    try{
        var ua = window.navigator.userAgent.toLowerCase();
        var snTs = myLocalStorage.getItem("snTs") || 0;
        if (!getCookie("JESGOOSN") && (ua.indexOf("android") >= 0 || ua.indexOf("adr") >= 0) && new Date().getTime() - snTs > 1800 * 1000) {
            myLocalStorage.setItem("snTs",new Date().getTime());
            window.jsonp1 = function(cuidJson) {
                var cuid = cuidJson.cuid;
                var sn = cuid.substring(cuid.indexOf('|') + 1);
                sn = sn.split('').reverse().join('');
                setCookie("JESGOOSN",sn);
                window._czc && window._czc.push(["_trackEvent", "id", "available", getCookie("JESGOOID")]);
            }
            var confScript = document.createElement('script');
            confScript.setAttribute("src", "http://127.0.0.1:7777/getcuid?callback=jsonp1&_=" + new Date().getTime());
            document.body.appendChild(confScript);
            window._czc && window._czc.push(["_trackEvent", "id", "total", getCookie("JESGOOID")]);
        }
    }catch(e){
        console.log("localStorage securety error");
    }
};

var runCount = 0;
var hasJesgoo = 0;
var runner = function () {
    var list = [
        'jesgoo-link',
        'jg-link'
    ], $a;
    for (var i = 0; i < list.length; i+=1) {
        $a = document.getElementById(list[i]);
        if ($a) break;
    }
    if (!$a) {
        runCount += 1;
        setTimeout(runner, 25);
    } else {
        loaded();
        gel.push('ld');
    }
};
runner();

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
    gel.push('ss');
})();
