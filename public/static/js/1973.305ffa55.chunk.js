"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[1973],{1973:(e,t,s)=>{s.r(t),s.d(t,{default:()=>x});var n=s(72791),r=s(81364),i=s(55294),a=s(78983),c=s(40835),d=s(62591),l=s(16157),o=s(76977),h=s(80184);const x=function(){const[e,t]=(0,n.useState)([]),[s,x]=(0,n.useState)(!1);let[j,p]=(0,n.useState)(!0);return(0,n.useEffect)((()=>{!function(){let e=(0,r.Do)(r.vA);i.Z.get(r.ys+"admin/viewInsurances",{headers:{Authorization:"Bearer ".concat(e),Content_Type:"application-json"}}).then((e=>{console.log(e),t(e.data.recordset),localStorage.setItem("searchByEmail",JSON.stringify(e.data.recordset)),p(!1)})).catch((e=>{console.log(e),p(!1)}))}()}),[]),(0,h.jsx)(h.Fragment,{children:j?(0,h.jsx)("div",{children:(0,h.jsx)("span",{className:"spinner-border text-primary"})}):(0,h.jsx)(h.Fragment,{children:(0,h.jsx)(a.xH,{className:"mb-4",children:(0,h.jsxs)(a.sl,{children:[(0,h.jsxs)(a.bn,{children:[(0,h.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,h.jsxs)("div",{style:{flex:1},children:[(0,h.jsxs)("strong",{children:[(0,h.jsx)(c.ZP,{start:0,end:e.length})," Insurances"]}),(0,h.jsx)("br",{})]}),(0,h.jsx)("div",{style:{marginLeft:"10px"},children:(0,h.jsx)(a.u5,{style:{backgroundColor:"red",color:"white",border:"black",fontSize:"0.875rem",padding:"0.25rem 0.5rem"},type:"button",color:"success",onClick:()=>(0,r.pq)("adminStats"),children:"Export To Excel"})})]}),(0,h.jsx)("br",{}),(0,h.jsxs)("div",{className:"row",children:[(0,h.jsxs)("div",{className:"col-sm-5",children:[(0,h.jsx)("span",{children:"Start Booking Date"}),(0,h.jsx)("input",{id:"startBookingDate",className:"form-control",type:"date"})]}),(0,h.jsxs)("div",{className:"col-sm-5",children:[(0,h.jsx)("span",{children:"End Booking Date"}),(0,h.jsx)("input",{id:"endBookingDate",className:"form-control",type:"date"})]}),(0,h.jsxs)("div",{className:"col-sm-2 text-center",children:[(0,h.jsx)("br",{}),(0,h.jsx)(l.Z,{variant:"primary",onClick:function(){var e=document.getElementById("startBookingDate").value,s=document.getElementById("endBookingDate").value;const n=JSON.parse(localStorage.getItem("searchByEmail")).filter((t=>{const n=t.bookingDate.split("T")[0];return n>=e&&n<=s}));""==n?x(!0):(x(!1),t(n))},style:{fontSize:"18px",border:"none"},children:"Search"})]})]})]}),s?(0,h.jsxs)("div",{className:"text-center",style:{marginTop:"45px"},children:[(0,h.jsx)("img",{src:o,style:{backgroundRepeat:"no-repeat",backgroundSize:"100% 100%",backgroundPosition:"center",height:"100px",width:"100px"}}),(0,h.jsx)("h2",{style:{color:"red",marginTop:"20px"},children:"No Data Fond for these Dates !!!"})]}):(0,h.jsx)(h.Fragment,{children:(0,h.jsx)("div",{style:{height:"335px"},id:"adminStats",className:"table-responsive",children:(0,h.jsxs)(d.Z,{responsive:!0,hover:!0,children:[(0,h.jsx)("thead",{style:{position:"sticky",top:0},children:(0,h.jsxs)("tr",{children:[(0,h.jsx)("th",{children:"SNO"}),(0,h.jsx)("th",{children:"Insurance\xa0Vendor"}),(0,h.jsx)("th",{children:"Booking\xa0Date"}),(0,h.jsx)("th",{children:"Destination\xa0Country"}),(0,h.jsx)("th",{children:"Agent\xa0Email"}),(0,h.jsx)("th",{children:"Travel\xa0Start\xa0Date"}),(0,h.jsx)("th",{children:"Travel\xa0End\xa0Date"}),(0,h.jsx)("th",{children:"Passport\xa0Number"}),(0,h.jsx)("th",{children:"Pax Name"}),(0,h.jsx)("th",{children:"Date\xa0Of\xa0Birth"}),(0,h.jsx)("th",{children:"PNR/TKT NO"}),(0,h.jsx)("th",{children:"Ticket\xa0Fare"}),(0,h.jsx)("th",{children:"Ticket\xa0Tax"}),(0,h.jsx)("th",{children:"Insurance Plan Type"}),(0,h.jsx)("th",{children:"Rate"}),(0,h.jsx)("th",{children:"GST"}),(0,h.jsx)("th",{children:"Total"}),(0,h.jsx)("th",{children:"Net\xa0Price"}),(0,h.jsx)("th",{children:"Market\xa0Expense\xa0Parted"}),(0,h.jsx)("th",{children:"Marketing\xa0Expense\xa0Earned"})]})}),(0,h.jsx)("tbody",{children:(null===e||void 0===e?void 0:e.length)>0&&e.map(((e,t)=>(0,h.jsxs)("tr",{children:[(0,h.jsxs)("td",{children:[" ",t+1," "]}),(0,h.jsx)("td",{children:"Symbo"}),(0,h.jsx)("td",{children:e.bookingDate.split("T")[0]}),(0,h.jsx)("td",{children:e.travellingTo}),(0,h.jsx)("td",{children:e.agentEmail}),(0,h.jsx)("td",{children:e.journeyStartDate.split("T")[0]}),(0,h.jsx)("td",{children:e.journeyEndDate.split("T")[0]}),(0,h.jsx)("td",{children:e.passportNo}),(0,h.jsxs)("td",{children:[e.salutation," ",e.firstName," ",e.lastName]}),(0,h.jsx)("td",{className:"text-right",children:e.dob}),(0,h.jsx)("td",{children:e.ticketNo_Pnr}),(0,h.jsx)("td",{children:e.ticketPrice}),(0,h.jsx)("td",{children:e.ticketTax}),(0,h.jsx)("td",{children:e.planType}),(0,h.jsx)("td",{children:" -"}),(0,h.jsx)("td",{children:e.insuranceTax}),(0,h.jsx)("td",{children:e.amount}),(0,h.jsx)("td",{children:e.amount}),(0,h.jsx)("td",{children:" -"}),(0,h.jsx)("td",{children:" -"})]},t)))})]})})})]})})})})}},76977:(e,t,s)=>{e.exports=s.p+"static/media/no-data.75e9856fc1cd2b1cb243.png"}}]);
//# sourceMappingURL=1973.305ffa55.chunk.js.map