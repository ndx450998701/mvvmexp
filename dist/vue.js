!function(t){var e={};function i(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)i.d(n,o,function(e){return t[e]}.bind(null,o));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e);class n{constructor(){this.list={}}addList(t){this.list[t.uid]=t}notify(){for(let t in this.list)this.list[t].update()}}class o{constructor(t){this._data=t,this.walk(this._data)}walk(t){t&&"object"==typeof t&&Object.keys(t).forEach(e=>{this.defineReactive(t,e,t[e])})}defineReactive(t,e,i){let o=new n;Object.defineProperty(t,e,{enumerable:!0,get:()=>(n.target&&o.addList(n.target),i),set(t){console.log("调用了set方法"),i=t,o.notify()}}),this.walk(i)}}var r=0;class s{constructor(t,e,i){this.exp=t,this.scope=e,this.cb=i,this.uid=r++,this.update()}get(t,e){let i=new Function("scope","with(scope) {return "+t+"}");n.target=this;let o=i(e);return n.target=null,o}update(){let t=this.get(this.exp,this.scope);console.log(t),this.cb&&this.cb(t)}}class c{constructor(t){this.$el=t.$el,this._context=t,this.$el&&(this.$fragment=this.createFragment(this.$el),this.compiler(this.$fragment),this.$el.appendChild(this.$fragment))}createFragment(t){if(t.childNodes&&t.childNodes.length){let e=document.createDocumentFragment();return t.childNodes.forEach(t=>{this.ignorable(t)||e.appendChild(t)}),e}}ignorable(t){return 8===t.nodeType||3===t.nodeType&&/^[\t\n\r]+/.test(t.textContent)}compiler(t){t.childNodes&&t.childNodes.length&&t.childNodes.forEach(t=>{1===t.nodeType?this.compilerElementNode(t):3===t.nodeType&&this.compilerTextNode(t)})}compilerElementNode(t){[...t.attributes].forEach(e=>{let{name:i,value:n}=e;if(0===i.indexOf("v-")){switch(i.slice(2)){case"text":new s(n,this._context,e=>{t.textContent=e});break;case"model":new s(n,this._context,e=>{t.value=e});let e=this;t.addEventListener("input",t=>{e._context[n]=t.target.value})}}}),this.compiler(t)}compilerTextNode(t){console.log(t);let e=t.textContent.trim();if(e){let i=this.parseText(e);new s(i,this._context,e=>{t.textContent=e})}}parseText(t){let e=[],i=/\{\{(.+?)\}\}/g,n=t.match(i);return t.split(i).forEach(t=>{n&&n.indexOf("{{"+t+"}}")>-1?e.push("("+t+")"):e.push("`"+t+"`")}),e.join("+")}}window.Vue=class{constructor(t){this.$el=document.querySelector(t.el),this.$data=t.data||{},this._proxyData(this.$data),new o(this.$data),new c(this)}_proxyData(t){Object.keys(t).forEach(e=>{Object.defineProperty(this,e,{enumerable:!0,get:()=>t[e],set(i){t[e]=i}})})}_proxyMethods(t){t&&"object"==typeof t&&Object.keys(data).forEach(e=>{this[e]=t[e]})}}}]);