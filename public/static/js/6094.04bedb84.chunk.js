"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[6094],{26094:(e,t,a)=>{a.r(t),a.d(t,{default:()=>d});var r=a(55294),s=a(57689),n=a(72791),i=(a(43513),a(78983)),l=a(81364),o=a(83934),c=a(80184);const d=()=>{const[e,t]=(0,n.useState)(null);(0,n.useEffect)((()=>{(async function(){try{let e=(0,l.Do)(l.vA),a=l.ys+"admin/getCompanyName",s=await r.Z.get(a,{headers:{Authorization:"Bearer ".concat(e)}});if(200===s.status&&!s.data.error){let e=s.data.recordset.filter((e=>e.IsActive));t(e)}}catch(e){(0,l.Jc)(e.message)}})().then()}),[]);const a=(0,s.s0)();return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(i.xH,{children:[(0,c.jsx)(i.bn,{className:"card-header-bg",children:(0,c.jsx)("h4",{className:"mb-0 primary-color",children:"Active Partners"})}),(0,c.jsx)(i.sl,{children:e?e.length>0&&(0,c.jsx)(o.Z,{data:e,click:e=>{a("/agent-details",{state:e})}}):(0,c.jsx)("div",{className:"text-center",children:(0,c.jsx)("i",{className:"spinner spinner-border"})})})]})})}},37831:(e,t,a)=>{a.d(t,{Z:()=>d});var r,s,n=a(30168),i=(a(72791),a(49256)),l=a(80184);const o=i.default.input.attrs((e=>({type:"text",size:e.small?5:void 0})))(r||(r=(0,n.Z)(["\n  height: 32px;\n  width: 200px;\n  border-radius: 3px;\n  border-top-left-radius: 5px;\n  border-bottom-left-radius: 5px;\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n  border: 1px solid #e5e5e5;\n  padding: 0 32px 0 16px;\n"]))),c=i.default.button(s||(s=(0,n.Z)(["\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n  border-top-right-radius: 5px;\n  border-bottom-right-radius: 5px;\n  height: 34px;\n  width: 32px;\n  text-align: center;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"]))),d=e=>{let{filterText:t,onFilter:a,onClear:r}=e;return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(o,{id:"search",type:"text",placeholder:"Filter table data...",value:t,onChange:a}),(0,l.jsx)(c,{className:"bg-dark text-white",onClick:r,children:"X"})]})}},83934:(e,t,a)=>{a.d(t,{Z:()=>o});var r=a(72791),s=a(43513),n=a(37831),i=a(81364),l=a(80184);const o=e=>{const t=[{name:"",button:!0,cell:t=>(0,l.jsx)(l.Fragment,{children:(0,l.jsx)("button",{onClick:()=>e.click(t.UserId),className:"btn btn-link",children:(0,l.jsx)("i",{className:"fa fa-eye"})})}),width:"50px"},{name:"Name",selector:e=>e.FirstName+" "+e.LastName,sortable:!0,width:"180px"},{name:"Company Id",selector:e=>e.CompanyId,sortable:!0,width:"140px"},{name:"Agency Name",selector:e=>e.CompanyName,sortable:!0,width:"280px"},{name:"Status",selector:e=>e.IsActive?(0,l.jsx)("span",{className:"text-success",children:"Active"}):(0,l.jsx)("span",{className:"text-danger",children:"InActive"}),sortable:!0},{name:"Group Type",selector:e=>e.GroupType,sortable:!0,width:"130px"},{name:"Mobile",selector:e=>e.PhoneNumber,sortable:!0,width:"120px"},{name:"Total Balance",selector:e=>e.TotalBalance,sortable:!0,width:"140px"},{name:"Credit Limit",selector:e=>e.TotalCreditLimit,sortable:!0,width:"140px"},{name:"Due Amount",selector:e=>e.DueAmount,sortable:!0,width:"140px"}],[a,o]=r.useState(""),[c,d]=r.useState(!1),m=e.data.filter((e=>-1!==JSON.stringify(e).toLowerCase().indexOf(a.toLowerCase()))),x=(0,r.useMemo)((()=>(0,l.jsx)(l.Fragment,{children:(0,l.jsx)(n.Z,{onFilter:e=>o(e.target.value),onClear:()=>{a&&(d(!c),o(""))},filterText:a})})),[a,c]);return(0,l.jsx)(l.Fragment,{children:(0,l.jsx)(s.ZP,{columns:t,data:m,striped:!0,pagination:!0,subHeader:!0,subHeaderComponent:x,customStyles:i.X2})})}}}]);
//# sourceMappingURL=6094.04bedb84.chunk.js.map