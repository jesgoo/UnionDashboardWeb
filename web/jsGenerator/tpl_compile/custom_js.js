module.exports = function (_) {return function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+=''+
((__t=(_.templateList('interface', data)))==null?'':__t)+
'\n;(function () {\n    var jesgooData = this.jesgoo_data || {};\n    var html = ('+
((__t=(data.source))==null?'':__t)+
'.call(this, jesgooData.d));\n    var doc = this.document;\n    if(!doc){\n        console.log(html);\n        return;\n    }\n    this.jesgoo_interface.autoResizeImage();\n    setTimeout(function () {\n        doc.open();doc.write(html);doc.close();\n        '+
((__t=(_.templateList('rsa_monitor', data)))==null?'':__t)+
'\n        '+
((__t=(_.templateList('resize', data)))==null?'':__t)+
'\n    }, 0);\n}.call(this));\n';
return __p;
};};