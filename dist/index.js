!function(){var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};var e={},n=function(t,e){return t(e={exports:{}},e.exports),e.exports}((function(n,i){var r;n.exports=(r=r||function(n,i){var r;if("undefined"!=typeof window&&window.crypto&&(r=window.crypto),!r&&"undefined"!=typeof window&&window.msCrypto&&(r=window.msCrypto),!r&&void 0!==t&&t.crypto&&(r=t.crypto),!r)try{r=e}catch(t){}var o=function(){if(r){if("function"==typeof r.getRandomValues)try{return r.getRandomValues(new Uint32Array(1))[0]}catch(t){}if("function"==typeof r.randomBytes)try{return r.randomBytes(4).readInt32LE()}catch(t){}}throw new Error("Native crypto module could not be used to get secure random number.")},s=Object.create||function(){function t(){}return function(e){var n;return t.prototype=e,n=new t,t.prototype=null,n}}(),a={},u=a.lib={},c=u.Base={extend:function(t){var e=s(this);return t&&e.mixIn(t),e.hasOwnProperty("init")&&this.init!==e.init||(e.init=function(){e.$super.init.apply(this,arguments)}),e.init.prototype=e,e.$super=this,e},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}},p=u.WordArray=c.extend({init:function(t,e){t=this.words=t||[],this.sigBytes=null!=e?e:4*t.length},toString:function(t){return(t||d).stringify(this)},concat:function(t){var e=this.words,n=t.words,i=this.sigBytes,r=t.sigBytes;if(this.clamp(),i%4)for(var o=0;o<r;o++){var s=n[o>>>2]>>>24-o%4*8&255;e[i+o>>>2]|=s<<24-(i+o)%4*8}else for(o=0;o<r;o+=4)e[i+o>>>2]=n[o>>>2];return this.sigBytes+=r,this},clamp:function(){var t=this.words,e=this.sigBytes;t[e>>>2]&=4294967295<<32-e%4*8,t.length=n.ceil(e/4)},clone:function(){var t=c.clone.call(this);return t.words=this.words.slice(0),t},random:function(t){for(var e=[],n=0;n<t;n+=4)e.push(o());return new p.init(e,t)}}),f=a.enc={},d=f.Hex={stringify:function(t){for(var e=t.words,n=t.sigBytes,i=[],r=0;r<n;r++){var o=e[r>>>2]>>>24-r%4*8&255;i.push((o>>>4).toString(16)),i.push((15&o).toString(16))}return i.join("")},parse:function(t){for(var e=t.length,n=[],i=0;i<e;i+=2)n[i>>>3]|=parseInt(t.substr(i,2),16)<<24-i%8*4;return new p.init(n,e/2)}},l=f.Latin1={stringify:function(t){for(var e=t.words,n=t.sigBytes,i=[],r=0;r<n;r++){var o=e[r>>>2]>>>24-r%4*8&255;i.push(String.fromCharCode(o))}return i.join("")},parse:function(t){for(var e=t.length,n=[],i=0;i<e;i++)n[i>>>2]|=(255&t.charCodeAt(i))<<24-i%4*8;return new p.init(n,e)}},h=f.Utf8={stringify:function(t){try{return decodeURIComponent(escape(l.stringify(t)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(t){return l.parse(unescape(encodeURIComponent(t)))}},y=u.BufferedBlockAlgorithm=c.extend({reset:function(){this._data=new p.init,this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=h.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(t){var e,i=this._data,r=i.words,o=i.sigBytes,s=this.blockSize,a=o/(4*s),u=(a=t?n.ceil(a):n.max((0|a)-this._minBufferSize,0))*s,c=n.min(4*u,o);if(u){for(var f=0;f<u;f+=s)this._doProcessBlock(r,f);e=r.splice(0,u),i.sigBytes-=c}return new p.init(e,c)},clone:function(){var t=c.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0}),g=(u.Hasher=y.extend({cfg:c.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){y.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){return t&&this._append(t),this._doFinalize()},blockSize:16,_createHelper:function(t){return function(e,n){return new t.init(n).finalize(e)}},_createHmacHelper:function(t){return function(e,n){return new g.HMAC.init(t,n).finalize(e)}}}),a.algo={});return a}(Math),r)}));function i(){var t=n.HmacSHA256((new Date).toISOString(),"AWS4"+metadata.configuration.UserID),e=n.HmacSHA256(metadata.configuration.AwsRegion,t),i=n.HmacSHA256("lex",e);return n.HmacSHA256("aws4_request",i)}metadata={systemName:"AWS_Lex_ChatBot",displayName:"AWS Lex ChatBot Broker",description:"AWS Lex ChatBot Broker",configuration:{AwsRegion:{displayName:"AWS Region",type:"string",value:"eu-west-2"},BotName:{displayName:"Bot Name",type:"string",value:"MedicalBotNHS"},BotAlias:{displayName:"Bot Name",type:"string",value:"latestversion"},UserID:{displayName:"User ID",type:"string",value:"AKIARXLDA4AZB24QPA72"}}},ondescribe=async function({}){postSchema({objects:{message:{displayName:"Message",description:"Represents a text reply",properties:{inputText:{displayName:"Input Text",type:"string"},outputText:{displayName:"Output Text",type:"string"}},methods:{postText:{displayName:"Post Text",type:"execute",inputs:["inputText"],outputs:["outputText"]}}}}})},onexecute=async function({objectName:t,methodName:e,parameters:n,properties:r,configuration:o}){switch(t){case"message":await async function(t,e,n){switch(t){case"postText":await function(t,e){return new Promise((n,r)=>{var o=new XMLHttpRequest;o.onreadystatechange=function(){try{if(4!==o.readyState)return;if(200!==o.status)throw new Error("Failed with status "+o.status);postResult({outputText:"Test"}),n()}catch(t){r(t)}};var s,a={inputText:t.inputText.toString()},u=JSON.stringify(a);o.open("POST",`https://runtime.lex.${e.AwsRegion}.amazonaws.com/bot/${e.BotName}/alias/${e.BotAlias}/user/${e.UserID}/text`),o.setRequestHeader("Authorization",`AWS4-HMAC-SHA256 Credential=${e.UserID}/${s=new Date,s.getFullYear().toString()+("0"+(s.getMonth()+1)).slice(-2)+("0"+s.getDate()).slice(-2)}/${e.AwsRegion}/lex/aws4_request, SignedHeaders=host;x-amz-content-sha256;x-amz-date, Signature=${i()}`),o.setRequestHeader("Content-Type","application/json"),o.setRequestHeader("Content-Length",u.length.toString()),o.send(u)})}(e,n);break;default:throw new Error("The method "+t+" is not supported.")}}(e,r,o);break;default:throw new Error("The object "+t+" is not supported.")}}}();
//# sourceMappingURL=index.js.map
