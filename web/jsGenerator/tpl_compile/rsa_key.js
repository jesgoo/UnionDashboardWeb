module.exports = function (_) {return function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='(function (jesgoo) {\r\n    if (!jesgoo) {\r\n        return;\r\n    }\r\n    /*\r\n     * rsa 加密的公钥\r\n     * */\r\n    // 1024 bit 最大限度加密116字符\r\n    //var passportPubKey = "B64306200B3CBF826A2DC8D249460E26E88789CB3728C55B3852A7AD2C92C1CFE5EFA98BD0AC37D908398709F830E63565844363EE8D4DA3F92F6D33694B4EAE65457A2088636E2FC97DE602F60E20BCA96BB445D8041F8674FCE88056A3F52ED543280FF60003B41BB78BAABB28D4AA40054A83A4800846F7A4D875CBC10851";\r\n    // jesgoo.setPubKey(passportPubKey, \'01\');\r\n    // 512 bit 最大限度加密63字符\r\n    var passportPubKey = "C751765F67613457DFC41A9840862663DD3C9F2A97D98D3AA38BB21A3F3B19B778A5367E162191FA190AAD5A77E3F3F201F5D123E802E6D7F68DEC18CC630E03";\r\n    jesgoo.setPubKey(passportPubKey, \'02\');\r\n    // 256 bit 最大限度加密31字符\r\n    //var passportPubKey = "FE7C1FA60C9097849A976B0F8632D599068BBCFFCF7B73B218A429BB708D8A63";\r\n    /*\r\n     * 为需要的url增加ck\r\n     * */\r\n    //console.log(jesgoo.getCk());\r\n})(this.jesgoo);';
return __p;
};};