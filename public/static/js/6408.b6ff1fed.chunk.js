"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[6408],{56408:(e,s,a)=>{a.r(s),a.d(s,{default:()=>d});var r=a(78983),t=a(16157),l=a(72791),n=(a(97477),a(61134)),o=a(81364),c=a(55294),i=a(80184);const d=()=>{let{register:e,handleSubmit:s,reset:a,formState:{errors:d}}=(0,n.cI)();const[h,m]=(0,l.useState)(""),[A,u]=(0,l.useState)(""),[p,x]=(0,l.useState)("");return(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(r.xH,{className:"mb-4",children:(0,i.jsx)(r.sl,{children:(0,i.jsxs)(r.bn,{children:[(0,i.jsx)("div",{className:"row",children:(0,i.jsx)("div",{className:"col-sm-12 text-center",children:(0,i.jsx)("h2",{children:(0,i.jsx)("b",{children:"Platform Fees"})})})}),(0,i.jsx)("br",{}),(0,i.jsxs)("form",{onSubmit:e=>{if(e.preventDefault(),""===h)(0,o.Jc)("Please select product");else if(""===A)(0,o.Jc)("Please enter platform fee");else if(""===p)(0,o.Jc)("Please enter tax fee");else{console.log(h,A,p);let e={product:h,platformFee:A,tax:p};console.log(e);let s=(0,o.Do)(o.vA);c.Z.put(o.ys+"admin/platformFee",e,{headers:{Authorization:"Bearer ".concat(s),Content_Type:"application-json"}}).then((e=>{!1===e.data.error?(0,o.Qm)("Data Updated Successfuly"):(0,o.Jc)("Error while Adding")})).catch((e=>{console.log(e)}))}},children:[(0,i.jsxs)("div",{className:"row",children:[(0,i.jsxs)("div",{className:"col-sm-4",children:[(0,i.jsx)("span",{children:"Products"}),(0,i.jsxs)("select",{className:"form-control",onChange:e=>(e=>{if(""==e)m(""),u(""),x("");else{m(e);let s=(0,o.Do)(o.vA);c.Z.get(o.ys+"admin/platformFee/"+e,{headers:{Authorization:"Bearer ".concat(s),Content_Type:"application-json"}}).then((e=>{!1===e.data.error?(u(e.data.recordset[0].fee),x(e.data.recordset[0].tax)):(0,o.Jc)("Error while Adding")})).catch((e=>{console.log(e)}))}})(e.target.value),children:[(0,i.jsx)("option",{value:"",children:"Choose Product"}),(0,i.jsx)("option",{value:"Flights",children:"Flights"}),(0,i.jsx)("option",{value:"Insurance",children:"Insurance"})]})]}),(0,i.jsxs)("div",{className:"col-sm-4",children:[(0,i.jsx)("span",{children:"Platform Fees (In RS)"}),(0,i.jsx)("input",{className:"form-control",type:"number",placeholder:"Platform Fees",value:A,pattern:"[0-9]{1,9}",min:"0",onChange:e=>u(e.target.value)})]}),(0,i.jsxs)("div",{className:"col-sm-4",children:[(0,i.jsx)("span",{children:"TAX (In %)"}),(0,i.jsx)("input",{className:"form-control",type:"number",placeholder:"Tax (In %)",value:p,min:"0",max:"100",onChange:e=>x(e.target.value)})]})]}),(0,i.jsx)("div",{className:"row",style:{marginTop:"5px"},children:(0,i.jsxs)("div",{className:"col-sm-4",children:[(0,i.jsx)("span",{style:{visibility:"hidden"},children:"Booking Status"}),(0,i.jsx)("br",{}),(0,i.jsx)(t.Z,{variant:"primary",type:"submit",children:"Edit Information"})]})}),(0,i.jsx)("div",{className:"row",style:{marginTop:"5px"}})]})]})})})})}},97477:e=>{e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAAAHhSURBVDhPfVI9T1RBFD3n7mPRDbKGDwsLPgwNiIlWJFjSWWBCqYlWJJpoYWyMDb9BXcIPgER7EhITQwENNhYYKwkmxE8SxV1WRXZ3rvfOe4RdJJyXN/PumbnvnjNziSb0z+0MsCGTkNwkVK8AoaiQH4S+RiMshHyysnWn40u2HVmycrBUvqGUR0YMg8yl/CFUdd+mdVGd2bxXXHIuJg+Wft4Ec08t6vL4JNhPNhg49eH+mbeMUkNukeRoth7RmSeGe4g3XwNqISMzqIYXBd2bFvcYpR5BXyfweCxBoS0jWsCp3zg9Iebv+nEeTQkSiV8xboat5W24bcu8nHFR6qhJvdQrGDpLnEqAke40vmh8e1MJ836VA7PlOimRHjsvUapX9MRzBeLTrqKhwJ4ND5br2KpYYAga6uyf3d0WoteJNktKPTJWnBlPMP2yhopdktpTtTmkuV75s5i1tTREPNXyX39tYw2xoid6XDH+INFhvl8JAhayBmhBUI1S/TkK46oUeSYh4arF6yl9iI2d1KNL/Q/k/P6v7+/iPVwola8F8olJGYqLJ0F1jaK3Nu8W38eb9F71ljM5z4+z4DC+qsTcQaJzLR0wUvrW4Z3jDeD3CGoXwW0/HPfoUj8+7PuT7gb+AeKuyMIcTVT/AAAAAElFTkSuQmCC"}}]);
//# sourceMappingURL=6408.b6ff1fed.chunk.js.map