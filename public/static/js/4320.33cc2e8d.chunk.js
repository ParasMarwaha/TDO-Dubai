"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[4320],{4320:(e,a,s)=>{s.r(a),s.d(a,{default:()=>m});var l=s(72791),r=s(61134),d=s(78983),i=s(81364),n=s(55294),t=s(75970),o=s(80184);const m=()=>{var e,a,s,m,c,u,p,h,N,x,v,j,A,b,g,f;const{register:U,handleSubmit:P,formState:{errors:y},reset:T}=(0,r.cI)(),[F,q]=(0,l.useState)(!1);return(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)(d.xH,{children:[(0,o.jsx)(d.bn,{className:"card-header-bg",children:(0,o.jsx)("h4",{className:"mb-0 primary-color",children:"Create New Distributor"})}),(0,o.jsx)(d.sl,{children:(0,o.jsx)("form",{onSubmit:P((async function(e){try{const a=new FormData;a.append("data",JSON.stringify(e)),a.append("GSTUpload",e.GSTUpload[0]),a.append("IATAUpload",e.IATAUpload[0]),a.append("UploadAadhaar",e.UploadAadhaar[0]),a.append("UploadPAN",e.UploadPAN[0]),a.append("UploadPANPerson",e.UploadPANPerson[0]),a.append("UploadUDYAM",e.UploadUDYAM[0]),q(!0);const s=(0,i.Do)(i.vA),l="".concat(i.ys,"admin/distributors"),r=await n.Z.post(l,a,{headers:{Authorization:"Bearer ".concat(s)}});200===r.status&&r.data.error?(0,i.Jc)(r.data.message):200!==r.status||r.data.error||(T(),(0,i.Qm)(r.data.message)),q(!1)}catch(a){q(!1),(0,i.Jc)(a.message)}})),children:(0,o.jsxs)("div",{className:"row",children:[(0,o.jsx)("div",{className:"col-12 mb-3",children:(0,o.jsx)("h5",{className:"text-muted",children:"Member Information"})}),(0,o.jsxs)("div",{className:"col-md-6 mb-3",children:[(0,o.jsxs)("label",{htmlFor:"AgencyName",children:["Business/Agency Name ",(0,o.jsx)("span",{className:"text-danger",children:"*"})]}),(0,o.jsx)("input",{type:"text",id:"AgencyName",name:"AgencyName",className:"form-control",...U("AgencyName",{required:"This is a required field.",validate:e=>!/<|>/.test(e)||'AgencyName cannot contain "<" or ">"'}),placeholder:"Enter Business/Agency Name"}),(null===y||void 0===y?void 0:y.AgencyName)&&(0,o.jsx)("p",{className:"text-danger",children:null===y||void 0===y||null===(e=y.AgencyName)||void 0===e?void 0:e.message})]}),(0,o.jsxs)("div",{className:"col-md-6 mb-3",children:[(0,o.jsxs)("label",{htmlFor:"NatureOfBusiness",children:["Nature of Business ",(0,o.jsx)("span",{className:"text-danger",children:"*"})]}),(0,o.jsxs)("select",{name:"NatureOfBusiness",id:"NatureOfBusiness",className:"form-select",...U("NatureOfBusiness",{required:"This is a required field."}),children:[(0,o.jsx)("option",{value:"",children:"Please Select Nature of Business"}),(0,o.jsx)("option",{value:"Proprietorship",children:"Proprietorship"}),(0,o.jsx)("option",{value:"Individual",children:"Individual"}),(0,o.jsx)("option",{value:"Partnership Firm",children:"Partnership Firm"}),(0,o.jsx)("option",{value:"Private Limited",children:"Private Limited"}),(0,o.jsx)("option",{value:"Others",children:"Others"})]}),(null===y||void 0===y?void 0:y.NatureOfBusiness)&&(0,o.jsx)("p",{className:"text-danger",children:null===y||void 0===y||null===(a=y.NatureOfBusiness)||void 0===a?void 0:a.message})]}),(0,o.jsxs)("div",{className:"col-md-6 mb-3",children:[(0,o.jsxs)("label",{htmlFor:"Firstname",children:["Authorized Person Firstname ",(0,o.jsx)("span",{className:"text-danger",children:"*"})]}),(0,o.jsx)("input",{type:"text",id:"Firstname",name:"Firstname",className:"form-control",...U("Firstname",{required:"This is a required field.",validate:e=>!/<|>/.test(e)||'Firstname cannot contain "<" or ">"'}),placeholder:"Enter Firstname"}),(null===y||void 0===y?void 0:y.Firstname)&&(0,o.jsx)("p",{className:"text-danger",children:null===y||void 0===y||null===(s=y.Firstname)||void 0===s?void 0:s.message})]}),(0,o.jsxs)("div",{className:"col-md-6 mb-3",children:[(0,o.jsxs)("label",{htmlFor:"Lastname",children:["Authorized Person Lastname ",(0,o.jsx)("span",{className:"text-danger",children:"*"})]}),(0,o.jsx)("input",{type:"text",id:"Lastname",name:"Lastname",className:"form-control",...U("Lastname",{required:"This is a required field.",validate:e=>!/<|>/.test(e)||'Lastname cannot contain "<" or ">"'}),placeholder:"Enter Lastname"}),(null===y||void 0===y?void 0:y.Lastname)&&(0,o.jsx)("p",{className:"text-danger",children:null===y||void 0===y||null===(m=y.Lastname)||void 0===m?void 0:m.message})]}),(0,o.jsxs)("div",{className:"col-md-6 mb-3",children:[(0,o.jsxs)("label",{htmlFor:"Email",children:["Email ",(0,o.jsx)("span",{className:"text-danger",children:"*"})]}),(0,o.jsx)("input",{type:"email",id:"Email",name:"Email",className:"form-control",...U("Email",{required:"This is a required field.",validate:e=>!/<|>/.test(e)||'Email cannot contain "<" or ">"',pattern:{value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,message:"Invalid email address"}}),placeholder:"Enter Email"}),(0,o.jsx)(t.B,{errors:y,name:"Email",render:e=>{let{message:a}=e;return(0,o.jsx)("p",{className:"text-danger",children:a})}})]}),(0,o.jsxs)("div",{className:"col-md-6 mb-3",children:[(0,o.jsxs)("label",{htmlFor:"Mobile",children:["Mobile Number ",(0,o.jsx)("span",{className:"text-danger",children:"*"})]}),(0,o.jsx)("input",{type:"text",id:"Mobile",name:"Mobile",className:"form-control",...U("Mobile",{required:"This is a required field.",validate:{noSpecialChars:e=>!/[<>]/.test(e)||'Mobile number cannot contain "<" or ">"',onlyNumbers:e=>/^\d+$/.test(e)||"Mobile no. can only contain numbers",exactLength:e=>10===e.length||"Mobile no. must be exactly 10 digits"}}),placeholder:"Enter Mobile Number"}),(null===y||void 0===y?void 0:y.Mobile)&&(0,o.jsx)("p",{className:"text-danger",children:null===y||void 0===y||null===(c=y.Mobile)||void 0===c?void 0:c.message})]}),(0,o.jsx)("div",{className:"col-12 mt-2 mb-3",children:(0,o.jsx)("h5",{className:"text-muted",children:"Office Address"})}),(0,o.jsxs)("div",{className:"col-md-12 mb-3",children:[(0,o.jsxs)("label",{htmlFor:"Address",children:["Address ",(0,o.jsx)("span",{className:"text-danger",children:"*"})]}),(0,o.jsx)("textarea",{name:"Address",id:"Address",className:"form-control",...U("Address",{required:"This is a required field.",validate:e=>!/<|>/.test(e)||'Address cannot contain "<" or ">"'}),placeholder:"Enter Address"}),(null===y||void 0===y?void 0:y.Address)&&(0,o.jsx)("p",{className:"text-danger",children:null===y||void 0===y||null===(u=y.Address)||void 0===u?void 0:u.message})]}),(0,o.jsxs)("div",{className:"col-md-6 mb-3",children:[(0,o.jsxs)("label",{htmlFor:"City",children:["City ",(0,o.jsx)("span",{className:"text-danger",children:"*"})]}),(0,o.jsx)("input",{type:"text",id:"City",name:"City",className:"form-control",...U("City",{required:"This is a required field.",validate:e=>!/<|>/.test(e)||'City cannot contain "<" or ">"'}),placeholder:"Enter City"}),(null===y||void 0===y?void 0:y.City)&&(0,o.jsx)("p",{className:"text-danger",children:null===y||void 0===y||null===(p=y.City)||void 0===p?void 0:p.message})]}),(0,o.jsxs)("div",{className:"col-md-6 mb-3",children:[(0,o.jsxs)("label",{htmlFor:"State",children:["State ",(0,o.jsx)("span",{className:"text-danger",children:"*"})]}),(0,o.jsx)("input",{type:"text",id:"State",name:"State",className:"form-control",...U("State",{required:"This is a required field.",validate:e=>!/<|>/.test(e)||'State cannot contain "<" or ">"'}),placeholder:"Enter State"}),(null===y||void 0===y?void 0:y.State)&&(0,o.jsx)("p",{className:"text-danger",children:null===y||void 0===y||null===(h=y.State)||void 0===h?void 0:h.message})]}),(0,o.jsx)("div",{className:"col-12 mt-2 mb-3",children:(0,o.jsx)("h5",{className:"text-muted",children:"Authorized Person Documents"})}),(0,o.jsxs)("div",{className:"col-md-6 mb-3",children:[(0,o.jsxs)("label",{htmlFor:"AadhaarNumber",children:["Aadhaar Number ",(0,o.jsx)("span",{className:"text-danger",children:"*"})]}),(0,o.jsx)("input",{type:"text",id:"AadhaarNumber",name:"AadhaarNumber",className:"form-control",...U("AadhaarNumber",{required:"This is a required field.",validate:e=>!/<|>/.test(e)||'AadhaarNumber cannot contain "<" or ">"'}),placeholder:"Enter AadhaarNumber"}),(null===y||void 0===y?void 0:y.AadhaarNumber)&&(0,o.jsx)("p",{className:"text-danger",children:null===y||void 0===y||null===(N=y.AadhaarNumber)||void 0===N?void 0:N.message})]}),(0,o.jsxs)("div",{className:"col-md-6 mb-3",children:[(0,o.jsxs)("label",{htmlFor:"UploadAadhaar",children:["Upload Aadhaar ",(0,o.jsx)("span",{className:"text-danger",children:"*"})]}),(0,o.jsx)("input",{type:"file",id:"UploadAadhaar",name:"UploadAadhaar",className:"form-control",...U("UploadAadhaar",{required:"This is a required field."}),accept:".png, .jpg, .jpeg, .pdf"}),(null===y||void 0===y?void 0:y.UploadAadhaar)&&(0,o.jsx)("p",{className:"text-danger",children:null===y||void 0===y||null===(x=y.UploadAadhaar)||void 0===x?void 0:x.message})]}),(0,o.jsxs)("div",{className:"col-md-6 mb-3",children:[(0,o.jsxs)("label",{htmlFor:"PANNumberPerson",children:["PAN Number ",(0,o.jsx)("span",{className:"text-danger",children:"*"})]}),(0,o.jsx)("input",{type:"text",id:"PANNumberPerson",name:"PANNumberPerson",className:"form-control",...U("PANNumberPerson",{required:"This is a required field.",validate:e=>!/<|>/.test(e)||'PAN Number cannot contain "<" or ">"'}),placeholder:"Enter PAN Number"}),(null===y||void 0===y?void 0:y.PANNumberPerson)&&(0,o.jsx)("p",{className:"text-danger",children:null===y||void 0===y||null===(v=y.PANNumberPerson)||void 0===v?void 0:v.message})]}),(0,o.jsxs)("div",{className:"col-md-6 mb-3",children:[(0,o.jsxs)("label",{htmlFor:"UploadPANPerson",children:["Upload PAN ",(0,o.jsx)("span",{className:"text-danger",children:"*"})]}),(0,o.jsx)("input",{type:"file",id:"UploadPANPerson",name:"UploadPANPerson",className:"form-control",...U("UploadPANPerson",{required:"This is a required field."}),accept:".png, .jpg, .jpeg, .pdf"}),(null===y||void 0===y?void 0:y.UploadPANPerson)&&(0,o.jsx)("p",{className:"text-danger",children:null===y||void 0===y||null===(j=y.UploadPANPerson)||void 0===j?void 0:j.message})]}),(0,o.jsx)("div",{className:"col-12 mt-2 mb-3",children:(0,o.jsx)("h5",{className:"text-muted",children:"Agency Documents"})}),(0,o.jsxs)("div",{className:"col-md-6 mb-3",children:[(0,o.jsxs)("label",{htmlFor:"GSTNumber",children:["GST Number ",(0,o.jsx)("span",{className:"text-danger",children:"*"})]}),(0,o.jsx)("input",{type:"text",id:"GSTNumber",name:"GSTNumber",className:"form-control",...U("GSTNumber",{required:"This is a required field.",validate:e=>!/<|>/.test(e)||'GSTNumber cannot contain "<" or ">"'}),placeholder:"Enter GST Number"}),(null===y||void 0===y?void 0:y.AadhaarNumber)&&(0,o.jsx)("p",{className:"text-danger",children:null===y||void 0===y||null===(A=y.AadhaarNumber)||void 0===A?void 0:A.message})]}),(0,o.jsxs)("div",{className:"col-md-6 mb-3",children:[(0,o.jsxs)("label",{htmlFor:"GSTUpload",children:["Upload GST Certificate ",(0,o.jsx)("span",{className:"text-danger",children:"*"})]}),(0,o.jsx)("input",{type:"file",id:"GSTUpload",name:"GSTUpload",className:"form-control",...U("GSTUpload",{required:"This is a required field."}),accept:".png, .jpg, .jpeg, .pdf"}),(null===y||void 0===y?void 0:y.GSTUpload)&&(0,o.jsx)("p",{className:"text-danger",children:null===y||void 0===y||null===(b=y.GSTUpload)||void 0===b?void 0:b.message})]}),(0,o.jsxs)("div",{className:"col-md-6 mb-3",children:[(0,o.jsxs)("label",{htmlFor:"PANNumber",children:["PAN Number ",(0,o.jsx)("span",{className:"text-danger",children:"*"})]}),(0,o.jsx)("input",{type:"text",id:"PANNumber",name:"PANNumber",className:"form-control",...U("PANNumber",{required:"This is a required field.",validate:e=>!/<|>/.test(e)||'PAN Number cannot contain "<" or ">"'}),placeholder:"Enter PAN Number"}),(null===y||void 0===y?void 0:y.PANNumber)&&(0,o.jsx)("p",{className:"text-danger",children:null===y||void 0===y||null===(g=y.PANNumber)||void 0===g?void 0:g.message})]}),(0,o.jsxs)("div",{className:"col-md-6 mb-3",children:[(0,o.jsxs)("label",{htmlFor:"UploadPAN",children:["Upload PAN ",(0,o.jsx)("span",{className:"text-danger",children:"*"})]}),(0,o.jsx)("input",{type:"file",id:"UploadPAN",name:"UploadPAN",className:"form-control",...U("UploadPAN",{required:"This is a required field."}),accept:".png, .jpg, .jpeg, .pdf"}),(null===y||void 0===y?void 0:y.UploadPAN)&&(0,o.jsx)("p",{className:"text-danger",children:null===y||void 0===y||null===(f=y.UploadPAN)||void 0===f?void 0:f.message})]}),(0,o.jsxs)("div",{className:"col-md-6 mb-3",children:[(0,o.jsx)("label",{htmlFor:"IATACode",children:"IATA Code"}),(0,o.jsx)("input",{type:"text",id:"IATACode",name:"IATACode",className:"form-control",...U("IATACode",{validate:e=>!/<|>/.test(e)||'IATA Code cannot contain "<" or ">"'}),placeholder:"Enter IATA Code"})]}),(0,o.jsxs)("div",{className:"col-md-6 mb-3",children:[(0,o.jsx)("label",{htmlFor:"IATAUpload",children:"Upload IATA"}),(0,o.jsx)("input",{type:"file",id:"IATAUpload",name:"IATAUpload",className:"form-control",...U("IATAUpload"),accept:".png, .jpg, .jpeg, .pdf"})]}),(0,o.jsxs)("div",{className:"col-md-6 mb-3",children:[(0,o.jsx)("label",{htmlFor:"UDYAM_Number",children:"UDYAM Number"}),(0,o.jsx)("input",{type:"text",id:"UDYAM_Number",name:"UDYAM_Number",className:"form-control",...U("UDYAM_Number",{validate:e=>!/<|>/.test(e)||'UDYAM Number cannot contain "<" or ">"'}),placeholder:"Enter UDYAM Number"})]}),(0,o.jsxs)("div",{className:"col-md-6 mb-3",children:[(0,o.jsx)("label",{htmlFor:"UploadUDYAM",children:"Upload UDYAM"}),(0,o.jsx)("input",{type:"file",id:"UploadUDYAM",name:"UploadUDYAM",className:"form-control",...U("UploadUDYAM"),accept:".png, .jpg, .jpeg, .pdf"})]}),(0,o.jsx)("div",{className:"col-12",children:(0,o.jsx)("button",{disabled:F,className:"px-5 btn btn-primary",children:"Create"})})]})})})]})})}},75970:(e,a,s)=>{s.d(a,{B:()=>d});var l=s(72791),r=s(61134),d=function(e){var a=e.as,s=e.errors,d=e.name,i=e.message,n=e.render,t=function(e,a){if(null==e)return{};var s,l,r={},d=Object.keys(e);for(l=0;l<d.length;l++)a.indexOf(s=d[l])>=0||(r[s]=e[s]);return r}(e,["as","errors","name","message","render"]),o=(0,r.Gc)(),m=(0,r.U2)(s||o.formState.errors,d);if(!m)return null;var c=m.message,u=m.types,p=Object.assign({},t,{children:c||i});return l.isValidElement(a)?l.cloneElement(a,p):n?n({message:c||i,messages:u}):l.createElement(a||l.Fragment,p)}}}]);
//# sourceMappingURL=4320.33cc2e8d.chunk.js.map