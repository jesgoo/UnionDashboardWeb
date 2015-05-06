module.exports = function (_) {return function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<\\\\%\nvar impressionUrl = data.ImpressionUrl || [];\nfor (var i = 0, l = impressionUrl.length; i < l; i += 1) {\n%\\\\>\n<img class="logImg" src="<\\\\%=impressionUrl[i]%\\\\>"/>\n<\\\\%\n}\n%\\\\>';
return __p;
};};