module.exports = function (_) {return function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='';
 if (!data.debug) { 
__p+='\n<\\\\%\nvar clickMonitor = data.ClickMonitor || [];\nfor (var i = 0, l = clickMonitor.length; i < l; i += 1) {\n%\\\\>\n<input name="click" value="<\\\\%=clickMonitor[i]%\\\\>" type="hidden">\n<\\\\%\n}\n%\\\\>\n';
 } 
__p+='\n';
return __p;
};};