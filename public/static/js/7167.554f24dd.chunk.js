"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[7167],{97167:(e,r,s)=>{s.r(r),s.d(r,{default:()=>m});var a=s(78983),l=s(11087),n=s(72791),t=s(61134),i=s(75970),c=s(81364),d=s(55294),o=s(80184);const m=()=>{const[e,r]=(0,n.useState)(!1),[s,m]=(0,n.useState)(null),[u,h]=(0,n.useState)(null),[p,x]=(0,n.useState)(null);(0,n.useEffect)((()=>{(async function(){try{const e=(0,c.Do)(c.vA),r=await d.Z.get(c.ys+"admin/hotel-supplier",{headers:{Authorization:"Bearer ".concat(e)}});200===r.status&&(r.data.error?(0,c.Jc)(r.data.message):m(r.data.recordset))}catch(e){(0,c.Jc)(e.message)}})().then(),async function(){try{const e=(0,c.Do)(c.vA),r=await d.Z.get(c.ys+"admin/user-group",{headers:{Authorization:"Bearer ".concat(e)}});200===r.status&&(r.data.error?(0,c.Jc)(r.data.message):h(r.data.recordset))}catch(e){(0,c.Jc)(e.message)}}().then(),async function(){try{let e=(0,c.Do)(c.vA),s=c.ys+"admin/getCompanyName",a=await d.Z.get(s,{headers:{Authorization:"Bearer ".concat(e)}});if(200===a.status&&!a.data.error){let e=a.data.recordset.filter((e=>e.IsActive));x(e),setTimeout((()=>r(!0)),100)}}catch(e){(0,c.Jc)(e.message)}}().then()}),[]);const{register:j,handleSubmit:g,formState:{errors:v},reset:y}=(0,t.cI)();return(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)(a.xH,{children:[(0,o.jsx)(a.bn,{className:"card-header-bg",children:(0,o.jsxs)("div",{className:"row",children:[(0,o.jsx)("div",{className:"col-md-8",children:(0,o.jsx)("h4",{className:"mb-0 primary-color",children:"Create Hotel Markup"})}),(0,o.jsx)("div",{className:"col-md-4 text-md-end",children:(0,o.jsxs)(l.rU,{to:"/hotel-markups",className:"btn btn-outline-dark px-5",children:[(0,o.jsx)("i",{className:"fa-solid fa-arrow-left"})," Back"]})})]})}),(0,o.jsx)(a.sl,{children:e&&(0,o.jsx)("form",{onSubmit:g((async function(e){try{let r=(0,c.Do)(c.vA),s=c.ys+"admin/hotel-markup",a=await d.Z.post(s,e,{headers:{Authorization:"Bearer ".concat(r),"Content-Type":"application/json"}});200===a.status&&(a.data.error?(0,c.Jc)(a.data.message):(y(),(0,c.Qm)(a.data.message)))}catch(r){(0,c.Jc)(r.message)}})),children:(0,o.jsxs)("div",{className:"row",children:[(0,o.jsxs)("div",{className:"col-md-3 mb-3",children:[(0,o.jsx)("label",{htmlFor:"ServiceProvider",children:"Service Provider"}),(0,o.jsxs)("select",{name:"ServiceProvider",id:"ServiceProvider",className:"form-select",...j("ServiceProvider",{required:"This is required."}),children:[(0,o.jsx)("option",{value:"",children:"Select Service Provider"}),s&&s.length>0&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("option",{value:"All",children:"All"}),s.map((e=>(0,o.jsx)("option",{value:e.SupplierName,children:e.SupplierName},e.SupplierName)))]})]}),(0,o.jsx)(i.B,{errors:v,name:"ServiceProvider",render:e=>{let{message:r}=e;return(0,o.jsx)("p",{className:"text-danger",children:r})}})]}),(0,o.jsxs)("div",{className:"col-md-3 mb-3",children:[(0,o.jsx)("label",{htmlFor:"TripType",children:"Trip Type"}),(0,o.jsxs)("select",{name:"TripType",id:"TripType",className:"form-select",...j("TripType",{required:"This is required."}),children:[(0,o.jsx)("option",{value:"",children:"Select"}),(0,o.jsx)("option",{value:"All",children:"All"}),(0,o.jsx)("option",{value:"Domestic",children:"Domestic"}),(0,o.jsx)("option",{value:"International",children:"International"})]}),(0,o.jsx)(i.B,{errors:v,name:"TripType",render:e=>{let{message:r}=e;return(0,o.jsx)("p",{className:"text-danger",children:r})}})]}),(0,o.jsxs)("div",{className:"col-md-3 mb-3",children:[(0,o.jsx)("label",{htmlFor:"AgentType",children:"Agent Type"}),(0,o.jsxs)("select",{name:"AgentType",id:"AgentType",className:"form-select",...j("AgentType",{required:"This is required."}),children:[(0,o.jsx)("option",{value:"",children:"Select"}),u&&u.length>0&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("option",{value:"All",children:"All"}),u.map((e=>(0,o.jsx)("option",{value:e.name,children:e.name},e.name)))]})]}),(0,o.jsx)(i.B,{errors:v,name:"AgentType",render:e=>{let{message:r}=e;return(0,o.jsx)("p",{className:"text-danger",children:r})}})]}),(0,o.jsxs)("div",{className:"col-md-3 mb-3",children:[(0,o.jsx)("label",{htmlFor:"Agency",children:"Agency"}),(0,o.jsxs)("select",{name:"Agency",id:"Agency",className:"form-select",...j("Agency",{required:"This is required."}),children:[(0,o.jsx)("option",{value:"",children:"Select"}),p&&p.length>0&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("option",{value:"All",children:"All"}),p.map((e=>(0,o.jsx)("option",{value:e.CompanyId,children:e.CompanyName},e.CompanyId)))]})]}),(0,o.jsx)(i.B,{errors:v,name:"Agency",render:e=>{let{message:r}=e;return(0,o.jsx)("p",{className:"text-danger",children:r})}})]}),(0,o.jsxs)("div",{className:"col-md-3 mb-3",children:[(0,o.jsx)("label",{htmlFor:"StarRating",children:"Star Rating"}),(0,o.jsxs)("select",{name:"StarRating",id:"StarRating",className:"form-select",...j("StarRating",{required:"This is required."}),children:[(0,o.jsx)("option",{value:"",children:"Select"}),(0,o.jsx)("option",{value:"All",children:"All"}),(0,o.jsx)("option",{value:"0",children:"0"}),(0,o.jsx)("option",{value:"1",children:"1"}),(0,o.jsx)("option",{value:"2",children:"2"}),(0,o.jsx)("option",{value:"3",children:"3"}),(0,o.jsx)("option",{value:"4",children:"4"}),(0,o.jsx)("option",{value:"5",children:"5"})]}),(0,o.jsx)(i.B,{errors:v,name:"StarRating",render:e=>{let{message:r}=e;return(0,o.jsx)("p",{className:"text-danger",children:r})}})]}),(0,o.jsxs)("div",{className:"col-md-3 mb-3",children:[(0,o.jsx)("label",{htmlFor:"MarkupType",children:"Markup Type"}),(0,o.jsxs)("select",{name:"MarkupType",id:"MarkupType",className:"form-select",...j("MarkupType",{required:"This is required."}),children:[(0,o.jsx)("option",{value:"",children:"Select"}),(0,o.jsx)("option",{value:"F",children:"Fixed"}),(0,o.jsx)("option",{value:"P",children:"Percentage"})]}),(0,o.jsx)(i.B,{errors:v,name:"MarkupType",render:e=>{let{message:r}=e;return(0,o.jsx)("p",{className:"text-danger",children:r})}})]}),(0,o.jsxs)("div",{className:"col-md-3 mb-3",children:[(0,o.jsx)("label",{htmlFor:"MarkupAmount",children:"Markup Amount"}),(0,o.jsx)("input",{type:"text",className:"form-control",id:"MarkupAmount",name:"MarkupAmount",...j("MarkupAmount",{required:"This is required.",pattern:{value:/^[0-9]+$/,message:"Only numbers are allowed."}})}),(0,o.jsx)(i.B,{errors:v,name:"MarkupAmount",render:e=>{let{message:r}=e;return(0,o.jsx)("p",{className:"text-danger",children:r})}})]}),(0,o.jsxs)("div",{className:"col-md-3 mb-3",children:[(0,o.jsx)("label",{htmlFor:"AppliedOn",children:"Applied On"}),(0,o.jsxs)("select",{name:"AppliedOn",id:"AppliedOn",className:"form-select",...j("AppliedOn",{required:"This is required."}),children:[(0,o.jsx)("option",{value:"",children:"Select"}),(0,o.jsx)("option",{value:"Total",children:"Total"}),(0,o.jsx)("option",{value:"PerRoom/PerNight",children:"Per Room/Per Night"})]}),(0,o.jsx)(i.B,{errors:v,name:"AppliedOn",render:e=>{let{message:r}=e;return(0,o.jsx)("p",{className:"text-danger",children:r})}})]}),(0,o.jsx)("div",{className:"col-12",children:(0,o.jsx)("button",{className:"btn btn-primary px-5",children:"Create"})})]})})})]})})}},75970:(e,r,s)=>{s.d(r,{B:()=>n});var a=s(72791),l=s(61134),n=function(e){var r=e.as,s=e.errors,n=e.name,t=e.message,i=e.render,c=function(e,r){if(null==e)return{};var s,a,l={},n=Object.keys(e);for(a=0;a<n.length;a++)r.indexOf(s=n[a])>=0||(l[s]=e[s]);return l}(e,["as","errors","name","message","render"]),d=(0,l.Gc)(),o=(0,l.U2)(s||d.formState.errors,n);if(!o)return null;var m=o.message,u=o.types,h=Object.assign({},c,{children:m||t});return a.isValidElement(r)?a.cloneElement(r,h):i?i({message:m||t,messages:u}):a.createElement(r||a.Fragment,h)}}}]);
//# sourceMappingURL=7167.554f24dd.chunk.js.map