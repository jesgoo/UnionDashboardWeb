module.exports = function (_) {return function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='';
 if (!data.debug) { 
__p+='\n<\\\\%\nvar impressionUrl = data.ImpressionUrl || [];\nfor (var i = 0, l = impressionUrl.length; i < l; i += 1) {\n%\\\\>\n<img class="logImg" src="<\\\\%=impressionUrl[i]%\\\\>"/>\n<\\\\%\n}\n%\\\\>\n<<\\\\%=\'script\'%\\\\> src="http://s11.cnzz.com/z_stat.php?id=1254107932&web_id=1254107932"></<\\\\%=\'script\'%\\\\>>\n';
 } 
__p+='\n';
return __p;
};};