import{c as k,r as s,j as M}from"./index-C0_y7vv_.js";import{M as I,i as A,u as b,P as W,a as q,b as B,L as D}from"./proxy-9Zbaew3i.js";/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],ne=k("arrow-right",H);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],se=k("circle-check-big",K);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]],oe=k("moon",U);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],re=k("search",X);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]],ie=k("star",F);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],ce=k("sun",G);/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],ae=k("x",T);function L(e,o){if(typeof e=="function")return e(o);e!=null&&(e.current=o)}function V(...e){return o=>{let t=!1;const r=e.map(i=>{const n=L(i,o);return!t&&typeof n=="function"&&(t=!0),n});if(t)return()=>{for(let i=0;i<r.length;i++){const n=r[i];typeof n=="function"?n():L(e[i],null)}}}}function J(...e){return s.useCallback(V(...e),e)}class O extends s.Component{getSnapshotBeforeUpdate(o){const t=this.props.childRef.current;if(t&&o.isPresent&&!this.props.isPresent){const r=t.offsetParent,i=A(r)&&r.offsetWidth||0,n=this.props.sizeRef.current;n.height=t.offsetHeight||0,n.width=t.offsetWidth||0,n.top=t.offsetTop,n.left=t.offsetLeft,n.right=i-n.width-n.left}return null}componentDidUpdate(){}render(){return this.props.children}}function Q({children:e,isPresent:o,anchorX:t,root:r}){const i=s.useId(),n=s.useRef(null),p=s.useRef({width:0,height:0,top:0,left:0,right:0}),{nonce:x}=s.useContext(I),R=J(n,e==null?void 0:e.ref);return s.useInsertionEffect(()=>{const{width:c,height:m,top:a,left:f,right:d}=p.current;if(o||!n.current||!c||!m)return;const y=t==="left"?`left: ${f}`:`right: ${d}`;n.current.dataset.motionPopId=i;const u=document.createElement("style");x&&(u.nonce=x);const _=r??document.head;return _.appendChild(u),u.sheet&&u.sheet.insertRule(`
          [data-motion-pop-id="${i}"] {
            position: absolute !important;
            width: ${c}px !important;
            height: ${m}px !important;
            ${y}px !important;
            top: ${a}px !important;
          }
        `),()=>{_.contains(u)&&_.removeChild(u)}},[o]),M.jsx(O,{isPresent:o,childRef:n,sizeRef:p,children:s.cloneElement(e,{ref:R})})}const Y=({children:e,initial:o,isPresent:t,onExitComplete:r,custom:i,presenceAffectsLayout:n,mode:p,anchorX:x,root:R})=>{const c=b(Z),m=s.useId();let a=!0,f=s.useMemo(()=>(a=!1,{id:m,initial:o,isPresent:t,custom:i,onExitComplete:d=>{c.set(d,!0);for(const y of c.values())if(!y)return;r&&r()},register:d=>(c.set(d,!1),()=>c.delete(d))}),[t,c,r]);return n&&a&&(f={...f}),s.useMemo(()=>{c.forEach((d,y)=>c.set(y,!1))},[t]),s.useEffect(()=>{!t&&!c.size&&r&&r()},[t]),p==="popLayout"&&(e=M.jsx(Q,{isPresent:t,anchorX:x,root:R,children:e})),M.jsx(W.Provider,{value:f,children:e})};function Z(){return new Map}const j=e=>e.key||"";function v(e){const o=[];return s.Children.forEach(e,t=>{s.isValidElement(t)&&o.push(t)}),o}const le=({children:e,custom:o,initial:t=!0,onExitComplete:r,presenceAffectsLayout:i=!0,mode:n="sync",propagate:p=!1,anchorX:x="left",root:R})=>{const[c,m]=q(p),a=s.useMemo(()=>v(e),[e]),f=p&&!c?[]:a.map(j),d=s.useRef(!0),y=s.useRef(a),u=b(()=>new Map),[_,N]=s.useState(a),[C,P]=s.useState(a);B(()=>{d.current=!1,y.current=a;for(let h=0;h<C.length;h++){const l=j(C[h]);f.includes(l)?u.delete(l):u.get(l)!==!0&&u.set(l,!1)}},[C,f.length,f.join("-")]);const w=[];if(a!==_){let h=[...a];for(let l=0;l<C.length;l++){const g=C[l],$=j(g);f.includes($)||(h.splice(l,0,g),w.push(g))}return n==="wait"&&w.length&&(h=w),P(v(h)),N(a),null}const{forceRender:E}=s.useContext(D);return M.jsx(M.Fragment,{children:C.map(h=>{const l=j(h),g=p&&!c?!1:a===C||f.includes(l),$=()=>{if(u.has(l))u.set(l,!0);else return;let z=!0;u.forEach(S=>{S||(z=!1)}),z&&(E==null||E(),P(y.current),p&&(m==null||m()),r&&r())};return M.jsx(Y,{isPresent:g,initial:!d.current||t?void 0:!1,custom:o,presenceAffectsLayout:i,mode:n,root:R,onExitComplete:g?void 0:$,anchorX:x,children:h},l)})})};export{le as A,se as C,oe as M,ce as S,ae as X,re as a,ie as b,ne as c};
