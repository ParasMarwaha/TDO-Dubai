"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[8342],{28342:(e,s,t)=>{t.r(s),t.d(s,{default:()=>x});var n=t(78983),a=t(16157),c=t(62591),l=t(72791),i=t(97477),o=t(81364),r=t(55294),d=(t(50065),t(76977)),h=t(61134),m=t(80184);const x=()=>{let[e,s]=(0,l.useState)(!0);const[t,x]=(0,l.useState)(!1),[u,p]=(0,l.useState)("All");let[g,j]=(0,l.useState)(0),{register:y,handleSubmit:A,reset:N,formState:{errors:b}}=(0,h.cI)();const k=e=>{p(e===u?"All":e)},[I,v]=(0,l.useState)({}),[S,f]=(0,l.useState)([]);function C(){let e=(0,o.Do)(o.vA);r.Z.get(o.ys+"admin/cancelRequests",{headers:{Authorization:"Bearer ".concat(e),Content_Type:"application-json"}}).then((e=>{console.log(e),f(e.data.recordset);const t=Object.values(e.data.recordset.reduce(((e,s)=>{const t=e.find((e=>e.bookingId===s.bookingId));return t?t.count++:e.push({bookingId:s.bookingId,count:1}),e}),[]));j(t.length),localStorage.setItem("cancelationQueue",JSON.stringify(e.data.recordset)),s(!1)})).catch((e=>{console.log(e),s(!1)}))}(0,l.useEffect)((()=>{C()}),[]);const[R,T]=(0,l.useState)(1),P=Math.ceil(g/6),w=[];let B=R-Math.floor(2.5);B=Math.max(1,B);let q=B+5-1;q=Math.min(P,q),q-B+1<5&&(B=Math.max(1,q-5+1));for(let n=B;n<=q;n++)w.push(n);return(0,m.jsx)(m.Fragment,{children:e?(0,m.jsx)("div",{children:(0,m.jsx)("span",{className:"spinner-border text-primary"})}):(0,m.jsx)(m.Fragment,{children:(0,m.jsx)(n.xH,{className:"mb-4",children:(0,m.jsxs)(n.sl,{children:[(0,m.jsxs)(n.bn,{style:{marginBottom:"23px"},children:[(0,m.jsx)("div",{className:"row",children:(0,m.jsx)("div",{className:"col-sm-12 text-center",children:(0,m.jsx)("h2",{children:(0,m.jsx)("b",{children:"All Cancelations"})})})}),(0,m.jsxs)("form",{onSubmit:A((function(e){var s=e.APIBookingID,t=e.TicketId,n=e.RequestOn,a=e.PersonName;const c=JSON.parse(localStorage.getItem("cancelationQueue")).filter((e=>e.aoiBookingId.includes(s)&&e.ticketId.includes(t)&&(e.firstName.toLowerCase().includes(a.toLowerCase())||e.lastName.toLowerCase().includes(a.toLowerCase()))&&e.requestOn.includes(n)));""==c?x(!0):(x(!1),f(c))})),children:[(0,m.jsxs)("div",{className:"row",style:{marginBottom:"0px"},children:[(0,m.jsxs)("div",{className:"col-sm-3",children:[(0,m.jsx)("span",{children:"API Booinkg ID"}),(0,m.jsx)("input",{...y("APIBookingID"),className:"form-control",type:"text",placeholder:"API Booinkg ID"})]}),(0,m.jsxs)("div",{className:"col-sm-3",children:[(0,m.jsx)("span",{children:"Ticket ID"}),(0,m.jsx)("input",{...y("TicketId"),className:"form-control",type:"text",placeholder:"Ticket ID"})]}),(0,m.jsxs)("div",{className:"col-sm-3",children:[(0,m.jsx)("span",{children:"Request On"}),(0,m.jsx)("input",{...y("RequestOn"),id:"fromdate",className:"form-control",type:"date"})]}),(0,m.jsxs)("div",{className:"col-sm-3",children:[(0,m.jsx)("span",{children:"PAX Name"}),(0,m.jsx)("input",{...y("PersonName"),id:"fromdate",className:"form-control",type:"text",placeholder:"PAX Name"})]})]}),(0,m.jsx)("div",{className:"row",style:{marginBottom:"10px"},children:(0,m.jsxs)("div",{className:"col-sm-2 offset-5",children:[(0,m.jsx)("span",{style:{visibility:"hidden"},children:"DEMO"}),(0,m.jsx)(a.Z,{variant:"primary",type:"submit",className:"w-100",children:"Search"})]})})]})]}),(0,m.jsxs)("div",{className:"row",style:{marginBottom:"10px"},children:[(0,m.jsx)("div",{className:"col-sm-3",children:(0,m.jsx)(a.Z,{variant:"Pending"===u?"primary":"secondary",className:"w-100",onClick:()=>k("Pending"),children:"Pending"})}),(0,m.jsx)("div",{className:"col-sm-3",children:(0,m.jsx)(a.Z,{variant:"In Progress"===u?"primary":"secondary",className:"w-100",onClick:()=>k("In Progress"),children:"In Progress"})}),(0,m.jsx)("div",{className:"col-sm-3",children:(0,m.jsx)(a.Z,{variant:"Success"===u?"primary":"secondary",className:"w-100",onClick:()=>k("Success"),children:"Success"})}),(0,m.jsx)("div",{className:"col-sm-3",children:(0,m.jsx)(a.Z,{variant:"All"===u?"primary":"secondary",className:"w-100",onClick:()=>k("All"),children:"All"})})]}),t?(0,m.jsxs)("div",{className:"text-center",style:{marginTop:"45px"},children:[(0,m.jsx)("img",{src:d,style:{backgroundRepeat:"no-repeat",backgroundSize:"100% 100%",backgroundPosition:"center",height:"100px",width:"100px"}}),(0,m.jsx)("h2",{style:{color:"red",marginTop:"20px"},children:"No Data Fond !!!"})]}):(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("div",{style:{height:"335px"},id:"adminStats",className:"table-responsive",children:(0,m.jsxs)(c.Z,{responsive:!0,hover:!0,children:[(0,m.jsx)("thead",{style:{position:"sticky",top:0},children:(0,m.jsxs)("tr",{children:[(0,m.jsx)("th",{children:"Booking\xa0ID"}),(0,m.jsx)("th",{children:"API\xa0ID"}),(0,m.jsx)("th",{className:"text-center",children:"Requested\xa0By"}),(0,m.jsx)("th",{className:"text-center",children:"Rquested\xa0On"}),(0,m.jsx)("th",{children:"Cancelation\xa0Status"}),(0,m.jsx)("th",{children:"Request Type"}),(0,m.jsx)("th",{style:{textAlign:"center"},children:"Action"})]})}),(0,m.jsx)("tbody",{children:(null===S||void 0===S?void 0:S.length)>0&&Object.values(S.reduce(((e,s)=>(e[s.bookingId]||(e[s.bookingId]=[]),e[s.bookingId].push(s),e)),{})).reverse().slice(6*(R-1),6*R).map(((e,s)=>("All"===u||"In Progress"===u&&("In Progress"===e[0].status||"REQUESTED"===e[0].status)||"Pending"===u&&"pending"===e[0].status||"Success"===u&&"cancelled"===e[0].status)&&(0,m.jsxs)(l.Fragment,{children:[(0,m.jsxs)("tr",{children:[(0,m.jsxs)("td",{className:"expandable name",style:{color:"blue",fontSize:"15px"},onClick:()=>{return s=e[0].bookingId,void v((e=>({...e,[s]:!e[s]})));var s},children:[(0,m.jsx)("img",{src:i,alt:"Icon"}),"\xa0",e[0].bookingId]}),(0,m.jsx)("td",{style:{fontSize:"15px"},className:"text-center",children:e[0].aoiBookingId}),(0,m.jsx)("td",{style:{fontSize:"15px"},children:e[0].requestedBy}),(0,m.jsx)("td",{style:{fontSize:"15px"},className:"text-center",children:e[0].requestOn.split("T")[0]}),(0,m.jsx)("td",{style:{fontSize:"15px"},className:"text-center",children:(0,m.jsx)("span",{className:"badge ms-auto ".concat("pending"===e[0].status?"bg-orange":"In Progress"===e[0].status?"bg-warning":"cancelled"===e[0].status?"bg-success":"REQUESTED"===e[0].status?"bg-warning":""),children:e[0].status})}),(0,m.jsx)("td",{style:{fontSize:"15px"},children:"1"===e[0].requestType?"Full Cancellation":"2"===e[0].requestType?"Partial Cancellation":""}),(0,m.jsx)("td",{style:{textAlign:"center"},children:"pending"===e[0].status?(0,m.jsx)(a.Z,{className:"btn btn-sm",variant:"danger",onClick:s=>function(e,s,t){let n=(0,o.Do)(o.vA);"1"===e?(console.log(e),r.Z.post(o.ys+"admin/setChangeFull",{apiBookingId:s,RequestType:e,remarks:"DEMO"},{headers:{Authorization:"Bearer ".concat(n),Content_Type:"application-json"}}).then((e=>{console.log(e),!1===e.data.error?((0,o.Qm)("Cancel Request Successfuly"),C()):(0,o.Jc)("Error While Canceling")})).catch((e=>{console.log(e)}))):"2"===e&&(console.log(e),JSON.stringify(t),r.Z.post(o.ys+"admin/setChangePartial",{apiBookingId:s,RequestType:e,remarks:"DEMO",ticketId:t},{headers:{Authorization:"Bearer ".concat(n),Content_Type:"application-json"}}).then((e=>{console.log(e),!1===e.data.error?((0,o.Qm)("Cancel Request Successfuly"),C()):(0,o.Jc)("Error While Canceling")})).catch((e=>{console.log(e)})))}(e[0].requestType,e[0].aoiBookingId,e.map((e=>e.ticketId))),style:{color:"white"},children:"Cancel"}):(0,m.jsx)(a.Z,{className:"btn btn-xs",variant:"primary",onClick:s=>function(e,s){let t=(0,o.Do)(o.vA);r.Z.post(o.ys+"admin/GetChangeRequestStatus",{changeRequestId:e,apiBookingId:s},{headers:{Authorization:"Bearer ".concat(t),Content_Type:"application-json"}}).then((e=>{console.log(e),console.log(e.data.error),!1===e.data.error?((0,o.Qm)("Status Updated Successfuly"),C()):(0,o.Jc)("Error While Updating Status")})).catch((e=>{console.log(e)}))}(e.map((e=>e.changeRequestId)),e[0].aoiBookingId),style:{color:"white"},children:(0,m.jsx)("b",{children:" Check Status"})})})]}),I[e[0].bookingId]&&e.map(((s,t)=>(0,m.jsx)("tr",{children:(0,m.jsx)("td",{colSpan:"7",style:{paddingLeft:"90px"},className:"gray-row",children:(0,m.jsxs)("div",{className:"row",children:[(0,m.jsxs)("div",{className:"col-sm-2",children:[(0,m.jsx)("b",{children:"Name :"})," ",s.firstName," ",s.lastName]}),(0,m.jsxs)("div",{className:"col-sm-2",children:[(0,m.jsx)("b",{children:"Paxtype:"})," ","1"===s.paxType?"Adult":"2"===s.paxType?"Child":"3"===s.paxType?"Infant":""]}),(0,m.jsxs)("div",{className:"col-sm-2",children:[(0,m.jsx)("b",{children:"Ticket Amt."})," ",s.totalTicketPrice]}),"pending"===e[0].status?(0,m.jsx)("div",{}):(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)("div",{className:"col-sm-2",children:[(0,m.jsx)("b",{children:"Request Status :"})," ",s.changeRequestStatus]}),(0,m.jsxs)("div",{className:"col-sm-2",children:[(0,m.jsx)("b",{children:"Request ID :"})," ",s.changeRequestId]}),(0,m.jsxs)("div",{className:"col-sm-2",children:[(0,m.jsx)("b",{children:"Ticket ID :"})," ",s.ticketId]})]})]})})},"expandedRow-".concat(s.bookingId,"-").concat(t))))]},s)))})]})}),(0,m.jsxs)("div",{className:"text-center",children:[(0,m.jsx)("button",{className:"btn btn-sm me-2",style:{fontSize:"18px",border:"none"},onClick:()=>{T((e=>Math.max(e-1,1)))},disabled:1===R,children:"\xab"}),w.map((e=>(0,m.jsx)("button",{className:"btn btn-sm ".concat(R===e?"btn-primary":"btn-light"),onClick:()=>(e=>{T(e)})(e),children:e},e))),(0,m.jsx)("button",{className:"btn btn-sm ms-2",style:{fontSize:"18px",border:"none"},onClick:()=>{T((e=>Math.min(e+1,P)))},disabled:R===P,children:"\xbb"})]})]})]})})})})}},50065:()=>{},76977:(e,s,t)=>{e.exports=t.p+"static/media/no-data.75e9856fc1cd2b1cb243.png"},97477:e=>{e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAAAHhSURBVDhPfVI9T1RBFD3n7mPRDbKGDwsLPgwNiIlWJFjSWWBCqYlWJJpoYWyMDb9BXcIPgER7EhITQwENNhYYKwkmxE8SxV1WRXZ3rvfOe4RdJJyXN/PumbnvnjNziSb0z+0MsCGTkNwkVK8AoaiQH4S+RiMshHyysnWn40u2HVmycrBUvqGUR0YMg8yl/CFUdd+mdVGd2bxXXHIuJg+Wft4Ec08t6vL4JNhPNhg49eH+mbeMUkNukeRoth7RmSeGe4g3XwNqISMzqIYXBd2bFvcYpR5BXyfweCxBoS0jWsCp3zg9Iebv+nEeTQkSiV8xboat5W24bcu8nHFR6qhJvdQrGDpLnEqAke40vmh8e1MJ836VA7PlOimRHjsvUapX9MRzBeLTrqKhwJ4ND5br2KpYYAga6uyf3d0WoteJNktKPTJWnBlPMP2yhopdktpTtTmkuV75s5i1tTREPNXyX39tYw2xoid6XDH+INFhvl8JAhayBmhBUI1S/TkK46oUeSYh4arF6yl9iI2d1KNL/Q/k/P6v7+/iPVwola8F8olJGYqLJ0F1jaK3Nu8W38eb9F71ljM5z4+z4DC+qsTcQaJzLR0wUvrW4Z3jDeD3CGoXwW0/HPfoUj8+7PuT7gb+AeKuyMIcTVT/AAAAAElFTkSuQmCC"}}]);
//# sourceMappingURL=8342.30962546.chunk.js.map