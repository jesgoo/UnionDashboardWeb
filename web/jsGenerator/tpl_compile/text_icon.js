module.exports = function (_) {return function(data){
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
};};