(function(){const b=document.createElement("link").relList;if(b&&b.supports&&b.supports("modulepreload"))return;for(const w of document.querySelectorAll('link[rel="modulepreload"]'))x(w);new MutationObserver(w=>{for(const g of w)if(g.type==="childList")for(const f of g.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&x(f)}).observe(document,{childList:!0,subtree:!0});function d(w){const g={};return w.integrity&&(g.integrity=w.integrity),w.referrerPolicy&&(g.referrerPolicy=w.referrerPolicy),w.crossOrigin==="use-credentials"?g.credentials="include":w.crossOrigin==="anonymous"?g.credentials="omit":g.credentials="same-origin",g}function x(w){if(w.ep)return;w.ep=!0;const g=d(w);fetch(w.href,g)}})();var El=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function qf(B){return B&&B.__esModule&&Object.prototype.hasOwnProperty.call(B,"default")?B.default:B}var Xs={exports:{}},ri={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xf;function bp(){if(xf)return ri;xf=1;var B=Symbol.for("react.transitional.element"),b=Symbol.for("react.fragment");function d(x,w,g){var f=null;if(g!==void 0&&(f=""+g),w.key!==void 0&&(f=""+w.key),"key"in w){g={};for(var c in w)c!=="key"&&(g[c]=w[c])}else g=w;return w=g.ref,{$$typeof:B,type:x,key:f,ref:w!==void 0?w:null,props:g}}return ri.Fragment=b,ri.jsx=d,ri.jsxs=d,ri}var yf;function vp(){return yf||(yf=1,Xs.exports=bp()),Xs.exports}var r=vp(),Ws={exports:{}},_e={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bf;function Cp(){if(bf)return _e;bf=1;var B=Symbol.for("react.transitional.element"),b=Symbol.for("react.portal"),d=Symbol.for("react.fragment"),x=Symbol.for("react.strict_mode"),w=Symbol.for("react.profiler"),g=Symbol.for("react.consumer"),f=Symbol.for("react.context"),c=Symbol.for("react.forward_ref"),s=Symbol.for("react.suspense"),h=Symbol.for("react.memo"),k=Symbol.for("react.lazy"),S=Symbol.for("react.activity"),j=Symbol.iterator;function m(o){return o===null||typeof o!="object"?null:(o=j&&o[j]||o["@@iterator"],typeof o=="function"?o:null)}var C={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},y=Object.assign,N={};function E(o,_,K){this.props=o,this.context=_,this.refs=N,this.updater=K||C}E.prototype.isReactComponent={},E.prototype.setState=function(o,_){if(typeof o!="object"&&typeof o!="function"&&o!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,o,_,"setState")},E.prototype.forceUpdate=function(o){this.updater.enqueueForceUpdate(this,o,"forceUpdate")};function D(){}D.prototype=E.prototype;function R(o,_,K){this.props=o,this.context=_,this.refs=N,this.updater=K||C}var A=R.prototype=new D;A.constructor=R,y(A,E.prototype),A.isPureReactComponent=!0;var T=Array.isArray;function L(){}var V={H:null,A:null,T:null,S:null},Z=Object.prototype.hasOwnProperty;function U(o,_,K){var X=K.ref;return{$$typeof:B,type:o,key:_,ref:X!==void 0?X:null,props:K}}function W(o,_){return U(o.type,_,o.props)}function ue(o){return typeof o=="object"&&o!==null&&o.$$typeof===B}function I(o){var _={"=":"=0",":":"=2"};return"$"+o.replace(/[=:]/g,function(K){return _[K]})}var ae=/\/+/g;function v(o,_){return typeof o=="object"&&o!==null&&o.key!=null?I(""+o.key):_.toString(36)}function J(o){switch(o.status){case"fulfilled":return o.value;case"rejected":throw o.reason;default:switch(typeof o.status=="string"?o.then(L,L):(o.status="pending",o.then(function(_){o.status==="pending"&&(o.status="fulfilled",o.value=_)},function(_){o.status==="pending"&&(o.status="rejected",o.reason=_)})),o.status){case"fulfilled":return o.value;case"rejected":throw o.reason}}throw o}function Q(o,_,K,X,te){var ye=typeof o;(ye==="undefined"||ye==="boolean")&&(o=null);var xe=!1;if(o===null)xe=!0;else switch(ye){case"bigint":case"string":case"number":xe=!0;break;case"object":switch(o.$$typeof){case B:case b:xe=!0;break;case k:return xe=o._init,Q(xe(o._payload),_,K,X,te)}}if(xe)return te=te(o),xe=X===""?"."+v(o,0):X,T(te)?(K="",xe!=null&&(K=xe.replace(ae,"$&/")+"/"),Q(te,_,K,"",function(je){return je})):te!=null&&(ue(te)&&(te=W(te,K+(te.key==null||o&&o.key===te.key?"":(""+te.key).replace(ae,"$&/")+"/")+xe)),_.push(te)),1;xe=0;var be=X===""?".":X+":";if(T(o))for(var Se=0;Se<o.length;Se++)X=o[Se],ye=be+v(X,Se),xe+=Q(X,_,K,ye,te);else if(Se=m(o),typeof Se=="function")for(o=Se.call(o),Se=0;!(X=o.next()).done;)X=X.value,ye=be+v(X,Se++),xe+=Q(X,_,K,ye,te);else if(ye==="object"){if(typeof o.then=="function")return Q(J(o),_,K,X,te);throw _=String(o),Error("Objects are not valid as a React child (found: "+(_==="[object Object]"?"object with keys {"+Object.keys(o).join(", ")+"}":_)+"). If you meant to render a collection of children, use an array instead.")}return xe}function Y(o,_,K){if(o==null)return o;var X=[],te=0;return Q(o,X,"","",function(ye){return _.call(K,ye,te++)}),X}function P(o){if(o._status===-1){var _=o._result;_=_(),_.then(function(K){(o._status===0||o._status===-1)&&(o._status=1,o._result=K)},function(K){(o._status===0||o._status===-1)&&(o._status=2,o._result=K)}),o._status===-1&&(o._status=0,o._result=_)}if(o._status===1)return o._result.default;throw o._result}var ne=typeof reportError=="function"?reportError:function(o){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var _=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof o=="object"&&o!==null&&typeof o.message=="string"?String(o.message):String(o),error:o});if(!window.dispatchEvent(_))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",o);return}console.error(o)},O={map:Y,forEach:function(o,_,K){Y(o,function(){_.apply(this,arguments)},K)},count:function(o){var _=0;return Y(o,function(){_++}),_},toArray:function(o){return Y(o,function(_){return _})||[]},only:function(o){if(!ue(o))throw Error("React.Children.only expected to receive a single React element child.");return o}};return _e.Activity=S,_e.Children=O,_e.Component=E,_e.Fragment=d,_e.Profiler=w,_e.PureComponent=R,_e.StrictMode=x,_e.Suspense=s,_e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=V,_e.__COMPILER_RUNTIME={__proto__:null,c:function(o){return V.H.useMemoCache(o)}},_e.cache=function(o){return function(){return o.apply(null,arguments)}},_e.cacheSignal=function(){return null},_e.cloneElement=function(o,_,K){if(o==null)throw Error("The argument must be a React element, but you passed "+o+".");var X=y({},o.props),te=o.key;if(_!=null)for(ye in _.key!==void 0&&(te=""+_.key),_)!Z.call(_,ye)||ye==="key"||ye==="__self"||ye==="__source"||ye==="ref"&&_.ref===void 0||(X[ye]=_[ye]);var ye=arguments.length-2;if(ye===1)X.children=K;else if(1<ye){for(var xe=Array(ye),be=0;be<ye;be++)xe[be]=arguments[be+2];X.children=xe}return U(o.type,te,X)},_e.createContext=function(o){return o={$$typeof:f,_currentValue:o,_currentValue2:o,_threadCount:0,Provider:null,Consumer:null},o.Provider=o,o.Consumer={$$typeof:g,_context:o},o},_e.createElement=function(o,_,K){var X,te={},ye=null;if(_!=null)for(X in _.key!==void 0&&(ye=""+_.key),_)Z.call(_,X)&&X!=="key"&&X!=="__self"&&X!=="__source"&&(te[X]=_[X]);var xe=arguments.length-2;if(xe===1)te.children=K;else if(1<xe){for(var be=Array(xe),Se=0;Se<xe;Se++)be[Se]=arguments[Se+2];te.children=be}if(o&&o.defaultProps)for(X in xe=o.defaultProps,xe)te[X]===void 0&&(te[X]=xe[X]);return U(o,ye,te)},_e.createRef=function(){return{current:null}},_e.forwardRef=function(o){return{$$typeof:c,render:o}},_e.isValidElement=ue,_e.lazy=function(o){return{$$typeof:k,_payload:{_status:-1,_result:o},_init:P}},_e.memo=function(o,_){return{$$typeof:h,type:o,compare:_===void 0?null:_}},_e.startTransition=function(o){var _=V.T,K={};V.T=K;try{var X=o(),te=V.S;te!==null&&te(K,X),typeof X=="object"&&X!==null&&typeof X.then=="function"&&X.then(L,ne)}catch(ye){ne(ye)}finally{_!==null&&K.types!==null&&(_.types=K.types),V.T=_}},_e.unstable_useCacheRefresh=function(){return V.H.useCacheRefresh()},_e.use=function(o){return V.H.use(o)},_e.useActionState=function(o,_,K){return V.H.useActionState(o,_,K)},_e.useCallback=function(o,_){return V.H.useCallback(o,_)},_e.useContext=function(o){return V.H.useContext(o)},_e.useDebugValue=function(){},_e.useDeferredValue=function(o,_){return V.H.useDeferredValue(o,_)},_e.useEffect=function(o,_){return V.H.useEffect(o,_)},_e.useEffectEvent=function(o){return V.H.useEffectEvent(o)},_e.useId=function(){return V.H.useId()},_e.useImperativeHandle=function(o,_,K){return V.H.useImperativeHandle(o,_,K)},_e.useInsertionEffect=function(o,_){return V.H.useInsertionEffect(o,_)},_e.useLayoutEffect=function(o,_){return V.H.useLayoutEffect(o,_)},_e.useMemo=function(o,_){return V.H.useMemo(o,_)},_e.useOptimistic=function(o,_){return V.H.useOptimistic(o,_)},_e.useReducer=function(o,_,K){return V.H.useReducer(o,_,K)},_e.useRef=function(o){return V.H.useRef(o)},_e.useState=function(o){return V.H.useState(o)},_e.useSyncExternalStore=function(o,_,K){return V.H.useSyncExternalStore(o,_,K)},_e.useTransition=function(){return V.H.useTransition()},_e.version="19.2.8",_e}var vf;function fc(){return vf||(vf=1,Ws.exports=Cp()),Ws.exports}var ce=fc();const $f=qf(ce);var Js={exports:{}},ii={},ec={exports:{}},tc={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Cf;function Sp(){return Cf||(Cf=1,(function(B){function b(Q,Y){var P=Q.length;Q.push(Y);e:for(;0<P;){var ne=P-1>>>1,O=Q[ne];if(0<w(O,Y))Q[ne]=Y,Q[P]=O,P=ne;else break e}}function d(Q){return Q.length===0?null:Q[0]}function x(Q){if(Q.length===0)return null;var Y=Q[0],P=Q.pop();if(P!==Y){Q[0]=P;e:for(var ne=0,O=Q.length,o=O>>>1;ne<o;){var _=2*(ne+1)-1,K=Q[_],X=_+1,te=Q[X];if(0>w(K,P))X<O&&0>w(te,K)?(Q[ne]=te,Q[X]=P,ne=X):(Q[ne]=K,Q[_]=P,ne=_);else if(X<O&&0>w(te,P))Q[ne]=te,Q[X]=P,ne=X;else break e}}return Y}function w(Q,Y){var P=Q.sortIndex-Y.sortIndex;return P!==0?P:Q.id-Y.id}if(B.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var g=performance;B.unstable_now=function(){return g.now()}}else{var f=Date,c=f.now();B.unstable_now=function(){return f.now()-c}}var s=[],h=[],k=1,S=null,j=3,m=!1,C=!1,y=!1,N=!1,E=typeof setTimeout=="function"?setTimeout:null,D=typeof clearTimeout=="function"?clearTimeout:null,R=typeof setImmediate<"u"?setImmediate:null;function A(Q){for(var Y=d(h);Y!==null;){if(Y.callback===null)x(h);else if(Y.startTime<=Q)x(h),Y.sortIndex=Y.expirationTime,b(s,Y);else break;Y=d(h)}}function T(Q){if(y=!1,A(Q),!C)if(d(s)!==null)C=!0,L||(L=!0,I());else{var Y=d(h);Y!==null&&J(T,Y.startTime-Q)}}var L=!1,V=-1,Z=5,U=-1;function W(){return N?!0:!(B.unstable_now()-U<Z)}function ue(){if(N=!1,L){var Q=B.unstable_now();U=Q;var Y=!0;try{e:{C=!1,y&&(y=!1,D(V),V=-1),m=!0;var P=j;try{t:{for(A(Q),S=d(s);S!==null&&!(S.expirationTime>Q&&W());){var ne=S.callback;if(typeof ne=="function"){S.callback=null,j=S.priorityLevel;var O=ne(S.expirationTime<=Q);if(Q=B.unstable_now(),typeof O=="function"){S.callback=O,A(Q),Y=!0;break t}S===d(s)&&x(s),A(Q)}else x(s);S=d(s)}if(S!==null)Y=!0;else{var o=d(h);o!==null&&J(T,o.startTime-Q),Y=!1}}break e}finally{S=null,j=P,m=!1}Y=void 0}}finally{Y?I():L=!1}}}var I;if(typeof R=="function")I=function(){R(ue)};else if(typeof MessageChannel<"u"){var ae=new MessageChannel,v=ae.port2;ae.port1.onmessage=ue,I=function(){v.postMessage(null)}}else I=function(){E(ue,0)};function J(Q,Y){V=E(function(){Q(B.unstable_now())},Y)}B.unstable_IdlePriority=5,B.unstable_ImmediatePriority=1,B.unstable_LowPriority=4,B.unstable_NormalPriority=3,B.unstable_Profiling=null,B.unstable_UserBlockingPriority=2,B.unstable_cancelCallback=function(Q){Q.callback=null},B.unstable_forceFrameRate=function(Q){0>Q||125<Q?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Z=0<Q?Math.floor(1e3/Q):5},B.unstable_getCurrentPriorityLevel=function(){return j},B.unstable_next=function(Q){switch(j){case 1:case 2:case 3:var Y=3;break;default:Y=j}var P=j;j=Y;try{return Q()}finally{j=P}},B.unstable_requestPaint=function(){N=!0},B.unstable_runWithPriority=function(Q,Y){switch(Q){case 1:case 2:case 3:case 4:case 5:break;default:Q=3}var P=j;j=Q;try{return Y()}finally{j=P}},B.unstable_scheduleCallback=function(Q,Y,P){var ne=B.unstable_now();switch(typeof P=="object"&&P!==null?(P=P.delay,P=typeof P=="number"&&0<P?ne+P:ne):P=ne,Q){case 1:var O=-1;break;case 2:O=250;break;case 5:O=1073741823;break;case 4:O=1e4;break;default:O=5e3}return O=P+O,Q={id:k++,callback:Y,priorityLevel:Q,startTime:P,expirationTime:O,sortIndex:-1},P>ne?(Q.sortIndex=P,b(h,Q),d(s)===null&&Q===d(h)&&(y?(D(V),V=-1):y=!0,J(T,P-ne))):(Q.sortIndex=O,b(s,Q),C||m||(C=!0,L||(L=!0,I()))),Q},B.unstable_shouldYield=W,B.unstable_wrapCallback=function(Q){var Y=j;return function(){var P=j;j=Y;try{return Q.apply(this,arguments)}finally{j=P}}}})(tc)),tc}var Sf;function wp(){return Sf||(Sf=1,ec.exports=Sp()),ec.exports}var nc={exports:{}},Et={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wf;function Ap(){if(wf)return Et;wf=1;var B=fc();function b(s){var h="https://react.dev/errors/"+s;if(1<arguments.length){h+="?args[]="+encodeURIComponent(arguments[1]);for(var k=2;k<arguments.length;k++)h+="&args[]="+encodeURIComponent(arguments[k])}return"Minified React error #"+s+"; visit "+h+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function d(){}var x={d:{f:d,r:function(){throw Error(b(522))},D:d,C:d,L:d,m:d,X:d,S:d,M:d},p:0,findDOMNode:null},w=Symbol.for("react.portal");function g(s,h,k){var S=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:w,key:S==null?null:""+S,children:s,containerInfo:h,implementation:k}}var f=B.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function c(s,h){if(s==="font")return"";if(typeof h=="string")return h==="use-credentials"?h:""}return Et.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=x,Et.createPortal=function(s,h){var k=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!h||h.nodeType!==1&&h.nodeType!==9&&h.nodeType!==11)throw Error(b(299));return g(s,h,null,k)},Et.flushSync=function(s){var h=f.T,k=x.p;try{if(f.T=null,x.p=2,s)return s()}finally{f.T=h,x.p=k,x.d.f()}},Et.preconnect=function(s,h){typeof s=="string"&&(h?(h=h.crossOrigin,h=typeof h=="string"?h==="use-credentials"?h:"":void 0):h=null,x.d.C(s,h))},Et.prefetchDNS=function(s){typeof s=="string"&&x.d.D(s)},Et.preinit=function(s,h){if(typeof s=="string"&&h&&typeof h.as=="string"){var k=h.as,S=c(k,h.crossOrigin),j=typeof h.integrity=="string"?h.integrity:void 0,m=typeof h.fetchPriority=="string"?h.fetchPriority:void 0;k==="style"?x.d.S(s,typeof h.precedence=="string"?h.precedence:void 0,{crossOrigin:S,integrity:j,fetchPriority:m}):k==="script"&&x.d.X(s,{crossOrigin:S,integrity:j,fetchPriority:m,nonce:typeof h.nonce=="string"?h.nonce:void 0})}},Et.preinitModule=function(s,h){if(typeof s=="string")if(typeof h=="object"&&h!==null){if(h.as==null||h.as==="script"){var k=c(h.as,h.crossOrigin);x.d.M(s,{crossOrigin:k,integrity:typeof h.integrity=="string"?h.integrity:void 0,nonce:typeof h.nonce=="string"?h.nonce:void 0})}}else h==null&&x.d.M(s)},Et.preload=function(s,h){if(typeof s=="string"&&typeof h=="object"&&h!==null&&typeof h.as=="string"){var k=h.as,S=c(k,h.crossOrigin);x.d.L(s,k,{crossOrigin:S,integrity:typeof h.integrity=="string"?h.integrity:void 0,nonce:typeof h.nonce=="string"?h.nonce:void 0,type:typeof h.type=="string"?h.type:void 0,fetchPriority:typeof h.fetchPriority=="string"?h.fetchPriority:void 0,referrerPolicy:typeof h.referrerPolicy=="string"?h.referrerPolicy:void 0,imageSrcSet:typeof h.imageSrcSet=="string"?h.imageSrcSet:void 0,imageSizes:typeof h.imageSizes=="string"?h.imageSizes:void 0,media:typeof h.media=="string"?h.media:void 0})}},Et.preloadModule=function(s,h){if(typeof s=="string")if(h){var k=c(h.as,h.crossOrigin);x.d.m(s,{as:typeof h.as=="string"&&h.as!=="script"?h.as:void 0,crossOrigin:k,integrity:typeof h.integrity=="string"?h.integrity:void 0})}else x.d.m(s)},Et.requestFormReset=function(s){x.d.r(s)},Et.unstable_batchedUpdates=function(s,h){return s(h)},Et.useFormState=function(s,h,k){return f.H.useFormState(s,h,k)},Et.useFormStatus=function(){return f.H.useHostTransitionStatus()},Et.version="19.2.8",Et}var Af;function kp(){if(Af)return nc.exports;Af=1;function B(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(B)}catch(b){console.error(b)}}return B(),nc.exports=Ap(),nc.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var kf;function Ep(){if(kf)return ii;kf=1;var B=wp(),b=fc(),d=kp();function x(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function w(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function g(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function f(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function s(e){if(g(e)!==e)throw Error(x(188))}function h(e){var t=e.alternate;if(!t){if(t=g(e),t===null)throw Error(x(188));return t!==e?null:e}for(var n=e,a=t;;){var i=n.return;if(i===null)break;var l=i.alternate;if(l===null){if(a=i.return,a!==null){n=a;continue}break}if(i.child===l.child){for(l=i.child;l;){if(l===n)return s(i),e;if(l===a)return s(i),t;l=l.sibling}throw Error(x(188))}if(n.return!==a.return)n=i,a=l;else{for(var u=!1,M=i.child;M;){if(M===n){u=!0,n=i,a=l;break}if(M===a){u=!0,a=i,n=l;break}M=M.sibling}if(!u){for(M=l.child;M;){if(M===n){u=!0,n=l,a=i;break}if(M===a){u=!0,a=l,n=i;break}M=M.sibling}if(!u)throw Error(x(189))}}if(n.alternate!==a)throw Error(x(190))}if(n.tag!==3)throw Error(x(188));return n.stateNode.current===n?e:t}function k(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=k(e),t!==null)return t;e=e.sibling}return null}var S=Object.assign,j=Symbol.for("react.element"),m=Symbol.for("react.transitional.element"),C=Symbol.for("react.portal"),y=Symbol.for("react.fragment"),N=Symbol.for("react.strict_mode"),E=Symbol.for("react.profiler"),D=Symbol.for("react.consumer"),R=Symbol.for("react.context"),A=Symbol.for("react.forward_ref"),T=Symbol.for("react.suspense"),L=Symbol.for("react.suspense_list"),V=Symbol.for("react.memo"),Z=Symbol.for("react.lazy"),U=Symbol.for("react.activity"),W=Symbol.for("react.memo_cache_sentinel"),ue=Symbol.iterator;function I(e){return e===null||typeof e!="object"?null:(e=ue&&e[ue]||e["@@iterator"],typeof e=="function"?e:null)}var ae=Symbol.for("react.client.reference");function v(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===ae?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case y:return"Fragment";case E:return"Profiler";case N:return"StrictMode";case T:return"Suspense";case L:return"SuspenseList";case U:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case C:return"Portal";case R:return e.displayName||"Context";case D:return(e._context.displayName||"Context")+".Consumer";case A:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case V:return t=e.displayName||null,t!==null?t:v(e.type)||"Memo";case Z:t=e._payload,e=e._init;try{return v(e(t))}catch{}}return null}var J=Array.isArray,Q=b.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Y=d.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,P={pending:!1,data:null,method:null,action:null},ne=[],O=-1;function o(e){return{current:e}}function _(e){0>O||(e.current=ne[O],ne[O]=null,O--)}function K(e,t){O++,ne[O]=e.current,e.current=t}var X=o(null),te=o(null),ye=o(null),xe=o(null);function be(e,t){switch(K(ye,t),K(te,e),K(X,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Lm(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Lm(t),e=Um(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}_(X),K(X,e)}function Se(){_(X),_(te),_(ye)}function je(e){e.memoizedState!==null&&K(xe,e);var t=X.current,n=Um(t,e.type);t!==n&&(K(te,e),K(X,n))}function Ne(e){te.current===e&&(_(X),_(te)),xe.current===e&&(_(xe),ei._currentValue=P)}var Fe,Le;function p(e){if(Fe===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Fe=t&&t[1]||"",Le=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Fe+e+Le}var ie=!1;function H(e,t){if(!e||ie)return"";ie=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var a={DetermineComponentFrameRoot:function(){try{if(t){var ge=function(){throw Error()};if(Object.defineProperty(ge.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(ge,[])}catch(de){var se=de}Reflect.construct(e,[],ge)}else{try{ge.call()}catch(de){se=de}e.call(ge.prototype)}}else{try{throw Error()}catch(de){se=de}(ge=e())&&typeof ge.catch=="function"&&ge.catch(function(){})}}catch(de){if(de&&se&&typeof de.stack=="string")return[de.stack,se.stack]}return[null,null]}};a.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var i=Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot,"name");i&&i.configurable&&Object.defineProperty(a.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var l=a.DetermineComponentFrameRoot(),u=l[0],M=l[1];if(u&&M){var G=u.split(`
`),le=M.split(`
`);for(i=a=0;a<G.length&&!G[a].includes("DetermineComponentFrameRoot");)a++;for(;i<le.length&&!le[i].includes("DetermineComponentFrameRoot");)i++;if(a===G.length||i===le.length)for(a=G.length-1,i=le.length-1;1<=a&&0<=i&&G[a]!==le[i];)i--;for(;1<=a&&0<=i;a--,i--)if(G[a]!==le[i]){if(a!==1||i!==1)do if(a--,i--,0>i||G[a]!==le[i]){var fe=`
`+G[a].replace(" at new "," at ");return e.displayName&&fe.includes("<anonymous>")&&(fe=fe.replace("<anonymous>",e.displayName)),fe}while(1<=a&&0<=i);break}}}finally{ie=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?p(n):""}function z(e,t){switch(e.tag){case 26:case 27:case 5:return p(e.type);case 16:return p("Lazy");case 13:return e.child!==t&&t!==null?p("Suspense Fallback"):p("Suspense");case 19:return p("SuspenseList");case 0:case 15:return H(e.type,!1);case 11:return H(e.type.render,!1);case 1:return H(e.type,!0);case 31:return p("Activity");default:return""}}function F(e){try{var t="",n=null;do t+=z(e,n),n=e,e=e.return;while(e);return t}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}var q=Object.prototype.hasOwnProperty,me=B.unstable_scheduleCallback,pe=B.unstable_cancelCallback,oe=B.unstable_shouldYield,ve=B.unstable_requestPaint,we=B.unstable_now,Ce=B.unstable_getCurrentPriorityLevel,Ee=B.unstable_ImmediatePriority,$e=B.unstable_UserBlockingPriority,ze=B.unstable_NormalPriority,bt=B.unstable_LowPriority,an=B.unstable_IdlePriority,kt=B.log,pn=B.unstable_setDisableYieldValue,Qe=null,gt=null;function qt(e){if(typeof kt=="function"&&pn(e),gt&&typeof gt.setStrictMode=="function")try{gt.setStrictMode(Qe,e)}catch{}}var rt=Math.clz32?Math.clz32:Ol,mi=Math.log,Rl=Math.LN2;function Ol(e){return e>>>=0,e===0?32:31-(mi(e)/Rl|0)|0}var Ta=256,sa=262144,dn=4194304;function $t(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function fi(e,t,n){var a=e.pendingLanes;if(a===0)return 0;var i=0,l=e.suspendedLanes,u=e.pingedLanes;e=e.warmLanes;var M=a&134217727;return M!==0?(a=M&~l,a!==0?i=$t(a):(u&=M,u!==0?i=$t(u):n||(n=M&~e,n!==0&&(i=$t(n))))):(M=a&~l,M!==0?i=$t(M):u!==0?i=$t(u):n||(n=a&~e,n!==0&&(i=$t(n)))),i===0?0:t!==0&&t!==i&&(t&l)===0&&(l=i&-i,n=t&-t,l>=n||l===32&&(n&4194048)!==0)?t:i}function fr(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function lh(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function vc(){var e=dn;return dn<<=1,(dn&62914560)===0&&(dn=4194304),e}function Il(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function hr(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function oh(e,t,n,a,i,l){var u=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var M=e.entanglements,G=e.expirationTimes,le=e.hiddenUpdates;for(n=u&~n;0<n;){var fe=31-rt(n),ge=1<<fe;M[fe]=0,G[fe]=-1;var se=le[fe];if(se!==null)for(le[fe]=null,fe=0;fe<se.length;fe++){var de=se[fe];de!==null&&(de.lane&=-536870913)}n&=~ge}a!==0&&Cc(e,a,0),l!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=l&~(u&~t))}function Cc(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var a=31-rt(t);e.entangledLanes|=t,e.entanglements[a]=e.entanglements[a]|1073741824|n&261930}function Sc(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var a=31-rt(n),i=1<<a;i&t|e[a]&t&&(e[a]|=t),n&=~i}}function wc(e,t){var n=t&-t;return n=(n&42)!==0?1:Ll(n),(n&(e.suspendedLanes|t))!==0?0:n}function Ll(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Ul(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Ac(){var e=Y.p;return e!==0?e:(e=window.event,e===void 0?32:df(e.type))}function kc(e,t){var n=Y.p;try{return Y.p=e,t()}finally{Y.p=n}}var In=Math.random().toString(36).slice(2),vt="__reactFiber$"+In,Dt="__reactProps$"+In,Na="__reactContainer$"+In,Vl="__reactEvents$"+In,sh="__reactListeners$"+In,ch="__reactHandles$"+In,Ec="__reactResources$"+In,gr="__reactMarker$"+In;function Gl(e){delete e[vt],delete e[Dt],delete e[Vl],delete e[sh],delete e[ch]}function Da(e){var t=e[vt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Na]||n[vt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Qm(e);e!==null;){if(n=e[vt])return n;e=Qm(e)}return t}e=n,n=e.parentNode}return null}function ja(e){if(e=e[vt]||e[Na]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function pr(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(x(33))}function Ma(e){var t=e[Ec];return t||(t=e[Ec]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function pt(e){e[gr]=!0}var Tc=new Set,Nc={};function ca(e,t){_a(e,t),_a(e+"Capture",t)}function _a(e,t){for(Nc[e]=t,e=0;e<t.length;e++)Tc.add(t[e])}var dh=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Dc={},jc={};function uh(e){return q.call(jc,e)?!0:q.call(Dc,e)?!1:dh.test(e)?jc[e]=!0:(Dc[e]=!0,!1)}function hi(e,t,n){if(uh(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var a=t.toLowerCase().slice(0,5);if(a!=="data-"&&a!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+n)}}function gi(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+n)}}function xn(e,t,n,a){if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttributeNS(t,n,""+a)}}function Pt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Mc(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function mh(e,t,n){var a=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var i=a.get,l=a.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(u){n=""+u,l.call(this,u)}}),Object.defineProperty(e,t,{enumerable:a.enumerable}),{getValue:function(){return n},setValue:function(u){n=""+u},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Hl(e){if(!e._valueTracker){var t=Mc(e)?"checked":"value";e._valueTracker=mh(e,t,""+e[t])}}function _c(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),a="";return e&&(a=Mc(e)?e.checked?"true":"false":e.value),e=a,e!==n?(t.setValue(e),!0):!1}function pi(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var fh=/[\n"\\]/g;function Qt(e){return e.replace(fh,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function ql(e,t,n,a,i,l,u,M){e.name="",u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"?e.type=u:e.removeAttribute("type"),t!=null?u==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+Pt(t)):e.value!==""+Pt(t)&&(e.value=""+Pt(t)):u!=="submit"&&u!=="reset"||e.removeAttribute("value"),t!=null?$l(e,u,Pt(t)):n!=null?$l(e,u,Pt(n)):a!=null&&e.removeAttribute("value"),i==null&&l!=null&&(e.defaultChecked=!!l),i!=null&&(e.checked=i&&typeof i!="function"&&typeof i!="symbol"),M!=null&&typeof M!="function"&&typeof M!="symbol"&&typeof M!="boolean"?e.name=""+Pt(M):e.removeAttribute("name")}function Fc(e,t,n,a,i,l,u,M){if(l!=null&&typeof l!="function"&&typeof l!="symbol"&&typeof l!="boolean"&&(e.type=l),t!=null||n!=null){if(!(l!=="submit"&&l!=="reset"||t!=null)){Hl(e);return}n=n!=null?""+Pt(n):"",t=t!=null?""+Pt(t):n,M||t===e.value||(e.value=t),e.defaultValue=t}a=a??i,a=typeof a!="function"&&typeof a!="symbol"&&!!a,e.checked=M?e.checked:!!a,e.defaultChecked=!!a,u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"&&(e.name=u),Hl(e)}function $l(e,t,n){t==="number"&&pi(e.ownerDocument)===e||e.defaultValue===""+n||(e.defaultValue=""+n)}function Fa(e,t,n,a){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&a&&(e[n].defaultSelected=!0)}else{for(n=""+Pt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,a&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Bc(e,t,n){if(t!=null&&(t=""+Pt(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n!=null?""+Pt(n):""}function zc(e,t,n,a){if(t==null){if(a!=null){if(n!=null)throw Error(x(92));if(J(a)){if(1<a.length)throw Error(x(93));a=a[0]}n=a}n==null&&(n=""),t=n}n=Pt(t),e.defaultValue=n,a=e.textContent,a===n&&a!==""&&a!==null&&(e.value=a),Hl(e)}function Ba(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var hh=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Rc(e,t,n){var a=t.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?a?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":a?e.setProperty(t,n):typeof n!="number"||n===0||hh.has(t)?t==="float"?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function Oc(e,t,n){if(t!=null&&typeof t!="object")throw Error(x(62));if(e=e.style,n!=null){for(var a in n)!n.hasOwnProperty(a)||t!=null&&t.hasOwnProperty(a)||(a.indexOf("--")===0?e.setProperty(a,""):a==="float"?e.cssFloat="":e[a]="");for(var i in t)a=t[i],t.hasOwnProperty(i)&&n[i]!==a&&Rc(e,i,a)}else for(var l in t)t.hasOwnProperty(l)&&Rc(e,l,t[l])}function Pl(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var gh=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),ph=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function xi(e){return ph.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function yn(){}var Ql=null;function Yl(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var za=null,Ra=null;function Ic(e){var t=ja(e);if(t&&(e=t.stateNode)){var n=e[Dt]||null;e:switch(e=t.stateNode,t.type){case"input":if(ql(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+Qt(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var a=n[t];if(a!==e&&a.form===e.form){var i=a[Dt]||null;if(!i)throw Error(x(90));ql(a,i.value,i.defaultValue,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name)}}for(t=0;t<n.length;t++)a=n[t],a.form===e.form&&_c(a)}break e;case"textarea":Bc(e,n.value,n.defaultValue);break e;case"select":t=n.value,t!=null&&Fa(e,!!n.multiple,t,!1)}}}var Zl=!1;function Lc(e,t,n){if(Zl)return e(t,n);Zl=!0;try{var a=e(t);return a}finally{if(Zl=!1,(za!==null||Ra!==null)&&(rl(),za&&(t=za,e=Ra,Ra=za=null,Ic(t),e)))for(t=0;t<e.length;t++)Ic(e[t])}}function xr(e,t){var n=e.stateNode;if(n===null)return null;var a=n[Dt]||null;if(a===null)return null;n=a[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(e=e.type,a=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!a;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(x(231,t,typeof n));return n}var bn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Kl=!1;if(bn)try{var yr={};Object.defineProperty(yr,"passive",{get:function(){Kl=!0}}),window.addEventListener("test",yr,yr),window.removeEventListener("test",yr,yr)}catch{Kl=!1}var Ln=null,Xl=null,yi=null;function Uc(){if(yi)return yi;var e,t=Xl,n=t.length,a,i="value"in Ln?Ln.value:Ln.textContent,l=i.length;for(e=0;e<n&&t[e]===i[e];e++);var u=n-e;for(a=1;a<=u&&t[n-a]===i[l-a];a++);return yi=i.slice(e,1<a?1-a:void 0)}function bi(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function vi(){return!0}function Vc(){return!1}function jt(e){function t(n,a,i,l,u){this._reactName=n,this._targetInst=i,this.type=a,this.nativeEvent=l,this.target=u,this.currentTarget=null;for(var M in e)e.hasOwnProperty(M)&&(n=e[M],this[M]=n?n(l):l[M]);return this.isDefaultPrevented=(l.defaultPrevented!=null?l.defaultPrevented:l.returnValue===!1)?vi:Vc,this.isPropagationStopped=Vc,this}return S(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=vi)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=vi)},persist:function(){},isPersistent:vi}),t}var da={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ci=jt(da),br=S({},da,{view:0,detail:0}),xh=jt(br),Wl,Jl,vr,Si=S({},br,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:to,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==vr&&(vr&&e.type==="mousemove"?(Wl=e.screenX-vr.screenX,Jl=e.screenY-vr.screenY):Jl=Wl=0,vr=e),Wl)},movementY:function(e){return"movementY"in e?e.movementY:Jl}}),Gc=jt(Si),yh=S({},Si,{dataTransfer:0}),bh=jt(yh),vh=S({},br,{relatedTarget:0}),eo=jt(vh),Ch=S({},da,{animationName:0,elapsedTime:0,pseudoElement:0}),Sh=jt(Ch),wh=S({},da,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Ah=jt(wh),kh=S({},da,{data:0}),Hc=jt(kh),Eh={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Th={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Nh={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Dh(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Nh[e])?!!t[e]:!1}function to(){return Dh}var jh=S({},br,{key:function(e){if(e.key){var t=Eh[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=bi(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Th[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:to,charCode:function(e){return e.type==="keypress"?bi(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?bi(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Mh=jt(jh),_h=S({},Si,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),qc=jt(_h),Fh=S({},br,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:to}),Bh=jt(Fh),zh=S({},da,{propertyName:0,elapsedTime:0,pseudoElement:0}),Rh=jt(zh),Oh=S({},Si,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Ih=jt(Oh),Lh=S({},da,{newState:0,oldState:0}),Uh=jt(Lh),Vh=[9,13,27,32],no=bn&&"CompositionEvent"in window,Cr=null;bn&&"documentMode"in document&&(Cr=document.documentMode);var Gh=bn&&"TextEvent"in window&&!Cr,$c=bn&&(!no||Cr&&8<Cr&&11>=Cr),Pc=" ",Qc=!1;function Yc(e,t){switch(e){case"keyup":return Vh.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Zc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Oa=!1;function Hh(e,t){switch(e){case"compositionend":return Zc(t);case"keypress":return t.which!==32?null:(Qc=!0,Pc);case"textInput":return e=t.data,e===Pc&&Qc?null:e;default:return null}}function qh(e,t){if(Oa)return e==="compositionend"||!no&&Yc(e,t)?(e=Uc(),yi=Xl=Ln=null,Oa=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return $c&&t.locale!=="ko"?null:t.data;default:return null}}var $h={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Kc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!$h[e.type]:t==="textarea"}function Xc(e,t,n,a){za?Ra?Ra.push(a):Ra=[a]:za=a,t=ul(t,"onChange"),0<t.length&&(n=new Ci("onChange","change",null,n,a),e.push({event:n,listeners:t}))}var Sr=null,wr=null;function Ph(e){Fm(e,0)}function wi(e){var t=pr(e);if(_c(t))return e}function Wc(e,t){if(e==="change")return t}var Jc=!1;if(bn){var ao;if(bn){var ro="oninput"in document;if(!ro){var ed=document.createElement("div");ed.setAttribute("oninput","return;"),ro=typeof ed.oninput=="function"}ao=ro}else ao=!1;Jc=ao&&(!document.documentMode||9<document.documentMode)}function td(){Sr&&(Sr.detachEvent("onpropertychange",nd),wr=Sr=null)}function nd(e){if(e.propertyName==="value"&&wi(wr)){var t=[];Xc(t,wr,e,Yl(e)),Lc(Ph,t)}}function Qh(e,t,n){e==="focusin"?(td(),Sr=t,wr=n,Sr.attachEvent("onpropertychange",nd)):e==="focusout"&&td()}function Yh(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return wi(wr)}function Zh(e,t){if(e==="click")return wi(t)}function Kh(e,t){if(e==="input"||e==="change")return wi(t)}function Xh(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ot=typeof Object.is=="function"?Object.is:Xh;function Ar(e,t){if(Ot(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),a=Object.keys(t);if(n.length!==a.length)return!1;for(a=0;a<n.length;a++){var i=n[a];if(!q.call(t,i)||!Ot(e[i],t[i]))return!1}return!0}function ad(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function rd(e,t){var n=ad(e);e=0;for(var a;n;){if(n.nodeType===3){if(a=e+n.textContent.length,e<=t&&a>=t)return{node:n,offset:t-e};e=a}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=ad(n)}}function id(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?id(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function ld(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=pi(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=pi(e.document)}return t}function io(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var Wh=bn&&"documentMode"in document&&11>=document.documentMode,Ia=null,lo=null,kr=null,oo=!1;function od(e,t,n){var a=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;oo||Ia==null||Ia!==pi(a)||(a=Ia,"selectionStart"in a&&io(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),kr&&Ar(kr,a)||(kr=a,a=ul(lo,"onSelect"),0<a.length&&(t=new Ci("onSelect","select",null,t,n),e.push({event:t,listeners:a}),t.target=Ia)))}function ua(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var La={animationend:ua("Animation","AnimationEnd"),animationiteration:ua("Animation","AnimationIteration"),animationstart:ua("Animation","AnimationStart"),transitionrun:ua("Transition","TransitionRun"),transitionstart:ua("Transition","TransitionStart"),transitioncancel:ua("Transition","TransitionCancel"),transitionend:ua("Transition","TransitionEnd")},so={},sd={};bn&&(sd=document.createElement("div").style,"AnimationEvent"in window||(delete La.animationend.animation,delete La.animationiteration.animation,delete La.animationstart.animation),"TransitionEvent"in window||delete La.transitionend.transition);function ma(e){if(so[e])return so[e];if(!La[e])return e;var t=La[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in sd)return so[e]=t[n];return e}var cd=ma("animationend"),dd=ma("animationiteration"),ud=ma("animationstart"),Jh=ma("transitionrun"),eg=ma("transitionstart"),tg=ma("transitioncancel"),md=ma("transitionend"),fd=new Map,co="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");co.push("scrollEnd");function rn(e,t){fd.set(e,t),ca(t,[e])}var Ai=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Yt=[],Ua=0,uo=0;function ki(){for(var e=Ua,t=uo=Ua=0;t<e;){var n=Yt[t];Yt[t++]=null;var a=Yt[t];Yt[t++]=null;var i=Yt[t];Yt[t++]=null;var l=Yt[t];if(Yt[t++]=null,a!==null&&i!==null){var u=a.pending;u===null?i.next=i:(i.next=u.next,u.next=i),a.pending=i}l!==0&&hd(n,i,l)}}function Ei(e,t,n,a){Yt[Ua++]=e,Yt[Ua++]=t,Yt[Ua++]=n,Yt[Ua++]=a,uo|=a,e.lanes|=a,e=e.alternate,e!==null&&(e.lanes|=a)}function mo(e,t,n,a){return Ei(e,t,n,a),Ti(e)}function fa(e,t){return Ei(e,null,null,t),Ti(e)}function hd(e,t,n){e.lanes|=n;var a=e.alternate;a!==null&&(a.lanes|=n);for(var i=!1,l=e.return;l!==null;)l.childLanes|=n,a=l.alternate,a!==null&&(a.childLanes|=n),l.tag===22&&(e=l.stateNode,e===null||e._visibility&1||(i=!0)),e=l,l=l.return;return e.tag===3?(l=e.stateNode,i&&t!==null&&(i=31-rt(n),e=l.hiddenUpdates,a=e[i],a===null?e[i]=[t]:a.push(t),t.lane=n|536870912),l):null}function Ti(e){if(50<Qr)throw Qr=0,Cs=null,Error(x(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Va={};function ng(e,t,n,a){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function It(e,t,n,a){return new ng(e,t,n,a)}function fo(e){return e=e.prototype,!(!e||!e.isReactComponent)}function vn(e,t){var n=e.alternate;return n===null?(n=It(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function gd(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Ni(e,t,n,a,i,l){var u=0;if(a=e,typeof e=="function")fo(e)&&(u=1);else if(typeof e=="string")u=op(e,n,X.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case U:return e=It(31,n,t,i),e.elementType=U,e.lanes=l,e;case y:return ha(n.children,i,l,t);case N:u=8,i|=24;break;case E:return e=It(12,n,t,i|2),e.elementType=E,e.lanes=l,e;case T:return e=It(13,n,t,i),e.elementType=T,e.lanes=l,e;case L:return e=It(19,n,t,i),e.elementType=L,e.lanes=l,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case R:u=10;break e;case D:u=9;break e;case A:u=11;break e;case V:u=14;break e;case Z:u=16,a=null;break e}u=29,n=Error(x(130,e===null?"null":typeof e,"")),a=null}return t=It(u,n,t,i),t.elementType=e,t.type=a,t.lanes=l,t}function ha(e,t,n,a){return e=It(7,e,a,t),e.lanes=n,e}function ho(e,t,n){return e=It(6,e,null,t),e.lanes=n,e}function pd(e){var t=It(18,null,null,0);return t.stateNode=e,t}function go(e,t,n){return t=It(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var xd=new WeakMap;function Zt(e,t){if(typeof e=="object"&&e!==null){var n=xd.get(e);return n!==void 0?n:(t={value:e,source:t,stack:F(t)},xd.set(e,t),t)}return{value:e,source:t,stack:F(t)}}var Ga=[],Ha=0,Di=null,Er=0,Kt=[],Xt=0,Un=null,un=1,mn="";function Cn(e,t){Ga[Ha++]=Er,Ga[Ha++]=Di,Di=e,Er=t}function yd(e,t,n){Kt[Xt++]=un,Kt[Xt++]=mn,Kt[Xt++]=Un,Un=e;var a=un;e=mn;var i=32-rt(a)-1;a&=~(1<<i),n+=1;var l=32-rt(t)+i;if(30<l){var u=i-i%5;l=(a&(1<<u)-1).toString(32),a>>=u,i-=u,un=1<<32-rt(t)+i|n<<i|a,mn=l+e}else un=1<<l|n<<i|a,mn=e}function po(e){e.return!==null&&(Cn(e,1),yd(e,1,0))}function xo(e){for(;e===Di;)Di=Ga[--Ha],Ga[Ha]=null,Er=Ga[--Ha],Ga[Ha]=null;for(;e===Un;)Un=Kt[--Xt],Kt[Xt]=null,mn=Kt[--Xt],Kt[Xt]=null,un=Kt[--Xt],Kt[Xt]=null}function bd(e,t){Kt[Xt++]=un,Kt[Xt++]=mn,Kt[Xt++]=Un,un=t.id,mn=t.overflow,Un=e}var Ct=null,et=null,Ge=!1,Vn=null,Wt=!1,yo=Error(x(519));function Gn(e){var t=Error(x(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Tr(Zt(t,e)),yo}function vd(e){var t=e.stateNode,n=e.type,a=e.memoizedProps;switch(t[vt]=e,t[Dt]=a,n){case"dialog":Ie("cancel",t),Ie("close",t);break;case"iframe":case"object":case"embed":Ie("load",t);break;case"video":case"audio":for(n=0;n<Zr.length;n++)Ie(Zr[n],t);break;case"source":Ie("error",t);break;case"img":case"image":case"link":Ie("error",t),Ie("load",t);break;case"details":Ie("toggle",t);break;case"input":Ie("invalid",t),Fc(t,a.value,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name,!0);break;case"select":Ie("invalid",t);break;case"textarea":Ie("invalid",t),zc(t,a.value,a.defaultValue,a.children)}n=a.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||t.textContent===""+n||a.suppressHydrationWarning===!0||Om(t.textContent,n)?(a.popover!=null&&(Ie("beforetoggle",t),Ie("toggle",t)),a.onScroll!=null&&Ie("scroll",t),a.onScrollEnd!=null&&Ie("scrollend",t),a.onClick!=null&&(t.onclick=yn),t=!0):t=!1,t||Gn(e,!0)}function Cd(e){for(Ct=e.return;Ct;)switch(Ct.tag){case 5:case 31:case 13:Wt=!1;return;case 27:case 3:Wt=!0;return;default:Ct=Ct.return}}function qa(e){if(e!==Ct)return!1;if(!Ge)return Cd(e),Ge=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!=="form"&&n!=="button")||Rs(e.type,e.memoizedProps)),n=!n),n&&et&&Gn(e),Cd(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(x(317));et=Pm(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(x(317));et=Pm(e)}else t===27?(t=et,na(e.type)?(e=Vs,Vs=null,et=e):et=t):et=Ct?en(e.stateNode.nextSibling):null;return!0}function ga(){et=Ct=null,Ge=!1}function bo(){var e=Vn;return e!==null&&(Bt===null?Bt=e:Bt.push.apply(Bt,e),Vn=null),e}function Tr(e){Vn===null?Vn=[e]:Vn.push(e)}var vo=o(null),pa=null,Sn=null;function Hn(e,t,n){K(vo,t._currentValue),t._currentValue=n}function wn(e){e._currentValue=vo.current,_(vo)}function Co(e,t,n){for(;e!==null;){var a=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,a!==null&&(a.childLanes|=t)):a!==null&&(a.childLanes&t)!==t&&(a.childLanes|=t),e===n)break;e=e.return}}function So(e,t,n,a){var i=e.child;for(i!==null&&(i.return=e);i!==null;){var l=i.dependencies;if(l!==null){var u=i.child;l=l.firstContext;e:for(;l!==null;){var M=l;l=i;for(var G=0;G<t.length;G++)if(M.context===t[G]){l.lanes|=n,M=l.alternate,M!==null&&(M.lanes|=n),Co(l.return,n,e),a||(u=null);break e}l=M.next}}else if(i.tag===18){if(u=i.return,u===null)throw Error(x(341));u.lanes|=n,l=u.alternate,l!==null&&(l.lanes|=n),Co(u,n,e),u=null}else u=i.child;if(u!==null)u.return=i;else for(u=i;u!==null;){if(u===e){u=null;break}if(i=u.sibling,i!==null){i.return=u.return,u=i;break}u=u.return}i=u}}function $a(e,t,n,a){e=null;for(var i=t,l=!1;i!==null;){if(!l){if((i.flags&524288)!==0)l=!0;else if((i.flags&262144)!==0)break}if(i.tag===10){var u=i.alternate;if(u===null)throw Error(x(387));if(u=u.memoizedProps,u!==null){var M=i.type;Ot(i.pendingProps.value,u.value)||(e!==null?e.push(M):e=[M])}}else if(i===xe.current){if(u=i.alternate,u===null)throw Error(x(387));u.memoizedState.memoizedState!==i.memoizedState.memoizedState&&(e!==null?e.push(ei):e=[ei])}i=i.return}e!==null&&So(t,e,n,a),t.flags|=262144}function ji(e){for(e=e.firstContext;e!==null;){if(!Ot(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function xa(e){pa=e,Sn=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function St(e){return Sd(pa,e)}function Mi(e,t){return pa===null&&xa(e),Sd(e,t)}function Sd(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Sn===null){if(e===null)throw Error(x(308));Sn=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Sn=Sn.next=t;return n}var ag=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(n,a){e.push(a)}};this.abort=function(){t.aborted=!0,e.forEach(function(n){return n()})}},rg=B.unstable_scheduleCallback,ig=B.unstable_NormalPriority,ct={$$typeof:R,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function wo(){return{controller:new ag,data:new Map,refCount:0}}function Nr(e){e.refCount--,e.refCount===0&&rg(ig,function(){e.controller.abort()})}var Dr=null,Ao=0,Pa=0,Qa=null;function lg(e,t){if(Dr===null){var n=Dr=[];Ao=0,Pa=Ts(),Qa={status:"pending",value:void 0,then:function(a){n.push(a)}}}return Ao++,t.then(wd,wd),t}function wd(){if(--Ao===0&&Dr!==null){Qa!==null&&(Qa.status="fulfilled");var e=Dr;Dr=null,Pa=0,Qa=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function og(e,t){var n=[],a={status:"pending",value:null,reason:null,then:function(i){n.push(i)}};return e.then(function(){a.status="fulfilled",a.value=t;for(var i=0;i<n.length;i++)(0,n[i])(t)},function(i){for(a.status="rejected",a.reason=i,i=0;i<n.length;i++)(0,n[i])(void 0)}),a}var Ad=Q.S;Q.S=function(e,t){om=we(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&lg(e,t),Ad!==null&&Ad(e,t)};var ya=o(null);function ko(){var e=ya.current;return e!==null?e:Je.pooledCache}function _i(e,t){t===null?K(ya,ya.current):K(ya,t.pool)}function kd(){var e=ko();return e===null?null:{parent:ct._currentValue,pool:e}}var Ya=Error(x(460)),Eo=Error(x(474)),Fi=Error(x(542)),Bi={then:function(){}};function Ed(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Td(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(yn,yn),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Dd(e),e;default:if(typeof t.status=="string")t.then(yn,yn);else{if(e=Je,e!==null&&100<e.shellSuspendCounter)throw Error(x(482));e=t,e.status="pending",e.then(function(a){if(t.status==="pending"){var i=t;i.status="fulfilled",i.value=a}},function(a){if(t.status==="pending"){var i=t;i.status="rejected",i.reason=a}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Dd(e),e}throw va=t,Ya}}function ba(e){try{var t=e._init;return t(e._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(va=n,Ya):n}}var va=null;function Nd(){if(va===null)throw Error(x(459));var e=va;return va=null,e}function Dd(e){if(e===Ya||e===Fi)throw Error(x(483))}var Za=null,jr=0;function zi(e){var t=jr;return jr+=1,Za===null&&(Za=[]),Td(Za,e,t)}function Mr(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Ri(e,t){throw t.$$typeof===j?Error(x(525)):(e=Object.prototype.toString.call(t),Error(x(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function jd(e){function t(ee,$){if(e){var re=ee.deletions;re===null?(ee.deletions=[$],ee.flags|=16):re.push($)}}function n(ee,$){if(!e)return null;for(;$!==null;)t(ee,$),$=$.sibling;return null}function a(ee){for(var $=new Map;ee!==null;)ee.key!==null?$.set(ee.key,ee):$.set(ee.index,ee),ee=ee.sibling;return $}function i(ee,$){return ee=vn(ee,$),ee.index=0,ee.sibling=null,ee}function l(ee,$,re){return ee.index=re,e?(re=ee.alternate,re!==null?(re=re.index,re<$?(ee.flags|=67108866,$):re):(ee.flags|=67108866,$)):(ee.flags|=1048576,$)}function u(ee){return e&&ee.alternate===null&&(ee.flags|=67108866),ee}function M(ee,$,re,he){return $===null||$.tag!==6?($=ho(re,ee.mode,he),$.return=ee,$):($=i($,re),$.return=ee,$)}function G(ee,$,re,he){var De=re.type;return De===y?fe(ee,$,re.props.children,he,re.key):$!==null&&($.elementType===De||typeof De=="object"&&De!==null&&De.$$typeof===Z&&ba(De)===$.type)?($=i($,re.props),Mr($,re),$.return=ee,$):($=Ni(re.type,re.key,re.props,null,ee.mode,he),Mr($,re),$.return=ee,$)}function le(ee,$,re,he){return $===null||$.tag!==4||$.stateNode.containerInfo!==re.containerInfo||$.stateNode.implementation!==re.implementation?($=go(re,ee.mode,he),$.return=ee,$):($=i($,re.children||[]),$.return=ee,$)}function fe(ee,$,re,he,De){return $===null||$.tag!==7?($=ha(re,ee.mode,he,De),$.return=ee,$):($=i($,re),$.return=ee,$)}function ge(ee,$,re){if(typeof $=="string"&&$!==""||typeof $=="number"||typeof $=="bigint")return $=ho(""+$,ee.mode,re),$.return=ee,$;if(typeof $=="object"&&$!==null){switch($.$$typeof){case m:return re=Ni($.type,$.key,$.props,null,ee.mode,re),Mr(re,$),re.return=ee,re;case C:return $=go($,ee.mode,re),$.return=ee,$;case Z:return $=ba($),ge(ee,$,re)}if(J($)||I($))return $=ha($,ee.mode,re,null),$.return=ee,$;if(typeof $.then=="function")return ge(ee,zi($),re);if($.$$typeof===R)return ge(ee,Mi(ee,$),re);Ri(ee,$)}return null}function se(ee,$,re,he){var De=$!==null?$.key:null;if(typeof re=="string"&&re!==""||typeof re=="number"||typeof re=="bigint")return De!==null?null:M(ee,$,""+re,he);if(typeof re=="object"&&re!==null){switch(re.$$typeof){case m:return re.key===De?G(ee,$,re,he):null;case C:return re.key===De?le(ee,$,re,he):null;case Z:return re=ba(re),se(ee,$,re,he)}if(J(re)||I(re))return De!==null?null:fe(ee,$,re,he,null);if(typeof re.then=="function")return se(ee,$,zi(re),he);if(re.$$typeof===R)return se(ee,$,Mi(ee,re),he);Ri(ee,re)}return null}function de(ee,$,re,he,De){if(typeof he=="string"&&he!==""||typeof he=="number"||typeof he=="bigint")return ee=ee.get(re)||null,M($,ee,""+he,De);if(typeof he=="object"&&he!==null){switch(he.$$typeof){case m:return ee=ee.get(he.key===null?re:he.key)||null,G($,ee,he,De);case C:return ee=ee.get(he.key===null?re:he.key)||null,le($,ee,he,De);case Z:return he=ba(he),de(ee,$,re,he,De)}if(J(he)||I(he))return ee=ee.get(re)||null,fe($,ee,he,De,null);if(typeof he.then=="function")return de(ee,$,re,zi(he),De);if(he.$$typeof===R)return de(ee,$,re,Mi($,he),De);Ri($,he)}return null}function Ae(ee,$,re,he){for(var De=null,He=null,ke=$,Re=$=0,Ve=null;ke!==null&&Re<re.length;Re++){ke.index>Re?(Ve=ke,ke=null):Ve=ke.sibling;var qe=se(ee,ke,re[Re],he);if(qe===null){ke===null&&(ke=Ve);break}e&&ke&&qe.alternate===null&&t(ee,ke),$=l(qe,$,Re),He===null?De=qe:He.sibling=qe,He=qe,ke=Ve}if(Re===re.length)return n(ee,ke),Ge&&Cn(ee,Re),De;if(ke===null){for(;Re<re.length;Re++)ke=ge(ee,re[Re],he),ke!==null&&($=l(ke,$,Re),He===null?De=ke:He.sibling=ke,He=ke);return Ge&&Cn(ee,Re),De}for(ke=a(ke);Re<re.length;Re++)Ve=de(ke,ee,Re,re[Re],he),Ve!==null&&(e&&Ve.alternate!==null&&ke.delete(Ve.key===null?Re:Ve.key),$=l(Ve,$,Re),He===null?De=Ve:He.sibling=Ve,He=Ve);return e&&ke.forEach(function(oa){return t(ee,oa)}),Ge&&Cn(ee,Re),De}function Me(ee,$,re,he){if(re==null)throw Error(x(151));for(var De=null,He=null,ke=$,Re=$=0,Ve=null,qe=re.next();ke!==null&&!qe.done;Re++,qe=re.next()){ke.index>Re?(Ve=ke,ke=null):Ve=ke.sibling;var oa=se(ee,ke,qe.value,he);if(oa===null){ke===null&&(ke=Ve);break}e&&ke&&oa.alternate===null&&t(ee,ke),$=l(oa,$,Re),He===null?De=oa:He.sibling=oa,He=oa,ke=Ve}if(qe.done)return n(ee,ke),Ge&&Cn(ee,Re),De;if(ke===null){for(;!qe.done;Re++,qe=re.next())qe=ge(ee,qe.value,he),qe!==null&&($=l(qe,$,Re),He===null?De=qe:He.sibling=qe,He=qe);return Ge&&Cn(ee,Re),De}for(ke=a(ke);!qe.done;Re++,qe=re.next())qe=de(ke,ee,Re,qe.value,he),qe!==null&&(e&&qe.alternate!==null&&ke.delete(qe.key===null?Re:qe.key),$=l(qe,$,Re),He===null?De=qe:He.sibling=qe,He=qe);return e&&ke.forEach(function(yp){return t(ee,yp)}),Ge&&Cn(ee,Re),De}function We(ee,$,re,he){if(typeof re=="object"&&re!==null&&re.type===y&&re.key===null&&(re=re.props.children),typeof re=="object"&&re!==null){switch(re.$$typeof){case m:e:{for(var De=re.key;$!==null;){if($.key===De){if(De=re.type,De===y){if($.tag===7){n(ee,$.sibling),he=i($,re.props.children),he.return=ee,ee=he;break e}}else if($.elementType===De||typeof De=="object"&&De!==null&&De.$$typeof===Z&&ba(De)===$.type){n(ee,$.sibling),he=i($,re.props),Mr(he,re),he.return=ee,ee=he;break e}n(ee,$);break}else t(ee,$);$=$.sibling}re.type===y?(he=ha(re.props.children,ee.mode,he,re.key),he.return=ee,ee=he):(he=Ni(re.type,re.key,re.props,null,ee.mode,he),Mr(he,re),he.return=ee,ee=he)}return u(ee);case C:e:{for(De=re.key;$!==null;){if($.key===De)if($.tag===4&&$.stateNode.containerInfo===re.containerInfo&&$.stateNode.implementation===re.implementation){n(ee,$.sibling),he=i($,re.children||[]),he.return=ee,ee=he;break e}else{n(ee,$);break}else t(ee,$);$=$.sibling}he=go(re,ee.mode,he),he.return=ee,ee=he}return u(ee);case Z:return re=ba(re),We(ee,$,re,he)}if(J(re))return Ae(ee,$,re,he);if(I(re)){if(De=I(re),typeof De!="function")throw Error(x(150));return re=De.call(re),Me(ee,$,re,he)}if(typeof re.then=="function")return We(ee,$,zi(re),he);if(re.$$typeof===R)return We(ee,$,Mi(ee,re),he);Ri(ee,re)}return typeof re=="string"&&re!==""||typeof re=="number"||typeof re=="bigint"?(re=""+re,$!==null&&$.tag===6?(n(ee,$.sibling),he=i($,re),he.return=ee,ee=he):(n(ee,$),he=ho(re,ee.mode,he),he.return=ee,ee=he),u(ee)):n(ee,$)}return function(ee,$,re,he){try{jr=0;var De=We(ee,$,re,he);return Za=null,De}catch(ke){if(ke===Ya||ke===Fi)throw ke;var He=It(29,ke,null,ee.mode);return He.lanes=he,He.return=ee,He}finally{}}}var Ca=jd(!0),Md=jd(!1),qn=!1;function To(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function No(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function $n(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Pn(e,t,n){var a=e.updateQueue;if(a===null)return null;if(a=a.shared,(Pe&2)!==0){var i=a.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),a.pending=t,t=Ti(e),hd(e,null,n),t}return Ei(e,a,t,n),Ti(e)}function _r(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194048)!==0)){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,Sc(e,n)}}function Do(e,t){var n=e.updateQueue,a=e.alternate;if(a!==null&&(a=a.updateQueue,n===a)){var i=null,l=null;if(n=n.firstBaseUpdate,n!==null){do{var u={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};l===null?i=l=u:l=l.next=u,n=n.next}while(n!==null);l===null?i=l=t:l=l.next=t}else i=l=t;n={baseState:a.baseState,firstBaseUpdate:i,lastBaseUpdate:l,shared:a.shared,callbacks:a.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var jo=!1;function Fr(){if(jo){var e=Qa;if(e!==null)throw e}}function Br(e,t,n,a){jo=!1;var i=e.updateQueue;qn=!1;var l=i.firstBaseUpdate,u=i.lastBaseUpdate,M=i.shared.pending;if(M!==null){i.shared.pending=null;var G=M,le=G.next;G.next=null,u===null?l=le:u.next=le,u=G;var fe=e.alternate;fe!==null&&(fe=fe.updateQueue,M=fe.lastBaseUpdate,M!==u&&(M===null?fe.firstBaseUpdate=le:M.next=le,fe.lastBaseUpdate=G))}if(l!==null){var ge=i.baseState;u=0,fe=le=G=null,M=l;do{var se=M.lane&-536870913,de=se!==M.lane;if(de?(Ue&se)===se:(a&se)===se){se!==0&&se===Pa&&(jo=!0),fe!==null&&(fe=fe.next={lane:0,tag:M.tag,payload:M.payload,callback:null,next:null});e:{var Ae=e,Me=M;se=t;var We=n;switch(Me.tag){case 1:if(Ae=Me.payload,typeof Ae=="function"){ge=Ae.call(We,ge,se);break e}ge=Ae;break e;case 3:Ae.flags=Ae.flags&-65537|128;case 0:if(Ae=Me.payload,se=typeof Ae=="function"?Ae.call(We,ge,se):Ae,se==null)break e;ge=S({},ge,se);break e;case 2:qn=!0}}se=M.callback,se!==null&&(e.flags|=64,de&&(e.flags|=8192),de=i.callbacks,de===null?i.callbacks=[se]:de.push(se))}else de={lane:se,tag:M.tag,payload:M.payload,callback:M.callback,next:null},fe===null?(le=fe=de,G=ge):fe=fe.next=de,u|=se;if(M=M.next,M===null){if(M=i.shared.pending,M===null)break;de=M,M=de.next,de.next=null,i.lastBaseUpdate=de,i.shared.pending=null}}while(!0);fe===null&&(G=ge),i.baseState=G,i.firstBaseUpdate=le,i.lastBaseUpdate=fe,l===null&&(i.shared.lanes=0),Xn|=u,e.lanes=u,e.memoizedState=ge}}function _d(e,t){if(typeof e!="function")throw Error(x(191,e));e.call(t)}function Fd(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)_d(n[e],t)}var Ka=o(null),Oi=o(0);function Bd(e,t){e=_n,K(Oi,e),K(Ka,t),_n=e|t.baseLanes}function Mo(){K(Oi,_n),K(Ka,Ka.current)}function _o(){_n=Oi.current,_(Ka),_(Oi)}var Lt=o(null),Jt=null;function Qn(e){var t=e.alternate;K(ot,ot.current&1),K(Lt,e),Jt===null&&(t===null||Ka.current!==null||t.memoizedState!==null)&&(Jt=e)}function Fo(e){K(ot,ot.current),K(Lt,e),Jt===null&&(Jt=e)}function zd(e){e.tag===22?(K(ot,ot.current),K(Lt,e),Jt===null&&(Jt=e)):Yn()}function Yn(){K(ot,ot.current),K(Lt,Lt.current)}function Ut(e){_(Lt),Jt===e&&(Jt=null),_(ot)}var ot=o(0);function Ii(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||Ls(n)||Us(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var An=0,Be=null,Ke=null,dt=null,Li=!1,Xa=!1,Sa=!1,Ui=0,zr=0,Wa=null,sg=0;function it(){throw Error(x(321))}function Bo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Ot(e[n],t[n]))return!1;return!0}function zo(e,t,n,a,i,l){return An=l,Be=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Q.H=e===null||e.memoizedState===null?yu:Ko,Sa=!1,l=n(a,i),Sa=!1,Xa&&(l=Od(t,n,a,i)),Rd(e),l}function Rd(e){Q.H=Ir;var t=Ke!==null&&Ke.next!==null;if(An=0,dt=Ke=Be=null,Li=!1,zr=0,Wa=null,t)throw Error(x(300));e===null||ut||(e=e.dependencies,e!==null&&ji(e)&&(ut=!0))}function Od(e,t,n,a){Be=e;var i=0;do{if(Xa&&(Wa=null),zr=0,Xa=!1,25<=i)throw Error(x(301));if(i+=1,dt=Ke=null,e.updateQueue!=null){var l=e.updateQueue;l.lastEffect=null,l.events=null,l.stores=null,l.memoCache!=null&&(l.memoCache.index=0)}Q.H=bu,l=t(n,a)}while(Xa);return l}function cg(){var e=Q.H,t=e.useState()[0];return t=typeof t.then=="function"?Rr(t):t,e=e.useState()[0],(Ke!==null?Ke.memoizedState:null)!==e&&(Be.flags|=1024),t}function Ro(){var e=Ui!==0;return Ui=0,e}function Oo(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Io(e){if(Li){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Li=!1}An=0,dt=Ke=Be=null,Xa=!1,zr=Ui=0,Wa=null}function Nt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return dt===null?Be.memoizedState=dt=e:dt=dt.next=e,dt}function st(){if(Ke===null){var e=Be.alternate;e=e!==null?e.memoizedState:null}else e=Ke.next;var t=dt===null?Be.memoizedState:dt.next;if(t!==null)dt=t,Ke=e;else{if(e===null)throw Be.alternate===null?Error(x(467)):Error(x(310));Ke=e,e={memoizedState:Ke.memoizedState,baseState:Ke.baseState,baseQueue:Ke.baseQueue,queue:Ke.queue,next:null},dt===null?Be.memoizedState=dt=e:dt=dt.next=e}return dt}function Vi(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Rr(e){var t=zr;return zr+=1,Wa===null&&(Wa=[]),e=Td(Wa,e,t),t=Be,(dt===null?t.memoizedState:dt.next)===null&&(t=t.alternate,Q.H=t===null||t.memoizedState===null?yu:Ko),e}function Gi(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Rr(e);if(e.$$typeof===R)return St(e)}throw Error(x(438,String(e)))}function Lo(e){var t=null,n=Be.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var a=Be.alternate;a!==null&&(a=a.updateQueue,a!==null&&(a=a.memoCache,a!=null&&(t={data:a.data.map(function(i){return i.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),n===null&&(n=Vi(),Be.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),a=0;a<e;a++)n[a]=W;return t.index++,n}function kn(e,t){return typeof t=="function"?t(e):t}function Hi(e){var t=st();return Uo(t,Ke,e)}function Uo(e,t,n){var a=e.queue;if(a===null)throw Error(x(311));a.lastRenderedReducer=n;var i=e.baseQueue,l=a.pending;if(l!==null){if(i!==null){var u=i.next;i.next=l.next,l.next=u}t.baseQueue=i=l,a.pending=null}if(l=e.baseState,i===null)e.memoizedState=l;else{t=i.next;var M=u=null,G=null,le=t,fe=!1;do{var ge=le.lane&-536870913;if(ge!==le.lane?(Ue&ge)===ge:(An&ge)===ge){var se=le.revertLane;if(se===0)G!==null&&(G=G.next={lane:0,revertLane:0,gesture:null,action:le.action,hasEagerState:le.hasEagerState,eagerState:le.eagerState,next:null}),ge===Pa&&(fe=!0);else if((An&se)===se){le=le.next,se===Pa&&(fe=!0);continue}else ge={lane:0,revertLane:le.revertLane,gesture:null,action:le.action,hasEagerState:le.hasEagerState,eagerState:le.eagerState,next:null},G===null?(M=G=ge,u=l):G=G.next=ge,Be.lanes|=se,Xn|=se;ge=le.action,Sa&&n(l,ge),l=le.hasEagerState?le.eagerState:n(l,ge)}else se={lane:ge,revertLane:le.revertLane,gesture:le.gesture,action:le.action,hasEagerState:le.hasEagerState,eagerState:le.eagerState,next:null},G===null?(M=G=se,u=l):G=G.next=se,Be.lanes|=ge,Xn|=ge;le=le.next}while(le!==null&&le!==t);if(G===null?u=l:G.next=M,!Ot(l,e.memoizedState)&&(ut=!0,fe&&(n=Qa,n!==null)))throw n;e.memoizedState=l,e.baseState=u,e.baseQueue=G,a.lastRenderedState=l}return i===null&&(a.lanes=0),[e.memoizedState,a.dispatch]}function Vo(e){var t=st(),n=t.queue;if(n===null)throw Error(x(311));n.lastRenderedReducer=e;var a=n.dispatch,i=n.pending,l=t.memoizedState;if(i!==null){n.pending=null;var u=i=i.next;do l=e(l,u.action),u=u.next;while(u!==i);Ot(l,t.memoizedState)||(ut=!0),t.memoizedState=l,t.baseQueue===null&&(t.baseState=l),n.lastRenderedState=l}return[l,a]}function Id(e,t,n){var a=Be,i=st(),l=Ge;if(l){if(n===void 0)throw Error(x(407));n=n()}else n=t();var u=!Ot((Ke||i).memoizedState,n);if(u&&(i.memoizedState=n,ut=!0),i=i.queue,qo(Vd.bind(null,a,i,e),[e]),i.getSnapshot!==t||u||dt!==null&&dt.memoizedState.tag&1){if(a.flags|=2048,Ja(9,{destroy:void 0},Ud.bind(null,a,i,n,t),null),Je===null)throw Error(x(349));l||(An&127)!==0||Ld(a,t,n)}return n}function Ld(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Be.updateQueue,t===null?(t=Vi(),Be.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Ud(e,t,n,a){t.value=n,t.getSnapshot=a,Gd(t)&&Hd(e)}function Vd(e,t,n){return n(function(){Gd(t)&&Hd(e)})}function Gd(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Ot(e,n)}catch{return!0}}function Hd(e){var t=fa(e,2);t!==null&&zt(t,e,2)}function Go(e){var t=Nt();if(typeof e=="function"){var n=e;if(e=n(),Sa){qt(!0);try{n()}finally{qt(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:kn,lastRenderedState:e},t}function qd(e,t,n,a){return e.baseState=n,Uo(e,Ke,typeof a=="function"?a:kn)}function dg(e,t,n,a,i){if(Pi(e))throw Error(x(485));if(e=t.action,e!==null){var l={payload:i,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(u){l.listeners.push(u)}};Q.T!==null?n(!0):l.isTransition=!1,a(l),n=t.pending,n===null?(l.next=t.pending=l,$d(t,l)):(l.next=n.next,t.pending=n.next=l)}}function $d(e,t){var n=t.action,a=t.payload,i=e.state;if(t.isTransition){var l=Q.T,u={};Q.T=u;try{var M=n(i,a),G=Q.S;G!==null&&G(u,M),Pd(e,t,M)}catch(le){Ho(e,t,le)}finally{l!==null&&u.types!==null&&(l.types=u.types),Q.T=l}}else try{l=n(i,a),Pd(e,t,l)}catch(le){Ho(e,t,le)}}function Pd(e,t,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(a){Qd(e,t,a)},function(a){return Ho(e,t,a)}):Qd(e,t,n)}function Qd(e,t,n){t.status="fulfilled",t.value=n,Yd(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,$d(e,n)))}function Ho(e,t,n){var a=e.pending;if(e.pending=null,a!==null){a=a.next;do t.status="rejected",t.reason=n,Yd(t),t=t.next;while(t!==a)}e.action=null}function Yd(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Zd(e,t){return t}function Kd(e,t){if(Ge){var n=Je.formState;if(n!==null){e:{var a=Be;if(Ge){if(et){t:{for(var i=et,l=Wt;i.nodeType!==8;){if(!l){i=null;break t}if(i=en(i.nextSibling),i===null){i=null;break t}}l=i.data,i=l==="F!"||l==="F"?i:null}if(i){et=en(i.nextSibling),a=i.data==="F!";break e}}Gn(a)}a=!1}a&&(t=n[0])}}return n=Nt(),n.memoizedState=n.baseState=t,a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Zd,lastRenderedState:t},n.queue=a,n=gu.bind(null,Be,a),a.dispatch=n,a=Go(!1),l=Zo.bind(null,Be,!1,a.queue),a=Nt(),i={state:t,dispatch:null,action:e,pending:null},a.queue=i,n=dg.bind(null,Be,i,l,n),i.dispatch=n,a.memoizedState=e,[t,n,!1]}function Xd(e){var t=st();return Wd(t,Ke,e)}function Wd(e,t,n){if(t=Uo(e,t,Zd)[0],e=Hi(kn)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var a=Rr(t)}catch(u){throw u===Ya?Fi:u}else a=t;t=st();var i=t.queue,l=i.dispatch;return n!==t.memoizedState&&(Be.flags|=2048,Ja(9,{destroy:void 0},ug.bind(null,i,n),null)),[a,l,e]}function ug(e,t){e.action=t}function Jd(e){var t=st(),n=Ke;if(n!==null)return Wd(t,n,e);st(),t=t.memoizedState,n=st();var a=n.queue.dispatch;return n.memoizedState=e,[t,a,!1]}function Ja(e,t,n,a){return e={tag:e,create:n,deps:a,inst:t,next:null},t=Be.updateQueue,t===null&&(t=Vi(),Be.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(a=n.next,n.next=e,e.next=a,t.lastEffect=e),e}function eu(){return st().memoizedState}function qi(e,t,n,a){var i=Nt();Be.flags|=e,i.memoizedState=Ja(1|t,{destroy:void 0},n,a===void 0?null:a)}function $i(e,t,n,a){var i=st();a=a===void 0?null:a;var l=i.memoizedState.inst;Ke!==null&&a!==null&&Bo(a,Ke.memoizedState.deps)?i.memoizedState=Ja(t,l,n,a):(Be.flags|=e,i.memoizedState=Ja(1|t,l,n,a))}function tu(e,t){qi(8390656,8,e,t)}function qo(e,t){$i(2048,8,e,t)}function mg(e){Be.flags|=4;var t=Be.updateQueue;if(t===null)t=Vi(),Be.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function nu(e){var t=st().memoizedState;return mg({ref:t,nextImpl:e}),function(){if((Pe&2)!==0)throw Error(x(440));return t.impl.apply(void 0,arguments)}}function au(e,t){return $i(4,2,e,t)}function ru(e,t){return $i(4,4,e,t)}function iu(e,t){if(typeof t=="function"){e=e();var n=t(e);return function(){typeof n=="function"?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function lu(e,t,n){n=n!=null?n.concat([e]):null,$i(4,4,iu.bind(null,t,e),n)}function $o(){}function ou(e,t){var n=st();t=t===void 0?null:t;var a=n.memoizedState;return t!==null&&Bo(t,a[1])?a[0]:(n.memoizedState=[e,t],e)}function su(e,t){var n=st();t=t===void 0?null:t;var a=n.memoizedState;if(t!==null&&Bo(t,a[1]))return a[0];if(a=e(),Sa){qt(!0);try{e()}finally{qt(!1)}}return n.memoizedState=[a,t],a}function Po(e,t,n){return n===void 0||(An&1073741824)!==0&&(Ue&261930)===0?e.memoizedState=t:(e.memoizedState=n,e=cm(),Be.lanes|=e,Xn|=e,n)}function cu(e,t,n,a){return Ot(n,t)?n:Ka.current!==null?(e=Po(e,n,a),Ot(e,t)||(ut=!0),e):(An&42)===0||(An&1073741824)!==0&&(Ue&261930)===0?(ut=!0,e.memoizedState=n):(e=cm(),Be.lanes|=e,Xn|=e,t)}function du(e,t,n,a,i){var l=Y.p;Y.p=l!==0&&8>l?l:8;var u=Q.T,M={};Q.T=M,Zo(e,!1,t,n);try{var G=i(),le=Q.S;if(le!==null&&le(M,G),G!==null&&typeof G=="object"&&typeof G.then=="function"){var fe=og(G,a);Or(e,t,fe,Ht(e))}else Or(e,t,a,Ht(e))}catch(ge){Or(e,t,{then:function(){},status:"rejected",reason:ge},Ht())}finally{Y.p=l,u!==null&&M.types!==null&&(u.types=M.types),Q.T=u}}function fg(){}function Qo(e,t,n,a){if(e.tag!==5)throw Error(x(476));var i=uu(e).queue;du(e,i,t,P,n===null?fg:function(){return mu(e),n(a)})}function uu(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:P,baseState:P,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:kn,lastRenderedState:P},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:kn,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function mu(e){var t=uu(e);t.next===null&&(t=e.alternate.memoizedState),Or(e,t.next.queue,{},Ht())}function Yo(){return St(ei)}function fu(){return st().memoizedState}function hu(){return st().memoizedState}function hg(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=Ht();e=$n(n);var a=Pn(t,e,n);a!==null&&(zt(a,t,n),_r(a,t,n)),t={cache:wo()},e.payload=t;return}t=t.return}}function gg(e,t,n){var a=Ht();n={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Pi(e)?pu(t,n):(n=mo(e,t,n,a),n!==null&&(zt(n,e,a),xu(n,t,a)))}function gu(e,t,n){var a=Ht();Or(e,t,n,a)}function Or(e,t,n,a){var i={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Pi(e))pu(t,i);else{var l=e.alternate;if(e.lanes===0&&(l===null||l.lanes===0)&&(l=t.lastRenderedReducer,l!==null))try{var u=t.lastRenderedState,M=l(u,n);if(i.hasEagerState=!0,i.eagerState=M,Ot(M,u))return Ei(e,t,i,0),Je===null&&ki(),!1}catch{}finally{}if(n=mo(e,t,i,a),n!==null)return zt(n,e,a),xu(n,t,a),!0}return!1}function Zo(e,t,n,a){if(a={lane:2,revertLane:Ts(),gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Pi(e)){if(t)throw Error(x(479))}else t=mo(e,n,a,2),t!==null&&zt(t,e,2)}function Pi(e){var t=e.alternate;return e===Be||t!==null&&t===Be}function pu(e,t){Xa=Li=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function xu(e,t,n){if((n&4194048)!==0){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,Sc(e,n)}}var Ir={readContext:St,use:Gi,useCallback:it,useContext:it,useEffect:it,useImperativeHandle:it,useLayoutEffect:it,useInsertionEffect:it,useMemo:it,useReducer:it,useRef:it,useState:it,useDebugValue:it,useDeferredValue:it,useTransition:it,useSyncExternalStore:it,useId:it,useHostTransitionStatus:it,useFormState:it,useActionState:it,useOptimistic:it,useMemoCache:it,useCacheRefresh:it};Ir.useEffectEvent=it;var yu={readContext:St,use:Gi,useCallback:function(e,t){return Nt().memoizedState=[e,t===void 0?null:t],e},useContext:St,useEffect:tu,useImperativeHandle:function(e,t,n){n=n!=null?n.concat([e]):null,qi(4194308,4,iu.bind(null,t,e),n)},useLayoutEffect:function(e,t){return qi(4194308,4,e,t)},useInsertionEffect:function(e,t){qi(4,2,e,t)},useMemo:function(e,t){var n=Nt();t=t===void 0?null:t;var a=e();if(Sa){qt(!0);try{e()}finally{qt(!1)}}return n.memoizedState=[a,t],a},useReducer:function(e,t,n){var a=Nt();if(n!==void 0){var i=n(t);if(Sa){qt(!0);try{n(t)}finally{qt(!1)}}}else i=t;return a.memoizedState=a.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},a.queue=e,e=e.dispatch=gg.bind(null,Be,e),[a.memoizedState,e]},useRef:function(e){var t=Nt();return e={current:e},t.memoizedState=e},useState:function(e){e=Go(e);var t=e.queue,n=gu.bind(null,Be,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:$o,useDeferredValue:function(e,t){var n=Nt();return Po(n,e,t)},useTransition:function(){var e=Go(!1);return e=du.bind(null,Be,e.queue,!0,!1),Nt().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var a=Be,i=Nt();if(Ge){if(n===void 0)throw Error(x(407));n=n()}else{if(n=t(),Je===null)throw Error(x(349));(Ue&127)!==0||Ld(a,t,n)}i.memoizedState=n;var l={value:n,getSnapshot:t};return i.queue=l,tu(Vd.bind(null,a,l,e),[e]),a.flags|=2048,Ja(9,{destroy:void 0},Ud.bind(null,a,l,n,t),null),n},useId:function(){var e=Nt(),t=Je.identifierPrefix;if(Ge){var n=mn,a=un;n=(a&~(1<<32-rt(a)-1)).toString(32)+n,t="_"+t+"R_"+n,n=Ui++,0<n&&(t+="H"+n.toString(32)),t+="_"}else n=sg++,t="_"+t+"r_"+n.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:Yo,useFormState:Kd,useActionState:Kd,useOptimistic:function(e){var t=Nt();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Zo.bind(null,Be,!0,n),n.dispatch=t,[e,t]},useMemoCache:Lo,useCacheRefresh:function(){return Nt().memoizedState=hg.bind(null,Be)},useEffectEvent:function(e){var t=Nt(),n={impl:e};return t.memoizedState=n,function(){if((Pe&2)!==0)throw Error(x(440));return n.impl.apply(void 0,arguments)}}},Ko={readContext:St,use:Gi,useCallback:ou,useContext:St,useEffect:qo,useImperativeHandle:lu,useInsertionEffect:au,useLayoutEffect:ru,useMemo:su,useReducer:Hi,useRef:eu,useState:function(){return Hi(kn)},useDebugValue:$o,useDeferredValue:function(e,t){var n=st();return cu(n,Ke.memoizedState,e,t)},useTransition:function(){var e=Hi(kn)[0],t=st().memoizedState;return[typeof e=="boolean"?e:Rr(e),t]},useSyncExternalStore:Id,useId:fu,useHostTransitionStatus:Yo,useFormState:Xd,useActionState:Xd,useOptimistic:function(e,t){var n=st();return qd(n,Ke,e,t)},useMemoCache:Lo,useCacheRefresh:hu};Ko.useEffectEvent=nu;var bu={readContext:St,use:Gi,useCallback:ou,useContext:St,useEffect:qo,useImperativeHandle:lu,useInsertionEffect:au,useLayoutEffect:ru,useMemo:su,useReducer:Vo,useRef:eu,useState:function(){return Vo(kn)},useDebugValue:$o,useDeferredValue:function(e,t){var n=st();return Ke===null?Po(n,e,t):cu(n,Ke.memoizedState,e,t)},useTransition:function(){var e=Vo(kn)[0],t=st().memoizedState;return[typeof e=="boolean"?e:Rr(e),t]},useSyncExternalStore:Id,useId:fu,useHostTransitionStatus:Yo,useFormState:Jd,useActionState:Jd,useOptimistic:function(e,t){var n=st();return Ke!==null?qd(n,Ke,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:Lo,useCacheRefresh:hu};bu.useEffectEvent=nu;function Xo(e,t,n,a){t=e.memoizedState,n=n(a,t),n=n==null?t:S({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Wo={enqueueSetState:function(e,t,n){e=e._reactInternals;var a=Ht(),i=$n(a);i.payload=t,n!=null&&(i.callback=n),t=Pn(e,i,a),t!==null&&(zt(t,e,a),_r(t,e,a))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var a=Ht(),i=$n(a);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Pn(e,i,a),t!==null&&(zt(t,e,a),_r(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Ht(),a=$n(n);a.tag=2,t!=null&&(a.callback=t),t=Pn(e,a,n),t!==null&&(zt(t,e,n),_r(t,e,n))}};function vu(e,t,n,a,i,l,u){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(a,l,u):t.prototype&&t.prototype.isPureReactComponent?!Ar(n,a)||!Ar(i,l):!0}function Cu(e,t,n,a){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,a),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,a),t.state!==e&&Wo.enqueueReplaceState(t,t.state,null)}function wa(e,t){var n=t;if("ref"in t){n={};for(var a in t)a!=="ref"&&(n[a]=t[a])}if(e=e.defaultProps){n===t&&(n=S({},n));for(var i in e)n[i]===void 0&&(n[i]=e[i])}return n}function Su(e){Ai(e)}function wu(e){console.error(e)}function Au(e){Ai(e)}function Qi(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(a){setTimeout(function(){throw a})}}function ku(e,t,n){try{var a=e.onCaughtError;a(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(i){setTimeout(function(){throw i})}}function Jo(e,t,n){return n=$n(n),n.tag=3,n.payload={element:null},n.callback=function(){Qi(e,t)},n}function Eu(e){return e=$n(e),e.tag=3,e}function Tu(e,t,n,a){var i=n.type.getDerivedStateFromError;if(typeof i=="function"){var l=a.value;e.payload=function(){return i(l)},e.callback=function(){ku(t,n,a)}}var u=n.stateNode;u!==null&&typeof u.componentDidCatch=="function"&&(e.callback=function(){ku(t,n,a),typeof i!="function"&&(Wn===null?Wn=new Set([this]):Wn.add(this));var M=a.stack;this.componentDidCatch(a.value,{componentStack:M!==null?M:""})})}function pg(e,t,n,a,i){if(n.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){if(t=n.alternate,t!==null&&$a(t,n,i,!0),n=Lt.current,n!==null){switch(n.tag){case 31:case 13:return Jt===null?il():n.alternate===null&&lt===0&&(lt=3),n.flags&=-257,n.flags|=65536,n.lanes=i,a===Bi?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([a]):t.add(a),As(e,a,i)),!1;case 22:return n.flags|=65536,a===Bi?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([a])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([a]):n.add(a)),As(e,a,i)),!1}throw Error(x(435,n.tag))}return As(e,a,i),il(),!1}if(Ge)return t=Lt.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=i,a!==yo&&(e=Error(x(422),{cause:a}),Tr(Zt(e,n)))):(a!==yo&&(t=Error(x(423),{cause:a}),Tr(Zt(t,n))),e=e.current.alternate,e.flags|=65536,i&=-i,e.lanes|=i,a=Zt(a,n),i=Jo(e.stateNode,a,i),Do(e,i),lt!==4&&(lt=2)),!1;var l=Error(x(520),{cause:a});if(l=Zt(l,n),Pr===null?Pr=[l]:Pr.push(l),lt!==4&&(lt=2),t===null)return!0;a=Zt(a,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=i&-i,n.lanes|=e,e=Jo(n.stateNode,a,e),Do(n,e),!1;case 1:if(t=n.type,l=n.stateNode,(n.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||l!==null&&typeof l.componentDidCatch=="function"&&(Wn===null||!Wn.has(l))))return n.flags|=65536,i&=-i,n.lanes|=i,i=Eu(i),Tu(i,e,n,a),Do(n,i),!1}n=n.return}while(n!==null);return!1}var es=Error(x(461)),ut=!1;function wt(e,t,n,a){t.child=e===null?Md(t,null,n,a):Ca(t,e.child,n,a)}function Nu(e,t,n,a,i){n=n.render;var l=t.ref;if("ref"in a){var u={};for(var M in a)M!=="ref"&&(u[M]=a[M])}else u=a;return xa(t),a=zo(e,t,n,u,l,i),M=Ro(),e!==null&&!ut?(Oo(e,t,i),En(e,t,i)):(Ge&&M&&po(t),t.flags|=1,wt(e,t,a,i),t.child)}function Du(e,t,n,a,i){if(e===null){var l=n.type;return typeof l=="function"&&!fo(l)&&l.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=l,ju(e,t,l,a,i)):(e=Ni(n.type,null,a,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(l=e.child,!ss(e,i)){var u=l.memoizedProps;if(n=n.compare,n=n!==null?n:Ar,n(u,a)&&e.ref===t.ref)return En(e,t,i)}return t.flags|=1,e=vn(l,a),e.ref=t.ref,e.return=t,t.child=e}function ju(e,t,n,a,i){if(e!==null){var l=e.memoizedProps;if(Ar(l,a)&&e.ref===t.ref)if(ut=!1,t.pendingProps=a=l,ss(e,i))(e.flags&131072)!==0&&(ut=!0);else return t.lanes=e.lanes,En(e,t,i)}return ts(e,t,n,a,i)}function Mu(e,t,n,a){var i=a.children,l=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),a.mode==="hidden"){if((t.flags&128)!==0){if(l=l!==null?l.baseLanes|n:n,e!==null){for(a=t.child=e.child,i=0;a!==null;)i=i|a.lanes|a.childLanes,a=a.sibling;a=i&~l}else a=0,t.child=null;return _u(e,t,l,n,a)}if((n&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&_i(t,l!==null?l.cachePool:null),l!==null?Bd(t,l):Mo(),zd(t);else return a=t.lanes=536870912,_u(e,t,l!==null?l.baseLanes|n:n,n,a)}else l!==null?(_i(t,l.cachePool),Bd(t,l),Yn(),t.memoizedState=null):(e!==null&&_i(t,null),Mo(),Yn());return wt(e,t,i,n),t.child}function Lr(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function _u(e,t,n,a,i){var l=ko();return l=l===null?null:{parent:ct._currentValue,pool:l},t.memoizedState={baseLanes:n,cachePool:l},e!==null&&_i(t,null),Mo(),zd(t),e!==null&&$a(e,t,a,!0),t.childLanes=i,null}function Yi(e,t){return t=Ki({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Fu(e,t,n){return Ca(t,e.child,null,n),e=Yi(t,t.pendingProps),e.flags|=2,Ut(t),t.memoizedState=null,e}function xg(e,t,n){var a=t.pendingProps,i=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(Ge){if(a.mode==="hidden")return e=Yi(t,a),t.lanes=536870912,Lr(null,e);if(Fo(t),(e=et)?(e=$m(e,Wt),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Un!==null?{id:un,overflow:mn}:null,retryLane:536870912,hydrationErrors:null},n=pd(e),n.return=t,t.child=n,Ct=t,et=null)):e=null,e===null)throw Gn(t);return t.lanes=536870912,null}return Yi(t,a)}var l=e.memoizedState;if(l!==null){var u=l.dehydrated;if(Fo(t),i)if(t.flags&256)t.flags&=-257,t=Fu(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(x(558));else if(ut||$a(e,t,n,!1),i=(n&e.childLanes)!==0,ut||i){if(a=Je,a!==null&&(u=wc(a,n),u!==0&&u!==l.retryLane))throw l.retryLane=u,fa(e,u),zt(a,e,u),es;il(),t=Fu(e,t,n)}else e=l.treeContext,et=en(u.nextSibling),Ct=t,Ge=!0,Vn=null,Wt=!1,e!==null&&bd(t,e),t=Yi(t,a),t.flags|=4096;return t}return e=vn(e.child,{mode:a.mode,children:a.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Zi(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(x(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function ts(e,t,n,a,i){return xa(t),n=zo(e,t,n,a,void 0,i),a=Ro(),e!==null&&!ut?(Oo(e,t,i),En(e,t,i)):(Ge&&a&&po(t),t.flags|=1,wt(e,t,n,i),t.child)}function Bu(e,t,n,a,i,l){return xa(t),t.updateQueue=null,n=Od(t,a,n,i),Rd(e),a=Ro(),e!==null&&!ut?(Oo(e,t,l),En(e,t,l)):(Ge&&a&&po(t),t.flags|=1,wt(e,t,n,l),t.child)}function zu(e,t,n,a,i){if(xa(t),t.stateNode===null){var l=Va,u=n.contextType;typeof u=="object"&&u!==null&&(l=St(u)),l=new n(a,l),t.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,l.updater=Wo,t.stateNode=l,l._reactInternals=t,l=t.stateNode,l.props=a,l.state=t.memoizedState,l.refs={},To(t),u=n.contextType,l.context=typeof u=="object"&&u!==null?St(u):Va,l.state=t.memoizedState,u=n.getDerivedStateFromProps,typeof u=="function"&&(Xo(t,n,u,a),l.state=t.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(u=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),u!==l.state&&Wo.enqueueReplaceState(l,l.state,null),Br(t,a,l,i),Fr(),l.state=t.memoizedState),typeof l.componentDidMount=="function"&&(t.flags|=4194308),a=!0}else if(e===null){l=t.stateNode;var M=t.memoizedProps,G=wa(n,M);l.props=G;var le=l.context,fe=n.contextType;u=Va,typeof fe=="object"&&fe!==null&&(u=St(fe));var ge=n.getDerivedStateFromProps;fe=typeof ge=="function"||typeof l.getSnapshotBeforeUpdate=="function",M=t.pendingProps!==M,fe||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(M||le!==u)&&Cu(t,l,a,u),qn=!1;var se=t.memoizedState;l.state=se,Br(t,a,l,i),Fr(),le=t.memoizedState,M||se!==le||qn?(typeof ge=="function"&&(Xo(t,n,ge,a),le=t.memoizedState),(G=qn||vu(t,n,G,a,se,le,u))?(fe||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(t.flags|=4194308)):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=a,t.memoizedState=le),l.props=a,l.state=le,l.context=u,a=G):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),a=!1)}else{l=t.stateNode,No(e,t),u=t.memoizedProps,fe=wa(n,u),l.props=fe,ge=t.pendingProps,se=l.context,le=n.contextType,G=Va,typeof le=="object"&&le!==null&&(G=St(le)),M=n.getDerivedStateFromProps,(le=typeof M=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(u!==ge||se!==G)&&Cu(t,l,a,G),qn=!1,se=t.memoizedState,l.state=se,Br(t,a,l,i),Fr();var de=t.memoizedState;u!==ge||se!==de||qn||e!==null&&e.dependencies!==null&&ji(e.dependencies)?(typeof M=="function"&&(Xo(t,n,M,a),de=t.memoizedState),(fe=qn||vu(t,n,fe,a,se,de,G)||e!==null&&e.dependencies!==null&&ji(e.dependencies))?(le||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(a,de,G),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(a,de,G)),typeof l.componentDidUpdate=="function"&&(t.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof l.componentDidUpdate!="function"||u===e.memoizedProps&&se===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&se===e.memoizedState||(t.flags|=1024),t.memoizedProps=a,t.memoizedState=de),l.props=a,l.state=de,l.context=G,a=fe):(typeof l.componentDidUpdate!="function"||u===e.memoizedProps&&se===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&se===e.memoizedState||(t.flags|=1024),a=!1)}return l=a,Zi(e,t),a=(t.flags&128)!==0,l||a?(l=t.stateNode,n=a&&typeof n.getDerivedStateFromError!="function"?null:l.render(),t.flags|=1,e!==null&&a?(t.child=Ca(t,e.child,null,i),t.child=Ca(t,null,n,i)):wt(e,t,n,i),t.memoizedState=l.state,e=t.child):e=En(e,t,i),e}function Ru(e,t,n,a){return ga(),t.flags|=256,wt(e,t,n,a),t.child}var ns={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function as(e){return{baseLanes:e,cachePool:kd()}}function rs(e,t,n){return e=e!==null?e.childLanes&~n:0,t&&(e|=Gt),e}function Ou(e,t,n){var a=t.pendingProps,i=!1,l=(t.flags&128)!==0,u;if((u=l)||(u=e!==null&&e.memoizedState===null?!1:(ot.current&2)!==0),u&&(i=!0,t.flags&=-129),u=(t.flags&32)!==0,t.flags&=-33,e===null){if(Ge){if(i?Qn(t):Yn(),(e=et)?(e=$m(e,Wt),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Un!==null?{id:un,overflow:mn}:null,retryLane:536870912,hydrationErrors:null},n=pd(e),n.return=t,t.child=n,Ct=t,et=null)):e=null,e===null)throw Gn(t);return Us(e)?t.lanes=32:t.lanes=536870912,null}var M=a.children;return a=a.fallback,i?(Yn(),i=t.mode,M=Ki({mode:"hidden",children:M},i),a=ha(a,i,n,null),M.return=t,a.return=t,M.sibling=a,t.child=M,a=t.child,a.memoizedState=as(n),a.childLanes=rs(e,u,n),t.memoizedState=ns,Lr(null,a)):(Qn(t),is(t,M))}var G=e.memoizedState;if(G!==null&&(M=G.dehydrated,M!==null)){if(l)t.flags&256?(Qn(t),t.flags&=-257,t=ls(e,t,n)):t.memoizedState!==null?(Yn(),t.child=e.child,t.flags|=128,t=null):(Yn(),M=a.fallback,i=t.mode,a=Ki({mode:"visible",children:a.children},i),M=ha(M,i,n,null),M.flags|=2,a.return=t,M.return=t,a.sibling=M,t.child=a,Ca(t,e.child,null,n),a=t.child,a.memoizedState=as(n),a.childLanes=rs(e,u,n),t.memoizedState=ns,t=Lr(null,a));else if(Qn(t),Us(M)){if(u=M.nextSibling&&M.nextSibling.dataset,u)var le=u.dgst;u=le,a=Error(x(419)),a.stack="",a.digest=u,Tr({value:a,source:null,stack:null}),t=ls(e,t,n)}else if(ut||$a(e,t,n,!1),u=(n&e.childLanes)!==0,ut||u){if(u=Je,u!==null&&(a=wc(u,n),a!==0&&a!==G.retryLane))throw G.retryLane=a,fa(e,a),zt(u,e,a),es;Ls(M)||il(),t=ls(e,t,n)}else Ls(M)?(t.flags|=192,t.child=e.child,t=null):(e=G.treeContext,et=en(M.nextSibling),Ct=t,Ge=!0,Vn=null,Wt=!1,e!==null&&bd(t,e),t=is(t,a.children),t.flags|=4096);return t}return i?(Yn(),M=a.fallback,i=t.mode,G=e.child,le=G.sibling,a=vn(G,{mode:"hidden",children:a.children}),a.subtreeFlags=G.subtreeFlags&65011712,le!==null?M=vn(le,M):(M=ha(M,i,n,null),M.flags|=2),M.return=t,a.return=t,a.sibling=M,t.child=a,Lr(null,a),a=t.child,M=e.child.memoizedState,M===null?M=as(n):(i=M.cachePool,i!==null?(G=ct._currentValue,i=i.parent!==G?{parent:G,pool:G}:i):i=kd(),M={baseLanes:M.baseLanes|n,cachePool:i}),a.memoizedState=M,a.childLanes=rs(e,u,n),t.memoizedState=ns,Lr(e.child,a)):(Qn(t),n=e.child,e=n.sibling,n=vn(n,{mode:"visible",children:a.children}),n.return=t,n.sibling=null,e!==null&&(u=t.deletions,u===null?(t.deletions=[e],t.flags|=16):u.push(e)),t.child=n,t.memoizedState=null,n)}function is(e,t){return t=Ki({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function Ki(e,t){return e=It(22,e,null,t),e.lanes=0,e}function ls(e,t,n){return Ca(t,e.child,null,n),e=is(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Iu(e,t,n){e.lanes|=t;var a=e.alternate;a!==null&&(a.lanes|=t),Co(e.return,t,n)}function os(e,t,n,a,i,l){var u=e.memoizedState;u===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:a,tail:n,tailMode:i,treeForkCount:l}:(u.isBackwards=t,u.rendering=null,u.renderingStartTime=0,u.last=a,u.tail=n,u.tailMode=i,u.treeForkCount=l)}function Lu(e,t,n){var a=t.pendingProps,i=a.revealOrder,l=a.tail;a=a.children;var u=ot.current,M=(u&2)!==0;if(M?(u=u&1|2,t.flags|=128):u&=1,K(ot,u),wt(e,t,a,n),a=Ge?Er:0,!M&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Iu(e,n,t);else if(e.tag===19)Iu(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case"forwards":for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&Ii(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),os(t,!1,i,n,l,a);break;case"backwards":case"unstable_legacy-backwards":for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&Ii(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}os(t,!0,n,null,l,a);break;case"together":os(t,!1,null,null,void 0,a);break;default:t.memoizedState=null}return t.child}function En(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Xn|=t.lanes,(n&t.childLanes)===0)if(e!==null){if($a(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(x(153));if(t.child!==null){for(e=t.child,n=vn(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=vn(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function ss(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&ji(e)))}function yg(e,t,n){switch(t.tag){case 3:be(t,t.stateNode.containerInfo),Hn(t,ct,e.memoizedState.cache),ga();break;case 27:case 5:je(t);break;case 4:be(t,t.stateNode.containerInfo);break;case 10:Hn(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Fo(t),null;break;case 13:var a=t.memoizedState;if(a!==null)return a.dehydrated!==null?(Qn(t),t.flags|=128,null):(n&t.child.childLanes)!==0?Ou(e,t,n):(Qn(t),e=En(e,t,n),e!==null?e.sibling:null);Qn(t);break;case 19:var i=(e.flags&128)!==0;if(a=(n&t.childLanes)!==0,a||($a(e,t,n,!1),a=(n&t.childLanes)!==0),i){if(a)return Lu(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),K(ot,ot.current),a)break;return null;case 22:return t.lanes=0,Mu(e,t,n,t.pendingProps);case 24:Hn(t,ct,e.memoizedState.cache)}return En(e,t,n)}function Uu(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)ut=!0;else{if(!ss(e,n)&&(t.flags&128)===0)return ut=!1,yg(e,t,n);ut=(e.flags&131072)!==0}else ut=!1,Ge&&(t.flags&1048576)!==0&&yd(t,Er,t.index);switch(t.lanes=0,t.tag){case 16:e:{var a=t.pendingProps;if(e=ba(t.elementType),t.type=e,typeof e=="function")fo(e)?(a=wa(e,a),t.tag=1,t=zu(null,t,e,a,n)):(t.tag=0,t=ts(null,t,e,a,n));else{if(e!=null){var i=e.$$typeof;if(i===A){t.tag=11,t=Nu(null,t,e,a,n);break e}else if(i===V){t.tag=14,t=Du(null,t,e,a,n);break e}}throw t=v(e)||e,Error(x(306,t,""))}}return t;case 0:return ts(e,t,t.type,t.pendingProps,n);case 1:return a=t.type,i=wa(a,t.pendingProps),zu(e,t,a,i,n);case 3:e:{if(be(t,t.stateNode.containerInfo),e===null)throw Error(x(387));a=t.pendingProps;var l=t.memoizedState;i=l.element,No(e,t),Br(t,a,null,n);var u=t.memoizedState;if(a=u.cache,Hn(t,ct,a),a!==l.cache&&So(t,[ct],n,!0),Fr(),a=u.element,l.isDehydrated)if(l={element:a,isDehydrated:!1,cache:u.cache},t.updateQueue.baseState=l,t.memoizedState=l,t.flags&256){t=Ru(e,t,a,n);break e}else if(a!==i){i=Zt(Error(x(424)),t),Tr(i),t=Ru(e,t,a,n);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(et=en(e.firstChild),Ct=t,Ge=!0,Vn=null,Wt=!0,n=Md(t,null,a,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(ga(),a===i){t=En(e,t,n);break e}wt(e,t,a,n)}t=t.child}return t;case 26:return Zi(e,t),e===null?(n=Xm(t.type,null,t.pendingProps,null))?t.memoizedState=n:Ge||(n=t.type,e=t.pendingProps,a=ml(ye.current).createElement(n),a[vt]=t,a[Dt]=e,At(a,n,e),pt(a),t.stateNode=a):t.memoizedState=Xm(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return je(t),e===null&&Ge&&(a=t.stateNode=Ym(t.type,t.pendingProps,ye.current),Ct=t,Wt=!0,i=et,na(t.type)?(Vs=i,et=en(a.firstChild)):et=i),wt(e,t,t.pendingProps.children,n),Zi(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&Ge&&((i=a=et)&&(a=Yg(a,t.type,t.pendingProps,Wt),a!==null?(t.stateNode=a,Ct=t,et=en(a.firstChild),Wt=!1,i=!0):i=!1),i||Gn(t)),je(t),i=t.type,l=t.pendingProps,u=e!==null?e.memoizedProps:null,a=l.children,Rs(i,l)?a=null:u!==null&&Rs(i,u)&&(t.flags|=32),t.memoizedState!==null&&(i=zo(e,t,cg,null,null,n),ei._currentValue=i),Zi(e,t),wt(e,t,a,n),t.child;case 6:return e===null&&Ge&&((e=n=et)&&(n=Zg(n,t.pendingProps,Wt),n!==null?(t.stateNode=n,Ct=t,et=null,e=!0):e=!1),e||Gn(t)),null;case 13:return Ou(e,t,n);case 4:return be(t,t.stateNode.containerInfo),a=t.pendingProps,e===null?t.child=Ca(t,null,a,n):wt(e,t,a,n),t.child;case 11:return Nu(e,t,t.type,t.pendingProps,n);case 7:return wt(e,t,t.pendingProps,n),t.child;case 8:return wt(e,t,t.pendingProps.children,n),t.child;case 12:return wt(e,t,t.pendingProps.children,n),t.child;case 10:return a=t.pendingProps,Hn(t,t.type,a.value),wt(e,t,a.children,n),t.child;case 9:return i=t.type._context,a=t.pendingProps.children,xa(t),i=St(i),a=a(i),t.flags|=1,wt(e,t,a,n),t.child;case 14:return Du(e,t,t.type,t.pendingProps,n);case 15:return ju(e,t,t.type,t.pendingProps,n);case 19:return Lu(e,t,n);case 31:return xg(e,t,n);case 22:return Mu(e,t,n,t.pendingProps);case 24:return xa(t),a=St(ct),e===null?(i=ko(),i===null&&(i=Je,l=wo(),i.pooledCache=l,l.refCount++,l!==null&&(i.pooledCacheLanes|=n),i=l),t.memoizedState={parent:a,cache:i},To(t),Hn(t,ct,i)):((e.lanes&n)!==0&&(No(e,t),Br(t,null,null,n),Fr()),i=e.memoizedState,l=t.memoizedState,i.parent!==a?(i={parent:a,cache:a},t.memoizedState=i,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=i),Hn(t,ct,a)):(a=l.cache,Hn(t,ct,a),a!==i.cache&&So(t,[ct],n,!0))),wt(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(x(156,t.tag))}function Tn(e){e.flags|=4}function cs(e,t,n,a,i){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i)if(e.stateNode.complete)e.flags|=8192;else if(fm())e.flags|=8192;else throw va=Bi,Eo}else e.flags&=-16777217}function Vu(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!nf(t))if(fm())e.flags|=8192;else throw va=Bi,Eo}function Xi(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?vc():536870912,e.lanes|=t,ar|=t)}function Ur(e,t){if(!Ge)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:a.sibling=null}}function tt(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,a=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,a|=i.subtreeFlags&65011712,a|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,a|=i.subtreeFlags,a|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=a,e.childLanes=n,t}function bg(e,t,n){var a=t.pendingProps;switch(xo(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return tt(t),null;case 1:return tt(t),null;case 3:return n=t.stateNode,a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),wn(ct),Se(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(qa(t)?Tn(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,bo())),tt(t),null;case 26:var i=t.type,l=t.memoizedState;return e===null?(Tn(t),l!==null?(tt(t),Vu(t,l)):(tt(t),cs(t,i,null,a,n))):l?l!==e.memoizedState?(Tn(t),tt(t),Vu(t,l)):(tt(t),t.flags&=-16777217):(e=e.memoizedProps,e!==a&&Tn(t),tt(t),cs(t,i,e,a,n)),null;case 27:if(Ne(t),n=ye.current,i=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==a&&Tn(t);else{if(!a){if(t.stateNode===null)throw Error(x(166));return tt(t),null}e=X.current,qa(t)?vd(t):(e=Ym(i,a,n),t.stateNode=e,Tn(t))}return tt(t),null;case 5:if(Ne(t),i=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==a&&Tn(t);else{if(!a){if(t.stateNode===null)throw Error(x(166));return tt(t),null}if(l=X.current,qa(t))vd(t);else{var u=ml(ye.current);switch(l){case 1:l=u.createElementNS("http://www.w3.org/2000/svg",i);break;case 2:l=u.createElementNS("http://www.w3.org/1998/Math/MathML",i);break;default:switch(i){case"svg":l=u.createElementNS("http://www.w3.org/2000/svg",i);break;case"math":l=u.createElementNS("http://www.w3.org/1998/Math/MathML",i);break;case"script":l=u.createElement("div"),l.innerHTML="<script><\/script>",l=l.removeChild(l.firstChild);break;case"select":l=typeof a.is=="string"?u.createElement("select",{is:a.is}):u.createElement("select"),a.multiple?l.multiple=!0:a.size&&(l.size=a.size);break;default:l=typeof a.is=="string"?u.createElement(i,{is:a.is}):u.createElement(i)}}l[vt]=t,l[Dt]=a;e:for(u=t.child;u!==null;){if(u.tag===5||u.tag===6)l.appendChild(u.stateNode);else if(u.tag!==4&&u.tag!==27&&u.child!==null){u.child.return=u,u=u.child;continue}if(u===t)break e;for(;u.sibling===null;){if(u.return===null||u.return===t)break e;u=u.return}u.sibling.return=u.return,u=u.sibling}t.stateNode=l;e:switch(At(l,i,a),i){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break e;case"img":a=!0;break e;default:a=!1}a&&Tn(t)}}return tt(t),cs(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==a&&Tn(t);else{if(typeof a!="string"&&t.stateNode===null)throw Error(x(166));if(e=ye.current,qa(t)){if(e=t.stateNode,n=t.memoizedProps,a=null,i=Ct,i!==null)switch(i.tag){case 27:case 5:a=i.memoizedProps}e[vt]=t,e=!!(e.nodeValue===n||a!==null&&a.suppressHydrationWarning===!0||Om(e.nodeValue,n)),e||Gn(t,!0)}else e=ml(e).createTextNode(a),e[vt]=t,t.stateNode=e}return tt(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(a=qa(t),n!==null){if(e===null){if(!a)throw Error(x(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(x(557));e[vt]=t}else ga(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;tt(t),e=!1}else n=bo(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(Ut(t),t):(Ut(t),null);if((t.flags&128)!==0)throw Error(x(558))}return tt(t),null;case 13:if(a=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(i=qa(t),a!==null&&a.dehydrated!==null){if(e===null){if(!i)throw Error(x(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(x(317));i[vt]=t}else ga(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;tt(t),i=!1}else i=bo(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=i),i=!0;if(!i)return t.flags&256?(Ut(t),t):(Ut(t),null)}return Ut(t),(t.flags&128)!==0?(t.lanes=n,t):(n=a!==null,e=e!==null&&e.memoizedState!==null,n&&(a=t.child,i=null,a.alternate!==null&&a.alternate.memoizedState!==null&&a.alternate.memoizedState.cachePool!==null&&(i=a.alternate.memoizedState.cachePool.pool),l=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(l=a.memoizedState.cachePool.pool),l!==i&&(a.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Xi(t,t.updateQueue),tt(t),null);case 4:return Se(),e===null&&Ms(t.stateNode.containerInfo),tt(t),null;case 10:return wn(t.type),tt(t),null;case 19:if(_(ot),a=t.memoizedState,a===null)return tt(t),null;if(i=(t.flags&128)!==0,l=a.rendering,l===null)if(i)Ur(a,!1);else{if(lt!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(l=Ii(e),l!==null){for(t.flags|=128,Ur(a,!1),e=l.updateQueue,t.updateQueue=e,Xi(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)gd(n,e),n=n.sibling;return K(ot,ot.current&1|2),Ge&&Cn(t,a.treeForkCount),t.child}e=e.sibling}a.tail!==null&&we()>nl&&(t.flags|=128,i=!0,Ur(a,!1),t.lanes=4194304)}else{if(!i)if(e=Ii(l),e!==null){if(t.flags|=128,i=!0,e=e.updateQueue,t.updateQueue=e,Xi(t,e),Ur(a,!0),a.tail===null&&a.tailMode==="hidden"&&!l.alternate&&!Ge)return tt(t),null}else 2*we()-a.renderingStartTime>nl&&n!==536870912&&(t.flags|=128,i=!0,Ur(a,!1),t.lanes=4194304);a.isBackwards?(l.sibling=t.child,t.child=l):(e=a.last,e!==null?e.sibling=l:t.child=l,a.last=l)}return a.tail!==null?(e=a.tail,a.rendering=e,a.tail=e.sibling,a.renderingStartTime=we(),e.sibling=null,n=ot.current,K(ot,i?n&1|2:n&1),Ge&&Cn(t,a.treeForkCount),e):(tt(t),null);case 22:case 23:return Ut(t),_o(),a=t.memoizedState!==null,e!==null?e.memoizedState!==null!==a&&(t.flags|=8192):a&&(t.flags|=8192),a?(n&536870912)!==0&&(t.flags&128)===0&&(tt(t),t.subtreeFlags&6&&(t.flags|=8192)):tt(t),n=t.updateQueue,n!==null&&Xi(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),a=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),a!==n&&(t.flags|=2048),e!==null&&_(ya),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),wn(ct),tt(t),null;case 25:return null;case 30:return null}throw Error(x(156,t.tag))}function vg(e,t){switch(xo(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return wn(ct),Se(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Ne(t),null;case 31:if(t.memoizedState!==null){if(Ut(t),t.alternate===null)throw Error(x(340));ga()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Ut(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(x(340));ga()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return _(ot),null;case 4:return Se(),null;case 10:return wn(t.type),null;case 22:case 23:return Ut(t),_o(),e!==null&&_(ya),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return wn(ct),null;case 25:return null;default:return null}}function Gu(e,t){switch(xo(t),t.tag){case 3:wn(ct),Se();break;case 26:case 27:case 5:Ne(t);break;case 4:Se();break;case 31:t.memoizedState!==null&&Ut(t);break;case 13:Ut(t);break;case 19:_(ot);break;case 10:wn(t.type);break;case 22:case 23:Ut(t),_o(),e!==null&&_(ya);break;case 24:wn(ct)}}function Vr(e,t){try{var n=t.updateQueue,a=n!==null?n.lastEffect:null;if(a!==null){var i=a.next;n=i;do{if((n.tag&e)===e){a=void 0;var l=n.create,u=n.inst;a=l(),u.destroy=a}n=n.next}while(n!==i)}}catch(M){Ze(t,t.return,M)}}function Zn(e,t,n){try{var a=t.updateQueue,i=a!==null?a.lastEffect:null;if(i!==null){var l=i.next;a=l;do{if((a.tag&e)===e){var u=a.inst,M=u.destroy;if(M!==void 0){u.destroy=void 0,i=t;var G=n,le=M;try{le()}catch(fe){Ze(i,G,fe)}}}a=a.next}while(a!==l)}}catch(fe){Ze(t,t.return,fe)}}function Hu(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Fd(t,n)}catch(a){Ze(e,e.return,a)}}}function qu(e,t,n){n.props=wa(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(a){Ze(e,t,a)}}function Gr(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var a=e.stateNode;break;case 30:a=e.stateNode;break;default:a=e.stateNode}typeof n=="function"?e.refCleanup=n(a):n.current=a}}catch(i){Ze(e,t,i)}}function fn(e,t){var n=e.ref,a=e.refCleanup;if(n!==null)if(typeof a=="function")try{a()}catch(i){Ze(e,t,i)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(i){Ze(e,t,i)}else n.current=null}function $u(e){var t=e.type,n=e.memoizedProps,a=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&a.focus();break e;case"img":n.src?a.src=n.src:n.srcSet&&(a.srcset=n.srcSet)}}catch(i){Ze(e,e.return,i)}}function ds(e,t,n){try{var a=e.stateNode;Gg(a,e.type,n,t),a[Dt]=t}catch(i){Ze(e,e.return,i)}}function Pu(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&na(e.type)||e.tag===4}function us(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Pu(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&na(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function ms(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=yn));else if(a!==4&&(a===27&&na(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(ms(e,t,n),e=e.sibling;e!==null;)ms(e,t,n),e=e.sibling}function Wi(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(a!==4&&(a===27&&na(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(Wi(e,t,n),e=e.sibling;e!==null;)Wi(e,t,n),e=e.sibling}function Qu(e){var t=e.stateNode,n=e.memoizedProps;try{for(var a=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);At(t,a,n),t[vt]=e,t[Dt]=n}catch(l){Ze(e,e.return,l)}}var Nn=!1,mt=!1,fs=!1,Yu=typeof WeakSet=="function"?WeakSet:Set,xt=null;function Cg(e,t){if(e=e.containerInfo,Bs=bl,e=ld(e),io(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var a=n.getSelection&&n.getSelection();if(a&&a.rangeCount!==0){n=a.anchorNode;var i=a.anchorOffset,l=a.focusNode;a=a.focusOffset;try{n.nodeType,l.nodeType}catch{n=null;break e}var u=0,M=-1,G=-1,le=0,fe=0,ge=e,se=null;t:for(;;){for(var de;ge!==n||i!==0&&ge.nodeType!==3||(M=u+i),ge!==l||a!==0&&ge.nodeType!==3||(G=u+a),ge.nodeType===3&&(u+=ge.nodeValue.length),(de=ge.firstChild)!==null;)se=ge,ge=de;for(;;){if(ge===e)break t;if(se===n&&++le===i&&(M=u),se===l&&++fe===a&&(G=u),(de=ge.nextSibling)!==null)break;ge=se,se=ge.parentNode}ge=de}n=M===-1||G===-1?null:{start:M,end:G}}else n=null}n=n||{start:0,end:0}}else n=null;for(zs={focusedElem:e,selectionRange:n},bl=!1,xt=t;xt!==null;)if(t=xt,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,xt=e;else for(;xt!==null;){switch(t=xt,l=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(n=0;n<e.length;n++)i=e[n],i.ref.impl=i.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&l!==null){e=void 0,n=t,i=l.memoizedProps,l=l.memoizedState,a=n.stateNode;try{var Ae=wa(n.type,i);e=a.getSnapshotBeforeUpdate(Ae,l),a.__reactInternalSnapshotBeforeUpdate=e}catch(Me){Ze(n,n.return,Me)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)Is(e);else if(n===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Is(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(x(163))}if(e=t.sibling,e!==null){e.return=t.return,xt=e;break}xt=t.return}}function Zu(e,t,n){var a=n.flags;switch(n.tag){case 0:case 11:case 15:jn(e,n),a&4&&Vr(5,n);break;case 1:if(jn(e,n),a&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(u){Ze(n,n.return,u)}else{var i=wa(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(u){Ze(n,n.return,u)}}a&64&&Hu(n),a&512&&Gr(n,n.return);break;case 3:if(jn(e,n),a&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Fd(e,t)}catch(u){Ze(n,n.return,u)}}break;case 27:t===null&&a&4&&Qu(n);case 26:case 5:jn(e,n),t===null&&a&4&&$u(n),a&512&&Gr(n,n.return);break;case 12:jn(e,n);break;case 31:jn(e,n),a&4&&Wu(e,n);break;case 13:jn(e,n),a&4&&Ju(e,n),a&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=jg.bind(null,n),Kg(e,n))));break;case 22:if(a=n.memoizedState!==null||Nn,!a){t=t!==null&&t.memoizedState!==null||mt,i=Nn;var l=mt;Nn=a,(mt=t)&&!l?Mn(e,n,(n.subtreeFlags&8772)!==0):jn(e,n),Nn=i,mt=l}break;case 30:break;default:jn(e,n)}}function Ku(e){var t=e.alternate;t!==null&&(e.alternate=null,Ku(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Gl(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var at=null,Mt=!1;function Dn(e,t,n){for(n=n.child;n!==null;)Xu(e,t,n),n=n.sibling}function Xu(e,t,n){if(gt&&typeof gt.onCommitFiberUnmount=="function")try{gt.onCommitFiberUnmount(Qe,n)}catch{}switch(n.tag){case 26:mt||fn(n,t),Dn(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:mt||fn(n,t);var a=at,i=Mt;na(n.type)&&(at=n.stateNode,Mt=!1),Dn(e,t,n),Xr(n.stateNode),at=a,Mt=i;break;case 5:mt||fn(n,t);case 6:if(a=at,i=Mt,at=null,Dn(e,t,n),at=a,Mt=i,at!==null)if(Mt)try{(at.nodeType===9?at.body:at.nodeName==="HTML"?at.ownerDocument.body:at).removeChild(n.stateNode)}catch(l){Ze(n,t,l)}else try{at.removeChild(n.stateNode)}catch(l){Ze(n,t,l)}break;case 18:at!==null&&(Mt?(e=at,Hm(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,n.stateNode),ur(e)):Hm(at,n.stateNode));break;case 4:a=at,i=Mt,at=n.stateNode.containerInfo,Mt=!0,Dn(e,t,n),at=a,Mt=i;break;case 0:case 11:case 14:case 15:Zn(2,n,t),mt||Zn(4,n,t),Dn(e,t,n);break;case 1:mt||(fn(n,t),a=n.stateNode,typeof a.componentWillUnmount=="function"&&qu(n,t,a)),Dn(e,t,n);break;case 21:Dn(e,t,n);break;case 22:mt=(a=mt)||n.memoizedState!==null,Dn(e,t,n),mt=a;break;default:Dn(e,t,n)}}function Wu(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{ur(e)}catch(n){Ze(t,t.return,n)}}}function Ju(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{ur(e)}catch(n){Ze(t,t.return,n)}}function Sg(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new Yu),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new Yu),t;default:throw Error(x(435,e.tag))}}function Ji(e,t){var n=Sg(e);t.forEach(function(a){if(!n.has(a)){n.add(a);var i=Mg.bind(null,e,a);a.then(i,i)}})}function _t(e,t){var n=t.deletions;if(n!==null)for(var a=0;a<n.length;a++){var i=n[a],l=e,u=t,M=u;e:for(;M!==null;){switch(M.tag){case 27:if(na(M.type)){at=M.stateNode,Mt=!1;break e}break;case 5:at=M.stateNode,Mt=!1;break e;case 3:case 4:at=M.stateNode.containerInfo,Mt=!0;break e}M=M.return}if(at===null)throw Error(x(160));Xu(l,u,i),at=null,Mt=!1,l=i.alternate,l!==null&&(l.return=null),i.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)em(t,e),t=t.sibling}var ln=null;function em(e,t){var n=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:_t(t,e),Ft(e),a&4&&(Zn(3,e,e.return),Vr(3,e),Zn(5,e,e.return));break;case 1:_t(t,e),Ft(e),a&512&&(mt||n===null||fn(n,n.return)),a&64&&Nn&&(e=e.updateQueue,e!==null&&(a=e.callbacks,a!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?a:n.concat(a))));break;case 26:var i=ln;if(_t(t,e),Ft(e),a&512&&(mt||n===null||fn(n,n.return)),a&4){var l=n!==null?n.memoizedState:null;if(a=e.memoizedState,n===null)if(a===null)if(e.stateNode===null){e:{a=e.type,n=e.memoizedProps,i=i.ownerDocument||i;t:switch(a){case"title":l=i.getElementsByTagName("title")[0],(!l||l[gr]||l[vt]||l.namespaceURI==="http://www.w3.org/2000/svg"||l.hasAttribute("itemprop"))&&(l=i.createElement(a),i.head.insertBefore(l,i.querySelector("head > title"))),At(l,a,n),l[vt]=e,pt(l),a=l;break e;case"link":var u=ef("link","href",i).get(a+(n.href||""));if(u){for(var M=0;M<u.length;M++)if(l=u[M],l.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&l.getAttribute("rel")===(n.rel==null?null:n.rel)&&l.getAttribute("title")===(n.title==null?null:n.title)&&l.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){u.splice(M,1);break t}}l=i.createElement(a),At(l,a,n),i.head.appendChild(l);break;case"meta":if(u=ef("meta","content",i).get(a+(n.content||""))){for(M=0;M<u.length;M++)if(l=u[M],l.getAttribute("content")===(n.content==null?null:""+n.content)&&l.getAttribute("name")===(n.name==null?null:n.name)&&l.getAttribute("property")===(n.property==null?null:n.property)&&l.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&l.getAttribute("charset")===(n.charSet==null?null:n.charSet)){u.splice(M,1);break t}}l=i.createElement(a),At(l,a,n),i.head.appendChild(l);break;default:throw Error(x(468,a))}l[vt]=e,pt(l),a=l}e.stateNode=a}else tf(i,e.type,e.stateNode);else e.stateNode=Jm(i,a,e.memoizedProps);else l!==a?(l===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):l.count--,a===null?tf(i,e.type,e.stateNode):Jm(i,a,e.memoizedProps)):a===null&&e.stateNode!==null&&ds(e,e.memoizedProps,n.memoizedProps)}break;case 27:_t(t,e),Ft(e),a&512&&(mt||n===null||fn(n,n.return)),n!==null&&a&4&&ds(e,e.memoizedProps,n.memoizedProps);break;case 5:if(_t(t,e),Ft(e),a&512&&(mt||n===null||fn(n,n.return)),e.flags&32){i=e.stateNode;try{Ba(i,"")}catch(Ae){Ze(e,e.return,Ae)}}a&4&&e.stateNode!=null&&(i=e.memoizedProps,ds(e,i,n!==null?n.memoizedProps:i)),a&1024&&(fs=!0);break;case 6:if(_t(t,e),Ft(e),a&4){if(e.stateNode===null)throw Error(x(162));a=e.memoizedProps,n=e.stateNode;try{n.nodeValue=a}catch(Ae){Ze(e,e.return,Ae)}}break;case 3:if(gl=null,i=ln,ln=fl(t.containerInfo),_t(t,e),ln=i,Ft(e),a&4&&n!==null&&n.memoizedState.isDehydrated)try{ur(t.containerInfo)}catch(Ae){Ze(e,e.return,Ae)}fs&&(fs=!1,tm(e));break;case 4:a=ln,ln=fl(e.stateNode.containerInfo),_t(t,e),Ft(e),ln=a;break;case 12:_t(t,e),Ft(e);break;case 31:_t(t,e),Ft(e),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,Ji(e,a)));break;case 13:_t(t,e),Ft(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(tl=we()),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,Ji(e,a)));break;case 22:i=e.memoizedState!==null;var G=n!==null&&n.memoizedState!==null,le=Nn,fe=mt;if(Nn=le||i,mt=fe||G,_t(t,e),mt=fe,Nn=le,Ft(e),a&8192)e:for(t=e.stateNode,t._visibility=i?t._visibility&-2:t._visibility|1,i&&(n===null||G||Nn||mt||Aa(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){G=n=t;try{if(l=G.stateNode,i)u=l.style,typeof u.setProperty=="function"?u.setProperty("display","none","important"):u.display="none";else{M=G.stateNode;var ge=G.memoizedProps.style,se=ge!=null&&ge.hasOwnProperty("display")?ge.display:null;M.style.display=se==null||typeof se=="boolean"?"":(""+se).trim()}}catch(Ae){Ze(G,G.return,Ae)}}}else if(t.tag===6){if(n===null){G=t;try{G.stateNode.nodeValue=i?"":G.memoizedProps}catch(Ae){Ze(G,G.return,Ae)}}}else if(t.tag===18){if(n===null){G=t;try{var de=G.stateNode;i?qm(de,!0):qm(G.stateNode,!1)}catch(Ae){Ze(G,G.return,Ae)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}a&4&&(a=e.updateQueue,a!==null&&(n=a.retryQueue,n!==null&&(a.retryQueue=null,Ji(e,n))));break;case 19:_t(t,e),Ft(e),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,Ji(e,a)));break;case 30:break;case 21:break;default:_t(t,e),Ft(e)}}function Ft(e){var t=e.flags;if(t&2){try{for(var n,a=e.return;a!==null;){if(Pu(a)){n=a;break}a=a.return}if(n==null)throw Error(x(160));switch(n.tag){case 27:var i=n.stateNode,l=us(e);Wi(e,l,i);break;case 5:var u=n.stateNode;n.flags&32&&(Ba(u,""),n.flags&=-33);var M=us(e);Wi(e,M,u);break;case 3:case 4:var G=n.stateNode.containerInfo,le=us(e);ms(e,le,G);break;default:throw Error(x(161))}}catch(fe){Ze(e,e.return,fe)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function tm(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;tm(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function jn(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)Zu(e,t.alternate,t),t=t.sibling}function Aa(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Zn(4,t,t.return),Aa(t);break;case 1:fn(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount=="function"&&qu(t,t.return,n),Aa(t);break;case 27:Xr(t.stateNode);case 26:case 5:fn(t,t.return),Aa(t);break;case 22:t.memoizedState===null&&Aa(t);break;case 30:Aa(t);break;default:Aa(t)}e=e.sibling}}function Mn(e,t,n){for(n=n&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var a=t.alternate,i=e,l=t,u=l.flags;switch(l.tag){case 0:case 11:case 15:Mn(i,l,n),Vr(4,l);break;case 1:if(Mn(i,l,n),a=l,i=a.stateNode,typeof i.componentDidMount=="function")try{i.componentDidMount()}catch(le){Ze(a,a.return,le)}if(a=l,i=a.updateQueue,i!==null){var M=a.stateNode;try{var G=i.shared.hiddenCallbacks;if(G!==null)for(i.shared.hiddenCallbacks=null,i=0;i<G.length;i++)_d(G[i],M)}catch(le){Ze(a,a.return,le)}}n&&u&64&&Hu(l),Gr(l,l.return);break;case 27:Qu(l);case 26:case 5:Mn(i,l,n),n&&a===null&&u&4&&$u(l),Gr(l,l.return);break;case 12:Mn(i,l,n);break;case 31:Mn(i,l,n),n&&u&4&&Wu(i,l);break;case 13:Mn(i,l,n),n&&u&4&&Ju(i,l);break;case 22:l.memoizedState===null&&Mn(i,l,n),Gr(l,l.return);break;case 30:break;default:Mn(i,l,n)}t=t.sibling}}function hs(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&Nr(n))}function gs(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Nr(e))}function on(e,t,n,a){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)nm(e,t,n,a),t=t.sibling}function nm(e,t,n,a){var i=t.flags;switch(t.tag){case 0:case 11:case 15:on(e,t,n,a),i&2048&&Vr(9,t);break;case 1:on(e,t,n,a);break;case 3:on(e,t,n,a),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Nr(e)));break;case 12:if(i&2048){on(e,t,n,a),e=t.stateNode;try{var l=t.memoizedProps,u=l.id,M=l.onPostCommit;typeof M=="function"&&M(u,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(G){Ze(t,t.return,G)}}else on(e,t,n,a);break;case 31:on(e,t,n,a);break;case 13:on(e,t,n,a);break;case 23:break;case 22:l=t.stateNode,u=t.alternate,t.memoizedState!==null?l._visibility&2?on(e,t,n,a):Hr(e,t):l._visibility&2?on(e,t,n,a):(l._visibility|=2,er(e,t,n,a,(t.subtreeFlags&10256)!==0||!1)),i&2048&&hs(u,t);break;case 24:on(e,t,n,a),i&2048&&gs(t.alternate,t);break;default:on(e,t,n,a)}}function er(e,t,n,a,i){for(i=i&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var l=e,u=t,M=n,G=a,le=u.flags;switch(u.tag){case 0:case 11:case 15:er(l,u,M,G,i),Vr(8,u);break;case 23:break;case 22:var fe=u.stateNode;u.memoizedState!==null?fe._visibility&2?er(l,u,M,G,i):Hr(l,u):(fe._visibility|=2,er(l,u,M,G,i)),i&&le&2048&&hs(u.alternate,u);break;case 24:er(l,u,M,G,i),i&&le&2048&&gs(u.alternate,u);break;default:er(l,u,M,G,i)}t=t.sibling}}function Hr(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,a=t,i=a.flags;switch(a.tag){case 22:Hr(n,a),i&2048&&hs(a.alternate,a);break;case 24:Hr(n,a),i&2048&&gs(a.alternate,a);break;default:Hr(n,a)}t=t.sibling}}var qr=8192;function tr(e,t,n){if(e.subtreeFlags&qr)for(e=e.child;e!==null;)am(e,t,n),e=e.sibling}function am(e,t,n){switch(e.tag){case 26:tr(e,t,n),e.flags&qr&&e.memoizedState!==null&&sp(n,ln,e.memoizedState,e.memoizedProps);break;case 5:tr(e,t,n);break;case 3:case 4:var a=ln;ln=fl(e.stateNode.containerInfo),tr(e,t,n),ln=a;break;case 22:e.memoizedState===null&&(a=e.alternate,a!==null&&a.memoizedState!==null?(a=qr,qr=16777216,tr(e,t,n),qr=a):tr(e,t,n));break;default:tr(e,t,n)}}function rm(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function $r(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var a=t[n];xt=a,lm(a,e)}rm(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)im(e),e=e.sibling}function im(e){switch(e.tag){case 0:case 11:case 15:$r(e),e.flags&2048&&Zn(9,e,e.return);break;case 3:$r(e);break;case 12:$r(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,el(e)):$r(e);break;default:$r(e)}}function el(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var a=t[n];xt=a,lm(a,e)}rm(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Zn(8,t,t.return),el(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,el(t));break;default:el(t)}e=e.sibling}}function lm(e,t){for(;xt!==null;){var n=xt;switch(n.tag){case 0:case 11:case 15:Zn(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var a=n.memoizedState.cachePool.pool;a!=null&&a.refCount++}break;case 24:Nr(n.memoizedState.cache)}if(a=n.child,a!==null)a.return=n,xt=a;else e:for(n=e;xt!==null;){a=xt;var i=a.sibling,l=a.return;if(Ku(a),a===n){xt=null;break e}if(i!==null){i.return=l,xt=i;break e}xt=l}}}var wg={getCacheForType:function(e){var t=St(ct),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return St(ct).controller.signal}},Ag=typeof WeakMap=="function"?WeakMap:Map,Pe=0,Je=null,Oe=null,Ue=0,Ye=0,Vt=null,Kn=!1,nr=!1,ps=!1,_n=0,lt=0,Xn=0,ka=0,xs=0,Gt=0,ar=0,Pr=null,Bt=null,ys=!1,tl=0,om=0,nl=1/0,al=null,Wn=null,ft=0,Jn=null,rr=null,Fn=0,bs=0,vs=null,sm=null,Qr=0,Cs=null;function Ht(){return(Pe&2)!==0&&Ue!==0?Ue&-Ue:Q.T!==null?Ts():Ac()}function cm(){if(Gt===0)if((Ue&536870912)===0||Ge){var e=sa;sa<<=1,(sa&3932160)===0&&(sa=262144),Gt=e}else Gt=536870912;return e=Lt.current,e!==null&&(e.flags|=32),Gt}function zt(e,t,n){(e===Je&&(Ye===2||Ye===9)||e.cancelPendingCommit!==null)&&(ir(e,0),ea(e,Ue,Gt,!1)),hr(e,n),((Pe&2)===0||e!==Je)&&(e===Je&&((Pe&2)===0&&(ka|=n),lt===4&&ea(e,Ue,Gt,!1)),hn(e))}function dm(e,t,n){if((Pe&6)!==0)throw Error(x(327));var a=!n&&(t&127)===0&&(t&e.expiredLanes)===0||fr(e,t),i=a?Tg(e,t):ws(e,t,!0),l=a;do{if(i===0){nr&&!a&&ea(e,t,0,!1);break}else{if(n=e.current.alternate,l&&!kg(n)){i=ws(e,t,!1),l=!1;continue}if(i===2){if(l=t,e.errorRecoveryDisabledLanes&l)var u=0;else u=e.pendingLanes&-536870913,u=u!==0?u:u&536870912?536870912:0;if(u!==0){t=u;e:{var M=e;i=Pr;var G=M.current.memoizedState.isDehydrated;if(G&&(ir(M,u).flags|=256),u=ws(M,u,!1),u!==2){if(ps&&!G){M.errorRecoveryDisabledLanes|=l,ka|=l,i=4;break e}l=Bt,Bt=i,l!==null&&(Bt===null?Bt=l:Bt.push.apply(Bt,l))}i=u}if(l=!1,i!==2)continue}}if(i===1){ir(e,0),ea(e,t,0,!0);break}e:{switch(a=e,l=i,l){case 0:case 1:throw Error(x(345));case 4:if((t&4194048)!==t)break;case 6:ea(a,t,Gt,!Kn);break e;case 2:Bt=null;break;case 3:case 5:break;default:throw Error(x(329))}if((t&62914560)===t&&(i=tl+300-we(),10<i)){if(ea(a,t,Gt,!Kn),fi(a,0,!0)!==0)break e;Fn=t,a.timeoutHandle=Vm(um.bind(null,a,n,Bt,al,ys,t,Gt,ka,ar,Kn,l,"Throttled",-0,0),i);break e}um(a,n,Bt,al,ys,t,Gt,ka,ar,Kn,l,null,-0,0)}}break}while(!0);hn(e)}function um(e,t,n,a,i,l,u,M,G,le,fe,ge,se,de){if(e.timeoutHandle=-1,ge=t.subtreeFlags,ge&8192||(ge&16785408)===16785408){ge={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:yn},am(t,l,ge);var Ae=(l&62914560)===l?tl-we():(l&4194048)===l?om-we():0;if(Ae=cp(ge,Ae),Ae!==null){Fn=l,e.cancelPendingCommit=Ae(bm.bind(null,e,t,l,n,a,i,u,M,G,fe,ge,null,se,de)),ea(e,l,u,!le);return}}bm(e,t,l,n,a,i,u,M,G)}function kg(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var a=0;a<n.length;a++){var i=n[a],l=i.getSnapshot;i=i.value;try{if(!Ot(l(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function ea(e,t,n,a){t&=~xs,t&=~ka,e.suspendedLanes|=t,e.pingedLanes&=~t,a&&(e.warmLanes|=t),a=e.expirationTimes;for(var i=t;0<i;){var l=31-rt(i),u=1<<l;a[l]=-1,i&=~u}n!==0&&Cc(e,n,t)}function rl(){return(Pe&6)===0?(Yr(0),!1):!0}function Ss(){if(Oe!==null){if(Ye===0)var e=Oe.return;else e=Oe,Sn=pa=null,Io(e),Za=null,jr=0,e=Oe;for(;e!==null;)Gu(e.alternate,e),e=e.return;Oe=null}}function ir(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,$g(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),Fn=0,Ss(),Je=e,Oe=n=vn(e.current,null),Ue=t,Ye=0,Vt=null,Kn=!1,nr=fr(e,t),ps=!1,ar=Gt=xs=ka=Xn=lt=0,Bt=Pr=null,ys=!1,(t&8)!==0&&(t|=t&32);var a=e.entangledLanes;if(a!==0)for(e=e.entanglements,a&=t;0<a;){var i=31-rt(a),l=1<<i;t|=e[i],a&=~l}return _n=t,ki(),n}function mm(e,t){Be=null,Q.H=Ir,t===Ya||t===Fi?(t=Nd(),Ye=3):t===Eo?(t=Nd(),Ye=4):Ye=t===es?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,Vt=t,Oe===null&&(lt=1,Qi(e,Zt(t,e.current)))}function fm(){var e=Lt.current;return e===null?!0:(Ue&4194048)===Ue?Jt===null:(Ue&62914560)===Ue||(Ue&536870912)!==0?e===Jt:!1}function hm(){var e=Q.H;return Q.H=Ir,e===null?Ir:e}function gm(){var e=Q.A;return Q.A=wg,e}function il(){lt=4,Kn||(Ue&4194048)!==Ue&&Lt.current!==null||(nr=!0),(Xn&134217727)===0&&(ka&134217727)===0||Je===null||ea(Je,Ue,Gt,!1)}function ws(e,t,n){var a=Pe;Pe|=2;var i=hm(),l=gm();(Je!==e||Ue!==t)&&(al=null,ir(e,t)),t=!1;var u=lt;e:do try{if(Ye!==0&&Oe!==null){var M=Oe,G=Vt;switch(Ye){case 8:Ss(),u=6;break e;case 3:case 2:case 9:case 6:Lt.current===null&&(t=!0);var le=Ye;if(Ye=0,Vt=null,lr(e,M,G,le),n&&nr){u=0;break e}break;default:le=Ye,Ye=0,Vt=null,lr(e,M,G,le)}}Eg(),u=lt;break}catch(fe){mm(e,fe)}while(!0);return t&&e.shellSuspendCounter++,Sn=pa=null,Pe=a,Q.H=i,Q.A=l,Oe===null&&(Je=null,Ue=0,ki()),u}function Eg(){for(;Oe!==null;)pm(Oe)}function Tg(e,t){var n=Pe;Pe|=2;var a=hm(),i=gm();Je!==e||Ue!==t?(al=null,nl=we()+500,ir(e,t)):nr=fr(e,t);e:do try{if(Ye!==0&&Oe!==null){t=Oe;var l=Vt;t:switch(Ye){case 1:Ye=0,Vt=null,lr(e,t,l,1);break;case 2:case 9:if(Ed(l)){Ye=0,Vt=null,xm(t);break}t=function(){Ye!==2&&Ye!==9||Je!==e||(Ye=7),hn(e)},l.then(t,t);break e;case 3:Ye=7;break e;case 4:Ye=5;break e;case 7:Ed(l)?(Ye=0,Vt=null,xm(t)):(Ye=0,Vt=null,lr(e,t,l,7));break;case 5:var u=null;switch(Oe.tag){case 26:u=Oe.memoizedState;case 5:case 27:var M=Oe;if(u?nf(u):M.stateNode.complete){Ye=0,Vt=null;var G=M.sibling;if(G!==null)Oe=G;else{var le=M.return;le!==null?(Oe=le,ll(le)):Oe=null}break t}}Ye=0,Vt=null,lr(e,t,l,5);break;case 6:Ye=0,Vt=null,lr(e,t,l,6);break;case 8:Ss(),lt=6;break e;default:throw Error(x(462))}}Ng();break}catch(fe){mm(e,fe)}while(!0);return Sn=pa=null,Q.H=a,Q.A=i,Pe=n,Oe!==null?0:(Je=null,Ue=0,ki(),lt)}function Ng(){for(;Oe!==null&&!oe();)pm(Oe)}function pm(e){var t=Uu(e.alternate,e,_n);e.memoizedProps=e.pendingProps,t===null?ll(e):Oe=t}function xm(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Bu(n,t,t.pendingProps,t.type,void 0,Ue);break;case 11:t=Bu(n,t,t.pendingProps,t.type.render,t.ref,Ue);break;case 5:Io(t);default:Gu(n,t),t=Oe=gd(t,_n),t=Uu(n,t,_n)}e.memoizedProps=e.pendingProps,t===null?ll(e):Oe=t}function lr(e,t,n,a){Sn=pa=null,Io(t),Za=null,jr=0;var i=t.return;try{if(pg(e,i,t,n,Ue)){lt=1,Qi(e,Zt(n,e.current)),Oe=null;return}}catch(l){if(i!==null)throw Oe=i,l;lt=1,Qi(e,Zt(n,e.current)),Oe=null;return}t.flags&32768?(Ge||a===1?e=!0:nr||(Ue&536870912)!==0?e=!1:(Kn=e=!0,(a===2||a===9||a===3||a===6)&&(a=Lt.current,a!==null&&a.tag===13&&(a.flags|=16384))),ym(t,e)):ll(t)}function ll(e){var t=e;do{if((t.flags&32768)!==0){ym(t,Kn);return}e=t.return;var n=bg(t.alternate,t,_n);if(n!==null){Oe=n;return}if(t=t.sibling,t!==null){Oe=t;return}Oe=t=e}while(t!==null);lt===0&&(lt=5)}function ym(e,t){do{var n=vg(e.alternate,e);if(n!==null){n.flags&=32767,Oe=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){Oe=e;return}Oe=e=n}while(e!==null);lt=6,Oe=null}function bm(e,t,n,a,i,l,u,M,G){e.cancelPendingCommit=null;do ol();while(ft!==0);if((Pe&6)!==0)throw Error(x(327));if(t!==null){if(t===e.current)throw Error(x(177));if(l=t.lanes|t.childLanes,l|=uo,oh(e,n,l,u,M,G),e===Je&&(Oe=Je=null,Ue=0),rr=t,Jn=e,Fn=n,bs=l,vs=i,sm=a,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,_g(ze,function(){return Am(),null})):(e.callbackNode=null,e.callbackPriority=0),a=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||a){a=Q.T,Q.T=null,i=Y.p,Y.p=2,u=Pe,Pe|=4;try{Cg(e,t,n)}finally{Pe=u,Y.p=i,Q.T=a}}ft=1,vm(),Cm(),Sm()}}function vm(){if(ft===1){ft=0;var e=Jn,t=rr,n=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||n){n=Q.T,Q.T=null;var a=Y.p;Y.p=2;var i=Pe;Pe|=4;try{em(t,e);var l=zs,u=ld(e.containerInfo),M=l.focusedElem,G=l.selectionRange;if(u!==M&&M&&M.ownerDocument&&id(M.ownerDocument.documentElement,M)){if(G!==null&&io(M)){var le=G.start,fe=G.end;if(fe===void 0&&(fe=le),"selectionStart"in M)M.selectionStart=le,M.selectionEnd=Math.min(fe,M.value.length);else{var ge=M.ownerDocument||document,se=ge&&ge.defaultView||window;if(se.getSelection){var de=se.getSelection(),Ae=M.textContent.length,Me=Math.min(G.start,Ae),We=G.end===void 0?Me:Math.min(G.end,Ae);!de.extend&&Me>We&&(u=We,We=Me,Me=u);var ee=rd(M,Me),$=rd(M,We);if(ee&&$&&(de.rangeCount!==1||de.anchorNode!==ee.node||de.anchorOffset!==ee.offset||de.focusNode!==$.node||de.focusOffset!==$.offset)){var re=ge.createRange();re.setStart(ee.node,ee.offset),de.removeAllRanges(),Me>We?(de.addRange(re),de.extend($.node,$.offset)):(re.setEnd($.node,$.offset),de.addRange(re))}}}}for(ge=[],de=M;de=de.parentNode;)de.nodeType===1&&ge.push({element:de,left:de.scrollLeft,top:de.scrollTop});for(typeof M.focus=="function"&&M.focus(),M=0;M<ge.length;M++){var he=ge[M];he.element.scrollLeft=he.left,he.element.scrollTop=he.top}}bl=!!Bs,zs=Bs=null}finally{Pe=i,Y.p=a,Q.T=n}}e.current=t,ft=2}}function Cm(){if(ft===2){ft=0;var e=Jn,t=rr,n=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||n){n=Q.T,Q.T=null;var a=Y.p;Y.p=2;var i=Pe;Pe|=4;try{Zu(e,t.alternate,t)}finally{Pe=i,Y.p=a,Q.T=n}}ft=3}}function Sm(){if(ft===4||ft===3){ft=0,ve();var e=Jn,t=rr,n=Fn,a=sm;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?ft=5:(ft=0,rr=Jn=null,wm(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(Wn=null),Ul(n),t=t.stateNode,gt&&typeof gt.onCommitFiberRoot=="function")try{gt.onCommitFiberRoot(Qe,t,void 0,(t.current.flags&128)===128)}catch{}if(a!==null){t=Q.T,i=Y.p,Y.p=2,Q.T=null;try{for(var l=e.onRecoverableError,u=0;u<a.length;u++){var M=a[u];l(M.value,{componentStack:M.stack})}}finally{Q.T=t,Y.p=i}}(Fn&3)!==0&&ol(),hn(e),i=e.pendingLanes,(n&261930)!==0&&(i&42)!==0?e===Cs?Qr++:(Qr=0,Cs=e):Qr=0,Yr(0)}}function wm(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Nr(t)))}function ol(){return vm(),Cm(),Sm(),Am()}function Am(){if(ft!==5)return!1;var e=Jn,t=bs;bs=0;var n=Ul(Fn),a=Q.T,i=Y.p;try{Y.p=32>n?32:n,Q.T=null,n=vs,vs=null;var l=Jn,u=Fn;if(ft=0,rr=Jn=null,Fn=0,(Pe&6)!==0)throw Error(x(331));var M=Pe;if(Pe|=4,im(l.current),nm(l,l.current,u,n),Pe=M,Yr(0,!1),gt&&typeof gt.onPostCommitFiberRoot=="function")try{gt.onPostCommitFiberRoot(Qe,l)}catch{}return!0}finally{Y.p=i,Q.T=a,wm(e,t)}}function km(e,t,n){t=Zt(n,t),t=Jo(e.stateNode,t,2),e=Pn(e,t,2),e!==null&&(hr(e,2),hn(e))}function Ze(e,t,n){if(e.tag===3)km(e,e,n);else for(;t!==null;){if(t.tag===3){km(t,e,n);break}else if(t.tag===1){var a=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(Wn===null||!Wn.has(a))){e=Zt(n,e),n=Eu(2),a=Pn(t,n,2),a!==null&&(Tu(n,a,t,e),hr(a,2),hn(a));break}}t=t.return}}function As(e,t,n){var a=e.pingCache;if(a===null){a=e.pingCache=new Ag;var i=new Set;a.set(t,i)}else i=a.get(t),i===void 0&&(i=new Set,a.set(t,i));i.has(n)||(ps=!0,i.add(n),e=Dg.bind(null,e,t,n),t.then(e,e))}function Dg(e,t,n){var a=e.pingCache;a!==null&&a.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,Je===e&&(Ue&n)===n&&(lt===4||lt===3&&(Ue&62914560)===Ue&&300>we()-tl?(Pe&2)===0&&ir(e,0):xs|=n,ar===Ue&&(ar=0)),hn(e)}function Em(e,t){t===0&&(t=vc()),e=fa(e,t),e!==null&&(hr(e,t),hn(e))}function jg(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Em(e,n)}function Mg(e,t){var n=0;switch(e.tag){case 31:case 13:var a=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:a=e.stateNode;break;case 22:a=e.stateNode._retryCache;break;default:throw Error(x(314))}a!==null&&a.delete(t),Em(e,n)}function _g(e,t){return me(e,t)}var sl=null,or=null,ks=!1,cl=!1,Es=!1,ta=0;function hn(e){e!==or&&e.next===null&&(or===null?sl=or=e:or=or.next=e),cl=!0,ks||(ks=!0,Bg())}function Yr(e,t){if(!Es&&cl){Es=!0;do for(var n=!1,a=sl;a!==null;){if(e!==0){var i=a.pendingLanes;if(i===0)var l=0;else{var u=a.suspendedLanes,M=a.pingedLanes;l=(1<<31-rt(42|e)+1)-1,l&=i&~(u&~M),l=l&201326741?l&201326741|1:l?l|2:0}l!==0&&(n=!0,jm(a,l))}else l=Ue,l=fi(a,a===Je?l:0,a.cancelPendingCommit!==null||a.timeoutHandle!==-1),(l&3)===0||fr(a,l)||(n=!0,jm(a,l));a=a.next}while(n);Es=!1}}function Fg(){Tm()}function Tm(){cl=ks=!1;var e=0;ta!==0&&qg()&&(e=ta);for(var t=we(),n=null,a=sl;a!==null;){var i=a.next,l=Nm(a,t);l===0?(a.next=null,n===null?sl=i:n.next=i,i===null&&(or=n)):(n=a,(e!==0||(l&3)!==0)&&(cl=!0)),a=i}ft!==0&&ft!==5||Yr(e),ta!==0&&(ta=0)}function Nm(e,t){for(var n=e.suspendedLanes,a=e.pingedLanes,i=e.expirationTimes,l=e.pendingLanes&-62914561;0<l;){var u=31-rt(l),M=1<<u,G=i[u];G===-1?((M&n)===0||(M&a)!==0)&&(i[u]=lh(M,t)):G<=t&&(e.expiredLanes|=M),l&=~M}if(t=Je,n=Ue,n=fi(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),a=e.callbackNode,n===0||e===t&&(Ye===2||Ye===9)||e.cancelPendingCommit!==null)return a!==null&&a!==null&&pe(a),e.callbackNode=null,e.callbackPriority=0;if((n&3)===0||fr(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(a!==null&&pe(a),Ul(n)){case 2:case 8:n=$e;break;case 32:n=ze;break;case 268435456:n=an;break;default:n=ze}return a=Dm.bind(null,e),n=me(n,a),e.callbackPriority=t,e.callbackNode=n,t}return a!==null&&a!==null&&pe(a),e.callbackPriority=2,e.callbackNode=null,2}function Dm(e,t){if(ft!==0&&ft!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(ol()&&e.callbackNode!==n)return null;var a=Ue;return a=fi(e,e===Je?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),a===0?null:(dm(e,a,t),Nm(e,we()),e.callbackNode!=null&&e.callbackNode===n?Dm.bind(null,e):null)}function jm(e,t){if(ol())return null;dm(e,t,!0)}function Bg(){Pg(function(){(Pe&6)!==0?me(Ee,Fg):Tm()})}function Ts(){if(ta===0){var e=Pa;e===0&&(e=Ta,Ta<<=1,(Ta&261888)===0&&(Ta=256)),ta=e}return ta}function Mm(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:xi(""+e)}function _m(e,t){var n=t.ownerDocument.createElement("input");return n.name=t.name,n.value=t.value,e.id&&n.setAttribute("form",e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function zg(e,t,n,a,i){if(t==="submit"&&n&&n.stateNode===i){var l=Mm((i[Dt]||null).action),u=a.submitter;u&&(t=(t=u[Dt]||null)?Mm(t.formAction):u.getAttribute("formAction"),t!==null&&(l=t,u=null));var M=new Ci("action","action",null,a,i);e.push({event:M,listeners:[{instance:null,listener:function(){if(a.defaultPrevented){if(ta!==0){var G=u?_m(i,u):new FormData(i);Qo(n,{pending:!0,data:G,method:i.method,action:l},null,G)}}else typeof l=="function"&&(M.preventDefault(),G=u?_m(i,u):new FormData(i),Qo(n,{pending:!0,data:G,method:i.method,action:l},l,G))},currentTarget:i}]})}}for(var Ns=0;Ns<co.length;Ns++){var Ds=co[Ns],Rg=Ds.toLowerCase(),Og=Ds[0].toUpperCase()+Ds.slice(1);rn(Rg,"on"+Og)}rn(cd,"onAnimationEnd"),rn(dd,"onAnimationIteration"),rn(ud,"onAnimationStart"),rn("dblclick","onDoubleClick"),rn("focusin","onFocus"),rn("focusout","onBlur"),rn(Jh,"onTransitionRun"),rn(eg,"onTransitionStart"),rn(tg,"onTransitionCancel"),rn(md,"onTransitionEnd"),_a("onMouseEnter",["mouseout","mouseover"]),_a("onMouseLeave",["mouseout","mouseover"]),_a("onPointerEnter",["pointerout","pointerover"]),_a("onPointerLeave",["pointerout","pointerover"]),ca("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),ca("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),ca("onBeforeInput",["compositionend","keypress","textInput","paste"]),ca("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),ca("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),ca("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Zr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ig=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Zr));function Fm(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var a=e[n],i=a.event;a=a.listeners;e:{var l=void 0;if(t)for(var u=a.length-1;0<=u;u--){var M=a[u],G=M.instance,le=M.currentTarget;if(M=M.listener,G!==l&&i.isPropagationStopped())break e;l=M,i.currentTarget=le;try{l(i)}catch(fe){Ai(fe)}i.currentTarget=null,l=G}else for(u=0;u<a.length;u++){if(M=a[u],G=M.instance,le=M.currentTarget,M=M.listener,G!==l&&i.isPropagationStopped())break e;l=M,i.currentTarget=le;try{l(i)}catch(fe){Ai(fe)}i.currentTarget=null,l=G}}}}function Ie(e,t){var n=t[Vl];n===void 0&&(n=t[Vl]=new Set);var a=e+"__bubble";n.has(a)||(Bm(t,e,2,!1),n.add(a))}function js(e,t,n){var a=0;t&&(a|=4),Bm(n,e,a,t)}var dl="_reactListening"+Math.random().toString(36).slice(2);function Ms(e){if(!e[dl]){e[dl]=!0,Tc.forEach(function(n){n!=="selectionchange"&&(Ig.has(n)||js(n,!1,e),js(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[dl]||(t[dl]=!0,js("selectionchange",!1,t))}}function Bm(e,t,n,a){switch(df(t)){case 2:var i=mp;break;case 8:i=fp;break;default:i=Ps}n=i.bind(null,t,n,e),i=void 0,!Kl||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),a?i!==void 0?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):i!==void 0?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function _s(e,t,n,a,i){var l=a;if((t&1)===0&&(t&2)===0&&a!==null)e:for(;;){if(a===null)return;var u=a.tag;if(u===3||u===4){var M=a.stateNode.containerInfo;if(M===i)break;if(u===4)for(u=a.return;u!==null;){var G=u.tag;if((G===3||G===4)&&u.stateNode.containerInfo===i)return;u=u.return}for(;M!==null;){if(u=Da(M),u===null)return;if(G=u.tag,G===5||G===6||G===26||G===27){a=l=u;continue e}M=M.parentNode}}a=a.return}Lc(function(){var le=l,fe=Yl(n),ge=[];e:{var se=fd.get(e);if(se!==void 0){var de=Ci,Ae=e;switch(e){case"keypress":if(bi(n)===0)break e;case"keydown":case"keyup":de=Mh;break;case"focusin":Ae="focus",de=eo;break;case"focusout":Ae="blur",de=eo;break;case"beforeblur":case"afterblur":de=eo;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":de=Gc;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":de=bh;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":de=Bh;break;case cd:case dd:case ud:de=Sh;break;case md:de=Rh;break;case"scroll":case"scrollend":de=xh;break;case"wheel":de=Ih;break;case"copy":case"cut":case"paste":de=Ah;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":de=qc;break;case"toggle":case"beforetoggle":de=Uh}var Me=(t&4)!==0,We=!Me&&(e==="scroll"||e==="scrollend"),ee=Me?se!==null?se+"Capture":null:se;Me=[];for(var $=le,re;$!==null;){var he=$;if(re=he.stateNode,he=he.tag,he!==5&&he!==26&&he!==27||re===null||ee===null||(he=xr($,ee),he!=null&&Me.push(Kr($,he,re))),We)break;$=$.return}0<Me.length&&(se=new de(se,Ae,null,n,fe),ge.push({event:se,listeners:Me}))}}if((t&7)===0){e:{if(se=e==="mouseover"||e==="pointerover",de=e==="mouseout"||e==="pointerout",se&&n!==Ql&&(Ae=n.relatedTarget||n.fromElement)&&(Da(Ae)||Ae[Na]))break e;if((de||se)&&(se=fe.window===fe?fe:(se=fe.ownerDocument)?se.defaultView||se.parentWindow:window,de?(Ae=n.relatedTarget||n.toElement,de=le,Ae=Ae?Da(Ae):null,Ae!==null&&(We=g(Ae),Me=Ae.tag,Ae!==We||Me!==5&&Me!==27&&Me!==6)&&(Ae=null)):(de=null,Ae=le),de!==Ae)){if(Me=Gc,he="onMouseLeave",ee="onMouseEnter",$="mouse",(e==="pointerout"||e==="pointerover")&&(Me=qc,he="onPointerLeave",ee="onPointerEnter",$="pointer"),We=de==null?se:pr(de),re=Ae==null?se:pr(Ae),se=new Me(he,$+"leave",de,n,fe),se.target=We,se.relatedTarget=re,he=null,Da(fe)===le&&(Me=new Me(ee,$+"enter",Ae,n,fe),Me.target=re,Me.relatedTarget=We,he=Me),We=he,de&&Ae)t:{for(Me=Lg,ee=de,$=Ae,re=0,he=ee;he;he=Me(he))re++;he=0;for(var De=$;De;De=Me(De))he++;for(;0<re-he;)ee=Me(ee),re--;for(;0<he-re;)$=Me($),he--;for(;re--;){if(ee===$||$!==null&&ee===$.alternate){Me=ee;break t}ee=Me(ee),$=Me($)}Me=null}else Me=null;de!==null&&zm(ge,se,de,Me,!1),Ae!==null&&We!==null&&zm(ge,We,Ae,Me,!0)}}e:{if(se=le?pr(le):window,de=se.nodeName&&se.nodeName.toLowerCase(),de==="select"||de==="input"&&se.type==="file")var He=Wc;else if(Kc(se))if(Jc)He=Kh;else{He=Yh;var ke=Qh}else de=se.nodeName,!de||de.toLowerCase()!=="input"||se.type!=="checkbox"&&se.type!=="radio"?le&&Pl(le.elementType)&&(He=Wc):He=Zh;if(He&&(He=He(e,le))){Xc(ge,He,n,fe);break e}ke&&ke(e,se,le),e==="focusout"&&le&&se.type==="number"&&le.memoizedProps.value!=null&&$l(se,"number",se.value)}switch(ke=le?pr(le):window,e){case"focusin":(Kc(ke)||ke.contentEditable==="true")&&(Ia=ke,lo=le,kr=null);break;case"focusout":kr=lo=Ia=null;break;case"mousedown":oo=!0;break;case"contextmenu":case"mouseup":case"dragend":oo=!1,od(ge,n,fe);break;case"selectionchange":if(Wh)break;case"keydown":case"keyup":od(ge,n,fe)}var Re;if(no)e:{switch(e){case"compositionstart":var Ve="onCompositionStart";break e;case"compositionend":Ve="onCompositionEnd";break e;case"compositionupdate":Ve="onCompositionUpdate";break e}Ve=void 0}else Oa?Yc(e,n)&&(Ve="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(Ve="onCompositionStart");Ve&&($c&&n.locale!=="ko"&&(Oa||Ve!=="onCompositionStart"?Ve==="onCompositionEnd"&&Oa&&(Re=Uc()):(Ln=fe,Xl="value"in Ln?Ln.value:Ln.textContent,Oa=!0)),ke=ul(le,Ve),0<ke.length&&(Ve=new Hc(Ve,e,null,n,fe),ge.push({event:Ve,listeners:ke}),Re?Ve.data=Re:(Re=Zc(n),Re!==null&&(Ve.data=Re)))),(Re=Gh?Hh(e,n):qh(e,n))&&(Ve=ul(le,"onBeforeInput"),0<Ve.length&&(ke=new Hc("onBeforeInput","beforeinput",null,n,fe),ge.push({event:ke,listeners:Ve}),ke.data=Re)),zg(ge,e,le,n,fe)}Fm(ge,t)})}function Kr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function ul(e,t){for(var n=t+"Capture",a=[];e!==null;){var i=e,l=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||l===null||(i=xr(e,n),i!=null&&a.unshift(Kr(e,i,l)),i=xr(e,t),i!=null&&a.push(Kr(e,i,l))),e.tag===3)return a;e=e.return}return[]}function Lg(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function zm(e,t,n,a,i){for(var l=t._reactName,u=[];n!==null&&n!==a;){var M=n,G=M.alternate,le=M.stateNode;if(M=M.tag,G!==null&&G===a)break;M!==5&&M!==26&&M!==27||le===null||(G=le,i?(le=xr(n,l),le!=null&&u.unshift(Kr(n,le,G))):i||(le=xr(n,l),le!=null&&u.push(Kr(n,le,G)))),n=n.return}u.length!==0&&e.push({event:t,listeners:u})}var Ug=/\r\n?/g,Vg=/\u0000|\uFFFD/g;function Rm(e){return(typeof e=="string"?e:""+e).replace(Ug,`
`).replace(Vg,"")}function Om(e,t){return t=Rm(t),Rm(e)===t}function Xe(e,t,n,a,i,l){switch(n){case"children":typeof a=="string"?t==="body"||t==="textarea"&&a===""||Ba(e,a):(typeof a=="number"||typeof a=="bigint")&&t!=="body"&&Ba(e,""+a);break;case"className":gi(e,"class",a);break;case"tabIndex":gi(e,"tabindex",a);break;case"dir":case"role":case"viewBox":case"width":case"height":gi(e,n,a);break;case"style":Oc(e,a,l);break;case"data":if(t!=="object"){gi(e,"data",a);break}case"src":case"href":if(a===""&&(t!=="a"||n!=="href")){e.removeAttribute(n);break}if(a==null||typeof a=="function"||typeof a=="symbol"||typeof a=="boolean"){e.removeAttribute(n);break}a=xi(""+a),e.setAttribute(n,a);break;case"action":case"formAction":if(typeof a=="function"){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof l=="function"&&(n==="formAction"?(t!=="input"&&Xe(e,t,"name",i.name,i,null),Xe(e,t,"formEncType",i.formEncType,i,null),Xe(e,t,"formMethod",i.formMethod,i,null),Xe(e,t,"formTarget",i.formTarget,i,null)):(Xe(e,t,"encType",i.encType,i,null),Xe(e,t,"method",i.method,i,null),Xe(e,t,"target",i.target,i,null)));if(a==null||typeof a=="symbol"||typeof a=="boolean"){e.removeAttribute(n);break}a=xi(""+a),e.setAttribute(n,a);break;case"onClick":a!=null&&(e.onclick=yn);break;case"onScroll":a!=null&&Ie("scroll",e);break;case"onScrollEnd":a!=null&&Ie("scrollend",e);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(x(61));if(n=a.__html,n!=null){if(i.children!=null)throw Error(x(60));e.innerHTML=n}}break;case"multiple":e.multiple=a&&typeof a!="function"&&typeof a!="symbol";break;case"muted":e.muted=a&&typeof a!="function"&&typeof a!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(a==null||typeof a=="function"||typeof a=="boolean"||typeof a=="symbol"){e.removeAttribute("xlink:href");break}n=xi(""+a),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":a!=null&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(n,""+a):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":a&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":a===!0?e.setAttribute(n,""):a!==!1&&a!=null&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(n,a):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":a!=null&&typeof a!="function"&&typeof a!="symbol"&&!isNaN(a)&&1<=a?e.setAttribute(n,a):e.removeAttribute(n);break;case"rowSpan":case"start":a==null||typeof a=="function"||typeof a=="symbol"||isNaN(a)?e.removeAttribute(n):e.setAttribute(n,a);break;case"popover":Ie("beforetoggle",e),Ie("toggle",e),hi(e,"popover",a);break;case"xlinkActuate":xn(e,"http://www.w3.org/1999/xlink","xlink:actuate",a);break;case"xlinkArcrole":xn(e,"http://www.w3.org/1999/xlink","xlink:arcrole",a);break;case"xlinkRole":xn(e,"http://www.w3.org/1999/xlink","xlink:role",a);break;case"xlinkShow":xn(e,"http://www.w3.org/1999/xlink","xlink:show",a);break;case"xlinkTitle":xn(e,"http://www.w3.org/1999/xlink","xlink:title",a);break;case"xlinkType":xn(e,"http://www.w3.org/1999/xlink","xlink:type",a);break;case"xmlBase":xn(e,"http://www.w3.org/XML/1998/namespace","xml:base",a);break;case"xmlLang":xn(e,"http://www.w3.org/XML/1998/namespace","xml:lang",a);break;case"xmlSpace":xn(e,"http://www.w3.org/XML/1998/namespace","xml:space",a);break;case"is":hi(e,"is",a);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=gh.get(n)||n,hi(e,n,a))}}function Fs(e,t,n,a,i,l){switch(n){case"style":Oc(e,a,l);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(x(61));if(n=a.__html,n!=null){if(i.children!=null)throw Error(x(60));e.innerHTML=n}}break;case"children":typeof a=="string"?Ba(e,a):(typeof a=="number"||typeof a=="bigint")&&Ba(e,""+a);break;case"onScroll":a!=null&&Ie("scroll",e);break;case"onScrollEnd":a!=null&&Ie("scrollend",e);break;case"onClick":a!=null&&(e.onclick=yn);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Nc.hasOwnProperty(n))e:{if(n[0]==="o"&&n[1]==="n"&&(i=n.endsWith("Capture"),t=n.slice(2,i?n.length-7:void 0),l=e[Dt]||null,l=l!=null?l[n]:null,typeof l=="function"&&e.removeEventListener(t,l,i),typeof a=="function")){typeof l!="function"&&l!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,a,i);break e}n in e?e[n]=a:a===!0?e.setAttribute(n,""):hi(e,n,a)}}}function At(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Ie("error",e),Ie("load",e);var a=!1,i=!1,l;for(l in n)if(n.hasOwnProperty(l)){var u=n[l];if(u!=null)switch(l){case"src":a=!0;break;case"srcSet":i=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(x(137,t));default:Xe(e,t,l,u,n,null)}}i&&Xe(e,t,"srcSet",n.srcSet,n,null),a&&Xe(e,t,"src",n.src,n,null);return;case"input":Ie("invalid",e);var M=l=u=i=null,G=null,le=null;for(a in n)if(n.hasOwnProperty(a)){var fe=n[a];if(fe!=null)switch(a){case"name":i=fe;break;case"type":u=fe;break;case"checked":G=fe;break;case"defaultChecked":le=fe;break;case"value":l=fe;break;case"defaultValue":M=fe;break;case"children":case"dangerouslySetInnerHTML":if(fe!=null)throw Error(x(137,t));break;default:Xe(e,t,a,fe,n,null)}}Fc(e,l,M,G,le,u,i,!1);return;case"select":Ie("invalid",e),a=u=l=null;for(i in n)if(n.hasOwnProperty(i)&&(M=n[i],M!=null))switch(i){case"value":l=M;break;case"defaultValue":u=M;break;case"multiple":a=M;default:Xe(e,t,i,M,n,null)}t=l,n=u,e.multiple=!!a,t!=null?Fa(e,!!a,t,!1):n!=null&&Fa(e,!!a,n,!0);return;case"textarea":Ie("invalid",e),l=i=a=null;for(u in n)if(n.hasOwnProperty(u)&&(M=n[u],M!=null))switch(u){case"value":a=M;break;case"defaultValue":i=M;break;case"children":l=M;break;case"dangerouslySetInnerHTML":if(M!=null)throw Error(x(91));break;default:Xe(e,t,u,M,n,null)}zc(e,a,i,l);return;case"option":for(G in n)if(n.hasOwnProperty(G)&&(a=n[G],a!=null))switch(G){case"selected":e.selected=a&&typeof a!="function"&&typeof a!="symbol";break;default:Xe(e,t,G,a,n,null)}return;case"dialog":Ie("beforetoggle",e),Ie("toggle",e),Ie("cancel",e),Ie("close",e);break;case"iframe":case"object":Ie("load",e);break;case"video":case"audio":for(a=0;a<Zr.length;a++)Ie(Zr[a],e);break;case"image":Ie("error",e),Ie("load",e);break;case"details":Ie("toggle",e);break;case"embed":case"source":case"link":Ie("error",e),Ie("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(le in n)if(n.hasOwnProperty(le)&&(a=n[le],a!=null))switch(le){case"children":case"dangerouslySetInnerHTML":throw Error(x(137,t));default:Xe(e,t,le,a,n,null)}return;default:if(Pl(t)){for(fe in n)n.hasOwnProperty(fe)&&(a=n[fe],a!==void 0&&Fs(e,t,fe,a,n,void 0));return}}for(M in n)n.hasOwnProperty(M)&&(a=n[M],a!=null&&Xe(e,t,M,a,n,null))}function Gg(e,t,n,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var i=null,l=null,u=null,M=null,G=null,le=null,fe=null;for(de in n){var ge=n[de];if(n.hasOwnProperty(de)&&ge!=null)switch(de){case"checked":break;case"value":break;case"defaultValue":G=ge;default:a.hasOwnProperty(de)||Xe(e,t,de,null,a,ge)}}for(var se in a){var de=a[se];if(ge=n[se],a.hasOwnProperty(se)&&(de!=null||ge!=null))switch(se){case"type":l=de;break;case"name":i=de;break;case"checked":le=de;break;case"defaultChecked":fe=de;break;case"value":u=de;break;case"defaultValue":M=de;break;case"children":case"dangerouslySetInnerHTML":if(de!=null)throw Error(x(137,t));break;default:de!==ge&&Xe(e,t,se,de,a,ge)}}ql(e,u,M,G,le,fe,l,i);return;case"select":de=u=M=se=null;for(l in n)if(G=n[l],n.hasOwnProperty(l)&&G!=null)switch(l){case"value":break;case"multiple":de=G;default:a.hasOwnProperty(l)||Xe(e,t,l,null,a,G)}for(i in a)if(l=a[i],G=n[i],a.hasOwnProperty(i)&&(l!=null||G!=null))switch(i){case"value":se=l;break;case"defaultValue":M=l;break;case"multiple":u=l;default:l!==G&&Xe(e,t,i,l,a,G)}t=M,n=u,a=de,se!=null?Fa(e,!!n,se,!1):!!a!=!!n&&(t!=null?Fa(e,!!n,t,!0):Fa(e,!!n,n?[]:"",!1));return;case"textarea":de=se=null;for(M in n)if(i=n[M],n.hasOwnProperty(M)&&i!=null&&!a.hasOwnProperty(M))switch(M){case"value":break;case"children":break;default:Xe(e,t,M,null,a,i)}for(u in a)if(i=a[u],l=n[u],a.hasOwnProperty(u)&&(i!=null||l!=null))switch(u){case"value":se=i;break;case"defaultValue":de=i;break;case"children":break;case"dangerouslySetInnerHTML":if(i!=null)throw Error(x(91));break;default:i!==l&&Xe(e,t,u,i,a,l)}Bc(e,se,de);return;case"option":for(var Ae in n)if(se=n[Ae],n.hasOwnProperty(Ae)&&se!=null&&!a.hasOwnProperty(Ae))switch(Ae){case"selected":e.selected=!1;break;default:Xe(e,t,Ae,null,a,se)}for(G in a)if(se=a[G],de=n[G],a.hasOwnProperty(G)&&se!==de&&(se!=null||de!=null))switch(G){case"selected":e.selected=se&&typeof se!="function"&&typeof se!="symbol";break;default:Xe(e,t,G,se,a,de)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var Me in n)se=n[Me],n.hasOwnProperty(Me)&&se!=null&&!a.hasOwnProperty(Me)&&Xe(e,t,Me,null,a,se);for(le in a)if(se=a[le],de=n[le],a.hasOwnProperty(le)&&se!==de&&(se!=null||de!=null))switch(le){case"children":case"dangerouslySetInnerHTML":if(se!=null)throw Error(x(137,t));break;default:Xe(e,t,le,se,a,de)}return;default:if(Pl(t)){for(var We in n)se=n[We],n.hasOwnProperty(We)&&se!==void 0&&!a.hasOwnProperty(We)&&Fs(e,t,We,void 0,a,se);for(fe in a)se=a[fe],de=n[fe],!a.hasOwnProperty(fe)||se===de||se===void 0&&de===void 0||Fs(e,t,fe,se,a,de);return}}for(var ee in n)se=n[ee],n.hasOwnProperty(ee)&&se!=null&&!a.hasOwnProperty(ee)&&Xe(e,t,ee,null,a,se);for(ge in a)se=a[ge],de=n[ge],!a.hasOwnProperty(ge)||se===de||se==null&&de==null||Xe(e,t,ge,se,a,de)}function Im(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Hg(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,n=performance.getEntriesByType("resource"),a=0;a<n.length;a++){var i=n[a],l=i.transferSize,u=i.initiatorType,M=i.duration;if(l&&M&&Im(u)){for(u=0,M=i.responseEnd,a+=1;a<n.length;a++){var G=n[a],le=G.startTime;if(le>M)break;var fe=G.transferSize,ge=G.initiatorType;fe&&Im(ge)&&(G=G.responseEnd,u+=fe*(G<M?1:(M-le)/(G-le)))}if(--a,t+=8*(l+u)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Bs=null,zs=null;function ml(e){return e.nodeType===9?e:e.ownerDocument}function Lm(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Um(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function Rs(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Os=null;function qg(){var e=window.event;return e&&e.type==="popstate"?e===Os?!1:(Os=e,!0):(Os=null,!1)}var Vm=typeof setTimeout=="function"?setTimeout:void 0,$g=typeof clearTimeout=="function"?clearTimeout:void 0,Gm=typeof Promise=="function"?Promise:void 0,Pg=typeof queueMicrotask=="function"?queueMicrotask:typeof Gm<"u"?function(e){return Gm.resolve(null).then(e).catch(Qg)}:Vm;function Qg(e){setTimeout(function(){throw e})}function na(e){return e==="head"}function Hm(e,t){var n=t,a=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"||n==="/&"){if(a===0){e.removeChild(i),ur(t);return}a--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")a++;else if(n==="html")Xr(e.ownerDocument.documentElement);else if(n==="head"){n=e.ownerDocument.head,Xr(n);for(var l=n.firstChild;l;){var u=l.nextSibling,M=l.nodeName;l[gr]||M==="SCRIPT"||M==="STYLE"||M==="LINK"&&l.rel.toLowerCase()==="stylesheet"||n.removeChild(l),l=u}}else n==="body"&&Xr(e.ownerDocument.body);n=i}while(n);ur(t)}function qm(e,t){var n=e;e=0;do{var a=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(e===0)break;e--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||e++;n=a}while(n)}function Is(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":Is(n),Gl(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}e.removeChild(n)}}function Yg(e,t,n,a){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!a&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(a){if(!e[gr])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(l=e.getAttribute("rel"),l==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(l!==i.rel||e.getAttribute("href")!==(i.href==null||i.href===""?null:i.href)||e.getAttribute("crossorigin")!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute("title")!==(i.title==null?null:i.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(l=e.getAttribute("src"),(l!==(i.src==null?null:i.src)||e.getAttribute("type")!==(i.type==null?null:i.type)||e.getAttribute("crossorigin")!==(i.crossOrigin==null?null:i.crossOrigin))&&l&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var l=i.name==null?null:""+i.name;if(i.type==="hidden"&&e.getAttribute("name")===l)return e}else return e;if(e=en(e.nextSibling),e===null)break}return null}function Zg(e,t,n){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=en(e.nextSibling),e===null))return null;return e}function $m(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=en(e.nextSibling),e===null))return null;return e}function Ls(e){return e.data==="$?"||e.data==="$~"}function Us(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function Kg(e,t){var n=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||n.readyState!=="loading")t();else{var a=function(){t(),n.removeEventListener("DOMContentLoaded",a)};n.addEventListener("DOMContentLoaded",a),e._reactRetry=a}}function en(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var Vs=null;function Pm(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"||n==="/&"){if(t===0)return en(e.nextSibling);t--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||t++}e=e.nextSibling}return null}function Qm(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(t===0)return e;t--}else n!=="/$"&&n!=="/&"||t++}e=e.previousSibling}return null}function Ym(e,t,n){switch(t=ml(n),e){case"html":if(e=t.documentElement,!e)throw Error(x(452));return e;case"head":if(e=t.head,!e)throw Error(x(453));return e;case"body":if(e=t.body,!e)throw Error(x(454));return e;default:throw Error(x(451))}}function Xr(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Gl(e)}var tn=new Map,Zm=new Set;function fl(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Bn=Y.d;Y.d={f:Xg,r:Wg,D:Jg,C:ep,L:tp,m:np,X:rp,S:ap,M:ip};function Xg(){var e=Bn.f(),t=rl();return e||t}function Wg(e){var t=ja(e);t!==null&&t.tag===5&&t.type==="form"?mu(t):Bn.r(e)}var sr=typeof document>"u"?null:document;function Km(e,t,n){var a=sr;if(a&&typeof t=="string"&&t){var i=Qt(t);i='link[rel="'+e+'"][href="'+i+'"]',typeof n=="string"&&(i+='[crossorigin="'+n+'"]'),Zm.has(i)||(Zm.add(i),e={rel:e,crossOrigin:n,href:t},a.querySelector(i)===null&&(t=a.createElement("link"),At(t,"link",e),pt(t),a.head.appendChild(t)))}}function Jg(e){Bn.D(e),Km("dns-prefetch",e,null)}function ep(e,t){Bn.C(e,t),Km("preconnect",e,t)}function tp(e,t,n){Bn.L(e,t,n);var a=sr;if(a&&e&&t){var i='link[rel="preload"][as="'+Qt(t)+'"]';t==="image"&&n&&n.imageSrcSet?(i+='[imagesrcset="'+Qt(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(i+='[imagesizes="'+Qt(n.imageSizes)+'"]')):i+='[href="'+Qt(e)+'"]';var l=i;switch(t){case"style":l=cr(e);break;case"script":l=dr(e)}tn.has(l)||(e=S({rel:"preload",href:t==="image"&&n&&n.imageSrcSet?void 0:e,as:t},n),tn.set(l,e),a.querySelector(i)!==null||t==="style"&&a.querySelector(Wr(l))||t==="script"&&a.querySelector(Jr(l))||(t=a.createElement("link"),At(t,"link",e),pt(t),a.head.appendChild(t)))}}function np(e,t){Bn.m(e,t);var n=sr;if(n&&e){var a=t&&typeof t.as=="string"?t.as:"script",i='link[rel="modulepreload"][as="'+Qt(a)+'"][href="'+Qt(e)+'"]',l=i;switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":l=dr(e)}if(!tn.has(l)&&(e=S({rel:"modulepreload",href:e},t),tn.set(l,e),n.querySelector(i)===null)){switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Jr(l)))return}a=n.createElement("link"),At(a,"link",e),pt(a),n.head.appendChild(a)}}}function ap(e,t,n){Bn.S(e,t,n);var a=sr;if(a&&e){var i=Ma(a).hoistableStyles,l=cr(e);t=t||"default";var u=i.get(l);if(!u){var M={loading:0,preload:null};if(u=a.querySelector(Wr(l)))M.loading=5;else{e=S({rel:"stylesheet",href:e,"data-precedence":t},n),(n=tn.get(l))&&Gs(e,n);var G=u=a.createElement("link");pt(G),At(G,"link",e),G._p=new Promise(function(le,fe){G.onload=le,G.onerror=fe}),G.addEventListener("load",function(){M.loading|=1}),G.addEventListener("error",function(){M.loading|=2}),M.loading|=4,hl(u,t,a)}u={type:"stylesheet",instance:u,count:1,state:M},i.set(l,u)}}}function rp(e,t){Bn.X(e,t);var n=sr;if(n&&e){var a=Ma(n).hoistableScripts,i=dr(e),l=a.get(i);l||(l=n.querySelector(Jr(i)),l||(e=S({src:e,async:!0},t),(t=tn.get(i))&&Hs(e,t),l=n.createElement("script"),pt(l),At(l,"link",e),n.head.appendChild(l)),l={type:"script",instance:l,count:1,state:null},a.set(i,l))}}function ip(e,t){Bn.M(e,t);var n=sr;if(n&&e){var a=Ma(n).hoistableScripts,i=dr(e),l=a.get(i);l||(l=n.querySelector(Jr(i)),l||(e=S({src:e,async:!0,type:"module"},t),(t=tn.get(i))&&Hs(e,t),l=n.createElement("script"),pt(l),At(l,"link",e),n.head.appendChild(l)),l={type:"script",instance:l,count:1,state:null},a.set(i,l))}}function Xm(e,t,n,a){var i=(i=ye.current)?fl(i):null;if(!i)throw Error(x(446));switch(e){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(t=cr(n.href),n=Ma(i).hoistableStyles,a=n.get(t),a||(a={type:"style",instance:null,count:0,state:null},n.set(t,a)),a):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){e=cr(n.href);var l=Ma(i).hoistableStyles,u=l.get(e);if(u||(i=i.ownerDocument||i,u={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},l.set(e,u),(l=i.querySelector(Wr(e)))&&!l._p&&(u.instance=l,u.state.loading=5),tn.has(e)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},tn.set(e,n),l||lp(i,e,n,u.state))),t&&a===null)throw Error(x(528,""));return u}if(t&&a!==null)throw Error(x(529,""));return null;case"script":return t=n.async,n=n.src,typeof n=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=dr(n),n=Ma(i).hoistableScripts,a=n.get(t),a||(a={type:"script",instance:null,count:0,state:null},n.set(t,a)),a):{type:"void",instance:null,count:0,state:null};default:throw Error(x(444,e))}}function cr(e){return'href="'+Qt(e)+'"'}function Wr(e){return'link[rel="stylesheet"]['+e+"]"}function Wm(e){return S({},e,{"data-precedence":e.precedence,precedence:null})}function lp(e,t,n,a){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?a.loading=1:(t=e.createElement("link"),a.preload=t,t.addEventListener("load",function(){return a.loading|=1}),t.addEventListener("error",function(){return a.loading|=2}),At(t,"link",n),pt(t),e.head.appendChild(t))}function dr(e){return'[src="'+Qt(e)+'"]'}function Jr(e){return"script[async]"+e}function Jm(e,t,n){if(t.count++,t.instance===null)switch(t.type){case"style":var a=e.querySelector('style[data-href~="'+Qt(n.href)+'"]');if(a)return t.instance=a,pt(a),a;var i=S({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return a=(e.ownerDocument||e).createElement("style"),pt(a),At(a,"style",i),hl(a,n.precedence,e),t.instance=a;case"stylesheet":i=cr(n.href);var l=e.querySelector(Wr(i));if(l)return t.state.loading|=4,t.instance=l,pt(l),l;a=Wm(n),(i=tn.get(i))&&Gs(a,i),l=(e.ownerDocument||e).createElement("link"),pt(l);var u=l;return u._p=new Promise(function(M,G){u.onload=M,u.onerror=G}),At(l,"link",a),t.state.loading|=4,hl(l,n.precedence,e),t.instance=l;case"script":return l=dr(n.src),(i=e.querySelector(Jr(l)))?(t.instance=i,pt(i),i):(a=n,(i=tn.get(l))&&(a=S({},n),Hs(a,i)),e=e.ownerDocument||e,i=e.createElement("script"),pt(i),At(i,"link",a),e.head.appendChild(i),t.instance=i);case"void":return null;default:throw Error(x(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(a=t.instance,t.state.loading|=4,hl(a,n.precedence,e));return t.instance}function hl(e,t,n){for(var a=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),i=a.length?a[a.length-1]:null,l=i,u=0;u<a.length;u++){var M=a[u];if(M.dataset.precedence===t)l=M;else if(l!==i)break}l?l.parentNode.insertBefore(e,l.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Gs(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Hs(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var gl=null;function ef(e,t,n){if(gl===null){var a=new Map,i=gl=new Map;i.set(n,a)}else i=gl,a=i.get(n),a||(a=new Map,i.set(n,a));if(a.has(e))return a;for(a.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var l=n[i];if(!(l[gr]||l[vt]||e==="link"&&l.getAttribute("rel")==="stylesheet")&&l.namespaceURI!=="http://www.w3.org/2000/svg"){var u=l.getAttribute(t)||"";u=e+u;var M=a.get(u);M?M.push(l):a.set(u,[l])}}return a}function tf(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t==="title"?e.querySelector("head > title"):null)}function op(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function nf(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function sp(e,t,n,a){if(n.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var i=cr(a.href),l=t.querySelector(Wr(i));if(l){t=l._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=pl.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=l,pt(l);return}l=t.ownerDocument||t,a=Wm(a),(i=tn.get(i))&&Gs(a,i),l=l.createElement("link"),pt(l);var u=l;u._p=new Promise(function(M,G){u.onload=M,u.onerror=G}),At(l,"link",a),n.instance=l}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&(n.state.loading&3)===0&&(e.count++,n=pl.bind(e),t.addEventListener("load",n),t.addEventListener("error",n))}}var qs=0;function cp(e,t){return e.stylesheets&&e.count===0&&yl(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var a=setTimeout(function(){if(e.stylesheets&&yl(e,e.stylesheets),e.unsuspend){var l=e.unsuspend;e.unsuspend=null,l()}},6e4+t);0<e.imgBytes&&qs===0&&(qs=62500*Hg());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&yl(e,e.stylesheets),e.unsuspend)){var l=e.unsuspend;e.unsuspend=null,l()}},(e.imgBytes>qs?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(a),clearTimeout(i)}}:null}function pl(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)yl(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var xl=null;function yl(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,xl=new Map,t.forEach(dp,e),xl=null,pl.call(e))}function dp(e,t){if(!(t.state.loading&4)){var n=xl.get(e);if(n)var a=n.get(null);else{n=new Map,xl.set(e,n);for(var i=e.querySelectorAll("link[data-precedence],style[data-precedence]"),l=0;l<i.length;l++){var u=i[l];(u.nodeName==="LINK"||u.getAttribute("media")!=="not all")&&(n.set(u.dataset.precedence,u),a=u)}a&&n.set(null,a)}i=t.instance,u=i.getAttribute("data-precedence"),l=n.get(u)||a,l===a&&n.set(null,i),n.set(u,i),this.count++,a=pl.bind(this),i.addEventListener("load",a),i.addEventListener("error",a),l?l.parentNode.insertBefore(i,l.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var ei={$$typeof:R,Provider:null,Consumer:null,_currentValue:P,_currentValue2:P,_threadCount:0};function up(e,t,n,a,i,l,u,M,G){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Il(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Il(0),this.hiddenUpdates=Il(null),this.identifierPrefix=a,this.onUncaughtError=i,this.onCaughtError=l,this.onRecoverableError=u,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=G,this.incompleteTransitions=new Map}function af(e,t,n,a,i,l,u,M,G,le,fe,ge){return e=new up(e,t,n,u,G,le,fe,ge,M),t=1,l===!0&&(t|=24),l=It(3,null,null,t),e.current=l,l.stateNode=e,t=wo(),t.refCount++,e.pooledCache=t,t.refCount++,l.memoizedState={element:a,isDehydrated:n,cache:t},To(l),e}function rf(e){return e?(e=Va,e):Va}function lf(e,t,n,a,i,l){i=rf(i),a.context===null?a.context=i:a.pendingContext=i,a=$n(t),a.payload={element:n},l=l===void 0?null:l,l!==null&&(a.callback=l),n=Pn(e,a,t),n!==null&&(zt(n,e,t),_r(n,e,t))}function of(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function $s(e,t){of(e,t),(e=e.alternate)&&of(e,t)}function sf(e){if(e.tag===13||e.tag===31){var t=fa(e,67108864);t!==null&&zt(t,e,67108864),$s(e,67108864)}}function cf(e){if(e.tag===13||e.tag===31){var t=Ht();t=Ll(t);var n=fa(e,t);n!==null&&zt(n,e,t),$s(e,t)}}var bl=!0;function mp(e,t,n,a){var i=Q.T;Q.T=null;var l=Y.p;try{Y.p=2,Ps(e,t,n,a)}finally{Y.p=l,Q.T=i}}function fp(e,t,n,a){var i=Q.T;Q.T=null;var l=Y.p;try{Y.p=8,Ps(e,t,n,a)}finally{Y.p=l,Q.T=i}}function Ps(e,t,n,a){if(bl){var i=Qs(a);if(i===null)_s(e,t,a,vl,n),uf(e,a);else if(gp(i,e,t,n,a))a.stopPropagation();else if(uf(e,a),t&4&&-1<hp.indexOf(e)){for(;i!==null;){var l=ja(i);if(l!==null)switch(l.tag){case 3:if(l=l.stateNode,l.current.memoizedState.isDehydrated){var u=$t(l.pendingLanes);if(u!==0){var M=l;for(M.pendingLanes|=2,M.entangledLanes|=2;u;){var G=1<<31-rt(u);M.entanglements[1]|=G,u&=~G}hn(l),(Pe&6)===0&&(nl=we()+500,Yr(0))}}break;case 31:case 13:M=fa(l,2),M!==null&&zt(M,l,2),rl(),$s(l,2)}if(l=Qs(a),l===null&&_s(e,t,a,vl,n),l===i)break;i=l}i!==null&&a.stopPropagation()}else _s(e,t,a,null,n)}}function Qs(e){return e=Yl(e),Ys(e)}var vl=null;function Ys(e){if(vl=null,e=Da(e),e!==null){var t=g(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=f(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return vl=e,null}function df(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Ce()){case Ee:return 2;case $e:return 8;case ze:case bt:return 32;case an:return 268435456;default:return 32}default:return 32}}var Zs=!1,aa=null,ra=null,ia=null,ti=new Map,ni=new Map,la=[],hp="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function uf(e,t){switch(e){case"focusin":case"focusout":aa=null;break;case"dragenter":case"dragleave":ra=null;break;case"mouseover":case"mouseout":ia=null;break;case"pointerover":case"pointerout":ti.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":ni.delete(t.pointerId)}}function ai(e,t,n,a,i,l){return e===null||e.nativeEvent!==l?(e={blockedOn:t,domEventName:n,eventSystemFlags:a,nativeEvent:l,targetContainers:[i]},t!==null&&(t=ja(t),t!==null&&sf(t)),e):(e.eventSystemFlags|=a,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function gp(e,t,n,a,i){switch(t){case"focusin":return aa=ai(aa,e,t,n,a,i),!0;case"dragenter":return ra=ai(ra,e,t,n,a,i),!0;case"mouseover":return ia=ai(ia,e,t,n,a,i),!0;case"pointerover":var l=i.pointerId;return ti.set(l,ai(ti.get(l)||null,e,t,n,a,i)),!0;case"gotpointercapture":return l=i.pointerId,ni.set(l,ai(ni.get(l)||null,e,t,n,a,i)),!0}return!1}function mf(e){var t=Da(e.target);if(t!==null){var n=g(t);if(n!==null){if(t=n.tag,t===13){if(t=f(n),t!==null){e.blockedOn=t,kc(e.priority,function(){cf(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,kc(e.priority,function(){cf(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Cl(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Qs(e.nativeEvent);if(n===null){n=e.nativeEvent;var a=new n.constructor(n.type,n);Ql=a,n.target.dispatchEvent(a),Ql=null}else return t=ja(n),t!==null&&sf(t),e.blockedOn=n,!1;t.shift()}return!0}function ff(e,t,n){Cl(e)&&n.delete(t)}function pp(){Zs=!1,aa!==null&&Cl(aa)&&(aa=null),ra!==null&&Cl(ra)&&(ra=null),ia!==null&&Cl(ia)&&(ia=null),ti.forEach(ff),ni.forEach(ff)}function Sl(e,t){e.blockedOn===t&&(e.blockedOn=null,Zs||(Zs=!0,B.unstable_scheduleCallback(B.unstable_NormalPriority,pp)))}var wl=null;function hf(e){wl!==e&&(wl=e,B.unstable_scheduleCallback(B.unstable_NormalPriority,function(){wl===e&&(wl=null);for(var t=0;t<e.length;t+=3){var n=e[t],a=e[t+1],i=e[t+2];if(typeof a!="function"){if(Ys(a||n)===null)continue;break}var l=ja(n);l!==null&&(e.splice(t,3),t-=3,Qo(l,{pending:!0,data:i,method:n.method,action:a},a,i))}}))}function ur(e){function t(G){return Sl(G,e)}aa!==null&&Sl(aa,e),ra!==null&&Sl(ra,e),ia!==null&&Sl(ia,e),ti.forEach(t),ni.forEach(t);for(var n=0;n<la.length;n++){var a=la[n];a.blockedOn===e&&(a.blockedOn=null)}for(;0<la.length&&(n=la[0],n.blockedOn===null);)mf(n),n.blockedOn===null&&la.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(a=0;a<n.length;a+=3){var i=n[a],l=n[a+1],u=i[Dt]||null;if(typeof l=="function")u||hf(n);else if(u){var M=null;if(l&&l.hasAttribute("formAction")){if(i=l,u=l[Dt]||null)M=u.formAction;else if(Ys(i)!==null)continue}else M=u.action;typeof M=="function"?n[a+1]=M:(n.splice(a,3),a-=3),hf(n)}}}function gf(){function e(l){l.canIntercept&&l.info==="react-transition"&&l.intercept({handler:function(){return new Promise(function(u){return i=u})},focusReset:"manual",scroll:"manual"})}function t(){i!==null&&(i(),i=null),a||setTimeout(n,20)}function n(){if(!a&&!navigation.transition){var l=navigation.currentEntry;l&&l.url!=null&&navigation.navigate(l.url,{state:l.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var a=!1,i=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(n,100),function(){a=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),i!==null&&(i(),i=null)}}}function Ks(e){this._internalRoot=e}Al.prototype.render=Ks.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(x(409));var n=t.current,a=Ht();lf(n,a,e,t,null,null)},Al.prototype.unmount=Ks.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;lf(e.current,2,null,e,null,null),rl(),t[Na]=null}};function Al(e){this._internalRoot=e}Al.prototype.unstable_scheduleHydration=function(e){if(e){var t=Ac();e={blockedOn:null,target:e,priority:t};for(var n=0;n<la.length&&t!==0&&t<la[n].priority;n++);la.splice(n,0,e),n===0&&mf(e)}};var pf=b.version;if(pf!=="19.2.8")throw Error(x(527,pf,"19.2.8"));Y.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(x(188)):(e=Object.keys(e).join(","),Error(x(268,e)));return e=h(t),e=e!==null?k(e):null,e=e===null?null:e.stateNode,e};var xp={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:Q,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var kl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!kl.isDisabled&&kl.supportsFiber)try{Qe=kl.inject(xp),gt=kl}catch{}}return ii.createRoot=function(e,t){if(!w(e))throw Error(x(299));var n=!1,a="",i=Su,l=wu,u=Au;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(a=t.identifierPrefix),t.onUncaughtError!==void 0&&(i=t.onUncaughtError),t.onCaughtError!==void 0&&(l=t.onCaughtError),t.onRecoverableError!==void 0&&(u=t.onRecoverableError)),t=af(e,1,!1,null,null,n,a,null,i,l,u,gf),e[Na]=t.current,Ms(e),new Ks(t)},ii.hydrateRoot=function(e,t,n){if(!w(e))throw Error(x(299));var a=!1,i="",l=Su,u=wu,M=Au,G=null;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onUncaughtError!==void 0&&(l=n.onUncaughtError),n.onCaughtError!==void 0&&(u=n.onCaughtError),n.onRecoverableError!==void 0&&(M=n.onRecoverableError),n.formState!==void 0&&(G=n.formState)),t=af(e,1,!0,t,n??null,a,i,G,l,u,M,gf),t.context=rf(null),n=t.current,a=Ht(),a=Ll(a),i=$n(a),i.callback=null,Pn(n,i,a),n=a,t.current.lanes=n,hr(t,n),hn(t),e[Na]=t.current,Ms(e),new Al(t)},ii.version="19.2.8",ii}var Ef;function Tp(){if(Ef)return Js.exports;Ef=1;function B(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(B)}catch(b){console.error(b)}}return B(),Js.exports=Ep(),Js.exports}var Np=Tp();const Tt={TRANSACTIONS:"finance_app_transactions_v1",PLANS:"finance_app_plans_v2",GOALS_LEGACY:"finance_app_goals_v1",BUDGETS:"finance_app_budgets_v1",CATEGORIES:"finance_app_categories_v1",BIOMETRICS:"finance_app_biometrics_enabled",THEME:"finance_app_theme",LANGUAGE:"finance_app_language"},Tf=[{id:"tx-1",type:"income",amount:66e5,currency:"IQD",date:new Date(Date.now()-2880*60*1e3).toISOString(),category:"Income",source:"Salary",itemDescription:"Monthly Senior Engineer Salary",notes:"Direct bank transfer from tech firm",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},{id:"tx-2",type:"expense",amount:12e5,currency:"IQD",date:new Date(Date.now()-4320*60*1e3).toISOString(),category:"Rent",source:"",itemDescription:"Al-Mansour Apartment Rent",notes:"Paid cash to building owner",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},{id:"tx-3",type:"income",amount:125e4,currency:"IQD",date:new Date(Date.now()-7200*60*1e3).toISOString(),category:"Income",source:"Freelance",itemDescription:"iOS App Design & Consulting",notes:"Client milestone 2 delivery",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},{id:"tx-4",type:"expense",amount:48e4,currency:"IQD",date:new Date(Date.now()-5760*60*1e3).toISOString(),category:"Food",source:"",itemDescription:"Family Weekly Groceries (Carrefour)",notes:"Fresh produce, meat and household supplies",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},{id:"tx-5",type:"expense",amount:25e4,currency:"IQD",date:new Date(Date.now()-8640*60*1e3).toISOString(),category:"Car",source:"",itemDescription:"Fuel & Oil Filter Change",notes:"Toyota service center",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},{id:"tx-6",type:"expense",amount:18e4,currency:"IQD",date:new Date(Date.now()-11520*60*1e3).toISOString(),category:"Bills",source:"",itemDescription:"Private Generator & Fiber Net",notes:"Amperage monthly fee + internet",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},{id:"tx-7",type:"expense",amount:85e3,currency:"IQD",date:new Date(Date.now()-14400*60*1e3).toISOString(),category:"Gym",source:"",itemDescription:"Monthly Fitness Center Pass",notes:"Al-Rabie Sports Club",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},{id:"tx-8",type:"expense",amount:14e4,currency:"IQD",date:new Date(Date.now()-288*60*60*1e3).toISOString(),category:"Entertainment",source:"",itemDescription:"Dinner with Family at Samad",notes:"Traditional Iraqi masgouf dinner",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()}],Nf=[{id:"plan-1",name:"Emergency Reserve Fund",targetAmount:8e6,allocatedAmount:45e5,currency:"IQD",startDate:new Date(Date.now()-2160*60*60*1e3).toISOString(),targetDate:new Date(Date.now()+4320*60*60*1e3).toISOString(),priority:"critical",plannedMonthlyAmount:6e5,planDescription:"6 months of essential living expenses cash cushion",isCompleted:!1,createdAt:new Date(Date.now()-2160*60*60*1e3).toISOString(),updatedAt:new Date().toISOString(),completedAt:null},{id:"plan-2",name:"New Family SUV Down Payment",targetAmount:18e6,allocatedAmount:65e5,currency:"IQD",startDate:new Date(Date.now()-2880*60*60*1e3).toISOString(),targetDate:new Date(Date.now()+300*24*60*60*1e3).toISOString(),priority:"high",plannedMonthlyAmount:115e4,planDescription:"Down payment for a reliable Toyota RAV4 or Prado",isCompleted:!1,createdAt:new Date(Date.now()-2880*60*60*1e3).toISOString(),updatedAt:new Date().toISOString(),completedAt:null},{id:"plan-3",name:"Dubai Tech & Family Holiday",targetAmount:4e6,allocatedAmount:4e6,currency:"IQD",startDate:new Date(Date.now()-3600*60*60*1e3).toISOString(),targetDate:new Date(Date.now()-7200*60*1e3).toISOString(),priority:"medium",plannedMonthlyAmount:4e5,planDescription:"Flights and hotel accommodation",isCompleted:!0,createdAt:new Date(Date.now()-3600*60*60*1e3).toISOString(),updatedAt:new Date().toISOString(),completedAt:new Date(Date.now()-14400*60*1e3).toISOString()}],Df=[{id:"b-1",category:"Food",monthlyLimit:75e4,createdAt:new Date().toISOString()},{id:"b-2",category:"Rent",monthlyLimit:12e5,createdAt:new Date().toISOString()},{id:"b-3",category:"Car",monthlyLimit:4e5,createdAt:new Date().toISOString()},{id:"b-4",category:"Bills",monthlyLimit:25e4,createdAt:new Date().toISOString()},{id:"b-5",category:"Entertainment",monthlyLimit:2e5,createdAt:new Date().toISOString()}],jf=[{id:"c-1",name:"Food",type:"expense_category",isDefault:!0},{id:"c-2",name:"Transportation",type:"expense_category",isDefault:!0},{id:"c-3",name:"Rent",type:"expense_category",isDefault:!0},{id:"c-4",name:"Bills",type:"expense_category",isDefault:!0},{id:"c-5",name:"Shopping",type:"expense_category",isDefault:!0},{id:"c-6",name:"Entertainment",type:"expense_category",isDefault:!0},{id:"c-7",name:"Travel",type:"expense_category",isDefault:!0},{id:"c-8",name:"Family",type:"expense_category",isDefault:!0},{id:"c-9",name:"Car",type:"expense_category",isDefault:!0},{id:"c-10",name:"Health",type:"expense_category",isDefault:!0},{id:"c-11",name:"Gym",type:"expense_category",isDefault:!0},{id:"c-12",name:"Other",type:"expense_category",isDefault:!0},{id:"s-1",name:"Salary",type:"income_source",isDefault:!0},{id:"s-2",name:"Bonus",type:"income_source",isDefault:!0},{id:"s-3",name:"Freelance",type:"income_source",isDefault:!0},{id:"s-4",name:"Business",type:"income_source",isDefault:!0},{id:"s-5",name:"Investment",type:"income_source",isDefault:!0},{id:"s-6",name:"Other",type:"income_source",isDefault:!0}];class ht{static loadTransactions(){try{const b=localStorage.getItem(Tt.TRANSACTIONS);return b?JSON.parse(b):Tf}catch{return Tf}}static saveTransactions(b){localStorage.setItem(Tt.TRANSACTIONS,JSON.stringify(b))}static deleteTransaction(b){const x=this.loadTransactions().filter(w=>w.id!==b);return this.saveTransactions(x),x}static deleteTransactionsBatch(b){const d=new Set(b),w=this.loadTransactions().filter(g=>!d.has(g.id));return this.saveTransactions(w),w}static loadPlans(){try{const b=localStorage.getItem(Tt.PLANS);if(b)return JSON.parse(b);const d=localStorage.getItem(Tt.GOALS_LEGACY);if(d){const w=JSON.parse(d).map(g=>({...g,priority:g.priority||"medium",plannedMonthlyAmount:g.plannedMonthlyAmount||Math.round(g.targetAmount/12),planDescription:g.planDescription||g.goalDescription||""}));return this.savePlans(w),w}return Nf}catch{return Nf}}static savePlans(b){localStorage.setItem(Tt.PLANS,JSON.stringify(b)),localStorage.setItem(Tt.GOALS_LEGACY,JSON.stringify(b))}static deletePlan(b){const x=this.loadPlans().filter(w=>w.id!==b);return this.savePlans(x),x}static deletePlansBatch(b){const d=new Set(b),w=this.loadPlans().filter(g=>!d.has(g.id));return this.savePlans(w),w}static loadGoals(){return this.loadPlans()}static saveGoals(b){this.savePlans(b)}static deleteGoal(b){return this.deletePlan(b)}static loadBudgets(){try{const b=localStorage.getItem(Tt.BUDGETS);return b?JSON.parse(b):Df}catch{return Df}}static saveBudgets(b){localStorage.setItem(Tt.BUDGETS,JSON.stringify(b))}static loadCategories(){try{const b=localStorage.getItem(Tt.CATEGORIES);return b?JSON.parse(b):jf}catch{return jf}}static saveCategories(b){localStorage.setItem(Tt.CATEGORIES,JSON.stringify(b))}static getBiometrics(){return localStorage.getItem(Tt.BIOMETRICS)==="true"}static setBiometrics(b){localStorage.setItem(Tt.BIOMETRICS,b?"true":"false")}static getTheme(){return localStorage.getItem(Tt.THEME)||"system"}static setTheme(b){localStorage.setItem(Tt.THEME,b)}static getLanguage(){return localStorage.getItem(Tt.LANGUAGE)==="ar"?"ar":"en"}static setLanguage(b){localStorage.setItem(Tt.LANGUAGE,b)}}/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dp=B=>B.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),jp=B=>B.replace(/^([A-Z])|[\s-_]+(\w)/g,(b,d,x)=>x?x.toUpperCase():d.toLowerCase()),Mf=B=>{const b=jp(B);return b.charAt(0).toUpperCase()+b.slice(1)},Pf=(...B)=>B.filter((b,d,x)=>!!b&&b.trim()!==""&&x.indexOf(b)===d).join(" ").trim(),Mp=B=>{for(const b in B)if(b.startsWith("aria-")||b==="role"||b==="title")return!0};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var _p={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fp=ce.forwardRef(({color:B="currentColor",size:b=24,strokeWidth:d=2,absoluteStrokeWidth:x,className:w="",children:g,iconNode:f,...c},s)=>ce.createElement("svg",{ref:s,..._p,width:b,height:b,stroke:B,strokeWidth:x?Number(d)*24/Number(b):d,className:Pf("lucide",w),...!g&&!Mp(c)&&{"aria-hidden":"true"},...c},[...f.map(([h,k])=>ce.createElement(h,k)),...Array.isArray(g)?g:[g]]));/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Te=(B,b)=>{const d=ce.forwardRef(({className:x,...w},g)=>ce.createElement(Fp,{ref:g,iconNode:b,className:Pf(`lucide-${Dp(Mf(B))}`,`lucide-${B}`,x),...w}));return d.displayName=Mf(B),d};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bp=[["path",{d:"M17 7 7 17",key:"15tmo1"}],["path",{d:"M17 17H7V7",key:"1org7z"}]],si=Te("arrow-down-left",Bp);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zp=[["path",{d:"m21 16-4 4-4-4",key:"f6ql7i"}],["path",{d:"M17 20V4",key:"1ejh1v"}],["path",{d:"m3 8 4-4 4 4",key:"11wl7u"}],["path",{d:"M7 4v16",key:"1glfcx"}]],Rp=Te("arrow-up-down",zp);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Op=[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]],ci=Te("arrow-up-right",Op);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ip=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]],Lp=Te("award",Ip);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Up=[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"2",key:"9lu3g6"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}],["path",{d:"M6 12h.01M18 12h.01",key:"113zkx"}]],Vp=Te("banknote",Up);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gp=[["path",{d:"m11 7-3 5h4l-3 5",key:"b4a64w"}],["path",{d:"M14.856 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.935",key:"lre1cr"}],["path",{d:"M22 14v-4",key:"14q9d5"}],["path",{d:"M5.14 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.936",key:"13q5k0"}]],Hp=Te("battery-charging",Gp);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qp=[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]],$p=Te("book-open",qp);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pp=[["path",{d:"M16 14v2.2l1.6 1",key:"fo4ql5"}],["path",{d:"M16 2v4",key:"4m81vk"}],["path",{d:"M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5",key:"1osxxc"}],["path",{d:"M3 10h5",key:"r794hk"}],["path",{d:"M8 2v4",key:"1cmpym"}],["circle",{cx:"16",cy:"16",r:"6",key:"qoo3c4"}]],ac=Te("calendar-clock",Pp);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qp=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],di=Te("calendar",Qp);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yp=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M7 16h8",key:"srdodz"}],["path",{d:"M7 11h12",key:"127s9w"}],["path",{d:"M7 6h3",key:"w9rmul"}]],Zp=Te("chart-bar",Yp);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kp=[["path",{d:"M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z",key:"pzmjnu"}],["path",{d:"M21.21 15.89A10 10 0 1 1 8 2.83",key:"k2fpak"}]],Xp=Te("chart-pie",Kp);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wp=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],sn=Te("check",Wp);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jp=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],ex=Te("chevron-down",Jp);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tx=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],oc=Te("chevron-right",tx);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nx=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],ax=Te("chevron-up",nx);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rx=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],ix=Te("circle-alert",rx);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lx=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],sc=Te("circle-check",lx);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ox=[["path",{d:"M12 6v6l4 2",key:"mmk7yg"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],Dl=Te("clock",ox);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sx=[["path",{d:"m18 16 4-4-4-4",key:"1inbqp"}],["path",{d:"m6 8-4 4 4 4",key:"15zrgr"}],["path",{d:"m14.5 4-5 16",key:"e7oirm"}]],cx=Te("code-xml",sx);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dx=[["circle",{cx:"8",cy:"8",r:"6",key:"3yglwk"}],["path",{d:"M18.09 10.37A6 6 0 1 1 10.34 18",key:"t5s6rm"}],["path",{d:"M7 6h1v4",key:"1obek4"}],["path",{d:"m16.71 13.88.7.71-2.82 2.82",key:"1rbuyh"}]],hc=Te("coins",dx);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ux=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],li=Te("copy",ux);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mx=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],gc=Te("download",mx);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fx=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"m9 15 2 2 4-4",key:"1grp1n"}]],hx=Te("file-check",fx);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gx=[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4",key:"1pf5j1"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"m5 12-3 3 3 3",key:"oke12k"}],["path",{d:"m9 18 3-3-3-3",key:"112psh"}]],px=Te("file-code-2",gx);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xx=[["path",{d:"M10 12.5 8 15l2 2.5",key:"1tg20x"}],["path",{d:"m14 12.5 2 2.5-2 2.5",key:"yinavb"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z",key:"1mlx9k"}]],Qf=Te("file-code",xx);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yx=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M8 13h2",key:"yr2amv"}],["path",{d:"M14 13h2",key:"un5t4a"}],["path",{d:"M8 17h2",key:"2yhykz"}],["path",{d:"M14 17h2",key:"10kma7"}]],bx=Te("file-spreadsheet",yx);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vx=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"r6nss1"}]],Cx=Te("house",vx);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sx=[["path",{d:"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",key:"1s6t7t"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor",key:"w0ekpg"}]],wx=Te("key-round",Sx);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ax=[["path",{d:"m5 8 6 6",key:"1wu5hv"}],["path",{d:"m4 14 6-6 2-3",key:"1k1g8d"}],["path",{d:"M2 5h12",key:"or177f"}],["path",{d:"M7 2h1",key:"1t2jsx"}],["path",{d:"m22 22-5-10-5 10",key:"don7ne"}],["path",{d:"M14 18h6",key:"1m8k6r"}]],kx=Te("languages",Ax);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ex=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",key:"zw3jo"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",key:"1wduqc"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",key:"kqbvx6"}]],Yf=Te("layers",Ex);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tx=[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1",key:"1g98yp"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1",key:"6d4xhi"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1",key:"nxv5o0"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1",key:"1bb6yr"}]],cc=Te("layout-grid",Tx);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nx=[["path",{d:"M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",key:"nnexq3"}],["path",{d:"M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12",key:"mt58a7"}]],Dx=Te("leaf",Nx);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jx=[["path",{d:"M3 5h.01",key:"18ugdj"}],["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M3 19h.01",key:"noohij"}],["path",{d:"M8 5h13",key:"1pao27"}],["path",{d:"M8 12h13",key:"1za7za"}],["path",{d:"M8 19h13",key:"m83p4d"}]],Mx=Te("list",jx);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _x=[["path",{d:"M5 12h14",key:"1ays0h"}]],Zf=Te("minus",_x);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fx=[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1",key:"kaeet6"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1",key:"1wsw3u"}]],_f=Te("pause",Fx);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bx=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]],rc=Te("play",Bx);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zx=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],cn=Te("plus",zx);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rx=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],Ox=Te("refresh-cw",Rx);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ix=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],Lx=Te("rotate-ccw",Ix);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ux=[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2",key:"aa7l1z"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2",key:"4qcy5o"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2",key:"6vwrx8"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2",key:"ioqczr"}],["path",{d:"M8 14s1.5 2 4 2 4-2 4-2",key:"1y1vjs"}],["path",{d:"M9 9h.01",key:"1q5me6"}],["path",{d:"M15 9h.01",key:"x1ddxp"}]],Vx=Te("scan-face",Ux);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gx=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],Ff=Te("search",Gx);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hx=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],qx=Te("settings",Hx);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $x=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]],dc=Te("shield-alert",$x);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Px=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],Kf=Te("shield-check",Px);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qx=[["path",{d:"M2 20h.01",key:"4haj6o"}],["path",{d:"M7 20v-4",key:"j294jx"}],["path",{d:"M12 20v-8",key:"i3yub9"}],["path",{d:"M17 20V8",key:"1tkaf5"}],["path",{d:"M22 4v16",key:"sih9yq"}]],Yx=Te("signal",Qx);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zx=[["path",{d:"M10 5H3",key:"1qgfaw"}],["path",{d:"M12 19H3",key:"yhmn1j"}],["path",{d:"M14 3v4",key:"1sua03"}],["path",{d:"M16 17v4",key:"1q0r14"}],["path",{d:"M21 12h-9",key:"1o4lsq"}],["path",{d:"M21 19h-5",key:"1rlt1p"}],["path",{d:"M21 5h-7",key:"1oszz2"}],["path",{d:"M8 10v4",key:"tgpxqk"}],["path",{d:"M8 12H3",key:"a7s4jb"}]],Xf=Te("sliders-horizontal",Zx);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kx=[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]],Wf=Te("smartphone",Kx);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xx=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],Bl=Te("sparkles",Xx);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wx=[["path",{d:"M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344",key:"2acyp4"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],jl=Te("square-check-big",Wx);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jx=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]],Jf=Te("square",Jx);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e0=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]],On=Te("target",e0);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t0=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],nn=Te("trash-2",t0);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n0=[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]],a0=Te("trending-up",n0);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r0=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],ui=Te("triangle-alert",r0);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i0=[["path",{d:"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",key:"18etb6"}],["path",{d:"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",key:"xoc0q4"}]],l0=Te("wallet",i0);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o0=[["path",{d:"M12 20h.01",key:"zekei9"}],["path",{d:"M2 8.82a15 15 0 0 1 20 0",key:"dnpr2z"}],["path",{d:"M5 12.859a10 10 0 0 1 14 0",key:"1x1e6c"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0",key:"1bycff"}]],s0=Te("wifi",o0);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c0=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],gn=Te("x",c0);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d0=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],Ml=Te("zap",d0),eh={en:{tabDashboard:"Dashboard",tabPlansDashboard:"Plans Hub",tabTransactions:"Transactions",tabAnalytics:"Analytics",tabGoals:"Plans",tabPlans:"Plans",tabSettings:"Settings",financialOverview:"Financial Overview",welcomeBack:"Welcome back, Ali",faceIdActive:"Face ID Active",faceIdOff:"Face ID Off",addTransactionBtn:"+ Add Transaction",appTitle:"FinanceApp • iOS 17",simEnvironment:"Interactive iOS 17 Runtime Environment",simSubtext:"Operating with SwiftData offline model storage & IQD currency formatting",codeHubTab:"Swift Package Code",guideTab:"Deployment Guide",appTab:"iPhone 13 Pro Max",actualBalance:"Actual Balance",unallocatedAvailable:"Unallocated / Available",goalAllocations:"Plan Allocations",planAllocations:"Plan Allocations",monthlyPerformance:"Monthly Financial Performance",income:"Income",expenses:"Expenses",netSavings:"Net Savings",savingsRate:"Savings Rate",historicalAvgSavings:"Historical Monthly Average Savings",activeGoals:"Active Plans",activePlans:"Active Plans",viewAllGoals:"View All Plans",viewAllPlans:"View All Plans",recentTransactions:"Recent Transactions",viewAllTransactions:"View All Transactions",noTransactionsYet:"No transactions recorded yet",addFirstTransaction:"Record your first transaction",allocatedOf:"allocated of",currencyLabel:"IQD",transactionsTitle:"Transactions",searchPlaceholder:"Search descriptions, categories, sources...",filterAll:"All",filterIncome:"Income",filterExpenses:"Expenses",totalFiltered:"Total Filtered",noTransactionsFound:"No transactions match your search filter",clearSearch:"Clear Filter",deleteTxConfirm:"Are you sure you want to delete this transaction?",editTx:"Edit",deleteTx:"Delete",analyticsTitle:"Financial Analytics",analyticsSubtitle:"Visual breakdown of cashflow & spending habits",incomeVsExpenses:"Income vs. Expenses",totalIncomeLabel:"Total Income",totalExpensesLabel:"Total Expenses",categoryBreakdown:"Expense Breakdown by Category",noExpenseData:"No expense transactions recorded in this period",monthlyTrend:"Monthly Net Savings Trend",averageMonthlyNet:"Average Net Cashflow",highestCategory:"Highest Spending Category",dailyAverageExpense:"Daily Average Expense",goalsTitle:"Financial Plans",plansTitle:"Financial Plans",goalsSubtitle:"Target planning, allocations & plan-vs-actual variance",plansSubtitle:"Target planning, allocations & plan-vs-actual variance",newGoalBtn:"+ New Plan",newPlanBtn:"+ New Plan",activeGoalsSection:"Active Plans",activePlansSection:"Active Plans",completedGoalsSection:"Completed Plans",completedPlansSection:"Completed Plans",allocateFundsBtn:"Allocate Funds",allocatedProgress:"Allocated",targetAmount:"Target",targetDate:"Target Date",remainingAmount:"Remaining",projectedRunway:"Runway Projection",achievableNotice:"On track to achieve based on monthly savings",behindScheduleNotice:"Requires increased monthly savings rate",markCompleted:"Mark as Completed",markActive:"Reactivate Plan",noActiveGoals:"No active financial plans found",noActivePlans:"No active financial plans found",noCompletedGoals:"No completed plans yet",noCompletedPlans:"No completed plans yet",planPriority:"Priority Level",priorityCritical:"Critical",priorityHigh:"High",priorityMedium:"Medium",priorityLow:"Low",plannedMonthlyRate:"Planned Monthly",actualMonthlyRate:"Actual Rate",varianceLabel:"Variance",varianceAhead:"Ahead of Schedule",varianceOnTrack:"On Schedule",varianceAtRisk:"At Risk",varianceBehind:"Behind Schedule",varianceNotFeasible:"Not Feasible",projectedDateLabel:"Projected Completion",milestonesLabel:"Milestones (25% / 50% / 75% / 100%)",deletePlanBtn:"Delete Plan",deletePlanConfirmTitle:"Delete Plan",deletePlanConfirmMsg:"Are you sure you want to delete this plan? Allocated funds will safely return to your unallocated cash balance.",plansDashboardTab:"Dashboard",allPlansTab:"All Plans",whatIfTab:"What-If Simulator",financialPositionTitle:"Financial Capacity & Position",monthlyCapacityLabel:"Monthly Net Capacity",totalPlannedMonthlyLabel:"Planned Monthly Commitment",capacitySurplus:"Monthly Surplus",capacityDeficit:"Monthly Deficit",healthHealthy:"Healthy Margin",healthTight:"Tight Margin",healthOvercommitted:"Overcommitted",actionCenterTitle:"Action Center & Recommendations",whatIfTitle:"What-If Scenario Simulator",whatIfSubtitle:"Test adjustments to income and expenses to see real-time plan impact",incomeBoostLabel:"Additional Monthly Income",expenseCutLabel:"Monthly Spending Reductions",lumpSumLabel:"One-Time Cash Injection",newMonthlyCapacity:"Adjusted Monthly Capacity",timeSavedLabel:"Months Saved",selectPlanToSimulate:"Select Plan to Simulate",simMonthlyAllocation:"Adjust Monthly Allocation",simExtraSavings:"Additional Monthly Savings / Cuts",simTargetAmount:"Adjust Target Amount",simTargetDate:"Adjust Target Date",originalForecast:"Original Target / Forecast",simulatedForecast:"Simulated Forecast",forecastCompletion:"Forecast Completion",originalTargetDate:"Original Target Date",monthsAhead:"Ahead of schedule",monthsBehind:"Behind schedule",resetSimulation:"Reset Simulation",simDisclaimer:"Hypothetical simulation only — does not alter stored plan or balance.",appCreditsTitle:"Developer & App Information",appDeveloper:"Ahmed AL KUBAISIE",appEmail:"ahmed.mjabbar95@gmail.com",appVersion:"1.2.0",onSchedule:"On Schedule",settingsTitle:"Settings & Security",preferencesHeading:"Preferences",languageHeading:"App Language",languageSubtitle:"Choose interface language (English / العربية)",langEnglish:"English",langArabic:"العربية",langArabicBadge:"Arabic",securityHeading:"Security & Biometrics",faceIdLabel:"Face ID & Passcode Lock",faceIdDesc:"Requires authentication on app launch",testFaceIdBtn:"Simulate Face ID Scan Now",budgetsHeading:"Monthly Budget Limits",budgetsDesc:"Set and track spending limits by category with real-time health badges.",manageBudgetsBtn:"Manage Budgets",categoriesHeading:"Categories & Sources",categoriesDesc:"Customize expense categories and income sources",configureBtn:"Configure",hideBtn:"Hide",dataHeading:"Data Export & Backup",dataDesc:"Export local storage as clean CSV or full JSON backup",exportCsvBtn:"Export CSV",exportJsonBtn:"Export JSON Backup",appearanceHeading:"Appearance",themeSystem:"System Default",themeLight:"Light Mode",themeDark:"Dark Mode",environmentHeading:"Runtime Architecture",primaryCurrency:"Primary Currency",targetDevice:"Target Device",packageFormat:"Package Architecture",localPersistence:"Local Persistence",copiedNotice:"Copied to clipboard",currentExpenseCats:"Current Expense Categories",newCategoryPlaceholder:"New Category / Source Name...",addCategoryBtn:"Add",incomeSourceType:"Income Source",expenseCategoryType:"Expense Category",addTransactionTitle:"Record Transaction",editTransactionTitle:"Edit Transaction",typeLabel:"Type",amountLabel:"Amount (IQD)",dateLabel:"Date",categoryLabel:"Category",sourceLabel:"Income Source",descriptionLabel:"Description",notesLabel:"Notes (Optional)",saveBtn:"Save Transaction",cancelBtn:"Cancel",createCategoryBtn:"+ Add New Category",customCategoryName:"Category Name",allocateTitle:"Allocate Plan Funds",allocateSubtitle:"Allocate or withdraw funds from your cash balance for this plan",availableToAllocate:"Available Unallocated Cash",currentAllocation:"Currently Allocated",newAllocationAmount:"New Allocated Total (IQD)",confirmAllocationBtn:"Confirm Allocation",createGoalTitle:"Create Financial Plan",createPlanTitle:"Create Financial Plan",goalNameLabel:"Plan Name",planNameLabel:"Plan Name",goalTargetLabel:"Target Amount (IQD)",planTargetLabel:"Target Amount (IQD)",goalDateLabel:"Target Date",planDateLabel:"Target Date",goalDescLabel:"Plan Purpose / Description",planDescLabel:"Plan Purpose / Description",saveGoalBtn:"Create Plan",savePlanBtn:"Create Plan",manageBudgetsTitle:"Monthly Category Budgets",manageBudgetsSubtitle:"Set monthly expense caps to ensure disciplined spending",setMonthlyLimit:"Set Monthly Cap (IQD)",spentSoFar:"Spent This Month",monthlyLimit:"Monthly Cap",budgetStatusOver:"Exceeded",budgetStatusWarning:"Near Limit",budgetStatusHealthy:"Within Budget",faceIdScanTitle:"Biometric Face ID Scan",faceIdScanDesc:"Scanning simulated TrueDepth sensor...",faceIdScanSuccess:"Biometrics Authenticated",authenticateBtn:"Authenticate",addTransaction:"Add Transaction",save:"Save",cancel:"Cancel",delete:"Delete",timeRangeThisWeek:"This Week",timeRangeThisMonth:"This Month",timeRangeLastMonth:"Last Month",timeRangeLast3M:"Last 3 Months",timeRangeLast6M:"Last 6 Months",timeRangeThisYear:"This Year",timeRangeAllTime:"All Time",insightsHeading:"Spending Insights",largestExpense:"Largest Expense",topCategory:"Top Category",targetsHeading:"Financial Planning",createGoal:"Create Plan",createPlan:"Create Plan",noActiveGoalsDesc:"Establish your first financial plan with milestones and priority.",noActivePlansDesc:"Establish your first financial plan with milestones and priority.",saved:"Saved",target:"Target",leftToSave:"Left to save",analysis:"Plan Analysis",manageFunds:"Manage Funds",completedGoals:"Completed Plans",completedPlans:"Completed Plans",historyHeading:"Transaction History",allFilter:"All",incomeFilter:"Income",expensesFilter:"Expenses",noTransactionsHint:"Tap the + button to record your first transaction."},ar:{tabDashboard:"الرئيسية",tabPlansDashboard:"لوحة الخطط",tabTransactions:"المعاملات",tabAnalytics:"التحليلات",tabGoals:"الخطط",tabPlans:"الخطط",tabSettings:"الإعدادات",financialOverview:"نظرة عامة مالية",welcomeBack:"مرحباً بك، علي",faceIdActive:"بصمة الوجه مفعلة",faceIdOff:"بصمة الوجه معطلة",addTransactionBtn:"+ إضافة معاملة",appTitle:"تطبيق المالية • iOS 17",simEnvironment:"بيئة تشغيل تفاعلية لنظام iOS 17",simSubtext:"تخزين محلي عبر SwiftData وتنسيق بالدينار العراقي (IQD)",codeHubTab:"كود حزمة Swift",guideTab:"دليل التثبيت",appTab:"آيفون 13 برو ماكس",actualBalance:"الرصيد الفعلي الإجمالي",unallocatedAvailable:"المتاح / غير المخصص",goalAllocations:"مخصصات الخطط",planAllocations:"مخصصات الخطط",monthlyPerformance:"الأداء المالي للشهر الحالي",income:"إجمالي الدخل",expenses:"إجمالي المصاريف",netSavings:"صافي الفائض / الادخار",savingsRate:"نسبة الادخار",historicalAvgSavings:"متوسط الادخار الشهري التاريخي",activeGoals:"الخطط المالية النشطة",activePlans:"الخطط المالية النشطة",viewAllGoals:"عرض جميع الخطط",viewAllPlans:"عرض جميع الخطط",recentTransactions:"أحدث المعاملات المسجلة",viewAllTransactions:"عرض كافة المعاملات",noTransactionsYet:"لم يتم تسجيل أي معاملات بعد",addFirstTransaction:"سجل أول حركة مالية الآن",allocatedOf:"تم تخصيص",currencyLabel:"د.ع",transactionsTitle:"سجل المعاملات المالية",searchPlaceholder:"بحث في الوصف، الفئات، المصادر...",filterAll:"الكل",filterIncome:"الدخل",filterExpenses:"المصاريف",totalFiltered:"إجمالي المعاملات المحددة",noTransactionsFound:"لا توجد معاملات مطابقة لمعايير البحث",clearSearch:"إعادة ضبط التصفية",deleteTxConfirm:"هل أنت متأكد من حذف هذه المعاملة؟",editTx:"تعديل",deleteTx:"حذف",analyticsTitle:"التحليلات والتقارير المالية",analyticsSubtitle:"تحليل دقيق ومصور لتدفقاتك النقدية وعادات الإنفاق",incomeVsExpenses:"مقارنة الدخل مقابل المصاريف",totalIncomeLabel:"إجمالي الدخل",totalExpensesLabel:"إجمالي المصاريف",categoryBreakdown:"توزيع المصاريف حسب الفئات",noExpenseData:"لا توجد مصاريف مسجلة خلال هذه الفترة",monthlyTrend:"مسار صافي الادخار الشهري",averageMonthlyNet:"متوسط صافي التدفق الشهري",highestCategory:"أعلى فئة إنفاقاً",dailyAverageExpense:"متوسط الإنفاق اليومي",goalsTitle:"الخطط المالية",plansTitle:"الخطط المالية",goalsSubtitle:"تخطيط الأهداف والمخصصات ومقارنة المخطط بالفعلي",plansSubtitle:"تخطيط الأهداف والمخصصات ومقارنة المخطط بالفعلي",newGoalBtn:"+ خطة جديدة",newPlanBtn:"+ خطة جديدة",activeGoalsSection:"الخطط الجارية",activePlansSection:"الخطط الجارية",completedGoalsSection:"الخطط المكتملة بنجاح",completedPlansSection:"الخطط المكتملة بنجاح",allocateFundsBtn:"تخصيص رصيد",allocatedProgress:"المبلغ المخصص",targetAmount:"المبلغ المستهدف",targetDate:"تاريخ الإنجاز المستهدف",remainingAmount:"المبلغ المتبقي",projectedRunway:"تقدير إمكانية الإنجاز",achievableNotice:"تسير في المسار الصحيح للإنجاز بناءً على معدل ادخارك",behindScheduleNotice:"يتطلب زيادة نسبة الادخار الشهري للوصول في الموعد",markCompleted:"تعيين كمنجز",markActive:"إعادة تفعيل الخطة",noActiveGoals:"لا توجد خطط مالية جارية حالياً",noActivePlans:"لا توجد خطط مالية جارية حالياً",noCompletedGoals:"لم تكتمل أي خطط بعد",noCompletedPlans:"لم تكتمل أي خطط بعد",planPriority:"مستوى الأولوية",priorityCritical:"حرجة (قصوى)",priorityHigh:"عالية",priorityMedium:"متوسطة",priorityLow:"منخفضة",plannedMonthlyRate:"المخطط شهرياً",actualMonthlyRate:"المعدل الفعلي",varianceLabel:"الانحراف (التباين)",varianceAhead:"متقدم عن الجدول",varianceOnTrack:"ضمن الجدول الزمني",varianceAtRisk:"في منطقة الخطر",varianceBehind:"متأخر عن الجدول",varianceNotFeasible:"غير قابل للتحقيق حالياً",projectedDateLabel:"التاريخ المتوقع للإنجاز",milestonesLabel:"المحطات الرئيسية (25% / 50% / 75% / 100%)",deletePlanBtn:"حذف الخطة",deletePlanConfirmTitle:"حذف الخطة المالية",deletePlanConfirmMsg:"هل أنت متأكد من حذف هذه الخطة؟ ستعود الأموال المخصصة بأمان إلى رصيدك العام غير المخصص.",plansDashboardTab:"لوحة التحكم",allPlansTab:"كل الخطط",whatIfTab:"محاكي ماذا لو",financialPositionTitle:"المركز المالي والقدرة الادخارية",monthlyCapacityLabel:"القدرة الادخارية الشهرية (صافي الفائض)",totalPlannedMonthlyLabel:"إجمالي الالتزامات الشهرية المخططة",capacitySurplus:"فائض شهري متاح",capacityDeficit:"عجز في القدرة الشهرية",healthHealthy:"هامش مالي ممتاز",healthTight:"هامش مالي ضيق",healthOvercommitted:"التزامات تفوق الفائض",actionCenterTitle:"مركز الإجراءات والتوصيات الذكية",whatIfTitle:"محاكي السيناريوهات المالية (ماذا لو؟)",whatIfSubtitle:"جرّب تعديل الدخل والمصاريف لمشاهدة تأثيرها الفوري على تسريع خططك",incomeBoostLabel:"زيادة إضافية في الدخل الشهري",expenseCutLabel:"خفض وترشيد المصاريف الشهرية",lumpSumLabel:"ضخ مبلغ نقدي لمرة واحدة",newMonthlyCapacity:"القدرة الشهرية المعدلة",timeSavedLabel:"أشهر موفرة تم تسريعها",selectPlanToSimulate:"اختر خطة للمحاكاة",simMonthlyAllocation:"تعديل التخصيص الشهري",simExtraSavings:"توفير شهري إضافي / تقليل نفقات",simTargetAmount:"تعديل المبلغ المستهدف",simTargetDate:"تعديل التاريخ المستهدف",originalForecast:"الهدف الأصلي / التوقع",simulatedForecast:"التوقع بالسيناريو الجديد",forecastCompletion:"تاريخ الإنجاز المتوقع",originalTargetDate:"الموعد المستهدف الأصلي",monthsAhead:"متقدم عن الجدول",monthsBehind:"متأخر عن الجدول",resetSimulation:"إعادة ضبط المحاكاة",simDisclaimer:"محاكاة افتراضية فقط — لا تغير الخطة المحفوظة أو الرصيد الفعلي.",appCreditsTitle:"معلومات التطبيق والمطور",appDeveloper:"Ahmed AL KUBAISIE",appEmail:"ahmed.mjabbar95@gmail.com",appVersion:"1.2.0",onSchedule:"على المسار المحدد",settingsTitle:"الإعدادات والأمان",preferencesHeading:"التفضيلات العامة",languageHeading:"لغة التطبيق (Language)",languageSubtitle:"اختر لغة واجهة المستخدم (العربية / English)",langEnglish:"English",langArabic:"العربية",langArabicBadge:"العربية",securityHeading:"الأمان والقياسات الحيوية",faceIdLabel:"قفل بصمة الوجه ورمز المرور",faceIdDesc:"طلب المصادقة البيومترية عند فتح التطبيق لحماية خصوصيتك",testFaceIdBtn:"محاكاة فحص Face ID الآن",budgetsHeading:"حدود الميزانيات الشهرية",budgetsDesc:"تحديد سقف الإنفاق لكل فئة ومتابعة التنبيهات لحظياً",manageBudgetsBtn:"إدارة الميزانيات",categoriesHeading:"الفئات ومصادر الدخل",categoriesDesc:"تخصيص وتعديل فئات المصاريف ومصادر الإيرادات",configureBtn:"تعديل",hideBtn:"إغلاق",dataHeading:"إدارة وتصدير البيانات",dataDesc:"تصدير بياناتك المحلية للنسخ الاحتياطي أو للتحليل في برنامج Excel",exportCsvBtn:"تصدير ملف CSV",exportJsonBtn:"نسخ احتياطي JSON",appearanceHeading:"مظهر التطبيق",themeSystem:"تلقائي (النظام)",themeLight:"فاتح",themeDark:"داكن",environmentHeading:"تفاصيل النظام والبيئة",primaryCurrency:"العملة الأساسية",targetDevice:"الجهاز المستهدف",packageFormat:"صيغة الحزمة",localPersistence:"التخزين المحلي",copiedNotice:"تم النسخ إلى الحافظة بنجاح",currentExpenseCats:"فئات المصاريف الحالية",newCategoryPlaceholder:"اسم الفئة أو المصدر الجديد...",addCategoryBtn:"إضافة",incomeSourceType:"مصدر دخل",expenseCategoryType:"فئة مصروف",addTransactionTitle:"إضافة معاملة مالية جديدة",editTransactionTitle:"تعديل المعاملة المالية",typeLabel:"نوع المعاملة",amountLabel:"المبلغ (بالدينار العراقي)",dateLabel:"التاريخ",categoryLabel:"فئة المصروف",sourceLabel:"مصدر الدخل",descriptionLabel:"الوصف",notesLabel:"ملاحظات إضافية (اختياري)",saveBtn:"حفظ المعاملة",cancelBtn:"إلغاء",createCategoryBtn:"+ إضافة فئة جديدة",customCategoryName:"اسم الفئة",allocateTitle:"تخصيص رصيد للخطة",allocateSubtitle:"تحويل أموال من الرصيد الحر غير المخصص إلى هذه الخطة",availableToAllocate:"الرصيد المتاح غير المخصص",currentAllocation:"المخصص حالياً",newAllocationAmount:"المبلغ الإجمالي الجديد المخصص (د.ع)",confirmAllocationBtn:"تأكيد تخصيص الرصيد",createGoalTitle:"إنشاء خطة مالية جديدة",createPlanTitle:"إنشاء خطة مالية جديدة",goalNameLabel:"عنوان الخطة",planNameLabel:"عنوان الخطة",goalTargetLabel:"المبلغ المطلوب تحقيقه (د.ع)",planTargetLabel:"المبلغ المطلوب تحقيقه (د.ع)",goalDateLabel:"تاريخ الإنجاز المستهدف",planDateLabel:"تاريخ الإنجاز المستهدف",goalDescLabel:"تفاصيل الخطة والغرض منها",planDescLabel:"تفاصيل الخطة والغرض منها",saveGoalBtn:"إنشاء الخطة",savePlanBtn:"إنشاء الخطة",manageBudgetsTitle:"الميزانيات الشهرية للفئات",manageBudgetsSubtitle:"وضع سقف أعلى للمصاريف الشهرية ومراقبة الاستهلاك",setMonthlyLimit:"تحديد السقف الشهري (د.ع)",spentSoFar:"تم إنفاقه هذا الشهر",monthlyLimit:"الحد الأقصى الشهري",budgetStatusOver:"تجاوز الحد",budgetStatusWarning:"قريب من الحد",budgetStatusHealthy:"في النطاق الآمن",faceIdScanTitle:"التحقق عبر بصمة الوجه (Face ID)",faceIdScanDesc:"جاري فحص المستشعر البيومتري...",faceIdScanSuccess:"تم التحقق بنجاح من الهوية",authenticateBtn:"مصادقة الهوية",addTransaction:"إضافة معاملة",save:"حفظ",cancel:"إلغاء",delete:"حذف",timeRangeThisWeek:"هذا الأسبوع",timeRangeThisMonth:"هذا الشهر",timeRangeLastMonth:"الشهر السابق",timeRangeLast3M:"آخر 3 أشهر",timeRangeLast6M:"آخر 6 أشهر",timeRangeThisYear:"هذا العام",timeRangeAllTime:"كل الأوقات",insightsHeading:"رؤى وتحليلات الإنفاق",largestExpense:"أكبر مصروف",topCategory:"أعلى فئة صرف",targetsHeading:"التخطيط المالي",createGoal:"إنشاء خطة",createPlan:"إنشاء خطة",noActiveGoalsDesc:"حدد خطتك المالية الأولى مع مستوى الأولوية والمحطات.",noActivePlansDesc:"حدد خطتك المالية الأولى مع مستوى الأولوية والمحطات.",saved:"المدخر",target:"الهدف",leftToSave:"المتبقي للادخار",analysis:"التحليل المالي",manageFunds:"إدارة الأموال",completedGoals:"الخطط المنجزة",completedPlans:"الخطط المنجزة",historyHeading:"سجل المعاملات",allFilter:"الكل",incomeFilter:"الدخل",expensesFilter:"المصاريف",noTransactionsHint:"انقر على زر + لتسجيل أول معاملة مالية."}},Bf={Food:"طعام ومشتريات",Transportation:"مواصلات ونقل",Rent:"إيجار وسكن",Bills:"فواتير وخدمات",Shopping:"تسوق ومشتريات",Entertainment:"ترفيه ومطاعم",Travel:"سفر وسياحة",Family:"التزامات عائلية",Car:"وقود وصيانة السيارة",Health:"رعاية صحية وأدوية",Gym:"رياضة ولياقة",Other:"أخرى",Salary:"راتب شهري",Bonus:"مكافأة وأرباح",Freelance:"عمل حر واستشارات",Business:"أرباح تجارية",Investment:"عوائد استثمارية",Income:"دخل"};function th(B,b){return b==="ar"&&Bf[B]?Bf[B]:B}const pc={language:"en",setLanguage:()=>{},t:eh.en,isRTL:!1,dir:"ltr",formatCurrency:(B,b="IQD")=>`${Math.round(B).toLocaleString("en-US")} ${b}`,formatSignedCurrency:(B,b,d="IQD")=>{const x=b.toLowerCase()==="income"?"+":"-",w=Math.round(B).toLocaleString("en-US");return`${x}${w} ${d}`},translateCat:B=>th(B,"en")},xc=ce.createContext(pc),nh=({children:B})=>{const[b,d]=ce.useState(()=>{try{return ht.getLanguage()}catch{return"en"}}),x=k=>{d(k),ht.setLanguage(k),k==="ar"?(document.documentElement.setAttribute("dir","rtl"),document.documentElement.setAttribute("lang","ar")):(document.documentElement.setAttribute("dir","ltr"),document.documentElement.setAttribute("lang","en"))};ce.useEffect(()=>{b==="ar"?(document.documentElement.setAttribute("dir","rtl"),document.documentElement.setAttribute("lang","ar")):(document.documentElement.setAttribute("dir","ltr"),document.documentElement.setAttribute("lang","en"))},[b]);const w=eh[b],g=b==="ar",f=g?"rtl":"ltr",c=(k,S="IQD")=>`${Math.round(k).toLocaleString(b==="ar"?"ar-IQ":"en-US")} ${b==="ar"?"د.ع":S}`,s=(k,S,j="IQD")=>`${S.toLowerCase()==="income"?"+":"-"}${c(k,j)}`,h=k=>th(k,b);return r.jsx(xc.Provider,{value:{language:b,setLanguage:x,t:w,isRTL:g,dir:f,formatCurrency:c,formatSignedCurrency:s,translateCat:h},children:B})},yt=()=>ce.useContext(xc)||pc,u0=({children:B,activeTab:b,onTabChange:d,theme:x="system"})=>{const{t:w,isRTL:g,dir:f}=yt(),[c,s]=ce.useState("9:41");ce.useEffect(()=>{const k=()=>{const j=new Date,m=j.getHours().toString(),C=j.getMinutes().toString().padStart(2,"0");s(`${m}:${C}`)};k();const S=setInterval(k,3e4);return()=>clearInterval(S)},[]);const h=[{id:0,label:w.tabDashboard,icon:Cx},{id:1,label:w.tabPlans,icon:On},{id:2,label:w.tabTransactions,icon:Mx},{id:3,label:w.tabAnalytics,icon:Xp},{id:4,label:w.tabSettings,icon:qx}];return r.jsxs("div",{dir:f,className:`relative mx-auto flex w-full flex-col overflow-hidden bg-[#F2F2F7] dark:bg-[#1C1C1E] transition-all
        max-sm:min-h-[100dvh] max-sm:h-[100dvh] max-sm:w-full max-sm:border-0 max-sm:rounded-none max-sm:shadow-none
        sm:max-w-[428px] sm:rounded-[52px] sm:border-[10px] sm:border-slate-900 sm:shadow-2xl sm:shadow-slate-900/40 sm:dark:border-slate-800 sm:ring-1 sm:ring-white/20 sm:min-h-[820px] sm:max-h-[860px] ${g?"font-sans":""}`,children:[r.jsxs("div",{className:"hidden sm:flex absolute top-0 right-0 left-0 z-30 h-11 items-center justify-between px-7 pt-1 text-[#1C1C1E] dark:text-white select-none bg-[#F2F2F7]/85 dark:bg-[#1C1C1E]/85 backdrop-blur-md border-b border-black/[0.04] dark:border-white/[0.04]",dir:"ltr",children:[r.jsx("span",{className:"font-semibold text-xs tracking-tight",children:c}),r.jsxs("div",{className:"absolute top-0 left-1/2 -translate-x-1/2 flex h-6 w-36 items-center justify-center rounded-b-2xl bg-slate-900",children:[r.jsx("div",{className:"h-1.5 w-12 rounded-full bg-slate-800"}),r.jsx("div",{className:"ml-3 h-2.5 w-2.5 rounded-full bg-slate-800 ring-1 ring-slate-700/50"})]}),r.jsxs("div",{className:"flex items-center gap-1.5",children:[r.jsx(Yx,{className:"h-3 w-3"}),r.jsx(s0,{className:"h-3 w-3"}),r.jsxs("div",{className:"flex items-center gap-0.5",children:[r.jsx("span",{className:"text-[10px] font-bold",children:"100%"}),r.jsx(Hp,{className:"h-3.5 w-3.5 text-[#34C759]"})]})]})]}),r.jsx("div",{className:"relative flex-1 overflow-y-auto safe-content-container no-scrollbar bg-[#F2F2F7] dark:bg-[#1C1C1E]",children:B}),r.jsxs("div",{className:"absolute right-0 bottom-0 left-0 z-30 border-t border-[#D1D1D6] bg-white/95 pb-safe-home pt-2 backdrop-blur-xl dark:border-[#38383A] dark:bg-[#1C1C1E]/95",children:[r.jsx("div",{className:"grid grid-cols-5 gap-1 px-2",children:h.map(k=>{const S=k.icon,j=b===k.id;return r.jsxs("button",{onClick:()=>d(k.id),className:`flex flex-col items-center justify-center py-1 transition-all ${j?"text-[#007AFF] scale-105":"text-[#8E8E93] hover:text-[#3A3A3C] dark:hover:text-white"}`,children:[r.jsx(S,{className:`h-4.5 w-4.5 ${j?"stroke-[2.4]":"stroke-[1.8]"}`}),r.jsx("span",{className:`mt-0.5 max-w-full truncate text-[9px] font-bold uppercase tracking-tighter ${j?"text-[#007AFF]":"text-[#8E8E93]"}`,children:k.label})]},k.id)})}),r.jsx("div",{className:"hidden sm:block mx-auto mt-1.5 h-1 w-32 rounded-full bg-[#C7C7CC] dark:bg-[#38383A]"})]})]})};function zn(B){if(B==null)return"";const b=B.toString();if(!b.trim())return"";const d="٠١٢٣٤٥٦٧٨٩",w=b.replace(/[٠-٩]/g,h=>d.indexOf(h).toString()).replace(/,/g,"").replace(/\s/g,""),g=w.indexOf(".");let f="",c=null;g!==-1?(f=w.slice(0,g).replace(/\D/g,""),c=w.slice(g+1).replace(/\D/g,"")):f=w.replace(/\D/g,"");let s="";return f&&(f.length>1&&f.startsWith("0")?s=f.replace(/^0+(?=\d)/,"").replace(/\B(?=(\d{3})+(?!\d))/g,","):s=f.replace(/\B(?=(\d{3})+(?!\d))/g,",")),c!==null?`${s||"0"}.${c}`:s}function Rn(B){if(typeof B=="number")return isNaN(B)?NaN:B;if(!B||!B.toString().trim())return NaN;const b="٠١٢٣٤٥٦٧٨٩",x=B.toString().replace(/[٠-٩]/g,w=>b.indexOf(w).toString()).replace(/,/g,"").trim();return parseFloat(x)}function m0(B){return B==null||isNaN(B)||B===0?"":zn(B.toString())}class Rt{static format(b,d,x){const g=(x||ht.getLanguage())==="ar",f=d||(g?"د.ع":"IQD");return`${Math.round(b).toLocaleString(g?"ar-IQ":"en-US")} ${f}`}static formatSigned(b,d,x,w){return`${d.toLowerCase()==="income"?"+":"-"}${this.format(b,x,w)}`}}class nt{static totalIncome(b){return b.filter(d=>d.type.toLowerCase()==="income").reduce((d,x)=>d+x.amount,0)}static totalExpenses(b){return b.filter(d=>d.type.toLowerCase()==="expense").reduce((d,x)=>d+x.amount,0)}static actualBalance(b){return this.totalIncome(b)-this.totalExpenses(b)}static totalAllocatedToPlans(b){return b.filter(d=>!d.isCompleted).reduce((d,x)=>d+(x.allocatedAmount||0),0)}static totalAllocatedToGoals(b){return this.totalAllocatedToPlans(b)}static unallocatedBalance(b,d){return this.actualBalance(b)-this.totalAllocatedToPlans(d)}static monthlyIncome(b,d=new Date){const x=d.getFullYear(),w=d.getMonth();return b.filter(g=>{const f=new Date(g.date);return g.type.toLowerCase()==="income"&&f.getFullYear()===x&&f.getMonth()===w}).reduce((g,f)=>g+f.amount,0)}static monthlyExpenses(b,d=new Date){const x=d.getFullYear(),w=d.getMonth();return b.filter(g=>{const f=new Date(g.date);return g.type.toLowerCase()==="expense"&&f.getFullYear()===x&&f.getMonth()===w}).reduce((g,f)=>g+f.amount,0)}static monthlySavings(b,d=new Date){return this.monthlyIncome(b,d)-this.monthlyExpenses(b,d)}static historicalMonthlyAverageSavings(b){if(b.length===0)return 0;const d={};b.forEach(g=>{const f=new Date(g.date),c=`${f.getFullYear()}-${f.getMonth()+1}`;d[c]||(d[c]={income:0,expense:0}),g.type.toLowerCase()==="income"?d[c].income+=g.amount:d[c].expense+=g.amount});const x=Object.values(d);if(x.length===0)return 0;const w=x.reduce((g,f)=>g+(f.income-f.expense),0);return Math.max(0,w/x.length)}static analyzePlan(b,d,x,w){const g=Math.max(0,b.targetAmount-(b.allocatedAmount||0)),f=w!==void 0?w:x,c={m25:b.targetAmount>0?b.allocatedAmount/b.targetAmount>=.25:!1,m50:b.targetAmount>0?b.allocatedAmount/b.targetAmount>=.5:!1,m75:b.targetAmount>0?b.allocatedAmount/b.targetAmount>=.75:!1,m100:b.targetAmount>0?b.allocatedAmount/b.targetAmount>=1:!1};if(b.isCompleted||g<=0)return{status:"completed",statusTitle:"Completed",statusBadgeColor:"bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",explanation:"Plan fully achieved and completed.",requiredMonthlySavings:0,monthsRemaining:0,varianceMonthly:0,projectedCompletionDate:b.completedAt||new Date().toISOString(),projectedMonths:0,milestones:c};if(b.isPaused)return{status:"paused",statusTitle:"Paused",statusBadgeColor:"bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700",explanation:"Plan is temporarily paused. Monthly savings commitments and allocation pressure are on hold.",requiredMonthlySavings:0,monthsRemaining:0,varianceMonthly:0,projectedCompletionDate:null,projectedMonths:0,milestones:c,isPaused:!0};const s=new Date;let h,k,S;if(b.startDate){const A=new Date(b.startDate),T=(A.getFullYear()-s.getFullYear())*12+(A.getMonth()-s.getMonth());if(T>0)return{status:"upcoming",statusTitle:"Upcoming",statusBadgeColor:"bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800",explanation:`Scheduled to start in ${T} ${T===1?"month":"months"}. Monthly allocation pressure is deferred until start date.`,requiredMonthlySavings:b.plannedMonthlyAmount||0,monthsRemaining:b.targetDate?Math.max(1,(new Date(b.targetDate).getFullYear()-A.getFullYear())*12+(new Date(b.targetDate).getMonth()-A.getMonth())):12,varianceMonthly:0,projectedCompletionDate:b.targetDate||null,projectedMonths:0,milestones:c,isUpcoming:!0};h=Math.max(0,-T),k=(h+1)*(b.plannedMonthlyAmount||0),S=(b.allocatedAmount||0)-k}if(!b.targetDate){const A=f>0?Math.ceil(g/f):12,T=new Date;return T.setMonth(T.getMonth()+A),d>=g?{status:"ahead",statusTitle:"Achievable Now",statusBadgeColor:"bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",explanation:"Fully fundable with current available unallocated cash.",requiredMonthlySavings:b.plannedMonthlyAmount||g/Math.max(1,A),monthsRemaining:A,varianceMonthly:(b.plannedMonthlyAmount||0)-g/Math.max(1,A),projectedCompletionDate:T.toISOString(),projectedMonths:A,milestones:c,expectedContributionToDate:k,elapsedMonthsFromStart:h,startPacingVariance:S}:{status:"onSchedule",statusTitle:"In Progress",statusBadgeColor:"bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300",explanation:`Projected completion in ${A} months at average savings capacity.`,requiredMonthlySavings:b.plannedMonthlyAmount||g/Math.max(1,A),monthsRemaining:A,varianceMonthly:0,projectedCompletionDate:T.toISOString(),projectedMonths:A,milestones:c,expectedContributionToDate:k,elapsedMonthsFromStart:h,startPacingVariance:S}}const j=new Date(b.targetDate),m=(j.getFullYear()-s.getFullYear())*12+(j.getMonth()-s.getMonth()),C=Math.max(1,m),y=g/C,N=Math.max(1,b.plannedMonthlyAmount>0?b.plannedMonthlyAmount:f),E=Math.ceil(g/N),D=new Date;D.setMonth(D.getMonth()+E);const R=(b.plannedMonthlyAmount||0)-y;if(b.plannedMonthlyAmount>=y*1.15||f>=y*1.25&&b.plannedMonthlyAmount>=y)return{status:"ahead",statusTitle:"Ahead of Schedule",statusBadgeColor:"bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",explanation:`Pacing ahead of target deadline! Required: ${Rt.format(y)}/mo.`,requiredMonthlySavings:y,monthsRemaining:C,varianceMonthly:R,projectedCompletionDate:D.toISOString(),projectedMonths:E,milestones:c,expectedContributionToDate:k,elapsedMonthsFromStart:h,startPacingVariance:S};if(b.plannedMonthlyAmount>=y||f>=y&&Math.abs(R)<y*.15)return{status:"onSchedule",statusTitle:"On Schedule",statusBadgeColor:"bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300",explanation:`Allocations match the timeline smoothly (${Rt.format(y)}/mo required).`,requiredMonthlySavings:y,monthsRemaining:C,varianceMonthly:R,projectedCompletionDate:D.toISOString(),projectedMonths:E,milestones:c,expectedContributionToDate:k,elapsedMonthsFromStart:h,startPacingVariance:S};if(f>=y*.7||b.plannedMonthlyAmount>=y*.75){const A=y-(b.plannedMonthlyAmount||f);return{status:"atRisk",statusTitle:"At Risk",statusBadgeColor:"bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300",explanation:`Shortfall of ${Rt.format(A)}/mo against required pace.`,requiredMonthlySavings:y,monthsRemaining:C,varianceMonthly:R,shortfallMonthly:A,projectedCompletionDate:D.toISOString(),projectedMonths:E,milestones:c,expectedContributionToDate:k,elapsedMonthsFromStart:h,startPacingVariance:S}}else if(f>0&&y>f*2){const A=Math.max(1,E-C);return{status:"notFeasible",statusTitle:"Not Feasible",statusBadgeColor:"bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300",explanation:`Required ${Rt.format(y)}/mo far exceeds current cash flow. Extend deadline by ${A} months.`,requiredMonthlySavings:y,monthsRemaining:C,varianceMonthly:R,shortfallMonthly:y-f,extensionMonths:A,projectedCompletionDate:D.toISOString(),projectedMonths:E,milestones:c,expectedContributionToDate:k,elapsedMonthsFromStart:h,startPacingVariance:S}}else{const A=y-(b.plannedMonthlyAmount||f),T=Math.max(1,E-C);return{status:"behind",statusTitle:"Behind Schedule",statusBadgeColor:"bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300",explanation:`Behind timeline by ~${T} months. Needs +${Rt.format(A)}/mo boost.`,requiredMonthlySavings:y,monthsRemaining:C,varianceMonthly:R,shortfallMonthly:A,extensionMonths:T,projectedCompletionDate:D.toISOString(),projectedMonths:E,milestones:c,expectedContributionToDate:k,elapsedMonthsFromStart:h,startPacingVariance:S}}}static analyzeGoal(b,d,x){return this.analyzePlan(b,d,x)}static analyzeFinancialCapacity(b,d){const x=this.monthlyIncome(b),w=this.monthlyExpenses(b),g=Math.max(0,x-w),f=new Date,c=d.filter(T=>{if(T.isCompleted||T.isPaused)return!1;if(T.startDate){const L=new Date(T.startDate);if((L.getFullYear()-f.getFullYear())*12+(L.getMonth()-f.getMonth())>0)return!1}return!0}),s=c.reduce((T,L)=>T+(L.plannedMonthlyAmount||0),0),h=g-s;let k="healthy";h<-1e5?k="overcommitted":h<15e4&&(k="tight");const S=d.reduce((T,L)=>T+L.targetAmount,0),j=d.reduce((T,L)=>T+(L.allocatedAmount||0),0),m=S>0?Math.min(100,Math.round(j/S*100)):0,C={critical:{count:0,plannedMonthly:0,allocated:0,target:0},high:{count:0,plannedMonthly:0,allocated:0,target:0},medium:{count:0,plannedMonthly:0,allocated:0,target:0},low:{count:0,plannedMonthly:0,allocated:0,target:0}};c.forEach(T=>{const L=T.priority||"medium";C[L]&&(C[L].count+=1,C[L].plannedMonthly+=T.plannedMonthlyAmount||0,C[L].allocated+=T.allocatedAmount||0,C[L].target+=T.targetAmount||0)});const y={critical:4,high:3,medium:2,low:1},N=[...c].sort((T,L)=>(y[L.priority||"medium"]||0)-(y[T.priority||"medium"]||0));let E=g;const D=[];N.forEach(T=>{const L=Math.max(0,T.targetAmount-(T.allocatedAmount||0)),V=T.plannedMonthlyAmount||Math.round(L/6),Z=Math.min(V,Math.max(0,E));E-=Z,D.push({planId:T.id,planName:T.name,priority:T.priority||"medium",recommendedMonthly:Z})});const R=[];return k==="overcommitted"?R.push({id:"act-overcommit",type:"critical",title:"Monthly Capacity Overcommitted",message:`Your planned commitments (${Rt.format(s)}) exceed your net cash flow by ${Rt.format(Math.abs(h))}. Consider extending deadlines or reducing discretionary spending.`}):k==="tight"?R.push({id:"act-tight",type:"warning",title:"Tight Cash Flow Margin",message:`Your planned monthly allocations leave only ${Rt.format(h)} buffer. Keep discretionary expenses disciplined.`}):R.push({id:"act-surplus",type:"success",title:"Surplus Savings Capacity",message:`You have ${Rt.format(h)} surplus monthly capacity. You can accelerate your Critical plans or fund additional investments.`}),c.filter(T=>T.priority==="critical").forEach(T=>{const L=this.analyzePlan(T,this.unallocatedBalance(b,d),g);(L.status==="atRisk"||L.status==="behind"||L.status==="notFeasible")&&R.push({id:`act-crit-${T.id}`,type:"critical",title:`Action Needed: Critical Plan "${T.name}"`,message:`This critical plan is ${L.statusTitle.toLowerCase()}. Increase allocation by ${Rt.format(L.shortfallMonthly||1e5)}/mo to ensure security.`})}),{monthlyIncome:x,monthlyExpenses:w,monthlyCapacity:g,totalPlannedMonthlyCommitment:s,capacityVariance:h,healthStatus:k,totalTargetAmount:S,totalAllocatedAmount:j,overallProgressPercent:m,priorityDistribution:C,recommendedAllocations:D,actionItems:R}}static calculateWhatIf(b,d,x,w,g){const f=Math.max(0,d+x+w),c=b.filter(h=>!h.isCompleted),s=c.map(h=>{const k=Math.max(0,h.targetAmount-(h.allocatedAmount||0)-g/Math.max(1,c.length)),S=h.plannedMonthlyAmount>0?h.plannedMonthlyAmount:d,j=h.plannedMonthlyAmount>0?h.plannedMonthlyAmount+(x+w)/Math.max(1,c.length):f,m=S>0?Math.ceil(k/S):24,C=j>0?Math.ceil(k/j):24,y=Math.max(0,m-C);return{planId:h.id,planName:h.name,originalMonths:m,newMonths:C,monthsSaved:y,isFeasible:j>0}});return{adjustedIncome:x,adjustedExpenses:w,newCapacity:f,plansProjected:s}}static calculateIndividualPlanWhatIf(b,d,x,w,g,f){const c=b.allocatedAmount||0,s=Math.max(0,b.targetAmount-c),h=Math.max(0,d-c),k=Math.max(1,b.plannedMonthlyAmount>0?b.plannedMonthlyAmount:f),S=Math.max(1,x+w),j=Math.ceil(s/k),m=new Date;m.setMonth(m.getMonth()+j);const C=m.toISOString(),y=Math.ceil(h/S),N=new Date;N.setMonth(N.getMonth()+y);const E=N.toISOString(),D=j-y,R=D>0?D:0,A=D<0?Math.abs(D):0,T=g!==void 0?g:b.targetDate;let L=S,V=0,Z="onSchedule",U="On Schedule",W="bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300",ue="Pacing matches projected savings rate.";if(h<=0)Z="ahead",U="Fully Funded",W="bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",ue="This plan target is already 100% funded with allocated balance!";else if(T){const I=new Date,ae=new Date(T),v=Math.max(1,(ae.getFullYear()-I.getFullYear())*12+(ae.getMonth()-I.getMonth()));L=h/v,V=S-L,S>=L*1.15?(Z="ahead",U="Ahead of Target",W="bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",ue=`Surplus of ${Rt.format(V)}/mo against required target pace.`):S>=L*.95?(Z="onSchedule",U="On Track",W="bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300",ue=`Allocations match required target rate of ${Rt.format(L)}/mo.`):S>=L*.7?(Z="atRisk",U="At Risk",W="bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300",ue=`Shortfall of ${Rt.format(Math.abs(V))}/mo against deadline.`):(Z="behind",U="Behind Schedule",W="bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300",ue=`Heavy shortfall. Need ${Rt.format(L)}/mo to reach deadline.`)}else Z=S>=f*.8?"ahead":"onSchedule",U="Capacity Driven",W="bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",ue=`Projected completion in ${y} months at simulated contribution rate.`;return{planId:b.id,planName:b.name,originalTargetAmount:b.targetAmount,simulatedTargetAmount:d,originalPlannedMonthly:b.plannedMonthlyAmount||0,simulatedMonthlyAllocation:x,extraMonthlySavings:w,totalSimulatedMonthlyRate:S,originalTargetDate:b.targetDate,simulatedTargetDate:T,originalForecastDate:C,simulatedForecastDate:E,originalMonths:j,simulatedMonths:y,monthsGained:R,monthsDelayed:A,simulatedRemaining:h,requiredMonthlySavings:L,varianceMonthly:V,feasibilityStatus:Z,feasibilityTitle:U,feasibilityBadgeColor:W,feasibilityExplanation:ue}}}const f0=({transactions:B,goals:b,onOpenAdd:d,onNavigateTab:x,onSelectGoal:w,onOpenWidgetsHub:g})=>{const{t:f,language:c,formatCurrency:s,formatSignedCurrency:h,translateCat:k}=yt(),S=b.filter(T=>!T.isCompleted),j=nt.actualBalance(B),m=nt.unallocatedBalance(B,b),C=nt.totalAllocatedToGoals(b),y=nt.monthlyIncome(B),N=nt.monthlyExpenses(B),E=nt.monthlySavings(B),D=nt.historicalMonthlyAverageSavings(B),A=new Date().toLocaleDateString(c==="ar"?"ar-IQ":"en-US",{month:"long",year:"numeric"});return r.jsxs("div",{id:"dashboard-tab-view",className:"space-y-4 px-4 pt-2 pb-24 text-[#1C1C1E] dark:text-[#F2F2F7]",children:[r.jsxs("div",{id:"top-balance-card",className:"bg-white dark:bg-[#2C2C2E] p-6 rounded-[24px] shadow-sm border border-[#E5E5EA] dark:border-[#3A3A3C]",children:[r.jsxs("div",{className:"flex items-center justify-between mb-1",children:[r.jsx("h2",{className:"text-[#8E8E93] text-xs font-bold uppercase tracking-widest",children:f.actualBalance}),r.jsxs("span",{className:"flex items-center gap-1 rounded-full bg-[#E5E5EA] dark:bg-[#3A3A3C] px-2.5 py-0.5 text-[10px] font-bold text-[#3A3A3C] dark:text-[#D1D1D6]",children:[r.jsx(Vp,{className:"h-3 w-3"})," ",f.currencyLabel]})]}),r.jsx("p",{className:"text-3xl sm:text-4xl font-black text-[#1C1C1E] dark:text-white mb-4 tracking-tight",children:s(j)}),r.jsx("div",{className:"h-[1px] bg-[#F2F2F7] dark:bg-[#38383A] w-full mb-4"}),r.jsxs("div",{className:"flex justify-between items-center",children:[r.jsxs("div",{children:[r.jsx("p",{className:"text-[#8E8E93] text-[10px] uppercase font-bold tracking-wider",children:f.unallocatedAvailable}),r.jsx("p",{className:"text-base sm:text-lg font-bold text-[#34C759]",children:s(m)})]}),r.jsxs("button",{onClick:()=>x(1),className:"text-right group hover:opacity-80 transition-opacity",title:f.plansDashboardTab,children:[r.jsxs("p",{className:"text-[#8E8E93] text-[10px] uppercase font-bold tracking-wider group-hover:text-[#007AFF] flex items-center justify-end gap-1",children:[f.goalAllocations," ",r.jsx(oc,{className:"h-2.5 w-2.5"})]}),r.jsx("p",{className:"text-base sm:text-lg font-bold text-[#FF9500]",children:s(C)})]})]})]}),r.jsxs("div",{id:"monthly-performance-card",className:"bg-white dark:bg-[#2C2C2E] p-6 rounded-[24px] shadow-sm border border-[#E5E5EA] dark:border-[#3A3A3C]",children:[r.jsxs("div",{className:"flex items-center justify-between mb-4",children:[r.jsx("h2",{className:"text-[#8E8E93] text-xs font-bold uppercase tracking-widest",children:f.monthlyPerformance}),r.jsx("span",{className:"text-xs text-[#8E8E93]",children:A})]}),r.jsxs("div",{className:"space-y-3",children:[r.jsxs("div",{className:"flex justify-between items-center p-3 bg-[#F2F2F7] dark:bg-[#1C1C1E]/80 rounded-xl",children:[r.jsxs("span",{className:"text-sm font-medium text-[#1C1C1E] dark:text-white flex items-center gap-2",children:[r.jsx(si,{className:"h-4 w-4 text-[#34C759]"})," ",f.income]}),r.jsxs("span",{className:"text-sm font-bold text-[#34C759]",children:["+",s(y)]})]}),r.jsxs("div",{className:"flex justify-between items-center p-3 bg-[#F2F2F7] dark:bg-[#1C1C1E]/80 rounded-xl",children:[r.jsxs("span",{className:"text-sm font-medium text-[#1C1C1E] dark:text-white flex items-center gap-2",children:[r.jsx(ci,{className:"h-4 w-4 text-[#FF3B30]"})," ",f.expenses]}),r.jsxs("span",{className:"text-sm font-bold text-[#FF3B30]",children:["-",s(N)]})]}),r.jsxs("div",{className:"flex justify-between items-center p-3 bg-[#F2F2F7] dark:bg-[#1C1C1E]/80 rounded-xl",children:[r.jsxs("span",{className:"text-sm font-medium text-[#1C1C1E] dark:text-white flex items-center gap-2",children:[r.jsx(Dx,{className:"h-4 w-4 text-[#007AFF]"})," ",f.netSavings]}),r.jsxs("span",{className:"text-sm font-bold text-[#007AFF]",children:[E>=0?"+":"",s(E)]})]}),r.jsxs("div",{className:"flex justify-between items-center p-3 bg-[#F2F2F7] dark:bg-[#1C1C1E]/80 rounded-xl",children:[r.jsx("span",{className:"text-sm font-medium text-[#8E8E93]",children:f.historicalAvgSavings}),r.jsx("span",{className:"text-sm font-bold text-[#1C1C1E] dark:text-white",children:s(D)})]})]})]}),r.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2.5",children:[r.jsxs("button",{id:"quick-add-transaction-banner",onClick:d,className:"flex items-center justify-between rounded-2xl bg-[#007AFF] px-4 py-3 text-white font-semibold shadow-md shadow-blue-500/20 transition-all hover:bg-[#0062CC] active:scale-[0.98]",children:[r.jsxs("div",{className:"flex items-center gap-2 text-xs font-bold",children:[r.jsx(cn,{className:"h-4 w-4"}),r.jsx("span",{children:f.addTransactionBtn})]}),r.jsx("span",{className:"rounded-lg bg-white/20 px-2 py-0.5 text-[10px] font-semibold",children:c==="ar"?"تسجيل سريع":"Quick Log"})]}),g&&r.jsxs("button",{id:"open-ios-widgets-hub-btn",onClick:g,className:"flex items-center justify-between rounded-2xl bg-gradient-to-r from-indigo-500/10 to-blue-500/10 dark:from-indigo-950/40 dark:to-blue-950/40 border border-blue-200/70 dark:border-blue-800/50 px-4 py-3 text-[#007AFF] dark:text-blue-300 font-semibold transition-all hover:bg-blue-500/15 active:scale-[0.98]",children:[r.jsxs("div",{className:"flex items-center gap-2 text-xs font-bold",children:[r.jsx("span",{className:"flex h-5 w-5 items-center justify-center rounded-lg bg-[#007AFF] text-white text-[10px]",children:"⚡"}),r.jsx("span",{children:c==="ar"?"الويدجت واختصارات 3D":"Widgets & 3D Touch"})]}),r.jsx("span",{className:"rounded-lg bg-[#007AFF]/10 dark:bg-white/10 px-2 py-0.5 text-[10px] font-bold",children:"iOS"})]})]}),r.jsxs("div",{id:"active-goals-snapshot",className:"space-y-3",children:[r.jsxs("div",{className:"flex items-center justify-between px-1",children:[r.jsx("h3",{className:"text-sm font-bold text-[#1C1C1E] dark:text-white",children:f.activeGoals}),r.jsxs("button",{onClick:()=>x(1),className:"flex items-center text-xs font-semibold text-[#007AFF] hover:underline gap-1",children:[f.viewAllGoals," ",r.jsx(oc,{className:"h-3.5 w-3.5"})]})]}),S.length===0?r.jsx("div",{className:"rounded-[24px] border border-dashed border-[#D1D1D6] p-6 text-center text-xs text-[#8E8E93] dark:border-[#3A3A3C] bg-white dark:bg-[#2C2C2E]",children:f.noActiveGoals}):S.slice(0,3).map(T=>{const L=nt.analyzePlan(T,m,D),V=T.targetAmount>0?Math.min(100,Math.round(T.allocatedAmount/T.targetAmount*100)):0,Z=Math.max(0,T.targetAmount-T.allocatedAmount);return r.jsxs("div",{onClick:()=>w(T),className:"cursor-pointer rounded-[24px] border border-[#E5E5EA] bg-white p-5 shadow-sm transition-all hover:border-[#007AFF]/50 dark:border-[#3A3A3C] dark:bg-[#2C2C2E]",children:[r.jsxs("div",{className:"flex justify-between items-start mb-3",children:[r.jsxs("div",{className:"flex items-center gap-2",children:[T.priority&&r.jsx("span",{className:`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${T.priority==="critical"?"bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300":T.priority==="high"?"bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300":"bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-300"}`,children:T.priority}),r.jsx("h3",{className:"font-bold text-sm text-[#1C1C1E] dark:text-white",children:T.name})]}),r.jsx("span",{className:`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${L.statusBadgeColor}`,children:L.statusTitle})]}),r.jsxs("div",{className:"flex justify-between text-xs mb-2",children:[r.jsxs("span",{className:"text-[#8E8E93]",children:[s(T.allocatedAmount)," / ",s(T.targetAmount)]}),r.jsxs("span",{className:"font-bold text-[#1C1C1E] dark:text-white",children:[V,"%"]})]}),r.jsx("div",{className:"w-full bg-[#F2F2F7] dark:bg-[#1C1C1E] h-2 rounded-full overflow-hidden",children:r.jsx("div",{className:"h-full bg-[#007AFF] transition-all duration-500",style:{width:`${V}%`}})}),r.jsxs("div",{className:"mt-2 text-right text-[10px] text-[#8E8E93]",children:[f.remainingAmount,": ",s(Z)]})]},T.id)})]}),r.jsxs("div",{id:"recent-transactions-snapshot",className:"rounded-[24px] border border-[#E5E5EA] bg-white shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E] flex flex-col overflow-hidden",children:[r.jsxs("div",{className:"p-5 border-b border-[#F2F2F7] dark:border-[#38383A] flex justify-between items-center",children:[r.jsx("h3",{className:"font-bold text-sm text-[#1C1C1E] dark:text-white",children:f.recentTransactions}),r.jsx("button",{onClick:()=>x(2),className:"text-[#007AFF] text-sm font-semibold hover:underline",children:f.viewAllTransactions})]}),B.length===0?r.jsx("div",{className:"p-6 text-center text-xs text-[#8E8E93]",children:f.noTransactionsYet}):r.jsx("div",{className:"p-2 space-y-1",children:B.slice(0,5).map(T=>{const L=T.type.toLowerCase()==="income";return r.jsxs("div",{className:"flex justify-between items-center p-3 hover:bg-[#F9F9F9] dark:hover:bg-[#38383A]/40 rounded-xl transition-colors",children:[r.jsxs("div",{className:"flex gap-3 items-center",children:[r.jsx("div",{className:`w-10 h-10 flex items-center justify-center rounded-full text-xs font-bold ${L?"bg-green-50 text-[#34C759] dark:bg-green-950/40":"bg-orange-50 text-[#FF9500] dark:bg-orange-950/40"}`,children:L?r.jsx(si,{className:"h-5 w-5"}):r.jsx(ci,{className:"h-5 w-5"})}),r.jsxs("div",{children:[r.jsx("p",{className:"text-sm font-bold text-[#1C1C1E] dark:text-white",children:T.itemDescription||k(T.category)||(L?f.income:f.expenses)}),r.jsxs("p",{className:"text-xs text-[#8E8E93]",children:[L?f.income:f.expenses," • ",L?k(T.source)||"General":k(T.category)]})]})]}),r.jsxs("p",{className:`text-sm font-bold ${L?"text-[#34C759]":"text-[#3A3A3C] dark:text-[#E5E5EA]"}`,children:[L?"+":"-",s(T.amount)]})]},T.id)})})]})]})};function ah(B,b,d={}){const{delay:x=500,moveThreshold:w=8}=d,g=ce.useRef(null),f=ce.useRef(!1),c=ce.useRef(null),s=ce.useRef(!1),h=ce.useCallback(()=>{g.current&&(clearTimeout(g.current),g.current=null)},[]),k=ce.useCallback((m,C)=>{s.current=!1,f.current=!1,c.current={x:m,y:C},h(),g.current=setTimeout(()=>{if(!f.current){if(s.current=!0,typeof window<"u"&&"navigator"in window&&"vibrate"in navigator)try{navigator.vibrate(50)}catch{}B()}},x)},[B,x,h]),S=ce.useCallback(()=>{h(),c.current=null},[h]),j=ce.useCallback((m,C)=>{if(!c.current)return;Math.hypot(m-c.current.x,C-c.current.y)>w&&(f.current=!0,h())},[h,w]);return{onMouseDown:m=>{m.button===0&&k(m.clientX,m.clientY)},onMouseUp:()=>S(),onMouseLeave:()=>S(),onTouchStart:m=>{m.touches.length===1&&k(m.touches[0].clientX,m.touches[0].clientY)},onTouchEnd:()=>S(),onTouchCancel:()=>{f.current=!0,S()},onTouchMove:m=>{m.touches.length===1&&j(m.touches[0].clientX,m.touches[0].clientY)},onClick:m=>{if(s.current){m.preventDefault(),m.stopPropagation(),s.current=!1;return}if(f.current){f.current=!1;return}b&&b()}}}const h0=({item:B,isIncome:b,isSelectMode:d,isSelected:x,onToggleSelect:w,onLongPressTrigger:g,onEdit:f,onRequestDelete:c,formatCurrency:s,translateCat:h,language:k,t:S})=>{const j=ah(()=>{g()},()=>{d?w():f()},{delay:500});return r.jsxs("div",{...j,className:`group flex items-center justify-between p-3.5 transition-colors select-none cursor-pointer active:scale-[0.99] ${x?"bg-blue-50/70 dark:bg-blue-950/30":"hover:bg-[#F9F9F9] dark:hover:bg-[#38383A]/40"}`,children:[r.jsxs("div",{className:"flex flex-1 items-center gap-3 min-w-0",children:[d&&r.jsx("div",{onClick:m=>{m.stopPropagation(),w()},className:"shrink-0 cursor-pointer p-0.5",children:x?r.jsx("div",{className:"flex h-5 w-5 items-center justify-center rounded-full bg-[#007AFF] text-white shadow-sm",children:r.jsx(sn,{className:"h-3.5 w-3.5 stroke-[3]"})}):r.jsx("div",{className:"h-5 w-5 rounded-full border-2 border-[#C7C7CC] dark:border-[#545458]"})}),r.jsx("div",{className:`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${b?"bg-green-50 text-[#34C759] dark:bg-green-950/40":"bg-orange-50 text-[#FF9500] dark:bg-orange-950/40"}`,children:b?r.jsx(si,{className:"h-5 w-5"}):r.jsx(ci,{className:"h-5 w-5"})}),r.jsxs("div",{className:"min-w-0 flex-1",children:[r.jsx("div",{className:"truncate font-bold text-xs text-[#1C1C1E] dark:text-white",children:B.itemDescription||h(B.category)||(b?S.income:S.expenses)}),r.jsxs("div",{className:"flex items-center gap-1.5 text-[11px] text-[#8E8E93]",children:[r.jsx("span",{children:b?h(B.source)||"General":h(B.category)}),B.notes&&r.jsxs(r.Fragment,{children:[r.jsx("span",{children:"•"}),r.jsx("span",{className:"truncate italic",children:B.notes})]})]})]})]}),r.jsxs("div",{className:"flex items-center gap-2",children:[r.jsxs("div",{className:"text-right",children:[r.jsxs("div",{className:`font-bold text-xs ${b?"text-[#34C759]":"text-[#3A3A3C] dark:text-[#E5E5EA]"}`,children:[b?"+":"-",s(B.amount)]}),r.jsx("div",{className:"text-[10px] text-[#8E8E93]",children:d?x?k==="ar"?"محدد":"Selected":"":k==="ar"?"اضغط مطولاً للتحديد":"Hold to select"})]}),!d&&r.jsx("button",{type:"button",onClick:m=>{m.stopPropagation(),c()},className:"rounded-lg p-1.5 text-[#C7C7CC] transition-colors hover:bg-red-50 hover:text-[#FF3B30] dark:text-[#8E8E93] dark:hover:bg-red-950/40 dark:hover:text-[#FF3B30]",title:S.delete,children:r.jsx(nn,{className:"h-3.5 w-3.5"})})]})]})},g0=({transactions:B,onOpenAdd:b,onEditTransaction:d,onDeleteTransaction:x,onDeleteTransactionsBatch:w})=>{const{t:g,language:f,formatCurrency:c,translateCat:s}=yt(),[h,k]=ce.useState(""),[S,j]=ce.useState("all"),[m,C]=ce.useState("All"),[y,N]=ce.useState(!1),[E,D]=ce.useState(null),[R,A]=ce.useState(!1),[T,L]=ce.useState(new Set),[V,Z]=ce.useState(!1),U=ce.useMemo(()=>{const P=new Set;return B.forEach(ne=>{ne.category&&P.add(ne.category)}),Array.from(P).sort()},[B]),W=ce.useMemo(()=>B.filter(P=>{var ne,O,o,_;if(S!=="all"&&P.type.toLowerCase()!==S||m!=="All"&&P.category!==m)return!1;if(h.trim()){const K=h.toLowerCase(),X=(ne=P.category)==null?void 0:ne.toLowerCase().includes(K),te=(O=P.source)==null?void 0:O.toLowerCase().includes(K),ye=(o=P.itemDescription)==null?void 0:o.toLowerCase().includes(K),xe=(_=P.notes)==null?void 0:_.toLowerCase().includes(K);if(!X&&!te&&!ye&&!xe)return!1}return!0}).sort((P,ne)=>{const O=new Date(P.date).getTime(),o=new Date(ne.date).getTime();return y?O-o:o-O}),[B,S,m,h,y]),ue=P=>{L(ne=>{const O=new Set(ne);return O.has(P)?O.delete(P):O.add(P),O})},I=P=>{R?ue(P):(A(!0),L(new Set([P])))},ae=W.length>0&&W.every(P=>T.has(P.id)),v=()=>{L(ae?new Set:new Set(W.map(P=>P.id)))},J=()=>{A(!1),L(new Set)},Q=()=>{const P=Array.from(T);P.length!==0&&(w?w(P):P.forEach(ne=>x(ne)),Z(!1),J())},Y=ce.useMemo(()=>{const P={};return W.forEach(ne=>{const O=new Date(ne.date).toLocaleDateString(f==="ar"?"ar-IQ":"en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"});P[O]||(P[O]=[]),P[O].push(ne)}),P},[W,f]);return r.jsxs("div",{id:"transactions-tab-view",className:"space-y-3 px-4 pt-2 pb-24 text-[#1C1C1E] dark:text-[#F2F2F7]",children:[r.jsxs("div",{className:"space-y-2.5",children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsxs("div",{children:[r.jsx("span",{className:"text-[#8E8E93] text-[10px] font-bold uppercase tracking-widest",children:g.historyHeading}),r.jsx("h2",{className:"text-xl font-bold tracking-tight text-[#1C1C1E] dark:text-white",children:g.transactionsTitle})]}),r.jsxs("div",{className:"flex items-center gap-2",children:[r.jsxs("button",{onClick:()=>{R?J():A(!0)},className:`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-sm transition-all ${R?"bg-[#007AFF] text-white hover:bg-[#0062CC]":"border border-[#E5E5EA] bg-white text-[#3A3A3C] hover:bg-[#F2F2F7] dark:border-[#3A3A3C] dark:bg-[#2C2C2E] dark:text-white"}`,children:[r.jsx(jl,{className:"h-3.5 w-3.5"}),r.jsx("span",{children:R?f==="ar"?"إلغاء":"Done":f==="ar"?"تحديد":"Select"})]}),r.jsxs("button",{onClick:()=>N(!y),className:"flex items-center gap-1.5 rounded-xl border border-[#E5E5EA] bg-white px-3 py-1.5 text-xs font-semibold text-[#3A3A3C] shadow-sm transition-all hover:bg-[#F2F2F7] dark:border-[#3A3A3C] dark:bg-[#2C2C2E] dark:text-white",title:"Toggle Sort Order",children:[r.jsx(Rp,{className:"h-3.5 w-3.5 text-[#007AFF]"}),r.jsx("span",{children:f==="ar"?y?"الأقدم":"الأحدث":y?"Oldest":"Newest"})]}),!R&&r.jsx("button",{onClick:b,className:"flex h-8.5 w-8.5 items-center justify-center rounded-xl bg-[#007AFF] text-white shadow-md shadow-blue-500/25 hover:bg-[#0062CC] transition-colors",children:r.jsx(cn,{className:"h-4 w-4"})})]})]}),R&&r.jsxs("div",{className:"flex items-center justify-between rounded-2xl border border-blue-200 bg-blue-50/80 px-3.5 py-2.5 dark:border-blue-900/60 dark:bg-blue-950/40 shadow-sm animate-in fade-in duration-150",children:[r.jsxs("div",{className:"flex items-center gap-2.5",children:[r.jsx("button",{type:"button",onClick:v,className:"flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-[#007AFF] shadow-sm hover:bg-blue-50 dark:bg-[#1C1C1E] dark:text-blue-300",children:ae?r.jsxs(r.Fragment,{children:[r.jsx(jl,{className:"h-3.5 w-3.5"}),f==="ar"?"إلغاء تحديد الكل":"Deselect All"]}):r.jsxs(r.Fragment,{children:[r.jsx(Jf,{className:"h-3.5 w-3.5"}),f==="ar"?"تحديد الكل":"Select All"]})}),r.jsxs("span",{className:"text-xs font-bold text-[#1C1C1E] dark:text-white",children:[T.size," ",f==="ar"?"محدد":"selected"]})]}),r.jsxs("div",{className:"flex items-center gap-2",children:[r.jsxs("button",{type:"button",disabled:T.size===0,onClick:()=>Z(!0),className:"flex items-center gap-1.5 rounded-xl bg-[#FF3B30] px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors",children:[r.jsx(nn,{className:"h-3.5 w-3.5"}),r.jsxs("span",{children:[f==="ar"?"حذف المحدد":"Delete Selected",T.size>0&&` (${T.size})`]})]}),r.jsx("button",{type:"button",onClick:J,className:"rounded-full p-1 text-[#8E8E93] hover:bg-white/50 dark:hover:bg-[#1C1C1E] transition-colors",title:g.cancel,children:r.jsx(gn,{className:"h-4 w-4"})})]})]}),r.jsxs("div",{className:"relative",children:[r.jsx(Ff,{className:"absolute top-2.5 left-3.5 h-4 w-4 text-[#8E8E93]"}),r.jsx("input",{type:"text",placeholder:g.searchPlaceholder,value:h,onChange:P=>k(P.target.value),className:"w-full rounded-xl border border-[#E5E5EA] bg-white py-2 pr-8 pl-10 text-xs placeholder:text-[#8E8E93] focus:border-[#007AFF] focus:ring-1 focus:ring-[#007AFF] focus:outline-none dark:border-[#3A3A3C] dark:bg-[#2C2C2E] dark:text-white"}),h&&r.jsx("button",{onClick:()=>k(""),className:"absolute top-2.5 right-3 text-[#8E8E93] hover:text-[#1C1C1E]",children:r.jsx(gn,{className:"h-3.5 w-3.5"})})]}),r.jsxs("div",{className:"flex rounded-xl bg-[#E5E5EA] p-1 text-xs font-semibold dark:bg-[#2C2C2E]",children:[r.jsx("button",{onClick:()=>j("all"),className:`flex-1 rounded-lg py-1.5 text-center transition-all ${S==="all"?"bg-white text-[#1C1C1E] shadow-sm dark:bg-[#1C1C1E] dark:text-white":"text-[#8E8E93]"}`,children:g.allFilter}),r.jsx("button",{onClick:()=>j("income"),className:`flex-1 rounded-lg py-1.5 text-center transition-all ${S==="income"?"bg-white text-[#34C759] shadow-sm dark:bg-[#1C1C1E]":"text-[#8E8E93]"}`,children:g.incomeFilter}),r.jsx("button",{onClick:()=>j("expense"),className:`flex-1 rounded-lg py-1.5 text-center transition-all ${S==="expense"?"bg-white text-[#FF3B30] shadow-sm dark:bg-[#1C1C1E]":"text-[#8E8E93]"}`,children:g.expensesFilter})]}),r.jsxs("div",{className:"flex gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar",children:[r.jsx("button",{onClick:()=>C("All"),className:`rounded-full px-3.5 py-1 font-semibold transition-all ${m==="All"?"bg-[#007AFF] text-white shadow-sm":"bg-[#E5E5EA] text-[#3A3A3C] hover:bg-[#D1D1D6] dark:bg-[#2C2C2E] dark:text-[#8E8E93]"}`,children:g.allFilter}),U.map(P=>r.jsx("button",{onClick:()=>C(P),className:`rounded-full px-3.5 py-1 font-semibold whitespace-nowrap transition-all ${m===P?"bg-[#007AFF] text-white shadow-sm":"bg-[#E5E5EA] text-[#3A3A3C] hover:bg-[#D1D1D6] dark:bg-[#2C2C2E] dark:text-[#8E8E93]"}`,children:s(P)},P))]})]}),W.length===0?r.jsxs("div",{className:"rounded-[24px] border border-dashed border-[#D1D1D6] p-8 text-center text-xs text-[#8E8E93] dark:border-[#3A3A3C] bg-white dark:bg-[#2C2C2E]",children:[r.jsx(Ff,{className:"mx-auto mb-2 h-6 w-6 text-[#8E8E93]"}),r.jsx("p",{className:"font-bold text-[#1C1C1E] dark:text-white",children:g.noTransactionsFound}),r.jsx("p",{className:"mt-1 text-[#8E8E93]",children:g.noTransactionsHint})]}):r.jsx("div",{className:"space-y-4",children:Object.entries(Y).map(([P,ne])=>r.jsxs("div",{className:"space-y-1.5",children:[r.jsx("div",{className:"px-1 text-[11px] font-bold tracking-wider text-[#8E8E93] uppercase",children:P}),r.jsx("div",{className:"divide-y divide-[#F2F2F7] overflow-hidden rounded-[24px] border border-[#E5E5EA] bg-white shadow-sm dark:divide-[#38383A] dark:border-[#3A3A3C] dark:bg-[#2C2C2E]",children:ne.map(O=>{const o=O.type.toLowerCase()==="income",_=T.has(O.id);return r.jsx(h0,{item:O,isIncome:o,isSelectMode:R,isSelected:_,onToggleSelect:()=>ue(O.id),onLongPressTrigger:()=>I(O.id),onEdit:()=>d(O),onRequestDelete:()=>D(O.id),formatCurrency:c,translateCat:s,language:f,t:g},O.id)})})]},P))}),V&&r.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200",children:r.jsxs("div",{className:"w-full max-w-xs rounded-[24px] bg-white p-6 text-center shadow-2xl dark:bg-[#2C2C2E] border border-[#E5E5EA] dark:border-[#3A3A3C]",children:[r.jsx(nn,{className:"mx-auto mb-2 h-8 w-8 text-[#FF3B30]"}),r.jsx("h4",{className:"font-bold text-sm text-[#1C1C1E] dark:text-white",children:f==="ar"?"حذف المعاملات المحددة؟":"Delete Selected Transactions?"}),r.jsx("p",{className:"mt-2 text-xs text-[#8E8E93]",children:f==="ar"?`هل أنت متأكد من رغبتك في حذف ${T.size} معاملات؟ سيتم تحديث الرصيد والتحليلات فوراً.`:`Are you sure you want to delete ${T.size} transactions? Total balance, analytics, and capacity will update immediately.`}),r.jsxs("div",{className:"mt-4 flex gap-2",children:[r.jsx("button",{type:"button",onClick:()=>Z(!1),className:"flex-1 rounded-xl bg-[#E5E5EA] py-2.5 text-xs font-semibold text-[#3A3A3C] hover:bg-[#D1D1D6] dark:bg-[#3A3A3C] dark:text-white transition-colors",children:g.cancel}),r.jsx("button",{type:"button",onClick:Q,className:"flex-1 rounded-xl bg-[#FF3B30] py-2.5 text-xs font-bold text-white hover:bg-red-700 transition-colors shadow-md shadow-red-500/20",children:f==="ar"?`حذف (${T.size})`:`Delete (${T.size})`})]})]})}),E&&r.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm",children:r.jsxs("div",{className:"w-full max-w-xs rounded-[24px] bg-white p-6 text-center shadow-2xl dark:bg-[#2C2C2E] border border-[#E5E5EA] dark:border-[#3A3A3C]",children:[r.jsx(nn,{className:"mx-auto mb-2 h-8 w-8 text-[#FF3B30]"}),r.jsx("h4",{className:"font-bold text-sm text-[#1C1C1E] dark:text-white",children:f==="ar"?"حذف المعاملة؟":"Delete Transaction?"}),r.jsx("p",{className:"mt-1 text-xs text-[#8E8E93]",children:f==="ar"?"سيتم حذف المعاملة وتحديث الرصيد والإحصائيات فوراً.":"This will permanently recalculate your current balance and stats."}),r.jsxs("div",{className:"mt-4 flex gap-2",children:[r.jsx("button",{onClick:()=>D(null),className:"flex-1 rounded-xl bg-[#E5E5EA] py-2 text-xs font-semibold text-[#3A3A3C] hover:bg-[#D1D1D6] dark:bg-[#3A3A3C] dark:text-white",children:g.cancel}),r.jsx("button",{onClick:()=>{x(E),D(null)},className:"flex-1 rounded-xl bg-[#FF3B30] py-2 text-xs font-semibold text-white hover:bg-red-700",children:g.delete})]})]})})]})},p0=({transactions:B})=>{const{t:b,language:d,formatCurrency:x,translateCat:w}=yt(),[g,f]=ce.useState("thisMonth"),c=ce.useMemo(()=>{const A=new Date;return B.filter(T=>{const L=new Date(T.date);switch(g){case"thisWeek":{const V=new Date(A);return V.setDate(A.getDate()-A.getDay()),V.setHours(0,0,0,0),L>=V}case"thisMonth":return L.getMonth()===A.getMonth()&&L.getFullYear()===A.getFullYear();case"lastMonth":{const V=new Date(A.getFullYear(),A.getMonth()-1,1);return L.getMonth()===V.getMonth()&&L.getFullYear()===V.getFullYear()}case"last3Months":{const V=new Date(A.getFullYear(),A.getMonth()-3,A.getDate());return L>=V}case"last6Months":{const V=new Date(A.getFullYear(),A.getMonth()-6,A.getDate());return L>=V}case"thisYear":return L.getFullYear()===A.getFullYear();case"allTime":default:return!0}})},[B,g]),s=ce.useMemo(()=>c.filter(A=>A.type.toLowerCase()==="income").reduce((A,T)=>A+T.amount,0),[c]),h=ce.useMemo(()=>c.filter(A=>A.type.toLowerCase()==="expense").reduce((A,T)=>A+T.amount,0),[c]),k=ce.useMemo(()=>{if(s<=0)return 0;const A=s-h;return Math.max(0,Math.round(A/s*100))},[s,h]),S=ce.useMemo(()=>{const A=c.filter(T=>T.type.toLowerCase()==="expense");return A.length===0?null:A.reduce((T,L)=>L.amount>T.amount?L:T,A[0])},[c]),j=ce.useMemo(()=>{const A={};c.forEach(L=>{if(L.type.toLowerCase()==="expense"){const V=L.category||"Other";A[V]=(A[V]||0)+L.amount}});const T=Object.values(A).reduce((L,V)=>L+V,0);return Object.entries(A).map(([L,V])=>({name:L,amount:V,percentage:T>0?Math.round(V/T*100):0})).sort((L,V)=>V.amount-L.amount)},[c]),m=j[0]||null,C=ce.useMemo(()=>{const A={};return B.forEach(T=>{const L=new Date(T.date),V=`${L.getFullYear()}-${L.getMonth()}`;A[V]||(A[V]={label:L.toLocaleDateString(d==="ar"?"ar-IQ":"en-US",{month:"short"}),date:new Date(L.getFullYear(),L.getMonth(),1),net:0}),T.type.toLowerCase()==="income"?A[V].net+=T.amount:A[V].net-=T.amount}),Object.values(A).sort((T,L)=>T.date.getTime()-L.date.getTime()).slice(-6)},[B,d]),y=[{id:"thisWeek",label:b.timeRangeThisWeek},{id:"thisMonth",label:b.timeRangeThisMonth},{id:"lastMonth",label:b.timeRangeLastMonth},{id:"last3Months",label:b.timeRangeLast3M},{id:"last6Months",label:b.timeRangeLast6M},{id:"thisYear",label:b.timeRangeThisYear},{id:"allTime",label:b.timeRangeAllTime}],N=Math.max(s,h,1),E=72,D=Math.round(s/N*E),R=Math.round(h/N*E);return r.jsxs("div",{id:"analytics-tab-view",className:"space-y-4 px-4 pt-2 pb-24 text-[#1C1C1E] dark:text-[#F2F2F7]",children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsxs("div",{children:[r.jsx("span",{className:"text-[#8E8E93] text-[10px] font-bold uppercase tracking-widest",children:b.insightsHeading}),r.jsx("h2",{className:"text-xl font-bold tracking-tight text-[#1C1C1E] dark:text-white",children:b.analyticsTitle})]}),r.jsx("span",{className:"rounded-lg bg-[#E5E5EA] px-2.5 py-1 text-[10px] font-bold text-[#3A3A3C] dark:bg-[#2C2C2E] dark:text-[#D1D1D6]",children:"Swift Charts"})]}),r.jsx("div",{className:"flex gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar",children:y.map(A=>r.jsx("button",{onClick:()=>f(A.id),className:`rounded-full px-3.5 py-1 font-semibold whitespace-nowrap transition-all ${g===A.id?"bg-[#007AFF] text-white shadow-sm":"bg-[#E5E5EA] text-[#3A3A3C] hover:bg-[#D1D1D6] dark:bg-[#2C2C2E] dark:text-[#8E8E93]"}`,children:A.label},A.id))}),r.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[r.jsxs("div",{className:"rounded-[24px] border border-[#E5E5EA] bg-white p-4 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]",children:[r.jsx("div",{className:"text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]",children:b.savingsRate}),r.jsxs("div",{className:"mt-1 font-black text-xl text-[#007AFF]",children:[k,"%"]}),r.jsx("div",{className:"text-[10px] text-[#8E8E93]",children:d==="ar"?"من إجمالي الدخل":"of period income"})]}),r.jsxs("div",{className:"rounded-[24px] border border-[#E5E5EA] bg-white p-4 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]",children:[r.jsx("div",{className:"text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]",children:b.netSavings}),r.jsx("div",{className:`mt-1 font-black text-xl truncate ${s>=h?"text-[#34C759]":"text-[#FF3B30]"}`,children:x(s-h)}),r.jsx("div",{className:"text-[10px] text-[#8E8E93]",children:d==="ar"?"الدخل ناقص المصاريف":"Income minus expenses"})]}),r.jsxs("div",{className:"rounded-[24px] border border-[#E5E5EA] bg-white p-4 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]",children:[r.jsx("div",{className:"text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]",children:b.largestExpense}),r.jsx("div",{className:"mt-1 font-bold text-sm text-[#1C1C1E] dark:text-white truncate",children:x(S?S.amount:0)}),r.jsx("div",{className:"truncate text-[10px] text-[#8E8E93]",children:(S==null?void 0:S.itemDescription)||w(S==null?void 0:S.category)||(d==="ar"?"لا يوجد":"None")})]}),r.jsxs("div",{className:"rounded-[24px] border border-[#E5E5EA] bg-white p-4 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]",children:[r.jsx("div",{className:"text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]",children:b.topCategory}),r.jsx("div",{className:"mt-1 font-bold text-sm text-[#1C1C1E] dark:text-white truncate",children:m?w(m.name):d==="ar"?"لا يوجد":"None"}),r.jsx("div",{className:"text-[10px] text-[#8E8E93]",children:m?`${x(m.amount)} (${m.percentage}%)`:x(0)})]})]}),r.jsxs("div",{className:"rounded-[24px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]",children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsxs("div",{children:[r.jsx("h3",{className:"font-bold text-xs uppercase tracking-wider text-[#8E8E93]",children:b.incomeVsExpenses}),r.jsx("p",{className:"text-[11px] text-[#8E8E93]",children:d==="ar"?"مقارنة إجمالية للفترة الحالية":"Total comparison for current period"})]}),r.jsx("span",{className:"rounded-full bg-[#F2F2F7] px-2.5 py-0.5 text-[10px] font-semibold text-[#8E8E93] dark:bg-[#38383A]",children:d==="ar"?"رسم بياني":"Bar Chart"})]}),r.jsxs("div",{className:"mt-6 flex h-40 items-end justify-center gap-12 sm:gap-16 border-b border-[#F2F2F7] pb-2 dark:border-[#38383A]",children:[r.jsxs("div",{className:"flex flex-col items-center justify-end",children:[r.jsx("span",{className:"mb-2 font-bold text-[11px] text-[#34C759] tracking-tight whitespace-nowrap",children:x(s)}),r.jsx("div",{className:"w-14 rounded-t-xl bg-[#34C759] shadow-sm transition-all duration-500",style:{height:`${Math.max(10,D)}px`}}),r.jsx("span",{className:"mt-2.5 text-xs font-semibold text-[#1C1C1E] dark:text-white",children:b.income})]}),r.jsxs("div",{className:"flex flex-col items-center justify-end",children:[r.jsx("span",{className:"mb-2 font-bold text-[11px] text-[#FF3B30] tracking-tight whitespace-nowrap",children:x(h)}),r.jsx("div",{className:"w-14 rounded-t-xl bg-[#FF3B30] shadow-sm transition-all duration-500",style:{height:`${Math.max(10,R)}px`}}),r.jsx("span",{className:"mt-2.5 text-xs font-semibold text-[#1C1C1E] dark:text-white",children:b.expenses})]})]})]}),r.jsxs("div",{className:"rounded-[24px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]",children:[r.jsx("h3",{className:"font-bold text-xs uppercase tracking-wider text-[#8E8E93]",children:b.categoryBreakdown}),r.jsx("p",{className:"text-[11px] text-[#8E8E93] mb-3",children:d==="ar"?"توزيع المصاريف حسب الفئات تصاعدياً":"Ranked horizontal distribution"}),j.length===0?r.jsx("div",{className:"py-6 text-center text-xs text-[#8E8E93]",children:d==="ar"?"لا توجد مصاريف مسجلة في هذه الفترة.":"No expense transactions in this period."}):r.jsx("div",{className:"space-y-3",children:j.slice(0,5).map((A,T)=>r.jsxs("div",{className:"space-y-1",children:[r.jsxs("div",{className:"flex items-center justify-between text-xs",children:[r.jsxs("span",{className:"font-semibold text-[#1C1C1E] dark:text-white",children:[T+1,". ",w(A.name)]}),r.jsxs("span",{className:"font-bold text-[#1C1C1E] dark:text-white",children:[x(A.amount)," (",A.percentage,"%)"]})]}),r.jsx("div",{className:"h-2 w-full overflow-hidden rounded-full bg-[#F2F2F7] dark:bg-[#1C1C1E]",children:r.jsx("div",{className:"h-full rounded-full bg-[#007AFF] transition-all duration-500",style:{width:`${A.percentage}%`}})})]},A.name))})]}),r.jsxs("div",{className:"rounded-[24px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]",children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsxs("div",{children:[r.jsx("h3",{className:"font-bold text-xs uppercase tracking-wider text-[#8E8E93]",children:b.monthlyTrend}),r.jsx("p",{className:"text-[11px] text-[#8E8E93]",children:d==="ar"?"الأشهر السابقة":"Past Months History"})]}),r.jsx("span",{className:"rounded-full bg-[#F2F2F7] px-2.5 py-0.5 text-[10px] font-semibold text-[#8E8E93] dark:bg-[#38383A]",children:d==="ar"?"صافي التوفير":"Net Savings"})]}),C.length===0?r.jsx("div",{className:"py-6 text-center text-xs text-[#8E8E93]",children:d==="ar"?"يتطلب وجود معاملات سابقة لعرض المنحنى.":"Need more transaction history."}):r.jsxs("div",{className:"mt-5",children:[r.jsx("div",{className:"flex h-32 items-end justify-between gap-2 border-b border-[#F2F2F7] px-2 pb-1 dark:border-[#38383A]",children:C.map((A,T)=>{const L=Math.max(...C.map(U=>Math.abs(U.net)),1),V=Math.min(80,Math.max(15,Math.round(Math.abs(A.net)/L*70))),Z=A.net>=0;return r.jsxs("div",{className:"flex flex-1 flex-col items-center justify-end h-full",children:[r.jsx("span",{className:"mb-1 font-bold text-[9px] text-[#8E8E93] truncate max-w-[48px]",children:Math.abs(A.net)>=1e6?`${(A.net/1e6).toFixed(1)}M`:`${Math.round(A.net/1e3)}k`}),r.jsx("div",{className:`w-3.5 rounded-full transition-all duration-500 ${Z?"bg-[#007AFF]":"bg-[#FF3B30]"}`,style:{height:`${V}%`},title:`${A.label}: ${x(A.net)}`}),r.jsx("span",{className:"mt-1.5 text-[10px] font-medium text-[#8E8E93]",children:A.label})]},T)})}),r.jsx("div",{className:"mt-2 text-center text-[10px] text-[#8E8E93]",children:d==="ar"?"يمثل ارتفاع العمود صافي التوفير لكل شهر":"Bar height represents net savings intensity per month"})]})]})]})},x0=({plan:B,unallocatedBalance:b,avgSavings:d,monthlyCapacity:x,priorityBadges:w,onOpenDetail:g,onOpenAllocate:f,onRequestDelete:c,isSelectMode:s,isSelected:h,onToggleSelect:k,onLongPressSelect:S})=>{const{t:j,language:m,formatCurrency:C}=yt(),y=nt.analyzePlan(B,b,d,x),N=B.targetAmount>0?Math.min(100,Math.round(B.allocatedAmount/B.targetAmount*100)):0,E=w[B.priority||"medium"],D=ah(()=>{S?S():c(B)},()=>{s&&k?k():g(B)},{delay:500}),R=B.targetDate?new Date(B.targetDate).toLocaleDateString(m==="ar"?"ar-IQ":"en-US",{month:"short",year:"numeric"}):m==="ar"?"أفق مفتوح":"Open Horizon",A=y.projectedCompletionDate?new Date(y.projectedCompletionDate).toLocaleDateString(m==="ar"?"ar-IQ":"en-US",{month:"short",year:"numeric"}):`~${y.projectedMonths} ${m==="ar"?"أشهر":"mos"}`;return r.jsxs("div",{...D,className:`group rounded-[28px] border bg-white p-5 shadow-sm transition-all dark:bg-[#2C2C2E] space-y-3 select-none cursor-pointer active:scale-[0.99] ${h?"border-[#007AFF] bg-blue-50/50 dark:bg-blue-950/20 dark:border-blue-500":"border-[#E5E5EA] hover:border-[#007AFF]/40 dark:border-[#3A3A3C]"}`,children:[r.jsxs("div",{className:"flex items-start justify-between gap-2",children:[r.jsxs("div",{className:"flex items-start gap-2.5 flex-1 min-w-0",children:[s&&r.jsx("div",{onClick:T=>{T.stopPropagation(),k&&k()},className:"mt-1 cursor-pointer p-0.5 shrink-0",children:h?r.jsx("div",{className:"flex h-5 w-5 items-center justify-center rounded-full bg-[#007AFF] text-white shadow-sm",children:r.jsx(sn,{className:"h-3.5 w-3.5 stroke-[3]"})}):r.jsx("div",{className:"h-5 w-5 rounded-full border-2 border-[#C7C7CC] dark:border-[#545458]"})}),r.jsxs("div",{className:"flex-1 min-w-0",children:[r.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[r.jsx("span",{className:`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${E.badge}`,children:m==="ar"?E.labelAr:E.labelEn}),r.jsx("span",{className:`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${y.statusBadgeColor}`,children:y.statusTitle})]}),r.jsx("h4",{className:"mt-1 font-bold text-base text-[#1C1C1E] dark:text-white truncate",children:B.name})]})]}),!s&&r.jsxs("div",{className:"flex items-center gap-1.5 shrink-0",children:[r.jsxs("button",{type:"button",onClick:T=>{T.stopPropagation(),f(B)},className:"flex items-center gap-1 rounded-xl bg-blue-50 px-2.5 py-1.5 text-xs font-bold text-[#007AFF] hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/50 transition-colors",title:j.allocateFundsBtn,children:[r.jsx(hc,{className:"h-3.5 w-3.5"}),r.jsx("span",{className:"hidden xs:inline",children:j.allocateFundsBtn})]}),r.jsx("button",{type:"button",onClick:T=>{T.stopPropagation(),c(B)},className:"rounded-xl p-1.5 text-[#C7C7CC] hover:bg-red-50 hover:text-[#FF3B30] dark:text-[#8E8E93] dark:hover:bg-red-950/40 dark:hover:text-[#FF3B30] transition-colors",title:j.delete,children:r.jsx(nn,{className:"h-4 w-4"})})]})]}),r.jsxs("div",{className:"space-y-2",children:[r.jsxs("div",{className:"flex justify-between text-xs font-semibold",children:[r.jsxs("span",{className:"text-[#007AFF] font-bold",children:[C(B.allocatedAmount)," ",r.jsxs("span",{className:"text-[#8E8E93] font-normal",children:["/ ",C(B.targetAmount)]})]}),r.jsxs("span",{className:"text-xs font-bold text-[#8E8E93]",children:[N,"%"]})]}),r.jsx("div",{className:"h-2 w-full overflow-hidden rounded-full bg-[#E5E5EA] dark:bg-[#38383A]",children:r.jsx("div",{className:"h-full rounded-full bg-[#007AFF] transition-all duration-500",style:{width:`${N}%`}})})]}),r.jsxs("div",{className:"flex items-center justify-between rounded-xl bg-[#F2F2F7] px-3 py-2 text-xs dark:bg-[#1C1C1E]",children:[r.jsxs("div",{className:"flex items-center gap-1.5 text-[#8E8E93]",children:[r.jsx(di,{className:"h-3.5 w-3.5 text-blue-500 shrink-0"}),r.jsx("span",{children:m==="ar"?"تاريخ الهدف:":"Target:"}),r.jsx("span",{className:"font-semibold text-[#1C1C1E] dark:text-white",children:R})]}),r.jsxs("div",{className:"flex items-center gap-1.5",children:[r.jsx("span",{className:"text-[10px] font-bold uppercase text-[#8E8E93]",children:m==="ar"?"المتوقع:":"Forecast:"}),r.jsx("span",{className:"font-bold text-[#007AFF]",children:A})]})]}),r.jsxs("div",{className:"flex items-center justify-between text-[11px] text-[#8E8E93] pt-0.5",children:[r.jsxs("span",{className:"flex items-center gap-1",children:[r.jsx(Dl,{className:"h-3 w-3 text-blue-500"}),r.jsxs("span",{children:["~",y.projectedMonths," ",m==="ar"?"أشهر":"mos"]})]}),r.jsxs("span",{className:"flex items-center gap-1",children:[r.jsxs("span",{children:[j.plannedMonthlyRate,":"]}),r.jsxs("strong",{className:"text-[#1C1C1E] dark:text-white",children:[C(B.plannedMonthlyAmount||0),"/mo"]})]}),r.jsxs("span",{className:`font-bold ${y.varianceMonthly>=0?"text-[#34C759]":"text-[#FF3B30]"}`,children:[y.varianceMonthly>=0?"+":"",C(y.varianceMonthly)]})]})]})},Tl=({id:B,label:b,subLabel:d,value:x,unit:w,step:g,min:f=0,max:c=1e8,presets:s,isCurrency:h=!0,onChange:k,accentColor:S="blue"})=>{const[j,m]=ce.useState(()=>h?zn(x.toString()):x.toString());ce.useEffect(()=>{m(h?zn(x.toString()):x.toString())},[x,h]);const C=()=>{const T=Math.max(f,x-g);k(T)},y=()=>{const T=Math.min(c,x+g);k(T)},N=T=>{const L=T.target.value;if(h){const V=zn(L);m(V);const Z=Rn(V);isNaN(Z)?V===""&&k(f):k(Math.min(c,Math.max(f,Z)))}else{const V=L.replace(/\D/g,"");m(V);const Z=parseInt(V,10);isNaN(Z)?V===""&&k(f):k(Math.min(c,Math.max(f,Z)))}},E=()=>{m(h?zn(x.toString()):x.toString())},D=T=>{T.absolute!==void 0?k(Math.min(c,Math.max(f,T.absolute))):T.delta!==void 0&&k(Math.min(c,Math.max(f,x+T.delta)))},R={blue:"focus-within:border-[#007AFF] focus-within:ring-[#007AFF]/20",green:"focus-within:border-[#34C759] focus-within:ring-[#34C759]/20",amber:"focus-within:border-[#FF9500] focus-within:ring-[#FF9500]/20",purple:"focus-within:border-[#AF52DE] focus-within:ring-[#AF52DE]/20"}[S],A={blue:"text-[#007AFF] bg-blue-50 dark:bg-blue-950/40 dark:text-blue-300",green:"text-[#34C759] bg-green-50 dark:bg-green-950/40 dark:text-green-300",amber:"text-[#FF9500] bg-amber-50 dark:bg-amber-950/40 dark:text-amber-300",purple:"text-[#AF52DE] bg-purple-50 dark:bg-purple-950/40 dark:text-purple-300"}[S];return r.jsxs("div",{className:"space-y-2.5 rounded-2xl bg-[#F9F9FB] p-3.5 border border-[#E5E5EA] dark:bg-[#1C1C1E] dark:border-[#3A3A3C] transition-all",children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsxs("div",{children:[r.jsx("label",{className:"text-xs font-bold text-[#1C1C1E] dark:text-white block",children:b}),d&&r.jsx("span",{className:"text-[10px] text-[#8E8E93] block mt-0.5",children:d})]}),r.jsx("span",{className:`text-[10px] font-bold px-2 py-0.5 rounded-lg ${A}`,children:h?`${j||"0"} ${w}`:`${j||"0"} ${w}`})]}),r.jsxs("div",{className:"flex items-center gap-2",children:[r.jsx("button",{type:"button",onClick:C,disabled:x<=f,"aria-label":"Decrease",className:"flex h-11 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-[#1C1C1E] shadow-sm border border-[#E5E5EA] active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 dark:bg-[#2C2C2E] dark:border-[#48484A] dark:text-white transition-transform",children:r.jsx(Zf,{className:"h-4 w-4 stroke-[2.5]"})}),r.jsxs("div",{className:`flex flex-1 items-center justify-between rounded-xl bg-white px-3.5 py-1.5 shadow-sm border border-[#E5E5EA] dark:bg-[#2C2C2E] dark:border-[#48484A] transition-all focus-within:ring-2 ${R}`,children:[r.jsx("input",{id:B,type:"text",inputMode:h?"decimal":"numeric",autoComplete:"off",value:j,onChange:N,onBlur:E,className:"w-full bg-transparent text-base font-black text-[#1C1C1E] focus:outline-none dark:text-white text-center sm:text-left",placeholder:"0"}),r.jsx("span",{className:"text-xs font-bold text-[#8E8E93] shrink-0 ml-1 select-none pointer-events-none",children:w})]}),r.jsx("button",{type:"button",onClick:y,disabled:x>=c,"aria-label":"Increase",className:"flex h-11 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-[#1C1C1E] shadow-sm border border-[#E5E5EA] active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 dark:bg-[#2C2C2E] dark:border-[#48484A] dark:text-white transition-transform",children:r.jsx(cn,{className:"h-4 w-4 stroke-[2.5]"})})]}),r.jsx("div",{className:"flex flex-wrap items-center gap-1.5 pt-0.5",children:s.map((T,L)=>r.jsxs("button",{type:"button",onClick:()=>D(T),className:`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold shadow-xs transition-all active:scale-95 ${T.isReset?"bg-gray-200/80 text-[#8E8E93] hover:text-[#1C1C1E] dark:bg-[#38383A] dark:text-[#C7C7CC] hover:bg-gray-300 dark:hover:bg-[#48484A]":"bg-white text-[#3A3A3C] border border-[#E5E5EA] hover:bg-blue-50/60 hover:text-[#007AFF] hover:border-blue-200 dark:bg-[#2C2C2E] dark:border-[#48484A] dark:text-[#E5E5EA] dark:hover:bg-blue-950/40 dark:hover:text-blue-300"}`,children:[T.isReset&&r.jsx(Lx,{className:"h-3 w-3"}),r.jsx("span",{children:T.label})]},L))})]})},y0=({plans:B,transactions:b,unallocatedBalance:d,avgSavings:x,monthlyCapacity:w,onOpenAllocate:g,onOpenDetail:f})=>{var ne;const{t:c,language:s,formatCurrency:h}=yt(),k=ce.useMemo(()=>B.filter(O=>!O.isCompleted),[B]),[S,j]=ce.useState(((ne=k[0])==null?void 0:ne.id)||""),m=ce.useMemo(()=>k.find(O=>O.id===S)||k[0]||null,[k,S]),C=ce.useMemo(()=>{if(!m)return 12;if(m.targetDate){const _=new Date,K=new Date(m.targetDate),X=(K.getFullYear()-_.getFullYear())*12+(K.getMonth()-_.getMonth());return Math.max(1,X)}const O=Math.max(0,m.targetAmount-(m.allocatedAmount||0)),o=Math.max(1,m.plannedMonthlyAmount||w||1e5);return Math.max(1,Math.ceil(O/o))},[m,w]),y=(m==null?void 0:m.plannedMonthlyAmount)||5e4,[N,E]=ce.useState(y),[D,R]=ce.useState(0),[A,T]=ce.useState(C),[L,V]=ce.useState(0);ce.useEffect(()=>{m&&(E(m.plannedMonthlyAmount||5e4),R(0),T(C),V(0))},[m==null?void 0:m.id,C]);const Z=()=>{m&&(E(m.plannedMonthlyAmount||5e4),R(0),T(C),V(0))},U=ce.useMemo(()=>{if(!m)return null;const O=Math.max(m.allocatedAmount,m.targetAmount-L),o=new Date;o.setMonth(o.getMonth()+A);const _=o.toISOString();return nt.calculateIndividualPlanWhatIf(m,O,N,D,_,w)},[m,L,N,D,A,w]),W=ce.useMemo(()=>{if(!U||!m)return[];const O=Math.max(m.allocatedAmount,m.targetAmount-L);return[25,50,75,100].map(o=>{const _=O*o/100,K=Math.max(0,_-m.allocatedAmount),X=Math.ceil(K/Math.max(1,U.totalSimulatedMonthlyRate)),te=new Date;return te.setMonth(te.getMonth()+X),{percentage:o,amount:_,targetDate:te.toISOString()}})},[U,m,L]);if(k.length===0)return r.jsxs("div",{className:"rounded-[28px] border border-dashed border-[#D1D1D6] p-8 text-center text-[#8E8E93] dark:border-[#3A3A3C] bg-white dark:bg-[#2C2C2E] space-y-3",children:[r.jsx(On,{className:"mx-auto h-10 w-10 text-[#8E8E93]"}),r.jsx("h3",{className:"font-bold text-base text-[#1C1C1E] dark:text-white",children:s==="ar"?"لا توجد خطط نشطة للمحاكاة":"No Active Plans to Simulate"}),r.jsx("p",{className:"text-xs text-[#8E8E93]",children:s==="ar"?"أنشئ خطة مالية أولاً لاختبار سيناريوهات تسريع إنجازها.":"Create a financial plan first to test acceleration scenarios."})]});const ue=[{label:"+50,000",delta:5e4},{label:"+100,000",delta:1e5},{label:"+250,000",delta:25e4},{label:s==="ar"?"الأساس / الخطة":"Reset / Plan Base",absolute:y,isReset:!0}],I=[{label:"+50,000",delta:5e4},{label:"+100,000",delta:1e5},{label:"+250,000",delta:25e4},{label:s==="ar"?"إعادة ضبط":"Reset to 0",absolute:0,isReset:!0}],ae=[{label:s==="ar"?"+1 شهر":"+1 Month",delta:1},{label:s==="ar"?"+3 أشهر":"+3 Months",delta:3},{label:s==="ar"?"+6 أشهر":"+6 Months",delta:6},{label:s==="ar"?"إعادة ضبط":"Reset Base",absolute:C,isReset:!0}],v=[{label:"+100,000",delta:1e5},{label:"+250,000",delta:25e4},{label:"+500,000",delta:5e5},...d>0?[{label:s==="ar"?"كامل الفائض":"All Cash",absolute:d}]:[],{label:s==="ar"?"إعادة ضبط":"Reset",absolute:0,isReset:!0}],J=new Date;J.setMonth(J.getMonth()+A);const Q=J.toLocaleDateString(s==="ar"?"ar-IQ":"en-US",{month:"short",year:"numeric"}),Y=(U==null?void 0:U.totalSimulatedMonthlyRate)||N,P=w-Y;return r.jsxs("div",{id:"what-if-planning-simulator",className:"space-y-4 animate-in fade-in duration-200",children:[r.jsxs("div",{className:"rounded-[28px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E] space-y-4",children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsxs("div",{children:[r.jsx("span",{className:"text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]",children:s==="ar"?"محاكي الخطط الفردي":"Individual Plan Simulator"}),r.jsxs("h3",{className:"font-bold text-base text-[#1C1C1E] dark:text-white flex items-center gap-1.5",children:[r.jsx(Xf,{className:"h-4 w-4 text-[#007AFF]"}),s==="ar"?"محاكاة تسريع الخطة (What-If)":"What-If Plan Acceleration"]})]}),r.jsx("button",{type:"button",onClick:Z,className:"text-xs font-semibold text-[#007AFF] hover:underline",children:s==="ar"?"إعادة ضبط":"Reset All"})]}),r.jsxs("div",{children:[r.jsx("label",{className:"block text-xs font-semibold text-[#8E8E93] mb-1.5",children:s==="ar"?"اختر الخطة المراد محاكاتها:":"Select Plan to Simulate:"}),r.jsx("select",{value:(m==null?void 0:m.id)||"",onChange:O=>j(O.target.value),className:"w-full rounded-xl border border-[#D1D1D6] bg-[#F2F2F7] px-3.5 py-2.5 text-sm font-bold text-[#1C1C1E] focus:border-[#007AFF] focus:outline-none dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white",children:k.map(O=>r.jsxs("option",{value:O.id,children:[O.name," — ",h(O.allocatedAmount)," / ",h(O.targetAmount)]},O.id))})]}),m&&r.jsxs("div",{className:"flex items-center justify-between rounded-2xl bg-[#F2F2F7] p-3 text-xs dark:bg-[#1C1C1E]",children:[r.jsxs("div",{children:[r.jsx("span",{className:"text-[#8E8E93] block text-[10px] uppercase font-bold",children:s==="ar"?"المتبقي لتحقيق الهدف":"Remaining Target"}),r.jsx("span",{className:"font-bold text-[#1C1C1E] dark:text-white text-sm",children:h(Math.max(0,m.targetAmount-m.allocatedAmount))})]}),r.jsxs("div",{className:"text-right",children:[r.jsx("span",{className:"text-[#8E8E93] block text-[10px] uppercase font-bold",children:s==="ar"?"الادخار المخطط الحالي":"Baseline Monthly Rate"}),r.jsxs("span",{className:"font-bold text-[#007AFF] text-sm",children:[h(m.plannedMonthlyAmount||0),"/mo"]})]})]})]}),r.jsxs("div",{className:"rounded-[28px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E] space-y-4",children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsx("h4",{className:"font-bold text-xs uppercase tracking-wider text-[#8E8E93]",children:s==="ar"?"مدخلات المحاكاة السريعة":"What-If Simulation Controls"}),r.jsx("span",{className:"text-[10px] font-semibold text-[#8E8E93]",children:s==="ar"?"تحكم فوري بدون سحب":"Tap & Stepper Precision"})]}),r.jsx(Tl,{id:"whatif-monthly-allocation",label:s==="ar"?"تعديل المخصص الشهري":"Monthly Allocation Adjustment",subLabel:s==="ar"?`المخصص الأساسي في الخطة: ${h(y)}/شهرياً`:`Baseline plan allocation: ${h(y)}/mo`,value:N,unit:s==="ar"?"د.ع/شهر":"IQD/mo",step:5e4,min:0,max:1e8,presets:ue,isCurrency:!0,onChange:E,accentColor:"blue"}),r.jsx(Tl,{id:"whatif-expense-adjustments",label:s==="ar"?"وفورات خفض المصاريف":"Expense Reduction Savings",subLabel:s==="ar"?"إعادة توجيه وفورات تقليص النفقات لتسريع الخطة":"Redirect discretionary spending savings into this plan",value:D,unit:s==="ar"?"د.ع/شهر":"IQD/mo",step:25e3,min:0,max:5e7,presets:I,isCurrency:!0,onChange:R,accentColor:"amber"}),r.jsx(Tl,{id:"whatif-target-timeline",label:s==="ar"?"الجدول الزمني للهدف (المدة)":"Target Timeline (Target Duration)",subLabel:s==="ar"?`الموعد المقابل للهدف: ${Q}`:`Corresponding target deadline: ${Q}`,value:A,unit:s==="ar"?"شهر":"Months",step:1,min:1,max:360,presets:ae,isCurrency:!1,onChange:T,accentColor:"purple"}),r.jsx(Tl,{id:"whatif-lump-sum",label:s==="ar"?"دفعة نقدية فورية من الفائض":"Lump-Sum Cash Injection",subLabel:s==="ar"?`الفائض النقدي المتاح غير المخصص: ${h(d)}`:`Available unallocated cash buffer: ${h(d)}`,value:L,unit:s==="ar"?"د.ع":"IQD",step:5e4,min:0,max:5e8,presets:v,isCurrency:!0,onChange:V,accentColor:"green"})]}),U&&r.jsxs("div",{className:"rounded-[28px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E] space-y-4",children:[r.jsxs("div",{className:"flex items-center justify-between pb-1 border-b border-[#F2F2F7] dark:border-[#38383A]",children:[r.jsx("span",{className:"text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]",children:s==="ar"?"نتائج المحاكاة والمقارنة الفورية":"Simulation Comparison Results"}),r.jsxs("span",{className:"flex items-center gap-1 text-[11px] font-bold text-[#007AFF]",children:[r.jsx(Bl,{className:"h-3.5 w-3.5"}),s==="ar"?"تحديث فوري 60fps":"Real-Time Sync"]})]}),r.jsxs("div",{className:"rounded-2xl border border-[#E5E5EA] bg-[#F9F9FB] p-4 dark:bg-[#1C1C1E] dark:border-[#3A3A3C] space-y-3",children:[r.jsx("div",{className:"flex items-center justify-between",children:r.jsxs("span",{className:"text-xs font-bold text-[#1C1C1E] dark:text-white flex items-center gap-1.5",children:[r.jsx(di,{className:"h-4 w-4 text-[#007AFF]"}),s==="ar"?"المقارنة: تاريخ الهدف vs. موعد الإنجاز المتوقع":"Target Date vs. Simulated Completion Date"]})}),r.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[r.jsxs("div",{className:"rounded-xl bg-white p-3 shadow-xs border border-[#E5E5EA] dark:bg-[#2C2C2E] dark:border-[#48484A]",children:[r.jsx("span",{className:"text-[10px] font-bold uppercase tracking-wider text-[#8E8E93] block",children:s==="ar"?"تاريخ الهدف المطلوب":"Target Deadline"}),r.jsx("p",{className:"mt-1 text-base font-black text-[#1C1C1E] dark:text-white",children:Q}),r.jsxs("p",{className:"mt-0.5 text-[11px] font-semibold text-[#8E8E93]",children:[A," ",s==="ar"?"شهر مدة مستهدفة":"months duration"]})]}),r.jsxs("div",{className:"rounded-xl bg-blue-50/80 p-3 shadow-xs border border-blue-200 dark:bg-blue-950/40 dark:border-blue-900/60",children:[r.jsx("span",{className:"text-[10px] font-bold uppercase tracking-wider text-[#007AFF] block",children:s==="ar"?"موعد الإنجاز بالمحاكاة":"Simulated Completion"}),r.jsx("p",{className:"mt-1 text-base font-black text-[#007AFF]",children:U.simulatedForecastDate?new Date(U.simulatedForecastDate).toLocaleDateString(s==="ar"?"ar-IQ":"en-US",{month:"short",year:"numeric"}):"—"}),r.jsx("p",{className:"mt-0.5 text-[11px] font-black text-[#1C1C1E] dark:text-white",children:U.simulatedMonths===1/0?s==="ar"?"غير محدد":"Indefinite":`${U.simulatedMonths} ${s==="ar"?"أشهر مطلوبة":"months required"}`})]})]}),r.jsxs("div",{className:"text-[11px] font-semibold text-[#3A3A3C] dark:text-[#E5E5EA] flex items-center justify-between pt-1",children:[r.jsx("span",{children:s==="ar"?"مقارنة الوتيرة بالموعد المستهدف:":"Pacing relative to target:"}),U.simulatedMonths<A?r.jsx("span",{className:"font-bold text-emerald-600 dark:text-emerald-400",children:s==="ar"?`إنجاز مبكر بـ ${A-U.simulatedMonths} أشهر!`:`Achieved ${A-U.simulatedMonths} months early!`}):U.simulatedMonths===A?r.jsx("span",{className:"font-bold text-[#007AFF]",children:s==="ar"?"مطابق لموعد الهدف تماماً":"Finishes exactly on target date"}):r.jsx("span",{className:"font-bold text-amber-600 dark:text-amber-400",children:s==="ar"?`يتطلب ${U.simulatedMonths-A} أشهر إضافية`:`Needs ${U.simulatedMonths-A} more months`})]})]}),r.jsxs("div",{className:`rounded-2xl border p-4 transition-all ${U.monthsGained>0?"border-emerald-200 bg-emerald-50/70 text-emerald-950 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-200":U.monthsDelayed>0?"border-amber-200 bg-amber-50/70 text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200":"border-blue-200 bg-blue-50/70 text-blue-950 dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-200"}`,children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsx("span",{className:"text-xs font-bold uppercase tracking-wider",children:s==="ar"?"فارق الأشهر (تسريع / تأخير)":"Months Gained / Delayed"}),U.monthsGained>0?r.jsxs("span",{className:"inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1 text-xs font-black text-white shadow-xs",children:[r.jsx(Ml,{className:"h-3.5 w-3.5 fill-current"}),s==="ar"?`تسريع ${U.monthsGained} أشهر`:`+${U.monthsGained} Months Gained`]}):U.monthsDelayed>0?r.jsxs("span",{className:"inline-flex items-center gap-1 rounded-full bg-amber-500 px-3 py-1 text-xs font-black text-white shadow-xs",children:[r.jsx(ui,{className:"h-3.5 w-3.5"}),s==="ar"?`تأخير ${U.monthsDelayed} أشهر`:`-${U.monthsDelayed} Months Delayed`]}):r.jsxs("span",{className:"inline-flex items-center gap-1 rounded-full bg-[#007AFF] px-3 py-1 text-xs font-black text-white shadow-xs",children:[r.jsx(Dl,{className:"h-3.5 w-3.5"}),s==="ar"?"وفق الخطة الأصلية":"On Schedule"]})]}),r.jsx("p",{className:"mt-2 text-xs leading-relaxed opacity-90 font-medium",children:U.monthsGained>0?s==="ar"?`بفضل هذه التعديلات، تنجز خطتك قبل موعدها الأصلي بـ ${U.monthsGained} أشهر (من ${U.originalMonths} شهر ➔ إلى ${U.simulatedMonths} شهر فقط).`:`By applying these adjustments, your plan completes ${U.monthsGained} months ahead of baseline (${U.originalMonths} mos ➔ ${U.simulatedMonths} mos).`:U.monthsDelayed>0?s==="ar"?`هذه الوتيرة تحتاج إلى ${U.monthsDelayed} أشهر إضافية مقارنة بالجدول الأصلي.`:`This pace extends your timeline by ${U.monthsDelayed} months compared to the baseline forecast.`:s==="ar"?"الوتيرة المحاكاة مطابقة للجدول الأساسي للخطة دون زيادة أو تأخير.":"Simulated parameters match your plan baseline duration without variance."})]}),r.jsxs("div",{className:"rounded-2xl border border-[#E5E5EA] bg-[#F9F9FB] p-4 dark:bg-[#1C1C1E] dark:border-[#3A3A3C] space-y-3",children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsxs("span",{className:"text-xs font-bold text-[#1C1C1E] dark:text-white flex items-center gap-1.5",children:[r.jsx(a0,{className:"h-4 w-4 text-[#007AFF]"}),s==="ar"?"التأثير على الطاقة المالية الشهرية":"Impact on Monthly Financial Capacity"]}),r.jsxs("span",{className:"text-xs font-black text-[#007AFF]",children:[h(Y),"/mo"]})]}),r.jsxs("div",{className:"grid grid-cols-2 gap-3 text-xs",children:[r.jsxs("div",{className:"rounded-xl bg-white p-3 shadow-xs border border-[#E5E5EA] dark:bg-[#2C2C2E] dark:border-[#48484A]",children:[r.jsx("span",{className:"text-[10px] font-bold uppercase tracking-wider text-[#8E8E93] block",children:s==="ar"?"صافي طاقتك الشهرية":"Monthly Cash Capacity"}),r.jsxs("p",{className:"mt-1 font-black text-sm text-[#1C1C1E] dark:text-white",children:[h(w),"/mo"]})]}),r.jsxs("div",{className:"rounded-xl bg-white p-3 shadow-xs border border-[#E5E5EA] dark:bg-[#2C2C2E] dark:border-[#48484A]",children:[r.jsx("span",{className:"text-[10px] font-bold uppercase tracking-wider text-[#8E8E93] block",children:s==="ar"?"هامش الفائض المتبقي":"Remaining Cash Buffer"}),r.jsxs("p",{className:`mt-1 font-black text-sm ${P>=0?"text-[#34C759]":"text-[#FF3B30]"}`,children:[P>=0?"+":"",h(P),"/mo"]})]})]}),r.jsxs("div",{className:`rounded-xl border p-3 flex items-start gap-2.5 text-xs ${U.feasibilityBadgeColor}`,children:[r.jsx(ix,{className:"h-4 w-4 shrink-0 mt-0.5"}),r.jsxs("div",{children:[r.jsx("div",{className:"font-bold",children:U.feasibilityTitle}),r.jsx("div",{className:"mt-0.5 opacity-90 leading-relaxed font-medium",children:U.feasibilityExplanation})]})]})]}),r.jsxs("div",{className:"space-y-2 pt-2 border-t border-[#F2F2F7] dark:border-[#38383A]",children:[r.jsx("span",{className:"text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]",children:s==="ar"?"المحطات المرحلية المتوقعة بالمحاكاة":"Projected Milestones Pacing"}),r.jsx("div",{className:"grid grid-cols-4 gap-1.5 text-center",children:W.map(O=>r.jsxs("div",{className:"rounded-xl bg-[#F2F2F7] p-2 dark:bg-[#1C1C1E]",children:[r.jsxs("span",{className:"text-[10px] font-bold text-[#007AFF]",children:[O.percentage,"%"]}),r.jsx("div",{className:"mt-1 font-extrabold text-[11px] text-[#1C1C1E] dark:text-white",children:new Date(O.targetDate).toLocaleDateString(s==="ar"?"ar-IQ":"en-US",{month:"short",year:"2-digit"})}),r.jsx("div",{className:"text-[9px] text-[#8E8E93] mt-0.5",children:h(O.amount)})]},O.percentage))})]}),r.jsxs("div",{className:"flex gap-2 pt-2",children:[g&&m&&r.jsxs("button",{type:"button",onClick:()=>g(m),className:"flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-[#007AFF] py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-[#0062CC] active:scale-98 transition-all",children:[r.jsx(hc,{className:"h-4 w-4"}),s==="ar"?"تخصيص رصيد للخطة الآن":"Allocate to Plan Now"]}),f&&m&&r.jsx("button",{type:"button",onClick:()=>f(m),className:"rounded-xl border border-[#E5E5EA] bg-white px-3 py-2.5 text-xs font-bold text-[#3A3A3C] hover:bg-[#F2F2F7] dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-[#E5E5EA] active:scale-98 transition-all",children:s==="ar"?"تفاصيل الخطة":"Plan Details"})]})]}),r.jsxs("div",{className:"rounded-2xl border border-[#E5E5EA] bg-white p-4 text-xs dark:border-[#3A3A3C] dark:bg-[#2C2C2E] flex items-center gap-3",children:[r.jsx("div",{className:"flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#007AFF] dark:bg-blue-950/40",children:r.jsx(Kf,{className:"h-4 w-4"})}),r.jsxs("div",{className:"text-[11px] text-[#8E8E93] leading-tight",children:[r.jsx("strong",{className:"font-semibold text-[#1C1C1E] dark:text-white block mb-0.5",children:s==="ar"?"محاكاة استكشافية آمنة":"Safe Non-Destructive Simulation"}),s==="ar"?"تعديل المعاملات هنا هو تجربة افتراضية لا تؤثر على أرصدتك أو حساباتك المحفوظة.":"Simulating scenarios here is strictly hypothetical and does not alter your saved balances or plan parameters."]})]})]})},b0=({plans:B,unallocatedBalance:b,monthlyCapacity:d,onOpenDetail:x,onOpenAllocate:w})=>{const{t:g,language:f,formatCurrency:c,isRTL:s}=yt(),[h,k]=ce.useState(!1),S=ce.useMemo(()=>B.filter(N=>!N.isCompleted),[B]),j={critical:{labelEn:"Critical",labelAr:"حرجة",dotColor:"bg-rose-500",solidProgress:"bg-rose-500",barTrack:"bg-rose-100 dark:bg-rose-950/40",textBadge:"text-rose-600 dark:text-rose-400"},high:{labelEn:"High",labelAr:"عالية",dotColor:"bg-amber-500",solidProgress:"bg-amber-500",barTrack:"bg-amber-100 dark:bg-amber-950/40",textBadge:"text-amber-600 dark:text-amber-400"},medium:{labelEn:"Medium",labelAr:"متوسطة",dotColor:"bg-[#007AFF]",solidProgress:"bg-[#007AFF]",barTrack:"bg-blue-100 dark:bg-blue-950/40",textBadge:"text-[#007AFF] dark:text-blue-400"},low:{labelEn:"Low",labelAr:"منخفضة",dotColor:"bg-emerald-500",solidProgress:"bg-emerald-500",barTrack:"bg-emerald-100 dark:bg-emerald-950/40",textBadge:"text-emerald-600 dark:text-emerald-400"}},m=N=>N.toLocaleDateString(f==="ar"?"ar-IQ":"en-US",{month:"short",year:"2-digit"}),C=ce.useMemo(()=>{const N=new Date;return S.map(E=>{const D=nt.analyzePlan(E,b,d);let R=E.startDate?new Date(E.startDate):new Date(E.createdAt||N);isNaN(R.getTime())&&(R=new Date(N));let A=null;if(E.targetDate&&(A=new Date(E.targetDate),isNaN(A.getTime())&&(A=null)),!A){const I=Math.max(0,E.targetAmount-(E.allocatedAmount||0)),ae=Math.max(1,E.plannedMonthlyAmount||d||1e5),v=Math.max(1,Math.ceil(I/ae));A=new Date(R),A.setMonth(A.getMonth()+v)}let T=null;D.projectedCompletionDate&&(T=new Date(D.projectedCompletionDate),isNaN(T.getTime())&&(T=null));const L=Math.min(100,Math.max(0,Math.round((E.allocatedAmount||0)/Math.max(1,E.targetAmount)*100))),V=!!(!E.isPaused&&T&&A&&T.getTime()>A.getTime()+360*60*60*1e3),Z=V&&T&&A?Math.max(1,(T.getFullYear()-A.getFullYear())*12+(T.getMonth()-A.getMonth())):0;let U="",W="ontrack";E.isPaused?(U=f==="ar"?"مؤقتة":"Paused",W="paused"):R.getTime()>N.getTime()+10080*60*1e3?(U=f==="ar"?"مجدولة":"Upcoming",W="upcoming"):V?(U=f==="ar"?`⚠ +${Z} شهر`:`⚠ +${Z} Mo`,W="delay"):D.status==="ahead"?(U=f==="ar"?"متقدم":"Ahead",W="ahead"):(U=f==="ar"?"في المسار":"On Track",W="ontrack");const ue=`${m(R)} – ${m(A)}`;return{plan:E,analysis:D,startDate:R,targetDate:A,progressPercent:L,isDelayed:V,delayMonths:Z,dateRangeStr:ue,statusFlag:U,statusType:W}})},[S,b,d,f]),y=h?C:C.slice(0,4);return S.length===0?null:r.jsxs("div",{id:"plans-timeline-mini-card",className:"w-full overflow-hidden rounded-[28px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E] space-y-3.5 transition-all",children:[r.jsxs("div",{className:"flex items-center justify-between pb-1 border-b border-[#F2F2F7] dark:border-[#38383A]",children:[r.jsxs("div",{className:"flex items-center gap-2",children:[r.jsx(di,{className:"h-4 w-4 text-[#007AFF]"}),r.jsx("h3",{className:"font-bold text-sm text-[#1C1C1E] dark:text-white",children:f==="ar"?"الجدول الزمني للخطط":"Timeline Overview"})]}),r.jsxs("span",{className:"rounded-full bg-[#F2F2F7] px-2.5 py-0.5 text-[11px] font-bold text-[#8E8E93] dark:bg-[#1C1C1E] dark:text-gray-300",children:[S.length," ",f==="ar"?"نشطة":"Active"]})]}),r.jsx("div",{className:"divide-y divide-[#F2F2F7] dark:divide-[#38383A]",children:y.map(N=>{const{plan:E,progressPercent:D,isDelayed:R,dateRangeStr:A,statusFlag:T,statusType:L}=N,V=j[E.priority]||j.medium;return r.jsxs("div",{onClick:()=>x&&x(E),className:"group py-3 first:pt-1 last:pb-1 cursor-pointer transition-all active:scale-[0.99]",title:f==="ar"?"انقر لعرض تفاصيل الخطة":"Tap to inspect plan details",children:[r.jsxs("div",{className:"flex items-center justify-between gap-2 text-xs",children:[r.jsxs("div",{className:"flex items-center gap-1.5 min-w-0",children:[r.jsx("span",{className:`h-2 w-2 rounded-full shrink-0 ${V.dotColor}`}),r.jsx("span",{className:"font-bold text-[#1C1C1E] dark:text-white truncate",children:E.name}),r.jsxs("span",{className:"text-[10px] font-semibold text-[#8E8E93] shrink-0",children:["(",f==="ar"?V.labelAr:V.labelEn,")"]})]}),r.jsx("span",{className:"text-[11px] font-semibold text-[#8E8E93] dark:text-gray-300 shrink-0 font-mono",children:A})]}),r.jsxs("div",{className:"mt-2 flex items-center gap-3",children:[r.jsxs("div",{className:`relative flex-1 h-3 rounded-full overflow-hidden ${V.barTrack} flex items-center`,children:[r.jsx("div",{className:`h-full rounded-full transition-all duration-300 ${V.solidProgress}`,style:{width:`${D}%`}}),R&&r.jsx("div",{className:"h-full bg-amber-400 dark:bg-amber-500 w-3 shrink-0 ml-auto rounded-r-full shadow-xs",title:T})]}),r.jsxs("div",{className:"flex items-center gap-1.5 text-[11px] shrink-0 font-bold whitespace-nowrap",children:[r.jsxs("span",{className:"text-[#1C1C1E] dark:text-white",children:[D,"%"]}),r.jsx("span",{className:"text-[#8E8E93]",children:"•"}),r.jsx("span",{className:`text-[10px] px-1.5 py-0.5 rounded-md font-extrabold ${L==="delay"?"bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300":L==="ahead"?"bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300":L==="paused"?"bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300":L==="upcoming"?"bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300":"bg-blue-50 text-[#007AFF] dark:bg-blue-950/50 dark:text-blue-400"}`,children:T})]})]})]},E.id)})}),C.length>4&&r.jsx("button",{type:"button",onClick:()=>k(!h),className:"w-full pt-1 text-center text-xs font-bold text-[#007AFF] flex items-center justify-center gap-1 hover:underline transition-all",children:h?r.jsxs(r.Fragment,{children:[r.jsx("span",{children:f==="ar"?"عرض أقل":"Show less"}),r.jsx(ax,{className:"h-3.5 w-3.5"})]}):r.jsxs(r.Fragment,{children:[r.jsx("span",{children:f==="ar"?`عرض جميع الخطط (${C.length})`:`View all schedules (${C.length})`}),r.jsx(ex,{className:"h-3.5 w-3.5"})]})})]})},v0=({goals:B,transactions:b,onOpenCreateGoal:d,onOpenAllocate:x,onOpenDetail:w,onDeletePlan:g,onDeletePlansBatch:f,initialSubTab:c="dashboard",onNavigateTab:s})=>{const{t:h,language:k,formatCurrency:S}=yt(),[j,m]=ce.useState(c),[C,y]=ce.useState(null),[N,E]=ce.useState(!1),[D,R]=ce.useState(new Set),[A,T]=ce.useState(!1);ce.useEffect(()=>{c&&m(c)},[c]);const L=ce.useMemo(()=>B.filter(P=>!P.isCompleted),[B]),V=ce.useMemo(()=>B.filter(P=>P.isCompleted),[B]),Z=ce.useMemo(()=>nt.unallocatedBalance(b,B),[b,B]),U=ce.useMemo(()=>nt.historicalMonthlyAverageSavings(b),[b]),W=ce.useMemo(()=>nt.analyzeFinancialCapacity(b,B),[b,B]),ue={critical:{labelEn:"Critical",labelAr:"حرجة",color:"text-rose-600 dark:text-rose-400",badge:"bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300"},high:{labelEn:"High",labelAr:"عالية",color:"text-amber-600 dark:text-amber-400",badge:"bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300"},medium:{labelEn:"Medium",labelAr:"متوسطة",color:"text-blue-600 dark:text-blue-400",badge:"bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-300"},low:{labelEn:"Low",labelAr:"منخفضة",color:"text-gray-600 dark:text-gray-400",badge:"bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-300"}},I=P=>{R(ne=>{const O=new Set(ne);return O.has(P)?O.delete(P):O.add(P),O})},ae=P=>{N?I(P):(E(!0),R(new Set([P])))},v=B.length>0&&B.every(P=>D.has(P.id)),J=()=>{R(v?new Set:new Set(B.map(P=>P.id)))},Q=()=>{E(!1),R(new Set)},Y=()=>{const P=Array.from(D);P.length!==0&&(f?f(P):g&&P.forEach(ne=>g(ne)),T(!1),Q())};return r.jsxs("div",{id:"plans-tab-view",className:"space-y-4 px-4 pt-2 pb-24 text-[#1C1C1E] dark:text-[#F2F2F7]",children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsxs("div",{children:[r.jsx("span",{className:"text-[#8E8E93] text-[10px] font-bold uppercase tracking-widest",children:j==="dashboard"?h.financialPositionTitle:j==="whatif"?h.whatIfTab:h.targetsHeading}),r.jsx("h2",{className:"text-xl font-bold tracking-tight text-[#1C1C1E] dark:text-white",children:j==="dashboard"?h.plansDashboardTab:j==="whatif"?h.whatIfTitle:h.plansTitle})]}),r.jsx("button",{onClick:d,className:"flex h-8.5 w-8.5 items-center justify-center rounded-xl bg-[#007AFF] text-white shadow-md shadow-blue-500/25 hover:bg-[#0062CC] transition-colors",title:h.createPlan,children:r.jsx(cn,{className:"h-4 w-4"})})]}),r.jsxs("div",{className:"flex rounded-2xl bg-[#E5E5EA] p-1 text-xs font-bold dark:bg-[#2C2C2E]",children:[r.jsxs("button",{onClick:()=>m("dashboard"),className:`flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2 transition-all ${j==="dashboard"?"bg-white text-[#007AFF] shadow-sm dark:bg-[#1C1C1E] dark:text-blue-400":"text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white"}`,children:[r.jsx(Yf,{className:"h-3.5 w-3.5"}),r.jsx("span",{children:h.plansDashboardTab})]}),r.jsxs("button",{onClick:()=>m("plans"),className:`flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2 transition-all ${j==="plans"?"bg-white text-[#007AFF] shadow-sm dark:bg-[#1C1C1E] dark:text-blue-400":"text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white"}`,children:[r.jsx(On,{className:"h-3.5 w-3.5"}),r.jsxs("span",{children:[h.allPlansTab," (",L.length,")"]})]}),r.jsxs("button",{onClick:()=>m("whatif"),className:`flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2 transition-all ${j==="whatif"?"bg-white text-[#007AFF] shadow-sm dark:bg-[#1C1C1E] dark:text-blue-400":"text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white"}`,children:[r.jsx(Xf,{className:"h-3.5 w-3.5"}),r.jsx("span",{children:h.whatIfTab})]})]}),j==="dashboard"&&r.jsxs("div",{className:"space-y-3.5 animate-in fade-in duration-200",children:[r.jsxs("div",{className:"rounded-[28px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E] space-y-4",children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsx("span",{className:"text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]",children:h.financialPositionTitle}),r.jsx("span",{className:`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase ${W.healthStatus==="healthy"?"bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300":W.healthStatus==="tight"?"bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300":"bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300"}`,children:W.healthStatus==="healthy"?h.healthHealthy:W.healthStatus==="tight"?h.healthTight:h.healthOvercommitted})]}),r.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[r.jsxs("div",{className:"rounded-2xl bg-[#F2F2F7] p-3 dark:bg-[#1C1C1E]",children:[r.jsx("span",{className:"text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]",children:h.monthlyCapacityLabel}),r.jsx("p",{className:"mt-1 font-black text-lg text-[#34C759]",children:S(W.monthlyCapacity)}),r.jsx("span",{className:"text-[10px] text-[#8E8E93]",children:k==="ar"?"صافي تدفق الشهر":"Net monthly cashflow"})]}),r.jsxs("div",{className:"rounded-2xl bg-[#F2F2F7] p-3 dark:bg-[#1C1C1E]",children:[r.jsx("span",{className:"text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]",children:h.totalPlannedMonthlyLabel}),r.jsx("p",{className:"mt-1 font-black text-lg text-[#007AFF]",children:S(W.totalPlannedMonthlyCommitment)}),r.jsxs("span",{className:"text-[10px] text-[#8E8E93]",children:[L.length," ",k==="ar"?"خطط نشطة":"active plans"]})]})]}),r.jsxs("div",{className:"flex items-center justify-between rounded-xl bg-[#F2F2F7] px-3.5 py-2.5 dark:bg-[#1C1C1E]",children:[r.jsx("span",{className:"text-xs font-semibold text-[#8E8E93]",children:W.capacityVariance>=0?h.capacitySurplus:h.capacityDeficit}),r.jsxs("span",{className:`text-sm font-black ${W.capacityVariance>=0?"text-[#34C759]":"text-[#FF3B30]"}`,children:[W.capacityVariance>=0?"+":"",S(W.capacityVariance)]})]})]}),r.jsxs("div",{className:"rounded-[28px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E] space-y-3",children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsx("span",{className:"text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]",children:k==="ar"?"إجمالي التقدم في جميع الخطط":"Total Portfolio Progress"}),r.jsxs("span",{className:"text-sm font-black text-[#007AFF]",children:[W.overallProgressPercent,"%"]})]}),r.jsx("div",{className:"h-2.5 w-full overflow-hidden rounded-full bg-[#E5E5EA] dark:bg-[#38383A]",children:r.jsx("div",{className:"h-full rounded-full bg-[#007AFF] transition-all duration-500",style:{width:`${W.overallProgressPercent}%`}})}),r.jsxs("div",{className:"flex justify-between text-xs font-semibold text-[#8E8E93]",children:[r.jsxs("span",{children:[h.allocatedProgress,": ",r.jsx("strong",{className:"text-[#1C1C1E] dark:text-white",children:S(W.totalAllocatedAmount)})]}),r.jsxs("span",{children:[h.targetAmount,": ",r.jsx("strong",{className:"text-[#1C1C1E] dark:text-white",children:S(W.totalTargetAmount)})]})]})]}),r.jsx(b0,{plans:B,unallocatedBalance:Z,monthlyCapacity:W.monthlyCapacity,onOpenDetail:w,onOpenAllocate:x}),r.jsxs("div",{className:"rounded-[28px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E] space-y-3",children:[r.jsx("span",{className:"text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]",children:k==="ar"?"توزيع الخطط حسب الأولوية":"Plans Priority Distribution"}),r.jsx("div",{className:"grid grid-cols-2 gap-2.5",children:["critical","high","medium","low"].map(P=>{const ne=W.priorityDistribution[P],O=ue[P];return r.jsxs("div",{className:"rounded-2xl border border-[#E5E5EA] bg-[#F2F2F7] p-3 dark:border-[#3A3A3C] dark:bg-[#1C1C1E]",children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsx("span",{className:`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${O.badge}`,children:k==="ar"?O.labelAr:O.labelEn}),r.jsx("span",{className:"text-xs font-black text-[#1C1C1E] dark:text-white",children:ne.count})]}),r.jsxs("div",{className:"mt-2 text-xs font-bold text-[#1C1C1E] dark:text-white",children:[S(ne.allocated)," / ",S(ne.target)]}),r.jsxs("div",{className:"text-[10px] text-[#8E8E93]",children:[h.plannedMonthlyRate,": ",S(ne.plannedMonthly),"/mo"]})]},P)})})]}),r.jsxs("div",{className:"rounded-[28px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E] space-y-3",children:[r.jsxs("div",{className:"flex items-center gap-2",children:[r.jsx(Bl,{className:"h-4 w-4 text-[#007AFF]"}),r.jsx("h3",{className:"text-xs font-bold uppercase tracking-wider text-[#1C1C1E] dark:text-white",children:h.actionCenterTitle})]}),W.actionItems.length===0?r.jsx("p",{className:"text-xs text-[#8E8E93]",children:k==="ar"?"كل الخطط المالية تسير على ما يرام وبانتظام ممتاز.":"All financial plans are progressing smoothly."}):r.jsx("div",{className:"space-y-2.5",children:W.actionItems.map(P=>r.jsxs("div",{className:`rounded-2xl p-3 border text-xs ${P.type==="critical"?"bg-rose-50 border-rose-200 text-rose-900 dark:bg-rose-950/40 dark:border-rose-900/50 dark:text-rose-200":P.type==="warning"?"bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/40 dark:border-amber-900/50 dark:text-amber-200":"bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-900/50 dark:text-emerald-200"}`,children:[r.jsxs("div",{className:"font-bold mb-1 flex items-center gap-1.5",children:[P.type==="critical"&&r.jsx(dc,{className:"h-4 w-4 text-rose-600 shrink-0"}),P.type==="warning"&&r.jsx(ui,{className:"h-4 w-4 text-amber-600 shrink-0"}),P.type==="success"&&r.jsx(sc,{className:"h-4 w-4 text-emerald-600 shrink-0"}),r.jsx("span",{children:P.title})]}),r.jsx("p",{className:"leading-relaxed opacity-90",children:P.message})]},P.id))})]})]}),j==="plans"&&r.jsxs("div",{className:"space-y-4 animate-in fade-in duration-200",children:[r.jsxs("div",{className:"flex items-center justify-between rounded-[24px] bg-white p-4 border border-[#E5E5EA] shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]",children:[r.jsxs("div",{children:[r.jsx("div",{className:"text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]",children:h.availableToAllocate}),r.jsx("div",{className:"mt-0.5 font-black text-xl text-[#34C759]",children:S(Z)})]}),r.jsx("div",{className:"rounded-xl bg-green-50 p-2.5 text-[#34C759] dark:bg-green-950/40",children:r.jsx(l0,{className:"h-5 w-5"})})]}),r.jsxs("div",{className:"space-y-3",children:[r.jsxs("div",{className:"flex items-center justify-between px-1",children:[r.jsxs("h3",{className:"text-xs font-bold uppercase tracking-wider text-[#8E8E93]",children:[h.activePlansSection," (",L.length,")"]}),B.length>0&&r.jsxs("button",{type:"button",onClick:()=>{N?Q():E(!0)},className:`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-sm transition-all ${N?"bg-[#007AFF] text-white hover:bg-[#0062CC]":"border border-[#E5E5EA] bg-white text-[#3A3A3C] hover:bg-[#F2F2F7] dark:border-[#3A3A3C] dark:bg-[#2C2C2E] dark:text-white"}`,children:[r.jsx(jl,{className:"h-3.5 w-3.5"}),r.jsx("span",{children:N?k==="ar"?"إلغاء":"Done":k==="ar"?"تحديد":"Select"})]})]}),N&&r.jsxs("div",{className:"flex items-center justify-between rounded-2xl border border-blue-200 bg-blue-50/80 px-3.5 py-2.5 dark:border-blue-900/60 dark:bg-blue-950/40 shadow-sm animate-in fade-in duration-150",children:[r.jsxs("div",{className:"flex items-center gap-2.5",children:[r.jsx("button",{type:"button",onClick:J,className:"flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-[#007AFF] shadow-sm hover:bg-blue-50 dark:bg-[#1C1C1E] dark:text-blue-300",children:v?r.jsxs(r.Fragment,{children:[r.jsx(jl,{className:"h-3.5 w-3.5"}),k==="ar"?"إلغاء تحديد الكل":"Deselect All"]}):r.jsxs(r.Fragment,{children:[r.jsx(Jf,{className:"h-3.5 w-3.5"}),k==="ar"?"تحديد الكل":"Select All"]})}),r.jsxs("span",{className:"text-xs font-bold text-[#1C1C1E] dark:text-white",children:[D.size," ",k==="ar"?"محدد":"selected"]})]}),r.jsxs("div",{className:"flex items-center gap-2",children:[r.jsxs("button",{type:"button",disabled:D.size===0,onClick:()=>T(!0),className:"flex items-center gap-1.5 rounded-xl bg-[#FF3B30] px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors",children:[r.jsx(nn,{className:"h-3.5 w-3.5"}),r.jsxs("span",{children:[k==="ar"?"حذف المحدد":"Delete Selected",D.size>0&&` (${D.size})`]})]}),r.jsx("button",{type:"button",onClick:Q,className:"rounded-full p-1 text-[#8E8E93] hover:bg-white/50 dark:hover:bg-[#1C1C1E] transition-colors",title:h.cancel,children:r.jsx(gn,{className:"h-4 w-4"})})]})]}),L.length===0?r.jsxs("div",{className:"rounded-[24px] border border-dashed border-[#D1D1D6] p-8 text-center text-xs text-[#8E8E93] dark:border-[#3A3A3C] bg-white dark:bg-[#2C2C2E]",children:[r.jsx(On,{className:"mx-auto mb-2 h-8 w-8 text-[#8E8E93]"}),r.jsx("p",{className:"font-bold text-sm text-[#1C1C1E] dark:text-white",children:h.noActivePlans}),r.jsx("p",{className:"mt-1 text-[#8E8E93]",children:h.noActivePlansDesc}),r.jsxs("button",{onClick:d,className:"mt-3 inline-flex items-center gap-1.5 rounded-xl bg-[#007AFF] px-4 py-2 font-semibold text-xs text-white shadow-md shadow-blue-500/25 hover:bg-[#0062CC]",children:[r.jsx(cn,{className:"h-3.5 w-3.5"})," ",h.createPlan]})]}):L.map(P=>r.jsx(x0,{plan:P,unallocatedBalance:Z,avgSavings:U,monthlyCapacity:W.monthlyCapacity,priorityBadges:ue,onOpenDetail:w,onOpenAllocate:x,onRequestDelete:ne=>y(ne),isSelectMode:N,isSelected:D.has(P.id),onToggleSelect:()=>I(P.id),onLongPressSelect:()=>ae(P.id)},P.id))]}),V.length>0&&r.jsxs("div",{className:"space-y-3 pt-2",children:[r.jsx("div",{className:"flex items-center justify-between px-1",children:r.jsxs("h3",{className:"text-xs font-bold uppercase tracking-wider text-[#8E8E93]",children:[h.completedPlansSection," (",V.length,")"]})}),r.jsx("div",{className:"space-y-2",children:V.map(P=>{const ne=D.has(P.id);return r.jsxs("div",{onClick:()=>{N?I(P.id):w(P)},className:`flex cursor-pointer items-center justify-between rounded-2xl border p-3.5 transition-all ${ne?"border-[#007AFF] bg-blue-50/60 dark:bg-blue-950/30":"border-[#E5E5EA] bg-white opacity-80 hover:opacity-100 dark:border-[#3A3A3C] dark:bg-[#2C2C2E]"}`,children:[r.jsxs("div",{className:"flex items-center gap-3",children:[N?r.jsx("div",{onClick:O=>{O.stopPropagation(),I(P.id)},className:"p-0.5",children:ne?r.jsx("div",{className:"flex h-5 w-5 items-center justify-center rounded-full bg-[#007AFF] text-white shadow-sm",children:r.jsx(sn,{className:"h-3.5 w-3.5 stroke-[3]"})}):r.jsx("div",{className:"h-5 w-5 rounded-full border-2 border-[#C7C7CC] dark:border-[#545458]"})}):r.jsx("div",{className:"flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60",children:r.jsx(sc,{className:"h-4 w-4"})}),r.jsxs("div",{children:[r.jsx("h4",{className:"font-bold text-xs text-[#1C1C1E] dark:text-white line-through",children:P.name}),r.jsxs("span",{className:"text-[10px] text-[#8E8E93]",children:[S(P.targetAmount)," • ",k==="ar"?"مكتمل":"Completed"]})]})]}),!N&&r.jsxs("div",{className:"flex items-center gap-2",children:[r.jsx("button",{type:"button",onClick:O=>{O.stopPropagation(),y(P)},className:"rounded-lg p-1.5 text-[#C7C7CC] hover:text-[#FF3B30] transition-colors",title:h.delete,children:r.jsx(nn,{className:"h-3.5 w-3.5"})}),r.jsx(oc,{className:"h-4 w-4 text-[#8E8E93]"})]})]},P.id)})})]})]}),j==="whatif"&&r.jsx(y0,{plans:B,transactions:b,unallocatedBalance:Z,avgSavings:U,monthlyCapacity:W.monthlyCapacity,onOpenAllocate:x,onOpenDetail:w}),C&&r.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200",children:r.jsxs("div",{className:"w-full max-w-xs rounded-[28px] bg-white p-6 text-center shadow-2xl dark:bg-[#2C2C2E] border border-[#E5E5EA] dark:border-[#3A3A3C] space-y-3",children:[r.jsx("div",{className:"mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-[#FF3B30] dark:bg-rose-950/40",children:r.jsx(nn,{className:"h-6 w-6"})}),r.jsx("h3",{className:"font-bold text-base text-[#1C1C1E] dark:text-white",children:k==="ar"?"حذف الخطة المالية؟":"Delete Financial Plan?"}),r.jsx("p",{className:"text-xs text-[#8E8E93] leading-relaxed",children:k==="ar"?r.jsxs(r.Fragment,{children:["هل أنت متأكد من حذف الخطة ",r.jsxs("strong",{className:"text-[#1C1C1E] dark:text-white",children:['"',C.name,'"']}),"؟",C.allocatedAmount>0&&r.jsxs("span",{className:"block mt-1 text-[#34C759] font-bold",children:["سيتم إعادة المبلغ المخصص (",S(C.allocatedAmount),") إلى رصيدك المتاح."]})]}):r.jsxs(r.Fragment,{children:["Are you sure you want to delete ",r.jsxs("strong",{className:"text-[#1C1C1E] dark:text-white",children:['"',C.name,'"']}),"?",C.allocatedAmount>0&&r.jsxs("span",{className:"block mt-1 text-[#34C759] font-bold",children:["The allocated amount (",S(C.allocatedAmount),") will be returned to your unallocated pool."]})]})}),r.jsxs("div",{className:"mt-4 flex gap-2 pt-2",children:[r.jsx("button",{type:"button",onClick:()=>y(null),className:"flex-1 rounded-xl bg-[#F2F2F7] py-2.5 text-xs font-semibold text-[#8E8E93] transition-colors hover:bg-[#E5E5EA] dark:bg-[#38383A] dark:text-[#D1D1D6]",children:h.cancel}),r.jsx("button",{type:"button",onClick:()=>{g&&C&&g(C.id),y(null)},className:"flex-1 rounded-xl bg-[#FF3B30] py-2.5 text-xs font-semibold text-white shadow-md shadow-red-500/25 transition-colors hover:bg-red-600",children:h.delete})]})]})}),A&&r.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200",children:r.jsxs("div",{className:"w-full max-w-xs rounded-[28px] bg-white p-6 text-center shadow-2xl dark:bg-[#2C2C2E] border border-[#E5E5EA] dark:border-[#3A3A3C] space-y-3",children:[r.jsx("div",{className:"mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-[#FF3B30] dark:bg-rose-950/40",children:r.jsx(nn,{className:"h-6 w-6"})}),r.jsx("h3",{className:"font-bold text-base text-[#1C1C1E] dark:text-white",children:k==="ar"?"حذف الخطط المحددة؟":"Delete Selected Plans?"}),r.jsx("p",{className:"text-xs text-[#8E8E93] leading-relaxed",children:k==="ar"?r.jsxs(r.Fragment,{children:["هل أنت متأكد من رغبتك في حذف ",r.jsx("strong",{className:"text-[#1C1C1E] dark:text-white",children:D.size})," خطط مالية؟",r.jsx("span",{className:"block mt-1 text-[#34C759] font-bold",children:"سيتم إعادة أي مبالغ مخصصة تلقائياً إلى رصيدك المتاح، وتحديث خططك والتحليلات فوراً."})]}):r.jsxs(r.Fragment,{children:["Are you sure you want to delete ",r.jsx("strong",{className:"text-[#1C1C1E] dark:text-white",children:D.size})," plans?",r.jsx("span",{className:"block mt-1 text-[#34C759] font-bold",children:"Any allocated amounts will be safely restored to your available funds immediately."})]})}),r.jsxs("div",{className:"mt-4 flex gap-2 pt-2",children:[r.jsx("button",{type:"button",onClick:()=>T(!1),className:"flex-1 rounded-xl bg-[#F2F2F7] py-2.5 text-xs font-semibold text-[#8E8E93] transition-colors hover:bg-[#E5E5EA] dark:bg-[#38383A] dark:text-[#D1D1D6]",children:h.cancel}),r.jsx("button",{type:"button",onClick:Y,className:"flex-1 rounded-xl bg-[#FF3B30] py-2.5 text-xs font-semibold text-white shadow-md shadow-red-500/25 transition-colors hover:bg-red-600",children:k==="ar"?`حذف (${D.size})`:`Delete (${D.size})`})]})]})})]})},C0=({transactions:B,goals:b,budgets:d,categories:x,biometricsEnabled:w,onToggleBiometrics:g,onOpenBudgets:f,onAddCategory:c,onDeleteCategory:s,theme:h,onChangeTheme:k,onTriggerFaceID:S,onOpenWidgetsHub:j})=>{const{t:m,language:C,setLanguage:y,isRTL:N,translateCat:E}=yt(),[D,R]=ce.useState(!1),[A,T]=ce.useState(""),[L,V]=ce.useState("expense_category"),[Z,U]=ce.useState(null),W=()=>{let v=`ID,Type,Amount,Currency,Date,Category,Source,Description,Notes
`;B.forEach(P=>{const ne=[P.id,P.type,P.amount,P.currency,P.date,`"${(P.category||"").replace(/"/g,'""')}"`,`"${(P.source||"").replace(/"/g,'""')}"`,`"${(P.itemDescription||"").replace(/"/g,'""')}"`,`"${(P.notes||"").replace(/"/g,'""')}"`].join(",");v+=ne+`
`});const J=new Blob([v],{type:"text/csv;charset=utf-8;"}),Q=URL.createObjectURL(J),Y=document.createElement("a");Y.href=Q,Y.download="FinanceApp_Transactions.csv",Y.click(),URL.revokeObjectURL(Q),I(C==="ar"?"تم تنزيل ملف CSV":"CSV Downloaded")},ue=()=>{const v={exportDate:new Date().toISOString(),currency:"IQD",language:C,transactions:B,goals:b,budgets:d},J=JSON.stringify(v,null,2),Q=new Blob([J],{type:"application/json"}),Y=URL.createObjectURL(Q),P=document.createElement("a");P.href=Y,P.download="FinanceApp_Backup.json",P.click(),URL.revokeObjectURL(Y),I(C==="ar"?"تم تنزيل ملف النسخ الاحتياطي JSON":"JSON Downloaded")},I=v=>{U(v),setTimeout(()=>U(null),2500)},ae=x.filter(v=>v.type==="expense_category");return x.filter(v=>v.type==="income_source"),r.jsxs("div",{id:"settings-tab-view",className:"space-y-4 px-4 pt-2 pb-24 text-[#1C1C1E] dark:text-[#F2F2F7]",children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsxs("div",{children:[r.jsx("span",{className:"text-[#8E8E93] text-[10px] font-bold uppercase tracking-widest",children:m.preferencesHeading}),r.jsx("h2",{className:"text-xl font-bold tracking-tight text-[#1C1C1E] dark:text-white",children:m.settingsTitle})]}),Z&&r.jsxs("span",{className:"flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-950 dark:text-green-300",children:[r.jsx(sn,{className:"h-3 w-3"})," ",Z]})]}),r.jsxs("div",{id:"language-setting-card",className:"rounded-[24px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]",children:[r.jsx("div",{className:"flex items-center justify-between",children:r.jsxs("div",{className:"flex items-center gap-3",children:[r.jsx("div",{className:"flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#007AFF] dark:bg-blue-950/40",children:r.jsx(kx,{className:"h-5 w-5"})}),r.jsxs("div",{children:[r.jsx("div",{className:"font-bold text-xs text-[#1C1C1E] dark:text-white flex items-center gap-2",children:r.jsx("span",{children:m.languageHeading})}),r.jsx("div",{className:"text-[11px] text-[#8E8E93]",children:m.languageSubtitle})]})]})}),r.jsxs("div",{className:"mt-3.5 flex rounded-xl bg-[#E5E5EA] p-1 text-xs font-semibold dark:bg-[#1C1C1E]",children:[r.jsxs("button",{type:"button",onClick:()=>y("en"),className:`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 transition-all ${C==="en"?"bg-white text-[#007AFF] font-bold shadow-sm dark:bg-[#2C2C2E] dark:text-white":"text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white"}`,children:[r.jsx("span",{children:"🇺🇸"}),r.jsx("span",{children:"English"})]}),r.jsxs("button",{type:"button",onClick:()=>y("ar"),className:`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 transition-all ${C==="ar"?"bg-white text-[#007AFF] font-bold shadow-sm dark:bg-[#2C2C2E] dark:text-white":"text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white"}`,children:[r.jsx("span",{children:"🇮🇶"}),r.jsx("span",{children:"العربية"})]})]}),r.jsxs("div",{className:"mt-3 flex items-center justify-between rounded-xl bg-[#F2F2F7] px-3.5 py-2.5 dark:bg-[#38383A]",children:[r.jsx("div",{className:"text-[11px] text-[#8E8E93]",children:C==="ar"?"التطبيق معرّب بالكامل مع دعم اتجاه اليمين لليسار (RTL).":"App fully localized in Arabic with native RTL layout."}),r.jsx("button",{type:"button",onClick:()=>y(C==="ar"?"en":"ar"),className:"shrink-0 rounded-lg bg-[#007AFF] px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-[#0062CC] active:scale-95",children:C==="ar"?"English":"العربية"})]})]}),r.jsxs("div",{className:"rounded-[24px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]",children:[r.jsx("h3",{className:"text-xs font-bold uppercase tracking-wider text-[#8E8E93]",children:m.securityHeading}),r.jsxs("div",{className:"mt-3.5 flex items-center justify-between",children:[r.jsxs("div",{className:"flex items-center gap-3",children:[r.jsx("div",{className:"flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#007AFF] dark:bg-blue-950/40",children:r.jsx(Kf,{className:"h-5 w-5"})}),r.jsxs("div",{children:[r.jsx("div",{className:"font-bold text-xs text-[#1C1C1E] dark:text-white",children:m.faceIdLabel}),r.jsx("div",{className:"text-[11px] text-[#8E8E93]",children:m.faceIdDesc})]})]}),r.jsxs("label",{className:"relative inline-flex cursor-pointer items-center",children:[r.jsx("input",{type:"checkbox",checked:w,onChange:v=>{g(v.target.checked),v.target.checked&&S()},className:"peer sr-only"}),r.jsx("div",{className:"peer h-6 w-11 rounded-full bg-[#E5E5EA] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-all after:content-[''] peer-checked:bg-[#34C759] peer-checked:after:translate-x-full peer-focus:outline-none dark:bg-[#38383A]"})]})]}),w&&r.jsx("button",{onClick:S,className:"mt-3.5 w-full rounded-xl bg-[#F2F2F7] py-2.5 text-center text-xs font-semibold text-[#007AFF] hover:bg-[#E5E5EA] dark:bg-[#38383A] dark:text-[#007AFF]",children:m.testFaceIdBtn})]}),r.jsx("div",{className:"rounded-[24px] border border-blue-200/80 bg-gradient-to-br from-white to-blue-50/40 p-5 shadow-sm dark:border-blue-900/40 dark:from-[#2C2C2E] dark:to-blue-950/20",children:r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsxs("div",{className:"flex items-center gap-2.5",children:[r.jsx("div",{className:"flex h-8 w-8 items-center justify-center rounded-xl bg-[#007AFF] text-white shadow-xs",children:r.jsx(Wf,{className:"h-4 w-4"})}),r.jsxs("div",{children:[r.jsx("h3",{className:"text-xs font-bold uppercase tracking-wider text-[#1C1C1E] dark:text-white",children:C==="ar"?"الويدجت واختصارات الشاشة الرئيسية":"iOS Widgets & 3D Touch"}),r.jsx("p",{className:"text-[11px] text-[#8E8E93]",children:C==="ar"?"أدوات WidgetKit 2x2 و 2x4 وروابط App Groups":"WidgetKit Small 2x2, Medium 2x4 & URL Schemes"})]})]}),j&&r.jsx("button",{onClick:j,className:"inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-[#007AFF] px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-[#0062CC] transition-all",children:r.jsx("span",{children:C==="ar"?"معاينة واختبار":"Preview & Test"})})]})}),r.jsxs("div",{className:"rounded-[24px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]",children:[r.jsx("h3",{className:"text-xs font-bold uppercase tracking-wider text-[#8E8E93]",children:m.budgetsHeading}),r.jsxs("div",{className:"mt-3 flex items-center justify-between gap-3",children:[r.jsx("div",{className:"text-xs text-[#8E8E93]",children:m.budgetsDesc}),r.jsxs("button",{onClick:f,className:"inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-[#007AFF] px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-blue-500/25 hover:bg-[#0062CC]",children:[r.jsx(Zp,{className:"h-3.5 w-3.5"})," ",m.manageBudgetsBtn]})]})]}),r.jsxs("div",{className:"rounded-[24px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]",children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsxs("div",{children:[r.jsx("h3",{className:"text-xs font-bold uppercase tracking-wider text-[#8E8E93]",children:m.categoriesHeading}),r.jsx("p",{className:"text-xs text-[#8E8E93]",children:m.categoriesDesc})]}),r.jsx("button",{onClick:()=>R(!D),className:"text-xs font-semibold text-[#007AFF]",children:D?m.hideBtn:m.configureBtn})]}),D&&r.jsxs("div",{className:"mt-4 space-y-4 border-t border-[#F2F2F7] pt-3.5 dark:border-[#38383A]",children:[r.jsxs("div",{className:"space-y-2.5",children:[r.jsxs("div",{className:"flex gap-2 text-xs",children:[r.jsx("button",{type:"button",onClick:()=>V("expense_category"),className:`flex-1 rounded-xl py-1.5 font-semibold transition-colors ${L==="expense_category"?"bg-[#007AFF] text-white shadow-sm":"bg-[#E5E5EA] text-[#3A3A3C] dark:bg-[#38383A] dark:text-[#8E8E93]"}`,children:m.expenseCategoryType}),r.jsx("button",{type:"button",onClick:()=>V("income_source"),className:`flex-1 rounded-xl py-1.5 font-semibold transition-colors ${L==="income_source"?"bg-[#007AFF] text-white shadow-sm":"bg-[#E5E5EA] text-[#3A3A3C] dark:bg-[#38383A] dark:text-[#8E8E93]"}`,children:m.incomeSourceType})]}),r.jsxs("div",{className:"flex gap-2",children:[r.jsx("input",{type:"text",placeholder:m.newCategoryPlaceholder,value:A,onChange:v=>T(v.target.value),className:"flex-1 rounded-xl border border-[#E5E5EA] bg-white px-3.5 py-2 text-xs focus:border-[#007AFF] focus:outline-none dark:border-[#3A3A3C] dark:bg-[#1C1C1E]"}),r.jsx("button",{onClick:()=>{A.trim()&&(c(A.trim(),L),T(""))},className:"rounded-xl bg-[#007AFF] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0062CC]",children:m.addCategoryBtn})]})]}),r.jsxs("div",{className:"space-y-2",children:[r.jsxs("div",{className:"font-semibold text-xs text-[#8E8E93]",children:[m.currentExpenseCats," (",ae.length,"):"]}),r.jsx("div",{className:"flex flex-wrap gap-1.5",children:ae.map(v=>r.jsxs("span",{className:"inline-flex items-center gap-1.5 rounded-full bg-[#F2F2F7] px-3 py-1 text-xs font-semibold text-[#1C1C1E] dark:bg-[#38383A] dark:text-white",children:[E(v.name),!v.isDefault&&r.jsx("button",{onClick:()=>s(v.name,"expense_category"),className:"text-[#8E8E93] hover:text-[#FF3B30]",children:"×"})]},v.id||v.name))})]})]})]}),r.jsxs("div",{className:"rounded-[24px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]",children:[r.jsx("h3",{className:"text-xs font-bold uppercase tracking-wider text-[#8E8E93]",children:m.dataHeading}),r.jsx("p",{className:"mt-1 text-xs text-[#8E8E93]",children:m.dataDesc}),r.jsxs("div",{className:"mt-3.5 grid grid-cols-2 gap-2.5",children:[r.jsxs("button",{onClick:W,className:"flex items-center justify-center gap-2 rounded-xl border border-[#E5E5EA] bg-white p-3 text-xs font-semibold text-[#1C1C1E] hover:bg-[#F2F2F7] dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white",children:[r.jsx(bx,{className:"h-4 w-4 text-[#34C759]"})," ",m.exportCsvBtn]}),r.jsxs("button",{onClick:ue,className:"flex items-center justify-center gap-2 rounded-xl border border-[#E5E5EA] bg-white p-3 text-xs font-semibold text-[#1C1C1E] hover:bg-[#F2F2F7] dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white",children:[r.jsx(gc,{className:"h-4 w-4 text-[#007AFF]"})," ",m.exportJsonBtn]})]})]}),r.jsxs("div",{className:"rounded-[24px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]",children:[r.jsx("h3",{className:"text-xs font-bold uppercase tracking-wider text-[#8E8E93]",children:m.appearanceHeading}),r.jsxs("div",{className:"mt-3 flex rounded-xl bg-[#E5E5EA] p-1 text-xs font-semibold dark:bg-[#1C1C1E]",children:[r.jsx("button",{onClick:()=>k("system"),className:`flex-1 rounded-lg py-1.5 transition-all ${h==="system"?"bg-white text-[#1C1C1E] shadow-sm dark:bg-[#2C2C2E] dark:text-white":"text-[#8E8E93]"}`,children:m.themeSystem}),r.jsx("button",{onClick:()=>k("light"),className:`flex-1 rounded-lg py-1.5 transition-all ${h==="light"?"bg-white text-[#1C1C1E] shadow-sm dark:bg-[#2C2C2E] dark:text-white":"text-[#8E8E93]"}`,children:m.themeLight}),r.jsx("button",{onClick:()=>k("dark"),className:`flex-1 rounded-lg py-1.5 transition-all ${h==="dark"?"bg-white text-[#1C1C1E] shadow-sm dark:bg-[#2C2C2E] dark:text-white":"text-[#8E8E93]"}`,children:m.themeDark})]})]}),r.jsxs("div",{id:"developer-app-info-card",className:"rounded-[24px] border border-[#E5E5EA] bg-white p-5 text-xs shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E] space-y-2.5",children:[r.jsx("h3",{className:"font-bold uppercase tracking-wider text-[#8E8E93]",children:C==="ar"?"معلومات التطبيق والمطور":"App & Developer Info"}),r.jsxs("div",{className:"flex justify-between py-1 border-b border-[#F2F2F7] dark:border-[#38383A]",children:[r.jsx("span",{className:"text-[#8E8E93]",children:C==="ar"?"المطور":"Developer"}),r.jsx("span",{className:"font-bold text-[#1C1C1E] dark:text-white",children:"Ahmed AL KUBAISI"})]}),r.jsxs("div",{className:"flex justify-between py-1 border-b border-[#F2F2F7] dark:border-[#38383A]",children:[r.jsx("span",{className:"text-[#8E8E93]",children:C==="ar"?"البريد الإلكتروني":"Email"}),r.jsx("a",{href:"mailto:ahmed.mjabbar95@gmail.com",className:"font-medium text-[#007AFF] hover:underline",children:"ahmed.mjabbar95@gmail.com"})]}),r.jsxs("div",{className:"flex justify-between py-1 border-b border-[#F2F2F7] dark:border-[#38383A]",children:[r.jsx("span",{className:"text-[#8E8E93]",children:C==="ar"?"الإصدار":"Version"}),r.jsx("span",{className:"rounded-md bg-blue-50 px-2 py-0.5 font-bold text-[#007AFF] dark:bg-blue-950/40",children:"2.1.0"})]}),r.jsxs("div",{className:"flex justify-between py-1",children:[r.jsx("span",{className:"text-[#8E8E93]",children:C==="ar"?"بيئة التطبيق":"Architecture"}),r.jsx("span",{className:"font-semibold text-[#1C1C1E] dark:text-white",children:"Swift 5.9 / SwiftData / SwiftUI"})]})]}),r.jsxs("div",{className:"rounded-[24px] border border-[#E5E5EA] bg-white p-5 text-xs shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E] space-y-2.5",children:[r.jsx("h3",{className:"font-bold uppercase tracking-wider text-[#8E8E93]",children:m.environmentHeading}),r.jsxs("div",{className:"flex justify-between py-1 border-b border-[#F2F2F7] dark:border-[#38383A]",children:[r.jsx("span",{className:"text-[#8E8E93]",children:m.primaryCurrency}),r.jsx("span",{className:"font-semibold text-[#1C1C1E] dark:text-white",children:C==="ar"?"دينار عراقي (IQD / د.ع)":"IQD (Iraqi Dinar)"})]}),r.jsxs("div",{className:"flex justify-between py-1 border-b border-[#F2F2F7] dark:border-[#38383A]",children:[r.jsx("span",{className:"text-[#8E8E93]",children:m.targetDevice}),r.jsx("span",{className:"font-semibold text-[#1C1C1E] dark:text-white",children:"iPhone 13 Pro Max (iOS 17+)"})]}),r.jsxs("div",{className:"flex justify-between py-1 border-b border-[#F2F2F7] dark:border-[#38383A]",children:[r.jsx("span",{className:"text-[#8E8E93]",children:m.packageFormat}),r.jsx("span",{className:"font-semibold text-[#1C1C1E] dark:text-white",children:"Swift Playgrounds 4 (.swiftpm)"})]}),r.jsxs("div",{className:"flex justify-between py-1",children:[r.jsx("span",{className:"text-[#8E8E93]",children:m.localPersistence}),r.jsx("span",{className:"font-semibold text-[#007AFF]",children:"SwiftData (Offline SQLite)"})]})]})]})},Ea=ce.forwardRef(({value:B,onChangeValue:b,onChange:d,currencySymbol:x,className:w="",placeholder:g,disabled:f,required:c,id:s,...h},k)=>{const S=ce.useRef(null);ce.useImperativeHandle(k,()=>S.current);const j=m=>{const C=m.target,y=C.value,N=C.selectionStart??y.length,E=y.slice(0,N).replace(/,/g,"").length,D=zn(y),R=Rn(D);let A=D.length;if(D==="")A=0;else{let T=0;for(let L=0;L<D.length;L++)if(D[L]!==","&&T++,T===E){A=L+1;break}}b&&b(D,R),d&&(C.value=D,d(m)),requestAnimationFrame(()=>{if(S.current&&document.activeElement===S.current)try{S.current.setSelectionRange(A,A)}catch{}})};return r.jsx("input",{ref:S,id:s,type:"text",inputMode:"decimal",autoComplete:"off",autoCorrect:"off",spellCheck:"false",value:B,onChange:j,placeholder:g,disabled:f,required:c,className:w,...h})});Ea.displayName="AmountInput";const S0=({categories:B,onClose:b,onSave:d,onAddCategory:x,initialType:w="expense"})=>{const{t:g,language:f,translateCat:c}=yt(),[s,h]=ce.useState(w),[k,S]=ce.useState(""),[j]=ce.useState(f==="ar"?"د.ع":"IQD"),[m,C]=ce.useState(new Date().toISOString().split("T")[0]),[y,N]=ce.useState("Food"),[E,D]=ce.useState("Salary"),[R,A]=ce.useState(""),[T,L]=ce.useState(""),[V,Z]=ce.useState(""),[U,W]=ce.useState(!1),ue=B.filter(J=>J.type==="expense_category"),I=B.filter(J=>J.type==="income_source"),ae=J=>{J.preventDefault();const Q=Rn(k);if(isNaN(Q)||Q<=0){alert(f==="ar"?"يرجى إدخال مبلغ صحيح.":"Please enter a valid amount.");return}d({type:s,amount:Q,currency:"IQD",date:new Date(m).toISOString(),category:s==="expense"?y:"Income",source:s==="income"?E:"",itemDescription:R.trim()||(s==="income"?E:y),notes:T.trim()}),b()},v=()=>{if(V.trim()){const J=s==="expense"?"expense_category":"income_source";x(V.trim(),J),s==="expense"?N(V.trim()):D(V.trim()),Z(""),W(!1)}};return r.jsx("div",{className:"fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4 backdrop-blur-sm animate-in fade-in duration-200",children:r.jsxs("div",{className:"w-full max-w-md rounded-t-[32px] sm:rounded-[32px] bg-white p-6 shadow-2xl dark:bg-[#2C2C2E] border border-[#E5E5EA] dark:border-[#3A3A3C] max-h-[90vh] overflow-y-auto",children:[r.jsxs("div",{className:"flex items-center justify-between pb-3.5 border-b border-[#F2F2F7] dark:border-[#38383A]",children:[r.jsxs("div",{children:[r.jsx("span",{className:"text-[#8E8E93] text-[10px] font-bold uppercase tracking-widest",children:f==="ar"?"إدخال المعاملة":"Entry"}),r.jsx("h3",{className:"font-bold text-base text-[#1C1C1E] dark:text-white",children:f==="ar"?"إضافة معاملة جديدة":"Add Transaction"})]}),r.jsx("button",{onClick:b,className:"rounded-full p-1.5 text-[#8E8E93] hover:bg-[#F2F2F7] dark:hover:bg-[#38383A] transition-colors",children:r.jsx(gn,{className:"h-5 w-5"})})]}),r.jsxs("form",{onSubmit:ae,className:"mt-4 space-y-4",children:[r.jsxs("div",{className:"flex rounded-xl bg-[#E5E5EA] p-1 text-xs font-semibold dark:bg-[#1C1C1E]",children:[r.jsxs("button",{type:"button",onClick:()=>h("expense"),className:`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 transition-all ${s==="expense"?"bg-[#FF3B30] text-white shadow-sm":"text-[#8E8E93]"}`,children:[r.jsx(ci,{className:"h-4 w-4"})," ",g.expenses]}),r.jsxs("button",{type:"button",onClick:()=>h("income"),className:`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 transition-all ${s==="income"?"bg-[#34C759] text-white shadow-sm":"text-[#8E8E93]"}`,children:[r.jsx(si,{className:"h-4 w-4"})," ",g.income]})]}),r.jsxs("div",{children:[r.jsxs("label",{className:"block text-xs font-bold text-[#8E8E93] uppercase tracking-wider",children:[f==="ar"?"المبلغ":"Amount"," (",j,")"]}),r.jsxs("div",{className:"relative mt-1",children:[r.jsx(Ea,{id:"add-transaction-amount-input",required:!0,placeholder:f==="ar"?"مثال: 250,000":"e.g. 250,000",value:k,onChangeValue:J=>S(J),className:"w-full rounded-2xl border border-[#E5E5EA] bg-[#F2F2F7] py-3 pr-16 pl-4 text-2xl font-black text-[#1C1C1E] focus:border-[#007AFF] focus:bg-white focus:outline-none dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white dark:focus:bg-[#1C1C1E]"}),r.jsx("span",{className:"absolute top-4 right-4 font-bold text-xs text-[#8E8E93] pointer-events-none",children:j})]})]}),r.jsxs("div",{children:[r.jsxs("div",{className:"flex items-center justify-between text-xs font-bold text-[#8E8E93] uppercase tracking-wider",children:[r.jsx("span",{children:s==="expense"?f==="ar"?"الفئة":"Category":f==="ar"?"مصدر الدخل":"Income Source"}),r.jsx("button",{type:"button",onClick:()=>W(!U),className:"text-[#007AFF] hover:underline font-semibold",children:f==="ar"?"+ جديد":"+ new"})]}),U?r.jsxs("div",{className:"mt-1.5 flex gap-2",children:[r.jsx("input",{type:"text",placeholder:f==="ar"?`اسم ${s==="expense"?"الفئة":"المصدر"} الجديد...`:`New ${s==="expense"?"category":"source"} name...`,value:V,onChange:J=>Z(J.target.value),className:"flex-1 rounded-xl border border-[#E5E5EA] bg-white px-3 py-2 text-xs focus:border-[#007AFF] focus:outline-none dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white"}),r.jsx("button",{type:"button",onClick:v,className:"rounded-xl bg-[#007AFF] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0062CC]",children:g.save})]}):r.jsx("div",{className:"mt-2 flex flex-wrap gap-1.5 max-h-28 overflow-y-auto",children:(s==="expense"?ue:I).map(J=>{const Q=(s==="expense"?y:E)===J.name;return r.jsx("button",{type:"button",onClick:()=>{s==="expense"?N(J.name):D(J.name)},className:`rounded-full px-3.5 py-1 text-xs font-semibold transition-all ${Q?"bg-[#007AFF] text-white shadow-sm":"bg-[#E5E5EA] text-[#3A3A3C] hover:bg-[#D1D1D6] dark:bg-[#38383A] dark:text-[#8E8E93]"}`,children:c(J.name)},J.name)})})]}),r.jsxs("div",{children:[r.jsx("label",{className:"block text-xs font-bold text-[#8E8E93] uppercase tracking-wider",children:f==="ar"?"الوصف / الجهة":"Description / Merchant"}),r.jsx("input",{type:"text",placeholder:f==="ar"?"مثال: أسواق المواد الغذائية، وقود، الراتب الشهري...":"e.g. Grocery store, Fuel, Monthly Salary...",value:R,onChange:J=>A(J.target.value),className:"mt-1 w-full rounded-xl border border-[#E5E5EA] bg-white px-3.5 py-2 text-xs focus:border-[#007AFF] focus:outline-none dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white"})]}),r.jsxs("div",{children:[r.jsx("label",{className:"block text-xs font-bold text-[#8E8E93] uppercase tracking-wider",children:f==="ar"?"تاريخ المعاملة":"Transaction Date"}),r.jsx("input",{type:"date",value:m,onChange:J=>C(J.target.value),className:"mt-1 w-full rounded-xl border border-[#E5E5EA] bg-white px-3.5 py-2 text-xs focus:border-[#007AFF] focus:outline-none dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white"})]}),r.jsxs("div",{children:[r.jsx("label",{className:"block text-xs font-bold text-[#8E8E93] uppercase tracking-wider",children:f==="ar"?"ملاحظات إضافية":"Optional Notes"}),r.jsx("textarea",{rows:2,placeholder:f==="ar"?"تفاصيل إضافية أو مذكرات...":"Additional details, receipts or memos...",value:T,onChange:J=>L(J.target.value),className:"mt-1 w-full rounded-xl border border-[#E5E5EA] bg-white px-3.5 py-2 text-xs focus:border-[#007AFF] focus:outline-none dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white"})]}),r.jsx("button",{type:"submit",className:"w-full rounded-xl bg-[#007AFF] py-3 text-center text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:bg-[#0062CC] active:scale-[0.98] transition-all",children:f==="ar"?"حفظ المعاملة":"Save Transaction"})]})]})})},w0=({transaction:B,categories:b,onClose:d,onSave:x,onDelete:w})=>{const{t:g,language:f,translateCat:c}=yt(),[s,h]=ce.useState(B.type),[k,S]=ce.useState(m0(B.amount)),[j,m]=ce.useState(new Date(B.date).toISOString().split("T")[0]),[C,y]=ce.useState(B.category||"Food"),[N,E]=ce.useState(B.source||"Salary"),[D,R]=ce.useState(B.itemDescription||""),[A,T]=ce.useState(B.notes||""),[L,V]=ce.useState(!1),Z=b.filter(ue=>ue.type==="expense_category"),U=b.filter(ue=>ue.type==="income_source"),W=ue=>{ue.preventDefault();const I=Rn(k);if(isNaN(I)||I<=0){alert(f==="ar"?"يرجى إدخال مبلغ صحيح.":"Please enter a valid amount.");return}x({...B,type:s,amount:I,date:new Date(j).toISOString(),category:s==="expense"?C:"Income",source:s==="income"?N:"",itemDescription:D.trim()||(s==="income"?N:C),notes:A.trim(),updatedAt:new Date().toISOString()}),d()};return r.jsx("div",{className:"fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4 backdrop-blur-sm animate-in fade-in duration-200",children:r.jsxs("div",{className:"w-full max-w-md rounded-t-[32px] sm:rounded-[32px] bg-white p-6 shadow-2xl dark:bg-[#2C2C2E] border border-[#E5E5EA] dark:border-[#3A3A3C] max-h-[90vh] overflow-y-auto",children:[r.jsxs("div",{className:"flex items-center justify-between pb-3.5 border-b border-[#F2F2F7] dark:border-[#38383A]",children:[r.jsxs("div",{children:[r.jsx("span",{className:"text-[#8E8E93] text-[10px] font-bold uppercase tracking-widest",children:f==="ar"?"تعديل":"Update"}),r.jsx("h3",{className:"font-bold text-base text-[#1C1C1E] dark:text-white",children:f==="ar"?"تعديل المعاملة":"Edit Transaction"})]}),r.jsx("button",{onClick:d,className:"rounded-full p-1.5 text-[#8E8E93] hover:bg-[#F2F2F7] dark:hover:bg-[#38383A] transition-colors",children:r.jsx(gn,{className:"h-5 w-5"})})]}),r.jsxs("form",{onSubmit:W,className:"mt-4 space-y-4",children:[r.jsxs("div",{className:"flex rounded-xl bg-[#E5E5EA] p-1 text-xs font-semibold dark:bg-[#1C1C1E]",children:[r.jsxs("button",{type:"button",onClick:()=>h("expense"),className:`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 transition-all ${s==="expense"?"bg-[#FF3B30] text-white shadow-sm":"text-[#8E8E93]"}`,children:[r.jsx(ci,{className:"h-4 w-4"})," ",g.expenses]}),r.jsxs("button",{type:"button",onClick:()=>h("income"),className:`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 transition-all ${s==="income"?"bg-[#34C759] text-white shadow-sm":"text-[#8E8E93]"}`,children:[r.jsx(si,{className:"h-4 w-4"})," ",g.income]})]}),r.jsxs("div",{children:[r.jsxs("label",{className:"block text-xs font-bold text-[#8E8E93] uppercase tracking-wider",children:[f==="ar"?"المبلغ":"Amount"," (",f==="ar"?"د.ع":B.currency,")"]}),r.jsx(Ea,{id:"edit-transaction-amount-input",required:!0,value:k,onChangeValue:ue=>S(ue),className:"mt-1 w-full rounded-2xl border border-[#E5E5EA] bg-[#F2F2F7] py-2.5 px-4 text-xl font-black text-[#1C1C1E] focus:border-[#007AFF] focus:bg-white focus:outline-none dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white dark:focus:bg-[#1C1C1E]"})]}),r.jsxs("div",{children:[r.jsx("label",{className:"block text-xs font-bold text-[#8E8E93] uppercase tracking-wider",children:s==="expense"?f==="ar"?"الفئة":"Category":f==="ar"?"مصدر الدخل":"Income Source"}),r.jsx("div",{className:"mt-2 flex flex-wrap gap-1.5 max-h-28 overflow-y-auto",children:(s==="expense"?Z:U).map(ue=>{const I=(s==="expense"?C:N)===ue.name;return r.jsx("button",{type:"button",onClick:()=>{s==="expense"?y(ue.name):E(ue.name)},className:`rounded-full px-3.5 py-1 text-xs font-semibold transition-all ${I?"bg-[#007AFF] text-white shadow-sm":"bg-[#E5E5EA] text-[#3A3A3C] hover:bg-[#D1D1D6] dark:bg-[#38383A] dark:text-[#8E8E93]"}`,children:c(ue.name)},ue.name)})})]}),r.jsxs("div",{children:[r.jsx("label",{className:"block text-xs font-bold text-[#8E8E93] uppercase tracking-wider",children:f==="ar"?"الوصف":"Description"}),r.jsx("input",{type:"text",value:D,onChange:ue=>R(ue.target.value),className:"mt-1 w-full rounded-xl border border-[#E5E5EA] bg-white px-3.5 py-2 text-xs focus:border-[#007AFF] focus:outline-none dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white"})]}),r.jsxs("div",{children:[r.jsx("label",{className:"block text-xs font-bold text-[#8E8E93] uppercase tracking-wider",children:f==="ar"?"تاريخ المعاملة":"Transaction Date"}),r.jsx("input",{type:"date",value:j,onChange:ue=>m(ue.target.value),className:"mt-1 w-full rounded-xl border border-[#E5E5EA] bg-white px-3.5 py-2 text-xs focus:border-[#007AFF] focus:outline-none dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white"})]}),r.jsxs("div",{children:[r.jsx("label",{className:"block text-xs font-bold text-[#8E8E93] uppercase tracking-wider",children:f==="ar"?"الملاحظات":"Notes"}),r.jsx("textarea",{rows:2,value:A,onChange:ue=>T(ue.target.value),className:"mt-1 w-full rounded-xl border border-[#E5E5EA] bg-white px-3.5 py-2 text-xs focus:border-[#007AFF] focus:outline-none dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white"})]}),L?r.jsxs("div",{className:"flex items-center gap-2 rounded-xl bg-red-50 p-2.5 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50",children:[r.jsx("span",{className:"text-xs font-bold text-[#FF3B30] flex-1",children:f==="ar"?"تأكيد حذف المعاملة؟":"Confirm deletion?"}),r.jsx("button",{type:"button",onClick:()=>{w(B.id),d()},className:"rounded-lg bg-[#FF3B30] px-3 py-1.5 text-xs font-bold text-white hover:bg-red-700",children:g.delete}),r.jsx("button",{type:"button",onClick:()=>V(!1),className:"rounded-lg bg-gray-200 dark:bg-gray-700 px-2.5 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200",children:g.cancel})]}):r.jsxs("div",{className:"flex gap-2.5 pt-2",children:[r.jsxs("button",{type:"button",onClick:()=>V(!0),className:"flex items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-bold text-[#FF3B30] hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400 transition-colors",children:[r.jsx(nn,{className:"h-4 w-4"})," ",g.delete]}),r.jsx("button",{type:"submit",className:"flex-1 rounded-xl bg-[#007AFF] py-3 text-center text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:bg-[#0062CC] transition-colors",children:f==="ar"?"حفظ التعديلات":"Save Changes"})]})]})]})})};var yc={};(function B(b,d,x,w){var g=!!(b.Worker&&b.Blob&&b.Promise&&b.OffscreenCanvas&&b.OffscreenCanvasRenderingContext2D&&b.HTMLCanvasElement&&b.HTMLCanvasElement.prototype.transferControlToOffscreen&&b.URL&&b.URL.createObjectURL),f=typeof Path2D=="function"&&typeof DOMMatrix=="function",c=(function(){if(!b.OffscreenCanvas)return!1;try{var O=new OffscreenCanvas(1,1),o=O.getContext("2d");o.fillRect(0,0,1,1);var _=O.transferToImageBitmap();o.createPattern(_,"no-repeat")}catch{return!1}return!0})();function s(){}function h(O){var o=d.exports.Promise,_=o!==void 0?o:b.Promise;return typeof _=="function"?new _(O):(O(s,s),null)}var k=(function(O,o){return{transform:function(_){if(O)return _;if(o.has(_))return o.get(_);var K=new OffscreenCanvas(_.width,_.height),X=K.getContext("2d");return X.drawImage(_,0,0),o.set(_,K),K},clear:function(){o.clear()}}})(c,new Map),S=(function(){var O=Math.floor(16.666666666666668),o,_,K={},X=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(o=function(te){var ye=Math.random();return K[ye]=requestAnimationFrame(function xe(be){X===be||X+O-1<be?(X=be,delete K[ye],te()):K[ye]=requestAnimationFrame(xe)}),ye},_=function(te){K[te]&&cancelAnimationFrame(K[te])}):(o=function(te){return setTimeout(te,O)},_=function(te){return clearTimeout(te)}),{frame:o,cancel:_}})(),j=(function(){var O,o,_={};function K(X){function te(ye,xe){X.postMessage({options:ye||{},callback:xe})}X.init=function(xe){var be=xe.transferControlToOffscreen();X.postMessage({canvas:be},[be])},X.fire=function(xe,be,Se){if(o)return te(xe,null),o;var je=Math.random().toString(36).slice(2);return o=h(function(Ne){function Fe(Le){Le.data.callback===je&&(delete _[je],X.removeEventListener("message",Fe),o=null,k.clear(),Se(),Ne())}X.addEventListener("message",Fe),te(xe,je),_[je]=Fe.bind(null,{data:{callback:je}})}),o},X.reset=function(){X.postMessage({reset:!0});for(var xe in _)_[xe](),delete _[xe]}}return function(){if(O)return O;if(!x&&g){var X=["var CONFETTI, SIZE = {}, module = {};","("+B.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{O=new Worker(URL.createObjectURL(new Blob([X])))}catch(te){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",te),null}K(O)}return O}})(),m={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function C(O,o){return o?o(O):O}function y(O){return O!=null}function N(O,o,_){return C(O&&y(O[o])?O[o]:m[o],_)}function E(O){return O<0?0:Math.floor(O)}function D(O,o){return Math.floor(Math.random()*(o-O))+O}function R(O){return parseInt(O,16)}function A(O){return O.map(T)}function T(O){var o=String(O).replace(/[^0-9a-f]/gi,"");return o.length<6&&(o=o[0]+o[0]+o[1]+o[1]+o[2]+o[2]),{r:R(o.substring(0,2)),g:R(o.substring(2,4)),b:R(o.substring(4,6))}}function L(O){var o=N(O,"origin",Object);return o.x=N(o,"x",Number),o.y=N(o,"y",Number),o}function V(O){O.width=document.documentElement.clientWidth,O.height=document.documentElement.clientHeight}function Z(O){var o=O.getBoundingClientRect();O.width=o.width,O.height=o.height}function U(O){var o=document.createElement("canvas");return o.style.position="fixed",o.style.top="0px",o.style.left="0px",o.style.pointerEvents="none",o.style.zIndex=O,o}function W(O,o,_,K,X,te,ye,xe,be){O.save(),O.translate(o,_),O.rotate(te),O.scale(K,X),O.arc(0,0,1,ye,xe,be),O.restore()}function ue(O){var o=O.angle*(Math.PI/180),_=O.spread*(Math.PI/180);return{x:O.x,y:O.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:O.startVelocity*.5+Math.random()*O.startVelocity,angle2D:-o+(.5*_-Math.random()*_),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:O.color,shape:O.shape,tick:0,totalTicks:O.ticks,decay:O.decay,drift:O.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:O.gravity*3,ovalScalar:.6,scalar:O.scalar,flat:O.flat}}function I(O,o){o.x+=Math.cos(o.angle2D)*o.velocity+o.drift,o.y+=Math.sin(o.angle2D)*o.velocity+o.gravity,o.velocity*=o.decay,o.flat?(o.wobble=0,o.wobbleX=o.x+10*o.scalar,o.wobbleY=o.y+10*o.scalar,o.tiltSin=0,o.tiltCos=0,o.random=1):(o.wobble+=o.wobbleSpeed,o.wobbleX=o.x+10*o.scalar*Math.cos(o.wobble),o.wobbleY=o.y+10*o.scalar*Math.sin(o.wobble),o.tiltAngle+=.1,o.tiltSin=Math.sin(o.tiltAngle),o.tiltCos=Math.cos(o.tiltAngle),o.random=Math.random()+2);var _=o.tick++/o.totalTicks,K=o.x+o.random*o.tiltCos,X=o.y+o.random*o.tiltSin,te=o.wobbleX+o.random*o.tiltCos,ye=o.wobbleY+o.random*o.tiltSin;if(O.fillStyle="rgba("+o.color.r+", "+o.color.g+", "+o.color.b+", "+(1-_)+")",O.beginPath(),f&&o.shape.type==="path"&&typeof o.shape.path=="string"&&Array.isArray(o.shape.matrix))O.fill(Y(o.shape.path,o.shape.matrix,o.x,o.y,Math.abs(te-K)*.1,Math.abs(ye-X)*.1,Math.PI/10*o.wobble));else if(o.shape.type==="bitmap"){var xe=Math.PI/10*o.wobble,be=Math.abs(te-K)*.1,Se=Math.abs(ye-X)*.1,je=o.shape.bitmap.width*o.scalar,Ne=o.shape.bitmap.height*o.scalar,Fe=new DOMMatrix([Math.cos(xe)*be,Math.sin(xe)*be,-Math.sin(xe)*Se,Math.cos(xe)*Se,o.x,o.y]);Fe.multiplySelf(new DOMMatrix(o.shape.matrix));var Le=O.createPattern(k.transform(o.shape.bitmap),"no-repeat");Le.setTransform(Fe),O.globalAlpha=1-_,O.fillStyle=Le,O.fillRect(o.x-je/2,o.y-Ne/2,je,Ne),O.globalAlpha=1}else if(o.shape==="circle")O.ellipse?O.ellipse(o.x,o.y,Math.abs(te-K)*o.ovalScalar,Math.abs(ye-X)*o.ovalScalar,Math.PI/10*o.wobble,0,2*Math.PI):W(O,o.x,o.y,Math.abs(te-K)*o.ovalScalar,Math.abs(ye-X)*o.ovalScalar,Math.PI/10*o.wobble,0,2*Math.PI);else if(o.shape==="star")for(var p=Math.PI/2*3,ie=4*o.scalar,H=8*o.scalar,z=o.x,F=o.y,q=5,me=Math.PI/q;q--;)z=o.x+Math.cos(p)*H,F=o.y+Math.sin(p)*H,O.lineTo(z,F),p+=me,z=o.x+Math.cos(p)*ie,F=o.y+Math.sin(p)*ie,O.lineTo(z,F),p+=me;else O.moveTo(Math.floor(o.x),Math.floor(o.y)),O.lineTo(Math.floor(o.wobbleX),Math.floor(X)),O.lineTo(Math.floor(te),Math.floor(ye)),O.lineTo(Math.floor(K),Math.floor(o.wobbleY));return O.closePath(),O.fill(),o.tick<o.totalTicks}function ae(O,o,_,K,X){var te=o.slice(),ye=O.getContext("2d"),xe,be,Se=h(function(je){function Ne(){xe=be=null,ye.clearRect(0,0,K.width,K.height),k.clear(),X(),je()}function Fe(){x&&!(K.width===w.width&&K.height===w.height)&&(K.width=O.width=w.width,K.height=O.height=w.height),!K.width&&!K.height&&(_(O),K.width=O.width,K.height=O.height),ye.clearRect(0,0,K.width,K.height),te=te.filter(function(Le){return I(ye,Le)}),te.length?xe=S.frame(Fe):Ne()}xe=S.frame(Fe),be=Ne});return{addFettis:function(je){return te=te.concat(je),Se},canvas:O,promise:Se,reset:function(){xe&&S.cancel(xe),be&&be()}}}function v(O,o){var _=!O,K=!!N(o||{},"resize"),X=!1,te=N(o,"disableForReducedMotion",Boolean),ye=g&&!!N(o||{},"useWorker"),xe=ye?j():null,be=_?V:Z,Se=O&&xe?!!O.__confetti_initialized:!1,je=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,Ne;function Fe(p,ie,H){for(var z=N(p,"particleCount",E),F=N(p,"angle",Number),q=N(p,"spread",Number),me=N(p,"startVelocity",Number),pe=N(p,"decay",Number),oe=N(p,"gravity",Number),ve=N(p,"drift",Number),we=N(p,"colors",A),Ce=N(p,"ticks",Number),Ee=N(p,"shapes"),$e=N(p,"scalar"),ze=!!N(p,"flat"),bt=L(p),an=z,kt=[],pn=O.width*bt.x,Qe=O.height*bt.y;an--;)kt.push(ue({x:pn,y:Qe,angle:F,spread:q,startVelocity:me,color:we[an%we.length],shape:Ee[D(0,Ee.length)],ticks:Ce,decay:pe,gravity:oe,drift:ve,scalar:$e,flat:ze}));return Ne?Ne.addFettis(kt):(Ne=ae(O,kt,be,ie,H),Ne.promise)}function Le(p){var ie=te||N(p,"disableForReducedMotion",Boolean),H=N(p,"zIndex",Number);if(ie&&je)return h(function(me){me()});_&&Ne?O=Ne.canvas:_&&!O&&(O=U(H),document.body.appendChild(O)),K&&!Se&&be(O);var z={width:O.width,height:O.height};xe&&!Se&&xe.init(O),Se=!0,xe&&(O.__confetti_initialized=!0);function F(){if(xe){var me={getBoundingClientRect:function(){if(!_)return O.getBoundingClientRect()}};be(me),xe.postMessage({resize:{width:me.width,height:me.height}});return}z.width=z.height=null}function q(){Ne=null,K&&(X=!1,b.removeEventListener("resize",F)),_&&O&&(document.body.contains(O)&&document.body.removeChild(O),O=null,Se=!1)}return K&&!X&&(X=!0,b.addEventListener("resize",F,!1)),xe?xe.fire(p,z,q):Fe(p,z,q)}return Le.reset=function(){xe&&xe.reset(),Ne&&Ne.reset()},Le}var J;function Q(){return J||(J=v(null,{useWorker:!0,resize:!0})),J}function Y(O,o,_,K,X,te,ye){var xe=new Path2D(O),be=new Path2D;be.addPath(xe,new DOMMatrix(o));var Se=new Path2D;return Se.addPath(be,new DOMMatrix([Math.cos(ye)*X,Math.sin(ye)*X,-Math.sin(ye)*te,Math.cos(ye)*te,_,K])),Se}function P(O){if(!f)throw new Error("path confetti are not supported in this browser");var o,_;typeof O=="string"?o=O:(o=O.path,_=O.matrix);var K=new Path2D(o),X=document.createElement("canvas"),te=X.getContext("2d");if(!_){for(var ye=1e3,xe=ye,be=ye,Se=0,je=0,Ne,Fe,Le=0;Le<ye;Le+=2)for(var p=0;p<ye;p+=2)te.isPointInPath(K,Le,p,"nonzero")&&(xe=Math.min(xe,Le),be=Math.min(be,p),Se=Math.max(Se,Le),je=Math.max(je,p));Ne=Se-xe,Fe=je-be;var ie=10,H=Math.min(ie/Ne,ie/Fe);_=[H,0,0,H,-Math.round(Ne/2+xe)*H,-Math.round(Fe/2+be)*H]}return{type:"path",path:o,matrix:_}}function ne(O){var o,_=1,K="#000000",X='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof O=="string"?o=O:(o=O.text,_="scalar"in O?O.scalar:_,X="fontFamily"in O?O.fontFamily:X,K="color"in O?O.color:K);var te=10*_,ye=""+te+"px "+X,xe=new OffscreenCanvas(te,te),be=xe.getContext("2d");be.font=ye;var Se=be.measureText(o),je=Math.ceil(Se.actualBoundingBoxRight+Se.actualBoundingBoxLeft),Ne=Math.ceil(Se.actualBoundingBoxAscent+Se.actualBoundingBoxDescent),Fe=2,Le=Se.actualBoundingBoxLeft+Fe,p=Se.actualBoundingBoxAscent+Fe;je+=Fe+Fe,Ne+=Fe+Fe,xe=new OffscreenCanvas(je,Ne),be=xe.getContext("2d"),be.font=ye,be.fillStyle=K,be.fillText(o,Le,p);var ie=1/_;return{type:"bitmap",bitmap:xe.transferToImageBitmap(),matrix:[ie,0,0,ie,-je*ie/2,-Ne*ie/2]}}d.exports=function(){return Q().apply(this,arguments)},d.exports.reset=function(){Q().reset()},d.exports.create=v,d.exports.shapeFromPath=P,d.exports.shapeFromText=ne})((function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}})(),yc,!1);const A0=yc.exports;yc.exports.create;const k0=({plan:B,goal:b,unallocatedBalance:d=0,onClose:x,onUpdatePlan:w,onUpdateGoal:g})=>{const{t:f,language:c,formatCurrency:s}=yt(),[h,k]=ce.useState("allocate"),[S,j]=ce.useState(""),[m,C]=ce.useState(null),y=B||b;if(!y)return null;const N=y.targetAmount||0,E=y.allocatedAmount||0,D=Math.max(0,N-E),R=L=>{w&&w(L),g&&g(L)},A=L=>{L.preventDefault();const V=Rn(S);if(isNaN(V)||V<=0){C(c==="ar"?"يرجى إدخال رقم موجب وصحيح.":"Please enter a valid positive number.");return}if(h==="allocate"){if(V>d){C(c==="ar"?`لا يمكن تخصيص أكثر من الرصيد المتاح غير المخصص (${s(d)}).`:`Cannot allocate more than your available cash (${s(d)}).`);return}const Z=E+V,U=Z>=N;R({...y,allocatedAmount:Z,isCompleted:U,completedAt:U?new Date().toISOString():y.completedAt,updatedAt:new Date().toISOString()}),U&&A0({particleCount:100,spread:70,origin:{y:.6}})}else{if(V>E){C(c==="ar"?`لا يمكن سحب أكثر من المبلغ المخصص حالياً (${s(E)}).`:`Cannot withdraw more than currently allocated (${s(E)}).`);return}const Z=Math.max(0,E-V);R({...y,allocatedAmount:Z,isCompleted:!1,completedAt:null,updatedAt:new Date().toISOString()})}x()},T=[25e4,5e5,1e6];return r.jsx("div",{className:"fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4 backdrop-blur-sm animate-in fade-in duration-200",children:r.jsxs("div",{className:"w-full max-w-md rounded-t-[32px] sm:rounded-[32px] bg-white p-6 shadow-2xl dark:bg-[#2C2C2E] border border-[#E5E5EA] dark:border-[#3A3A3C]",children:[r.jsxs("div",{className:"flex items-center justify-between pb-3.5 border-b border-[#F2F2F7] dark:border-[#38383A]",children:[r.jsxs("div",{children:[r.jsx("span",{className:"text-[#8E8E93] text-[10px] font-bold uppercase tracking-widest",children:c==="ar"?"تخصيص المبالغ":"Plan Capital Allocation"}),r.jsx("h3",{className:"font-bold text-base text-[#1C1C1E] dark:text-white",children:c==="ar"?"إدارة أموال الخطة":"Manage Plan Funds"}),r.jsx("p",{className:"text-xs font-semibold text-[#007AFF]",children:y.name})]}),r.jsx("button",{onClick:x,className:"rounded-full p-1.5 text-[#8E8E93] hover:bg-[#F2F2F7] dark:hover:bg-[#38383A] transition-colors",children:r.jsx(gn,{className:"h-5 w-5"})})]}),r.jsxs("div",{className:"mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-[#F2F2F7] p-3 text-xs dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#3A3A3C]",children:[r.jsxs("div",{children:[r.jsx("span",{className:"text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider",children:f.availableToAllocate}),r.jsx("div",{className:"mt-0.5 font-bold text-[#34C759]",children:s(d)})]}),r.jsxs("div",{children:[r.jsx("span",{className:"text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider",children:f.currentAllocation}),r.jsxs("div",{className:"mt-0.5 font-bold text-[#007AFF]",children:[s(E)," / ",s(N)]})]})]}),r.jsxs("form",{onSubmit:A,className:"mt-4 space-y-4",children:[r.jsxs("div",{className:"flex rounded-xl bg-[#E5E5EA] p-1 text-xs font-bold dark:bg-[#1C1C1E]",children:[r.jsxs("button",{type:"button",onClick:()=>{k("allocate"),C(null)},className:`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 transition-all ${h==="allocate"?"bg-[#007AFF] text-white shadow-sm":"text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white"}`,children:[r.jsx(cn,{className:"h-4 w-4"}),c==="ar"?"تخصيص رصيد":"Allocate Funds"]}),r.jsxs("button",{type:"button",onClick:()=>{k("withdraw"),C(null)},className:`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 transition-all ${h==="withdraw"?"bg-[#FF9500] text-white shadow-sm":"text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white"}`,children:[r.jsx(Zf,{className:"h-4 w-4"}),c==="ar"?"سحب رصيد":"Withdraw Funds"]})]}),r.jsxs("div",{children:[r.jsxs("label",{className:"block text-xs font-bold text-[#8E8E93] uppercase tracking-wider",children:[c==="ar"?"المبلغ":"Amount"," (",c==="ar"?"د.ع":"IQD",")"]}),r.jsxs("div",{className:"relative mt-1",children:[r.jsx(Ea,{id:"allocate-plan-amount-input",required:!0,placeholder:"0",value:S,onChangeValue:L=>{j(L),C(null)},className:"w-full rounded-xl border border-[#D1D1D6] bg-[#F2F2F7] px-3.5 py-3 text-xl font-black text-[#1C1C1E] placeholder:text-[#8E8E93] focus:border-[#007AFF] focus:bg-[#FFFFFF] focus:text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-[#FFFFFF] dark:placeholder:text-[#636366] dark:focus:bg-[#1C1C1E] dark:focus:text-[#FFFFFF] dark:focus:border-[#007AFF]"}),r.jsx("div",{className:"pointer-events-none absolute inset-y-0 right-3 flex items-center rtl:right-auto rtl:left-3",children:r.jsx("span",{className:"text-xs font-bold text-[#8E8E93]",children:c==="ar"?"د.ع":"IQD"})})]})]}),r.jsxs("div",{className:"flex gap-2",children:[T.map(L=>r.jsxs("button",{type:"button",onClick:()=>{j(zn(L.toString())),C(null)},className:"flex-1 rounded-xl border border-[#E5E5EA] bg-white py-1.5 text-xs font-bold text-[#3A3A3C] hover:bg-[#F2F2F7] dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-[#E5E5EA] transition-colors",children:["+",L/1e3,"k"]},L)),h==="allocate"&&D>0&&D<=d&&r.jsx("button",{type:"button",onClick:()=>{j(zn(D.toString())),C(null)},className:"flex-1 rounded-xl bg-blue-50 py-1.5 text-xs font-bold text-[#007AFF] hover:bg-blue-100 dark:bg-blue-950/40 transition-colors",children:c==="ar"?"إكمال الخطة":"Fill Plan"})]}),m&&r.jsxs("div",{className:"flex items-center gap-2 rounded-xl bg-red-50 p-2.5 text-xs font-semibold text-[#FF3B30] dark:bg-red-950/40 border border-red-200 dark:border-red-900/50",children:[r.jsx(ui,{className:"h-4 w-4 shrink-0"}),r.jsx("span",{children:m})]}),r.jsxs("div",{className:"flex gap-2.5 pt-2",children:[r.jsx("button",{type:"button",onClick:x,className:"flex-1 rounded-xl bg-[#E5E5EA] py-3 text-center text-xs font-bold text-[#3A3A3C] hover:bg-[#D1D1D6] dark:bg-[#38383A] dark:text-[#8E8E93]",children:f.cancel}),r.jsx("button",{type:"submit",className:`flex-1 rounded-xl py-3 text-center text-xs font-bold text-white shadow-md transition-colors ${h==="allocate"?"bg-[#007AFF] hover:bg-[#0062CC] shadow-blue-500/25":"bg-[#FF9500] hover:bg-[#E08500] shadow-orange-500/25"}`,children:h==="allocate"?c==="ar"?"تأكيد التخصيص":"Confirm Allocation":c==="ar"?"تأكيد السحب":"Confirm Withdrawal"})]})]})]})})},E0=({onClose:B,onCreate:b})=>{const{t:d,language:x}=yt(),[w,g]=ce.useState(""),[f,c]=ce.useState(""),[s,h]=ce.useState("medium"),[k,S]=ce.useState(""),[j,m]=ce.useState(()=>new Date().toISOString().split("T")[0]),[C,y]=ce.useState(!0),[N,E]=ce.useState(()=>{const U=new Date;return U.setMonth(U.getMonth()+6),U.toISOString().split("T")[0]}),[D,R]=ce.useState(""),[A,T]=ce.useState(""),L=()=>{const U=Rn(f);if(!isNaN(U)&&U>0&&C){const W=new Date(j),ue=new Date(N),I=Math.max(1,(ue.getFullYear()-W.getFullYear())*12+(ue.getMonth()-W.getMonth())),ae=Math.round(U/I);S(zn(ae.toString()))}},V=U=>{U.preventDefault(),T("");const W=Rn(f);if(!w.trim()){T(x==="ar"?"يرجى كتابة عنوان الخطة المالية.":"Please provide a plan name.");return}if(isNaN(W)||W<=0){T(x==="ar"?"يرجى إدخال مبلغ مستهدف صحيح.":"Please specify a valid target amount.");return}const ue=Rn(k)||0;b({name:w.trim(),targetAmount:W,currency:"IQD",startDate:j?new Date(j).toISOString():new Date().toISOString(),targetDate:C?new Date(N).toISOString():null,priority:s,plannedMonthlyAmount:ue,planDescription:D.trim()}),B()},Z=[{key:"critical",labelEn:"Critical",labelAr:"حرجة",color:"border-rose-500 text-rose-600 dark:text-rose-400"},{key:"high",labelEn:"High",labelAr:"عالية",color:"border-amber-500 text-amber-600 dark:text-amber-400"},{key:"medium",labelEn:"Medium",labelAr:"متوسطة",color:"border-blue-500 text-blue-600 dark:text-blue-400"},{key:"low",labelEn:"Low",labelAr:"منخفضة",color:"border-gray-400 text-gray-600 dark:text-gray-400"}];return r.jsx("div",{className:"fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4 backdrop-blur-sm animate-in fade-in duration-200",children:r.jsxs("div",{className:"w-full max-w-md rounded-t-[32px] sm:rounded-[32px] bg-white p-6 shadow-2xl dark:bg-[#2C2C2E] border border-[#E5E5EA] dark:border-[#3A3A3C] max-h-[92vh] overflow-y-auto",children:[r.jsxs("div",{className:"flex items-center justify-between pb-3.5 border-b border-[#F2F2F7] dark:border-[#38383A]",children:[r.jsxs("div",{className:"flex items-center gap-2",children:[r.jsx("div",{className:"flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-[#007AFF] dark:bg-blue-950/40",children:r.jsx(On,{className:"h-4 w-4"})}),r.jsxs("div",{children:[r.jsx("span",{className:"text-[#8E8E93] text-[10px] font-bold uppercase tracking-widest",children:x==="ar"?"التخطيط المالي":"Financial Planning"}),r.jsx("h3",{className:"font-bold text-base text-[#1C1C1E] dark:text-white",children:d.createPlanTitle})]})]}),r.jsx("button",{onClick:B,className:"rounded-full p-1.5 text-[#8E8E93] hover:bg-[#F2F2F7] dark:hover:bg-[#38383A] transition-colors",children:r.jsx(gn,{className:"h-5 w-5"})})]}),A&&r.jsx("div",{className:"mt-3 rounded-xl bg-red-50 p-2.5 text-xs font-semibold text-[#FF3B30] dark:bg-red-950/40 border border-red-200 dark:border-red-900",children:A}),r.jsxs("form",{onSubmit:V,className:"mt-4 space-y-4",children:[r.jsxs("div",{children:[r.jsx("label",{className:"block text-xs font-bold text-[#8E8E93] uppercase tracking-wider",children:d.planNameLabel}),r.jsx("input",{type:"text",required:!0,placeholder:x==="ar"?"مثال: صندوق الطوارئ، سيارة جديدة، توسيع العمل، سفر...":"e.g. Emergency Reserve, Car Upgrade, Expansion, Travel...",value:w,onChange:U=>g(U.target.value),className:"mt-1 w-full rounded-xl border border-[#E5E5EA] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#1C1C1E] focus:border-[#007AFF] focus:outline-none dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white"})]}),r.jsxs("div",{children:[r.jsx("label",{className:"block text-xs font-bold text-[#8E8E93] uppercase tracking-wider",children:d.planPriority}),r.jsx("div",{className:"mt-1.5 grid grid-cols-4 gap-1.5",children:Z.map(U=>{const W=s===U.key;return r.jsx("button",{type:"button",onClick:()=>h(U.key),className:`rounded-xl py-2 px-1 text-xs font-bold border transition-all ${W?"bg-[#007AFF] text-white border-[#007AFF] shadow-sm":"bg-[#F2F2F7] text-[#3A3A3C] border-transparent hover:bg-[#E5E5EA] dark:bg-[#1C1C1E] dark:text-[#8E8E93]"}`,children:x==="ar"?U.labelAr:U.labelEn},U.key)})})]}),r.jsxs("div",{children:[r.jsxs("label",{className:"block text-xs font-bold text-[#8E8E93] uppercase tracking-wider",children:[d.planTargetLabel," (",x==="ar"?"د.ع":"IQD",")"]}),r.jsxs("div",{className:"relative mt-1",children:[r.jsx(Ea,{id:"create-plan-target-amount",required:!0,placeholder:x==="ar"?"مثال: 5,000,000":"e.g. 5,000,000",value:f,onChangeValue:U=>c(U),className:"w-full rounded-xl border border-[#D1D1D6] bg-[#F2F2F7] px-3.5 py-3 text-xl font-black text-[#1C1C1E] placeholder:text-[#8E8E93] focus:border-[#007AFF] focus:bg-[#FFFFFF] focus:text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-[#FFFFFF] dark:placeholder:text-[#636366] dark:focus:bg-[#1C1C1E] dark:focus:text-[#FFFFFF] dark:focus:border-[#007AFF]"}),r.jsx("div",{className:"pointer-events-none absolute inset-y-0 right-3 flex items-center rtl:right-auto rtl:left-3",children:r.jsx("span",{className:"text-xs font-bold text-[#8E8E93] dark:text-[#8E8E93]",children:x==="ar"?"د.ع":"IQD"})})]})]}),r.jsxs("div",{children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsxs("label",{className:"text-xs font-bold text-[#8E8E93] uppercase tracking-wider",children:[d.plannedMonthlyRate," (",x==="ar"?"د.ع/شهرياً":"IQD/mo",")"]}),C&&f&&r.jsxs("button",{type:"button",onClick:L,className:"flex items-center gap-1 text-[10px] font-bold text-[#007AFF] hover:underline",children:[r.jsx(Bl,{className:"h-3 w-3"}),x==="ar"?"حساب تلقائي":"Auto-calculate"]})]}),r.jsxs("div",{className:"relative mt-1",children:[r.jsx(Ea,{id:"create-plan-monthly-amount",placeholder:x==="ar"?"المبلغ المستهدف ادخاره كل شهر":"Target amount to save each month",value:k,onChangeValue:U=>S(U),className:"w-full rounded-xl border border-[#D1D1D6] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#1C1C1E] placeholder:text-[#8E8E93] focus:border-[#007AFF] focus:text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/20 dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-[#FFFFFF] dark:placeholder:text-[#636366] dark:focus:bg-[#1C1C1E] dark:focus:text-[#FFFFFF] dark:focus:border-[#007AFF]"}),r.jsx("div",{className:"pointer-events-none absolute inset-y-0 right-3 flex items-center rtl:right-auto rtl:left-3",children:r.jsx("span",{className:"text-[10px] font-bold text-[#8E8E93] dark:text-[#8E8E93]",children:x==="ar"?"د.ع/شهر":"IQD/mo"})})]})]}),r.jsxs("div",{className:"space-y-3",children:[r.jsxs("div",{children:[r.jsx("label",{className:"block text-xs font-bold text-[#8E8E93] uppercase tracking-wider",children:x==="ar"?"تاريخ البدء":"Start Date"}),r.jsxs("div",{className:"mt-1 flex items-center gap-2 rounded-xl border border-[#E5E5EA] bg-white px-3.5 py-2 dark:border-[#3A3A3C] dark:bg-[#1C1C1E]",children:[r.jsx(di,{className:"h-4 w-4 text-[#007AFF]"}),r.jsx("input",{type:"date",value:j,onChange:U=>m(U.target.value),className:"w-full bg-transparent text-xs font-semibold text-[#1C1C1E] focus:outline-none dark:text-white"})]}),r.jsx("p",{className:"mt-1 text-[10px] text-[#8E8E93]",children:x==="ar"?"يحدد خط الأساس للجدول الزمني وحساب الالتزامات السابقة أو المجدولة":"Timeline baseline for tracking elapsed pacing or scheduling future plans"})]}),r.jsxs("div",{className:"space-y-2",children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsx("label",{className:"text-xs font-bold text-[#8E8E93] uppercase tracking-wider",children:d.planDateLabel}),r.jsx("button",{type:"button",onClick:()=>y(!C),className:"text-[11px] font-semibold text-[#007AFF]",children:C?x==="ar"?"إلغاء الموعد النهائي":"No Deadline":x==="ar"?"تحديد موعد نهائي":"Set Deadline"})]}),C&&r.jsxs("div",{className:"flex items-center gap-2 rounded-xl border border-[#E5E5EA] bg-white px-3.5 py-2 dark:border-[#3A3A3C] dark:bg-[#1C1C1E]",children:[r.jsx(di,{className:"h-4 w-4 text-[#8E8E93]"}),r.jsx("input",{type:"date",value:N,onChange:U=>E(U.target.value),className:"w-full bg-transparent text-xs font-semibold text-[#1C1C1E] focus:outline-none dark:text-white"})]})]})]}),r.jsxs("div",{children:[r.jsx("label",{className:"block text-xs font-bold text-[#8E8E93] uppercase tracking-wider",children:d.planDescLabel}),r.jsx("textarea",{rows:2,placeholder:x==="ar"?"أهداف الخطة وملاحظات الاستثمار أو تخصيص رأس المال...":"Purpose, notes, and milestones for this plan...",value:D,onChange:U=>R(U.target.value),className:"mt-1 w-full rounded-xl border border-[#E5E5EA] bg-white px-3.5 py-2 text-xs focus:border-[#007AFF] focus:outline-none dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white"})]}),r.jsxs("div",{className:"flex gap-2.5 pt-2",children:[r.jsx("button",{type:"button",onClick:B,className:"flex-1 rounded-xl bg-[#E5E5EA] py-3 text-center text-xs font-bold text-[#3A3A3C] hover:bg-[#D1D1D6] dark:bg-[#38383A] dark:text-[#8E8E93]",children:d.cancel}),r.jsx("button",{type:"submit",className:"flex-1 rounded-xl bg-[#007AFF] py-3 text-center text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:bg-[#0062CC] transition-colors",children:d.savePlanBtn})]})]})]})})},T0=({plan:B,goal:b,transactions:d,allPlans:x,allGoals:w,onClose:g,onOpenAllocate:f,onToggleComplete:c,onToggleCompleteGoal:s,onDeletePlan:h,onDeleteGoal:k,onUpdatePlan:S,onUpdateGoal:j})=>{const{t:m,language:C,formatCurrency:y}=yt(),[N,E]=ce.useState(!1),[D,R]=ce.useState(!1),A=B||b,T=x||w||[],[L,V]=ce.useState(()=>{if(A.targetDate)return new Date(A.targetDate).toISOString().split("T")[0];const ie=new Date;return ie.setMonth(ie.getMonth()+6),ie.toISOString().split("T")[0]}),[Z,U]=ce.useState(()=>A.startDate?new Date(A.startDate).toISOString().split("T")[0]:new Date().toISOString().split("T")[0]),W=()=>{c?c():s&&s()},ue=()=>{h?h():k&&k()},I=ie=>{S?S(ie):j&&j(ie)},ae=()=>{const ie=!A.isPaused,H={...A,isPaused:ie,pausedAt:ie?new Date().toISOString():null,updatedAt:new Date().toISOString()};I(H)},v=ie=>{const H=A.targetDate?new Date(A.targetDate):new Date;H.setMonth(H.getMonth()+ie),V(H.toISOString().split("T")[0])},J=()=>{const ie=Math.max(0,A.targetAmount-A.allocatedAmount),H=new Date(Z),z=new Date(L),F=Math.max(1,(z.getFullYear()-H.getFullYear())*12+(z.getMonth()-H.getMonth())),q=Math.round(ie/F),me={...A,startDate:new Date(Z).toISOString(),targetDate:new Date(L).toISOString(),plannedMonthlyAmount:q>0?q:A.plannedMonthlyAmount,updatedAt:new Date().toISOString()};I(me),R(!1)},Q=nt.unallocatedBalance(d,T),Y=nt.historicalMonthlyAverageSavings(d),P=Math.max(0,nt.monthlyIncome(d)-nt.monthlyExpenses(d)),ne=nt.analyzePlan(A,Q,Y,P),O=A.targetAmount>0?Math.min(100,Math.round(A.allocatedAmount/A.targetAmount*100)):0,o=Math.max(0,A.targetAmount-A.allocatedAmount),_=A.startDate?new Date(A.startDate).toLocaleDateString(C==="ar"?"ar-IQ":"en-US",{month:"short",year:"numeric"}):C==="ar"?"البداية":"Start",K=A.targetDate?new Date(A.targetDate).toLocaleDateString(C==="ar"?"ar-IQ":"en-US",{month:"short",year:"numeric"}):C==="ar"?"أفق مفتوح":"Open Horizon",X=ne.projectedCompletionDate?new Date(ne.projectedCompletionDate).toLocaleDateString(C==="ar"?"ar-IQ":"en-US",{month:"short",year:"numeric"}):C==="ar"?"غير محدد":"N/A",te=ne.projectedMonths-(ne.monthsRemaining||0),ye=A.targetDate&&te<0,xe=A.targetDate&&te>0;A.targetDate;const be=new Date(L),Se=new Date,je=Math.max(1,(be.getFullYear()-Se.getFullYear())*12+(be.getMonth()-Se.getMonth())),Ne=Math.round(o/je),Fe=Ne-(A.plannedMonthlyAmount||0),p={critical:{labelEn:"Critical",labelAr:"حرجة (قصوى)",color:"text-rose-600 dark:text-rose-400",badge:"bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300"},high:{labelEn:"High",labelAr:"عالية",color:"text-amber-600 dark:text-amber-400",badge:"bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300"},medium:{labelEn:"Medium",labelAr:"متوسطة",color:"text-blue-600 dark:text-blue-400",badge:"bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-300"},low:{labelEn:"Low",labelAr:"منخفضة",color:"text-gray-600 dark:text-gray-400",badge:"bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-300"}}[A.priority||"medium"];return r.jsx("div",{className:"fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4 backdrop-blur-sm animate-in fade-in duration-200",children:r.jsxs("div",{className:"w-full max-w-md rounded-t-[32px] sm:rounded-[32px] bg-white p-6 shadow-2xl dark:bg-[#2C2C2E] border border-[#E5E5EA] dark:border-[#3A3A3C] max-h-[92vh] overflow-y-auto",children:[r.jsxs("div",{className:"flex items-center justify-between pb-3.5 border-b border-[#F2F2F7] dark:border-[#38383A]",children:[r.jsxs("div",{className:"flex items-center gap-2.5",children:[r.jsx("div",{className:"flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#007AFF] dark:bg-blue-950/40",children:r.jsx(On,{className:"h-5 w-5"})}),r.jsxs("div",{children:[r.jsxs("div",{className:"flex items-center gap-2",children:[r.jsx("span",{className:"text-[#8E8E93] text-[10px] font-bold uppercase tracking-widest",children:C==="ar"?"تفاصيل الخطة المالية":"Plan Overview"}),r.jsx("span",{className:`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${p.badge}`,children:C==="ar"?p.labelAr:p.labelEn}),A.isPaused&&r.jsxs("span",{className:"text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300",children:["⏸️ ",C==="ar"?"متوقفة":"Paused"]})]}),r.jsx("h3",{className:"font-bold text-base text-[#1C1C1E] dark:text-white truncate max-w-[220px]",children:A.name})]})]}),r.jsx("button",{onClick:g,className:"rounded-full p-1.5 text-[#8E8E93] hover:bg-[#F2F2F7] dark:hover:bg-[#38383A] transition-colors",children:r.jsx(gn,{className:"h-5 w-5"})})]}),r.jsxs("div",{className:"mt-4 space-y-4",children:[A.isPaused&&r.jsx("div",{className:"rounded-2xl border border-zinc-300 bg-zinc-100 p-3.5 dark:border-zinc-700 dark:bg-zinc-800/80",children:r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsxs("div",{className:"flex items-center gap-2 text-zinc-700 dark:text-zinc-200",children:[r.jsx(_f,{className:"h-4 w-4"}),r.jsxs("div",{children:[r.jsx("h4",{className:"text-xs font-bold",children:C==="ar"?"الخطة متوقفة مؤقتاً":"Plan is Paused"}),r.jsx("p",{className:"text-[11px] text-zinc-500 dark:text-zinc-400",children:C==="ar"?"الالتزامات الشهرية متوقفة ولا تُحسب ضمن سعة الادخار.":"Savings commitments are on hold and excluded from monthly capacity."})]})]}),r.jsxs("button",{type:"button",onClick:ae,className:"flex items-center gap-1 rounded-xl bg-[#007AFF] px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-[#0062CC]",children:[r.jsx(rc,{className:"h-3.5 w-3.5"}),C==="ar"?"استئناف":"Resume"]})]})}),r.jsxs("div",{className:"rounded-2xl border border-[#007AFF]/20 bg-blue-50/60 p-4 dark:border-blue-900/50 dark:bg-blue-950/30",children:[r.jsxs("div",{className:"flex items-center justify-between pb-2 border-b border-blue-200/50 dark:border-blue-900/40",children:[r.jsxs("span",{className:"text-[10px] font-bold uppercase tracking-wider text-[#007AFF] flex items-center gap-1.5",children:[r.jsx(Dl,{className:"h-3.5 w-3.5"})," ",m.forecastCompletion]}),A.targetDate&&r.jsx("span",{className:`text-[10px] font-bold px-2 py-0.5 rounded-full ${ye?"bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300":xe?"bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300":"bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"}`,children:ye?`🎉 ${Math.abs(te)} ${C==="ar"?"أشهر متقدم":"mos ahead"}`:xe?`⚠️ ${te} ${C==="ar"?"أشهر متأخر":"mos behind"}`:C==="ar"?"✓ على الموعد":"✓ On Target"})]}),r.jsxs("div",{className:"mt-3 grid grid-cols-2 gap-3",children:[r.jsxs("div",{children:[r.jsx("span",{className:"text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider",children:m.originalTargetDate}),r.jsx("p",{className:"mt-0.5 font-bold text-xs text-[#1C1C1E] dark:text-white",children:K})]}),r.jsxs("div",{children:[r.jsx("span",{className:"text-[10px] font-bold text-[#007AFF] uppercase tracking-wider",children:m.forecastCompletion}),r.jsxs("p",{className:"mt-0.5 font-black text-xs text-[#007AFF]",children:[X,ne.projectedMonths>0&&r.jsxs("span",{className:"text-[10px] font-normal text-[#8E8E93] ml-1",children:["(~",ne.projectedMonths," ",C==="ar"?"أشهر":"mos",")"]})]})]})]})]}),r.jsxs("div",{className:"rounded-2xl border border-[#E5E5EA] bg-white p-4 dark:border-[#3A3A3C] dark:bg-[#1C1C1E]",children:[r.jsxs("div",{className:"flex items-center justify-between mb-3",children:[r.jsxs("span",{className:"text-[10px] font-bold uppercase tracking-wider text-[#8E8E93] flex items-center gap-1.5",children:[r.jsx(ac,{className:"h-3.5 w-3.5 text-[#007AFF]"}),C==="ar"?"المسار الزمني والمحطات":"Visual Timeline & Milestones"]}),r.jsxs("span",{className:"text-xs font-black text-[#007AFF]",children:[O,"%"]})]}),r.jsxs("div",{className:"relative py-2",children:[r.jsx("div",{className:"absolute top-6 left-3 right-3 h-1 bg-[#E5E5EA] dark:bg-[#38383A] -translate-y-1/2 z-0"}),r.jsx("div",{className:"absolute top-6 left-3 h-1 bg-[#007AFF] -translate-y-1/2 z-0 transition-all duration-500",style:{width:`${Math.min(95,Math.max(5,O))}%`}}),r.jsxs("div",{className:"relative z-10 flex justify-between items-start text-center",children:[r.jsxs("div",{className:"flex flex-col items-center flex-1 max-w-[64px]",children:[r.jsx("div",{className:"flex h-7 w-7 items-center justify-center rounded-full bg-[#007AFF] text-white ring-4 ring-white dark:ring-[#1C1C1E] shadow-sm",children:r.jsx(rc,{className:"h-3 w-3 fill-current"})}),r.jsx("span",{className:"mt-1 text-[9px] font-bold text-[#1C1C1E] dark:text-white truncate w-full",children:_}),r.jsx("span",{className:"text-[8px] text-[#8E8E93] uppercase font-bold",children:C==="ar"?"البدء":"Start"})]}),r.jsxs("div",{className:"flex flex-col items-center flex-1 max-w-[64px]",children:[r.jsx("div",{className:`flex h-7 w-7 items-center justify-center rounded-full ring-4 ring-white dark:ring-[#1C1C1E] shadow-sm ${O>=50?"bg-emerald-500 text-white":"bg-white border-2 border-[#007AFF] text-[#007AFF] dark:bg-[#2C2C2E]"}`,children:r.jsx(Lp,{className:"h-3.5 w-3.5"})}),r.jsxs("span",{className:"mt-1 text-[9px] font-bold text-[#1C1C1E] dark:text-white",children:[O,"%"]}),r.jsx("span",{className:"text-[8px] text-[#8E8E93] uppercase font-bold",children:C==="ar"?"المرحلة":"Target"})]}),r.jsxs("div",{className:"flex flex-col items-center flex-1 max-w-[64px]",children:[r.jsx("div",{className:"relative flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-white ring-4 ring-white dark:ring-[#1C1C1E] shadow-sm animate-pulse",children:r.jsx(Dl,{className:"h-3.5 w-3.5"})}),r.jsx("span",{className:"mt-1 text-[9px] font-black text-amber-600 dark:text-amber-400",children:C==="ar"?"اليوم":"Today"}),r.jsx("span",{className:"text-[8px] text-[#8E8E93] font-semibold",children:new Date().toLocaleDateString(C==="ar"?"ar-IQ":"en-US",{month:"short"})})]}),r.jsxs("div",{className:"flex flex-col items-center flex-1 max-w-[64px]",children:[r.jsx("div",{className:"flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500 text-white ring-4 ring-white dark:ring-[#1C1C1E] shadow-sm",children:r.jsx(On,{className:"h-3.5 w-3.5"})}),r.jsx("span",{className:"mt-1 text-[9px] font-bold text-[#1C1C1E] dark:text-white truncate w-full",children:K}),r.jsx("span",{className:"text-[8px] text-[#8E8E93] uppercase font-bold",children:C==="ar"?"الهدف":"Target"})]}),r.jsxs("div",{className:"flex flex-col items-center flex-1 max-w-[64px]",children:[r.jsx("div",{className:"flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white ring-4 ring-white dark:ring-[#1C1C1E] shadow-sm",children:r.jsx(sc,{className:"h-3.5 w-3.5"})}),r.jsx("span",{className:"mt-1 text-[9px] font-bold text-[#007AFF] truncate w-full",children:X}),r.jsx("span",{className:"text-[8px] text-[#8E8E93] uppercase font-bold",children:C==="ar"?"المتوقع":"Forecast"})]})]})]}),ne.expectedContributionToDate!==void 0&&r.jsxs("div",{className:"mt-3 pt-2.5 border-t border-[#F2F2F7] dark:border-[#38383A] flex items-center justify-between text-[11px]",children:[r.jsx("span",{className:"text-[#8E8E93]",children:C==="ar"?`المتوقع منذ البدء (${ne.elapsedMonthsFromStart||0} شهر):`:`Expected since start (${ne.elapsedMonthsFromStart||0} mos):`}),r.jsx("span",{className:"font-bold text-[#1C1C1E] dark:text-white",children:y(ne.expectedContributionToDate)}),r.jsxs("span",{className:`font-black px-2 py-0.5 rounded-full text-[10px] ${(ne.startPacingVariance||0)>=0?"bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300":"bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"}`,children:[(ne.startPacingVariance||0)>=0?"+":"",y(ne.startPacingVariance||0)]})]})]}),r.jsxs("div",{className:"grid grid-cols-2 gap-2.5",children:[r.jsxs("div",{className:"rounded-2xl border border-[#E5E5EA] bg-[#F2F2F7] p-3.5 dark:border-[#3A3A3C] dark:bg-[#1C1C1E]",children:[r.jsx("span",{className:"text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]",children:m.allocatedProgress}),r.jsx("p",{className:"mt-1 font-black text-sm text-[#007AFF]",children:y(A.allocatedAmount)})]}),r.jsxs("div",{className:"rounded-2xl border border-[#E5E5EA] bg-[#F2F2F7] p-3.5 dark:border-[#3A3A3C] dark:bg-[#1C1C1E]",children:[r.jsx("span",{className:"text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]",children:m.targetAmount}),r.jsx("p",{className:"mt-1 font-black text-sm text-[#1C1C1E] dark:text-white",children:y(A.targetAmount)})]}),r.jsxs("div",{className:"rounded-2xl border border-[#E5E5EA] bg-[#F2F2F7] p-3.5 dark:border-[#3A3A3C] dark:bg-[#1C1C1E]",children:[r.jsx("span",{className:"text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]",children:m.remainingAmount}),r.jsx("p",{className:"mt-1 font-black text-sm text-[#FF9500]",children:y(o)})]}),r.jsxs("div",{className:"rounded-2xl border border-[#E5E5EA] bg-[#F2F2F7] p-3.5 dark:border-[#3A3A3C] dark:bg-[#1C1C1E]",children:[r.jsx("span",{className:"text-[10px] font-bold uppercase tracking-wider text-[#8E8E93]",children:m.plannedMonthlyRate}),r.jsxs("p",{className:"mt-1 font-black text-sm text-[#34C759]",children:[y(A.plannedMonthlyAmount||0),"/mo"]})]})]}),D&&r.jsxs("div",{className:"rounded-2xl border border-blue-200 bg-blue-50/70 p-4 dark:border-blue-900/60 dark:bg-[#202534] space-y-3 animate-in fade-in duration-200",children:[r.jsxs("div",{className:"flex items-center justify-between pb-2 border-b border-blue-200/60 dark:border-blue-900/50",children:[r.jsxs("span",{className:"text-xs font-bold text-[#007AFF] flex items-center gap-1.5",children:[r.jsx(ac,{className:"h-4 w-4"}),C==="ar"?"إعادة جدولة الخطة":"Reschedule Timeline"]}),r.jsx("button",{type:"button",onClick:()=>R(!1),className:"text-xs font-semibold text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white",children:m.cancel})]}),r.jsxs("div",{children:[r.jsx("label",{className:"text-[10px] font-bold uppercase tracking-wider text-[#8E8E93] block mb-1.5",children:C==="ar"?"تمديد الجدول الزمني سريعاً":"Quick Extension Options"}),r.jsx("div",{className:"grid grid-cols-4 gap-1.5",children:[{label:"+1 mo",ar:"+1 شهر",val:1},{label:"+3 mos",ar:"+3 أشهر",val:3},{label:"+6 mos",ar:"+6 أشهر",val:6},{label:"+1 yr",ar:"+سنة",val:12}].map(ie=>r.jsx("button",{type:"button",onClick:()=>v(ie.val),className:"rounded-xl border border-blue-200 bg-white py-2 px-1 text-xs font-bold text-[#007AFF] shadow-sm hover:bg-blue-50 dark:border-blue-900 dark:bg-[#1C1C1E] dark:text-blue-300",children:C==="ar"?ie.ar:ie.label},ie.val))})]}),r.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[r.jsxs("div",{children:[r.jsx("label",{className:"text-[10px] font-bold uppercase tracking-wider text-[#8E8E93] block",children:C==="ar"?"تاريخ البدء":"Start Date"}),r.jsx("input",{type:"date",value:Z,onChange:ie=>U(ie.target.value),className:"mt-1 w-full rounded-xl border border-[#D1D1D6] bg-white px-2.5 py-2 text-xs font-semibold text-[#1C1C1E] dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white"})]}),r.jsxs("div",{children:[r.jsx("label",{className:"text-[10px] font-bold uppercase tracking-wider text-[#8E8E93] block",children:C==="ar"?"تاريخ الهدف الجديد":"New Target Date"}),r.jsx("input",{type:"date",value:L,onChange:ie=>V(ie.target.value),className:"mt-1 w-full rounded-xl border border-[#D1D1D6] bg-white px-2.5 py-2 text-xs font-semibold text-[#1C1C1E] dark:border-[#3A3A3C] dark:bg-[#1C1C1E] dark:text-white"})]})]}),r.jsxs("div",{className:"rounded-xl bg-white p-2.5 text-xs dark:bg-[#1C1C1E] border border-blue-100 dark:border-blue-900/50",children:[r.jsxs("div",{className:"flex justify-between items-center font-semibold text-[#1C1C1E] dark:text-white",children:[r.jsx("span",{children:C==="ar"?"الادخار الشهري المطلوب الجديد:":"New Required Monthly:"}),r.jsxs("strong",{className:"text-[#007AFF]",children:[y(Ne),"/mo"]})]}),r.jsxs("div",{className:"mt-1 text-[11px] text-[#8E8E93] flex justify-between items-center",children:[r.jsx("span",{children:C==="ar"?"الفرق عن الخطة السابقة:":"Difference from current:"}),r.jsxs("span",{className:Fe<=0?"text-[#34C759] font-bold":"text-[#FF9500] font-bold",children:[Fe<=0?"":"+",y(Fe),"/mo"]})]})]}),r.jsxs("button",{type:"button",onClick:J,className:"w-full flex items-center justify-center gap-1.5 rounded-xl bg-[#007AFF] py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:bg-[#0062CC]",children:[r.jsx(sn,{className:"h-4 w-4"}),C==="ar"?"حفظ الجدولة وتحديث الخطة":"Save Rescheduled Timeline"]})]}),r.jsxs("div",{className:"space-y-2.5 pt-2 border-t border-[#F2F2F7] dark:border-[#38383A]",children:[r.jsxs("button",{onClick:()=>{g(),f()},className:"w-full flex items-center justify-center gap-2 rounded-xl bg-[#007AFF] py-3 text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:bg-[#0062CC] transition-colors",children:[r.jsx(hc,{className:"h-4 w-4"})," ",m.allocateFundsBtn]}),r.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[r.jsx("button",{type:"button",onClick:ae,className:`flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold transition-colors ${A.isPaused?"bg-blue-50 text-[#007AFF] border border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800":"bg-[#F2F2F7] text-[#1C1C1E] hover:bg-[#E5E5EA] dark:bg-[#1C1C1E] dark:text-[#F2F2F7] dark:hover:bg-[#2C2C2E]"}`,children:A.isPaused?r.jsxs(r.Fragment,{children:[r.jsx(rc,{className:"h-3.5 w-3.5"}),C==="ar"?"استئناف الخطة":"Resume Plan"]}):r.jsxs(r.Fragment,{children:[r.jsx(_f,{className:"h-3.5 w-3.5"}),C==="ar"?"إيقاف مؤقت":"Pause Plan"]})}),r.jsxs("button",{type:"button",onClick:()=>R(!D),className:"flex items-center justify-center gap-1.5 rounded-xl bg-[#F2F2F7] py-2.5 text-xs font-bold text-[#1C1C1E] hover:bg-[#E5E5EA] dark:bg-[#1C1C1E] dark:text-[#F2F2F7] dark:hover:bg-[#2C2C2E] transition-colors",children:[r.jsx(ac,{className:"h-3.5 w-3.5 text-[#007AFF]"}),C==="ar"?"إعادة جدولة":"Reschedule"]})]}),N?r.jsxs("div",{className:"rounded-2xl border border-red-200 bg-red-50 p-3 dark:border-red-900/50 dark:bg-red-950/40 space-y-2",children:[r.jsx("p",{className:"text-xs font-semibold text-[#FF3B30] text-center",children:m.deletePlanConfirmMsg}),r.jsxs("div",{className:"flex gap-2",children:[r.jsx("button",{onClick:()=>{ue(),g()},className:"flex-1 rounded-xl bg-[#FF3B30] py-2.5 text-xs font-bold text-white hover:bg-red-700 transition-colors",children:C==="ar"?"نعم، احذف الخطة":"Yes, Delete Plan"}),r.jsx("button",{onClick:()=>E(!1),className:"rounded-xl bg-gray-200 dark:bg-gray-700 px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-gray-200",children:m.cancel})]})]}):r.jsxs("div",{className:"flex gap-2",children:[r.jsx("button",{onClick:()=>{W(),g()},className:`flex-1 rounded-xl py-2.5 text-xs font-bold transition-colors ${A.isCompleted?"bg-[#E5E5EA] text-[#3A3A3C] dark:bg-[#38383A] dark:text-white":"bg-green-50 text-[#34C759] border border-green-200 dark:bg-green-950/40 dark:text-green-300 dark:border-green-900"}`,children:A.isCompleted?m.markActive:m.markCompleted}),r.jsx("button",{onClick:()=>E(!0),className:"rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-[#FF3B30] hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400 transition-colors",title:m.deletePlanBtn,children:r.jsx(nn,{className:"h-4 w-4"})})]})]})]})]})})},N0=({budgets:B,transactions:b,categories:d,onClose:x,onSaveBudget:w,onDeleteBudget:g})=>{const{t:f,language:c,formatCurrency:s,translateCat:h}=yt(),[k,S]=ce.useState("Food"),[j,m]=ce.useState(""),[C,y]=ce.useState(!1),N=new Date,E=b.filter(A=>{const T=new Date(A.date);return A.type.toLowerCase()==="expense"&&T.getMonth()===N.getMonth()&&T.getFullYear()===N.getFullYear()}),D=d.filter(A=>A.type==="expense_category"),R=A=>{A.preventDefault();const T=Rn(j);if(isNaN(T)||T<=0){alert(c==="ar"?"يرجى إدخال حد شهري صحيح.":"Please enter a valid monthly limit.");return}w(k,T),m(""),y(!1)};return r.jsx("div",{className:"fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4 backdrop-blur-sm animate-in fade-in duration-200",children:r.jsxs("div",{className:"w-full max-w-md rounded-t-[32px] sm:rounded-[32px] bg-white p-6 shadow-2xl dark:bg-[#2C2C2E] border border-[#E5E5EA] dark:border-[#3A3A3C] max-h-[90vh] overflow-y-auto",children:[r.jsxs("div",{className:"flex items-center justify-between pb-3.5 border-b border-[#F2F2F7] dark:border-[#38383A]",children:[r.jsxs("div",{children:[r.jsx("span",{className:"text-[#8E8E93] text-[10px] font-bold uppercase tracking-widest",children:c==="ar"?"التخطيط المالي":"Planning"}),r.jsx("h3",{className:"font-bold text-base text-[#1C1C1E] dark:text-white",children:c==="ar"?"الميزانيات الشهرية":"Monthly Budgets"}),r.jsx("p",{className:"text-xs text-[#8E8E93]",children:N.toLocaleDateString(c==="ar"?"ar-IQ":"en-US",{month:"long",year:"numeric"})})]}),r.jsx("button",{onClick:x,className:"rounded-full p-1.5 text-[#8E8E93] hover:bg-[#F2F2F7] dark:hover:bg-[#38383A] transition-colors",children:r.jsx(gn,{className:"h-5 w-5"})})]}),r.jsx("div",{className:"mt-4",children:C?r.jsxs("form",{onSubmit:R,className:"space-y-3 rounded-2xl bg-[#F2F2F7] p-4 dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#3A3A3C]",children:[r.jsxs("div",{className:"flex items-center justify-between text-xs font-bold text-[#1C1C1E] dark:text-white",children:[r.jsx("span",{children:c==="ar"?"تحديد ميزانية الفئة":"Set Budget Limit"}),r.jsx("button",{type:"button",onClick:()=>y(!1),className:"text-[#8E8E93] hover:text-[#1C1C1E]",children:f.cancel})]}),r.jsxs("div",{children:[r.jsx("label",{className:"block text-[11px] font-bold text-[#8E8E93] uppercase tracking-wider",children:c==="ar"?"الفئة":"Category"}),r.jsx("select",{value:k,onChange:A=>S(A.target.value),className:"mt-1 w-full rounded-xl border border-[#E5E5EA] bg-white p-2.5 text-xs font-semibold focus:border-[#007AFF] focus:outline-none dark:border-[#3A3A3C] dark:bg-[#2C2C2E] dark:text-white",children:D.map(A=>r.jsx("option",{value:A.name,children:h(A.name)},A.name))})]}),r.jsxs("div",{children:[r.jsxs("label",{className:"block text-[11px] font-bold text-[#8E8E93] uppercase tracking-wider",children:[c==="ar"?"الحد الأقصى الشهري":"Monthly Limit"," (",c==="ar"?"د.ع":"IQD",")"]}),r.jsx(Ea,{id:"budget-modal-limit-input",required:!0,placeholder:c==="ar"?"مثال: 500,000":"e.g. 500,000",value:j,onChangeValue:A=>m(A),className:"mt-1 w-full rounded-xl border border-[#E5E5EA] bg-white p-2.5 text-xs font-black focus:border-[#007AFF] focus:outline-none dark:border-[#3A3A3C] dark:bg-[#2C2C2E] dark:text-white"})]}),r.jsx("button",{type:"submit",className:"w-full rounded-xl bg-[#007AFF] py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:bg-[#0062CC] transition-colors",children:c==="ar"?"حفظ الميزانية":"Save Budget"})]}):r.jsxs("button",{onClick:()=>y(!0),className:"flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-50 py-2.5 text-xs font-bold text-[#007AFF] hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-300 transition-colors",children:[r.jsx(cn,{className:"h-4 w-4"})," ",c==="ar"?"تحديد سقف لفئة جديدة":"Set Limit for Category"]})}),r.jsx("div",{className:"mt-4 space-y-3",children:B.length===0?r.jsx("div",{className:"rounded-2xl border border-dashed border-[#E5E5EA] p-6 text-center text-xs text-[#8E8E93] dark:border-[#3A3A3C]",children:c==="ar"?"لم تقم بتعيين ميزانيات لأي فئة بعد.":"No category budgets configured yet."}):B.map(A=>{const T=E.filter(I=>I.category===A.category).reduce((I,ae)=>I+ae.amount,0),L=A.monthlyLimit>0?Math.round(T/A.monthlyLimit*100):0,V=T>A.monthlyLimit,Z=T>=A.monthlyLimit*.8&&!V;let U="bg-[#007AFF]",W="bg-blue-50 text-[#007AFF] dark:bg-blue-950/40 dark:text-blue-300",ue=c==="ar"?"ضمن الحد":"On Track";return V?(U="bg-[#FF3B30]",W="bg-red-50 text-[#FF3B30] dark:bg-red-950/40 dark:text-red-300",ue=c==="ar"?"تجاوز الميزانية":"Over Budget"):Z&&(U="bg-[#FF9500]",W="bg-amber-50 text-[#FF9500] dark:bg-amber-950/40 dark:text-amber-300",ue=c==="ar"?"قريب من السقف":"Near Limit"),r.jsxs("div",{className:"rounded-2xl border border-[#E5E5EA] bg-white p-4 shadow-sm dark:border-[#3A3A3C] dark:bg-[#1C1C1E]",children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsxs("div",{children:[r.jsx("span",{className:"font-bold text-xs text-[#1C1C1E] dark:text-white",children:h(A.category)}),r.jsxs("span",{className:"ml-2 text-[10px] font-semibold text-[#8E8E93]",children:[L,"% ",c==="ar"?"مستهلك":"used"]})]}),r.jsxs("div",{className:"flex items-center gap-2",children:[r.jsx("span",{className:`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${W}`,children:ue}),r.jsx("button",{onClick:()=>g(A.id),className:"text-[#8E8E93] hover:text-[#FF3B30] transition-colors",children:r.jsx(nn,{className:"h-3.5 w-3.5"})})]})]}),r.jsx("div",{className:"mt-2.5 h-2 w-full overflow-hidden rounded-full bg-[#F2F2F7] dark:bg-[#38383A]",children:r.jsx("div",{className:`h-full rounded-full transition-all duration-500 ${U}`,style:{width:`${Math.min(100,L)}%`}})}),r.jsxs("div",{className:"mt-2.5 flex items-center justify-between text-[11px]",children:[r.jsxs("span",{className:"text-[#8E8E93]",children:[c==="ar"?"المصروف:":"Spent:"," ",r.jsx("strong",{className:"font-semibold text-[#1C1C1E] dark:text-[#F2F2F7]",children:s(T)})]}),r.jsxs("span",{className:"text-[#8E8E93]",children:[c==="ar"?"السقف:":"Limit:"," ",r.jsx("strong",{className:"font-semibold text-[#1C1C1E] dark:text-[#F2F2F7]",children:s(A.monthlyLimit)})]})]}),V&&r.jsxs("div",{className:"mt-2.5 flex items-center gap-1.5 rounded-xl bg-red-50 px-2.5 py-1 text-[10px] font-bold text-[#FF3B30] dark:bg-red-950/40 dark:text-red-400",children:[r.jsx(ui,{className:"h-3 w-3"}),c==="ar"?`تجاوز السقف بمقدار ${s(T-A.monthlyLimit)}`:`Exceeded limit by ${s(T-A.monthlyLimit)}`]})]},A.id)})})]})})},D0=({isOpen:B,onSuccess:b,onCancel:d})=>{const{t:x,language:w}=yt(),[g,f]=ce.useState(!1),[c,s]=ce.useState(!1),[h,k]=ce.useState(!1),[S,j]=ce.useState("");return ce.useEffect(()=>{if(B){f(!0),s(!1),k(!1),j("");const m=setTimeout(()=>{f(!1),s(!0)},1400),C=setTimeout(()=>{b()},2e3);return()=>{clearTimeout(m),clearTimeout(C)}}},[B,b]),B?r.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200",children:r.jsx("div",{className:"w-full max-w-xs rounded-[32px] bg-[#1C1C1E] border border-[#3A3A3C] p-6 text-center text-white shadow-2xl",children:h?r.jsxs("div",{className:"space-y-4",children:[r.jsx(wx,{className:"mx-auto h-8 w-8 text-[#007AFF]"}),r.jsx("h4",{className:"font-bold text-base tracking-tight",children:w==="ar"?"أدخل رمز دخول iPhone":"Enter iPhone Passcode"}),r.jsx("div",{className:"flex justify-center gap-2",children:[0,1,2,3].map(m=>r.jsx("div",{className:`h-3.5 w-3.5 rounded-full border border-[#007AFF] ${S.length>m?"bg-[#007AFF]":"bg-transparent"}`},m))}),r.jsx("div",{className:"grid grid-cols-3 gap-2 pt-2",children:[1,2,3,4,5,6,7,8,9,0].map(m=>r.jsx("button",{onClick:()=>{const C=S+m;j(C),C.length>=4&&setTimeout(b,300)},className:"flex h-12 items-center justify-center rounded-2xl bg-[#2C2C2E] text-base font-bold text-white hover:bg-[#3A3A3C] active:scale-95 transition-all",children:m},m))})]}):r.jsxs("div",{className:"space-y-4",children:[r.jsx("div",{className:"relative mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] bg-[#2C2C2E] border border-[#3A3A3C] shadow-inner",children:c?r.jsx("div",{className:"flex h-12 w-12 items-center justify-center rounded-full bg-[#34C759] text-white animate-in zoom-in-75 duration-300",children:r.jsx(sn,{className:"h-7 w-7 stroke-[3]"})}):r.jsx(Vx,{className:`h-10 w-10 text-[#007AFF] ${g?"animate-pulse":""}`})}),r.jsxs("div",{children:[r.jsx("h4",{className:"font-bold text-base tracking-tight",children:w==="ar"?"بصمة الوجه (Face ID)":"Face ID"}),r.jsx("p",{className:"mt-1 text-xs text-[#8E8E93]",children:c?w==="ar"?"تم التحقق بنجاح":"Authenticated Successfully":w==="ar"?"جارٍ التعرف على الوجه...":"Recognizing Face..."})]}),r.jsx("button",{onClick:()=>k(!0),className:"mt-2 text-xs font-semibold text-[#007AFF] hover:text-[#0062CC] transition-colors",children:w==="ar"?"إدخال رمز الدخول":"Enter Passcode"})]})})}):null};class j0 extends $f.Component{constructor(b){super(b),this.handleReset=()=>{this.setState({hasError:!1,error:null})},this.state={hasError:!1,error:null}}static getDerivedStateFromError(b){return{hasError:!0,error:b}}componentDidCatch(b,d){console.error("Uncaught error caught by ErrorBoundary:",b,d)}render(){var b;return this.state.hasError?r.jsxs("div",{className:"flex min-h-[300px] w-full flex-col items-center justify-center p-6 text-center",children:[r.jsx("div",{className:"flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-[#FF3B30] dark:bg-red-950/50",children:r.jsx(ui,{className:"h-7 w-7"})}),r.jsx("h3",{className:"mt-4 font-bold text-base text-[#1C1C1E] dark:text-white",children:this.props.fallbackTitle||"Something went wrong"}),r.jsx("p",{className:"mt-1 max-w-xs text-xs text-[#8E8E93]",children:((b=this.state.error)==null?void 0:b.message)||"An unexpected error occurred while rendering this view."}),r.jsxs("button",{onClick:this.handleReset,className:"mt-4 inline-flex items-center gap-2 rounded-xl bg-[#007AFF] px-4 py-2 text-xs font-bold text-white shadow-md transition-colors hover:bg-[#0062CC]",children:[r.jsx(Ox,{className:"h-3.5 w-3.5"}),"Try Again"]})]}):this.props.children}}function Nl(B){throw new Error('Could not dynamically require "'+B+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var ic={exports:{}};/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/var zf;function M0(){return zf||(zf=1,(function(B,b){(function(d){B.exports=d()})(function(){return(function d(x,w,g){function f(h,k){if(!w[h]){if(!x[h]){var S=typeof Nl=="function"&&Nl;if(!k&&S)return S(h,!0);if(c)return c(h,!0);var j=new Error("Cannot find module '"+h+"'");throw j.code="MODULE_NOT_FOUND",j}var m=w[h]={exports:{}};x[h][0].call(m.exports,function(C){var y=x[h][1][C];return f(y||C)},m,m.exports,d,x,w,g)}return w[h].exports}for(var c=typeof Nl=="function"&&Nl,s=0;s<g.length;s++)f(g[s]);return f})({1:[function(d,x,w){var g=d("./utils"),f=d("./support"),c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";w.encode=function(s){for(var h,k,S,j,m,C,y,N=[],E=0,D=s.length,R=D,A=g.getTypeOf(s)!=="string";E<s.length;)R=D-E,S=A?(h=s[E++],k=E<D?s[E++]:0,E<D?s[E++]:0):(h=s.charCodeAt(E++),k=E<D?s.charCodeAt(E++):0,E<D?s.charCodeAt(E++):0),j=h>>2,m=(3&h)<<4|k>>4,C=1<R?(15&k)<<2|S>>6:64,y=2<R?63&S:64,N.push(c.charAt(j)+c.charAt(m)+c.charAt(C)+c.charAt(y));return N.join("")},w.decode=function(s){var h,k,S,j,m,C,y=0,N=0,E="data:";if(s.substr(0,E.length)===E)throw new Error("Invalid base64 input, it looks like a data url.");var D,R=3*(s=s.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(s.charAt(s.length-1)===c.charAt(64)&&R--,s.charAt(s.length-2)===c.charAt(64)&&R--,R%1!=0)throw new Error("Invalid base64 input, bad content length.");for(D=f.uint8array?new Uint8Array(0|R):new Array(0|R);y<s.length;)h=c.indexOf(s.charAt(y++))<<2|(j=c.indexOf(s.charAt(y++)))>>4,k=(15&j)<<4|(m=c.indexOf(s.charAt(y++)))>>2,S=(3&m)<<6|(C=c.indexOf(s.charAt(y++))),D[N++]=h,m!==64&&(D[N++]=k),C!==64&&(D[N++]=S);return D}},{"./support":30,"./utils":32}],2:[function(d,x,w){var g=d("./external"),f=d("./stream/DataWorker"),c=d("./stream/Crc32Probe"),s=d("./stream/DataLengthProbe");function h(k,S,j,m,C){this.compressedSize=k,this.uncompressedSize=S,this.crc32=j,this.compression=m,this.compressedContent=C}h.prototype={getContentWorker:function(){var k=new f(g.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new s("data_length")),S=this;return k.on("end",function(){if(this.streamInfo.data_length!==S.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),k},getCompressedWorker:function(){return new f(g.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},h.createWorkerFrom=function(k,S,j){return k.pipe(new c).pipe(new s("uncompressedSize")).pipe(S.compressWorker(j)).pipe(new s("compressedSize")).withStreamInfo("compression",S)},x.exports=h},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(d,x,w){var g=d("./stream/GenericWorker");w.STORE={magic:"\0\0",compressWorker:function(){return new g("STORE compression")},uncompressWorker:function(){return new g("STORE decompression")}},w.DEFLATE=d("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(d,x,w){var g=d("./utils"),f=(function(){for(var c,s=[],h=0;h<256;h++){c=h;for(var k=0;k<8;k++)c=1&c?3988292384^c>>>1:c>>>1;s[h]=c}return s})();x.exports=function(c,s){return c!==void 0&&c.length?g.getTypeOf(c)!=="string"?(function(h,k,S,j){var m=f,C=j+S;h^=-1;for(var y=j;y<C;y++)h=h>>>8^m[255&(h^k[y])];return-1^h})(0|s,c,c.length,0):(function(h,k,S,j){var m=f,C=j+S;h^=-1;for(var y=j;y<C;y++)h=h>>>8^m[255&(h^k.charCodeAt(y))];return-1^h})(0|s,c,c.length,0):0}},{"./utils":32}],5:[function(d,x,w){w.base64=!1,w.binary=!1,w.dir=!1,w.createFolders=!0,w.date=null,w.compression=null,w.compressionOptions=null,w.comment=null,w.unixPermissions=null,w.dosPermissions=null},{}],6:[function(d,x,w){var g=null;g=typeof Promise<"u"?Promise:d("lie"),x.exports={Promise:g}},{lie:37}],7:[function(d,x,w){var g=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Uint32Array<"u",f=d("pako"),c=d("./utils"),s=d("./stream/GenericWorker"),h=g?"uint8array":"array";function k(S,j){s.call(this,"FlateWorker/"+S),this._pako=null,this._pakoAction=S,this._pakoOptions=j,this.meta={}}w.magic="\b\0",c.inherits(k,s),k.prototype.processChunk=function(S){this.meta=S.meta,this._pako===null&&this._createPako(),this._pako.push(c.transformTo(h,S.data),!1)},k.prototype.flush=function(){s.prototype.flush.call(this),this._pako===null&&this._createPako(),this._pako.push([],!0)},k.prototype.cleanUp=function(){s.prototype.cleanUp.call(this),this._pako=null},k.prototype._createPako=function(){this._pako=new f[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var S=this;this._pako.onData=function(j){S.push({data:j,meta:S.meta})}},w.compressWorker=function(S){return new k("Deflate",S)},w.uncompressWorker=function(){return new k("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(d,x,w){function g(m,C){var y,N="";for(y=0;y<C;y++)N+=String.fromCharCode(255&m),m>>>=8;return N}function f(m,C,y,N,E,D){var R,A,T=m.file,L=m.compression,V=D!==h.utf8encode,Z=c.transformTo("string",D(T.name)),U=c.transformTo("string",h.utf8encode(T.name)),W=T.comment,ue=c.transformTo("string",D(W)),I=c.transformTo("string",h.utf8encode(W)),ae=U.length!==T.name.length,v=I.length!==W.length,J="",Q="",Y="",P=T.dir,ne=T.date,O={crc32:0,compressedSize:0,uncompressedSize:0};C&&!y||(O.crc32=m.crc32,O.compressedSize=m.compressedSize,O.uncompressedSize=m.uncompressedSize);var o=0;C&&(o|=8),V||!ae&&!v||(o|=2048);var _=0,K=0;P&&(_|=16),E==="UNIX"?(K=798,_|=(function(te,ye){var xe=te;return te||(xe=ye?16893:33204),(65535&xe)<<16})(T.unixPermissions,P)):(K=20,_|=(function(te){return 63&(te||0)})(T.dosPermissions)),R=ne.getUTCHours(),R<<=6,R|=ne.getUTCMinutes(),R<<=5,R|=ne.getUTCSeconds()/2,A=ne.getUTCFullYear()-1980,A<<=4,A|=ne.getUTCMonth()+1,A<<=5,A|=ne.getUTCDate(),ae&&(Q=g(1,1)+g(k(Z),4)+U,J+="up"+g(Q.length,2)+Q),v&&(Y=g(1,1)+g(k(ue),4)+I,J+="uc"+g(Y.length,2)+Y);var X="";return X+=`
\0`,X+=g(o,2),X+=L.magic,X+=g(R,2),X+=g(A,2),X+=g(O.crc32,4),X+=g(O.compressedSize,4),X+=g(O.uncompressedSize,4),X+=g(Z.length,2),X+=g(J.length,2),{fileRecord:S.LOCAL_FILE_HEADER+X+Z+J,dirRecord:S.CENTRAL_FILE_HEADER+g(K,2)+X+g(ue.length,2)+"\0\0\0\0"+g(_,4)+g(N,4)+Z+J+ue}}var c=d("../utils"),s=d("../stream/GenericWorker"),h=d("../utf8"),k=d("../crc32"),S=d("../signature");function j(m,C,y,N){s.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=C,this.zipPlatform=y,this.encodeFileName=N,this.streamFiles=m,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}c.inherits(j,s),j.prototype.push=function(m){var C=m.meta.percent||0,y=this.entriesCount,N=this._sources.length;this.accumulate?this.contentBuffer.push(m):(this.bytesWritten+=m.data.length,s.prototype.push.call(this,{data:m.data,meta:{currentFile:this.currentFile,percent:y?(C+100*(y-N-1))/y:100}}))},j.prototype.openedSource=function(m){this.currentSourceOffset=this.bytesWritten,this.currentFile=m.file.name;var C=this.streamFiles&&!m.file.dir;if(C){var y=f(m,C,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:y.fileRecord,meta:{percent:0}})}else this.accumulate=!0},j.prototype.closedSource=function(m){this.accumulate=!1;var C=this.streamFiles&&!m.file.dir,y=f(m,C,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(y.dirRecord),C)this.push({data:(function(N){return S.DATA_DESCRIPTOR+g(N.crc32,4)+g(N.compressedSize,4)+g(N.uncompressedSize,4)})(m),meta:{percent:100}});else for(this.push({data:y.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},j.prototype.flush=function(){for(var m=this.bytesWritten,C=0;C<this.dirRecords.length;C++)this.push({data:this.dirRecords[C],meta:{percent:100}});var y=this.bytesWritten-m,N=(function(E,D,R,A,T){var L=c.transformTo("string",T(A));return S.CENTRAL_DIRECTORY_END+"\0\0\0\0"+g(E,2)+g(E,2)+g(D,4)+g(R,4)+g(L.length,2)+L})(this.dirRecords.length,y,m,this.zipComment,this.encodeFileName);this.push({data:N,meta:{percent:100}})},j.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},j.prototype.registerPrevious=function(m){this._sources.push(m);var C=this;return m.on("data",function(y){C.processChunk(y)}),m.on("end",function(){C.closedSource(C.previous.streamInfo),C._sources.length?C.prepareNextSource():C.end()}),m.on("error",function(y){C.error(y)}),this},j.prototype.resume=function(){return!!s.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},j.prototype.error=function(m){var C=this._sources;if(!s.prototype.error.call(this,m))return!1;for(var y=0;y<C.length;y++)try{C[y].error(m)}catch{}return!0},j.prototype.lock=function(){s.prototype.lock.call(this);for(var m=this._sources,C=0;C<m.length;C++)m[C].lock()},x.exports=j},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(d,x,w){var g=d("../compressions"),f=d("./ZipFileWorker");w.generateWorker=function(c,s,h){var k=new f(s.streamFiles,h,s.platform,s.encodeFileName),S=0;try{c.forEach(function(j,m){S++;var C=(function(D,R){var A=D||R,T=g[A];if(!T)throw new Error(A+" is not a valid compression method !");return T})(m.options.compression,s.compression),y=m.options.compressionOptions||s.compressionOptions||{},N=m.dir,E=m.date;m._compressWorker(C,y).withStreamInfo("file",{name:j,dir:N,date:E,comment:m.comment||"",unixPermissions:m.unixPermissions,dosPermissions:m.dosPermissions}).pipe(k)}),k.entriesCount=S}catch(j){k.error(j)}return k}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(d,x,w){function g(){if(!(this instanceof g))return new g;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var f=new g;for(var c in this)typeof this[c]!="function"&&(f[c]=this[c]);return f}}(g.prototype=d("./object")).loadAsync=d("./load"),g.support=d("./support"),g.defaults=d("./defaults"),g.version="3.10.1",g.loadAsync=function(f,c){return new g().loadAsync(f,c)},g.external=d("./external"),x.exports=g},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(d,x,w){var g=d("./utils"),f=d("./external"),c=d("./utf8"),s=d("./zipEntries"),h=d("./stream/Crc32Probe"),k=d("./nodejsUtils");function S(j){return new f.Promise(function(m,C){var y=j.decompressed.getContentWorker().pipe(new h);y.on("error",function(N){C(N)}).on("end",function(){y.streamInfo.crc32!==j.decompressed.crc32?C(new Error("Corrupted zip : CRC32 mismatch")):m()}).resume()})}x.exports=function(j,m){var C=this;return m=g.extend(m||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:c.utf8decode}),k.isNode&&k.isStream(j)?f.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):g.prepareContent("the loaded zip file",j,!0,m.optimizedBinaryString,m.base64).then(function(y){var N=new s(m);return N.load(y),N}).then(function(y){var N=[f.Promise.resolve(y)],E=y.files;if(m.checkCRC32)for(var D=0;D<E.length;D++)N.push(S(E[D]));return f.Promise.all(N)}).then(function(y){for(var N=y.shift(),E=N.files,D=0;D<E.length;D++){var R=E[D],A=R.fileNameStr,T=g.resolve(R.fileNameStr);C.file(T,R.decompressed,{binary:!0,optimizedBinaryString:!0,date:R.date,dir:R.dir,comment:R.fileCommentStr.length?R.fileCommentStr:null,unixPermissions:R.unixPermissions,dosPermissions:R.dosPermissions,createFolders:m.createFolders}),R.dir||(C.file(T).unsafeOriginalName=A)}return N.zipComment.length&&(C.comment=N.zipComment),C})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(d,x,w){var g=d("../utils"),f=d("../stream/GenericWorker");function c(s,h){f.call(this,"Nodejs stream input adapter for "+s),this._upstreamEnded=!1,this._bindStream(h)}g.inherits(c,f),c.prototype._bindStream=function(s){var h=this;(this._stream=s).pause(),s.on("data",function(k){h.push({data:k,meta:{percent:0}})}).on("error",function(k){h.isPaused?this.generatedError=k:h.error(k)}).on("end",function(){h.isPaused?h._upstreamEnded=!0:h.end()})},c.prototype.pause=function(){return!!f.prototype.pause.call(this)&&(this._stream.pause(),!0)},c.prototype.resume=function(){return!!f.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},x.exports=c},{"../stream/GenericWorker":28,"../utils":32}],13:[function(d,x,w){var g=d("readable-stream").Readable;function f(c,s,h){g.call(this,s),this._helper=c;var k=this;c.on("data",function(S,j){k.push(S)||k._helper.pause(),h&&h(j)}).on("error",function(S){k.emit("error",S)}).on("end",function(){k.push(null)})}d("../utils").inherits(f,g),f.prototype._read=function(){this._helper.resume()},x.exports=f},{"../utils":32,"readable-stream":16}],14:[function(d,x,w){x.exports={isNode:typeof Buffer<"u",newBufferFrom:function(g,f){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(g,f);if(typeof g=="number")throw new Error('The "data" argument must not be a number');return new Buffer(g,f)},allocBuffer:function(g){if(Buffer.alloc)return Buffer.alloc(g);var f=new Buffer(g);return f.fill(0),f},isBuffer:function(g){return Buffer.isBuffer(g)},isStream:function(g){return g&&typeof g.on=="function"&&typeof g.pause=="function"&&typeof g.resume=="function"}}},{}],15:[function(d,x,w){function g(T,L,V){var Z,U=c.getTypeOf(L),W=c.extend(V||{},k);W.date=W.date||new Date,W.compression!==null&&(W.compression=W.compression.toUpperCase()),typeof W.unixPermissions=="string"&&(W.unixPermissions=parseInt(W.unixPermissions,8)),W.unixPermissions&&16384&W.unixPermissions&&(W.dir=!0),W.dosPermissions&&16&W.dosPermissions&&(W.dir=!0),W.dir&&(T=E(T)),W.createFolders&&(Z=N(T))&&D.call(this,Z,!0);var ue=U==="string"&&W.binary===!1&&W.base64===!1;V&&V.binary!==void 0||(W.binary=!ue),(L instanceof S&&L.uncompressedSize===0||W.dir||!L||L.length===0)&&(W.base64=!1,W.binary=!0,L="",W.compression="STORE",U="string");var I=null;I=L instanceof S||L instanceof s?L:C.isNode&&C.isStream(L)?new y(T,L):c.prepareContent(T,L,W.binary,W.optimizedBinaryString,W.base64);var ae=new j(T,I,W);this.files[T]=ae}var f=d("./utf8"),c=d("./utils"),s=d("./stream/GenericWorker"),h=d("./stream/StreamHelper"),k=d("./defaults"),S=d("./compressedObject"),j=d("./zipObject"),m=d("./generate"),C=d("./nodejsUtils"),y=d("./nodejs/NodejsStreamInputAdapter"),N=function(T){T.slice(-1)==="/"&&(T=T.substring(0,T.length-1));var L=T.lastIndexOf("/");return 0<L?T.substring(0,L):""},E=function(T){return T.slice(-1)!=="/"&&(T+="/"),T},D=function(T,L){return L=L!==void 0?L:k.createFolders,T=E(T),this.files[T]||g.call(this,T,null,{dir:!0,createFolders:L}),this.files[T]};function R(T){return Object.prototype.toString.call(T)==="[object RegExp]"}var A={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(T){var L,V,Z;for(L in this.files)Z=this.files[L],(V=L.slice(this.root.length,L.length))&&L.slice(0,this.root.length)===this.root&&T(V,Z)},filter:function(T){var L=[];return this.forEach(function(V,Z){T(V,Z)&&L.push(Z)}),L},file:function(T,L,V){if(arguments.length!==1)return T=this.root+T,g.call(this,T,L,V),this;if(R(T)){var Z=T;return this.filter(function(W,ue){return!ue.dir&&Z.test(W)})}var U=this.files[this.root+T];return U&&!U.dir?U:null},folder:function(T){if(!T)return this;if(R(T))return this.filter(function(U,W){return W.dir&&T.test(U)});var L=this.root+T,V=D.call(this,L),Z=this.clone();return Z.root=V.name,Z},remove:function(T){T=this.root+T;var L=this.files[T];if(L||(T.slice(-1)!=="/"&&(T+="/"),L=this.files[T]),L&&!L.dir)delete this.files[T];else for(var V=this.filter(function(U,W){return W.name.slice(0,T.length)===T}),Z=0;Z<V.length;Z++)delete this.files[V[Z].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(T){var L,V={};try{if((V=c.extend(T||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:f.utf8encode})).type=V.type.toLowerCase(),V.compression=V.compression.toUpperCase(),V.type==="binarystring"&&(V.type="string"),!V.type)throw new Error("No output type specified.");c.checkSupport(V.type),V.platform!=="darwin"&&V.platform!=="freebsd"&&V.platform!=="linux"&&V.platform!=="sunos"||(V.platform="UNIX"),V.platform==="win32"&&(V.platform="DOS");var Z=V.comment||this.comment||"";L=m.generateWorker(this,V,Z)}catch(U){(L=new s("error")).error(U)}return new h(L,V.type||"string",V.mimeType)},generateAsync:function(T,L){return this.generateInternalStream(T).accumulate(L)},generateNodeStream:function(T,L){return(T=T||{}).type||(T.type="nodebuffer"),this.generateInternalStream(T).toNodejsStream(L)}};x.exports=A},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(d,x,w){x.exports=d("stream")},{stream:void 0}],17:[function(d,x,w){var g=d("./DataReader");function f(c){g.call(this,c);for(var s=0;s<this.data.length;s++)c[s]=255&c[s]}d("../utils").inherits(f,g),f.prototype.byteAt=function(c){return this.data[this.zero+c]},f.prototype.lastIndexOfSignature=function(c){for(var s=c.charCodeAt(0),h=c.charCodeAt(1),k=c.charCodeAt(2),S=c.charCodeAt(3),j=this.length-4;0<=j;--j)if(this.data[j]===s&&this.data[j+1]===h&&this.data[j+2]===k&&this.data[j+3]===S)return j-this.zero;return-1},f.prototype.readAndCheckSignature=function(c){var s=c.charCodeAt(0),h=c.charCodeAt(1),k=c.charCodeAt(2),S=c.charCodeAt(3),j=this.readData(4);return s===j[0]&&h===j[1]&&k===j[2]&&S===j[3]},f.prototype.readData=function(c){if(this.checkOffset(c),c===0)return[];var s=this.data.slice(this.zero+this.index,this.zero+this.index+c);return this.index+=c,s},x.exports=f},{"../utils":32,"./DataReader":18}],18:[function(d,x,w){var g=d("../utils");function f(c){this.data=c,this.length=c.length,this.index=0,this.zero=0}f.prototype={checkOffset:function(c){this.checkIndex(this.index+c)},checkIndex:function(c){if(this.length<this.zero+c||c<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+c+"). Corrupted zip ?")},setIndex:function(c){this.checkIndex(c),this.index=c},skip:function(c){this.setIndex(this.index+c)},byteAt:function(){},readInt:function(c){var s,h=0;for(this.checkOffset(c),s=this.index+c-1;s>=this.index;s--)h=(h<<8)+this.byteAt(s);return this.index+=c,h},readString:function(c){return g.transformTo("string",this.readData(c))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var c=this.readInt(4);return new Date(Date.UTC(1980+(c>>25&127),(c>>21&15)-1,c>>16&31,c>>11&31,c>>5&63,(31&c)<<1))}},x.exports=f},{"../utils":32}],19:[function(d,x,w){var g=d("./Uint8ArrayReader");function f(c){g.call(this,c)}d("../utils").inherits(f,g),f.prototype.readData=function(c){this.checkOffset(c);var s=this.data.slice(this.zero+this.index,this.zero+this.index+c);return this.index+=c,s},x.exports=f},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(d,x,w){var g=d("./DataReader");function f(c){g.call(this,c)}d("../utils").inherits(f,g),f.prototype.byteAt=function(c){return this.data.charCodeAt(this.zero+c)},f.prototype.lastIndexOfSignature=function(c){return this.data.lastIndexOf(c)-this.zero},f.prototype.readAndCheckSignature=function(c){return c===this.readData(4)},f.prototype.readData=function(c){this.checkOffset(c);var s=this.data.slice(this.zero+this.index,this.zero+this.index+c);return this.index+=c,s},x.exports=f},{"../utils":32,"./DataReader":18}],21:[function(d,x,w){var g=d("./ArrayReader");function f(c){g.call(this,c)}d("../utils").inherits(f,g),f.prototype.readData=function(c){if(this.checkOffset(c),c===0)return new Uint8Array(0);var s=this.data.subarray(this.zero+this.index,this.zero+this.index+c);return this.index+=c,s},x.exports=f},{"../utils":32,"./ArrayReader":17}],22:[function(d,x,w){var g=d("../utils"),f=d("../support"),c=d("./ArrayReader"),s=d("./StringReader"),h=d("./NodeBufferReader"),k=d("./Uint8ArrayReader");x.exports=function(S){var j=g.getTypeOf(S);return g.checkSupport(j),j!=="string"||f.uint8array?j==="nodebuffer"?new h(S):f.uint8array?new k(g.transformTo("uint8array",S)):new c(g.transformTo("array",S)):new s(S)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(d,x,w){w.LOCAL_FILE_HEADER="PK",w.CENTRAL_FILE_HEADER="PK",w.CENTRAL_DIRECTORY_END="PK",w.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK\x07",w.ZIP64_CENTRAL_DIRECTORY_END="PK",w.DATA_DESCRIPTOR="PK\x07\b"},{}],24:[function(d,x,w){var g=d("./GenericWorker"),f=d("../utils");function c(s){g.call(this,"ConvertWorker to "+s),this.destType=s}f.inherits(c,g),c.prototype.processChunk=function(s){this.push({data:f.transformTo(this.destType,s.data),meta:s.meta})},x.exports=c},{"../utils":32,"./GenericWorker":28}],25:[function(d,x,w){var g=d("./GenericWorker"),f=d("../crc32");function c(){g.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}d("../utils").inherits(c,g),c.prototype.processChunk=function(s){this.streamInfo.crc32=f(s.data,this.streamInfo.crc32||0),this.push(s)},x.exports=c},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(d,x,w){var g=d("../utils"),f=d("./GenericWorker");function c(s){f.call(this,"DataLengthProbe for "+s),this.propName=s,this.withStreamInfo(s,0)}g.inherits(c,f),c.prototype.processChunk=function(s){if(s){var h=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=h+s.data.length}f.prototype.processChunk.call(this,s)},x.exports=c},{"../utils":32,"./GenericWorker":28}],27:[function(d,x,w){var g=d("../utils"),f=d("./GenericWorker");function c(s){f.call(this,"DataWorker");var h=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,s.then(function(k){h.dataIsReady=!0,h.data=k,h.max=k&&k.length||0,h.type=g.getTypeOf(k),h.isPaused||h._tickAndRepeat()},function(k){h.error(k)})}g.inherits(c,f),c.prototype.cleanUp=function(){f.prototype.cleanUp.call(this),this.data=null},c.prototype.resume=function(){return!!f.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,g.delay(this._tickAndRepeat,[],this)),!0)},c.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(g.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},c.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var s=null,h=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":s=this.data.substring(this.index,h);break;case"uint8array":s=this.data.subarray(this.index,h);break;case"array":case"nodebuffer":s=this.data.slice(this.index,h)}return this.index=h,this.push({data:s,meta:{percent:this.max?this.index/this.max*100:0}})},x.exports=c},{"../utils":32,"./GenericWorker":28}],28:[function(d,x,w){function g(f){this.name=f||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}g.prototype={push:function(f){this.emit("data",f)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(f){this.emit("error",f)}return!0},error:function(f){return!this.isFinished&&(this.isPaused?this.generatedError=f:(this.isFinished=!0,this.emit("error",f),this.previous&&this.previous.error(f),this.cleanUp()),!0)},on:function(f,c){return this._listeners[f].push(c),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(f,c){if(this._listeners[f])for(var s=0;s<this._listeners[f].length;s++)this._listeners[f][s].call(this,c)},pipe:function(f){return f.registerPrevious(this)},registerPrevious:function(f){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=f.streamInfo,this.mergeStreamInfo(),this.previous=f;var c=this;return f.on("data",function(s){c.processChunk(s)}),f.on("end",function(){c.end()}),f.on("error",function(s){c.error(s)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var f=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),f=!0),this.previous&&this.previous.resume(),!f},flush:function(){},processChunk:function(f){this.push(f)},withStreamInfo:function(f,c){return this.extraStreamInfo[f]=c,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var f in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,f)&&(this.streamInfo[f]=this.extraStreamInfo[f])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var f="Worker "+this.name;return this.previous?this.previous+" -> "+f:f}},x.exports=g},{}],29:[function(d,x,w){var g=d("../utils"),f=d("./ConvertWorker"),c=d("./GenericWorker"),s=d("../base64"),h=d("../support"),k=d("../external"),S=null;if(h.nodestream)try{S=d("../nodejs/NodejsStreamOutputAdapter")}catch{}function j(C,y){return new k.Promise(function(N,E){var D=[],R=C._internalType,A=C._outputType,T=C._mimeType;C.on("data",function(L,V){D.push(L),y&&y(V)}).on("error",function(L){D=[],E(L)}).on("end",function(){try{var L=(function(V,Z,U){switch(V){case"blob":return g.newBlob(g.transformTo("arraybuffer",Z),U);case"base64":return s.encode(Z);default:return g.transformTo(V,Z)}})(A,(function(V,Z){var U,W=0,ue=null,I=0;for(U=0;U<Z.length;U++)I+=Z[U].length;switch(V){case"string":return Z.join("");case"array":return Array.prototype.concat.apply([],Z);case"uint8array":for(ue=new Uint8Array(I),U=0;U<Z.length;U++)ue.set(Z[U],W),W+=Z[U].length;return ue;case"nodebuffer":return Buffer.concat(Z);default:throw new Error("concat : unsupported type '"+V+"'")}})(R,D),T);N(L)}catch(V){E(V)}D=[]}).resume()})}function m(C,y,N){var E=y;switch(y){case"blob":case"arraybuffer":E="uint8array";break;case"base64":E="string"}try{this._internalType=E,this._outputType=y,this._mimeType=N,g.checkSupport(E),this._worker=C.pipe(new f(E)),C.lock()}catch(D){this._worker=new c("error"),this._worker.error(D)}}m.prototype={accumulate:function(C){return j(this,C)},on:function(C,y){var N=this;return C==="data"?this._worker.on(C,function(E){y.call(N,E.data,E.meta)}):this._worker.on(C,function(){g.delay(y,arguments,N)}),this},resume:function(){return g.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(C){if(g.checkSupport("nodestream"),this._outputType!=="nodebuffer")throw new Error(this._outputType+" is not supported by this method");return new S(this,{objectMode:this._outputType!=="nodebuffer"},C)}},x.exports=m},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(d,x,w){if(w.base64=!0,w.array=!0,w.string=!0,w.arraybuffer=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u",w.nodebuffer=typeof Buffer<"u",w.uint8array=typeof Uint8Array<"u",typeof ArrayBuffer>"u")w.blob=!1;else{var g=new ArrayBuffer(0);try{w.blob=new Blob([g],{type:"application/zip"}).size===0}catch{try{var f=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);f.append(g),w.blob=f.getBlob("application/zip").size===0}catch{w.blob=!1}}}try{w.nodestream=!!d("readable-stream").Readable}catch{w.nodestream=!1}},{"readable-stream":16}],31:[function(d,x,w){for(var g=d("./utils"),f=d("./support"),c=d("./nodejsUtils"),s=d("./stream/GenericWorker"),h=new Array(256),k=0;k<256;k++)h[k]=252<=k?6:248<=k?5:240<=k?4:224<=k?3:192<=k?2:1;h[254]=h[254]=1;function S(){s.call(this,"utf-8 decode"),this.leftOver=null}function j(){s.call(this,"utf-8 encode")}w.utf8encode=function(m){return f.nodebuffer?c.newBufferFrom(m,"utf-8"):(function(C){var y,N,E,D,R,A=C.length,T=0;for(D=0;D<A;D++)(64512&(N=C.charCodeAt(D)))==55296&&D+1<A&&(64512&(E=C.charCodeAt(D+1)))==56320&&(N=65536+(N-55296<<10)+(E-56320),D++),T+=N<128?1:N<2048?2:N<65536?3:4;for(y=f.uint8array?new Uint8Array(T):new Array(T),D=R=0;R<T;D++)(64512&(N=C.charCodeAt(D)))==55296&&D+1<A&&(64512&(E=C.charCodeAt(D+1)))==56320&&(N=65536+(N-55296<<10)+(E-56320),D++),N<128?y[R++]=N:(N<2048?y[R++]=192|N>>>6:(N<65536?y[R++]=224|N>>>12:(y[R++]=240|N>>>18,y[R++]=128|N>>>12&63),y[R++]=128|N>>>6&63),y[R++]=128|63&N);return y})(m)},w.utf8decode=function(m){return f.nodebuffer?g.transformTo("nodebuffer",m).toString("utf-8"):(function(C){var y,N,E,D,R=C.length,A=new Array(2*R);for(y=N=0;y<R;)if((E=C[y++])<128)A[N++]=E;else if(4<(D=h[E]))A[N++]=65533,y+=D-1;else{for(E&=D===2?31:D===3?15:7;1<D&&y<R;)E=E<<6|63&C[y++],D--;1<D?A[N++]=65533:E<65536?A[N++]=E:(E-=65536,A[N++]=55296|E>>10&1023,A[N++]=56320|1023&E)}return A.length!==N&&(A.subarray?A=A.subarray(0,N):A.length=N),g.applyFromCharCode(A)})(m=g.transformTo(f.uint8array?"uint8array":"array",m))},g.inherits(S,s),S.prototype.processChunk=function(m){var C=g.transformTo(f.uint8array?"uint8array":"array",m.data);if(this.leftOver&&this.leftOver.length){if(f.uint8array){var y=C;(C=new Uint8Array(y.length+this.leftOver.length)).set(this.leftOver,0),C.set(y,this.leftOver.length)}else C=this.leftOver.concat(C);this.leftOver=null}var N=(function(D,R){var A;for((R=R||D.length)>D.length&&(R=D.length),A=R-1;0<=A&&(192&D[A])==128;)A--;return A<0||A===0?R:A+h[D[A]]>R?A:R})(C),E=C;N!==C.length&&(f.uint8array?(E=C.subarray(0,N),this.leftOver=C.subarray(N,C.length)):(E=C.slice(0,N),this.leftOver=C.slice(N,C.length))),this.push({data:w.utf8decode(E),meta:m.meta})},S.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:w.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},w.Utf8DecodeWorker=S,g.inherits(j,s),j.prototype.processChunk=function(m){this.push({data:w.utf8encode(m.data),meta:m.meta})},w.Utf8EncodeWorker=j},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(d,x,w){var g=d("./support"),f=d("./base64"),c=d("./nodejsUtils"),s=d("./external");function h(y){return y}function k(y,N){for(var E=0;E<y.length;++E)N[E]=255&y.charCodeAt(E);return N}d("setimmediate"),w.newBlob=function(y,N){w.checkSupport("blob");try{return new Blob([y],{type:N})}catch{try{var E=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return E.append(y),E.getBlob(N)}catch{throw new Error("Bug : can't construct the Blob.")}}};var S={stringifyByChunk:function(y,N,E){var D=[],R=0,A=y.length;if(A<=E)return String.fromCharCode.apply(null,y);for(;R<A;)N==="array"||N==="nodebuffer"?D.push(String.fromCharCode.apply(null,y.slice(R,Math.min(R+E,A)))):D.push(String.fromCharCode.apply(null,y.subarray(R,Math.min(R+E,A)))),R+=E;return D.join("")},stringifyByChar:function(y){for(var N="",E=0;E<y.length;E++)N+=String.fromCharCode(y[E]);return N},applyCanBeUsed:{uint8array:(function(){try{return g.uint8array&&String.fromCharCode.apply(null,new Uint8Array(1)).length===1}catch{return!1}})(),nodebuffer:(function(){try{return g.nodebuffer&&String.fromCharCode.apply(null,c.allocBuffer(1)).length===1}catch{return!1}})()}};function j(y){var N=65536,E=w.getTypeOf(y),D=!0;if(E==="uint8array"?D=S.applyCanBeUsed.uint8array:E==="nodebuffer"&&(D=S.applyCanBeUsed.nodebuffer),D)for(;1<N;)try{return S.stringifyByChunk(y,E,N)}catch{N=Math.floor(N/2)}return S.stringifyByChar(y)}function m(y,N){for(var E=0;E<y.length;E++)N[E]=y[E];return N}w.applyFromCharCode=j;var C={};C.string={string:h,array:function(y){return k(y,new Array(y.length))},arraybuffer:function(y){return C.string.uint8array(y).buffer},uint8array:function(y){return k(y,new Uint8Array(y.length))},nodebuffer:function(y){return k(y,c.allocBuffer(y.length))}},C.array={string:j,array:h,arraybuffer:function(y){return new Uint8Array(y).buffer},uint8array:function(y){return new Uint8Array(y)},nodebuffer:function(y){return c.newBufferFrom(y)}},C.arraybuffer={string:function(y){return j(new Uint8Array(y))},array:function(y){return m(new Uint8Array(y),new Array(y.byteLength))},arraybuffer:h,uint8array:function(y){return new Uint8Array(y)},nodebuffer:function(y){return c.newBufferFrom(new Uint8Array(y))}},C.uint8array={string:j,array:function(y){return m(y,new Array(y.length))},arraybuffer:function(y){return y.buffer},uint8array:h,nodebuffer:function(y){return c.newBufferFrom(y)}},C.nodebuffer={string:j,array:function(y){return m(y,new Array(y.length))},arraybuffer:function(y){return C.nodebuffer.uint8array(y).buffer},uint8array:function(y){return m(y,new Uint8Array(y.length))},nodebuffer:h},w.transformTo=function(y,N){if(N=N||"",!y)return N;w.checkSupport(y);var E=w.getTypeOf(N);return C[E][y](N)},w.resolve=function(y){for(var N=y.split("/"),E=[],D=0;D<N.length;D++){var R=N[D];R==="."||R===""&&D!==0&&D!==N.length-1||(R===".."?E.pop():E.push(R))}return E.join("/")},w.getTypeOf=function(y){return typeof y=="string"?"string":Object.prototype.toString.call(y)==="[object Array]"?"array":g.nodebuffer&&c.isBuffer(y)?"nodebuffer":g.uint8array&&y instanceof Uint8Array?"uint8array":g.arraybuffer&&y instanceof ArrayBuffer?"arraybuffer":void 0},w.checkSupport=function(y){if(!g[y.toLowerCase()])throw new Error(y+" is not supported by this platform")},w.MAX_VALUE_16BITS=65535,w.MAX_VALUE_32BITS=-1,w.pretty=function(y){var N,E,D="";for(E=0;E<(y||"").length;E++)D+="\\x"+((N=y.charCodeAt(E))<16?"0":"")+N.toString(16).toUpperCase();return D},w.delay=function(y,N,E){setImmediate(function(){y.apply(E||null,N||[])})},w.inherits=function(y,N){function E(){}E.prototype=N.prototype,y.prototype=new E},w.extend=function(){var y,N,E={};for(y=0;y<arguments.length;y++)for(N in arguments[y])Object.prototype.hasOwnProperty.call(arguments[y],N)&&E[N]===void 0&&(E[N]=arguments[y][N]);return E},w.prepareContent=function(y,N,E,D,R){return s.Promise.resolve(N).then(function(A){return g.blob&&(A instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(A))!==-1)&&typeof FileReader<"u"?new s.Promise(function(T,L){var V=new FileReader;V.onload=function(Z){T(Z.target.result)},V.onerror=function(Z){L(Z.target.error)},V.readAsArrayBuffer(A)}):A}).then(function(A){var T=w.getTypeOf(A);return T?(T==="arraybuffer"?A=w.transformTo("uint8array",A):T==="string"&&(R?A=f.decode(A):E&&D!==!0&&(A=(function(L){return k(L,g.uint8array?new Uint8Array(L.length):new Array(L.length))})(A))),A):s.Promise.reject(new Error("Can't read the data of '"+y+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(d,x,w){var g=d("./reader/readerFor"),f=d("./utils"),c=d("./signature"),s=d("./zipEntry"),h=d("./support");function k(S){this.files=[],this.loadOptions=S}k.prototype={checkSignature:function(S){if(!this.reader.readAndCheckSignature(S)){this.reader.index-=4;var j=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+f.pretty(j)+", expected "+f.pretty(S)+")")}},isSignature:function(S,j){var m=this.reader.index;this.reader.setIndex(S);var C=this.reader.readString(4)===j;return this.reader.setIndex(m),C},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var S=this.reader.readData(this.zipCommentLength),j=h.uint8array?"uint8array":"array",m=f.transformTo(j,S);this.zipComment=this.loadOptions.decodeFileName(m)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var S,j,m,C=this.zip64EndOfCentralSize-44;0<C;)S=this.reader.readInt(2),j=this.reader.readInt(4),m=this.reader.readData(j),this.zip64ExtensibleData[S]={id:S,length:j,value:m}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var S,j;for(S=0;S<this.files.length;S++)j=this.files[S],this.reader.setIndex(j.localHeaderOffset),this.checkSignature(c.LOCAL_FILE_HEADER),j.readLocalPart(this.reader),j.handleUTF8(),j.processAttributes()},readCentralDir:function(){var S;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(c.CENTRAL_FILE_HEADER);)(S=new s({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(S);if(this.centralDirRecords!==this.files.length&&this.centralDirRecords!==0&&this.files.length===0)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var S=this.reader.lastIndexOfSignature(c.CENTRAL_DIRECTORY_END);if(S<0)throw this.isSignature(0,c.LOCAL_FILE_HEADER)?new Error("Corrupted zip: can't find end of central directory"):new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");this.reader.setIndex(S);var j=S;if(this.checkSignature(c.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===f.MAX_VALUE_16BITS||this.diskWithCentralDirStart===f.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===f.MAX_VALUE_16BITS||this.centralDirRecords===f.MAX_VALUE_16BITS||this.centralDirSize===f.MAX_VALUE_32BITS||this.centralDirOffset===f.MAX_VALUE_32BITS){if(this.zip64=!0,(S=this.reader.lastIndexOfSignature(c.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(S),this.checkSignature(c.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,c.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(c.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(c.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var m=this.centralDirOffset+this.centralDirSize;this.zip64&&(m+=20,m+=12+this.zip64EndOfCentralSize);var C=j-m;if(0<C)this.isSignature(j,c.CENTRAL_FILE_HEADER)||(this.reader.zero=C);else if(C<0)throw new Error("Corrupted zip: missing "+Math.abs(C)+" bytes.")},prepareReader:function(S){this.reader=g(S)},load:function(S){this.prepareReader(S),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},x.exports=k},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(d,x,w){var g=d("./reader/readerFor"),f=d("./utils"),c=d("./compressedObject"),s=d("./crc32"),h=d("./utf8"),k=d("./compressions"),S=d("./support");function j(m,C){this.options=m,this.loadOptions=C}j.prototype={isEncrypted:function(){return(1&this.bitFlag)==1},useUTF8:function(){return(2048&this.bitFlag)==2048},readLocalPart:function(m){var C,y;if(m.skip(22),this.fileNameLength=m.readInt(2),y=m.readInt(2),this.fileName=m.readData(this.fileNameLength),m.skip(y),this.compressedSize===-1||this.uncompressedSize===-1)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if((C=(function(N){for(var E in k)if(Object.prototype.hasOwnProperty.call(k,E)&&k[E].magic===N)return k[E];return null})(this.compressionMethod))===null)throw new Error("Corrupted zip : compression "+f.pretty(this.compressionMethod)+" unknown (inner file : "+f.transformTo("string",this.fileName)+")");this.decompressed=new c(this.compressedSize,this.uncompressedSize,this.crc32,C,m.readData(this.compressedSize))},readCentralPart:function(m){this.versionMadeBy=m.readInt(2),m.skip(2),this.bitFlag=m.readInt(2),this.compressionMethod=m.readString(2),this.date=m.readDate(),this.crc32=m.readInt(4),this.compressedSize=m.readInt(4),this.uncompressedSize=m.readInt(4);var C=m.readInt(2);if(this.extraFieldsLength=m.readInt(2),this.fileCommentLength=m.readInt(2),this.diskNumberStart=m.readInt(2),this.internalFileAttributes=m.readInt(2),this.externalFileAttributes=m.readInt(4),this.localHeaderOffset=m.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");m.skip(C),this.readExtraFields(m),this.parseZIP64ExtraField(m),this.fileComment=m.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var m=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),m==0&&(this.dosPermissions=63&this.externalFileAttributes),m==3&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||this.fileNameStr.slice(-1)!=="/"||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var m=g(this.extraFields[1].value);this.uncompressedSize===f.MAX_VALUE_32BITS&&(this.uncompressedSize=m.readInt(8)),this.compressedSize===f.MAX_VALUE_32BITS&&(this.compressedSize=m.readInt(8)),this.localHeaderOffset===f.MAX_VALUE_32BITS&&(this.localHeaderOffset=m.readInt(8)),this.diskNumberStart===f.MAX_VALUE_32BITS&&(this.diskNumberStart=m.readInt(4))}},readExtraFields:function(m){var C,y,N,E=m.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});m.index+4<E;)C=m.readInt(2),y=m.readInt(2),N=m.readData(y),this.extraFields[C]={id:C,length:y,value:N};m.setIndex(E)},handleUTF8:function(){var m=S.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=h.utf8decode(this.fileName),this.fileCommentStr=h.utf8decode(this.fileComment);else{var C=this.findExtraFieldUnicodePath();if(C!==null)this.fileNameStr=C;else{var y=f.transformTo(m,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(y)}var N=this.findExtraFieldUnicodeComment();if(N!==null)this.fileCommentStr=N;else{var E=f.transformTo(m,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(E)}}},findExtraFieldUnicodePath:function(){var m=this.extraFields[28789];if(m){var C=g(m.value);return C.readInt(1)!==1||s(this.fileName)!==C.readInt(4)?null:h.utf8decode(C.readData(m.length-5))}return null},findExtraFieldUnicodeComment:function(){var m=this.extraFields[25461];if(m){var C=g(m.value);return C.readInt(1)!==1||s(this.fileComment)!==C.readInt(4)?null:h.utf8decode(C.readData(m.length-5))}return null}},x.exports=j},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(d,x,w){function g(C,y,N){this.name=C,this.dir=N.dir,this.date=N.date,this.comment=N.comment,this.unixPermissions=N.unixPermissions,this.dosPermissions=N.dosPermissions,this._data=y,this._dataBinary=N.binary,this.options={compression:N.compression,compressionOptions:N.compressionOptions}}var f=d("./stream/StreamHelper"),c=d("./stream/DataWorker"),s=d("./utf8"),h=d("./compressedObject"),k=d("./stream/GenericWorker");g.prototype={internalStream:function(C){var y=null,N="string";try{if(!C)throw new Error("No output type specified.");var E=(N=C.toLowerCase())==="string"||N==="text";N!=="binarystring"&&N!=="text"||(N="string"),y=this._decompressWorker();var D=!this._dataBinary;D&&!E&&(y=y.pipe(new s.Utf8EncodeWorker)),!D&&E&&(y=y.pipe(new s.Utf8DecodeWorker))}catch(R){(y=new k("error")).error(R)}return new f(y,N,"")},async:function(C,y){return this.internalStream(C).accumulate(y)},nodeStream:function(C,y){return this.internalStream(C||"nodebuffer").toNodejsStream(y)},_compressWorker:function(C,y){if(this._data instanceof h&&this._data.compression.magic===C.magic)return this._data.getCompressedWorker();var N=this._decompressWorker();return this._dataBinary||(N=N.pipe(new s.Utf8EncodeWorker)),h.createWorkerFrom(N,C,y)},_decompressWorker:function(){return this._data instanceof h?this._data.getContentWorker():this._data instanceof k?this._data:new c(this._data)}};for(var S=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],j=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},m=0;m<S.length;m++)g.prototype[S[m]]=j;x.exports=g},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(d,x,w){(function(g){var f,c,s=g.MutationObserver||g.WebKitMutationObserver;if(s){var h=0,k=new s(C),S=g.document.createTextNode("");k.observe(S,{characterData:!0}),f=function(){S.data=h=++h%2}}else if(g.setImmediate||g.MessageChannel===void 0)f="document"in g&&"onreadystatechange"in g.document.createElement("script")?function(){var y=g.document.createElement("script");y.onreadystatechange=function(){C(),y.onreadystatechange=null,y.parentNode.removeChild(y),y=null},g.document.documentElement.appendChild(y)}:function(){setTimeout(C,0)};else{var j=new g.MessageChannel;j.port1.onmessage=C,f=function(){j.port2.postMessage(0)}}var m=[];function C(){var y,N;c=!0;for(var E=m.length;E;){for(N=m,m=[],y=-1;++y<E;)N[y]();E=m.length}c=!1}x.exports=function(y){m.push(y)!==1||c||f()}}).call(this,typeof El<"u"?El:typeof self<"u"?self:typeof window<"u"?window:{})},{}],37:[function(d,x,w){var g=d("immediate");function f(){}var c={},s=["REJECTED"],h=["FULFILLED"],k=["PENDING"];function S(E){if(typeof E!="function")throw new TypeError("resolver must be a function");this.state=k,this.queue=[],this.outcome=void 0,E!==f&&y(this,E)}function j(E,D,R){this.promise=E,typeof D=="function"&&(this.onFulfilled=D,this.callFulfilled=this.otherCallFulfilled),typeof R=="function"&&(this.onRejected=R,this.callRejected=this.otherCallRejected)}function m(E,D,R){g(function(){var A;try{A=D(R)}catch(T){return c.reject(E,T)}A===E?c.reject(E,new TypeError("Cannot resolve promise with itself")):c.resolve(E,A)})}function C(E){var D=E&&E.then;if(E&&(typeof E=="object"||typeof E=="function")&&typeof D=="function")return function(){D.apply(E,arguments)}}function y(E,D){var R=!1;function A(V){R||(R=!0,c.reject(E,V))}function T(V){R||(R=!0,c.resolve(E,V))}var L=N(function(){D(T,A)});L.status==="error"&&A(L.value)}function N(E,D){var R={};try{R.value=E(D),R.status="success"}catch(A){R.status="error",R.value=A}return R}(x.exports=S).prototype.finally=function(E){if(typeof E!="function")return this;var D=this.constructor;return this.then(function(R){return D.resolve(E()).then(function(){return R})},function(R){return D.resolve(E()).then(function(){throw R})})},S.prototype.catch=function(E){return this.then(null,E)},S.prototype.then=function(E,D){if(typeof E!="function"&&this.state===h||typeof D!="function"&&this.state===s)return this;var R=new this.constructor(f);return this.state!==k?m(R,this.state===h?E:D,this.outcome):this.queue.push(new j(R,E,D)),R},j.prototype.callFulfilled=function(E){c.resolve(this.promise,E)},j.prototype.otherCallFulfilled=function(E){m(this.promise,this.onFulfilled,E)},j.prototype.callRejected=function(E){c.reject(this.promise,E)},j.prototype.otherCallRejected=function(E){m(this.promise,this.onRejected,E)},c.resolve=function(E,D){var R=N(C,D);if(R.status==="error")return c.reject(E,R.value);var A=R.value;if(A)y(E,A);else{E.state=h,E.outcome=D;for(var T=-1,L=E.queue.length;++T<L;)E.queue[T].callFulfilled(D)}return E},c.reject=function(E,D){E.state=s,E.outcome=D;for(var R=-1,A=E.queue.length;++R<A;)E.queue[R].callRejected(D);return E},S.resolve=function(E){return E instanceof this?E:c.resolve(new this(f),E)},S.reject=function(E){var D=new this(f);return c.reject(D,E)},S.all=function(E){var D=this;if(Object.prototype.toString.call(E)!=="[object Array]")return this.reject(new TypeError("must be an array"));var R=E.length,A=!1;if(!R)return this.resolve([]);for(var T=new Array(R),L=0,V=-1,Z=new this(f);++V<R;)U(E[V],V);return Z;function U(W,ue){D.resolve(W).then(function(I){T[ue]=I,++L!==R||A||(A=!0,c.resolve(Z,T))},function(I){A||(A=!0,c.reject(Z,I))})}},S.race=function(E){var D=this;if(Object.prototype.toString.call(E)!=="[object Array]")return this.reject(new TypeError("must be an array"));var R=E.length,A=!1;if(!R)return this.resolve([]);for(var T=-1,L=new this(f);++T<R;)V=E[T],D.resolve(V).then(function(Z){A||(A=!0,c.resolve(L,Z))},function(Z){A||(A=!0,c.reject(L,Z))});var V;return L}},{immediate:36}],38:[function(d,x,w){var g={};(0,d("./lib/utils/common").assign)(g,d("./lib/deflate"),d("./lib/inflate"),d("./lib/zlib/constants")),x.exports=g},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(d,x,w){var g=d("./zlib/deflate"),f=d("./utils/common"),c=d("./utils/strings"),s=d("./zlib/messages"),h=d("./zlib/zstream"),k=Object.prototype.toString,S=0,j=-1,m=0,C=8;function y(E){if(!(this instanceof y))return new y(E);this.options=f.assign({level:j,method:C,chunkSize:16384,windowBits:15,memLevel:8,strategy:m,to:""},E||{});var D=this.options;D.raw&&0<D.windowBits?D.windowBits=-D.windowBits:D.gzip&&0<D.windowBits&&D.windowBits<16&&(D.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new h,this.strm.avail_out=0;var R=g.deflateInit2(this.strm,D.level,D.method,D.windowBits,D.memLevel,D.strategy);if(R!==S)throw new Error(s[R]);if(D.header&&g.deflateSetHeader(this.strm,D.header),D.dictionary){var A;if(A=typeof D.dictionary=="string"?c.string2buf(D.dictionary):k.call(D.dictionary)==="[object ArrayBuffer]"?new Uint8Array(D.dictionary):D.dictionary,(R=g.deflateSetDictionary(this.strm,A))!==S)throw new Error(s[R]);this._dict_set=!0}}function N(E,D){var R=new y(D);if(R.push(E,!0),R.err)throw R.msg||s[R.err];return R.result}y.prototype.push=function(E,D){var R,A,T=this.strm,L=this.options.chunkSize;if(this.ended)return!1;A=D===~~D?D:D===!0?4:0,typeof E=="string"?T.input=c.string2buf(E):k.call(E)==="[object ArrayBuffer]"?T.input=new Uint8Array(E):T.input=E,T.next_in=0,T.avail_in=T.input.length;do{if(T.avail_out===0&&(T.output=new f.Buf8(L),T.next_out=0,T.avail_out=L),(R=g.deflate(T,A))!==1&&R!==S)return this.onEnd(R),!(this.ended=!0);T.avail_out!==0&&(T.avail_in!==0||A!==4&&A!==2)||(this.options.to==="string"?this.onData(c.buf2binstring(f.shrinkBuf(T.output,T.next_out))):this.onData(f.shrinkBuf(T.output,T.next_out)))}while((0<T.avail_in||T.avail_out===0)&&R!==1);return A===4?(R=g.deflateEnd(this.strm),this.onEnd(R),this.ended=!0,R===S):A!==2||(this.onEnd(S),!(T.avail_out=0))},y.prototype.onData=function(E){this.chunks.push(E)},y.prototype.onEnd=function(E){E===S&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=f.flattenChunks(this.chunks)),this.chunks=[],this.err=E,this.msg=this.strm.msg},w.Deflate=y,w.deflate=N,w.deflateRaw=function(E,D){return(D=D||{}).raw=!0,N(E,D)},w.gzip=function(E,D){return(D=D||{}).gzip=!0,N(E,D)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(d,x,w){var g=d("./zlib/inflate"),f=d("./utils/common"),c=d("./utils/strings"),s=d("./zlib/constants"),h=d("./zlib/messages"),k=d("./zlib/zstream"),S=d("./zlib/gzheader"),j=Object.prototype.toString;function m(y){if(!(this instanceof m))return new m(y);this.options=f.assign({chunkSize:16384,windowBits:0,to:""},y||{});var N=this.options;N.raw&&0<=N.windowBits&&N.windowBits<16&&(N.windowBits=-N.windowBits,N.windowBits===0&&(N.windowBits=-15)),!(0<=N.windowBits&&N.windowBits<16)||y&&y.windowBits||(N.windowBits+=32),15<N.windowBits&&N.windowBits<48&&(15&N.windowBits)==0&&(N.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new k,this.strm.avail_out=0;var E=g.inflateInit2(this.strm,N.windowBits);if(E!==s.Z_OK)throw new Error(h[E]);this.header=new S,g.inflateGetHeader(this.strm,this.header)}function C(y,N){var E=new m(N);if(E.push(y,!0),E.err)throw E.msg||h[E.err];return E.result}m.prototype.push=function(y,N){var E,D,R,A,T,L,V=this.strm,Z=this.options.chunkSize,U=this.options.dictionary,W=!1;if(this.ended)return!1;D=N===~~N?N:N===!0?s.Z_FINISH:s.Z_NO_FLUSH,typeof y=="string"?V.input=c.binstring2buf(y):j.call(y)==="[object ArrayBuffer]"?V.input=new Uint8Array(y):V.input=y,V.next_in=0,V.avail_in=V.input.length;do{if(V.avail_out===0&&(V.output=new f.Buf8(Z),V.next_out=0,V.avail_out=Z),(E=g.inflate(V,s.Z_NO_FLUSH))===s.Z_NEED_DICT&&U&&(L=typeof U=="string"?c.string2buf(U):j.call(U)==="[object ArrayBuffer]"?new Uint8Array(U):U,E=g.inflateSetDictionary(this.strm,L)),E===s.Z_BUF_ERROR&&W===!0&&(E=s.Z_OK,W=!1),E!==s.Z_STREAM_END&&E!==s.Z_OK)return this.onEnd(E),!(this.ended=!0);V.next_out&&(V.avail_out!==0&&E!==s.Z_STREAM_END&&(V.avail_in!==0||D!==s.Z_FINISH&&D!==s.Z_SYNC_FLUSH)||(this.options.to==="string"?(R=c.utf8border(V.output,V.next_out),A=V.next_out-R,T=c.buf2string(V.output,R),V.next_out=A,V.avail_out=Z-A,A&&f.arraySet(V.output,V.output,R,A,0),this.onData(T)):this.onData(f.shrinkBuf(V.output,V.next_out)))),V.avail_in===0&&V.avail_out===0&&(W=!0)}while((0<V.avail_in||V.avail_out===0)&&E!==s.Z_STREAM_END);return E===s.Z_STREAM_END&&(D=s.Z_FINISH),D===s.Z_FINISH?(E=g.inflateEnd(this.strm),this.onEnd(E),this.ended=!0,E===s.Z_OK):D!==s.Z_SYNC_FLUSH||(this.onEnd(s.Z_OK),!(V.avail_out=0))},m.prototype.onData=function(y){this.chunks.push(y)},m.prototype.onEnd=function(y){y===s.Z_OK&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=f.flattenChunks(this.chunks)),this.chunks=[],this.err=y,this.msg=this.strm.msg},w.Inflate=m,w.inflate=C,w.inflateRaw=function(y,N){return(N=N||{}).raw=!0,C(y,N)},w.ungzip=C},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(d,x,w){var g=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Int32Array<"u";w.assign=function(s){for(var h=Array.prototype.slice.call(arguments,1);h.length;){var k=h.shift();if(k){if(typeof k!="object")throw new TypeError(k+"must be non-object");for(var S in k)k.hasOwnProperty(S)&&(s[S]=k[S])}}return s},w.shrinkBuf=function(s,h){return s.length===h?s:s.subarray?s.subarray(0,h):(s.length=h,s)};var f={arraySet:function(s,h,k,S,j){if(h.subarray&&s.subarray)s.set(h.subarray(k,k+S),j);else for(var m=0;m<S;m++)s[j+m]=h[k+m]},flattenChunks:function(s){var h,k,S,j,m,C;for(h=S=0,k=s.length;h<k;h++)S+=s[h].length;for(C=new Uint8Array(S),h=j=0,k=s.length;h<k;h++)m=s[h],C.set(m,j),j+=m.length;return C}},c={arraySet:function(s,h,k,S,j){for(var m=0;m<S;m++)s[j+m]=h[k+m]},flattenChunks:function(s){return[].concat.apply([],s)}};w.setTyped=function(s){s?(w.Buf8=Uint8Array,w.Buf16=Uint16Array,w.Buf32=Int32Array,w.assign(w,f)):(w.Buf8=Array,w.Buf16=Array,w.Buf32=Array,w.assign(w,c))},w.setTyped(g)},{}],42:[function(d,x,w){var g=d("./common"),f=!0,c=!0;try{String.fromCharCode.apply(null,[0])}catch{f=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch{c=!1}for(var s=new g.Buf8(256),h=0;h<256;h++)s[h]=252<=h?6:248<=h?5:240<=h?4:224<=h?3:192<=h?2:1;function k(S,j){if(j<65537&&(S.subarray&&c||!S.subarray&&f))return String.fromCharCode.apply(null,g.shrinkBuf(S,j));for(var m="",C=0;C<j;C++)m+=String.fromCharCode(S[C]);return m}s[254]=s[254]=1,w.string2buf=function(S){var j,m,C,y,N,E=S.length,D=0;for(y=0;y<E;y++)(64512&(m=S.charCodeAt(y)))==55296&&y+1<E&&(64512&(C=S.charCodeAt(y+1)))==56320&&(m=65536+(m-55296<<10)+(C-56320),y++),D+=m<128?1:m<2048?2:m<65536?3:4;for(j=new g.Buf8(D),y=N=0;N<D;y++)(64512&(m=S.charCodeAt(y)))==55296&&y+1<E&&(64512&(C=S.charCodeAt(y+1)))==56320&&(m=65536+(m-55296<<10)+(C-56320),y++),m<128?j[N++]=m:(m<2048?j[N++]=192|m>>>6:(m<65536?j[N++]=224|m>>>12:(j[N++]=240|m>>>18,j[N++]=128|m>>>12&63),j[N++]=128|m>>>6&63),j[N++]=128|63&m);return j},w.buf2binstring=function(S){return k(S,S.length)},w.binstring2buf=function(S){for(var j=new g.Buf8(S.length),m=0,C=j.length;m<C;m++)j[m]=S.charCodeAt(m);return j},w.buf2string=function(S,j){var m,C,y,N,E=j||S.length,D=new Array(2*E);for(m=C=0;m<E;)if((y=S[m++])<128)D[C++]=y;else if(4<(N=s[y]))D[C++]=65533,m+=N-1;else{for(y&=N===2?31:N===3?15:7;1<N&&m<E;)y=y<<6|63&S[m++],N--;1<N?D[C++]=65533:y<65536?D[C++]=y:(y-=65536,D[C++]=55296|y>>10&1023,D[C++]=56320|1023&y)}return k(D,C)},w.utf8border=function(S,j){var m;for((j=j||S.length)>S.length&&(j=S.length),m=j-1;0<=m&&(192&S[m])==128;)m--;return m<0||m===0?j:m+s[S[m]]>j?m:j}},{"./common":41}],43:[function(d,x,w){x.exports=function(g,f,c,s){for(var h=65535&g|0,k=g>>>16&65535|0,S=0;c!==0;){for(c-=S=2e3<c?2e3:c;k=k+(h=h+f[s++]|0)|0,--S;);h%=65521,k%=65521}return h|k<<16|0}},{}],44:[function(d,x,w){x.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(d,x,w){var g=(function(){for(var f,c=[],s=0;s<256;s++){f=s;for(var h=0;h<8;h++)f=1&f?3988292384^f>>>1:f>>>1;c[s]=f}return c})();x.exports=function(f,c,s,h){var k=g,S=h+s;f^=-1;for(var j=h;j<S;j++)f=f>>>8^k[255&(f^c[j])];return-1^f}},{}],46:[function(d,x,w){var g,f=d("../utils/common"),c=d("./trees"),s=d("./adler32"),h=d("./crc32"),k=d("./messages"),S=0,j=4,m=0,C=-2,y=-1,N=4,E=2,D=8,R=9,A=286,T=30,L=19,V=2*A+1,Z=15,U=3,W=258,ue=W+U+1,I=42,ae=113,v=1,J=2,Q=3,Y=4;function P(p,ie){return p.msg=k[ie],ie}function ne(p){return(p<<1)-(4<p?9:0)}function O(p){for(var ie=p.length;0<=--ie;)p[ie]=0}function o(p){var ie=p.state,H=ie.pending;H>p.avail_out&&(H=p.avail_out),H!==0&&(f.arraySet(p.output,ie.pending_buf,ie.pending_out,H,p.next_out),p.next_out+=H,ie.pending_out+=H,p.total_out+=H,p.avail_out-=H,ie.pending-=H,ie.pending===0&&(ie.pending_out=0))}function _(p,ie){c._tr_flush_block(p,0<=p.block_start?p.block_start:-1,p.strstart-p.block_start,ie),p.block_start=p.strstart,o(p.strm)}function K(p,ie){p.pending_buf[p.pending++]=ie}function X(p,ie){p.pending_buf[p.pending++]=ie>>>8&255,p.pending_buf[p.pending++]=255&ie}function te(p,ie){var H,z,F=p.max_chain_length,q=p.strstart,me=p.prev_length,pe=p.nice_match,oe=p.strstart>p.w_size-ue?p.strstart-(p.w_size-ue):0,ve=p.window,we=p.w_mask,Ce=p.prev,Ee=p.strstart+W,$e=ve[q+me-1],ze=ve[q+me];p.prev_length>=p.good_match&&(F>>=2),pe>p.lookahead&&(pe=p.lookahead);do if(ve[(H=ie)+me]===ze&&ve[H+me-1]===$e&&ve[H]===ve[q]&&ve[++H]===ve[q+1]){q+=2,H++;do;while(ve[++q]===ve[++H]&&ve[++q]===ve[++H]&&ve[++q]===ve[++H]&&ve[++q]===ve[++H]&&ve[++q]===ve[++H]&&ve[++q]===ve[++H]&&ve[++q]===ve[++H]&&ve[++q]===ve[++H]&&q<Ee);if(z=W-(Ee-q),q=Ee-W,me<z){if(p.match_start=ie,pe<=(me=z))break;$e=ve[q+me-1],ze=ve[q+me]}}while((ie=Ce[ie&we])>oe&&--F!=0);return me<=p.lookahead?me:p.lookahead}function ye(p){var ie,H,z,F,q,me,pe,oe,ve,we,Ce=p.w_size;do{if(F=p.window_size-p.lookahead-p.strstart,p.strstart>=Ce+(Ce-ue)){for(f.arraySet(p.window,p.window,Ce,Ce,0),p.match_start-=Ce,p.strstart-=Ce,p.block_start-=Ce,ie=H=p.hash_size;z=p.head[--ie],p.head[ie]=Ce<=z?z-Ce:0,--H;);for(ie=H=Ce;z=p.prev[--ie],p.prev[ie]=Ce<=z?z-Ce:0,--H;);F+=Ce}if(p.strm.avail_in===0)break;if(me=p.strm,pe=p.window,oe=p.strstart+p.lookahead,ve=F,we=void 0,we=me.avail_in,ve<we&&(we=ve),H=we===0?0:(me.avail_in-=we,f.arraySet(pe,me.input,me.next_in,we,oe),me.state.wrap===1?me.adler=s(me.adler,pe,we,oe):me.state.wrap===2&&(me.adler=h(me.adler,pe,we,oe)),me.next_in+=we,me.total_in+=we,we),p.lookahead+=H,p.lookahead+p.insert>=U)for(q=p.strstart-p.insert,p.ins_h=p.window[q],p.ins_h=(p.ins_h<<p.hash_shift^p.window[q+1])&p.hash_mask;p.insert&&(p.ins_h=(p.ins_h<<p.hash_shift^p.window[q+U-1])&p.hash_mask,p.prev[q&p.w_mask]=p.head[p.ins_h],p.head[p.ins_h]=q,q++,p.insert--,!(p.lookahead+p.insert<U)););}while(p.lookahead<ue&&p.strm.avail_in!==0)}function xe(p,ie){for(var H,z;;){if(p.lookahead<ue){if(ye(p),p.lookahead<ue&&ie===S)return v;if(p.lookahead===0)break}if(H=0,p.lookahead>=U&&(p.ins_h=(p.ins_h<<p.hash_shift^p.window[p.strstart+U-1])&p.hash_mask,H=p.prev[p.strstart&p.w_mask]=p.head[p.ins_h],p.head[p.ins_h]=p.strstart),H!==0&&p.strstart-H<=p.w_size-ue&&(p.match_length=te(p,H)),p.match_length>=U)if(z=c._tr_tally(p,p.strstart-p.match_start,p.match_length-U),p.lookahead-=p.match_length,p.match_length<=p.max_lazy_match&&p.lookahead>=U){for(p.match_length--;p.strstart++,p.ins_h=(p.ins_h<<p.hash_shift^p.window[p.strstart+U-1])&p.hash_mask,H=p.prev[p.strstart&p.w_mask]=p.head[p.ins_h],p.head[p.ins_h]=p.strstart,--p.match_length!=0;);p.strstart++}else p.strstart+=p.match_length,p.match_length=0,p.ins_h=p.window[p.strstart],p.ins_h=(p.ins_h<<p.hash_shift^p.window[p.strstart+1])&p.hash_mask;else z=c._tr_tally(p,0,p.window[p.strstart]),p.lookahead--,p.strstart++;if(z&&(_(p,!1),p.strm.avail_out===0))return v}return p.insert=p.strstart<U-1?p.strstart:U-1,ie===j?(_(p,!0),p.strm.avail_out===0?Q:Y):p.last_lit&&(_(p,!1),p.strm.avail_out===0)?v:J}function be(p,ie){for(var H,z,F;;){if(p.lookahead<ue){if(ye(p),p.lookahead<ue&&ie===S)return v;if(p.lookahead===0)break}if(H=0,p.lookahead>=U&&(p.ins_h=(p.ins_h<<p.hash_shift^p.window[p.strstart+U-1])&p.hash_mask,H=p.prev[p.strstart&p.w_mask]=p.head[p.ins_h],p.head[p.ins_h]=p.strstart),p.prev_length=p.match_length,p.prev_match=p.match_start,p.match_length=U-1,H!==0&&p.prev_length<p.max_lazy_match&&p.strstart-H<=p.w_size-ue&&(p.match_length=te(p,H),p.match_length<=5&&(p.strategy===1||p.match_length===U&&4096<p.strstart-p.match_start)&&(p.match_length=U-1)),p.prev_length>=U&&p.match_length<=p.prev_length){for(F=p.strstart+p.lookahead-U,z=c._tr_tally(p,p.strstart-1-p.prev_match,p.prev_length-U),p.lookahead-=p.prev_length-1,p.prev_length-=2;++p.strstart<=F&&(p.ins_h=(p.ins_h<<p.hash_shift^p.window[p.strstart+U-1])&p.hash_mask,H=p.prev[p.strstart&p.w_mask]=p.head[p.ins_h],p.head[p.ins_h]=p.strstart),--p.prev_length!=0;);if(p.match_available=0,p.match_length=U-1,p.strstart++,z&&(_(p,!1),p.strm.avail_out===0))return v}else if(p.match_available){if((z=c._tr_tally(p,0,p.window[p.strstart-1]))&&_(p,!1),p.strstart++,p.lookahead--,p.strm.avail_out===0)return v}else p.match_available=1,p.strstart++,p.lookahead--}return p.match_available&&(z=c._tr_tally(p,0,p.window[p.strstart-1]),p.match_available=0),p.insert=p.strstart<U-1?p.strstart:U-1,ie===j?(_(p,!0),p.strm.avail_out===0?Q:Y):p.last_lit&&(_(p,!1),p.strm.avail_out===0)?v:J}function Se(p,ie,H,z,F){this.good_length=p,this.max_lazy=ie,this.nice_length=H,this.max_chain=z,this.func=F}function je(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=D,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new f.Buf16(2*V),this.dyn_dtree=new f.Buf16(2*(2*T+1)),this.bl_tree=new f.Buf16(2*(2*L+1)),O(this.dyn_ltree),O(this.dyn_dtree),O(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new f.Buf16(Z+1),this.heap=new f.Buf16(2*A+1),O(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new f.Buf16(2*A+1),O(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function Ne(p){var ie;return p&&p.state?(p.total_in=p.total_out=0,p.data_type=E,(ie=p.state).pending=0,ie.pending_out=0,ie.wrap<0&&(ie.wrap=-ie.wrap),ie.status=ie.wrap?I:ae,p.adler=ie.wrap===2?0:1,ie.last_flush=S,c._tr_init(ie),m):P(p,C)}function Fe(p){var ie=Ne(p);return ie===m&&(function(H){H.window_size=2*H.w_size,O(H.head),H.max_lazy_match=g[H.level].max_lazy,H.good_match=g[H.level].good_length,H.nice_match=g[H.level].nice_length,H.max_chain_length=g[H.level].max_chain,H.strstart=0,H.block_start=0,H.lookahead=0,H.insert=0,H.match_length=H.prev_length=U-1,H.match_available=0,H.ins_h=0})(p.state),ie}function Le(p,ie,H,z,F,q){if(!p)return C;var me=1;if(ie===y&&(ie=6),z<0?(me=0,z=-z):15<z&&(me=2,z-=16),F<1||R<F||H!==D||z<8||15<z||ie<0||9<ie||q<0||N<q)return P(p,C);z===8&&(z=9);var pe=new je;return(p.state=pe).strm=p,pe.wrap=me,pe.gzhead=null,pe.w_bits=z,pe.w_size=1<<pe.w_bits,pe.w_mask=pe.w_size-1,pe.hash_bits=F+7,pe.hash_size=1<<pe.hash_bits,pe.hash_mask=pe.hash_size-1,pe.hash_shift=~~((pe.hash_bits+U-1)/U),pe.window=new f.Buf8(2*pe.w_size),pe.head=new f.Buf16(pe.hash_size),pe.prev=new f.Buf16(pe.w_size),pe.lit_bufsize=1<<F+6,pe.pending_buf_size=4*pe.lit_bufsize,pe.pending_buf=new f.Buf8(pe.pending_buf_size),pe.d_buf=1*pe.lit_bufsize,pe.l_buf=3*pe.lit_bufsize,pe.level=ie,pe.strategy=q,pe.method=H,Fe(p)}g=[new Se(0,0,0,0,function(p,ie){var H=65535;for(H>p.pending_buf_size-5&&(H=p.pending_buf_size-5);;){if(p.lookahead<=1){if(ye(p),p.lookahead===0&&ie===S)return v;if(p.lookahead===0)break}p.strstart+=p.lookahead,p.lookahead=0;var z=p.block_start+H;if((p.strstart===0||p.strstart>=z)&&(p.lookahead=p.strstart-z,p.strstart=z,_(p,!1),p.strm.avail_out===0)||p.strstart-p.block_start>=p.w_size-ue&&(_(p,!1),p.strm.avail_out===0))return v}return p.insert=0,ie===j?(_(p,!0),p.strm.avail_out===0?Q:Y):(p.strstart>p.block_start&&(_(p,!1),p.strm.avail_out),v)}),new Se(4,4,8,4,xe),new Se(4,5,16,8,xe),new Se(4,6,32,32,xe),new Se(4,4,16,16,be),new Se(8,16,32,32,be),new Se(8,16,128,128,be),new Se(8,32,128,256,be),new Se(32,128,258,1024,be),new Se(32,258,258,4096,be)],w.deflateInit=function(p,ie){return Le(p,ie,D,15,8,0)},w.deflateInit2=Le,w.deflateReset=Fe,w.deflateResetKeep=Ne,w.deflateSetHeader=function(p,ie){return p&&p.state?p.state.wrap!==2?C:(p.state.gzhead=ie,m):C},w.deflate=function(p,ie){var H,z,F,q;if(!p||!p.state||5<ie||ie<0)return p?P(p,C):C;if(z=p.state,!p.output||!p.input&&p.avail_in!==0||z.status===666&&ie!==j)return P(p,p.avail_out===0?-5:C);if(z.strm=p,H=z.last_flush,z.last_flush=ie,z.status===I)if(z.wrap===2)p.adler=0,K(z,31),K(z,139),K(z,8),z.gzhead?(K(z,(z.gzhead.text?1:0)+(z.gzhead.hcrc?2:0)+(z.gzhead.extra?4:0)+(z.gzhead.name?8:0)+(z.gzhead.comment?16:0)),K(z,255&z.gzhead.time),K(z,z.gzhead.time>>8&255),K(z,z.gzhead.time>>16&255),K(z,z.gzhead.time>>24&255),K(z,z.level===9?2:2<=z.strategy||z.level<2?4:0),K(z,255&z.gzhead.os),z.gzhead.extra&&z.gzhead.extra.length&&(K(z,255&z.gzhead.extra.length),K(z,z.gzhead.extra.length>>8&255)),z.gzhead.hcrc&&(p.adler=h(p.adler,z.pending_buf,z.pending,0)),z.gzindex=0,z.status=69):(K(z,0),K(z,0),K(z,0),K(z,0),K(z,0),K(z,z.level===9?2:2<=z.strategy||z.level<2?4:0),K(z,3),z.status=ae);else{var me=D+(z.w_bits-8<<4)<<8;me|=(2<=z.strategy||z.level<2?0:z.level<6?1:z.level===6?2:3)<<6,z.strstart!==0&&(me|=32),me+=31-me%31,z.status=ae,X(z,me),z.strstart!==0&&(X(z,p.adler>>>16),X(z,65535&p.adler)),p.adler=1}if(z.status===69)if(z.gzhead.extra){for(F=z.pending;z.gzindex<(65535&z.gzhead.extra.length)&&(z.pending!==z.pending_buf_size||(z.gzhead.hcrc&&z.pending>F&&(p.adler=h(p.adler,z.pending_buf,z.pending-F,F)),o(p),F=z.pending,z.pending!==z.pending_buf_size));)K(z,255&z.gzhead.extra[z.gzindex]),z.gzindex++;z.gzhead.hcrc&&z.pending>F&&(p.adler=h(p.adler,z.pending_buf,z.pending-F,F)),z.gzindex===z.gzhead.extra.length&&(z.gzindex=0,z.status=73)}else z.status=73;if(z.status===73)if(z.gzhead.name){F=z.pending;do{if(z.pending===z.pending_buf_size&&(z.gzhead.hcrc&&z.pending>F&&(p.adler=h(p.adler,z.pending_buf,z.pending-F,F)),o(p),F=z.pending,z.pending===z.pending_buf_size)){q=1;break}q=z.gzindex<z.gzhead.name.length?255&z.gzhead.name.charCodeAt(z.gzindex++):0,K(z,q)}while(q!==0);z.gzhead.hcrc&&z.pending>F&&(p.adler=h(p.adler,z.pending_buf,z.pending-F,F)),q===0&&(z.gzindex=0,z.status=91)}else z.status=91;if(z.status===91)if(z.gzhead.comment){F=z.pending;do{if(z.pending===z.pending_buf_size&&(z.gzhead.hcrc&&z.pending>F&&(p.adler=h(p.adler,z.pending_buf,z.pending-F,F)),o(p),F=z.pending,z.pending===z.pending_buf_size)){q=1;break}q=z.gzindex<z.gzhead.comment.length?255&z.gzhead.comment.charCodeAt(z.gzindex++):0,K(z,q)}while(q!==0);z.gzhead.hcrc&&z.pending>F&&(p.adler=h(p.adler,z.pending_buf,z.pending-F,F)),q===0&&(z.status=103)}else z.status=103;if(z.status===103&&(z.gzhead.hcrc?(z.pending+2>z.pending_buf_size&&o(p),z.pending+2<=z.pending_buf_size&&(K(z,255&p.adler),K(z,p.adler>>8&255),p.adler=0,z.status=ae)):z.status=ae),z.pending!==0){if(o(p),p.avail_out===0)return z.last_flush=-1,m}else if(p.avail_in===0&&ne(ie)<=ne(H)&&ie!==j)return P(p,-5);if(z.status===666&&p.avail_in!==0)return P(p,-5);if(p.avail_in!==0||z.lookahead!==0||ie!==S&&z.status!==666){var pe=z.strategy===2?(function(oe,ve){for(var we;;){if(oe.lookahead===0&&(ye(oe),oe.lookahead===0)){if(ve===S)return v;break}if(oe.match_length=0,we=c._tr_tally(oe,0,oe.window[oe.strstart]),oe.lookahead--,oe.strstart++,we&&(_(oe,!1),oe.strm.avail_out===0))return v}return oe.insert=0,ve===j?(_(oe,!0),oe.strm.avail_out===0?Q:Y):oe.last_lit&&(_(oe,!1),oe.strm.avail_out===0)?v:J})(z,ie):z.strategy===3?(function(oe,ve){for(var we,Ce,Ee,$e,ze=oe.window;;){if(oe.lookahead<=W){if(ye(oe),oe.lookahead<=W&&ve===S)return v;if(oe.lookahead===0)break}if(oe.match_length=0,oe.lookahead>=U&&0<oe.strstart&&(Ce=ze[Ee=oe.strstart-1])===ze[++Ee]&&Ce===ze[++Ee]&&Ce===ze[++Ee]){$e=oe.strstart+W;do;while(Ce===ze[++Ee]&&Ce===ze[++Ee]&&Ce===ze[++Ee]&&Ce===ze[++Ee]&&Ce===ze[++Ee]&&Ce===ze[++Ee]&&Ce===ze[++Ee]&&Ce===ze[++Ee]&&Ee<$e);oe.match_length=W-($e-Ee),oe.match_length>oe.lookahead&&(oe.match_length=oe.lookahead)}if(oe.match_length>=U?(we=c._tr_tally(oe,1,oe.match_length-U),oe.lookahead-=oe.match_length,oe.strstart+=oe.match_length,oe.match_length=0):(we=c._tr_tally(oe,0,oe.window[oe.strstart]),oe.lookahead--,oe.strstart++),we&&(_(oe,!1),oe.strm.avail_out===0))return v}return oe.insert=0,ve===j?(_(oe,!0),oe.strm.avail_out===0?Q:Y):oe.last_lit&&(_(oe,!1),oe.strm.avail_out===0)?v:J})(z,ie):g[z.level].func(z,ie);if(pe!==Q&&pe!==Y||(z.status=666),pe===v||pe===Q)return p.avail_out===0&&(z.last_flush=-1),m;if(pe===J&&(ie===1?c._tr_align(z):ie!==5&&(c._tr_stored_block(z,0,0,!1),ie===3&&(O(z.head),z.lookahead===0&&(z.strstart=0,z.block_start=0,z.insert=0))),o(p),p.avail_out===0))return z.last_flush=-1,m}return ie!==j?m:z.wrap<=0?1:(z.wrap===2?(K(z,255&p.adler),K(z,p.adler>>8&255),K(z,p.adler>>16&255),K(z,p.adler>>24&255),K(z,255&p.total_in),K(z,p.total_in>>8&255),K(z,p.total_in>>16&255),K(z,p.total_in>>24&255)):(X(z,p.adler>>>16),X(z,65535&p.adler)),o(p),0<z.wrap&&(z.wrap=-z.wrap),z.pending!==0?m:1)},w.deflateEnd=function(p){var ie;return p&&p.state?(ie=p.state.status)!==I&&ie!==69&&ie!==73&&ie!==91&&ie!==103&&ie!==ae&&ie!==666?P(p,C):(p.state=null,ie===ae?P(p,-3):m):C},w.deflateSetDictionary=function(p,ie){var H,z,F,q,me,pe,oe,ve,we=ie.length;if(!p||!p.state||(q=(H=p.state).wrap)===2||q===1&&H.status!==I||H.lookahead)return C;for(q===1&&(p.adler=s(p.adler,ie,we,0)),H.wrap=0,we>=H.w_size&&(q===0&&(O(H.head),H.strstart=0,H.block_start=0,H.insert=0),ve=new f.Buf8(H.w_size),f.arraySet(ve,ie,we-H.w_size,H.w_size,0),ie=ve,we=H.w_size),me=p.avail_in,pe=p.next_in,oe=p.input,p.avail_in=we,p.next_in=0,p.input=ie,ye(H);H.lookahead>=U;){for(z=H.strstart,F=H.lookahead-(U-1);H.ins_h=(H.ins_h<<H.hash_shift^H.window[z+U-1])&H.hash_mask,H.prev[z&H.w_mask]=H.head[H.ins_h],H.head[H.ins_h]=z,z++,--F;);H.strstart=z,H.lookahead=U-1,ye(H)}return H.strstart+=H.lookahead,H.block_start=H.strstart,H.insert=H.lookahead,H.lookahead=0,H.match_length=H.prev_length=U-1,H.match_available=0,p.next_in=pe,p.input=oe,p.avail_in=me,H.wrap=q,m},w.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(d,x,w){x.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(d,x,w){x.exports=function(g,f){var c,s,h,k,S,j,m,C,y,N,E,D,R,A,T,L,V,Z,U,W,ue,I,ae,v,J;c=g.state,s=g.next_in,v=g.input,h=s+(g.avail_in-5),k=g.next_out,J=g.output,S=k-(f-g.avail_out),j=k+(g.avail_out-257),m=c.dmax,C=c.wsize,y=c.whave,N=c.wnext,E=c.window,D=c.hold,R=c.bits,A=c.lencode,T=c.distcode,L=(1<<c.lenbits)-1,V=(1<<c.distbits)-1;e:do{R<15&&(D+=v[s++]<<R,R+=8,D+=v[s++]<<R,R+=8),Z=A[D&L];t:for(;;){if(D>>>=U=Z>>>24,R-=U,(U=Z>>>16&255)===0)J[k++]=65535&Z;else{if(!(16&U)){if((64&U)==0){Z=A[(65535&Z)+(D&(1<<U)-1)];continue t}if(32&U){c.mode=12;break e}g.msg="invalid literal/length code",c.mode=30;break e}W=65535&Z,(U&=15)&&(R<U&&(D+=v[s++]<<R,R+=8),W+=D&(1<<U)-1,D>>>=U,R-=U),R<15&&(D+=v[s++]<<R,R+=8,D+=v[s++]<<R,R+=8),Z=T[D&V];n:for(;;){if(D>>>=U=Z>>>24,R-=U,!(16&(U=Z>>>16&255))){if((64&U)==0){Z=T[(65535&Z)+(D&(1<<U)-1)];continue n}g.msg="invalid distance code",c.mode=30;break e}if(ue=65535&Z,R<(U&=15)&&(D+=v[s++]<<R,(R+=8)<U&&(D+=v[s++]<<R,R+=8)),m<(ue+=D&(1<<U)-1)){g.msg="invalid distance too far back",c.mode=30;break e}if(D>>>=U,R-=U,(U=k-S)<ue){if(y<(U=ue-U)&&c.sane){g.msg="invalid distance too far back",c.mode=30;break e}if(ae=E,(I=0)===N){if(I+=C-U,U<W){for(W-=U;J[k++]=E[I++],--U;);I=k-ue,ae=J}}else if(N<U){if(I+=C+N-U,(U-=N)<W){for(W-=U;J[k++]=E[I++],--U;);if(I=0,N<W){for(W-=U=N;J[k++]=E[I++],--U;);I=k-ue,ae=J}}}else if(I+=N-U,U<W){for(W-=U;J[k++]=E[I++],--U;);I=k-ue,ae=J}for(;2<W;)J[k++]=ae[I++],J[k++]=ae[I++],J[k++]=ae[I++],W-=3;W&&(J[k++]=ae[I++],1<W&&(J[k++]=ae[I++]))}else{for(I=k-ue;J[k++]=J[I++],J[k++]=J[I++],J[k++]=J[I++],2<(W-=3););W&&(J[k++]=J[I++],1<W&&(J[k++]=J[I++]))}break}}break}}while(s<h&&k<j);s-=W=R>>3,D&=(1<<(R-=W<<3))-1,g.next_in=s,g.next_out=k,g.avail_in=s<h?h-s+5:5-(s-h),g.avail_out=k<j?j-k+257:257-(k-j),c.hold=D,c.bits=R}},{}],49:[function(d,x,w){var g=d("../utils/common"),f=d("./adler32"),c=d("./crc32"),s=d("./inffast"),h=d("./inftrees"),k=1,S=2,j=0,m=-2,C=1,y=852,N=592;function E(I){return(I>>>24&255)+(I>>>8&65280)+((65280&I)<<8)+((255&I)<<24)}function D(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new g.Buf16(320),this.work=new g.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function R(I){var ae;return I&&I.state?(ae=I.state,I.total_in=I.total_out=ae.total=0,I.msg="",ae.wrap&&(I.adler=1&ae.wrap),ae.mode=C,ae.last=0,ae.havedict=0,ae.dmax=32768,ae.head=null,ae.hold=0,ae.bits=0,ae.lencode=ae.lendyn=new g.Buf32(y),ae.distcode=ae.distdyn=new g.Buf32(N),ae.sane=1,ae.back=-1,j):m}function A(I){var ae;return I&&I.state?((ae=I.state).wsize=0,ae.whave=0,ae.wnext=0,R(I)):m}function T(I,ae){var v,J;return I&&I.state?(J=I.state,ae<0?(v=0,ae=-ae):(v=1+(ae>>4),ae<48&&(ae&=15)),ae&&(ae<8||15<ae)?m:(J.window!==null&&J.wbits!==ae&&(J.window=null),J.wrap=v,J.wbits=ae,A(I))):m}function L(I,ae){var v,J;return I?(J=new D,(I.state=J).window=null,(v=T(I,ae))!==j&&(I.state=null),v):m}var V,Z,U=!0;function W(I){if(U){var ae;for(V=new g.Buf32(512),Z=new g.Buf32(32),ae=0;ae<144;)I.lens[ae++]=8;for(;ae<256;)I.lens[ae++]=9;for(;ae<280;)I.lens[ae++]=7;for(;ae<288;)I.lens[ae++]=8;for(h(k,I.lens,0,288,V,0,I.work,{bits:9}),ae=0;ae<32;)I.lens[ae++]=5;h(S,I.lens,0,32,Z,0,I.work,{bits:5}),U=!1}I.lencode=V,I.lenbits=9,I.distcode=Z,I.distbits=5}function ue(I,ae,v,J){var Q,Y=I.state;return Y.window===null&&(Y.wsize=1<<Y.wbits,Y.wnext=0,Y.whave=0,Y.window=new g.Buf8(Y.wsize)),J>=Y.wsize?(g.arraySet(Y.window,ae,v-Y.wsize,Y.wsize,0),Y.wnext=0,Y.whave=Y.wsize):(J<(Q=Y.wsize-Y.wnext)&&(Q=J),g.arraySet(Y.window,ae,v-J,Q,Y.wnext),(J-=Q)?(g.arraySet(Y.window,ae,v-J,J,0),Y.wnext=J,Y.whave=Y.wsize):(Y.wnext+=Q,Y.wnext===Y.wsize&&(Y.wnext=0),Y.whave<Y.wsize&&(Y.whave+=Q))),0}w.inflateReset=A,w.inflateReset2=T,w.inflateResetKeep=R,w.inflateInit=function(I){return L(I,15)},w.inflateInit2=L,w.inflate=function(I,ae){var v,J,Q,Y,P,ne,O,o,_,K,X,te,ye,xe,be,Se,je,Ne,Fe,Le,p,ie,H,z,F=0,q=new g.Buf8(4),me=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!I||!I.state||!I.output||!I.input&&I.avail_in!==0)return m;(v=I.state).mode===12&&(v.mode=13),P=I.next_out,Q=I.output,O=I.avail_out,Y=I.next_in,J=I.input,ne=I.avail_in,o=v.hold,_=v.bits,K=ne,X=O,ie=j;e:for(;;)switch(v.mode){case C:if(v.wrap===0){v.mode=13;break}for(;_<16;){if(ne===0)break e;ne--,o+=J[Y++]<<_,_+=8}if(2&v.wrap&&o===35615){q[v.check=0]=255&o,q[1]=o>>>8&255,v.check=c(v.check,q,2,0),_=o=0,v.mode=2;break}if(v.flags=0,v.head&&(v.head.done=!1),!(1&v.wrap)||(((255&o)<<8)+(o>>8))%31){I.msg="incorrect header check",v.mode=30;break}if((15&o)!=8){I.msg="unknown compression method",v.mode=30;break}if(_-=4,p=8+(15&(o>>>=4)),v.wbits===0)v.wbits=p;else if(p>v.wbits){I.msg="invalid window size",v.mode=30;break}v.dmax=1<<p,I.adler=v.check=1,v.mode=512&o?10:12,_=o=0;break;case 2:for(;_<16;){if(ne===0)break e;ne--,o+=J[Y++]<<_,_+=8}if(v.flags=o,(255&v.flags)!=8){I.msg="unknown compression method",v.mode=30;break}if(57344&v.flags){I.msg="unknown header flags set",v.mode=30;break}v.head&&(v.head.text=o>>8&1),512&v.flags&&(q[0]=255&o,q[1]=o>>>8&255,v.check=c(v.check,q,2,0)),_=o=0,v.mode=3;case 3:for(;_<32;){if(ne===0)break e;ne--,o+=J[Y++]<<_,_+=8}v.head&&(v.head.time=o),512&v.flags&&(q[0]=255&o,q[1]=o>>>8&255,q[2]=o>>>16&255,q[3]=o>>>24&255,v.check=c(v.check,q,4,0)),_=o=0,v.mode=4;case 4:for(;_<16;){if(ne===0)break e;ne--,o+=J[Y++]<<_,_+=8}v.head&&(v.head.xflags=255&o,v.head.os=o>>8),512&v.flags&&(q[0]=255&o,q[1]=o>>>8&255,v.check=c(v.check,q,2,0)),_=o=0,v.mode=5;case 5:if(1024&v.flags){for(;_<16;){if(ne===0)break e;ne--,o+=J[Y++]<<_,_+=8}v.length=o,v.head&&(v.head.extra_len=o),512&v.flags&&(q[0]=255&o,q[1]=o>>>8&255,v.check=c(v.check,q,2,0)),_=o=0}else v.head&&(v.head.extra=null);v.mode=6;case 6:if(1024&v.flags&&(ne<(te=v.length)&&(te=ne),te&&(v.head&&(p=v.head.extra_len-v.length,v.head.extra||(v.head.extra=new Array(v.head.extra_len)),g.arraySet(v.head.extra,J,Y,te,p)),512&v.flags&&(v.check=c(v.check,J,te,Y)),ne-=te,Y+=te,v.length-=te),v.length))break e;v.length=0,v.mode=7;case 7:if(2048&v.flags){if(ne===0)break e;for(te=0;p=J[Y+te++],v.head&&p&&v.length<65536&&(v.head.name+=String.fromCharCode(p)),p&&te<ne;);if(512&v.flags&&(v.check=c(v.check,J,te,Y)),ne-=te,Y+=te,p)break e}else v.head&&(v.head.name=null);v.length=0,v.mode=8;case 8:if(4096&v.flags){if(ne===0)break e;for(te=0;p=J[Y+te++],v.head&&p&&v.length<65536&&(v.head.comment+=String.fromCharCode(p)),p&&te<ne;);if(512&v.flags&&(v.check=c(v.check,J,te,Y)),ne-=te,Y+=te,p)break e}else v.head&&(v.head.comment=null);v.mode=9;case 9:if(512&v.flags){for(;_<16;){if(ne===0)break e;ne--,o+=J[Y++]<<_,_+=8}if(o!==(65535&v.check)){I.msg="header crc mismatch",v.mode=30;break}_=o=0}v.head&&(v.head.hcrc=v.flags>>9&1,v.head.done=!0),I.adler=v.check=0,v.mode=12;break;case 10:for(;_<32;){if(ne===0)break e;ne--,o+=J[Y++]<<_,_+=8}I.adler=v.check=E(o),_=o=0,v.mode=11;case 11:if(v.havedict===0)return I.next_out=P,I.avail_out=O,I.next_in=Y,I.avail_in=ne,v.hold=o,v.bits=_,2;I.adler=v.check=1,v.mode=12;case 12:if(ae===5||ae===6)break e;case 13:if(v.last){o>>>=7&_,_-=7&_,v.mode=27;break}for(;_<3;){if(ne===0)break e;ne--,o+=J[Y++]<<_,_+=8}switch(v.last=1&o,_-=1,3&(o>>>=1)){case 0:v.mode=14;break;case 1:if(W(v),v.mode=20,ae!==6)break;o>>>=2,_-=2;break e;case 2:v.mode=17;break;case 3:I.msg="invalid block type",v.mode=30}o>>>=2,_-=2;break;case 14:for(o>>>=7&_,_-=7&_;_<32;){if(ne===0)break e;ne--,o+=J[Y++]<<_,_+=8}if((65535&o)!=(o>>>16^65535)){I.msg="invalid stored block lengths",v.mode=30;break}if(v.length=65535&o,_=o=0,v.mode=15,ae===6)break e;case 15:v.mode=16;case 16:if(te=v.length){if(ne<te&&(te=ne),O<te&&(te=O),te===0)break e;g.arraySet(Q,J,Y,te,P),ne-=te,Y+=te,O-=te,P+=te,v.length-=te;break}v.mode=12;break;case 17:for(;_<14;){if(ne===0)break e;ne--,o+=J[Y++]<<_,_+=8}if(v.nlen=257+(31&o),o>>>=5,_-=5,v.ndist=1+(31&o),o>>>=5,_-=5,v.ncode=4+(15&o),o>>>=4,_-=4,286<v.nlen||30<v.ndist){I.msg="too many length or distance symbols",v.mode=30;break}v.have=0,v.mode=18;case 18:for(;v.have<v.ncode;){for(;_<3;){if(ne===0)break e;ne--,o+=J[Y++]<<_,_+=8}v.lens[me[v.have++]]=7&o,o>>>=3,_-=3}for(;v.have<19;)v.lens[me[v.have++]]=0;if(v.lencode=v.lendyn,v.lenbits=7,H={bits:v.lenbits},ie=h(0,v.lens,0,19,v.lencode,0,v.work,H),v.lenbits=H.bits,ie){I.msg="invalid code lengths set",v.mode=30;break}v.have=0,v.mode=19;case 19:for(;v.have<v.nlen+v.ndist;){for(;Se=(F=v.lencode[o&(1<<v.lenbits)-1])>>>16&255,je=65535&F,!((be=F>>>24)<=_);){if(ne===0)break e;ne--,o+=J[Y++]<<_,_+=8}if(je<16)o>>>=be,_-=be,v.lens[v.have++]=je;else{if(je===16){for(z=be+2;_<z;){if(ne===0)break e;ne--,o+=J[Y++]<<_,_+=8}if(o>>>=be,_-=be,v.have===0){I.msg="invalid bit length repeat",v.mode=30;break}p=v.lens[v.have-1],te=3+(3&o),o>>>=2,_-=2}else if(je===17){for(z=be+3;_<z;){if(ne===0)break e;ne--,o+=J[Y++]<<_,_+=8}_-=be,p=0,te=3+(7&(o>>>=be)),o>>>=3,_-=3}else{for(z=be+7;_<z;){if(ne===0)break e;ne--,o+=J[Y++]<<_,_+=8}_-=be,p=0,te=11+(127&(o>>>=be)),o>>>=7,_-=7}if(v.have+te>v.nlen+v.ndist){I.msg="invalid bit length repeat",v.mode=30;break}for(;te--;)v.lens[v.have++]=p}}if(v.mode===30)break;if(v.lens[256]===0){I.msg="invalid code -- missing end-of-block",v.mode=30;break}if(v.lenbits=9,H={bits:v.lenbits},ie=h(k,v.lens,0,v.nlen,v.lencode,0,v.work,H),v.lenbits=H.bits,ie){I.msg="invalid literal/lengths set",v.mode=30;break}if(v.distbits=6,v.distcode=v.distdyn,H={bits:v.distbits},ie=h(S,v.lens,v.nlen,v.ndist,v.distcode,0,v.work,H),v.distbits=H.bits,ie){I.msg="invalid distances set",v.mode=30;break}if(v.mode=20,ae===6)break e;case 20:v.mode=21;case 21:if(6<=ne&&258<=O){I.next_out=P,I.avail_out=O,I.next_in=Y,I.avail_in=ne,v.hold=o,v.bits=_,s(I,X),P=I.next_out,Q=I.output,O=I.avail_out,Y=I.next_in,J=I.input,ne=I.avail_in,o=v.hold,_=v.bits,v.mode===12&&(v.back=-1);break}for(v.back=0;Se=(F=v.lencode[o&(1<<v.lenbits)-1])>>>16&255,je=65535&F,!((be=F>>>24)<=_);){if(ne===0)break e;ne--,o+=J[Y++]<<_,_+=8}if(Se&&(240&Se)==0){for(Ne=be,Fe=Se,Le=je;Se=(F=v.lencode[Le+((o&(1<<Ne+Fe)-1)>>Ne)])>>>16&255,je=65535&F,!(Ne+(be=F>>>24)<=_);){if(ne===0)break e;ne--,o+=J[Y++]<<_,_+=8}o>>>=Ne,_-=Ne,v.back+=Ne}if(o>>>=be,_-=be,v.back+=be,v.length=je,Se===0){v.mode=26;break}if(32&Se){v.back=-1,v.mode=12;break}if(64&Se){I.msg="invalid literal/length code",v.mode=30;break}v.extra=15&Se,v.mode=22;case 22:if(v.extra){for(z=v.extra;_<z;){if(ne===0)break e;ne--,o+=J[Y++]<<_,_+=8}v.length+=o&(1<<v.extra)-1,o>>>=v.extra,_-=v.extra,v.back+=v.extra}v.was=v.length,v.mode=23;case 23:for(;Se=(F=v.distcode[o&(1<<v.distbits)-1])>>>16&255,je=65535&F,!((be=F>>>24)<=_);){if(ne===0)break e;ne--,o+=J[Y++]<<_,_+=8}if((240&Se)==0){for(Ne=be,Fe=Se,Le=je;Se=(F=v.distcode[Le+((o&(1<<Ne+Fe)-1)>>Ne)])>>>16&255,je=65535&F,!(Ne+(be=F>>>24)<=_);){if(ne===0)break e;ne--,o+=J[Y++]<<_,_+=8}o>>>=Ne,_-=Ne,v.back+=Ne}if(o>>>=be,_-=be,v.back+=be,64&Se){I.msg="invalid distance code",v.mode=30;break}v.offset=je,v.extra=15&Se,v.mode=24;case 24:if(v.extra){for(z=v.extra;_<z;){if(ne===0)break e;ne--,o+=J[Y++]<<_,_+=8}v.offset+=o&(1<<v.extra)-1,o>>>=v.extra,_-=v.extra,v.back+=v.extra}if(v.offset>v.dmax){I.msg="invalid distance too far back",v.mode=30;break}v.mode=25;case 25:if(O===0)break e;if(te=X-O,v.offset>te){if((te=v.offset-te)>v.whave&&v.sane){I.msg="invalid distance too far back",v.mode=30;break}ye=te>v.wnext?(te-=v.wnext,v.wsize-te):v.wnext-te,te>v.length&&(te=v.length),xe=v.window}else xe=Q,ye=P-v.offset,te=v.length;for(O<te&&(te=O),O-=te,v.length-=te;Q[P++]=xe[ye++],--te;);v.length===0&&(v.mode=21);break;case 26:if(O===0)break e;Q[P++]=v.length,O--,v.mode=21;break;case 27:if(v.wrap){for(;_<32;){if(ne===0)break e;ne--,o|=J[Y++]<<_,_+=8}if(X-=O,I.total_out+=X,v.total+=X,X&&(I.adler=v.check=v.flags?c(v.check,Q,X,P-X):f(v.check,Q,X,P-X)),X=O,(v.flags?o:E(o))!==v.check){I.msg="incorrect data check",v.mode=30;break}_=o=0}v.mode=28;case 28:if(v.wrap&&v.flags){for(;_<32;){if(ne===0)break e;ne--,o+=J[Y++]<<_,_+=8}if(o!==(4294967295&v.total)){I.msg="incorrect length check",v.mode=30;break}_=o=0}v.mode=29;case 29:ie=1;break e;case 30:ie=-3;break e;case 31:return-4;case 32:default:return m}return I.next_out=P,I.avail_out=O,I.next_in=Y,I.avail_in=ne,v.hold=o,v.bits=_,(v.wsize||X!==I.avail_out&&v.mode<30&&(v.mode<27||ae!==4))&&ue(I,I.output,I.next_out,X-I.avail_out)?(v.mode=31,-4):(K-=I.avail_in,X-=I.avail_out,I.total_in+=K,I.total_out+=X,v.total+=X,v.wrap&&X&&(I.adler=v.check=v.flags?c(v.check,Q,X,I.next_out-X):f(v.check,Q,X,I.next_out-X)),I.data_type=v.bits+(v.last?64:0)+(v.mode===12?128:0)+(v.mode===20||v.mode===15?256:0),(K==0&&X===0||ae===4)&&ie===j&&(ie=-5),ie)},w.inflateEnd=function(I){if(!I||!I.state)return m;var ae=I.state;return ae.window&&(ae.window=null),I.state=null,j},w.inflateGetHeader=function(I,ae){var v;return I&&I.state?(2&(v=I.state).wrap)==0?m:((v.head=ae).done=!1,j):m},w.inflateSetDictionary=function(I,ae){var v,J=ae.length;return I&&I.state?(v=I.state).wrap!==0&&v.mode!==11?m:v.mode===11&&f(1,ae,J,0)!==v.check?-3:ue(I,ae,J,J)?(v.mode=31,-4):(v.havedict=1,j):m},w.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(d,x,w){var g=d("../utils/common"),f=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],c=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],s=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],h=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];x.exports=function(k,S,j,m,C,y,N,E){var D,R,A,T,L,V,Z,U,W,ue=E.bits,I=0,ae=0,v=0,J=0,Q=0,Y=0,P=0,ne=0,O=0,o=0,_=null,K=0,X=new g.Buf16(16),te=new g.Buf16(16),ye=null,xe=0;for(I=0;I<=15;I++)X[I]=0;for(ae=0;ae<m;ae++)X[S[j+ae]]++;for(Q=ue,J=15;1<=J&&X[J]===0;J--);if(J<Q&&(Q=J),J===0)return C[y++]=20971520,C[y++]=20971520,E.bits=1,0;for(v=1;v<J&&X[v]===0;v++);for(Q<v&&(Q=v),I=ne=1;I<=15;I++)if(ne<<=1,(ne-=X[I])<0)return-1;if(0<ne&&(k===0||J!==1))return-1;for(te[1]=0,I=1;I<15;I++)te[I+1]=te[I]+X[I];for(ae=0;ae<m;ae++)S[j+ae]!==0&&(N[te[S[j+ae]]++]=ae);if(V=k===0?(_=ye=N,19):k===1?(_=f,K-=257,ye=c,xe-=257,256):(_=s,ye=h,-1),I=v,L=y,P=ae=o=0,A=-1,T=(O=1<<(Y=Q))-1,k===1&&852<O||k===2&&592<O)return 1;for(;;){for(Z=I-P,W=N[ae]<V?(U=0,N[ae]):N[ae]>V?(U=ye[xe+N[ae]],_[K+N[ae]]):(U=96,0),D=1<<I-P,v=R=1<<Y;C[L+(o>>P)+(R-=D)]=Z<<24|U<<16|W|0,R!==0;);for(D=1<<I-1;o&D;)D>>=1;if(D!==0?(o&=D-1,o+=D):o=0,ae++,--X[I]==0){if(I===J)break;I=S[j+N[ae]]}if(Q<I&&(o&T)!==A){for(P===0&&(P=Q),L+=v,ne=1<<(Y=I-P);Y+P<J&&!((ne-=X[Y+P])<=0);)Y++,ne<<=1;if(O+=1<<Y,k===1&&852<O||k===2&&592<O)return 1;C[A=o&T]=Q<<24|Y<<16|L-y|0}}return o!==0&&(C[L+o]=I-P<<24|64<<16|0),E.bits=Q,0}},{"../utils/common":41}],51:[function(d,x,w){x.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(d,x,w){var g=d("../utils/common"),f=0,c=1;function s(F){for(var q=F.length;0<=--q;)F[q]=0}var h=0,k=29,S=256,j=S+1+k,m=30,C=19,y=2*j+1,N=15,E=16,D=7,R=256,A=16,T=17,L=18,V=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],Z=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],U=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],W=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],ue=new Array(2*(j+2));s(ue);var I=new Array(2*m);s(I);var ae=new Array(512);s(ae);var v=new Array(256);s(v);var J=new Array(k);s(J);var Q,Y,P,ne=new Array(m);function O(F,q,me,pe,oe){this.static_tree=F,this.extra_bits=q,this.extra_base=me,this.elems=pe,this.max_length=oe,this.has_stree=F&&F.length}function o(F,q){this.dyn_tree=F,this.max_code=0,this.stat_desc=q}function _(F){return F<256?ae[F]:ae[256+(F>>>7)]}function K(F,q){F.pending_buf[F.pending++]=255&q,F.pending_buf[F.pending++]=q>>>8&255}function X(F,q,me){F.bi_valid>E-me?(F.bi_buf|=q<<F.bi_valid&65535,K(F,F.bi_buf),F.bi_buf=q>>E-F.bi_valid,F.bi_valid+=me-E):(F.bi_buf|=q<<F.bi_valid&65535,F.bi_valid+=me)}function te(F,q,me){X(F,me[2*q],me[2*q+1])}function ye(F,q){for(var me=0;me|=1&F,F>>>=1,me<<=1,0<--q;);return me>>>1}function xe(F,q,me){var pe,oe,ve=new Array(N+1),we=0;for(pe=1;pe<=N;pe++)ve[pe]=we=we+me[pe-1]<<1;for(oe=0;oe<=q;oe++){var Ce=F[2*oe+1];Ce!==0&&(F[2*oe]=ye(ve[Ce]++,Ce))}}function be(F){var q;for(q=0;q<j;q++)F.dyn_ltree[2*q]=0;for(q=0;q<m;q++)F.dyn_dtree[2*q]=0;for(q=0;q<C;q++)F.bl_tree[2*q]=0;F.dyn_ltree[2*R]=1,F.opt_len=F.static_len=0,F.last_lit=F.matches=0}function Se(F){8<F.bi_valid?K(F,F.bi_buf):0<F.bi_valid&&(F.pending_buf[F.pending++]=F.bi_buf),F.bi_buf=0,F.bi_valid=0}function je(F,q,me,pe){var oe=2*q,ve=2*me;return F[oe]<F[ve]||F[oe]===F[ve]&&pe[q]<=pe[me]}function Ne(F,q,me){for(var pe=F.heap[me],oe=me<<1;oe<=F.heap_len&&(oe<F.heap_len&&je(q,F.heap[oe+1],F.heap[oe],F.depth)&&oe++,!je(q,pe,F.heap[oe],F.depth));)F.heap[me]=F.heap[oe],me=oe,oe<<=1;F.heap[me]=pe}function Fe(F,q,me){var pe,oe,ve,we,Ce=0;if(F.last_lit!==0)for(;pe=F.pending_buf[F.d_buf+2*Ce]<<8|F.pending_buf[F.d_buf+2*Ce+1],oe=F.pending_buf[F.l_buf+Ce],Ce++,pe===0?te(F,oe,q):(te(F,(ve=v[oe])+S+1,q),(we=V[ve])!==0&&X(F,oe-=J[ve],we),te(F,ve=_(--pe),me),(we=Z[ve])!==0&&X(F,pe-=ne[ve],we)),Ce<F.last_lit;);te(F,R,q)}function Le(F,q){var me,pe,oe,ve=q.dyn_tree,we=q.stat_desc.static_tree,Ce=q.stat_desc.has_stree,Ee=q.stat_desc.elems,$e=-1;for(F.heap_len=0,F.heap_max=y,me=0;me<Ee;me++)ve[2*me]!==0?(F.heap[++F.heap_len]=$e=me,F.depth[me]=0):ve[2*me+1]=0;for(;F.heap_len<2;)ve[2*(oe=F.heap[++F.heap_len]=$e<2?++$e:0)]=1,F.depth[oe]=0,F.opt_len--,Ce&&(F.static_len-=we[2*oe+1]);for(q.max_code=$e,me=F.heap_len>>1;1<=me;me--)Ne(F,ve,me);for(oe=Ee;me=F.heap[1],F.heap[1]=F.heap[F.heap_len--],Ne(F,ve,1),pe=F.heap[1],F.heap[--F.heap_max]=me,F.heap[--F.heap_max]=pe,ve[2*oe]=ve[2*me]+ve[2*pe],F.depth[oe]=(F.depth[me]>=F.depth[pe]?F.depth[me]:F.depth[pe])+1,ve[2*me+1]=ve[2*pe+1]=oe,F.heap[1]=oe++,Ne(F,ve,1),2<=F.heap_len;);F.heap[--F.heap_max]=F.heap[1],(function(ze,bt){var an,kt,pn,Qe,gt,qt,rt=bt.dyn_tree,mi=bt.max_code,Rl=bt.stat_desc.static_tree,Ol=bt.stat_desc.has_stree,Ta=bt.stat_desc.extra_bits,sa=bt.stat_desc.extra_base,dn=bt.stat_desc.max_length,$t=0;for(Qe=0;Qe<=N;Qe++)ze.bl_count[Qe]=0;for(rt[2*ze.heap[ze.heap_max]+1]=0,an=ze.heap_max+1;an<y;an++)dn<(Qe=rt[2*rt[2*(kt=ze.heap[an])+1]+1]+1)&&(Qe=dn,$t++),rt[2*kt+1]=Qe,mi<kt||(ze.bl_count[Qe]++,gt=0,sa<=kt&&(gt=Ta[kt-sa]),qt=rt[2*kt],ze.opt_len+=qt*(Qe+gt),Ol&&(ze.static_len+=qt*(Rl[2*kt+1]+gt)));if($t!==0){do{for(Qe=dn-1;ze.bl_count[Qe]===0;)Qe--;ze.bl_count[Qe]--,ze.bl_count[Qe+1]+=2,ze.bl_count[dn]--,$t-=2}while(0<$t);for(Qe=dn;Qe!==0;Qe--)for(kt=ze.bl_count[Qe];kt!==0;)mi<(pn=ze.heap[--an])||(rt[2*pn+1]!==Qe&&(ze.opt_len+=(Qe-rt[2*pn+1])*rt[2*pn],rt[2*pn+1]=Qe),kt--)}})(F,q),xe(ve,$e,F.bl_count)}function p(F,q,me){var pe,oe,ve=-1,we=q[1],Ce=0,Ee=7,$e=4;for(we===0&&(Ee=138,$e=3),q[2*(me+1)+1]=65535,pe=0;pe<=me;pe++)oe=we,we=q[2*(pe+1)+1],++Ce<Ee&&oe===we||(Ce<$e?F.bl_tree[2*oe]+=Ce:oe!==0?(oe!==ve&&F.bl_tree[2*oe]++,F.bl_tree[2*A]++):Ce<=10?F.bl_tree[2*T]++:F.bl_tree[2*L]++,ve=oe,$e=(Ce=0)===we?(Ee=138,3):oe===we?(Ee=6,3):(Ee=7,4))}function ie(F,q,me){var pe,oe,ve=-1,we=q[1],Ce=0,Ee=7,$e=4;for(we===0&&(Ee=138,$e=3),pe=0;pe<=me;pe++)if(oe=we,we=q[2*(pe+1)+1],!(++Ce<Ee&&oe===we)){if(Ce<$e)for(;te(F,oe,F.bl_tree),--Ce!=0;);else oe!==0?(oe!==ve&&(te(F,oe,F.bl_tree),Ce--),te(F,A,F.bl_tree),X(F,Ce-3,2)):Ce<=10?(te(F,T,F.bl_tree),X(F,Ce-3,3)):(te(F,L,F.bl_tree),X(F,Ce-11,7));ve=oe,$e=(Ce=0)===we?(Ee=138,3):oe===we?(Ee=6,3):(Ee=7,4)}}s(ne);var H=!1;function z(F,q,me,pe){X(F,(h<<1)+(pe?1:0),3),(function(oe,ve,we,Ce){Se(oe),K(oe,we),K(oe,~we),g.arraySet(oe.pending_buf,oe.window,ve,we,oe.pending),oe.pending+=we})(F,q,me)}w._tr_init=function(F){H||((function(){var q,me,pe,oe,ve,we=new Array(N+1);for(oe=pe=0;oe<k-1;oe++)for(J[oe]=pe,q=0;q<1<<V[oe];q++)v[pe++]=oe;for(v[pe-1]=oe,oe=ve=0;oe<16;oe++)for(ne[oe]=ve,q=0;q<1<<Z[oe];q++)ae[ve++]=oe;for(ve>>=7;oe<m;oe++)for(ne[oe]=ve<<7,q=0;q<1<<Z[oe]-7;q++)ae[256+ve++]=oe;for(me=0;me<=N;me++)we[me]=0;for(q=0;q<=143;)ue[2*q+1]=8,q++,we[8]++;for(;q<=255;)ue[2*q+1]=9,q++,we[9]++;for(;q<=279;)ue[2*q+1]=7,q++,we[7]++;for(;q<=287;)ue[2*q+1]=8,q++,we[8]++;for(xe(ue,j+1,we),q=0;q<m;q++)I[2*q+1]=5,I[2*q]=ye(q,5);Q=new O(ue,V,S+1,j,N),Y=new O(I,Z,0,m,N),P=new O(new Array(0),U,0,C,D)})(),H=!0),F.l_desc=new o(F.dyn_ltree,Q),F.d_desc=new o(F.dyn_dtree,Y),F.bl_desc=new o(F.bl_tree,P),F.bi_buf=0,F.bi_valid=0,be(F)},w._tr_stored_block=z,w._tr_flush_block=function(F,q,me,pe){var oe,ve,we=0;0<F.level?(F.strm.data_type===2&&(F.strm.data_type=(function(Ce){var Ee,$e=4093624447;for(Ee=0;Ee<=31;Ee++,$e>>>=1)if(1&$e&&Ce.dyn_ltree[2*Ee]!==0)return f;if(Ce.dyn_ltree[18]!==0||Ce.dyn_ltree[20]!==0||Ce.dyn_ltree[26]!==0)return c;for(Ee=32;Ee<S;Ee++)if(Ce.dyn_ltree[2*Ee]!==0)return c;return f})(F)),Le(F,F.l_desc),Le(F,F.d_desc),we=(function(Ce){var Ee;for(p(Ce,Ce.dyn_ltree,Ce.l_desc.max_code),p(Ce,Ce.dyn_dtree,Ce.d_desc.max_code),Le(Ce,Ce.bl_desc),Ee=C-1;3<=Ee&&Ce.bl_tree[2*W[Ee]+1]===0;Ee--);return Ce.opt_len+=3*(Ee+1)+5+5+4,Ee})(F),oe=F.opt_len+3+7>>>3,(ve=F.static_len+3+7>>>3)<=oe&&(oe=ve)):oe=ve=me+5,me+4<=oe&&q!==-1?z(F,q,me,pe):F.strategy===4||ve===oe?(X(F,2+(pe?1:0),3),Fe(F,ue,I)):(X(F,4+(pe?1:0),3),(function(Ce,Ee,$e,ze){var bt;for(X(Ce,Ee-257,5),X(Ce,$e-1,5),X(Ce,ze-4,4),bt=0;bt<ze;bt++)X(Ce,Ce.bl_tree[2*W[bt]+1],3);ie(Ce,Ce.dyn_ltree,Ee-1),ie(Ce,Ce.dyn_dtree,$e-1)})(F,F.l_desc.max_code+1,F.d_desc.max_code+1,we+1),Fe(F,F.dyn_ltree,F.dyn_dtree)),be(F),pe&&Se(F)},w._tr_tally=function(F,q,me){return F.pending_buf[F.d_buf+2*F.last_lit]=q>>>8&255,F.pending_buf[F.d_buf+2*F.last_lit+1]=255&q,F.pending_buf[F.l_buf+F.last_lit]=255&me,F.last_lit++,q===0?F.dyn_ltree[2*me]++:(F.matches++,q--,F.dyn_ltree[2*(v[me]+S+1)]++,F.dyn_dtree[2*_(q)]++),F.last_lit===F.lit_bufsize-1},w._tr_align=function(F){X(F,2,3),te(F,R,ue),(function(q){q.bi_valid===16?(K(q,q.bi_buf),q.bi_buf=0,q.bi_valid=0):8<=q.bi_valid&&(q.pending_buf[q.pending++]=255&q.bi_buf,q.bi_buf>>=8,q.bi_valid-=8)})(F)}},{"../utils/common":41}],53:[function(d,x,w){x.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(d,x,w){(function(g){(function(f,c){if(!f.setImmediate){var s,h,k,S,j=1,m={},C=!1,y=f.document,N=Object.getPrototypeOf&&Object.getPrototypeOf(f);N=N&&N.setTimeout?N:f,s={}.toString.call(f.process)==="[object process]"?function(A){process.nextTick(function(){D(A)})}:(function(){if(f.postMessage&&!f.importScripts){var A=!0,T=f.onmessage;return f.onmessage=function(){A=!1},f.postMessage("","*"),f.onmessage=T,A}})()?(S="setImmediate$"+Math.random()+"$",f.addEventListener?f.addEventListener("message",R,!1):f.attachEvent("onmessage",R),function(A){f.postMessage(S+A,"*")}):f.MessageChannel?((k=new MessageChannel).port1.onmessage=function(A){D(A.data)},function(A){k.port2.postMessage(A)}):y&&"onreadystatechange"in y.createElement("script")?(h=y.documentElement,function(A){var T=y.createElement("script");T.onreadystatechange=function(){D(A),T.onreadystatechange=null,h.removeChild(T),T=null},h.appendChild(T)}):function(A){setTimeout(D,0,A)},N.setImmediate=function(A){typeof A!="function"&&(A=new Function(""+A));for(var T=new Array(arguments.length-1),L=0;L<T.length;L++)T[L]=arguments[L+1];var V={callback:A,args:T};return m[j]=V,s(j),j++},N.clearImmediate=E}function E(A){delete m[A]}function D(A){if(C)setTimeout(D,0,A);else{var T=m[A];if(T){C=!0;try{(function(L){var V=L.callback,Z=L.args;switch(Z.length){case 0:V();break;case 1:V(Z[0]);break;case 2:V(Z[0],Z[1]);break;case 3:V(Z[0],Z[1],Z[2]);break;default:V.apply(c,Z)}})(T)}finally{E(A),C=!1}}}}function R(A){A.source===f&&typeof A.data=="string"&&A.data.indexOf(S)===0&&D(+A.data.slice(S.length))}})(typeof self>"u"?g===void 0?this:g:self)}).call(this,typeof El<"u"?El:typeof self<"u"?self:typeof window<"u"?window:{})},{}]},{},[10])(10)})})(ic)),ic.exports}var _0=M0();const F0=qf(_0),B0=`//
//  SingleFileBundle.swift
//  FinanceApp (Swift Playgrounds 4+ & iOS 17+ Ready)
//
//  100% self-contained app ready to paste into Swift Playgrounds or Xcode.
//  Includes Arabic/English language toggle, RTL support, Plans Dashboard,
//  Plans management, transaction deletion & plan deletion.
//

import SwiftUI
import SwiftData
import Charts
import LocalAuthentication
import Combine
import UniformTypeIdentifiers


// MARK: - swiftpm/Sources/Models.swift
@Model
final class TransactionItem {
    var id: UUID = UUID()
    var type: String = "expense" // "income" or "expense"
    var amount: Double = 0.0
    var currency: String = "IQD"
    var date: Date = Date()
    var category: String = "Food"
    var source: String = ""
    var itemDescription: String = ""
    var notes: String = ""
    var createdAt: Date = Date()
    var updatedAt: Date = Date()

    init(
        id: UUID = UUID(),
        type: String,
        amount: Double,
        currency: String = "IQD",
        date: Date = Date(),
        category: String = "Food",
        source: String = "",
        itemDescription: String = "",
        notes: String = "",
        createdAt: Date = Date(),
        updatedAt: Date = Date()
    ) {
        self.id = id
        self.type = type
        self.amount = amount
        self.currency = currency
        self.date = date
        self.category = category
        self.source = source
        self.itemDescription = itemDescription
        self.notes = notes
        self.createdAt = createdAt
        self.updatedAt = updatedAt
    }
}

@Model
final class GoalItem {
    var id: UUID = UUID()
    var name: String = ""
    var targetAmount: Double = 0.0
    var allocatedAmount: Double = 0.0
    var currency: String = "IQD"
    var targetDate: Date? = nil
    var goalDescription: String = ""
    var planDescription: String = ""
    var priority: String = "medium" // "critical", "high", "medium", "low"
    var plannedMonthlyAmount: Double = 0.0
    var isCompleted: Bool = false
    var createdAt: Date = Date()
    var updatedAt: Date = Date()
    var completedAt: Date? = nil

    init(
        id: UUID = UUID(),
        name: String,
        targetAmount: Double,
        allocatedAmount: Double = 0.0,
        currency: String = "IQD",
        targetDate: Date? = nil,
        goalDescription: String = "",
        planDescription: String = "",
        priority: String = "medium",
        plannedMonthlyAmount: Double = 0.0,
        isCompleted: Bool = false,
        createdAt: Date = Date(),
        updatedAt: Date = Date(),
        completedAt: Date? = nil
    ) {
        self.id = id
        self.name = name
        self.targetAmount = targetAmount
        self.allocatedAmount = allocatedAmount
        self.currency = currency
        self.targetDate = targetDate
        self.goalDescription = goalDescription
        self.planDescription = planDescription.isEmpty ? goalDescription : planDescription
        self.priority = priority
        self.plannedMonthlyAmount = plannedMonthlyAmount
        self.isCompleted = isCompleted
        self.createdAt = createdAt
        self.updatedAt = updatedAt
        self.completedAt = completedAt
    }
}

typealias PlanItem = GoalItem

@Model
final class BudgetItem {
    var id: UUID = UUID()
    var category: String = ""
    var monthlyLimit: Double = 0.0
    var createdAt: Date = Date()

    init(
        id: UUID = UUID(),
        category: String,
        monthlyLimit: Double,
        createdAt: Date = Date()
    ) {
        self.id = id
        self.category = category
        self.monthlyLimit = monthlyLimit
        self.createdAt = createdAt
    }
}

@Model
final class CategoryItem {
    var id: UUID = UUID()
    var name: String = ""
    var type: String = "expense_category" // "income_source" or "expense_category"
    var isDefault: Bool = false

    init(
        id: UUID = UUID(),
        name: String,
        type: String,
        isDefault: Bool = false
    ) {
        self.id = id
        self.name = name
        self.type = type
        self.isDefault = isDefault
    }
}

// MARK: - swiftpm/Sources/Utilities.swift
struct CurrencyFormatter {
    static func format(_ amount: Double, currency: String = "IQD") -> String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.maximumFractionDigits = 0
        formatter.groupingSeparator = ","
        
        let formattedNumber = formatter.string(from: NSNumber(value: amount)) ?? "\\(Int(amount))"
        return "\\(formattedNumber) \\(currency)"
    }
    
    static func formatSigned(_ amount: Double, type: String, currency: String = "IQD") -> String {
        let prefix = type.lowercased() == "income" ? "+" : "-"
        return "\\(prefix)\\(format(amount, currency: currency))"
    }
}

extension Date {
    func formattedShort() -> String {
        let formatter = DateFormatter()
        formatter.dateStyle = .medium
        formatter.timeStyle = .none
        return formatter.string(from: self)
    }

    func monthYearString() -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "LLLL yyyy"
        return formatter.string(from: self)
    }
}

// MARK: - swiftpm/Sources/FinancialEngine.swift
@Observable
final class FinancialEngine {
    static let shared = FinancialEngine()

    // MARK: - Core Calculations

    /// Total sum of all income transactions
    func totalIncome(transactions: [TransactionItem]) -> Double {
        transactions
            .filter { $0.type.lowercased() == "income" }
            .reduce(0.0) { $0 + $1.amount }
    }

    /// Total sum of all expense transactions
    func totalExpenses(transactions: [TransactionItem]) -> Double {
        transactions
            .filter { $0.type.lowercased() == "expense" }
            .reduce(0.0) { $0 + $1.amount }
    }

    /// Actual balance = totalIncome - totalExpenses
    func actualBalance(transactions: [TransactionItem]) -> Double {
        totalIncome(transactions: transactions) - totalExpenses(transactions: transactions)
    }

    /// Total allocated amount for all active (uncompleted) goals
    func totalAllocatedToGoals(goals: [GoalItem]) -> Double {
        goals
            .filter { !$0.isCompleted }
            .reduce(0.0) { $0 + $1.allocatedAmount }
    }

    /// Unallocated / Available balance = actualBalance - totalAllocatedToGoals
    func unallocatedBalance(transactions: [TransactionItem], goals: [GoalItem]) -> Double {
        actualBalance(transactions: transactions) - totalAllocatedToGoals(goals: goals)
    }

    /// Income in a specific month
    func monthlyIncome(transactions: [TransactionItem], date: Date = Date()) -> Double {
        let calendar = Calendar.current
        return transactions
            .filter {
                $0.type.lowercased() == "income" &&
                calendar.isDate($0.date, equalTo: date, toGranularity: .month) &&
                calendar.isDate($0.date, equalTo: date, toGranularity: .year)
            }
            .reduce(0.0) { $0 + $1.amount }
    }

    /// Expenses in a specific month
    func monthlyExpenses(transactions: [TransactionItem], date: Date = Date()) -> Double {
        let calendar = Calendar.current
        return transactions
            .filter {
                $0.type.lowercased() == "expense" &&
                calendar.isDate($0.date, equalTo: date, toGranularity: .month) &&
                calendar.isDate($0.date, equalTo: date, toGranularity: .year)
            }
            .reduce(0.0) { $0 + $1.amount }
    }

    /// Net savings in a specific month = monthlyIncome - monthlyExpenses
    func monthlySavings(transactions: [TransactionItem], date: Date = Date()) -> Double {
        monthlyIncome(transactions: transactions, date: date) - monthlyExpenses(transactions: transactions, date: date)
    }

    /// Historical monthly average savings calculated across distinct calendar months with transactions
    func historicalMonthlyAverageSavings(transactions: [TransactionItem]) -> Double {
        guard !transactions.isEmpty else { return 0.0 }
        let calendar = Calendar.current
        var monthBuckets: [String: (income: Double, expense: Double)] = [:]

        for item in transactions {
            let year = calendar.component(.year, from: item.date)
            let month = calendar.component(.month, from: item.date)
            let key = "\\(year)-\\(month)"
            var current = monthBuckets[key] ?? (income: 0.0, expense: 0.0)
            if item.type.lowercased() == "income" {
                current.income += item.amount
            } else {
                current.expense += item.amount
            }
            monthBuckets[key] = current
        }

        guard !monthBuckets.isEmpty else { return 0.0 }
        let totalNet = monthBuckets.values.reduce(0.0) { $0 + ($1.income - $1.expense) }
        return totalNet / Double(monthBuckets.count)
    }

    // MARK: - Goal Achievability Assessment

    struct GoalAnalysis {
        enum Status {
            case completed
            case achievable
            case atRisk
            case unlikely
        }

        let status: Status
        let statusTitle: String
        let statusColor: Color
        let explanation: String
        let requiredMonthlySavings: Double?
        let monthsRemaining: Int?
        let shortfallMonthly: Double?
        let extensionMonths: Int?
    }

    func analyzeGoal(
        goal: GoalItem,
        unallocatedBalance: Double,
        historicalAvgSavings: Double
    ) -> GoalAnalysis {
        if goal.isCompleted || goal.allocatedAmount >= goal.targetAmount {
            return GoalAnalysis(
                status: .completed,
                statusTitle: "Completed",
                statusColor: .green,
                explanation: "Goal achieved!",
                requiredMonthlySavings: 0,
                monthsRemaining: 0,
                shortfallMonthly: nil,
                extensionMonths: nil
            )
        }

        let remainingAmount = max(0.0, goal.targetAmount - goal.allocatedAmount)

        // Case A: Goal without Target Date
        guard let targetDate = goal.targetDate else {
            if unallocatedBalance >= remainingAmount {
                return GoalAnalysis(
                    status: .achievable,
                    statusTitle: "Achievable",
                    statusColor: .green,
                    explanation: "Achievable immediately with current unallocated balance.",
                    requiredMonthlySavings: nil,
                    monthsRemaining: nil,
                    shortfallMonthly: nil,
                    extensionMonths: nil
                )
            } else {
                let shortfall = remainingAmount - unallocatedBalance
                return GoalAnalysis(
                    status: .atRisk,
                    statusTitle: "Not Currently Achievable",
                    statusColor: .orange,
                    explanation: "Shortfall: \\(CurrencyFormatter.format(shortfall)) from current available cash.",
                    requiredMonthlySavings: nil,
                    monthsRemaining: nil,
                    shortfallMonthly: shortfall,
                    extensionMonths: nil
                )
            }
        }

        // Case B: Goal with Target Date
        let calendar = Calendar.current
        let comps = calendar.dateComponents([.month], from: Date(), to: targetDate)
        let monthsRemaining = max(1, comps.month ?? 1)
        let requiredMonthly = remainingAmount / Double(monthsRemaining)

        if historicalAvgSavings >= (requiredMonthly * 1.15) {
            return GoalAnalysis(
                status: .achievable,
                statusTitle: "Achievable",
                statusColor: .green,
                explanation: "On track! Required: \\(CurrencyFormatter.format(requiredMonthly))/mo (Your avg savings: \\(CurrencyFormatter.format(historicalAvgSavings))/mo)",
                requiredMonthlySavings: requiredMonthly,
                monthsRemaining: monthsRemaining,
                shortfallMonthly: nil,
                extensionMonths: nil
            )
        } else if historicalAvgSavings >= requiredMonthly {
            let tightMargin = (requiredMonthly * 1.15) - historicalAvgSavings
            return GoalAnalysis(
                status: .atRisk,
                statusTitle: "At Risk (Tight Margin)",
                statusColor: .orange,
                explanation: "Buffer is under 15%. Required: \\(CurrencyFormatter.format(requiredMonthly))/mo",
                requiredMonthlySavings: requiredMonthly,
                monthsRemaining: monthsRemaining,
                shortfallMonthly: tightMargin,
                extensionMonths: nil
            )
        } else {
            let shortfallMonthly = max(0, requiredMonthly - historicalAvgSavings)
            var extensionMonths: Int? = nil
            if historicalAvgSavings > 0 {
                let monthsNeededAtCurrentRate = Int(ceil(remainingAmount / historicalAvgSavings))
                extensionMonths = max(1, monthsNeededAtCurrentRate - monthsRemaining)
            }

            return GoalAnalysis(
                status: .unlikely,
                statusTitle: "Unlikely to Be Achievable",
                statusColor: .red,
                explanation: "Monthly shortfall of \\(CurrencyFormatter.format(shortfallMonthly))/mo at your current average savings.",
                requiredMonthlySavings: requiredMonthly,
                monthsRemaining: monthsRemaining,
                shortfallMonthly: shortfallMonthly,
                extensionMonths: extensionMonths
            )
        }
    }
}

// MARK: - swiftpm/Sources/Views/QuickAddTransactionSheet.swift
struct QuickAddTransactionSheet: View {
    @Environment(\\.dismiss) private var dismiss
    @Environment(\\.modelContext) private var modelContext

    @Query(filter: #Predicate<CategoryItem> { $0.type == "expense_category" })
    private var expenseCategories: [CategoryItem]

    @Query(filter: #Predicate<CategoryItem> { $0.type == "income_source" })
    private var incomeSources: [CategoryItem]

    @State private var transactionType: String = "expense"
    @State private var amountString: String = ""
    @State private var date: Date = Date()
    @State private var selectedCategory: String = "Food"
    @State private var selectedSource: String = "Salary"
    @State private var customCategory: String = ""
    @State private var isAddingCustomCategory: Bool = false
    @State private var customSource: String = ""
    @State private var isAddingCustomSource: Bool = false
    @State private var itemDescription: String = ""
    @State private var notes: String = ""
    @State private var validationError: String? = nil

    var body: some View {
        NavigationStack {
            Form {
                // Type Selector
                Section {
                    Picker("Type", selection: $transactionType) {
                        Text("Expense").tag("expense")
                        Text("Income").tag("income")
                    }
                    .pickerStyle(.segmented)
                }

                // Amount
                Section {
                    HStack {
                        Text("IQD")
                            .font(.headline)
                            .foregroundColor(.secondary)
                        TextField("0", text: $amountString)
                            .keyboardType(.numberPad)
                            .font(.system(.title2, design: .rounded, weight: .bold))
                    }
                } header: {
                    Text("Amount (Iraqi Dinar)")
                } footer: {
                    if let error = validationError {
                        Text(error)
                            .foregroundColor(.red)
                    }
                }

                // Date
                Section("Date & Time") {
                    DatePicker("Date", selection: $date, displayedComponents: [.date, .hourAndMinute])
                }

                // Conditional Category or Source
                if transactionType == "expense" {
                    Section("Category") {
                        Picker("Category", selection: $selectedCategory) {
                            ForEach(categoryOptions, id: \\.self) { cat in
                                Text(cat).tag(cat)
                            }
                        }

                        if isAddingCustomCategory {
                            HStack {
                                TextField("New Category Name", text: $customCategory)
                                Button("Save") {
                                    saveCustomCategory()
                                }
                                .disabled(customCategory.trimmingCharacters(in: .whitespaces).isEmpty)
                            }
                        } else {
                            Button("+ Add Custom Category") {
                                isAddingCustomCategory = true
                            }
                            .font(.subheadline)
                            .foregroundColor(.indigo)
                        }
                    }

                    Section("Merchant / Details") {
                        TextField("Merchant or Payee (e.g. Carrefour, Al-Mansour)", text: $itemDescription)
                        TextField("Notes (optional)", text: $notes)
                    }
                } else {
                    Section("Income Source") {
                        Picker("Source", selection: $selectedSource) {
                            ForEach(sourceOptions, id: \\.self) { src in
                                Text(src).tag(src)
                            }
                        }

                        if isAddingCustomSource {
                            HStack {
                                TextField("New Source Name", text: $customSource)
                                Button("Save") {
                                    saveCustomSource()
                                }
                                .disabled(customSource.trimmingCharacters(in: .whitespaces).isEmpty)
                            }
                        } else {
                            Button("+ Add Custom Source") {
                                isAddingCustomSource = true
                            }
                            .font(.subheadline)
                            .foregroundColor(.indigo)
                        }
                    }

                    Section("Income Details") {
                        TextField("Description (e.g. Monthly Salary, Bonus)", text: $itemDescription)
                        TextField("Notes (optional)", text: $notes)
                    }
                }
            }
            .navigationTitle("New \\(transactionType == "income" ? "Income" : "Expense")")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") {
                        dismiss()
                    }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Save") {
                        saveTransaction()
                    }
                    .fontWeight(.semibold)
                }
            }
        }
    }

    private var categoryOptions: [String] {
        let dbCategories: [String] = expenseCategories.map { $0.name }
        let defaults: [String] = [
            "Food", "Transportation", "Rent", "Bills", "Shopping",
            "Entertainment", "Travel", "Family", "Car", "Health", "Gym", "Other"
        ]
        return Array(Set(dbCategories + defaults)).sorted()
    }

    private var sourceOptions: [String] {
        let dbSources: [String] = incomeSources.map { $0.name }
        let defaults: [String] = ["Salary", "Bonus", "Freelance", "Business", "Investment", "Other"]
        return Array(Set(dbSources + defaults)).sorted()
    }

    private func saveCustomCategory() {
        let trimmed = customCategory.trimmingCharacters(in: .whitespaces)
        guard !trimmed.isEmpty else { return }
        let newCat = CategoryItem(name: trimmed, type: "expense_category", isDefault: false)
        modelContext.insert(newCat)
        selectedCategory = trimmed
        customCategory = ""
        isAddingCustomCategory = false
    }

    private func saveCustomSource() {
        let trimmed = customSource.trimmingCharacters(in: .whitespaces)
        guard !trimmed.isEmpty else { return }
        let newSrc = CategoryItem(name: trimmed, type: "income_source", isDefault: false)
        modelContext.insert(newSrc)
        selectedSource = trimmed
        customSource = ""
        isAddingCustomSource = false
    }

    private func saveTransaction() {
        let cleanAmount = amountString.replacingOccurrences(of: ",", with: "").trimmingCharacters(in: .whitespaces)
        guard let amount = Double(cleanAmount), amount > 0 else {
            validationError = "Please enter a valid amount greater than 0 IQD."
            return
        }

        let newTransaction = TransactionItem(
            type: transactionType,
            amount: amount,
            currency: "IQD",
            date: date,
            category: transactionType == "expense" ? selectedCategory : "Income",
            source: transactionType == "income" ? selectedSource : "",
            itemDescription: itemDescription.trimmingCharacters(in: .whitespaces),
            notes: notes.trimmingCharacters(in: .whitespaces)
        )

        modelContext.insert(newTransaction)
        try? modelContext.save()
        dismiss()
    }
}

// MARK: - swiftpm/Sources/Views/DashboardView.swift
struct DashboardView: View {
    @Binding var selectedTab: Int
    @Query(sort: \\TransactionItem.date, order: .reverse) private var transactions: [TransactionItem]
    @Query(filter: #Predicate<GoalItem> { !$0.isCompleted }, sort: \\GoalItem.createdAt) private var activeGoals: [GoalItem]

    @State private var showAddSheet: Bool = false
    private let engine = FinancialEngine.shared

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    // 1. Top Balance Card (Actual Balance vs Unallocated Balance)
                    topBalanceCard

                    // 2. Monthly Performance Card
                    monthlyPerformanceCard

                    // 3. Active Goals Snapshot
                    goalsSnapshotSection

                    // 4. Recent Transactions Section
                    recentTransactionsSection
                }
                .padding(.horizontal, 16)
                .padding(.top, 12)
                .padding(.bottom, 24)
            }
            .navigationTitle("FinanceApp")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button {
                        showAddSheet = true
                    } label: {
                        Image(systemName: "plus.circle.fill")
                            .font(.system(size: 22))
                            .foregroundColor(.indigo)
                    }
                }
            }
            .sheet(isPresented: $showAddSheet) {
                QuickAddTransactionSheet()
            }
        }
    }

    // MARK: - Subviews

    private var topBalanceCard: some View {
        let actualBal = engine.actualBalance(transactions: transactions)
        let unallocatedBal = engine.unallocatedBalance(transactions: transactions, goals: activeGoals)
        let totalAllocated = engine.totalAllocatedToGoals(goals: activeGoals)

        return VStack(alignment: .leading, spacing: 14) {
            HStack {
                Text("CURRENT ACTUAL BALANCE")
                    .font(.caption)
                    .fontWeight(.semibold)
                    .foregroundColor(.white.opacity(0.8))
                Spacer()
                Image(systemName: "banknote.fill")
                    .foregroundColor(.white.opacity(0.9))
            }

            Text(CurrencyFormatter.format(actualBal))
                .font(.system(size: 32, weight: .bold, design: .rounded))
                .foregroundColor(.white)
                .lineLimit(1)
                .minimumScaleFactor(0.7)

            Divider()
                .background(Color.white.opacity(0.25))

            HStack(alignment: .center) {
                VStack(alignment: .leading, spacing: 2) {
                    Text("Available / Unallocated")
                        .font(.caption2)
                        .foregroundColor(.white.opacity(0.75))
                    Text(CurrencyFormatter.format(unallocatedBal))
                        .font(.system(.subheadline, design: .rounded, weight: .semibold))
                        .foregroundColor(.white)
                }
                Spacer()
                VStack(alignment: .trailing, spacing: 2) {
                    Text("Allocated to Goals")
                        .font(.caption2)
                        .foregroundColor(.white.opacity(0.75))
                    Text(CurrencyFormatter.format(totalAllocated))
                        .font(.system(.subheadline, design: .rounded, weight: .semibold))
                        .foregroundColor(.white.opacity(0.9))
                }
            }
        }
        .padding(20)
        .background(
            LinearGradient(
                colors: [Color(red: 0.28, green: 0.24, blue: 0.72), Color(red: 0.18, green: 0.14, blue: 0.52)],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
        )
        .clipShape(RoundedRectangle(cornerRadius: 20, style: .continuous))
        .shadow(color: Color.indigo.opacity(0.25), radius: 10, x: 0, y: 6)
    }

    private var monthlyPerformanceCard: some View {
        let mIncome = engine.monthlyIncome(transactions: transactions)
        let mExpenses = engine.monthlyExpenses(transactions: transactions)
        let mSavings = engine.monthlySavings(transactions: transactions)
        let calendar = Calendar.current
        let currentMonthCount = transactions.filter {
            calendar.isDate($0.date, equalTo: Date(), toGranularity: .month) &&
            calendar.isDate($0.date, equalTo: Date(), toGranularity: .year)
        }.count

        return VStack(alignment: .leading, spacing: 14) {
            HStack {
                Text("This Month's Performance")
                    .font(.system(.headline, design: .rounded))
                Spacer()
                Text(Date().monthYearString())
                    .font(.caption)
                    .foregroundColor(.secondary)
            }

            HStack(spacing: 12) {
                metricCell(
                    title: "Income",
                    amount: mIncome,
                    color: .green,
                    icon: "arrow.down.left"
                )
                metricCell(
                    title: "Expenses",
                    amount: mExpenses,
                    color: .red,
                    icon: "arrow.up.right"
                )
            }

            HStack(spacing: 12) {
                metricCell(
                    title: "Net Savings",
                    amount: mSavings,
                    color: mSavings >= 0 ? .indigo : .red,
                    icon: "leaf.fill"
                )
                VStack(alignment: .leading, spacing: 4) {
                    Text("Transactions")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                    Text("\\(currentMonthCount)")
                        .font(.system(.title3, design: .rounded, weight: .bold))
                    Text("Recorded this month")
                        .font(.system(size: 10))
                        .foregroundColor(.secondary)
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(12)
                .background(Color(.secondarySystemBackground))
                .cornerRadius(12)
            }
        }
        .padding(18)
        .background(Color(.secondarySystemGroupedBackground))
        .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
    }

    private func metricCell(title: String, amount: Double, color: Color, icon: String) -> some View {
        VStack(alignment: .leading, spacing: 4) {
            HStack(spacing: 4) {
                Image(systemName: icon)
                    .font(.caption2)
                    .foregroundColor(color)
                Text(title)
                    .font(.caption2)
                    .foregroundColor(.secondary)
            }
            Text(CurrencyFormatter.format(amount))
                .font(.system(.subheadline, design: .rounded, weight: .bold))
                .foregroundColor(color)
                .lineLimit(1)
                .minimumScaleFactor(0.7)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(12)
        .background(Color(.secondarySystemBackground))
        .cornerRadius(12)
    }

    private var goalsSnapshotSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text("Active Plans Snapshot")
                    .font(.system(.headline, design: .rounded))
                Spacer()
                Button("View All") {
                    selectedTab = 4 // Switch to Plans Tab
                }
                .font(.subheadline)
                .foregroundColor(.indigo)
            }

            if activeGoals.isEmpty {
                HStack {
                    Image(systemName: "target")
                        .foregroundColor(.secondary)
                    Text("No active goals yet. Create one to start saving!")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                }
                .padding()
                .frame(maxWidth: .infinity)
                .background(Color(.secondarySystemGroupedBackground))
                .cornerRadius(14)
            } else {
                VStack(spacing: 10) {
                    ForEach(activeGoals.prefix(3)) { goal in
                        let unallocated = engine.unallocatedBalance(transactions: transactions, goals: activeGoals)
                        let avgSavings = engine.historicalMonthlyAverageSavings(transactions: transactions)
                        let analysis = engine.analyzeGoal(goal: goal, unallocatedBalance: unallocated, historicalAvgSavings: avgSavings)
                        let progress = goal.targetAmount > 0 ? min(1.0, goal.allocatedAmount / goal.targetAmount) : 0.0
                        let remaining = max(0.0, goal.targetAmount - goal.allocatedAmount)

                        VStack(alignment: .leading, spacing: 8) {
                            HStack {
                                Text(goal.name)
                                    .font(.subheadline.weight(.semibold))
                                Spacer()
                                Text(analysis.statusTitle)
                                    .font(.caption2.weight(.bold))
                                    .padding(.horizontal, 8)
                                    .padding(.vertical, 3)
                                    .background(analysis.statusColor.opacity(0.15))
                                    .foregroundColor(analysis.statusColor)
                                    .clipShape(Capsule())
                            }

                            ProgressView(value: progress)
                                .tint(.indigo)

                            HStack {
                                Text("\\(Int(progress * 100))% saved")
                                    .font(.caption2)
                                    .foregroundColor(.secondary)
                                Spacer()
                                Text("Remaining: \\(CurrencyFormatter.format(remaining))")
                                    .font(.caption2.weight(.medium))
                                    .foregroundColor(.secondary)
                            }
                        }
                        .padding(14)
                        .background(Color(.secondarySystemGroupedBackground))
                        .cornerRadius(14)
                    }
                }
            }
        }
    }

    private var recentTransactionsSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text("Recent Transactions")
                    .font(.system(.headline, design: .rounded))
                Spacer()
                Button("View All") {
                    selectedTab = 2 // Switch to Transactions Tab
                }
                .font(.subheadline)
                .foregroundColor(.indigo)
            }

            if transactions.isEmpty {
                HStack {
                    Image(systemName: "tray")
                        .foregroundColor(.secondary)
                    Text("No transactions logged yet.")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                }
                .padding()
                .frame(maxWidth: .infinity)
                .background(Color(.secondarySystemGroupedBackground))
                .cornerRadius(14)
            } else {
                VStack(spacing: 8) {
                    ForEach(transactions.prefix(5)) { item in
                        TransactionRow(item: item)
                    }
                }
            }
        }
    }
}

// MARK: - swiftpm/Sources/Views/PlansDashboardView.swift
struct PlansDashboardView: View {
    @Environment(\\.modelContext) private var modelContext
    @Query(sort: \\GoalItem.createdAt, order: .reverse) private var allGoals: [GoalItem]
    @Query private var transactions: [TransactionItem]

    @Binding var selectedTab: Int

    @State private var incomeBoost: Double = 0.0
    @State private var expenseCut: Double = 0.0
    @State private var lumpSum: Double = 0.0

    private let engine = FinancialEngine.shared

    private var activeGoals: [GoalItem] {
        allGoals.filter { !$0.isCompleted }
    }

    private var unallocatedBalance: Double {
        engine.unallocatedBalance(transactions: transactions, goals: allGoals)
    }

    private var monthlyCapacity: Double {
        let monthly = engine.monthlySavings(transactions: transactions)
        return monthly > 0 ? monthly : max(0.0, engine.historicalMonthlyAverageSavings(transactions: transactions))
    }

    private var totalPlannedMonthlyCommitment: Double {
        activeGoals.reduce(0.0) { sum, goal in
            let remaining = max(0.0, goal.targetAmount - goal.allocatedAmount)
            if let date = goal.targetDate {
                let months = max(1, Calendar.current.dateComponents([.month], from: Date(), to: date).month ?? 1)
                return sum + (remaining / Double(months))
            }
            return sum + (remaining / 12.0)
        }
    }

    private var capacityVariance: Double {
        monthlyCapacity - totalPlannedMonthlyCommitment
    }

    private var healthStatus: String {
        if capacityVariance >= 0 {
            return "Healthy"
        } else if abs(capacityVariance) < (monthlyCapacity * 0.2) {
            return "Tight"
        } else {
            return "Overcommitted"
        }
    }

    private var healthColor: Color {
        switch healthStatus {
        case "Healthy": return .green
        case "Tight": return .orange
        default: return .red
        }
    }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    // MARK: - Financial Position & Capacity Header
                    VStack(alignment: .leading, spacing: 14) {
                        HStack {
                            VStack(alignment: .leading, spacing: 2) {
                                Text("FINANCIAL POSITION")
                                    .font(.caption2)
                                    .fontWeight(.bold)
                                    .foregroundColor(.secondary)
                                Text("Planning Control Center")
                                    .font(.system(.title2, design: .rounded, weight: .bold))
                            }
                            Spacer()
                            Text(healthStatus)
                                .font(.caption2)
                                .fontWeight(.black)
                                .padding(.horizontal, 10)
                                .padding(.vertical, 4)
                                .background(healthColor.opacity(0.15))
                                .foregroundColor(healthColor)
                                .clipShape(Capsule())
                        }

                        // Capacity Metric Cards
                        HStack(spacing: 12) {
                            VStack(alignment: .leading, spacing: 4) {
                                Text("MONTHLY CAPACITY")
                                    .font(.system(size: 10, weight: .bold))
                                    .foregroundColor(.secondary)
                                Text(CurrencyFormatter.format(monthlyCapacity))
                                    .font(.system(.title3, design: .rounded, weight: .bold))
                                    .foregroundColor(.green)
                                Text("Available monthly flow")
                                    .font(.system(size: 10))
                                    .foregroundColor(.secondary)
                            }
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .padding(14)
                            .background(Color(.secondarySystemBackground))
                            .cornerRadius(16)

                            VStack(alignment: .leading, spacing: 4) {
                                Text("PLANNED COMMITMENT")
                                    .font(.system(size: 10, weight: .bold))
                                    .foregroundColor(.secondary)
                                Text(CurrencyFormatter.format(totalPlannedMonthlyCommitment))
                                    .font(.system(.title3, design: .rounded, weight: .bold))
                                    .foregroundColor(.blue)
                                Text("\\(activeGoals.count) active plans")
                                    .font(.system(size: 10))
                                    .foregroundColor(.secondary)
                            }
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .padding(14)
                            .background(Color(.secondarySystemBackground))
                            .cornerRadius(16)
                        }

                        // Variance Indicator
                        HStack {
                            Label(
                                capacityVariance >= 0 ? "Capacity Surplus" : "Capacity Deficit",
                                systemImage: capacityVariance >= 0 ? "checkmark.circle.fill" : "exclamationmark.triangle.fill"
                            )
                            .font(.footnote)
                            .foregroundColor(.secondary)

                            Spacer()

                            Text("\\(capacityVariance >= 0 ? "+" : "")\\(CurrencyFormatter.format(capacityVariance))/mo")
                                .font(.footnote)
                                .fontWeight(.bold)
                                .foregroundColor(capacityVariance >= 0 ? .green : .red)
                        }
                        .padding(12)
                        .background(Color(.secondarySystemBackground))
                        .cornerRadius(12)
                    }
                    .padding(18)
                    .background(Color(.systemBackground))
                    .cornerRadius(20)
                    .shadow(color: Color.black.opacity(0.04), radius: 8, x: 0, y: 2)

                    // MARK: - Navigation to Plans List
                    Button(action: {
                        selectedTab = 4 // Navigate to Plans Tab
                    }) {
                        HStack {
                            VStack(alignment: .leading, spacing: 2) {
                                Text("Manage Individual Plans")
                                    .font(.headline)
                                    .foregroundColor(.primary)
                                Text("\\(activeGoals.count) active plans awaiting allocation")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                            }
                            Spacer()
                            Image(systemName: "arrow.right.circle.fill")
                                .font(.title2)
                                .foregroundColor(.indigo)
                        }
                        .padding(16)
                        .background(Color(.systemBackground))
                        .cornerRadius(16)
                        .shadow(color: Color.black.opacity(0.03), radius: 6, x: 0, y: 2)
                    }

                    // MARK: - What-If Planning Simulator
                    VStack(alignment: .leading, spacing: 14) {
                        HStack {
                            Image(systemName: "slider.horizontal.3")
                                .foregroundColor(.indigo)
                            Text("What-If Planning Simulator")
                                .font(.system(.headline, design: .rounded))
                            Spacer()
                            if incomeBoost > 0 || expenseCut > 0 || lumpSum > 0 {
                                Button("Reset") {
                                    incomeBoost = 0
                                    expenseCut = 0
                                    lumpSum = 0
                                }
                                .font(.caption)
                                .foregroundColor(.indigo)
                            }
                        }

                        Text("Test how increasing income, reducing expenses, or adding a lump sum accelerates your plans.")
                            .font(.caption)
                            .foregroundColor(.secondary)

                        // Income boost slider
                        VStack(alignment: .leading, spacing: 6) {
                            HStack {
                                Text("Monthly Income Boost")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                                Spacer()
                                Text("+\\(CurrencyFormatter.format(incomeBoost))")
                                    .font(.caption)
                                    .fontWeight(.bold)
                                    .foregroundColor(.green)
                            }
                            Slider(value: $incomeBoost, in: 0...5_000_000, step: 50_000)
                                .tint(.green)
                        }

                        // Expense cut slider
                        VStack(alignment: .leading, spacing: 6) {
                            HStack {
                                Text("Monthly Expense Reduction")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                                Spacer()
                                Text("-\\(CurrencyFormatter.format(expenseCut))")
                                    .font(.caption)
                                    .fontWeight(.bold)
                                    .foregroundColor(.blue)
                            }
                            Slider(value: $expenseCut, in: 0...3_000_000, step: 25_000)
                                .tint(.blue)
                        }

                        // Lump sum slider
                        VStack(alignment: .leading, spacing: 6) {
                            HStack {
                                Text("Lump Sum Injection")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                                Spacer()
                                Text("+\\(CurrencyFormatter.format(lumpSum))")
                                    .font(.caption)
                                    .fontWeight(.bold)
                                    .foregroundColor(.indigo)
                            }
                            Slider(value: $lumpSum, in: 0...20_000_000, step: 250_000)
                                .tint(.indigo)
                        }

                        // Simulated Result Box
                        let adjustedCapacity = monthlyCapacity + incomeBoost + expenseCut
                        let simulatedVariance = adjustedCapacity - totalPlannedMonthlyCommitment

                        VStack(spacing: 8) {
                            HStack {
                                Text("Adjusted Monthly Capacity:")
                                    .font(.footnote)
                                    .foregroundColor(.secondary)
                                Spacer()
                                Text(CurrencyFormatter.format(adjustedCapacity))
                                    .font(.footnote)
                                    .fontWeight(.bold)
                                    .foregroundColor(.green)
                            }

                            HStack {
                                Text("Simulated Monthly Variance:")
                                    .font(.footnote)
                                    .foregroundColor(.secondary)
                                Spacer()
                                Text("\\(simulatedVariance >= 0 ? "+" : "")\\(CurrencyFormatter.format(simulatedVariance))/mo")
                                    .font(.footnote)
                                    .fontWeight(.bold)
                                    .foregroundColor(simulatedVariance >= 0 ? .green : .red)
                            }
                        }
                        .padding(12)
                        .background(Color(.secondarySystemBackground))
                        .cornerRadius(12)
                    }
                    .padding(18)
                    .background(Color(.systemBackground))
                    .cornerRadius(20)
                    .shadow(color: Color.black.opacity(0.04), radius: 8, x: 0, y: 2)
                }
                .padding(.horizontal, 16)
                .padding(.vertical, 12)
            }
            .navigationTitle("Plans Dashboard")
            .navigationBarTitleDisplayMode(.inline)
            .background(Color(.systemGroupedBackground))
        }
    }
}

// MARK: - swiftpm/Sources/Views/TransactionsView.swift
struct TransactionsView: View {
    @Environment(\\.modelContext) private var modelContext
    @Query(sort: \\TransactionItem.date, order: .reverse) private var allTransactions: [TransactionItem]

    @State private var searchText: String = ""
    @State private var filterType: String = "all" // "all", "income", "expense"
    @State private var selectedCategory: String = "All"
    @State private var sortAscending: Bool = false
    @State private var showDeleteConfirmation: Bool = false
    @State private var itemToDelete: TransactionItem? = nil
    @State private var editingItem: TransactionItem? = nil
    @State private var showAddSheet: Bool = false

    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                // Filter bar
                filterHeaderView

                // List of filtered transactions
                if filteredTransactions.isEmpty {
                    VStack(spacing: 12) {
                        Spacer()
                        Image(systemName: "magnifyingglass")
                            .font(.system(size: 44))
                            .foregroundColor(.secondary)
                        Text("No transactions found")
                            .font(.headline)
                        Text("Try adjusting your filters or search keywords.")
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                        Spacer()
                    }
                } else {
                    List {
                        ForEach(groupedTransactions.keys.sorted(by: sortAscending ? (<) : (>)), id: \\.self) { sectionDate in
                            Section(header: Text(sectionDate)) {
                                ForEach(groupedTransactions[sectionDate] ?? []) { item in
                                    TransactionRow(item: item)
                                        .contentShape(Rectangle())
                                        .onTapGesture {
                                            editingItem = item
                                        }
                                        .swipeActions(edge: .trailing, allowsFullSwipe: false) {
                                            Button(role: .destructive) {
                                                itemToDelete = item
                                                showDeleteConfirmation = true
                                            } label: {
                                                Label("Delete", systemImage: "trash")
                                            }
                                        }
                                }
                            }
                        }
                    }
                    .listStyle(.insetGrouped)
                }
            }
            .navigationTitle("Transactions")
            .searchable(text: $searchText, prompt: "Search merchant, category, notes")
            .toolbar {
                ToolbarItem(placement: .topBarLeading) {
                    Menu {
                        Button {
                            sortAscending = false
                        } label: {
                            Label("Newest First", systemImage: !sortAscending ? "checkmark" : "")
                        }
                        Button {
                            sortAscending = true
                        } label: {
                            Label("Oldest First", systemImage: sortAscending ? "checkmark" : "")
                        }
                    } label: {
                        Image(systemName: "arrow.up.arrow.down.circle")
                            .foregroundColor(.indigo)
                    }
                }

                ToolbarItem(placement: .topBarTrailing) {
                    Button {
                        showAddSheet = true
                    } label: {
                        Image(systemName: "plus")
                            .fontWeight(.semibold)
                            .foregroundColor(.indigo)
                    }
                }
            }
            .confirmationDialog(
                "Delete Transaction?",
                isPresented: $showDeleteConfirmation,
                titleVisibility: .visible
            ) {
                Button("Delete", role: .destructive) {
                    if let target = itemToDelete {
                        modelContext.delete(target)
                        try? modelContext.save()
                        itemToDelete = nil
                    }
                }
                Button("Cancel", role: .cancel) {
                    itemToDelete = nil
                }
            } message: {
                Text("This action permanently removes this transaction from your balance.")
            }
            .sheet(item: $editingItem) { item in
                EditTransactionSheet(item: item)
            }
            .sheet(isPresented: $showAddSheet) {
                QuickAddTransactionSheet()
            }
        }
    }

    // MARK: - Filter Header

    private var filterHeaderView: some View {
        VStack(spacing: 8) {
            Picker("Filter", selection: $filterType) {
                Text("All").tag("all")
                Text("Income").tag("income")
                Text("Expense").tag("expense")
            }
            .pickerStyle(.segmented)
            .padding(.horizontal)

            // Category Scrollable Filter
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 8) {
                    categoryFilterChip("All")
                    ForEach(allCategories, id: \\.self) { cat in
                        categoryFilterChip(cat)
                    }
                }
                .padding(.horizontal)
            }
        }
        .padding(.vertical, 8)
        .background(Color(.systemGroupedBackground))
    }

    private func categoryFilterChip(_ name: String) -> some View {
        let isSelected = selectedCategory == name
        return Button {
            selectedCategory = name
        } label: {
            Text(name)
                .font(.caption.weight(.medium))
                .padding(.horizontal, 12)
                .padding(.vertical, 6)
                .background(isSelected ? Color.indigo : Color(.secondarySystemBackground))
                .foregroundColor(isSelected ? .white : .primary)
                .clipShape(Capsule())
        }
    }

    private var allCategories: [String] {
        let cats = allTransactions.map { $0.category }
        return Array(Set(cats)).sorted()
    }

    private var filteredTransactions: [TransactionItem] {
        allTransactions.filter { item in
            // Search text
            let matchesSearch: Bool
            if searchText.trimmingCharacters(in: .whitespaces).isEmpty {
                matchesSearch = true
            } else {
                let query = searchText.lowercased()
                matchesSearch = item.category.lowercased().contains(query) ||
                    item.source.lowercased().contains(query) ||
                    item.itemDescription.lowercased().contains(query) ||
                    item.notes.lowercased().contains(query)
            }

            // Type filter
            let matchesType: Bool
            if filterType == "all" {
                matchesType = true
            } else {
                matchesType = item.type.lowercased() == filterType.lowercased()
            }

            // Category filter
            let matchesCategory = (selectedCategory == "All") || (item.category == selectedCategory)

            return matchesSearch && matchesType && matchesCategory
        }
    }

    private var groupedTransactions: [String: [TransactionItem]] {
        let calendar = Calendar.current
        let formatter = DateFormatter()
        formatter.dateStyle = .medium
        formatter.timeStyle = .none

        var dict: [String: [TransactionItem]] = [:]
        for item in filteredTransactions {
            let key = formatter.string(from: item.date)
            dict[key, default: []].append(item)
        }
        return dict
    }
}

// MARK: - Reusable Transaction Row

struct TransactionRow: View {
    let item: TransactionItem

    var body: some View {
        HStack(spacing: 12) {
            ZStack {
                Circle()
                    .fill(item.type == "income" ? Color.green.opacity(0.15) : Color.red.opacity(0.12))
                    .frame(width: 42, height: 42)
                Image(systemName: iconForCategory(item.category, type: item.type))
                    .font(.system(size: 18))
                    .foregroundColor(item.type == "income" ? .green : .red)
            }

            VStack(alignment: .leading, spacing: 3) {
                Text(item.itemDescription.isEmpty ? item.category : item.itemDescription)
                    .font(.system(.subheadline, design: .rounded, weight: .semibold))
                    .foregroundColor(.primary)

                HStack(spacing: 6) {
                    Text(item.type == "income" ? (item.source.isEmpty ? "Income" : item.source) : item.category)
                        .font(.caption2)
                        .foregroundColor(.secondary)
                    Text("•")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                    Text(item.date.formattedShort())
                        .font(.caption2)
                        .foregroundColor(.secondary)
                }
            }

            Spacer()

            Text(CurrencyFormatter.formatSigned(item.amount, type: item.type, currency: item.currency))
                .font(.system(.subheadline, design: .rounded, weight: .bold))
                .foregroundColor(item.type == "income" ? .green : .primary)
        }
        .padding(.vertical, 4)
    }

    private func iconForCategory(_ category: String, type: String) -> String {
        if type == "income" {
            return "arrow.down.left"
        }
        switch category.lowercased() {
        case "food": return "fork.knife"
        case "transportation", "car": return "car.fill"
        case "rent": return "house.fill"
        case "bills": return "bolt.fill"
        case "shopping": return "bag.fill"
        case "entertainment": return "film.fill"
        case "travel": return "airplane"
        case "family": return "person.2.fill"
        case "health": return "cross.case.fill"
        case "gym": return "dumbbell.fill"
        default: return "creditcard.fill"
        }
    }
}

// MARK: - Edit Transaction Sheet

struct EditTransactionSheet: View {
    @Environment(\\.dismiss) private var dismiss
    @Environment(\\.modelContext) private var modelContext

    @Bindable var item: TransactionItem
    @State private var amountString: String = ""
    @State private var date: Date = Date()
    @State private var category: String = ""
    @State private var source: String = ""
    @State private var itemDescription: String = ""
    @State private var notes: String = ""
    @State private var showDeleteConfirmation: Bool = false

    var body: some View {
        NavigationStack {
            Form {
                Section("Amount (IQD)") {
                    TextField("Amount", text: $amountString)
                        .keyboardType(.numberPad)
                        .font(.headline)
                }

                Section("Details") {
                    DatePicker("Date", selection: $date, displayedComponents: [.date, .hourAndMinute])
                    if item.type == "expense" {
                        TextField("Category", text: $category)
                    } else {
                        TextField("Source", text: $source)
                    }
                    TextField("Description / Merchant", text: $itemDescription)
                    TextField("Notes", text: $notes)
                }

                Section {
                    Button(role: .destructive) {
                        showDeleteConfirmation = true
                    } label: {
                        HStack {
                            Spacer()
                            Label("Delete Transaction", systemImage: "trash")
                                .foregroundColor(.red)
                                .fontWeight(.semibold)
                            Spacer()
                        }
                    }
                }
            }
            .navigationTitle("Edit Transaction")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Done") {
                        saveChanges()
                    }
                }
            }
            .confirmationDialog(
                "Delete Transaction?",
                isPresented: $showDeleteConfirmation,
                titleVisibility: .visible
            ) {
                Button("Delete", role: .destructive) {
                    deleteTransaction()
                }
                Button("Cancel", role: .cancel) {}
            } message: {
                Text("Are you sure you want to permanently delete this transaction?")
            }
            .onAppear {
                amountString = String(Int(item.amount))
                date = item.date
                category = item.category
                source = item.source
                itemDescription = item.itemDescription
                notes = item.notes
            }
        }
    }

    private func saveChanges() {
        if let newAmount = Double(amountString.replacingOccurrences(of: ",", with: "")), newAmount > 0 {
            item.amount = newAmount
        }
        item.date = date
        item.category = category
        item.source = source
        item.itemDescription = itemDescription
        item.notes = notes
        item.updatedAt = Date()
        try? modelContext.save()
        dismiss()
    }

    private func deleteTransaction() {
        modelContext.delete(item)
        try? modelContext.save()
        dismiss()
    }
}

// MARK: - swiftpm/Sources/Views/AnalyticsView.swift
struct AnalyticsView: View {
    @Query(sort: \\TransactionItem.date, order: .reverse) private var transactions: [TransactionItem]

    enum TimeRange: String, CaseIterable, Identifiable {
        case thisWeek = "This Week"
        case thisMonth = "This Month"
        case lastMonth = "Last Month"
        case last3Months = "Last 3M"
        case last6Months = "Last 6M"
        case thisYear = "This Year"
        case allTime = "All Time"

        var id: String { rawValue }
    }

    @State private var selectedRange: TimeRange = .thisMonth

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    // Time range picker
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: 8) {
                            ForEach(TimeRange.allCases) { range in
                                Button {
                                    selectedRange = range
                                } label: {
                                    Text(range.rawValue)
                                        .font(.caption.weight(.semibold))
                                        .padding(.horizontal, 12)
                                        .padding(.vertical, 7)
                                        .background(selectedRange == range ? Color.indigo : Color(.secondarySystemBackground))
                                        .foregroundColor(selectedRange == range ? .white : .primary)
                                        .clipShape(Capsule())
                                }
                            }
                        }
                        .padding(.horizontal)
                    }

                    // Key Summary Metrics Card
                    summaryMetricsCard

                    // Chart 1: Income vs Expenses (BarMark)
                    incomeVsExpensesChart

                    // Chart 2: Spending by Category (SectorMark or BarMark)
                    spendingByCategoryChart

                    // Chart 3: Net Savings Trend (LineMark)
                    netSavingsTrendChart
                }
                .padding(.vertical, 12)
            }
            .navigationTitle("Analytics")
        }
    }

    // MARK: - Filtered Transactions by Time Range

    private var filteredTransactions: [TransactionItem] {
        let calendar = Calendar.current
        let now = Date()

        return transactions.filter { item in
            switch selectedRange {
            case .thisWeek:
                return calendar.isDate(item.date, equalTo: now, toGranularity: .weekOfYear)
            case .thisMonth:
                return calendar.isDate(item.date, equalTo: now, toGranularity: .month) &&
                       calendar.isDate(item.date, equalTo: now, toGranularity: .year)
            case .lastMonth:
                guard let lastMonth = calendar.date(byAdding: .month, value: -1, to: now) else { return false }
                return calendar.isDate(item.date, equalTo: lastMonth, toGranularity: .month) &&
                       calendar.isDate(item.date, equalTo: lastMonth, toGranularity: .year)
            case .last3Months:
                guard let cutoff = calendar.date(byAdding: .month, value: -3, to: now) else { return false }
                return item.date >= cutoff
            case .last6Months:
                guard let cutoff = calendar.date(byAdding: .month, value: -6, to: now) else { return false }
                return item.date >= cutoff
            case .thisYear:
                return calendar.isDate(item.date, equalTo: now, toGranularity: .year)
            case .allTime:
                return true
            }
        }
    }

    private var periodIncome: Double {
        filteredTransactions.filter { $0.type == "income" }.reduce(0) { $0 + $1.amount }
    }

    private var periodExpenses: Double {
        filteredTransactions.filter { $0.type == "expense" }.reduce(0) { $0 + $1.amount }
    }

    private var savingsRate: Double {
        guard periodIncome > 0 else { return 0.0 }
        let net = periodIncome - periodExpenses
        return max(0.0, (net / periodIncome) * 100.0)
    }

    private var largestExpense: TransactionItem? {
        filteredTransactions
            .filter { $0.type == "expense" }
            .max(by: { $0.amount < $1.amount })
    }

    private var highestSpendingCategory: (name: String, amount: Double)? {
        var catTotals: [String: Double] = [:]
        for item in filteredTransactions where item.type == "expense" {
            catTotals[item.category, default: 0] += item.amount
        }
        guard let maxEntry = catTotals.max(by: { $0.value < $1.value }) else { return nil }
        return (maxEntry.key, maxEntry.value)
    }

    // MARK: - Summary Metrics Card

    private var summaryMetricsCard: some View {
        VStack(spacing: 12) {
            HStack(spacing: 12) {
                metricBox(
                    title: "Savings Rate",
                    value: String(format: "%.1f%%", savingsRate),
                    color: savingsRate >= 20 ? .green : (savingsRate > 0 ? .orange : .red),
                    subtitle: "of total period income"
                )
                metricBox(
                    title: "Net Saved",
                    value: CurrencyFormatter.format(periodIncome - periodExpenses),
                    color: (periodIncome - periodExpenses) >= 0 ? .indigo : .red,
                    subtitle: "\\(selectedRange.rawValue) balance"
                )
            }

            HStack(spacing: 12) {
                metricBox(
                    title: "Largest Expense",
                    value: largestExpense != nil ? CurrencyFormatter.format(largestExpense!.amount) : "0 IQD",
                    color: .primary,
                    subtitle: largestExpense?.category ?? "None"
                )
                metricBox(
                    title: "Top Category",
                    value: highestSpendingCategory?.name ?? "None",
                    color: .primary,
                    subtitle: highestSpendingCategory != nil ? CurrencyFormatter.format(highestSpendingCategory!.amount) : "0 IQD"
                )
            }
        }
        .padding(.horizontal)
    }

    private func metricBox(title: String, value: String, color: Color, subtitle: String) -> some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(title)
                .font(.caption2)
                .foregroundColor(.secondary)
            Text(value)
                .font(.system(.subheadline, design: .rounded, weight: .bold))
                .foregroundColor(color)
                .lineLimit(1)
                .minimumScaleFactor(0.7)
            Text(subtitle)
                .font(.system(size: 10))
                .foregroundColor(.secondary)
                .lineLimit(1)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(12)
        .background(Color(.secondarySystemGroupedBackground))
        .cornerRadius(14)
    }

    // MARK: - Chart 1: Income vs Expenses

    struct ComparisonBarData: Identifiable {
        let id = UUID()
        let category: String
        let amount: Double
        let color: Color
    }

    private var incomeVsExpensesChart: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Income vs. Expenses")
                .font(.system(.headline, design: .rounded))

            let data: [ComparisonBarData] = [
                ComparisonBarData(category: "Total Income", amount: periodIncome, color: .green),
                ComparisonBarData(category: "Total Expenses", amount: periodExpenses, color: .red)
            ]

            Chart(data) { item in
                BarMark(
                    x: .value("Type", item.category),
                    y: .value("Amount", item.amount)
                )
                .foregroundStyle(item.color.gradient)
                .cornerRadius(8)
            }
            .frame(height: 180)
            .chartYAxis {
                AxisMarks(position: .leading) { value in
                    AxisValueLabel {
                        if let d = value.as(Double.self) {
                            Text("\\(Int(d / 1_000_000))M")
                                .font(.caption2)
                        }
                    }
                }
            }

            HStack {
                HStack(spacing: 4) {
                    Circle().fill(Color.green).frame(width: 8, height: 8)
                    Text("Income: \\(CurrencyFormatter.format(periodIncome))")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                }
                Spacer()
                HStack(spacing: 4) {
                    Circle().fill(Color.red).frame(width: 8, height: 8)
                    Text("Expenses: \\(CurrencyFormatter.format(periodExpenses))")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                }
            }
        }
        .padding(16)
        .background(Color(.secondarySystemGroupedBackground))
        .cornerRadius(16)
        .padding(.horizontal)
    }

    // MARK: - Chart 2: Spending by Category

    struct CategoryExpense: Identifiable {
        let id = UUID()
        let category: String
        let amount: Double
    }

    private var categoryExpensesData: [CategoryExpense] {
        var dict: [String: Double] = [:]
        for item in filteredTransactions where item.type == "expense" {
            dict[item.category, default: 0] += item.amount
        }
        return dict.map { CategoryExpense(category: $0.key, amount: $0.value) }
            .sorted(by: { $0.amount > $1.amount })
    }

    private var spendingByCategoryChart: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Spending by Category")
                .font(.system(.headline, design: .rounded))

            if categoryExpensesData.isEmpty {
                Text("No expenses in this period.")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .padding(.vertical, 20)
            } else {
                // Horizontal Ranked Bars using Swift Charts
                Chart(categoryExpensesData.prefix(6)) { cat in
                    BarMark(
                        x: .value("Amount", cat.amount),
                        y: .value("Category", cat.category)
                    )
                    .foregroundStyle(by: .value("Category", cat.category))
                    .cornerRadius(6)
                }
                .chartLegend(.hidden)
                .frame(height: 200)

                VStack(spacing: 6) {
                    ForEach(categoryExpensesData.prefix(5)) { cat in
                        HStack {
                            Text(cat.category)
                                .font(.caption)
                                .foregroundColor(.secondary)
                            Spacer()
                            Text(CurrencyFormatter.format(cat.amount))
                                .font(.caption.weight(.semibold))
                        }
                    }
                }
            }
        }
        .padding(16)
        .background(Color(.secondarySystemGroupedBackground))
        .cornerRadius(16)
        .padding(.horizontal)
    }

    // MARK: - Chart 3: Net Savings Trend

    struct MonthlyTrendPoint: Identifiable {
        let id = UUID()
        let monthName: String
        let savings: Double
    }

    private var trendData: [MonthlyTrendPoint] {
        let calendar = Calendar.current
        var dict: [String: (order: Date, net: Double)] = [:]

        for t in transactions {
            let startOfMonth = calendar.date(from: calendar.dateComponents([.year, .month], from: t.date)) ?? t.date
            let name = t.date.monthYearString()
            var current = dict[name] ?? (order: startOfMonth, net: 0.0)
            if t.type == "income" {
                current.net += t.amount
            } else {
                current.net -= t.amount
            }
            dict[name] = current
        }

        return dict.sorted(by: { $0.value.order < $1.value.order })
            .suffix(6)
            .map { MonthlyTrendPoint(monthName: $0.key, savings: $0.value.net) }
    }

    private var netSavingsTrendChart: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Net Savings Trend (Recent Months)")
                .font(.system(.headline, design: .rounded))

            if trendData.isEmpty {
                Text("Need more history to display trend.")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .padding(.vertical, 20)
            } else {
                Chart(trendData) { point in
                    LineMark(
                        x: .value("Month", point.monthName),
                        y: .value("Net Savings", point.savings)
                    )
                    .interpolationMethod(.catmullRom)
                    .foregroundStyle(Color.indigo)

                    PointMark(
                        x: .value("Month", point.monthName),
                        y: .value("Net Savings", point.savings)
                    )
                    .foregroundStyle(point.savings >= 0 ? Color.green : Color.red)
                }
                .frame(height: 180)
            }
        }
        .padding(16)
        .background(Color(.secondarySystemGroupedBackground))
        .cornerRadius(16)
        .padding(.horizontal)
    }
}

// MARK: - swiftpm/Sources/Views/GoalsView.swift
struct GoalsView: View {
    @Environment(\\.modelContext) private var modelContext
    @Query(sort: \\GoalItem.createdAt, order: .reverse) private var allGoals: [GoalItem]
    @Query private var transactions: [TransactionItem]

    @State private var showCreateGoal: Bool = false
    @State private var goalToAllocate: GoalItem? = nil
    @State private var selectedGoalDetail: GoalItem? = nil
    @State private var celebrationGoal: GoalItem? = nil

    private let engine = FinancialEngine.shared

    private var activeGoals: [GoalItem] {
        allGoals.filter { !$0.isCompleted }
    }

    private var completedGoals: [GoalItem] {
        allGoals.filter { $0.isCompleted }
    }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    // Unallocated Balance banner
                    unallocatedBanner

                    // Active Goals Section
                    VStack(alignment: .leading, spacing: 12) {
                        HStack {
                            Text("Active Goals (\\(activeGoals.count))")
                                .font(.system(.headline, design: .rounded))
                            Spacer()
                        }

                        if activeGoals.isEmpty {
                            emptyActiveGoalsCard
                        } else {
                            ForEach(activeGoals) { goal in
                                GoalCard(
                                    goal: goal,
                                    transactions: transactions,
                                    allGoals: allGoals,
                                    onAllocate: {
                                        goalToAllocate = goal
                                    },
                                    onTap: {
                                        selectedGoalDetail = goal
                                    }
                                )
                            }
                        }
                    }

                    // Completed Goals Section
                    if !completedGoals.isEmpty {
                        VStack(alignment: .leading, spacing: 12) {
                            Text("Completed Goals (\\(completedGoals.count))")
                                .font(.system(.headline, design: .rounded))
                                .foregroundColor(.secondary)

                            ForEach(completedGoals) { goal in
                                CompletedGoalCard(goal: goal)
                            }
                        }
                    }
                }
                .padding(.horizontal, 16)
                .padding(.vertical, 12)
            }
            .navigationTitle("Financial Goals")
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button {
                        showCreateGoal = true
                    } label: {
                        Image(systemName: "plus.circle.fill")
                            .font(.system(size: 22))
                            .foregroundColor(.indigo)
                    }
                }
            }
            .sheet(isPresented: $showCreateGoal) {
                CreateGoalSheet()
            }
            .sheet(item: $goalToAllocate) { goal in
                AllocateGoalSheet(
                    goal: goal,
                    transactions: transactions,
                    allGoals: allGoals,
                    onCompleted: {
                        celebrationGoal = goal
                    }
                )
            }
            .sheet(item: $selectedGoalDetail) { goal in
                GoalDetailSheet(
                    goal: goal,
                    transactions: transactions,
                    allGoals: allGoals,
                    onAllocate: {
                        selectedGoalDetail = nil
                        DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
                            goalToAllocate = goal
                        }
                    }
                )
            }
            .overlay {
                if let celeb = celebrationGoal {
                    CelebrationOverlay(goal: celeb) {
                        celebrationGoal = nil
                    }
                }
            }
        }
    }

    private var unallocatedBanner: some View {
        let unallocated = engine.unallocatedBalance(transactions: transactions, goals: activeGoals)
        return HStack {
            VStack(alignment: .leading, spacing: 2) {
                Text("Available to Allocate")
                    .font(.caption)
                    .foregroundColor(.secondary)
                Text(CurrencyFormatter.format(unallocated))
                    .font(.system(.title3, design: .rounded, weight: .bold))
                    .foregroundColor(.indigo)
            }
            Spacer()
            Image(systemName: "wallet.pass.fill")
                .font(.title2)
                .foregroundColor(.indigo.opacity(0.8))
        }
        .padding(14)
        .background(Color.indigo.opacity(0.08))
        .cornerRadius(14)
    }

    private var emptyActiveGoalsCard: some View {
        VStack(spacing: 8) {
            Image(systemName: "target")
                .font(.system(size: 36))
                .foregroundColor(.secondary)
            Text("No Active Goals")
                .font(.headline)
            Text("Tap '+' to define your savings target and track achievability.")
                .font(.subheadline)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
        }
        .padding(24)
        .frame(maxWidth: .infinity)
        .background(Color(.secondarySystemGroupedBackground))
        .cornerRadius(16)
    }
}

// MARK: - Goal Card

struct GoalCard: View {
    let goal: GoalItem
    let transactions: [TransactionItem]
    let allGoals: [GoalItem]
    let onAllocate: () -> Void
    let onTap: () -> Void

    private let engine = FinancialEngine.shared

    var body: some View {
        let unallocated = engine.unallocatedBalance(transactions: transactions, goals: allGoals)
        let avgSavings = engine.historicalMonthlyAverageSavings(transactions: transactions)
        let analysis = engine.analyzeGoal(goal: goal, unallocatedBalance: unallocated, historicalAvgSavings: avgSavings)
        let progress = goal.targetAmount > 0 ? min(1.0, goal.allocatedAmount / goal.targetAmount) : 0.0
        let remaining = max(0.0, goal.targetAmount - goal.allocatedAmount)

        VStack(alignment: .leading, spacing: 12) {
            HStack(alignment: .top) {
                VStack(alignment: .leading, spacing: 4) {
                    Text(goal.name)
                        .font(.system(.headline, design: .rounded, weight: .bold))
                    if let targetDate = goal.targetDate {
                        Text("Target: \\(targetDate.formattedShort())")
                            .font(.caption2)
                            .foregroundColor(.secondary)
                    } else {
                        Text("No deadline set")
                            .font(.caption2)
                            .foregroundColor(.secondary)
                    }
                }
                Spacer()

                // Status badge
                Text(analysis.statusTitle)
                    .font(.caption2.weight(.bold))
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(analysis.statusColor.opacity(0.15))
                    .foregroundColor(analysis.statusColor)
                    .clipShape(Capsule())
            }

            // Progress bar
            ProgressView(value: progress)
                .tint(progress >= 1.0 ? .green : .indigo)

            HStack {
                VStack(alignment: .leading, spacing: 2) {
                    Text("Saved")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                    Text(CurrencyFormatter.format(goal.allocatedAmount))
                        .font(.system(.subheadline, design: .rounded, weight: .semibold))
                }
                Spacer()
                VStack(alignment: .trailing, spacing: 2) {
                    Text("Target")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                    Text(CurrencyFormatter.format(goal.targetAmount))
                        .font(.system(.subheadline, design: .rounded, weight: .semibold))
                }
            }

            Divider()

            HStack {
                Text("\\(Int(progress * 100))% • Remaining \\(CurrencyFormatter.format(remaining))")
                    .font(.caption2)
                    .foregroundColor(.secondary)
                Spacer()
                Button(action: onAllocate) {
                    HStack(spacing: 4) {
                        Image(systemName: "plus.circle")
                        Text("Manage Funds")
                    }
                    .font(.caption.weight(.semibold))
                    .foregroundColor(.white)
                    .padding(.horizontal, 12)
                    .padding(.vertical, 6)
                    .background(Color.indigo)
                    .clipShape(Capsule())
                }
            }
        }
        .padding(16)
        .background(Color(.secondarySystemGroupedBackground))
        .cornerRadius(16)
        .onTapGesture(perform: onTap)
    }
}

// MARK: - Completed Goal Card

struct CompletedGoalCard: View {
    let goal: GoalItem

    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: "checkmark.circle.fill")
                .font(.title2)
                .foregroundColor(.green)

            VStack(alignment: .leading, spacing: 2) {
                Text(goal.name)
                    .font(.subheadline.weight(.semibold))
                    .strikethrough()
                if let completedAt = goal.completedAt {
                    Text("Completed on \\(completedAt.formattedShort())")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                }
            }
            Spacer()
            Text(CurrencyFormatter.format(goal.targetAmount))
                .font(.system(.subheadline, design: .rounded, weight: .bold))
                .foregroundColor(.secondary)
        }
        .padding(14)
        .background(Color(.secondarySystemGroupedBackground).opacity(0.8))
        .cornerRadius(14)
    }
}

// MARK: - Create Goal Sheet

struct CreateGoalSheet: View {
    @Environment(\\.dismiss) private var dismiss
    @Environment(\\.modelContext) private var modelContext

    @State private var name: String = ""
    @State private var targetAmountString: String = ""
    @State private var hasTargetDate: Bool = false
    @State private var targetDate: Date = Calendar.current.date(byAdding: .month, value: 6, to: Date()) ?? Date()
    @State private var goalDescription: String = ""
    @State private var validationError: String? = nil

    var body: some View {
        NavigationStack {
            Form {
                Section("Goal Information") {
                    TextField("Goal Name (e.g. New Car, Emergency Fund)", text: $name)
                    HStack {
                        Text("IQD")
                            .foregroundColor(.secondary)
                        TextField("Target Amount", text: $targetAmountString)
                            .keyboardType(.numberPad)
                    }
                    TextField("Description (optional)", text: $goalDescription)
                }

                Section("Target Timeline") {
                    Toggle("Set Target Date", isOn: $hasTargetDate)
                    if hasTargetDate {
                        DatePicker("Target Date", selection: $targetDate, in: Date()..., displayedComponents: .date)
                    }
                }

                if let error = validationError {
                    Section {
                        Text(error)
                            .font(.caption)
                            .foregroundColor(.red)
                    }
                }
            }
            .navigationTitle("New Goal")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Create") {
                        saveGoal()
                    }
                    .fontWeight(.semibold)
                }
            }
        }
    }

    private func saveGoal() {
        let trimmedName = name.trimmingCharacters(in: .whitespaces)
        guard !trimmedName.isEmpty else {
            validationError = "Please enter a goal name."
            return
        }

        let cleanAmount = targetAmountString.replacingOccurrences(of: ",", with: "")
        guard let amount = Double(cleanAmount), amount > 0 else {
            validationError = "Target amount must be greater than 0 IQD."
            return
        }

        let newGoal = GoalItem(
            name: trimmedName,
            targetAmount: amount,
            allocatedAmount: 0.0,
            currency: "IQD",
            targetDate: hasTargetDate ? targetDate : nil,
            goalDescription: goalDescription.trimmingCharacters(in: .whitespaces)
        )

        modelContext.insert(newGoal)
        try? modelContext.save()
        dismiss()
    }
}

// MARK: - Allocate / Withdraw Sheet

struct AllocateGoalSheet: View {
    @Environment(\\.dismiss) private var dismiss
    @Environment(\\.modelContext) private var modelContext

    @Bindable var goal: GoalItem
    let transactions: [TransactionItem]
    let allGoals: [GoalItem]
    let onCompleted: () -> Void

    @State private var mode: String = "allocate" // "allocate" or "withdraw"
    @State private var amountString: String = ""
    @State private var errorText: String? = nil

    private let engine = FinancialEngine.shared

    var body: some View {
        let unallocated = engine.unallocatedBalance(transactions: transactions, goals: allGoals)
        let remaining = max(0.0, goal.targetAmount - goal.allocatedAmount)

        NavigationStack {
            Form {
                Section {
                    Picker("Action", selection: $mode) {
                        Text("Allocate Money").tag("allocate")
                        Text("Withdraw Funds").tag("withdraw")
                    }
                    .pickerStyle(.segmented)
                }

                Section("Status") {
                    HStack {
                        Text("Currently Saved")
                        Spacer()
                        Text(CurrencyFormatter.format(goal.allocatedAmount))
                            .fontWeight(.semibold)
                    }
                    HStack {
                        Text("Remaining to Target")
                        Spacer()
                        Text(CurrencyFormatter.format(remaining))
                            .foregroundColor(.secondary)
                    }
                    HStack {
                        Text("Available Cash (Unallocated)")
                        Spacer()
                        Text(CurrencyFormatter.format(unallocated))
                            .foregroundColor(.indigo)
                    }
                }

                Section("Amount (IQD)") {
                    TextField("0", text: $amountString)
                        .keyboardType(.numberPad)
                        .font(.title3.weight(.bold))
                }

                if let err = errorText {
                    Section {
                        Text(err)
                            .font(.caption)
                            .foregroundColor(.red)
                    }
                }
            }
            .navigationTitle("Manage Funds: \\(goal.name)")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Confirm") {
                        executeTransaction(unallocated: unallocated)
                    }
                    .fontWeight(.semibold)
                }
            }
        }
    }

    private func executeTransaction(unallocated: Double) {
        let clean = amountString.replacingOccurrences(of: ",", with: "").trimmingCharacters(in: .whitespaces)
        guard let amount = Double(clean), amount > 0 else {
            errorText = "Enter a valid amount > 0 IQD."
            return
        }

        if mode == "allocate" {
            // Cannot allocate more than unallocated cash
            if amount > unallocated {
                errorText = "You cannot allocate more than your available unallocated balance (\\(CurrencyFormatter.format(unallocated)))."
                return
            }
            goal.allocatedAmount += amount
            goal.updatedAt = Date()

            if goal.allocatedAmount >= goal.targetAmount {
                goal.isCompleted = true
                goal.completedAt = Date()
                try? modelContext.save()
                dismiss()
                onCompleted()
                return
            }
        } else {
            // Withdraw
            if amount > goal.allocatedAmount {
                errorText = "Cannot withdraw more than current allocated funds (\\(CurrencyFormatter.format(goal.allocatedAmount)))."
                return
            }
            goal.allocatedAmount -= amount
            if goal.isCompleted && goal.allocatedAmount < goal.targetAmount {
                goal.isCompleted = false
                goal.completedAt = nil
            }
            goal.updatedAt = Date()
        }

        try? modelContext.save()
        dismiss()
    }
}

// MARK: - Goal Detail & Actionable Shortfall View

struct GoalDetailSheet: View {
    @Environment(\\.dismiss) private var dismiss
    @Environment(\\.modelContext) private var modelContext
    let goal: GoalItem
    let transactions: [TransactionItem]
    let allGoals: [GoalItem]
    let onAllocate: () -> Void

    @State private var showDeleteConfirmation: Bool = false
    private let engine = FinancialEngine.shared

    var body: some View {
        let unallocated = engine.unallocatedBalance(transactions: transactions, goals: allGoals)
        let avgSavings = engine.historicalMonthlyAverageSavings(transactions: transactions)
        let analysis = engine.analyzeGoal(goal: goal, unallocatedBalance: unallocated, historicalAvgSavings: avgSavings)
        let remaining = max(0.0, goal.targetAmount - goal.allocatedAmount)

        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    // Header Card
                    VStack(spacing: 8) {
                        Text(goal.name)
                            .font(.system(.title2, design: .rounded, weight: .bold))
                        Text("Target: \\(CurrencyFormatter.format(goal.targetAmount))")
                            .font(.subheadline)
                            .foregroundColor(.secondary)

                        Text(analysis.statusTitle)
                            .font(.caption.weight(.bold))
                            .padding(.horizontal, 10)
                            .padding(.vertical, 4)
                            .background(analysis.statusColor.opacity(0.15))
                            .foregroundColor(analysis.statusColor)
                            .clipShape(Capsule())
                    }
                    .padding()
                    .frame(maxWidth: .infinity)
                    .background(Color(.secondarySystemGroupedBackground))
                    .cornerRadius(16)

                    // Achievability Breakdown
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Achievability Breakdown")
                            .font(.headline)

                        Text(analysis.explanation)
                            .font(.subheadline)
                            .foregroundColor(.secondary)

                        if let req = analysis.requiredMonthlySavings, let months = analysis.monthsRemaining {
                            Divider()
                            HStack {
                                Text("Months Remaining")
                                Spacer()
                                Text("\\(months) months")
                                    .fontWeight(.medium)
                            }
                            HStack {
                                Text("Required Monthly Savings")
                                Spacer()
                                Text(CurrencyFormatter.format(req) + "/mo")
                                    .fontWeight(.semibold)
                                    .foregroundColor(.indigo)
                            }
                            HStack {
                                Text("Your Historical Avg. Savings")
                                Spacer()
                                Text(CurrencyFormatter.format(avgSavings) + "/mo")
                                    .foregroundColor(.secondary)
                            }
                        }
                    }
                    .padding()
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(Color(.secondarySystemGroupedBackground))
                    .cornerRadius(16)

                    // Actionable Shortfall Recommendations
                    if let shortfall = analysis.shortfallMonthly, shortfall > 0 {
                        VStack(alignment: .leading, spacing: 14) {
                            Text("Actionable Recommendations")
                                .font(.headline)

                            VStack(alignment: .leading, spacing: 10) {
                                recommendationRow(
                                    icon: "arrow.up.circle.fill",
                                    color: .green,
                                    title: "Option 1: Increase Income",
                                    detail: "Earn an extra \\(CurrencyFormatter.format(shortfall))/month via freelancing, bonuses, or side projects."
                                )

                                recommendationRow(
                                    icon: "scissors",
                                    color: .orange,
                                    title: "Option 2: Cut Expenses",
                                    detail: "Reduce discretionary spending (dining, shopping, entertainment) by \\(CurrencyFormatter.format(shortfall))/month."
                                )

                                if let extraMonths = analysis.extensionMonths {
                                    recommendationRow(
                                        icon: "calendar.badge.plus",
                                        color: .blue,
                                        title: "Option 3: Extend Target Date",
                                        detail: "Postpone your goal by \\(extraMonths) additional month\\(extraMonths == 1 ? "" : "s") to reach it comfortably at your current savings pace."
                                    )
                                }
                            }
                        }
                        .padding()
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .background(Color(.secondarySystemGroupedBackground))
                        .cornerRadius(16)
                    }

                    VStack(spacing: 12) {
                        Button(action: onAllocate) {
                            Text("Allocate / Withdraw Funds")
                                .font(.headline)
                                .foregroundColor(.white)
                                .frame(maxWidth: .infinity)
                                .padding()
                                .background(Color.indigo)
                                .cornerRadius(16)
                        }

                        Button(role: .destructive) {
                            showDeleteConfirmation = true
                        } label: {
                            HStack {
                                Image(systemName: "trash")
                                Text("Delete Plan")
                            }
                            .font(.subheadline.weight(.semibold))
                            .foregroundColor(.red)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 14)
                            .background(Color.red.opacity(0.1))
                            .cornerRadius(16)
                        }
                    }
                }
                .padding()
            }
            .navigationTitle("Plan Details")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Close") { dismiss() }
                }
            }
            .confirmationDialog(
                "Delete Plan?",
                isPresented: $showDeleteConfirmation,
                titleVisibility: .visible
            ) {
                Button("Delete Plan", role: .destructive) {
                    modelContext.delete(goal)
                    try? modelContext.save()
                    dismiss()
                }
                Button("Cancel", role: .cancel) {}
            } message: {
                Text("Are you sure you want to delete this plan? This action cannot be undone.")
            }
        }
    }

    private func recommendationRow(icon: String, color: Color, title: String, detail: String) -> some View {
        HStack(alignment: .top, spacing: 12) {
            Image(systemName: icon)
                .font(.title3)
                .foregroundColor(color)
            VStack(alignment: .leading, spacing: 2) {
                Text(title)
                    .font(.subheadline.weight(.semibold))
                Text(detail)
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
        }
    }
}

// MARK: - Celebration Overlay

struct CelebrationOverlay: View {
    let goal: GoalItem
    let onDismiss: () -> Void

    var body: some View {
        ZStack {
            Color.black.opacity(0.5)
                .ignoresSafeArea()

            VStack(spacing: 20) {
                Image(systemName: "sparkles")
                    .font(.system(size: 60))
                    .foregroundColor(.yellow)

                Text("Goal Achieved! 🎉")
                    .font(.system(.title, design: .rounded, weight: .bold))

                Text("Congratulations! You have reached your target of \\(CurrencyFormatter.format(goal.targetAmount)) for \\"\\(goal.name)\\".")
                    .font(.subheadline)
                    .multilineTextAlignment(.center)
                    .foregroundColor(.secondary)
                    .padding(.horizontal)

                Button("Awesome!") {
                    onDismiss()
                }
                .font(.headline)
                .foregroundColor(.white)
                .padding(.horizontal, 32)
                .padding(.vertical, 12)
                .background(Color.indigo)
                .cornerRadius(14)
            }
            .padding(28)
            .background(Color(.systemBackground))
            .cornerRadius(24)
            .shadow(radius: 20)
            .padding(32)
        }
    }
}

// MARK: - swiftpm/Sources/Views/BudgetsView.swift
struct BudgetsView: View {
    @Environment(\\.modelContext) private var modelContext
    @Query(sort: \\BudgetItem.category) private var budgets: [BudgetItem]
    @Query private var transactions: [TransactionItem]

    @State private var showAddBudget: Bool = false
    @State private var editingBudget: BudgetItem? = nil

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 16) {
                    // Overview header
                    budgetOverviewCard

                    // Budgets List
                    if budgets.isEmpty {
                        VStack(spacing: 8) {
                            Image(systemName: "chart.bar.xaxis")
                                .font(.system(size: 36))
                                .foregroundColor(.secondary)
                            Text("No Category Budgets Set")
                                .font(.headline)
                            Text("Set monthly limits for Food, Shopping, Transport and more to control spending.")
                                .font(.subheadline)
                                .foregroundColor(.secondary)
                                .multilineTextAlignment(.center)
                        }
                        .padding(24)
                        .frame(maxWidth: .infinity)
                        .background(Color(.secondarySystemGroupedBackground))
                        .cornerRadius(16)
                    } else {
                        ForEach(budgets) { budget in
                            BudgetCard(
                                budget: budget,
                                transactions: transactions,
                                onEdit: {
                                    editingBudget = budget
                                },
                                onDelete: {
                                    modelContext.delete(budget)
                                    try? modelContext.save()
                                }
                            )
                        }
                    }
                }
                .padding()
            }
            .navigationTitle("Monthly Budgets")
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button {
                        showAddBudget = true
                    } label: {
                        Image(systemName: "plus.circle.fill")
                            .font(.system(size: 22))
                            .foregroundColor(.indigo)
                    }
                }
            }
            .sheet(isPresented: $showAddBudget) {
                AddBudgetSheet()
            }
            .sheet(item: $editingBudget) { b in
                EditBudgetSheet(budget: b)
            }
        }
    }

    private var currentMonthExpensesByCategory: [String: Double] {
        let calendar = Calendar.current
        var dict: [String: Double] = [:]
        for t in transactions where t.type == "expense" {
            if calendar.isDate(t.date, equalTo: Date(), toGranularity: .month) &&
               calendar.isDate(t.date, equalTo: Date(), toGranularity: .year) {
                dict[t.category, default: 0] += t.amount
            }
        }
        return dict
    }

    private var budgetOverviewCard: some View {
        let totalBudgeted = budgets.reduce(0.0) { $0 + $1.monthlyLimit }
        let spentMap = currentMonthExpensesByCategory
        let totalSpentOnBudgetedCategories = budgets.reduce(0.0) { $0 + (spentMap[$1.category] ?? 0.0) }
        let remaining = totalBudgeted - totalSpentOnBudgetedCategories

        return VStack(spacing: 12) {
            HStack {
                VStack(alignment: .leading, spacing: 2) {
                    Text("Total Monthly Budget")
                        .font(.caption)
                        .foregroundColor(.secondary)
                    Text(CurrencyFormatter.format(totalBudgeted))
                        .font(.system(.title3, design: .rounded, weight: .bold))
                }
                Spacer()
                VStack(alignment: .trailing, spacing: 2) {
                    Text("Remaining")
                        .font(.caption)
                        .foregroundColor(.secondary)
                    Text(CurrencyFormatter.format(max(0, remaining)))
                        .font(.system(.subheadline, design: .rounded, weight: .semibold))
                        .foregroundColor(remaining >= 0 ? .green : .red)
                }
            }

            let progress = totalBudgeted > 0 ? min(1.5, totalSpentOnBudgetedCategories / totalBudgeted) : 0.0
            ProgressView(value: min(1.0, progress))
                .tint(progress > 1.0 ? .red : (progress > 0.8 ? .orange : .indigo))
        }
        .padding()
        .background(Color(.secondarySystemGroupedBackground))
        .cornerRadius(16)
    }
}

// MARK: - Budget Card with Color Transitions

struct BudgetCard: View {
    let budget: BudgetItem
    let transactions: [TransactionItem]
    let onEdit: () -> Void
    let onDelete: () -> Void

    var body: some View {
        let spent = spentForCategory(budget.category)
        let limit = budget.monthlyLimit
        let remaining = limit - spent
        let ratio = limit > 0 ? spent / limit : 0.0

        // Color transition: Accent (Indigo) -> Orange (>= 80%) -> Red (> 100%)
        let statusColor: Color = {
            if ratio >= 1.0 {
                return .red
            } else if ratio >= 0.8 {
                return .orange
            } else {
                return .indigo
            }
        }()

        VStack(alignment: .leading, spacing: 10) {
            HStack {
                Text(budget.category)
                    .font(.system(.headline, design: .rounded, weight: .bold))
                Spacer()
                if ratio >= 1.0 {
                    Text("Exceeded by \\(CurrencyFormatter.format(spent - limit))")
                        .font(.caption2.weight(.bold))
                        .foregroundColor(.red)
                } else {
                    Text("\\(CurrencyFormatter.format(remaining)) left")
                        .font(.caption2.weight(.semibold))
                        .foregroundColor(.secondary)
                }
            }

            // Progress bar
            ProgressView(value: min(1.0, ratio))
                .tint(statusColor)

            HStack {
                Text("Spent: \\(CurrencyFormatter.format(spent))")
                    .font(.caption2)
                    .foregroundColor(.secondary)
                Spacer()
                Text("Limit: \\(CurrencyFormatter.format(limit))")
                    .font(.caption2.weight(.medium))
                    .foregroundColor(.secondary)
            }

            HStack {
                Text("\\(Int(ratio * 100))% used")
                    .font(.caption2.weight(.bold))
                    .foregroundColor(statusColor)
                Spacer()

                Button("Edit", action: onEdit)
                    .font(.caption)
                    .foregroundColor(.indigo)
            }
        }
        .padding(16)
        .background(Color(.secondarySystemGroupedBackground))
        .cornerRadius(16)
        .contextMenu {
            Button("Edit Limit", action: onEdit)
            Button("Delete Budget", role: .destructive, action: onDelete)
        }
    }

    private func spentForCategory(_ category: String) -> Double {
        let calendar = Calendar.current
        return transactions
            .filter {
                $0.type == "expense" &&
                $0.category.lowercased() == category.lowercased() &&
                calendar.isDate($0.date, equalTo: Date(), toGranularity: .month) &&
                calendar.isDate($0.date, equalTo: Date(), toGranularity: .year)
            }
            .reduce(0.0) { $0 + $1.amount }
    }
}

// MARK: - Add Budget Sheet

struct AddBudgetSheet: View {
    @Environment(\\.dismiss) private var dismiss
    @Environment(\\.modelContext) private var modelContext

    @Query(filter: #Predicate<CategoryItem> { $0.type == "expense_category" })
    private var expenseCategories: [CategoryItem]

    @State private var category: String = "Food"
    @State private var monthlyLimitString: String = ""
    @State private var errorText: String? = nil

    var body: some View {
        NavigationStack {
            Form {
                Section("Category") {
                    Picker("Category", selection: $category) {
                        ForEach(categoriesList, id: \\.self) { c in
                            Text(c).tag(c)
                        }
                    }
                }

                Section("Monthly Limit (IQD)") {
                    TextField("e.g. 500000", text: $monthlyLimitString)
                        .keyboardType(.numberPad)
                }

                if let err = errorText {
                    Section {
                        Text(err).foregroundColor(.red).font(.caption)
                    }
                }
            }
            .navigationTitle("New Budget Limit")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Save") {
                        saveBudget()
                    }
                    .fontWeight(.semibold)
                }
            }
        }
    }

    private var categoriesList: [String] {
        let db: [String] = expenseCategories.map { $0.name }
        let defaults: [String] = ["Food", "Transportation", "Rent", "Bills", "Shopping", "Entertainment", "Travel", "Car", "Health", "Gym"]
        return Array(Set(db + defaults)).sorted()
    }

    private func saveBudget() {
        let clean = monthlyLimitString.replacingOccurrences(of: ",", with: "")
        guard let limit = Double(clean), limit > 0 else {
            errorText = "Enter a valid monthly limit > 0 IQD."
            return
        }

        let item = BudgetItem(category: category, monthlyLimit: limit)
        modelContext.insert(item)
        try? modelContext.save()
        dismiss()
    }
}

// MARK: - Edit Budget Sheet

struct EditBudgetSheet: View {
    @Environment(\\.dismiss) private var dismiss
    @Environment(\\.modelContext) private var modelContext

    @Bindable var budget: BudgetItem
    @State private var limitString: String = ""

    var body: some View {
        NavigationStack {
            Form {
                Section("Category") {
                    Text(budget.category)
                        .font(.headline)
                }
                Section("Monthly Limit (IQD)") {
                    TextField("Limit", text: $limitString)
                        .keyboardType(.numberPad)
                }
            }
            .navigationTitle("Edit Budget")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Save") {
                        if let limit = Double(limitString.replacingOccurrences(of: ",", with: "")), limit > 0 {
                            budget.monthlyLimit = limit
                            try? modelContext.save()
                        }
                        dismiss()
                    }
                }
            }
            .onAppear {
                limitString = String(Int(budget.monthlyLimit))
            }
        }
    }
}

// MARK: - swiftpm/Sources/Views/SettingsView.swift
struct SettingsView: View {
    @Environment(\\.modelContext) private var modelContext
    @AppStorage("biometricsEnabled") private var biometricsEnabled: Bool = false
    @AppStorage("selectedAppearance") private var selectedAppearance: String = "system"

    @Query private var allTransactions: [TransactionItem]
    @Query private var allGoals: [GoalItem]
    @Query private var allCategories: [CategoryItem]

    @State private var showCategoryManager: Bool = false
    @State private var exportShareItem: ExportDocument? = nil
    @State private var showExportSheet: Bool = false
    @State private var showBudgetsSheet: Bool = false
    @State private var bioAuthError: String? = nil

    var body: some View {
        NavigationStack {
            Form {
                // Section 1: Security & Biometrics
                Section("Security") {
                    Toggle(isOn: Binding(
                        get: { biometricsEnabled },
                        set: { newValue in
                            handleBiometricsToggle(newValue)
                        }
                    )) {
                        HStack {
                            Image(systemName: "faceid")
                                .foregroundColor(.indigo)
                            Text("Face ID / Passcode Lock")
                        }
                    }

                    if let err = bioAuthError {
                        Text(err)
                            .font(.caption)
                            .foregroundColor(.red)
                    }
                }

                // Section 2: Budgeting
                Section("Budgets") {
                    NavigationLink {
                        BudgetsView()
                    } label: {
                        HStack {
                            Image(systemName: "chart.bar.xaxis")
                                .foregroundColor(.indigo)
                            Text("Category Monthly Budgets")
                        }
                    }
                }

                // Section 3: Categories Management
                Section("Customization") {
                    NavigationLink {
                        CategoriesManagementView()
                    } label: {
                        HStack {
                            Image(systemName: "tag.fill")
                                .foregroundColor(.indigo)
                            Text("Manage Categories & Sources")
                        }
                    }
                }

                // Section 4: Data Export
                Section("Data Export") {
                    Button {
                        exportCSV()
                    } label: {
                        HStack {
                            Image(systemName: "tablecells.fill")
                                .foregroundColor(.green)
                            Text("Export Transactions as CSV")
                        }
                    }

                    Button {
                        exportJSON()
                    } label: {
                        HStack {
                            Image(systemName: "curlybraces")
                                .foregroundColor(.orange)
                            Text("Export Full Backup as JSON")
                        }
                    }
                }

                // Section 5: Appearance
                Section("Appearance") {
                    Picker("Theme", selection: $selectedAppearance) {
                        Text("System Default").tag("system")
                        Text("Light Mode").tag("light")
                        Text("Dark Mode").tag("dark")
                    }
                    .pickerStyle(.segmented)
                }

                // Section 6: App Information
                Section("About") {
                    HStack {
                        Text("Currency")
                        Spacer()
                        Text("IQD (Iraqi Dinar)")
                            .foregroundColor(.secondary)
                    }
                    HStack {
                        Text("Target Device")
                        Spacer()
                        Text("iPhone 13 Pro Max (iOS 17+)")
                            .foregroundColor(.secondary)
                    }
                    HStack {
                        Text("Database Engine")
                        Spacer()
                        Text("SwiftData (Local SQLite)")
                            .foregroundColor(.secondary)
                    }
                    HStack {
                        Text("Developer")
                        Spacer()
                        Text("Ahmed AL KUBAISI")
                            .fontWeight(.semibold)
                            .foregroundColor(.primary)
                    }
                    HStack {
                        Text("Email")
                        Spacer()
                        Text("ahmed.mjabbar95@gmail.com")
                            .foregroundColor(.blue)
                    }
                    HStack {
                        Text("Version")
                        Spacer()
                        Text("2.1.0 (Swift Playgrounds & iOS Native)")
                            .foregroundColor(.secondary)
                    }
                }
            }
            .navigationTitle("Settings")
            .sheet(item: $exportShareItem) { doc in
                ShareSheet(activityItems: [doc.fileURL])
            }
        }
    }

    private func handleBiometricsToggle(_ enable: Bool) {
        if !enable {
            biometricsEnabled = false
            bioAuthError = nil
            return
        }

        let context = LAContext()
        var error: NSError?
        if context.canEvaluatePolicy(.deviceOwnerAuthentication, error: &error) {
            context.evaluatePolicy(.deviceOwnerAuthentication, localizedReason: "Confirm your identity to enable biometric protection.") { success, authErr in
                DispatchQueue.main.async {
                    if success {
                        biometricsEnabled = true
                        bioAuthError = nil
                    } else {
                        biometricsEnabled = false
                        bioAuthError = authErr?.localizedDescription ?? "Authentication failed."
                    }
                }
            }
        } else {
            // Hardware doesn't support biometrics
            biometricsEnabled = true
            bioAuthError = nil
        }
    }

    // MARK: - Export Logic

    private func exportCSV() {
        var csvText = "ID,Type,Amount,Currency,Date,Category,Source,Description,Notes\\n"
        for t in allTransactions {
            let dateStr = ISO8601DateFormatter().string(from: t.date)
            let desc = t.itemDescription.replacingOccurrences(of: ",", with: " ")
            let notes = t.notes.replacingOccurrences(of: ",", with: " ")
            let row = [
                "\\(t.id)",
                "\\"\\(t.type)\\"",
                "\\(t.amount)",
                "\\"\\(t.currency)\\"",
                "\\"\\(dateStr)\\"",
                "\\"\\(t.category)\\"",
                "\\"\\(t.source)\\"",
                "\\"\\(desc)\\"",
                "\\"\\(notes)\\""
            ].joined(separator: ",") + "\\n"
            csvText += row
        }

        let tempURL = FileManager.default.temporaryDirectory.appendingPathComponent("FinanceApp_Transactions.csv")
        try? csvText.write(to: tempURL, atomically: true, encoding: .utf8)
        exportShareItem = ExportDocument(fileURL: tempURL)
    }

    private func exportJSON() {
        let df = ISO8601DateFormatter()
        let transactionsDict = allTransactions.map { t in
            [
                "id": t.id.uuidString,
                "type": t.type,
                "amount": t.amount,
                "currency": t.currency,
                "date": df.string(from: t.date),
                "category": t.category,
                "source": t.source,
                "itemDescription": t.itemDescription,
                "notes": t.notes
            ] as [String : Any]
        }

        let goalsDict = allGoals.map { g in
            [
                "id": g.id.uuidString,
                "name": g.name,
                "targetAmount": g.targetAmount,
                "allocatedAmount": g.allocatedAmount,
                "currency": g.currency,
                "targetDate": g.targetDate != nil ? df.string(from: g.targetDate!) : nil,
                "goalDescription": g.goalDescription,
                "isCompleted": g.isCompleted
            ] as [String : Any?]
        }

        let fullBackup: [String: Any] = [
            "exportDate": df.string(from: Date()),
            "currency": "IQD",
            "transactions": transactionsDict,
            "goals": goalsDict
        ]

        if let data = try? JSONSerialization.data(withJSONObject: fullBackup, options: .prettyPrinted) {
            let tempURL = FileManager.default.temporaryDirectory.appendingPathComponent("FinanceApp_Backup.json")
            try? data.write(to: tempURL)
            exportShareItem = ExportDocument(fileURL: tempURL)
        }
    }
}

// MARK: - Export Helpers

struct ExportDocument: Identifiable {
    let id = UUID()
    let fileURL: URL
}

struct ShareSheet: UIViewControllerRepresentable {
    var activityItems: [Any]

    func makeUIViewController(context: Context) -> UIActivityViewController {
        UIActivityViewController(activityItems: activityItems, applicationActivities: nil)
    }

    func updateUIViewController(_ uiViewController: UIActivityViewController, context: Context) {}
}

// MARK: - Categories Management View

struct CategoriesManagementView: View {
    @Environment(\\.modelContext) private var modelContext
    @Query private var categories: [CategoryItem]

    @State private var newCategoryName: String = ""
    @State private var newCategoryType: String = "expense_category"

    var body: some View {
        Form {
            Section("Add New Custom Category or Source") {
                Picker("Type", selection: $newCategoryType) {
                    Text("Expense Category").tag("expense_category")
                    Text("Income Source").tag("income_source")
                }
                .pickerStyle(.segmented)

                HStack {
                    TextField("Category Name", text: $newCategoryName)
                    Button("Add") {
                        addCategory()
                    }
                    .disabled(newCategoryName.trimmingCharacters(in: .whitespaces).isEmpty)
                }
            }

            Section("Expense Categories") {
                ForEach(categories.filter { $0.type == "expense_category" }) { item in
                    HStack {
                        Text(item.name)
                        Spacer()
                        if item.isDefault {
                            Text("Default")
                                .font(.caption2)
                                .foregroundColor(.secondary)
                        }
                    }
                }
                .onDelete { indices in
                    deleteCategory(at: indices, type: "expense_category")
                }
            }

            Section("Income Sources") {
                ForEach(categories.filter { $0.type == "income_source" }) { item in
                    HStack {
                        Text(item.name)
                        Spacer()
                        if item.isDefault {
                            Text("Default")
                                .font(.caption2)
                                .foregroundColor(.secondary)
                        }
                    }
                }
                .onDelete { indices in
                    deleteCategory(at: indices, type: "income_source")
                }
            }
        }
        .navigationTitle("Categories & Sources")
    }

    private func addCategory() {
        let trimmed = newCategoryName.trimmingCharacters(in: .whitespaces)
        guard !trimmed.isEmpty else { return }
        let item = CategoryItem(name: trimmed, type: newCategoryType, isDefault: false)
        modelContext.insert(item)
        try? modelContext.save()
        newCategoryName = ""
    }

    private func deleteCategory(at indices: IndexSet, type: String) {
        let list = categories.filter { $0.type == type }
        for index in indices {
            let item = list[index]
            modelContext.delete(item)
        }
        try? modelContext.save()
    }
}

// MARK: - swiftpm/Sources/FinanceApp.swift
@main
struct FinanceApp: App {
    @AppStorage("biometricsEnabled") private var biometricsEnabled: Bool = false
    @AppStorage("selectedAppearance") private var selectedAppearance: String = "system"
    @State private var isUnlocked: Bool = false

    var sharedModelContainer: ModelContainer = {
        let schema = Schema([
            TransactionItem.self,
            GoalItem.self,
            BudgetItem.self,
            CategoryItem.self
        ])
        let modelConfiguration = ModelConfiguration(schema: schema, isStoredInMemoryOnly: false)
        do {
            return try ModelContainer(for: schema, configurations: [modelConfiguration])
        } catch {
            fatalError("Could not create ModelContainer: \\(error)")
        }
    }()

    var body: some Scene {
        WindowGroup {
            Group {
                if biometricsEnabled && !isUnlocked {
                    LockScreenView(isUnlocked: $isUnlocked)
                } else {
                    RootTabView()
                }
            }
            .preferredColorScheme(appearanceScheme)
            .modelContainer(sharedModelContainer)
            .onAppear {
                if !biometricsEnabled {
                    isUnlocked = true
                }
                seedDefaultsIfNeeded()
            }
        }
    }

    private var appearanceScheme: ColorScheme? {
        switch selectedAppearance {
        case "light": return .light
        case "dark": return .dark
        default: return nil
        }
    }

    @MainActor
    private func seedDefaultsIfNeeded() {
        let context = sharedModelContainer.mainContext
        let descriptor = FetchDescriptor<CategoryItem>()
        guard let existing: [CategoryItem] = try? context.fetch(descriptor), existing.isEmpty else {
            return
        }

        seedDefaultCategories(into: context)
    }

    @MainActor
    private func seedDefaultCategories(into context: ModelContext) {
        let expenseCategories: [String] = [
            "Food", "Transportation", "Rent", "Bills", "Shopping",
            "Entertainment", "Travel", "Family", "Car", "Health", "Gym", "Other"
        ]
        for name: String in expenseCategories {
            let item = CategoryItem(name: name, type: "expense_category", isDefault: true)
            context.insert(item)
        }

        let incomeSources: [String] = [
            "Salary", "Bonus", "Freelance", "Business", "Investment", "Other"
        ]
        for name: String in incomeSources {
            let item = CategoryItem(name: name, type: "income_source", isDefault: true)
            context.insert(item)
        }

        try? context.save()
    }
}

// MARK: - Root Tab View

struct RootTabView: View {
    @State private var selectedTab: Int = 0

    var body: some View {
        TabView(selection: $selectedTab) {
            DashboardView(selectedTab: $selectedTab)
                .tabItem {
                    Label("Dashboard", systemImage: "house.fill")
                }
                .tag(0)

            PlansDashboardView(selectedTab: $selectedTab)
                .tabItem {
                    Label("Plans Dashboard", systemImage: "gauge.with.needle.fill")
                }
                .tag(1)

            TransactionsView()
                .tabItem {
                    Label("Transactions", systemImage: "list.bullet.rectangle.portrait.fill")
                }
                .tag(2)

            AnalyticsView()
                .tabItem {
                    Label("Analytics", systemImage: "chart.pie.fill")
                }
                .tag(3)

            GoalsView()
                .tabItem {
                    Label("Plans", systemImage: "target")
                }
                .tag(4)

            SettingsView()
                .tabItem {
                    Label("Settings", systemImage: "gearshape.fill")
                }
                .tag(5)
        }
        .tint(.indigo)
    }
}

// MARK: - Lock Screen (LocalAuthentication)

struct LockScreenView: View {
    @Binding var isUnlocked: Bool
    @State private var authError: String? = nil

    var body: some View {
        VStack(spacing: 24) {
            Spacer()

            Image(systemName: "lock.shield.fill")
                .font(.system(size: 72))
                .foregroundColor(.indigo)

            VStack(spacing: 8) {
                Text("FinanceApp Protected")
                    .font(.system(.title2, design: .rounded, weight: .bold))
                Text("Authenticate with Face ID or Device Passcode to access your finances.")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
                    .padding(.horizontal, 32)
            }

            if let error = authError {
                Text(error)
                    .font(.caption)
                    .foregroundColor(.red)
                    .padding(.horizontal)
            }

            Spacer()

            Button(action: authenticate) {
                HStack {
                    Image(systemName: "faceid")
                    Text("Unlock with Face ID")
                }
                .font(.headline)
                .foregroundColor(.white)
                .frame(maxWidth: .infinity)
                .padding()
                .background(Color.indigo)
                .cornerRadius(16)
            }
            .padding(.horizontal, 24)
            .padding(.bottom, 40)
        }
        .onAppear(perform: authenticate)
    }

    private func authenticate() {
        let context = LAContext()
        var error: NSError?

        if context.canEvaluatePolicy(.deviceOwnerAuthentication, error: &error) {
            let reason = "Unlock FinanceApp to view your balance and transactions."
            context.evaluatePolicy(.deviceOwnerAuthentication, localizedReason: reason) { success, authErr in
                DispatchQueue.main.async {
                    if success {
                        isUnlocked = true
                        authError = nil
                    } else {
                        authError = authErr?.localizedDescription ?? "Authentication failed"
                    }
                }
            }
        } else {
            // Simulator or hardware without biometrics fallback
            isUnlocked = true
        }
    }
}
`,z0=`// swift-tools-version: 5.9

// WARNING:
// This file is created and managed by Swift Playgrounds.
// It is recommended to use the Swift Playgrounds UI to edit this file.

import PackageDescription
import AppleProductTypes

let package = Package(
    name: "FinanceApp",
    platforms: [
        .iOS("17.0")
    ],
    products: [
        .iOSApplication(
            name: "FinanceApp",
            targets: ["AppModule"],
            bundleIdentifier: "com.personalfinance.iqd",
            teamIdentifier: "",
            displayVersion: "1.0",
            bundleVersion: "1",
            appIcon: .placeholder(icon: .coins),
            accentColor: .presetColor(.indigo),
            supportedDeviceFamilies: [
                .pad,
                .phone
            ],
            supportedInterfaceOrientations: [
                .portrait,
                .landscapeRight,
                .landscapeLeft,
                .portraitUpsideDown(.when(deviceFamilies: [.pad]))
            ],
            capabilities: [
                .faceID(purposeString: "Unlock your financial data, balances, and budgets with Face ID.")
            ]
        )
    ],
    targets: [
        .executableTarget(
            name: "AppModule",
            path: "."
        )
    ]
)
`,R0=`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleDevelopmentRegion</key>
    <string>en</string>
    <key>CFBundleDisplayName</key>
    <string>FinanceApp</string>
    <key>CFBundleExecutable</key>
    <string>FinanceApp</string>
    <key>CFBundleIdentifier</key>
    <string>com.financeapp.ios</string>
    <key>CFBundleInfoDictionaryVersion</key>
    <string>6.0</string>
    <key>CFBundleName</key>
    <string>FinanceApp</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleShortVersionString</key>
    <string>1.1.0</string>
    <key>CFBundleVersion</key>
    <string>1.1.0</string>
    <key>LSRequiresIPhoneOS</key>
    <true/>
    <key>NSFaceIDUsageDescription</key>
    <string>FinanceApp uses Face ID to securely authenticate and protect your sensitive financial records.</string>
    <key>UILaunchStoryboardName</key>
    <string>LaunchScreen</string>
    <key>UIRequiredDeviceCapabilities</key>
    <array>
        <string>armv7</string>
    </array>
    <key>UISupportedInterfaceOrientations</key>
    <array>
        <string>UIInterfaceOrientationPortrait</string>
    </array>
</dict>
</plist>
`,O0=`import SwiftUI
import SwiftData
import LocalAuthentication

@main
struct FinanceApp: App {
    @AppStorage("biometricsEnabled") private var biometricsEnabled: Bool = false
    @AppStorage("selectedAppearance") private var selectedAppearance: String = "system"
    @State private var isUnlocked: Bool = false

    var sharedModelContainer: ModelContainer = {
        let schema = Schema([
            TransactionItem.self,
            GoalItem.self,
            BudgetItem.self,
            CategoryItem.self
        ])
        let modelConfiguration = ModelConfiguration(schema: schema, isStoredInMemoryOnly: false)
        do {
            return try ModelContainer(for: schema, configurations: [modelConfiguration])
        } catch {
            fatalError("Could not create ModelContainer: \\(error)")
        }
    }()

    var body: some Scene {
        WindowGroup {
            Group {
                if biometricsEnabled && !isUnlocked {
                    LockScreenView(isUnlocked: $isUnlocked)
                } else {
                    RootTabView()
                }
            }
            .preferredColorScheme(appearanceScheme)
            .modelContainer(sharedModelContainer)
            .onAppear {
                if !biometricsEnabled {
                    isUnlocked = true
                }
                seedDefaultsIfNeeded()
            }
        }
    }

    private var appearanceScheme: ColorScheme? {
        switch selectedAppearance {
        case "light": return .light
        case "dark": return .dark
        default: return nil
        }
    }

    @MainActor
    private func seedDefaultsIfNeeded() {
        let context = sharedModelContainer.mainContext
        let descriptor = FetchDescriptor<CategoryItem>()
        guard let existing: [CategoryItem] = try? context.fetch(descriptor), existing.isEmpty else {
            return
        }

        seedDefaultCategories(into: context)
    }

    @MainActor
    private func seedDefaultCategories(into context: ModelContext) {
        let expenseCategories: [String] = [
            "Food", "Transportation", "Rent", "Bills", "Shopping",
            "Entertainment", "Travel", "Family", "Car", "Health", "Gym", "Other"
        ]
        for name: String in expenseCategories {
            let item = CategoryItem(name: name, type: "expense_category", isDefault: true)
            context.insert(item)
        }

        let incomeSources: [String] = [
            "Salary", "Bonus", "Freelance", "Business", "Investment", "Other"
        ]
        for name: String in incomeSources {
            let item = CategoryItem(name: name, type: "income_source", isDefault: true)
            context.insert(item)
        }

        try? context.save()
    }
}

// MARK: - Root Tab View

struct RootTabView: View {
    @State private var selectedTab: Int = 0

    var body: some View {
        TabView(selection: $selectedTab) {
            DashboardView(selectedTab: $selectedTab)
                .tabItem {
                    Label("Dashboard", systemImage: "house.fill")
                }
                .tag(0)

            PlansDashboardView(selectedTab: $selectedTab)
                .tabItem {
                    Label("Plans Dashboard", systemImage: "gauge.with.needle.fill")
                }
                .tag(1)

            TransactionsView()
                .tabItem {
                    Label("Transactions", systemImage: "list.bullet.rectangle.portrait.fill")
                }
                .tag(2)

            AnalyticsView()
                .tabItem {
                    Label("Analytics", systemImage: "chart.pie.fill")
                }
                .tag(3)

            GoalsView()
                .tabItem {
                    Label("Plans", systemImage: "target")
                }
                .tag(4)

            SettingsView()
                .tabItem {
                    Label("Settings", systemImage: "gearshape.fill")
                }
                .tag(5)
        }
        .tint(.indigo)
    }
}

// MARK: - Lock Screen (LocalAuthentication)

struct LockScreenView: View {
    @Binding var isUnlocked: Bool
    @State private var authError: String? = nil

    var body: some View {
        VStack(spacing: 24) {
            Spacer()

            Image(systemName: "lock.shield.fill")
                .font(.system(size: 72))
                .foregroundColor(.indigo)

            VStack(spacing: 8) {
                Text("FinanceApp Protected")
                    .font(.system(.title2, design: .rounded, weight: .bold))
                Text("Authenticate with Face ID or Device Passcode to access your finances.")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
                    .padding(.horizontal, 32)
            }

            if let error = authError {
                Text(error)
                    .font(.caption)
                    .foregroundColor(.red)
                    .padding(.horizontal)
            }

            Spacer()

            Button(action: authenticate) {
                HStack {
                    Image(systemName: "faceid")
                    Text("Unlock with Face ID")
                }
                .font(.headline)
                .foregroundColor(.white)
                .frame(maxWidth: .infinity)
                .padding()
                .background(Color.indigo)
                .cornerRadius(16)
            }
            .padding(.horizontal, 24)
            .padding(.bottom, 40)
        }
        .onAppear(perform: authenticate)
    }

    private func authenticate() {
        let context = LAContext()
        var error: NSError?

        if context.canEvaluatePolicy(.deviceOwnerAuthentication, error: &error) {
            let reason = "Unlock FinanceApp to view your balance and transactions."
            context.evaluatePolicy(.deviceOwnerAuthentication, localizedReason: reason) { success, authErr in
                DispatchQueue.main.async {
                    if success {
                        isUnlocked = true
                        authError = nil
                    } else {
                        authError = authErr?.localizedDescription ?? "Authentication failed"
                    }
                }
            }
        } else {
            // Simulator or hardware without biometrics fallback
            isUnlocked = true
        }
    }
}
`,I0=`import Foundation
import SwiftData

@Model
final class TransactionItem {
    var id: UUID = UUID()
    var type: String = "expense" // "income" or "expense"
    var amount: Double = 0.0
    var currency: String = "IQD"
    var date: Date = Date()
    var category: String = "Food"
    var source: String = ""
    var itemDescription: String = ""
    var notes: String = ""
    var createdAt: Date = Date()
    var updatedAt: Date = Date()

    init(
        id: UUID = UUID(),
        type: String,
        amount: Double,
        currency: String = "IQD",
        date: Date = Date(),
        category: String = "Food",
        source: String = "",
        itemDescription: String = "",
        notes: String = "",
        createdAt: Date = Date(),
        updatedAt: Date = Date()
    ) {
        self.id = id
        self.type = type
        self.amount = amount
        self.currency = currency
        self.date = date
        self.category = category
        self.source = source
        self.itemDescription = itemDescription
        self.notes = notes
        self.createdAt = createdAt
        self.updatedAt = updatedAt
    }
}

@Model
final class GoalItem {
    var id: UUID = UUID()
    var name: String = ""
    var targetAmount: Double = 0.0
    var allocatedAmount: Double = 0.0
    var currency: String = "IQD"
    var targetDate: Date? = nil
    var goalDescription: String = ""
    var planDescription: String = ""
    var priority: String = "medium" // "critical", "high", "medium", "low"
    var plannedMonthlyAmount: Double = 0.0
    var isCompleted: Bool = false
    var createdAt: Date = Date()
    var updatedAt: Date = Date()
    var completedAt: Date? = nil

    init(
        id: UUID = UUID(),
        name: String,
        targetAmount: Double,
        allocatedAmount: Double = 0.0,
        currency: String = "IQD",
        targetDate: Date? = nil,
        goalDescription: String = "",
        planDescription: String = "",
        priority: String = "medium",
        plannedMonthlyAmount: Double = 0.0,
        isCompleted: Bool = false,
        createdAt: Date = Date(),
        updatedAt: Date = Date(),
        completedAt: Date? = nil
    ) {
        self.id = id
        self.name = name
        self.targetAmount = targetAmount
        self.allocatedAmount = allocatedAmount
        self.currency = currency
        self.targetDate = targetDate
        self.goalDescription = goalDescription
        self.planDescription = planDescription.isEmpty ? goalDescription : planDescription
        self.priority = priority
        self.plannedMonthlyAmount = plannedMonthlyAmount
        self.isCompleted = isCompleted
        self.createdAt = createdAt
        self.updatedAt = updatedAt
        self.completedAt = completedAt
    }
}

typealias PlanItem = GoalItem

@Model
final class BudgetItem {
    var id: UUID = UUID()
    var category: String = ""
    var monthlyLimit: Double = 0.0
    var createdAt: Date = Date()

    init(
        id: UUID = UUID(),
        category: String,
        monthlyLimit: Double,
        createdAt: Date = Date()
    ) {
        self.id = id
        self.category = category
        self.monthlyLimit = monthlyLimit
        self.createdAt = createdAt
    }
}

@Model
final class CategoryItem {
    var id: UUID = UUID()
    var name: String = ""
    var type: String = "expense_category" // "income_source" or "expense_category"
    var isDefault: Bool = false

    init(
        id: UUID = UUID(),
        name: String,
        type: String,
        isDefault: Bool = false
    ) {
        self.id = id
        self.name = name
        self.type = type
        self.isDefault = isDefault
    }
}
`,L0=`import Foundation
import SwiftUI

struct CurrencyFormatter {
    static func format(_ amount: Double, currency: String = "IQD") -> String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.maximumFractionDigits = 0
        formatter.groupingSeparator = ","
        
        let formattedNumber = formatter.string(from: NSNumber(value: amount)) ?? "\\(Int(amount))"
        return "\\(formattedNumber) \\(currency)"
    }
    
    static func formatSigned(_ amount: Double, type: String, currency: String = "IQD") -> String {
        let prefix = type.lowercased() == "income" ? "+" : "-"
        return "\\(prefix)\\(format(amount, currency: currency))"
    }
}

extension Date {
    func formattedShort() -> String {
        let formatter = DateFormatter()
        formatter.dateStyle = .medium
        formatter.timeStyle = .none
        return formatter.string(from: self)
    }

    func monthYearString() -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "LLLL yyyy"
        return formatter.string(from: self)
    }
}
`,U0=`import Foundation
import SwiftUI

@Observable
final class FinancialEngine {
    static let shared = FinancialEngine()

    // MARK: - Core Calculations

    /// Total sum of all income transactions
    func totalIncome(transactions: [TransactionItem]) -> Double {
        transactions
            .filter { $0.type.lowercased() == "income" }
            .reduce(0.0) { $0 + $1.amount }
    }

    /// Total sum of all expense transactions
    func totalExpenses(transactions: [TransactionItem]) -> Double {
        transactions
            .filter { $0.type.lowercased() == "expense" }
            .reduce(0.0) { $0 + $1.amount }
    }

    /// Actual balance = totalIncome - totalExpenses
    func actualBalance(transactions: [TransactionItem]) -> Double {
        totalIncome(transactions: transactions) - totalExpenses(transactions: transactions)
    }

    /// Total allocated amount for all active (uncompleted) goals
    func totalAllocatedToGoals(goals: [GoalItem]) -> Double {
        goals
            .filter { !$0.isCompleted }
            .reduce(0.0) { $0 + $1.allocatedAmount }
    }

    /// Unallocated / Available balance = actualBalance - totalAllocatedToGoals
    func unallocatedBalance(transactions: [TransactionItem], goals: [GoalItem]) -> Double {
        actualBalance(transactions: transactions) - totalAllocatedToGoals(goals: goals)
    }

    /// Income in a specific month
    func monthlyIncome(transactions: [TransactionItem], date: Date = Date()) -> Double {
        let calendar = Calendar.current
        return transactions
            .filter {
                $0.type.lowercased() == "income" &&
                calendar.isDate($0.date, equalTo: date, toGranularity: .month) &&
                calendar.isDate($0.date, equalTo: date, toGranularity: .year)
            }
            .reduce(0.0) { $0 + $1.amount }
    }

    /// Expenses in a specific month
    func monthlyExpenses(transactions: [TransactionItem], date: Date = Date()) -> Double {
        let calendar = Calendar.current
        return transactions
            .filter {
                $0.type.lowercased() == "expense" &&
                calendar.isDate($0.date, equalTo: date, toGranularity: .month) &&
                calendar.isDate($0.date, equalTo: date, toGranularity: .year)
            }
            .reduce(0.0) { $0 + $1.amount }
    }

    /// Net savings in a specific month = monthlyIncome - monthlyExpenses
    func monthlySavings(transactions: [TransactionItem], date: Date = Date()) -> Double {
        monthlyIncome(transactions: transactions, date: date) - monthlyExpenses(transactions: transactions, date: date)
    }

    /// Historical monthly average savings calculated across distinct calendar months with transactions
    func historicalMonthlyAverageSavings(transactions: [TransactionItem]) -> Double {
        guard !transactions.isEmpty else { return 0.0 }
        let calendar = Calendar.current
        var monthBuckets: [String: (income: Double, expense: Double)] = [:]

        for item in transactions {
            let year = calendar.component(.year, from: item.date)
            let month = calendar.component(.month, from: item.date)
            let key = "\\(year)-\\(month)"
            var current = monthBuckets[key] ?? (income: 0.0, expense: 0.0)
            if item.type.lowercased() == "income" {
                current.income += item.amount
            } else {
                current.expense += item.amount
            }
            monthBuckets[key] = current
        }

        guard !monthBuckets.isEmpty else { return 0.0 }
        let totalNet = monthBuckets.values.reduce(0.0) { $0 + ($1.income - $1.expense) }
        return totalNet / Double(monthBuckets.count)
    }

    // MARK: - Goal Achievability Assessment

    struct GoalAnalysis {
        enum Status {
            case completed
            case achievable
            case atRisk
            case unlikely
        }

        let status: Status
        let statusTitle: String
        let statusColor: Color
        let explanation: String
        let requiredMonthlySavings: Double?
        let monthsRemaining: Int?
        let shortfallMonthly: Double?
        let extensionMonths: Int?
    }

    func analyzeGoal(
        goal: GoalItem,
        unallocatedBalance: Double,
        historicalAvgSavings: Double
    ) -> GoalAnalysis {
        if goal.isCompleted || goal.allocatedAmount >= goal.targetAmount {
            return GoalAnalysis(
                status: .completed,
                statusTitle: "Completed",
                statusColor: .green,
                explanation: "Goal achieved!",
                requiredMonthlySavings: 0,
                monthsRemaining: 0,
                shortfallMonthly: nil,
                extensionMonths: nil
            )
        }

        let remainingAmount = max(0.0, goal.targetAmount - goal.allocatedAmount)

        // Case A: Goal without Target Date
        guard let targetDate = goal.targetDate else {
            if unallocatedBalance >= remainingAmount {
                return GoalAnalysis(
                    status: .achievable,
                    statusTitle: "Achievable",
                    statusColor: .green,
                    explanation: "Achievable immediately with current unallocated balance.",
                    requiredMonthlySavings: nil,
                    monthsRemaining: nil,
                    shortfallMonthly: nil,
                    extensionMonths: nil
                )
            } else {
                let shortfall = remainingAmount - unallocatedBalance
                return GoalAnalysis(
                    status: .atRisk,
                    statusTitle: "Not Currently Achievable",
                    statusColor: .orange,
                    explanation: "Shortfall: \\(CurrencyFormatter.format(shortfall)) from current available cash.",
                    requiredMonthlySavings: nil,
                    monthsRemaining: nil,
                    shortfallMonthly: shortfall,
                    extensionMonths: nil
                )
            }
        }

        // Case B: Goal with Target Date
        let calendar = Calendar.current
        let comps = calendar.dateComponents([.month], from: Date(), to: targetDate)
        let monthsRemaining = max(1, comps.month ?? 1)
        let requiredMonthly = remainingAmount / Double(monthsRemaining)

        if historicalAvgSavings >= (requiredMonthly * 1.15) {
            return GoalAnalysis(
                status: .achievable,
                statusTitle: "Achievable",
                statusColor: .green,
                explanation: "On track! Required: \\(CurrencyFormatter.format(requiredMonthly))/mo (Your avg savings: \\(CurrencyFormatter.format(historicalAvgSavings))/mo)",
                requiredMonthlySavings: requiredMonthly,
                monthsRemaining: monthsRemaining,
                shortfallMonthly: nil,
                extensionMonths: nil
            )
        } else if historicalAvgSavings >= requiredMonthly {
            let tightMargin = (requiredMonthly * 1.15) - historicalAvgSavings
            return GoalAnalysis(
                status: .atRisk,
                statusTitle: "At Risk (Tight Margin)",
                statusColor: .orange,
                explanation: "Buffer is under 15%. Required: \\(CurrencyFormatter.format(requiredMonthly))/mo",
                requiredMonthlySavings: requiredMonthly,
                monthsRemaining: monthsRemaining,
                shortfallMonthly: tightMargin,
                extensionMonths: nil
            )
        } else {
            let shortfallMonthly = max(0, requiredMonthly - historicalAvgSavings)
            var extensionMonths: Int? = nil
            if historicalAvgSavings > 0 {
                let monthsNeededAtCurrentRate = Int(ceil(remainingAmount / historicalAvgSavings))
                extensionMonths = max(1, monthsNeededAtCurrentRate - monthsRemaining)
            }

            return GoalAnalysis(
                status: .unlikely,
                statusTitle: "Unlikely to Be Achievable",
                statusColor: .red,
                explanation: "Monthly shortfall of \\(CurrencyFormatter.format(shortfallMonthly))/mo at your current average savings.",
                requiredMonthlySavings: requiredMonthly,
                monthsRemaining: monthsRemaining,
                shortfallMonthly: shortfallMonthly,
                extensionMonths: extensionMonths
            )
        }
    }
}
`,V0=`import SwiftUI
import SwiftData

struct DashboardView: View {
    @Binding var selectedTab: Int
    @Query(sort: \\TransactionItem.date, order: .reverse) private var transactions: [TransactionItem]
    @Query(filter: #Predicate<GoalItem> { !$0.isCompleted }, sort: \\GoalItem.createdAt) private var activeGoals: [GoalItem]

    @State private var showAddSheet: Bool = false
    private let engine = FinancialEngine.shared

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    // 1. Top Balance Card (Actual Balance vs Unallocated Balance)
                    topBalanceCard

                    // 2. Monthly Performance Card
                    monthlyPerformanceCard

                    // 3. Active Goals Snapshot
                    goalsSnapshotSection

                    // 4. Recent Transactions Section
                    recentTransactionsSection
                }
                .padding(.horizontal, 16)
                .padding(.top, 12)
                .padding(.bottom, 24)
            }
            .navigationTitle("FinanceApp")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button {
                        showAddSheet = true
                    } label: {
                        Image(systemName: "plus.circle.fill")
                            .font(.system(size: 22))
                            .foregroundColor(.indigo)
                    }
                }
            }
            .sheet(isPresented: $showAddSheet) {
                QuickAddTransactionSheet()
            }
        }
    }

    // MARK: - Subviews

    private var topBalanceCard: some View {
        let actualBal = engine.actualBalance(transactions: transactions)
        let unallocatedBal = engine.unallocatedBalance(transactions: transactions, goals: activeGoals)
        let totalAllocated = engine.totalAllocatedToGoals(goals: activeGoals)

        return VStack(alignment: .leading, spacing: 14) {
            HStack {
                Text("CURRENT ACTUAL BALANCE")
                    .font(.caption)
                    .fontWeight(.semibold)
                    .foregroundColor(.white.opacity(0.8))
                Spacer()
                Image(systemName: "banknote.fill")
                    .foregroundColor(.white.opacity(0.9))
            }

            Text(CurrencyFormatter.format(actualBal))
                .font(.system(size: 32, weight: .bold, design: .rounded))
                .foregroundColor(.white)
                .lineLimit(1)
                .minimumScaleFactor(0.7)

            Divider()
                .background(Color.white.opacity(0.25))

            HStack(alignment: .center) {
                VStack(alignment: .leading, spacing: 2) {
                    Text("Available / Unallocated")
                        .font(.caption2)
                        .foregroundColor(.white.opacity(0.75))
                    Text(CurrencyFormatter.format(unallocatedBal))
                        .font(.system(.subheadline, design: .rounded, weight: .semibold))
                        .foregroundColor(.white)
                }
                Spacer()
                VStack(alignment: .trailing, spacing: 2) {
                    Text("Allocated to Goals")
                        .font(.caption2)
                        .foregroundColor(.white.opacity(0.75))
                    Text(CurrencyFormatter.format(totalAllocated))
                        .font(.system(.subheadline, design: .rounded, weight: .semibold))
                        .foregroundColor(.white.opacity(0.9))
                }
            }
        }
        .padding(20)
        .background(
            LinearGradient(
                colors: [Color(red: 0.28, green: 0.24, blue: 0.72), Color(red: 0.18, green: 0.14, blue: 0.52)],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
        )
        .clipShape(RoundedRectangle(cornerRadius: 20, style: .continuous))
        .shadow(color: Color.indigo.opacity(0.25), radius: 10, x: 0, y: 6)
    }

    private var monthlyPerformanceCard: some View {
        let mIncome = engine.monthlyIncome(transactions: transactions)
        let mExpenses = engine.monthlyExpenses(transactions: transactions)
        let mSavings = engine.monthlySavings(transactions: transactions)
        let calendar = Calendar.current
        let currentMonthCount = transactions.filter {
            calendar.isDate($0.date, equalTo: Date(), toGranularity: .month) &&
            calendar.isDate($0.date, equalTo: Date(), toGranularity: .year)
        }.count

        return VStack(alignment: .leading, spacing: 14) {
            HStack {
                Text("This Month's Performance")
                    .font(.system(.headline, design: .rounded))
                Spacer()
                Text(Date().monthYearString())
                    .font(.caption)
                    .foregroundColor(.secondary)
            }

            HStack(spacing: 12) {
                metricCell(
                    title: "Income",
                    amount: mIncome,
                    color: .green,
                    icon: "arrow.down.left"
                )
                metricCell(
                    title: "Expenses",
                    amount: mExpenses,
                    color: .red,
                    icon: "arrow.up.right"
                )
            }

            HStack(spacing: 12) {
                metricCell(
                    title: "Net Savings",
                    amount: mSavings,
                    color: mSavings >= 0 ? .indigo : .red,
                    icon: "leaf.fill"
                )
                VStack(alignment: .leading, spacing: 4) {
                    Text("Transactions")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                    Text("\\(currentMonthCount)")
                        .font(.system(.title3, design: .rounded, weight: .bold))
                    Text("Recorded this month")
                        .font(.system(size: 10))
                        .foregroundColor(.secondary)
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(12)
                .background(Color(.secondarySystemBackground))
                .cornerRadius(12)
            }
        }
        .padding(18)
        .background(Color(.secondarySystemGroupedBackground))
        .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
    }

    private func metricCell(title: String, amount: Double, color: Color, icon: String) -> some View {
        VStack(alignment: .leading, spacing: 4) {
            HStack(spacing: 4) {
                Image(systemName: icon)
                    .font(.caption2)
                    .foregroundColor(color)
                Text(title)
                    .font(.caption2)
                    .foregroundColor(.secondary)
            }
            Text(CurrencyFormatter.format(amount))
                .font(.system(.subheadline, design: .rounded, weight: .bold))
                .foregroundColor(color)
                .lineLimit(1)
                .minimumScaleFactor(0.7)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(12)
        .background(Color(.secondarySystemBackground))
        .cornerRadius(12)
    }

    private var goalsSnapshotSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text("Active Plans Snapshot")
                    .font(.system(.headline, design: .rounded))
                Spacer()
                Button("View All") {
                    selectedTab = 4 // Switch to Plans Tab
                }
                .font(.subheadline)
                .foregroundColor(.indigo)
            }

            if activeGoals.isEmpty {
                HStack {
                    Image(systemName: "target")
                        .foregroundColor(.secondary)
                    Text("No active goals yet. Create one to start saving!")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                }
                .padding()
                .frame(maxWidth: .infinity)
                .background(Color(.secondarySystemGroupedBackground))
                .cornerRadius(14)
            } else {
                VStack(spacing: 10) {
                    ForEach(activeGoals.prefix(3)) { goal in
                        let unallocated = engine.unallocatedBalance(transactions: transactions, goals: activeGoals)
                        let avgSavings = engine.historicalMonthlyAverageSavings(transactions: transactions)
                        let analysis = engine.analyzeGoal(goal: goal, unallocatedBalance: unallocated, historicalAvgSavings: avgSavings)
                        let progress = goal.targetAmount > 0 ? min(1.0, goal.allocatedAmount / goal.targetAmount) : 0.0
                        let remaining = max(0.0, goal.targetAmount - goal.allocatedAmount)

                        VStack(alignment: .leading, spacing: 8) {
                            HStack {
                                Text(goal.name)
                                    .font(.subheadline.weight(.semibold))
                                Spacer()
                                Text(analysis.statusTitle)
                                    .font(.caption2.weight(.bold))
                                    .padding(.horizontal, 8)
                                    .padding(.vertical, 3)
                                    .background(analysis.statusColor.opacity(0.15))
                                    .foregroundColor(analysis.statusColor)
                                    .clipShape(Capsule())
                            }

                            ProgressView(value: progress)
                                .tint(.indigo)

                            HStack {
                                Text("\\(Int(progress * 100))% saved")
                                    .font(.caption2)
                                    .foregroundColor(.secondary)
                                Spacer()
                                Text("Remaining: \\(CurrencyFormatter.format(remaining))")
                                    .font(.caption2.weight(.medium))
                                    .foregroundColor(.secondary)
                            }
                        }
                        .padding(14)
                        .background(Color(.secondarySystemGroupedBackground))
                        .cornerRadius(14)
                    }
                }
            }
        }
    }

    private var recentTransactionsSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text("Recent Transactions")
                    .font(.system(.headline, design: .rounded))
                Spacer()
                Button("View All") {
                    selectedTab = 2 // Switch to Transactions Tab
                }
                .font(.subheadline)
                .foregroundColor(.indigo)
            }

            if transactions.isEmpty {
                HStack {
                    Image(systemName: "tray")
                        .foregroundColor(.secondary)
                    Text("No transactions logged yet.")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                }
                .padding()
                .frame(maxWidth: .infinity)
                .background(Color(.secondarySystemGroupedBackground))
                .cornerRadius(14)
            } else {
                VStack(spacing: 8) {
                    ForEach(transactions.prefix(5)) { item in
                        TransactionRow(item: item)
                    }
                }
            }
        }
    }
}
`,G0=`import SwiftUI
import SwiftData

struct PlansDashboardView: View {
    @Environment(\\.modelContext) private var modelContext
    @Query(sort: \\GoalItem.createdAt, order: .reverse) private var allGoals: [GoalItem]
    @Query private var transactions: [TransactionItem]

    @Binding var selectedTab: Int

    @State private var incomeBoost: Double = 0.0
    @State private var expenseCut: Double = 0.0
    @State private var lumpSum: Double = 0.0

    private let engine = FinancialEngine.shared

    private var activeGoals: [GoalItem] {
        allGoals.filter { !$0.isCompleted }
    }

    private var unallocatedBalance: Double {
        engine.unallocatedBalance(transactions: transactions, goals: allGoals)
    }

    private var monthlyCapacity: Double {
        let monthly = engine.monthlySavings(transactions: transactions)
        return monthly > 0 ? monthly : max(0.0, engine.historicalMonthlyAverageSavings(transactions: transactions))
    }

    private var totalPlannedMonthlyCommitment: Double {
        activeGoals.reduce(0.0) { sum, goal in
            let remaining = max(0.0, goal.targetAmount - goal.allocatedAmount)
            if let date = goal.targetDate {
                let months = max(1, Calendar.current.dateComponents([.month], from: Date(), to: date).month ?? 1)
                return sum + (remaining / Double(months))
            }
            return sum + (remaining / 12.0)
        }
    }

    private var capacityVariance: Double {
        monthlyCapacity - totalPlannedMonthlyCommitment
    }

    private var healthStatus: String {
        if capacityVariance >= 0 {
            return "Healthy"
        } else if abs(capacityVariance) < (monthlyCapacity * 0.2) {
            return "Tight"
        } else {
            return "Overcommitted"
        }
    }

    private var healthColor: Color {
        switch healthStatus {
        case "Healthy": return .green
        case "Tight": return .orange
        default: return .red
        }
    }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    // MARK: - Financial Position & Capacity Header
                    VStack(alignment: .leading, spacing: 14) {
                        HStack {
                            VStack(alignment: .leading, spacing: 2) {
                                Text("FINANCIAL POSITION")
                                    .font(.caption2)
                                    .fontWeight(.bold)
                                    .foregroundColor(.secondary)
                                Text("Planning Control Center")
                                    .font(.system(.title2, design: .rounded, weight: .bold))
                            }
                            Spacer()
                            Text(healthStatus)
                                .font(.caption2)
                                .fontWeight(.black)
                                .padding(.horizontal, 10)
                                .padding(.vertical, 4)
                                .background(healthColor.opacity(0.15))
                                .foregroundColor(healthColor)
                                .clipShape(Capsule())
                        }

                        // Capacity Metric Cards
                        HStack(spacing: 12) {
                            VStack(alignment: .leading, spacing: 4) {
                                Text("MONTHLY CAPACITY")
                                    .font(.system(size: 10, weight: .bold))
                                    .foregroundColor(.secondary)
                                Text(CurrencyFormatter.format(monthlyCapacity))
                                    .font(.system(.title3, design: .rounded, weight: .bold))
                                    .foregroundColor(.green)
                                Text("Available monthly flow")
                                    .font(.system(size: 10))
                                    .foregroundColor(.secondary)
                            }
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .padding(14)
                            .background(Color(.secondarySystemBackground))
                            .cornerRadius(16)

                            VStack(alignment: .leading, spacing: 4) {
                                Text("PLANNED COMMITMENT")
                                    .font(.system(size: 10, weight: .bold))
                                    .foregroundColor(.secondary)
                                Text(CurrencyFormatter.format(totalPlannedMonthlyCommitment))
                                    .font(.system(.title3, design: .rounded, weight: .bold))
                                    .foregroundColor(.blue)
                                Text("\\(activeGoals.count) active plans")
                                    .font(.system(size: 10))
                                    .foregroundColor(.secondary)
                            }
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .padding(14)
                            .background(Color(.secondarySystemBackground))
                            .cornerRadius(16)
                        }

                        // Variance Indicator
                        HStack {
                            Label(
                                capacityVariance >= 0 ? "Capacity Surplus" : "Capacity Deficit",
                                systemImage: capacityVariance >= 0 ? "checkmark.circle.fill" : "exclamationmark.triangle.fill"
                            )
                            .font(.footnote)
                            .foregroundColor(.secondary)

                            Spacer()

                            Text("\\(capacityVariance >= 0 ? "+" : "")\\(CurrencyFormatter.format(capacityVariance))/mo")
                                .font(.footnote)
                                .fontWeight(.bold)
                                .foregroundColor(capacityVariance >= 0 ? .green : .red)
                        }
                        .padding(12)
                        .background(Color(.secondarySystemBackground))
                        .cornerRadius(12)
                    }
                    .padding(18)
                    .background(Color(.systemBackground))
                    .cornerRadius(20)
                    .shadow(color: Color.black.opacity(0.04), radius: 8, x: 0, y: 2)

                    // MARK: - Navigation to Plans List
                    Button(action: {
                        selectedTab = 4 // Navigate to Plans Tab
                    }) {
                        HStack {
                            VStack(alignment: .leading, spacing: 2) {
                                Text("Manage Individual Plans")
                                    .font(.headline)
                                    .foregroundColor(.primary)
                                Text("\\(activeGoals.count) active plans awaiting allocation")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                            }
                            Spacer()
                            Image(systemName: "arrow.right.circle.fill")
                                .font(.title2)
                                .foregroundColor(.indigo)
                        }
                        .padding(16)
                        .background(Color(.systemBackground))
                        .cornerRadius(16)
                        .shadow(color: Color.black.opacity(0.03), radius: 6, x: 0, y: 2)
                    }

                    // MARK: - What-If Planning Simulator
                    VStack(alignment: .leading, spacing: 14) {
                        HStack {
                            Image(systemName: "slider.horizontal.3")
                                .foregroundColor(.indigo)
                            Text("What-If Planning Simulator")
                                .font(.system(.headline, design: .rounded))
                            Spacer()
                            if incomeBoost > 0 || expenseCut > 0 || lumpSum > 0 {
                                Button("Reset") {
                                    incomeBoost = 0
                                    expenseCut = 0
                                    lumpSum = 0
                                }
                                .font(.caption)
                                .foregroundColor(.indigo)
                            }
                        }

                        Text("Test how increasing income, reducing expenses, or adding a lump sum accelerates your plans.")
                            .font(.caption)
                            .foregroundColor(.secondary)

                        // Income boost slider
                        VStack(alignment: .leading, spacing: 6) {
                            HStack {
                                Text("Monthly Income Boost")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                                Spacer()
                                Text("+\\(CurrencyFormatter.format(incomeBoost))")
                                    .font(.caption)
                                    .fontWeight(.bold)
                                    .foregroundColor(.green)
                            }
                            Slider(value: $incomeBoost, in: 0...5_000_000, step: 50_000)
                                .tint(.green)
                        }

                        // Expense cut slider
                        VStack(alignment: .leading, spacing: 6) {
                            HStack {
                                Text("Monthly Expense Reduction")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                                Spacer()
                                Text("-\\(CurrencyFormatter.format(expenseCut))")
                                    .font(.caption)
                                    .fontWeight(.bold)
                                    .foregroundColor(.blue)
                            }
                            Slider(value: $expenseCut, in: 0...3_000_000, step: 25_000)
                                .tint(.blue)
                        }

                        // Lump sum slider
                        VStack(alignment: .leading, spacing: 6) {
                            HStack {
                                Text("Lump Sum Injection")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                                Spacer()
                                Text("+\\(CurrencyFormatter.format(lumpSum))")
                                    .font(.caption)
                                    .fontWeight(.bold)
                                    .foregroundColor(.indigo)
                            }
                            Slider(value: $lumpSum, in: 0...20_000_000, step: 250_000)
                                .tint(.indigo)
                        }

                        // Simulated Result Box
                        let adjustedCapacity = monthlyCapacity + incomeBoost + expenseCut
                        let simulatedVariance = adjustedCapacity - totalPlannedMonthlyCommitment

                        VStack(spacing: 8) {
                            HStack {
                                Text("Adjusted Monthly Capacity:")
                                    .font(.footnote)
                                    .foregroundColor(.secondary)
                                Spacer()
                                Text(CurrencyFormatter.format(adjustedCapacity))
                                    .font(.footnote)
                                    .fontWeight(.bold)
                                    .foregroundColor(.green)
                            }

                            HStack {
                                Text("Simulated Monthly Variance:")
                                    .font(.footnote)
                                    .foregroundColor(.secondary)
                                Spacer()
                                Text("\\(simulatedVariance >= 0 ? "+" : "")\\(CurrencyFormatter.format(simulatedVariance))/mo")
                                    .font(.footnote)
                                    .fontWeight(.bold)
                                    .foregroundColor(simulatedVariance >= 0 ? .green : .red)
                            }
                        }
                        .padding(12)
                        .background(Color(.secondarySystemBackground))
                        .cornerRadius(12)
                    }
                    .padding(18)
                    .background(Color(.systemBackground))
                    .cornerRadius(20)
                    .shadow(color: Color.black.opacity(0.04), radius: 8, x: 0, y: 2)
                }
                .padding(.horizontal, 16)
                .padding(.vertical, 12)
            }
            .navigationTitle("Plans Dashboard")
            .navigationBarTitleDisplayMode(.inline)
            .background(Color(.systemGroupedBackground))
        }
    }
}
`,H0=`import SwiftUI
import SwiftData

struct QuickAddTransactionSheet: View {
    @Environment(\\.dismiss) private var dismiss
    @Environment(\\.modelContext) private var modelContext

    @Query(filter: #Predicate<CategoryItem> { $0.type == "expense_category" })
    private var expenseCategories: [CategoryItem]

    @Query(filter: #Predicate<CategoryItem> { $0.type == "income_source" })
    private var incomeSources: [CategoryItem]

    @State private var transactionType: String = "expense"
    @State private var amountString: String = ""
    @State private var date: Date = Date()
    @State private var selectedCategory: String = "Food"
    @State private var selectedSource: String = "Salary"
    @State private var customCategory: String = ""
    @State private var isAddingCustomCategory: Bool = false
    @State private var customSource: String = ""
    @State private var isAddingCustomSource: Bool = false
    @State private var itemDescription: String = ""
    @State private var notes: String = ""
    @State private var validationError: String? = nil

    var body: some View {
        NavigationStack {
            Form {
                // Type Selector
                Section {
                    Picker("Type", selection: $transactionType) {
                        Text("Expense").tag("expense")
                        Text("Income").tag("income")
                    }
                    .pickerStyle(.segmented)
                }

                // Amount
                Section {
                    HStack {
                        Text("IQD")
                            .font(.headline)
                            .foregroundColor(.secondary)
                        TextField("0", text: $amountString)
                            .keyboardType(.numberPad)
                            .font(.system(.title2, design: .rounded, weight: .bold))
                    }
                } header: {
                    Text("Amount (Iraqi Dinar)")
                } footer: {
                    if let error = validationError {
                        Text(error)
                            .foregroundColor(.red)
                    }
                }

                // Date
                Section("Date & Time") {
                    DatePicker("Date", selection: $date, displayedComponents: [.date, .hourAndMinute])
                }

                // Conditional Category or Source
                if transactionType == "expense" {
                    Section("Category") {
                        Picker("Category", selection: $selectedCategory) {
                            ForEach(categoryOptions, id: \\.self) { cat in
                                Text(cat).tag(cat)
                            }
                        }

                        if isAddingCustomCategory {
                            HStack {
                                TextField("New Category Name", text: $customCategory)
                                Button("Save") {
                                    saveCustomCategory()
                                }
                                .disabled(customCategory.trimmingCharacters(in: .whitespaces).isEmpty)
                            }
                        } else {
                            Button("+ Add Custom Category") {
                                isAddingCustomCategory = true
                            }
                            .font(.subheadline)
                            .foregroundColor(.indigo)
                        }
                    }

                    Section("Merchant / Details") {
                        TextField("Merchant or Payee (e.g. Carrefour, Al-Mansour)", text: $itemDescription)
                        TextField("Notes (optional)", text: $notes)
                    }
                } else {
                    Section("Income Source") {
                        Picker("Source", selection: $selectedSource) {
                            ForEach(sourceOptions, id: \\.self) { src in
                                Text(src).tag(src)
                            }
                        }

                        if isAddingCustomSource {
                            HStack {
                                TextField("New Source Name", text: $customSource)
                                Button("Save") {
                                    saveCustomSource()
                                }
                                .disabled(customSource.trimmingCharacters(in: .whitespaces).isEmpty)
                            }
                        } else {
                            Button("+ Add Custom Source") {
                                isAddingCustomSource = true
                            }
                            .font(.subheadline)
                            .foregroundColor(.indigo)
                        }
                    }

                    Section("Income Details") {
                        TextField("Description (e.g. Monthly Salary, Bonus)", text: $itemDescription)
                        TextField("Notes (optional)", text: $notes)
                    }
                }
            }
            .navigationTitle("New \\(transactionType == "income" ? "Income" : "Expense")")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") {
                        dismiss()
                    }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Save") {
                        saveTransaction()
                    }
                    .fontWeight(.semibold)
                }
            }
        }
    }

    private var categoryOptions: [String] {
        let dbCategories: [String] = expenseCategories.map { $0.name }
        let defaults: [String] = [
            "Food", "Transportation", "Rent", "Bills", "Shopping",
            "Entertainment", "Travel", "Family", "Car", "Health", "Gym", "Other"
        ]
        return Array(Set(dbCategories + defaults)).sorted()
    }

    private var sourceOptions: [String] {
        let dbSources: [String] = incomeSources.map { $0.name }
        let defaults: [String] = ["Salary", "Bonus", "Freelance", "Business", "Investment", "Other"]
        return Array(Set(dbSources + defaults)).sorted()
    }

    private func saveCustomCategory() {
        let trimmed = customCategory.trimmingCharacters(in: .whitespaces)
        guard !trimmed.isEmpty else { return }
        let newCat = CategoryItem(name: trimmed, type: "expense_category", isDefault: false)
        modelContext.insert(newCat)
        selectedCategory = trimmed
        customCategory = ""
        isAddingCustomCategory = false
    }

    private func saveCustomSource() {
        let trimmed = customSource.trimmingCharacters(in: .whitespaces)
        guard !trimmed.isEmpty else { return }
        let newSrc = CategoryItem(name: trimmed, type: "income_source", isDefault: false)
        modelContext.insert(newSrc)
        selectedSource = trimmed
        customSource = ""
        isAddingCustomSource = false
    }

    private func saveTransaction() {
        let cleanAmount = amountString.replacingOccurrences(of: ",", with: "").trimmingCharacters(in: .whitespaces)
        guard let amount = Double(cleanAmount), amount > 0 else {
            validationError = "Please enter a valid amount greater than 0 IQD."
            return
        }

        let newTransaction = TransactionItem(
            type: transactionType,
            amount: amount,
            currency: "IQD",
            date: date,
            category: transactionType == "expense" ? selectedCategory : "Income",
            source: transactionType == "income" ? selectedSource : "",
            itemDescription: itemDescription.trimmingCharacters(in: .whitespaces),
            notes: notes.trimmingCharacters(in: .whitespaces)
        )

        modelContext.insert(newTransaction)
        try? modelContext.save()
        dismiss()
    }
}
`,q0=`import SwiftUI
import SwiftData

struct TransactionsView: View {
    @Environment(\\.modelContext) private var modelContext
    @Query(sort: \\TransactionItem.date, order: .reverse) private var allTransactions: [TransactionItem]

    @State private var searchText: String = ""
    @State private var filterType: String = "all" // "all", "income", "expense"
    @State private var selectedCategory: String = "All"
    @State private var sortAscending: Bool = false
    @State private var showDeleteConfirmation: Bool = false
    @State private var itemToDelete: TransactionItem? = nil
    @State private var editingItem: TransactionItem? = nil
    @State private var showAddSheet: Bool = false

    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                // Filter bar
                filterHeaderView

                // List of filtered transactions
                if filteredTransactions.isEmpty {
                    VStack(spacing: 12) {
                        Spacer()
                        Image(systemName: "magnifyingglass")
                            .font(.system(size: 44))
                            .foregroundColor(.secondary)
                        Text("No transactions found")
                            .font(.headline)
                        Text("Try adjusting your filters or search keywords.")
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                        Spacer()
                    }
                } else {
                    List {
                        ForEach(groupedTransactions.keys.sorted(by: sortAscending ? (<) : (>)), id: \\.self) { sectionDate in
                            Section(header: Text(sectionDate)) {
                                ForEach(groupedTransactions[sectionDate] ?? []) { item in
                                    TransactionRow(item: item)
                                        .contentShape(Rectangle())
                                        .onTapGesture {
                                            editingItem = item
                                        }
                                        .swipeActions(edge: .trailing, allowsFullSwipe: false) {
                                            Button(role: .destructive) {
                                                itemToDelete = item
                                                showDeleteConfirmation = true
                                            } label: {
                                                Label("Delete", systemImage: "trash")
                                            }
                                        }
                                }
                            }
                        }
                    }
                    .listStyle(.insetGrouped)
                }
            }
            .navigationTitle("Transactions")
            .searchable(text: $searchText, prompt: "Search merchant, category, notes")
            .toolbar {
                ToolbarItem(placement: .topBarLeading) {
                    Menu {
                        Button {
                            sortAscending = false
                        } label: {
                            Label("Newest First", systemImage: !sortAscending ? "checkmark" : "")
                        }
                        Button {
                            sortAscending = true
                        } label: {
                            Label("Oldest First", systemImage: sortAscending ? "checkmark" : "")
                        }
                    } label: {
                        Image(systemName: "arrow.up.arrow.down.circle")
                            .foregroundColor(.indigo)
                    }
                }

                ToolbarItem(placement: .topBarTrailing) {
                    Button {
                        showAddSheet = true
                    } label: {
                        Image(systemName: "plus")
                            .fontWeight(.semibold)
                            .foregroundColor(.indigo)
                    }
                }
            }
            .confirmationDialog(
                "Delete Transaction?",
                isPresented: $showDeleteConfirmation,
                titleVisibility: .visible
            ) {
                Button("Delete", role: .destructive) {
                    if let target = itemToDelete {
                        modelContext.delete(target)
                        try? modelContext.save()
                        itemToDelete = nil
                    }
                }
                Button("Cancel", role: .cancel) {
                    itemToDelete = nil
                }
            } message: {
                Text("This action permanently removes this transaction from your balance.")
            }
            .sheet(item: $editingItem) { item in
                EditTransactionSheet(item: item)
            }
            .sheet(isPresented: $showAddSheet) {
                QuickAddTransactionSheet()
            }
        }
    }

    // MARK: - Filter Header

    private var filterHeaderView: some View {
        VStack(spacing: 8) {
            Picker("Filter", selection: $filterType) {
                Text("All").tag("all")
                Text("Income").tag("income")
                Text("Expense").tag("expense")
            }
            .pickerStyle(.segmented)
            .padding(.horizontal)

            // Category Scrollable Filter
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 8) {
                    categoryFilterChip("All")
                    ForEach(allCategories, id: \\.self) { cat in
                        categoryFilterChip(cat)
                    }
                }
                .padding(.horizontal)
            }
        }
        .padding(.vertical, 8)
        .background(Color(.systemGroupedBackground))
    }

    private func categoryFilterChip(_ name: String) -> some View {
        let isSelected = selectedCategory == name
        return Button {
            selectedCategory = name
        } label: {
            Text(name)
                .font(.caption.weight(.medium))
                .padding(.horizontal, 12)
                .padding(.vertical, 6)
                .background(isSelected ? Color.indigo : Color(.secondarySystemBackground))
                .foregroundColor(isSelected ? .white : .primary)
                .clipShape(Capsule())
        }
    }

    private var allCategories: [String] {
        let cats = allTransactions.map { $0.category }
        return Array(Set(cats)).sorted()
    }

    private var filteredTransactions: [TransactionItem] {
        allTransactions.filter { item in
            // Search text
            let matchesSearch: Bool
            if searchText.trimmingCharacters(in: .whitespaces).isEmpty {
                matchesSearch = true
            } else {
                let query = searchText.lowercased()
                matchesSearch = item.category.lowercased().contains(query) ||
                    item.source.lowercased().contains(query) ||
                    item.itemDescription.lowercased().contains(query) ||
                    item.notes.lowercased().contains(query)
            }

            // Type filter
            let matchesType: Bool
            if filterType == "all" {
                matchesType = true
            } else {
                matchesType = item.type.lowercased() == filterType.lowercased()
            }

            // Category filter
            let matchesCategory = (selectedCategory == "All") || (item.category == selectedCategory)

            return matchesSearch && matchesType && matchesCategory
        }
    }

    private var groupedTransactions: [String: [TransactionItem]] {
        let calendar = Calendar.current
        let formatter = DateFormatter()
        formatter.dateStyle = .medium
        formatter.timeStyle = .none

        var dict: [String: [TransactionItem]] = [:]
        for item in filteredTransactions {
            let key = formatter.string(from: item.date)
            dict[key, default: []].append(item)
        }
        return dict
    }
}

// MARK: - Reusable Transaction Row

struct TransactionRow: View {
    let item: TransactionItem

    var body: some View {
        HStack(spacing: 12) {
            ZStack {
                Circle()
                    .fill(item.type == "income" ? Color.green.opacity(0.15) : Color.red.opacity(0.12))
                    .frame(width: 42, height: 42)
                Image(systemName: iconForCategory(item.category, type: item.type))
                    .font(.system(size: 18))
                    .foregroundColor(item.type == "income" ? .green : .red)
            }

            VStack(alignment: .leading, spacing: 3) {
                Text(item.itemDescription.isEmpty ? item.category : item.itemDescription)
                    .font(.system(.subheadline, design: .rounded, weight: .semibold))
                    .foregroundColor(.primary)

                HStack(spacing: 6) {
                    Text(item.type == "income" ? (item.source.isEmpty ? "Income" : item.source) : item.category)
                        .font(.caption2)
                        .foregroundColor(.secondary)
                    Text("•")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                    Text(item.date.formattedShort())
                        .font(.caption2)
                        .foregroundColor(.secondary)
                }
            }

            Spacer()

            Text(CurrencyFormatter.formatSigned(item.amount, type: item.type, currency: item.currency))
                .font(.system(.subheadline, design: .rounded, weight: .bold))
                .foregroundColor(item.type == "income" ? .green : .primary)
        }
        .padding(.vertical, 4)
    }

    private func iconForCategory(_ category: String, type: String) -> String {
        if type == "income" {
            return "arrow.down.left"
        }
        switch category.lowercased() {
        case "food": return "fork.knife"
        case "transportation", "car": return "car.fill"
        case "rent": return "house.fill"
        case "bills": return "bolt.fill"
        case "shopping": return "bag.fill"
        case "entertainment": return "film.fill"
        case "travel": return "airplane"
        case "family": return "person.2.fill"
        case "health": return "cross.case.fill"
        case "gym": return "dumbbell.fill"
        default: return "creditcard.fill"
        }
    }
}

// MARK: - Edit Transaction Sheet

struct EditTransactionSheet: View {
    @Environment(\\.dismiss) private var dismiss
    @Environment(\\.modelContext) private var modelContext

    @Bindable var item: TransactionItem
    @State private var amountString: String = ""
    @State private var date: Date = Date()
    @State private var category: String = ""
    @State private var source: String = ""
    @State private var itemDescription: String = ""
    @State private var notes: String = ""
    @State private var showDeleteConfirmation: Bool = false

    var body: some View {
        NavigationStack {
            Form {
                Section("Amount (IQD)") {
                    TextField("Amount", text: $amountString)
                        .keyboardType(.numberPad)
                        .font(.headline)
                }

                Section("Details") {
                    DatePicker("Date", selection: $date, displayedComponents: [.date, .hourAndMinute])
                    if item.type == "expense" {
                        TextField("Category", text: $category)
                    } else {
                        TextField("Source", text: $source)
                    }
                    TextField("Description / Merchant", text: $itemDescription)
                    TextField("Notes", text: $notes)
                }

                Section {
                    Button(role: .destructive) {
                        showDeleteConfirmation = true
                    } label: {
                        HStack {
                            Spacer()
                            Label("Delete Transaction", systemImage: "trash")
                                .foregroundColor(.red)
                                .fontWeight(.semibold)
                            Spacer()
                        }
                    }
                }
            }
            .navigationTitle("Edit Transaction")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Done") {
                        saveChanges()
                    }
                }
            }
            .confirmationDialog(
                "Delete Transaction?",
                isPresented: $showDeleteConfirmation,
                titleVisibility: .visible
            ) {
                Button("Delete", role: .destructive) {
                    deleteTransaction()
                }
                Button("Cancel", role: .cancel) {}
            } message: {
                Text("Are you sure you want to permanently delete this transaction?")
            }
            .onAppear {
                amountString = String(Int(item.amount))
                date = item.date
                category = item.category
                source = item.source
                itemDescription = item.itemDescription
                notes = item.notes
            }
        }
    }

    private func saveChanges() {
        if let newAmount = Double(amountString.replacingOccurrences(of: ",", with: "")), newAmount > 0 {
            item.amount = newAmount
        }
        item.date = date
        item.category = category
        item.source = source
        item.itemDescription = itemDescription
        item.notes = notes
        item.updatedAt = Date()
        try? modelContext.save()
        dismiss()
    }

    private func deleteTransaction() {
        modelContext.delete(item)
        try? modelContext.save()
        dismiss()
    }
}
`,$0=`import SwiftUI
import SwiftData
import Charts

struct AnalyticsView: View {
    @Query(sort: \\TransactionItem.date, order: .reverse) private var transactions: [TransactionItem]

    enum TimeRange: String, CaseIterable, Identifiable {
        case thisWeek = "This Week"
        case thisMonth = "This Month"
        case lastMonth = "Last Month"
        case last3Months = "Last 3M"
        case last6Months = "Last 6M"
        case thisYear = "This Year"
        case allTime = "All Time"

        var id: String { rawValue }
    }

    @State private var selectedRange: TimeRange = .thisMonth

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    // Time range picker
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: 8) {
                            ForEach(TimeRange.allCases) { range in
                                Button {
                                    selectedRange = range
                                } label: {
                                    Text(range.rawValue)
                                        .font(.caption.weight(.semibold))
                                        .padding(.horizontal, 12)
                                        .padding(.vertical, 7)
                                        .background(selectedRange == range ? Color.indigo : Color(.secondarySystemBackground))
                                        .foregroundColor(selectedRange == range ? .white : .primary)
                                        .clipShape(Capsule())
                                }
                            }
                        }
                        .padding(.horizontal)
                    }

                    // Key Summary Metrics Card
                    summaryMetricsCard

                    // Chart 1: Income vs Expenses (BarMark)
                    incomeVsExpensesChart

                    // Chart 2: Spending by Category (SectorMark or BarMark)
                    spendingByCategoryChart

                    // Chart 3: Net Savings Trend (LineMark)
                    netSavingsTrendChart
                }
                .padding(.vertical, 12)
            }
            .navigationTitle("Analytics")
        }
    }

    // MARK: - Filtered Transactions by Time Range

    private var filteredTransactions: [TransactionItem] {
        let calendar = Calendar.current
        let now = Date()

        return transactions.filter { item in
            switch selectedRange {
            case .thisWeek:
                return calendar.isDate(item.date, equalTo: now, toGranularity: .weekOfYear)
            case .thisMonth:
                return calendar.isDate(item.date, equalTo: now, toGranularity: .month) &&
                       calendar.isDate(item.date, equalTo: now, toGranularity: .year)
            case .lastMonth:
                guard let lastMonth = calendar.date(byAdding: .month, value: -1, to: now) else { return false }
                return calendar.isDate(item.date, equalTo: lastMonth, toGranularity: .month) &&
                       calendar.isDate(item.date, equalTo: lastMonth, toGranularity: .year)
            case .last3Months:
                guard let cutoff = calendar.date(byAdding: .month, value: -3, to: now) else { return false }
                return item.date >= cutoff
            case .last6Months:
                guard let cutoff = calendar.date(byAdding: .month, value: -6, to: now) else { return false }
                return item.date >= cutoff
            case .thisYear:
                return calendar.isDate(item.date, equalTo: now, toGranularity: .year)
            case .allTime:
                return true
            }
        }
    }

    private var periodIncome: Double {
        filteredTransactions.filter { $0.type == "income" }.reduce(0) { $0 + $1.amount }
    }

    private var periodExpenses: Double {
        filteredTransactions.filter { $0.type == "expense" }.reduce(0) { $0 + $1.amount }
    }

    private var savingsRate: Double {
        guard periodIncome > 0 else { return 0.0 }
        let net = periodIncome - periodExpenses
        return max(0.0, (net / periodIncome) * 100.0)
    }

    private var largestExpense: TransactionItem? {
        filteredTransactions
            .filter { $0.type == "expense" }
            .max(by: { $0.amount < $1.amount })
    }

    private var highestSpendingCategory: (name: String, amount: Double)? {
        var catTotals: [String: Double] = [:]
        for item in filteredTransactions where item.type == "expense" {
            catTotals[item.category, default: 0] += item.amount
        }
        guard let maxEntry = catTotals.max(by: { $0.value < $1.value }) else { return nil }
        return (maxEntry.key, maxEntry.value)
    }

    // MARK: - Summary Metrics Card

    private var summaryMetricsCard: some View {
        VStack(spacing: 12) {
            HStack(spacing: 12) {
                metricBox(
                    title: "Savings Rate",
                    value: String(format: "%.1f%%", savingsRate),
                    color: savingsRate >= 20 ? .green : (savingsRate > 0 ? .orange : .red),
                    subtitle: "of total period income"
                )
                metricBox(
                    title: "Net Saved",
                    value: CurrencyFormatter.format(periodIncome - periodExpenses),
                    color: (periodIncome - periodExpenses) >= 0 ? .indigo : .red,
                    subtitle: "\\(selectedRange.rawValue) balance"
                )
            }

            HStack(spacing: 12) {
                metricBox(
                    title: "Largest Expense",
                    value: largestExpense != nil ? CurrencyFormatter.format(largestExpense!.amount) : "0 IQD",
                    color: .primary,
                    subtitle: largestExpense?.category ?? "None"
                )
                metricBox(
                    title: "Top Category",
                    value: highestSpendingCategory?.name ?? "None",
                    color: .primary,
                    subtitle: highestSpendingCategory != nil ? CurrencyFormatter.format(highestSpendingCategory!.amount) : "0 IQD"
                )
            }
        }
        .padding(.horizontal)
    }

    private func metricBox(title: String, value: String, color: Color, subtitle: String) -> some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(title)
                .font(.caption2)
                .foregroundColor(.secondary)
            Text(value)
                .font(.system(.subheadline, design: .rounded, weight: .bold))
                .foregroundColor(color)
                .lineLimit(1)
                .minimumScaleFactor(0.7)
            Text(subtitle)
                .font(.system(size: 10))
                .foregroundColor(.secondary)
                .lineLimit(1)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(12)
        .background(Color(.secondarySystemGroupedBackground))
        .cornerRadius(14)
    }

    // MARK: - Chart 1: Income vs Expenses

    struct ComparisonBarData: Identifiable {
        let id = UUID()
        let category: String
        let amount: Double
        let color: Color
    }

    private var incomeVsExpensesChart: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Income vs. Expenses")
                .font(.system(.headline, design: .rounded))

            let data: [ComparisonBarData] = [
                ComparisonBarData(category: "Total Income", amount: periodIncome, color: .green),
                ComparisonBarData(category: "Total Expenses", amount: periodExpenses, color: .red)
            ]

            Chart(data) { item in
                BarMark(
                    x: .value("Type", item.category),
                    y: .value("Amount", item.amount)
                )
                .foregroundStyle(item.color.gradient)
                .cornerRadius(8)
            }
            .frame(height: 180)
            .chartYAxis {
                AxisMarks(position: .leading) { value in
                    AxisValueLabel {
                        if let d = value.as(Double.self) {
                            Text("\\(Int(d / 1_000_000))M")
                                .font(.caption2)
                        }
                    }
                }
            }

            HStack {
                HStack(spacing: 4) {
                    Circle().fill(Color.green).frame(width: 8, height: 8)
                    Text("Income: \\(CurrencyFormatter.format(periodIncome))")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                }
                Spacer()
                HStack(spacing: 4) {
                    Circle().fill(Color.red).frame(width: 8, height: 8)
                    Text("Expenses: \\(CurrencyFormatter.format(periodExpenses))")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                }
            }
        }
        .padding(16)
        .background(Color(.secondarySystemGroupedBackground))
        .cornerRadius(16)
        .padding(.horizontal)
    }

    // MARK: - Chart 2: Spending by Category

    struct CategoryExpense: Identifiable {
        let id = UUID()
        let category: String
        let amount: Double
    }

    private var categoryExpensesData: [CategoryExpense] {
        var dict: [String: Double] = [:]
        for item in filteredTransactions where item.type == "expense" {
            dict[item.category, default: 0] += item.amount
        }
        return dict.map { CategoryExpense(category: $0.key, amount: $0.value) }
            .sorted(by: { $0.amount > $1.amount })
    }

    private var spendingByCategoryChart: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Spending by Category")
                .font(.system(.headline, design: .rounded))

            if categoryExpensesData.isEmpty {
                Text("No expenses in this period.")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .padding(.vertical, 20)
            } else {
                // Horizontal Ranked Bars using Swift Charts
                Chart(categoryExpensesData.prefix(6)) { cat in
                    BarMark(
                        x: .value("Amount", cat.amount),
                        y: .value("Category", cat.category)
                    )
                    .foregroundStyle(by: .value("Category", cat.category))
                    .cornerRadius(6)
                }
                .chartLegend(.hidden)
                .frame(height: 200)

                VStack(spacing: 6) {
                    ForEach(categoryExpensesData.prefix(5)) { cat in
                        HStack {
                            Text(cat.category)
                                .font(.caption)
                                .foregroundColor(.secondary)
                            Spacer()
                            Text(CurrencyFormatter.format(cat.amount))
                                .font(.caption.weight(.semibold))
                        }
                    }
                }
            }
        }
        .padding(16)
        .background(Color(.secondarySystemGroupedBackground))
        .cornerRadius(16)
        .padding(.horizontal)
    }

    // MARK: - Chart 3: Net Savings Trend

    struct MonthlyTrendPoint: Identifiable {
        let id = UUID()
        let monthName: String
        let savings: Double
    }

    private var trendData: [MonthlyTrendPoint] {
        let calendar = Calendar.current
        var dict: [String: (order: Date, net: Double)] = [:]

        for t in transactions {
            let startOfMonth = calendar.date(from: calendar.dateComponents([.year, .month], from: t.date)) ?? t.date
            let name = t.date.monthYearString()
            var current = dict[name] ?? (order: startOfMonth, net: 0.0)
            if t.type == "income" {
                current.net += t.amount
            } else {
                current.net -= t.amount
            }
            dict[name] = current
        }

        return dict.sorted(by: { $0.value.order < $1.value.order })
            .suffix(6)
            .map { MonthlyTrendPoint(monthName: $0.key, savings: $0.value.net) }
    }

    private var netSavingsTrendChart: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Net Savings Trend (Recent Months)")
                .font(.system(.headline, design: .rounded))

            if trendData.isEmpty {
                Text("Need more history to display trend.")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .padding(.vertical, 20)
            } else {
                Chart(trendData) { point in
                    LineMark(
                        x: .value("Month", point.monthName),
                        y: .value("Net Savings", point.savings)
                    )
                    .interpolationMethod(.catmullRom)
                    .foregroundStyle(Color.indigo)

                    PointMark(
                        x: .value("Month", point.monthName),
                        y: .value("Net Savings", point.savings)
                    )
                    .foregroundStyle(point.savings >= 0 ? Color.green : Color.red)
                }
                .frame(height: 180)
            }
        }
        .padding(16)
        .background(Color(.secondarySystemGroupedBackground))
        .cornerRadius(16)
        .padding(.horizontal)
    }
}
`,P0=`import SwiftUI
import SwiftData

struct GoalsView: View {
    @Environment(\\.modelContext) private var modelContext
    @Query(sort: \\GoalItem.createdAt, order: .reverse) private var allGoals: [GoalItem]
    @Query private var transactions: [TransactionItem]

    @State private var showCreateGoal: Bool = false
    @State private var goalToAllocate: GoalItem? = nil
    @State private var selectedGoalDetail: GoalItem? = nil
    @State private var celebrationGoal: GoalItem? = nil

    private let engine = FinancialEngine.shared

    private var activeGoals: [GoalItem] {
        allGoals.filter { !$0.isCompleted }
    }

    private var completedGoals: [GoalItem] {
        allGoals.filter { $0.isCompleted }
    }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    // Unallocated Balance banner
                    unallocatedBanner

                    // Active Goals Section
                    VStack(alignment: .leading, spacing: 12) {
                        HStack {
                            Text("Active Goals (\\(activeGoals.count))")
                                .font(.system(.headline, design: .rounded))
                            Spacer()
                        }

                        if activeGoals.isEmpty {
                            emptyActiveGoalsCard
                        } else {
                            ForEach(activeGoals) { goal in
                                GoalCard(
                                    goal: goal,
                                    transactions: transactions,
                                    allGoals: allGoals,
                                    onAllocate: {
                                        goalToAllocate = goal
                                    },
                                    onTap: {
                                        selectedGoalDetail = goal
                                    }
                                )
                            }
                        }
                    }

                    // Completed Goals Section
                    if !completedGoals.isEmpty {
                        VStack(alignment: .leading, spacing: 12) {
                            Text("Completed Goals (\\(completedGoals.count))")
                                .font(.system(.headline, design: .rounded))
                                .foregroundColor(.secondary)

                            ForEach(completedGoals) { goal in
                                CompletedGoalCard(goal: goal)
                            }
                        }
                    }
                }
                .padding(.horizontal, 16)
                .padding(.vertical, 12)
            }
            .navigationTitle("Financial Goals")
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button {
                        showCreateGoal = true
                    } label: {
                        Image(systemName: "plus.circle.fill")
                            .font(.system(size: 22))
                            .foregroundColor(.indigo)
                    }
                }
            }
            .sheet(isPresented: $showCreateGoal) {
                CreateGoalSheet()
            }
            .sheet(item: $goalToAllocate) { goal in
                AllocateGoalSheet(
                    goal: goal,
                    transactions: transactions,
                    allGoals: allGoals,
                    onCompleted: {
                        celebrationGoal = goal
                    }
                )
            }
            .sheet(item: $selectedGoalDetail) { goal in
                GoalDetailSheet(
                    goal: goal,
                    transactions: transactions,
                    allGoals: allGoals,
                    onAllocate: {
                        selectedGoalDetail = nil
                        DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
                            goalToAllocate = goal
                        }
                    }
                )
            }
            .overlay {
                if let celeb = celebrationGoal {
                    CelebrationOverlay(goal: celeb) {
                        celebrationGoal = nil
                    }
                }
            }
        }
    }

    private var unallocatedBanner: some View {
        let unallocated = engine.unallocatedBalance(transactions: transactions, goals: activeGoals)
        return HStack {
            VStack(alignment: .leading, spacing: 2) {
                Text("Available to Allocate")
                    .font(.caption)
                    .foregroundColor(.secondary)
                Text(CurrencyFormatter.format(unallocated))
                    .font(.system(.title3, design: .rounded, weight: .bold))
                    .foregroundColor(.indigo)
            }
            Spacer()
            Image(systemName: "wallet.pass.fill")
                .font(.title2)
                .foregroundColor(.indigo.opacity(0.8))
        }
        .padding(14)
        .background(Color.indigo.opacity(0.08))
        .cornerRadius(14)
    }

    private var emptyActiveGoalsCard: some View {
        VStack(spacing: 8) {
            Image(systemName: "target")
                .font(.system(size: 36))
                .foregroundColor(.secondary)
            Text("No Active Goals")
                .font(.headline)
            Text("Tap '+' to define your savings target and track achievability.")
                .font(.subheadline)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
        }
        .padding(24)
        .frame(maxWidth: .infinity)
        .background(Color(.secondarySystemGroupedBackground))
        .cornerRadius(16)
    }
}

// MARK: - Goal Card

struct GoalCard: View {
    let goal: GoalItem
    let transactions: [TransactionItem]
    let allGoals: [GoalItem]
    let onAllocate: () -> Void
    let onTap: () -> Void

    private let engine = FinancialEngine.shared

    var body: some View {
        let unallocated = engine.unallocatedBalance(transactions: transactions, goals: allGoals)
        let avgSavings = engine.historicalMonthlyAverageSavings(transactions: transactions)
        let analysis = engine.analyzeGoal(goal: goal, unallocatedBalance: unallocated, historicalAvgSavings: avgSavings)
        let progress = goal.targetAmount > 0 ? min(1.0, goal.allocatedAmount / goal.targetAmount) : 0.0
        let remaining = max(0.0, goal.targetAmount - goal.allocatedAmount)

        VStack(alignment: .leading, spacing: 12) {
            HStack(alignment: .top) {
                VStack(alignment: .leading, spacing: 4) {
                    Text(goal.name)
                        .font(.system(.headline, design: .rounded, weight: .bold))
                    if let targetDate = goal.targetDate {
                        Text("Target: \\(targetDate.formattedShort())")
                            .font(.caption2)
                            .foregroundColor(.secondary)
                    } else {
                        Text("No deadline set")
                            .font(.caption2)
                            .foregroundColor(.secondary)
                    }
                }
                Spacer()

                // Status badge
                Text(analysis.statusTitle)
                    .font(.caption2.weight(.bold))
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(analysis.statusColor.opacity(0.15))
                    .foregroundColor(analysis.statusColor)
                    .clipShape(Capsule())
            }

            // Progress bar
            ProgressView(value: progress)
                .tint(progress >= 1.0 ? .green : .indigo)

            HStack {
                VStack(alignment: .leading, spacing: 2) {
                    Text("Saved")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                    Text(CurrencyFormatter.format(goal.allocatedAmount))
                        .font(.system(.subheadline, design: .rounded, weight: .semibold))
                }
                Spacer()
                VStack(alignment: .trailing, spacing: 2) {
                    Text("Target")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                    Text(CurrencyFormatter.format(goal.targetAmount))
                        .font(.system(.subheadline, design: .rounded, weight: .semibold))
                }
            }

            Divider()

            HStack {
                Text("\\(Int(progress * 100))% • Remaining \\(CurrencyFormatter.format(remaining))")
                    .font(.caption2)
                    .foregroundColor(.secondary)
                Spacer()
                Button(action: onAllocate) {
                    HStack(spacing: 4) {
                        Image(systemName: "plus.circle")
                        Text("Manage Funds")
                    }
                    .font(.caption.weight(.semibold))
                    .foregroundColor(.white)
                    .padding(.horizontal, 12)
                    .padding(.vertical, 6)
                    .background(Color.indigo)
                    .clipShape(Capsule())
                }
            }
        }
        .padding(16)
        .background(Color(.secondarySystemGroupedBackground))
        .cornerRadius(16)
        .onTapGesture(perform: onTap)
    }
}

// MARK: - Completed Goal Card

struct CompletedGoalCard: View {
    let goal: GoalItem

    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: "checkmark.circle.fill")
                .font(.title2)
                .foregroundColor(.green)

            VStack(alignment: .leading, spacing: 2) {
                Text(goal.name)
                    .font(.subheadline.weight(.semibold))
                    .strikethrough()
                if let completedAt = goal.completedAt {
                    Text("Completed on \\(completedAt.formattedShort())")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                }
            }
            Spacer()
            Text(CurrencyFormatter.format(goal.targetAmount))
                .font(.system(.subheadline, design: .rounded, weight: .bold))
                .foregroundColor(.secondary)
        }
        .padding(14)
        .background(Color(.secondarySystemGroupedBackground).opacity(0.8))
        .cornerRadius(14)
    }
}

// MARK: - Create Goal Sheet

struct CreateGoalSheet: View {
    @Environment(\\.dismiss) private var dismiss
    @Environment(\\.modelContext) private var modelContext

    @State private var name: String = ""
    @State private var targetAmountString: String = ""
    @State private var hasTargetDate: Bool = false
    @State private var targetDate: Date = Calendar.current.date(byAdding: .month, value: 6, to: Date()) ?? Date()
    @State private var goalDescription: String = ""
    @State private var validationError: String? = nil

    var body: some View {
        NavigationStack {
            Form {
                Section("Goal Information") {
                    TextField("Goal Name (e.g. New Car, Emergency Fund)", text: $name)
                    HStack {
                        Text("IQD")
                            .foregroundColor(.secondary)
                        TextField("Target Amount", text: $targetAmountString)
                            .keyboardType(.numberPad)
                    }
                    TextField("Description (optional)", text: $goalDescription)
                }

                Section("Target Timeline") {
                    Toggle("Set Target Date", isOn: $hasTargetDate)
                    if hasTargetDate {
                        DatePicker("Target Date", selection: $targetDate, in: Date()..., displayedComponents: .date)
                    }
                }

                if let error = validationError {
                    Section {
                        Text(error)
                            .font(.caption)
                            .foregroundColor(.red)
                    }
                }
            }
            .navigationTitle("New Goal")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Create") {
                        saveGoal()
                    }
                    .fontWeight(.semibold)
                }
            }
        }
    }

    private func saveGoal() {
        let trimmedName = name.trimmingCharacters(in: .whitespaces)
        guard !trimmedName.isEmpty else {
            validationError = "Please enter a goal name."
            return
        }

        let cleanAmount = targetAmountString.replacingOccurrences(of: ",", with: "")
        guard let amount = Double(cleanAmount), amount > 0 else {
            validationError = "Target amount must be greater than 0 IQD."
            return
        }

        let newGoal = GoalItem(
            name: trimmedName,
            targetAmount: amount,
            allocatedAmount: 0.0,
            currency: "IQD",
            targetDate: hasTargetDate ? targetDate : nil,
            goalDescription: goalDescription.trimmingCharacters(in: .whitespaces)
        )

        modelContext.insert(newGoal)
        try? modelContext.save()
        dismiss()
    }
}

// MARK: - Allocate / Withdraw Sheet

struct AllocateGoalSheet: View {
    @Environment(\\.dismiss) private var dismiss
    @Environment(\\.modelContext) private var modelContext

    @Bindable var goal: GoalItem
    let transactions: [TransactionItem]
    let allGoals: [GoalItem]
    let onCompleted: () -> Void

    @State private var mode: String = "allocate" // "allocate" or "withdraw"
    @State private var amountString: String = ""
    @State private var errorText: String? = nil

    private let engine = FinancialEngine.shared

    var body: some View {
        let unallocated = engine.unallocatedBalance(transactions: transactions, goals: allGoals)
        let remaining = max(0.0, goal.targetAmount - goal.allocatedAmount)

        NavigationStack {
            Form {
                Section {
                    Picker("Action", selection: $mode) {
                        Text("Allocate Money").tag("allocate")
                        Text("Withdraw Funds").tag("withdraw")
                    }
                    .pickerStyle(.segmented)
                }

                Section("Status") {
                    HStack {
                        Text("Currently Saved")
                        Spacer()
                        Text(CurrencyFormatter.format(goal.allocatedAmount))
                            .fontWeight(.semibold)
                    }
                    HStack {
                        Text("Remaining to Target")
                        Spacer()
                        Text(CurrencyFormatter.format(remaining))
                            .foregroundColor(.secondary)
                    }
                    HStack {
                        Text("Available Cash (Unallocated)")
                        Spacer()
                        Text(CurrencyFormatter.format(unallocated))
                            .foregroundColor(.indigo)
                    }
                }

                Section("Amount (IQD)") {
                    TextField("0", text: $amountString)
                        .keyboardType(.numberPad)
                        .font(.title3.weight(.bold))
                }

                if let err = errorText {
                    Section {
                        Text(err)
                            .font(.caption)
                            .foregroundColor(.red)
                    }
                }
            }
            .navigationTitle("Manage Funds: \\(goal.name)")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Confirm") {
                        executeTransaction(unallocated: unallocated)
                    }
                    .fontWeight(.semibold)
                }
            }
        }
    }

    private func executeTransaction(unallocated: Double) {
        let clean = amountString.replacingOccurrences(of: ",", with: "").trimmingCharacters(in: .whitespaces)
        guard let amount = Double(clean), amount > 0 else {
            errorText = "Enter a valid amount > 0 IQD."
            return
        }

        if mode == "allocate" {
            // Cannot allocate more than unallocated cash
            if amount > unallocated {
                errorText = "You cannot allocate more than your available unallocated balance (\\(CurrencyFormatter.format(unallocated)))."
                return
            }
            goal.allocatedAmount += amount
            goal.updatedAt = Date()

            if goal.allocatedAmount >= goal.targetAmount {
                goal.isCompleted = true
                goal.completedAt = Date()
                try? modelContext.save()
                dismiss()
                onCompleted()
                return
            }
        } else {
            // Withdraw
            if amount > goal.allocatedAmount {
                errorText = "Cannot withdraw more than current allocated funds (\\(CurrencyFormatter.format(goal.allocatedAmount)))."
                return
            }
            goal.allocatedAmount -= amount
            if goal.isCompleted && goal.allocatedAmount < goal.targetAmount {
                goal.isCompleted = false
                goal.completedAt = nil
            }
            goal.updatedAt = Date()
        }

        try? modelContext.save()
        dismiss()
    }
}

// MARK: - Goal Detail & Actionable Shortfall View

struct GoalDetailSheet: View {
    @Environment(\\.dismiss) private var dismiss
    @Environment(\\.modelContext) private var modelContext
    let goal: GoalItem
    let transactions: [TransactionItem]
    let allGoals: [GoalItem]
    let onAllocate: () -> Void

    @State private var showDeleteConfirmation: Bool = false
    private let engine = FinancialEngine.shared

    var body: some View {
        let unallocated = engine.unallocatedBalance(transactions: transactions, goals: allGoals)
        let avgSavings = engine.historicalMonthlyAverageSavings(transactions: transactions)
        let analysis = engine.analyzeGoal(goal: goal, unallocatedBalance: unallocated, historicalAvgSavings: avgSavings)
        let remaining = max(0.0, goal.targetAmount - goal.allocatedAmount)

        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    // Header Card
                    VStack(spacing: 8) {
                        Text(goal.name)
                            .font(.system(.title2, design: .rounded, weight: .bold))
                        Text("Target: \\(CurrencyFormatter.format(goal.targetAmount))")
                            .font(.subheadline)
                            .foregroundColor(.secondary)

                        Text(analysis.statusTitle)
                            .font(.caption.weight(.bold))
                            .padding(.horizontal, 10)
                            .padding(.vertical, 4)
                            .background(analysis.statusColor.opacity(0.15))
                            .foregroundColor(analysis.statusColor)
                            .clipShape(Capsule())
                    }
                    .padding()
                    .frame(maxWidth: .infinity)
                    .background(Color(.secondarySystemGroupedBackground))
                    .cornerRadius(16)

                    // Achievability Breakdown
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Achievability Breakdown")
                            .font(.headline)

                        Text(analysis.explanation)
                            .font(.subheadline)
                            .foregroundColor(.secondary)

                        if let req = analysis.requiredMonthlySavings, let months = analysis.monthsRemaining {
                            Divider()
                            HStack {
                                Text("Months Remaining")
                                Spacer()
                                Text("\\(months) months")
                                    .fontWeight(.medium)
                            }
                            HStack {
                                Text("Required Monthly Savings")
                                Spacer()
                                Text(CurrencyFormatter.format(req) + "/mo")
                                    .fontWeight(.semibold)
                                    .foregroundColor(.indigo)
                            }
                            HStack {
                                Text("Your Historical Avg. Savings")
                                Spacer()
                                Text(CurrencyFormatter.format(avgSavings) + "/mo")
                                    .foregroundColor(.secondary)
                            }
                        }
                    }
                    .padding()
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(Color(.secondarySystemGroupedBackground))
                    .cornerRadius(16)

                    // Actionable Shortfall Recommendations
                    if let shortfall = analysis.shortfallMonthly, shortfall > 0 {
                        VStack(alignment: .leading, spacing: 14) {
                            Text("Actionable Recommendations")
                                .font(.headline)

                            VStack(alignment: .leading, spacing: 10) {
                                recommendationRow(
                                    icon: "arrow.up.circle.fill",
                                    color: .green,
                                    title: "Option 1: Increase Income",
                                    detail: "Earn an extra \\(CurrencyFormatter.format(shortfall))/month via freelancing, bonuses, or side projects."
                                )

                                recommendationRow(
                                    icon: "scissors",
                                    color: .orange,
                                    title: "Option 2: Cut Expenses",
                                    detail: "Reduce discretionary spending (dining, shopping, entertainment) by \\(CurrencyFormatter.format(shortfall))/month."
                                )

                                if let extraMonths = analysis.extensionMonths {
                                    recommendationRow(
                                        icon: "calendar.badge.plus",
                                        color: .blue,
                                        title: "Option 3: Extend Target Date",
                                        detail: "Postpone your goal by \\(extraMonths) additional month\\(extraMonths == 1 ? "" : "s") to reach it comfortably at your current savings pace."
                                    )
                                }
                            }
                        }
                        .padding()
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .background(Color(.secondarySystemGroupedBackground))
                        .cornerRadius(16)
                    }

                    VStack(spacing: 12) {
                        Button(action: onAllocate) {
                            Text("Allocate / Withdraw Funds")
                                .font(.headline)
                                .foregroundColor(.white)
                                .frame(maxWidth: .infinity)
                                .padding()
                                .background(Color.indigo)
                                .cornerRadius(16)
                        }

                        Button(role: .destructive) {
                            showDeleteConfirmation = true
                        } label: {
                            HStack {
                                Image(systemName: "trash")
                                Text("Delete Plan")
                            }
                            .font(.subheadline.weight(.semibold))
                            .foregroundColor(.red)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 14)
                            .background(Color.red.opacity(0.1))
                            .cornerRadius(16)
                        }
                    }
                }
                .padding()
            }
            .navigationTitle("Plan Details")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Close") { dismiss() }
                }
            }
            .confirmationDialog(
                "Delete Plan?",
                isPresented: $showDeleteConfirmation,
                titleVisibility: .visible
            ) {
                Button("Delete Plan", role: .destructive) {
                    modelContext.delete(goal)
                    try? modelContext.save()
                    dismiss()
                }
                Button("Cancel", role: .cancel) {}
            } message: {
                Text("Are you sure you want to delete this plan? This action cannot be undone.")
            }
        }
    }

    private func recommendationRow(icon: String, color: Color, title: String, detail: String) -> some View {
        HStack(alignment: .top, spacing: 12) {
            Image(systemName: icon)
                .font(.title3)
                .foregroundColor(color)
            VStack(alignment: .leading, spacing: 2) {
                Text(title)
                    .font(.subheadline.weight(.semibold))
                Text(detail)
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
        }
    }
}

// MARK: - Celebration Overlay

struct CelebrationOverlay: View {
    let goal: GoalItem
    let onDismiss: () -> Void

    var body: some View {
        ZStack {
            Color.black.opacity(0.5)
                .ignoresSafeArea()

            VStack(spacing: 20) {
                Image(systemName: "sparkles")
                    .font(.system(size: 60))
                    .foregroundColor(.yellow)

                Text("Goal Achieved! 🎉")
                    .font(.system(.title, design: .rounded, weight: .bold))

                Text("Congratulations! You have reached your target of \\(CurrencyFormatter.format(goal.targetAmount)) for \\"\\(goal.name)\\".")
                    .font(.subheadline)
                    .multilineTextAlignment(.center)
                    .foregroundColor(.secondary)
                    .padding(.horizontal)

                Button("Awesome!") {
                    onDismiss()
                }
                .font(.headline)
                .foregroundColor(.white)
                .padding(.horizontal, 32)
                .padding(.vertical, 12)
                .background(Color.indigo)
                .cornerRadius(14)
            }
            .padding(28)
            .background(Color(.systemBackground))
            .cornerRadius(24)
            .shadow(radius: 20)
            .padding(32)
        }
    }
}
`,Q0=`import SwiftUI
import SwiftData

struct BudgetsView: View {
    @Environment(\\.modelContext) private var modelContext
    @Query(sort: \\BudgetItem.category) private var budgets: [BudgetItem]
    @Query private var transactions: [TransactionItem]

    @State private var showAddBudget: Bool = false
    @State private var editingBudget: BudgetItem? = nil

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 16) {
                    // Overview header
                    budgetOverviewCard

                    // Budgets List
                    if budgets.isEmpty {
                        VStack(spacing: 8) {
                            Image(systemName: "chart.bar.xaxis")
                                .font(.system(size: 36))
                                .foregroundColor(.secondary)
                            Text("No Category Budgets Set")
                                .font(.headline)
                            Text("Set monthly limits for Food, Shopping, Transport and more to control spending.")
                                .font(.subheadline)
                                .foregroundColor(.secondary)
                                .multilineTextAlignment(.center)
                        }
                        .padding(24)
                        .frame(maxWidth: .infinity)
                        .background(Color(.secondarySystemGroupedBackground))
                        .cornerRadius(16)
                    } else {
                        ForEach(budgets) { budget in
                            BudgetCard(
                                budget: budget,
                                transactions: transactions,
                                onEdit: {
                                    editingBudget = budget
                                },
                                onDelete: {
                                    modelContext.delete(budget)
                                    try? modelContext.save()
                                }
                            )
                        }
                    }
                }
                .padding()
            }
            .navigationTitle("Monthly Budgets")
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button {
                        showAddBudget = true
                    } label: {
                        Image(systemName: "plus.circle.fill")
                            .font(.system(size: 22))
                            .foregroundColor(.indigo)
                    }
                }
            }
            .sheet(isPresented: $showAddBudget) {
                AddBudgetSheet()
            }
            .sheet(item: $editingBudget) { b in
                EditBudgetSheet(budget: b)
            }
        }
    }

    private var currentMonthExpensesByCategory: [String: Double] {
        let calendar = Calendar.current
        var dict: [String: Double] = [:]
        for t in transactions where t.type == "expense" {
            if calendar.isDate(t.date, equalTo: Date(), toGranularity: .month) &&
               calendar.isDate(t.date, equalTo: Date(), toGranularity: .year) {
                dict[t.category, default: 0] += t.amount
            }
        }
        return dict
    }

    private var budgetOverviewCard: some View {
        let totalBudgeted = budgets.reduce(0.0) { $0 + $1.monthlyLimit }
        let spentMap = currentMonthExpensesByCategory
        let totalSpentOnBudgetedCategories = budgets.reduce(0.0) { $0 + (spentMap[$1.category] ?? 0.0) }
        let remaining = totalBudgeted - totalSpentOnBudgetedCategories

        return VStack(spacing: 12) {
            HStack {
                VStack(alignment: .leading, spacing: 2) {
                    Text("Total Monthly Budget")
                        .font(.caption)
                        .foregroundColor(.secondary)
                    Text(CurrencyFormatter.format(totalBudgeted))
                        .font(.system(.title3, design: .rounded, weight: .bold))
                }
                Spacer()
                VStack(alignment: .trailing, spacing: 2) {
                    Text("Remaining")
                        .font(.caption)
                        .foregroundColor(.secondary)
                    Text(CurrencyFormatter.format(max(0, remaining)))
                        .font(.system(.subheadline, design: .rounded, weight: .semibold))
                        .foregroundColor(remaining >= 0 ? .green : .red)
                }
            }

            let progress = totalBudgeted > 0 ? min(1.5, totalSpentOnBudgetedCategories / totalBudgeted) : 0.0
            ProgressView(value: min(1.0, progress))
                .tint(progress > 1.0 ? .red : (progress > 0.8 ? .orange : .indigo))
        }
        .padding()
        .background(Color(.secondarySystemGroupedBackground))
        .cornerRadius(16)
    }
}

// MARK: - Budget Card with Color Transitions

struct BudgetCard: View {
    let budget: BudgetItem
    let transactions: [TransactionItem]
    let onEdit: () -> Void
    let onDelete: () -> Void

    var body: some View {
        let spent = spentForCategory(budget.category)
        let limit = budget.monthlyLimit
        let remaining = limit - spent
        let ratio = limit > 0 ? spent / limit : 0.0

        // Color transition: Accent (Indigo) -> Orange (>= 80%) -> Red (> 100%)
        let statusColor: Color = {
            if ratio >= 1.0 {
                return .red
            } else if ratio >= 0.8 {
                return .orange
            } else {
                return .indigo
            }
        }()

        VStack(alignment: .leading, spacing: 10) {
            HStack {
                Text(budget.category)
                    .font(.system(.headline, design: .rounded, weight: .bold))
                Spacer()
                if ratio >= 1.0 {
                    Text("Exceeded by \\(CurrencyFormatter.format(spent - limit))")
                        .font(.caption2.weight(.bold))
                        .foregroundColor(.red)
                } else {
                    Text("\\(CurrencyFormatter.format(remaining)) left")
                        .font(.caption2.weight(.semibold))
                        .foregroundColor(.secondary)
                }
            }

            // Progress bar
            ProgressView(value: min(1.0, ratio))
                .tint(statusColor)

            HStack {
                Text("Spent: \\(CurrencyFormatter.format(spent))")
                    .font(.caption2)
                    .foregroundColor(.secondary)
                Spacer()
                Text("Limit: \\(CurrencyFormatter.format(limit))")
                    .font(.caption2.weight(.medium))
                    .foregroundColor(.secondary)
            }

            HStack {
                Text("\\(Int(ratio * 100))% used")
                    .font(.caption2.weight(.bold))
                    .foregroundColor(statusColor)
                Spacer()

                Button("Edit", action: onEdit)
                    .font(.caption)
                    .foregroundColor(.indigo)
            }
        }
        .padding(16)
        .background(Color(.secondarySystemGroupedBackground))
        .cornerRadius(16)
        .contextMenu {
            Button("Edit Limit", action: onEdit)
            Button("Delete Budget", role: .destructive, action: onDelete)
        }
    }

    private func spentForCategory(_ category: String) -> Double {
        let calendar = Calendar.current
        return transactions
            .filter {
                $0.type == "expense" &&
                $0.category.lowercased() == category.lowercased() &&
                calendar.isDate($0.date, equalTo: Date(), toGranularity: .month) &&
                calendar.isDate($0.date, equalTo: Date(), toGranularity: .year)
            }
            .reduce(0.0) { $0 + $1.amount }
    }
}

// MARK: - Add Budget Sheet

struct AddBudgetSheet: View {
    @Environment(\\.dismiss) private var dismiss
    @Environment(\\.modelContext) private var modelContext

    @Query(filter: #Predicate<CategoryItem> { $0.type == "expense_category" })
    private var expenseCategories: [CategoryItem]

    @State private var category: String = "Food"
    @State private var monthlyLimitString: String = ""
    @State private var errorText: String? = nil

    var body: some View {
        NavigationStack {
            Form {
                Section("Category") {
                    Picker("Category", selection: $category) {
                        ForEach(categoriesList, id: \\.self) { c in
                            Text(c).tag(c)
                        }
                    }
                }

                Section("Monthly Limit (IQD)") {
                    TextField("e.g. 500000", text: $monthlyLimitString)
                        .keyboardType(.numberPad)
                }

                if let err = errorText {
                    Section {
                        Text(err).foregroundColor(.red).font(.caption)
                    }
                }
            }
            .navigationTitle("New Budget Limit")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Save") {
                        saveBudget()
                    }
                    .fontWeight(.semibold)
                }
            }
        }
    }

    private var categoriesList: [String] {
        let db: [String] = expenseCategories.map { $0.name }
        let defaults: [String] = ["Food", "Transportation", "Rent", "Bills", "Shopping", "Entertainment", "Travel", "Car", "Health", "Gym"]
        return Array(Set(db + defaults)).sorted()
    }

    private func saveBudget() {
        let clean = monthlyLimitString.replacingOccurrences(of: ",", with: "")
        guard let limit = Double(clean), limit > 0 else {
            errorText = "Enter a valid monthly limit > 0 IQD."
            return
        }

        let item = BudgetItem(category: category, monthlyLimit: limit)
        modelContext.insert(item)
        try? modelContext.save()
        dismiss()
    }
}

// MARK: - Edit Budget Sheet

struct EditBudgetSheet: View {
    @Environment(\\.dismiss) private var dismiss
    @Environment(\\.modelContext) private var modelContext

    @Bindable var budget: BudgetItem
    @State private var limitString: String = ""

    var body: some View {
        NavigationStack {
            Form {
                Section("Category") {
                    Text(budget.category)
                        .font(.headline)
                }
                Section("Monthly Limit (IQD)") {
                    TextField("Limit", text: $limitString)
                        .keyboardType(.numberPad)
                }
            }
            .navigationTitle("Edit Budget")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Save") {
                        if let limit = Double(limitString.replacingOccurrences(of: ",", with: "")), limit > 0 {
                            budget.monthlyLimit = limit
                            try? modelContext.save()
                        }
                        dismiss()
                    }
                }
            }
            .onAppear {
                limitString = String(Int(budget.monthlyLimit))
            }
        }
    }
}
`,Y0=`import SwiftUI
import SwiftData
import LocalAuthentication
import UniformTypeIdentifiers

struct SettingsView: View {
    @Environment(\\.modelContext) private var modelContext
    @AppStorage("biometricsEnabled") private var biometricsEnabled: Bool = false
    @AppStorage("selectedAppearance") private var selectedAppearance: String = "system"

    @Query private var allTransactions: [TransactionItem]
    @Query private var allGoals: [GoalItem]
    @Query private var allCategories: [CategoryItem]

    @State private var showCategoryManager: Bool = false
    @State private var exportShareItem: ExportDocument? = nil
    @State private var showExportSheet: Bool = false
    @State private var showBudgetsSheet: Bool = false
    @State private var bioAuthError: String? = nil

    var body: some View {
        NavigationStack {
            Form {
                // Section 1: Security & Biometrics
                Section("Security") {
                    Toggle(isOn: Binding(
                        get: { biometricsEnabled },
                        set: { newValue in
                            handleBiometricsToggle(newValue)
                        }
                    )) {
                        HStack {
                            Image(systemName: "faceid")
                                .foregroundColor(.indigo)
                            Text("Face ID / Passcode Lock")
                        }
                    }

                    if let err = bioAuthError {
                        Text(err)
                            .font(.caption)
                            .foregroundColor(.red)
                    }
                }

                // Section 2: Budgeting
                Section("Budgets") {
                    NavigationLink {
                        BudgetsView()
                    } label: {
                        HStack {
                            Image(systemName: "chart.bar.xaxis")
                                .foregroundColor(.indigo)
                            Text("Category Monthly Budgets")
                        }
                    }
                }

                // Section 3: Categories Management
                Section("Customization") {
                    NavigationLink {
                        CategoriesManagementView()
                    } label: {
                        HStack {
                            Image(systemName: "tag.fill")
                                .foregroundColor(.indigo)
                            Text("Manage Categories & Sources")
                        }
                    }
                }

                // Section 4: Data Export
                Section("Data Export") {
                    Button {
                        exportCSV()
                    } label: {
                        HStack {
                            Image(systemName: "tablecells.fill")
                                .foregroundColor(.green)
                            Text("Export Transactions as CSV")
                        }
                    }

                    Button {
                        exportJSON()
                    } label: {
                        HStack {
                            Image(systemName: "curlybraces")
                                .foregroundColor(.orange)
                            Text("Export Full Backup as JSON")
                        }
                    }
                }

                // Section 5: Appearance
                Section("Appearance") {
                    Picker("Theme", selection: $selectedAppearance) {
                        Text("System Default").tag("system")
                        Text("Light Mode").tag("light")
                        Text("Dark Mode").tag("dark")
                    }
                    .pickerStyle(.segmented)
                }

                // Section 6: App Information
                Section("About") {
                    HStack {
                        Text("Currency")
                        Spacer()
                        Text("IQD (Iraqi Dinar)")
                            .foregroundColor(.secondary)
                    }
                    HStack {
                        Text("Target Device")
                        Spacer()
                        Text("iPhone 13 Pro Max (iOS 17+)")
                            .foregroundColor(.secondary)
                    }
                    HStack {
                        Text("Database Engine")
                        Spacer()
                        Text("SwiftData (Local SQLite)")
                            .foregroundColor(.secondary)
                    }
                    HStack {
                        Text("Developer")
                        Spacer()
                        Text("Ahmed AL KUBAISI")
                            .fontWeight(.semibold)
                            .foregroundColor(.primary)
                    }
                    HStack {
                        Text("Email")
                        Spacer()
                        Text("ahmed.mjabbar95@gmail.com")
                            .foregroundColor(.blue)
                    }
                    HStack {
                        Text("Version")
                        Spacer()
                        Text("2.1.0 (Native iOS)")
                            .foregroundColor(.secondary)
                    }
                }
            }
            .navigationTitle("Settings")
            .sheet(item: $exportShareItem) { doc in
                ShareSheet(activityItems: [doc.fileURL])
            }
        }
    }

    private func handleBiometricsToggle(_ enable: Bool) {
        if !enable {
            biometricsEnabled = false
            bioAuthError = nil
            return
        }

        let context = LAContext()
        var error: NSError?
        if context.canEvaluatePolicy(.deviceOwnerAuthentication, error: &error) {
            context.evaluatePolicy(.deviceOwnerAuthentication, localizedReason: "Confirm your identity to enable biometric protection.") { success, authErr in
                DispatchQueue.main.async {
                    if success {
                        biometricsEnabled = true
                        bioAuthError = nil
                    } else {
                        biometricsEnabled = false
                        bioAuthError = authErr?.localizedDescription ?? "Authentication failed."
                    }
                }
            }
        } else {
            // Hardware doesn't support biometrics
            biometricsEnabled = true
            bioAuthError = nil
        }
    }

    // MARK: - Export Logic

    private func exportCSV() {
        var csvText = "ID,Type,Amount,Currency,Date,Category,Source,Description,Notes\\n"
        for t in allTransactions {
            let dateStr = ISO8601DateFormatter().string(from: t.date)
            let desc = t.itemDescription.replacingOccurrences(of: ",", with: " ")
            let notes = t.notes.replacingOccurrences(of: ",", with: " ")
            let row = [
                "\\(t.id)",
                "\\"\\(t.type)\\"",
                "\\(t.amount)",
                "\\"\\(t.currency)\\"",
                "\\"\\(dateStr)\\"",
                "\\"\\(t.category)\\"",
                "\\"\\(t.source)\\"",
                "\\"\\(desc)\\"",
                "\\"\\(notes)\\""
            ].joined(separator: ",") + "\\n"
            csvText += row
        }

        let tempURL = FileManager.default.temporaryDirectory.appendingPathComponent("FinanceApp_Transactions.csv")
        try? csvText.write(to: tempURL, atomically: true, encoding: .utf8)
        exportShareItem = ExportDocument(fileURL: tempURL)
    }

    private func exportJSON() {
        let df = ISO8601DateFormatter()
        let transactionsDict = allTransactions.map { t in
            [
                "id": t.id.uuidString,
                "type": t.type,
                "amount": t.amount,
                "currency": t.currency,
                "date": df.string(from: t.date),
                "category": t.category,
                "source": t.source,
                "itemDescription": t.itemDescription,
                "notes": t.notes
            ] as [String : Any]
        }

        let goalsDict = allGoals.map { g in
            [
                "id": g.id.uuidString,
                "name": g.name,
                "targetAmount": g.targetAmount,
                "allocatedAmount": g.allocatedAmount,
                "currency": g.currency,
                "targetDate": g.targetDate != nil ? df.string(from: g.targetDate!) : nil,
                "goalDescription": g.goalDescription,
                "isCompleted": g.isCompleted
            ] as [String : Any?]
        }

        let fullBackup: [String: Any] = [
            "exportDate": df.string(from: Date()),
            "currency": "IQD",
            "transactions": transactionsDict,
            "goals": goalsDict
        ]

        if let data = try? JSONSerialization.data(withJSONObject: fullBackup, options: .prettyPrinted) {
            let tempURL = FileManager.default.temporaryDirectory.appendingPathComponent("FinanceApp_Backup.json")
            try? data.write(to: tempURL)
            exportShareItem = ExportDocument(fileURL: tempURL)
        }
    }
}

// MARK: - Export Helpers

struct ExportDocument: Identifiable {
    let id = UUID()
    let fileURL: URL
}

struct ShareSheet: UIViewControllerRepresentable {
    var activityItems: [Any]

    func makeUIViewController(context: Context) -> UIActivityViewController {
        UIActivityViewController(activityItems: activityItems, applicationActivities: nil)
    }

    func updateUIViewController(_ uiViewController: UIActivityViewController, context: Context) {}
}

// MARK: - Categories Management View

struct CategoriesManagementView: View {
    @Environment(\\.modelContext) private var modelContext
    @Query private var categories: [CategoryItem]

    @State private var newCategoryName: String = ""
    @State private var newCategoryType: String = "expense_category"

    var body: some View {
        Form {
            Section("Add New Custom Category or Source") {
                Picker("Type", selection: $newCategoryType) {
                    Text("Expense Category").tag("expense_category")
                    Text("Income Source").tag("income_source")
                }
                .pickerStyle(.segmented)

                HStack {
                    TextField("Category Name", text: $newCategoryName)
                    Button("Add") {
                        addCategory()
                    }
                    .disabled(newCategoryName.trimmingCharacters(in: .whitespaces).isEmpty)
                }
            }

            Section("Expense Categories") {
                ForEach(categories.filter { $0.type == "expense_category" }) { item in
                    HStack {
                        Text(item.name)
                        Spacer()
                        if item.isDefault {
                            Text("Default")
                                .font(.caption2)
                                .foregroundColor(.secondary)
                        }
                    }
                }
                .onDelete { indices in
                    deleteCategory(at: indices, type: "expense_category")
                }
            }

            Section("Income Sources") {
                ForEach(categories.filter { $0.type == "income_source" }) { item in
                    HStack {
                        Text(item.name)
                        Spacer()
                        if item.isDefault {
                            Text("Default")
                                .font(.caption2)
                                .foregroundColor(.secondary)
                        }
                    }
                }
                .onDelete { indices in
                    deleteCategory(at: indices, type: "income_source")
                }
            }
        }
        .navigationTitle("Categories & Sources")
    }

    private func addCategory() {
        let trimmed = newCategoryName.trimmingCharacters(in: .whitespaces)
        guard !trimmed.isEmpty else { return }
        let item = CategoryItem(name: trimmed, type: newCategoryType, isDefault: false)
        modelContext.insert(item)
        try? modelContext.save()
        newCategoryName = ""
    }

    private func deleteCategory(at indices: IndexSet, type: String) {
        let list = categories.filter { $0.type == type }
        for index in indices {
            let item = list[index]
            modelContext.delete(item)
        }
        try? modelContext.save()
    }
}
`,Z0=`# FinanceApp — Native iOS 17 & Swift Playgrounds App Project (.swiftpm)

A 100% pure Swift and SwiftUI personal finance manager designed for iPhone 13 Pro Max, featuring offline-first local persistence via **SwiftData**, interactive analytics with **Swift Charts**, biometric authentication with **LocalAuthentication**, Iraqi Dinar (\`IQD\`) integer formatting, dynamic goal achievability analysis, and category budget limits.

---

## Architecture & Project Structure

This project is formatted as a native **Swift Playgrounds App (.swiftpm)** package. It requires zero third-party dependencies and builds with standard Apple frameworks (\`SwiftUI\`, \`SwiftData\`, \`Charts\`, \`LocalAuthentication\`).

\`\`\`
FinanceApp.swiftpm/
├── Package.swift                     # Swift Playgrounds 4+ Manifest
├── Sources/
│   ├── FinanceApp.swift              # @main entry point & TabView container
│   ├── Models.swift                  # SwiftData @Model declarations
│   ├── Utilities.swift               # CurrencyFormatter (IQD) & Date helpers
│   ├── FinancialEngine.swift         # Pure observable calculation & achievability engine
│   ├── Views/
│   │   ├── DashboardView.swift       # Top balance, monthly snapshot, recent transactions
│   │   ├── QuickAddTransactionSheet.swift # Validated modal for income & expenses
│   │   ├── TransactionsView.swift    # Chronological feed, search, filter, edit, swipe-delete
│   │   ├── AnalyticsView.swift       # Swift Charts bar, ranked category, & net trend
│   │   ├── GoalsView.swift           # Active/completed goals, allocation, achievability & shortfall
│   │   ├── BudgetsView.swift         # Category monthly limits with color transitions
│   │   └── SettingsView.swift        # Face ID toggle, category manager, CSV/JSON export
│   └── SingleFileBundle.swift        # Complete all-in-one file ready to paste
└── README.md
\`\`\`

---

## Step-by-Step Guide: Running on iPhone 13 Pro Max without a Paid Apple Developer Account

You **do not need a $99/year Apple Developer program account**. Apple allows free personal device installation directly through Swift Playgrounds 4.4+ or Xcode with any standard Apple ID.

### Step 1: Install Swift Playgrounds 4 on macOS
1. Open the **Mac App Store** on your Mac.
2. Search for **Swift Playgrounds** (version 4.4 or higher).
3. Click **Get** / **Install** (100% free from Apple).

### Step 2: Open or Create the App in Swift Playgrounds
**Method A (Direct Folder Open):**
1. Download the \`FinanceApp.swiftpm\` folder from this repository.
2. In macOS Finder, double-click the \`FinanceApp.swiftpm\` package or right-click > **Open With > Swift Playgrounds**.

**Method B (Paste SingleFileBundle):**
1. Launch Swift Playgrounds on your Mac.
2. In the bottom-left corner, click **App** to create a new empty App project.
3. Open \`SingleFileBundle.swift\` from this package, copy its entire contents.
4. Replace the default \`ContentView.swift\` in your playground with the copied code.

### Step 3: Connect Your iPhone 13 Pro Max
1. Connect your iPhone 13 Pro Max to your Mac using a **USB-to-Lightning** or **USB-C to Lightning** cable.
2. Unlock your iPhone. If prompted on your phone, tap **Trust This Computer** and enter your passcode.
3. If prompted in Finder on macOS, click **Trust**.

### Step 4: Enable Developer Mode on iOS 17+
On iOS 16 and iOS 17+, Apple requires Developer Mode to be toggled before running un-notarized sideloaded apps:
1. On your iPhone 13 Pro Max, open **Settings**.
2. Scroll down and tap **Privacy & Security**.
3. Scroll to the very bottom and tap **Developer Mode**.
4. Toggle **Developer Mode** to **ON**.
5. Tap **Restart** when prompted.
6. After your iPhone restarts and is unlocked, a system alert will appear: tap **Turn On** and enter your device passcode.

### Step 5: Select Your iPhone as Run Destination & Install
1. In Swift Playgrounds on your Mac, look at the top toolbar near the center.
2. Click the device picker next to the **Run (Play)** button.
3. Select your connected **iPhone 13 Pro Max** from the list of available devices (instead of "Mac" or "My Mac").
4. Click the **Run ▶** button.
5. Swift Playgrounds will compile the Swift code, sign it with your personal free Apple ID credentials, and install \`FinanceApp\` directly onto your iPhone home screen!

---

## Financial Calculation Rules & Mechanics

1. **Actual Balance vs. Unallocated Balance:**
   - $\\text{Actual Balance} = \\text{Total Income} - \\text{Total Expenses}$
   - $\\text{Unallocated Balance} = \\text{Actual Balance} - \\text{Total Allocated to Active Goals}$
   - Allocating money to a goal is strictly an internal cash reserve earmark. It **never** creates an expense and does **not** modify spending analytics.
2. **Goal Achievability Assessment:**
   - **No Deadline:** If $\\text{Unallocated Balance} \\ge \\text{Remaining Goal Amount}$, marked as *✓ Achievable immediately*. Otherwise, *⚠ Not Currently Achievable* with the exact cash shortfall displayed.
   - **With Deadline:**
     $$\\text{Required Monthly Savings} = \\frac{\\text{Target Amount} - \\text{Allocated Amount}}{\\text{Months Remaining}}$$
     - If $\\text{Historical Avg Savings} \\ge \\text{Required} \\times 1.15$ $\\longrightarrow$ **✓ Achievable**
     - If $\\text{Historical Avg Savings} \\ge \\text{Required}$ $\\longrightarrow$ **⚠ At Risk (Tight margin)**
     - If $\\text{Historical Avg Savings} < \\text{Required}$ $\\longrightarrow$ **✕ Unlikely to Be Achievable** with concrete recommendations (increase income, cut expenses, or extend target by $N$ months).
3. **Currency Formatting:**
   - Formatted as \`6,600,000 IQD\` with integer grouping commas and no fractional decimals.
`,oi=[{path:"SingleFileBundle.swift",name:"SingleFileBundle.swift",category:"bundle",description:"⭐ Complete 100% self-contained app ready to paste into Swift Playgrounds 4",code:B0},{path:"Package.swift",name:"Package.swift",category:"manifest",description:"Swift Playgrounds 4 & Swift Package Manager manifest",code:z0},{path:"Info.plist",name:"Info.plist",category:"manifest",description:"App configuration, bundle version 1.1.0, and Face ID permissions",code:R0},{path:"Sources/FinanceApp.swift",name:"FinanceApp.swift",category:"core",description:"@main entry point, 6-tab navigation container & theme setup",code:O0},{path:"Sources/Models.swift",name:"Models.swift",category:"core",description:"SwiftData @Model classes for Transactions, Plans, Budgets & Categories",code:I0},{path:"Sources/Utilities.swift",name:"Utilities.swift",category:"core",description:"Currency formatting (IQD), date formatters & utilities",code:L0},{path:"Sources/FinancialEngine.swift",name:"FinancialEngine.swift",category:"core",description:"Financial analysis engine, plan achievability calculations & liquidity",code:U0},{path:"Sources/Views/DashboardView.swift",name:"DashboardView.swift",category:"views",description:"Main financial overview, balances & recent transaction shortcuts",code:V0},{path:"Sources/Views/PlansDashboardView.swift",name:"PlansDashboardView.swift",category:"views",description:"Dedicated Planning Control Center & What-If Planning Simulator",code:G0},{path:"Sources/Views/QuickAddTransactionSheet.swift",name:"QuickAddTransactionSheet.swift",category:"views",description:"Quick transaction modal with category picker & validation",code:H0},{path:"Sources/Views/TransactionsView.swift",name:"TransactionsView.swift",category:"views",description:"Transaction history, search, filtering, editing & deletion",code:q0},{path:"Sources/Views/AnalyticsView.swift",name:"AnalyticsView.swift",category:"views",description:"Swift Charts visual analytics, monthly net trends & category rankings",code:$0},{path:"Sources/Views/GoalsView.swift",name:"GoalsView.swift",category:"views",description:"Plans management, target tracking, fund allocation & plan deletion",code:P0},{path:"Sources/Views/BudgetsView.swift",name:"BudgetsView.swift",category:"views",description:"Category monthly budget limits & spending progress indicators",code:Q0},{path:"Sources/Views/SettingsView.swift",name:"SettingsView.swift",category:"views",description:"Settings, Face ID toggle, CSV/JSON export & category management",code:Y0},{path:"README.md",name:"README.md",category:"docs",description:"Setup and deployment guide for iPad and iPhone",code:Z0}];async function rh(){const B=new F0,b=B.folder("FinanceApp.swiftpm");if(!b)return;for(const g of oi)g.category!=="bundle"&&b.file(g.path,g.code);const d=await B.generateAsync({type:"blob"}),x=URL.createObjectURL(d),w=document.createElement("a");w.href=x,w.download="FinanceApp-iOS.zip",document.body.appendChild(w),w.click(),document.body.removeChild(w),URL.revokeObjectURL(x)}function ih(){const B=oi.find(w=>w.category==="bundle");if(!B)return;const b=new Blob([B.code],{type:"text/plain;charset=utf-8"}),d=URL.createObjectURL(b),x=document.createElement("a");x.href=d,x.download="SingleFileBundle.swift",document.body.appendChild(x),x.click(),document.body.removeChild(x),URL.revokeObjectURL(d)}const K0=()=>{const[B,b]=ce.useState(oi[1]),[d,x]=ce.useState(!1),[w,g]=ce.useState(!1),f=()=>{navigator.clipboard.writeText(B.code),x(!0),setTimeout(()=>x(!1),2e3)},c=async()=>{g(!0);try{await rh()}finally{g(!1)}};return r.jsxs("div",{className:"mx-auto max-w-6xl space-y-6 px-4 py-6 text-[#1C1C1E] dark:text-[#F2F2F7]",children:[r.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-[28px] bg-[#1C1C1E] border border-[#3A3A3C] p-6 text-white shadow-xl",children:[r.jsxs("div",{className:"space-y-1",children:[r.jsxs("div",{className:"flex items-center gap-2",children:[r.jsx("span",{className:"rounded-full bg-[#2C2C2E] border border-[#3A3A3C] px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-[#007AFF]",children:"Swift Playgrounds 4+"}),r.jsx("span",{className:"rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-[#34C759]",children:"100% Pure Swift"}),r.jsx("span",{className:"rounded-full bg-blue-500/20 px-2.5 py-0.5 text-xs font-semibold text-blue-300",children:"Clean Package Zip"})]}),r.jsx("h2",{className:"text-2xl font-black tracking-tight",children:"FinanceApp.swiftpm Package"}),r.jsx("p",{className:"text-sm text-[#8E8E93] max-w-2xl",children:"Offline-first native iOS application built with SwiftData, Swift Charts, Face ID, and dynamic financial calculation engine."})]}),r.jsxs("div",{className:"flex flex-wrap items-center gap-2.5",children:[r.jsxs("button",{onClick:()=>ih(),className:"flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2.5 text-xs font-bold text-white transition-all hover:bg-white/20 active:scale-95",title:"Download single self-contained Swift file to copy/paste into any project",children:[r.jsx(hx,{className:"h-4 w-4 text-emerald-400"}),r.jsx("span",{children:"SingleFile.swift"})]}),r.jsxs("button",{onClick:c,disabled:w,className:"flex items-center gap-2 rounded-xl bg-[#007AFF] px-4 py-2.5 text-xs font-extrabold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-[#0062CC] active:scale-95",children:[r.jsx(gc,{className:"h-4 w-4 text-white"}),r.jsx("span",{children:w?"Preparing ZIP...":"Download Clean .swiftpm (ZIP)"})]})]})]}),r.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-12 gap-6",children:[r.jsx("div",{className:"md:col-span-4 space-y-3",children:r.jsxs("div",{className:"rounded-[24px] border border-[#E5E5EA] bg-white p-4 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]",children:[r.jsxs("div",{className:"flex items-center justify-between pb-3 border-b border-[#F2F2F7] dark:border-[#38383A]",children:[r.jsx("span",{className:"font-bold text-xs uppercase tracking-wider text-[#8E8E93]",children:"Package Tree"}),r.jsxs("span",{className:"rounded-md bg-[#F2F2F7] px-2 py-0.5 text-[10px] font-bold text-[#1C1C1E] dark:bg-[#1C1C1E] dark:text-[#F2F2F7]",children:[oi.length," Files"]})]}),r.jsx("div",{className:"mt-3 space-y-1.5 max-h-[520px] overflow-y-auto pr-1",children:oi.map(s=>{const h=B.path===s.path,k=s.category==="bundle";return r.jsxs("button",{onClick:()=>b(s),className:`w-full text-left rounded-xl p-2.5 transition-all flex items-start gap-2.5 ${h?"bg-[#007AFF] text-white shadow-sm":"hover:bg-[#F2F2F7] text-[#1C1C1E] dark:text-[#F2F2F7] dark:hover:bg-[#38383A]"}`,children:[r.jsx(Qf,{className:`h-4 w-4 mt-0.5 shrink-0 ${h?"text-white":k?"text-[#FF9500]":"text-[#007AFF]"}`}),r.jsxs("div",{className:"min-w-0 flex-1",children:[r.jsxs("div",{className:"font-bold text-xs truncate flex items-center gap-1.5",children:[r.jsx("span",{children:s.name}),k&&r.jsx("span",{className:`text-[9px] px-1.5 py-0.2 rounded-full font-extrabold ${h?"bg-white/20 text-white":"bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"}`,children:"All-in-1"})]}),r.jsx("div",{className:`text-[10px] truncate ${h?"text-white/80":"text-[#8E8E93]"}`,children:s.description})]})]},s.path)})})]})}),r.jsx("div",{className:"md:col-span-8 space-y-3",children:r.jsxs("div",{className:"overflow-hidden rounded-[24px] border border-[#E5E5EA] bg-[#1C1C1E] text-slate-100 shadow-xl dark:border-[#3A3A3C]",children:[r.jsxs("div",{className:"flex items-center justify-between border-b border-[#2C2C2E] bg-[#2C2C2E] px-4 py-3",children:[r.jsx("div",{className:"flex items-center gap-2",children:r.jsx("span",{className:"font-mono text-xs font-bold text-[#007AFF]",children:B.path})}),r.jsxs("button",{onClick:f,className:"flex items-center gap-1.5 rounded-xl bg-[#3A3A3C] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#48484A]",children:[d?r.jsx(sn,{className:"h-3.5 w-3.5 text-[#34C759]"}):r.jsx(li,{className:"h-3.5 w-3.5"}),r.jsx("span",{children:d?"Copied to Clipboard!":"Copy Code"})]})]}),r.jsx("div",{className:"max-h-[580px] overflow-auto p-4 font-mono text-xs leading-relaxed selection:bg-[#007AFF] selection:text-white",children:r.jsx("pre",{className:"text-[#F2F2F7] whitespace-pre",children:r.jsx("code",{children:B.code})})})]})})]})]})},X0=()=>r.jsxs("div",{className:"mx-auto max-w-4xl space-y-6 px-4 py-6 text-[#1C1C1E] dark:text-[#F2F2F7]",children:[r.jsxs("div",{className:"rounded-[28px] bg-[#1C1C1E] border border-[#3A3A3C] p-6 text-white shadow-xl",children:[r.jsxs("div",{className:"flex items-center gap-2 text-xs font-bold text-[#007AFF] uppercase tracking-wider",children:[r.jsx(Ml,{className:"h-4 w-4"})," Zero-Fee Physical Deployment"]}),r.jsx("h2",{className:"mt-1 text-2xl font-black tracking-tight",children:"How to Run on iPhone 13 Pro Max via Swift Playgrounds"}),r.jsx("p",{className:"mt-1 text-sm text-[#8E8E93]",children:"No paid Apple Developer account required ($99/yr saved). Follow these straightforward steps to install the app directly on your physical iPhone."}),r.jsxs("div",{className:"mt-4 flex flex-wrap items-center gap-2.5",children:[r.jsxs("button",{onClick:()=>rh(),className:"flex items-center gap-1.5 rounded-xl bg-[#007AFF] px-4 py-2.5 text-xs font-extrabold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-[#0062CC] active:scale-95",children:[r.jsx(gc,{className:"h-4 w-4 text-white"})," Download Clean .swiftpm (ZIP)"]}),r.jsxs("button",{onClick:()=>ih(),className:"flex items-center gap-1.5 rounded-xl border border-[#3A3A3C] bg-[#2C2C2E] px-4 py-2.5 text-xs font-extrabold text-white transition-all hover:bg-[#38383A] active:scale-95",children:[r.jsx(Qf,{className:"h-4 w-4 text-emerald-400"})," Download SingleFile.swift"]})]})]}),r.jsxs("div",{className:"space-y-4",children:[r.jsxs("div",{className:"flex gap-4 rounded-[24px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]",children:[r.jsx("div",{className:"flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 font-black text-[#007AFF] dark:bg-blue-950/40",children:"1"}),r.jsxs("div",{className:"space-y-1.5",children:[r.jsx("h3",{className:"font-bold text-sm text-[#1C1C1E] dark:text-white",children:"Get the Package & Open in Swift Playgrounds 4+"}),r.jsxs("p",{className:"text-xs text-[#8E8E93] leading-relaxed",children:["Download the ZIP archive above and unzip it to reveal the ",r.jsx("code",{className:"rounded bg-[#F2F2F7] px-1.5 py-0.5 font-mono text-[11px] dark:bg-[#1C1C1E] text-[#007AFF]",children:"FinanceApp.swiftpm"})," bundle. Double-click it to open directly in ",r.jsx("strong",{children:"Swift Playgrounds 4+ on macOS"}),"."]}),r.jsxs("div",{className:"rounded-xl bg-[#F2F2F7] p-3 text-xs text-[#1C1C1E] dark:bg-[#1C1C1E] dark:text-[#F2F2F7]",children:["💡 ",r.jsx("em",{children:"Alternative 1-Click Method:"}),' Create a new "App" project in Swift Playgrounds, delete the default file, and paste the code from ',r.jsx("strong",{className:"text-[#007AFF]",children:"SingleFileBundle.swift"}),". It contains everything in one clean file!"]})]})]}),r.jsxs("div",{className:"flex gap-4 rounded-[24px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]",children:[r.jsx("div",{className:"flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 font-black text-[#007AFF] dark:bg-blue-950/40",children:"2"}),r.jsxs("div",{className:"space-y-1.5",children:[r.jsx("h3",{className:"font-bold text-sm text-[#1C1C1E] dark:text-white",children:"Connect Your iPhone 13 Pro Max to Mac"}),r.jsxs("p",{className:"text-xs text-[#8E8E93] leading-relaxed",children:["Plug your iPhone 13 Pro Max into your Mac using a Lightning-to-USB cable. When prompted on your iPhone, tap ",r.jsx("strong",{children:'"Trust This Computer"'})," and enter your device passcode."]})]})]}),r.jsxs("div",{className:"flex gap-4 rounded-[24px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]",children:[r.jsx("div",{className:"flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 font-black text-[#007AFF] dark:bg-blue-950/40",children:"3"}),r.jsxs("div",{className:"space-y-1.5",children:[r.jsx("h3",{className:"font-bold text-sm text-[#1C1C1E] dark:text-white",children:"Enable Developer Mode on iOS 17 (Required once)"}),r.jsx("p",{className:"text-xs text-[#8E8E93] leading-relaxed",children:"On your iPhone:"}),r.jsxs("ol",{className:"list-decimal pl-5 space-y-1 text-xs text-[#8E8E93]",children:[r.jsxs("li",{children:["Open ",r.jsx("strong",{children:"Settings"})," > ",r.jsx("strong",{children:"Privacy & Security"}),"."]}),r.jsxs("li",{children:["Scroll to the bottom and tap ",r.jsx("strong",{children:"Developer Mode"}),"."]}),r.jsxs("li",{children:["Toggle Developer Mode ",r.jsx("strong",{children:"ON"})," and reboot your iPhone when prompted."]}),r.jsxs("li",{children:["After reboot, unlock your phone and tap ",r.jsx("strong",{children:'"Turn On"'}),"."]})]})]})]}),r.jsxs("div",{className:"flex gap-4 rounded-[24px] border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#3A3A3C] dark:bg-[#2C2C2E]",children:[r.jsx("div",{className:"flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 font-black text-[#007AFF] dark:bg-blue-950/40",children:"4"}),r.jsxs("div",{className:"space-y-1.5",children:[r.jsx("h3",{className:"font-bold text-sm text-[#1C1C1E] dark:text-white",children:'Select Your iPhone & Tap "Run App"'}),r.jsxs("p",{className:"text-xs text-[#8E8E93] leading-relaxed",children:["In Swift Playgrounds on macOS, click the device selector at the top toolbar and choose your ",r.jsx("strong",{children:"iPhone 13 Pro Max"}),". Then tap the ",r.jsx("strong",{children:"Run (▶)"})," button. Swift Playgrounds will sign the app with your free personal Apple ID and install it straight to your iPhone's home screen!"]})]})]}),r.jsxs("div",{className:"space-y-4",children:[r.jsxs("div",{className:"rounded-[24px] border border-red-200 bg-red-50/70 p-5 dark:border-red-900/40 dark:bg-red-950/20",children:[r.jsxs("div",{className:"flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-800 dark:text-red-400",children:[r.jsx(dc,{className:"h-4 w-4"}),` Fixed: "Package.swift cannot be accessed / doesn't exist"`]}),r.jsx("h4",{className:"mt-1 text-sm font-bold text-[#1C1C1E] dark:text-white",children:"PackageLoading.ToolsVersionParser.Error: Package.swift doesn't exist in file system"}),r.jsxs("div",{className:"mt-2 text-xs text-[#3A3A3C] dark:text-[#E5E5EA] space-y-2 leading-relaxed",children:[r.jsxs("p",{children:[r.jsx("strong",{children:"Cause:"})," When macOS Archive Utility unzips a zip containing multiple items, it creates an outer folder named ",r.jsx("code",{className:"rounded bg-white px-1.5 py-0.5 font-mono text-[11px] dark:bg-[#1C1C1E]",children:"FinanceApp.swiftpm"})," containing an inner package. macOS thinks the ",r.jsx("em",{children:"outer"})," folder is the app, but ",r.jsx("code",{className:"font-mono text-[11px]",children:"Package.swift"})," is inside the inner folder!"]}),r.jsx("p",{className:"font-semibold text-[#1C1C1E] dark:text-white",children:"Three ways to resolve instantly:"}),r.jsxs("ol",{className:"list-decimal list-inside space-y-1 pl-1",children:[r.jsxs("li",{children:[r.jsx("strong",{children:"Direct Clean ZIP (Recommended):"})," Click ",r.jsx("strong",{children:"Download Clean .swiftpm (ZIP)"})," above. The new package is named ",r.jsx("code",{className:"font-mono text-[11px]",children:"FinanceApp-iOS.zip"})," and unzips with zero nesting."]}),r.jsxs("li",{children:[r.jsx("strong",{children:"Fix Existing Folder in Finder:"})," In macOS Finder, right-click your existing ",r.jsx("code",{className:"font-mono text-[11px]",children:"FinanceApp.swiftpm"})," → select ",r.jsx("strong",{children:"Show Package Contents"}),". You will see the actual ",r.jsx("code",{className:"font-mono text-[11px]",children:"FinanceApp.swiftpm"})," inside it. Drag that inner package out onto your Desktop and double-click it."]}),r.jsxs("li",{children:[r.jsx("strong",{children:"Single-File Paste (100% Guaranteed):"})," In Swift Playgrounds, click ",r.jsx("strong",{children:"+ App"})," (empty project), open the ",r.jsx("strong",{children:"Code Hub → SingleFileBundle.swift"}),", click ",r.jsx("strong",{children:"Copy Swift Code"}),", and replace the contents of ",r.jsx("code",{className:"font-mono text-[11px]",children:"ContentView.swift"}),"."]})]})]})]}),r.jsxs("div",{className:"rounded-[24px] border border-amber-200 bg-amber-50/70 p-5 dark:border-amber-900/40 dark:bg-amber-950/20",children:[r.jsxs("div",{className:"flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400",children:[r.jsx(dc,{className:"h-4 w-4"})," Manifest Evaluation: deviceFamilies"]}),r.jsx("h4",{className:"mt-1 text-sm font-bold text-[#1C1C1E] dark:text-white",children:`Seeing "FailedToEvaluateManifest" or "Cannot convert value of type '[Any]'"?`}),r.jsxs("p",{className:"mt-1 text-xs text-[#8E8E93] leading-relaxed",children:["This occurs if ",r.jsx("code",{className:"rounded bg-white px-1.5 py-0.5 font-mono text-[11px] dark:bg-[#1C1C1E] text-amber-700 dark:text-amber-300",children:"Package.swift"})," has an invalid orientation argument like ",r.jsx("code",{className:"line-through text-red-500",children:".when(deviceBasedOn: .pad)"}),". In the updated package, this is fixed to ",r.jsx("code",{className:"rounded bg-emerald-100 px-1 py-0.5 font-mono text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",children:".when(deviceFamilies: [.pad])"}),"."]})]})]})]})]}),Rf="group.com.ahmedalkubaisy.finance",Of="group.com.ahmedalkubaisy.finance";class uc{static syncData(b,d,x,w,g="en"){var y,N,E;const f=nt.actualBalance(b),c=g==="ar"?"د.ع":"IQD",s=D=>{const A=Math.round(D).toLocaleString(g==="ar"?"ar-IQ":"en-US");return g==="ar"?`${A} د.ع`:`${A} IQD`},h=d.filter(D=>!D.isCompleted),k={critical:4,high:3,medium:2,low:1},m=[...h].sort((D,R)=>{const A=(k[R.priority]||0)-(k[D.priority]||0);return A!==0?A:(R.targetAmount||0)-(D.targetAmount||0)}).slice(0,2).map(D=>{const R=nt.analyzePlan(D,x,w),A=Math.max(1,D.targetAmount),T=D.allocatedAmount||0,L=Math.max(0,A-T),V=Math.min(100,Math.max(0,Math.round(T/A*100)));let Z=!1,U=0;if(D.targetDate&&R.projectedCompletionDate){const ue=new Date(D.targetDate),I=new Date(R.projectedCompletionDate);I.getTime()>ue.getTime()+360*60*60*1e3&&(Z=!0,U=Math.max(1,(I.getFullYear()-ue.getFullYear())*12+(I.getMonth()-ue.getMonth())))}let W="On Track";return D.isPaused?W=g==="ar"?"مؤقتة":"Paused":Z?W=g==="ar"?`تأخير +${U} ش`:`+${U} Mo Delay`:R.status==="ahead"?W=g==="ar"?"متقدم":"Ahead":W=g==="ar"?"في المسار":"On Track",{id:D.id,name:D.name,priority:D.priority,allocatedAmount:T,targetAmount:A,remainingAmount:L,progressPercent:V,statusFlag:W,isDelayed:Z,delayMonths:U,deepLink:`myapp://plan?id=${D.id}`}}),C={appGroupSuite:Rf,unallocatedBalance:x,unallocatedBalanceFormatted:s(x),actualBalance:f,actualBalanceFormatted:s(f),monthlyCapacity:w,currency:c,topPlans:m,quickActions:{addExpenseUrl:"myapp://add-expense",addIncomeUrl:"myapp://add-income",plansDashboardUrl:"myapp://plans-dashboard"},lastSyncTimestamp:new Date().toISOString()};try{localStorage.setItem(Of,JSON.stringify(C))}catch{}typeof window<"u"&&window.dispatchEvent(new CustomEvent("widget-data-synced",{detail:C}));try{const D=window;(E=(N=(y=D.Capacitor)==null?void 0:y.Plugins)==null?void 0:N.WidgetBridge)!=null&&E.syncWidgetData&&D.Capacitor.Plugins.WidgetBridge.syncWidgetData({data:JSON.stringify(C),suite:Rf})}catch{}return C}static getCachedData(){try{const b=localStorage.getItem(Of);if(b)return JSON.parse(b)}catch{return null}return null}}const W0="modulepreload",J0=function(B){return"/"+B},If={},ey=function(b,d,x){let w=Promise.resolve();if(d&&d.length>0){let f=function(h){return Promise.all(h.map(k=>Promise.resolve(k).then(S=>({status:"fulfilled",value:S}),S=>({status:"rejected",reason:S}))))};document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),s=(c==null?void 0:c.nonce)||(c==null?void 0:c.getAttribute("nonce"));w=f(d.map(h=>{if(h=J0(h),h in If)return;If[h]=!0;const k=h.endsWith(".css"),S=k?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${S}`))return;const j=document.createElement("link");if(j.rel=k?"stylesheet":W0,k||(j.as="script"),j.crossOrigin="",j.href=h,s&&j.setAttribute("nonce",s),document.head.appendChild(j),k)return new Promise((m,C)=>{j.addEventListener("load",m),j.addEventListener("error",()=>C(new Error(`Unable to preload CSS for ${h}`)))})}))}function g(f){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=f,window.dispatchEvent(c),!c.defaultPrevented)throw f}return w.then(f=>{for(const c of f||[])c.status==="rejected"&&g(c.reason);return b().catch(g)})};/*! Capacitor: https://capacitorjs.com/ - MIT License */var mr;(function(B){B.Unimplemented="UNIMPLEMENTED",B.Unavailable="UNAVAILABLE"})(mr||(mr={}));class lc extends Error{constructor(b,d,x){super(b),this.message=b,this.code=d,this.data=x}}const ty=B=>{var b,d;return B!=null&&B.androidBridge?"android":!((d=(b=B==null?void 0:B.webkit)===null||b===void 0?void 0:b.messageHandlers)===null||d===void 0)&&d.bridge?"ios":"web"},ny=B=>{const b=B.CapacitorCustomPlatform||null,d=B.Capacitor||{},x=d.Plugins=d.Plugins||{},w=()=>b!==null?b.name:ty(B),g=()=>w()!=="web",f=S=>{const j=h.get(S);return!!(j!=null&&j.platforms.has(w())||c(S))},c=S=>{var j;return(j=d.PluginHeaders)===null||j===void 0?void 0:j.find(m=>m.name===S)},s=S=>B.console.error(S),h=new Map,k=(S,j={})=>{const m=h.get(S);if(m)return console.warn(`Capacitor plugin "${S}" already registered. Cannot register plugins twice.`),m.proxy;const C=w(),y=c(S);let N;const E=async()=>(!N&&C in j?N=typeof j[C]=="function"?N=await j[C]():N=j[C]:b!==null&&!N&&"web"in j&&(N=typeof j.web=="function"?N=await j.web():N=j.web),N),D=(Z,U)=>{var W,ue;if(y){const I=y==null?void 0:y.methods.find(ae=>U===ae.name);if(I)return I.rtype==="promise"?ae=>d.nativePromise(S,U.toString(),ae):(ae,v)=>d.nativeCallback(S,U.toString(),ae,v);if(Z)return(W=Z[U])===null||W===void 0?void 0:W.bind(Z)}else{if(Z)return(ue=Z[U])===null||ue===void 0?void 0:ue.bind(Z);throw new lc(`"${S}" plugin is not implemented on ${C}`,mr.Unimplemented)}},R=Z=>{let U;const W=(...ue)=>{const I=E().then(ae=>{const v=D(ae,Z);if(v){const J=v(...ue);return U=J==null?void 0:J.remove,J}else throw new lc(`"${S}.${Z}()" is not implemented on ${C}`,mr.Unimplemented)});return Z==="addListener"&&(I.remove=async()=>U()),I};return W.toString=()=>`${Z.toString()}() { [capacitor code] }`,Object.defineProperty(W,"name",{value:Z,writable:!1,configurable:!1}),W},A=R("addListener"),T=R("removeListener"),L=(Z,U)=>{const W=A({eventName:Z},U),ue=async()=>{const ae=await W;T({eventName:Z,callbackId:ae},U)},I=new Promise(ae=>W.then(()=>ae({remove:ue})));return I.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await ue()},I},V=new Proxy({},{get(Z,U){switch(U){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return y?L:A;case"removeListener":return T;default:return R(U)}}});return x[S]=V,h.set(S,{name:S,proxy:V,platforms:new Set([...Object.keys(j),...y?[C]:[]])}),V};return d.convertFileSrc||(d.convertFileSrc=S=>S),d.getPlatform=w,d.handleError=s,d.isNativePlatform=g,d.isPluginAvailable=f,d.registerPlugin=k,d.Exception=lc,d.DEBUG=!!d.DEBUG,d.isLoggingEnabled=!!d.isLoggingEnabled,d},ay=B=>B.Capacitor=ny(B),mc=ay(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),zl=mc.registerPlugin;class bc{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(b,d){let x=!1;this.listeners[b]||(this.listeners[b]=[],x=!0),this.listeners[b].push(d);const g=this.windowListeners[b];g&&!g.registered&&this.addWindowListener(g),x&&this.sendRetainedArgumentsForEvent(b);const f=async()=>this.removeListener(b,d);return Promise.resolve({remove:f})}async removeAllListeners(){this.listeners={};for(const b in this.windowListeners)this.removeWindowListener(this.windowListeners[b]);this.windowListeners={}}notifyListeners(b,d,x){const w=this.listeners[b];if(!w){if(x){let g=this.retainedEventArguments[b];g||(g=[]),g.push(d),this.retainedEventArguments[b]=g}return}w.forEach(g=>g(d))}hasListeners(b){var d;return!!(!((d=this.listeners[b])===null||d===void 0)&&d.length)}registerWindowListener(b,d){this.windowListeners[d]={registered:!1,windowEventName:b,pluginEventName:d,handler:x=>{this.notifyListeners(d,x)}}}unimplemented(b="not implemented"){return new mc.Exception(b,mr.Unimplemented)}unavailable(b="not available"){return new mc.Exception(b,mr.Unavailable)}async removeListener(b,d){const x=this.listeners[b];if(!x)return;const w=x.indexOf(d);w!==-1&&this.listeners[b].splice(w,1),this.listeners[b].length||this.removeWindowListener(this.windowListeners[b])}addWindowListener(b){window.addEventListener(b.windowEventName,b.handler),b.registered=!0}removeWindowListener(b){b&&(window.removeEventListener(b.windowEventName,b.handler),b.registered=!1)}sendRetainedArgumentsForEvent(b){const d=this.retainedEventArguments[b];d&&(delete this.retainedEventArguments[b],d.forEach(x=>{this.notifyListeners(b,x)}))}}const Lf=B=>encodeURIComponent(B).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Uf=B=>B.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class ry extends bc{async getCookies(){const b=document.cookie,d={};return b.split(";").forEach(x=>{if(x.length<=0)return;let[w,g]=x.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");w=Uf(w).trim(),g=Uf(g).trim(),d[w]=g}),d}async setCookie(b){try{const d=Lf(b.key),x=Lf(b.value),w=b.expires?`; expires=${b.expires.replace("expires=","")}`:"",g=(b.path||"/").replace("path=",""),f=b.url!=null&&b.url.length>0?`domain=${b.url}`:"";document.cookie=`${d}=${x||""}${w}; path=${g}; ${f};`}catch(d){return Promise.reject(d)}}async deleteCookie(b){try{document.cookie=`${b.key}=; Max-Age=0`}catch(d){return Promise.reject(d)}}async clearCookies(){try{const b=document.cookie.split(";")||[];for(const d of b)document.cookie=d.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(b){return Promise.reject(b)}}async clearAllCookies(){try{await this.clearCookies()}catch(b){return Promise.reject(b)}}}zl("CapacitorCookies",{web:()=>new ry});const iy=async B=>new Promise((b,d)=>{const x=new FileReader;x.onload=()=>{const w=x.result;b(w.indexOf(",")>=0?w.split(",")[1]:w)},x.onerror=w=>d(w),x.readAsDataURL(B)}),ly=(B={})=>{const b=Object.keys(B);return Object.keys(B).map(w=>w.toLocaleLowerCase()).reduce((w,g,f)=>(w[g]=B[b[f]],w),{})},oy=(B,b=!0)=>B?Object.entries(B).reduce((x,w)=>{const[g,f]=w;let c,s;return Array.isArray(f)?(s="",f.forEach(h=>{c=b?encodeURIComponent(h):h,s+=`${g}=${c}&`}),s.slice(0,-1)):(c=b?encodeURIComponent(f):f,s=`${g}=${c}`),`${x}&${s}`},"").substr(1):null,sy=(B,b={})=>{const d=Object.assign({method:B.method||"GET",headers:B.headers},b),w=ly(B.headers)["content-type"]||"";if(typeof B.data=="string")d.body=B.data;else if(w.includes("application/x-www-form-urlencoded")){const g=new URLSearchParams;for(const[f,c]of Object.entries(B.data||{}))g.set(f,c);d.body=g.toString()}else if(w.includes("multipart/form-data")||B.data instanceof FormData){const g=new FormData;if(B.data instanceof FormData)B.data.forEach((c,s)=>{g.append(s,c)});else for(const c of Object.keys(B.data))g.append(c,B.data[c]);d.body=g;const f=new Headers(d.headers);f.delete("content-type"),d.headers=f}else(w.includes("application/json")||typeof B.data=="object")&&(d.body=JSON.stringify(B.data));return d};class cy extends bc{async request(b){const d=sy(b,b.webFetchExtra),x=oy(b.params,b.shouldEncodeUrlParams),w=x?`${b.url}?${x}`:b.url,g=await fetch(w,d),f=g.headers.get("content-type")||"";let{responseType:c="text"}=g.ok?b:{};f.includes("application/json")&&(c="json");let s,h;switch(c){case"arraybuffer":case"blob":h=await g.blob(),s=await iy(h);break;case"json":s=await g.json();break;case"document":case"text":default:s=await g.text()}const k={};return g.headers.forEach((S,j)=>{k[j]=S}),{data:s,headers:k,status:g.status,url:g.url}}async get(b){return this.request(Object.assign(Object.assign({},b),{method:"GET"}))}async post(b){return this.request(Object.assign(Object.assign({},b),{method:"POST"}))}async put(b){return this.request(Object.assign(Object.assign({},b),{method:"PUT"}))}async patch(b){return this.request(Object.assign(Object.assign({},b),{method:"PATCH"}))}async delete(b){return this.request(Object.assign(Object.assign({},b),{method:"DELETE"}))}}zl("CapacitorHttp",{web:()=>new cy});var Vf;(function(B){B.Dark="DARK",B.Light="LIGHT",B.Default="DEFAULT"})(Vf||(Vf={}));var Gf;(function(B){B.StatusBar="StatusBar",B.NavigationBar="NavigationBar"})(Gf||(Gf={}));class dy extends bc{async setStyle(){this.unavailable("not available for web")}async setAnimation(){this.unavailable("not available for web")}async show(){this.unavailable("not available for web")}async hide(){this.unavailable("not available for web")}}zl("SystemBars",{web:()=>new dy});const uy=zl("App",{web:()=>ey(()=>import("./web-CCGJNXRR.js"),[]).then(B=>new B.AppWeb)}),Fl=class Fl{static parseUrl(b){if(!b)return{type:"unknown",rawUrl:""};try{if(b.startsWith("myapp://")||b.startsWith("financeapp://")){const d=b.replace(/^(myapp|financeapp):\/\//,""),[x,w]=d.split("?"),g=new URLSearchParams(w||"");if(x==="add-expense"||x==="expense")return{type:"add-expense"};if(x==="add-income"||x==="income")return{type:"add-income"};if(x==="plans-dashboard"||x==="plans")return{type:"plans-dashboard"};if(x==="plan"||x==="plan-detail"){const f=g.get("id")||g.get("planId")||"";if(f)return{type:"plan-detail",planId:f}}}if(b.includes("action=")){let d;b.startsWith("http")?d=new URL(b):d=new URL(b,window.location.origin);const x=d.searchParams.get("action");if(x==="add-expense")return{type:"add-expense"};if(x==="add-income")return{type:"add-income"};if(x==="plans-dashboard")return{type:"plans-dashboard"};if(x==="plan"){const w=d.searchParams.get("id")||"";if(w)return{type:"plan-detail",planId:w}}}if(b.includes("#")){const d=b.split("#")[1]||"";if(d.startsWith("add-expense"))return{type:"add-expense"};if(d.startsWith("add-income"))return{type:"add-income"};if(d.startsWith("plans-dashboard"))return{type:"plans-dashboard"};if(d.startsWith("plan")){const w=new URLSearchParams(d.split("?")[1]||"").get("id")||"";if(w)return{type:"plan-detail",planId:w}}}}catch(d){console.warn("Failed to parse deep link url:",b,d)}return{type:"unknown",rawUrl:b}}static addListener(b){return this.handlers.add(b),this.init(),()=>{this.handlers.delete(b)}}static triggerDeepLink(b){const d=this.parseUrl(b);this.notifyHandlers(d)}static notifyHandlers(b){b.type!=="unknown"&&this.handlers.forEach(d=>{try{d(b)}catch(x){console.error("Error in deep link handler:",x)}})}static init(){if(this.isInitialized||typeof window>"u")return;this.isInitialized=!0;try{uy.addListener("appUrlOpen",d=>{if(d!=null&&d.url){const x=this.parseUrl(d.url);this.notifyHandlers(x)}})}catch{}window.addEventListener("app-deep-link",(d=>{var x;(x=d.detail)!=null&&x.url&&this.triggerDeepLink(d.detail.url)}));const b=()=>{const d=window.location.href;if(d.includes("action=")||d.includes("#add-")||d.includes("#plans-")||d.includes("#plan")){const x=this.parseUrl(d);if(x.type!=="unknown"){const w=window.location.pathname;window.history.replaceState({},document.title,w),this.notifyHandlers(x)}}};setTimeout(b,200),window.addEventListener("hashchange",()=>{b()})}};Fl.handlers=new Set,Fl.isInitialized=!1;let _l=Fl;const my=({transactions:B,plans:b,unallocatedBalance:d,monthlyCapacity:x,onClose:w,onDeepLinkTriggered:g})=>{const{t:f,language:c,formatCurrency:s,isRTL:h}=yt(),[k,S]=ce.useState("widgets"),[j,m]=ce.useState(null),[C,y]=ce.useState(()=>uc.syncData(B,b,d,x,c));ce.useEffect(()=>{const D=uc.syncData(B,b,d,x,c);y(D)},[B,b,d,x,c]);const N=(D,R)=>{navigator.clipboard.writeText(D),m(R),setTimeout(()=>m(null),2e3)},E={critical:{bg:"bg-rose-50 dark:bg-rose-950/40",dot:"bg-rose-500",text:"text-rose-600 dark:text-rose-400"},high:{bg:"bg-amber-50 dark:bg-amber-950/40",dot:"bg-amber-500",text:"text-amber-600 dark:text-amber-400"},medium:{bg:"bg-blue-50 dark:bg-blue-950/40",dot:"bg-[#007AFF]",text:"text-[#007AFF] dark:text-blue-400"},low:{bg:"bg-emerald-50 dark:bg-emerald-950/40",dot:"bg-emerald-500",text:"text-emerald-600 dark:text-emerald-400"}};return r.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200",children:r.jsxs("div",{className:"relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-[32px] border border-[#E5E5EA] bg-white shadow-2xl dark:border-[#3A3A3C] dark:bg-[#1C1C1E] overflow-hidden text-[#1C1C1E] dark:text-white",children:[r.jsxs("div",{className:"flex items-center justify-between px-6 py-4 border-b border-[#F2F2F7] dark:border-[#2C2C2E] bg-[#FAFAFC] dark:bg-[#252527]",children:[r.jsxs("div",{className:"flex items-center gap-2.5",children:[r.jsx("div",{className:"flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white shadow-md shadow-blue-500/20",children:r.jsx(cc,{className:"h-5 w-5"})}),r.jsxs("div",{children:[r.jsx("h2",{className:"text-base font-black leading-tight",children:c==="ar"?"أدوات الشاشة الرئيسية والاختصارات":"iOS Widgets & Quick Actions"}),r.jsx("p",{className:"text-[11px] text-[#8E8E93]",children:c==="ar"?"ويدجت تفاعلية، اختصارات 3D Touch، وربط App Group":"Interactive WidgetKit 2x2 & 2x4, 3D Touch & App Group"})]})]}),r.jsx("button",{type:"button",onClick:w,className:"rounded-full p-1.5 text-[#8E8E93] hover:bg-black/5 dark:hover:bg-white/10 transition-colors",children:r.jsx(gn,{className:"h-5 w-5"})})]}),r.jsxs("div",{className:"flex items-center gap-1.5 px-6 py-2.5 bg-[#F2F2F7] dark:bg-[#1C1C1E] border-b border-[#E5E5EA] dark:border-[#2C2C2E] text-xs font-bold overflow-x-auto no-scrollbar",children:[r.jsxs("button",{type:"button",onClick:()=>S("widgets"),className:`flex items-center gap-1.5 rounded-xl px-3 py-1.5 transition-all whitespace-nowrap ${k==="widgets"?"bg-white text-[#007AFF] shadow-xs dark:bg-[#2C2C2E] dark:text-white":"text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white"}`,children:[r.jsx(cc,{className:"h-3.5 w-3.5"}),r.jsx("span",{children:c==="ar"?"الويدجت التفاعلية":"Home Widgets"})]}),r.jsxs("button",{type:"button",onClick:()=>S("shortcuts"),className:`flex items-center gap-1.5 rounded-xl px-3 py-1.5 transition-all whitespace-nowrap ${k==="shortcuts"?"bg-white text-[#007AFF] shadow-xs dark:bg-[#2C2C2E] dark:text-white":"text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white"}`,children:[r.jsx(Ml,{className:"h-3.5 w-3.5"}),r.jsx("span",{children:c==="ar"?"اختصارات 3D Touch":"Quick Actions"})]}),r.jsxs("button",{type:"button",onClick:()=>S("bridge"),className:`flex items-center gap-1.5 rounded-xl px-3 py-1.5 transition-all whitespace-nowrap ${k==="bridge"?"bg-white text-[#007AFF] shadow-xs dark:bg-[#2C2C2E] dark:text-white":"text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white"}`,children:[r.jsx(Yf,{className:"h-3.5 w-3.5"}),r.jsx("span",{children:c==="ar"?"جسر البيانات المشتركة":"App Group Bridge"})]}),r.jsxs("button",{type:"button",onClick:()=>S("swift"),className:`flex items-center gap-1.5 rounded-xl px-3 py-1.5 transition-all whitespace-nowrap ${k==="swift"?"bg-white text-[#007AFF] shadow-xs dark:bg-[#2C2C2E] dark:text-white":"text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white"}`,children:[r.jsx(cx,{className:"h-3.5 w-3.5"}),r.jsx("span",{children:c==="ar"?"أكواد Swift الأصلية":"Native SwiftKit"})]})]}),r.jsxs("div",{className:"flex-1 overflow-y-auto p-6 space-y-6",children:[k==="widgets"&&r.jsxs("div",{className:"space-y-6",children:[r.jsxs("div",{className:"rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 p-3.5 text-xs text-[#007AFF] dark:text-blue-300 border border-blue-100 dark:border-blue-900/50 flex items-center gap-2",children:[r.jsx(Bl,{className:"h-4 w-4 shrink-0"}),r.jsx("span",{children:c==="ar"?"جرب النقر على أزرار الويدجت أدناه! سيتم فتح نوافذ المعاملات والخطط مباشرة عبر الروابط العميقة (Deep Links).":"Interactive Preview: Tap the buttons or plans below to test direct deep-link routing into the transaction or plan modal!"})]}),r.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-12 gap-5 items-start",children:[r.jsxs("div",{className:"md:col-span-5 space-y-2",children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsx("span",{className:"text-[11px] font-bold uppercase tracking-wider text-[#8E8E93]",children:c==="ar"?"أداة الإدخال السريع (صغيرة 2x2)":"Widget A: Quick Log (Small 2x2)"}),r.jsx("span",{className:"text-[10px] font-semibold text-[#007AFF]",children:"WidgetKit Small"})]}),r.jsxs("div",{className:"relative mx-auto w-48 h-48 rounded-[28px] border border-black/5 dark:border-white/10 bg-gradient-to-b from-white to-[#F9F9FB] dark:from-[#2C2C2E] dark:to-[#222224] p-4 shadow-xl flex flex-col justify-between select-none",children:[r.jsxs("div",{children:[r.jsxs("div",{className:"flex items-center justify-between text-[#8E8E93] text-[10px] font-bold uppercase tracking-wider mb-1",children:[r.jsx("span",{children:c==="ar"?"المتاح للادخار":"Unallocated"}),r.jsx("span",{className:"h-1.5 w-1.5 rounded-full bg-[#34C759]"})]}),r.jsx("p",{className:"text-xl font-black text-[#1C1C1E] dark:text-white tracking-tight truncate",title:C.unallocatedBalanceFormatted,children:C.unallocatedBalanceFormatted}),r.jsx("p",{className:"text-[9px] text-[#8E8E93] mt-0.5",children:c==="ar"?"جاهز للتخصيص":"Available in IQD"})]}),r.jsxs("div",{className:"grid grid-cols-2 gap-2 pt-2",children:[r.jsxs("button",{type:"button",onClick:()=>{g("myapp://add-expense"),w()},className:"group flex flex-col items-center justify-center rounded-2xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/50 dark:hover:bg-rose-900/60 p-2.5 transition-all active:scale-95 border border-rose-200/60 dark:border-rose-900/50",children:[r.jsx("div",{className:"flex h-6 w-6 items-center justify-center rounded-full bg-rose-500 text-white shadow-xs mb-1",children:r.jsx(cn,{className:"h-3.5 w-3.5"})}),r.jsx("span",{className:"text-[10px] font-black text-rose-700 dark:text-rose-300",children:c==="ar"?"مصروف":"Expense"})]}),r.jsxs("button",{type:"button",onClick:()=>{g("myapp://add-income"),w()},className:"group flex flex-col items-center justify-center rounded-2xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:hover:bg-emerald-900/60 p-2.5 transition-all active:scale-95 border border-emerald-200/60 dark:border-emerald-900/50",children:[r.jsx("div",{className:"flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xs mb-1",children:r.jsx(cn,{className:"h-3.5 w-3.5"})}),r.jsx("span",{className:"text-[10px] font-black text-emerald-700 dark:text-emerald-300",children:c==="ar"?"دخل":"Income"})]})]})]}),r.jsxs("p",{className:"text-[10px] text-center text-[#8E8E93]",children:["Deep links: ",r.jsx("code",{className:"text-[#007AFF]",children:"myapp://add-expense"})," & ",r.jsx("code",{className:"text-[#007AFF]",children:"myapp://add-income"})]})]}),r.jsxs("div",{className:"md:col-span-7 space-y-2",children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsx("span",{className:"text-[11px] font-bold uppercase tracking-wider text-[#8E8E93]",children:c==="ar"?"أداة متابعة الخطط (متوسطة 2x4)":"Widget B: Plans Tracker (Medium 2x4)"}),r.jsx("span",{className:"text-[10px] font-semibold text-[#007AFF]",children:"WidgetKit Medium"})]}),r.jsxs("div",{className:"relative w-full h-48 rounded-[28px] border border-black/5 dark:border-white/10 bg-gradient-to-b from-white to-[#F9F9FB] dark:from-[#2C2C2E] dark:to-[#222224] p-4 shadow-xl flex flex-col justify-between select-none",children:[r.jsxs("div",{className:"flex items-center justify-between pb-1.5 border-b border-[#F2F2F7] dark:border-[#38383A]",children:[r.jsxs("div",{className:"flex items-center gap-1.5",children:[r.jsx(On,{className:"h-3.5 w-3.5 text-[#007AFF]"}),r.jsx("span",{className:"text-xs font-black text-[#1C1C1E] dark:text-white",children:c==="ar"?"أولويات الخطط النشطة":"Top Priority Objectives"})]}),r.jsxs("button",{type:"button",onClick:()=>{g("myapp://plans-dashboard"),w()},className:"text-[10px] font-bold text-[#007AFF] hover:underline",children:[c==="ar"?"عرض الكل":"View All"," ➔"]})]}),r.jsx("div",{className:"space-y-2.5",children:C.topPlans.length===0?r.jsx("div",{className:"py-4 text-center text-xs text-[#8E8E93]",children:c==="ar"?"لا توجد خطط نشطة حالياً":"No active plans found"}):C.topPlans.map(D=>{const R=E[D.priority]||E.medium;return r.jsxs("div",{onClick:()=>{g(D.deepLink),w()},className:"group p-2 rounded-xl bg-[#F2F2F7]/80 hover:bg-blue-50/80 dark:bg-[#1C1C1E]/60 dark:hover:bg-blue-950/40 cursor-pointer transition-all border border-black/[0.03] dark:border-white/[0.04]",children:[r.jsxs("div",{className:"flex items-center justify-between text-xs",children:[r.jsxs("div",{className:"flex items-center gap-1.5 min-w-0",children:[r.jsx("span",{className:`h-2 w-2 rounded-full shrink-0 ${R.dot}`}),r.jsx("span",{className:"font-black text-[#1C1C1E] dark:text-white truncate text-[11px]",children:D.name})]}),r.jsxs("div",{className:"flex items-center gap-1.5 shrink-0 text-[10px]",children:[r.jsx("span",{className:`px-1.5 py-0.2 rounded font-extrabold text-[9px] ${D.isDelayed?"bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300":"bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300"}`,children:D.statusFlag}),r.jsxs("span",{className:"text-[#8E8E93] font-semibold",children:[s(D.remainingAmount)," rem"]})]})]}),r.jsxs("div",{className:"mt-1.5 flex items-center gap-2",children:[r.jsx("div",{className:"h-1.5 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden",children:r.jsx("div",{className:`h-full rounded-full ${R.dot}`,style:{width:`${D.progressPercent}%`}})}),r.jsxs("span",{className:"text-[9px] font-bold text-[#1C1C1E] dark:text-white shrink-0",children:[D.progressPercent,"%"]})]})]},D.id)})}),r.jsxs("div",{className:"pt-1 flex items-center justify-between text-[9px] text-[#8E8E93]",children:[r.jsx("span",{children:"Tap any plan to open full details"}),r.jsxs("span",{children:["Suite: ",C.appGroupSuite]})]})]}),r.jsxs("p",{className:"text-[10px] text-center text-[#8E8E93]",children:["Deep link: ",r.jsxs("code",{className:"text-[#007AFF]",children:["myapp://plan?id=","{planId}"]})]})]})]})]}),k==="shortcuts"&&r.jsxs("div",{className:"space-y-5",children:[r.jsxs("div",{className:"rounded-2xl bg-[#F9F9FB] dark:bg-[#252527] p-4 border border-[#E5E5EA] dark:border-[#38383A] space-y-3",children:[r.jsxs("div",{className:"flex items-center gap-2 text-xs font-bold text-[#1C1C1E] dark:text-white",children:[r.jsx(Ml,{className:"h-4 w-4 text-amber-500"}),r.jsx("span",{children:c==="ar"?"محاكاة القائمة السريعة عند الضغط المطول على أيقونة التطبيق (3D Touch / Quick Actions)":"Simulated iOS Home Screen Long-Press Quick Action Menu"})]}),r.jsx("p",{className:"text-xs text-[#8E8E93]",children:c==="ar"?"في نظام iOS، عند الضغط المطول على أيقونة التطبيق في الشاشة الرئيسية، تظهر هذه الاختصارات لفتح نموذج المعاملة أو لوحة الخطط مباشرة دون الحاجة للتنقل اليدوي.":"On iPhone, long-pressing the app icon triggers UIApplicationShortcutItems, instantly bypassing navigation to open the transaction or plans dashboard."}),r.jsx("div",{className:"py-4 flex flex-col items-center justify-center",children:r.jsxs("div",{className:"w-72 rounded-[22px] bg-white/90 dark:bg-[#2C2C2E]/95 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-2xl p-2 space-y-1 divide-y divide-gray-100 dark:divide-[#3A3A3C]",children:[r.jsxs("button",{type:"button",onClick:()=>{g("myapp://add-expense"),w()},className:"w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all text-left",children:[r.jsxs("div",{className:"flex items-center gap-3",children:[r.jsx("div",{className:"flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500 text-white shadow-xs",children:r.jsx(cn,{className:"h-4 w-4"})}),r.jsxs("div",{children:[r.jsx("p",{className:"text-xs font-bold text-[#1C1C1E] dark:text-white",children:c==="ar"?"إضافة مصروف":"Add Expense"}),r.jsx("p",{className:"text-[10px] text-[#8E8E93]",children:c==="ar"?"تسجيل نفقة فورية":"Log spending quickly"})]})]}),r.jsx("span",{className:"text-[10px] font-mono text-[#007AFF]",children:"+"})]}),r.jsxs("button",{type:"button",onClick:()=>{g("myapp://add-income"),w()},className:"w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-all text-left pt-2",children:[r.jsxs("div",{className:"flex items-center gap-3",children:[r.jsx("div",{className:"flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500 text-white shadow-xs",children:r.jsx(cn,{className:"h-4 w-4"})}),r.jsxs("div",{children:[r.jsx("p",{className:"text-xs font-bold text-[#1C1C1E] dark:text-white",children:c==="ar"?"إضافة دخل":"Add Income"}),r.jsx("p",{className:"text-[10px] text-[#8E8E93]",children:c==="ar"?"إيداع أو راتب":"Deposit or earnings"})]})]}),r.jsx("span",{className:"text-[10px] font-mono text-[#34C759]",children:"+"})]}),r.jsxs("button",{type:"button",onClick:()=>{g("myapp://plans-dashboard"),w()},className:"w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-all text-left pt-2",children:[r.jsxs("div",{className:"flex items-center gap-3",children:[r.jsx("div",{className:"flex h-7 w-7 items-center justify-center rounded-lg bg-[#007AFF] text-white shadow-xs",children:r.jsx(On,{className:"h-4 w-4"})}),r.jsxs("div",{children:[r.jsx("p",{className:"text-xs font-bold text-[#1C1C1E] dark:text-white",children:c==="ar"?"حالة الخطط":"Plans Status"}),r.jsx("p",{className:"text-[10px] text-[#8E8E93]",children:c==="ar"?"لوحة الأهداف والمخطط":"Open Plans Dashboard"})]})]}),r.jsx("span",{className:"text-[10px] font-mono text-[#007AFF]",children:"➔"})]})]})})]}),r.jsxs("div",{className:"rounded-2xl border border-[#E5E5EA] dark:border-[#3A3A3C] p-4 bg-white dark:bg-[#2C2C2E] space-y-2.5",children:[r.jsx("h4",{className:"text-xs font-bold uppercase tracking-wider text-[#8E8E93]",children:"Registered URL Schemes"}),r.jsx("div",{className:"space-y-1.5 font-mono text-xs",children:["myapp://add-expense","myapp://add-income","myapp://plans-dashboard","myapp://plan?id={planId}"].map(D=>r.jsxs("div",{className:"flex items-center justify-between p-2 rounded-xl bg-[#F2F2F7] dark:bg-[#1C1C1E] text-xs",children:[r.jsx("span",{className:"text-[#007AFF] font-bold",children:D}),r.jsx("button",{type:"button",onClick:()=>N(D,D),className:"text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white p-1",children:j===D?r.jsx(sn,{className:"h-3.5 w-3.5 text-emerald-500"}):r.jsx(li,{className:"h-3.5 w-3.5"})})]},D))})]})]}),k==="bridge"&&r.jsxs("div",{className:"space-y-4",children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsxs("div",{children:[r.jsx("h4",{className:"text-xs font-bold uppercase tracking-wider text-[#8E8E93]",children:"Shared App Group Payload"}),r.jsxs("p",{className:"text-[11px] text-[#8E8E93]",children:["Mirrored to ",r.jsx("code",{className:"text-[#007AFF]",children:C.appGroupSuite})," on every save"]})]}),r.jsxs("button",{type:"button",onClick:()=>N(JSON.stringify(C,null,2),"payload"),className:"flex items-center gap-1 text-xs font-bold text-[#007AFF] hover:underline",children:[j==="payload"?r.jsx(sn,{className:"h-3.5 w-3.5 text-emerald-500"}):r.jsx(li,{className:"h-3.5 w-3.5"}),r.jsx("span",{children:j==="payload"?"Copied":"Copy JSON"})]})]}),r.jsx("div",{className:"rounded-2xl bg-[#1C1C1E] p-4 text-emerald-400 font-mono text-xs overflow-x-auto max-h-72 border border-gray-800",children:r.jsx("pre",{children:JSON.stringify(C,null,2)})}),r.jsxs("div",{className:"rounded-2xl bg-amber-50 dark:bg-amber-950/30 p-3 text-xs text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50",children:[r.jsx("strong",{children:"Sync Protocol:"})," Whenever transactions are added, edited, or deleted, or when plan allocations change, ",r.jsx("code",{children:"WidgetBridge.syncData()"})," writes directly to the shared UserDefaults suite and triggers ",r.jsx("code",{children:"WidgetCenter.shared.reloadAllTimelines()"}),"."]})]}),k==="swift"&&r.jsxs("div",{className:"space-y-4 text-xs",children:[r.jsxs("div",{children:[r.jsx("h4",{className:"text-xs font-bold uppercase tracking-wider text-[#8E8E93]",children:"Production Swift WidgetKit Extensions"}),r.jsxs("p",{className:"text-[11px] text-[#8E8E93]",children:["Located in ",r.jsx("code",{className:"text-[#007AFF]",children:"/ios/App/FinanceWidgets/"})," ready to build in Xcode"]})]}),r.jsxs("div",{className:"rounded-2xl border border-[#E5E5EA] dark:border-[#3A3A3C] p-3.5 bg-[#F9F9FB] dark:bg-[#252527] space-y-2",children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsx("span",{className:"font-bold text-xs",children:"QuickLogWidget.swift (WidgetKit Small 2x2)"}),r.jsxs("button",{type:"button",onClick:()=>N(`// QuickLogWidget.swift
import WidgetKit
import SwiftUI

struct QuickLogEntry: TimelineEntry {
    let date: Date
    let unallocatedBalance: String
}

struct QuickLogWidgetEntryView: View {
    var entry: QuickLogEntry

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("UNALLOCATED")
                .font(.system(size: 10, weight: .bold))
                .foregroundColor(.secondary)
            Text(entry.unallocatedBalance)
                .font(.system(size: 18, weight: .heavy, design: .rounded))
            Spacer()
            HStack(spacing: 8) {
                Link(destination: URL(string: "myapp://add-expense")!) {
                    Text("+ Expense")
                        .font(.system(size: 11, weight: .bold))
                        .frame(maxWidth: .infinity, maxHeight: 34)
                        .background(Color.red.opacity(0.15))
                        .foregroundColor(.red)
                        .cornerRadius(10)
                }
                Link(destination: URL(string: "myapp://add-income")!) {
                    Text("+ Income")
                        .font(.system(size: 11, weight: .bold))
                        .frame(maxWidth: .infinity, maxHeight: 34)
                        .background(Color.green.opacity(0.15))
                        .foregroundColor(.green)
                        .cornerRadius(10)
                }
            }
        }
        .padding()
    }
}`,"quicklog-code"),className:"text-[#007AFF] hover:underline flex items-center gap-1 font-semibold text-[11px]",children:[j==="quicklog-code"?r.jsx(sn,{className:"h-3 w-3 text-emerald-500"}):r.jsx(li,{className:"h-3 w-3"}),r.jsx("span",{children:"Copy Swift"})]})]}),r.jsx("pre",{className:"p-2.5 rounded-xl bg-[#1C1C1E] text-gray-300 font-mono text-[10px] overflow-x-auto max-h-40",children:`struct QuickLogWidgetEntryView: View {
    var entry: QuickLogEntry
    var body: some View {
        VStack(alignment: .leading) {
            Text(entry.unallocatedBalance)
            HStack {
                Link("+ Expense", destination: URL(string: "myapp://add-expense")!)
                Link("+ Income", destination: URL(string: "myapp://add-income")!)
            }
        }
    }
}`})]}),r.jsxs("div",{className:"rounded-2xl border border-[#E5E5EA] dark:border-[#3A3A3C] p-3.5 bg-[#F9F9FB] dark:bg-[#252527] space-y-2",children:[r.jsxs("div",{className:"flex items-center justify-between",children:[r.jsx("span",{className:"font-bold text-xs",children:"PlansTrackerWidget.swift (WidgetKit Medium 2x4)"}),r.jsxs("button",{type:"button",onClick:()=>N(`// PlansTrackerWidget.swift
import WidgetKit
import SwiftUI

struct PlansTrackerWidgetEntryView: View {
    var entry: PlansTrackerEntry

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Label("Active Plans", systemImage: "target")
                    .font(.system(size: 12, weight: .bold))
                Spacer()
                Link("View All", destination: URL(string: "myapp://plans-dashboard")!)
                    .font(.system(size: 10, weight: .semibold))
            }
            ForEach(entry.topPlans) { plan in
                Link(destination: URL(string: "myapp://plan?id=\\(plan.id)")!) {
                    VStack(alignment: .leading, spacing: 4) {
                        HStack {
                            Text(plan.name).font(.system(size: 12, weight: .bold))
                            Spacer()
                            Text(plan.statusFlag).font(.system(size: 10, weight: .heavy))
                        }
                        ProgressView(value: Double(plan.progressPercent), total: 100)
                    }
                }
            }
        }
        .padding()
    }
}`,"planstracker-code"),className:"text-[#007AFF] hover:underline flex items-center gap-1 font-semibold text-[11px]",children:[j==="planstracker-code"?r.jsx(sn,{className:"h-3 w-3 text-emerald-500"}):r.jsx(li,{className:"h-3 w-3"}),r.jsx("span",{children:"Copy Swift"})]})]}),r.jsx("pre",{className:"p-2.5 rounded-xl bg-[#1C1C1E] text-gray-300 font-mono text-[10px] overflow-x-auto max-h-40",children:`struct PlansTrackerWidgetEntryView: View {
    var entry: PlansTrackerEntry
    var body: some View {
        ForEach(entry.topPlans) { plan in
            Link(destination: URL(string: "myapp://plan?id=\\(plan.id)")!) {
                Text(plan.name)
                ProgressView(value: plan.progressPercent, total: 100)
            }
        }
    }
}`})]})]})]}),r.jsxs("div",{className:"flex items-center justify-between px-6 py-3 border-t border-[#F2F2F7] dark:border-[#2C2C2E] bg-[#FAFAFC] dark:bg-[#252527] text-xs",children:[r.jsx("span",{className:"text-[11px] text-[#8E8E93]",children:c==="ar"?"متوافق مع نظام iOS 16/17/18":"iOS 16/17/18 WidgetKit & App Groups Ready"}),r.jsx("button",{type:"button",onClick:w,className:"rounded-xl bg-[#007AFF] px-4 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-[#0062CC] transition-colors",children:c==="ar"?"تم":"Done"})]})]})})};function Hf(){const{t:B,language:b}=yt(),[d,x]=ce.useState("simulator"),[w,g]=ce.useState(0),[f,c]=ce.useState("dashboard"),[s,h]=ce.useState(()=>ht.loadTransactions()),[k,S]=ce.useState(()=>ht.loadPlans()),[j,m]=ce.useState(()=>ht.loadBudgets()),[C,y]=ce.useState(()=>ht.loadCategories()),[N,E]=ce.useState(()=>ht.getBiometrics()),[D,R]=ce.useState(()=>ht.getTheme()),[A,T]=ce.useState(!1),[L,V]=ce.useState("expense"),[Z,U]=ce.useState(!1),[W,ue]=ce.useState(null),[I,ae]=ce.useState(null),[v,J]=ce.useState(null),[Q,Y]=ce.useState(!1),[P,ne]=ce.useState(!1),[O,o]=ce.useState(!1);ce.useEffect(()=>{const H=nt.unallocatedBalance(s,k),z=nt.historicalMonthlyAverageSavings(s);uc.syncData(s,k,H,z,b)},[s,k,b]),ce.useEffect(()=>_l.addListener(z=>{if(z.type==="add-expense")x("simulator"),V("expense"),T(!0);else if(z.type==="add-income")x("simulator"),V("income"),T(!0);else if(z.type==="plans-dashboard")x("simulator"),g(1),c("dashboard");else if(z.type==="plan-detail"){x("simulator");const F=k.find(q=>q.id===z.planId);F?(g(1),J(F)):g(1)}}),[k]),ce.useEffect(()=>{ht.saveTransactions(s)},[s]),ce.useEffect(()=>{ht.savePlans(k)},[k]),ce.useEffect(()=>{ht.saveBudgets(j)},[j]),ce.useEffect(()=>{ht.saveCategories(C)},[C]),ce.useEffect(()=>{ht.setBiometrics(N)},[N]),ce.useEffect(()=>{ht.setTheme(D),D==="dark"?document.documentElement.classList.add("dark"):D==="light"?document.documentElement.classList.remove("dark"):window.matchMedia("(prefers-color-scheme: dark)").matches?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")},[D]);const _=H=>{const z={...H,id:"tx-"+Date.now(),createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};h(F=>[z,...F])},K=H=>{h(z=>z.map(F=>F.id===H.id?H:F))},X=H=>{h(z=>{const F=z.filter(q=>q.id!==H);return ht.saveTransactions(F),F})},te=H=>{h(z=>{const F=z.filter(q=>!H.includes(q.id));return ht.saveTransactions(F),F})},ye=H=>{const z={...H,id:"plan-"+Date.now(),allocatedAmount:0,isCompleted:!1,completedAt:null,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};S(F=>[z,...F])},xe=H=>{S(z=>z.map(F=>F.id===H.id?H:F)),v&&v.id===H.id&&J(H)},be=H=>{S(z=>{const F=z.filter(q=>q.id!==H);return ht.savePlans(F),F}),v&&v.id===H&&J(null)},Se=H=>{S(z=>{const F=z.filter(q=>!H.includes(q.id));return ht.savePlans(F),F}),v&&H.includes(v.id)&&J(null)},je=H=>{S(z=>z.map(F=>{if(F.id===H){const q=!F.isCompleted;return{...F,isCompleted:q,completedAt:q?new Date().toISOString():null,updatedAt:new Date().toISOString()}}return F}))},Ne=(H,z)=>{m(F=>{const q=F.findIndex(me=>me.category===H);if(q>=0){const me=[...F];return me[q]={...me[q],monthlyLimit:z},me}else return[...F,{id:"b-"+Date.now(),category:H,monthlyLimit:z,createdAt:new Date().toISOString()}]})},Fe=H=>{m(z=>z.filter(F=>F.id!==H))},Le=(H,z)=>{C.some(F=>F.name.toLowerCase()===H.toLowerCase()&&F.type===z)||y(F=>[...F,{id:"cat-"+Date.now(),name:H,type:z,isDefault:!1}])},p=(H,z)=>{y(F=>F.filter(q=>!(q.name===H&&q.type===z)))},ie=nt.unallocatedBalance(s,k);return r.jsxs("div",{className:"min-h-screen bg-[#F2F2F7] text-[#1C1C1E] transition-colors dark:bg-[#1C1C1E] dark:text-[#F2F2F7]",children:[r.jsx("header",{className:"hidden sm:block sticky top-0 z-40 border-b border-[#D1D1D6] bg-white/95 backdrop-blur-xl dark:border-[#38383A] dark:bg-[#1C1C1E]/95",children:r.jsxs("div",{className:"mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5 sm:px-6",children:[r.jsxs("div",{className:"flex items-center gap-3",children:[r.jsx("div",{className:"flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#007AFF] font-bold text-white shadow-md shadow-blue-500/25 text-xs",children:"AK"}),r.jsxs("div",{children:[r.jsxs("div",{className:"flex items-center gap-2",children:[r.jsx("h1",{className:"font-bold text-sm text-[#1C1C1E] dark:text-white leading-tight",children:"FinanceApp"}),r.jsx("span",{className:"rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-[#007AFF] dark:bg-blue-950/40",children:"v2.1.0"}),r.jsx("span",{className:"text-[11px] text-[#8E8E93] hidden md:inline",children:"• Developer: Ahmed AL KUBAISI"})]}),r.jsx("div",{className:"text-[10px] text-[#8E8E93]",children:b==="ar"?"إدارة الخطط المالية والميزانيات":"Financial Plans, Budgets & Simulator"})]})]}),r.jsxs("div",{className:"flex items-center gap-2.5",children:[r.jsxs("div",{className:"flex items-center rounded-xl bg-[#E5E5EA] p-0.5 text-xs font-semibold dark:bg-[#2C2C2E]",children:[r.jsxs("button",{onClick:()=>x("simulator"),className:`flex items-center gap-1.5 rounded-lg px-2.5 py-1 transition-all ${d==="simulator"?"bg-white text-[#007AFF] shadow-sm dark:bg-[#1C1C1E] dark:text-blue-400":"text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white"}`,children:[r.jsx(Wf,{className:"h-3.5 w-3.5"}),r.jsx("span",{children:b==="ar"?"التطبيق":"App Preview"})]}),r.jsxs("button",{onClick:()=>x("code"),className:`flex items-center gap-1.5 rounded-lg px-2.5 py-1 transition-all ${d==="code"?"bg-white text-[#007AFF] shadow-sm dark:bg-[#1C1C1E] dark:text-blue-400":"text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white"}`,children:[r.jsx(px,{className:"h-3.5 w-3.5"}),r.jsx("span",{children:b==="ar"?"الكود":"Swift Code"})]}),r.jsxs("button",{onClick:()=>x("guide"),className:`flex items-center gap-1.5 rounded-lg px-2.5 py-1 transition-all ${d==="guide"?"bg-white text-[#007AFF] shadow-sm dark:bg-[#1C1C1E] dark:text-blue-400":"text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white"}`,children:[r.jsx($p,{className:"h-3.5 w-3.5"}),r.jsx("span",{children:b==="ar"?"الدليل":"Deploy Guide"})]})]}),r.jsxs("button",{onClick:()=>U(!0),className:"flex items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50/80 px-2.5 py-1 text-xs font-semibold text-[#007AFF] shadow-xs hover:bg-blue-100 transition-all dark:border-blue-900/40 dark:bg-blue-950/30 dark:text-blue-300",title:"iOS Home Screen Widgets & 3D Touch Quick Actions",children:[r.jsx(cc,{className:"h-3.5 w-3.5"}),r.jsx("span",{className:"hidden sm:inline",children:b==="ar"?"الويدجت واختصارات iOS":"iOS Widgets"})]}),r.jsx("button",{onClick:()=>{V("expense"),T(!0)},className:"flex items-center gap-1 rounded-xl bg-[#007AFF] px-3 py-1.5 text-xs font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-[#0062CC] active:scale-95",children:r.jsxs("span",{children:["+ ",B.addTransaction]})})]})]})}),r.jsxs("main",{className:"sm:py-6",children:[d==="simulator"&&r.jsx("div",{className:"flex flex-col items-center justify-center sm:px-4",children:r.jsxs(u0,{activeTab:w,onTabChange:H=>g(H),theme:D,children:[w===0&&r.jsx(f0,{transactions:s,goals:k,onOpenAdd:()=>{V("expense"),T(!0)},onNavigateTab:H=>g(H),onSelectGoal:H=>J(H),onOpenWidgetsHub:()=>U(!0)}),w===1&&r.jsx(v0,{goals:k,transactions:s,initialSubTab:f,onOpenCreateGoal:()=>Y(!0),onOpenAllocate:H=>ae(H),onOpenDetail:H=>J(H),onDeletePlan:be,onDeletePlansBatch:Se,onNavigateTab:H=>g(H)}),w===2&&r.jsx(g0,{transactions:s,onOpenAdd:()=>T(!0),onEditTransaction:H=>ue(H),onDeleteTransaction:H=>X(H),onDeleteTransactionsBatch:te}),w===3&&r.jsx(p0,{transactions:s}),w===4&&r.jsx(C0,{transactions:s,goals:k,budgets:j,categories:C,biometricsEnabled:N,onToggleBiometrics:H=>E(H),onOpenBudgets:()=>ne(!0),onAddCategory:Le,onDeleteCategory:p,theme:D,onChangeTheme:H=>R(H),onTriggerFaceID:()=>o(!0),onOpenWidgetsHub:()=>U(!0)})]})}),d==="code"&&r.jsx(K0,{}),d==="guide"&&r.jsx(X0,{})]}),A&&r.jsx(S0,{categories:C,initialType:L,onClose:()=>T(!1),onSave:_,onAddCategory:Le}),Z&&r.jsx(my,{transactions:s,plans:k,unallocatedBalance:ie,monthlyCapacity:nt.historicalMonthlyAverageSavings(s),onClose:()=>U(!1),onDeepLinkTriggered:H=>_l.triggerDeepLink(H)}),W&&r.jsx(w0,{transaction:W,categories:C,onClose:()=>ue(null),onSave:K,onDelete:X}),I&&r.jsx(j0,{fallbackTitle:"Error loading Allocate Funds",children:r.jsx(k0,{plan:I,goal:I,unallocatedBalance:ie,onClose:()=>ae(null),onUpdatePlan:xe,onUpdateGoal:xe})}),Q&&r.jsx(E0,{onClose:()=>Y(!1),onCreate:ye}),v&&r.jsx(T0,{goal:v,plan:v,transactions:s,allGoals:k,allPlans:k,onClose:()=>J(null),onOpenAllocate:()=>{ae(v),J(null)},onToggleComplete:()=>je(v.id),onDeleteGoal:()=>be(v.id),onDeletePlan:()=>be(v.id),onUpdatePlan:xe}),P&&r.jsx(N0,{budgets:j,transactions:s,categories:C,onClose:()=>ne(!1),onSaveBudget:Ne,onDeleteBudget:Fe}),r.jsx(D0,{isOpen:O,onSuccess:()=>o(!1),onCancel:()=>o(!1)})]})}function fy(){const B=$f.useContext(xc);return B&&B!==pc?r.jsx(Hf,{}):r.jsx(nh,{children:r.jsx(Hf,{})})}"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js?v=2.1.0").then(b=>{b.update().catch(()=>{})}).catch(b=>{console.warn("Service worker registration failed:",b)});let B=!1;navigator.serviceWorker.addEventListener("controllerchange",()=>{B||(B=!0,window.location.reload())})});Np.createRoot(document.getElementById("root")).render(r.jsx(ce.StrictMode,{children:r.jsx(nh,{children:r.jsx(fy,{})})}));export{bc as W};
