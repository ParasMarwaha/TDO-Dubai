"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[6972],{66972:(e,s,a)=>{a.r(s),a.d(s,{default:()=>m});var l=a(55294),r=a(63334),d=a(72791),n=a(78983),i=a(61134),c=a(81364),t=a(80184);const o=e=>{var s,a,r,o;let{agencyDetails:m,FetchAgency:h,FetchAgencyDetailsById:x}=e;const{register:u,handleSubmit:j,formState:{errors:v},reset:p}=(0,i.cI)(),[y,b]=(0,d.useState)(!1);return(0,t.jsxs)(n.xH,{className:"mb-4",children:[(0,t.jsx)(n.bn,{className:"card-header-bg",children:(0,t.jsx)("h4",{className:"mb-0 primary-color",children:"Wallet Details"})}),(0,t.jsx)(n.sl,{children:(0,t.jsx)("div",{className:"row justify-content-center py-3",children:(0,t.jsx)("div",{className:"col-md-8 border border-light rounded p-2 shadow",children:(0,t.jsx)("form",{onSubmit:j((async function(e){e.id=m.Id,e.CompanyId=m.CompanyId,e.CompanyName=m.CompanyName,e.UserName=m.UserName;try{b(!0);let s=(0,c.Do)(c.vA),a=c.ys+"admin/";"credit"===e.action?a+="creditFromAgentWallet":a+="debitFromAgentWallet";let r=await l.Z.post(a,e,{headers:{Authorization:"Bearer ".concat(s)}});200===r.status&&(r.data.error?(0,c.Jc)(r.data.message):(p(),h(),(0,c.Qm)(r.data.message),x(m.Id))),b(!1)}catch(s){(0,c.Jc)(s.message),b(!1)}})),children:(0,t.jsxs)("div",{className:"row",children:[(0,t.jsxs)("div",{className:"col-md-6 mb-3",children:[(0,t.jsxs)("label",{htmlFor:"type",children:["Type : ",(0,t.jsx)("span",{className:"text-danger",children:"*"})]}),(0,t.jsxs)("select",{...u("type",{required:"This field is required."}),name:"type",id:"type",className:"form-select",children:[(0,t.jsx)("option",{value:"",children:"--Please Select --"}),(0,t.jsx)("option",{value:"0",children:"Wallet"})]}),(null===v||void 0===v?void 0:v.type)&&(0,t.jsx)("p",{className:"text-danger",children:null===v||void 0===v||null===(s=v.type)||void 0===s?void 0:s.message})]}),(0,t.jsxs)("div",{className:"col-md-6 mb-3",children:[(0,t.jsxs)("label",{htmlFor:"action",children:["Action : ",(0,t.jsx)("span",{className:"text-danger",children:"*"})]}),(0,t.jsxs)("select",{...u("action",{required:"This field is required."}),name:"action",id:"action",className:"form-select",children:[(0,t.jsx)("option",{value:"",children:"--Please Select --"}),(0,t.jsx)("option",{value:"debit",children:"Debit"}),(0,t.jsx)("option",{value:"credit",children:"Credit"})]}),(null===v||void 0===v?void 0:v.action)&&(0,t.jsx)("p",{className:"text-danger",children:null===v||void 0===v||null===(a=v.action)||void 0===a?void 0:a.message})]}),(0,t.jsxs)("div",{className:"col-md-12 mb-3",children:[(0,t.jsxs)("label",{htmlFor:"amount",children:["Amount : ",(0,t.jsx)("span",{className:"text-danger",children:"*"})]}),(0,t.jsx)("input",{type:"text",name:"amount",id:"amount",className:"form-control",autoComplete:"off",...u("amount",{required:"This field is required.",pattern:{value:/^[0-9]*$/,message:"Only numbers are allowed."}})}),(null===v||void 0===v?void 0:v.amount)&&(0,t.jsx)("p",{className:"text-danger",children:null===v||void 0===v||null===(r=v.amount)||void 0===r?void 0:r.message})]}),(0,t.jsxs)("div",{className:"col-md-12 mb-3",children:[(0,t.jsxs)("label",{htmlFor:"remarks",children:["Remarks : ",(0,t.jsx)("span",{className:"text-danger",children:"*"})]}),(0,t.jsx)("textarea",{name:"remarks",id:"remarks",className:"form-control",...u("remarks",{required:"This field is required."})}),(null===v||void 0===v?void 0:v.remarks)&&(0,t.jsx)("p",{className:"text-danger",children:null===v||void 0===v||null===(o=v.remarks)||void 0===o?void 0:o.message})]}),(0,t.jsx)("div",{className:"col-md-12",children:(0,t.jsx)("button",{disabled:y,className:"btn btn-primary",children:"Update"})})]})})})})})]})},m=()=>{const[e,s]=(0,d.useState)(null),[a,i]=(0,d.useState)(null),[m,h]=(0,d.useState)(null);async function x(){try{let e=(0,c.Do)(c.vA),a=c.ys+"admin/getActiveCompanyName",r=await l.Z.get(a,{headers:{Authorization:"Bearer ".concat(e)}});if(200===r.status&&!r.data.error){s(r.data.recordset);const e=r.data.recordset.map((e=>({value:e.CompanyId,label:e.CompanyName})));i(e)}}catch(e){(0,c.Jc)(e.message)}}(0,d.useEffect)((()=>{x().then()}),[]);const[u,j]=(0,d.useState)(null);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(n.xH,{className:"mb-4",children:[(0,t.jsx)(n.bn,{className:"card-header-bg",children:(0,t.jsx)("h4",{className:"mb-0 primary-color",children:"Search"})}),(0,t.jsx)(n.sl,{children:e&&e.length>0&&(0,t.jsx)("div",{className:"row justify-content-center py-3",children:(0,t.jsxs)("div",{className:"col-md-6 border border-light rounded p-2 shadow",children:[(0,t.jsx)("label",{htmlFor:"agencyName",children:(0,t.jsxs)("b",{children:["Agency Name ",(0,t.jsx)("span",{className:"text-danger",children:"*"})]})}),(0,t.jsx)(r.ZP,{value:u,onChange:s=>{!function(s){if(!s)return(0,c.Jc)("Please Select Agency"),h(null),!1;const a=e.filter((e=>e.CompanyId===s))[0];h(a)}(s.value)},options:a,isClearable:!0,placeholder:"Select a flavor"})]})})})]}),m&&m.Id&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(n.xH,{className:"mb-4",children:[(0,t.jsx)(n.bn,{className:"card-header-bg",children:(0,t.jsx)("h4",{className:"mb-0 primary-color",children:"Agency Details"})}),(0,t.jsx)(n.sl,{children:(0,t.jsxs)("div",{className:"row",children:[(0,t.jsx)("div",{className:"col-md-4",children:(0,t.jsxs)("p",{children:["Agency Name :",(0,t.jsx)("br",{}),(0,t.jsx)("b",{children:null===m||void 0===m?void 0:m.CompanyName})]})}),(0,t.jsx)("div",{className:"col-md-4",children:(0,t.jsxs)("p",{children:["Agency Id :",(0,t.jsx)("br",{}),(0,t.jsx)("b",{children:null===m||void 0===m?void 0:m.CompanyId})]})}),(0,t.jsx)("div",{className:"col-md-4",children:(0,t.jsxs)("p",{children:["Payment Type :",(0,t.jsx)("br",{}),(0,t.jsx)("b",{children:"BOTH"===(null===m||void 0===m?void 0:m.PaymentType)?"BOTH (Cash and Credit)":null===m||void 0===m?void 0:m.PaymentType})]})}),(0,t.jsx)("div",{className:"col-md-4",children:(0,t.jsxs)("p",{className:"mb-md-0",children:["Total Balance :",(0,t.jsx)("br",{}),(0,t.jsx)("b",{children:null===m||void 0===m?void 0:m.TotalBalance})]})}),(0,t.jsx)("div",{className:"col-md-4",children:(0,t.jsxs)("p",{className:"mb-md-0",children:["Credit Limit :",(0,t.jsx)("br",{}),(0,t.jsx)("b",{children:null===m||void 0===m?void 0:m.TotalCreditLimit})]})}),(0,t.jsx)("div",{className:"col-md-4",children:(0,t.jsxs)("p",{className:"mb-0",children:["Due Amount :",(0,t.jsx)("br",{}),(0,t.jsx)("b",{children:null===m||void 0===m?void 0:m.DueAmount})]})})]})})]}),(0,t.jsx)(o,{agencyDetails:m,FetchAgency:x,FetchAgencyDetailsById:async function(e){let s=(0,c.Do)(c.vA),a=c.ys+"admin/getCompanyDetailById",r=await l.Z.post(a,{id:e},{headers:{Authorization:"Bearer ".concat(s)}});200!==r.status||r.data.error||h(r.data.recordset[0])}})]})]})}}}]);
//# sourceMappingURL=6972.06cd9bd0.chunk.js.map