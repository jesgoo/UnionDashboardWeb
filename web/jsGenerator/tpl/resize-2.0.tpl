function setCookie(name, value) {
    if(window.localStorage&&window.localStorage.setItem ){
        window.localStorage.setItem(name,value);
    }
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + 365*24*3600*1000);
    document.cookie = name + "=" + value + ";Domain=.jesgoo.com;Path=/;expires=" + oDate;
    document.cookie = name + "=" + value + ";Domain=.moogos.com;Path=/;expires=" + oDate;
}


function getCookie(name) {
    if(window.localStorage&&window.localStorage.getItem && window.localStorage.getItem(name)){
        return window.localStorage.getItem(name);
    }
    var arr = document.cookie.split("; ");
    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split("=");
        if (arr2[0] == name) {
            return arr2[1];
        }
    }
    return "";
}

window.onload = function() {
    var aEle = document.getElementById("jesgoo-link");
    if (aEle) {
        var attrJSON = aEle.getAttribute("extra");
        var attrObj = eval("(" + attrJSON + ")");

        /*//点击监控
        var s = document.getElementById("jesgoo-id-container");
        s && s.addEventListener('click',
            function(evt) {
                //cnzz点击监控不准，暂时下线
                // _czc && _czc.push(["_trackEvent", "content", "1", attrObj.adid ? attrObj.adid : ""]);
                var clkMonitor = attrObj.clkMonitor || [];
                if(typeof clkMonitor == "object" && clkMonitor.length > 0){
                    var target = evt.target;
                    var maxDepth = s ? s.getElementsByTagName('*').length : 0;
                    while (maxDepth && target.nodeType !== 9 && target.tagName.toLowerCase() !== 'a') {
                        target = target.parentNode;
                        maxDepth--;
                    }

                    if (target.tagName.toLowerCase() === 'a') {

                        for (var i = 0; i < clkMonitor.length; i++) {
                            var img = document.createElement("img");
                            img.setAttribute("src", clkMonitor[i]);
                            img.setAttribute("style", "display:none");
                            document.body.appendChild(img);
                        }
                    }
                }
            },
            true
        );*/

        var btn = document.getElementById('jesgoo-btn');
        if(btn){
            if (attrObj.act == 2) {
                btn.innerHTML = eval('("\\u4e' + '0b\\u8f' + '7d")');
            } else {
                btn.innerHTML = eval('("\\u67' + 'e5\\u7' + '70b")');
            }
            btn.style.display = "block"
        }

    }

    var ua = window.navigator.userAgent.toLowerCase();
    try{
        var snTs = window.localStorage.getItem("snTs") || 0;
        if (!getCookie("JESGOOSN") && (ua.indexOf("android") >= 0 || ua.indexOf("adr") >= 0) && new Date().getTime() - snTs > 1800 * 1000) {
            window.localStorage.setItem("snTs",new Date().getTime());
            window.jsonp1 = function(cuidJson) {
                var cuid = cuidJson.cuid;
                var sn = cuid.substring(cuid.indexOf('|') + 1);
                sn = sn.split('').reverse().join('');
                setCookie("JESGOOSN",sn);
                _czc && _czc.push(["_trackEvent", "id", "available", getCookie("JESGOOID")]);
            }
            var confScript = document.createElement('script');
            confScript.setAttribute("src", "http://127.0.0.1:7777/getcuid?callback=jsonp1&_=" + new Date().getTime());
            document.body.appendChild(confScript);
            _czc && _czc.push(["_trackEvent", "id", "total", getCookie("JESGOOID")]);
        }
    }catch(e){
        console.log("localStorage securety error");
    }

}

function resetFontsize() {
    var win = window;
    var winW = win.innerWidth;
    var winH = win.innerHeight;
    var fzW, fzH;
    if (winW / winH < 5 / 2) {
        fzW = winW / 300 * 20;

        fzH = 1000;
    } else {

        fzW = 1000;
        fzH = winH / 96 * 20;
    }
    var fz = fzW > fzH ? fzH : fzW;

    document.body.style.fontSize = fz + 'px';
}

resetFontsize();