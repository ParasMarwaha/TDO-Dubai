jQuery.validator.setDefaults({
    debug: true,
    success: "valid"
});
$('#account-form').validate({
    rules: {
        confirm: {
            equalTo: "#password"
        }
    }
});
$('#travellersForm').validate();
$('#detailsform').validate();
$('#jquery-steps').steps({
    headerTag: "span",
    bodyTag: "section",
    transitionEffect: "slideLeft",
    onStepChanging: function (event, currentIndex, newIndex) {


        if (newIndex < currentIndex) {
            if (newIndex === 3) {
                $('.actions a[href="#previous"]').hide();
                $('.actions a[href="#next"]').hide();
            }
            else if(newIndex === 4)
            {
                $('.actions a[href="#previous"]').hide();
                $('.actions a[href="#next"]').hide();
            }
            else {
                $('.actions a[href="#previous"]').show();
                $('.actions a[href="#next"]').show();
            }
            return true;
        }

        if (currentIndex === 2 && !$('#ageForm').valid()) {
            return false; // Prevent moving to the next step if validation fails
        }

        // Handle visibility of buttons based on the step
        if (newIndex === 3) {
          
            $('.actions a[href="#previous"]').hide();
            $('.actions a[href="#next"]').hide();
            var destination = document.getElementById("destination").value;
            var countTravellers = document.getElementById("countTravellers").value;
            var formdata = new FormData();
            formdata.append("noTravellers", countTravellers)
            formdata.append("destination", destination);
            formdata.append("NoDays", document.getElementById("tripNoDays").innerHTML)
            formdata.append("sumInsured",50000);
            // console.log("-------->" + document.getElementById("tripNoDays").innerHTML);
            for (let x = 1; x <= countTravellers; x++) {
                if (x === 1) {
                    formdata.append("agePm", document.getElementById(`agePm`).value)
                } else {
                    formdata.append(`ageAm${x}`, document.getElementById(`ageAm${x}`).value)
                }
            }
            let test= '';
            fetch("/fetchPrice1", {
                method: "post",
                body: formdata
            }).then(res => res.json()).then(val => {
                console.log(val.length + " "+ val[0].sumAssured);
                localStorage.setItem("arr",JSON.stringify(val));
                $('#staticBackdrop').modal('hide');
            let test = '';
            let v = JSON.parse(localStorage.getItem("arr"));
            console.log("---"+v);
            for(let i=0; i<v.length; i++)
            {
                test+=`    

                <div class="row mt-4">
                <div class="col-lg-12 block">
                 <div class="mb-5">
                                    <div class="hover-bg-gray-1 border-button rounded-xs py-4 px-4 px-xl-5" style="background-color: white">
                                        <div class="row align-items-center text-center">
                                            <div class="col-md mb-4 mb-md-0">
                                                <img class="img-fluid" src="/images/lgo.png" alt="Image-Description" style="height: 50px">
         <div class="font-size-14 text-gray-1">ICICI LOMBARD</div>
                                            </div>
                                            <div class="col-4 col-md mb-4 mb-md-0">
                                                <div class="flex-content-center d-block d-lg-flex">
                                                    <div class="mr-lg-3 mb-1 mb-lg-0">
                                                        <i class="flaticon-user-2 font-size-30 text-primary"></i>
                                                    </div>
                                                    <div class="text-lg-left">
                                                        <h6 class="font-weight-bold font-size-21 text-gray-5 mb-0">Sum Assured</h6>
                                                        <span class="font-size-18 text-gray-1">$${v[i].sumAssured}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-4 col-md mb-4 mb-md-0">
                                                <div class="flex-content-center flex-column">
                                                    <h6 class="font-size-14 font-weight-bold text-gray-5 mb-0">ICICI LOMBARD</h6>
                                                    <div class="width-60 border-top border-primary border-width-2 my-1"></div>
                                                    <div class="font-size-14 text-gray-1" ></div>
                                                </div>
                                            </div>
                                            <div class="col-4 col-md mb-4 mb-md-0">
                                                <div class="flex-content-center d-block d-lg-flex">
                                                    <div class="mr-lg-3 mb-1 mb-lg-0">
                                                        <i class="d-block flaticon-user-2 font-size-30 text-primary"></i>
                                                    </div>
                                                    <div class="text-lg-left">
                                                        <h6 class="font-weight-bold font-size-21 text-gray-5 mb-0">Total Persons</h6>
                                                        <span class="font-size-18 text-gray-1">${countTravellers}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-2gdot8">
                                                <div class="border-xl-left">
                                                    <div class="ml-xl-5">
                                                        <div class="mb-2">
                                                            <div class="mb-2 text-lh-1dot4">
                                                                <span class="font-weight-bold font-size-22">&#x20b9; ${v[i].totalAmount}</span>
                                                            </div>
                                                            <a href="#"  class="btn btn-outline-primary border-radius-3 d-flex align-items-center justify-content-center min-height-50 font-weight-bold border-width-2 py-2 w-100" onclick="myFun(${v[i].totalAmount},${v[i].sumAssured})">Book Now</a>
                                                        </div>
                                            
        
                                                       
                                                        <!-- End On Target Modal -->
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                </div>
               
            </div>
                                    
          </div>
      
          </div>
          
          `;
                console.log(test);
            }
            test+=`    <div class="col-lg-12 col-sm-12 col-12 text-center">
            <button type="button" class="btn btn-warning text-uppercase w-25" id="jumpToStep2Button">Previous</button>
            </div>`;
            document.getElementById("test").innerHTML = test;
            })
        }

        var form = $('.body.current form');



        if (newIndex == 4) {
           
            $('.actions a[href="#previous"]').hide();
            $('.actions a[href="#next"]').hide();

            let tdForm = ``;
            // alert("traveller details")
            var countTraveller = parseInt(document.getElementById("countTravellers").value);

            tdForm += `
           <div class="progress-container">
    <div class="progress-bar" id="progressBar"></div>
     <div class="steps-counter" id="stepCounter">  <span id="stepCount">Step 1 of ${countTraveller}</span></div>
</div>
                                <form id="detailsform">
            `;
            if (countTraveller === 1) {
                // alert("hello");
                let age1 = document.getElementById(`agePm`).value;
                let birthYear = getBirthYearFromAge(age1);
                console.log("Birth Year:", birthYear);
                tdForm += `
                 <div id="step1">
                     <h2>Primary Member (Age: ${age1})</h2>
                     <legend class="fs-8">Personal Details</legend>
                      <div class="row mb-4">
                            <div class="col-lg-2 col-sm-2 col-12">
                                                <label for="pmSalutation">Title</label>
                                                <select class="form-control" name="pmSalutation" id="pmSalutation" required>
                                                <option value="">Select</option>
                                                    <option>MR</option>
                                                    <option>MRS</option>
                                                    <option>MISS</option>
                                                    <option>SHRI</option>
                                                </select>
                            </div>
                            <div class="col-lg-5 col-sm-5 col-12">
                                                    <label for="pmFirstName">First Name</label>
                                                    <input type="text" name="pmFirstName" id="pmFirstName" required class="form-control"/>
                            </div>
                            <div class="col-lg-5 col-sm-5 col-12">
                                                    <label for="pmLastName">Last Name</label>
                                                    <input type="text" name="pmLastName" id="pmLastName" required class="form-control"/>
                            </div>
                      </div>
                      <div class="row mb-4">
                        <div class="col-lg-4 col-sm-4 col-12">
                            <label for="pmMobile">Mobile No.</label>
                            <input type="number" name="pmMobile" id="pmMobile"  class="form-control" required data-rule-number="true" minlength="10"  maxlength="15"/>
                           <div id="pmMobile-error"></div>
                        </div>
                        <div class="col-lg-4 col-sm-4 col-12">
                            <label for="pmEmail">Email Id</label>
                            <input type="email" name="pmEmail" id="pmEmail" class="form-control" required/>
                        </div>
                        <div class="col-lg-4 col-sm-4 col-12">
                            <label for="pmPasssport">Passport No.</label>
                            <input type="text" name="pmPasssport" maxlength="12" minlength="8" id="pmPasssport" required class="form-control"/>
                        </div>
                      </div>
                      <div class="row mb-4">
                       <div class="col-lg-6 col-sm-6 col-12">
                              <label>Gender</label> <br/>
                              <div class="form-check-inline">
                                  <input type="radio" class="form-check-input" name="pmGender" id="pmMale" checked value="MALE"/> <label for="pmMale" class="form-check-label me-5">MALE</label>
                                  <input type="radio" class="form-check-input" name="pmGender" id="pmFemale" value="FEMALE"/> <label for="pmFemale" class="form-check-label me-5">FEMALE</label>
                              </div>
                          </div>
                        <div class="col-lg-6 col-sm-6 col-12">
                            <label for="pmDob">Date of Birth</label>
                            <input type="text" name="pmDob" id="pmDob" required class="form-control userDatePicker"/>
                            <div id="pmDobErrr"></div>
                        </div>
                      </div>
                      <div id="pmTicketDetails" class="mb-4">
                        <legend class="fs-8">Ticket Details</legend>
                        <div class="row mb-4">
                            <div class="col-lg-4 col-sm-4 col-12">
                                <label for="pmPrice">Price (in &#x20b9;)</label>
                                <input type="number" name="pmPrice" id="pmPrice" class="form-control" required/>
                            </div>
                            <div class="col-lg-4 col-sm-4 col-12">
                                <label for="pmTax">Tax (in &#x20b9;)</label>
                                <input type="number" name="pmTax" id="pmTax" class="form-control" required onchange="checkAmtTax(this.value,this.id,'pm',0,'pmTaxErrr')"/>
                                <div id="pmTaxErrr"></div>
                            </div>
                            <div class="col-lg-4 col-sm-4 col-12">
                                <label for="pmTicket">Ticket No/PNR Number</label>
                                <input type="text" name="pmTicket" id="pmTicket" class="form-control" required/>
                            </div>
                        </div>
                        <div class="row mb-4">
                        <div class="col-lg-6 col-sm-6 col-12">
                            <label for="pmCarrier">Carrier</label>
                            <input type="text" name="pmCarrier" id="pmCarrier" class="form-control" required/>
                        </div>
                    </div>
                    </div>
                        <!--Nominee Details-->
                        <div class="mb-4">
                        <legend class="fs-8">Nominee Details</legend>
                        <div class="row mb-2">
                            <div class="col-lg-2 col-sm-2 col-12">
                                <label for="salutation">Salutation</label>
                                 <select class="form-control" name="salutation" id="salutation" required>
                                                <option value="">Select</option>
                                                    <option>MR</option>
                                                    <option>MRS</option>
                                                    <option>MISS</option>
                                                    <option>SHRI</option>
                                                </select>
                            </div>
                            <div class="col-lg-5 col-sm-5 col-12">
                                                    <label for="firstName">First Name</label>
                                                    <input type="text" name="firstName" id="firstName" required class="form-control"/>
                            </div>
                            <div class="col-lg-5 col-sm-5 col-12">
                                                    <label for="lastName">Last Name</label>
                                                    <input type="text" name="lastName" id="lastName" required class="form-control"/>
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-lg-4 offset-lg-2 col-sm-4 offset-sm-2 col-12">
                                <label for="gender">Gender</label>
                                <select id="gender" class="form-control" required>
                                    <option value="">Select:</option>
                                    <option>MALE</option>
                                    <option>FEMALE</option>
                                </select>
                            </div>
                            <div class="col-lg-4 col-sm-4 col-12">
                                <label for="relationship">Relationship</label>
                                <select id="relationship" class="form-control" required>
                                    <option value="">Select:</option>
                                    <option>Spouse</option>
                                    <option>Self</option>
                                    <option>Father</option>
                                    <option>Mother</option>
                                    <option>Son</option>
                                    <option>Daughter</option>
                                </select>
                            </div>
                        </div>
</div>
                   <div class="row mb-4">
                    <div class="col-lg-12 col-sm-12 col-12 text-center">
                    <button type="button" class="btn btn-warning text-uppercase w-25" id="jumpToStep2Button">Previous</button>
                                     <button type="button" class="btn btn-danger w-25" id="submitFormButton">Submit</button>
</div>
</div>
                 </div>`;
                document.getElementById("tdForm").innerHTML = tdForm;
                updateProgressBar(1);
                showDatePicker('pmDob',birthYear);
            }
            else {
                for (let i = 1; i <= countTraveller; i++) {
                    if (i === 1) {
                        let age = document.getElementById(`agePm`).value;
                        const birthYear = getBirthYearFromAge(age);
                        console.log("Birth Year:", birthYear);
                        tdForm += `
                 <div class="step active" id="step${i}">
                                        <h2>Primary Member (Age: ${age})</h2>
                     <legend class="fs-8">Personal Details</legend>
                      <div class="row mb-4">
                            <div class="col-lg-2 col-sm-2 col-12">
                                                <label for="pmSalutation">Title</label>
                                                <select class="form-control" name="pmSalutation" id="pmSalutation" required>
                                                <option value="">Select</option>
                                                      <option>MR</option>
                                                    <option>MRS</option>
                                                    <option>MISS</option>
                                                    <option>SHRI</option>
                                                </select>
                            </div>
                            <div class="col-lg-5 col-sm-5 col-12">
                                                    <label for="pmFirstName">First Name</label>
                                                    <input type="text" name="pmFirstName" id="pmFirstName" required class="form-control"/>
                            </div>
                            <div class="col-lg-5 col-sm-5 col-12">
                                                    <label for="pmLastName">Last Name</label>
                                                    <input type="text" name="pmLastName" id="pmLastName" required class="form-control"/>
                            </div>
                      </div>
                      <div class="row mb-4">
                        <div class="col-lg-4 col-sm-4 col-12">
                            <label for="pmMobile">Mobile No.</label>
                            <input type="number" name="pmMobile" id="pmMobile" class="form-control" required data-rule-number="true" minlength="10" maxlength="15"/>
                            <div id="pmMobileErr"></div>
                        </div>
                        <div class="col-lg-4 col-sm-4 col-12">
                            <label for="pmEmail">Email Id</label>
                            <input type="email" name="pmEmail" id="pmEmail" class="form-control" required/>
                        </div>
                        <div class="col-lg-4 col-sm-4 col-12">
                            <label for="pmPasssport">Passport No.</label>
                            <input type="text" name="pmPasssport" maxlength="12" minlength="8" id="pmPasssport" class="form-control" required/>
                        </div>
                      </div>
                      <div class="row mb-4">
                       <div class="col-lg-6 col-sm-6 col-12">
                              <label>Gender</label> <br/>
                              <div class="form-check-inline">
                                  <input type="radio" class="form-check-input" name="pmGender" id="pmMale" checked value="MALE"/> <label for="pmMale" class="form-check-label me-5">MALE</label>
                                  <input type="radio" class="form-check-input" name="pmGender" id="pmFemale" value="FEMALE"/> <label for="pmFemale" class="form-check-label me-5">FEMALE</label>
                              </div>
                          </div>
                        <div class="col-lg-6 col-sm-6 col-12">
                            <label for="pmDob">Date of Birth</label>
                            <input type="text" name="pmDob" id="pmDob" class="form-control userDatePicker" required/>
                            <div id="pmDobErr"></div>
                        </div>
                      </div>
                      
                      <div id="pmTicketDetails" >
                    <legend class="fs-8">Ticket Details</legend>
                    <div class="row mb-4">
                        <div class="col-lg-4 col-sm-4 col-12">
                            <label for="pmPrice">Price (in &#x20b9;)</label>
                            <input type="number" name="pmPrice" id="pmPrice" class="form-control" required data-rule-number="true"/>
                        </div>
                        <div class="col-lg-4 col-sm-4 col-12">
                            <label for="pmTax">Tax (in &#x20b9;)</label>
                            <input type="number" name="pmTax" id="pmTax" class="form-control" value="0" required data-rule-number="true" onchange="checkAmtTax(this.value,this.id,'pm',0,'pmTaxErr')"/>
                            <div id="pmTaxErr"></div>
                        </div>
                        <div class="col-lg-4 col-sm-4 col-12">
                            <label for="pmTicket">Ticket No/PNR Number</label>
                            <input type="text" name="pmTicket" id="pmTicket" class="form-control" required/>
                        </div>
                    </div>
                    <div class="row mb-4">
                        <div class="col-lg-6 col-sm-6 col-12">
                            <label for="pmCarrier">Carrier</label>
                            <input type="text" name="pmCarrier" id="pmCarrier" class="form-control" required/>
                        </div>
                    </div>
                    </div>
                    <div class="row mb-4 text-center">
                    <div class="col-lg-12 col-sm-12 col-12 ">
                                        <button type="button" class="btn btn-warning text-uppercase w-25" id="jumpToStep2Button">Previous</button>
                                                                                <button type="button" class="btn btn-danger text-uppercase w-25" onclick='nextStep("step${i}","step${i + 1}")'>Next</button>

</div>

</div>
                                    </div>
                `;

                    }
                    else if (i === countTraveller) {
                        let age = document.getElementById(`ageAm${i}`).value;
                        const birthYear = getBirthYearFromAge(age);
                        console.log("Birth Year:", birthYear);
                        tdForm += `
                 <div class="step" id="step${i}">
                                        <h2> Additonal Member ${i - 1} (Age: ${age})</h2>
                                                            <legend class="fs-8">Personal Details</legend>
                      <div class="row mb-4">
                            <div class="col-lg-2 col-sm-2 col-12">
                                                <label for="amSalutation${i - 1}">Title</label>
                                                <select class="form-control" name="amSalutation${i}" id="amSalutation${i}" required>
                                                <option value="">Select</option>
                                                  <option>MR</option>
                                                    <option>MRS</option>
                                                    <option>MISS</option>
                                                    <option>SHRI</option>
                                                </select>
                            </div>
                            <div class="col-lg-5 col-sm-5 col-12">
                                                    <label for="amFirstName${i}">First Name</label>
                                                    <input type="text" name="amFirstName${i}" id="amFirstName${i}" required class="form-control"/>
                            </div>
                            <div class="col-lg-5 col-sm-5 col-12">
                                                    <label for="amLastName${i}">Last Name</label>
                                                    <input type="text" name="amLastName${i}" id="amLastName${i}" required class="form-control"/>
                            </div>
                      </div>
                      <div class="row mb-4">
                        <div class="col-lg-4 col-sm-4 col-12">
                            <label for="amMobile${i}">Mobile No.</label>
                            <input type="number" name="amMobile${i}" id="amMobile${i}" required class="form-control" minlength="10" maxlength="15" data-rule-number="true"/>
                        </div>
                        <div class="col-lg-4 col-sm-4 col-12">
                            <label for="amEmail${i}">Email Id</label>
                            <input type="email" name="amEmail${i}" id="amEmail${i}" required class="form-control"/>
                        </div>
                        <div class="col-lg-4 col-sm-4 col-12">
                            <label for="amPassport${i}">Passport No.</label>
                            <input type="text" name="amPassport${i}" maxlength="12" minlength="8" id="amPassport${i}" class="form-control"/>
                        </div>
                      </div>
                      <div class="row mb-4">
                       <div class="col-lg-6 col-sm-6 col-12">
                              <label>Gender</label> <br/>
                              <div class="form-check-inline">
                                  <input type="radio" class="form-check-input" name="amGender${i}" id="amMale${i}" checked value="MALE"/> <label for="amMale${i}" class="form-check-label me-5">MALE</label>
                                  <input type="radio" class="form-check-input" name="amGender${i}" id="amFemale${i}" value="FEMALE"/> <label for="amFemale${i}" class="form-check-label me-5">FEMALE</label>
                              </div>
                          </div>
                        <div class="col-lg-6 col-sm-6 col-12">
                            <label for="amDob${i}">Date of Birth</label>
                            <input type="text" name="amDob${i}" id="amDob${i}" class="form-control userDatePicker" required/>
                        <div id="amDobErr${i}"></div>
                        </div>
                      </div>
                    <div id="amTicketDetails${i}" >
                    <legend class="fs-8">Ticket Details</legend>
                    <div class="row mb-4">
                        <div class="col-lg-4 col-sm-4 col-12">
                            <label for="amPrice${i}">Price (in &#x20b9;)</label>
                            <input type="number" name="amPrice${i}" id="amPrice${i}" class="form-control"  required data-rule-number="true"/>
                        </div>
                        <div class="col-lg-4 col-sm-4 col-12">
                            <label for="amTax${i}">Tax (in &#x20b9;)</label>
                            <input type="number" name="amTax${i}" id="amTax${i}" class="form-control" value="0" required data-rule-number="true" onchange="checkAmtTax(this.value,this.id,'am',${i},'amTaxErr${i}')"/>
                            <div id="amTaxErr${i}"></div>
                        </div>
                        <div class="col-lg-4 col-sm-4 col-12">
                            <label for="amTicket${i}">Ticket No/PNR Number</label>
                            <input type="text" name="amTicket${i}" id="amTicket${i}" required class="form-control"/>
                        </div>
                    </div>
                    <div class="row mb-4">
                        <div class="col-lg-6 col-sm-6 col-12">
                            <label for="amCarrier${i}">Carrier</label>
                            <input type="text" name="amCarrier${i}" id="amCarrier${i}" class="form-control" required/>
                        </div>
                    </div>
                    </div>
                    <!--Nominee Details-->
                        <div class="mb-4">
                        <legend class="fs-8">Nominee Details</legend>
                        <div class="row mb-2">
                            <div class="col-lg-4 col-sm-4 col-12">
                                <label for="salutation">Salutation</label>
                                 <select class="form-control" name="salutation" id="salutation" required>
                                                <option value="">Select</option>
                                                    <option>MR</option>
                                                    <option>MRS</option>
                                                    <option>MISS</option>
                                                    <option>SHRI</option>
                                                </select>
                            </div>
                            <div class="col-lg-4 col-sm-4 col-12">
                                                    <label for="firstName">First Name</label>
                                                    <input type="text" name="firstName" id="firstName" required class="form-control"/>
                            </div>
                            <div class="col-lg-4 col-sm-4 col-12">
                                                    <label for="lastName">Last Name</label>
                                                    <input type="text" name="lastName" id="lastName" required class="form-control"/>
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-lg-4 offset-lg-2 col-sm-4 offset-sm-2 col-12">
                                <label for="gender">Gender</label>
                                <select id="gender" class="form-control" required>
                                    <option value="">Select:</option>
                                    <option>MALE</option>
                                    <option>FEMALE</option>
                                </select>
                            </div>
                            <div class="col-lg-4 col-sm-4 col-12">
                                <label for="relationship">Relationship</label>
                                <select id="relationship" class="form-control" required>
                                    <option value="">Select:</option>
                                    <option>Spouse</option>
                                    <option>Self</option>
                                    <option>Father</option>
                                    <option>Mother</option>
                                    <option>Son</option>
                                    <option>Daughter</option>
                                </select>
                            </div>
                        </div>
</div>
                    <div class="row mb-4">
                    <div class="col-lg-12 col-sm-12 col-12 text-center">
               <button type="button" class="btn btn-warning w-25" onclick="prevStep('step${i}', 'step${i - 1}')">Previous</button>

               <button type="button" class="btn btn-danger w-25" id="submitFormButton">Submit </button>
</div>
</div>`;


                    }
                    else {
                        let age = document.getElementById(`ageAm${i}`).value;
                        const birthYear = getBirthYearFromAge(age);
                        console.log("Birth Year:", birthYear);
                        tdForm += `
                        <div class="step" id="step${i}">
                                        <h2>Additional Member ${i - 1} (Age: ${age})</h2>
                                                           <legend class="fs-8">Personal Details</legend>
                      <div class="row mb-4">
                            <div class="col-lg-2 col-sm-2 col-12">
                                                <label for="amSalutation${i}">Title</label>
                                                <select class="form-control" name="amSalutation${i}" id="amSalutation${i}" required>
                                                <option value="">Select</option>
                                                  <option>MR</option>
                                                    <option>MRS</option>
                                                    <option>MISS</option>
                                                    <option>SHRI</option>
                                                </select>
                            </div>
                            <div class="col-lg-5 col-sm-5 col-12">
                                                    <label for="amFirstName${i}">First Name</label>
                                                    <input type="text" name="amFirstName${i}" id="amFirstName${i}" required class="form-control"/>
                            </div>
                            <div class="col-lg-5 col-sm-5 col-12">
                                                    <label for="amLastName${i}">Last Name</label>
                                                    <input type="text" name="amLastName${i}" id="amLastName${i}" required class="form-control"/>
                            </div>
                      </div>
                      <div class="row mb-4">
                        <div class="col-lg-4 col-sm-4 col-12">
                            <label for="amMobile${i}">Mobile No.</label>
                            <input type="text" name="amMobile${i}" id="amMobile${i}" required data-rule-number="true" minlength="10" maxlength="15" class="form-control"/>
                        </div>
                        <div class="col-lg-4 col-sm-4 col-12">
                            <label for="amEmail${i}">Email Id</label>
                            <input type="email" name="amEmail${i}" id="amEmail${i}" required class="form-control"/>
                        </div>
                        <div class="col-lg-4 col-sm-4 col-12">
                            <label for="amPassport${i}">Passport No.</label>
                            <input type="text" name="amPassport${i}" maxlength="12" minlength="8" id="amPassport${i}" required class="form-control"/>
                        </div>
                      </div>
                      <div class="row mb-4">
                       <div class="col-lg-6 col-sm-6 col-12">
                              <label>Gender</label> <br/>
                              <div class="form-check-inline">
                                  <input type="radio" class="form-check-input" name="amGender${i}" id="amMale${i}" checked value="MALE"/> <label for="amMale${i}" class="form-check-label me-5">MALE</label>
                                  <input type="radio" class="form-check-input" name="amGender${i}" id="amFemale${i}" value="FEMALE"/> <label for="amFemale${i}" class="form-check-label me-5">FEMALE</label>
                              </div>
                          </div>
                        <div class="col-lg-6 col-sm-6 col-12">
                            <label for="amDob${i}">Date of Birth</label>
                            <input type="text" name="amDob${i}" id="amDob${i}" class="form-control userDatePicker" required/>
                            <div id="amDobErr${i}"></div>
                        </div>
                      </div>
                     
                      <div id="amTicketDetails${i}" >
                        <legend class="fs-8">Ticket Details</legend>
                        <div class="row mb-4">
                            <div class="col-lg-4 col-sm-4 col-12">
                                <label for="amPrice${i}">Price (in &#x20b9;)</label>
                                <input type="text" name="amPrice${i}" id="amPrice${i}" class="form-control" required data-rule-number="true"/>
                            </div>
                            <div class="col-lg-4 col-sm-4 col-12">
                                <label for="amTax${i}">Tax (in &#x20b9;)</label>
                                <input type="text" name="amTax${i}" id="amTax${i}" class="form-control" value="0" required data-rule-number="true"  onchange="checkAmtTax(this.value,this.id,'am',${i},'amTaxErr${i}')"/>
                                <div id="amTaxErr${i}"></div>
                            </div>
                            <div class="col-lg-4 col-sm-4 col-12">
                                <label for="amTicket${i}">Ticket No/PNR Number</label>
                                <input type="text" name="amTicket${i}" id="amTicket${i}" class="form-control"/>
                            </div>
                        </div>
                        <div class="row mb-4">
                        <div class="col-lg-6 col-sm-6 col-12">
                            <label for="amCarrier${i}">Carrier</label>
                            <input type="text" name="amCarrier${i}" id="amCarrier${i}" class="form-control"/>
                        </div>
                    </div>
                    </div>
                   
                    
                    <div class="row mb-4">
                    <div class="col-lg-12 col-sm-12 col-12">
               <button type="button" class="btn btn-warning text-uppercase w-25" onclick='prevStep("step${i}", "step${i - 1}")'>Previous</button>
                    
                                        <button type="button" class="btn btn-danger text-uppercase w-25" onclick='nextStep("step${i}", "step${i + 1}")'>Next</button>
              
</div>

</div>                   
                                    </div>`;

                    }

                }
                document.getElementById("tdForm").innerHTML = tdForm;
                for (let j = 1; j <= countTraveller; j++) {
                    if(j===1)
                    {
                        let age = document.getElementById(`agePm`).value;
                        const birthYear = getBirthYearFromAge(age);
                        showDatePicker('pmDob',birthYear);
                    }
                    else if(j === countTraveller)
                    {
                        let age = document.getElementById(`ageAm${j}`).value;
                        const birthYear = getBirthYearFromAge(age);
                        showDatePicker(`amDob${j}`,birthYear);
                    }
                    else {
                        let age = document.getElementById(`ageAm${j}`).value;
                        const birthYear = getBirthYearFromAge(age);
                        showDatePicker(`amDob${j}`,birthYear);
                    }
                }
                updateProgressBar(1);

            }
        }

//         if (newIndex === 4) {
//
//             var destination = document.getElementById("destination").value;
//             localStorage.setItem("destination", destination);
//             document.getElementById("destination").value = localStorage.getItem("destination")
//             var dateTimes = document.getElementById("dateTimes").value;
//             document.getElementById("dateTimes").value = dateTimes;
//             var arr = dateTimes.split(" - ");
//             // console.log(arr);
//             localStorage.setItem("startDate", arr[0])
//             localStorage.setItem("endDate", arr[1])
//             var countTravellers = document.getElementById("countTravellers").value;
//             localStorage.setItem("noTravellers", countTravellers);
//             let pmSalutation = document.getElementById("pmSalutation").value;
//             localStorage.setItem("pmSalutation", pmSalutation)
//             document.getElementById("pmSalutation").value = pmSalutation
//             let pmFirstName = document.getElementById("pmFirstName").value;
//             var agePm = document.getElementById(`agePm`).value
//             localStorage.setItem("agePm", agePm)
//             localStorage.setItem("pmFirstName", pmFirstName)
//             document.getElementById("pmFirstName").value = localStorage.getItem("pmFirstName")
//             let pmLastName = document.getElementById("pmLastName").value;
//             localStorage.setItem("pmLastName", pmLastName)
//             document.getElementById("pmLastName").value = localStorage.getItem("pmLastName")
//             let pmMobile = document.getElementById("pmMobile").value;
//             localStorage.setItem("pmMobile", pmMobile);
//             let pmEmail = document.getElementById("pmEmail").value;
//             localStorage.setItem("pmEmail", pmEmail)
//             let pmPassport = document.getElementById("pmPasssport").value;
//             localStorage.setItem("pmPassport", pmPassport);
//             let pmGender = "";
//             let pmMale = document.getElementById("pmMale").checked;
//             if (pmMale === true)
//                 pmGender = "MALE";
//             else pmGender = "FEMALE";
//             localStorage.setItem("pmGender", pmGender);
//             let pmDob = document.getElementById("pmDob").value;
//             localStorage.setItem("pmDob", pmDob)
//             let pmPrice = document.getElementById("pmPrice").value;
//             localStorage.setItem("pmPrice", pmPrice)
//             let pmTax = document.getElementById("pmTax").value;
//             localStorage.setItem("pmTax", pmTax)
//             let pmTicket = document.getElementById("pmTicket").value;
//             localStorage.setItem("pmTicket", pmTicket)
//             let pmCarrier = document.getElementById("pmCarrier").value;
//             localStorage.setItem("pmCarrier", pmCarrier)
//             for (let x = 2; x <= countTravellers; x++) {
//                 let age = document.getElementById(`ageAm${x}`).value;
//                 localStorage.setItem("ageAm" + x, age)
//                 let amSalutation = document.getElementById("amSalutation" + x).value;
//                 localStorage.setItem("amSalutation" + x, amSalutation)
//                 let amFirstName = document.getElementById("amFirstName" + x).value;
//                 localStorage.setItem("amFirstName" + x, amFirstName)
//                 let amLastName = document.getElementById("amLastName" + x).value;
//                 localStorage.setItem("amLastName" + x, amLastName)
//                 let amMobile = document.getElementById("amMobile" + x).value;
//                 localStorage.setItem("amMobile" + x, amMobile)
//                 let amEmail = document.getElementById("amEmail" + x).value;
//                 localStorage.setItem("amEmail" + x, amEmail)
//                 let amPassport = document.getElementById("amPassport" + x).value;
//                 localStorage.setItem("amPassport" + x, amPassport)
//                 let amGender = "";
//                 let amMale = document.getElementById("amMale" + x).checked;
//                 if (amMale === true) {
//                     amGender = "MALE";
//                 } else {
//                     amGender = "FEMALE";
//                 }
//                 localStorage.setItem("amGender" + x, amGender)
//                 let amDob = document.getElementById("amDob" + x).value;
//                 localStorage.setItem("amDob" + x, amDob)
//                 let amPrice = document.getElementById("amPrice" + x).value;
//                 localStorage.setItem("amPrice" + x, amPrice)
//                 let amTax = document.getElementById("amTax" + x).value;
//                 localStorage.setItem("amTax" + x, amTax)
//                 let amTicket = document.getElementById("amTicket" + x).value;
//                 localStorage.setItem("amTicket" + x, amTicket);
//                 let amCarrier = document.getElementById("amCarrier" + x).value;
//                 localStorage.setItem("amCarrier" + x, amCarrier);
//
//             }
//             // nominee details
//             let salutation= document.getElementById("salutation").value;
//             localStorage.setItem("nomineeSalutation",salutation);
//             let firstName= document.getElementById("firstName").value;
//             localStorage.setItem("nomineeFirstName",firstName);
//             let lastName = document.getElementById("lastName").value;
//             localStorage.setItem("nomineeLastName",lastName);
//             let gender = document.getElementById("gender").value;
//             localStorage.setItem("nomineeGender",gender);
//             let relationship = document.getElementById("relationship").value;
//             localStorage.setItem("nomineeRelation",relationship);
//
//             var totalAmount = document.getElementById("totalAmount").value;
//             localStorage.setItem("totalAmount", totalAmount);
//             let lastStep = `<div class='container'>
//                 <div class="card card-preview">
//                     <div class="card-title border-secondary border-bottom border-2">
//
//                         <div class="row mb-2 text-center">
//                                 <div class="col-lg-6 col-sm-6 col-12">
//                                 <h3 class="mb-3">Total Amount :</h3>
//
//                                 </div>
//                                 <div class="col-lg-6 col-sm-6 col-6 ">
//                                     <h3 id="finalAmt" >&#x20b9; ${localStorage.getItem("totalAmount")} </h3>
//                                 </div>
//
//                         </div>
//                         <div class="row mb-2 text-center">
//                                 <div class="col-lg-6 col-sm-6 col-12">
//                                     <h3>Destination : </h3>
//                                 </div>
//                                 <div class="col-lg-6 col-sm-6 col-12">
//                                     <h3> ${localStorage.getItem('destination')}</h3>
//                                 </div>
//                         </div>
//
//                         <div class="row mb-2 text-center">
//                                 <div class="col-lg-6 col-sm-6 col-6"><h3>Trip Date :</h3></div>
//                                 <div class="col-lg-6 col-sm-6 col-6"><h3>${localStorage.getItem("startDate")} - ${localStorage.getItem("endDate")}</h3></div>
//                             </div>
//
//                         <div class="row mb-2 text-center">
//                             <div class="col-lg-6 col-sm-6 col-6"><h3>No. of Travellers</h3></div>
//                             <div class="col-lg-6 col-sm-6 col-6"><h3>${localStorage.getItem("noTravellers")}</h3></div>
//                         </div>
//                     </div>
//                     <div class="card-body"><div class="row mb-2">`;
//             let noT = parseInt(localStorage.getItem("noTravellers"));
//             if (noT === 1) {
//                 lastStep += `<div class="table-responsive">
// <div class="col-lg-12 col-sm-12 col-12">
// <fieldset>
//                                 <legend class="ps-5"><i class="fa fa-arrow-alt-circle-right"></i> Primary Member </legend>
//                             </fieldset>
//     <table class="table fs-8 w-full">
//     <tr  class="text-center">
//     <th colspan="2" class="alert alert-dark fs-5 text-center">Personal Details</th>
//     <th colspan="2" class="alert alert-dark fs-5 text-center">Ticket Details</th>
// </tr>
//     <tr class="text-center">
//         <th class="text-center">Name: </th>
//         <td class="text-lg-start text-md-start">${localStorage.getItem("pmSalutation") + " " + localStorage.getItem("pmFirstName") + " " + localStorage.getItem("pmLastName")}, ${localStorage.getItem("pmGender")}</td>
//     <th class="text-center">Ticket Price: </th>
//         <td class="text-lg-start text-md-start">&#x20b9; ${localStorage.getItem("pmPrice")}</td>
//     </tr>
//     <tr class="text-center">
//         <th class="text-center">Date of Birth & Age: </th>
//         <td class="text-lg-start text-md-start">${localStorage.getItem("pmDob")} (${localStorage.getItem("agePm")})</td>
//     <th class="text-center">Tax: </th>
//         <td class="text-lg-start text-md-start">&#x20b9; ${localStorage.getItem("pmTax")}</td>
//     </tr>
//     <tr class="text-center">
//         <th class="text-center">Contact No.: </th>
//         <td class="text-lg-start text-md-start">${localStorage.getItem("pmMobile")}</td>
//     <th class="text-center">Ticket No.: </th>
//         <td class="text-lg-start text-md-start"> ${localStorage.getItem("pmTicket")}</td>
//     </tr>
//     <tr class="text-center">
//         <th class="text-center">Email Id: </th>
//         <td class="text-lg-start text-md-start">${localStorage.getItem("pmEmail")}</td>
//     <th class="text-center">Carrier: </th>
//         <td class="text-lg-start text-md-start"> ${localStorage.getItem("pmCarrier")}</td>
//     </tr>
//
// </table>
// </div></div>`;
//             }
//             else {
//                 lastStep += `
//
// <div class="col-lg-12 col-sm-12 col-12">
// <fieldset>
//                                 <legend class="ps-5"><i class="fa fa-arrow-alt-circle-right"></i> Primary Member </legend>
//                             </fieldset>
//                             <div class="table-responsive">
//     <table class="table fs-8 w-full">
//     <tr>
//     <th colspan="2" class="text-center fs-5">Personal Details</th>
//     <th colspan="2" class="text-center fs-5">Ticket Details</th>
//
// </tr>
//     <tr>
//         <th class="text-center">Name: </th>
//         <td class="text-lg-start text-md-start">${localStorage.getItem("pmSalutation") + " " + localStorage.getItem("pmFirstName") + " " + localStorage.getItem("pmLastName")}, ${localStorage.getItem("pmGender")}</td>
//     <th class="text-center">Ticket Price: </th>
//         <td class="text-lg-start text-md-start">&#x20b9; ${localStorage.getItem("pmPrice")}</td>
//     </tr>
//     <tr>
//         <th class="text-center">Date of Birth & Age: </th>
//         <td class="text-lg-start text-md-start">${localStorage.getItem("pmDob")} (${localStorage.getItem("agePm")})</td>
//     <th class="text-center">Tax: </th>
//         <td class="text-lg-start text-md-start">&#x20b9; ${localStorage.getItem("pmTax")}</td>
//     </tr>
//     <tr>
//         <th class="text-center">Contact No.: </th>
//         <td class="text-lg-start text-md-start">${localStorage.getItem("pmMobile")}</td>
//     <th class="text-center">Ticket No.: </th>
//         <td class="text-lg-start text-md-start">${localStorage.getItem("pmTicket")}</td>
//     </tr>
//     <tr>
//         <th class="text-center">Email Id: </th>
//         <td class="text-lg-start text-md-start">${localStorage.getItem("pmEmail")}</td>
//     <th class="text-center">Carrier: </th>
//         <td class="text-lg-start text-md-start"> ${localStorage.getItem("pmCarrier")}</td>
//     </tr>
//
// </table>
// </div>
// </div>`
//                 for (let x = 2; x <= countTravellers; x++) {
//                     lastStep += `
// <div class="col-lg-12 col-sm-12 col-12">
// <fieldset>
//                                 <legend class="ps-5"><i class="fa fa-arrow-alt-circle-right"></i> Additional Member ${x - 1} </legend>
//                             </fieldset>
//                             <div class="table-responsive">
//     <table class="table fs-8 w-full">
//     <tr>
//     <th colspan="2" class="text-center fs-5">Personal Details</th>
//     <th colspan="2" class="text-center fs-5">Ticket Details</th>
//
// </tr>
//     <tr>
//         <th class="text-center">Name: </th>
//         <td class="text-lg-start text-md-start">${localStorage.getItem("amSalutation" + x) + " " + localStorage.getItem("amFirstName" + x) + " " + localStorage.getItem("amLastName" + x)}, ${localStorage.getItem("amGender" + x)}</td>
//     <th class="text-center">Ticket Price: </th>
//         <td class="text-lg-start text-md-start">&#x20b9; ${localStorage.getItem("amPrice" + x)}</td>
//     </tr>
//     <tr>
//         <th class="text-center">Date of Birth & Age: </th>
//         <td class="text-lg-start text-md-start">${localStorage.getItem("amDob" + x)} (${localStorage.getItem("ageAm" + x)})</td>
//     <th class="text-center">Tax: </th>
//         <td class="text-lg-start text-md-start">&#x20b9; ${localStorage.getItem("amTax" + x)}</td>
//     </tr>
//     <tr>
//         <th class="text-center">Contact No.: </th>
//         <td class="text-lg-start text-md-start">${localStorage.getItem("amMobile" + x)}</td>
//     <th class="text-center">Ticket No.: </th>
//         <td class="text-lg-start text-md-start"> ${localStorage.getItem("amTicket" + x)}</td>
//     </tr>
//     <tr>
//         <th class="text-center">Email Id: </th>
//         <td class="text-lg-start text-md-start">${localStorage.getItem("amEmail" + x)}</td>
//         <th class="text-center">Carrier: </th>
//         <td class="text-lg-start text-md-start"> ${localStorage.getItem("amCarrier" + x)}</td>
//     </tr>
//
// </table>
// </div>
// </div>`
//                 }
//             }
//             lastStep += `</div>
//                 <div class="row mb-2">
//                 <fieldset>
//                                 <legend class="ps-5"><i class="fa fa-arrow-alt-circle-right"></i> Nominee Details </legend>
//                             </fieldset>
//                             <div class="col-lg-12 col-sm-12 col-12">
//                             <table class="table">
//                             <tr>
//                             <th class="text-end">Name : </th>
//                             <td>${localStorage.getItem('nomineeSalutation')+' '+localStorage.getItem('nomineeFirstName')+' '+localStorage.getItem('nomineeLastName')}</td>
// </tr>
// <tr>
// <th class="text-end">Gender:</th><td>${localStorage.getItem('nomineeGender')}</td>
// </tr>
// <tr>
// <th class="text-end">Relationship</th>
// <td>${localStorage.getItem('nomineeRelation')}</td>
// </tr>
// </table>
// </div>
//            </div>
// </div></div>`
//             document.getElementById("lastStep").innerHTML = lastStep;
//         }

if(newIndex === 5) {
    $('.actions a[href="#previous"]').show();

                var destination = document.getElementById("destination").value;
            localStorage.setItem("destination", destination);
            document.getElementById("destination").value = localStorage.getItem("destination")
            var dateTimes = document.getElementById("dateTimes").value;
            document.getElementById("dateTimes").value = dateTimes;
            var arr = dateTimes.split(" - ");
            // console.log(arr);
            localStorage.setItem("startDate", arr[0])
            localStorage.setItem("endDate", arr[1])
            var countTravellers = document.getElementById("countTravellers").value;
            localStorage.setItem("noTravellers", countTravellers);
            let pmSalutation = document.getElementById("pmSalutation").value;
            localStorage.setItem("pmSalutation", pmSalutation)
            document.getElementById("pmSalutation").value = pmSalutation
            let pmFirstName = document.getElementById("pmFirstName").value;
            var agePm = document.getElementById(`agePm`).value
            localStorage.setItem("agePm", agePm)
            localStorage.setItem("pmFirstName", pmFirstName)
            document.getElementById("pmFirstName").value = localStorage.getItem("pmFirstName")
            let pmLastName = document.getElementById("pmLastName").value;
            localStorage.setItem("pmLastName", pmLastName)
            document.getElementById("pmLastName").value = localStorage.getItem("pmLastName")
            let pmMobile = document.getElementById("pmMobile").value;
            localStorage.setItem("pmMobile", pmMobile);
            let pmEmail = document.getElementById("pmEmail").value;
            localStorage.setItem("pmEmail", pmEmail)
            let pmPassport = document.getElementById("pmPasssport").value;
            localStorage.setItem("pmPassport", pmPassport);
            let pmGender = "";
            let pmMale = document.getElementById("pmMale").checked;
            if (pmMale === true)
                pmGender = "MALE";
            else pmGender = "FEMALE";
            localStorage.setItem("pmGender", pmGender);
            let pmDob = document.getElementById("pmDob").value;
            localStorage.setItem("pmDob", pmDob)
            let pmPrice = document.getElementById("pmPrice").value;
            localStorage.setItem("pmPrice", pmPrice)
            let pmTax = document.getElementById("pmTax").value;
            localStorage.setItem("pmTax", pmTax)
            let pmTicket = document.getElementById("pmTicket").value;
            localStorage.setItem("pmTicket", pmTicket)
            let pmCarrier = document.getElementById("pmCarrier").value;
            localStorage.setItem("pmCarrier", pmCarrier)
            for (let x = 2; x <= countTravellers; x++) {
                let age = document.getElementById(`ageAm${x}`).value;
                localStorage.setItem("ageAm" + x, age)
                let amSalutation = document.getElementById("amSalutation" + x).value;
                localStorage.setItem("amSalutation" + x, amSalutation)
                let amFirstName = document.getElementById("amFirstName" + x).value;
                localStorage.setItem("amFirstName" + x, amFirstName)
                let amLastName = document.getElementById("amLastName" + x).value;
                localStorage.setItem("amLastName" + x, amLastName)
                let amMobile = document.getElementById("amMobile" + x).value;
                localStorage.setItem("amMobile" + x, amMobile)
                let amEmail = document.getElementById("amEmail" + x).value;
                localStorage.setItem("amEmail" + x, amEmail)
                let amPassport = document.getElementById("amPassport" + x).value;
                localStorage.setItem("amPassport" + x, amPassport)
                let amGender = "";
                let amMale = document.getElementById("amMale" + x).checked;
                if (amMale === true) {
                    amGender = "MALE";
                } else {
                    amGender = "FEMALE";
                }
                localStorage.setItem("amGender" + x, amGender)
                let amDob = document.getElementById("amDob" + x).value;
                localStorage.setItem("amDob" + x, amDob)
                let amPrice = document.getElementById("amPrice" + x).value;
                localStorage.setItem("amPrice" + x, amPrice)
                let amTax = document.getElementById("amTax" + x).value;
                localStorage.setItem("amTax" + x, amTax)
                let amTicket = document.getElementById("amTicket" + x).value;
                localStorage.setItem("amTicket" + x, amTicket);
                let amCarrier = document.getElementById("amCarrier" + x).value;
                localStorage.setItem("amCarrier" + x, amCarrier);

            }
            // nominee details
            let salutation= document.getElementById("salutation").value;
            localStorage.setItem("nomineeSalutation",salutation);
            let firstName= document.getElementById("firstName").value;
            localStorage.setItem("nomineeFirstName",firstName);
            let lastName = document.getElementById("lastName").value;
            localStorage.setItem("nomineeLastName",lastName);
            let gender = document.getElementById("gender").value;
            localStorage.setItem("nomineeGender",gender);
            let relationship = document.getElementById("relationship").value;
            localStorage.setItem("nomineeRelation",relationship);

 //lastStep
 let lastStep = `<div class='container'>
 <div class="card card-preview">
     <div class="card-title border-secondary border-bottom border-2">

         <div class="row mb-2 text-center">
                 <div class="col-lg-6 col-sm-6 col-12">
                 <h3 class="mb-3">Total Amount :</h3>

                 </div>
                 <div class="col-lg-6 col-sm-6 col-6 ">
                     <h3 id="finalAmt" >&#x20b9; ${localStorage.getItem("totalAmount")} </h3>
                 </div>

         </div>
         <div class="row mb-2 text-center">
                 <div class="col-lg-6 col-sm-6 col-12">
                     <h3>Destination : </h3>
                 </div>
                 <div class="col-lg-6 col-sm-6 col-12">
                     <h3> ${localStorage.getItem('destination')}</h3>
                 </div>
         </div>

         <div class="row mb-2 text-center">
                 <div class="col-lg-6 col-sm-6 col-6"><h3>Trip Date :</h3></div>
                 <div class="col-lg-6 col-sm-6 col-6"><h3>${localStorage.getItem("startDate")} - ${localStorage.getItem("endDate")}</h3></div>
             </div>

         <div class="row mb-2 text-center">
             <div class="col-lg-6 col-sm-6 col-6"><h3>No. of Travellers</h3></div>
             <div class="col-lg-6 col-sm-6 col-6"><h3>${localStorage.getItem("noTravellers")}</h3></div>
         </div>
     </div>
     <div class="card-body"><div class="row mb-2">`;
let noT = parseInt(localStorage.getItem("noTravellers"));
if (noT === 1) {
 lastStep += `<div class="table-responsive">
<div class="col-lg-12 col-sm-12 col-12">
<fieldset>
                 <legend class="ps-5"><i class="fa fa-arrow-alt-circle-right"></i> Primary Member </legend>
             </fieldset>
<table class="table fs-8 w-full">
<tr  class="text-center">
<th colspan="2" class="alert alert-dark fs-5 text-center">Personal Details</th>
<th colspan="2" class="alert alert-dark fs-5 text-center">Ticket Details</th>
</tr>
<tr class="text-center">
<th class="text-center">Name: </th>
<td class="text-lg-start text-md-start">${localStorage.getItem("pmSalutation") + " " + localStorage.getItem("pmFirstName") + " " + localStorage.getItem("pmLastName")}, ${localStorage.getItem("pmGender")}</td>
<th class="text-center">Ticket Price: </th>
<td class="text-lg-start text-md-start">&#x20b9; ${localStorage.getItem("pmPrice")}</td>
</tr>
<tr class="text-center">
<th class="text-center">Date of Birth & Age: </th>
<td class="text-lg-start text-md-start">${localStorage.getItem("pmDob")} (${localStorage.getItem("agePm")})</td>
<th class="text-center">Tax: </th>
<td class="text-lg-start text-md-start">&#x20b9; ${localStorage.getItem("pmTax")}</td>
</tr>
<tr class="text-center">
<th class="text-center">Contact No.: </th>
<td class="text-lg-start text-md-start">${localStorage.getItem("pmMobile")}</td>
<th class="text-center">Ticket No.: </th>
<td class="text-lg-start text-md-start"> ${localStorage.getItem("pmTicket")}</td>
</tr>
<tr class="text-center">
<th class="text-center">Email Id: </th>
<td class="text-lg-start text-md-start">${localStorage.getItem("pmEmail")}</td>
<th class="text-center">Carrier: </th>
<td class="text-lg-start text-md-start"> ${localStorage.getItem("pmCarrier")}</td>
</tr>

</table>
</div></div>`;
}
else {
 lastStep += `

<div class="col-lg-12 col-sm-12 col-12">
<fieldset>
                 <legend class="ps-5"><i class="fa fa-arrow-alt-circle-right"></i> Primary Member </legend>
             </fieldset>
             <div class="table-responsive">
<table class="table fs-8 w-full">
<tr>
<th colspan="2" class="text-center fs-5">Personal Details</th>
<th colspan="2" class="text-center fs-5">Ticket Details</th>

</tr>
<tr>
<th class="text-center">Name: </th>
<td class="text-lg-start text-md-start">${localStorage.getItem("pmSalutation") + " " + localStorage.getItem("pmFirstName") + " " + localStorage.getItem("pmLastName")}, ${localStorage.getItem("pmGender")}</td>
<th class="text-center">Ticket Price: </th>
<td class="text-lg-start text-md-start">&#x20b9; ${localStorage.getItem("pmPrice")}</td>
</tr>
<tr>
<th class="text-center">Date of Birth & Age: </th>
<td class="text-lg-start text-md-start">${localStorage.getItem("pmDob")} (${localStorage.getItem("agePm")})</td>
<th class="text-center">Tax: </th>
<td class="text-lg-start text-md-start">&#x20b9; ${localStorage.getItem("pmTax")}</td>
</tr>
<tr>
<th class="text-center">Contact No.: </th>
<td class="text-lg-start text-md-start">${localStorage.getItem("pmMobile")}</td>
<th class="text-center">Ticket No.: </th>
<td class="text-lg-start text-md-start">${localStorage.getItem("pmTicket")}</td>
</tr>
<tr>
<th class="text-center">Email Id: </th>
<td class="text-lg-start text-md-start">${localStorage.getItem("pmEmail")}</td>
<th class="text-center">Carrier: </th>
<td class="text-lg-start text-md-start"> ${localStorage.getItem("pmCarrier")}</td>
</tr>

</table>
</div>
</div>`
 for (let x = 2; x <= countTravellers; x++) {
     lastStep += `
<div class="col-lg-12 col-sm-12 col-12">
<fieldset>
                 <legend class="ps-5"><i class="fa fa-arrow-alt-circle-right"></i> Additional Member ${x - 1} </legend>
             </fieldset>
             <div class="table-responsive">
<table class="table fs-8 w-full">
<tr>
<th colspan="2" class="text-center fs-5">Personal Details</th>
<th colspan="2" class="text-center fs-5">Ticket Details</th>

</tr>
<tr>
<th class="text-center">Name: </th>
<td class="text-lg-start text-md-start">${localStorage.getItem("amSalutation" + x) + " " + localStorage.getItem("amFirstName" + x) + " " + localStorage.getItem("amLastName" + x)}, ${localStorage.getItem("amGender" + x)}</td>
<th class="text-center">Ticket Price: </th>
<td class="text-lg-start text-md-start">&#x20b9; ${localStorage.getItem("amPrice" + x)}</td>
</tr>
<tr>
<th class="text-center">Date of Birth & Age: </th>
<td class="text-lg-start text-md-start">${localStorage.getItem("amDob" + x)} (${localStorage.getItem("ageAm" + x)})</td>
<th class="text-center">Tax: </th>
<td class="text-lg-start text-md-start">&#x20b9; ${localStorage.getItem("amTax" + x)}</td>
</tr>
<tr>
<th class="text-center">Contact No.: </th>
<td class="text-lg-start text-md-start">${localStorage.getItem("amMobile" + x)}</td>
<th class="text-center">Ticket No.: </th>
<td class="text-lg-start text-md-start"> ${localStorage.getItem("amTicket" + x)}</td>
</tr>
<tr>
<th class="text-center">Email Id: </th>
<td class="text-lg-start text-md-start">${localStorage.getItem("amEmail" + x)}</td>
<th class="text-center">Carrier: </th>
<td class="text-lg-start text-md-start"> ${localStorage.getItem("amCarrier" + x)}</td>
</tr>

</table>
</div>
</div>`
 }
}
lastStep += `</div>
 <div class="row mb-2">
 <fieldset>
                 <legend class="ps-5"><i class="fa fa-arrow-alt-circle-right"></i> Nominee Details </legend>
             </fieldset>
             <div class="col-lg-12 col-sm-12 col-12">
             <table class="table">
             <tr>
             <th class="text-end">Name : </th>
             <td>${localStorage.getItem('nomineeSalutation')+' '+localStorage.getItem('nomineeFirstName')+' '+localStorage.getItem('nomineeLastName')}</td>
</tr>
<tr>
<th class="text-end">Gender:</th><td>${localStorage.getItem('nomineeGender')}</td>
</tr>
<tr>
<th class="text-end">Relationship</th>
<td>${localStorage.getItem('nomineeRelation')}</td>
</tr>
</table>
</div>
</div>
</div></div>`
 document.getElementById("lastStep").innerHTML = lastStep;

}
        if (form.length === 1) {
            form.validate().settings.ignore = ":disabled,:hidden";
            return form.valid();
        }
        return true;
    },
    onFinishing: function (event, currentIndex) {

        let form = $('.body.current form');
        if (form.length === 1) {
            form.validate().settings.ignore = ":disabled";
            return form.valid();
        }
        return true;
    },
    onFinished: function (event, currentIndex) {
        $('#staticBackdrop').modal('show');
        Swal.fire({
            title: "Are you sure to proceed?",
            html:"You won't be able to revert back once forward to next step.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Proceed"
        }).then((result) => {
            if (result.isConfirmed) {
                var currentDate = new Date();
                // Get the current date and time
                var currentYear = currentDate.getFullYear();
                var currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1
                var currentDay = currentDate.getDate();
                var currentHour = currentDate.getHours();
                var currentMinute = currentDate.getMinutes();
                var currentSecond = currentDate.getSeconds();
                let am_pm = '';
                if (currentHour > 12)
                    am_pm = "PM"
                else
                    am_pm = "AM"
                let bookDT = `${currentYear + "/" + currentMonth + "/" + currentDay}`
                // console.log(bookDT);
                let policyName;
                let fd = new FormData();
                let destination = (localStorage.getItem('destination')).toUpperCase();
                let sDate = localStorage.getItem("startDate");
                let eDate = localStorage.getItem("endDate");
                let noDays = document.getElementById("tripNoDays").innerHTML;
                // console.log(eDate)
                let totalAmt = localStorage.getItem("totalAmount");
                let noT = localStorage.getItem("noTravellers");
                let journeyType = ``;
                if (destination !== "INDIA") {
                    journeyType = "INTERNATIONAL"
                    policyName = "AffinityTravelTravelDealOnlinePolicyIntl";
                } else {
                    journeyType = "DOMESTIC"
                    policyName = "AffinityTravelTravelDealOnlinePolicy";
                }
                let agentEmail = localStorage.getItem('agentEmail');
                fd.append("bookDT",bookDT);
                fd.append("agentEmail", agentEmail);
                fd.append("destination", destination);
                fd.append("sDate", sDate);
                fd.append("eDate", eDate);
                fd.append("totalAmount", totalAmt);
                fd.append("noT", noT);
                fd.append("journeyType", journeyType);
                fd.append("noDays", noDays);
                console.log("No. of Days ----------->"+ noDays)
                localStorage.setItem("noDays",noDays);
                fd.append("policyName", policyName);
                let pmSalutation = localStorage.getItem("pmSalutation")
                let pmFirstName = localStorage.getItem("pmFirstName")
                let pmLastName = localStorage.getItem("pmLastName")
                let pmDob = localStorage.getItem("pmDob")
                let pmMobile = localStorage.getItem("pmMobile")
                let pmEmail = localStorage.getItem("pmEmail")
                let pmPassport = localStorage.getItem("pmPassport")
                let pmGender = localStorage.getItem("pmGender")
                let pmPrice = localStorage.getItem("pmPrice")
                let pmTax = localStorage.getItem("pmTax")
                let pmTicket = localStorage.getItem("pmTicket")
                let pmAge = localStorage.getItem("agePm");
                let pmCarrier = localStorage.getItem("pmCarrier")
                fd.append("pmSalutation", pmSalutation)
                fd.append("pmFirstName", pmFirstName)
                fd.append("pmLastName", pmLastName)
                fd.append("pmDob", pmDob)
                fd.append("pmMobile", pmMobile)
                fd.append("pmEmail", pmEmail)
                fd.append("pmPassport", pmPassport)
                fd.append("pmGender", pmGender)
                fd.append("pmPrice", pmPrice)
                fd.append("pmTax", pmTax)
                fd.append("pmTicket", pmTicket)
                fd.append("pmAge", pmAge)
                fd.append("pmCarrier", pmCarrier)
                if (noT > 1) {
                    for (let x = 2; x <= noT; x++) {
                        let amSalutation = localStorage.getItem("amSalutation" + x)
                        let amFirstName = localStorage.getItem("amFirstName" + x)
                        let amLastName = localStorage.getItem("amLastName" + x)
                        let amDob = localStorage.getItem("amDob" + x)
                        let amMobile = localStorage.getItem("amMobile" + x)
                        let amEmail = localStorage.getItem("amEmail" + x)
                        let amPassport = localStorage.getItem("amPassport" + x)
                        let amGender = localStorage.getItem("amGender" + x)
                        let amPrice = localStorage.getItem("amPrice" + x)
                        let amTax = localStorage.getItem("amTax" + x)
                        let amTicket = localStorage.getItem("amTicket" + x)
                        let amAge = localStorage.getItem("ageAm" + x);
                        let amCarrier = localStorage.getItem("amCarrier" + x)
                        fd.append("amSalutation" + x, amSalutation)
                        fd.append("amFirstName" + x, amFirstName)
                        fd.append("amLastName" + x, amLastName)
                        fd.append("amDob" + x, amDob)
                        fd.append("amMobile" + x, amMobile)
                        fd.append("amEmail" + x, amEmail)
                        fd.append("amPassport" + x, amPassport)
                        fd.append("amGender" + x, amGender)
                        fd.append("amPrice" + x, amPrice)
                        fd.append("amTax" + x, amTax)
                        fd.append("amTicket" + x, amTicket)
                        fd.append("amAge" + x, amAge)
                        fd.append("amCarrier" + x, amCarrier)
                    }
                }
                let salutation= localStorage.getItem('nomineeSalutation');
                let firstName = localStorage.getItem('nomineeFirstName');
                let lastName = localStorage.getItem('nomineeLastName');
                let gender = localStorage.getItem('nomineeGender');
                let relation = localStorage.getItem('nomineeRelation');
                let sumInsured = localStorage.getItem("sumAssured");
                fd.append('nomineeSalutation',salutation)
                fd.append('nomineeFirstName',firstName)
                fd.append('nomineeLastName',lastName)
                fd.append('nomineeGender',gender)
                fd.append('nomineeRelation',relation)
                fd.append("sumInsured",sumInsured)
                fetch("/insertInsurance", {
                    method: "post", body: fd
                })
                    .then(res => {
                        // alert(res);
                        return res.json();
                    }).then(val => {
                    // alert(val.message);
                    // console.log(val.message);
                    if (val.error === false) {
                        let id=val.id;
                        window.location.href = "/agent/checkout/"+id;
                    } else {
                        $('#staticBackdrop').modal('hide');
                        Swal.fire({
                            icon: 'error',
                            title: "Error Occurred!!"
                        })
                    }
                })
            } else {
                $('.actions a[href="#previous"]').hide();
                $('#staticBackdrop').modal('hide');
            }
        });
    }
});

function finished()
{

    $('#staticBackdrop').modal('show');
    Swal.fire({
        title: "Are you sure to proceed?",
        html:"You won't be able to revert back once forward to next step.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Proceed"
    }).then((result) => {
        if (result.isConfirmed) {
            var currentDate = new Date();
            // Get the current date and time
            var currentYear = currentDate.getFullYear();
            var currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1
            var currentDay = currentDate.getDate();
            var currentHour = currentDate.getHours();
            var currentMinute = currentDate.getMinutes();
            var currentSecond = currentDate.getSeconds();
            let am_pm = '';
            if (currentHour > 12)
                am_pm = "PM"
            else
                am_pm = "AM"
            let bookDT = `${currentYear + "/" + currentMonth + "/" + currentDay}`
            // console.log(bookDT);
            let policyName;
            let fd = new FormData();
            let destination = (localStorage.getItem('destination')).toUpperCase();
            let sDate = localStorage.getItem("startDate");
            let eDate = localStorage.getItem("endDate");
            let noDays = document.getElementById("tripNoDays").innerHTML;
            // console.log(eDate)
            let totalAmt = localStorage.getItem("totalAmount");
            let noT = localStorage.getItem("noTravellers");
            let journeyType = ``;
            if (destination !== "INDIA") {
                journeyType = "INTERNATIONAL"
                policyName = "AffinityTravelTravelDealOnlinePolicyIntl";
            } else {
                journeyType = "DOMESTIC"
                policyName = "AffinityTravelTravelDealOnlinePolicy";
            }
            let agentEmail = localStorage.getItem('agentEmail');
            fd.append("bookDT",bookDT);
            fd.append("agentEmail", agentEmail);
            fd.append("destination", destination);
            fd.append("sDate", sDate);
            fd.append("eDate", eDate);
            fd.append("totalAmount", totalAmt);
            fd.append("noT", noT);
            fd.append("journeyType", journeyType);
            fd.append("noDays", noDays);
            console.log("No. of Days ----------->"+ noDays)
            localStorage.setItem("noDays",noDays);
            fd.append("policyName", policyName);
            let pmSalutation = localStorage.getItem("pmSalutation")
            let pmFirstName = localStorage.getItem("pmFirstName")
            let pmLastName = localStorage.getItem("pmLastName")
            let pmDob = localStorage.getItem("pmDob")
            let pmMobile = localStorage.getItem("pmMobile")
            let pmEmail = localStorage.getItem("pmEmail")
            let pmPassport = localStorage.getItem("pmPassport")
            let pmGender = localStorage.getItem("pmGender")
            let pmPrice = localStorage.getItem("pmPrice")
            let pmTax = localStorage.getItem("pmTax")
            let pmTicket = localStorage.getItem("pmTicket")
            let pmAge = localStorage.getItem("agePm");
            let pmCarrier = localStorage.getItem("pmCarrier")
            fd.append("pmSalutation", pmSalutation)
            fd.append("pmFirstName", pmFirstName)
            fd.append("pmLastName", pmLastName)
            fd.append("pmDob", pmDob)
            fd.append("pmMobile", pmMobile)
            fd.append("pmEmail", pmEmail)
            fd.append("pmPassport", pmPassport)
            fd.append("pmGender", pmGender)
            fd.append("pmPrice", pmPrice)
            fd.append("pmTax", pmTax)
            fd.append("pmTicket", pmTicket)
            fd.append("pmAge", pmAge)
            fd.append("pmCarrier", pmCarrier)
            if (noT > 1) {
                for (let x = 2; x <= noT; x++) {
                    let amSalutation = localStorage.getItem("amSalutation" + x)
                    let amFirstName = localStorage.getItem("amFirstName" + x)
                    let amLastName = localStorage.getItem("amLastName" + x)
                    let amDob = localStorage.getItem("amDob" + x)
                    let amMobile = localStorage.getItem("amMobile" + x)
                    let amEmail = localStorage.getItem("amEmail" + x)
                    let amPassport = localStorage.getItem("amPassport" + x)
                    let amGender = localStorage.getItem("amGender" + x)
                    let amPrice = localStorage.getItem("amPrice" + x)
                    let amTax = localStorage.getItem("amTax" + x)
                    let amTicket = localStorage.getItem("amTicket" + x)
                    let amAge = localStorage.getItem("ageAm" + x);
                    let amCarrier = localStorage.getItem("amCarrier" + x)
                    fd.append("amSalutation" + x, amSalutation)
                    fd.append("amFirstName" + x, amFirstName)
                    fd.append("amLastName" + x, amLastName)
                    fd.append("amDob" + x, amDob)
                    fd.append("amMobile" + x, amMobile)
                    fd.append("amEmail" + x, amEmail)
                    fd.append("amPassport" + x, amPassport)
                    fd.append("amGender" + x, amGender)
                    fd.append("amPrice" + x, amPrice)
                    fd.append("amTax" + x, amTax)
                    fd.append("amTicket" + x, amTicket)
                    fd.append("amAge" + x, amAge)
                    fd.append("amCarrier" + x, amCarrier)
                }
            }
            let salutation= localStorage.getItem('nomineeSalutation');
            let firstName = localStorage.getItem('nomineeFirstName');
            let lastName = localStorage.getItem('nomineeLastName');
            let gender = localStorage.getItem('nomineeGender');
            let relation = localStorage.getItem('nomineeRelation');
            let sumInsured = localStorage.getItem("sumAssured");
            fd.append('nomineeSalutation',salutation)
            fd.append('nomineeFirstName',firstName)
            fd.append('nomineeLastName',lastName)
            fd.append('nomineeGender',gender)
            fd.append('nomineeRelation',relation)
            fd.append("sumInsured",sumInsured)
            fetch("/insertInsurance", {
                method: "post", body: fd
            })
                .then(res => {
                    // alert(res);
                    return res.json();
                }).then(val => {
                // alert(val.message);
                // console.log(val.message);
                if (val.error === false) {
                    let id=val.id;
                    window.location.href = "/agent/checkout/"+id;
                } else {
                    $('#staticBackdrop').modal('hide');
                    Swal.fire({
                        icon: 'error',
                        title: "Error Occurred!!"
                    })
                }
            })
        } else {
            $('.actions a[href="#previous"]').hide();
            $('#staticBackdrop').modal('hide');
        }
    });
}
function createInsuranceData() {
    const tx = new Date().getTime().toString();
    // Create a new Date object
    var currentDate = new Date();
    // Get the current date and time
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1
    var currentDay = currentDate.getDate();
    var currentHour = currentDate.getHours();
    var currentMinute = currentDate.getMinutes();
    var currentSecond = currentDate.getSeconds();
    let am_pm = '';
    if (currentHour > 12)
        am_pm = "PM"
    else
        am_pm = "AM"
    let bookDT = `${currentDay + "/" + currentMonth + "/" + currentYear}, ${currentHour + ":" + currentMinute + ":" + "00" + am_pm}`
// Display the current date and time
    let agePm = localStorage.getItem("agePm");
    let destination = (localStorage.getItem('destination')).toUpperCase();
    let startDate = localStorage.getItem("startDate") + `, ${currentHour + ':' + currentMinute + ":" + currentSecond + "" + am_pm}`;
    let endDate = localStorage.getItem("endDate") + `, ${currentHour + ':' + currentMinute + ":" + currentSecond + "" + am_pm}`
    let journeyType = "";
    let geographicLoc = "";
    let policyName = "";
    if (destination === "INDIA") {
        journeyType = "DOMESTIC";
        policyName = "AffinityTravelTravelDealOnlinePolicy";
    } else {
        journeyType = "INTERNATIONAL";
        policyName = "AffinityTravelTravelDealOnlinePolicyIntl";
    }
    // if (destination === "USA" || destination === "CANADA")
    if (destination === "UNITED STATES" || destination === "CANADA")
        geographicLoc = "WORLDWIDE"
    else
        geographicLoc = "EXC_US_CAN"


    let noTravellers = localStorage.getItem("noTravellers");
    let additional;
    if (noTravellers > 1) {
        additional = [];
        for (let x = 2; x <= noTravellers; x++) {
            let amSalutation = localStorage.getItem("amSalutation" + x)
            let amFirstName = localStorage.getItem("amFirstName" + x)
            let amLastName = localStorage.getItem("amLastName" + x)
            let ageAm = localStorage.getItem("ageAm" + x)
            let amMobile = localStorage.getItem("amMobile" + x)
            let amEmail = localStorage.getItem("amEmail" + x)
            let amGender = localStorage.getItem("amGender" + x)
            let amDob = localStorage.getItem("amDob" + x)
            let amDobArr = amDob.split("-")
            let amPrice = localStorage.getItem("amPrice" + x)
            let amTax = localStorage.getItem("amTax" + x);
            let amCarrier = localStorage.getItem("amCarrier" + x);
            let amTicket = localStorage.getItem("amTicket" + x);
            let amPassport = localStorage.getItem("amPassport" + x)
            let addObj = {
                "salutation": `${amSalutation}`,
                "firstName": `${amFirstName}`,
                "lastName": `${amLastName}`,
                "mobile": `${amMobile}`,
                "email": `${amEmail}`,
                "passportNo": `${amPassport}`,
                "dateOfBirth": {
                    "day": parseInt(amDobArr[0]),
                    "month": parseInt(amDobArr[1]),
                    "year": parseInt(amDobArr[2])
                },
                "age": {"years": parseInt(ageAm)},
                "gender": `${amGender}`,
                "isTraveller": true,
                "ticketDetails": [
                    {
                        "price": parseInt(amPrice),
                        "tax": parseInt(amTax),
                        "carrier": `${amCarrier}`,
                        "ticketNo": `${amTicket}`,
                        "destination": `${destination}`
                    }
                ]
            }
            additional.push(addObj);
        }
    } else {
        additional = null;
    }
    let pmSalutation = localStorage.getItem("pmSalutation")
    let pmFirstName = localStorage.getItem("pmFirstName")
    let pmLastName = localStorage.getItem("pmLastName")
    let pmMobile = localStorage.getItem("pmMobile");
    let pmEmail = localStorage.getItem("pmEmail");
    let pmPassport = localStorage.getItem("pmPassport");
    let pmDob = localStorage.getItem("pmDob");
    let pmDobArr = pmDob.split("-")
    let pmPrice = localStorage.getItem("pmPrice")
    let pmTax = localStorage.getItem("pmTax");
    let pmCarrier = localStorage.getItem("pmCarrier");
    let pmTicket = localStorage.getItem("pmTicket");
    let pmGender = localStorage.getItem("pmGender")
    let jso = {
        "invoiceNumber": `${tx}`,
        "dateOfBooking": `${bookDT}`,
        "travellingFrom": "IND",
        "travellingTo": [
            `${destination}`
        ],
        "journeyStartDate": `${startDate}`,
        "journeyEndDate": `${endDate}`,
        "journeyType": `${journeyType}`,
        "additionalTravellers": additional,
        "primaryMember": {
            "salutation": `${pmSalutation}`,
            "firstName": `${pmFirstName}`,
            "lastName": `${pmLastName}`,
            "mobile": `${pmMobile}`,
            "email": `${pmEmail}`,
            "passportNo": `${pmPassport}`,
            "dateOfBirth": {
                "day": parseInt(pmDobArr[0]),
                "month": parseInt(pmDobArr[1]),
                "year": parseInt(pmDobArr[2])
            },
            "age": {
                "years": parseInt(agePm)
            },
            "gender": `${pmGender}`,
            "isTraveller": true,
            "ticketDetails": [
                {
                    "price": parseInt(pmPrice),
                    "tax": parseInt(pmTax),
                    "carrier": `${pmCarrier}`,
                    "ticketNo": `${pmTicket}`,
                    "cancellationCharges": 0,
                    "destination": `${destination}`
                }
            ]
        },
        "customParam": {
            "tripId": "test123",
            "planName": `${policyName}`
        },
        "geographicLocation": `${geographicLoc}`,
        "sumInsured": 50000
    }

    return JSON.stringify(jso);

// Output the JSON string

}

$(document).on('click', '#jumpToStep2Button', function () {
    $('.actions a[href="#previous"]').show();
    $('.actions a[href="#next"]').show();
    $('#jquery-steps').steps('previous'); // Move to previous step (newIndex 2)
});

$(document).on('click', '#submitFormButton', function () {
    if ($('#detailsform').valid()) {
        $('.actions a[href="#previous"]').show();
        $('.actions a[href="#next"]').show();
        $('#jquery-steps').steps('next'); // Move to previous step (newIndex 2)
    }
});

function myFun(amount, sumAssured)
{
    localStorage.setItem("totalAmount",amount);
localStorage.setItem("sumAssured",sumAssured);
    $('#jquery-steps').steps('next'); // Move to previous step (newIndex 2)
}

function myFun(amount,sumAssured)
{
    localStorage.setItem("totalAmount",amount);
localStorage.setItem("sumAssured",sumAssured);
$('#jquery-steps').steps('next'); // Move to previous step (newIndex 2)
}


function updateProgressBar(step) {
    var countTraveller = parseInt(document.getElementById("countTravellers").value);
    const progressBar = document.getElementById('progressBar');
    const totalSteps = countTraveller;
    const progress = (step / totalSteps) * 100;
    console.log(progress);
    progressBar.style.width = `${progress}%`;
}

function updateProgressBar1(step) {

    const progressBar = document.getElementById('progresssBar');
    const totalSteps = 2;
    const progress = (step / totalSteps) * 100;
    console.log(progress);
    progressBar.style.width = `${progress}%`;
}

function showTicketDetails(divControl, val) {
    alert(divControl + " " + val);
    if (val === "Yes")
        document.getElementById(divControl).style.display = "block";
    else
        document.getElementById(divControl).style.display = "none";

}

function fetchPriceVal(passAge, span) {
    // alert(passAge+" "+span)
    let dest = document.getElementById("destination").value;
    var days = document.getElementById("tripNoDays").innerHTML;
    let sumInsured = 50000;
    // alert(dest)
    let formData = new FormData();
    formData.append("destination", dest);
    formData.append("passengerAge", passAge)
    formData.append("noDays", days);

    fetch("/fetchPrice", {
        method: "post",
        body: formData
    }).then(res => res.json()).then(val => {
        // console.log(val);
        alert(val);
        // document.getElementById("totalAmount").value = val;
    })
}


function showDatePicker(id, year) {
    let startDate = moment(`${year - 2}-01-01`, 'YYYY-MM-DD');
    let endDate = moment(`${year + 2}-12-31`, 'YYYY-MM-DD');

    $(`#${id}`).daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minDate: startDate,
        maxDate: endDate,
        locale: {
            format: 'DD-MM-YYYY'
        }
    }, function (start, end, label) {
        let years = moment().diff(start, 'years');
        let result = document.getElementsByClassName("ageCalculator");
        // "You are " + years + " years old!"
    });

    // Set the initial year in the year dropdown
    const datePickerField = $(`#${id}`);
    datePickerField.data('daterangepicker').setStartDate(moment(`${year}-01-01`));
}

function getTicketDetails(index) {
    // alert(index)
    let pmPrice = document.getElementById("pmPrice").value;
    let pmTax = document.getElementById("pmTax").value;
    let pmMobile = document.getElementById("pmMobile").value;
    let pmEmail = document.getElementById("pmEmail").value;
    let pmTicket = document.getElementById("pmTicket").value;
    let pmCarrier = document.getElementById("pmCarrier").value;
    document.getElementById("amPrice" + index).value = pmPrice
    document.getElementById("amTax" + index).value = pmTax
    document.getElementById("amTicket" + index).value = pmTicket
    document.getElementById("amCarrier" + index).value = pmCarrier
    document.getElementById("amMobile" + index).value = pmMobile
    document.getElementById("amEmail" + index).value = pmEmail
}
function checkAmtTax(taxAmt,id, type, index, err) {
    let price
    if (type === "pm")
        price = document.getElementById(type + "Price").value;
    else
        price = document.getElementById(type + "Price" + index).value;

    let tax = parseFloat(taxAmt);
    console.log(tax);
    if (price <= tax) {
        document.getElementById(err).innerHTML = "<span class='text-danger'>Tax value exceeds Ticket Price</span>";
        document.getElementById(id).value ="";
    } else {
        document.getElementById(err).innerHTML = "<span></span>";
        return true
    }

}

function changeSumInsured(sumIns){
    document.getElementById("finalAmt").innerHTML = "<span class='spinner-grow'></span>"

    var destination = localStorage.getItem('destination')
    var countTravellers = localStorage.getItem("noTravellers")
    var formdata = new FormData();
    formdata.append("noTravellers", countTravellers)
    formdata.append("destination", destination);
    var startDateString = localStorage.getItem("startDate");
    var endDateString = localStorage.getItem("endDate");

// Split date strings into day, month, and year
    var startDateParts = startDateString.split("/");
    var endDateParts = endDateString.split("/");

// Create Date objects using the parts
    var startDate = new Date(startDateParts[2], startDateParts[1] - 1, startDateParts[0]);
    var endDate = new Date(endDateParts[2], endDateParts[1] - 1, endDateParts[0]);

// Calculate the difference in milliseconds
    var diffInMilliseconds = endDate.getTime() - startDate.getTime();

// Convert the difference to days
    let diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
    var finalDays = parseInt(diffInDays) + 1


    formdata.append("NoDays", finalDays)
    formdata.append("sumInsured",sumIns);
    // console.log("-------->" + document.getElementById("tripNoDays").innerHTML);
    for (let x = 1; x <= countTravellers; x++) {
        if (x === 1) {
            formdata.append("agePm", localStorage.getItem("agePm"))
        } else {
            formdata.append(`ageAm${x}`, localStorage.getItem(`ageAm${x}`))
        }
    }
    fetch("/fetchPrice", {
        method: "post",
        body: formdata
    }).then(res => res.text()).then(val => {
        // alert(val)
        document.getElementById("finalAmt").innerHTML = "&#x20b9;"+val

        localStorage.setItem("totalAmount",val)
    })
}
function getBirthYearFromAge(age) {
    const currentYear = new Date().getFullYear();
    const birthYear = currentYear - age;
    return birthYear;
}
function preventBack() {
    window.history.forward();

}

setTimeout("preventBack()", 0);

window.onunload = function () { null };