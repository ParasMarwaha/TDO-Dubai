"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[2549],{32549:(e,s,l)=>{l.r(s),l.d(s,{default:()=>o});var d=l(57689),i=l(72791),c=l(55294),n=l(78983),a=l(81364),r=l(80184);const o=()=>{const e=(0,d.TH)(),s=(0,d.s0)(),[l,o]=(0,i.useState)(null);async function m(e){try{let s=(0,a.Do)(a.vA),l=a.ys+"admin/getCompanyDetailByUserId/"+e,d=await c.Z.post(l,{},{headers:{Authorization:"Bearer ".concat(s)}});200!==d.status||d.data.error||o(d.data.recordset[0])}catch(s){(0,a.Jc)(s.message)}}return(0,i.useEffect)((()=>{window.scrollTo(0,0),e.state?m(e.state).then():s("/manage-agents")}),[e]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(n.xH,{className:"mb-4",children:[(0,r.jsx)(n.bn,{className:"bg-dark text-white",children:(0,r.jsx)("h4",{className:"mb-0",children:"Authorized Signatory Details"})}),(0,r.jsx)(n.sl,{children:(0,r.jsxs)("div",{className:"row",children:[(0,r.jsx)("div",{className:"mb-3 col-md-4",children:(0,r.jsxs)("p",{children:["User Status: ",l?null!==l&&void 0!==l&&l.IsActive?(0,r.jsx)("span",{className:"badge bg-success text-white",children:"Active"}):(0,r.jsx)("span",{className:"badge bg-danger text-white",children:"InActive"}):""]})}),(0,r.jsx)("div",{className:"mb-3 col-md-4",children:(0,r.jsxs)("p",{children:["Registration Date: ",(0,r.jsx)("b",{children:(null===l||void 0===l?void 0:l.CreatedOn)&&function(e){const s=new Date(e),l=s.toISOString().split("T")[0],d=s.toTimeString().split(" ")[0].slice(0,5);return"".concat(l," ").concat(d)}(null===l||void 0===l?void 0:l.CreatedOn)})]})}),(0,r.jsx)("div",{className:"mb-3 col-md-4 text-end",children:l?!1===(null===l||void 0===l?void 0:l.IsActive)?(0,r.jsx)("button",{onClick:()=>async function(e,s){if(confirm("Are you sure?")){let l=(0,a.Do)(a.vA),d=a.ys+"admin/activate-agent",i=await c.Z.post(d,{Id:e[0]},{headers:{Authorization:"Bearer ".concat(l)}});200===i.status&&i.data.error&&(0,a.Jc)(i.data.message),200!==i.status||i.data.error||((0,a.Qm)(i.data.message),m(s).then())}}(null===l||void 0===l?void 0:l.UserId,null===l||void 0===l?void 0:l.AspNetUserId),className:"btn btn-success text-white",children:"Activate"}):(0,r.jsx)("button",{onClick:()=>async function(e,s){if(confirm("Are you sure?")){let l=(0,a.Do)(a.vA),d=a.ys+"admin/deactivate-agent",i=await c.Z.post(d,{Id:e[0]},{headers:{Authorization:"Bearer ".concat(l)}});200===i.status&&i.data.error&&(0,a.Jc)(i.data.message),200!==i.status||i.data.error||((0,a.Qm)(i.data.message),m(s).then())}}(null===l||void 0===l?void 0:l.UserId,null===l||void 0===l?void 0:l.AspNetUserId),className:"btn btn-danger text-white",children:"Inactive"}):""}),(0,r.jsx)("div",{className:"mb-3 col-md-4",children:(0,r.jsxs)("p",{children:["First Name: ",(0,r.jsx)("b",{children:null===l||void 0===l?void 0:l.FirstName})]})}),(0,r.jsx)("div",{className:"mb-3 col-md-4",children:(0,r.jsxs)("p",{children:["Last Name: ",(0,r.jsx)("b",{children:null===l||void 0===l?void 0:l.LastName})]})}),(0,r.jsx)("div",{className:"mb-3 col-md-4",children:(0,r.jsxs)("p",{children:["Email Id: ",(0,r.jsx)("b",{children:null===l||void 0===l?void 0:l.Email})]})}),(0,r.jsx)("div",{className:"mb-3 col-md-4",children:(0,r.jsxs)("p",{children:["Mobile Number: ",(0,r.jsx)("b",{children:null===l||void 0===l?void 0:l.PhoneNumber})]})}),(0,r.jsx)("div",{className:"mb-3 col-md-4",children:(0,r.jsxs)("p",{children:["Whatsapp Number: ",(0,r.jsx)("b",{children:null===l||void 0===l?void 0:l.WhatsappNumber})]})}),(0,r.jsx)("div",{className:"mb-3 col-md-4",children:(0,r.jsxs)("p",{children:["Alternate Number: ",(0,r.jsx)("b",{children:null===l||void 0===l?void 0:l.AlternateNumber})]})}),(0,r.jsx)("div",{className:"mb-3 col-md-4",children:(0,r.jsxs)("p",{children:["Address Line 1: ",(0,r.jsx)("b",{children:null===l||void 0===l?void 0:l.Address})]})}),(0,r.jsx)("div",{className:"mb-3 col-md-4",children:(0,r.jsxs)("p",{children:["City: ",(0,r.jsx)("b",{children:null===l||void 0===l?void 0:l.City})]})}),(0,r.jsx)("div",{className:"mb-3 col-md-4",children:(0,r.jsxs)("p",{children:["State: ",(0,r.jsx)("b",{children:null===l||void 0===l?void 0:l.State})]})}),(0,r.jsx)("div",{className:"mb-3 col-md-4",children:(0,r.jsxs)("p",{className:"mb-md-0",children:["Country: ",(0,r.jsx)("b",{children:null===l||void 0===l?void 0:l.Country})]})}),(0,r.jsx)("div",{className:"mb-3 col-md-4",children:(0,r.jsxs)("p",{className:"mb-0 mb-md-0",children:["Postal Code: ",(0,r.jsx)("b",{children:null===l||void 0===l?void 0:l.PinCode})]})})]})})]}),(0,r.jsxs)(n.xH,{className:"mb-4",children:[(0,r.jsx)(n.bn,{className:"bg-dark text-white",children:(0,r.jsx)("h4",{className:"mb-0",children:"Access Details"})}),(0,r.jsx)(n.sl,{children:(0,r.jsxs)("div",{className:"row",children:[(0,r.jsx)("div",{className:"mb-3 col-md-4",children:(0,r.jsxs)("p",{children:["User Name: ",(0,r.jsx)("b",{children:null===l||void 0===l?void 0:l.Email})]})}),(0,r.jsx)("div",{className:"mb-3 col-md-4",children:(0,r.jsxs)("p",{children:["Agency Id: ",(0,r.jsx)("b",{children:null===l||void 0===l?void 0:l.CompanyId})]})}),(0,r.jsx)("div",{className:"mb-3 col-md-4",children:(0,r.jsxs)("p",{children:["Group Type: ",(0,r.jsx)("b",{children:null===l||void 0===l?void 0:l.GroupType})]})})]})})]}),(0,r.jsxs)(n.xH,{className:"mb-4",children:[(0,r.jsx)(n.bn,{className:"bg-dark text-white",children:(0,r.jsx)("h4",{className:"mb-0",children:"Agency Details"})}),(0,r.jsx)(n.sl,{children:(0,r.jsxs)("div",{className:"row",children:[(0,r.jsx)("div",{className:"mb-3 col-md-4",children:(0,r.jsxs)("p",{children:["Agency Name: ",(0,r.jsx)("b",{children:null===l||void 0===l?void 0:l.CompanyName})]})}),(0,r.jsx)("div",{className:"mb-3 col-md-4",children:(0,r.jsxs)("p",{children:["Nature of Business: ",(0,r.jsx)("b",{children:null===l||void 0===l?void 0:l.NatureOfBusiness})]})}),(0,r.jsx)("div",{className:"mb-3 col-md-4",children:(0,r.jsxs)("p",{children:["Business Type: ",(0,r.jsx)("b",{children:null===l||void 0===l?void 0:l.BusinessType})]})}),(0,r.jsx)("div",{className:"mb-3 col-md-4",children:(0,r.jsxs)("p",{children:["PAN Number: ",(0,r.jsx)("b",{children:null===l||void 0===l?void 0:l.PANNumber})]})}),(0,r.jsx)("div",{className:"mb-3 col-md-4",children:(0,r.jsxs)("p",{children:["TDS Exemption: ",(0,r.jsx)("b",{children:null===l||void 0===l?void 0:l.TDSExemption})]})}),(0,r.jsx)("div",{className:"mb-3 col-md-4",children:(0,r.jsxs)("p",{children:["TDS (% for exemption): ",(0,r.jsx)("b",{children:null===l||void 0===l?void 0:l.TDSPercentage})]})}),(0,r.jsx)("div",{className:"mb-3 col-md-4",children:(0,r.jsxs)("p",{children:["IATA No.: ",(0,r.jsx)("b",{children:null===l||void 0===l?void 0:l.IATACode})]})}),(0,r.jsx)("div",{className:"mb-3 col-md-4",children:(0,r.jsxs)("p",{children:["Referenced By: ",(0,r.jsx)("b",{children:null===l||void 0===l?void 0:l.ReferencedBy})]})}),(0,r.jsx)("div",{className:"mb-3 col-md-4",children:(0,r.jsx)("p",{children:"Name or ID:"})}),(0,r.jsx)("div",{className:"mb-3 col-md-4",children:(0,r.jsxs)("p",{children:["GST Number: ",(0,r.jsx)("b",{children:null===l||void 0===l?void 0:l.GSTNumber})]})}),(0,r.jsx)("div",{className:"mb-3 col-md-4",children:(0,r.jsx)("p",{children:"Sales Executive Name:"})}),(0,r.jsx)("div",{className:"mb-3 col-md-4",children:(0,r.jsxs)("p",{children:["Payment Type: ",(0,r.jsx)("b",{children:null===l||void 0===l?void 0:l.PaymentType})]})})]})})]}),(0,r.jsxs)(n.xH,{className:"mb-4",children:[(0,r.jsx)(n.bn,{className:"bg-dark text-white",children:(0,r.jsx)("h4",{className:"mb-0",children:"Account Info"})}),(0,r.jsx)(n.sl,{children:(0,r.jsxs)("div",{className:"row",children:[(0,r.jsx)("div",{className:"mb-3 mb-md-0 col-md-4",children:(0,r.jsxs)("p",{children:["Total Balance: ",(0,r.jsx)("b",{children:null===l||void 0===l?void 0:l.TotalBalance})]})}),(0,r.jsx)("div",{className:"mb-3 mb-md-0 col-md-4",children:(0,r.jsxs)("p",{children:["Credit Limit: ",(0,r.jsx)("b",{children:null===l||void 0===l?void 0:l.TotalCreditLimit})]})}),(0,r.jsx)("div",{className:"mb-0 col-md-4",children:(0,r.jsxs)("p",{children:["Due Amount: ",(0,r.jsx)("b",{children:null===l||void 0===l?void 0:l.DueAmount})]})})]})})]}),(0,r.jsxs)(n.xH,{className:"mb-4",children:[(0,r.jsx)(n.bn,{className:"bg-dark text-white",children:(0,r.jsx)("h4",{className:"mb-0",children:"Documents"})}),(0,r.jsx)(n.sl,{children:(0,r.jsxs)("div",{className:"row",children:[(0,r.jsx)("div",{className:"mb-3 col-md-4",children:(0,r.jsxs)("p",{children:["Agency Logo: ",null!==l&&void 0!==l&&l.AgencyLogo?(0,r.jsx)("a",{href:a.ys+"uploads/"+(null===l||void 0===l?void 0:l.AgencyLogo),target:"_blank",className:"file-link",children:"View\xa0/\xa0Download"}):(0,r.jsx)("b",{children:"Not Available"})]})}),(0,r.jsx)("div",{className:"mb-3 col-md-4",children:(0,r.jsxs)("p",{children:["Profile Picture: ",null!==l&&void 0!==l&&l.ProfilePicture?(0,r.jsx)("a",{href:a.ys+"uploads/"+(null===l||void 0===l?void 0:l.ProfilePicture),target:"_blank",children:"View\xa0/\xa0Download"}):(0,r.jsx)("b",{children:"Not Available"})]})}),(0,r.jsx)("div",{className:"mb-3 col-md-4",children:(0,r.jsxs)("p",{children:["PAN: ",null!==l&&void 0!==l&&l.PANNumberDocument?(0,r.jsx)("a",{href:a.ys+"uploads/"+(null===l||void 0===l?void 0:l.PANNumberDocument),target:"_blank",children:"View\xa0/\xa0Download"}):(0,r.jsx)("b",{children:"Not Available"})]})}),(0,r.jsx)("div",{className:"mb-3 col-md-4",children:(0,r.jsxs)("p",{children:["TDS Certificate: ",null!==l&&void 0!==l&&l.TDSCertificate?(0,r.jsx)("a",{href:a.ys+"uploads/"+(null===l||void 0===l?void 0:l.TDSCertificate),target:"_blank",children:"View\xa0/\xa0Download"}):(0,r.jsx)("b",{children:"Not Available"})]})}),(0,r.jsx)("div",{className:"mb-3 col-md-4",children:(0,r.jsxs)("p",{children:["GST Certificate: ",null!==l&&void 0!==l&&l.GSTCertificate?(0,r.jsx)("a",{href:a.ys+"uploads/"+(null===l||void 0===l?void 0:l.GSTCertificate),target:"_blank",children:"View\xa0/\xa0Download"}):(0,r.jsx)("b",{children:"Not Available"})]})}),(0,r.jsx)("div",{className:"mb-3 col-md-4"}),(0,r.jsx)("div",{className:"mb-3 col-md-4",children:(0,r.jsxs)("p",{children:["Address Document Type: ",(0,r.jsx)("b",{children:null===l||void 0===l?void 0:l.AddressProof})]})}),(0,r.jsx)("div",{className:"mb-3 col-md-4",children:(0,r.jsxs)("p",{children:["Address Proof Type: ",null!==l&&void 0!==l&&l.AddressProofDocument?(0,r.jsx)("a",{href:a.ys+"uploads/"+(null===l||void 0===l?void 0:l.AddressProofDocument),target:"_blank",children:"View\xa0/\xa0Download"}):(0,r.jsx)("b",{children:"Not Available"})]})}),(0,r.jsx)("div",{className:"mb-3 col-md-4"}),(0,r.jsx)("div",{className:"mb-3 col-md-4",children:(0,r.jsxs)("p",{children:["Second Address Document Type: ",(0,r.jsx)("b",{children:null!==l&&void 0!==l&&l.SecondAddressProof?null===l||void 0===l?void 0:l.SecondAddressProof:"Not Available"})]})}),(0,r.jsx)("div",{className:"mb-3 col-md-4",children:(0,r.jsxs)("p",{children:["Second Address Proof Type: ",null!==l&&void 0!==l&&l.SecondAddressProofDocument?(0,r.jsx)("a",{href:a.ys+"uploads/"+(null===l||void 0===l?void 0:l.SecondAddressProofDocument),target:"_blank",children:"View\xa0/\xa0Download"}):(0,r.jsx)("b",{children:"Not Available"})]})})]})})]})]})}}}]);
//# sourceMappingURL=2549.6c810592.chunk.js.map