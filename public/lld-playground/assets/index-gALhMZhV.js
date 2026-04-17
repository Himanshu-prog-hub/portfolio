(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const s of l.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function t(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerPolicy&&(l.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?l.credentials="include":i.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(i){if(i.ep)return;i.ep=!0;const l=t(i);fetch(i.href,l)}})();function kc(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var ia={exports:{}},mi={},la={exports:{}},I={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var or=Symbol.for("react.element"),Sc=Symbol.for("react.portal"),jc=Symbol.for("react.fragment"),Nc=Symbol.for("react.strict_mode"),Cc=Symbol.for("react.profiler"),Ec=Symbol.for("react.provider"),Pc=Symbol.for("react.context"),Tc=Symbol.for("react.forward_ref"),_c=Symbol.for("react.suspense"),Lc=Symbol.for("react.memo"),zc=Symbol.for("react.lazy"),Ks=Symbol.iterator;function Ic(e){return e===null||typeof e!="object"?null:(e=Ks&&e[Ks]||e["@@iterator"],typeof e=="function"?e:null)}var sa={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},oa=Object.assign,aa={};function ht(e,n,t){this.props=e,this.context=n,this.refs=aa,this.updater=t||sa}ht.prototype.isReactComponent={};ht.prototype.setState=function(e,n){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,n,"setState")};ht.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function ua(){}ua.prototype=ht.prototype;function ql(e,n,t){this.props=e,this.context=n,this.refs=aa,this.updater=t||sa}var es=ql.prototype=new ua;es.constructor=ql;oa(es,ht.prototype);es.isPureReactComponent=!0;var Ys=Array.isArray,ca=Object.prototype.hasOwnProperty,ns={current:null},da={key:!0,ref:!0,__self:!0,__source:!0};function pa(e,n,t){var r,i={},l=null,s=null;if(n!=null)for(r in n.ref!==void 0&&(s=n.ref),n.key!==void 0&&(l=""+n.key),n)ca.call(n,r)&&!da.hasOwnProperty(r)&&(i[r]=n[r]);var a=arguments.length-2;if(a===1)i.children=t;else if(1<a){for(var u=Array(a),p=0;p<a;p++)u[p]=arguments[p+2];i.children=u}if(e&&e.defaultProps)for(r in a=e.defaultProps,a)i[r]===void 0&&(i[r]=a[r]);return{$$typeof:or,type:e,key:l,ref:s,props:i,_owner:ns.current}}function Rc(e,n){return{$$typeof:or,type:e.type,key:n,ref:e.ref,props:e.props,_owner:e._owner}}function ts(e){return typeof e=="object"&&e!==null&&e.$$typeof===or}function bc(e){var n={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(t){return n[t]})}var Gs=/\/+/g;function Ii(e,n){return typeof e=="object"&&e!==null&&e.key!=null?bc(""+e.key):n.toString(36)}function Rr(e,n,t,r,i){var l=typeof e;(l==="undefined"||l==="boolean")&&(e=null);var s=!1;if(e===null)s=!0;else switch(l){case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case or:case Sc:s=!0}}if(s)return s=e,i=i(s),e=r===""?"."+Ii(s,0):r,Ys(i)?(t="",e!=null&&(t=e.replace(Gs,"$&/")+"/"),Rr(i,n,t,"",function(p){return p})):i!=null&&(ts(i)&&(i=Rc(i,t+(!i.key||s&&s.key===i.key?"":(""+i.key).replace(Gs,"$&/")+"/")+e)),n.push(i)),1;if(s=0,r=r===""?".":r+":",Ys(e))for(var a=0;a<e.length;a++){l=e[a];var u=r+Ii(l,a);s+=Rr(l,n,t,u,i)}else if(u=Ic(e),typeof u=="function")for(e=u.call(e),a=0;!(l=e.next()).done;)l=l.value,u=r+Ii(l,a++),s+=Rr(l,n,t,u,i);else if(l==="object")throw n=String(e),Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.");return s}function mr(e,n,t){if(e==null)return e;var r=[],i=0;return Rr(e,r,"","",function(l){return n.call(t,l,i++)}),r}function Dc(e){if(e._status===-1){var n=e._result;n=n(),n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var ce={current:null},br={transition:null},Mc={ReactCurrentDispatcher:ce,ReactCurrentBatchConfig:br,ReactCurrentOwner:ns};function fa(){throw Error("act(...) is not supported in production builds of React.")}I.Children={map:mr,forEach:function(e,n,t){mr(e,function(){n.apply(this,arguments)},t)},count:function(e){var n=0;return mr(e,function(){n++}),n},toArray:function(e){return mr(e,function(n){return n})||[]},only:function(e){if(!ts(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};I.Component=ht;I.Fragment=jc;I.Profiler=Cc;I.PureComponent=ql;I.StrictMode=Nc;I.Suspense=_c;I.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Mc;I.act=fa;I.cloneElement=function(e,n,t){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=oa({},e.props),i=e.key,l=e.ref,s=e._owner;if(n!=null){if(n.ref!==void 0&&(l=n.ref,s=ns.current),n.key!==void 0&&(i=""+n.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(u in n)ca.call(n,u)&&!da.hasOwnProperty(u)&&(r[u]=n[u]===void 0&&a!==void 0?a[u]:n[u])}var u=arguments.length-2;if(u===1)r.children=t;else if(1<u){a=Array(u);for(var p=0;p<u;p++)a[p]=arguments[p+2];r.children=a}return{$$typeof:or,type:e.type,key:i,ref:l,props:r,_owner:s}};I.createContext=function(e){return e={$$typeof:Pc,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Ec,_context:e},e.Consumer=e};I.createElement=pa;I.createFactory=function(e){var n=pa.bind(null,e);return n.type=e,n};I.createRef=function(){return{current:null}};I.forwardRef=function(e){return{$$typeof:Tc,render:e}};I.isValidElement=ts;I.lazy=function(e){return{$$typeof:zc,_payload:{_status:-1,_result:e},_init:Dc}};I.memo=function(e,n){return{$$typeof:Lc,type:e,compare:n===void 0?null:n}};I.startTransition=function(e){var n=br.transition;br.transition={};try{e()}finally{br.transition=n}};I.unstable_act=fa;I.useCallback=function(e,n){return ce.current.useCallback(e,n)};I.useContext=function(e){return ce.current.useContext(e)};I.useDebugValue=function(){};I.useDeferredValue=function(e){return ce.current.useDeferredValue(e)};I.useEffect=function(e,n){return ce.current.useEffect(e,n)};I.useId=function(){return ce.current.useId()};I.useImperativeHandle=function(e,n,t){return ce.current.useImperativeHandle(e,n,t)};I.useInsertionEffect=function(e,n){return ce.current.useInsertionEffect(e,n)};I.useLayoutEffect=function(e,n){return ce.current.useLayoutEffect(e,n)};I.useMemo=function(e,n){return ce.current.useMemo(e,n)};I.useReducer=function(e,n,t){return ce.current.useReducer(e,n,t)};I.useRef=function(e){return ce.current.useRef(e)};I.useState=function(e){return ce.current.useState(e)};I.useSyncExternalStore=function(e,n,t){return ce.current.useSyncExternalStore(e,n,t)};I.useTransition=function(){return ce.current.useTransition()};I.version="18.3.1";la.exports=I;var b=la.exports;const Oc=kc(b);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $c=b,Ac=Symbol.for("react.element"),Fc=Symbol.for("react.fragment"),Uc=Object.prototype.hasOwnProperty,Bc=$c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Vc={key:!0,ref:!0,__self:!0,__source:!0};function ha(e,n,t){var r,i={},l=null,s=null;t!==void 0&&(l=""+t),n.key!==void 0&&(l=""+n.key),n.ref!==void 0&&(s=n.ref);for(r in n)Uc.call(n,r)&&!Vc.hasOwnProperty(r)&&(i[r]=n[r]);if(e&&e.defaultProps)for(r in n=e.defaultProps,n)i[r]===void 0&&(i[r]=n[r]);return{$$typeof:Ac,type:e,key:l,ref:s,props:i,_owner:Bc.current}}mi.Fragment=Fc;mi.jsx=ha;mi.jsxs=ha;ia.exports=mi;var o=ia.exports,ll={},ma={exports:{}},Se={},ga={exports:{}},va={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function n(C,_){var L=C.length;C.push(_);e:for(;0<L;){var Q=L-1>>>1,J=C[Q];if(0<i(J,_))C[Q]=_,C[L]=J,L=Q;else break e}}function t(C){return C.length===0?null:C[0]}function r(C){if(C.length===0)return null;var _=C[0],L=C.pop();if(L!==_){C[0]=L;e:for(var Q=0,J=C.length,fr=J>>>1;Q<fr;){var jn=2*(Q+1)-1,zi=C[jn],Nn=jn+1,hr=C[Nn];if(0>i(zi,L))Nn<J&&0>i(hr,zi)?(C[Q]=hr,C[Nn]=L,Q=Nn):(C[Q]=zi,C[jn]=L,Q=jn);else if(Nn<J&&0>i(hr,L))C[Q]=hr,C[Nn]=L,Q=Nn;else break e}}return _}function i(C,_){var L=C.sortIndex-_.sortIndex;return L!==0?L:C.id-_.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;e.unstable_now=function(){return l.now()}}else{var s=Date,a=s.now();e.unstable_now=function(){return s.now()-a}}var u=[],p=[],h=1,g=null,m=3,x=!1,w=!1,k=!1,D=typeof setTimeout=="function"?setTimeout:null,d=typeof clearTimeout=="function"?clearTimeout:null,c=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function f(C){for(var _=t(p);_!==null;){if(_.callback===null)r(p);else if(_.startTime<=C)r(p),_.sortIndex=_.expirationTime,n(u,_);else break;_=t(p)}}function v(C){if(k=!1,f(C),!w)if(t(u)!==null)w=!0,Y(j);else{var _=t(p);_!==null&&vt(v,_.startTime-C)}}function j(C,_){w=!1,k&&(k=!1,d(T),T=-1),x=!0;var L=m;try{for(f(_),g=t(u);g!==null&&(!(g.expirationTime>_)||C&&!ve());){var Q=g.callback;if(typeof Q=="function"){g.callback=null,m=g.priorityLevel;var J=Q(g.expirationTime<=_);_=e.unstable_now(),typeof J=="function"?g.callback=J:g===t(u)&&r(u),f(_)}else r(u);g=t(u)}if(g!==null)var fr=!0;else{var jn=t(p);jn!==null&&vt(v,jn.startTime-_),fr=!1}return fr}finally{g=null,m=L,x=!1}}var E=!1,S=null,T=-1,U=5,z=-1;function ve(){return!(e.unstable_now()-z<U)}function kn(){if(S!==null){var C=e.unstable_now();z=C;var _=!0;try{_=S(!0,C)}finally{_?Sn():(E=!1,S=null)}}else E=!1}var Sn;if(typeof c=="function")Sn=function(){c(kn)};else if(typeof MessageChannel<"u"){var pr=new MessageChannel,P=pr.port2;pr.port1.onmessage=kn,Sn=function(){P.postMessage(null)}}else Sn=function(){D(kn,0)};function Y(C){S=C,E||(E=!0,Sn())}function vt(C,_){T=D(function(){C(e.unstable_now())},_)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(C){C.callback=null},e.unstable_continueExecution=function(){w||x||(w=!0,Y(j))},e.unstable_forceFrameRate=function(C){0>C||125<C?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):U=0<C?Math.floor(1e3/C):5},e.unstable_getCurrentPriorityLevel=function(){return m},e.unstable_getFirstCallbackNode=function(){return t(u)},e.unstable_next=function(C){switch(m){case 1:case 2:case 3:var _=3;break;default:_=m}var L=m;m=_;try{return C()}finally{m=L}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(C,_){switch(C){case 1:case 2:case 3:case 4:case 5:break;default:C=3}var L=m;m=C;try{return _()}finally{m=L}},e.unstable_scheduleCallback=function(C,_,L){var Q=e.unstable_now();switch(typeof L=="object"&&L!==null?(L=L.delay,L=typeof L=="number"&&0<L?Q+L:Q):L=Q,C){case 1:var J=-1;break;case 2:J=250;break;case 5:J=1073741823;break;case 4:J=1e4;break;default:J=5e3}return J=L+J,C={id:h++,callback:_,priorityLevel:C,startTime:L,expirationTime:J,sortIndex:-1},L>Q?(C.sortIndex=L,n(p,C),t(u)===null&&C===t(p)&&(k?(d(T),T=-1):k=!0,vt(v,L-Q))):(C.sortIndex=J,n(u,C),w||x||(w=!0,Y(j))),C},e.unstable_shouldYield=ve,e.unstable_wrapCallback=function(C){var _=m;return function(){var L=m;m=_;try{return C.apply(this,arguments)}finally{m=L}}}})(va);ga.exports=va;var Hc=ga.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Wc=b,ke=Hc;function y(e){for(var n="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var ya=new Set,Bt={};function On(e,n){st(e,n),st(e+"Capture",n)}function st(e,n){for(Bt[e]=n,e=0;e<n.length;e++)ya.add(n[e])}var Ye=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),sl=Object.prototype.hasOwnProperty,Qc=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Xs={},Zs={};function Kc(e){return sl.call(Zs,e)?!0:sl.call(Xs,e)?!1:Qc.test(e)?Zs[e]=!0:(Xs[e]=!0,!1)}function Yc(e,n,t,r){if(t!==null&&t.type===0)return!1;switch(typeof n){case"function":case"symbol":return!0;case"boolean":return r?!1:t!==null?!t.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Gc(e,n,t,r){if(n===null||typeof n>"u"||Yc(e,n,t,r))return!0;if(r)return!1;if(t!==null)switch(t.type){case 3:return!n;case 4:return n===!1;case 5:return isNaN(n);case 6:return isNaN(n)||1>n}return!1}function de(e,n,t,r,i,l,s){this.acceptsBooleans=n===2||n===3||n===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=t,this.propertyName=e,this.type=n,this.sanitizeURL=l,this.removeEmptyString=s}var re={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){re[e]=new de(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var n=e[0];re[n]=new de(n,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){re[e]=new de(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){re[e]=new de(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){re[e]=new de(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){re[e]=new de(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){re[e]=new de(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){re[e]=new de(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){re[e]=new de(e,5,!1,e.toLowerCase(),null,!1,!1)});var rs=/[\-:]([a-z])/g;function is(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var n=e.replace(rs,is);re[n]=new de(n,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var n=e.replace(rs,is);re[n]=new de(n,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var n=e.replace(rs,is);re[n]=new de(n,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){re[e]=new de(e,1,!1,e.toLowerCase(),null,!1,!1)});re.xlinkHref=new de("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){re[e]=new de(e,1,!1,e.toLowerCase(),null,!0,!0)});function ls(e,n,t,r){var i=re.hasOwnProperty(n)?re[n]:null;(i!==null?i.type!==0:r||!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(Gc(n,t,i,r)&&(t=null),r||i===null?Kc(n)&&(t===null?e.removeAttribute(n):e.setAttribute(n,""+t)):i.mustUseProperty?e[i.propertyName]=t===null?i.type===3?!1:"":t:(n=i.attributeName,r=i.attributeNamespace,t===null?e.removeAttribute(n):(i=i.type,t=i===3||i===4&&t===!0?"":""+t,r?e.setAttributeNS(r,n,t):e.setAttribute(n,t))))}var Je=Wc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,gr=Symbol.for("react.element"),Bn=Symbol.for("react.portal"),Vn=Symbol.for("react.fragment"),ss=Symbol.for("react.strict_mode"),ol=Symbol.for("react.profiler"),xa=Symbol.for("react.provider"),wa=Symbol.for("react.context"),os=Symbol.for("react.forward_ref"),al=Symbol.for("react.suspense"),ul=Symbol.for("react.suspense_list"),as=Symbol.for("react.memo"),nn=Symbol.for("react.lazy"),ka=Symbol.for("react.offscreen"),Js=Symbol.iterator;function yt(e){return e===null||typeof e!="object"?null:(e=Js&&e[Js]||e["@@iterator"],typeof e=="function"?e:null)}var H=Object.assign,Ri;function Tt(e){if(Ri===void 0)try{throw Error()}catch(t){var n=t.stack.trim().match(/\n( *(at )?)/);Ri=n&&n[1]||""}return`
`+Ri+e}var bi=!1;function Di(e,n){if(!e||bi)return"";bi=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(n)if(n=function(){throw Error()},Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(n,[])}catch(p){var r=p}Reflect.construct(e,[],n)}else{try{n.call()}catch(p){r=p}e.call(n.prototype)}else{try{throw Error()}catch(p){r=p}e()}}catch(p){if(p&&r&&typeof p.stack=="string"){for(var i=p.stack.split(`
`),l=r.stack.split(`
`),s=i.length-1,a=l.length-1;1<=s&&0<=a&&i[s]!==l[a];)a--;for(;1<=s&&0<=a;s--,a--)if(i[s]!==l[a]){if(s!==1||a!==1)do if(s--,a--,0>a||i[s]!==l[a]){var u=`
`+i[s].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}while(1<=s&&0<=a);break}}}finally{bi=!1,Error.prepareStackTrace=t}return(e=e?e.displayName||e.name:"")?Tt(e):""}function Xc(e){switch(e.tag){case 5:return Tt(e.type);case 16:return Tt("Lazy");case 13:return Tt("Suspense");case 19:return Tt("SuspenseList");case 0:case 2:case 15:return e=Di(e.type,!1),e;case 11:return e=Di(e.type.render,!1),e;case 1:return e=Di(e.type,!0),e;default:return""}}function cl(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Vn:return"Fragment";case Bn:return"Portal";case ol:return"Profiler";case ss:return"StrictMode";case al:return"Suspense";case ul:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case wa:return(e.displayName||"Context")+".Consumer";case xa:return(e._context.displayName||"Context")+".Provider";case os:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case as:return n=e.displayName||null,n!==null?n:cl(e.type)||"Memo";case nn:n=e._payload,e=e._init;try{return cl(e(n))}catch{}}return null}function Zc(e){var n=e.type;switch(e.tag){case 24:return"Cache";case 9:return(n.displayName||"Context")+".Consumer";case 10:return(n._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=n.render,e=e.displayName||e.name||"",n.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return n;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return cl(n);case 8:return n===ss?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n}return null}function gn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Sa(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Jc(e){var n=Sa(e)?"checked":"value",t=Object.getOwnPropertyDescriptor(e.constructor.prototype,n),r=""+e[n];if(!e.hasOwnProperty(n)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var i=t.get,l=t.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return i.call(this)},set:function(s){r=""+s,l.call(this,s)}}),Object.defineProperty(e,n,{enumerable:t.enumerable}),{getValue:function(){return r},setValue:function(s){r=""+s},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function vr(e){e._valueTracker||(e._valueTracker=Jc(e))}function ja(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var t=n.getValue(),r="";return e&&(r=Sa(e)?e.checked?"true":"false":e.value),e=r,e!==t?(n.setValue(e),!0):!1}function Wr(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function dl(e,n){var t=n.checked;return H({},n,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??e._wrapperState.initialChecked})}function qs(e,n){var t=n.defaultValue==null?"":n.defaultValue,r=n.checked!=null?n.checked:n.defaultChecked;t=gn(n.value!=null?n.value:t),e._wrapperState={initialChecked:r,initialValue:t,controlled:n.type==="checkbox"||n.type==="radio"?n.checked!=null:n.value!=null}}function Na(e,n){n=n.checked,n!=null&&ls(e,"checked",n,!1)}function pl(e,n){Na(e,n);var t=gn(n.value),r=n.type;if(t!=null)r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+t):e.value!==""+t&&(e.value=""+t);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}n.hasOwnProperty("value")?fl(e,n.type,t):n.hasOwnProperty("defaultValue")&&fl(e,n.type,gn(n.defaultValue)),n.checked==null&&n.defaultChecked!=null&&(e.defaultChecked=!!n.defaultChecked)}function eo(e,n,t){if(n.hasOwnProperty("value")||n.hasOwnProperty("defaultValue")){var r=n.type;if(!(r!=="submit"&&r!=="reset"||n.value!==void 0&&n.value!==null))return;n=""+e._wrapperState.initialValue,t||n===e.value||(e.value=n),e.defaultValue=n}t=e.name,t!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,t!==""&&(e.name=t)}function fl(e,n,t){(n!=="number"||Wr(e.ownerDocument)!==e)&&(t==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+t&&(e.defaultValue=""+t))}var _t=Array.isArray;function et(e,n,t,r){if(e=e.options,n){n={};for(var i=0;i<t.length;i++)n["$"+t[i]]=!0;for(t=0;t<e.length;t++)i=n.hasOwnProperty("$"+e[t].value),e[t].selected!==i&&(e[t].selected=i),i&&r&&(e[t].defaultSelected=!0)}else{for(t=""+gn(t),n=null,i=0;i<e.length;i++){if(e[i].value===t){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}n!==null||e[i].disabled||(n=e[i])}n!==null&&(n.selected=!0)}}function hl(e,n){if(n.dangerouslySetInnerHTML!=null)throw Error(y(91));return H({},n,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function no(e,n){var t=n.value;if(t==null){if(t=n.children,n=n.defaultValue,t!=null){if(n!=null)throw Error(y(92));if(_t(t)){if(1<t.length)throw Error(y(93));t=t[0]}n=t}n==null&&(n=""),t=n}e._wrapperState={initialValue:gn(t)}}function Ca(e,n){var t=gn(n.value),r=gn(n.defaultValue);t!=null&&(t=""+t,t!==e.value&&(e.value=t),n.defaultValue==null&&e.defaultValue!==t&&(e.defaultValue=t)),r!=null&&(e.defaultValue=""+r)}function to(e){var n=e.textContent;n===e._wrapperState.initialValue&&n!==""&&n!==null&&(e.value=n)}function Ea(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ml(e,n){return e==null||e==="http://www.w3.org/1999/xhtml"?Ea(n):e==="http://www.w3.org/2000/svg"&&n==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var yr,Pa=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(n,t,r,i){MSApp.execUnsafeLocalFunction(function(){return e(n,t,r,i)})}:e}(function(e,n){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=n;else{for(yr=yr||document.createElement("div"),yr.innerHTML="<svg>"+n.valueOf().toString()+"</svg>",n=yr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;n.firstChild;)e.appendChild(n.firstChild)}});function Vt(e,n){if(n){var t=e.firstChild;if(t&&t===e.lastChild&&t.nodeType===3){t.nodeValue=n;return}}e.textContent=n}var It={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},qc=["Webkit","ms","Moz","O"];Object.keys(It).forEach(function(e){qc.forEach(function(n){n=n+e.charAt(0).toUpperCase()+e.substring(1),It[n]=It[e]})});function Ta(e,n,t){return n==null||typeof n=="boolean"||n===""?"":t||typeof n!="number"||n===0||It.hasOwnProperty(e)&&It[e]?(""+n).trim():n+"px"}function _a(e,n){e=e.style;for(var t in n)if(n.hasOwnProperty(t)){var r=t.indexOf("--")===0,i=Ta(t,n[t],r);t==="float"&&(t="cssFloat"),r?e.setProperty(t,i):e[t]=i}}var ed=H({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function gl(e,n){if(n){if(ed[e]&&(n.children!=null||n.dangerouslySetInnerHTML!=null))throw Error(y(137,e));if(n.dangerouslySetInnerHTML!=null){if(n.children!=null)throw Error(y(60));if(typeof n.dangerouslySetInnerHTML!="object"||!("__html"in n.dangerouslySetInnerHTML))throw Error(y(61))}if(n.style!=null&&typeof n.style!="object")throw Error(y(62))}}function vl(e,n){if(e.indexOf("-")===-1)return typeof n.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var yl=null;function us(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var xl=null,nt=null,tt=null;function ro(e){if(e=cr(e)){if(typeof xl!="function")throw Error(y(280));var n=e.stateNode;n&&(n=wi(n),xl(e.stateNode,e.type,n))}}function La(e){nt?tt?tt.push(e):tt=[e]:nt=e}function za(){if(nt){var e=nt,n=tt;if(tt=nt=null,ro(e),n)for(e=0;e<n.length;e++)ro(n[e])}}function Ia(e,n){return e(n)}function Ra(){}var Mi=!1;function ba(e,n,t){if(Mi)return e(n,t);Mi=!0;try{return Ia(e,n,t)}finally{Mi=!1,(nt!==null||tt!==null)&&(Ra(),za())}}function Ht(e,n){var t=e.stateNode;if(t===null)return null;var r=wi(t);if(r===null)return null;t=r[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(t&&typeof t!="function")throw Error(y(231,n,typeof t));return t}var wl=!1;if(Ye)try{var xt={};Object.defineProperty(xt,"passive",{get:function(){wl=!0}}),window.addEventListener("test",xt,xt),window.removeEventListener("test",xt,xt)}catch{wl=!1}function nd(e,n,t,r,i,l,s,a,u){var p=Array.prototype.slice.call(arguments,3);try{n.apply(t,p)}catch(h){this.onError(h)}}var Rt=!1,Qr=null,Kr=!1,kl=null,td={onError:function(e){Rt=!0,Qr=e}};function rd(e,n,t,r,i,l,s,a,u){Rt=!1,Qr=null,nd.apply(td,arguments)}function id(e,n,t,r,i,l,s,a,u){if(rd.apply(this,arguments),Rt){if(Rt){var p=Qr;Rt=!1,Qr=null}else throw Error(y(198));Kr||(Kr=!0,kl=p)}}function $n(e){var n=e,t=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,n.flags&4098&&(t=n.return),e=n.return;while(e)}return n.tag===3?t:null}function Da(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function io(e){if($n(e)!==e)throw Error(y(188))}function ld(e){var n=e.alternate;if(!n){if(n=$n(e),n===null)throw Error(y(188));return n!==e?null:e}for(var t=e,r=n;;){var i=t.return;if(i===null)break;var l=i.alternate;if(l===null){if(r=i.return,r!==null){t=r;continue}break}if(i.child===l.child){for(l=i.child;l;){if(l===t)return io(i),e;if(l===r)return io(i),n;l=l.sibling}throw Error(y(188))}if(t.return!==r.return)t=i,r=l;else{for(var s=!1,a=i.child;a;){if(a===t){s=!0,t=i,r=l;break}if(a===r){s=!0,r=i,t=l;break}a=a.sibling}if(!s){for(a=l.child;a;){if(a===t){s=!0,t=l,r=i;break}if(a===r){s=!0,r=l,t=i;break}a=a.sibling}if(!s)throw Error(y(189))}}if(t.alternate!==r)throw Error(y(190))}if(t.tag!==3)throw Error(y(188));return t.stateNode.current===t?e:n}function Ma(e){return e=ld(e),e!==null?Oa(e):null}function Oa(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var n=Oa(e);if(n!==null)return n;e=e.sibling}return null}var $a=ke.unstable_scheduleCallback,lo=ke.unstable_cancelCallback,sd=ke.unstable_shouldYield,od=ke.unstable_requestPaint,K=ke.unstable_now,ad=ke.unstable_getCurrentPriorityLevel,cs=ke.unstable_ImmediatePriority,Aa=ke.unstable_UserBlockingPriority,Yr=ke.unstable_NormalPriority,ud=ke.unstable_LowPriority,Fa=ke.unstable_IdlePriority,gi=null,Ue=null;function cd(e){if(Ue&&typeof Ue.onCommitFiberRoot=="function")try{Ue.onCommitFiberRoot(gi,e,void 0,(e.current.flags&128)===128)}catch{}}var be=Math.clz32?Math.clz32:fd,dd=Math.log,pd=Math.LN2;function fd(e){return e>>>=0,e===0?32:31-(dd(e)/pd|0)|0}var xr=64,wr=4194304;function Lt(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Gr(e,n){var t=e.pendingLanes;if(t===0)return 0;var r=0,i=e.suspendedLanes,l=e.pingedLanes,s=t&268435455;if(s!==0){var a=s&~i;a!==0?r=Lt(a):(l&=s,l!==0&&(r=Lt(l)))}else s=t&~i,s!==0?r=Lt(s):l!==0&&(r=Lt(l));if(r===0)return 0;if(n!==0&&n!==r&&!(n&i)&&(i=r&-r,l=n&-n,i>=l||i===16&&(l&4194240)!==0))return n;if(r&4&&(r|=t&16),n=e.entangledLanes,n!==0)for(e=e.entanglements,n&=r;0<n;)t=31-be(n),i=1<<t,r|=e[t],n&=~i;return r}function hd(e,n){switch(e){case 1:case 2:case 4:return n+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function md(e,n){for(var t=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,l=e.pendingLanes;0<l;){var s=31-be(l),a=1<<s,u=i[s];u===-1?(!(a&t)||a&r)&&(i[s]=hd(a,n)):u<=n&&(e.expiredLanes|=a),l&=~a}}function Sl(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Ua(){var e=xr;return xr<<=1,!(xr&4194240)&&(xr=64),e}function Oi(e){for(var n=[],t=0;31>t;t++)n.push(e);return n}function ar(e,n,t){e.pendingLanes|=n,n!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,n=31-be(n),e[n]=t}function gd(e,n){var t=e.pendingLanes&~n;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=n,e.mutableReadLanes&=n,e.entangledLanes&=n,n=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<t;){var i=31-be(t),l=1<<i;n[i]=0,r[i]=-1,e[i]=-1,t&=~l}}function ds(e,n){var t=e.entangledLanes|=n;for(e=e.entanglements;t;){var r=31-be(t),i=1<<r;i&n|e[r]&n&&(e[r]|=n),t&=~i}}var M=0;function Ba(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Va,ps,Ha,Wa,Qa,jl=!1,kr=[],an=null,un=null,cn=null,Wt=new Map,Qt=new Map,rn=[],vd="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function so(e,n){switch(e){case"focusin":case"focusout":an=null;break;case"dragenter":case"dragleave":un=null;break;case"mouseover":case"mouseout":cn=null;break;case"pointerover":case"pointerout":Wt.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Qt.delete(n.pointerId)}}function wt(e,n,t,r,i,l){return e===null||e.nativeEvent!==l?(e={blockedOn:n,domEventName:t,eventSystemFlags:r,nativeEvent:l,targetContainers:[i]},n!==null&&(n=cr(n),n!==null&&ps(n)),e):(e.eventSystemFlags|=r,n=e.targetContainers,i!==null&&n.indexOf(i)===-1&&n.push(i),e)}function yd(e,n,t,r,i){switch(n){case"focusin":return an=wt(an,e,n,t,r,i),!0;case"dragenter":return un=wt(un,e,n,t,r,i),!0;case"mouseover":return cn=wt(cn,e,n,t,r,i),!0;case"pointerover":var l=i.pointerId;return Wt.set(l,wt(Wt.get(l)||null,e,n,t,r,i)),!0;case"gotpointercapture":return l=i.pointerId,Qt.set(l,wt(Qt.get(l)||null,e,n,t,r,i)),!0}return!1}function Ka(e){var n=Pn(e.target);if(n!==null){var t=$n(n);if(t!==null){if(n=t.tag,n===13){if(n=Da(t),n!==null){e.blockedOn=n,Qa(e.priority,function(){Ha(t)});return}}else if(n===3&&t.stateNode.current.memoizedState.isDehydrated){e.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Dr(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var t=Nl(e.domEventName,e.eventSystemFlags,n[0],e.nativeEvent);if(t===null){t=e.nativeEvent;var r=new t.constructor(t.type,t);yl=r,t.target.dispatchEvent(r),yl=null}else return n=cr(t),n!==null&&ps(n),e.blockedOn=t,!1;n.shift()}return!0}function oo(e,n,t){Dr(e)&&t.delete(n)}function xd(){jl=!1,an!==null&&Dr(an)&&(an=null),un!==null&&Dr(un)&&(un=null),cn!==null&&Dr(cn)&&(cn=null),Wt.forEach(oo),Qt.forEach(oo)}function kt(e,n){e.blockedOn===n&&(e.blockedOn=null,jl||(jl=!0,ke.unstable_scheduleCallback(ke.unstable_NormalPriority,xd)))}function Kt(e){function n(i){return kt(i,e)}if(0<kr.length){kt(kr[0],e);for(var t=1;t<kr.length;t++){var r=kr[t];r.blockedOn===e&&(r.blockedOn=null)}}for(an!==null&&kt(an,e),un!==null&&kt(un,e),cn!==null&&kt(cn,e),Wt.forEach(n),Qt.forEach(n),t=0;t<rn.length;t++)r=rn[t],r.blockedOn===e&&(r.blockedOn=null);for(;0<rn.length&&(t=rn[0],t.blockedOn===null);)Ka(t),t.blockedOn===null&&rn.shift()}var rt=Je.ReactCurrentBatchConfig,Xr=!0;function wd(e,n,t,r){var i=M,l=rt.transition;rt.transition=null;try{M=1,fs(e,n,t,r)}finally{M=i,rt.transition=l}}function kd(e,n,t,r){var i=M,l=rt.transition;rt.transition=null;try{M=4,fs(e,n,t,r)}finally{M=i,rt.transition=l}}function fs(e,n,t,r){if(Xr){var i=Nl(e,n,t,r);if(i===null)Ki(e,n,r,Zr,t),so(e,r);else if(yd(i,e,n,t,r))r.stopPropagation();else if(so(e,r),n&4&&-1<vd.indexOf(e)){for(;i!==null;){var l=cr(i);if(l!==null&&Va(l),l=Nl(e,n,t,r),l===null&&Ki(e,n,r,Zr,t),l===i)break;i=l}i!==null&&r.stopPropagation()}else Ki(e,n,r,null,t)}}var Zr=null;function Nl(e,n,t,r){if(Zr=null,e=us(r),e=Pn(e),e!==null)if(n=$n(e),n===null)e=null;else if(t=n.tag,t===13){if(e=Da(n),e!==null)return e;e=null}else if(t===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null);return Zr=e,null}function Ya(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(ad()){case cs:return 1;case Aa:return 4;case Yr:case ud:return 16;case Fa:return 536870912;default:return 16}default:return 16}}var sn=null,hs=null,Mr=null;function Ga(){if(Mr)return Mr;var e,n=hs,t=n.length,r,i="value"in sn?sn.value:sn.textContent,l=i.length;for(e=0;e<t&&n[e]===i[e];e++);var s=t-e;for(r=1;r<=s&&n[t-r]===i[l-r];r++);return Mr=i.slice(e,1<r?1-r:void 0)}function Or(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function Sr(){return!0}function ao(){return!1}function je(e){function n(t,r,i,l,s){this._reactName=t,this._targetInst=i,this.type=r,this.nativeEvent=l,this.target=s,this.currentTarget=null;for(var a in e)e.hasOwnProperty(a)&&(t=e[a],this[a]=t?t(l):l[a]);return this.isDefaultPrevented=(l.defaultPrevented!=null?l.defaultPrevented:l.returnValue===!1)?Sr:ao,this.isPropagationStopped=ao,this}return H(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=Sr)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=Sr)},persist:function(){},isPersistent:Sr}),n}var mt={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ms=je(mt),ur=H({},mt,{view:0,detail:0}),Sd=je(ur),$i,Ai,St,vi=H({},ur,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:gs,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==St&&(St&&e.type==="mousemove"?($i=e.screenX-St.screenX,Ai=e.screenY-St.screenY):Ai=$i=0,St=e),$i)},movementY:function(e){return"movementY"in e?e.movementY:Ai}}),uo=je(vi),jd=H({},vi,{dataTransfer:0}),Nd=je(jd),Cd=H({},ur,{relatedTarget:0}),Fi=je(Cd),Ed=H({},mt,{animationName:0,elapsedTime:0,pseudoElement:0}),Pd=je(Ed),Td=H({},mt,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),_d=je(Td),Ld=H({},mt,{data:0}),co=je(Ld),zd={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Id={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Rd={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function bd(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=Rd[e])?!!n[e]:!1}function gs(){return bd}var Dd=H({},ur,{key:function(e){if(e.key){var n=zd[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=Or(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Id[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:gs,charCode:function(e){return e.type==="keypress"?Or(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Or(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Md=je(Dd),Od=H({},vi,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),po=je(Od),$d=H({},ur,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:gs}),Ad=je($d),Fd=H({},mt,{propertyName:0,elapsedTime:0,pseudoElement:0}),Ud=je(Fd),Bd=H({},vi,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Vd=je(Bd),Hd=[9,13,27,32],vs=Ye&&"CompositionEvent"in window,bt=null;Ye&&"documentMode"in document&&(bt=document.documentMode);var Wd=Ye&&"TextEvent"in window&&!bt,Xa=Ye&&(!vs||bt&&8<bt&&11>=bt),fo=" ",ho=!1;function Za(e,n){switch(e){case"keyup":return Hd.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Ja(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Hn=!1;function Qd(e,n){switch(e){case"compositionend":return Ja(n);case"keypress":return n.which!==32?null:(ho=!0,fo);case"textInput":return e=n.data,e===fo&&ho?null:e;default:return null}}function Kd(e,n){if(Hn)return e==="compositionend"||!vs&&Za(e,n)?(e=Ga(),Mr=hs=sn=null,Hn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Xa&&n.locale!=="ko"?null:n.data;default:return null}}var Yd={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function mo(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!Yd[e.type]:n==="textarea"}function qa(e,n,t,r){La(r),n=Jr(n,"onChange"),0<n.length&&(t=new ms("onChange","change",null,t,r),e.push({event:t,listeners:n}))}var Dt=null,Yt=null;function Gd(e){cu(e,0)}function yi(e){var n=Kn(e);if(ja(n))return e}function Xd(e,n){if(e==="change")return n}var eu=!1;if(Ye){var Ui;if(Ye){var Bi="oninput"in document;if(!Bi){var go=document.createElement("div");go.setAttribute("oninput","return;"),Bi=typeof go.oninput=="function"}Ui=Bi}else Ui=!1;eu=Ui&&(!document.documentMode||9<document.documentMode)}function vo(){Dt&&(Dt.detachEvent("onpropertychange",nu),Yt=Dt=null)}function nu(e){if(e.propertyName==="value"&&yi(Yt)){var n=[];qa(n,Yt,e,us(e)),ba(Gd,n)}}function Zd(e,n,t){e==="focusin"?(vo(),Dt=n,Yt=t,Dt.attachEvent("onpropertychange",nu)):e==="focusout"&&vo()}function Jd(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return yi(Yt)}function qd(e,n){if(e==="click")return yi(n)}function ep(e,n){if(e==="input"||e==="change")return yi(n)}function np(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var Me=typeof Object.is=="function"?Object.is:np;function Gt(e,n){if(Me(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var t=Object.keys(e),r=Object.keys(n);if(t.length!==r.length)return!1;for(r=0;r<t.length;r++){var i=t[r];if(!sl.call(n,i)||!Me(e[i],n[i]))return!1}return!0}function yo(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function xo(e,n){var t=yo(e);e=0;for(var r;t;){if(t.nodeType===3){if(r=e+t.textContent.length,e<=n&&r>=n)return{node:t,offset:n-e};e=r}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=yo(t)}}function tu(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?tu(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function ru(){for(var e=window,n=Wr();n instanceof e.HTMLIFrameElement;){try{var t=typeof n.contentWindow.location.href=="string"}catch{t=!1}if(t)e=n.contentWindow;else break;n=Wr(e.document)}return n}function ys(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}function tp(e){var n=ru(),t=e.focusedElem,r=e.selectionRange;if(n!==t&&t&&t.ownerDocument&&tu(t.ownerDocument.documentElement,t)){if(r!==null&&ys(t)){if(n=r.start,e=r.end,e===void 0&&(e=n),"selectionStart"in t)t.selectionStart=n,t.selectionEnd=Math.min(e,t.value.length);else if(e=(n=t.ownerDocument||document)&&n.defaultView||window,e.getSelection){e=e.getSelection();var i=t.textContent.length,l=Math.min(r.start,i);r=r.end===void 0?l:Math.min(r.end,i),!e.extend&&l>r&&(i=r,r=l,l=i),i=xo(t,l);var s=xo(t,r);i&&s&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==s.node||e.focusOffset!==s.offset)&&(n=n.createRange(),n.setStart(i.node,i.offset),e.removeAllRanges(),l>r?(e.addRange(n),e.extend(s.node,s.offset)):(n.setEnd(s.node,s.offset),e.addRange(n)))}}for(n=[],e=t;e=e.parentNode;)e.nodeType===1&&n.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<n.length;t++)e=n[t],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var rp=Ye&&"documentMode"in document&&11>=document.documentMode,Wn=null,Cl=null,Mt=null,El=!1;function wo(e,n,t){var r=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;El||Wn==null||Wn!==Wr(r)||(r=Wn,"selectionStart"in r&&ys(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Mt&&Gt(Mt,r)||(Mt=r,r=Jr(Cl,"onSelect"),0<r.length&&(n=new ms("onSelect","select",null,n,t),e.push({event:n,listeners:r}),n.target=Wn)))}function jr(e,n){var t={};return t[e.toLowerCase()]=n.toLowerCase(),t["Webkit"+e]="webkit"+n,t["Moz"+e]="moz"+n,t}var Qn={animationend:jr("Animation","AnimationEnd"),animationiteration:jr("Animation","AnimationIteration"),animationstart:jr("Animation","AnimationStart"),transitionend:jr("Transition","TransitionEnd")},Vi={},iu={};Ye&&(iu=document.createElement("div").style,"AnimationEvent"in window||(delete Qn.animationend.animation,delete Qn.animationiteration.animation,delete Qn.animationstart.animation),"TransitionEvent"in window||delete Qn.transitionend.transition);function xi(e){if(Vi[e])return Vi[e];if(!Qn[e])return e;var n=Qn[e],t;for(t in n)if(n.hasOwnProperty(t)&&t in iu)return Vi[e]=n[t];return e}var lu=xi("animationend"),su=xi("animationiteration"),ou=xi("animationstart"),au=xi("transitionend"),uu=new Map,ko="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function yn(e,n){uu.set(e,n),On(n,[e])}for(var Hi=0;Hi<ko.length;Hi++){var Wi=ko[Hi],ip=Wi.toLowerCase(),lp=Wi[0].toUpperCase()+Wi.slice(1);yn(ip,"on"+lp)}yn(lu,"onAnimationEnd");yn(su,"onAnimationIteration");yn(ou,"onAnimationStart");yn("dblclick","onDoubleClick");yn("focusin","onFocus");yn("focusout","onBlur");yn(au,"onTransitionEnd");st("onMouseEnter",["mouseout","mouseover"]);st("onMouseLeave",["mouseout","mouseover"]);st("onPointerEnter",["pointerout","pointerover"]);st("onPointerLeave",["pointerout","pointerover"]);On("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));On("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));On("onBeforeInput",["compositionend","keypress","textInput","paste"]);On("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));On("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));On("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var zt="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),sp=new Set("cancel close invalid load scroll toggle".split(" ").concat(zt));function So(e,n,t){var r=e.type||"unknown-event";e.currentTarget=t,id(r,n,void 0,e),e.currentTarget=null}function cu(e,n){n=(n&4)!==0;for(var t=0;t<e.length;t++){var r=e[t],i=r.event;r=r.listeners;e:{var l=void 0;if(n)for(var s=r.length-1;0<=s;s--){var a=r[s],u=a.instance,p=a.currentTarget;if(a=a.listener,u!==l&&i.isPropagationStopped())break e;So(i,a,p),l=u}else for(s=0;s<r.length;s++){if(a=r[s],u=a.instance,p=a.currentTarget,a=a.listener,u!==l&&i.isPropagationStopped())break e;So(i,a,p),l=u}}}if(Kr)throw e=kl,Kr=!1,kl=null,e}function $(e,n){var t=n[zl];t===void 0&&(t=n[zl]=new Set);var r=e+"__bubble";t.has(r)||(du(n,e,2,!1),t.add(r))}function Qi(e,n,t){var r=0;n&&(r|=4),du(t,e,r,n)}var Nr="_reactListening"+Math.random().toString(36).slice(2);function Xt(e){if(!e[Nr]){e[Nr]=!0,ya.forEach(function(t){t!=="selectionchange"&&(sp.has(t)||Qi(t,!1,e),Qi(t,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[Nr]||(n[Nr]=!0,Qi("selectionchange",!1,n))}}function du(e,n,t,r){switch(Ya(n)){case 1:var i=wd;break;case 4:i=kd;break;default:i=fs}t=i.bind(null,n,t,e),i=void 0,!wl||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(i=!0),r?i!==void 0?e.addEventListener(n,t,{capture:!0,passive:i}):e.addEventListener(n,t,!0):i!==void 0?e.addEventListener(n,t,{passive:i}):e.addEventListener(n,t,!1)}function Ki(e,n,t,r,i){var l=r;if(!(n&1)&&!(n&2)&&r!==null)e:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var a=r.stateNode.containerInfo;if(a===i||a.nodeType===8&&a.parentNode===i)break;if(s===4)for(s=r.return;s!==null;){var u=s.tag;if((u===3||u===4)&&(u=s.stateNode.containerInfo,u===i||u.nodeType===8&&u.parentNode===i))return;s=s.return}for(;a!==null;){if(s=Pn(a),s===null)return;if(u=s.tag,u===5||u===6){r=l=s;continue e}a=a.parentNode}}r=r.return}ba(function(){var p=l,h=us(t),g=[];e:{var m=uu.get(e);if(m!==void 0){var x=ms,w=e;switch(e){case"keypress":if(Or(t)===0)break e;case"keydown":case"keyup":x=Md;break;case"focusin":w="focus",x=Fi;break;case"focusout":w="blur",x=Fi;break;case"beforeblur":case"afterblur":x=Fi;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":x=uo;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":x=Nd;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":x=Ad;break;case lu:case su:case ou:x=Pd;break;case au:x=Ud;break;case"scroll":x=Sd;break;case"wheel":x=Vd;break;case"copy":case"cut":case"paste":x=_d;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":x=po}var k=(n&4)!==0,D=!k&&e==="scroll",d=k?m!==null?m+"Capture":null:m;k=[];for(var c=p,f;c!==null;){f=c;var v=f.stateNode;if(f.tag===5&&v!==null&&(f=v,d!==null&&(v=Ht(c,d),v!=null&&k.push(Zt(c,v,f)))),D)break;c=c.return}0<k.length&&(m=new x(m,w,null,t,h),g.push({event:m,listeners:k}))}}if(!(n&7)){e:{if(m=e==="mouseover"||e==="pointerover",x=e==="mouseout"||e==="pointerout",m&&t!==yl&&(w=t.relatedTarget||t.fromElement)&&(Pn(w)||w[Ge]))break e;if((x||m)&&(m=h.window===h?h:(m=h.ownerDocument)?m.defaultView||m.parentWindow:window,x?(w=t.relatedTarget||t.toElement,x=p,w=w?Pn(w):null,w!==null&&(D=$n(w),w!==D||w.tag!==5&&w.tag!==6)&&(w=null)):(x=null,w=p),x!==w)){if(k=uo,v="onMouseLeave",d="onMouseEnter",c="mouse",(e==="pointerout"||e==="pointerover")&&(k=po,v="onPointerLeave",d="onPointerEnter",c="pointer"),D=x==null?m:Kn(x),f=w==null?m:Kn(w),m=new k(v,c+"leave",x,t,h),m.target=D,m.relatedTarget=f,v=null,Pn(h)===p&&(k=new k(d,c+"enter",w,t,h),k.target=f,k.relatedTarget=D,v=k),D=v,x&&w)n:{for(k=x,d=w,c=0,f=k;f;f=An(f))c++;for(f=0,v=d;v;v=An(v))f++;for(;0<c-f;)k=An(k),c--;for(;0<f-c;)d=An(d),f--;for(;c--;){if(k===d||d!==null&&k===d.alternate)break n;k=An(k),d=An(d)}k=null}else k=null;x!==null&&jo(g,m,x,k,!1),w!==null&&D!==null&&jo(g,D,w,k,!0)}}e:{if(m=p?Kn(p):window,x=m.nodeName&&m.nodeName.toLowerCase(),x==="select"||x==="input"&&m.type==="file")var j=Xd;else if(mo(m))if(eu)j=ep;else{j=Jd;var E=Zd}else(x=m.nodeName)&&x.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(j=qd);if(j&&(j=j(e,p))){qa(g,j,t,h);break e}E&&E(e,m,p),e==="focusout"&&(E=m._wrapperState)&&E.controlled&&m.type==="number"&&fl(m,"number",m.value)}switch(E=p?Kn(p):window,e){case"focusin":(mo(E)||E.contentEditable==="true")&&(Wn=E,Cl=p,Mt=null);break;case"focusout":Mt=Cl=Wn=null;break;case"mousedown":El=!0;break;case"contextmenu":case"mouseup":case"dragend":El=!1,wo(g,t,h);break;case"selectionchange":if(rp)break;case"keydown":case"keyup":wo(g,t,h)}var S;if(vs)e:{switch(e){case"compositionstart":var T="onCompositionStart";break e;case"compositionend":T="onCompositionEnd";break e;case"compositionupdate":T="onCompositionUpdate";break e}T=void 0}else Hn?Za(e,t)&&(T="onCompositionEnd"):e==="keydown"&&t.keyCode===229&&(T="onCompositionStart");T&&(Xa&&t.locale!=="ko"&&(Hn||T!=="onCompositionStart"?T==="onCompositionEnd"&&Hn&&(S=Ga()):(sn=h,hs="value"in sn?sn.value:sn.textContent,Hn=!0)),E=Jr(p,T),0<E.length&&(T=new co(T,e,null,t,h),g.push({event:T,listeners:E}),S?T.data=S:(S=Ja(t),S!==null&&(T.data=S)))),(S=Wd?Qd(e,t):Kd(e,t))&&(p=Jr(p,"onBeforeInput"),0<p.length&&(h=new co("onBeforeInput","beforeinput",null,t,h),g.push({event:h,listeners:p}),h.data=S))}cu(g,n)})}function Zt(e,n,t){return{instance:e,listener:n,currentTarget:t}}function Jr(e,n){for(var t=n+"Capture",r=[];e!==null;){var i=e,l=i.stateNode;i.tag===5&&l!==null&&(i=l,l=Ht(e,t),l!=null&&r.unshift(Zt(e,l,i)),l=Ht(e,n),l!=null&&r.push(Zt(e,l,i))),e=e.return}return r}function An(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function jo(e,n,t,r,i){for(var l=n._reactName,s=[];t!==null&&t!==r;){var a=t,u=a.alternate,p=a.stateNode;if(u!==null&&u===r)break;a.tag===5&&p!==null&&(a=p,i?(u=Ht(t,l),u!=null&&s.unshift(Zt(t,u,a))):i||(u=Ht(t,l),u!=null&&s.push(Zt(t,u,a)))),t=t.return}s.length!==0&&e.push({event:n,listeners:s})}var op=/\r\n?/g,ap=/\u0000|\uFFFD/g;function No(e){return(typeof e=="string"?e:""+e).replace(op,`
`).replace(ap,"")}function Cr(e,n,t){if(n=No(n),No(e)!==n&&t)throw Error(y(425))}function qr(){}var Pl=null,Tl=null;function _l(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var Ll=typeof setTimeout=="function"?setTimeout:void 0,up=typeof clearTimeout=="function"?clearTimeout:void 0,Co=typeof Promise=="function"?Promise:void 0,cp=typeof queueMicrotask=="function"?queueMicrotask:typeof Co<"u"?function(e){return Co.resolve(null).then(e).catch(dp)}:Ll;function dp(e){setTimeout(function(){throw e})}function Yi(e,n){var t=n,r=0;do{var i=t.nextSibling;if(e.removeChild(t),i&&i.nodeType===8)if(t=i.data,t==="/$"){if(r===0){e.removeChild(i),Kt(n);return}r--}else t!=="$"&&t!=="$?"&&t!=="$!"||r++;t=i}while(t);Kt(n)}function dn(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?")break;if(n==="/$")return null}}return e}function Eo(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="$"||t==="$!"||t==="$?"){if(n===0)return e;n--}else t==="/$"&&n++}e=e.previousSibling}return null}var gt=Math.random().toString(36).slice(2),Fe="__reactFiber$"+gt,Jt="__reactProps$"+gt,Ge="__reactContainer$"+gt,zl="__reactEvents$"+gt,pp="__reactListeners$"+gt,fp="__reactHandles$"+gt;function Pn(e){var n=e[Fe];if(n)return n;for(var t=e.parentNode;t;){if(n=t[Ge]||t[Fe]){if(t=n.alternate,n.child!==null||t!==null&&t.child!==null)for(e=Eo(e);e!==null;){if(t=e[Fe])return t;e=Eo(e)}return n}e=t,t=e.parentNode}return null}function cr(e){return e=e[Fe]||e[Ge],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Kn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(y(33))}function wi(e){return e[Jt]||null}var Il=[],Yn=-1;function xn(e){return{current:e}}function A(e){0>Yn||(e.current=Il[Yn],Il[Yn]=null,Yn--)}function O(e,n){Yn++,Il[Yn]=e.current,e.current=n}var vn={},oe=xn(vn),he=xn(!1),In=vn;function ot(e,n){var t=e.type.contextTypes;if(!t)return vn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===n)return r.__reactInternalMemoizedMaskedChildContext;var i={},l;for(l in t)i[l]=n[l];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=n,e.__reactInternalMemoizedMaskedChildContext=i),i}function me(e){return e=e.childContextTypes,e!=null}function ei(){A(he),A(oe)}function Po(e,n,t){if(oe.current!==vn)throw Error(y(168));O(oe,n),O(he,t)}function pu(e,n,t){var r=e.stateNode;if(n=n.childContextTypes,typeof r.getChildContext!="function")return t;r=r.getChildContext();for(var i in r)if(!(i in n))throw Error(y(108,Zc(e)||"Unknown",i));return H({},t,r)}function ni(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||vn,In=oe.current,O(oe,e),O(he,he.current),!0}function To(e,n,t){var r=e.stateNode;if(!r)throw Error(y(169));t?(e=pu(e,n,In),r.__reactInternalMemoizedMergedChildContext=e,A(he),A(oe),O(oe,e)):A(he),O(he,t)}var He=null,ki=!1,Gi=!1;function fu(e){He===null?He=[e]:He.push(e)}function hp(e){ki=!0,fu(e)}function wn(){if(!Gi&&He!==null){Gi=!0;var e=0,n=M;try{var t=He;for(M=1;e<t.length;e++){var r=t[e];do r=r(!0);while(r!==null)}He=null,ki=!1}catch(i){throw He!==null&&(He=He.slice(e+1)),$a(cs,wn),i}finally{M=n,Gi=!1}}return null}var Gn=[],Xn=0,ti=null,ri=0,Ne=[],Ce=0,Rn=null,We=1,Qe="";function Cn(e,n){Gn[Xn++]=ri,Gn[Xn++]=ti,ti=e,ri=n}function hu(e,n,t){Ne[Ce++]=We,Ne[Ce++]=Qe,Ne[Ce++]=Rn,Rn=e;var r=We;e=Qe;var i=32-be(r)-1;r&=~(1<<i),t+=1;var l=32-be(n)+i;if(30<l){var s=i-i%5;l=(r&(1<<s)-1).toString(32),r>>=s,i-=s,We=1<<32-be(n)+i|t<<i|r,Qe=l+e}else We=1<<l|t<<i|r,Qe=e}function xs(e){e.return!==null&&(Cn(e,1),hu(e,1,0))}function ws(e){for(;e===ti;)ti=Gn[--Xn],Gn[Xn]=null,ri=Gn[--Xn],Gn[Xn]=null;for(;e===Rn;)Rn=Ne[--Ce],Ne[Ce]=null,Qe=Ne[--Ce],Ne[Ce]=null,We=Ne[--Ce],Ne[Ce]=null}var we=null,xe=null,F=!1,Re=null;function mu(e,n){var t=Ee(5,null,null,0);t.elementType="DELETED",t.stateNode=n,t.return=e,n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)}function _o(e,n){switch(e.tag){case 5:var t=e.type;return n=n.nodeType!==1||t.toLowerCase()!==n.nodeName.toLowerCase()?null:n,n!==null?(e.stateNode=n,we=e,xe=dn(n.firstChild),!0):!1;case 6:return n=e.pendingProps===""||n.nodeType!==3?null:n,n!==null?(e.stateNode=n,we=e,xe=null,!0):!1;case 13:return n=n.nodeType!==8?null:n,n!==null?(t=Rn!==null?{id:We,overflow:Qe}:null,e.memoizedState={dehydrated:n,treeContext:t,retryLane:1073741824},t=Ee(18,null,null,0),t.stateNode=n,t.return=e,e.child=t,we=e,xe=null,!0):!1;default:return!1}}function Rl(e){return(e.mode&1)!==0&&(e.flags&128)===0}function bl(e){if(F){var n=xe;if(n){var t=n;if(!_o(e,n)){if(Rl(e))throw Error(y(418));n=dn(t.nextSibling);var r=we;n&&_o(e,n)?mu(r,t):(e.flags=e.flags&-4097|2,F=!1,we=e)}}else{if(Rl(e))throw Error(y(418));e.flags=e.flags&-4097|2,F=!1,we=e}}}function Lo(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;we=e}function Er(e){if(e!==we)return!1;if(!F)return Lo(e),F=!0,!1;var n;if((n=e.tag!==3)&&!(n=e.tag!==5)&&(n=e.type,n=n!=="head"&&n!=="body"&&!_l(e.type,e.memoizedProps)),n&&(n=xe)){if(Rl(e))throw gu(),Error(y(418));for(;n;)mu(e,n),n=dn(n.nextSibling)}if(Lo(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(y(317));e:{for(e=e.nextSibling,n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="/$"){if(n===0){xe=dn(e.nextSibling);break e}n--}else t!=="$"&&t!=="$!"&&t!=="$?"||n++}e=e.nextSibling}xe=null}}else xe=we?dn(e.stateNode.nextSibling):null;return!0}function gu(){for(var e=xe;e;)e=dn(e.nextSibling)}function at(){xe=we=null,F=!1}function ks(e){Re===null?Re=[e]:Re.push(e)}var mp=Je.ReactCurrentBatchConfig;function jt(e,n,t){if(e=t.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(y(309));var r=t.stateNode}if(!r)throw Error(y(147,e));var i=r,l=""+e;return n!==null&&n.ref!==null&&typeof n.ref=="function"&&n.ref._stringRef===l?n.ref:(n=function(s){var a=i.refs;s===null?delete a[l]:a[l]=s},n._stringRef=l,n)}if(typeof e!="string")throw Error(y(284));if(!t._owner)throw Error(y(290,e))}return e}function Pr(e,n){throw e=Object.prototype.toString.call(n),Error(y(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e))}function zo(e){var n=e._init;return n(e._payload)}function vu(e){function n(d,c){if(e){var f=d.deletions;f===null?(d.deletions=[c],d.flags|=16):f.push(c)}}function t(d,c){if(!e)return null;for(;c!==null;)n(d,c),c=c.sibling;return null}function r(d,c){for(d=new Map;c!==null;)c.key!==null?d.set(c.key,c):d.set(c.index,c),c=c.sibling;return d}function i(d,c){return d=mn(d,c),d.index=0,d.sibling=null,d}function l(d,c,f){return d.index=f,e?(f=d.alternate,f!==null?(f=f.index,f<c?(d.flags|=2,c):f):(d.flags|=2,c)):(d.flags|=1048576,c)}function s(d){return e&&d.alternate===null&&(d.flags|=2),d}function a(d,c,f,v){return c===null||c.tag!==6?(c=tl(f,d.mode,v),c.return=d,c):(c=i(c,f),c.return=d,c)}function u(d,c,f,v){var j=f.type;return j===Vn?h(d,c,f.props.children,v,f.key):c!==null&&(c.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===nn&&zo(j)===c.type)?(v=i(c,f.props),v.ref=jt(d,c,f),v.return=d,v):(v=Hr(f.type,f.key,f.props,null,d.mode,v),v.ref=jt(d,c,f),v.return=d,v)}function p(d,c,f,v){return c===null||c.tag!==4||c.stateNode.containerInfo!==f.containerInfo||c.stateNode.implementation!==f.implementation?(c=rl(f,d.mode,v),c.return=d,c):(c=i(c,f.children||[]),c.return=d,c)}function h(d,c,f,v,j){return c===null||c.tag!==7?(c=zn(f,d.mode,v,j),c.return=d,c):(c=i(c,f),c.return=d,c)}function g(d,c,f){if(typeof c=="string"&&c!==""||typeof c=="number")return c=tl(""+c,d.mode,f),c.return=d,c;if(typeof c=="object"&&c!==null){switch(c.$$typeof){case gr:return f=Hr(c.type,c.key,c.props,null,d.mode,f),f.ref=jt(d,null,c),f.return=d,f;case Bn:return c=rl(c,d.mode,f),c.return=d,c;case nn:var v=c._init;return g(d,v(c._payload),f)}if(_t(c)||yt(c))return c=zn(c,d.mode,f,null),c.return=d,c;Pr(d,c)}return null}function m(d,c,f,v){var j=c!==null?c.key:null;if(typeof f=="string"&&f!==""||typeof f=="number")return j!==null?null:a(d,c,""+f,v);if(typeof f=="object"&&f!==null){switch(f.$$typeof){case gr:return f.key===j?u(d,c,f,v):null;case Bn:return f.key===j?p(d,c,f,v):null;case nn:return j=f._init,m(d,c,j(f._payload),v)}if(_t(f)||yt(f))return j!==null?null:h(d,c,f,v,null);Pr(d,f)}return null}function x(d,c,f,v,j){if(typeof v=="string"&&v!==""||typeof v=="number")return d=d.get(f)||null,a(c,d,""+v,j);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case gr:return d=d.get(v.key===null?f:v.key)||null,u(c,d,v,j);case Bn:return d=d.get(v.key===null?f:v.key)||null,p(c,d,v,j);case nn:var E=v._init;return x(d,c,f,E(v._payload),j)}if(_t(v)||yt(v))return d=d.get(f)||null,h(c,d,v,j,null);Pr(c,v)}return null}function w(d,c,f,v){for(var j=null,E=null,S=c,T=c=0,U=null;S!==null&&T<f.length;T++){S.index>T?(U=S,S=null):U=S.sibling;var z=m(d,S,f[T],v);if(z===null){S===null&&(S=U);break}e&&S&&z.alternate===null&&n(d,S),c=l(z,c,T),E===null?j=z:E.sibling=z,E=z,S=U}if(T===f.length)return t(d,S),F&&Cn(d,T),j;if(S===null){for(;T<f.length;T++)S=g(d,f[T],v),S!==null&&(c=l(S,c,T),E===null?j=S:E.sibling=S,E=S);return F&&Cn(d,T),j}for(S=r(d,S);T<f.length;T++)U=x(S,d,T,f[T],v),U!==null&&(e&&U.alternate!==null&&S.delete(U.key===null?T:U.key),c=l(U,c,T),E===null?j=U:E.sibling=U,E=U);return e&&S.forEach(function(ve){return n(d,ve)}),F&&Cn(d,T),j}function k(d,c,f,v){var j=yt(f);if(typeof j!="function")throw Error(y(150));if(f=j.call(f),f==null)throw Error(y(151));for(var E=j=null,S=c,T=c=0,U=null,z=f.next();S!==null&&!z.done;T++,z=f.next()){S.index>T?(U=S,S=null):U=S.sibling;var ve=m(d,S,z.value,v);if(ve===null){S===null&&(S=U);break}e&&S&&ve.alternate===null&&n(d,S),c=l(ve,c,T),E===null?j=ve:E.sibling=ve,E=ve,S=U}if(z.done)return t(d,S),F&&Cn(d,T),j;if(S===null){for(;!z.done;T++,z=f.next())z=g(d,z.value,v),z!==null&&(c=l(z,c,T),E===null?j=z:E.sibling=z,E=z);return F&&Cn(d,T),j}for(S=r(d,S);!z.done;T++,z=f.next())z=x(S,d,T,z.value,v),z!==null&&(e&&z.alternate!==null&&S.delete(z.key===null?T:z.key),c=l(z,c,T),E===null?j=z:E.sibling=z,E=z);return e&&S.forEach(function(kn){return n(d,kn)}),F&&Cn(d,T),j}function D(d,c,f,v){if(typeof f=="object"&&f!==null&&f.type===Vn&&f.key===null&&(f=f.props.children),typeof f=="object"&&f!==null){switch(f.$$typeof){case gr:e:{for(var j=f.key,E=c;E!==null;){if(E.key===j){if(j=f.type,j===Vn){if(E.tag===7){t(d,E.sibling),c=i(E,f.props.children),c.return=d,d=c;break e}}else if(E.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===nn&&zo(j)===E.type){t(d,E.sibling),c=i(E,f.props),c.ref=jt(d,E,f),c.return=d,d=c;break e}t(d,E);break}else n(d,E);E=E.sibling}f.type===Vn?(c=zn(f.props.children,d.mode,v,f.key),c.return=d,d=c):(v=Hr(f.type,f.key,f.props,null,d.mode,v),v.ref=jt(d,c,f),v.return=d,d=v)}return s(d);case Bn:e:{for(E=f.key;c!==null;){if(c.key===E)if(c.tag===4&&c.stateNode.containerInfo===f.containerInfo&&c.stateNode.implementation===f.implementation){t(d,c.sibling),c=i(c,f.children||[]),c.return=d,d=c;break e}else{t(d,c);break}else n(d,c);c=c.sibling}c=rl(f,d.mode,v),c.return=d,d=c}return s(d);case nn:return E=f._init,D(d,c,E(f._payload),v)}if(_t(f))return w(d,c,f,v);if(yt(f))return k(d,c,f,v);Pr(d,f)}return typeof f=="string"&&f!==""||typeof f=="number"?(f=""+f,c!==null&&c.tag===6?(t(d,c.sibling),c=i(c,f),c.return=d,d=c):(t(d,c),c=tl(f,d.mode,v),c.return=d,d=c),s(d)):t(d,c)}return D}var ut=vu(!0),yu=vu(!1),ii=xn(null),li=null,Zn=null,Ss=null;function js(){Ss=Zn=li=null}function Ns(e){var n=ii.current;A(ii),e._currentValue=n}function Dl(e,n,t){for(;e!==null;){var r=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,r!==null&&(r.childLanes|=n)):r!==null&&(r.childLanes&n)!==n&&(r.childLanes|=n),e===t)break;e=e.return}}function it(e,n){li=e,Ss=Zn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&n&&(fe=!0),e.firstContext=null)}function Te(e){var n=e._currentValue;if(Ss!==e)if(e={context:e,memoizedValue:n,next:null},Zn===null){if(li===null)throw Error(y(308));Zn=e,li.dependencies={lanes:0,firstContext:e}}else Zn=Zn.next=e;return n}var Tn=null;function Cs(e){Tn===null?Tn=[e]:Tn.push(e)}function xu(e,n,t,r){var i=n.interleaved;return i===null?(t.next=t,Cs(n)):(t.next=i.next,i.next=t),n.interleaved=t,Xe(e,r)}function Xe(e,n){e.lanes|=n;var t=e.alternate;for(t!==null&&(t.lanes|=n),t=e,e=e.return;e!==null;)e.childLanes|=n,t=e.alternate,t!==null&&(t.childLanes|=n),t=e,e=e.return;return t.tag===3?t.stateNode:null}var tn=!1;function Es(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function wu(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Ke(e,n){return{eventTime:e,lane:n,tag:0,payload:null,callback:null,next:null}}function pn(e,n,t){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,R&2){var i=r.pending;return i===null?n.next=n:(n.next=i.next,i.next=n),r.pending=n,Xe(e,t)}return i=r.interleaved,i===null?(n.next=n,Cs(r)):(n.next=i.next,i.next=n),r.interleaved=n,Xe(e,t)}function $r(e,n,t){if(n=n.updateQueue,n!==null&&(n=n.shared,(t&4194240)!==0)){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,ds(e,t)}}function Io(e,n){var t=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,t===r)){var i=null,l=null;if(t=t.firstBaseUpdate,t!==null){do{var s={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};l===null?i=l=s:l=l.next=s,t=t.next}while(t!==null);l===null?i=l=n:l=l.next=n}else i=l=n;t={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:l,shared:r.shared,effects:r.effects},e.updateQueue=t;return}e=t.lastBaseUpdate,e===null?t.firstBaseUpdate=n:e.next=n,t.lastBaseUpdate=n}function si(e,n,t,r){var i=e.updateQueue;tn=!1;var l=i.firstBaseUpdate,s=i.lastBaseUpdate,a=i.shared.pending;if(a!==null){i.shared.pending=null;var u=a,p=u.next;u.next=null,s===null?l=p:s.next=p,s=u;var h=e.alternate;h!==null&&(h=h.updateQueue,a=h.lastBaseUpdate,a!==s&&(a===null?h.firstBaseUpdate=p:a.next=p,h.lastBaseUpdate=u))}if(l!==null){var g=i.baseState;s=0,h=p=u=null,a=l;do{var m=a.lane,x=a.eventTime;if((r&m)===m){h!==null&&(h=h.next={eventTime:x,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var w=e,k=a;switch(m=n,x=t,k.tag){case 1:if(w=k.payload,typeof w=="function"){g=w.call(x,g,m);break e}g=w;break e;case 3:w.flags=w.flags&-65537|128;case 0:if(w=k.payload,m=typeof w=="function"?w.call(x,g,m):w,m==null)break e;g=H({},g,m);break e;case 2:tn=!0}}a.callback!==null&&a.lane!==0&&(e.flags|=64,m=i.effects,m===null?i.effects=[a]:m.push(a))}else x={eventTime:x,lane:m,tag:a.tag,payload:a.payload,callback:a.callback,next:null},h===null?(p=h=x,u=g):h=h.next=x,s|=m;if(a=a.next,a===null){if(a=i.shared.pending,a===null)break;m=a,a=m.next,m.next=null,i.lastBaseUpdate=m,i.shared.pending=null}}while(!0);if(h===null&&(u=g),i.baseState=u,i.firstBaseUpdate=p,i.lastBaseUpdate=h,n=i.shared.interleaved,n!==null){i=n;do s|=i.lane,i=i.next;while(i!==n)}else l===null&&(i.shared.lanes=0);Dn|=s,e.lanes=s,e.memoizedState=g}}function Ro(e,n,t){if(e=n.effects,n.effects=null,e!==null)for(n=0;n<e.length;n++){var r=e[n],i=r.callback;if(i!==null){if(r.callback=null,r=t,typeof i!="function")throw Error(y(191,i));i.call(r)}}}var dr={},Be=xn(dr),qt=xn(dr),er=xn(dr);function _n(e){if(e===dr)throw Error(y(174));return e}function Ps(e,n){switch(O(er,n),O(qt,e),O(Be,dr),e=n.nodeType,e){case 9:case 11:n=(n=n.documentElement)?n.namespaceURI:ml(null,"");break;default:e=e===8?n.parentNode:n,n=e.namespaceURI||null,e=e.tagName,n=ml(n,e)}A(Be),O(Be,n)}function ct(){A(Be),A(qt),A(er)}function ku(e){_n(er.current);var n=_n(Be.current),t=ml(n,e.type);n!==t&&(O(qt,e),O(Be,t))}function Ts(e){qt.current===e&&(A(Be),A(qt))}var B=xn(0);function oi(e){for(var n=e;n!==null;){if(n.tag===13){var t=n.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!==void 0){if(n.flags&128)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var Xi=[];function _s(){for(var e=0;e<Xi.length;e++)Xi[e]._workInProgressVersionPrimary=null;Xi.length=0}var Ar=Je.ReactCurrentDispatcher,Zi=Je.ReactCurrentBatchConfig,bn=0,V=null,X=null,q=null,ai=!1,Ot=!1,nr=0,gp=0;function ie(){throw Error(y(321))}function Ls(e,n){if(n===null)return!1;for(var t=0;t<n.length&&t<e.length;t++)if(!Me(e[t],n[t]))return!1;return!0}function zs(e,n,t,r,i,l){if(bn=l,V=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,Ar.current=e===null||e.memoizedState===null?wp:kp,e=t(r,i),Ot){l=0;do{if(Ot=!1,nr=0,25<=l)throw Error(y(301));l+=1,q=X=null,n.updateQueue=null,Ar.current=Sp,e=t(r,i)}while(Ot)}if(Ar.current=ui,n=X!==null&&X.next!==null,bn=0,q=X=V=null,ai=!1,n)throw Error(y(300));return e}function Is(){var e=nr!==0;return nr=0,e}function Ae(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return q===null?V.memoizedState=q=e:q=q.next=e,q}function _e(){if(X===null){var e=V.alternate;e=e!==null?e.memoizedState:null}else e=X.next;var n=q===null?V.memoizedState:q.next;if(n!==null)q=n,X=e;else{if(e===null)throw Error(y(310));X=e,e={memoizedState:X.memoizedState,baseState:X.baseState,baseQueue:X.baseQueue,queue:X.queue,next:null},q===null?V.memoizedState=q=e:q=q.next=e}return q}function tr(e,n){return typeof n=="function"?n(e):n}function Ji(e){var n=_e(),t=n.queue;if(t===null)throw Error(y(311));t.lastRenderedReducer=e;var r=X,i=r.baseQueue,l=t.pending;if(l!==null){if(i!==null){var s=i.next;i.next=l.next,l.next=s}r.baseQueue=i=l,t.pending=null}if(i!==null){l=i.next,r=r.baseState;var a=s=null,u=null,p=l;do{var h=p.lane;if((bn&h)===h)u!==null&&(u=u.next={lane:0,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null}),r=p.hasEagerState?p.eagerState:e(r,p.action);else{var g={lane:h,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null};u===null?(a=u=g,s=r):u=u.next=g,V.lanes|=h,Dn|=h}p=p.next}while(p!==null&&p!==l);u===null?s=r:u.next=a,Me(r,n.memoizedState)||(fe=!0),n.memoizedState=r,n.baseState=s,n.baseQueue=u,t.lastRenderedState=r}if(e=t.interleaved,e!==null){i=e;do l=i.lane,V.lanes|=l,Dn|=l,i=i.next;while(i!==e)}else i===null&&(t.lanes=0);return[n.memoizedState,t.dispatch]}function qi(e){var n=_e(),t=n.queue;if(t===null)throw Error(y(311));t.lastRenderedReducer=e;var r=t.dispatch,i=t.pending,l=n.memoizedState;if(i!==null){t.pending=null;var s=i=i.next;do l=e(l,s.action),s=s.next;while(s!==i);Me(l,n.memoizedState)||(fe=!0),n.memoizedState=l,n.baseQueue===null&&(n.baseState=l),t.lastRenderedState=l}return[l,r]}function Su(){}function ju(e,n){var t=V,r=_e(),i=n(),l=!Me(r.memoizedState,i);if(l&&(r.memoizedState=i,fe=!0),r=r.queue,Rs(Eu.bind(null,t,r,e),[e]),r.getSnapshot!==n||l||q!==null&&q.memoizedState.tag&1){if(t.flags|=2048,rr(9,Cu.bind(null,t,r,i,n),void 0,null),ee===null)throw Error(y(349));bn&30||Nu(t,n,i)}return i}function Nu(e,n,t){e.flags|=16384,e={getSnapshot:n,value:t},n=V.updateQueue,n===null?(n={lastEffect:null,stores:null},V.updateQueue=n,n.stores=[e]):(t=n.stores,t===null?n.stores=[e]:t.push(e))}function Cu(e,n,t,r){n.value=t,n.getSnapshot=r,Pu(n)&&Tu(e)}function Eu(e,n,t){return t(function(){Pu(n)&&Tu(e)})}function Pu(e){var n=e.getSnapshot;e=e.value;try{var t=n();return!Me(e,t)}catch{return!0}}function Tu(e){var n=Xe(e,1);n!==null&&De(n,e,1,-1)}function bo(e){var n=Ae();return typeof e=="function"&&(e=e()),n.memoizedState=n.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:tr,lastRenderedState:e},n.queue=e,e=e.dispatch=xp.bind(null,V,e),[n.memoizedState,e]}function rr(e,n,t,r){return e={tag:e,create:n,destroy:t,deps:r,next:null},n=V.updateQueue,n===null?(n={lastEffect:null,stores:null},V.updateQueue=n,n.lastEffect=e.next=e):(t=n.lastEffect,t===null?n.lastEffect=e.next=e:(r=t.next,t.next=e,e.next=r,n.lastEffect=e)),e}function _u(){return _e().memoizedState}function Fr(e,n,t,r){var i=Ae();V.flags|=e,i.memoizedState=rr(1|n,t,void 0,r===void 0?null:r)}function Si(e,n,t,r){var i=_e();r=r===void 0?null:r;var l=void 0;if(X!==null){var s=X.memoizedState;if(l=s.destroy,r!==null&&Ls(r,s.deps)){i.memoizedState=rr(n,t,l,r);return}}V.flags|=e,i.memoizedState=rr(1|n,t,l,r)}function Do(e,n){return Fr(8390656,8,e,n)}function Rs(e,n){return Si(2048,8,e,n)}function Lu(e,n){return Si(4,2,e,n)}function zu(e,n){return Si(4,4,e,n)}function Iu(e,n){if(typeof n=="function")return e=e(),n(e),function(){n(null)};if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Ru(e,n,t){return t=t!=null?t.concat([e]):null,Si(4,4,Iu.bind(null,n,e),t)}function bs(){}function bu(e,n){var t=_e();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&Ls(n,r[1])?r[0]:(t.memoizedState=[e,n],e)}function Du(e,n){var t=_e();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&Ls(n,r[1])?r[0]:(e=e(),t.memoizedState=[e,n],e)}function Mu(e,n,t){return bn&21?(Me(t,n)||(t=Ua(),V.lanes|=t,Dn|=t,e.baseState=!0),n):(e.baseState&&(e.baseState=!1,fe=!0),e.memoizedState=t)}function vp(e,n){var t=M;M=t!==0&&4>t?t:4,e(!0);var r=Zi.transition;Zi.transition={};try{e(!1),n()}finally{M=t,Zi.transition=r}}function Ou(){return _e().memoizedState}function yp(e,n,t){var r=hn(e);if(t={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null},$u(e))Au(n,t);else if(t=xu(e,n,t,r),t!==null){var i=ue();De(t,e,r,i),Fu(t,n,r)}}function xp(e,n,t){var r=hn(e),i={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null};if($u(e))Au(n,i);else{var l=e.alternate;if(e.lanes===0&&(l===null||l.lanes===0)&&(l=n.lastRenderedReducer,l!==null))try{var s=n.lastRenderedState,a=l(s,t);if(i.hasEagerState=!0,i.eagerState=a,Me(a,s)){var u=n.interleaved;u===null?(i.next=i,Cs(n)):(i.next=u.next,u.next=i),n.interleaved=i;return}}catch{}finally{}t=xu(e,n,i,r),t!==null&&(i=ue(),De(t,e,r,i),Fu(t,n,r))}}function $u(e){var n=e.alternate;return e===V||n!==null&&n===V}function Au(e,n){Ot=ai=!0;var t=e.pending;t===null?n.next=n:(n.next=t.next,t.next=n),e.pending=n}function Fu(e,n,t){if(t&4194240){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,ds(e,t)}}var ui={readContext:Te,useCallback:ie,useContext:ie,useEffect:ie,useImperativeHandle:ie,useInsertionEffect:ie,useLayoutEffect:ie,useMemo:ie,useReducer:ie,useRef:ie,useState:ie,useDebugValue:ie,useDeferredValue:ie,useTransition:ie,useMutableSource:ie,useSyncExternalStore:ie,useId:ie,unstable_isNewReconciler:!1},wp={readContext:Te,useCallback:function(e,n){return Ae().memoizedState=[e,n===void 0?null:n],e},useContext:Te,useEffect:Do,useImperativeHandle:function(e,n,t){return t=t!=null?t.concat([e]):null,Fr(4194308,4,Iu.bind(null,n,e),t)},useLayoutEffect:function(e,n){return Fr(4194308,4,e,n)},useInsertionEffect:function(e,n){return Fr(4,2,e,n)},useMemo:function(e,n){var t=Ae();return n=n===void 0?null:n,e=e(),t.memoizedState=[e,n],e},useReducer:function(e,n,t){var r=Ae();return n=t!==void 0?t(n):n,r.memoizedState=r.baseState=n,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},r.queue=e,e=e.dispatch=yp.bind(null,V,e),[r.memoizedState,e]},useRef:function(e){var n=Ae();return e={current:e},n.memoizedState=e},useState:bo,useDebugValue:bs,useDeferredValue:function(e){return Ae().memoizedState=e},useTransition:function(){var e=bo(!1),n=e[0];return e=vp.bind(null,e[1]),Ae().memoizedState=e,[n,e]},useMutableSource:function(){},useSyncExternalStore:function(e,n,t){var r=V,i=Ae();if(F){if(t===void 0)throw Error(y(407));t=t()}else{if(t=n(),ee===null)throw Error(y(349));bn&30||Nu(r,n,t)}i.memoizedState=t;var l={value:t,getSnapshot:n};return i.queue=l,Do(Eu.bind(null,r,l,e),[e]),r.flags|=2048,rr(9,Cu.bind(null,r,l,t,n),void 0,null),t},useId:function(){var e=Ae(),n=ee.identifierPrefix;if(F){var t=Qe,r=We;t=(r&~(1<<32-be(r)-1)).toString(32)+t,n=":"+n+"R"+t,t=nr++,0<t&&(n+="H"+t.toString(32)),n+=":"}else t=gp++,n=":"+n+"r"+t.toString(32)+":";return e.memoizedState=n},unstable_isNewReconciler:!1},kp={readContext:Te,useCallback:bu,useContext:Te,useEffect:Rs,useImperativeHandle:Ru,useInsertionEffect:Lu,useLayoutEffect:zu,useMemo:Du,useReducer:Ji,useRef:_u,useState:function(){return Ji(tr)},useDebugValue:bs,useDeferredValue:function(e){var n=_e();return Mu(n,X.memoizedState,e)},useTransition:function(){var e=Ji(tr)[0],n=_e().memoizedState;return[e,n]},useMutableSource:Su,useSyncExternalStore:ju,useId:Ou,unstable_isNewReconciler:!1},Sp={readContext:Te,useCallback:bu,useContext:Te,useEffect:Rs,useImperativeHandle:Ru,useInsertionEffect:Lu,useLayoutEffect:zu,useMemo:Du,useReducer:qi,useRef:_u,useState:function(){return qi(tr)},useDebugValue:bs,useDeferredValue:function(e){var n=_e();return X===null?n.memoizedState=e:Mu(n,X.memoizedState,e)},useTransition:function(){var e=qi(tr)[0],n=_e().memoizedState;return[e,n]},useMutableSource:Su,useSyncExternalStore:ju,useId:Ou,unstable_isNewReconciler:!1};function ze(e,n){if(e&&e.defaultProps){n=H({},n),e=e.defaultProps;for(var t in e)n[t]===void 0&&(n[t]=e[t]);return n}return n}function Ml(e,n,t,r){n=e.memoizedState,t=t(r,n),t=t==null?n:H({},n,t),e.memoizedState=t,e.lanes===0&&(e.updateQueue.baseState=t)}var ji={isMounted:function(e){return(e=e._reactInternals)?$n(e)===e:!1},enqueueSetState:function(e,n,t){e=e._reactInternals;var r=ue(),i=hn(e),l=Ke(r,i);l.payload=n,t!=null&&(l.callback=t),n=pn(e,l,i),n!==null&&(De(n,e,i,r),$r(n,e,i))},enqueueReplaceState:function(e,n,t){e=e._reactInternals;var r=ue(),i=hn(e),l=Ke(r,i);l.tag=1,l.payload=n,t!=null&&(l.callback=t),n=pn(e,l,i),n!==null&&(De(n,e,i,r),$r(n,e,i))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var t=ue(),r=hn(e),i=Ke(t,r);i.tag=2,n!=null&&(i.callback=n),n=pn(e,i,r),n!==null&&(De(n,e,r,t),$r(n,e,r))}};function Mo(e,n,t,r,i,l,s){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,l,s):n.prototype&&n.prototype.isPureReactComponent?!Gt(t,r)||!Gt(i,l):!0}function Uu(e,n,t){var r=!1,i=vn,l=n.contextType;return typeof l=="object"&&l!==null?l=Te(l):(i=me(n)?In:oe.current,r=n.contextTypes,l=(r=r!=null)?ot(e,i):vn),n=new n(t,l),e.memoizedState=n.state!==null&&n.state!==void 0?n.state:null,n.updater=ji,e.stateNode=n,n._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=l),n}function Oo(e,n,t,r){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(t,r),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(t,r),n.state!==e&&ji.enqueueReplaceState(n,n.state,null)}function Ol(e,n,t,r){var i=e.stateNode;i.props=t,i.state=e.memoizedState,i.refs={},Es(e);var l=n.contextType;typeof l=="object"&&l!==null?i.context=Te(l):(l=me(n)?In:oe.current,i.context=ot(e,l)),i.state=e.memoizedState,l=n.getDerivedStateFromProps,typeof l=="function"&&(Ml(e,n,l,t),i.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(n=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),n!==i.state&&ji.enqueueReplaceState(i,i.state,null),si(e,t,i,r),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function dt(e,n){try{var t="",r=n;do t+=Xc(r),r=r.return;while(r);var i=t}catch(l){i=`
Error generating stack: `+l.message+`
`+l.stack}return{value:e,source:n,stack:i,digest:null}}function el(e,n,t){return{value:e,source:null,stack:t??null,digest:n??null}}function $l(e,n){try{console.error(n.value)}catch(t){setTimeout(function(){throw t})}}var jp=typeof WeakMap=="function"?WeakMap:Map;function Bu(e,n,t){t=Ke(-1,t),t.tag=3,t.payload={element:null};var r=n.value;return t.callback=function(){di||(di=!0,Yl=r),$l(e,n)},t}function Vu(e,n,t){t=Ke(-1,t),t.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var i=n.value;t.payload=function(){return r(i)},t.callback=function(){$l(e,n)}}var l=e.stateNode;return l!==null&&typeof l.componentDidCatch=="function"&&(t.callback=function(){$l(e,n),typeof r!="function"&&(fn===null?fn=new Set([this]):fn.add(this));var s=n.stack;this.componentDidCatch(n.value,{componentStack:s!==null?s:""})}),t}function $o(e,n,t){var r=e.pingCache;if(r===null){r=e.pingCache=new jp;var i=new Set;r.set(n,i)}else i=r.get(n),i===void 0&&(i=new Set,r.set(n,i));i.has(t)||(i.add(t),e=Op.bind(null,e,n,t),n.then(e,e))}function Ao(e){do{var n;if((n=e.tag===13)&&(n=e.memoizedState,n=n!==null?n.dehydrated!==null:!0),n)return e;e=e.return}while(e!==null);return null}function Fo(e,n,t,r,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===n?e.flags|=65536:(e.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(n=Ke(-1,1),n.tag=2,pn(t,n,1))),t.lanes|=1),e)}var Np=Je.ReactCurrentOwner,fe=!1;function ae(e,n,t,r){n.child=e===null?yu(n,null,t,r):ut(n,e.child,t,r)}function Uo(e,n,t,r,i){t=t.render;var l=n.ref;return it(n,i),r=zs(e,n,t,r,l,i),t=Is(),e!==null&&!fe?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~i,Ze(e,n,i)):(F&&t&&xs(n),n.flags|=1,ae(e,n,r,i),n.child)}function Bo(e,n,t,r,i){if(e===null){var l=t.type;return typeof l=="function"&&!Bs(l)&&l.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(n.tag=15,n.type=l,Hu(e,n,l,r,i)):(e=Hr(t.type,null,r,n,n.mode,i),e.ref=n.ref,e.return=n,n.child=e)}if(l=e.child,!(e.lanes&i)){var s=l.memoizedProps;if(t=t.compare,t=t!==null?t:Gt,t(s,r)&&e.ref===n.ref)return Ze(e,n,i)}return n.flags|=1,e=mn(l,r),e.ref=n.ref,e.return=n,n.child=e}function Hu(e,n,t,r,i){if(e!==null){var l=e.memoizedProps;if(Gt(l,r)&&e.ref===n.ref)if(fe=!1,n.pendingProps=r=l,(e.lanes&i)!==0)e.flags&131072&&(fe=!0);else return n.lanes=e.lanes,Ze(e,n,i)}return Al(e,n,t,r,i)}function Wu(e,n,t){var r=n.pendingProps,i=r.children,l=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(n.mode&1))n.memoizedState={baseLanes:0,cachePool:null,transitions:null},O(qn,ye),ye|=t;else{if(!(t&1073741824))return e=l!==null?l.baseLanes|t:t,n.lanes=n.childLanes=1073741824,n.memoizedState={baseLanes:e,cachePool:null,transitions:null},n.updateQueue=null,O(qn,ye),ye|=e,null;n.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=l!==null?l.baseLanes:t,O(qn,ye),ye|=r}else l!==null?(r=l.baseLanes|t,n.memoizedState=null):r=t,O(qn,ye),ye|=r;return ae(e,n,i,t),n.child}function Qu(e,n){var t=n.ref;(e===null&&t!==null||e!==null&&e.ref!==t)&&(n.flags|=512,n.flags|=2097152)}function Al(e,n,t,r,i){var l=me(t)?In:oe.current;return l=ot(n,l),it(n,i),t=zs(e,n,t,r,l,i),r=Is(),e!==null&&!fe?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~i,Ze(e,n,i)):(F&&r&&xs(n),n.flags|=1,ae(e,n,t,i),n.child)}function Vo(e,n,t,r,i){if(me(t)){var l=!0;ni(n)}else l=!1;if(it(n,i),n.stateNode===null)Ur(e,n),Uu(n,t,r),Ol(n,t,r,i),r=!0;else if(e===null){var s=n.stateNode,a=n.memoizedProps;s.props=a;var u=s.context,p=t.contextType;typeof p=="object"&&p!==null?p=Te(p):(p=me(t)?In:oe.current,p=ot(n,p));var h=t.getDerivedStateFromProps,g=typeof h=="function"||typeof s.getSnapshotBeforeUpdate=="function";g||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(a!==r||u!==p)&&Oo(n,s,r,p),tn=!1;var m=n.memoizedState;s.state=m,si(n,r,s,i),u=n.memoizedState,a!==r||m!==u||he.current||tn?(typeof h=="function"&&(Ml(n,t,h,r),u=n.memoizedState),(a=tn||Mo(n,t,a,r,m,u,p))?(g||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(n.flags|=4194308)):(typeof s.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=u),s.props=r,s.state=u,s.context=p,r=a):(typeof s.componentDidMount=="function"&&(n.flags|=4194308),r=!1)}else{s=n.stateNode,wu(e,n),a=n.memoizedProps,p=n.type===n.elementType?a:ze(n.type,a),s.props=p,g=n.pendingProps,m=s.context,u=t.contextType,typeof u=="object"&&u!==null?u=Te(u):(u=me(t)?In:oe.current,u=ot(n,u));var x=t.getDerivedStateFromProps;(h=typeof x=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(a!==g||m!==u)&&Oo(n,s,r,u),tn=!1,m=n.memoizedState,s.state=m,si(n,r,s,i);var w=n.memoizedState;a!==g||m!==w||he.current||tn?(typeof x=="function"&&(Ml(n,t,x,r),w=n.memoizedState),(p=tn||Mo(n,t,p,r,m,w,u)||!1)?(h||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(r,w,u),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(r,w,u)),typeof s.componentDidUpdate=="function"&&(n.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof s.componentDidUpdate!="function"||a===e.memoizedProps&&m===e.memoizedState||(n.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&m===e.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=w),s.props=r,s.state=w,s.context=u,r=p):(typeof s.componentDidUpdate!="function"||a===e.memoizedProps&&m===e.memoizedState||(n.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&m===e.memoizedState||(n.flags|=1024),r=!1)}return Fl(e,n,t,r,l,i)}function Fl(e,n,t,r,i,l){Qu(e,n);var s=(n.flags&128)!==0;if(!r&&!s)return i&&To(n,t,!1),Ze(e,n,l);r=n.stateNode,Np.current=n;var a=s&&typeof t.getDerivedStateFromError!="function"?null:r.render();return n.flags|=1,e!==null&&s?(n.child=ut(n,e.child,null,l),n.child=ut(n,null,a,l)):ae(e,n,a,l),n.memoizedState=r.state,i&&To(n,t,!0),n.child}function Ku(e){var n=e.stateNode;n.pendingContext?Po(e,n.pendingContext,n.pendingContext!==n.context):n.context&&Po(e,n.context,!1),Ps(e,n.containerInfo)}function Ho(e,n,t,r,i){return at(),ks(i),n.flags|=256,ae(e,n,t,r),n.child}var Ul={dehydrated:null,treeContext:null,retryLane:0};function Bl(e){return{baseLanes:e,cachePool:null,transitions:null}}function Yu(e,n,t){var r=n.pendingProps,i=B.current,l=!1,s=(n.flags&128)!==0,a;if((a=s)||(a=e!==null&&e.memoizedState===null?!1:(i&2)!==0),a?(l=!0,n.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),O(B,i&1),e===null)return bl(n),e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(n.mode&1?e.data==="$!"?n.lanes=8:n.lanes=1073741824:n.lanes=1,null):(s=r.children,e=r.fallback,l?(r=n.mode,l=n.child,s={mode:"hidden",children:s},!(r&1)&&l!==null?(l.childLanes=0,l.pendingProps=s):l=Ei(s,r,0,null),e=zn(e,r,t,null),l.return=n,e.return=n,l.sibling=e,n.child=l,n.child.memoizedState=Bl(t),n.memoizedState=Ul,e):Ds(n,s));if(i=e.memoizedState,i!==null&&(a=i.dehydrated,a!==null))return Cp(e,n,s,r,a,i,t);if(l){l=r.fallback,s=n.mode,i=e.child,a=i.sibling;var u={mode:"hidden",children:r.children};return!(s&1)&&n.child!==i?(r=n.child,r.childLanes=0,r.pendingProps=u,n.deletions=null):(r=mn(i,u),r.subtreeFlags=i.subtreeFlags&14680064),a!==null?l=mn(a,l):(l=zn(l,s,t,null),l.flags|=2),l.return=n,r.return=n,r.sibling=l,n.child=r,r=l,l=n.child,s=e.child.memoizedState,s=s===null?Bl(t):{baseLanes:s.baseLanes|t,cachePool:null,transitions:s.transitions},l.memoizedState=s,l.childLanes=e.childLanes&~t,n.memoizedState=Ul,r}return l=e.child,e=l.sibling,r=mn(l,{mode:"visible",children:r.children}),!(n.mode&1)&&(r.lanes=t),r.return=n,r.sibling=null,e!==null&&(t=n.deletions,t===null?(n.deletions=[e],n.flags|=16):t.push(e)),n.child=r,n.memoizedState=null,r}function Ds(e,n){return n=Ei({mode:"visible",children:n},e.mode,0,null),n.return=e,e.child=n}function Tr(e,n,t,r){return r!==null&&ks(r),ut(n,e.child,null,t),e=Ds(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function Cp(e,n,t,r,i,l,s){if(t)return n.flags&256?(n.flags&=-257,r=el(Error(y(422))),Tr(e,n,s,r)):n.memoizedState!==null?(n.child=e.child,n.flags|=128,null):(l=r.fallback,i=n.mode,r=Ei({mode:"visible",children:r.children},i,0,null),l=zn(l,i,s,null),l.flags|=2,r.return=n,l.return=n,r.sibling=l,n.child=r,n.mode&1&&ut(n,e.child,null,s),n.child.memoizedState=Bl(s),n.memoizedState=Ul,l);if(!(n.mode&1))return Tr(e,n,s,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var a=r.dgst;return r=a,l=Error(y(419)),r=el(l,r,void 0),Tr(e,n,s,r)}if(a=(s&e.childLanes)!==0,fe||a){if(r=ee,r!==null){switch(s&-s){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|s)?0:i,i!==0&&i!==l.retryLane&&(l.retryLane=i,Xe(e,i),De(r,e,i,-1))}return Us(),r=el(Error(y(421))),Tr(e,n,s,r)}return i.data==="$?"?(n.flags|=128,n.child=e.child,n=$p.bind(null,e),i._reactRetry=n,null):(e=l.treeContext,xe=dn(i.nextSibling),we=n,F=!0,Re=null,e!==null&&(Ne[Ce++]=We,Ne[Ce++]=Qe,Ne[Ce++]=Rn,We=e.id,Qe=e.overflow,Rn=n),n=Ds(n,r.children),n.flags|=4096,n)}function Wo(e,n,t){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n),Dl(e.return,n,t)}function nl(e,n,t,r,i){var l=e.memoizedState;l===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:t,tailMode:i}:(l.isBackwards=n,l.rendering=null,l.renderingStartTime=0,l.last=r,l.tail=t,l.tailMode=i)}function Gu(e,n,t){var r=n.pendingProps,i=r.revealOrder,l=r.tail;if(ae(e,n,r.children,t),r=B.current,r&2)r=r&1|2,n.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Wo(e,t,n);else if(e.tag===19)Wo(e,t,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(O(B,r),!(n.mode&1))n.memoizedState=null;else switch(i){case"forwards":for(t=n.child,i=null;t!==null;)e=t.alternate,e!==null&&oi(e)===null&&(i=t),t=t.sibling;t=i,t===null?(i=n.child,n.child=null):(i=t.sibling,t.sibling=null),nl(n,!1,i,t,l);break;case"backwards":for(t=null,i=n.child,n.child=null;i!==null;){if(e=i.alternate,e!==null&&oi(e)===null){n.child=i;break}e=i.sibling,i.sibling=t,t=i,i=e}nl(n,!0,t,null,l);break;case"together":nl(n,!1,null,null,void 0);break;default:n.memoizedState=null}return n.child}function Ur(e,n){!(n.mode&1)&&e!==null&&(e.alternate=null,n.alternate=null,n.flags|=2)}function Ze(e,n,t){if(e!==null&&(n.dependencies=e.dependencies),Dn|=n.lanes,!(t&n.childLanes))return null;if(e!==null&&n.child!==e.child)throw Error(y(153));if(n.child!==null){for(e=n.child,t=mn(e,e.pendingProps),n.child=t,t.return=n;e.sibling!==null;)e=e.sibling,t=t.sibling=mn(e,e.pendingProps),t.return=n;t.sibling=null}return n.child}function Ep(e,n,t){switch(n.tag){case 3:Ku(n),at();break;case 5:ku(n);break;case 1:me(n.type)&&ni(n);break;case 4:Ps(n,n.stateNode.containerInfo);break;case 10:var r=n.type._context,i=n.memoizedProps.value;O(ii,r._currentValue),r._currentValue=i;break;case 13:if(r=n.memoizedState,r!==null)return r.dehydrated!==null?(O(B,B.current&1),n.flags|=128,null):t&n.child.childLanes?Yu(e,n,t):(O(B,B.current&1),e=Ze(e,n,t),e!==null?e.sibling:null);O(B,B.current&1);break;case 19:if(r=(t&n.childLanes)!==0,e.flags&128){if(r)return Gu(e,n,t);n.flags|=128}if(i=n.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),O(B,B.current),r)break;return null;case 22:case 23:return n.lanes=0,Wu(e,n,t)}return Ze(e,n,t)}var Xu,Vl,Zu,Ju;Xu=function(e,n){for(var t=n.child;t!==null;){if(t.tag===5||t.tag===6)e.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break;for(;t.sibling===null;){if(t.return===null||t.return===n)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};Vl=function(){};Zu=function(e,n,t,r){var i=e.memoizedProps;if(i!==r){e=n.stateNode,_n(Be.current);var l=null;switch(t){case"input":i=dl(e,i),r=dl(e,r),l=[];break;case"select":i=H({},i,{value:void 0}),r=H({},r,{value:void 0}),l=[];break;case"textarea":i=hl(e,i),r=hl(e,r),l=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=qr)}gl(t,r);var s;t=null;for(p in i)if(!r.hasOwnProperty(p)&&i.hasOwnProperty(p)&&i[p]!=null)if(p==="style"){var a=i[p];for(s in a)a.hasOwnProperty(s)&&(t||(t={}),t[s]="")}else p!=="dangerouslySetInnerHTML"&&p!=="children"&&p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&p!=="autoFocus"&&(Bt.hasOwnProperty(p)?l||(l=[]):(l=l||[]).push(p,null));for(p in r){var u=r[p];if(a=i!=null?i[p]:void 0,r.hasOwnProperty(p)&&u!==a&&(u!=null||a!=null))if(p==="style")if(a){for(s in a)!a.hasOwnProperty(s)||u&&u.hasOwnProperty(s)||(t||(t={}),t[s]="");for(s in u)u.hasOwnProperty(s)&&a[s]!==u[s]&&(t||(t={}),t[s]=u[s])}else t||(l||(l=[]),l.push(p,t)),t=u;else p==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,a=a?a.__html:void 0,u!=null&&a!==u&&(l=l||[]).push(p,u)):p==="children"?typeof u!="string"&&typeof u!="number"||(l=l||[]).push(p,""+u):p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&(Bt.hasOwnProperty(p)?(u!=null&&p==="onScroll"&&$("scroll",e),l||a===u||(l=[])):(l=l||[]).push(p,u))}t&&(l=l||[]).push("style",t);var p=l;(n.updateQueue=p)&&(n.flags|=4)}};Ju=function(e,n,t,r){t!==r&&(n.flags|=4)};function Nt(e,n){if(!F)switch(e.tailMode){case"hidden":n=e.tail;for(var t=null;n!==null;)n.alternate!==null&&(t=n),n=n.sibling;t===null?e.tail=null:t.sibling=null;break;case"collapsed":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function le(e){var n=e.alternate!==null&&e.alternate.child===e.child,t=0,r=0;if(n)for(var i=e.child;i!==null;)t|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)t|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=t,n}function Pp(e,n,t){var r=n.pendingProps;switch(ws(n),n.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return le(n),null;case 1:return me(n.type)&&ei(),le(n),null;case 3:return r=n.stateNode,ct(),A(he),A(oe),_s(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Er(n)?n.flags|=4:e===null||e.memoizedState.isDehydrated&&!(n.flags&256)||(n.flags|=1024,Re!==null&&(Zl(Re),Re=null))),Vl(e,n),le(n),null;case 5:Ts(n);var i=_n(er.current);if(t=n.type,e!==null&&n.stateNode!=null)Zu(e,n,t,r,i),e.ref!==n.ref&&(n.flags|=512,n.flags|=2097152);else{if(!r){if(n.stateNode===null)throw Error(y(166));return le(n),null}if(e=_n(Be.current),Er(n)){r=n.stateNode,t=n.type;var l=n.memoizedProps;switch(r[Fe]=n,r[Jt]=l,e=(n.mode&1)!==0,t){case"dialog":$("cancel",r),$("close",r);break;case"iframe":case"object":case"embed":$("load",r);break;case"video":case"audio":for(i=0;i<zt.length;i++)$(zt[i],r);break;case"source":$("error",r);break;case"img":case"image":case"link":$("error",r),$("load",r);break;case"details":$("toggle",r);break;case"input":qs(r,l),$("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!l.multiple},$("invalid",r);break;case"textarea":no(r,l),$("invalid",r)}gl(t,l),i=null;for(var s in l)if(l.hasOwnProperty(s)){var a=l[s];s==="children"?typeof a=="string"?r.textContent!==a&&(l.suppressHydrationWarning!==!0&&Cr(r.textContent,a,e),i=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(l.suppressHydrationWarning!==!0&&Cr(r.textContent,a,e),i=["children",""+a]):Bt.hasOwnProperty(s)&&a!=null&&s==="onScroll"&&$("scroll",r)}switch(t){case"input":vr(r),eo(r,l,!0);break;case"textarea":vr(r),to(r);break;case"select":case"option":break;default:typeof l.onClick=="function"&&(r.onclick=qr)}r=i,n.updateQueue=r,r!==null&&(n.flags|=4)}else{s=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Ea(t)),e==="http://www.w3.org/1999/xhtml"?t==="script"?(e=s.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=s.createElement(t,{is:r.is}):(e=s.createElement(t),t==="select"&&(s=e,r.multiple?s.multiple=!0:r.size&&(s.size=r.size))):e=s.createElementNS(e,t),e[Fe]=n,e[Jt]=r,Xu(e,n,!1,!1),n.stateNode=e;e:{switch(s=vl(t,r),t){case"dialog":$("cancel",e),$("close",e),i=r;break;case"iframe":case"object":case"embed":$("load",e),i=r;break;case"video":case"audio":for(i=0;i<zt.length;i++)$(zt[i],e);i=r;break;case"source":$("error",e),i=r;break;case"img":case"image":case"link":$("error",e),$("load",e),i=r;break;case"details":$("toggle",e),i=r;break;case"input":qs(e,r),i=dl(e,r),$("invalid",e);break;case"option":i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=H({},r,{value:void 0}),$("invalid",e);break;case"textarea":no(e,r),i=hl(e,r),$("invalid",e);break;default:i=r}gl(t,i),a=i;for(l in a)if(a.hasOwnProperty(l)){var u=a[l];l==="style"?_a(e,u):l==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&Pa(e,u)):l==="children"?typeof u=="string"?(t!=="textarea"||u!=="")&&Vt(e,u):typeof u=="number"&&Vt(e,""+u):l!=="suppressContentEditableWarning"&&l!=="suppressHydrationWarning"&&l!=="autoFocus"&&(Bt.hasOwnProperty(l)?u!=null&&l==="onScroll"&&$("scroll",e):u!=null&&ls(e,l,u,s))}switch(t){case"input":vr(e),eo(e,r,!1);break;case"textarea":vr(e),to(e);break;case"option":r.value!=null&&e.setAttribute("value",""+gn(r.value));break;case"select":e.multiple=!!r.multiple,l=r.value,l!=null?et(e,!!r.multiple,l,!1):r.defaultValue!=null&&et(e,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=qr)}switch(t){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(n.flags|=4)}n.ref!==null&&(n.flags|=512,n.flags|=2097152)}return le(n),null;case 6:if(e&&n.stateNode!=null)Ju(e,n,e.memoizedProps,r);else{if(typeof r!="string"&&n.stateNode===null)throw Error(y(166));if(t=_n(er.current),_n(Be.current),Er(n)){if(r=n.stateNode,t=n.memoizedProps,r[Fe]=n,(l=r.nodeValue!==t)&&(e=we,e!==null))switch(e.tag){case 3:Cr(r.nodeValue,t,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Cr(r.nodeValue,t,(e.mode&1)!==0)}l&&(n.flags|=4)}else r=(t.nodeType===9?t:t.ownerDocument).createTextNode(r),r[Fe]=n,n.stateNode=r}return le(n),null;case 13:if(A(B),r=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(F&&xe!==null&&n.mode&1&&!(n.flags&128))gu(),at(),n.flags|=98560,l=!1;else if(l=Er(n),r!==null&&r.dehydrated!==null){if(e===null){if(!l)throw Error(y(318));if(l=n.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(y(317));l[Fe]=n}else at(),!(n.flags&128)&&(n.memoizedState=null),n.flags|=4;le(n),l=!1}else Re!==null&&(Zl(Re),Re=null),l=!0;if(!l)return n.flags&65536?n:null}return n.flags&128?(n.lanes=t,n):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(n.child.flags|=8192,n.mode&1&&(e===null||B.current&1?Z===0&&(Z=3):Us())),n.updateQueue!==null&&(n.flags|=4),le(n),null);case 4:return ct(),Vl(e,n),e===null&&Xt(n.stateNode.containerInfo),le(n),null;case 10:return Ns(n.type._context),le(n),null;case 17:return me(n.type)&&ei(),le(n),null;case 19:if(A(B),l=n.memoizedState,l===null)return le(n),null;if(r=(n.flags&128)!==0,s=l.rendering,s===null)if(r)Nt(l,!1);else{if(Z!==0||e!==null&&e.flags&128)for(e=n.child;e!==null;){if(s=oi(e),s!==null){for(n.flags|=128,Nt(l,!1),r=s.updateQueue,r!==null&&(n.updateQueue=r,n.flags|=4),n.subtreeFlags=0,r=t,t=n.child;t!==null;)l=t,e=r,l.flags&=14680066,s=l.alternate,s===null?(l.childLanes=0,l.lanes=e,l.child=null,l.subtreeFlags=0,l.memoizedProps=null,l.memoizedState=null,l.updateQueue=null,l.dependencies=null,l.stateNode=null):(l.childLanes=s.childLanes,l.lanes=s.lanes,l.child=s.child,l.subtreeFlags=0,l.deletions=null,l.memoizedProps=s.memoizedProps,l.memoizedState=s.memoizedState,l.updateQueue=s.updateQueue,l.type=s.type,e=s.dependencies,l.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t=t.sibling;return O(B,B.current&1|2),n.child}e=e.sibling}l.tail!==null&&K()>pt&&(n.flags|=128,r=!0,Nt(l,!1),n.lanes=4194304)}else{if(!r)if(e=oi(s),e!==null){if(n.flags|=128,r=!0,t=e.updateQueue,t!==null&&(n.updateQueue=t,n.flags|=4),Nt(l,!0),l.tail===null&&l.tailMode==="hidden"&&!s.alternate&&!F)return le(n),null}else 2*K()-l.renderingStartTime>pt&&t!==1073741824&&(n.flags|=128,r=!0,Nt(l,!1),n.lanes=4194304);l.isBackwards?(s.sibling=n.child,n.child=s):(t=l.last,t!==null?t.sibling=s:n.child=s,l.last=s)}return l.tail!==null?(n=l.tail,l.rendering=n,l.tail=n.sibling,l.renderingStartTime=K(),n.sibling=null,t=B.current,O(B,r?t&1|2:t&1),n):(le(n),null);case 22:case 23:return Fs(),r=n.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(n.flags|=8192),r&&n.mode&1?ye&1073741824&&(le(n),n.subtreeFlags&6&&(n.flags|=8192)):le(n),null;case 24:return null;case 25:return null}throw Error(y(156,n.tag))}function Tp(e,n){switch(ws(n),n.tag){case 1:return me(n.type)&&ei(),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return ct(),A(he),A(oe),_s(),e=n.flags,e&65536&&!(e&128)?(n.flags=e&-65537|128,n):null;case 5:return Ts(n),null;case 13:if(A(B),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(y(340));at()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return A(B),null;case 4:return ct(),null;case 10:return Ns(n.type._context),null;case 22:case 23:return Fs(),null;case 24:return null;default:return null}}var _r=!1,se=!1,_p=typeof WeakSet=="function"?WeakSet:Set,N=null;function Jn(e,n){var t=e.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(r){W(e,n,r)}else t.current=null}function Hl(e,n,t){try{t()}catch(r){W(e,n,r)}}var Qo=!1;function Lp(e,n){if(Pl=Xr,e=ru(),ys(e)){if("selectionStart"in e)var t={start:e.selectionStart,end:e.selectionEnd};else e:{t=(t=e.ownerDocument)&&t.defaultView||window;var r=t.getSelection&&t.getSelection();if(r&&r.rangeCount!==0){t=r.anchorNode;var i=r.anchorOffset,l=r.focusNode;r=r.focusOffset;try{t.nodeType,l.nodeType}catch{t=null;break e}var s=0,a=-1,u=-1,p=0,h=0,g=e,m=null;n:for(;;){for(var x;g!==t||i!==0&&g.nodeType!==3||(a=s+i),g!==l||r!==0&&g.nodeType!==3||(u=s+r),g.nodeType===3&&(s+=g.nodeValue.length),(x=g.firstChild)!==null;)m=g,g=x;for(;;){if(g===e)break n;if(m===t&&++p===i&&(a=s),m===l&&++h===r&&(u=s),(x=g.nextSibling)!==null)break;g=m,m=g.parentNode}g=x}t=a===-1||u===-1?null:{start:a,end:u}}else t=null}t=t||{start:0,end:0}}else t=null;for(Tl={focusedElem:e,selectionRange:t},Xr=!1,N=n;N!==null;)if(n=N,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,N=e;else for(;N!==null;){n=N;try{var w=n.alternate;if(n.flags&1024)switch(n.tag){case 0:case 11:case 15:break;case 1:if(w!==null){var k=w.memoizedProps,D=w.memoizedState,d=n.stateNode,c=d.getSnapshotBeforeUpdate(n.elementType===n.type?k:ze(n.type,k),D);d.__reactInternalSnapshotBeforeUpdate=c}break;case 3:var f=n.stateNode.containerInfo;f.nodeType===1?f.textContent="":f.nodeType===9&&f.documentElement&&f.removeChild(f.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(y(163))}}catch(v){W(n,n.return,v)}if(e=n.sibling,e!==null){e.return=n.return,N=e;break}N=n.return}return w=Qo,Qo=!1,w}function $t(e,n,t){var r=n.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var l=i.destroy;i.destroy=void 0,l!==void 0&&Hl(n,t,l)}i=i.next}while(i!==r)}}function Ni(e,n){if(n=n.updateQueue,n=n!==null?n.lastEffect:null,n!==null){var t=n=n.next;do{if((t.tag&e)===e){var r=t.create;t.destroy=r()}t=t.next}while(t!==n)}}function Wl(e){var n=e.ref;if(n!==null){var t=e.stateNode;switch(e.tag){case 5:e=t;break;default:e=t}typeof n=="function"?n(e):n.current=e}}function qu(e){var n=e.alternate;n!==null&&(e.alternate=null,qu(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&(delete n[Fe],delete n[Jt],delete n[zl],delete n[pp],delete n[fp])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function ec(e){return e.tag===5||e.tag===3||e.tag===4}function Ko(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||ec(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ql(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.nodeType===8?t.parentNode.insertBefore(e,n):t.insertBefore(e,n):(t.nodeType===8?(n=t.parentNode,n.insertBefore(e,t)):(n=t,n.appendChild(e)),t=t._reactRootContainer,t!=null||n.onclick!==null||(n.onclick=qr));else if(r!==4&&(e=e.child,e!==null))for(Ql(e,n,t),e=e.sibling;e!==null;)Ql(e,n,t),e=e.sibling}function Kl(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.insertBefore(e,n):t.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Kl(e,n,t),e=e.sibling;e!==null;)Kl(e,n,t),e=e.sibling}var ne=null,Ie=!1;function en(e,n,t){for(t=t.child;t!==null;)nc(e,n,t),t=t.sibling}function nc(e,n,t){if(Ue&&typeof Ue.onCommitFiberUnmount=="function")try{Ue.onCommitFiberUnmount(gi,t)}catch{}switch(t.tag){case 5:se||Jn(t,n);case 6:var r=ne,i=Ie;ne=null,en(e,n,t),ne=r,Ie=i,ne!==null&&(Ie?(e=ne,t=t.stateNode,e.nodeType===8?e.parentNode.removeChild(t):e.removeChild(t)):ne.removeChild(t.stateNode));break;case 18:ne!==null&&(Ie?(e=ne,t=t.stateNode,e.nodeType===8?Yi(e.parentNode,t):e.nodeType===1&&Yi(e,t),Kt(e)):Yi(ne,t.stateNode));break;case 4:r=ne,i=Ie,ne=t.stateNode.containerInfo,Ie=!0,en(e,n,t),ne=r,Ie=i;break;case 0:case 11:case 14:case 15:if(!se&&(r=t.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var l=i,s=l.destroy;l=l.tag,s!==void 0&&(l&2||l&4)&&Hl(t,n,s),i=i.next}while(i!==r)}en(e,n,t);break;case 1:if(!se&&(Jn(t,n),r=t.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=t.memoizedProps,r.state=t.memoizedState,r.componentWillUnmount()}catch(a){W(t,n,a)}en(e,n,t);break;case 21:en(e,n,t);break;case 22:t.mode&1?(se=(r=se)||t.memoizedState!==null,en(e,n,t),se=r):en(e,n,t);break;default:en(e,n,t)}}function Yo(e){var n=e.updateQueue;if(n!==null){e.updateQueue=null;var t=e.stateNode;t===null&&(t=e.stateNode=new _p),n.forEach(function(r){var i=Ap.bind(null,e,r);t.has(r)||(t.add(r),r.then(i,i))})}}function Le(e,n){var t=n.deletions;if(t!==null)for(var r=0;r<t.length;r++){var i=t[r];try{var l=e,s=n,a=s;e:for(;a!==null;){switch(a.tag){case 5:ne=a.stateNode,Ie=!1;break e;case 3:ne=a.stateNode.containerInfo,Ie=!0;break e;case 4:ne=a.stateNode.containerInfo,Ie=!0;break e}a=a.return}if(ne===null)throw Error(y(160));nc(l,s,i),ne=null,Ie=!1;var u=i.alternate;u!==null&&(u.return=null),i.return=null}catch(p){W(i,n,p)}}if(n.subtreeFlags&12854)for(n=n.child;n!==null;)tc(n,e),n=n.sibling}function tc(e,n){var t=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Le(n,e),$e(e),r&4){try{$t(3,e,e.return),Ni(3,e)}catch(k){W(e,e.return,k)}try{$t(5,e,e.return)}catch(k){W(e,e.return,k)}}break;case 1:Le(n,e),$e(e),r&512&&t!==null&&Jn(t,t.return);break;case 5:if(Le(n,e),$e(e),r&512&&t!==null&&Jn(t,t.return),e.flags&32){var i=e.stateNode;try{Vt(i,"")}catch(k){W(e,e.return,k)}}if(r&4&&(i=e.stateNode,i!=null)){var l=e.memoizedProps,s=t!==null?t.memoizedProps:l,a=e.type,u=e.updateQueue;if(e.updateQueue=null,u!==null)try{a==="input"&&l.type==="radio"&&l.name!=null&&Na(i,l),vl(a,s);var p=vl(a,l);for(s=0;s<u.length;s+=2){var h=u[s],g=u[s+1];h==="style"?_a(i,g):h==="dangerouslySetInnerHTML"?Pa(i,g):h==="children"?Vt(i,g):ls(i,h,g,p)}switch(a){case"input":pl(i,l);break;case"textarea":Ca(i,l);break;case"select":var m=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!l.multiple;var x=l.value;x!=null?et(i,!!l.multiple,x,!1):m!==!!l.multiple&&(l.defaultValue!=null?et(i,!!l.multiple,l.defaultValue,!0):et(i,!!l.multiple,l.multiple?[]:"",!1))}i[Jt]=l}catch(k){W(e,e.return,k)}}break;case 6:if(Le(n,e),$e(e),r&4){if(e.stateNode===null)throw Error(y(162));i=e.stateNode,l=e.memoizedProps;try{i.nodeValue=l}catch(k){W(e,e.return,k)}}break;case 3:if(Le(n,e),$e(e),r&4&&t!==null&&t.memoizedState.isDehydrated)try{Kt(n.containerInfo)}catch(k){W(e,e.return,k)}break;case 4:Le(n,e),$e(e);break;case 13:Le(n,e),$e(e),i=e.child,i.flags&8192&&(l=i.memoizedState!==null,i.stateNode.isHidden=l,!l||i.alternate!==null&&i.alternate.memoizedState!==null||($s=K())),r&4&&Yo(e);break;case 22:if(h=t!==null&&t.memoizedState!==null,e.mode&1?(se=(p=se)||h,Le(n,e),se=p):Le(n,e),$e(e),r&8192){if(p=e.memoizedState!==null,(e.stateNode.isHidden=p)&&!h&&e.mode&1)for(N=e,h=e.child;h!==null;){for(g=N=h;N!==null;){switch(m=N,x=m.child,m.tag){case 0:case 11:case 14:case 15:$t(4,m,m.return);break;case 1:Jn(m,m.return);var w=m.stateNode;if(typeof w.componentWillUnmount=="function"){r=m,t=m.return;try{n=r,w.props=n.memoizedProps,w.state=n.memoizedState,w.componentWillUnmount()}catch(k){W(r,t,k)}}break;case 5:Jn(m,m.return);break;case 22:if(m.memoizedState!==null){Xo(g);continue}}x!==null?(x.return=m,N=x):Xo(g)}h=h.sibling}e:for(h=null,g=e;;){if(g.tag===5){if(h===null){h=g;try{i=g.stateNode,p?(l=i.style,typeof l.setProperty=="function"?l.setProperty("display","none","important"):l.display="none"):(a=g.stateNode,u=g.memoizedProps.style,s=u!=null&&u.hasOwnProperty("display")?u.display:null,a.style.display=Ta("display",s))}catch(k){W(e,e.return,k)}}}else if(g.tag===6){if(h===null)try{g.stateNode.nodeValue=p?"":g.memoizedProps}catch(k){W(e,e.return,k)}}else if((g.tag!==22&&g.tag!==23||g.memoizedState===null||g===e)&&g.child!==null){g.child.return=g,g=g.child;continue}if(g===e)break e;for(;g.sibling===null;){if(g.return===null||g.return===e)break e;h===g&&(h=null),g=g.return}h===g&&(h=null),g.sibling.return=g.return,g=g.sibling}}break;case 19:Le(n,e),$e(e),r&4&&Yo(e);break;case 21:break;default:Le(n,e),$e(e)}}function $e(e){var n=e.flags;if(n&2){try{e:{for(var t=e.return;t!==null;){if(ec(t)){var r=t;break e}t=t.return}throw Error(y(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(Vt(i,""),r.flags&=-33);var l=Ko(e);Kl(e,l,i);break;case 3:case 4:var s=r.stateNode.containerInfo,a=Ko(e);Ql(e,a,s);break;default:throw Error(y(161))}}catch(u){W(e,e.return,u)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function zp(e,n,t){N=e,rc(e)}function rc(e,n,t){for(var r=(e.mode&1)!==0;N!==null;){var i=N,l=i.child;if(i.tag===22&&r){var s=i.memoizedState!==null||_r;if(!s){var a=i.alternate,u=a!==null&&a.memoizedState!==null||se;a=_r;var p=se;if(_r=s,(se=u)&&!p)for(N=i;N!==null;)s=N,u=s.child,s.tag===22&&s.memoizedState!==null?Zo(i):u!==null?(u.return=s,N=u):Zo(i);for(;l!==null;)N=l,rc(l),l=l.sibling;N=i,_r=a,se=p}Go(e)}else i.subtreeFlags&8772&&l!==null?(l.return=i,N=l):Go(e)}}function Go(e){for(;N!==null;){var n=N;if(n.flags&8772){var t=n.alternate;try{if(n.flags&8772)switch(n.tag){case 0:case 11:case 15:se||Ni(5,n);break;case 1:var r=n.stateNode;if(n.flags&4&&!se)if(t===null)r.componentDidMount();else{var i=n.elementType===n.type?t.memoizedProps:ze(n.type,t.memoizedProps);r.componentDidUpdate(i,t.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var l=n.updateQueue;l!==null&&Ro(n,l,r);break;case 3:var s=n.updateQueue;if(s!==null){if(t=null,n.child!==null)switch(n.child.tag){case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}Ro(n,s,t)}break;case 5:var a=n.stateNode;if(t===null&&n.flags&4){t=a;var u=n.memoizedProps;switch(n.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&t.focus();break;case"img":u.src&&(t.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(n.memoizedState===null){var p=n.alternate;if(p!==null){var h=p.memoizedState;if(h!==null){var g=h.dehydrated;g!==null&&Kt(g)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(y(163))}se||n.flags&512&&Wl(n)}catch(m){W(n,n.return,m)}}if(n===e){N=null;break}if(t=n.sibling,t!==null){t.return=n.return,N=t;break}N=n.return}}function Xo(e){for(;N!==null;){var n=N;if(n===e){N=null;break}var t=n.sibling;if(t!==null){t.return=n.return,N=t;break}N=n.return}}function Zo(e){for(;N!==null;){var n=N;try{switch(n.tag){case 0:case 11:case 15:var t=n.return;try{Ni(4,n)}catch(u){W(n,t,u)}break;case 1:var r=n.stateNode;if(typeof r.componentDidMount=="function"){var i=n.return;try{r.componentDidMount()}catch(u){W(n,i,u)}}var l=n.return;try{Wl(n)}catch(u){W(n,l,u)}break;case 5:var s=n.return;try{Wl(n)}catch(u){W(n,s,u)}}}catch(u){W(n,n.return,u)}if(n===e){N=null;break}var a=n.sibling;if(a!==null){a.return=n.return,N=a;break}N=n.return}}var Ip=Math.ceil,ci=Je.ReactCurrentDispatcher,Ms=Je.ReactCurrentOwner,Pe=Je.ReactCurrentBatchConfig,R=0,ee=null,G=null,te=0,ye=0,qn=xn(0),Z=0,ir=null,Dn=0,Ci=0,Os=0,At=null,pe=null,$s=0,pt=1/0,Ve=null,di=!1,Yl=null,fn=null,Lr=!1,on=null,pi=0,Ft=0,Gl=null,Br=-1,Vr=0;function ue(){return R&6?K():Br!==-1?Br:Br=K()}function hn(e){return e.mode&1?R&2&&te!==0?te&-te:mp.transition!==null?(Vr===0&&(Vr=Ua()),Vr):(e=M,e!==0||(e=window.event,e=e===void 0?16:Ya(e.type)),e):1}function De(e,n,t,r){if(50<Ft)throw Ft=0,Gl=null,Error(y(185));ar(e,t,r),(!(R&2)||e!==ee)&&(e===ee&&(!(R&2)&&(Ci|=t),Z===4&&ln(e,te)),ge(e,r),t===1&&R===0&&!(n.mode&1)&&(pt=K()+500,ki&&wn()))}function ge(e,n){var t=e.callbackNode;md(e,n);var r=Gr(e,e===ee?te:0);if(r===0)t!==null&&lo(t),e.callbackNode=null,e.callbackPriority=0;else if(n=r&-r,e.callbackPriority!==n){if(t!=null&&lo(t),n===1)e.tag===0?hp(Jo.bind(null,e)):fu(Jo.bind(null,e)),cp(function(){!(R&6)&&wn()}),t=null;else{switch(Ba(r)){case 1:t=cs;break;case 4:t=Aa;break;case 16:t=Yr;break;case 536870912:t=Fa;break;default:t=Yr}t=dc(t,ic.bind(null,e))}e.callbackPriority=n,e.callbackNode=t}}function ic(e,n){if(Br=-1,Vr=0,R&6)throw Error(y(327));var t=e.callbackNode;if(lt()&&e.callbackNode!==t)return null;var r=Gr(e,e===ee?te:0);if(r===0)return null;if(r&30||r&e.expiredLanes||n)n=fi(e,r);else{n=r;var i=R;R|=2;var l=sc();(ee!==e||te!==n)&&(Ve=null,pt=K()+500,Ln(e,n));do try{Dp();break}catch(a){lc(e,a)}while(!0);js(),ci.current=l,R=i,G!==null?n=0:(ee=null,te=0,n=Z)}if(n!==0){if(n===2&&(i=Sl(e),i!==0&&(r=i,n=Xl(e,i))),n===1)throw t=ir,Ln(e,0),ln(e,r),ge(e,K()),t;if(n===6)ln(e,r);else{if(i=e.current.alternate,!(r&30)&&!Rp(i)&&(n=fi(e,r),n===2&&(l=Sl(e),l!==0&&(r=l,n=Xl(e,l))),n===1))throw t=ir,Ln(e,0),ln(e,r),ge(e,K()),t;switch(e.finishedWork=i,e.finishedLanes=r,n){case 0:case 1:throw Error(y(345));case 2:En(e,pe,Ve);break;case 3:if(ln(e,r),(r&130023424)===r&&(n=$s+500-K(),10<n)){if(Gr(e,0)!==0)break;if(i=e.suspendedLanes,(i&r)!==r){ue(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=Ll(En.bind(null,e,pe,Ve),n);break}En(e,pe,Ve);break;case 4:if(ln(e,r),(r&4194240)===r)break;for(n=e.eventTimes,i=-1;0<r;){var s=31-be(r);l=1<<s,s=n[s],s>i&&(i=s),r&=~l}if(r=i,r=K()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Ip(r/1960))-r,10<r){e.timeoutHandle=Ll(En.bind(null,e,pe,Ve),r);break}En(e,pe,Ve);break;case 5:En(e,pe,Ve);break;default:throw Error(y(329))}}}return ge(e,K()),e.callbackNode===t?ic.bind(null,e):null}function Xl(e,n){var t=At;return e.current.memoizedState.isDehydrated&&(Ln(e,n).flags|=256),e=fi(e,n),e!==2&&(n=pe,pe=t,n!==null&&Zl(n)),e}function Zl(e){pe===null?pe=e:pe.push.apply(pe,e)}function Rp(e){for(var n=e;;){if(n.flags&16384){var t=n.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var r=0;r<t.length;r++){var i=t[r],l=i.getSnapshot;i=i.value;try{if(!Me(l(),i))return!1}catch{return!1}}}if(t=n.child,n.subtreeFlags&16384&&t!==null)t.return=n,n=t;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function ln(e,n){for(n&=~Os,n&=~Ci,e.suspendedLanes|=n,e.pingedLanes&=~n,e=e.expirationTimes;0<n;){var t=31-be(n),r=1<<t;e[t]=-1,n&=~r}}function Jo(e){if(R&6)throw Error(y(327));lt();var n=Gr(e,0);if(!(n&1))return ge(e,K()),null;var t=fi(e,n);if(e.tag!==0&&t===2){var r=Sl(e);r!==0&&(n=r,t=Xl(e,r))}if(t===1)throw t=ir,Ln(e,0),ln(e,n),ge(e,K()),t;if(t===6)throw Error(y(345));return e.finishedWork=e.current.alternate,e.finishedLanes=n,En(e,pe,Ve),ge(e,K()),null}function As(e,n){var t=R;R|=1;try{return e(n)}finally{R=t,R===0&&(pt=K()+500,ki&&wn())}}function Mn(e){on!==null&&on.tag===0&&!(R&6)&&lt();var n=R;R|=1;var t=Pe.transition,r=M;try{if(Pe.transition=null,M=1,e)return e()}finally{M=r,Pe.transition=t,R=n,!(R&6)&&wn()}}function Fs(){ye=qn.current,A(qn)}function Ln(e,n){e.finishedWork=null,e.finishedLanes=0;var t=e.timeoutHandle;if(t!==-1&&(e.timeoutHandle=-1,up(t)),G!==null)for(t=G.return;t!==null;){var r=t;switch(ws(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&ei();break;case 3:ct(),A(he),A(oe),_s();break;case 5:Ts(r);break;case 4:ct();break;case 13:A(B);break;case 19:A(B);break;case 10:Ns(r.type._context);break;case 22:case 23:Fs()}t=t.return}if(ee=e,G=e=mn(e.current,null),te=ye=n,Z=0,ir=null,Os=Ci=Dn=0,pe=At=null,Tn!==null){for(n=0;n<Tn.length;n++)if(t=Tn[n],r=t.interleaved,r!==null){t.interleaved=null;var i=r.next,l=t.pending;if(l!==null){var s=l.next;l.next=i,r.next=s}t.pending=r}Tn=null}return e}function lc(e,n){do{var t=G;try{if(js(),Ar.current=ui,ai){for(var r=V.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}ai=!1}if(bn=0,q=X=V=null,Ot=!1,nr=0,Ms.current=null,t===null||t.return===null){Z=1,ir=n,G=null;break}e:{var l=e,s=t.return,a=t,u=n;if(n=te,a.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var p=u,h=a,g=h.tag;if(!(h.mode&1)&&(g===0||g===11||g===15)){var m=h.alternate;m?(h.updateQueue=m.updateQueue,h.memoizedState=m.memoizedState,h.lanes=m.lanes):(h.updateQueue=null,h.memoizedState=null)}var x=Ao(s);if(x!==null){x.flags&=-257,Fo(x,s,a,l,n),x.mode&1&&$o(l,p,n),n=x,u=p;var w=n.updateQueue;if(w===null){var k=new Set;k.add(u),n.updateQueue=k}else w.add(u);break e}else{if(!(n&1)){$o(l,p,n),Us();break e}u=Error(y(426))}}else if(F&&a.mode&1){var D=Ao(s);if(D!==null){!(D.flags&65536)&&(D.flags|=256),Fo(D,s,a,l,n),ks(dt(u,a));break e}}l=u=dt(u,a),Z!==4&&(Z=2),At===null?At=[l]:At.push(l),l=s;do{switch(l.tag){case 3:l.flags|=65536,n&=-n,l.lanes|=n;var d=Bu(l,u,n);Io(l,d);break e;case 1:a=u;var c=l.type,f=l.stateNode;if(!(l.flags&128)&&(typeof c.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(fn===null||!fn.has(f)))){l.flags|=65536,n&=-n,l.lanes|=n;var v=Vu(l,a,n);Io(l,v);break e}}l=l.return}while(l!==null)}ac(t)}catch(j){n=j,G===t&&t!==null&&(G=t=t.return);continue}break}while(!0)}function sc(){var e=ci.current;return ci.current=ui,e===null?ui:e}function Us(){(Z===0||Z===3||Z===2)&&(Z=4),ee===null||!(Dn&268435455)&&!(Ci&268435455)||ln(ee,te)}function fi(e,n){var t=R;R|=2;var r=sc();(ee!==e||te!==n)&&(Ve=null,Ln(e,n));do try{bp();break}catch(i){lc(e,i)}while(!0);if(js(),R=t,ci.current=r,G!==null)throw Error(y(261));return ee=null,te=0,Z}function bp(){for(;G!==null;)oc(G)}function Dp(){for(;G!==null&&!sd();)oc(G)}function oc(e){var n=cc(e.alternate,e,ye);e.memoizedProps=e.pendingProps,n===null?ac(e):G=n,Ms.current=null}function ac(e){var n=e;do{var t=n.alternate;if(e=n.return,n.flags&32768){if(t=Tp(t,n),t!==null){t.flags&=32767,G=t;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Z=6,G=null;return}}else if(t=Pp(t,n,ye),t!==null){G=t;return}if(n=n.sibling,n!==null){G=n;return}G=n=e}while(n!==null);Z===0&&(Z=5)}function En(e,n,t){var r=M,i=Pe.transition;try{Pe.transition=null,M=1,Mp(e,n,t,r)}finally{Pe.transition=i,M=r}return null}function Mp(e,n,t,r){do lt();while(on!==null);if(R&6)throw Error(y(327));t=e.finishedWork;var i=e.finishedLanes;if(t===null)return null;if(e.finishedWork=null,e.finishedLanes=0,t===e.current)throw Error(y(177));e.callbackNode=null,e.callbackPriority=0;var l=t.lanes|t.childLanes;if(gd(e,l),e===ee&&(G=ee=null,te=0),!(t.subtreeFlags&2064)&&!(t.flags&2064)||Lr||(Lr=!0,dc(Yr,function(){return lt(),null})),l=(t.flags&15990)!==0,t.subtreeFlags&15990||l){l=Pe.transition,Pe.transition=null;var s=M;M=1;var a=R;R|=4,Ms.current=null,Lp(e,t),tc(t,e),tp(Tl),Xr=!!Pl,Tl=Pl=null,e.current=t,zp(t),od(),R=a,M=s,Pe.transition=l}else e.current=t;if(Lr&&(Lr=!1,on=e,pi=i),l=e.pendingLanes,l===0&&(fn=null),cd(t.stateNode),ge(e,K()),n!==null)for(r=e.onRecoverableError,t=0;t<n.length;t++)i=n[t],r(i.value,{componentStack:i.stack,digest:i.digest});if(di)throw di=!1,e=Yl,Yl=null,e;return pi&1&&e.tag!==0&&lt(),l=e.pendingLanes,l&1?e===Gl?Ft++:(Ft=0,Gl=e):Ft=0,wn(),null}function lt(){if(on!==null){var e=Ba(pi),n=Pe.transition,t=M;try{if(Pe.transition=null,M=16>e?16:e,on===null)var r=!1;else{if(e=on,on=null,pi=0,R&6)throw Error(y(331));var i=R;for(R|=4,N=e.current;N!==null;){var l=N,s=l.child;if(N.flags&16){var a=l.deletions;if(a!==null){for(var u=0;u<a.length;u++){var p=a[u];for(N=p;N!==null;){var h=N;switch(h.tag){case 0:case 11:case 15:$t(8,h,l)}var g=h.child;if(g!==null)g.return=h,N=g;else for(;N!==null;){h=N;var m=h.sibling,x=h.return;if(qu(h),h===p){N=null;break}if(m!==null){m.return=x,N=m;break}N=x}}}var w=l.alternate;if(w!==null){var k=w.child;if(k!==null){w.child=null;do{var D=k.sibling;k.sibling=null,k=D}while(k!==null)}}N=l}}if(l.subtreeFlags&2064&&s!==null)s.return=l,N=s;else e:for(;N!==null;){if(l=N,l.flags&2048)switch(l.tag){case 0:case 11:case 15:$t(9,l,l.return)}var d=l.sibling;if(d!==null){d.return=l.return,N=d;break e}N=l.return}}var c=e.current;for(N=c;N!==null;){s=N;var f=s.child;if(s.subtreeFlags&2064&&f!==null)f.return=s,N=f;else e:for(s=c;N!==null;){if(a=N,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:Ni(9,a)}}catch(j){W(a,a.return,j)}if(a===s){N=null;break e}var v=a.sibling;if(v!==null){v.return=a.return,N=v;break e}N=a.return}}if(R=i,wn(),Ue&&typeof Ue.onPostCommitFiberRoot=="function")try{Ue.onPostCommitFiberRoot(gi,e)}catch{}r=!0}return r}finally{M=t,Pe.transition=n}}return!1}function qo(e,n,t){n=dt(t,n),n=Bu(e,n,1),e=pn(e,n,1),n=ue(),e!==null&&(ar(e,1,n),ge(e,n))}function W(e,n,t){if(e.tag===3)qo(e,e,t);else for(;n!==null;){if(n.tag===3){qo(n,e,t);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(fn===null||!fn.has(r))){e=dt(t,e),e=Vu(n,e,1),n=pn(n,e,1),e=ue(),n!==null&&(ar(n,1,e),ge(n,e));break}}n=n.return}}function Op(e,n,t){var r=e.pingCache;r!==null&&r.delete(n),n=ue(),e.pingedLanes|=e.suspendedLanes&t,ee===e&&(te&t)===t&&(Z===4||Z===3&&(te&130023424)===te&&500>K()-$s?Ln(e,0):Os|=t),ge(e,n)}function uc(e,n){n===0&&(e.mode&1?(n=wr,wr<<=1,!(wr&130023424)&&(wr=4194304)):n=1);var t=ue();e=Xe(e,n),e!==null&&(ar(e,n,t),ge(e,t))}function $p(e){var n=e.memoizedState,t=0;n!==null&&(t=n.retryLane),uc(e,t)}function Ap(e,n){var t=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(t=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(y(314))}r!==null&&r.delete(n),uc(e,t)}var cc;cc=function(e,n,t){if(e!==null)if(e.memoizedProps!==n.pendingProps||he.current)fe=!0;else{if(!(e.lanes&t)&&!(n.flags&128))return fe=!1,Ep(e,n,t);fe=!!(e.flags&131072)}else fe=!1,F&&n.flags&1048576&&hu(n,ri,n.index);switch(n.lanes=0,n.tag){case 2:var r=n.type;Ur(e,n),e=n.pendingProps;var i=ot(n,oe.current);it(n,t),i=zs(null,n,r,e,i,t);var l=Is();return n.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(n.tag=1,n.memoizedState=null,n.updateQueue=null,me(r)?(l=!0,ni(n)):l=!1,n.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,Es(n),i.updater=ji,n.stateNode=i,i._reactInternals=n,Ol(n,r,e,t),n=Fl(null,n,r,!0,l,t)):(n.tag=0,F&&l&&xs(n),ae(null,n,i,t),n=n.child),n;case 16:r=n.elementType;e:{switch(Ur(e,n),e=n.pendingProps,i=r._init,r=i(r._payload),n.type=r,i=n.tag=Up(r),e=ze(r,e),i){case 0:n=Al(null,n,r,e,t);break e;case 1:n=Vo(null,n,r,e,t);break e;case 11:n=Uo(null,n,r,e,t);break e;case 14:n=Bo(null,n,r,ze(r.type,e),t);break e}throw Error(y(306,r,""))}return n;case 0:return r=n.type,i=n.pendingProps,i=n.elementType===r?i:ze(r,i),Al(e,n,r,i,t);case 1:return r=n.type,i=n.pendingProps,i=n.elementType===r?i:ze(r,i),Vo(e,n,r,i,t);case 3:e:{if(Ku(n),e===null)throw Error(y(387));r=n.pendingProps,l=n.memoizedState,i=l.element,wu(e,n),si(n,r,null,t);var s=n.memoizedState;if(r=s.element,l.isDehydrated)if(l={element:r,isDehydrated:!1,cache:s.cache,pendingSuspenseBoundaries:s.pendingSuspenseBoundaries,transitions:s.transitions},n.updateQueue.baseState=l,n.memoizedState=l,n.flags&256){i=dt(Error(y(423)),n),n=Ho(e,n,r,t,i);break e}else if(r!==i){i=dt(Error(y(424)),n),n=Ho(e,n,r,t,i);break e}else for(xe=dn(n.stateNode.containerInfo.firstChild),we=n,F=!0,Re=null,t=yu(n,null,r,t),n.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(at(),r===i){n=Ze(e,n,t);break e}ae(e,n,r,t)}n=n.child}return n;case 5:return ku(n),e===null&&bl(n),r=n.type,i=n.pendingProps,l=e!==null?e.memoizedProps:null,s=i.children,_l(r,i)?s=null:l!==null&&_l(r,l)&&(n.flags|=32),Qu(e,n),ae(e,n,s,t),n.child;case 6:return e===null&&bl(n),null;case 13:return Yu(e,n,t);case 4:return Ps(n,n.stateNode.containerInfo),r=n.pendingProps,e===null?n.child=ut(n,null,r,t):ae(e,n,r,t),n.child;case 11:return r=n.type,i=n.pendingProps,i=n.elementType===r?i:ze(r,i),Uo(e,n,r,i,t);case 7:return ae(e,n,n.pendingProps,t),n.child;case 8:return ae(e,n,n.pendingProps.children,t),n.child;case 12:return ae(e,n,n.pendingProps.children,t),n.child;case 10:e:{if(r=n.type._context,i=n.pendingProps,l=n.memoizedProps,s=i.value,O(ii,r._currentValue),r._currentValue=s,l!==null)if(Me(l.value,s)){if(l.children===i.children&&!he.current){n=Ze(e,n,t);break e}}else for(l=n.child,l!==null&&(l.return=n);l!==null;){var a=l.dependencies;if(a!==null){s=l.child;for(var u=a.firstContext;u!==null;){if(u.context===r){if(l.tag===1){u=Ke(-1,t&-t),u.tag=2;var p=l.updateQueue;if(p!==null){p=p.shared;var h=p.pending;h===null?u.next=u:(u.next=h.next,h.next=u),p.pending=u}}l.lanes|=t,u=l.alternate,u!==null&&(u.lanes|=t),Dl(l.return,t,n),a.lanes|=t;break}u=u.next}}else if(l.tag===10)s=l.type===n.type?null:l.child;else if(l.tag===18){if(s=l.return,s===null)throw Error(y(341));s.lanes|=t,a=s.alternate,a!==null&&(a.lanes|=t),Dl(s,t,n),s=l.sibling}else s=l.child;if(s!==null)s.return=l;else for(s=l;s!==null;){if(s===n){s=null;break}if(l=s.sibling,l!==null){l.return=s.return,s=l;break}s=s.return}l=s}ae(e,n,i.children,t),n=n.child}return n;case 9:return i=n.type,r=n.pendingProps.children,it(n,t),i=Te(i),r=r(i),n.flags|=1,ae(e,n,r,t),n.child;case 14:return r=n.type,i=ze(r,n.pendingProps),i=ze(r.type,i),Bo(e,n,r,i,t);case 15:return Hu(e,n,n.type,n.pendingProps,t);case 17:return r=n.type,i=n.pendingProps,i=n.elementType===r?i:ze(r,i),Ur(e,n),n.tag=1,me(r)?(e=!0,ni(n)):e=!1,it(n,t),Uu(n,r,i),Ol(n,r,i,t),Fl(null,n,r,!0,e,t);case 19:return Gu(e,n,t);case 22:return Wu(e,n,t)}throw Error(y(156,n.tag))};function dc(e,n){return $a(e,n)}function Fp(e,n,t,r){this.tag=e,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ee(e,n,t,r){return new Fp(e,n,t,r)}function Bs(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Up(e){if(typeof e=="function")return Bs(e)?1:0;if(e!=null){if(e=e.$$typeof,e===os)return 11;if(e===as)return 14}return 2}function mn(e,n){var t=e.alternate;return t===null?(t=Ee(e.tag,n,e.key,e.mode),t.elementType=e.elementType,t.type=e.type,t.stateNode=e.stateNode,t.alternate=e,e.alternate=t):(t.pendingProps=n,t.type=e.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=e.flags&14680064,t.childLanes=e.childLanes,t.lanes=e.lanes,t.child=e.child,t.memoizedProps=e.memoizedProps,t.memoizedState=e.memoizedState,t.updateQueue=e.updateQueue,n=e.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},t.sibling=e.sibling,t.index=e.index,t.ref=e.ref,t}function Hr(e,n,t,r,i,l){var s=2;if(r=e,typeof e=="function")Bs(e)&&(s=1);else if(typeof e=="string")s=5;else e:switch(e){case Vn:return zn(t.children,i,l,n);case ss:s=8,i|=8;break;case ol:return e=Ee(12,t,n,i|2),e.elementType=ol,e.lanes=l,e;case al:return e=Ee(13,t,n,i),e.elementType=al,e.lanes=l,e;case ul:return e=Ee(19,t,n,i),e.elementType=ul,e.lanes=l,e;case ka:return Ei(t,i,l,n);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case xa:s=10;break e;case wa:s=9;break e;case os:s=11;break e;case as:s=14;break e;case nn:s=16,r=null;break e}throw Error(y(130,e==null?e:typeof e,""))}return n=Ee(s,t,n,i),n.elementType=e,n.type=r,n.lanes=l,n}function zn(e,n,t,r){return e=Ee(7,e,r,n),e.lanes=t,e}function Ei(e,n,t,r){return e=Ee(22,e,r,n),e.elementType=ka,e.lanes=t,e.stateNode={isHidden:!1},e}function tl(e,n,t){return e=Ee(6,e,null,n),e.lanes=t,e}function rl(e,n,t){return n=Ee(4,e.children!==null?e.children:[],e.key,n),n.lanes=t,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}function Bp(e,n,t,r,i){this.tag=n,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Oi(0),this.expirationTimes=Oi(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Oi(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Vs(e,n,t,r,i,l,s,a,u){return e=new Bp(e,n,t,a,u),n===1?(n=1,l===!0&&(n|=8)):n=0,l=Ee(3,null,null,n),e.current=l,l.stateNode=e,l.memoizedState={element:r,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},Es(l),e}function Vp(e,n,t){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Bn,key:r==null?null:""+r,children:e,containerInfo:n,implementation:t}}function pc(e){if(!e)return vn;e=e._reactInternals;e:{if($n(e)!==e||e.tag!==1)throw Error(y(170));var n=e;do{switch(n.tag){case 3:n=n.stateNode.context;break e;case 1:if(me(n.type)){n=n.stateNode.__reactInternalMemoizedMergedChildContext;break e}}n=n.return}while(n!==null);throw Error(y(171))}if(e.tag===1){var t=e.type;if(me(t))return pu(e,t,n)}return n}function fc(e,n,t,r,i,l,s,a,u){return e=Vs(t,r,!0,e,i,l,s,a,u),e.context=pc(null),t=e.current,r=ue(),i=hn(t),l=Ke(r,i),l.callback=n??null,pn(t,l,i),e.current.lanes=i,ar(e,i,r),ge(e,r),e}function Pi(e,n,t,r){var i=n.current,l=ue(),s=hn(i);return t=pc(t),n.context===null?n.context=t:n.pendingContext=t,n=Ke(l,s),n.payload={element:e},r=r===void 0?null:r,r!==null&&(n.callback=r),e=pn(i,n,s),e!==null&&(De(e,i,s,l),$r(e,i,s)),s}function hi(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function ea(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var t=e.retryLane;e.retryLane=t!==0&&t<n?t:n}}function Hs(e,n){ea(e,n),(e=e.alternate)&&ea(e,n)}function Hp(){return null}var hc=typeof reportError=="function"?reportError:function(e){console.error(e)};function Ws(e){this._internalRoot=e}Ti.prototype.render=Ws.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(y(409));Pi(e,n,null,null)};Ti.prototype.unmount=Ws.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;Mn(function(){Pi(null,e,null,null)}),n[Ge]=null}};function Ti(e){this._internalRoot=e}Ti.prototype.unstable_scheduleHydration=function(e){if(e){var n=Wa();e={blockedOn:null,target:e,priority:n};for(var t=0;t<rn.length&&n!==0&&n<rn[t].priority;t++);rn.splice(t,0,e),t===0&&Ka(e)}};function Qs(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function _i(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function na(){}function Wp(e,n,t,r,i){if(i){if(typeof r=="function"){var l=r;r=function(){var p=hi(s);l.call(p)}}var s=fc(n,r,e,0,null,!1,!1,"",na);return e._reactRootContainer=s,e[Ge]=s.current,Xt(e.nodeType===8?e.parentNode:e),Mn(),s}for(;i=e.lastChild;)e.removeChild(i);if(typeof r=="function"){var a=r;r=function(){var p=hi(u);a.call(p)}}var u=Vs(e,0,!1,null,null,!1,!1,"",na);return e._reactRootContainer=u,e[Ge]=u.current,Xt(e.nodeType===8?e.parentNode:e),Mn(function(){Pi(n,u,t,r)}),u}function Li(e,n,t,r,i){var l=t._reactRootContainer;if(l){var s=l;if(typeof i=="function"){var a=i;i=function(){var u=hi(s);a.call(u)}}Pi(n,s,e,i)}else s=Wp(t,n,e,i,r);return hi(s)}Va=function(e){switch(e.tag){case 3:var n=e.stateNode;if(n.current.memoizedState.isDehydrated){var t=Lt(n.pendingLanes);t!==0&&(ds(n,t|1),ge(n,K()),!(R&6)&&(pt=K()+500,wn()))}break;case 13:Mn(function(){var r=Xe(e,1);if(r!==null){var i=ue();De(r,e,1,i)}}),Hs(e,1)}};ps=function(e){if(e.tag===13){var n=Xe(e,134217728);if(n!==null){var t=ue();De(n,e,134217728,t)}Hs(e,134217728)}};Ha=function(e){if(e.tag===13){var n=hn(e),t=Xe(e,n);if(t!==null){var r=ue();De(t,e,n,r)}Hs(e,n)}};Wa=function(){return M};Qa=function(e,n){var t=M;try{return M=e,n()}finally{M=t}};xl=function(e,n,t){switch(n){case"input":if(pl(e,t),n=t.name,t.type==="radio"&&n!=null){for(t=e;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+n)+'][type="radio"]'),n=0;n<t.length;n++){var r=t[n];if(r!==e&&r.form===e.form){var i=wi(r);if(!i)throw Error(y(90));ja(r),pl(r,i)}}}break;case"textarea":Ca(e,t);break;case"select":n=t.value,n!=null&&et(e,!!t.multiple,n,!1)}};Ia=As;Ra=Mn;var Qp={usingClientEntryPoint:!1,Events:[cr,Kn,wi,La,za,As]},Ct={findFiberByHostInstance:Pn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Kp={bundleType:Ct.bundleType,version:Ct.version,rendererPackageName:Ct.rendererPackageName,rendererConfig:Ct.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Je.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Ma(e),e===null?null:e.stateNode},findFiberByHostInstance:Ct.findFiberByHostInstance||Hp,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var zr=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zr.isDisabled&&zr.supportsFiber)try{gi=zr.inject(Kp),Ue=zr}catch{}}Se.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Qp;Se.createPortal=function(e,n){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Qs(n))throw Error(y(200));return Vp(e,n,null,t)};Se.createRoot=function(e,n){if(!Qs(e))throw Error(y(299));var t=!1,r="",i=hc;return n!=null&&(n.unstable_strictMode===!0&&(t=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onRecoverableError!==void 0&&(i=n.onRecoverableError)),n=Vs(e,1,!1,null,null,t,!1,r,i),e[Ge]=n.current,Xt(e.nodeType===8?e.parentNode:e),new Ws(n)};Se.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(y(188)):(e=Object.keys(e).join(","),Error(y(268,e)));return e=Ma(n),e=e===null?null:e.stateNode,e};Se.flushSync=function(e){return Mn(e)};Se.hydrate=function(e,n,t){if(!_i(n))throw Error(y(200));return Li(null,e,n,!0,t)};Se.hydrateRoot=function(e,n,t){if(!Qs(e))throw Error(y(405));var r=t!=null&&t.hydratedSources||null,i=!1,l="",s=hc;if(t!=null&&(t.unstable_strictMode===!0&&(i=!0),t.identifierPrefix!==void 0&&(l=t.identifierPrefix),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),n=fc(n,null,e,1,t??null,i,!1,l,s),e[Ge]=n.current,Xt(e),r)for(e=0;e<r.length;e++)t=r[e],i=t._getVersion,i=i(t._source),n.mutableSourceEagerHydrationData==null?n.mutableSourceEagerHydrationData=[t,i]:n.mutableSourceEagerHydrationData.push(t,i);return new Ti(n)};Se.render=function(e,n,t){if(!_i(n))throw Error(y(200));return Li(null,e,n,!1,t)};Se.unmountComponentAtNode=function(e){if(!_i(e))throw Error(y(40));return e._reactRootContainer?(Mn(function(){Li(null,null,e,!1,function(){e._reactRootContainer=null,e[Ge]=null})}),!0):!1};Se.unstable_batchedUpdates=As;Se.unstable_renderSubtreeIntoContainer=function(e,n,t,r){if(!_i(t))throw Error(y(200));if(e==null||e._reactInternals===void 0)throw Error(y(38));return Li(e,n,t,!1,r)};Se.version="18.3.1-next-f1338f8080-20240426";function mc(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(mc)}catch(e){console.error(e)}}mc(),ma.exports=Se;var Yp=ma.exports,gc,ta=Yp;gc=ll.createRoot=ta.createRoot,ll.hydrateRoot=ta.hydrateRoot;function Gp(e){return`
    :host {
      display: block;
      min-height: 100%;
    }

    #root {
      min-height: 100%;
    }

    ${e.replaceAll(":root",":host")}
  `}function Xp({component:e,styles:n,title:t}){const r=b.useRef(null),i=b.useRef(null);return b.useEffect(()=>{var p;const l=r.current;if(!l)return;const s=l.shadowRoot??l.attachShadow({mode:"open"});s.innerHTML="";const a=document.createElement("style");a.textContent=Gp(n),s.appendChild(a);const u=document.createElement("div");return u.id="root",s.appendChild(u),(p=i.current)==null||p.unmount(),i.current=gc(u),i.current.render(o.jsx(e,{})),()=>{var h;(h=i.current)==null||h.unmount(),i.current=null,s.innerHTML=""}},[e,n]),o.jsxs("section",{className:"playground-frame",children:[o.jsx("div",{className:"playground-frame__header",children:o.jsx("h2",{children:t})}),o.jsx("div",{ref:r,className:"playground-shadow-host"})]})}const Fn=[{id:"HEADPHONES",label:"Headphones",adapter:"HeadphoneAdapter",external:"HeadPhoneAPI",description:"Adapter shields the core player from vendor-specific headphone APIs."},{id:"BLUETOOTH",label:"Bluetooth Speaker",adapter:"BluetoothSpeakerAdapter",external:"BluetoothSpeakerAPI",description:"Bluetooth stays plug-compatible because device creation is delegated to the factory."},{id:"SPEAKER",label:"Wired Speaker",adapter:"WiredSpeakerAdapter",external:"WiredSpeakerAPI",description:"The concrete speaker stays outside the facade and only enters via the device contract."}],Un=[{id:"SEQUENTIAL",label:"Sequential",className:"SequentialPlayStrategy",description:"Predictable interview-friendly traversal. Great for proving extensibility with minimal behavior."},{id:"RANDOM",label:"Random",className:"RandomPlayStrategy",description:"Same interface, different ordering logic. This is the Strategy pattern payoff in one click."}],il={name:"Bollywood Hits",songs:[{name:"Tum hi ho",artist:"Arijit Singh",album:"Aashiqui 2"},{name:"Tere bin",artist:"A R Rehman",album:"Guru"},{name:"Channa Mereya",artist:"Arijit Singh",album:"Ae Dil Hai Mushkil"}]},Zp=[{id:"device-swap",label:"Device Swap",summary:"Show how Factory + Adapter absorbs hardware changes."},{id:"strategy-shift",label:"Strategy Shift",summary:"Switch playback behavior without touching the facade or engine."},{id:"playlist-run",label:"Playlist Run",summary:"Visualize the complete journey from application to external device APIs."}],Jp=[{id:"application",title:"MusicPlayerApplication",tag:"Entry Point",color:"mint",why:"Keeps user-facing commands simple and delegates orchestration instead of doing everything itself."},{id:"facade",title:"MusicPlayerFacade",tag:"Facade + Singleton",color:"amber",why:"Centralizes the playback workflow so callers avoid coordinating managers, devices, and engine objects manually."},{id:"playlistManager",title:"PlaylistManager",tag:"Manager",color:"slate",why:"Owns playlist creation and retrieval, which avoids leaking playlist bookkeeping into application code."},{id:"strategyManager",title:"StrategyManager",tag:"Manager",color:"slate",why:"Separates strategy selection from playback orchestration, reducing condition-heavy facade logic."},{id:"factory",title:"AudioOutputDeviceFactory",tag:"Factory",color:"rose",why:"Constructs the correct adapter for a selected device type without exposing concrete classes to callers."},{id:"strategy",title:"IPlayStrategy",tag:"Strategy",color:"violet",why:"Lets the system swap ordering behavior through one interface instead of branching throughout the codebase."},{id:"engine",title:"AudioEngine",tag:"Core Engine",color:"sky",why:"Owns playback state such as current song and pause/resume behavior, keeping this state out of UI-facing layers."},{id:"adapter",title:"IAudioOutputDevice",tag:"Adapter Boundary",color:"gold",why:"Normalizes hardware playback into one contract so external APIs remain replaceable."},{id:"external",title:"External Device APIs",tag:"Vendor Layer",color:"olive",why:"Concrete device SDKs remain isolated at the edges, which is exactly what interviewers want to see."}],Et=[{key:"application",title:"Application receives user intent",detail:"The top layer accepts actions like connect device, choose strategy, or play a playlist."},{key:"facade",title:"Facade orchestrates the workflow",detail:"One entry point coordinates managers and core services so callers avoid object choreography."}],Ir={connect:[...Et,{key:"factory",title:"Factory creates the right adapter",detail:"Device type is mapped to a concrete adapter without exposing implementation details upstream."},{key:"adapter",title:"Adapter becomes the active output boundary",detail:"The facade keeps only the common `IAudioOutputDevice` contract as the current device."},{key:"external",title:"External API stays isolated",detail:"Vendor-specific calls are pushed to the edge and never leak into playback orchestration."}],strategy:[...Et,{key:"strategyManager",title:"Strategy manager resolves the behavior",detail:"Sequential and random strategies are prebuilt and selected by type."},{key:"strategy",title:"Facade stores the chosen strategy",detail:"Playback order changes, while the public commands stay identical."}],playlist:[...Et,{key:"playlistManager",title:"Playlist manager loads the aggregate",detail:"Songs are retrieved by playlist name and handed to the current strategy."},{key:"strategy",title:"Strategy controls the traversal",detail:"The same playlist can behave differently depending on the chosen strategy."}],play:[...Et,{key:"strategy",title:"Strategy picks the next song",detail:"This is the exact interview moment where polymorphism replaces conditionals."},{key:"engine",title:"Audio engine owns playback state",detail:"The engine decides whether to start fresh or resume a paused song."},{key:"adapter",title:"Output device abstracts hardware",detail:"The engine sends audio through the device contract instead of any concrete SDK."},{key:"external",title:"Concrete device API finally executes",detail:"Only the selected adapter knows how to talk to the real device API."}],pause:[...Et,{key:"engine",title:"Pause happens in the engine",detail:"Pause/resume state belongs to the playback core because it is device-agnostic behavior."}]},qp=["System booted with `MusicPlayerApplication` as the user-facing entry point.","Interactive mode is ready. Choose a scenario or drive the architecture manually."];function ef(e){return[...e].sort((n,t)=>n.name.localeCompare(t.name))}function nf(){const[e,n]=b.useState(Fn[0]),[t,r]=b.useState(Un[0]),[i,l]=b.useState(!1),[s,a]=b.useState(null),[u,p]=b.useState(0),[h,g]=b.useState(null),[m,x]=b.useState(!1),[w,k]=b.useState("connect"),[D,d]=b.useState("playlist-run"),[c,f]=b.useState(qp),v=b.useMemo(()=>t.id==="RANDOM"?ef(il.songs):il.songs,[t]),j=b.useMemo(()=>new Set(Ir[w].map(P=>P.key)),[w]),E=b.useMemo(()=>{const P=h?`${h.name} by ${h.artist}`:"no active song",Y=s?s.label:"no connected device";return{headline:w==="play"?"AI interview coach: explain the current playback path":"AI interview coach: explain the design trade-off",summary:w==="connect"?`${e.label} is selected, but the upper layers only remember the interface. That is why the factory and adapter combination matters.`:w==="strategy"?`${t.className} is active, so behavior changed without changing the caller contract.`:w==="playlist"?"The playlist is modeled as data, while traversal is pushed into a strategy. That split keeps responsibilities crisp.":w==="pause"?"Pause is handled in AudioEngine because playback state should not leak into managers or device adapters.":`The system is currently routing ${P} through ${Y}. Every step uses indirection only where it earns clarity.`,bullets:[`Why this design: ${Ir[w][Ir[w].length-1].detail}`,`Interview soundbite: "${w==="play"?"Behavior varies by strategy, integration varies by adapter.":"Hide orchestration complexity behind a facade, then isolate variability."}"`,`Extensibility test: adding a new ${w==="strategy"?"play mode":"device"} should stay localized instead of requiring cross-cutting edits.`]}},[w,s,h,e.label,t.className]);function S(P){f(Y=>[P,...Y].slice(0,8))}function T(P){if(d(P),P==="device-swap"){k("connect"),a(Fn[1]),n(Fn[1]),g(null),x(!1),S("Scenario loaded: device changes stay localized to factory selection and adapter binding.");return}if(P==="strategy-shift"){k("strategy"),r(Un[1]),g(null),x(!1),S("Scenario loaded: strategy swapped from sequential to random without changing the facade API.");return}k("playlist"),l(!0),r(Un[0]),S("Scenario loaded: full playlist journey is ready for walkthrough.")}function U(){a(e),k("connect"),S(`Connected ${e.label} using ${e.adapter}.`)}function z(){r(t),p(0),g(null),x(!1),k("strategy"),S(`Strategy changed to ${t.className}.`)}function ve(){l(!0),p(0),g(null),x(!1),k("playlist"),S(`Loaded playlist "${il.name}" into ${t.className}.`)}function kn(){if(!s){k("connect"),S("Playback blocked: connect an output device first.");return}if(!i){k("playlist"),S("Playback blocked: load a playlist before playing.");return}const P=v[u%v.length];p(Y=>Y+1),g(P),x(!1),k("play"),S(`Now playing ${P.name} through ${s.label}.`)}function Sn(){if(k("pause"),!h){S("Pause ignored: no song is currently playing.");return}x(!0),S(`Paused ${h.name} inside AudioEngine state.`)}const pr=Jp.map(P=>({...P,active:j.has(P.id)}));return o.jsxs("div",{className:"page-shell",children:[o.jsx("div",{className:"page-noise"}),o.jsxs("main",{className:"app-shell",children:[o.jsxs("section",{className:"hero-panel",children:[o.jsxs("div",{className:"hero-copy",children:[o.jsx("span",{className:"eyebrow",children:"Spotify LLD | AI-guided React Playground"}),o.jsx("h1",{children:"See why each design decision exists, not just what the classes are named."}),o.jsx("p",{children:"Explore the music player architecture from an interview perspective with live flows, narrated trade-offs, and a minimal visual system designed to make patterns memorable."})]}),o.jsxs("div",{className:"hero-stats",children:[o.jsxs("div",{className:"stat-card",children:[o.jsx("span",{children:"Current device"}),o.jsx("strong",{children:s?s.label:"Not connected"})]}),o.jsxs("div",{className:"stat-card",children:[o.jsx("span",{children:"Current strategy"}),o.jsx("strong",{children:t.label})]}),o.jsxs("div",{className:"stat-card",children:[o.jsx("span",{children:"Playback state"}),o.jsx("strong",{children:m?"Paused":h?"Playing":"Idle"})]})]})]}),o.jsx("section",{className:"scenario-strip",children:Zp.map(P=>o.jsxs("button",{type:"button",className:`scenario-chip ${D===P.id?"is-active":""}`,onClick:()=>T(P.id),children:[o.jsx("span",{children:P.label}),o.jsx("small",{children:P.summary})]},P.id))}),o.jsxs("section",{className:"workspace-grid",children:[o.jsxs("aside",{className:"control-panel glass-card",children:[o.jsxs("div",{className:"panel-heading",children:[o.jsx("span",{className:"panel-kicker",children:"Control deck"}),o.jsx("h2",{children:"Drive the system"})]}),o.jsxs("label",{className:"field",children:[o.jsx("span",{children:"Output device"}),o.jsx("select",{value:e.id,onChange:P=>n(Fn.find(Y=>Y.id===P.target.value)??Fn[0]),children:Fn.map(P=>o.jsx("option",{value:P.id,children:P.label},P.id))}),o.jsx("small",{children:e.description})]}),o.jsxs("label",{className:"field",children:[o.jsx("span",{children:"Playback strategy"}),o.jsx("select",{value:t.id,onChange:P=>r(Un.find(Y=>Y.id===P.target.value)??Un[0]),children:Un.map(P=>o.jsx("option",{value:P.id,children:P.label},P.id))}),o.jsx("small",{children:t.description})]}),o.jsxs("div",{className:"button-grid",children:[o.jsx("button",{type:"button",onClick:U,children:"Connect device"}),o.jsx("button",{type:"button",onClick:z,children:"Apply strategy"}),o.jsx("button",{type:"button",onClick:ve,children:"Load playlist"}),o.jsx("button",{type:"button",onClick:kn,children:"Play next"}),o.jsx("button",{type:"button",className:"ghost-button",onClick:Sn,children:"Pause"})]}),o.jsxs("div",{className:"now-playing",children:[o.jsx("span",{className:"panel-kicker",children:"Now visualizing"}),o.jsx("h3",{children:h?h.name:"No track selected"}),o.jsx("p",{children:h?`${h.artist} - ${h.album}`:"Choose a device, load the playlist, and trigger playback to watch the system collaborate."})]})]}),o.jsxs("section",{className:"diagram-panel glass-card",children:[o.jsxs("div",{className:"panel-heading",children:[o.jsx("span",{className:"panel-kicker",children:"Architecture map"}),o.jsx("h2",{children:"Pattern participation by interaction"})]}),o.jsx("div",{className:"architecture-grid",children:pr.map(P=>o.jsxs("article",{className:`architecture-card tone-${P.color} ${P.active?"is-active":""}`,children:[o.jsx("span",{children:P.tag}),o.jsx("h3",{children:P.title}),o.jsx("p",{children:P.why})]},P.id))})]}),o.jsxs("aside",{className:"insight-panel glass-card",children:[o.jsxs("div",{className:"panel-heading",children:[o.jsx("span",{className:"panel-kicker",children:"AI insight"}),o.jsx("h2",{children:E.headline})]}),o.jsx("p",{className:"insight-summary",children:E.summary}),o.jsx("div",{className:"insight-list",children:E.bullets.map(P=>o.jsx("div",{className:"insight-item",children:P},P))}),o.jsxs("div",{className:"sequence-panel",children:[o.jsx("span",{className:"panel-kicker",children:"Sequence walkthrough"}),Ir[w].map((P,Y)=>o.jsxs("div",{className:"sequence-step",children:[o.jsx("div",{className:"sequence-index",children:Y+1}),o.jsxs("div",{children:[o.jsx("h3",{children:P.title}),o.jsx("p",{children:P.detail})]})]},`${P.key}-${P.title}`))]})]})]}),o.jsxs("section",{className:"bottom-grid",children:[o.jsxs("div",{className:"glass-card playlist-panel",children:[o.jsxs("div",{className:"panel-heading",children:[o.jsx("span",{className:"panel-kicker",children:"Playlist lens"}),o.jsx("h2",{children:"Same data, different traversal"})]}),o.jsx("div",{className:"song-list",children:v.map((P,Y)=>{const vt=(h==null?void 0:h.name)===P.name;return o.jsxs("article",{className:`song-row ${vt?"is-current":""}`,children:[o.jsx("span",{className:"song-index",children:Y+1}),o.jsxs("div",{children:[o.jsx("h3",{children:P.name}),o.jsxs("p",{children:[P.artist," - ",P.album]})]}),o.jsx("span",{className:"song-badge",children:t.id==="RANDOM"?"Shuffled path":"Sequential path"})]},`${P.name}-${Y}`)})})]}),o.jsxs("div",{className:"glass-card event-panel",children:[o.jsxs("div",{className:"panel-heading",children:[o.jsx("span",{className:"panel-kicker",children:"Interview narration"}),o.jsx("h2",{children:"What to say while demoing"})]}),o.jsx("div",{className:"event-log",children:c.map((P,Y)=>o.jsx("div",{className:"event-item",children:P},`${P}-${Y}`))})]})]})]})]})}const tf=`:root {
  font-family: "Segoe UI", "Helvetica Neue", sans-serif;
  color: #f6f4ea;
  background:
    radial-gradient(circle at top left, rgba(255, 211, 148, 0.22), transparent 26%),
    radial-gradient(circle at top right, rgba(128, 197, 255, 0.18), transparent 28%),
    linear-gradient(180deg, #0e1618 0%, #111d20 100%);
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  --glass: rgba(248, 244, 232, 0.08);
  --glass-border: rgba(248, 244, 232, 0.12);
  --ink-soft: rgba(246, 244, 234, 0.72);
  --ink-muted: rgba(246, 244, 234, 0.58);
  --mint: #90d7b2;
  --amber: #f2bc63;
  --rose: #f29d8b;
  --violet: #d7b6ff;
  --sky: #92c4ff;
  --olive: #bcd497;
  --slate: #d5dde3;
  --gold: #f0d28d;
}

* {
  box-sizing: border-box;
}

html,
body,
#root {
  min-height: 100%;
  margin: 0;
}

body {
  min-height: 100vh;
}

button,
select {
  font: inherit;
}

.page-shell {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.page-noise {
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 36px 36px;
  mask-image: radial-gradient(circle at center, black, transparent 82%);
  pointer-events: none;
}

.app-shell {
  position: relative;
  z-index: 1;
  max-width: 1440px;
  margin: 0 auto;
  padding: 32px;
}

.hero-panel,
.scenario-strip,
.workspace-grid,
.bottom-grid {
  margin-bottom: 24px;
}

.hero-panel {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 24px;
  align-items: end;
}

.hero-copy h1 {
  font-size: clamp(2.6rem, 5vw, 4.75rem);
  line-height: 0.95;
  margin: 12px 0 16px;
  max-width: 10ch;
  letter-spacing: -0.06em;
}

.hero-copy p {
  max-width: 62ch;
  color: var(--ink-soft);
  font-size: 1.02rem;
  line-height: 1.7;
}

.eyebrow,
.panel-kicker {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--amber);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-size: 0.72rem;
}

.hero-stats {
  display: grid;
  gap: 14px;
}

.stat-card,
.glass-card {
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: 28px;
  backdrop-filter: blur(18px);
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.18);
}

.stat-card {
  padding: 18px 20px;
}

.stat-card span {
  display: block;
  color: var(--ink-muted);
  margin-bottom: 8px;
}

.stat-card strong {
  font-size: 1.1rem;
  font-weight: 600;
}

.scenario-strip {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.scenario-chip {
  border: 1px solid rgba(246, 244, 234, 0.14);
  border-radius: 24px;
  background: rgba(246, 244, 234, 0.04);
  color: inherit;
  text-align: left;
  padding: 16px 18px;
  cursor: pointer;
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
}

.scenario-chip:hover,
.scenario-chip.is-active {
  transform: translateY(-2px);
  background: rgba(242, 188, 99, 0.1);
  border-color: rgba(242, 188, 99, 0.45);
}

.scenario-chip span {
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
}

.scenario-chip small {
  color: var(--ink-soft);
  line-height: 1.5;
}

.workspace-grid {
  display: grid;
  grid-template-columns: 320px 1fr 360px;
  gap: 18px;
}

.bottom-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 18px;
}

.glass-card {
  padding: 24px;
}

.panel-heading {
  margin-bottom: 20px;
}

.panel-heading h2 {
  margin: 8px 0 0;
  font-size: 1.45rem;
  letter-spacing: -0.03em;
}

.field {
  display: block;
  margin-bottom: 18px;
}

.field span {
  display: block;
  margin-bottom: 8px;
  color: var(--ink-soft);
}

.field select {
  width: 100%;
  border: 1px solid rgba(246, 244, 234, 0.16);
  border-radius: 18px;
  padding: 14px 16px;
  background: rgba(8, 16, 17, 0.5);
  color: inherit;
}

.field small {
  display: block;
  margin-top: 8px;
  color: var(--ink-muted);
  line-height: 1.55;
}

.button-grid {
  display: grid;
  gap: 10px;
  margin: 22px 0 24px;
}

.button-grid button {
  border: 0;
  border-radius: 18px;
  padding: 13px 16px;
  background: linear-gradient(135deg, #f2bc63, #d89a46);
  color: #1e1d18;
  font-weight: 700;
  cursor: pointer;
  transition: transform 180ms ease, opacity 180ms ease;
}

.button-grid button:hover {
  transform: translateY(-1px);
}

.button-grid .ghost-button {
  background: rgba(246, 244, 234, 0.08);
  color: #f6f4ea;
  border: 1px solid rgba(246, 244, 234, 0.12);
}

.now-playing {
  padding: 18px;
  border-radius: 24px;
  background: rgba(246, 244, 234, 0.04);
}

.now-playing h3 {
  margin: 10px 0 8px;
  font-size: 1.35rem;
}

.now-playing p,
.insight-summary,
.sequence-step p,
.architecture-card p,
.song-row p,
.event-item {
  color: var(--ink-soft);
  line-height: 1.6;
}

.architecture-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.architecture-card {
  min-height: 184px;
  min-width: 0;
  padding: 18px;
  border-radius: 22px;
  background: rgba(246, 244, 234, 0.04);
  border: 1px solid rgba(246, 244, 234, 0.08);
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
}

.architecture-card.is-active {
  transform: translateY(-4px);
  border-color: rgba(246, 244, 234, 0.28);
  background: rgba(246, 244, 234, 0.08);
}

.architecture-card span {
  display: inline-flex;
  margin-bottom: 12px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  font-size: 0.74rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.architecture-card h3,
.song-row h3,
.sequence-step h3 {
  margin: 0 0 10px;
  font-size: 1.03rem;
}

.architecture-card h3 {
  overflow-wrap: anywhere;
  word-break: break-word;
}

.tone-mint span {
  color: var(--mint);
}

.tone-amber span {
  color: var(--amber);
}

.tone-slate span {
  color: var(--slate);
}

.tone-rose span {
  color: var(--rose);
}

.tone-violet span {
  color: var(--violet);
}

.tone-sky span {
  color: var(--sky);
}

.tone-olive span {
  color: var(--olive);
}

.tone-gold span {
  color: var(--gold);
}

.insight-list {
  display: grid;
  gap: 10px;
  margin: 18px 0 24px;
}

.insight-item,
.event-item {
  padding: 14px 16px;
  border-radius: 18px;
  background: rgba(246, 244, 234, 0.05);
  border: 1px solid rgba(246, 244, 234, 0.08);
}

.sequence-panel {
  display: grid;
  gap: 14px;
}

.sequence-step {
  display: grid;
  grid-template-columns: 36px 1fr;
  gap: 14px;
  align-items: start;
}

.sequence-index {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(242, 188, 99, 0.16);
  color: var(--amber);
  font-weight: 700;
}

.song-list,
.event-log {
  display: grid;
  gap: 12px;
}

.song-row {
  display: grid;
  grid-template-columns: 36px 1fr auto;
  gap: 16px;
  align-items: center;
  padding: 16px;
  border-radius: 22px;
  background: rgba(246, 244, 234, 0.04);
  border: 1px solid rgba(246, 244, 234, 0.08);
}

.song-row.is-current {
  border-color: rgba(144, 215, 178, 0.38);
  background: rgba(144, 215, 178, 0.1);
}

.song-index {
  color: var(--ink-muted);
  font-size: 0.9rem;
}

.song-badge {
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(246, 244, 234, 0.06);
  color: var(--ink-soft);
  font-size: 0.78rem;
}

@media (max-width: 1180px) {
  .workspace-grid,
  .bottom-grid,
  .hero-panel,
  .scenario-strip {
    grid-template-columns: 1fr;
  }

  .architecture-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .app-shell {
    padding: 20px;
  }

  .glass-card,
  .stat-card {
    border-radius: 22px;
  }

  .architecture-grid {
    grid-template-columns: 1fr;
  }

  .song-row {
    grid-template-columns: 1fr;
  }
}
`,rf=3,lf={key:"",value:"",ttlSeconds:""},ra={interviewWarmup:[{type:"set",key:"1",value:"Alice"},{type:"set",key:"2",value:"Bob"},{type:"set",key:"3",value:"Charlie"},{type:"get",key:"1"},{type:"set",key:"4",value:"Dave"}],ttlRace:[{type:"set",key:"session",value:"token-17",ttlSeconds:6},{type:"set",key:"profile",value:"cached-user"},{type:"get",key:"session"}]};function Jl(){return{store:{},lru:[],logs:[{id:1,kind:"system",title:"Playground ready",detail:"The store starts empty. Every operation will update state, recency ordering, and interview notes.",timestamp:Date.now()}],coachMessage:"This playground mirrors your Java LLD: `KVStore` owns the map, `LRU` tracks recency, and `TTLManager` expires keys asynchronously.",lastAction:null,nextLogId:2}}function Ut(e){return new Intl.DateTimeFormat("en-IN",{hour:"2-digit",minute:"2-digit",second:"2-digit"}).format(e)}function sf(e,n){if(!e.expiresAt)return{label:"Persistent",tone:"neutral"};const t=e.expiresAt-n;return t<=0?{label:"Expired",tone:"danger"}:t<=3e3?{label:`${(t/1e3).toFixed(1)}s left`,tone:"warning"}:{label:`${Math.ceil(t/1e3)}s TTL`,tone:"success"}}function lr(e,n,t){return e?e.kind==="set"&&e.evictedKey?`Setting "${e.key}" hit capacity, so the least recently used key "${e.evictedKey}" was evicted. This is exactly why the LRU policy exists separately from the store map.`:e.kind==="set"&&e.ttlSeconds?`Key "${e.key}" carries a TTL of ${e.ttlSeconds}s. The entry still lives inside the map, but a background expiry tracker now watches its deadline without slowing down normal reads.`:e.kind==="get-hit"?`Reading "${e.key}" was a cache hit, so it moved to the front of the LRU list. In interviews, this is the moment to explain why \`get\` must also mutate recency metadata.`:e.kind==="get-miss"?`Reading "${e.key}" missed. The store map gives constant-time lookup, while the policy layer stays untouched because there was no live entry to re-rank.`:e.kind==="expired"?`The TTL manager expired "${e.key}" in the background at ${Ut(t)}. That separation keeps expiry concerns isolated instead of scattering time checks across every code path.`:e.kind==="delete"?`Deleting "${e.key}" removes it from both the main store and the LRU structure. This is a good interview cue to talk about keeping all auxiliary indexes consistent.`:"Each operation should be explainable in terms of responsibilities: the map stores data, LRU controls eviction order, and TTL handles lifecycle.":Jl().coachMessage}function sr(e,n){return{...e,logs:[{...n,id:e.nextLogId},...e.logs].slice(0,10),nextLogId:e.nextLogId+1}}function of(e,n){const t={...e.store};let r=[...e.lru],i=null;!t[n.key]&&Object.keys(t).length>=n.capacity&&(i=r[r.length-1]??null,i&&(delete t[i],r=r.filter(a=>a!==i))),t[n.key]={value:n.value,createdAt:n.now,expiresAt:n.ttlSeconds?n.now+n.ttlSeconds*1e3:null},r=[n.key,...r.filter(a=>a!==n.key)];const l={kind:"set",key:n.key,ttlSeconds:n.ttlSeconds,evictedKey:i};let s={...e,store:t,lru:r,lastAction:l};return s=sr(s,{kind:i?"eviction":"write",title:i?`SET ${n.key} triggered eviction`:`SET ${n.key}`,detail:i?`Inserted "${n.key}" and evicted least recently used key "${i}".`:`Inserted or updated "${n.key}"${n.ttlSeconds?` with TTL ${n.ttlSeconds}s.`:"."}`,timestamp:n.now}),s.coachMessage=lr(l,s,n.now),s}function af(e,n){const t=e.store[n.key];if(!t){const l={kind:"get-miss",key:n.key};let s={...e,lastAction:l};return s=sr(s,{kind:"miss",title:`GET ${n.key} missed`,detail:`No live entry was found for "${n.key}".`,timestamp:n.now}),s.coachMessage=lr(l,s,n.now),s}if(t.expiresAt&&t.expiresAt<=n.now)return vc(e,n.now,[n.key]);const r={kind:"get-hit",key:n.key};let i={...e,lru:[n.key,...e.lru.filter(l=>l!==n.key)],lastAction:r};return i=sr(i,{kind:"read",title:`GET ${n.key} hit`,detail:`Returned "${t.value}" and promoted "${n.key}" to most recently used.`,timestamp:n.now}),i.coachMessage=lr(r,i,n.now),i}function uf(e,n){if(!e.store[n.key])return e;const t={...e.store};delete t[n.key];const r={kind:"delete",key:n.key};let i={...e,store:t,lru:e.lru.filter(l=>l!==n.key),lastAction:r};return i=sr(i,{kind:"delete",title:`DELETE ${n.key}`,detail:`Removed "${n.key}" from the store and policy metadata.`,timestamp:n.now}),i.coachMessage=lr(r,i,n.now),i}function vc(e,n,t){const r=t??Object.entries(e.store).filter(([,l])=>l.expiresAt&&l.expiresAt<=n).map(([l])=>l);if(!r.length)return e;let i={...e};return r.forEach(l=>{if(!i.store[l])return;const s={...i.store};delete s[l],i={...i,store:s,lru:i.lru.filter(a=>a!==l),lastAction:{kind:"expired",key:l}},i=sr(i,{kind:"ttl",title:`TTL expired for ${l}`,detail:`Background expiry removed "${l}" after its deadline elapsed.`,timestamp:n})}),i.coachMessage=lr(i.lastAction,i,n),i}function cf(e,n,t,r){const i=e.trim().toLowerCase();if(!i)return"Ask something like: why was a key evicted, why TTL is separate, or how `get` affects LRU.";if(i.includes("why")&&i.includes("evict")){const s=n.logs.find(a=>a.kind==="eviction");return s?`${s.detail} Capacity is ${t}, so once the map is full the LRU tail becomes the victim.`:"Nothing has been evicted yet. Eviction only happens when a new key arrives after the store reaches capacity."}if(i.includes("ttl")){const s=Object.entries(n.store).filter(([,a])=>a.expiresAt);return s.length?`TTL is modeled outside the core map so reads stay fast. Right now ${s.length} live key(s) have expiry deadlines, and the background manager watches those timestamps.`:"TTL is separate so expiry logic does not complicate every store operation. At the moment, no active key has a TTL."}if(i.includes("get")&&i.includes("lru"))return n.lru.length?`A successful GET promotes that key to the front of the LRU list. Current MRU to LRU order is ${n.lru.join(" -> ")}.`:"The LRU list is empty right now, so there is nothing to reorder yet.";if(i.includes("design")||i.includes("why"))return"The design is split on purpose: the map gives O(1) access, the eviction policy owns ordering concerns, and TTL management stays asynchronous so lifecycle logic does not pollute the main API.";const l=Object.keys(n.store);return l.length?`The store currently holds ${l.length}/${t} keys: ${l.join(", ")}. The latest system event happened at ${Ut(r)}.`:"The store is empty right now. Try a few SET operations and then ask again for a more specific explanation."}function df(){const[e,n]=b.useState(Jl),[t,r]=b.useState(rf),[i,l]=b.useState(lf),[s,a]=b.useState(Date.now()),[u,p]=b.useState(""),[h,g]=b.useState("I can explain the current state in interview terms. Ask about eviction, TTL, recency, or design tradeoffs."),m=b.useRef(null);b.useEffect(()=>{const d=window.setInterval(()=>{const c=Date.now();a(c),n(f=>vc(f,c))},250);return()=>{window.clearInterval(d),m.current&&window.clearTimeout(m.current)}},[]);function x(d){const c=Date.now();a(c),n(f=>d.type==="set"?of(f,{...d,now:c,capacity:t}):d.type==="get"?af(f,{...d,now:c}):d.type==="delete"?uf(f,{...d,now:c}):f)}function w(d){d.preventDefault(),i.key.trim()&&(x({type:"set",key:i.key.trim(),value:i.value.trim()||"value",ttlSeconds:i.ttlSeconds?Number(i.ttlSeconds):void 0}),l(c=>({...c,key:"",value:"",ttlSeconds:""})))}function k(d){m.current&&window.clearTimeout(m.current),d.forEach((c,f)=>{m.current=window.setTimeout(()=>x(c),f*900)})}const D=Object.entries(e.store);return o.jsxs("div",{className:"app-shell",children:[o.jsx("div",{className:"background-orb background-orb-left"}),o.jsx("div",{className:"background-orb background-orb-right"}),o.jsxs("header",{className:"hero",children:[o.jsxs("div",{className:"hero-copy",children:[o.jsx("p",{className:"eyebrow",children:"LLD Visual Playground"}),o.jsx("h1",{children:"Understand your in-memory key value store like an interviewer would."}),o.jsx("p",{className:"hero-text",children:"This React playground turns your Java LLD into a live visual system: mutate the store, watch recency shift, see TTLs expire, and get contextual AI-style explanations for every design choice."}),o.jsxs("div",{className:"hero-actions",children:[o.jsx("button",{onClick:()=>k(ra.interviewWarmup),children:"Run LRU interview flow"}),o.jsx("button",{className:"secondary",onClick:()=>k(ra.ttlRace),children:"Run TTL flow"}),o.jsx("button",{className:"ghost",onClick:()=>{n(Jl()),g("I can explain the current state in interview terms. Ask about eviction, TTL, recency, or design tradeoffs.")},children:"Reset playground"})]})]}),o.jsxs("div",{className:"hero-panel glass-card",children:[o.jsx("div",{className:"panel-label",children:"AI Interview Coach"}),o.jsx("p",{children:e.coachMessage}),o.jsxs("div",{className:"metric-grid",children:[o.jsxs("div",{children:[o.jsx("span",{children:"Capacity"}),o.jsx("strong",{children:t})]}),o.jsxs("div",{children:[o.jsx("span",{children:"Live Keys"}),o.jsx("strong",{children:D.length})]}),o.jsxs("div",{children:[o.jsx("span",{children:"Clock"}),o.jsx("strong",{children:Ut(s)})]})]})]})]}),o.jsxs("main",{className:"dashboard",children:[o.jsxs("section",{className:"glass-card controls-card",children:[o.jsxs("div",{className:"section-heading",children:[o.jsxs("div",{children:[o.jsx("p",{className:"section-kicker",children:"Operate the store"}),o.jsx("h2",{children:"Drive the system live"})]}),o.jsxs("label",{className:"capacity-input",children:[o.jsx("span",{children:"Capacity"}),o.jsx("input",{type:"number",min:"1",value:t,onChange:d=>r(Math.max(1,Number(d.target.value)||1))})]})]}),o.jsxs("form",{className:"operation-form",onSubmit:w,children:[o.jsx("input",{placeholder:"Key",value:i.key,onChange:d=>l({...i,key:d.target.value})}),o.jsx("input",{placeholder:"Value",value:i.value,onChange:d=>l({...i,value:d.target.value})}),o.jsx("input",{placeholder:"TTL seconds",type:"number",min:"0",value:i.ttlSeconds,onChange:d=>l({...i,ttlSeconds:d.target.value})}),o.jsx("button",{type:"submit",children:"SET"})]}),o.jsxs("div",{className:"quick-actions",children:[o.jsx("button",{className:"secondary",onClick:()=>x({type:"get",key:i.key||"1"}),children:"GET current key"}),o.jsx("button",{className:"secondary",onClick:()=>x({type:"delete",key:i.key||"1"}),children:"DELETE current key"})]})]}),o.jsxs("section",{className:"visual-grid",children:[o.jsxs("div",{className:"glass-card",children:[o.jsx("div",{className:"section-heading",children:o.jsxs("div",{children:[o.jsx("p",{className:"section-kicker",children:"Store map"}),o.jsx("h2",{children:"Live entries"})]})}),o.jsx("div",{className:"entries-grid",children:D.length?D.map(([d,c])=>{const f=sf(c,s);return o.jsxs("article",{className:"entry-card",children:[o.jsxs("div",{className:"entry-head",children:[o.jsx("strong",{children:d}),o.jsx("span",{className:`status-pill ${f.tone}`,children:f.label})]}),o.jsx("p",{children:c.value}),o.jsxs("small",{children:["Created ",Ut(c.createdAt)]})]},d)}):o.jsx("div",{className:"empty-state",children:"No keys yet. Start with a SET operation."})})]}),o.jsxs("div",{className:"glass-card",children:[o.jsx("div",{className:"section-heading",children:o.jsxs("div",{children:[o.jsx("p",{className:"section-kicker",children:"Eviction policy"}),o.jsx("h2",{children:"LRU order"})]})}),o.jsxs("div",{className:"lru-track",children:[o.jsx("span",{className:"anchor",children:"MRU"}),e.lru.length?e.lru.map((d,c)=>o.jsxs("div",{className:"lru-node",children:[o.jsx("strong",{children:d}),o.jsx("small",{children:c===0?"Freshly used":"Older"})]},d)):o.jsx("div",{className:"empty-state",children:"The recency list will build as soon as keys are inserted."}),o.jsx("span",{className:"anchor anchor-right",children:"LRU"})]})]})]}),o.jsxs("section",{className:"story-grid",children:[o.jsxs("div",{className:"glass-card",children:[o.jsx("div",{className:"section-heading",children:o.jsxs("div",{children:[o.jsx("p",{className:"section-kicker",children:"Architecture lens"}),o.jsx("h2",{children:"Why this design works"})]})}),o.jsxs("div",{className:"architecture-cards",children:[o.jsxs("article",{children:[o.jsx("span",{children:"KVStore"}),o.jsx("p",{children:"Owns the hash map and exposes the API surface for reads, writes, and deletes."})]}),o.jsxs("article",{children:[o.jsx("span",{children:"LRU Policy"}),o.jsx("p",{children:"Tracks recency separately so eviction remains swappable and focused on ordering."})]}),o.jsxs("article",{children:[o.jsx("span",{children:"TTL Manager"}),o.jsx("p",{children:"Expires keys asynchronously, which keeps normal operations simpler and interview-friendly."})]})]})]}),o.jsxs("div",{className:"glass-card",children:[o.jsx("div",{className:"section-heading",children:o.jsxs("div",{children:[o.jsx("p",{className:"section-kicker",children:"Ask the system"}),o.jsx("h2",{children:"Interactive AI notes"})]})}),o.jsxs("div",{className:"qa-box",children:[o.jsx("input",{placeholder:"Why was a key evicted?",value:u,onChange:d=>p(d.target.value)}),o.jsx("button",{onClick:()=>g(cf(u,e,t,s)),children:"Explain"})]}),o.jsx("p",{className:"answer-box",children:h})]})]}),o.jsxs("section",{className:"glass-card",children:[o.jsx("div",{className:"section-heading",children:o.jsxs("div",{children:[o.jsx("p",{className:"section-kicker",children:"Execution timeline"}),o.jsx("h2",{children:"What just happened"})]})}),o.jsx("div",{className:"timeline",children:e.logs.map(d=>o.jsxs("article",{className:`timeline-item timeline-${d.kind}`,children:[o.jsxs("div",{children:[o.jsx("strong",{children:d.title}),o.jsx("p",{children:d.detail})]}),o.jsx("span",{children:Ut(d.timestamp)})]},d.id))})]})]})]})}const pf=`:root {
  color-scheme: dark;
  --bg: #08131f;
  --bg-soft: #102234;
  --card: rgba(8, 19, 31, 0.68);
  --card-border: rgba(164, 212, 255, 0.16);
  --text: #ebf5ff;
  --muted: #93acc3;
  --accent: #7cf2c3;
  --accent-strong: #46d29f;
  --warning: #ffd166;
  --danger: #ff7b7b;
  --shadow: 0 30px 80px rgba(0, 0, 0, 0.34);
}

* {
  box-sizing: border-box;
}

html,
body,
#root {
  margin: 0;
  min-height: 100%;
}

body {
  font-family: "Space Grotesk", sans-serif;
  background:
    radial-gradient(circle at top left, rgba(124, 242, 195, 0.18), transparent 32%),
    radial-gradient(circle at 85% 10%, rgba(84, 164, 255, 0.22), transparent 28%),
    linear-gradient(135deg, #07111b, #102031 48%, #091520);
  color: var(--text);
}

button,
input {
  font: inherit;
}

.app-shell {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  padding: 40px 24px 56px;
}

.background-orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(70px);
  opacity: 0.28;
  pointer-events: none;
}

.background-orb-left {
  width: 220px;
  height: 220px;
  background: #7cf2c3;
  top: 120px;
  left: -60px;
}

.background-orb-right {
  width: 280px;
  height: 280px;
  background: #72b4ff;
  top: 40px;
  right: -100px;
}

.hero,
.dashboard {
  position: relative;
  z-index: 1;
  max-width: 1240px;
  margin: 0 auto;
}

.hero {
  display: grid;
  grid-template-columns: 1.25fr 0.85fr;
  gap: 24px;
  align-items: stretch;
  margin-bottom: 24px;
}

.eyebrow,
.section-kicker,
.panel-label {
  font-family: "IBM Plex Mono", monospace;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.76rem;
  color: var(--accent);
  margin: 0 0 10px;
}

.hero h1,
.section-heading h2 {
  margin: 0;
  line-height: 0.98;
}

.hero h1 {
  font-size: clamp(2.8rem, 6vw, 5.4rem);
  max-width: 11ch;
}

.hero-text {
  color: var(--muted);
  max-width: 58ch;
  font-size: 1.05rem;
  line-height: 1.7;
  margin: 18px 0 0;
}

.hero-actions,
.quick-actions,
.qa-box,
.operation-form,
.metric-grid,
.section-heading,
.visual-grid,
.story-grid {
  display: flex;
  gap: 12px;
}

.hero-actions {
  flex-wrap: wrap;
  margin-top: 24px;
}

button {
  border: 0;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--accent), var(--accent-strong));
  color: #062032;
  padding: 12px 18px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 180ms ease, box-shadow 180ms ease, opacity 180ms ease;
  box-shadow: 0 12px 28px rgba(70, 210, 159, 0.24);
}

button:hover {
  transform: translateY(-1px);
}

button.secondary {
  background: rgba(164, 212, 255, 0.1);
  color: var(--text);
  box-shadow: none;
}

button.ghost {
  background: transparent;
  color: var(--muted);
  box-shadow: none;
  border: 1px solid rgba(164, 212, 255, 0.18);
}

.glass-card {
  background: var(--card);
  border: 1px solid var(--card-border);
  backdrop-filter: blur(18px);
  border-radius: 28px;
  box-shadow: var(--shadow);
  padding: 24px;
}

.hero-panel p {
  margin: 12px 0 18px;
  color: var(--text);
  line-height: 1.7;
}

.metric-grid {
  flex-wrap: wrap;
}

.metric-grid > div {
  min-width: 110px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 18px;
  padding: 14px;
}

.metric-grid span,
.capacity-input span,
.entry-card small,
.anchor,
.timeline-item span {
  color: var(--muted);
}

.metric-grid strong {
  display: block;
  margin-top: 8px;
  font-size: 1.2rem;
}

.dashboard {
  display: grid;
  gap: 20px;
}

.controls-card,
.glass-card {
  animation: fadeUp 550ms ease both;
}

.section-heading {
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.capacity-input {
  display: grid;
  gap: 8px;
}

.capacity-input input {
  width: 84px;
}

.operation-form {
  flex-wrap: wrap;
  margin-bottom: 14px;
}

input {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text);
  border: 1px solid rgba(164, 212, 255, 0.12);
  border-radius: 16px;
  padding: 12px 14px;
  min-width: 0;
  flex: 1 1 180px;
}

input::placeholder {
  color: #67829b;
}

.visual-grid,
.story-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.entries-grid,
.architecture-cards,
.timeline {
  display: grid;
  gap: 14px;
}

.entry-card,
.architecture-cards article,
.timeline-item {
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 16px;
}

.entry-head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  margin-bottom: 16px;
}

.entry-card p,
.architecture-cards p,
.timeline-item p,
.answer-box {
  margin: 0;
  line-height: 1.65;
  color: var(--muted);
}

.status-pill {
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 0.76rem;
  font-family: "IBM Plex Mono", monospace;
}

.status-pill.neutral {
  background: rgba(164, 212, 255, 0.14);
  color: #cae5ff;
}

.status-pill.success {
  background: rgba(124, 242, 195, 0.14);
  color: #bff8e0;
}

.status-pill.warning {
  background: rgba(255, 209, 102, 0.16);
  color: #ffe8a8;
}

.status-pill.danger {
  background: rgba(255, 123, 123, 0.16);
  color: #ffc3c3;
}

.lru-track {
  display: flex;
  align-items: center;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 6px;
}

.lru-node {
  min-width: 130px;
  padding: 18px;
  border-radius: 22px;
  background: linear-gradient(145deg, rgba(124, 242, 195, 0.12), rgba(114, 180, 255, 0.1));
  border: 1px solid rgba(124, 242, 195, 0.2);
}

.anchor {
  font-family: "IBM Plex Mono", monospace;
  white-space: nowrap;
}

.anchor-right {
  margin-left: auto;
}

.architecture-cards {
  grid-template-columns: repeat(3, 1fr);
}

.architecture-cards article span {
  display: inline-block;
  margin-bottom: 12px;
  font-weight: 700;
}

.qa-box {
  margin-bottom: 14px;
}

.qa-box input {
  flex: 1;
}

.answer-box {
  min-height: 92px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 20px;
  padding: 16px;
}

.timeline-item {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: flex-start;
}

.timeline-eviction {
  border-color: rgba(255, 209, 102, 0.24);
}

.timeline-ttl {
  border-color: rgba(255, 123, 123, 0.24);
}

.empty-state {
  border-radius: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.03);
  color: var(--muted);
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 980px) {
  .hero,
  .visual-grid,
  .story-grid,
  .architecture-cards {
    grid-template-columns: 1fr;
  }

  .hero h1 {
    max-width: 100%;
  }
}

@media (max-width: 640px) {
  .app-shell {
    padding: 20px 14px 32px;
  }

  .glass-card {
    border-radius: 22px;
    padding: 18px;
  }

  .timeline-item,
  .entry-head,
  .section-heading {
    flex-direction: column;
    align-items: flex-start;
  }

  .hero-text {
    font-size: 0.98rem;
  }
}
`,ff=[{id:"basic",label:"Basic Design",accent:"var(--accent-basic)",headline:"Single queue per topic, manual consumption, easiest to explain.",why:"Best when the interviewer wants foundations first: topic, producer, consumer, and offsets without concurrency distractions.",strengths:["Simple mental model","Manual offset control","Easy debugging"],tradeoffs:["No parallel consumption","Manual pull only","Throughput limited by single-threaded flow"]},{id:"threaded",label:"Multithreaded Design",accent:"var(--accent-threaded)",headline:"Consumers become long-running workers that poll in parallel.",why:"Use this when the interview shifts from correctness to concurrency and background processing.",strengths:["Continuous polling","Better responsiveness","Independent consumer threads"],tradeoffs:["Polling overhead","Thread lifecycle management","Harder debugging than the basic version"]},{id:"partitioned",label:"Partitioned Design",accent:"var(--accent-partitioned)",headline:"Topics are split into partitions for scale and ordered sub-streams.",why:"Choose this when scale, parallelism, and per-partition ordering become the key design discussion.",strengths:["Higher throughput","Partition-level ordering","Scalable consumer progress tracking"],tradeoffs:["More moving parts","Partition balancing matters","Offsets now exist per partition"]}],ft=["Football finals tonight","New smartphone released","Olympics update from Paris","Festival holiday announced","Science breakthrough reported","Streaming show renewed"],qe=e=>JSON.parse(JSON.stringify(e)),Oe=(e,n,t,r)=>(e.unshift({tick:n,type:t,text:r}),e.slice(0,10)),hf=(e,n,t)=>{const r=n.toLowerCase();return r.includes("why")?`${e.label} exists because ${e.why.toLowerCase()}`:r.includes("partition")?e.id!=="partitioned"?"Partitioning is absent here on purpose. This version teaches the system before we add throughput scaling.":`Messages are assigned round-robin across ${t.topics[0].partitions.length} partitions, so each partition keeps its own ordered lane and offset.`:r.includes("thread")?e.id==="basic"?"The basic design avoids background threads so the queue mechanics stay easy to reason about.":"Threads matter here because consumers poll independently every tick, which makes processing feel continuous instead of manually triggered.":r.includes("offset")?e.id==="partitioned"?"Offsets are tracked per partition, so a consumer can be caught up on partition 0 but still behind on partition 2.":"Offsets are tracked per topic, which makes progress easy to explain but limits scaling flexibility.":"Interview framing: start with this design, explain the bottleneck you hit next, then justify the move to the next design using throughput, concurrency, and observability."},yc=()=>({tick:0,producerCursor:0,topics:[{name:"Sports",messages:[{id:1,content:"Football match tonight!",producer:"Producer1"}]},{name:"Technology",messages:[{id:2,content:"New smartphone released!",producer:"Producer2"}]}],consumers:[{id:"Consumer1",subscriptions:["Sports","Technology"],offsets:{Sports:0,Technology:0},lastConsumed:null},{id:"Consumer2",subscriptions:["Sports","Technology"],offsets:{Sports:0,Technology:0},lastConsumed:null}],timeline:[{tick:0,type:"system",text:"Basic design starts with manual publish and manual consume calls."}],coachPrompt:"Why does this design exist?",coachReply:"Basic Design exists because it introduces topics, subscriptions, and offsets without concurrency getting in the way."}),xc=()=>({tick:0,producerCursor:0,running:!1,topics:[{name:"Sports",messages:[{id:1,content:"India wins the T20 world cup",producer:"Producer1"}]},{name:"Television",messages:[]},{name:"Festival",messages:[]}],consumers:[{id:"Consumer1",thread:"Consumer1-Thread",subscriptions:["Sports","Television"],offsets:{Sports:0,Television:0},lastConsumed:null,active:!0},{id:"Consumer2",thread:"Consumer2-Thread",subscriptions:["Sports","Festival"],offsets:{Sports:0,Festival:0},lastConsumed:null,active:!0}],timeline:[{tick:0,type:"system",text:"Consumer threads are alive and polling subscribed topics every tick."}],coachPrompt:"How do threads help here?",coachReply:"Threads turn consumers into continuously polling workers, so messages are picked up without manual consume calls."}),wc=()=>({tick:0,producerCursor:0,running:!1,topics:[{name:"Science",roundRobinIndex:0,partitions:[[{id:1,content:"New Discovery 1",producer:"Producer-1"}],[{id:2,content:"New Discovery 2",producer:"Producer-1"}],[{id:3,content:"New Discovery 3",producer:"Producer-1"}]]},{name:"History",roundRobinIndex:0,partitions:[[{id:4,content:"New Event 1",producer:"Producer-2"}],[{id:5,content:"New Event 2",producer:"Producer-2"}]]}],consumers:[{id:"Consumer-1",thread:"ConsumerThread-1",subscriptions:["Science"],offsets:{Science:[0,0,0]},lastConsumed:null,active:!0},{id:"Consumer-2",thread:"ConsumerThread-2",subscriptions:["History"],offsets:{History:[0,0]},lastConsumed:null,active:!0}],timeline:[{tick:0,type:"system",text:"Each topic owns multiple partitions, and every consumer tracks offsets per partition."}],coachPrompt:"Why partition at all?",coachReply:"Partitioning increases throughput while preserving ordering inside each partition, which is the usual interview pivot from simple pub-sub to scalable queues."}),mf=()=>({selectedDesign:"basic",designs:ff,simulations:{basic:yc(),threaded:xc(),partitioned:wc()}}),gf=(e,n)=>{const t=qe(e),r=t.topics.find(s=>s.name===n),i=ft[t.producerCursor%ft.length],l=t.producerCursor%2===0?"Producer1":"Producer2";return r.messages.push({id:Date.now(),content:i,producer:l}),t.producerCursor+=1,t.tick+=1,t.timeline=Oe(t.timeline,t.tick,"publish",`${l} published "${i}" to ${r.name}.`),t},vf=(e,n,t)=>{const r=qe(e),i=r.consumers.find(u=>u.id===n),l=r.topics.find(u=>u.name===t),s=i.offsets[t];if(r.tick+=1,s>=l.messages.length)return r.timeline=Oe(r.timeline,r.tick,"idle",`${i.id} found no new messages on ${t}.`),r;const a=l.messages[s];return i.offsets[t]+=1,i.lastConsumed=`${t} -> ${a.content}`,r.timeline=Oe(r.timeline,r.tick,"consume",`${i.id} manually consumed "${a.content}" from ${t}.`),r},yf=(e,n)=>{const t=qe(e),r=t.topics.find(s=>s.name===n),i=ft[t.producerCursor%ft.length],l=t.producerCursor%2===0?"Producer1":"Producer2";return r.messages.push({id:Date.now(),content:i,producer:l}),t.producerCursor+=1,t.tick+=1,t.timeline=Oe(t.timeline,t.tick,"publish",`${l} pushed "${i}" into ${r.name}; worker threads will poll it on the next tick.`),t},xf=e=>{const n=qe(e);n.tick+=1;let t=0;return n.consumers.forEach(r=>{r.active&&r.subscriptions.forEach(i=>{const l=n.topics.find(u=>u.name===i),s=r.offsets[i],a=l.messages[s];a&&(r.offsets[i]+=1,r.lastConsumed=`${i} -> ${a.content}`,t+=1,n.timeline=Oe(n.timeline,n.tick,"consume",`${r.thread} consumed "${a.content}" from ${i}.`))})}),t||(n.timeline=Oe(n.timeline,n.tick,"idle","Consumer threads polled, but no new messages were available.")),n},wf=(e,n)=>{const t=qe(e),r=t.consumers.find(i=>i.id===n);return r.active=!r.active,t.tick+=1,t.timeline=Oe(t.timeline,t.tick,r.active?"system":"warning",`${r.thread} is now ${r.active?"running":"stopped"}.`),t},kf=(e,n)=>{const t=qe(e),r=t.topics.find(a=>a.name===n),i=r.roundRobinIndex%r.partitions.length,l=ft[t.producerCursor%ft.length],s=t.producerCursor%2===0?"Producer-1":"Producer-2";return r.partitions[i].push({id:Date.now(),content:l,producer:s}),r.roundRobinIndex+=1,t.producerCursor+=1,t.tick+=1,t.timeline=Oe(t.timeline,t.tick,"publish",`${s} routed "${l}" to ${r.name} partition ${i}.`),t},Sf=e=>{const n=qe(e);n.tick+=1;let t=0;return n.consumers.forEach(r=>{r.active&&r.subscriptions.forEach(i=>{const l=n.topics.find(a=>a.name===i),s=r.offsets[i];l.partitions.forEach((a,u)=>{const p=s[u],h=a[p];h&&(s[u]+=1,r.lastConsumed=`${i} / partition ${u} -> ${h.content}`,t+=1,n.timeline=Oe(n.timeline,n.tick,"consume",`${r.thread} consumed partition ${u} of ${i}: "${h.content}".`))})})}),t||(n.timeline=Oe(n.timeline,n.tick,"idle","Partition consumers scanned all partitions and found no pending messages.")),n},jf=(e,n)=>{const t=qe(e),r=t.consumers.find(i=>i.id===n);return r.active=!r.active,t.tick+=1,t.timeline=Oe(t.timeline,t.tick,r.active?"system":"warning",`${r.thread} is now ${r.active?"running":"stopped"}.`),t},Nf=(e,n)=>{const t=qe(e);switch(n.type){case"select-design":return t.selectedDesign=n.designId,t;case"reset-design":return t.simulations[n.designId]=n.designId==="basic"?yc():n.designId==="threaded"?xc():wc(),t;case"publish":return n.designId==="basic"?t.simulations.basic=gf(t.simulations.basic,n.topicName):n.designId==="threaded"?t.simulations.threaded=yf(t.simulations.threaded,n.topicName):t.simulations.partitioned=kf(t.simulations.partitioned,n.topicName),t;case"consume-basic":return t.simulations.basic=vf(t.simulations.basic,n.consumerId,n.topicName),t;case"tick":return n.designId==="threaded"?t.simulations.threaded=xf(t.simulations.threaded):n.designId==="partitioned"&&(t.simulations.partitioned=Sf(t.simulations.partitioned)),t;case"toggle-thread":return n.designId==="threaded"?t.simulations.threaded=wf(t.simulations.threaded,n.consumerId):t.simulations.partitioned=jf(t.simulations.partitioned,n.consumerId),t;case"toggle-running":return t.simulations[n.designId].running=!t.simulations[n.designId].running,t;case"coach":return t.simulations[n.designId].coachPrompt=n.prompt,t.simulations[n.designId].coachReply=hf(t.designs.find(r=>r.id===n.designId),n.prompt,t.simulations[n.designId]),t;default:return e}},Cf={basic:["Manual consume shows exactly how offsets move one message at a time.","Each topic is just an ordered list, so the architecture is very teachable.","The bottleneck appears fast: nobody processes unless consume is called."],threaded:["Polling workers remove manual consumption and make the queue feel alive.","Different consumers can subscribe to different topics without blocking each other.","The tradeoff is operational complexity: thread state, sleep loops, and idle polls."],partitioned:["Round-robin publishing spreads load across partitions for higher throughput.","Offsets are now arrays per topic because progress exists per partition.","This is the interview leap from functional queue to scalable distributed design."]};function Ef(){const[e,n]=b.useReducer(Nf,void 0,mf),t=e.designs.find(l=>l.id===e.selectedDesign),r=e.simulations[e.selectedDesign];b.useEffect(()=>{if(e.selectedDesign==="basic"||!r.running)return;const l=window.setInterval(()=>{n({type:"tick",designId:e.selectedDesign})},1400);return()=>window.clearInterval(l)},[r.running,e.selectedDesign]);const i=b.useMemo(()=>{if(e.selectedDesign==="partitioned"){const u=r.topics.reduce((h,g)=>h+g.partitions.reduce((m,x)=>m+x.length,0),0),p=r.consumers.reduce((h,g)=>h+Object.values(g.offsets).reduce((m,x)=>m+x.reduce((w,k)=>w+k,0),0),0);return[{label:"Topics",value:r.topics.length},{label:"Partitions",value:r.topics.reduce((h,g)=>h+g.partitions.length,0)},{label:"Messages",value:u},{label:"Offsets Advanced",value:p}]}const l=r.topics.reduce((u,p)=>u+p.messages.length,0),s=r.consumers.reduce((u,p)=>u+Object.values(p.offsets).reduce((h,g)=>h+g,0),0),a=e.selectedDesign==="threaded"?r.consumers.filter(u=>u.active).length:r.consumers.length;return[{label:"Topics",value:r.topics.length},{label:e.selectedDesign==="threaded"?"Active Threads":"Consumers",value:a},{label:"Messages",value:l},{label:"Offsets Advanced",value:s}]},[r,e.selectedDesign]);return o.jsxs("div",{className:"app-shell",children:[o.jsx("div",{className:"background-grid"}),o.jsxs("main",{className:"layout",children:[o.jsxs("section",{className:"hero",children:[o.jsxs("div",{className:"hero-copy",children:[o.jsx("span",{className:"eyebrow",children:"Distributed Message Queue Playground"}),o.jsx("h1",{children:"See why the design evolves, not just how it is coded."}),o.jsx("p",{children:"This React playground turns your three Java implementations into an interview-ready visual story: foundations first, then threads, then partitioned scale."})]}),o.jsxs("div",{className:"hero-panel glass",children:[o.jsx("div",{className:"mini-title",children:"Interview Progression"}),o.jsx("div",{className:"progress-rail",children:e.designs.map((l,s)=>o.jsxs("button",{className:`progress-node ${l.id===e.selectedDesign?"is-active":""}`,onClick:()=>n({type:"select-design",designId:l.id}),style:{"--node-accent":l.accent},children:[o.jsx("span",{children:`0${s+1}`}),o.jsx("strong",{children:l.label})]},l.id))})]})]}),o.jsx("section",{className:"design-switcher",children:e.designs.map(l=>o.jsxs("button",{className:`design-card glass ${l.id===e.selectedDesign?"selected":""}`,onClick:()=>n({type:"select-design",designId:l.id}),style:{"--card-accent":l.accent},children:[o.jsx("span",{className:"card-tag",children:l.label}),o.jsx("h2",{children:l.headline}),o.jsx("p",{children:l.why})]},l.id))}),o.jsxs("section",{className:"main-grid",children:[o.jsxs("div",{className:"left-column",children:[o.jsxs("article",{className:"glass showcase",children:[o.jsxs("div",{className:"section-heading",children:[o.jsxs("div",{children:[o.jsx("span",{className:"eyebrow",children:"Visual Playground"}),o.jsx("h3",{children:t.label})]}),o.jsxs("div",{className:"button-row",children:[o.jsx("button",{className:"secondary-btn",onClick:()=>n({type:"reset-design",designId:t.id}),children:"Reset"}),t.id!=="basic"&&o.jsx("button",{className:"primary-btn",onClick:()=>n({type:"toggle-running",designId:t.id}),children:r.running?"Pause Auto Tick":"Start Auto Tick"})]})]}),o.jsx("div",{className:"metric-row",children:i.map(l=>o.jsxs("div",{className:"metric-card",children:[o.jsx("span",{children:l.label}),o.jsx("strong",{children:l.value})]},l.label))}),o.jsxs("div",{className:"controls-panel",children:[o.jsxs("div",{children:[o.jsx("span",{className:"mini-title",children:"Publish Demo Messages"}),o.jsxs("div",{className:"button-row wrap",children:[r.topics.map(l=>o.jsxs("button",{className:"pill-btn",onClick:()=>n({type:"publish",designId:t.id,topicName:l.name}),children:["Publish to ",l.name]},l.name)),t.id!=="basic"&&o.jsx("button",{className:"pill-btn accent",onClick:()=>n({type:"tick",designId:t.id}),children:"Run One Tick"})]})]}),t.id==="basic"&&o.jsxs("div",{children:[o.jsx("span",{className:"mini-title",children:"Manual Consumption"}),o.jsx("div",{className:"button-row wrap",children:r.consumers.flatMap(l=>l.subscriptions.map(s=>o.jsxs("button",{className:"pill-btn",onClick:()=>n({type:"consume-basic",consumerId:l.id,topicName:s}),children:[l.id," consume ",s]},`${l.id}-${s}`)))})]})]}),o.jsx("div",{className:"visual-stage",children:t.id==="partitioned"?o.jsx(Tf,{simulation:r,dispatch:n}):o.jsx(Pf,{designId:t.id,simulation:r,dispatch:n})})]}),o.jsxs("article",{className:"glass timeline-panel",children:[o.jsxs("div",{className:"section-heading",children:[o.jsxs("div",{children:[o.jsx("span",{className:"eyebrow",children:"Event Timeline"}),o.jsx("h3",{children:"What just happened"})]}),o.jsxs("span",{className:"timeline-tick",children:["Tick ",r.tick]})]}),o.jsx("div",{className:"timeline-list",children:r.timeline.map((l,s)=>o.jsxs("div",{className:`timeline-item type-${l.type}`,children:[o.jsx("span",{className:"timeline-chip",children:l.type}),o.jsx("p",{children:l.text})]},`${l.tick}-${s}`))})]})]}),o.jsxs("aside",{className:"right-column",children:[o.jsxs("article",{className:"glass insight-panel",children:[o.jsx("span",{className:"eyebrow",children:"Why This Design"}),o.jsx("h3",{children:t.label}),o.jsx("p",{children:t.why}),o.jsx("div",{className:"insight-list",children:Cf[t.id].map(l=>o.jsx("div",{className:"insight-item",children:l},l))})]}),o.jsxs("article",{className:"glass tradeoff-panel",children:[o.jsxs("div",{className:"tradeoff-column",children:[o.jsx("span",{className:"mini-title",children:"Strengths"}),t.strengths.map(l=>o.jsx("div",{className:"tradeoff-item positive",children:l},l))]}),o.jsxs("div",{className:"tradeoff-column",children:[o.jsx("span",{className:"mini-title",children:"Tradeoffs"}),t.tradeoffs.map(l=>o.jsx("div",{className:"tradeoff-item",children:l},l))]})]}),o.jsxs("article",{className:"glass coach-panel",children:[o.jsx("span",{className:"eyebrow",children:"AI Interview Coach"}),o.jsx("h3",{children:"Ask the design what it is proving"}),o.jsx("textarea",{value:r.coachPrompt,onChange:l=>n({type:"coach",designId:t.id,prompt:l.target.value}),placeholder:"Why do we need partitions?"}),o.jsx("div",{className:"coach-reply",children:r.coachReply}),o.jsx("div",{className:"suggestions",children:["Why does this design exist?","How do threads help here?","What happens to offsets?","Why partition at all?"].map(l=>o.jsx("button",{className:"prompt-chip",onClick:()=>n({type:"coach",designId:t.id,prompt:l}),children:l},l))})]})]})]})]})]})}function Pf({designId:e,simulation:n,dispatch:t}){return o.jsxs("div",{className:"scene-grid",children:[o.jsxs("div",{className:"lane",children:[o.jsx("div",{className:"lane-title",children:"Topics"}),n.topics.map(r=>o.jsxs("div",{className:"topic-card",children:[o.jsxs("div",{className:"topic-header",children:[o.jsx("strong",{children:r.name}),o.jsxs("span",{children:[r.messages.length," msgs"]})]}),o.jsx("div",{className:"message-stack",children:r.messages.slice(-4).map(i=>o.jsxs("div",{className:"message-pill",children:[o.jsx("span",{children:i.producer}),o.jsx("strong",{children:i.content})]},i.id))})]},r.name))]}),o.jsx("div",{className:"flow-divider",children:o.jsx("div",{className:"pulse-line"})}),o.jsxs("div",{className:"lane",children:[o.jsx("div",{className:"lane-title",children:e==="basic"?"Consumers":"Consumer Threads"}),n.consumers.map(r=>o.jsxs("div",{className:"consumer-card",children:[o.jsxs("div",{className:"consumer-header",children:[o.jsxs("div",{children:[o.jsx("strong",{children:r.id}),r.thread&&o.jsx("span",{children:r.thread})]}),e!=="basic"&&o.jsx("button",{className:`toggle-btn ${r.active?"active":""}`,onClick:()=>t({type:"toggle-thread",designId:e,consumerId:r.id}),children:r.active?"Running":"Stopped"})]}),o.jsx("div",{className:"subscription-list",children:r.subscriptions.map(i=>o.jsx("span",{className:"subscription-chip",children:i},i))}),o.jsx("div",{className:"offset-grid",children:Object.entries(r.offsets).map(([i,l])=>o.jsxs("div",{className:"offset-card",children:[o.jsx("span",{children:i}),o.jsxs("strong",{children:["offset ",l]})]},i))}),o.jsx("div",{className:"last-consumed",children:r.lastConsumed||"No messages consumed yet"})]},r.id))]})]})}function Tf({simulation:e,dispatch:n}){return o.jsxs("div",{className:"partition-layout",children:[o.jsx("div",{className:"partition-topics",children:e.topics.map(t=>o.jsxs("div",{className:"partition-topic-card",children:[o.jsxs("div",{className:"topic-header",children:[o.jsx("strong",{children:t.name}),o.jsxs("span",{children:["round robin ",t.roundRobinIndex]})]}),o.jsx("div",{className:"partition-grid",children:t.partitions.map((r,i)=>o.jsxs("div",{className:"partition-card",children:[o.jsxs("div",{className:"partition-label",children:["Partition ",i]}),r.slice(-3).map(l=>o.jsxs("div",{className:"message-pill partition-pill",children:[o.jsx("span",{children:l.producer}),o.jsx("strong",{children:l.content})]},l.id))]},`${t.name}-${i}`))})]},t.name))}),o.jsx("div",{className:"partition-consumers",children:e.consumers.map(t=>o.jsxs("div",{className:"consumer-card",children:[o.jsxs("div",{className:"consumer-header",children:[o.jsxs("div",{children:[o.jsx("strong",{children:t.id}),o.jsx("span",{children:t.thread})]}),o.jsx("button",{className:`toggle-btn ${t.active?"active":""}`,onClick:()=>n({type:"toggle-thread",designId:"partitioned",consumerId:t.id}),children:t.active?"Running":"Stopped"})]}),t.subscriptions.map(r=>o.jsxs("div",{className:"partition-offset-block",children:[o.jsxs("span",{className:"mini-title",children:[r," offsets"]}),o.jsx("div",{className:"offset-grid",children:t.offsets[r].map((i,l)=>o.jsxs("div",{className:"offset-card",children:[o.jsxs("span",{children:["P",l]}),o.jsx("strong",{children:i})]},`${r}-${l}`))})]},r)),o.jsx("div",{className:"last-consumed",children:t.lastConsumed||"No messages consumed yet"})]},t.id))})]})}const _f=`:root {
  --bg: #f2efe8;
  --surface: rgba(255, 252, 247, 0.82);
  --border: rgba(36, 32, 26, 0.08);
  --text: #1f1b17;
  --muted: #6d655b;
  --accent-basic: #d86f45;
  --accent-threaded: #247c72;
  --accent-partitioned: #315fcf;
  --shadow: 0 24px 80px rgba(48, 37, 24, 0.12);
}

* {
  box-sizing: border-box;
}

html,
body,
#root {
  min-height: 100%;
}

body {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  background:
    radial-gradient(circle at top left, rgba(216, 111, 69, 0.18), transparent 32%),
    radial-gradient(circle at top right, rgba(49, 95, 207, 0.18), transparent 28%),
    linear-gradient(180deg, #f9f4ec 0%, #efe7db 100%);
  color: var(--text);
}

button,
textarea {
  font: inherit;
}

.app-shell {
  position: relative;
  overflow: hidden;
}

.background-grid {
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(31, 27, 23, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(31, 27, 23, 0.04) 1px, transparent 1px);
  background-size: 42px 42px;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.55), transparent 85%);
  pointer-events: none;
}

.layout {
  position: relative;
  max-width: 1440px;
  margin: 0 auto;
  padding: 32px 20px 56px;
}

.glass {
  background: var(--surface);
  backdrop-filter: blur(18px);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}

.hero {
  display: grid;
  grid-template-columns: 1.25fr 0.95fr;
  gap: 24px;
  align-items: stretch;
  margin-bottom: 24px;
}

.hero-copy,
.hero-panel,
.showcase,
.timeline-panel,
.insight-panel,
.tradeoff-panel,
.coach-panel {
  border-radius: 28px;
  padding: 28px;
}

.eyebrow,
.mini-title,
.card-tag,
.timeline-chip,
.partition-label {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.72rem;
  color: var(--muted);
}

.hero-copy h1 {
  font-size: clamp(2.6rem, 4vw, 5.1rem);
  line-height: 0.95;
  margin: 14px 0 18px;
  max-width: 11ch;
}

.hero-copy p,
.design-card p,
.insight-panel p,
.coach-reply,
.timeline-item p {
  color: var(--muted);
  line-height: 1.6;
}

.hero-panel {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.progress-rail {
  display: grid;
  gap: 14px;
  margin-top: 18px;
}

.progress-node,
.design-card,
.primary-btn,
.secondary-btn,
.pill-btn,
.toggle-btn,
.prompt-chip {
  border: 0;
  cursor: pointer;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    background 180ms ease;
}

.progress-node {
  border-radius: 22px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.5);
  display: grid;
  gap: 8px;
  text-align: left;
}

.progress-node.is-active {
  background: color-mix(in srgb, var(--node-accent) 18%, white);
  transform: translateX(4px);
}

.design-switcher {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-bottom: 24px;
}

.design-card {
  border-radius: 26px;
  padding: 24px;
  text-align: left;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.72), rgba(255, 250, 242, 0.85)),
    color-mix(in srgb, var(--card-accent) 8%, white);
  border: 1px solid rgba(31, 27, 23, 0.06);
}

.design-card.selected {
  transform: translateY(-4px);
  box-shadow: 0 28px 80px rgba(48, 37, 24, 0.14);
}

.design-card h2 {
  font-size: 1.55rem;
  line-height: 1.15;
  margin: 10px 0;
}

.main-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(320px, 0.8fr);
  gap: 24px;
}

.left-column,
.right-column {
  display: grid;
  gap: 24px;
}

.section-heading,
.topic-header,
.consumer-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.section-heading h3,
.insight-panel h3,
.coach-panel h3 {
  margin: 8px 0 0;
  font-size: 1.7rem;
}

.button-row {
  display: flex;
  gap: 10px;
}

.wrap {
  flex-wrap: wrap;
}

.primary-btn,
.secondary-btn,
.pill-btn,
.toggle-btn,
.prompt-chip {
  border-radius: 999px;
  padding: 10px 16px;
}

.primary-btn {
  background: var(--text);
  color: white;
}

.secondary-btn,
.pill-btn,
.prompt-chip {
  background: rgba(255, 255, 255, 0.7);
  color: var(--text);
  border: 1px solid rgba(31, 27, 23, 0.08);
}

.pill-btn.accent,
.toggle-btn.active {
  background: rgba(31, 27, 23, 0.92);
  color: white;
}

.metric-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin: 22px 0;
}

.metric-card,
.offset-card,
.insight-item,
.tradeoff-item,
.timeline-item,
.partition-card,
.topic-card,
.consumer-card,
.partition-topic-card {
  background: rgba(255, 255, 255, 0.62);
  border: 1px solid rgba(31, 27, 23, 0.08);
}

.metric-card {
  border-radius: 20px;
  padding: 16px;
  display: grid;
  gap: 10px;
}

.metric-card strong {
  font-size: 1.8rem;
}

.controls-panel {
  display: grid;
  gap: 18px;
  margin-bottom: 24px;
}

.visual-stage {
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.68), rgba(255, 251, 245, 0.84)),
    radial-gradient(circle at top, rgba(49, 95, 207, 0.12), transparent 45%);
  border-radius: 28px;
  padding: 22px;
  border: 1px solid rgba(31, 27, 23, 0.08);
}

.scene-grid {
  display: grid;
  grid-template-columns: 1fr 100px 1fr;
  gap: 16px;
  align-items: stretch;
}

.lane {
  display: grid;
  gap: 14px;
}

.lane-title {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--muted);
}

.topic-card,
.consumer-card,
.partition-topic-card {
  border-radius: 22px;
  padding: 18px;
}

.message-stack,
.subscription-list,
.insight-list,
.timeline-list {
  display: grid;
  gap: 10px;
}

.message-pill {
  display: grid;
  gap: 2px;
  border-radius: 18px;
  padding: 12px 14px;
  background: rgba(216, 111, 69, 0.1);
}

.message-pill span,
.consumer-header span,
.topic-header span,
.timeline-tick,
.last-consumed {
  color: var(--muted);
  font-size: 0.92rem;
}

.flow-divider {
  position: relative;
  display: grid;
  place-items: center;
}

.pulse-line {
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, rgba(31, 27, 23, 0.24), transparent);
  position: relative;
}

.pulse-line::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 22%;
  width: 18px;
  height: 18px;
  background: var(--text);
  border-radius: 50%;
  transform: translateX(-50%);
  animation: pulse 2.4s infinite ease-in-out;
}

@keyframes pulse {
  0%,
  100% {
    transform: translate(-50%, 0) scale(0.75);
    opacity: 0.5;
  }

  50% {
    transform: translate(-50%, 180px) scale(1);
    opacity: 1;
  }
}

.subscription-list,
.offset-grid,
.partition-grid,
.suggestions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.subscription-chip {
  padding: 7px 10px;
  border-radius: 999px;
  background: rgba(36, 124, 114, 0.1);
  font-size: 0.9rem;
}

.offset-card,
.insight-item,
.tradeoff-item,
.timeline-item,
.partition-card {
  border-radius: 18px;
  padding: 14px;
}

.last-consumed {
  margin-top: 14px;
}

.timeline-panel {
  min-height: 320px;
}

.timeline-item.type-publish {
  border-left: 4px solid var(--accent-basic);
}

.timeline-item.type-consume {
  border-left: 4px solid var(--accent-threaded);
}

.timeline-item.type-warning {
  border-left: 4px solid #b86235;
}

.timeline-item.type-idle,
.timeline-item.type-system {
  border-left: 4px solid var(--accent-partitioned);
}

.tradeoff-panel {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.tradeoff-column {
  display: grid;
  gap: 10px;
}

.tradeoff-item.positive {
  background: rgba(36, 124, 114, 0.12);
}

.coach-panel textarea {
  width: 100%;
  min-height: 120px;
  margin: 16px 0;
  padding: 16px;
  border-radius: 22px;
  border: 1px solid rgba(31, 27, 23, 0.08);
  background: rgba(255, 255, 255, 0.75);
  resize: vertical;
  color: var(--text);
}

.coach-reply {
  background: rgba(49, 95, 207, 0.08);
  border-radius: 22px;
  padding: 16px;
  margin-bottom: 14px;
}

.partition-layout,
.partition-topics,
.partition-consumers {
  display: grid;
  gap: 16px;
}

.partition-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}

.partition-pill {
  background: rgba(49, 95, 207, 0.1);
}

.partition-offset-block {
  margin-top: 14px;
}

.progress-node:hover,
.design-card:hover,
.primary-btn:hover,
.secondary-btn:hover,
.pill-btn:hover,
.toggle-btn:hover,
.prompt-chip:hover {
  transform: translateY(-2px);
}

@media (max-width: 1180px) {
  .hero,
  .main-grid {
    grid-template-columns: 1fr;
  }

  .design-switcher {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 840px) {
  .layout {
    padding: 20px 14px 42px;
  }

  .scene-grid {
    grid-template-columns: 1fr;
  }

  .flow-divider {
    display: none;
  }

  .metric-row,
  .tradeoff-panel {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .hero-copy h1 {
    font-size: 2.4rem;
  }

  .metric-row,
  .tradeoff-panel {
    grid-template-columns: 1fr;
  }

  .hero-copy,
  .hero-panel,
  .showcase,
  .timeline-panel,
  .insight-panel,
  .tradeoff-panel,
  .coach-panel {
    padding: 20px;
    border-radius: 22px;
  }
}
`,Pt=[{id:"spotify",name:"Spotify LLD",tag:"Facade + Factory + Strategy + Adapter",summary:"Drive the music player architecture and explain how device adapters and playback strategies stay isolated.",highlights:["Pattern walkthrough","Architecture map","Interview narration"],component:nf,styles:tf,theme:{bgTop:"#0e1618",bgBottom:"#111d20",accent:"#f2bc63",accentSoft:"rgba(242, 188, 99, 0.18)",text:"#f6f4ea",muted:"rgba(246, 244, 234, 0.72)",card:"rgba(248, 244, 232, 0.08)",border:"rgba(248, 244, 232, 0.12)"}},{id:"kv-store",name:"In-Memory KV Store",tag:"HashMap + LRU + TTL",summary:"Visualize recency, expiry, and eviction while keeping the Java design discussion crisp and interview-ready.",highlights:["Live TTL countdown","LRU transitions","AI-style explanations"],component:df,styles:pf,theme:{bgTop:"#07111b",bgBottom:"#102031",accent:"#7cf2c3",accentSoft:"rgba(124, 242, 195, 0.18)",text:"#ebf5ff",muted:"#93acc3",card:"rgba(8, 19, 31, 0.68)",border:"rgba(164, 212, 255, 0.16)"}},{id:"dmq",name:"Distributed Message Queue",tag:"Topics + Threads + Partitions",summary:"Switch between basic, multithreaded, and partitioned queue designs from a single interactive demo.",highlights:["Design evolution","Offset simulation","Scaling tradeoffs"],component:Ef,styles:_f,theme:{bgTop:"#f9f4ec",bgBottom:"#efe7db",accent:"#315fcf",accentSoft:"rgba(49, 95, 207, 0.12)",text:"#1f1b17",muted:"#6d655b",card:"rgba(255, 252, 247, 0.82)",border:"rgba(36, 32, 26, 0.08)"}}];function Lf(){const[e,n]=b.useState(Pt[0].id),t=b.useMemo(()=>Pt.find(i=>i.id===e)??Pt[0],[e]),r={"--hub-bg-top":t.theme.bgTop,"--hub-bg-bottom":t.theme.bgBottom,"--hub-accent":t.theme.accent,"--hub-accent-soft":t.theme.accentSoft,"--hub-text":t.theme.text,"--hub-text-muted":t.theme.muted,"--hub-card":t.theme.card,"--hub-border":t.theme.border};return o.jsxs("div",{className:"hub-shell",style:r,children:[o.jsx("div",{className:"hub-backdrop hub-backdrop--left"}),o.jsx("div",{className:"hub-backdrop hub-backdrop--right"}),o.jsxs("main",{className:"hub-layout",children:[o.jsxs("section",{className:"hub-hero",children:[o.jsxs("div",{children:[o.jsx("span",{className:"hub-eyebrow",children:"Common LLD Playground"}),o.jsx("h1",{children:"Choose any low-level design demo from one shared launchpad."}),o.jsx("p",{children:"The hub keeps your three React playgrounds together in one place while isolating their original styling, so each app still feels like its own focused learning experience."})]}),o.jsxs("div",{className:"hub-metrics",children:[o.jsxs("article",{children:[o.jsx("span",{children:"Playgrounds"}),o.jsx("strong",{children:Pt.length})]}),o.jsxs("article",{children:[o.jsx("span",{children:"Selected"}),o.jsx("strong",{children:t.name})]}),o.jsxs("article",{children:[o.jsx("span",{children:"Design lens"}),o.jsx("strong",{children:t.tag})]})]})]}),o.jsx("section",{className:"hub-selector",children:Pt.map(i=>{const l=i.id===t.id;return o.jsxs("button",{type:"button",className:`selector-card ${l?"is-active":""}`,onClick:()=>n(i.id),style:{"--card-accent":i.theme.accent,"--card-accent-soft":i.theme.accentSoft,"--card-text":i.theme.text,"--card-muted":i.theme.muted,"--card-surface":i.theme.card,"--card-border":i.theme.border,"--card-bg-top":i.theme.bgTop,"--card-bg-bottom":i.theme.bgBottom},children:[o.jsx("span",{className:"selector-tag",children:i.tag}),o.jsx("h2",{children:i.name}),o.jsx("p",{children:i.summary}),o.jsx("div",{className:"selector-highlights",children:i.highlights.map(s=>o.jsx("span",{children:s},s))})]},i.id)})}),o.jsxs("section",{className:"hub-content",children:[o.jsxs("div",{className:"hub-support",children:[o.jsxs("div",{className:"sidebar-card",children:[o.jsx("span",{className:"sidebar-kicker",children:"Current Playground"}),o.jsx("h2",{children:t.name}),o.jsx("p",{children:t.summary})]}),o.jsxs("div",{className:"sidebar-card",children:[o.jsx("span",{className:"sidebar-kicker",children:"Why This Hub Works"}),o.jsxs("ul",{children:[o.jsx("li",{children:"One repo-level launcher for all three LLD demos."}),o.jsx("li",{children:"Each existing app stays intact and reusable."}),o.jsx("li",{children:"Shadow DOM keeps CSS from leaking across playgrounds."})]})]})]}),o.jsx(Xp,{title:t.name,component:t.component,styles:t.styles},t.id)]})]})]})}ll.createRoot(document.getElementById("root")).render(o.jsx(Oc.StrictMode,{children:o.jsx(Lf,{})}));
