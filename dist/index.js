!function(){var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function e(t,e){return t(e={exports:{}},e.exports),e.exports}var n={},i=e((function(e,i){var r;e.exports=(r=r||function(e,i){var r;if("undefined"!=typeof window&&window.crypto&&(r=window.crypto),!r&&"undefined"!=typeof window&&window.msCrypto&&(r=window.msCrypto),!r&&void 0!==t&&t.crypto&&(r=t.crypto),!r)try{r=n}catch(t){}var s=function(){if(r){if("function"==typeof r.getRandomValues)try{return r.getRandomValues(new Uint32Array(1))[0]}catch(t){}if("function"==typeof r.randomBytes)try{return r.randomBytes(4).readInt32LE()}catch(t){}}throw new Error("Native crypto module could not be used to get secure random number.")},o=Object.create||function(){function t(){}return function(e){var n;return t.prototype=e,n=new t,t.prototype=null,n}}(),a={},u=a.lib={},c=u.Base={extend:function(t){var e=o(this);return t&&e.mixIn(t),e.hasOwnProperty("init")&&this.init!==e.init||(e.init=function(){e.$super.init.apply(this,arguments)}),e.init.prototype=e,e.$super=this,e},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}},p=u.WordArray=c.extend({init:function(t,e){t=this.words=t||[],this.sigBytes=null!=e?e:4*t.length},toString:function(t){return(t||h).stringify(this)},concat:function(t){var e=this.words,n=t.words,i=this.sigBytes,r=t.sigBytes;if(this.clamp(),i%4)for(var s=0;s<r;s++){var o=n[s>>>2]>>>24-s%4*8&255;e[i+s>>>2]|=o<<24-(i+s)%4*8}else for(s=0;s<r;s+=4)e[i+s>>>2]=n[s>>>2];return this.sigBytes+=r,this},clamp:function(){var t=this.words,n=this.sigBytes;t[n>>>2]&=4294967295<<32-n%4*8,t.length=e.ceil(n/4)},clone:function(){var t=c.clone.call(this);return t.words=this.words.slice(0),t},random:function(t){for(var e=[],n=0;n<t;n+=4)e.push(s());return new p.init(e,t)}}),f=a.enc={},h=f.Hex={stringify:function(t){for(var e=t.words,n=t.sigBytes,i=[],r=0;r<n;r++){var s=e[r>>>2]>>>24-r%4*8&255;i.push((s>>>4).toString(16)),i.push((15&s).toString(16))}return i.join("")},parse:function(t){for(var e=t.length,n=[],i=0;i<e;i+=2)n[i>>>3]|=parseInt(t.substr(i,2),16)<<24-i%8*4;return new p.init(n,e/2)}},d=f.Latin1={stringify:function(t){for(var e=t.words,n=t.sigBytes,i=[],r=0;r<n;r++){var s=e[r>>>2]>>>24-r%4*8&255;i.push(String.fromCharCode(s))}return i.join("")},parse:function(t){for(var e=t.length,n=[],i=0;i<e;i++)n[i>>>2]|=(255&t.charCodeAt(i))<<24-i%4*8;return new p.init(n,e)}},l=f.Utf8={stringify:function(t){try{return decodeURIComponent(escape(d.stringify(t)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(t){return d.parse(unescape(encodeURIComponent(t)))}},y=u.BufferedBlockAlgorithm=c.extend({reset:function(){this._data=new p.init,this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=l.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(t){var n,i=this._data,r=i.words,s=i.sigBytes,o=this.blockSize,a=s/(4*o),u=(a=t?e.ceil(a):e.max((0|a)-this._minBufferSize,0))*o,c=e.min(4*u,s);if(u){for(var f=0;f<u;f+=o)this._doProcessBlock(r,f);n=r.splice(0,u),i.sigBytes-=c}return new p.init(n,c)},clone:function(){var t=c.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0}),g=(u.Hasher=y.extend({cfg:c.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){y.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){return t&&this._append(t),this._doFinalize()},blockSize:16,_createHelper:function(t){return function(e,n){return new t.init(n).finalize(e)}},_createHmacHelper:function(t){return function(e,n){return new g.HMAC.init(t,n).finalize(e)}}}),a.algo={});return a}(Math),r)}));e((function(t,e){var n;t.exports=(n=i,function(t){var e=n,i=e.lib,r=i.WordArray,s=i.Hasher,o=e.algo,a=[],u=[];!function(){function e(e){for(var n=t.sqrt(e),i=2;i<=n;i++)if(!(e%i))return!1;return!0}function n(t){return 4294967296*(t-(0|t))|0}for(var i=2,r=0;r<64;)e(i)&&(r<8&&(a[r]=n(t.pow(i,.5))),u[r]=n(t.pow(i,1/3)),r++),i++}();var c=[],p=o.SHA256=s.extend({_doReset:function(){this._hash=new r.init(a.slice(0))},_doProcessBlock:function(t,e){for(var n=this._hash.words,i=n[0],r=n[1],s=n[2],o=n[3],a=n[4],p=n[5],f=n[6],h=n[7],d=0;d<64;d++){if(d<16)c[d]=0|t[e+d];else{var l=c[d-15],y=(l<<25|l>>>7)^(l<<14|l>>>18)^l>>>3,g=c[d-2],m=(g<<15|g>>>17)^(g<<13|g>>>19)^g>>>10;c[d]=y+c[d-7]+m+c[d-16]}var w=i&r^i&s^r&s,S=(i<<30|i>>>2)^(i<<19|i>>>13)^(i<<10|i>>>22),x=h+((a<<26|a>>>6)^(a<<21|a>>>11)^(a<<7|a>>>25))+(a&p^~a&f)+u[d]+c[d];h=f,f=p,p=a,a=o+x|0,o=s,s=r,r=i,i=x+(S+w)|0}n[0]=n[0]+i|0,n[1]=n[1]+r|0,n[2]=n[2]+s|0,n[3]=n[3]+o|0,n[4]=n[4]+a|0,n[5]=n[5]+p|0,n[6]=n[6]+f|0,n[7]=n[7]+h|0},_doFinalize:function(){var e=this._data,n=e.words,i=8*this._nDataBytes,r=8*e.sigBytes;return n[r>>>5]|=128<<24-r%32,n[14+(r+64>>>9<<4)]=t.floor(i/4294967296),n[15+(r+64>>>9<<4)]=i,e.sigBytes=4*n.length,this._process(),this._hash},clone:function(){var t=s.clone.call(this);return t._hash=this._hash.clone(),t}});e.SHA256=s._createHelper(p),e.HmacSHA256=s._createHmacHelper(p)}(Math),n.SHA256)})),e((function(t,e){var n,r,s;t.exports=(r=(n=i).lib.Base,s=n.enc.Utf8,void(n.algo.HMAC=r.extend({init:function(t,e){t=this._hasher=new t.init,"string"==typeof e&&(e=s.parse(e));var n=t.blockSize,i=4*n;e.sigBytes>i&&(e=t.finalize(e)),e.clamp();for(var r=this._oKey=e.clone(),o=this._iKey=e.clone(),a=r.words,u=o.words,c=0;c<n;c++)a[c]^=1549556828,u[c]^=909522486;r.sigBytes=o.sigBytes=i,this.reset()},reset:function(){var t=this._hasher;t.reset(),t.update(this._iKey)},update:function(t){return this._hasher.update(t),this},finalize:function(t){var e=this._hasher,n=e.finalize(t);return e.reset(),e.finalize(this._oKey.clone().concat(n))}})))})),e((function(t,e){t.exports=i.HmacSHA256}));metadata={systemName:"AWS_Lex_ChatBot",displayName:"AWS Lex ChatBot Broker",description:"AWS Lex ChatBot Broker",configuration:{AwsRegion:{displayName:"AWS Region",type:"string",value:"eu-west-2"},BotName:{displayName:"Bot Name",type:"string",value:"MedicalBotNHS"},BotAlias:{displayName:"Bot Name",type:"string",value:"latestversion"},UserID:{displayName:"User ID",type:"string",value:"AKIARXLDA4AZB24QPA72"},UserSecret:{displayName:"User Secret",type:"string",value:""}}},ondescribe=async function({}){postSchema({objects:{message:{displayName:"Message",description:"Represents a text reply",properties:{inputText:{displayName:"Input Text",type:"string"},outputText:{displayName:"Output Text",type:"string"}},methods:{postText:{displayName:"Post Text",type:"execute",inputs:["inputText"],outputs:["outputText"]}}}}})},onexecute=async function({objectName:t,methodName:e,parameters:n,properties:r,configuration:s}){switch(t){case"message":await async function(t,e,n){switch(t){case"postText":await function(t,e){return new Promise((n,r)=>{var s,o,a,u,c={inputText:t.inputText.toString()},p=JSON.stringify(c),f=function(t){for(var e=[":","-"],n=0;n<e.length;n++)for(;-1!=t.indexOf(e[n]);)t=t.replace(e[n],"");return t=t.split(".")[0]+"Z"}((new Date).toISOString()),h=f.split("T")[0],d=(s=h,o=i.HmacSHA256(s,"AWS4"+metadata.configuration.UserSecret),a=i.HmacSHA256(metadata.configuration.AwsRegion,o),u=i.HmacSHA256("lex",a),i.HmacSHA256("aws4_request",u)),l=i.HmacSHA256(p,d),y=`runtime.lex.${e.AwsRegion}.amazonaws.com`,g=i.SHA256(p).toString(),m=`/bot/${e.BotName}/alias/${e.BotAlias}/user/${e.UserID}/text HTTP/1.1`,w=`AWS4-HMAC-SHA256 Credential=${e.UserID.toString()}/${h}/${e.AwsRegion.toString()}/lex/aws4_request, SignedHeaders=content-type;host;x-amz-content-sha256;x-amz-date, Signature=${l}`,S=`https://runtime.lex.${e.AwsRegion}.amazonaws.com/bot/${e.BotName}/alias/${e.BotAlias}/user/${e.UserID}/text`,x="POST\n"+m+"\n\ncontent-type:application/json\nhost:"+y+"\nx-amz-content-sha256:"+g+"\nx-amz-date:"+f+"\ncontent-type;host;x-amz-content-sha256;x-amz-date\n"+g,A=i.SHA256(x).toString(),v="AWS4-HMAC-SHA256\n"+f+"\n"+h+"/"+e.AwsRegion+"/lex/aws4_request\n"+A,H=(l=i.HmacSHA256(d,v),new XMLHttpRequest);H.onreadystatechange=function(){try{if(4!==H.readyState)return;if(200!==H.status)throw new Error("Failed with status "+H.status);var t=JSON.parse(H.responseText);postResult({outputText:t.message}),n()}catch(t){postResult({outputText:`ErrorMessage: ${t.message}\nHeader: ${w}\nURL: ${S}\nSignature: ${d}\nBodyHash: ${g}\nAmzDate: ${f}\nAuthDate: ${h}\nCanonicalReq: ${x}\nAuthKey: ${l}\nCanonicalHash: ${A}\nStringToSign: ${v}`}),n()}},H.open("POST",S),H.setRequestHeader("Authorization",w),H.setRequestHeader("Content-Type","application/json"),H.setRequestHeader("Host",y),H.setRequestHeader("X-Amz-Date",f),H.setRequestHeader("X-Amz-Content-SHA256",g),H.setRequestHeader("Content-Length",(p.length-2).toString()),H.withCredentials=!0,H.send(p)})}(e,n);break;default:throw new Error("The method "+t+" is not supported.")}}(e,r,s);break;default:throw new Error("The object "+t+" is not supported.")}}}();
//# sourceMappingURL=index.js.map
