"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[5791],{25791:(e,t,s)=>{s.r(t),s.d(t,{default:()=>h});var r=s(78983),n=s(40835),i=s(62591),a=s(16157),c=s(72791),l=s(81364),o=s(55294),d=s(80184);const h=function(){(0,c.useEffect)((()=>{!function(){let e=(0,l.Do)(l.vA);o.Z.get(l.ys+"admin/inActiveAgents",{headers:{Authorization:"Bearer ".concat(e),Content_Type:"application-json"}}).then((e=>{t(e.data.recordset),localStorage.setItem("recordset",JSON.stringify(e.data.recordset))})).catch((e=>{console.log(e)}))}()}),[]);const[e,t]=(0,c.useState)([]);return(0,d.jsx)(d.Fragment,{children:(0,d.jsx)(r.xH,{className:"mb-4",children:(0,d.jsxs)(r.sl,{children:[(0,d.jsxs)(r.bn,{children:[(0,d.jsxs)("strong",{children:[" ",(0,d.jsx)(n.ZP,{start:0,end:e.length})," InActive Agents"]}),(0,d.jsx)("br",{}),(0,d.jsx)("span",{children:"Search By Name :"}),(0,d.jsx)("input",{className:"form-control",type:"text",onKeyUp:e=>function(e){const s=JSON.parse(localStorage.getItem("recordset"));if(e){const r=s.filter((t=>t.FirstName.toLowerCase().includes(e.toLowerCase())));t(r)}else t(s)}(e.target.value)})]}),(0,d.jsx)("div",{style:{height:"335px"},className:"table-responsive",children:(0,d.jsxs)(i.Z,{responsive:!0,hover:!0,children:[(0,d.jsx)("thead",{style:{position:"sticky",top:0},children:(0,d.jsxs)("tr",{children:[(0,d.jsx)("th",{children:"Agent Name"}),(0,d.jsx)("th",{children:"Agent Email"}),(0,d.jsx)("th",{children:"Current Status"}),(0,d.jsx)("th",{children:"Change Status"})]})}),(0,d.jsx)("tbody",{children:(null===e||void 0===e?void 0:e.length)>0&&e.map(((e,t)=>(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{children:e.FirstName}),(0,d.jsx)("td",{children:e.UserName}),(0,d.jsx)("td",{children:(0,d.jsx)("span",{className:"badge bg-danger ms-auto",children:" InActive "})}),(0,d.jsx)("td",{children:(0,d.jsx)(a.Z,{variant:"info",size:"sm",style:{color:"white"},disabled:!0,children:"Approve"})})]},t)))})]})})]})})})}}}]);
//# sourceMappingURL=5791.8434b1f7.chunk.js.map