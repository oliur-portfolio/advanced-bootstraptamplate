!function(){"use strict";function r(t){if(void 0===t)throw new Error('Pathformer [constructor]: "element" parameter is required');if(t.constructor===String&&!(t=document.getElementById(t)))throw new Error('Pathformer [constructor]: "element" parameter is not related to an existing ID');if(!(t instanceof window.SVGElement||t instanceof window.SVGGElement||/^svg$/i.test(t.nodeName)))throw new Error('Pathformer [constructor]: "element" parameter must be a string or a SVGelement');this.el=t,this.scan(t)}var n,e,t,h;function i(t,e,r){n(),this.isReady=!1,this.setElement(t,e),this.setOptions(e),this.setCallback(r),this.isReady&&this.init()}r.prototype.TYPES=["line","ellipse","circle","polygon","polyline","rect"],r.prototype.ATTR_WATCH=["cx","cy","points","r","rx","ry","x","x1","x2","y","y1","y2"],r.prototype.scan=function(t){for(var e,r,n,i=t.querySelectorAll(this.TYPES.join(",")),a=0;a<i.length;a++)r=(0,this[(e=i[a]).tagName.toLowerCase()+"ToPath"])(this.parseAttr(e.attributes)),n=this.pathMaker(e,r),e.parentNode.replaceChild(n,e)},r.prototype.lineToPath=function(t){var e={},r=t.x1||0,n=t.y1||0,i=t.x2||0,a=t.y2||0;return e.d="M"+r+","+n+"L"+i+","+a,e},r.prototype.rectToPath=function(t){var e,r,n={},i=parseFloat(t.x)||0,a=parseFloat(t.y)||0,o=parseFloat(t.width)||0,s=parseFloat(t.height)||0;return t.rx||t.ry?(e=parseInt(t.rx,10)||-1,r=parseInt(t.ry,10)||-1,e=Math.min(Math.max(e<0?r:e,0),o/2),r=Math.min(Math.max(r<0?e:r,0),s/2),n.d="M "+(i+e)+","+a+" L "+(i+o-e)+","+a+" A "+e+","+r+",0,0,1,"+(i+o)+","+(a+r)+" L "+(i+o)+","+(a+s-r)+" A "+e+","+r+",0,0,1,"+(i+o-e)+","+(a+s)+" L "+(i+e)+","+(a+s)+" A "+e+","+r+",0,0,1,"+i+","+(a+s-r)+" L "+i+","+(a+r)+" A "+e+","+r+",0,0,1,"+(i+e)+","+a):n.d="M"+i+" "+a+" L"+(i+o)+" "+a+" L"+(i+o)+" "+(a+s)+" L"+i+" "+(a+s)+" Z",n},r.prototype.polylineToPath=function(t){var e,r={},n=t.points.trim().split(" ");if(-1===t.points.indexOf(",")){for(var i=[],a=0;a<n.length;a+=2)i.push(n[a]+","+n[a+1]);n=i}for(e="M"+n[0],a=1;a<n.length;a++)-1!==n[a].indexOf(",")&&(e+="L"+n[a]);return r.d=e,r},r.prototype.polygonToPath=function(t){var e=r.prototype.polylineToPath(t);return e.d+="Z",e},r.prototype.ellipseToPath=function(t){var e={},r=parseFloat(t.rx)||0,n=parseFloat(t.ry)||0,i=parseFloat(t.cx)||0,a=parseFloat(t.cy)||0,o=i-r,s=a,h=parseFloat(i)+parseFloat(r);return e.d="M"+o+","+s+"A"+r+","+n+" 0,1,1 "+h+","+a+"A"+r+","+n+" 0,1,1 "+o+","+a,e},r.prototype.circleToPath=function(t){var e={},r=parseFloat(t.r)||0,n=parseFloat(t.cx)||0,i=parseFloat(t.cy)||0,a=n-r,o=i,s=parseFloat(n)+parseFloat(r);return e.d="M"+a+","+o+"A"+r+","+r+" 0,1,1 "+s+","+i+"A"+r+","+r+" 0,1,1 "+a+","+i,e},r.prototype.pathMaker=function(t,e){for(var r,n=document.createElementNS("http://www.w3.org/2000/svg","path"),i=0;i<t.attributes.length;i++)r=t.attributes[i],-1===this.ATTR_WATCH.indexOf(r.name)&&n.setAttribute(r.name,r.value);for(i in e)n.setAttribute(i,e[i]);return n},r.prototype.parseAttr=function(t){for(var e,r={},n=0;n<t.length;n++){if(e=t[n],-1!==this.ATTR_WATCH.indexOf(e.name)&&-1!==e.value.indexOf("%"))throw new Error("Pathformer [parseAttr]: a SVG shape got values in percentage. This cannot be transformed into 'path' tags. Please use 'viewBox'.");r[e.name]=e.value}return r},i.LINEAR=function(t){return t},i.EASE=function(t){return-Math.cos(t*Math.PI)/2+.5},i.EASE_OUT=function(t){return 1-Math.pow(1-t,3)},i.EASE_IN=function(t){return Math.pow(t,3)},i.EASE_OUT_BOUNCE=function(t){var e=1-Math.cos(t*(.5*Math.PI)),r=Math.pow(e,1.5),n=Math.pow(1-t,2);return 1-n+(1-Math.abs(Math.cos(r*(2.5*Math.PI))))*n},i.prototype.setElement=function(e,r){var t,n;if(void 0===e)throw new Error('Vivus [constructor]: "element" parameter is required');if(e.constructor===String&&!(e=document.getElementById(e)))throw new Error('Vivus [constructor]: "element" parameter is not related to an existing ID');if(this.parentEl=e,r&&r.file){n=this,t=function(){var t=document.createElement("div");t.innerHTML=this.responseText;var e=t.querySelector("svg");if(!e)throw new Error("Vivus [load]: Cannot find the SVG in the loaded file : "+r.file);n.el=e,n.el.setAttribute("width","100%"),n.el.setAttribute("height","100%"),n.parentEl.appendChild(n.el),n.isReady=!0,n.init(),n=null};var i=new window.XMLHttpRequest;return i.addEventListener("load",t),i.open("GET",r.file),void i.send()}switch(e.constructor){case window.SVGSVGElement:case window.SVGElement:case window.SVGGElement:this.el=e,this.isReady=!0;break;case window.HTMLObjectElement:n=this,(t=function(t){if(!n.isReady){if(n.el=e.contentDocument&&e.contentDocument.querySelector("svg"),!n.el&&t)throw new Error("Vivus [constructor]: object loaded does not contain any SVG");n.el&&(e.getAttribute("built-by-vivus")&&(n.parentEl.insertBefore(n.el,e),n.parentEl.removeChild(e),n.el.setAttribute("width","100%"),n.el.setAttribute("height","100%")),n.isReady=!0,n.init(),n=null)}})()||e.addEventListener("load",t);break;default:throw new Error('Vivus [constructor]: "element" parameter is not valid (or miss the "file" attribute)')}},i.prototype.setOptions=function(t){var e=["delayed","sync","async","nsync","oneByOne","scenario","scenario-sync"],r=["inViewport","manual","autostart"];if(void 0!==t&&t.constructor!==Object)throw new Error('Vivus [constructor]: "options" parameter must be an object');if((t=t||{}).type&&-1===e.indexOf(t.type))throw new Error("Vivus [constructor]: "+t.type+" is not an existing animation `type`");if(this.type=t.type||e[0],t.start&&-1===r.indexOf(t.start))throw new Error("Vivus [constructor]: "+t.start+" is not an existing `start` option");if(this.start=t.start||r[0],this.isIE=-1!==window.navigator.userAgent.indexOf("MSIE")||-1!==window.navigator.userAgent.indexOf("Trident/")||-1!==window.navigator.userAgent.indexOf("Edge/"),this.duration=h(t.duration,120),this.delay=h(t.delay,null),this.dashGap=h(t.dashGap,1),this.forceRender=t.hasOwnProperty("forceRender")?!!t.forceRender:this.isIE,this.reverseStack=!!t.reverseStack,this.selfDestroy=!!t.selfDestroy,this.onReady=t.onReady,this.map=[],this.frameLength=this.currentFrame=this.delayUnit=this.speed=this.handle=null,this.ignoreInvisible=!!t.hasOwnProperty("ignoreInvisible")&&!!t.ignoreInvisible,this.animTimingFunction=t.animTimingFunction||i.LINEAR,this.pathTimingFunction=t.pathTimingFunction||i.LINEAR,this.delay>=this.duration)throw new Error("Vivus [constructor]: delay must be shorter than duration")},i.prototype.setCallback=function(t){if(t&&t.constructor!==Function)throw new Error('Vivus [constructor]: "callback" parameter must be a function');this.callback=t||function(){}},i.prototype.mapping=function(){for(var t,e,r,n,i,a=n=i=0,o=this.el.querySelectorAll("path"),s=0;s<o.length;s++)t=o[s],this.isInvisible(t)||(r={el:t,length:Math.ceil(t.getTotalLength())},isNaN(r.length)?window.console&&console.warn&&console.warn("Vivus [mapping]: cannot retrieve a path element length",t):(this.map.push(r),t.style.strokeDasharray=r.length+" "+(r.length+2*this.dashGap),t.style.strokeDashoffset=r.length+this.dashGap,r.length+=this.dashGap,n+=r.length,this.renderPath(s)));for(n=0===n?1:n,this.delay=null===this.delay?this.duration/3:this.delay,this.delayUnit=this.delay/(1<o.length?o.length-1:1),this.reverseStack&&this.map.reverse(),s=0;s<this.map.length;s++){switch(r=this.map[s],this.type){case"delayed":r.startAt=this.delayUnit*s,r.duration=this.duration-this.delay;break;case"oneByOne":r.startAt=i/n*this.duration,r.duration=r.length/n*this.duration;break;case"sync":case"async":case"nsync":r.startAt=0,r.duration=this.duration;break;case"scenario-sync":t=r.el,e=this.parseAttr(t),r.startAt=a+(h(e["data-delay"],this.delayUnit)||0),r.duration=h(e["data-duration"],this.duration),a=void 0!==e["data-async"]?r.startAt:r.startAt+r.duration,this.frameLength=Math.max(this.frameLength,r.startAt+r.duration);break;case"scenario":t=r.el,e=this.parseAttr(t),r.startAt=h(e["data-start"],this.delayUnit)||0,r.duration=h(e["data-duration"],this.duration),this.frameLength=Math.max(this.frameLength,r.startAt+r.duration)}i+=r.length,this.frameLength=this.frameLength||this.duration}},i.prototype.drawer=function(){var t=this;if(this.currentFrame+=this.speed,this.currentFrame<=0)this.stop(),this.reset();else{if(!(this.currentFrame>=this.frameLength))return this.trace(),void(this.handle=e(function(){t.drawer()}));this.stop(),this.currentFrame=this.frameLength,this.trace(),this.selfDestroy&&this.destroy()}this.callback(this),this.instanceCallback&&(this.instanceCallback(this),this.instanceCallback=null)},i.prototype.trace=function(){for(var t,e,r=this.animTimingFunction(this.currentFrame/this.frameLength)*this.frameLength,n=0;n<this.map.length;n++)t=(r-(e=this.map[n]).startAt)/e.duration,t=this.pathTimingFunction(Math.max(0,Math.min(1,t))),e.progress!==t&&(e.progress=t,e.el.style.strokeDashoffset=Math.floor(e.length*(1-t)),this.renderPath(n))},i.prototype.renderPath=function(t){var e,r;this.forceRender&&this.map&&this.map[t]&&(r=(e=this.map[t]).el.cloneNode(!0),e.el.parentNode.replaceChild(r,e.el),e.el=r)},i.prototype.init=function(){this.frameLength=0,this.currentFrame=0,this.map=[],new r(this.el),this.mapping(),this.starter(),this.onReady&&this.onReady(this)},i.prototype.starter=function(){switch(this.start){case"manual":return;case"autostart":this.play();break;case"inViewport":var t=this,e=function(){t.isInViewport(t.parentEl,1)&&(t.play(),window.removeEventListener("scroll",e))};window.addEventListener("scroll",e),e()}},i.prototype.getStatus=function(){return 0===this.currentFrame?"start":this.currentFrame===this.frameLength?"end":"progress"},i.prototype.reset=function(){return this.setFrameProgress(0)},i.prototype.finish=function(){return this.setFrameProgress(1)},i.prototype.setFrameProgress=function(t){return t=Math.min(1,Math.max(0,t)),this.currentFrame=Math.round(this.frameLength*t),this.trace(),this},i.prototype.play=function(t,e){if(this.instanceCallback=null,t&&"function"==typeof t)this.instanceCallback=t,t=null;else if(t&&"number"!=typeof t)throw new Error("Vivus [play]: invalid speed");return e&&"function"==typeof e&&!this.instanceCallback&&(this.instanceCallback=e),this.speed=t||1,this.handle||this.drawer(),this},i.prototype.stop=function(){return this.handle&&(t(this.handle),this.handle=null),this},i.prototype.destroy=function(){var t,e;for(this.stop(),t=0;t<this.map.length;t++)(e=this.map[t]).el.style.strokeDashoffset=null,e.el.style.strokeDasharray=null,this.renderPath(t)},i.prototype.isInvisible=function(t){var e,r=t.getAttribute("data-ignore");return null!==r?"false"!==r:!!this.ignoreInvisible&&(!(e=t.getBoundingClientRect()).width&&!e.height)},i.prototype.parseAttr=function(t){var e,r={};if(t&&t.attributes)for(var n=0;n<t.attributes.length;n++)r[(e=t.attributes[n]).name]=e.value;return r},i.prototype.isInViewport=function(t,e){var r=this.scrollY(),n=r+this.getViewportH(),i=t.getBoundingClientRect(),a=i.height,o=r+i.top;return o+a*(e=e||0)<=n&&r<=o+a},i.prototype.getViewportH=function(){var t=this.docElem.clientHeight,e=window.innerHeight;return t<e?e:t},i.prototype.scrollY=function(){return window.pageYOffset||this.docElem.scrollTop},n=function(){i.prototype.docElem||(i.prototype.docElem=window.document.documentElement,e=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return window.setTimeout(t,1e3/60)},t=window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame||function(t){return window.clearTimeout(t)})},h=function(t,e){var r=parseInt(t,10);return 0<=r?r:e},"function"==typeof define&&define.amd?define([],function(){return i}):"object"==typeof exports?module.exports=i:window.Vivus=i}();