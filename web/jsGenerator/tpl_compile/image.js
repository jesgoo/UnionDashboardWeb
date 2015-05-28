module.exports = function (_) {return function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+=''+
((__t=(_.templateList('base_head', data)))==null?'':__t)+
'\n<style>\n.btn-area {\n    position: absolute;\n    top:0;\n}\n.image-area {\n    width: 100%;\n    height: 100%;\n    display: block;\n}\n.image-area .jg-image {\n    display: block;\n}\n.image-area img {\n    height: 100%;\n    width: 100%;\n}\n.no-image {\n'+
((__t=(data.layout.noImage))==null?'':__t)+
'\n}\n.jg-banner {\n'+
((__t=(data.content.bannerStyle))==null?'':__t)+
'\n}\n.btn-area {\n'+
((__t=(data.layout.btnArea))==null?'':__t)+
'\n'+
((__t=(data.content.btnAreaStyle))==null?'':__t)+
'\n}\n.btn-area .jg-btn:before {\n'+
((__t=(data.content.btnContentStyle))==null?'':__t)+
'\n}\n.image-area {\n'+
((__t=(data.layout.imageArea))==null?'':__t)+
'\n'+
((__t=(data.content.imageAreaStyle))==null?'':__t)+
'\n}\n.image-area img{\n'+
((__t=(data.content.imageStyle))==null?'':__t)+
'\n}\n'+
((__t=(data.content.animation))==null?'':__t)+
'\n</style>\n<a id="jg-link" class="jg-banner jg-image layout-area" href="<\\\\%=data.ClickUrl%\\\\>" target="_blank">\n    <div class="layout-area image-area">\n        <div class="jg-image jq-container">\n            <img src="<\\\\%=data.ImageUrl%\\\\>" onerror="this.parentNode.parentNode.parentNode.className+=\' no-image\'" />\n        </div>\n    </div>\n    <div class="layout-area btn-area">\n        <div class="jg-btn jq-container"></div>\n    </div>\n</a>\n'+
((__t=(_.templateList('impression_monitor', data)))==null?'':__t)+
'\n'+
((__t=(_.templateList('base_foot', data)))==null?'':__t)+
'';
return __p;
};};