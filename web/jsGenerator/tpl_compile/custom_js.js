module.exports = function (_) {return function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='(function () {\n    var jesgooData = this.jesgoo_data || {};\n    var html = ('+
((__t=(data.source))==null?'':__t)+
'.call(this, jesgooData.d));\n    var doc = this.document;\n    if(!doc){console.log(html);return;}\n    setTimeout(function () {\n        doc.open();doc.write(html);doc.close();\n    }, 0);\n}.call(this))\n';
return __p;
};};