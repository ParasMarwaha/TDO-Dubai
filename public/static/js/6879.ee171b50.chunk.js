"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[6879],{96879:(e,s,n)=>{n.r(s),n.d(s,{default:()=>j});var i=n(72791),t=n(16157),l=n(51910),a=n(78983),c=n(55294),r=n(61134),d=n(81364),o=n(80184);const m=e=>{var s,n,i,l;let{handleClose:a}=e;const{register:m,handleSubmit:h,formState:{errors:x}}=(0,r.cI)();return(0,o.jsxs)("form",{onSubmit:h((async function(e){try{const s=(0,d.Do)(d.vA),n=await c.Z.post(d.ys+"admin/airlines",e,{headers:{Authorization:"Bearer ".concat(s),"Content-Type":"application/json"}});console.log(n)}catch(s){console.log(s),(0,d.Jc)(s.message)}})),children:[(0,o.jsxs)("div",{className:"mb-3",children:[(0,o.jsxs)("label",{htmlFor:"name",children:["Name ",(0,o.jsx)("span",{className:"text-danger",children:"*"})]}),(0,o.jsx)("input",{type:"text",id:"name",name:"name",className:"form-control",...m("name",{required:"This is a required field.",validate:e=>!/<|>/.test(e)||'Name cannot contain "<" or ">"'})}),(null===x||void 0===x?void 0:x.name)&&(0,o.jsx)("p",{className:"text-danger",children:null===x||void 0===x||null===(s=x.name)||void 0===s?void 0:s.message})]}),(0,o.jsxs)("div",{className:"mb-3",children:[(0,o.jsxs)("label",{htmlFor:"code",children:["Code ",(0,o.jsx)("span",{className:"text-danger",children:"*"})]}),(0,o.jsx)("input",{type:"text",id:"code",name:"code",className:"form-control",...m("code",{required:"This is a required field.",validate:e=>!/<|>/.test(e)||'Code cannot contain "<" or ">"'})}),(null===x||void 0===x?void 0:x.code)&&(0,o.jsx)("p",{className:"text-danger",children:null===x||void 0===x||null===(n=x.code)||void 0===n?void 0:n.message})]}),(0,o.jsxs)("div",{className:"mb-3",children:[(0,o.jsxs)("label",{htmlFor:"name",children:["File ",(0,o.jsx)("span",{className:"text-danger",children:"*"})]}),(0,o.jsx)("input",{type:"file",accept:".jpg, .jpeg, .png",...m("file",{required:"This is a required field."}),id:"file",name:"file",className:"form-control"}),(null===x||void 0===x?void 0:x.file)&&(0,o.jsx)("p",{className:"text-danger",children:null===x||void 0===x||null===(i=x.file)||void 0===i?void 0:i.message})]}),(0,o.jsxs)("div",{className:"mb-3",children:[(0,o.jsxs)("label",{htmlFor:"type",children:["Type ",(0,o.jsx)("span",{className:"text-danger",children:"*"})]}),(0,o.jsxs)("select",{name:"type",id:"type",className:"form-select",...m("type",{required:"This is a required field.",validate:e=>!/<|>/.test(e)||'Code cannot contain "<" or ">"'}),children:[(0,o.jsx)("option",{value:"",children:"--Select Type--"}),(0,o.jsx)("option",{value:"DOM",children:"Domestic"}),(0,o.jsx)("option",{value:"INT",children:"International"})]}),(null===x||void 0===x?void 0:x.type)&&(0,o.jsx)("p",{className:"text-danger",children:null===x||void 0===x||null===(l=x.type)||void 0===l?void 0:l.message})]}),(0,o.jsxs)("div",{className:"mb d-flex justify-content-between align-items-center",children:[(0,o.jsx)(t.Z,{variant:"primary",type:"submit",className:"px-5",children:"Create"}),(0,o.jsx)(t.Z,{variant:"secondary",onClick:a,className:"px-5",children:"Close"})]})]})};var h=n(62591);const x=()=>{const[e,s]=(0,i.useState)(null);function n(e){const s=new Date(e),n=s.getUTCDate(),i=s.toLocaleString("en-GB",{month:"short"}),t=s.getUTCFullYear(),l=String(s.getUTCHours()).padStart(2,"0"),a=String(s.getUTCMinutes()).padStart(2,"0");return"".concat(n," ").concat(i," ").concat(t," ").concat(l,":").concat(a)}(0,i.useEffect)((()=>{(async function(){try{const e=(0,d.Do)(d.vA),n="".concat(d.ys,"admin/airlines-new"),i=await c.Z.get(n,{headers:{Authorization:"Bearer ".concat(e)}});if(200===i.status){const{error:e,message:n,recordset:t}=i.data;e?(0,d.Jc)(n):s(i.data.recordset)}}catch(e){console.log(e),(0,d.Jc)(e.message)}})().then()}),[]);const[a,r]=(0,i.useState)(!1),m=()=>r(!1),[x,j]=(0,i.useState)(null);function u(e){j(e),r(!0)}return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("div",{style:{height:"330px"},className:"table-responsive",children:(0,o.jsxs)(h.Z,{responsive:!0,hover:!0,children:[(0,o.jsx)("thead",{style:{position:"sticky",top:0},children:(0,o.jsx)("tr",{children:["Name","Code","Type","ActionBy","ActionOn","Edit Account Code","Edit","Delete","Details"].map(((e,s)=>(0,o.jsx)("th",{children:e},s)))})}),(0,o.jsx)("tbody",{children:e?e.length>0&&e.map((e=>(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{children:e.Name}),(0,o.jsx)("td",{children:e.Code}),(0,o.jsx)("td",{children:e.Type}),(0,o.jsx)("td",{children:e.ActionBy}),(0,o.jsx)("td",{children:n(e.ActionOn)}),(0,o.jsx)("td",{children:(0,o.jsx)("button",{className:"btn btn-sm btn-primary btn-link",children:"Edit Account Code"})}),(0,o.jsx)("td",{children:(0,o.jsx)("button",{className:"btn btn-sm btn-primary btn-link",children:"Edit"})}),(0,o.jsx)("td",{children:(0,o.jsx)("button",{className:"btn btn-sm btn-primary btn-link",children:"Delete"})}),(0,o.jsx)("td",{children:(0,o.jsx)("button",{onClick:()=>u(e),className:"btn btn-sm btn-primary btn-link",children:"Details"})})]},e.AirlineIndex))):(0,o.jsx)("tr",{children:(0,o.jsx)("td",{colSpan:9,className:"text-center",children:(0,o.jsx)("i",{className:"spinner spinner-border"})})})})]})}),(0,o.jsxs)(l.Z,{show:a,onHide:m,centered:!0,size:"lg",children:[(0,o.jsx)(l.Z.Header,{closeButton:!0,children:(0,o.jsx)(l.Z.Title,{children:"Details Airline"})}),(0,o.jsxs)(l.Z.Body,{children:[(0,o.jsxs)("div",{className:"row",children:[(0,o.jsx)("div",{className:"col-md-4 mb-3",children:(0,o.jsxs)("p",{children:[(0,o.jsx)("b",{children:"Name"}),":",(0,o.jsx)("br",{}),null===x||void 0===x?void 0:x.Name]})}),(0,o.jsx)("div",{className:"col-md-4 mb-3",children:(0,o.jsxs)("p",{children:[(0,o.jsx)("b",{children:"Code"}),":",(0,o.jsx)("br",{}),null===x||void 0===x?void 0:x.Code]})}),(0,o.jsx)("div",{className:"col-md-4 mb-3",children:(0,o.jsxs)("p",{children:[(0,o.jsx)("b",{children:"Account Code"}),":"]})}),(0,o.jsx)("div",{className:"col-md-4 mb-3",children:(0,o.jsxs)("p",{children:[(0,o.jsx)("b",{children:"Type"}),":",(0,o.jsx)("br",{}),null===x||void 0===x?void 0:x.Type]})}),(0,o.jsx)("div",{className:"col-md-4 mb-3",children:(0,o.jsxs)("p",{children:[(0,o.jsx)("b",{children:"ActionBy"}),":",(0,o.jsx)("br",{}),null===x||void 0===x?void 0:x.ActionBy]})}),(0,o.jsx)("div",{className:"col-md-4 mb-3",children:(0,o.jsxs)("p",{children:[(0,o.jsx)("b",{children:"ActionOn"}),":",(0,o.jsx)("br",{}),n(null===x||void 0===x?void 0:x.ActionOn)]})})]}),(0,o.jsx)("div",{className:"text-end",children:(0,o.jsx)(t.Z,{variant:"secondary",onClick:m,className:"px-5",children:"Close"})})]})]})]})},j=()=>{const[e,s]=(0,i.useState)(!1),n=()=>s(!1);return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(a.bn,{children:(0,o.jsx)("strong",{children:"Manage Airlines"})}),(0,o.jsx)(t.Z,{variant:"primary",onClick:()=>s(!0),className:"mt-3 mb-4",children:"Create New Airline"}),(0,o.jsx)(x,{}),(0,o.jsxs)(l.Z,{show:e,onHide:n,centered:!0,children:[(0,o.jsx)(l.Z.Header,{closeButton:!0,children:(0,o.jsx)(l.Z.Title,{children:"Create New Airline"})}),(0,o.jsx)(l.Z.Body,{children:(0,o.jsx)(m,{handleClose:n})})]})]})}}}]);
//# sourceMappingURL=6879.ee171b50.chunk.js.map