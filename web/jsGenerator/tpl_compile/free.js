module.exports = function (_) {return function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+=''+
((__t=(_.templateList('base_head', data)))==null?'':__t)+
'\n<style>\n.jg-banner {\n'+
((__t=(data.content.bannerStyle))==null?'':__t)+
'\n}\n'+
((__t=(data.content.animation))==null?'':__t)+
'\n</style>\n'+
((__t=(_.templateList('impression_monitor', data)))==null?'':__t)+
'\n<a id="jg-link" class="jg-banner jg-free" href="<\\\\%=data.ClickUrl%\\\\>" target="_blank">\n    '+
((__t=(data.content.html))==null?'':__t)+
'\n</a>\n'+
((__t=(_.templateList('impression_monitor', data)))==null?'':__t)+
'\n'+
((__t=(_.templateList('click_monitor', data)))==null?'':__t)+
'\n'+
((__t=(_.templateList('base_foot', data)))==null?'':__t)+
'';
return __p;
};};