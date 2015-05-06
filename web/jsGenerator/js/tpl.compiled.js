_('base_css').templateCache(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='.logImg {\nwidth: 1px;\nheight: 1px;\nposition: absolute;\nleft:0;\ntop:0;\nopacity: 0;\n}\n.layout-area {\npadding: 0;\nmargin: 0;\ndisplay: table;\nheight: 100%;\ntable-layout: fixed;\nbox-sizing: border-box;\n}\n.jg-banner {\ndisplay: block;\nwidth: 100%;\nheight: 100%;\nposition: relative;\ntext-align: center;\n}\n.jg-banner .jq-container {\ndisplay: table-cell;\nvertical-align: middle;\nbox-sizing: border-box;\nwidth: 100%;\nheight: 100%;\n}\n\n.jg-banner .btn-area .jg-btn:before {\nword-break: break-all;\nbox-sizing: border-box;\ndisplay: inline-block;\n}\n.no-image .image-area,\n.no-image .icon-area {\ndisplay: none;\n}';
return __p;
});
_('custom_js').templateCache(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='(function () {\n    var jesgooData = this.jesgoo_data || {};\n    var html = ('+
((__t=(data.source))==null?'':__t)+
'.call(this, jesgooData.d));\n    var doc = this.document;\n    if(!doc){console.log(html);return;}\n    setTimeout(function () {\n        doc.open();doc.write(html);doc.close();\n    }, 0);\n}.call(this))\n';
return __p;
});
_('image').templateCache(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<style>\n'+
((__t=(_.templateList('base_css')))==null?'':__t)+
'\n.jg-banner .btn-area {\n    position: absolute;\n    top:0;\n}\n.jg-banner .image-area img {\nheight: 100%;\nwidth: 100%;\n}\n.jg-banner .btn-area {\n'+
((__t=(data.layout.btnArea))==null?'':__t)+
'\n'+
((__t=(data.content.btnAreaStyle))==null?'':__t)+
'\n}\n.jg-banner .btn-area .jg-btn:before {\n'+
((__t=(data.content.btnContentStyle))==null?'':__t)+
'\n}\n.jg-banner .image-area {\n'+
((__t=(data.layout.imageArea))==null?'':__t)+
'\n'+
((__t=(data.content.imageAreaStyle))==null?'':__t)+
'\n}\n'+
((__t=(data.content.animation))==null?'':__t)+
'\n</style>\n<a class="jg-banner jg-image layout-area" href="<\\\\%=data.ClickUrl%\\\\>" target="_blank">\n    <div class="layout-area image-area">\n        <div class="jg-image jq-container">\n            <img src="<\\\\%=data.ImageUrl%\\\\>" onerror="this.parentNode.parentNode.parentNode.className+=\' no-image\'" />\n        </div>\n    </div>\n    <div class="layout-area btn-area">\n        <div class="jg-btn jq-container"></div>\n    </div>\n</a>\n    '+
((__t=(_.templateList('impression_monitor')))==null?'':__t)+
'\n';
return __p;
});
_('impression_monitor').templateCache(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<\\\\%\nvar impressionUrl = data.ImpressionUrl || [];\nfor (var i = 0, l = impressionUrl.length; i < l; i += 1) {\n%\\\\>\n<img class="logImg" src="<\\\\%=impressionUrl[i]%\\\\>"/>\n<\\\\%\n}\n%\\\\>';
return __p;
});
_('text_icon').templateCache(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<style>\n'+
((__t=(_.templateList('base_css')))==null?'':__t)+
'\n.jg-banner .icon-area img {\nheight: auto;\nwidth: auto;\nmax-width: 100%;\nmax-height: 100%;\n}\n.jg-banner .text-area {\noverflow: hidden;\n}\n.jg-banner .text-area .jg-description,\n.jg-banner .text-area .jg-title {\noverflow: hidden;\nwhite-space: nowrap;\ntext-overflow: ellipsis;\n}\n.jg-banner .icon-area {\n'+
((__t=(data.layout.iconArea))==null?'':__t)+
'\n'+
((__t=(data.content.iconAreaStyle))==null?'':__t)+
'\n}\n.jg-banner .btn-area {\n'+
((__t=(data.layout.btnArea))==null?'':__t)+
'\n'+
((__t=(data.content.btnAreaStyle))==null?'':__t)+
'\n}\n.jg-banner .btn-area .jg-btn:before {\n'+
((__t=(data.content.btnContentStyle))==null?'':__t)+
'\n}\n.jg-banner .text-area {\n'+
((__t=(data.layout.textArea))==null?'':__t)+
'\n'+
((__t=(data.content.textAreaStyle))==null?'':__t)+
'\n}\n.jg-banner .text-area .text-container {\n'+
((__t=(data.content.textContainerStyle))==null?'':__t)+
'\n}\n.jg-banner .text-area .jg-title {\n'+
((__t=(data.content.jgTitleStyle))==null?'':__t)+
'\n}\n.jg-banner .text-area .jg-title .text {\n'+
((__t=(data.content.jgTitleTextStyle))==null?'':__t)+
'\n}\n.jg-banner .text-area .jg-description {\n'+
((__t=(data.content.jgDescriptionStyle))==null?'':__t)+
'\n}\n.jg-banner .text-area .jg-description .text {\n'+
((__t=(data.content.jgDescriptionTextStyle))==null?'':__t)+
'\n}\n'+
((__t=(data.content.animation))==null?'':__t)+
'\n</style>\n<a class="jg-banner jg-text-icon layout-area" href="<\\\\%=data.ClickUrl%\\\\>" target="_blank">\n    ';

    var area = [];
    var layout = data.scale.layout || {};
    for (var areaName in layout) {
        area[layout[areaName]] = areaName;
    }
    
__p+='\n    '+
((__t=(_.templateList('text_icon_' + area[0])))==null?'':__t)+
'\n    '+
((__t=(_.templateList('text_icon_' + area[2])))==null?'':__t)+
'\n    '+
((__t=(_.templateList('text_icon_' + area[1])))==null?'':__t)+
'\n</a>\n'+
((__t=(_.templateList('impression_monitor')))==null?'':__t)+
'';
return __p;
});
_('text_icon_btnArea').templateCache(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<div class="layout-area btn-area">\n    <div class="jg-btn jq-container"></div>\n</div>';
return __p;
});
_('text_icon_iconArea').templateCache(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<div class="layout-area icon-area">\n    <div class="jg-icon jq-container">\n        <img src="<\\\\%=data.LogoUrl%\\\\>" onerror="this.parentNode.parentNode.parentNode.className+=\' no-image\'" />\n    </div>\n</div>';
return __p;
});
_('text_icon_textArea').templateCache(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<div class="layout-area text-area">\n    <div class="jq-container">\n        <div class="text-container">\n            <div class="jg-title"><\\\\%=data.Title%\\\\></div>\n            <div class="jg-description"><\\\\%=data.Description1%\\\\></div>\n        </div>\n    </div>\n</div>';
return __p;
});