"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[6972],{66972:(e,s,a)=>{a.r(s),a.d(s,{default:()=>o});var l=a(72791),d=a(55294),i=a(78983),r=a(61134),n=a(81364),c=a(80184);const t=e=>{var s,a,t,o;let{agencyDetails:m,FetchAgency:h,FetchAgencyDetailsById:x}=e;const{register:u,handleSubmit:j,formState:{errors:v},reset:p}=(0,r.cI)(),[y,N]=(0,l.useState)(!1);return(0,c.jsxs)(i.xH,{className:"mb-4",children:[(0,c.jsx)(i.bn,{className:"card-header-bg",children:(0,c.jsx)("h4",{className:"mb-0 primary-color",children:"Wallet Details"})}),(0,c.jsx)(i.sl,{children:(0,c.jsx)("div",{className:"row justify-content-center py-3",children:(0,c.jsx)("div",{className:"col-md-8 border border-light rounded p-2 shadow",children:(0,c.jsx)("form",{onSubmit:j((async function(e){e.id=m.Id,e.CompanyId=m.CompanyId,e.CompanyName=m.CompanyName,e.UserName=m.UserName;try{N(!0);let s=(0,n.Do)(n.vA),a=n.ys+"admin/";"credit"===e.action?a+="creditFromAgentWallet":a+="debitFromAgentWallet";let l=await d.Z.post(a,e,{headers:{Authorization:"Bearer ".concat(s)}});200===l.status&&(l.data.error?(0,n.Jc)(l.data.message):(p(),h(),(0,n.Qm)(l.data.message),x(m.Id))),N(!1)}catch(s){(0,n.Jc)(s.message),N(!1)}})),children:(0,c.jsxs)("div",{className:"row",children:[(0,c.jsxs)("div",{className:"col-md-6 mb-3",children:[(0,c.jsxs)("label",{htmlFor:"type",children:["Type : ",(0,c.jsx)("span",{className:"text-danger",children:"*"})]}),(0,c.jsxs)("select",{...u("type",{required:"This field is required."}),name:"type",id:"type",className:"form-select",children:[(0,c.jsx)("option",{value:"",children:"--Please Select --"}),(0,c.jsx)("option",{value:"0",children:"Wallet"})]}),(null===v||void 0===v?void 0:v.type)&&(0,c.jsx)("p",{className:"text-danger",children:null===v||void 0===v||null===(s=v.type)||void 0===s?void 0:s.message})]}),(0,c.jsxs)("div",{className:"col-md-6 mb-3",children:[(0,c.jsxs)("label",{htmlFor:"action",children:["Action : ",(0,c.jsx)("span",{className:"text-danger",children:"*"})]}),(0,c.jsxs)("select",{...u("action",{required:"This field is required."}),name:"action",id:"action",className:"form-select",children:[(0,c.jsx)("option",{value:"",children:"--Please Select --"}),(0,c.jsx)("option",{value:"debit",children:"Debit"}),(0,c.jsx)("option",{value:"credit",children:"Credit"})]}),(null===v||void 0===v?void 0:v.action)&&(0,c.jsx)("p",{className:"text-danger",children:null===v||void 0===v||null===(a=v.action)||void 0===a?void 0:a.message})]}),(0,c.jsxs)("div",{className:"col-md-12 mb-3",children:[(0,c.jsxs)("label",{htmlFor:"amount",children:["Amount : ",(0,c.jsx)("span",{className:"text-danger",children:"*"})]}),(0,c.jsx)("input",{type:"text",name:"amount",id:"amount",className:"form-control",autoComplete:"off",...u("amount",{required:"This field is required.",pattern:{value:/^[0-9]*$/,message:"Only numbers are allowed."}})}),(null===v||void 0===v?void 0:v.amount)&&(0,c.jsx)("p",{className:"text-danger",children:null===v||void 0===v||null===(t=v.amount)||void 0===t?void 0:t.message})]}),(0,c.jsxs)("div",{className:"col-md-12 mb-3",children:[(0,c.jsxs)("label",{htmlFor:"remarks",children:["Remarks : ",(0,c.jsx)("span",{className:"text-danger",children:"*"})]}),(0,c.jsx)("textarea",{name:"remarks",id:"remarks",className:"form-control",...u("remarks",{required:"This field is required."})}),(null===v||void 0===v?void 0:v.remarks)&&(0,c.jsx)("p",{className:"text-danger",children:null===v||void 0===v||null===(o=v.remarks)||void 0===o?void 0:o.message})]}),(0,c.jsx)("div",{className:"col-md-12",children:(0,c.jsx)("button",{disabled:y,className:"btn btn-primary",children:"Update"})})]})})})})})]})},o=()=>{const[e,s]=(0,l.useState)(null),[a,r]=(0,l.useState)(null);async function o(){try{let e=(0,n.Do)(n.vA),a=n.ys+"admin/getActiveCompanyName",l=await d.Z.get(a,{headers:{Authorization:"Bearer ".concat(e)}});200!==l.status||l.data.error||s(l.data.recordset)}catch(e){(0,n.Jc)(e.message)}}return(0,l.useEffect)((()=>{o().then()}),[]),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(i.xH,{className:"mb-4",children:[(0,c.jsx)(i.bn,{className:"card-header-bg",children:(0,c.jsx)("h4",{className:"mb-0 primary-color",children:"Search"})}),(0,c.jsx)(i.sl,{children:e&&e.length>0&&(0,c.jsx)("div",{className:"row justify-content-center py-3",children:(0,c.jsxs)("div",{className:"col-md-6 border border-light rounded p-2 shadow",children:[(0,c.jsx)("label",{htmlFor:"agencyName",children:(0,c.jsxs)("b",{children:["Agency Name : ",(0,c.jsx)("span",{className:"text-danger",children:"*"})]})}),(0,c.jsxs)("select",{onChange:function(s){if(!s.target.value)return(0,n.Jc)("Please Select Agency"),r(null),!1;let a=s.target.value,l=e.filter((e=>e.Id===a))[0];r(l)},name:"agencyName",id:"agencyName",className:"form-select",children:[(0,c.jsx)("option",{value:"",children:"--Please Select --"}),null===e||void 0===e?void 0:e.map((e=>(0,c.jsxs)("option",{value:null===e||void 0===e?void 0:e.Id,children:[null===e||void 0===e?void 0:e.CompanyName," (",null===e||void 0===e?void 0:e.CompanyId,")"]},null===e||void 0===e?void 0:e.Id)))]})]})})})]}),a&&a.Id&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(i.xH,{className:"mb-4",children:[(0,c.jsx)(i.bn,{className:"card-header-bg",children:(0,c.jsx)("h4",{className:"mb-0 primary-color",children:"Agency Details"})}),(0,c.jsx)(i.sl,{children:(0,c.jsxs)("div",{className:"row",children:[(0,c.jsx)("div",{className:"col-md-4",children:(0,c.jsxs)("p",{children:["Agency Name :",(0,c.jsx)("br",{}),(0,c.jsx)("b",{children:null===a||void 0===a?void 0:a.CompanyName})]})}),(0,c.jsx)("div",{className:"col-md-4",children:(0,c.jsxs)("p",{children:["Agency Id :",(0,c.jsx)("br",{}),(0,c.jsx)("b",{children:null===a||void 0===a?void 0:a.CompanyId})]})}),(0,c.jsx)("div",{className:"col-md-4",children:(0,c.jsxs)("p",{children:["Payment Type :",(0,c.jsx)("br",{}),(0,c.jsx)("b",{children:"BOTH"===(null===a||void 0===a?void 0:a.PaymentType)?"BOTH (Cash and Credit)":null===a||void 0===a?void 0:a.PaymentType})]})}),(0,c.jsx)("div",{className:"col-md-4",children:(0,c.jsxs)("p",{className:"mb-md-0",children:["Total Balance :",(0,c.jsx)("br",{}),(0,c.jsx)("b",{children:null===a||void 0===a?void 0:a.TotalBalance})]})}),(0,c.jsx)("div",{className:"col-md-4",children:(0,c.jsxs)("p",{className:"mb-md-0",children:["Credit Limit :",(0,c.jsx)("br",{}),(0,c.jsx)("b",{children:null===a||void 0===a?void 0:a.TotalCreditLimit})]})}),(0,c.jsx)("div",{className:"col-md-4",children:(0,c.jsxs)("p",{className:"mb-0",children:["Due Amount :",(0,c.jsx)("br",{}),(0,c.jsx)("b",{children:null===a||void 0===a?void 0:a.DueAmount})]})})]})})]}),(0,c.jsx)(t,{agencyDetails:a,FetchAgency:o,FetchAgencyDetailsById:async function(e){let s=(0,n.Do)(n.vA),a=n.ys+"admin/getCompanyDetailById",l=await d.Z.post(a,{id:e},{headers:{Authorization:"Bearer ".concat(s)}});200!==l.status||l.data.error||r(l.data.recordset[0])}})]})]})}}}]);
//# sourceMappingURL=6972.f6dc203e.chunk.js.map