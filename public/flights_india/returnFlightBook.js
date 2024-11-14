// Wrap everything in an async function

Swal.fire({
    html: `
    <div class="loading-container">
        <img src="/images/new.gif" class="img-fluid" style="height: 400px;width:400px"/>

    </div>
`,
    allowOutsideClick: false,
    showConfirmButton: false,
    background: 'transparent',
    customClass: {
        popup: 'custom-toast'
    }
});
async function loadFlightDetails() {

    console.log(arr);

    let flights = ``;

    flights += `
     <div class="selected-flight-details__trip-details">
                                        <div class="d-flex gap-2 trip-content align-items-center" >
                                        
                                        <span
        class="sector-span">${arr.departureFlight.Origin.CityName}(${arr.departureFlight.Origin.CityCode}) -> ${arr.departureFlight.Destination.CityName}(${arr.departureFlight.Destination.CityCode})</span>
    <span
        class="date-span">${convertToDesiredFormat(`${arr.departureFlight.Origin.DepDate}`)}</span>
</div>
                                        <div class="d-flex justify-content-end hide-in-mobile gap-3 align-items-end"><a
                                                    class="fs-14 fw-600 app-link-primary text-danger" style="color: white !important;">Fare Rules</a>
                                        </div>
                                    </div>
                                    <div class="p-3">
    `
    // Render flight details
    arr.departureFlight.Segments[0].flightDetails.forEach((flight, index) => {
        const cards = new SegmentInformation(flight, index, arr.departureFlight.Segments[0].fare);
        flights += cards.render();
    });

    flights += `</div>
     <div class="selected-flight-details__trip-details">
                                        <div class="d-flex gap-2 trip-content align-items-center" >
                                        
                                        <span
        class="sector-span">${arr.returnFlight.Origin.CityName}(${arr.returnFlight.Origin.CityCode}) -> ${arr.returnFlight.Destination.CityName}(${arr.returnFlight.Destination.CityCode})</span>
    <span
        class="date-span">${convertToDesiredFormat(`${arr.returnFlight.Origin.DepDate}`)}</span>
</div>
                                        <div class="d-flex justify-content-end hide-in-mobile gap-3 align-items-end"><a
                                                    class="fs-14 fw-600 app-link-primary text-danger" style="color: white !important;">Fare Rules</a>
                                        </div>
                                    </div>
                                    <div class="p-3">
    `
    // Render flight details
    arr.returnFlight.Segments[0].flightDetails.forEach((flight, index) => {
        const cards = new SegmentInformation(flight, index, arr.returnFlight.Segments[0].fare);
        flights += cards.render();
    });

    flights += `</div>`;

    document.getElementById("flightInfo").innerHTML = flights;

    // Handle the case for the "TBO" supplier
    if (arr.departureFlight.Supplier === Suppliers.TBO) {
        try {
            let fd = new FormData();
            fd.append("traceId", arr.departureFlight.TraceId);
            fd.append("ResultIndex", arr.departureFlight.Segments[0].ResultIndex);
            fd.append("ReturnResultIndex", arr.returnFlight.Segments[0].ResultIndex);

            // Fetch fare rule asynchronously
            fareResponse = await fetch("/flights/fetchRuleReturn", {
                method: "POST",
                body: fd
            });

            // Parse JSON response
            fareResponse = await fareResponse.json();

            console.log(fareResponse);

            if(fareResponse.ResponseStatus === 1)
            {
                fareBreakupResponse = await fetch("/flights/fetchQuoteReturn", {
                    method : "POST",
                    body : fd
                });

                fareBreakupResponse = await fareBreakupResponse.json();

                console.log(fareBreakupResponse);

                if(fareBreakupResponse.ResponseStatus === 1)
                {

                    // Render TBO fare card
                    let TBOFareCard = new TBOFareBreakupCard(fareBreakupResponse.response, 0);
                    document.getElementById("fareSummary").innerHTML = TBOFareCard.render();

                    Array(parseInt(arr.departureFlight.adults)).fill().forEach((_, index) => {
                        let passportAtBook = fareBreakupResponse.response?.Results?.IsPassportRequiredAtBook || false;
                        let passportAtTicket = fareBreakupResponse.response?.Results?.IsPassportRequiredAtTicket || false;
                        let adultForm = new PassengerForm("Adult", index+1, passportAtBook, passportAtTicket);
                        document.getElementById("AdultForm").innerHTML+= adultForm.render()
                        // You can apply any logic here for each adult
                    });

                    Array(parseInt(arr.departureFlight.childs)).fill().forEach((_, index) => {
                        let passportAtBook = fareBreakupResponse.response?.Results?.IsPassportRequiredAtBook || false;
                        let passportAtTicket = fareBreakupResponse.response?.Results?.IsPassportRequiredAtTicket || false;
                        let adultForm = new PassengerForm("Child", index+1, passportAtBook, passportAtTicket);
                        document.getElementById("childForm").innerHTML+= adultForm.render()
                        // You can apply any logic here for each adult
                    });

                    Array(parseInt(arr.departureFlight.infants)).fill().forEach((_, index) => {
                        let passportAtBook = fareBreakupResponse.response?.Results?.IsPassportRequiredAtBook || false;
                        let passportAtTicket = fareBreakupResponse.response?.Results?.IsPassportRequiredAtTicket || false;
                        let adultForm = new PassengerForm("Infant", index+1, passportAtBook, passportAtTicket);
                        document.getElementById("infantForm").innerHTML+= adultForm.render()
                        // You can apply any logic here for each adult
                    });

                    fareBreakupResponse.response.forEach(fareBreakup => {
                        // Loop through the segments for each fareBreakup result
                        fareBreakup.Results.Segments.forEach(segmentGroup => {
                            console.log(segmentGroup);

                            // Loop through individual segments within the segment group
                            segmentGroup.forEach(segment => {
                                if (segment.TripIndicator === 1) {
                                    let existingSegment = segmentArray.find(item => item.SegmentIndicator === segment.SegmentIndicator);
                                    if (!existingSegment) {
                                        segmentArray.push({
                                            "SegmentIndicator": segment.SegmentIndicator,
                                            "Origin": segment.Origin.Airport.AirportCode,
                                            "Destination": segment.Destination.Airport.AirportCode,
                                        });
                                    }
                                }
                            });
                        });

                        // Handle the case for adding the first and last segment in the segment group
                        let seg = fareBreakup.Results.Segments[0].length;
                        let ExistingSegment = segmentArray.find(item =>
                            item.Origin === fareBreakup.Results.Segments[0][0].Origin.Airport.AirportCode &&
                            item.Destination === fareBreakup.Results.Segments[0][seg - 1].Destination.Airport.AirportCode
                        );

                        if (!ExistingSegment) {
                            segmentArray.push({
                                "SegmentIndicator": 0,
                                "Origin": fareBreakup.Results.Segments[0][0].Origin.Airport.AirportCode,
                                "Destination": fareBreakup.Results.Segments[0][seg - 1].Destination.Airport.AirportCode,
                            });
                        }
                    });

                    console.log(segmentArray);



                    ssrResponse = await fetch("/flights/fetchSSRReturn", {
                        method :  "POST",
                        body : fd
                    });

                    ssrResponse = await ssrResponse.json();

                    console.log(ssrResponse);

                    if (ssrResponse.ResponseStatus === 1) {
                        const processedMealSectors = new Set(); // To track processed meal sectors
                        const processedBaggageSectors = new Set(); // To track processed baggage sectors

                        ssrResponse.response.forEach((responseItem, responseIndex) => {
                            let MealDynamic = responseItem?.MealDynamic[0] || "NO MEAL";
                            let Meal = responseItem?.Meal || "NO MEAL";

                            // Handle MealDynamic
                            if (MealDynamic !== "NO MEAL") {
                                segmentArray.forEach((sector, index) => {
                                    MealDynamic.forEach((meal) => {
                                        if (sector.Origin === meal.Origin && sector.Destination === meal.Destination) {
                                            let mealSectorKey = `${sector.Origin}-${sector.Destination}`; // Unique key for the sector

                                            // Check if the sector is already processed
                                            if (!processedMealSectors.has(mealSectorKey)) {
                                                processedMealSectors.add(mealSectorKey); // Mark as processed
                                                let mealSector = { Origin: sector.Origin, Destination: sector.Destination };
                                                let mealSec = new mealSectors(mealSector, index, responseIndex);
                                                document.getElementById("mealSectors").innerHTML += mealSec.renderMealSectors();
                                            }
                                        }
                                    });
                                });
                            } else if (Meal !== "NO MEAL") {
                                let mealSector = {
                                    Origin: arr.Origin.CityCode,
                                    Destination: arr.Destination.CityCode
                                };
                                let mealSec = new mealSectors(mealSector, 0, responseIndex);
                                document.getElementById("mealSectors").innerHTML += mealSec.renderMealSectors();
                            } else {
                                toastMixin.fire({
                                    animation: true,
                                    icon: 'error',
                                    title: `No Extra Meal Facility Available For This Flight.`
                                });
                            }

                            // Handle BaggageDynamic
                            let BaggageDynamic = responseItem?.Baggage || "NO BAGGAGE";
                            if (BaggageDynamic !== "NO BAGGAGE") {
                                segmentArray.forEach((sector, index) => {
                                    BaggageDynamic[0].forEach((baggage) => {
                                        if (sector.Origin === baggage.Origin && sector.Destination === baggage.Destination) {
                                            let baggageSectorKey = `${sector.Origin}-${sector.Destination}`; // Unique key for the sector

                                            // Check if the sector is already processed
                                            if (!processedBaggageSectors.has(baggageSectorKey)) {
                                                processedBaggageSectors.add(baggageSectorKey); // Mark as processed
                                                let baggageSector = { Origin: sector.Origin, Destination: sector.Destination };
                                                let baggageSec = new baggageSectors(baggageSector, index, responseIndex);
                                                document.getElementById("baggageSectors").innerHTML += baggageSec.renderBaggageSectors();
                                            }
                                        }
                                    });
                                });
                            } else {
                                toastMixin.fire({
                                    animation: true,
                                    icon: 'error',
                                    title: `No Extra Baggage Facility Available For This Flight.`
                                });
                            }
                        });

                        // Add event listeners for meal and baggage sections
                        document.querySelector('.meal-sectors-row').addEventListener('click', function (event) {
                            if (event.target.classList.contains('meal-sector')) {
                                document.querySelectorAll('.meal-sector').forEach(function (traveller) {
                                    traveller.classList.remove('active-meal-sector');
                                });
                                event.target.classList.add('active-meal-sector');
                                updateMealOptions();
                            }
                        });

                        document.querySelector('.baggage-sectors-row').addEventListener('click', function (event) {
                            if (event.target.classList.contains('baggage-sector')) {
                                document.querySelectorAll('.baggage-sector').forEach(function (traveller) {
                                    traveller.classList.remove('active-baggage-sector');
                                });
                                event.target.classList.add('active-baggage-sector');
                                updateBaggageOptions();
                            }
                        });

                        document.querySelector('.baggage-travellers-info').addEventListener('click', function (event) {
                            if (event.target.classList.contains('baggage-traveller-name')) {
                                document.querySelectorAll('.baggage-traveller-name').forEach(function (traveller) {
                                    traveller.classList.remove('active-traveller');
                                });
                                event.target.classList.add('active-traveller');
                                updateBaggageOptions();
                            }
                        });

                        document.querySelector('.travellers-info').addEventListener('click', function (event) {
                            if (event.target.classList.contains('traveller-name')) {
                                document.querySelectorAll('.traveller-name').forEach(function (traveller) {
                                    traveller.classList.remove('active-traveller');
                                });
                                event.target.classList.add('active-traveller');
                                updateMealOptions();
                            }
                        });
                    }


                }

                else
                {
                    toastMixin.fire({
                        animation: true,  // Enables animation for the toast
                        icon: 'error',  // This sets the warning icon
                        title: `This Flight is no Longer Available Please Try With another Flight.`
                    });
                }

            }
            else
            {
                toastMixin.fire({
                    animation: true,  // Enables animation for the toast
                    icon: 'error',  // This sets the warning icon
                    title: `This Flight is no Longer Available Please Try With another Flight.`
                });
            }

        }
        catch (e) {
            console.log(e);
        }
    }
    else if(arr.departureFlight.Supplier === Suppliers.TRIPJACK)
    {
        try {
            let fd = new FormData();
            fd.append("traceId", arr.departureFlight.Segments[0].ResultIndex);
            fd.append("returnId", arr.returnFlight.Segments[0].ResultIndex)
            // Fetch fare rule asynchronously
            fareBreakupResponse = await fetch("/flights/fetchReviewReturn", {
                method: "POST",
                body: fd
            });

            // Parse JSON response
            fareBreakupResponse = await fareBreakupResponse.json();

            console.log(fareBreakupResponse);

            if(fareBreakupResponse.ResponseStatus === 1)
            {

                // Render TRIPJACK fare card
                let TRIPJACKFareCard = new TRIPJACKFareBreakupCard(fareBreakupResponse.response, arr.departureFlight.adults, arr.departureFlight.childs, arr.departureFlight.infants);
                document.getElementById("fareSummary").innerHTML = TRIPJACKFareCard.render();


                Array(parseInt(arr.departureFlight.adults)).fill().forEach((_, index) => {
                    let pmValue = fareBreakupResponse.response?.conditions?.pcs?.pm || false; // Fallback value if pm is missing
                    let adultForm = new PassengerForm1("Adult", index+1,pmValue,pmValue);
                    document.getElementById("AdultForm").innerHTML+= adultForm.render()
                    // You can apply any logic here for each adult
                });

                Array(parseInt(arr.departureFlight.childs)).fill().forEach((_, index) => {
                    let pmValue = fareBreakupResponse.response?.conditions?.pcs?.pm || false; // Fallback value if pm is missing
                    let adultForm = new PassengerForm1("Child", index+1,pmValue,pmValue);
                    document.getElementById("childForm").innerHTML+= adultForm.render()
                    // You can apply any logic here for each adult
                });

                Array(parseInt(arr.departureFlight.infants)).fill().forEach((_, index) => {
                    let pmValue = fareBreakupResponse.response?.conditions?.pcs?.pm || false; // Fallback value if pm is missing
                    let adultForm = new PassengerForm1("Infant", index+1,pmValue,pmValue);
                    document.getElementById("infantForm").innerHTML+= adultForm.render()
                    // You can apply any logic here for each adult
                });


                fareBreakupResponse.response.tripInfos.forEach(tripInfo => {
                    tripInfo.sI.forEach(segment => {
                        if (!segmentArray.find(item => item.Origin === segment.da.cityCode && item.Destination === segment.aa.cityCode)) {
                            segmentArray.push({
                                Origin: segment.da.cityCode,
                                Destination: segment.aa.cityCode
                            });
                        }
                    });
                });


                let seg = fareBreakupResponse?.response?.tripInfos?.[0]?.sI?.length || 0;
                let returnSeg = fareBreakupResponse?.response?.tripInfos?.[1]?.sI?.length || 0;


                let ExistingSegment = segmentArray.find(item => item.Origin === fareBreakupResponse.response.tripInfos[0].sI[0].da.cityCode && item.Destination === fareBreakupResponse.response.tripInfos[0].sI[seg-1].aa.cityCode);
                let returnExistingSegment = segmentArray.find(item => item.Origin === fareBreakupResponse.response.tripInfos[0].sI[0].da.cityCode && item.Destination === fareBreakupResponse.response.tripInfos[0].sI[seg-1].aa.cityCode);
                if (!ExistingSegment) {
                    segmentArray.push({
                        "Origin": fareBreakupResponse.response.tripInfos[0].sI[0].da.cityCode,
                        "Destination": fareBreakupResponse.response.tripInfos[0].sI[seg-1].aa.cityCode,
                    });
                }
                if (!returnExistingSegment) {
                    segmentArray.push({
                        "Origin": fareBreakupResponse.response.tripInfos[1].sI[0].da.cityCode,
                        "Destination": fareBreakupResponse.response.tripInfos[1].sI[returnSeg-1].aa.cityCode,
                    });
                }
                console.log(segmentArray);


                fareBreakupResponse.response.tripInfos.forEach((tripInfo, tripIndex) => {
                    tripInfo.sI.forEach((segment, segmentIndex) => {

                        // Dynamic Meal Check
                        let MealDynamic = segment?.ssrInfo?.MEAL || "NO MEAL";
                        console.log(MealDynamic);
                        if (MealDynamic !== "NO MEAL") {
                            let flag = segmentArray.some(sector => sector.Origin === segment.da.cityCode && sector.Destination === segment.aa.cityCode);

                            if (flag) {
                                let mealSector = {
                                    Origin: segment.da.cityCode,
                                    Destination: segment.aa.cityCode
                                };
                                console.log(mealSector);
                                let mealSec = new mealSectors(mealSector, segmentIndex, tripIndex);
                                document.getElementById("mealSectors").innerHTML += mealSec.renderMealSectors();
                            }
                        } else {
                            toastMixin.fire({
                                animation: true,
                                icon: 'error',
                                title: `No Extra Meal Facility Available For This Flight.`
                            });
                        }

                        // Dynamic Baggage Check
                        let BaggageDynamic = segment?.ssrInfo?.BAGGAGE || "NO BAGGAGE";
                        console.log(BaggageDynamic);
                        if (BaggageDynamic !== "NO BAGGAGE") {
                            let baggageFlag = segmentArray.some(sector => sector.Origin === segment.da.cityCode && sector.Destination === segment.aa.cityCode);

                            if (baggageFlag) {
                                let baggageSector = {
                                    Origin: segment.da.cityCode,
                                    Destination: segment.aa.cityCode
                                };
                                console.log(baggageSector);
                                let baggageSec = new baggageSectors(baggageSector, segmentIndex, tripIndex);
                                document.getElementById("baggageSectors").innerHTML += baggageSec.renderBaggageSectors();
                            }
                        } else {
                            toastMixin.fire({
                                animation: true,
                                icon: 'error',
                                title: `No Extra Baggage Facility Available For This Flight.`
                            });
                        }

                        // Event Listeners for Meal and Baggage Sectors
                        document.querySelector('.meal-sectors-row').addEventListener('click', function (event) {
                            if (event.target.classList.contains('meal-sector')) {
                                document.querySelectorAll('.meal-sector').forEach(traveller => traveller.classList.remove('active-meal-sector'));
                                event.target.classList.add('active-meal-sector');
                                updateMealOptions();
                            }
                        });

                        document.querySelector('.baggage-sectors-row').addEventListener('click', function (event) {
                            if (event.target.classList.contains('baggage-sector')) {
                                document.querySelectorAll('.baggage-sector').forEach(traveller => traveller.classList.remove('active-baggage-sector'));
                                event.target.classList.add('active-baggage-sector');
                                updateBaggageOptions();
                            }
                        });

                        // Event Listeners for Travellers
                        document.querySelector('.travellers-info').addEventListener('click', function (event) {
                            if (event.target.classList.contains('traveller-name')) {
                                document.querySelectorAll('.traveller-name').forEach(traveller => traveller.classList.remove('active-traveller'));
                                event.target.classList.add('active-traveller');
                                updateMealOptions();
                            }
                        });

                        document.querySelector('.baggage-travellers-info').addEventListener('click', function (event) {
                            if (event.target.classList.contains('baggage-traveller-name')) {
                                document.querySelectorAll('.baggage-traveller-name').forEach(traveller => traveller.classList.remove('active-traveller'));
                                event.target.classList.add('active-traveller');
                                updateBaggageOptions();
                            }
                        });
                    });
                });

            }
            else
            {
                let timerInterval;
                Swal.fire({
                    icon : "warning",
                    title: "Flight Not Available!",
                    html: "The Requested Flight no longer Available. <b></b>Please search different Flight.",
                    timer: 10000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                        const timer = Swal.getPopup().querySelector("b");
                        timerInterval = setInterval(() => {
                            timer.textContent = `${Swal.getTimerLeft()}`;
                        }, 100);
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        window.location.href= "/tdoFlight";
                    }
                });
            }

        }
        catch (e) {
            console.log(e);
        }
    }

}

// Function to initialize the phone input field
$(document).ready(function () {
    $('#mobile').intlTelInput({
        initialCountry: "in", // Default initial country
        separateDialCode: true, // Shows the dial code separately in the input
    });
});

// Toggle GST form visibility
function toggleForm() {
    const gstForm = document.getElementById('gst-form');
    const isChecked = document.getElementById('gst-checkbox').checked;

    // Toggle the form display
    gstForm.style.display = isChecked ? 'block' : 'none';

    // Get all input fields in the form
    const gstFields = gstForm.querySelectorAll('input');

    // Toggle the 'required' attribute based on the checkbox status
    gstFields.forEach(field => {
        if (isChecked) {
            field.setAttribute('required', 'required');
        } else {
            field.removeAttribute('required');
        }
    });
}

// Enable or disable button based on terms acceptance
function ActiveButton() {
    var checkbox = document.getElementById("acceptTerms");
    var button = document.getElementById("ActiveButton");

    if (checkbox.checked) {
        button.disabled = false; // Enable the button
    } else {
        button.disabled = true; // Disable the button
    }
}

// Start a countdown timer
function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = 0;
        }
    }, 1000);
}

// On window load, run the loadFlightDetails function and start the timer
window.onload = async function () {

    // Call the async function to load flight details first
    await loadFlightDetails();

    setTimeout(() => {
        try {
            // Close the loader before starting the timer
            Swal.close();

            // Start the timer
            let fifteenMinutes = 60 * 15,
                display = document.getElementById('timer');
            startTimer(fifteenMinutes, display);
        } catch (error) {
            console.error("An error occurred: ", error);

            // Ensure the loader is closed even if an error occurs
            Swal.close();
        }
    }, 1000);
};
// Confirm booking validation
async function ConfirmBooking() {
    Swal.fire({
        html: `
        <div class="loading-container">
            <img src="/images/new.gif" class="img-fluid" style="height: 400px;width:400px"/>
    
        </div>
    `,
        allowOutsideClick: false,
        showConfirmButton: false,
        background: 'transparent',
        customClass: {
            popup: 'custom-toast'
        }
    });
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

    let bookDT = `${currentYear + "/" + currentMonth + "/" + currentDay} ${currentHour + ':' + currentMinute + ":" + currentSecond}`
    console.log(bookDT);
    let AdultBaseFare = 0;
    let ChildBaseFare = 0;
    let InfantBaseFare = 0;
    let AdultTax = 0;
    let ChildTax = 0;
    let InfantTax = 0;
    let gst = "NOT NEEDED";


    // Check if GST checkbox is checked
    if ($('#gst-checkbox').is(':checked')) {
        // Validate GST Form if the checkbox is checked
        const gstIsValid = await validateGSTForm();

        if (!gstIsValid) {
            // If GST validation fails, return early and stop further execution
            console.log("GST validation failed.");
            return;
        }
        else
        {
            const gstNumber = document.getElementsByName("gstnumber")[0].value;
            const companyName = document.getElementsByName("gstcompany")[0].value;
            const companyEmail = document.getElementsByName("gstemail")[0].value;
            const gstPhone = document.getElementsByName("gstphone")[0].value;
            const gstAddress = document.getElementsByName("gstaddress")[0].value;

            gst = {
                gstNumber : gstNumber,
                companyName : companyName,
                companyEmail : companyEmail,
                gstPhone : gstPhone,
                gstAddress : gstAddress
            }
        }
    }


    if ($("#details").valid()) {
        if(arr.departureFlight.Supplier === Suppliers.TBO)
        {
            Array(parseInt(arr.departureFlight.adults)).fill().forEach((_, index) => {
                let passportAtBook = fareBreakupResponse.response?.[0]?.Results?.IsPassportRequiredAtBook || false;
                let passportAtTicket = fareBreakupResponse.response?.[0]?.Results?.IsPassportRequiredAtTicket || false;
                let adultObject = new makePassengerArray("Adult",fareBreakupResponse.response[0].Results, index+1, 1, arr.departureFlight.AirlineCode, arr.departureFlight.FlightNumber, passportAtBook, passportAtTicket, "TICKET",gst, 0);
                paxArray.push(adultObject.renderTBO());
                AdultBaseFare = adultObject.renderTBO().Fare.BaseFare;
                AdultTax = adultObject.renderTBO().Fare.Tax;
            });

            Array(parseInt(arr.departureFlight.childs)).fill().forEach((_, index) => {
                let passportAtBook = fareBreakupResponse.response?.[0]?.Results?.IsPassportRequiredAtBook || false;
                let passportAtTicket = fareBreakupResponse.response?.[0]?.Results?.IsPassportRequiredAtTicket || false;
                let childObject = new makePassengerArray("Child",fareBreakupResponse.response[0].Results, index+1, 2, arr.departureFlight.AirlineCode, arr.departureFlight.FlightNumber, passportAtBook, passportAtTicket, "TICKET", gst, 0);
                paxArray.push(childObject.renderTBO());
                ChildBaseFare = childObject.renderTBO().Fare.BaseFare;
                ChildTax = childObject.renderTBO().Fare.Tax;
            });

            Array(parseInt(arr.departureFlight.infants)).fill().forEach((_, index) => {
                let passportAtBook = fareBreakupResponse.response?.[0]?.Results?.IsPassportRequiredAtBook || false;
                let passportAtTicket = fareBreakupResponse.response?.[0]?.Results?.IsPassportRequiredAtTicket || false;
                let infantObject = new makePassengerArray("Infant",fareBreakupResponse.response[0].Results, index+1, 3, arr.departureFlight.AirlineCode, arr.departureFlight.FlightNumber, passportAtBook, passportAtTicket, "TICKET", gst, 0);
                paxArray.push(infantObject.renderTBO());
                InfantBaseFare = infantObject.renderTBO().Fare.BaseFare;
                InfantTax = infantObject.renderTBO().Fare.Tax;
            });

            console.log(paxArray);




            if(paxArray.length > 0)
            {
                let otherData = {
                    "origin" : arr.departureFlight.Origin.CityCode,
                    "destination" : arr.departureFlight.Destination.CityCode,
                    "fareType" : arr.departureFlight.Segments[0].fare,
                    "adultBaseFare" : AdultBaseFare,
                    "childBaseFare" : ChildBaseFare,
                    "infantBaseFare" : InfantBaseFare,
                    "adultTax" : AdultTax,
                    "childTax" : ChildTax,
                    "infantTax" : InfantTax,
                    "otherCharges" : fareBreakupResponse.response[0].Results.Fare.OtherCharges,
                    "serviceFee" : fareBreakupResponse.response[0].Results.Fare.ServiceFee,
                    "publishedFare" : fareBreakupResponse.response[0].Results.Fare.PublishedFare,
                    "offeredFare" : fareBreakupResponse.response[0].Results.Fare.OfferedFare
                }



                if(fareBreakupResponse.response[0].Results.IsLCC)
                {
                    let fd = new FormData();

                    fd.append("traceId", arr.departureFlight.TraceId);
                    fd.append("ResultIndex", arr.departureFlight.Segments[0].ResultIndex);
                    fd.append("Passengers", JSON.stringify(paxArray));
                    fd.append("otherData", JSON.stringify(otherData))
                    fd.append("totalPax", parseInt(arr.departureFlight.adults) + parseInt(arr.departureFlight.childs) + parseInt(arr.departureFlight.infants));
                    fd.append("totalAdult", arr.departureFlight.adults);
                    fd.append("totalChild", arr.departureFlight.childs);
                    fd.append("totalInfant", arr.departureFlight.infants);
                    fd.append("stops", arr.departureFlight.Segments[0].flightDetails.length-1);
                    fd.append("price", fareBreakupResponse.response[0].IsPriceChanged);
                    fd.append("passport", []);
                    fd.append("flightType", 'lccWithPass');
                    fd.append("total",totalAmount);
                    fd.append("agentEmail", localStorage.getItem("agentEmail"));
                    fd.append("bookDT", bookDT);
                    fd.append("lastTicketDate", "");
                    fd.append("isRefundable", fareBreakupResponse.response[0].Results.IsRefundable);
                    fd.append("tripType", "ROUND_TRIP_CUSTOM");
                    fd.append("trip", "departure");
                    fd.append("ssrAmount", 0);
                    fd.append("markup",0);
                    fd.append("platformFee", 0);
                    fd.append("platformTax", 0);

                    let res = await fetch("/goToCheckout", {
                        method: "POST",
                        body: fd
                    });


                    if(res.ok)
                    {
                        await ticketReturn()
                    }
                    else
                    {
                        alert("problem")
                    }
                }
                else
                {
                    let fd = new FormData();

                    fd.append("traceId", arr.departureFlight.TraceId);
                    fd.append("ResultIndex", arr.departureFlight.Segments[0].ResultIndex);
                    fd.append("Passengers", JSON.stringify(paxArray));
                    fd.append("otherData", JSON.stringify(otherData))
                    fd.append("totalPax", parseInt(arr.departureFlight.adults) + parseInt(arr.departureFlight.childs) + parseInt(arr.departureFlight.infants));
                    fd.append("totalAdult", arr.departureFlight.adults);
                    fd.append("totalChild", arr.departureFlight.childs);
                    fd.append("totalInfant", arr.departureFlight.infants);
                    fd.append("stops", arr.departureFlight.Segments[0].flightDetails.length-1);
                    fd.append("price", fareBreakupResponse.response[0].IsPriceChanged);
                    fd.append("passport", []);
                    fd.append("flightType", 'lccWithPass');
                    fd.append("total",totalAmount);
                    fd.append("agentEmail", localStorage.getItem("agentEmail"));
                    fd.append("bookDT", bookDT);
                    fd.append("lastTicketDate", "");
                    fd.append("isRefundable", fareBreakupResponse.response[0].Results.IsRefundable);
                    fd.append("tripType", "ROUND_FLIGHT_CUSTOM");
                    fd.append("trip", "departure");
                    fd.append("ssrAmount", 0);
                    fd.append("markup",0);
                    fd.append("platformFee", 0);
                    fd.append("platformTax", 0);



                        let res1 = await fetch("/goToCheckout", {
                            method: "POST",
                            body: fd
                        });


                        if(res1.ok)
                        {
                           await ticketReturn();
                        }
                        else
                        {
                            alert("problem")
                        }



                }

            }
        }
        else if(arr.departureFlight.Supplier === Suppliers.TRIPJACK)
        {
            Array(parseInt(arr.departureFlight.adults)).fill().forEach((_, index) => {
                let pmValue = fareBreakupResponse.response?.conditions?.pcs?.pm || false; // Fallback value if pm is missing
                let adultObject = new makePassengerArray("Adult",fareBreakupResponse.response.tripInfos, index+1, 1, arr.AirlineCode, arr.FlightNumber, pmValue, pmValue, "TICKET", gst, 0);
                paxArray.push(adultObject.renderTRIPJACK());
            });

            Array(parseInt(arr.departureFlight.childs)).fill().forEach((_, index) => {
                let pmValue = fareBreakupResponse.response?.conditions?.pcs?.pm || false; // Fallback value if pm is missing
                let childObject = new makePassengerArray("Child",fareBreakupResponse.response.tripInfos, index+1, 2, arr.AirlineCode, arr.FlightNumber, pmValue, pmValue, "TICKET", gst, 0);
                paxArray.push(childObject.renderTRIPJACK());
            });

            Array(parseInt(arr.departureFlight.infants)).fill().forEach((_, index) => {
                let pmValue = fareBreakupResponse.response?.conditions?.pcs?.pm || false; // Fallback value if pm is missing
                let infantObject = new makePassengerArray("Infant",fareBreakupResponse.response.tripInfos, index+1, 3, arr.AirlineCode, arr.FlightNumber, pmValue, pmValue, "TICKET", gst, 0);
                paxArray.push(infantObject.renderTRIPJACK());
            });

            if(paxArray.length > 0){
                let fd = new FormData();
                fd.append("supplier", 'TRIPJACK');
                fd.append("bookingId", fareBreakupResponse.response.bookingId);
                fd.append("TF", parseFloat(totalAmount));
                fd.append("email", document.getElementById(`leademail`).value);
                fd.append("contact", document.getElementById(`mobile`).value);
                fd.append("traceId", arr.departureFlight.Segments[0].ResultIndex);
                fd.append("Passengers", JSON.stringify(paxArray));
                fd.append("totalPax", parseInt(arr.departureFlight.adults) + parseInt(arr.departureFlight.childs) + parseInt(arr.departureFlight.infants));
                fd.append("totalAdult", arr.departureFlight.adults);
                fd.append("totalChild", arr.departureFlight.childs);
                fd.append("totalInfant", arr.departureFlight.infants);
                fd.append("stops", arr.departureFlight.Segments[0].flightDetails.length -1);
                fd.append("gst",JSON.stringify(gst));
                fd.append("total", totalAmount);
                fd.append("returnMarkup", 0);
                fd.append("agentEmail", localStorage.getItem("agentEmail"));
                fd.append("bookDT", bookDT);
                fd.append("tripType", "ROUND_TRIP_CUSTOM");
                fd.append("ssrAmount", 0);
                fd.append("markup", 0);
                fd.append("platformFee", 0);
                fd.append("platformTax", 0);
                fd.append("isDomestic", fareBreakupResponse.response.searchQuery.isDomestic);
                fd.append("fareType", arr.departureFlight.Segments[0].fare);

                let res = await fetch("/goToCheckout", {
                    method: "POST",
                    body: fd
                });

                if (res.ok) {
                    window.location.href = '/flightCheckout';
                } else {
                    alert("problem");
                }
            }
        }
    }
}

async function ticketReturn() {
paxArray = [];
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

    let bookDT = `${currentYear + "/" + currentMonth + "/" + currentDay} ${currentHour + ':' + currentMinute + ":" + currentSecond}`
    console.log(bookDT);
    let AdultBaseFare = 0;
    let ChildBaseFare = 0;
    let InfantBaseFare = 0;
    let AdultTax = 0;
    let ChildTax = 0;
    let InfantTax = 0;
    let gst = "NOT NEEDED";


    // Check if GST checkbox is checked
    if ($('#gst-checkbox').is(':checked')) {
        // Validate GST Form if the checkbox is checked
        const gstIsValid = await validateGSTForm();

        if (!gstIsValid) {
            // If GST validation fails, return early and stop further execution
            console.log("GST validation failed.");
            return;
        } else {
            const gstNumber = document.getElementsByName("gstnumber")[0].value;
            const companyName = document.getElementsByName("gstcompany")[0].value;
            const companyEmail = document.getElementsByName("gstemail")[0].value;
            const gstPhone = document.getElementsByName("gstphone")[0].value;
            const gstAddress = document.getElementsByName("gstaddress")[0].value;

            gst = {
                gstNumber: gstNumber,
                companyName: companyName,
                companyEmail: companyEmail,
                gstPhone: gstPhone,
                gstAddress: gstAddress
            }
        }
    }


    if ($("#details").valid()) {
        if (arr.returnFlight.Supplier === Suppliers.TBO) {
            Array(parseInt(arr.returnFlight.adults)).fill().forEach((_, index) => {
                let passportAtBook = fareBreakupResponse.response?.[1]?.Results?.IsPassportRequiredAtBook || false;
                let passportAtTicket = fareBreakupResponse.response?.[1]?.Results?.IsPassportRequiredAtTicket || false;
                let adultObject = new makePassengerArray("Adult", fareBreakupResponse.response[1].Results, index + 1, 1, arr.returnFlight.AirlineCode, arr.returnFlight.FlightNumber, passportAtBook, passportAtTicket, "TICKET", gst,1);
                paxArray.push(adultObject.renderTBO());
                AdultBaseFare = adultObject.renderTBO().Fare.BaseFare;
                AdultTax = adultObject.renderTBO().Fare.Tax;
            });

            Array(parseInt(arr.returnFlight.childs)).fill().forEach((_, index) => {
                let passportAtBook = fareBreakupResponse.response?.[1]?.Results?.IsPassportRequiredAtBook || false;
                let passportAtTicket = fareBreakupResponse.response?.[1]?.Results?.IsPassportRequiredAtTicket || false;
                let childObject = new makePassengerArray("Child", fareBreakupResponse.response[1].Results, index + 1, 2, arr.returnFlight.AirlineCode, arr.returnFlight.FlightNumber, passportAtBook, passportAtTicket, "TICKET", gst, 1);
                paxArray.push(childObject.renderTBO());
                ChildBaseFare = childObject.renderTBO().Fare.BaseFare;
                ChildTax = childObject.renderTBO().Fare.Tax;
            });

            Array(parseInt(arr.returnFlight.infants)).fill().forEach((_, index) => {
                let passportAtBook = fareBreakupResponse.response?.[1]?.Results?.IsPassportRequiredAtBook || false;
                let passportAtTicket = fareBreakupResponse.response?.[1]?.Results?.IsPassportRequiredAtTicket || false;
                let infantObject = new makePassengerArray("Infant", fareBreakupResponse.response[1].Results, index + 1, 3, arr.returnFlight.AirlineCode, arr.returnFlight.FlightNumber, passportAtBook, passportAtTicket, "TICKET", gst, 1);
                paxArray.push(infantObject.renderTBO());
                InfantBaseFare = infantObject.renderTBO().Fare.BaseFare;
                InfantTax = infantObject.renderTBO().Fare.Tax;
            });

            console.log(paxArray);


            if (paxArray.length > 0) {
                let otherData = {
                    "origin": arr.returnFlight.Origin.CityCode,
                    "destination": arr.returnFlight.Destination.CityCode,
                    "fareType": arr.returnFlight.Segments[0].fare,
                    "adultBaseFare": AdultBaseFare,
                    "childBaseFare": ChildBaseFare,
                    "infantBaseFare": InfantBaseFare,
                    "adultTax": AdultTax,
                    "childTax": ChildTax,
                    "infantTax": InfantTax,
                    "otherCharges": fareBreakupResponse.response[1].Results.Fare.OtherCharges,
                    "serviceFee": fareBreakupResponse.response[1].Results.Fare.ServiceFee,
                    "publishedFare": fareBreakupResponse.response[1].Results.Fare.PublishedFare,
                    "offeredFare": fareBreakupResponse.response[1].Results.Fare.OfferedFare
                }


                if (fareBreakupResponse.response[1].Results.IsLCC) {
                    let fd = new FormData();

                    fd.append("traceId",arr.departureFlight.TraceId);
                    fd.append("ResultIndex", arr.returnFlight.Segments[0].ResultIndex);
                    fd.append("Passengers", JSON.stringify(paxArray));
                    fd.append("otherData", JSON.stringify(otherData))
                    fd.append("totalPax", parseInt(arr.returnFlight.adults) + parseInt(arr.returnFlight.childs) + parseInt(arr.returnFlight.infants));
                    fd.append("totalAdult", arr.returnFlight.adults);
                    fd.append("totalChild", arr.returnFlight.childs);
                    fd.append("totalInfant", arr.returnFlight.infants);
                    fd.append("stops", arr.returnFlight.Segments[0].flightDetails.length - 1);
                    fd.append("price", fareBreakupResponse.response[1].IsPriceChanged);
                    fd.append("passport", []);
                    fd.append("flightType", 'lccWithPass');
                    fd.append("total", totalAmount);
                    fd.append("agentEmail", localStorage.getItem("agentEmail"));
                    fd.append("bookDT", bookDT);
                    fd.append("lastTicketDate", "");
                    fd.append("isRefundable", fareBreakupResponse.response[1].Results.IsRefundable);
                    fd.append("tripType", "ROUND_TRIP_CUSTOM");
                    fd.append("trip", "return");
                    fd.append("ssrAmount", 0);
                    fd.append("markup", 0);
                    fd.append("platformFee", 0);
                    fd.append("platformTax", 0);

                    let res = await fetch("/goToCheckoutReturn", {
                        method: "POST",
                        body: fd
                    });


                    if (res.ok) {
                        window.location.href = '/flightCheckoutReturn';
                    } else {
                        alert("problem")
                    }
                }
                else {
                    let fd = new FormData();

                    fd.append("traceId", arr.departureFlight.TraceId);
                    fd.append("ResultIndex", arr.returnFlight.Segments[0].ResultIndex);
                    fd.append("Passengers", JSON.stringify(paxArray));
                    fd.append("otherData", JSON.stringify(otherData))
                    fd.append("totalPax", parseInt(arr.returnFlight.adults) + parseInt(arr.returnFlight.childs) + parseInt(arr.returnFlight.infants));
                    fd.append("totalAdult", arr.returnFlight.adults);
                    fd.append("totalChild", arr.returnFlight.childs);
                    fd.append("totalInfant", arr.returnFlight.infants);
                    fd.append("stops", arr.returnFlight.Segments[0].flightDetails.length - 1);
                    fd.append("price", fareBreakupResponse.response[1].IsPriceChanged);
                    fd.append("passport", []);
                    fd.append("flightType", 'lccWithPass');
                    fd.append("total", totalAmount);
                    fd.append("agentEmail", localStorage.getItem("agentEmail"));
                    fd.append("bookDT", bookDT);
                    fd.append("lastTicketDate", "");
                    fd.append("isRefundable", fareBreakupResponse.response[1].Results.IsRefundable);
                    fd.append("tripType", "ROUND_TRIP_CUSTOM");
                    fd.append("trip", "return");
                    fd.append("ssrAmount", 0);
                    fd.append("markup", 0);
                    fd.append("platformFee", 0);
                    fd.append("platformTax", 0);



                        let res1 = await fetch("/goToCheckoutReturn", {
                            method: "POST",
                            body: fd
                        });


                        if (res1.ok) {
                            window.location.href = '/flightCheckoutReturn';
                        } else {
                            alert("problem")
                        }




                }

            }
        }
    }
}
function MealModal() {
    document.getElementById("mealTravellers").innerHTML = '';

    if ($("#details").valid()) {

        Array(parseInt(arr.departureFlight.adults)).fill().forEach((_, index) => {
            let adultForm = new mealPassengers("Adult", index+1);
            document.getElementById("mealTravellers").innerHTML+= adultForm.renderMealPassengers()
            // You can apply any logic here for each adult
        });

        Array(parseInt(arr.departureFlight.childs)).fill().forEach((_, index) => {
            let adultForm = new mealPassengers("Child", index+1);
            document.getElementById("mealTravellers").innerHTML+= adultForm.renderMealPassengers();
            // You can apply any logic here for each adult
        });

        const msector = document.querySelectorAll('.meal-sector');
        const travellers = document.querySelectorAll('.traveller-name');

        updateMealOptions();

        $("#mealModal").modal("show");
    }
    else
    {
        toastMixin.fire({
            animation: true,  // Enables animation for the toast
            icon: 'warning',  // This sets the warning icon
            title: 'Please Fill Passenger Details First'  // Warning message to display
        });
    }
}

function BaggageModal() {
    document.getElementById("baggageTravellers").innerHTML = '';

    if ($("#details").valid()) {

        Array(parseInt(arr.departureFlight.adults)).fill().forEach((_, index) => {
            let adultForm = new baggagePassengers("Adult", index+1);
            document.getElementById("baggageTravellers").innerHTML+= adultForm.renderBaggagePassengers()
            // You can apply any logic here for each adult
        });

        Array(parseInt(arr.departureFlight.childs)).fill().forEach((_, index) => {
            let adultForm = new baggagePassengers("Child", index+1);
            document.getElementById("baggageTravellers").innerHTML+= adultForm.renderBaggagePassengers();
            // You can apply any logic here for each adult
        });

        const msector = document.querySelectorAll('.baggage-sector');
        const travellers = document.querySelectorAll('.traveller-name');

        updateBaggageOptions();

        $("#baggageModal").modal("show");
    }
    else
    {
        toastMixin.fire({
            animation: true,  // Enables animation for the toast
            icon: 'warning',  // This sets the warning icon
            title: 'Please Fill Passenger Details First'  // Warning message to display
        });
    }
}


function updateMealOptions()
{

    document.getElementById("mealOptions").innerHTML = '';

    const msector = document.querySelectorAll('.meal-sector');
    const travellers = document.querySelectorAll('.traveller-name');

    msector.forEach(function(sector) {
        if (sector.classList.contains('active-meal-sector')) {
            const selectedSectorId = sector.id;
            console.log("Selected Sector ID:", selectedSectorId);

            travellers.forEach((traveller, index) => {
                if(traveller.classList.contains('active-traveller'))
                {
                    const selectedTraveller = traveller.id;

                    if (arr.departureFlight.Supplier === Suppliers.TBO) {
                        ssrResponse?.response.forEach((trips, tripIndex) => {
                            let MealDynamic = trips?.MealDynamic?.[0] || "NO MEAL";
                            let Meal = trips?.Meal || "NO MEAL";

                            // Handle MealDynamic
                            if (MealDynamic !== "NO MEAL") {
                                MealDynamic.forEach((meal, index) => {
                                    if (meal.Origin === selectedSectorId.split("-")[0] && meal.Destination === selectedSectorId.split("-")[1]) {
                                        let mealOption = new mealOptions(meal, index, selectedTraveller, selectedSectorId.split("-")[0], selectedSectorId.split("-")[1], 0, tripIndex);
                                        document.getElementById("mealOptions").innerHTML += mealOption.renderMealDynamicOptions();
                                    }
                                });
                            }

                            // Handle Meal if MealDynamic is not available
                            if (Meal !== "NO MEAL") {
                                Meal.forEach((meal, index) => {
                                    let mealOption = new mealOptions(meal, index, selectedTraveller, selectedSectorId.split("-")[0], selectedSectorId.split("-")[1], 0, tripIndex);
                                    document.getElementById("mealOptions").innerHTML += mealOption.renderMealOptions();
                                });
                            }
                        });
                    }

                    else
                    {
                        fareBreakupResponse.response.tripInfos.forEach((tripInfo, tripInfoIndex) => {
                            tripInfo.sI.forEach((segment, segmentIndex) => {
                                let MealDynamic = tripInfo?.sI[segmentIndex]?.ssrInfo?.MEAL || "NO MEAL";
                                if (MealDynamic !== 'NO MEAL') {
                                    MealDynamic.forEach((meal, index) => {
                                        if (segment.da.cityCode === selectedSectorId.split("-")[0] && segment.aa.cityCode === selectedSectorId.split("-")[1]) {

                                            let mealOption = new mealOptions(meal, index, selectedTraveller, selectedSectorId.split("-")[0], selectedSectorId.split("-")[1], segmentIndex, tripInfoIndex);
                                            document.getElementById("mealOptions").innerHTML += mealOption.renderMealDynamicOptions();
                                        }
                                    });
                                }
                            });
                        });

                    }
                    calculateTotalMealPrice();
                    return
                }
            })

            return;  // Since you can't break out of forEach, this stops further execution in this iteration
        }
    });
}

function updateBaggageOptions()
{

    document.getElementById("baggageOptions").innerHTML = '';

    const msector = document.querySelectorAll('.baggage-sector');
    const travellers = document.querySelectorAll('.baggage-traveller-name');

    msector.forEach(function(sector) {
        if (sector.classList.contains('active-baggage-sector')) {
            const selectedSectorId = sector.id;
            console.log("Selected Sector ID:", selectedSectorId);

            travellers.forEach((traveller, index) => {
                if(traveller.classList.contains('active-traveller'))
                {
                    const selectedTraveller = traveller.id;

                    if (arr.departureFlight.Supplier === Suppliers.TBO) {
                        ssrResponse.response.forEach((trips, tripIndex) => {
                            let Baggage = trips?.Baggage || "NO BAGGAGE";

                            // Handle Baggage if available
                            if (Baggage !== "NO BAGGAGE") {
                                Baggage[0].forEach((baggage, index) => {
                                    if (baggage.Origin === selectedSectorId.split("-")[0] && baggage.Destination === selectedSectorId.split("-")[1]) {
                                        let baggageOption = new baggageOptions(baggage, index, selectedTraveller, selectedSectorId.split("-")[0], selectedSectorId.split("-")[1], 0, tripIndex);
                                        document.getElementById("baggageOptions").innerHTML += baggageOption.renderBaggageOptions();
                                    }
                                });
                            } else {
                                toastMixin.fire({
                                    animation: true,
                                    icon: 'error',
                                    title: `No Extra Baggage Facility Available For This Flight.`
                                });
                            }
                        });
                    }

                    else
                    {
                        fareBreakupResponse.response.tripInfos.forEach((tripInfo, tripInfoIndex) => {
                            tripInfo.sI.forEach((segment, segmentIndex) => {
                                let MealDynamic = tripInfo?.sI[segmentIndex]?.ssrInfo?.BAGGAGE || "NO BAGGAGE";
                                if(MealDynamic !== 'NO BAGGAGE') {
                                    MealDynamic.forEach((meal, index) => {
                                        if(segment.da.cityCode === selectedSectorId.split("-")[0] && segment.aa.cityCode === selectedSectorId.split("-")[1]) {

                                            let mealOption = new baggageOptions(meal, index, selectedTraveller, selectedSectorId.split("-")[0], selectedSectorId.split("-")[1], segmentIndex, tripInfoIndex);
                                            document.getElementById("baggageOptions").innerHTML += mealOption.renderBaggageOptions();
                                        }
                                    });
                                } else {
                                    toastMixin.fire({
                                        animation: true,  // Enables animation for the toast
                                        icon: 'error',  // This sets the warning icon
                                        title: `No Extra Baggage Facility Available For This Flight.`
                                    });
                                }
                            });
                        });

                    }
                    calculateTotalBaggagePriceNew()
                    return
                }
            })

            return;  // Since you can't break out of forEach, this stops further execution in this iteration
        }
    });
}

async function validateGSTForm() {
    const gstNumber = document.getElementsByName("gstnumber")[0].value;
    const companyName = document.getElementsByName("gstcompany")[0].value;
    const companyEmail = document.getElementsByName("gstemail")[0].value;
    const gstPhone = document.getElementsByName("gstphone")[0].value;
    const gstAddress = document.getElementsByName("gstaddress")[0].value;

    // Updated GST number regex (15 characters, typical structure for Indian GST)
    const gstNumberRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{3}$/;
    // Allow company names with letters, numbers, spaces, and certain special characters
    const companyNameRegex = /^[A-Za-z0-9&.\s]+$/;
    // Allow for emails with longer TLDs
    const companyEmailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    // Phone number regex remains the same for 10-digit numbers
    const gstPhoneRegex = /^\d{10}$/;
    // Loosen the address regex to allow more special characters
    const gstAddressRegex = /^[A-Za-z0-9\s.,-\/'&]+$/;

    // Validation logic
    if (!gstNumberRegex.test(gstNumber)) {
        toastMixin.fire({
            animation: true,  // Enables animation for the toast
            icon: 'error',  // This sets the warning icon
            title: `Please Enter Valid GST Number.`
        });
        return false;
    }

    if (!companyNameRegex.test(companyName)) {
        toastMixin.fire({
            animation: true,  // Enables animation for the toast
            icon: 'error',  // This sets the warning icon
            title: `Please Enter Valid Company Name.`
        });
        return false;
    }

    if (!companyEmailRegex.test(companyEmail)) {
        toastMixin.fire({
            animation: true,  // Enables animation for the toast
            icon: 'error',  // This sets the warning icon
            title: `Please Enter Valid Company Email.`
        });
        return false;
    }

    if (!gstPhoneRegex.test(gstPhone)) {
        toastMixin.fire({
            animation: true,  // Enables animation for the toast
            icon: 'error',  // This sets the warning icon
            title: `Please Enter Valid Company Phone.`
        });
        return false;
    }

    if (!gstAddressRegex.test(gstAddress)) {
        toastMixin.fire({
            animation: true,  // Enables animation for the toast
            icon: 'error',  // This sets the warning icon
            title: `Please Enter Valid Company Address.`
        });
        return false;
    }

    return true;
}

// book page scripts here
function  AddMeal(index, origin, destination, traveller, segmentIndex, price, trip)
{

    let m = mealArray.findIndex(me => me.id === traveller && me.origin === origin && me.destination === destination);

    if(m !== -1)
    {
        toastMixin.fire({
            animation: true,  // Enables animation for the toast
            icon: 'warning',  // This sets the warning icon
            title: `Multiple Meal per Pax are not allowed.`
        });
    }
    else
    {
        let meal = {
            index : index,
            id : traveller,
            origin : origin,
            destination  : destination,
            price : price,
            trip : trip,
            mealObject : (arr.departureFlight.Supplier === Suppliers.TBO) ? ssrResponse.response?.[trip]?.MealDynamic?.[0]?.[index] || ssrResponse.response?.[trip]?.Meal[index] || 'NO MEAL' : fareBreakupResponse.response?.tripInfos[trip]?.sI[segmentIndex]?.ssrInfo?.MEAL[index] || 'No Meal',
            segmentId : fareBreakupResponse?.response?.tripInfos?.[trip]?.sI?.[segmentIndex].id || 0,
            code : fareBreakupResponse?.response?.tripInfos?.[trip]?.sI?.[segmentIndex]?.ssrInfo?.MEAL?.[index].code
        }

        mealArray.push(meal);

        totalAmount+= price;

        document.getElementById("totalAmountSpan").innerHTML = totalAmount;

        toastMixin.fire({
            animation: true,  // Enables animation for the toast
            icon: 'success',  // This sets the warning icon
            title: (arr.departureFlight.Supplier === Suppliers.TBO) ? `${ssrResponse.response?.[trip]?.MealDynamic?.[0]?.[index]?.AirlineDescription || ssrResponse.response?.[trip]?.Meal?.[index]?.Description || 'No Meal'} is Added` : `${fareBreakupResponse.response?.tripInfos[0]?.sI[segmentIndex]?.ssrInfo?.MEAL[index].desc || 'No Meal'} is Added` // Warning message to display
        });

        console.log(mealArray)

        updateMealOptions();
        calculateMealPrice(traveller)
    }
}

function removeMeal(index,mealIndex, segmentIndex, traveller, trip)
{
    totalAmount-= mealArray[index].price ;

    document.getElementById("totalAmountSpan").innerHTML = totalAmount;

    mealArray.splice(index, 1);

    toastMixin.fire({
        animation: true,  // Enables animation for the toast
        icon: 'success',  // This sets the warning icon
        title: (arr.departureFlight.Supplier === Suppliers.TBO) ? `${ssrResponse.response?.[trip]?.MealDynamic?.[0]?.[mealIndex]?.AirlineDescription || ssrResponse.response?.[trip]?.Meal?.[mealIndex]?.Description || 'No Meal'} is Removed` : `${fareBreakupResponse.response?.tripInfos[0]?.sI[segmentIndex]?.ssrInfo?.MEAL[mealIndex].desc || 'No Meal'} is Removed` // Warning message to display
    });

    updateMealOptions()
    calculateMealPrice(traveller)
}

function  AddBaggage(index, origin, destination, traveller, segmentIndex, price, trip)
{
    let bag = baggageArray.findIndex(baggage => baggage.id === traveller && baggage.origin === origin && baggage.destination === destination);

    if(bag !== -1)
    {
        toastMixin.fire({
            animation: true,  // Enables animation for the toast
            icon: 'warning',  // This sets the warning icon
            title: `Multiple baggage per segment are not allowed.`
        });
    }
    else
    {
        let meal = {
            index : index,
            id : traveller,
            origin : origin,
            destination  : destination,
            price : price,
            trip : trip,
            baggageObject : (arr.departureFlight.Supplier === Suppliers.TBO) ? ssrResponse.response?.[trip]?.Baggage[0][index] || 'NO BAGGAGE' : fareBreakupResponse.response?.tripInfos[trip]?.sI[segmentIndex]?.ssrInfo?.BAGGAGE[index] || 'NO BAGGAGE',
            segmentId : fareBreakupResponse?.response?.tripInfos?.[trip]?.sI?.[segmentIndex].id || 0,
            code : fareBreakupResponse?.response?.tripInfos?.[trip]?.sI?.[segmentIndex]?.ssrInfo?.BAGGAGE?.[index].code
        }

        baggageArray.push(meal);

        totalAmount+= price;

        document.getElementById("totalAmountSpan").innerHTML = totalAmount;



        toastMixin.fire({
            animation: true,  // Enables animation for the toast
            icon: 'success',  // This sets the warning icon
            title: (arr.departureFlight.Supplier === Suppliers.TBO) ? `${ssrResponse.response?.[trip]?.Baggage?.[0]?.[index]?.Code || 'NO BAGGAGE'} is Added` : `${fareBreakupResponse.response?.tripInfos[0]?.sI[segmentIndex]?.ssrInfo?.BAGGAGE[index].desc || 'NO BAGGAGE'} is Added` // Warning message to display
        });

        console.log(mealArray)

        updateBaggageOptions();
        calculateBaggagePrice(traveller)
    }

}

function removeBaggage(index,mealIndex, segmentIndex, traveller, trip)
{

    totalAmount-= baggageArray[index].price ;

    document.getElementById("totalAmountSpan").innerHTML = totalAmount;

    baggageArray.splice(index, 1);

    toastMixin.fire({
        animation: true,  // Enables animation for the toast
        icon: 'success',  // This sets the warning icon
        title: (arr.departureFlight.Supplier === Suppliers.TBO) ? `${ssrResponse.response?.[trip]?.Baggage?.[0]?.[mealIndex]?.Code  || 'No BAGGAGE'} is Removed` : `${fareBreakupResponse.response?.tripInfos[0]?.sI[segmentIndex]?.ssrInfo?.BAGGAGE[mealIndex].desc || 'NO BAGGAGE'} is Removed` // Warning message to display
    });

    updateBaggageOptions();
    calculateBaggagePrice(traveller)
}

function calculateMealPrice(index)
{
    let personPrice = 0;

    let person = mealArray.filter(p => p.id === index);

    person.forEach(meal => {
        personPrice += meal.price;
    })

    document.getElementById(`${index}separator`).innerHTML  = `&#x20b9; ${personPrice}`

}

function calculateTotalMealPrice() {
    let totalMealPrice = 0;

    // First, create a mapping to accumulate meal prices per person
    let personMealPrices = {};

    // Accumulate the total price for each person
    mealArray.forEach(meal => {
        if (!personMealPrices[meal.id]) {
            personMealPrices[meal.id] = 0; // Initialize the price for this person
        }

        personMealPrices[meal.id] += parseFloat(meal.price); // Accumulate meal price for this person
    });

    // Now set the accumulated price for each person in the corresponding separator
    Object.keys(personMealPrices).forEach(personId => {
        document.getElementById(`${personId}separator`).innerHTML = `&#x20b9; ${personMealPrices[personId].toFixed(2)}`;
    });

    // Calculate the total price across all meals for all persons
    totalMealPrice = Object.values(personMealPrices).reduce((acc, price) => acc + price, 0);

    console.log('Total Meal Price:', totalMealPrice);
}

function calculateBaggagePrice(index)
{
    let personPrice = 0;

    let person = baggageArray.filter(p => p.id === index);

    person.forEach(meal => {
        personPrice += meal.price;
    })

    document.getElementById(`${index}baggage`).innerHTML  = `&#x20b9; ${personPrice}`

}

function calculateTotalBaggagePriceNew() {
    let totalBaggagePrice = 0;

    // First, create a mapping to accumulate meal prices per person
    let personBaggagePrices = {};

    // Accumulate the total price for each person
    baggageArray.forEach(meal => {
        if (!personBaggagePrices[meal.id]) {
            personBaggagePrices[meal.id] = 0; // Initialize the price for this person
        }

        personBaggagePrices[meal.id] += parseFloat(meal.price); // Accumulate meal price for this person
    });

    // Now set the accumulated price for each person in the corresponding separator
    Object.keys(personBaggagePrices).forEach(personId => {
        document.getElementById(`${personId}baggage`).innerHTML = `&#x20b9; ${personBaggagePrices[personId].toFixed(2)}`;
    });

    // Calculate the total price across all meals for all persons
    totalBaggagePrice = Object.values(personBaggagePrices).reduce((acc, price) => acc + price, 0);

    console.log('Total Meal Price:', totalBaggagePrice);
}

