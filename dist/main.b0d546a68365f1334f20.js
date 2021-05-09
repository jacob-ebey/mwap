(()=>{"use strict";var S={132:(n,c,t)=>{t.r(c),t.d(c,{default:()=>m});var e=t(342),s=t(134);const l=(0,s.D8)(()=>Promise.all([t.e(216),t.e(346)]).then(t.bind(t,688)),{__chunkId:"pages_docs_tsx"});function a(o){return e.createElement(l,o)}const u=(0,s.D8)(()=>Promise.all([t.e(216),t.e(646)]).then(t.bind(t,944)),{__chunkId:"pages_home_tsx"});function r(o){return e.createElement(u,o)}const m=[{component:r,exact:!0,path:"/"},{component:a,path:"/docs/:article"},{component:a,path:"/docs"}]},74:(n,c,t)=>{var e=t(342),s=t(810),l=t(890),a=t(709),u=t(223),r=t(103),m=t.n(r),o=(g,k,w)=>new Promise((v,E)=>{var h=p=>{try{y(w.next(p))}catch(A){E(A)}},N=p=>{try{y(w.throw(p))}catch(A){E(A)}},y=p=>p.done?v(p.value):Promise.resolve(p.value).then(h,N);y((w=w.apply(g,k)).next())});const d=typeof document!="undefined"?document.querySelector('script[type="__SSR_DATA__"]'):null,b=d?JSON.parse(decodeURI(d.innerHTML)):[],f=new Map(b.map(g=>{let{id:k}=g;return[k,function(w,v){if(w==null)return{};var E,h,N={},y=Object.keys(w);for(h=0;h<y.length;h++)v.indexOf(E=y[h])>=0||(N[E]=w[E]);return N}(g,["id"])]}));typeof window!="undefined"&&(window.loadersCache=f);const x=(g,k)=>{const w=(0,u.JT)(g,k||{}),v=f.get(w);if(v){if(v.preRenderData||v.promise)return v.preRenderData||v.promise;if(v.error)throw v.error}return((E,h,N)=>{const y=fetch(`/dist/loader/${h}/${btoa(m()(N))}.json`).then(p=>{if(!p.ok)throw new Error(`Failed to load data for loader: ${E}`);return p}).then(p=>p.json()).then(p=>(f.set(E,{preRenderData:p}),p)).catch(p=>{throw f.set(E,{error:p}),p});return f.set(E,{promise:y}),y})(w,g,k||{})},O=()=>e.createElement(u.XL,{getData:x},e.createElement(a.Vw,null));(()=>o(void 0,null,function*(){const g=document.querySelector('script[type="__ASYNC_CHUNKS__"]'),k=g?JSON.parse(decodeURI(g.innerHTML)):[];let w=new Set(k),v=Object.keys(window.__ASYNC_PRELOAD__||{});for(;w.size>0&&v.some(h=>w.has(h));)yield Promise.all(k.map(h=>{var N;if((N=window.__ASYNC_PRELOAD__)!=null&&N[h]){w.delete(h);const y=window.__ASYNC_PRELOAD__[h];return delete window.__ASYNC_PRELOAD__[h],y().catch(p=>console.error("Error loading chunk",h,p))}})),v=Object.keys(window.__ASYNC_PRELOAD__||{});const E=document.getElementById("__mwap__");(0,e.hydrate)(e.createElement(e.Suspense,{fallback:""},e.createElement(s.B,null,e.createElement(l.VK,null,e.createElement(O,null)))),E)}))()},747:(n,c,t)=>{t.r(c),t.d(c,{default:()=>o});var e=t(342),s=t(810),l=t(928),a=t(890);const u=()=>e.createElement("header",{className:"flex flex-wrap max-w-2xl px-4 py-4 mx-auto mb-4"},e.createElement(a.rU,{to:"/",className:"inline-flex items-center p-2 hover:bg-yellow-100"},e.createElement("svg",{className:"inline-block w-5 h-5 mr-3 bg-black"},e.createElement("path",{d:"M0 0h19v19H0z"})),e.createElement("span",{className:"text-lg font-semibold"},"@mwap")),e.createElement("nav",{className:"inline-flex items-center justify-end flex-grow"},e.createElement("a",{className:"p-2 mr-2 text-xs font-semibold text-gray-700",href:"https://github.com/jacob-ebey/mwap"},"Source"),e.createElement("a",{href:"https://twitter.com/ebey_jacob",className:"p-2 text-xs font-semibold text-white bg-black"},"Follow Me"))),r="/dist/".replace("dist/","")||0,m=()=>e.createElement(s.q,null,e.createElement("meta",{charSet:"UTF-8"}),e.createElement("meta",{"http-equiv":"X-UA-Compatible",content:"IE=edge"}),e.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),e.createElement("link",{rel:"apple-touch-icon",sizes:"180x180",href:`${r}apple-touch-icon.png`}),e.createElement("link",{rel:"icon",type:"image/png",sizes:"32x32",href:`${r}favicon-32x32.png`}),e.createElement("link",{rel:"icon",type:"image/png",sizes:"16x16",href:`${r}favicon-16x16.png`}),e.createElement("link",{rel:"manifest",href:`${r}site.webmanifest`})),o=({children:d})=>e.createElement(e.Fragment,null,e.createElement(l.pU,null),e.createElement(s.q,{htmlAttributes:{lang:"en"},defaultTitle:"@mwap docs",titleTemplate:"%s | @mwap docs"},e.createElement("meta",{name:"description",content:"An example demonstrating tailwindcss within the @mwap framework."})),e.createElement(m,null),e.createElement(u,null),e.createElement(e.Suspense,{fallback:""},d))},709:(n,c,t)=>{t.d(c,{Vw:()=>r,SV:()=>l,pU:()=>m});var e=t(342),s=t(831);class l extends e.Component{constructor(d){super(d),this.state={error:void 0}}static getDerivedStateFromError(d){return{error:d}}render(){return this.state.error?(console.error(this.state.error),e.createElement("h1",null,"Internal Error")):this.props.children}}let a=t(747),u=t(132);const r=()=>{const o=a&&a.default||a,d=u&&u.default||u,b=(0,e.useMemo)(()=>d.map(f=>e.createElement(s.AW,{key:f.path,component:f.component,exact:f.exact,path:f.path})),[d]);return e.createElement(l,null,e.createElement(o,null,e.createElement(s.rs,null,b)))},m=()=>{const o=(0,s.k6)();return(0,e.useEffect)(()=>{const d=o.listen(()=>{window.scrollTo(0,0)});return()=>{d()}},[o]),null}},134:(n,c,t)=>{t.d(c,{TV:()=>s,D8:()=>a});var e=t(342);const s=(0,e.createContext)(null),l=({children:u,chunks:r})=>_.createElement(s.Provider,{value:{chunks:r}},u),a=(u,r)=>{let m,o;const d=()=>(m||(m=Promise.resolve(u()).then(f=>{o=(f==null?void 0:f.default)||f,r!=null&&r.__chunkId&&typeof window!="undefined"&&(window.__DYNAMIC_COMPONENTS__=window.__DYNAMIC_COMPONENTS__||{},window.__DYNAMIC_COMPONENTS__[r.__chunkId]=o)})),m);r!=null&&r.__chunkId&&typeof window!="undefined"&&(window.__ASYNC_PRELOAD__=window.__ASYNC_PRELOAD__||{},window.__ASYNC_PRELOAD__[r.__chunkId]=window.__ASYNC_PRELOAD__[r.__chunkId]||d);const b=f=>{const x=(0,e.useContext)(s);if(x&&r!=null&&r.__chunkId&&x.chunks.add(r.__chunkId),r!=null&&r.__chunkId&&typeof window!="undefined"&&(window.__DYNAMIC_COMPONENTS__=window.__DYNAMIC_COMPONENTS__||{},o=o||window.__DYNAMIC_COMPONENTS__[r.__chunkId]),o)return(0,e.createElement)(o,f);throw d(),m};return b.load=d,b}},223:(n,c,t)=>{t.d(c,{XL:()=>u,JT:()=>m,U2:()=>r});var e=t(342),s=t(103),l=t.n(s);const a=(0,e.createContext)(null),u=({children:o,getData:d})=>e.createElement(a.Provider,{value:{getData:d}},o),r=(o,d)=>{const{getData:b}=(0,e.useContext)(a),f=b(o,d||{});if("then"in f)throw f;return f},m=(o,d)=>`{ "id": ${JSON.stringify(o)}, "params": ${l()(d)} }`},928:(n,c,t)=>{t.d(c,{SV:()=>e.SV,pU:()=>e.pU,U2:()=>l.U2});var e=t(709),s=t(134),l=t(223)}},C={};function i(n){var c=C[n];if(c!==void 0)return c.exports;var t=C[n]={exports:{}};return S[n](t,t.exports,i),t.exports}i.m=S,(()=>{var n=[];i.O=(c,t,e,s)=>{if(t){s=s||0;for(var l=n.length;l>0&&n[l-1][2]>s;l--)n[l]=n[l-1];n[l]=[t,e,s];return}for(var a=Infinity,l=0;l<n.length;l++){for(var[t,e,s]=n[l],u=!0,r=0;r<t.length;r++)(s&!1||a>=s)&&Object.keys(i.O).every(f=>i.O[f](t[r]))?t.splice(r--,1):(u=!1,s<a&&(a=s));u&&(n.splice(l--,1),c=e())}return c}})(),(()=>{i.n=n=>{var c=n&&n.__esModule?()=>n.default:()=>n;return i.d(c,{a:c}),c}})(),(()=>{i.d=(n,c)=>{for(var t in c)i.o(c,t)&&!i.o(n,t)&&Object.defineProperty(n,t,{enumerable:!0,get:c[t]})}})(),(()=>{i.f={},i.e=n=>Promise.all(Object.keys(i.f).reduce((c,t)=>(i.f[t](n,c),c),[]))})(),(()=>{i.u=n=>""+n+"."+{"35":"08781e5a1a3cb40152db","126":"92fd399892ae87e967f3","296":"cef1c8bf6e66236b2885","346":"7c0ef7f8045e4f9a5d6b","460":"cb70d70a4fe526d99b4f","621":"cd72fbce47a7f7059d89","646":"c1fca68606fefaf6ae56"}[n]+".js"})(),(()=>{i.miniCssF=n=>{}})(),(()=>{i.g=function(){if(typeof globalThis=="object")return globalThis;try{return this||new Function("return this")()}catch(n){if(typeof window=="object")return window}}()})(),(()=>{i.o=(n,c)=>Object.prototype.hasOwnProperty.call(n,c)})(),(()=>{var n={},c="@mwap/docs:";i.l=(t,e,s,l)=>{if(n[t]){n[t].push(e);return}var a,u;if(s!==void 0)for(var r=document.getElementsByTagName("script"),m=0;m<r.length;m++){var o=r[m];if(o.getAttribute("src")==t||o.getAttribute("data-webpack")==c+s){a=o;break}}a||(u=!0,a=document.createElement("script"),a.charset="utf-8",a.timeout=120,i.nc&&a.setAttribute("nonce",i.nc),a.setAttribute("data-webpack",c+s),a.src=t),n[t]=[e];var d=(f,x)=>{a.onerror=a.onload=null,clearTimeout(b);var O=n[t];if(delete n[t],a.parentNode&&a.parentNode.removeChild(a),O&&O.forEach(g=>g(x)),f)return f(x)},b=setTimeout(d.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=d.bind(null,a.onerror),a.onload=d.bind(null,a.onload),u&&document.head.appendChild(a)}})(),(()=>{i.r=n=>{typeof Symbol!="undefined"&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})}})(),(()=>{i.p="/dist/"})(),(()=>{var n={179:0};i.f.j=(e,s)=>{var l=i.o(n,e)?n[e]:void 0;if(l!==0)if(l)s.push(l[2]);else{var a=new Promise((o,d)=>l=n[e]=[o,d]);s.push(l[2]=a);var u=i.p+i.u(e),r=new Error,m=o=>{if(i.o(n,e)&&(l=n[e],l!==0&&(n[e]=void 0),l)){var d=o&&(o.type==="load"?"missing":o.type),b=o&&o.target&&o.target.src;r.message="Loading chunk "+e+` failed.
(`+d+": "+b+")",r.name="ChunkLoadError",r.type=d,r.request=b,l[1](r)}};i.l(u,m,"chunk-"+e,e)}},i.O.j=e=>n[e]===0;var c=(e,s)=>{var[l,a,u]=s,r,m,o=0;for(r in a)i.o(a,r)&&(i.m[r]=a[r]);for(u&&u(i),e&&e(s);o<l.length;o++)m=l[o],i.o(n,m)&&n[m]&&n[m][0](),n[l[o]]=0;i.O()},t=self.webpackChunk_mwap_docs=self.webpackChunk_mwap_docs||[];t.forEach(c.bind(null,0)),t.push=c.bind(null,t.push.bind(t))})();var P=i.O(void 0,[216],()=>i(74));P=i.O(P)})();