const toastMixin = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
});
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

let flight = '';
let flightOnward = '';
let flightReturn = '';
let segmentOn = [];
let segmentRe = [];

async function loadFlightDetails() {
    let selectedFlight = sessionStorage.getItem("selectedFlight");
    arr = JSON.parse(selectedFlight);
    // console.log(selectedFlight)
    console.log("arr", arr);
    // console.log("gihj",arr);

    let flights = ``;

    flights += `
     <div class="selected-flight-details__trip-details">
                                        <div class="d-flex gap-2 trip-content align-items-center" >
                                        
                                        <span
        class="sector-span">${arr.onwardFlight.Origin.CityName}(${arr.onwardFlight.Origin.CityCode}) -> ${arr.onwardFlight.Destination.CityName}(${arr.onwardFlight.Destination.CityCode})</span>
    <span
        class="date-span">${convertToDesiredFormat(`${arr.onwardFlight.Origin.DepDate}`)}</span>
</div>
                                        <div class="d-flex justify-content-end hide-in-mobile gap-3 align-items-end"><a
                                                    class="fs-14 fw-600 app-link-primary text-danger" style="color: white !important;">Fare Rules</a>
                                        </div>
                                    </div>
                                    <div class="p-3">
    `
    // Render flight details
    arr.onwardFlight.Segments[0].flightDetails.forEach((flight, index) => {
        const cards = new SegmentInformationFixed(flight, index, arr.onwardFlight.Segments[0].fare);
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
        const cards = new SegmentInformationFixed(flight, index, arr.returnFlight.Segments[0].fare);
        flights += cards.render();
    });

    flights += `</div>`;

    document.getElementById("flightInfo").innerHTML = flights;

    for (let i = 0; i < arr.onwardFlight.Segments[0].flightDetails.length; i++) {
        let mySegment = arr.onwardFlight.Segments[0].flightDetails[i]
        let obj = {
            "departure": `${mySegment.DepartureCityCode}`,
            "arrival": `${mySegment.ArrivalCityCode}`,
            "departureDateTime": `${mySegment.DepDateTime.replace(/\s+/g, '')}`,
            "arrivalDateTime": `${mySegment.ArrDateTime.replace(/\s+/g, '')}`,
            "flightNumber": `${mySegment.FlightNumber}`
        }
        segmentOn.push(obj);
    }

    for (let i = 0; i < arr.returnFlight.Segments[0].flightDetails.length; i++) {
        let mySegment = arr.returnFlight.Segments[0].flightDetails[i]
        let obj = {
            "departure": `${mySegment.DepartureCityCode}`,
            "arrival": `${mySegment.ArrivalCityCode}`,
            "departureDateTime": `${mySegment.DepDateTime.replace(/\s+/g, '')}`,
            "arrivalDateTime": `${mySegment.ArrDateTime.replace(/\s+/g, '')}`,
            "flightNumber": `${mySegment.FlightNumber}`
        }
        segmentRe.push(obj);
    }

    flight = [
        {
            "departure": `${arr.onwardFlight.Origin.CityCode}`,
            "arrival": `${arr.onwardFlight.Destination.CityCode}`,
            "departureDateTime": `${arr.onwardFlight.Origin.DepDateTime.replace(/\s+/g, '')}`,
            "BasicFare": arr.onwardFlight.Segments[0].FareBreakup.BaseFare,
            "GrossFare": arr.onwardFlight.Segments[0].FareBreakup.PublishedFare,
            "segments": segmentOn
        },
        {
            "departure": `${arr.returnFlight.Origin.CityCode}`,
            "arrival": `${arr.returnFlight.Destination.CityCode}`,
            "departureDateTime": `${arr.returnFlight.Origin.DepDateTime.replace(/\s+/g, '')}`,
            "BasicFare": arr.returnFlight.Segments[0].FareBreakup.BaseFare,
            "GrossFare": arr.returnFlight.Segments[0].FareBreakup.PublishedFare,
            "segments": segmentRe
        }
    ]

    flightOnward = [
        {
            "departure": `${arr.onwardFlight.Origin.CityCode}`,
            "arrival": `${arr.onwardFlight.Destination.CityCode}`,
            "departureDateTime": `${arr.onwardFlight.Origin.DepDateTime.replace(/\s+/g, '')}`,
            "BasicFare": arr.onwardFlight.Segments[0].FareBreakup.BaseFare,
            "GrossFare": arr.onwardFlight.Segments[0].FareBreakup.PublishedFare,
            "segments": segmentOn
        }
    ]

    flightReturn = [
        {
            "departure": `${arr.returnFlight.Origin.CityCode}`,
            "arrival": `${arr.returnFlight.Destination.CityCode}`,
            "departureDateTime": `${arr.returnFlight.Origin.DepDateTime.replace(/\s+/g, '')}`,
            "BasicFare": arr.returnFlight.Segments[0].FareBreakup.BaseFare,
            "GrossFare": arr.returnFlight.Segments[0].FareBreakup.PublishedFare,
            "segments": segmentRe
        }
    ]
    //console.log("IF ELSE")
    // Handle the case for the "TBO" supplier
    if (arr.onwardFlight.Supplier === Suppliers.RIYA) {
        try {

            if (arr.Custom === 'Yes') {

                //console.log(arr)
                let fd = new FormData();

                fd.append("traceId", arr.onwardFlight.TraceId);
                fd.append("flightKey", arr.onwardFlight.Segments[0].ResultIndex);
                fd.append("adult", arr.onwardFlight.adults);
                fd.append("child", arr.onwardFlight.childs);
                fd.append("infant", arr.onwardFlight.infants);
                fd.append("flight", JSON.stringify(flightOnward));

                fareResponse = await fetch('/flights/AirSell', {
                    method: 'POST',
                    body : fd
                });

                fareResponse = await fareResponse.json();

                console.log("ONWARD",fareResponse)

                let fd1 = new FormData();

                fd1.append("traceId", arr.returnFlight.TraceId);
                fd1.append("flightKey", arr.returnFlight.Segments[0].ResultIndex);
                fd1.append("adult", arr.returnFlight.adults);
                fd1.append("child", arr.returnFlight.childs);
                fd1.append("infant", arr.returnFlight.infants);
                fd1.append("flight", JSON.stringify(flightReturn));
                console.log(arr.returnFlight.Segments[0].ResultIndex)
                console.log(arr.onwardFlight.Segments[0].ResultIndex)

                fareResponse1 = await fetch('/flights/AirSell', {
                    method: 'POST',
                    body : fd1
                });

                fareResponse1 = await fareResponse1.json();

                console.log("RETURN",fareResponse1)

            }
            ///Fixed Fare Breakup
            else {
                let fd = new FormData();
                fd.append("traceId", arr.onwardFlight.TraceId);
                fd.append("flightKeyOnward", arr.onwardFlight.Segments[0].ResultIndex);
                fd.append("flightKeyReturn", arr.returnFlight.Segments[0].ResultIndex);
                fd.append("adult", arr.onwardFlight.adults);
                fd.append("child", arr.onwardFlight.childs);
                fd.append("infant", arr.onwardFlight.infants);
                fd.append("flights", JSON.stringify(flight));
                // Fetch fare rule asynchronously
                fareResponse = await fetch("/flights/AirSell-2Way", {
                    method: "POST",
                    body: fd
                });

                // Parse JSON response
                fareResponse = await fareResponse.json();

                console.log(fareResponse);
            }


            if (fareResponse.ResponseStatus === 1) {
                // fareBreakupResponse = await fetch("/flights/fetchQuote", {
                //     method : "POST",
                //     body : fd
                // });

                // fareBreakupResponse = await fareBreakupResponse.json();
                //
                // console.log(fareBreakupResponse);

                if (fareResponse.ResponseStatus === 1) {

                    // Render TBO fare card
                    let TBOFareCard = new TBOFareBreakupCardFixed(fareResponse.response.response, 0);
                    document.getElementById("fareSummary").innerHTML = TBOFareCard.render();

                    Array(parseInt(arr.onwardFlight.adults)).fill().forEach((_, index) => {
                        let passportAtBook = fareResponse.response.response?.Flights[0]?.IspassportNumberblanktopass || true;
                        let passportAtTicket = fareResponse.response.response?.Flights[0]?.Ispassportdetailsblank || true;
                        let adultForm = new PassengerForm("Adult", index + 1, passportAtBook, passportAtTicket);
                        document.getElementById("AdultForm").innerHTML += adultForm.render()
                        // You can apply any logic here for each adult
                    });

                    Array(parseInt(arr.onwardFlight.childs)).fill().forEach((_, index) => {
                        let passportAtBook = fareResponse.response.response?.Flights[0]?.IspassportNumberblanktopass || true;
                        let passportAtTicket = fareResponse.response.response?.Flights[0]?.Ispassportdetailsblank || true;
                        let adultForm = new PassengerForm("Child", index + 1, passportAtBook, passportAtTicket);
                        document.getElementById("childForm").innerHTML += adultForm.render()
                        // You can apply any logic here for each adult
                    });

                    Array(parseInt(arr.onwardFlight.infants)).fill().forEach((_, index) => {
                        let passportAtBook = fareResponse.response.response?.Flights[0]?.IspassportNumberblanktopass || true;
                        let passportAtTicket = fareResponse.response.response?.Flights[0]?.Ispassportdetailsblank || true;
                        let adultForm = new PassengerForm("Infant", index + 1, passportAtBook, passportAtTicket);
                        document.getElementById("infantForm").innerHTML += adultForm.render()
                        // You can apply any logic here for each adult
                    });

                    // Loop through the segments for each fareBreakup result
                    // fareResponse.response.response.Flights.Segments.forEach(segmentGroup => {
                    //     console.log(segmentGroup);
                    //
                    //     // Loop through individual segments within the segment group
                    //     segmentGroup.forEach(segment => {
                    //             let existingSegment = segmentArray.find(item => item.Origin === segment.Origin.Airport.AirportCode && item.Destination === segment.Destination.Airport.AirportCode);
                    //             if (!existingSegment) {
                    //                 segmentArray.push({
                    //                     "Origin": segment.Origin.Airport.AirportCode,
                    //                     "Destination": segment.Destination.Airport.AirportCode,
                    //                 });
                    //             }
                    //
                    //     });
                    // });

                    fareResponse.response.response.Flights.forEach(flight => {
                        // Access the main Origin-Destination data from the top-level OriginDestination object
                        const originCode = flight.OriginDestination.Departure;
                        const destinationCode = flight.OriginDestination.Arrival;

                        // Check if this origin-destination pair is already in segmentArray
                        let existingSegment = segmentArray.find(
                            item => item.Origin === originCode && item.Destination === destinationCode
                        );

                        // If it doesn't exist, add it to segmentArray
                        if (!existingSegment) {
                            segmentArray.push({
                                "Origin": originCode,
                                "Destination": destinationCode,
                            });
                        }

                        // Now, loop through Segments if there are any
                        if (Array.isArray(flight.Segments)) {
                            flight.Segments.forEach(segment => {
                                const segOriginCode = segment.OriginDestination.Departure;
                                const segDestinationCode = segment.OriginDestination.Arrival;

                                // Check if this segment origin-destination pair is already in segmentArray
                                let existingSegmentInSegments = segmentArray.find(
                                    item => item.Origin === segOriginCode && item.Destination === segDestinationCode
                                );

                                // If it doesn't exist, add it to segmentArray
                                if (!existingSegmentInSegments) {
                                    segmentArray.push({
                                        "Origin": segOriginCode,
                                        "Destination": segDestinationCode,
                                    });
                                }
                            });
                        }
                    });


                    fareResponse.response.response.Flights.forEach(flight => {
                        // Get the segments array for each flight
                        const segments = flight.Segments;

                        if (segments && segments.length > 0) {
                            // Get the origin of the first segment and destination of the last segment
                            const originCode = segments[0].OriginDestination.Departure;
                            const destinationCode = segments[segments.length - 1].OriginDestination.Arrival;

                            // Check if this origin-destination pair is already in segmentArray
                            let existingSegment = segmentArray.find(
                                item => item.Origin === originCode && item.Destination === destinationCode
                            );

                            // If it doesn't exist, add it to segmentArray
                            if (!existingSegment) {
                                segmentArray.push({
                                    "Origin": originCode,
                                    "Destination": destinationCode,
                                });
                            }
                        }
                    });

                    console.log(segmentArray);


                    if (ssrResponse.ResponseStatus === 1) {

                        let MealDynamic = ssrResponse.response?.MealDynamic?.[0] || "NO MEAL";
                        let Meal = ssrResponse.response?.Meal || "NO MEAL";

                        if (MealDynamic !== "NO MEAL") {


                            let flag = false;
                            segmentArray.forEach((sector, index) => {
                                MealDynamic.forEach((meal, index) => {
                                    console.log(meal.Origin);
                                    console.log(sector.Origin);
                                    if (sector.Origin === meal.Origin && sector.Destination === meal.Destination) {
                                        flag = true;

                                    }
                                })
                                if (flag) {
                                    let mealSector = {
                                        Origin: sector.Origin,
                                        Destination: sector.Destination
                                    }
                                    console.log(mealSector);
                                    let mealSec = new mealSectors(mealSector, index);
                                    console.log(mealSec.renderMealSectors())
                                    document.getElementById("mealSectors").innerHTML += mealSec.renderMealSectors();
                                }
                            })

                        } else if (Meal !== "NO MEAL") {
                            let mealSector = {
                                Origin: arr.Origin.CityCode,
                                Destination: arr.Destination.CityCode
                            }
                            console.log(mealSector);
                            let mealSec = new mealSectors(mealSector, 0);
                            console.log(mealSec.renderMealSectors())
                            document.getElementById("mealSectors").innerHTML += mealSec.renderMealSectors();

                        } else {
                            toastMixin.fire({
                                animation: true,  // Enables animation for the toast
                                icon: 'error',  // This sets the warning icon
                                title: `No Extra Meal Facility Available For This FLight.`
                            });
                        }

                        let BaggageDynamic = ssrResponse.response?.Baggage || "NO BAGGAGE";

                        if (BaggageDynamic !== "NO BAGGAGE") {
                            let baggageflag = false;
                            segmentArray.forEach((sector, index) => {
                                BaggageDynamic[0].forEach((meal, index) => {
                                    console.log(meal.Origin);
                                    console.log(sector.Origin);
                                    if (sector.Origin === meal.Origin && sector.Destination === meal.Destination) {
                                        baggageflag = true;

                                    }
                                })
                                if (baggageflag) {
                                    let mealSector = {
                                        Origin: sector.Origin,
                                        Destination: sector.Destination
                                    }
                                    console.log(mealSector);
                                    let mealSec = new baggageSectors(mealSector, index);
                                    console.log(mealSec.renderBaggageSectors())
                                    document.getElementById("baggageSectors").innerHTML += mealSec.renderBaggageSectors()
                                }
                            })

                        } else {
                            toastMixin.fire({
                                animation: true,  // Enables animation for the toast
                                icon: 'error',  // This sets the warning icon
                                title: `No Extra Baggage Facility Available For This FLight.`
                            });
                        }

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

                } else {
                    toastMixin.fire({
                        animation: true,  // Enables animation for the toast
                        icon: 'error',  // This sets the warning icon
                        title: `This Flight is no Longer Available Please Try With another Flight.`
                    });
                }

            } else {
                toastMixin.fire({
                    animation: true,  // Enables animation for the toast
                    icon: 'error',  // This sets the warning icon
                    title: `This Flight is no Longer Available Please Try With another Flight.`
                });
            }

        } catch (e) {
            console.log(e);
        }
    } else if (arr.Supplier === Suppliers.TRIPJACK) {
        try {
            let fd = new FormData();
            fd.append("traceId", arr.Segments[0].ResultIndex);
            // Fetch fare rule asynchronously
            fareBreakupResponse = await fetch("/flights/fetchReview", {
                method: "POST",
                body: fd
            });

            // Parse JSON response
            fareBreakupResponse = await fareBreakupResponse.json();

            console.log(fareBreakupResponse);

            if (fareBreakupResponse.ResponseStatus === 1) {

                // Render TRIPJACK fare card
                let TRIPJACKFareCard = new TRIPJACKFareBreakupCardFixed(fareBreakupResponse.response, arr.adults, arr.childs, arr.infants);
                document.getElementById("fareSummary").innerHTML = TRIPJACKFareCard.render();


                Array(parseInt(arr.adults)).fill().forEach((_, index) => {
                    let pmValue = fareBreakupResponse.response?.conditions?.pcs?.pm || false; // Fallback value if pm is missing
                    let adultForm = new PassengerForm1("Adult", index + 1, pmValue, pmValue);
                    document.getElementById("AdultForm").innerHTML += adultForm.render()
                    // You can apply any logic here for each adult
                });

                Array(parseInt(arr.childs)).fill().forEach((_, index) => {
                    let pmValue = fareBreakupResponse.response?.conditions?.pcs?.pm || false; // Fallback value if pm is missing
                    let adultForm = new PassengerForm1("Child", index + 1, pmValue, pmValue);
                    document.getElementById("childForm").innerHTML += adultForm.render()
                    // You can apply any logic here for each adult
                });

                Array(parseInt(arr.infants)).fill().forEach((_, index) => {
                    let pmValue = fareBreakupResponse.response?.conditions?.pcs?.pm || false; // Fallback value if pm is missing
                    let adultForm = new PassengerForm1("Infant", index + 1, pmValue, pmValue);
                    document.getElementById("infantForm").innerHTML += adultForm.render()
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


                let ExistingSegment = segmentArray.find(item => item.Origin === fareBreakupResponse.response.tripInfos[0].sI[0].da.cityCode && item.Destination === fareBreakupResponse.response.tripInfos[0].sI[seg - 1].aa.cityCode);
                let returnExistingSegment = segmentArray.find(item => item.Origin === fareBreakupResponse.response.tripInfos[0].sI[0].da.cityCode && item.Destination === fareBreakupResponse.response.tripInfos[0].sI[seg - 1].aa.cityCode);
                if (!ExistingSegment) {
                    segmentArray.push({
                        "Origin": fareBreakupResponse.response.tripInfos[0].sI[0].da.cityCode,
                        "Destination": fareBreakupResponse.response.tripInfos[0].sI[seg - 1].aa.cityCode,
                    });
                }
                if (!returnExistingSegment) {
                    segmentArray.push({
                        "Origin": fareBreakupResponse.response.tripInfos[1].sI[0].da.cityCode,
                        "Destination": fareBreakupResponse.response.tripInfos[1].sI[returnSeg - 1].aa.cityCode,
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

            } else {
                let timerInterval;
                Swal.fire({
                    icon: "warning",
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
                        window.location.href = "/tdoFlight";
                    }
                });
            }

        } catch (e) {
            console.log(e);
        }
    }

}

// Function to initialize the phone input field
$(document).ready(function () {
    $('#mobile').intlTelInput({
        initialCountry: "ae", // Default initial country
        separateDialCode: true, // Shows the dial code separately in the input
    });
});

// Function to initialize the phone input field
$(document).ready(function () {
    var phoneInput = $('#mobile').intlTelInput({
        initialCountry: "ae", // Default initial country (UAE)
        separateDialCode: true, // Shows the dial code separately
    });

    // Set initial maxlength and minlength based on the default country
    var countryData = phoneInput.intlTelInput("getSelectedCountryData");
    var initialCountryCode = countryData.iso2;

    // Apply validation based on the initial country
    setValidationForCountry(initialCountryCode);

    // Listen for country change
    $('#mobile').on('countrychange', function () {
        var countryData = phoneInput.intlTelInput("getSelectedCountryData");
        var selectedCountryCode = countryData.iso2;
        setValidationForCountry(selectedCountryCode);
    });

    function setValidationForCountry(countryCode) {
        switch (countryCode) {
            case 'ae': // UAE
                $('#mobile').attr('minlength', 9);
                $('#mobile').attr('maxlength', 9); // Allow 9 digits only
                break;
            case 'us': // USA
            case 'in': // India
                $('#mobile').attr('minlength', 10);
                $('#mobile').attr('maxlength', 10);
                break;
            default:
                $('#mobile').attr('minlength', 9);
                $('#mobile').attr('maxlength', 15); // General format if country-specific not defined
                break;
        }
    }
});

// Toggle GST form visibility/
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
    const interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = 0;
            clearInterval(interval);
            Swal.fire({
                title: 'Time is up!',
                html: '<div style="font-size: 18px;">The timer has ended.</div>',
                iconHtml: '<img src="https://cdn.jsdelivr.net/npm/sweetalert2@11/assets/success.png" style="width: 50px; height: 50px;">',
                timer: 2000,
                // showConfirmButton: true,
                // confirmButtonText: 'Go Back'
            }).then(() => {
                // Redirect to the previous page
                window.location.href = "/flights"
            });
        }
    }, 1000);
}

// On window load, run the loadFlightDetails function and start the timer
// window.onload = async function () {
//
//     // Call the async function to load flight details first
//     await loadFlightDetails();
//
//     setTimeout(() => {
//         try {
//             // Close the loader before starting the timer
//             Swal.close();
//
//             // Start the timer
//             let fifteenMinutes = 60 * 15,
//                 display = document.getElementById('timer');
//             startTimer(fifteenMinutes, display);
//         } catch (error) {
//             console.error("An error occurred: ", error);
//
//             // Ensure the loader is closed even if an error occurs
//             Swal.close();
//         }
//     }, 1000);
// };
// Confirm booking validation

window.onload = async function () {

    // Call the async function to load flight details first
    await loadFlightDetails();

    setTimeout(() => {
        try {
            // Close the loader before starting the timer
            Swal.close();

            // Start the timer
            let fifteenMinutes = 60 * 15;
            let display = document.getElementById('timer1'); // Updated to 'timer1'

            if (!display) {
                throw new Error("Display element with ID 'timer1' not found.");
            }

            startTimer(fifteenMinutes, display);
        } catch (error) {
            console.error("An error occurred: ", error);

            // Ensure the loader is closed even if an error occurs
            Swal.close();
        }
    }, 1000);
};

async function ConfirmBooking() {
    paxArray = [];
    if ($("#details").valid()) {
        // let totalPrice=document.getElementById("tp").innerText
        // console.log(totalPrice)
        // window.location.href = "/flights/checkout/"+totalPrice
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

        Array(parseInt(arr.onwardFlight.adults)).fill().forEach((_, index) => {
            let passportAtBook = fareResponse?.response?.response?.Flights?.[0]?.IspassportNumberblanktopass || true;
            let passportAtTicket = fareResponse?.response?.response?.Flights?.[0]?.Ispassportdetailsblank || true;
            let adultObject = new makePassengerArray("Adult", fareResponse.response.response.Flights, index + 1, "ADULT", arr.AirlineCode, arr.FlightNumber, passportAtBook, passportAtTicket, "TICKET");
            paxArray.push(adultObject.renderTBO());

        });

        Array(parseInt(arr.onwardFlight.childs)).fill().forEach((_, index) => {
            let passportAtBook = fareResponse?.response?.response?.Flights?.[0]?.IspassportNumberblanktopass || true;
            let passportAtTicket = fareResponse?.response?.response?.Flights?.[0]?.Ispassportdetailsblank || true;
            let childObject = new makePassengerArray("Child", fareResponse.response.response.Flights, index + 1, "CHILD", arr.AirlineCode, arr.FlightNumber, passportAtBook, passportAtTicket, "TICKET");
            paxArray.push(childObject.renderTBO());

        });

        Array(parseInt(arr.onwardFlight.infants)).fill().forEach((_, index) => {
            let passportAtBook = fareResponse?.response?.response?.Flights?.[0]?.IspassportNumberblanktopass || true;
            let passportAtTicket = fareResponse?.response?.response?.Flights?.[0]?.Ispassportdetailsblank || true;
            let infantObject = new makePassengerArray("Infant", fareResponse.response.response.Flights, index + 1, "INFANT", arr.AirlineCode, arr.FlightNumber, passportAtBook, passportAtTicket, "TICKET");
            paxArray.push(infantObject.renderTBO());

        });

        console.log(paxArray);

        if (paxArray.length > 0) {
            let fd = new FormData();

            fd.append("traceId", arr.onwardFlight.TraceId);
            fd.append("flight", JSON.stringify(flight))
            fd.append("sellKey", fareResponse.response.response.SellKey);
            fd.append("passengers", JSON.stringify(paxArray));
            fd.append("email", document.getElementById(`leademail`).value);
            fd.append("mobile", document.getElementById(`mobile`).value);
            fd.append('total', totalAmount);
            fd.append("hold", fareResponse.response.response.HoldAvailable);
            fd.append("revised", fareResponse.response.response.Isfarerevised);
            fd.append("totalAdult", arr.onwardFlight.adults);
            fd.append("totalChild", arr.onwardFlight.childs);
            fd.append("totalInfant", arr.onwardFlight.infants);
            fd.append("trip", "RoundTrip");
            fd.append("riyaTrip", "R")

            let res = await fetch("/flights/goToCheckout", {
                method: "POST",
                body: fd,
            });

            if (res.ok) {
                Swal.close();
                window.location.href = '/flights/flightCheckout';

            } else {
                Swal.close();
                alert("problem");
            }

            console.log(res)
        }

    }
    //
    // var currentDate = new Date();
    // // Get the current date and time
    // var currentYear = currentDate.getFullYear();
    // var currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1
    // var currentDay = currentDate.getDate();
    // var currentHour = currentDate.getHours();
    // var currentMinute = currentDate.getMinutes();
    // var currentSecond = currentDate.getSeconds();
    // let am_pm = '';
    // if (currentHour > 12)
    //     am_pm = "PM"
    // else
    //     am_pm = "AM"
    //
    // let bookDT = `${currentYear + "/" + currentMonth + "/" + currentDay} ${currentHour + ':' + currentMinute + ":" + currentSecond}`
    // console.log(bookDT);
    // let AdultBaseFare = 0;
    // let ChildBaseFare = 0;
    // let InfantBaseFare = 0;
    // let AdultTax = 0;
    // let ChildTax = 0;
    // let InfantTax = 0;
    // let gst = "NOT NEEDED";
    //
    //
    // // Check if GST checkbox is checked
    // if ($('#gst-checkbox').is(':checked')) {
    //     // Validate GST Form if the checkbox is checked
    //     const gstIsValid = await validateGSTForm();
    //
    //     if (!gstIsValid) {
    //         // If GST validation fails, return early and stop further execution
    //         console.log("GST validation failed.");
    //         return;
    //     }
    //     else
    //     {
    //         const gstNumber = document.getElementsByName("gstnumber")[0].value;
    //         const companyName = document.getElementsByName("gstcompany")[0].value;
    //         const companyEmail = document.getElementsByName("gstemail")[0].value;
    //         const gstPhone = document.getElementsByName("gstphone")[0].value;
    //         const gstAddress = document.getElementsByName("gstaddress")[0].value;
    //
    //         gst = {
    //             gstNumber : gstNumber,
    //             companyName : companyName,
    //             companyEmail : companyEmail,
    //             gstPhone : gstPhone,
    //             gstAddress : gstAddress
    //         }
    //     }
    // }
    //
    //
    // if ($("#details").valid()) {
    //
    //     Swal.fire({
    //         html: `
    //         <div class="loading-container">
    //             <img src="/images/new.gif" class="img-fluid" style="height: 400px;width:400px"/>
    //
    //         </div>
    //     `,
    //         allowOutsideClick: false,
    //         showConfirmButton: false,
    //         background: 'transparent',
    //         customClass: {
    //             popup: 'custom-toast'
    //         }
    //     });
    //     if(arr.Supplier === Suppliers.TBO)
    //     {
    //         Array(parseInt(arr.adults)).fill().forEach((_, index) => {
    //             let passportAtBook = fareBreakupResponse.response?.Results?.IsPassportRequiredAtBook || false;
    //             let passportAtTicket = fareBreakupResponse.response?.Results?.IsPassportRequiredAtTicket || false;
    //             let adultObject = new makePassengerArray("Adult",fareBreakupResponse.response.Results, index+1, 1, arr.AirlineCode, arr.FlightNumber, passportAtBook, passportAtTicket, "TICKET",gst);
    //             paxArray.push(adultObject.renderTBO());
    //             AdultBaseFare = adultObject.renderTBO().Fare.BaseFare;
    //             AdultTax = adultObject.renderTBO().Fare.Tax;
    //         });
    //
    //         Array(parseInt(arr.childs)).fill().forEach((_, index) => {
    //             let passportAtBook = fareBreakupResponse.response?.Results?.IsPassportRequiredAtBook || false;
    //             let passportAtTicket = fareBreakupResponse.response?.Results?.IsPassportRequiredAtTicket || false;
    //             let childObject = new makePassengerArray("Child",fareBreakupResponse.response.Results, index+1, 2, arr.AirlineCode, arr.FlightNumber, passportAtBook, passportAtTicket, "TICKET", gst);
    //             paxArray.push(childObject.renderTBO());
    //             ChildBaseFare = childObject.renderTBO().Fare.BaseFare;
    //             ChildTax = childObject.renderTBO().Fare.Tax;
    //         });
    //
    //         Array(parseInt(arr.infants)).fill().forEach((_, index) => {
    //             let passportAtBook = fareBreakupResponse.response?.Results?.IsPassportRequiredAtBook || false;
    //             let passportAtTicket = fareBreakupResponse.response?.Results?.IsPassportRequiredAtTicket || false;
    //             let infantObject = new makePassengerArray("Infant",fareBreakupResponse.response.Results, index+1, 3, arr.AirlineCode, arr.FlightNumber, passportAtBook, passportAtTicket, "TICKET", gst);
    //             paxArray.push(infantObject.renderTBO());
    //             InfantBaseFare = infantObject.renderTBO().Fare.BaseFare;
    //             InfantTax = infantObject.renderTBO().Fare.Tax;
    //         });
    //
    //         console.log(paxArray);
    //
    //
    //
    //
    //         if(paxArray.length > 0)
    //         {
    //             let otherData = {
    //                 "origin" : arr.Origin.CityCode,
    //                 "destination" : arr.Destination.CityCode,
    //                 "fareType" : arr.Segments[0].fare,
    //                 "adultBaseFare" : AdultBaseFare,
    //                 "childBaseFare" : ChildBaseFare,
    //                 "infantBaseFare" : InfantBaseFare,
    //                 "adultTax" : AdultTax,
    //                 "childTax" : ChildTax,
    //                 "infantTax" : InfantTax,
    //                 "otherCharges" : fareBreakupResponse.response.Results.Fare.OtherCharges,
    //                 "serviceFee" : fareBreakupResponse.response.Results.Fare.ServiceFee,
    //                 "publishedFare" : fareBreakupResponse.response.Results.Fare.PublishedFare,
    //                 "offeredFare" : fareBreakupResponse.response.Results.Fare.OfferedFare
    //             }
    //
    //
    //
    //             if(fareBreakupResponse.response.Results.IsLCC)
    //             {
    //                 let fd = new FormData();
    //
    //                 fd.append("traceId", arr.TraceId);
    //                 fd.append("ResultIndex", arr.Segments[0].ResultIndex);
    //                 fd.append("Passengers", JSON.stringify(paxArray));
    //                 fd.append("otherData", JSON.stringify(otherData))
    //                 fd.append("totalPax", parseInt(arr.adults) + parseInt(arr.childs) + parseInt(arr.infants));
    //                 fd.append("totalAdult", arr.adults);
    //                 fd.append("totalChild", arr.childs);
    //                 fd.append("totalInfant", arr.infants);
    //                 fd.append("stops", arr.Segments[0].flightDetails.length-1);
    //                 fd.append("price", fareBreakupResponse.response.IsPriceChanged);
    //                 fd.append("passport", []);
    //                 fd.append("flightType", 'lccWithPass');
    //                 fd.append("total",totalAmount);
    //                 fd.append("agentEmail", localStorage.getItem("agentEmail"));
    //                 fd.append("bookDT", bookDT);
    //                 fd.append("lastTicketDate", "");
    //                 fd.append("isRefundable", fareBreakupResponse.response.Results.IsRefundable);
    //                 fd.append("tripType", "ONE_WAY");
    //                 fd.append("trip", "departure");
    //                 fd.append("ssrAmount", 0);
    //                 fd.append("markup",0);
    //                 fd.append("platformFee", 0);
    //                 fd.append("platformTax", 0);
    //
    //                 let res = await fetch("/goToCheckout", {
    //                     method: "POST",
    //                     body: fd
    //                 });
    //
    //
    //                 if(res.ok)
    //                 {
    //                     window.location.href = '/flightCheckout';
    //                 }
    //                 else
    //                 {
    //                     alert("problem")
    //                 }
    //             }
    //             else
    //             {
    //                 let fd = new FormData();
    //
    //                 fd.append("traceId", arr.TraceId);
    //                 fd.append("ResultIndex", arr.Segments[0].ResultIndex);
    //                 fd.append("Passengers", JSON.stringify(paxArray));
    //                 fd.append("otherData", JSON.stringify(otherData))
    //                 fd.append("totalPax", parseInt(arr.adults) + parseInt(arr.childs) + parseInt(arr.infants));
    //                 fd.append("totalAdult", arr.adults);
    //                 fd.append("totalChild", arr.childs);
    //                 fd.append("totalInfant", arr.infants);
    //                 fd.append("stops", arr.Segments[0].flightDetails.length-1);
    //                 fd.append("price", fareBreakupResponse.response.IsPriceChanged);
    //                 fd.append("passport", []);
    //                 fd.append("flightType", 'directTicket');
    //                 fd.append("total",totalAmount);
    //                 fd.append("agentEmail", localStorage.getItem("agentEmail"));
    //                 fd.append("bookDT", bookDT);
    //                 fd.append("lastTicketDate", "");
    //                 fd.append("isRefundable", fareBreakupResponse.response.Results.IsRefundable);
    //                 fd.append("tripType", "ONE_WAY");
    //                 fd.append("trip", "departure");
    //                 fd.append("ssrAmount", 0);
    //                 fd.append("markup",0);
    //                 fd.append("platformFee", 0);
    //                 fd.append("platformTax", 0);
    //
    //                 let res = await fetch("/flights/directBooking", {
    //                     method: "POST",
    //                     body: fd
    //                 });
    //
    //
    //                 res = await res.json();
    //
    //                 console.log(res);
    //
    //                 let passportDetailsArray = [];
    //
    //
    //                 if (res.ResponseStatus === 1) {
    //
    //                     let fd1 = new FormData();
    //
    //
    //                     fd1.append("traceId", arr.TraceId);
    //                     fd1.append("ResultIndex", arr.Segments[0].ResultIndex);
    //                     fd1.append("PNR", res.response.Response.PNR);
    //                     fd1.append("BookingId", res.response.Response.BookingId);
    //                     fd1.append("Passengers", JSON.stringify(paxArray));
    //                     fd1.append("otherData", JSON.stringify(otherData))
    //                     fd1.append("totalPax", parseInt(arr.adults) + parseInt(arr.childs) + parseInt(arr.infants));
    //                     fd1.append("totalAdult", arr.adults);
    //                     fd1.append("totalChild", arr.childs);
    //                     fd1.append("totalInfant", arr.infants);
    //                     fd1.append("passport", JSON.stringify(passportDetailsArray));
    //                     fd1.append("bookingNo", res.bid);
    //                     fd1.append("stops", arr.Segments[0].flightDetails.length-1);
    //                     fd1.append("price", fareBreakupResponse.response.IsPriceChanged);
    //                     fd1.append("passport", []);
    //                     fd1.append("flightType", 'directTicket');
    //                     fd1.append("total",totalAmount);
    //                     fd1.append("agentEmail", localStorage.getItem("agentEmail"));
    //                     fd1.append("bookDT", bookDT);
    //                     fd1.append("lastTicketDate", "");
    //                     fd1.append("isRefundable", fareBreakupResponse.response.Results.IsRefundable);
    //                     fd1.append("tripType", "ONE_WAY");
    //                     fd1.append("trip", "departure");
    //                     fd1.append("ssrAmount", 0);
    //                     fd1.append("markup",0);
    //                     fd1.append("platformFee", 0);
    //                     fd1.append("platformTax", 0);
    //
    //                     let res1 = await fetch("/goToCheckout", {
    //                         method: "POST",
    //                         body: fd1
    //                     });
    //
    //
    //                     if(res1.ok)
    //                     {
    //                         window.location.href = '/flightCheckout';
    //                     }
    //                     else
    //                     {
    //                         alert("problem")
    //                     }
    //
    //
    //                 }
    //                 else if (res.ResponseStatus === 14) {
    //                     let timerInterval;
    //                     Swal.fire({
    //                         title: "Return Flight Failed",
    //                         icon : "error",
    //                         html:  `<h2 style="color: red">Error Occurred</h2> <br> <b></b> milliseconds.`,
    //                         timer: 4000,
    //                         timerProgressBar: true,
    //                         allowOutsideClick: false,  // Disable outside click
    //                         didOpen: () => {
    //                             Swal.showLoading();
    //                             const timer = Swal.getPopup().querySelector("b");
    //                             timerInterval = setInterval(() => {
    //                                 timer.textContent = `${Swal.getTimerLeft()}`;
    //                             }, 100);
    //                         },
    //                         willClose: () => {
    //                             clearInterval(timerInterval);
    //                         }
    //                     }).then(async (result) => {
    //                         /* Read more about handling dismissals below */
    //                         if (result.dismiss === Swal.DismissReason.timer) {
    //                             window.location.href="/FailedBookings"
    //                         }
    //                     });
    //                 }
    //                 else {
    //                     let timerInterval;
    //                     Swal.fire({
    //                         title: "Book Flight Failed",
    //                         icon : "error",
    //                         html:  `<h2 style="color: red">Error Occurred</h2> <br> <b></b> milliseconds.`,
    //                         timer: 4000,
    //                         timerProgressBar: true,
    //                         allowOutsideClick: false,  // Disable outside click
    //                         didOpen: () => {
    //                             Swal.showLoading();
    //                             const timer = Swal.getPopup().querySelector("b");
    //                             timerInterval = setInterval(() => {
    //                                 timer.textContent = `${Swal.getTimerLeft()}`;
    //                             }, 100);
    //                         },
    //                         willClose: () => {
    //                             clearInterval(timerInterval);
    //                         }
    //                     }).then(async (result) => {
    //                         /* Read more about handling dismissals below */
    //                         if (result.dismiss === Swal.DismissReason.timer) {
    //                             window.location.href="/FailedBookings"
    //                         }
    //                     });
    //                 }
    //             }
    //
    //         }
    //     }
    //     else if(arr.Supplier === Suppliers.TRIPJACK)
    //     {
    //         Array(parseInt(arr.adults)).fill().forEach((_, index) => {
    //             let pmValue = fareBreakupResponse.response?.conditions?.pcs?.pm || false; // Fallback value if pm is missing
    //             let adultObject = new makePassengerArray("Adult",fareBreakupResponse.response.tripInfos[0], index+1, 1, arr.AirlineCode, arr.FlightNumber, pmValue, pmValue, "TICKET", gst);
    //             paxArray.push(adultObject.renderTRIPJACK());
    //         });
    //
    //         Array(parseInt(arr.childs)).fill().forEach((_, index) => {
    //             let pmValue = fareBreakupResponse.response?.conditions?.pcs?.pm || false; // Fallback value if pm is missing
    //             let childObject = new makePassengerArray("Child",fareBreakupResponse.response.tripInfos[0], index+1, 2, arr.AirlineCode, arr.FlightNumber, pmValue, pmValue, "TICKET", gst);
    //             paxArray.push(childObject.renderTRIPJACK());
    //         });
    //
    //         Array(parseInt(arr.infants)).fill().forEach((_, index) => {
    //             let pmValue = fareBreakupResponse.response?.conditions?.pcs?.pm || false; // Fallback value if pm is missing
    //             let infantObject = new makePassengerArray("Infant",fareBreakupResponse.response.tripInfos[0], index+1, 3, arr.AirlineCode, arr.FlightNumber, pmValue, pmValue, "TICKET", gst);
    //             paxArray.push(infantObject.renderTRIPJACK());
    //         });
    //
    //         if(paxArray.length > 0){
    //             let fd = new FormData();
    //             fd.append("supplier", 'TRIPJACK');
    //             fd.append("bookingId", fareBreakupResponse.response.bookingId);
    //             fd.append("TF", parseFloat(fareBreakupResponse.response.totalPriceInfo.totalFareDetail.fC.TF));
    //             fd.append("email", document.getElementById(`leademail`).value);
    //             fd.append("contact", document.getElementById(`mobile`).value);
    //             fd.append("traceId", arr.Segments[0].ResultIndex);
    //             fd.append("Passengers", JSON.stringify(paxArray));
    //             fd.append("totalPax", parseInt(arr.adults) + parseInt(arr.childs) + parseInt(arr.infants));
    //             fd.append("totalAdult", arr.adults);
    //             fd.append("totalChild", arr.childs);
    //             fd.append("totalInfant", arr.infants);
    //             fd.append("stops", arr.Segments[0].flightDetails.length -1);
    //             fd.append("gst",JSON.stringify(gst));
    //             fd.append("total", totalAmount);
    //             fd.append("returnMarkup", 0);
    //             fd.append("agentEmail", localStorage.getItem("agentEmail"));
    //             fd.append("bookDT", bookDT);
    //             fd.append("tripType", "ONE_WAY");
    //             fd.append("ssrAmount", 0);
    //             fd.append("markup", 0);
    //             fd.append("platformFee", 0);
    //             fd.append("platformTax", 0);
    //             fd.append("isDomestic", fareBreakupResponse.response.searchQuery.isDomestic);
    //             fd.append("fareType", arr.Segments[0].fare);
    //
    //             let res = await fetch("/goToCheckout", {
    //                 method: "POST",
    //                 body: fd
    //             });
    //
    //             if (res.ok) {
    //                 window.location.href = '/flightCheckout';
    //             } else {
    //                 alert("problem");
    //             }
    //         }
    //     }
    // }
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
        if (arr.Supplier === Suppliers.TBO) {
            Array(parseInt(arr.adults)).fill().forEach((_, index) => {
                let passportAtBook = fareBreakupResponse.response?.[1]?.Results?.IsPassportRequiredAtBook || false;
                let passportAtTicket = fareBreakupResponse.response?.[1]?.Results?.IsPassportRequiredAtTicket || false;
                let adultObject = new makePassengerArray("Adult", fareBreakupResponse.response[1].Results, index + 1, 1, arr.AirlineCode, arr.FlightNumber, passportAtBook, passportAtTicket, "TICKET", gst, 1);
                paxArray.push(adultObject.renderTBO());
                AdultBaseFare = adultObject.renderTBO().Fare.BaseFare;
                AdultTax = adultObject.renderTBO().Fare.Tax;
            });

            Array(parseInt(arr.childs)).fill().forEach((_, index) => {
                let passportAtBook = fareBreakupResponse.response?.[1]?.Results?.IsPassportRequiredAtBook || false;
                let passportAtTicket = fareBreakupResponse.response?.[1]?.Results?.IsPassportRequiredAtTicket || false;
                let childObject = new makePassengerArray("Child", fareBreakupResponse.response[1].Results, index + 1, 2, arr.AirlineCode, arr.FlightNumber, passportAtBook, passportAtTicket, "TICKET", gst, 1);
                paxArray.push(childObject.renderTBO());
                ChildBaseFare = childObject.renderTBO().Fare.BaseFare;
                ChildTax = childObject.renderTBO().Fare.Tax;
            });

            Array(parseInt(arr.infants)).fill().forEach((_, index) => {
                let passportAtBook = fareBreakupResponse.response?.[1]?.Results?.IsPassportRequiredAtBook || false;
                let passportAtTicket = fareBreakupResponse.response?.[1]?.Results?.IsPassportRequiredAtTicket || false;
                let infantObject = new makePassengerArray("Infant", fareBreakupResponse.response[1].Results, index + 1, 3, arr.AirlineCode, arr.FlightNumber, passportAtBook, passportAtTicket, "TICKET", gst, 1);
                paxArray.push(infantObject.renderTBO());
                InfantBaseFare = infantObject.renderTBO().Fare.BaseFare;
                InfantTax = infantObject.renderTBO().Fare.Tax;
            });

            console.log(paxArray);


            if (paxArray.length > 0) {
                let otherData = {
                    "origin": arr.Origin.CityCode,
                    "destination": arr.Destination.CityCode,
                    "fareType": arr.Segments[0].fare,
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

                    fd.append("traceId", arr.TraceId);
                    fd.append("ResultIndex", arr.Segments[0].ResultIndex);
                    fd.append("Passengers", JSON.stringify(paxArray));
                    fd.append("otherData", JSON.stringify(otherData))
                    fd.append("totalPax", parseInt(arr.adults) + parseInt(arr.childs) + parseInt(arr.infants));
                    fd.append("totalAdult", arr.adults);
                    fd.append("totalChild", arr.childs);
                    fd.append("totalInfant", arr.infants);
                    fd.append("stops", arr.Segments[0].flightDetails.length - 1);
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
                } else {
                    let fd = new FormData();

                    fd.append("traceId", arr.TraceId);
                    fd.append("ResultIndex", arr.Segments[0].ResultIndex);
                    fd.append("Passengers", JSON.stringify(paxArray));
                    fd.append("otherData", JSON.stringify(otherData))
                    fd.append("totalPax", parseInt(arr.adults) + parseInt(arr.childs) + parseInt(arr.infants));
                    fd.append("totalAdult", arr.adults);
                    fd.append("totalChild", arr.childs);
                    fd.append("totalInfant", arr.infants);
                    fd.append("stops", arr.Segments[0].flightDetails.length - 1);
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

        Array(parseInt(arr.adults)).fill().forEach((_, index) => {
            let adultForm = new mealPassengers("Adult", index + 1);
            document.getElementById("mealTravellers").innerHTML += adultForm.renderMealPassengers()
            // You can apply any logic here for each adult
        });

        Array(parseInt(arr.childs)).fill().forEach((_, index) => {
            let adultForm = new mealPassengers("Child", index + 1);
            document.getElementById("mealTravellers").innerHTML += adultForm.renderMealPassengers();
            // You can apply any logic here for each adult
        });

        const msector = document.querySelectorAll('.meal-sector');
        const travellers = document.querySelectorAll('.traveller-name');

        updateMealOptions();

        $("#mealModal").modal("show");
    } else {
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

        Array(parseInt(arr.adults)).fill().forEach((_, index) => {
            let adultForm = new baggagePassengers("Adult", index + 1);
            document.getElementById("baggageTravellers").innerHTML += adultForm.renderBaggagePassengers()
            // You can apply any logic here for each adult
        });

        Array(parseInt(arr.childs)).fill().forEach((_, index) => {
            let adultForm = new baggagePassengers("Child", index + 1);
            document.getElementById("baggageTravellers").innerHTML += adultForm.renderBaggagePassengers();
            // You can apply any logic here for each adult
        });

        const msector = document.querySelectorAll('.baggage-sector');
        const travellers = document.querySelectorAll('.traveller-name');

        updateBaggageOptions();

        $("#baggageModal").modal("show");
    } else {
        toastMixin.fire({
            animation: true,  // Enables animation for the toast
            icon: 'warning',  // This sets the warning icon
            title: 'Please Fill Passenger Details First'  // Warning message to display
        });
    }
}


function updateMealOptions() {

    document.getElementById("mealOptions").innerHTML = '';

    const msector = document.querySelectorAll('.meal-sector');
    const travellers = document.querySelectorAll('.traveller-name');

    msector.forEach(function (sector) {
        if (sector.classList.contains('active-meal-sector')) {
            const selectedSectorId = sector.id;
            console.log("Selected Sector ID:", selectedSectorId);

            travellers.forEach((traveller, index) => {
                if (traveller.classList.contains('active-traveller')) {
                    const selectedTraveller = traveller.id;

                    if (arr.Supplier === Suppliers.TBO) {
                        let MealDynamic = ssrResponse.response?.MealDynamic || "NO MEAL";
                        let Meal = ssrResponse.response?.Meal || "NO MEAL";
                        if (MealDynamic !== 'NO MEAL') {
                            MealDynamic.forEach((meal, index) => {
                                if (meal.Origin === selectedSectorId.split("-")[0] && meal.Destination === selectedSectorId.split("-")[1]) {

                                    let mealOption = new mealOptions(meal, index, selectedTraveller, selectedSectorId.split("-")[0], selectedSectorId.split("-")[1], 0)
                                    document.getElementById("mealOptions").innerHTML += mealOption.renderMealDynamicOptions()
                                }
                            })
                        } else if (Meal !== 'NO MEAL') {
                            Meal.forEach((meal, index) => {
                                let mealOption = new mealOptions(meal, index, selectedTraveller, selectedSectorId.split("-")[0], selectedSectorId.split("-")[1], 0, 0)
                                document.getElementById("mealOptions").innerHTML += mealOption.renderMealOptions()

                            })
                        }
                    } else {
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

function updateBaggageOptions() {

    document.getElementById("baggageOptions").innerHTML = '';

    const msector = document.querySelectorAll('.baggage-sector');
    const travellers = document.querySelectorAll('.baggage-traveller-name');

    msector.forEach(function (sector) {
        if (sector.classList.contains('active-baggage-sector')) {
            const selectedSectorId = sector.id;
            console.log("Selected Sector ID:", selectedSectorId);

            travellers.forEach((traveller, index) => {
                if (traveller.classList.contains('active-traveller')) {
                    const selectedTraveller = traveller.id;

                    if (arr.Supplier === Suppliers.TBO) {

                        let Baggage = ssrResponse?.response?.Baggage || "NO BAGGAGE";

                        // Handle Baggage if available
                        if (Baggage !== "NO BAGGAGE") {
                            Baggage.forEach((baggage, index) => {
                                if (baggage.Origin === selectedSectorId.split("-")[0] && baggage.Destination === selectedSectorId.split("-")[1]) {
                                    let baggageOption = new baggageOptions(baggage, index, selectedTraveller, selectedSectorId.split("-")[0], selectedSectorId.split("-")[1], 0, 0);
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

                    } else {
                        fareBreakupResponse.response.tripInfos.forEach((tripInfo, tripInfoIndex) => {
                            tripInfo.sI.forEach((segment, segmentIndex) => {
                                let MealDynamic = tripInfo?.sI[segmentIndex]?.ssrInfo?.BAGGAGE || "NO BAGGAGE";
                                if (MealDynamic !== 'NO BAGGAGE') {
                                    MealDynamic.forEach((meal, index) => {
                                        if (segment.da.cityCode === selectedSectorId.split("-")[0] && segment.aa.cityCode === selectedSectorId.split("-")[1]) {

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
function AddMeal(index, origin, destination, traveller, segmentIndex, price, trip) {

    let m = mealArray.findIndex(me => me.id === traveller && me.origin === origin && me.destination === destination);

    if (m !== -1) {
        toastMixin.fire({
            animation: true,  // Enables animation for the toast
            icon: 'warning',  // This sets the warning icon
            title: `Multiple Meal per Pax are not allowed.`
        });
    } else {
        let meal = {
            index: index,
            id: traveller,
            origin: origin,
            destination: destination,
            price: price,
            trip: trip,
            mealObject: (arr.Supplier === Suppliers.TBO) ? ssrResponse.response?.[trip]?.MealDynamic?.[0]?.[index] || ssrResponse.response?.[trip]?.Meal[index] || 'NO MEAL' : fareBreakupResponse.response?.tripInfos[trip]?.sI[segmentIndex]?.ssrInfo?.MEAL[index] || 'No Meal',
            segmentId: fareBreakupResponse?.response?.tripInfos?.[trip]?.sI?.[segmentIndex].id || 0,
            code: fareBreakupResponse?.response?.tripInfos?.[trip]?.sI?.[segmentIndex]?.ssrInfo?.MEAL?.[index].code
        }

        mealArray.push(meal);

        totalAmount += price;

        document.getElementById("totalAmountSpan").innerHTML = totalAmount;

        toastMixin.fire({
            animation: true,  // Enables animation for the toast
            icon: 'success',  // This sets the warning icon
            title: (arr.Supplier === Suppliers.TBO) ? `${ssrResponse.response?.[trip]?.MealDynamic?.[0]?.[index]?.AirlineDescription || ssrResponse.response?.[trip]?.Meal?.[index]?.Description || 'No Meal'} is Added` : `${fareBreakupResponse.response?.tripInfos[0]?.sI[segmentIndex]?.ssrInfo?.MEAL[index].desc || 'No Meal'} is Added` // Warning message to display
        });

        console.log(mealArray)

        updateMealOptions();
        calculateMealPrice(traveller)
    }
}

function removeMeal(index, mealIndex, segmentIndex, traveller, trip) {
    totalAmount -= mealArray[index].price;

    document.getElementById("totalAmountSpan").innerHTML = totalAmount;

    mealArray.splice(index, 1);

    toastMixin.fire({
        animation: true,  // Enables animation for the toast
        icon: 'success',  // This sets the warning icon
        title: (arr.Supplier === Suppliers.TBO) ? `${ssrResponse.response?.[trip]?.MealDynamic?.[0]?.[mealIndex]?.AirlineDescription || ssrResponse.response?.[trip]?.Meal?.[mealIndex]?.Description || 'No Meal'} is Removed` : `${fareBreakupResponse.response?.tripInfos[0]?.sI[segmentIndex]?.ssrInfo?.MEAL[mealIndex].desc || 'No Meal'} is Removed` // Warning message to display
    });

    updateMealOptions()
    calculateMealPrice(traveller)
}

function AddBaggage(index, origin, destination, traveller, segmentIndex, price, trip) {
    let bag = baggageArray.findIndex(baggage => baggage.id === traveller && baggage.origin === origin && baggage.destination === destination);

    if (bag !== -1) {
        toastMixin.fire({
            animation: true,  // Enables animation for the toast
            icon: 'warning',  // This sets the warning icon
            title: `Multiple baggage per segment are not allowed.`
        });
    } else {
        let meal = {
            index: index,
            id: traveller,
            origin: origin,
            destination: destination,
            price: price,
            trip: trip,
            baggageObject: (arr.Supplier === Suppliers.TBO) ? ssrResponse.response?.[trip]?.Baggage[0][index] || 'NO BAGGAGE' : fareBreakupResponse.response?.tripInfos[trip]?.sI[segmentIndex]?.ssrInfo?.BAGGAGE[index] || 'NO BAGGAGE',
            segmentId: fareBreakupResponse?.response?.tripInfos?.[trip]?.sI?.[segmentIndex].id || 0,
            code: fareBreakupResponse?.response?.tripInfos?.[trip]?.sI?.[segmentIndex]?.ssrInfo?.BAGGAGE?.[index].code
        }

        baggageArray.push(meal);

        totalAmount += price;

        document.getElementById("totalAmountSpan").innerHTML = totalAmount;


        toastMixin.fire({
            animation: true,  // Enables animation for the toast
            icon: 'success',  // This sets the warning icon
            title: (arr.Supplier === Suppliers.TBO) ? `${ssrResponse.response?.[trip]?.Baggage?.[0]?.[index]?.Code || 'NO BAGGAGE'} is Added` : `${fareBreakupResponse.response?.tripInfos[0]?.sI[segmentIndex]?.ssrInfo?.BAGGAGE[index].desc || 'NO BAGGAGE'} is Added` // Warning message to display
        });

        console.log(mealArray)

        updateBaggageOptions();
        calculateBaggagePrice(traveller)
    }

}

function removeBaggage(index, mealIndex, segmentIndex, traveller, trip) {

    totalAmount -= baggageArray[index].price;

    document.getElementById("totalAmountSpan").innerHTML = totalAmount;

    baggageArray.splice(index, 1);

    toastMixin.fire({
        animation: true,  // Enables animation for the toast
        icon: 'success',  // This sets the warning icon
        title: (arr.Supplier === Suppliers.TBO) ? `${ssrResponse.response?.[trip]?.Baggage?.[0]?.[mealIndex]?.Code || 'No BAGGAGE'} is Removed` : `${fareBreakupResponse.response?.tripInfos[0]?.sI[segmentIndex]?.ssrInfo?.BAGGAGE[mealIndex].desc || 'NO BAGGAGE'} is Removed` // Warning message to display
    });

    updateBaggageOptions();
    calculateBaggagePrice(traveller)
}

function calculateMealPrice(index) {
    let personPrice = 0;

    let person = mealArray.filter(p => p.id === index);

    person.forEach(meal => {
        personPrice += meal.price;
    })

    document.getElementById(`${index}separator`).innerHTML = `&#x20b9; ${personPrice}`

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

function calculateBaggagePrice(index) {
    let personPrice = 0;

    let person = baggageArray.filter(p => p.id === index);

    person.forEach(meal => {
        personPrice += meal.price;
    })

    document.getElementById(`${index}baggage`).innerHTML = `&#x20b9; ${personPrice}`

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


function convertToDesiredFormat(dateString) {
    // Parse the input date string
    const date = new Date(dateString);

    // Format: "16 Sep, 2024"
    const options = {day: '2-digit', month: 'short', year: 'numeric'};
    const formattedDate = date.toLocaleDateString('en-GB', options);

    return formattedDate;
}


class mealSectors {
    constructor(sector, index, trip) {
        this.sector = sector;
        this.index = index;
        this.trip = trip;
    }

    renderMealSectors() {
        let active = '';

        active = (this.index === 0 && this.trip === 0) ? 'meal-sector active-meal-sector' : 'meal-sector';

        return `<div class="${active}" id="${this.sector.Origin}-${this.sector.Destination}">${this.sector.Origin} - ${this.sector.Destination}</div>`;
    }
}

class baggageSectors {
    constructor(sector, index, trip) {
        this.sector = sector;
        this.index = index;
        this.trip = trip;
    }

    renderBaggageSectors() {
        let active = '';

        active = (this.index === 0 && this.trip === 0) ? 'baggage-sector active-baggage-sector' : 'baggage-sector';

        return `<div class="${active}" id="${this.sector.Origin}-${this.sector.Destination}">${this.sector.Origin} - ${this.sector.Destination}</div>`;
    }
}

class mealOptions {
    constructor(meal, index, traveller, origin, destination, segmentIndex, trip) {

        this.meal = meal;
        this.index = index;
        this.traveller = traveller;
        this.origin = origin;
        this.destination = destination;
        this.segmentIndex = segmentIndex;
        this.trip = trip;
    }

    renderMealDynamicOptions() {

        let price = this.meal?.Price || this.meal?.amount || 0;
        let button = '';

        let traveller = mealArray.findIndex(meal => meal.id === this.traveller && meal.index === this.index && meal.origin === this.origin && meal.destination === this.destination);

        if (traveller !== -1) {
            button = `<button type="button"
                           class="app-btn app-btn-primary app-btn-medium ssr-card__add-btn" onclick="removeMeal(${traveller}, ${this.index}, ${this.segmentIndex},'${this.traveller}')"
                           style="padding: 0.5rem; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 10px; font-weight: 600;">
              Remove
          </button>`;
        } else {
            button = `<button type="button"
                           class="app-btn app-btn-primary app-btn-medium ssr-card__add-btn" onclick="AddMeal(${this.index},'${this.origin}','${this.destination}','${this.traveller}', ${this.segmentIndex},${price}, ${this.trip})"
                           style="padding: 0.5rem; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 10px; font-weight: 600;">
              Add
          </button>`;
        }


        return `
        <div class="col-sm-6">
    <div class="card p-2 mb-2">
        <div class="d-flex align-items-center">
            <!-- Meal Image -->
            <div>
                <img class="meal-image" src="https://static.iween.co.in/airlinelogos/mealicon.svg"
                     alt="1-Vegetable junglee sandwich in white bread" style="width: 60px; height: auto;">
            </div>

            <!-- Meal Info -->
            <div class="ps-3 pe-3 w-100 d-flex flex-column">
                <div class="flex-1">
                    <p class="ssr-card__meal-name">${this.meal?.AirlineDescription || this.meal?.desc || 'No Meal'}</p>
                    <p class="ssr-card__meal-description"></p>
                </div>

                <!-- Price and Button -->
                <div class="d-flex justify-content-between align-items-center">
                    <p class="ssr-card__meal-name">₹${this.meal?.Price || this.meal?.amount || 0}</p>
                  ${button}
                </div>
            </div>
        </div>
    </div>
</div>

        `;
    }

    renderMealOptions() {

        let price = this.meal?.Price || 0;
        let button = '';

        let traveller = mealArray.findIndex(meal => meal.id === this.traveller && meal.index === this.index && meal.origin === this.origin && meal.destination === this.destination);

        if (traveller !== -1) {
            button = `<button type="button"
                           class="app-btn app-btn-primary app-btn-medium ssr-card__add-btn" onclick="removeMeal(${traveller}, ${this.index}, ${this.segmentIndex},'${this.traveller}',${this.trip})"
                           style="padding: 0.5rem; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 10px; font-weight: 600;">
              Remove
          </button>`;
        } else {
            button = `<button type="button"
                           class="app-btn app-btn-primary app-btn-medium ssr-card__add-btn" onclick="AddMeal(${this.index},'${this.origin}','${this.destination}','${this.traveller}', ${this.segmentIndex},${price},${this.trip})"
                           style="padding: 0.5rem; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 10px; font-weight: 600;">
              Add
          </button>`;
        }


        return `
        <div class="col-sm-6">
    <div class="card p-2 mb-2">
        <div class="d-flex align-items-center">
            <!-- Meal Image -->
            <div>
                <img class="meal-image" src="https://static.iween.co.in/airlinelogos/mealicon.svg"
                     alt="1-Vegetable junglee sandwich in white bread" style="width: 60px; height: auto;">
            </div>

            <!-- Meal Info -->
            <div class="ps-3 pe-3 w-100 d-flex flex-column">
                <div class="flex-1">
                    <p class="ssr-card__meal-name">${this.meal?.Description || 'No Meal'}</p>
                    <p class="ssr-card__meal-description"></p>
                </div>

                <!-- Price and Button -->
                <div class="d-flex justify-content-between align-items-center">
                    <p class="ssr-card__meal-name">₹${this.meal?.Price || 0}</p>
                  ${button}
                </div>
            </div>
        </div>
    </div>
</div>

        `;
    }
}

class baggageOptions {
    constructor(baggage, index, traveller, origin, destination, segmentIndex, trip) {

        this.baggage = baggage;
        this.index = index;
        this.traveller = traveller;
        this.origin = origin;
        this.destination = destination;
        this.segmentIndex = segmentIndex;
        this.trip = trip;
    }

    renderBaggageOptions() {
        if (this.segmentIndex === 0) {

            let price = this.baggage?.Price || this.baggage?.amount || 0;
            let button = '';

            let traveller = baggageArray.findIndex(meal => meal.id === this.traveller && meal.index === this.index && meal.origin === this.origin && meal.destination === this.destination);

            if (traveller !== -1) {
                button = `<button type="button"
                           class="app-btn app-btn-primary app-btn-medium ssr-card__add-btn" onclick="removeBaggage(${traveller}, ${this.index}, ${this.segmentIndex},'${this.traveller}',${this.trip})"
                           style="padding: 0.5rem; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 10px; font-weight: 600;">
              Remove
          </button>`;
            } else {
                button = `<button type="button"
                           class="app-btn app-btn-primary app-btn-medium ssr-card__add-btn" onclick="AddBaggage(${this.index},'${this.origin}','${this.destination}','${this.traveller}', ${this.segmentIndex},${price},${this.trip})"
                           style="padding: 0.5rem; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 10px; font-weight: 600;">
              Add
          </button>`;
            }


            return `
        <div class="col-sm-6">
    <div class="card p-2 mb-2">
        <div class="d-flex align-items-center">
            <!-- Meal Image -->
            <div>
                <img class="meal-image" src="https://static.iween.co.in/airlinelogos/mealicon.svg"
                     alt="1-Vegetable junglee sandwich in white bread" style="width: 60px; height: auto;">
            </div>

            <!-- Meal Info -->
            <div class="ps-3 pe-3 w-100 d-flex flex-column">
                <div class="flex-1">
                    <p class="ssr-card__meal-name">${this.baggage?.Code || this.baggage?.desc || 'No Meal'}</p>
                    <p class="ssr-card__meal-description"></p>
                </div>

                <!-- Price and Button -->
                <div class="d-flex justify-content-between align-items-center">
                    <p class="ssr-card__meal-name">₹${this.baggage?.Price || this.baggage?.amount || 0}</p>
                  ${button}
                </div>
            </div>
        </div>
    </div>
</div>

        `;
        } else {
            let amount = this.baggage?.amount || 0
            if (amount === 0) {

                let price = this.baggage?.Price || this.baggage?.amount || 0;
                let button = '';

                let traveller = baggageArray.findIndex(meal => meal.id === this.traveller && meal.index === this.index && meal.origin === this.origin && meal.destination === this.destination);

                if (traveller !== -1) {
                    button = `<button type="button"
                           class="app-btn app-btn-primary app-btn-medium ssr-card__add-btn" onclick="removeBaggage(${traveller}, ${this.index}, ${this.segmentIndex},'${this.traveller}')"
                           style="padding: 0.5rem; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 10px; font-weight: 600;">
              Remove
          </button>`;
                } else {
                    button = `<button type="button"
                           class="app-btn app-btn-primary app-btn-medium ssr-card__add-btn" onclick="AddBaggage(${this.index},'${this.origin}','${this.destination}','${this.traveller}', ${this.segmentIndex},${price},${this.trip})"
                           style="padding: 0.5rem; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 10px; font-weight: 600;">
              Add
          </button>`;
                }


                return `
        <div class="col-sm-6">
    <div class="card p-2 mb-2">
        <h4 style="text-align: center">What Baggage Select In The First Segment Is Applicable for this Segment as well</h4>
    </div>
</div>

        `;
            } else {

                let price = this.baggage?.Price || this.baggage?.amount || 0;
                let button = '';

                let traveller = baggageArray.findIndex(meal => meal.id === this.traveller && meal.index === this.index && meal.origin === this.origin && meal.destination === this.destination);

                if (traveller !== -1) {
                    button = `<button type="button"
                           class="app-btn app-btn-primary app-btn-medium ssr-card__add-btn" onclick="removeBaggage(${traveller}, ${this.index}, ${this.segmentIndex},'${this.traveller}')"
                           style="padding: 0.5rem; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 10px; font-weight: 600;">
              Remove
          </button>`;
                } else {
                    button = `<button type="button"
                           class="app-btn app-btn-primary app-btn-medium ssr-card__add-btn" onclick="AddBaggage(${this.index},'${this.origin}','${this.destination}','${this.traveller}', ${this.segmentIndex},${price},${this.trip})"
                           style="padding: 0.5rem; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 10px; font-weight: 600;">
              Add
          </button>`;
                }


                return `
        <div class="col-sm-6">
    <div class="card p-2 mb-2">
        <div class="d-flex align-items-center">
            <!-- Meal Image -->
            <div>
                <img class="meal-image" src="https://static.iween.co.in/airlinelogos/mealicon.svg"
                     alt="1-Vegetable junglee sandwich in white bread" style="width: 60px; height: auto;">
            </div>

            <!-- Meal Info -->
            <div class="ps-3 pe-3 w-100 d-flex flex-column">
                <div class="flex-1">
                    <p class="ssr-card__meal-name">${this.baggage?.Code || this.baggage?.desc || 'No Meal'}</p>
                    <p class="ssr-card__meal-description"></p>
                </div>

                <!-- Price and Button -->
                <div class="d-flex justify-content-between align-items-center">
                    <p class="ssr-card__meal-name">₹${this.baggage?.Price || this.baggage?.amount || 0}</p>
                  ${button}
                </div>
            </div>
        </div>
    </div>
</div>

        `;
            }
        }
    }
}

class mealPassengers {
    constructor(pax, index) {
        this.pax = pax;
        this.index = index;
    }

    renderMealPassengers() {
        let active = '';

        active = (this.pax === "Adult" && this.index === 1) ? 'traveller-name active-traveller' : 'traveller-name';

        return `
    <div class="${active}" id="${this.pax}_first_name${this.index}">${document.getElementById(`${this.pax}_first_name${this.index}`).value}
    <div class="text-center m-2 separator" id="${this.pax}_first_name${this.index}separator">&#x20b9; 0</div>
    </div>
    
`;

    }
}

class baggagePassengers {
    constructor(pax, index) {
        this.pax = pax;
        this.index = index;
    }

    renderBaggagePassengers() {
        let active = '';

        active = (this.pax === "Adult" && this.index === 1) ? 'baggage-traveller-name active-traveller' : 'baggage-traveller-name';

        return `
    <div class="${active}" id="${this.pax}_first_name${this.index}">${document.getElementById(`${this.pax}_first_name${this.index}`).value}
    <div class="text-center m-2 separator" id="${this.pax}_first_name${this.index}baggage">&#x20b9; 0</div>
    </div>
`;

    }
}

class PassengerForm {
    constructor(type, index, passportAtHold, passportAtTicket) {
        this.type = type;
        this.index = index;
        this.passportAtHold = passportAtHold;
        this.passportAtTicket = passportAtTicket;
    }

    render() {
        let title = '';

        if (this.type === 'Adult') {
            title = `  <select  class="traveller-input false" name="${this.type}_title${this.index}" id="${this.type}_title${this.index}" required style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;">
              <option value="MR">Mr</option>
              <option value="MS">Ms</option>
              <option value="MRS">Mrs</option>
              <option value="MSTR">Master</option>
          </select>`;
        }
        if (this.type === 'Child') {
            title = `  <select  class="traveller-input false" name="${this.type}_title${this.index}" id="${this.type}_title${this.index}" required style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;">
                  <option value="MSTR">Mstr</option>
                  <option value="MS">Ms</option>
              </select>`;
        }
        if (this.type === 'Infant') {
            title = `  <select  class="traveller-input false" name="${this.type}_title${this.index}" id="${this.type}_title${this.index}" required style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;">
                  <option value="MS">Ms</option>
                      <option value="MSTR">Mstr</option>
                  </select>`;
        }


        let passportDetails = ``;

        if (this.passportAtHold === true && this.passportAtTicket === true) {
            passportDetails += `<div class="col-lg-3 col-md-3 col-sm-3 col-12">
                                                    <div class="position-relative app-text-input"><label
                                                                class="position-absolute text-input-label required">Passport
                                                            Number</label><input name="${this.type}_passport_number${this.index}" placeholder=""
                                                                                 class="traveller-input false" type="text"
                                                                                 id="${this.type}_passport_number${this.index}" required value=""
                                                                                 style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;">
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-sm-3 col-12">
                                                    <div class="position-relative app-text-input"><label
                                                                class="position-absolute text-input-label required">Passport
                                                            Date of Issue</label><input name="${this.type}_passport_issue${this.index}" placeholder=""
                                                                                        class="traveller-input false" type="date"
                                                                                        id="${this.type}_passport_issue${this.index}" required value="" onfocus="setPassportIssueDateRestrictions(this)"
                                                                                        style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;">
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-sm-3 col-12">
                                                    <div class="position-relative app-text-input"><label
                                                                class="position-absolute text-input-label required">Passport
                                                            Date of Expiry</label><input name="${this.type}_passport_expiry${this.index}" placeholder=""
                                                                                         class="traveller-input false" type="date"
                                                                                         id="${this.type}_passport_expiry${this.index}" required value="" onfocus="setPassportExpiryDateRestrictions(this)"
                                                                                         style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;">
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-sm-3 col-12">
                                                    <div class="position-relative app-text-input"><label
                                                                class="position-absolute text-input-label required">Passport
                                                            Place of Issue</label><input name="${this.type}_passport_place${this.index}" placeholder=""
                                                                                         class="traveller-input false" type="text"
                                                                                         id="${this.type}_passport_place${this.index}" required value=""
                                                                                         style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;">
                                                    </div>
                                                </div>`;
        } else if (this.passportAtHold === true) {
            passportDetails += `<div class="col-lg-3 col-md-3 col-sm-3 col-12">
                                                    <div class="position-relative app-text-input"><label
                                                                class="position-absolute text-input-label required">Passport
                                                            Number</label><input name="${this.type}_passport_number${this.index}" placeholder=""
                                                                                 class="traveller-input false" type="text"
                                                                                 id="${this.type}_passport_number${this.index}" required value=""
                                                                                 style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;">
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-sm-3 col-12">
                                                    <div class="position-relative app-text-input"><label
                                                                class="position-absolute text-input-label required">Passport
                                                            Date of Issue</label><input name="${this.type}_passport_issue${this.index}" placeholder=""
                                                                                        class="traveller-input false" type="date"
                                                                                        id="${this.type}_passport_issue${this.index}" required value="" onfocus="setPassportIssueDateRestrictions(this)"
                                                                                        style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;">
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-sm-3 col-12">
                                                    <div class="position-relative app-text-input"><label
                                                                class="position-absolute text-input-label required">Passport
                                                            Date of Expiry</label><input name="${this.type}_passport_expiry${this.index}" placeholder=""
                                                                                         class="traveller-input false" type="date"
                                                                                         id="${this.type}_passport_expiry${this.index}" required value="" onfocus="setPassportExpiryDateRestrictions(this)"
                                                                                         style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;">
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-sm-3 col-12">
                                                    <div class="position-relative app-text-input"><label
                                                                class="position-absolute text-input-label required">Passport
                                                            Place of Issue</label><input name="${this.type}_passport_place${this.index}" placeholder=""
                                                                                         class="traveller-input false" type="text"
                                                                                         id="${this.type}_passport_place${this.index}" required value=""
                                                                                         style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;">
                                                    </div>
                                                </div>`;
        } else if (this.passportAtTicket === true) {
            passportDetails += `<div class="col-lg-3 col-md-3 col-sm-3 col-12">
                                                    <div class="position-relative app-text-input"><label
                                                                class="position-absolute text-input-label required">Passport
                                                            Number</label><input name="${this.type}_passport_number${this.index}" placeholder=""
                                                                                 class="traveller-input false" type="text"
                                                                                 id="${this.type}_passport_number${this.index}" required value=""
                                                                                 style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;">
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-sm-3 col-12">
                                                    <div class="position-relative app-text-input"><label
                                                                class="position-absolute text-input-label required">Passport
                                                            Date of Issue</label><input name="${this.type}_passport_issue${this.index}" placeholder=""
                                                                                        class="traveller-input false" type="date"
                                                                                        id="${this.type}_passport_issue${this.index}" required value="" onfocus="setPassportIssueDateRestrictions(this)"
                                                                                        style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;">
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-sm-3 col-12">
                                                    <div class="position-relative app-text-input"><label
                                                                class="position-absolute text-input-label required">Passport
                                                            Date of Expiry</label><input name="${this.type}_passport_expiry${this.index}" placeholder=""
                                                                                         class="traveller-input false" type="date"
                                                                                         id="${this.type}_passport_expiry${this.index}" required value="" onfocus="setPassportExpiryDateRestrictions(this)"
                                                                                         style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;">
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-sm-3 col-12">
                                                    <div class="position-relative app-text-input"><label
                                                                class="position-absolute text-input-label required">Passport
                                                            Place of Issue</label><input name="${this.type}_passport_place${this.index}" placeholder=""
                                                                                         class="traveller-input false" type="text"
                                                                                         id="${this.type}_passport_place${this.index}" required value=""
                                                                                         style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;">
                                                    </div>
                                                </div>`;
        }


        return `
         <div class="traveller-count p-2 ps-3">${this.type} ${this.index}</div>
                                        <div class="saved-travellers  fs-14">
                                            <div class="spacing-8 mb-2 row">
                                                <div class="col-lg-3 col-md-3 col-sm-3 col-12">
                                                    <div class="app-text-input position-relative"><label
                                                                class="position-absolute z-1 text-input-label required">Select
                                                            Title</label>
                                                      ${title}
                                                        <!--                                                        <div class="app-select title-select css-b62m3t-container"-->
                                                        <!--                                                             id="title"><span id="react-select-3-live-region"-->
                                                        <!--                                                                              class="css-7pg0cj-a11yText"></span><span-->
                                                        <!--                                                                    aria-live="polite" aria-atomic="false"-->
                                                        <!--                                                                    aria-relevant="additions text" role="log"-->
                                                        <!--                                                                    class="css-7pg0cj-a11yText"></span>-->
                                                        <!--                                                            <div class=" css-1mzbvz2-control">-->
                                                        <!--                                                                <div class=" css-13mzt3w">-->
                                                        <!--                                                                    <div class=" css-1jqq78o-placeholder"-->
                                                        <!--                                                                         id="react-select-3-placeholder"></div>-->
                                                        <!--                                                                    <div class=" css-19bb58m" data-value=""><input-->
                                                        <!--                                                                                class="" autocapitalize="none"-->
                                                        <!--                                                                                autocomplete="off" autocorrect="off"-->
                                                        <!--                                                                                id="react-select-3-input"-->
                                                        <!--                                                                                spellcheck="false" tabindex="0"-->
                                                        <!--                                                                                type="text" aria-autocomplete="list"-->
                                                        <!--                                                                                aria-expanded="false"-->
                                                        <!--                                                                                aria-haspopup="true"-->
                                                        <!--                                                                                aria-required="true" role="combobox"-->
                                                        <!--                                                                                aria-activedescendant=""-->
                                                        <!--                                                                                aria-describedby="react-select-3-placeholder"-->
                                                        <!--                                                                                value=""-->
                                                        <!--                                                                                style="color: inherit; background: 0px center; opacity: 1; width: 100%; grid-area: 1 / 2; font: inherit; min-width: 2px; border: 0px; margin: 0px; outline: 0px; padding: 0px;">-->
                                                        <!--                                                                    </div>-->
                                                        <!--                                                                </div>-->
                                                        <!--                                                                <div class=" css-1wy0on6"><span-->
                                                        <!--                                                                            class=" css-1u9des2-indicatorSeparator"></span>-->
                                                        <!--                                                                    <div class=" css-1xc3v61-indicatorContainer"-->
                                                        <!--                                                                         aria-hidden="true">-->
                                                        <!--                                                                        <svg height="20" width="20" viewBox="0 0 20 20"-->
                                                        <!--                                                                             aria-hidden="true" focusable="false"-->
                                                        <!--                                                                             class="css-8mmkcg">-->
                                                        <!--                                                                            <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>-->
                                                        <!--                                                                        </svg>-->
                                                        <!--                                                                    </div>-->
                                                        <!--                                                                </div>-->
                                                        <!--                                                            </div>-->
                                                        <!--                                                            <input required="" tabindex="-1" aria-hidden="true"-->
                                                        <!--                                                                   class="css-1a0ro4n-requiredInput" value=""></div>-->
                                                    </div>
                                                </div>
                                                <div class="mb-sm-0 mb-3 col-lg-3 col-md-3 col-sm-3 col-12">
                                                    <div class="position-relative app-text-input"><label
                                                                class="position-absolute text-input-label required">First
                                                            name</label>
                                                           <input name="${this.type}_first_name${this.index}" 
                                                        placeholder=""
                                                        class="traveller-input false" 
                                                        type="text" 
                                                        id="${this.type}_first_name${this.index}" 
                                                        required 
                                                        value=""
                                                        style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;"
                                                        oninput="this.value = this.value.replace(/[^A-Za-z\\s]/g, '')">

                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-sm-3 col-12">
                                                    <div class="position-relative app-text-input"><label
                                                                class="position-absolute text-input-label required">Last
                                                            name</label><input name="${this.type}_last_name${this.index}" placeholder=""
                                                            class="traveller-input false" type="text"
                                                            id="${this.type}_last_name${this.index}" required value=""
                                                            style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;"
                                                            oninput="this.value = this.value.replace(/[^A-Za-z]/g,'')">
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-sm-3 col-12">
                                                    <div class="position-relative app-text-input"><label
                                                                class="position-absolute text-input-label required">Date of Birth
                                                        </label><input name="${this.type}_dob${this.index}" 
           placeholder="" 
           class="traveller-input false" 
           type="date" 
           id="${this.type}_dob${this.index}" 
           required 
           value="" 
           style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;"
           onfocus="setDateRestrictions(this,'${this.type}')">

                                                    </div>
                                                </div>
                                                ${passportDetails}
                                            </div>
<!--                                            <div class="d-flex justify-content-between">-->
<!--                                                <div><a class="fs-12 app-link-purple">Save Pax Details</a></div>-->
<!--                                                <div><a class="fs-12 app-link-purple">Select Passengers</a></div>-->
<!--                                            </div>-->
                                        </div>
        `
    }
}

class PassengerForm1 {
    constructor(type, index, passportAtHold, passportAtTicket) {
        this.type = type;
        this.index = index;
        this.passportAtHold = passportAtHold;
        this.passportAtTicket = passportAtTicket;
    }

    render() {
        let title = '';

        if (this.type === 'Adult') {
            title = `  <select  class="traveller-input false" name="${this.type}_title${this.index}" id="${this.type}_title${this.index}" required style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;">
              <option value="Mr">Mr</option>
              <option value="Ms">Ms</option>
              <option value="MRS">Mrs</option>
          </select>`;
        }
        if (this.type === 'Child') {
            title = `  <select  class="traveller-input false" name="${this.type}_title${this.index}" id="${this.type}_title${this.index}" required style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;">
                  <option value="Master">Master</option>
                  <option value="Ms">Ms</option>
              </select>`;
        }
        if (this.type === 'Infant') {
            title = `  <select  class="traveller-input false" name="${this.type}_title${this.index}" id="${this.type}_title${this.index}" required style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;">
                  <option value="Ms">Ms</option>
                      <option value="Master">Master</option>
                  </select>`;
        }


        let passportDetails = ``;

        if (this.passportAtHold === true && this.passportAtTicket === true) {
            passportDetails += `<div class="col-lg-3 col-md-3 col-sm-3 col-12">
                                                    <div class="position-relative app-text-input"><label
                                                                class="position-absolute text-input-label required">Passport
                                                            Number</label><input name="${this.type}_passport_number${this.index}" placeholder=""
                                                                                 class="traveller-input false" type="text"
                                                                                 id="${this.type}_passport_number${this.index}" required value=""
                                                                                 style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;">
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-sm-3 col-12">
                                                    <div class="position-relative app-text-input"><label
                                                                class="position-absolute text-input-label required">Passport
                                                            Date of Issue</label><input name="${this.type}_passport_issue${this.index}" placeholder=""
                                                                                        class="traveller-input false" type="date"
                                                                                        id="${this.type}_passport_issue${this.index}" required value="" onfocus="setPassportIssueDateRestrictions(this)"
                                                                                        style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;">
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-sm-3 col-12">
                                                    <div class="position-relative app-text-input"><label
                                                                class="position-absolute text-input-label required">Passport
                                                            Date of Expiry</label><input name="${this.type}_passport_expiry${this.index}" placeholder=""
                                                                                         class="traveller-input false" type="date"
                                                                                         id="${this.type}_passport_expiry${this.index}" required value="" onfocus="setPassportExpiryDateRestrictions(this)"
                                                                                         style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;">
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-sm-3 col-12">
                                                    <div class="position-relative app-text-input"><label
                                                                class="position-absolute text-input-label required">Passport
                                                            Place of Issue</label><input name="${this.type}_passport_place${this.index}" placeholder=""
                                                                                         class="traveller-input false" type="text"
                                                                                         id="${this.type}_passport_place${this.index}" required value=""
                                                                                         style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;">
                                                    </div>
                                                </div>`;
        } else if (this.passportAtHold === true) {
            passportDetails += `<div class="col-lg-3 col-md-3 col-sm-3 col-12">
                                                    <div class="position-relative app-text-input"><label
                                                                class="position-absolute text-input-label required">Passport
                                                            Number</label><input name="${this.type}_passport_number${this.index}" placeholder=""
                                                                                 class="traveller-input false" type="text"
                                                                                 id="${this.type}_passport_number${this.index}" required value=""
                                                                                 style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;">
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-sm-3 col-12">
                                                    <div class="position-relative app-text-input"><label
                                                                class="position-absolute text-input-label required">Passport
                                                            Date of Issue</label><input name="${this.type}_passport_issue${this.index}" placeholder=""
                                                                                        class="traveller-input false" type="date"
                                                                                        id="${this.type}_passport_issue${this.index}" required value="" onfocus="setPassportIssueDateRestrictions(this)"
                                                                                        style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;">
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-sm-3 col-12">
                                                    <div class="position-relative app-text-input"><label
                                                                class="position-absolute text-input-label required">Passport
                                                            Date of Expiry</label><input name="${this.type}_passport_expiry${this.index}" placeholder=""
                                                                                         class="traveller-input false" type="date"
                                                                                         id="${this.type}_passport_expiry${this.index}" required value="" onfocus="setPassportExpiryDateRestrictions(this)"
                                                                                         style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;">
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-sm-3 col-12">
                                                    <div class="position-relative app-text-input"><label
                                                                class="position-absolute text-input-label required">Passport
                                                            Place of Issue</label><input name="${this.type}_passport_place${this.index}" placeholder=""
                                                                                         class="traveller-input false" type="text"
                                                                                         id="${this.type}_passport_place${this.index}" required value=""
                                                                                         style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;">
                                                    </div>
                                                </div>`;
        } else if (this.passportAtTicket === true) {
            passportDetails += `<div class="col-lg-3 col-md-3 col-sm-3 col-12">
                                                    <div class="position-relative app-text-input"><label
                                                                class="position-absolute text-input-label required">Passport
                                                            Number</label><input name="${this.type}_passport_number${this.index}" placeholder=""
                                                                                 class="traveller-input false" type="text"
                                                                                 id="${this.type}_passport_number${this.index}" required value=""
                                                                                 style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;">
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-sm-3 col-12">
                                                    <div class="position-relative app-text-input"><label
                                                                class="position-absolute text-input-label required">Passport
                                                            Date of Issue</label><input name="${this.type}_passport_issue${this.index}" placeholder=""
                                                                                        class="traveller-input false" type="date"
                                                                                        id="${this.type}_passport_issue${this.index}" required value="" onfocus="setPassportIssueDateRestrictions(this)"
                                                                                        style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;">
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-sm-3 col-12">
                                                    <div class="position-relative app-text-input"><label
                                                                class="position-absolute text-input-label required">Passport
                                                            Date of Expiry</label><input name="${this.type}_passport_expiry${this.index}" placeholder=""
                                                                                         class="traveller-input false" type="date"
                                                                                         id="${this.type}_passport_expiry${this.index}" required value="" onfocus="setPassportExpiryDateRestrictions(this)"
                                                                                         style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;">
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-sm-3 col-12">
                                                    <div class="position-relative app-text-input"><label
                                                                class="position-absolute text-input-label required">Passport
                                                            Place of Issue</label><input name="${this.type}_passport_place${this.index}" placeholder=""
                                                                                         class="traveller-input false" type="text"
                                                                                         id="${this.type}_passport_place${this.index}" required value=""
                                                                                         style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;">
                                                    </div>
                                                </div>`;
        }


        return `
         <div class="traveller-count p-2 ps-3">${this.type} ${this.index}</div>
                                        <div class="saved-travellers  fs-14">
                                            <div class="spacing-8 mb-2 row">
                                                <div class="col-lg-3 col-md-3 col-sm-3 col-12">
                                                    <div class="app-text-input position-relative"><label
                                                                class="position-absolute z-1 text-input-label required">Select
                                                            Title</label>
                                                      ${title}
                                                        <!--                                                        <div class="app-select title-select css-b62m3t-container"-->
                                                        <!--                                                             id="title"><span id="react-select-3-live-region"-->
                                                        <!--                                                                              class="css-7pg0cj-a11yText"></span><span-->
                                                        <!--                                                                    aria-live="polite" aria-atomic="false"-->
                                                        <!--                                                                    aria-relevant="additions text" role="log"-->
                                                        <!--                                                                    class="css-7pg0cj-a11yText"></span>-->
                                                        <!--                                                            <div class=" css-1mzbvz2-control">-->
                                                        <!--                                                                <div class=" css-13mzt3w">-->
                                                        <!--                                                                    <div class=" css-1jqq78o-placeholder"-->
                                                        <!--                                                                         id="react-select-3-placeholder"></div>-->
                                                        <!--                                                                    <div class=" css-19bb58m" data-value=""><input-->
                                                        <!--                                                                                class="" autocapitalize="none"-->
                                                        <!--                                                                                autocomplete="off" autocorrect="off"-->
                                                        <!--                                                                                id="react-select-3-input"-->
                                                        <!--                                                                                spellcheck="false" tabindex="0"-->
                                                        <!--                                                                                type="text" aria-autocomplete="list"-->
                                                        <!--                                                                                aria-expanded="false"-->
                                                        <!--                                                                                aria-haspopup="true"-->
                                                        <!--                                                                                aria-required="true" role="combobox"-->
                                                        <!--                                                                                aria-activedescendant=""-->
                                                        <!--                                                                                aria-describedby="react-select-3-placeholder"-->
                                                        <!--                                                                                value=""-->
                                                        <!--                                                                                style="color: inherit; background: 0px center; opacity: 1; width: 100%; grid-area: 1 / 2; font: inherit; min-width: 2px; border: 0px; margin: 0px; outline: 0px; padding: 0px;">-->
                                                        <!--                                                                    </div>-->
                                                        <!--                                                                </div>-->
                                                        <!--                                                                <div class=" css-1wy0on6"><span-->
                                                        <!--                                                                            class=" css-1u9des2-indicatorSeparator"></span>-->
                                                        <!--                                                                    <div class=" css-1xc3v61-indicatorContainer"-->
                                                        <!--                                                                         aria-hidden="true">-->
                                                        <!--                                                                        <svg height="20" width="20" viewBox="0 0 20 20"-->
                                                        <!--                                                                             aria-hidden="true" focusable="false"-->
                                                        <!--                                                                             class="css-8mmkcg">-->
                                                        <!--                                                                            <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>-->
                                                        <!--                                                                        </svg>-->
                                                        <!--                                                                    </div>-->
                                                        <!--                                                                </div>-->
                                                        <!--                                                            </div>-->
                                                        <!--                                                            <input required="" tabindex="-1" aria-hidden="true"-->
                                                        <!--                                                                   class="css-1a0ro4n-requiredInput" value=""></div>-->
                                                    </div>
                                                </div>
                                                <div class="mb-sm-0 mb-3 col-lg-3 col-md-3 col-sm-3 col-12">
                                                    <div class="position-relative app-text-input"><label
                                                                class="position-absolute text-input-label required">First
                                                            name</label>
                                                           <input name="${this.type}_first_name${this.index}" 
                                                        placeholder=""
                                                        class="traveller-input false" 
                                                        type="text" 
                                                        id="${this.type}_first_name${this.index}" 
                                                        required 
                                                        value=""
                                                        style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;"
                                                        oninput="this.value = this.value.replace(/[^A-Za-z\\s]/g, '')">

                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-sm-3 col-12">
                                                    <div class="position-relative app-text-input"><label
                                                                class="position-absolute text-input-label required">Last
                                                            name</label><input name="${this.type}_last_name${this.index}" placeholder=""
                                                            class="traveller-input false" type="text"
                                                            id="${this.type}_last_name${this.index}" required value=""
                                                            style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;"
                                                            oninput="this.value = this.value.replace(/[^A-Za-z]/g, '')">
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-sm-3 col-12">
                                                    <div class="position-relative app-text-input"><label
                                                                class="position-absolute text-input-label required">Date of Birth
                                                        </label><input name="${this.type}_dob${this.index}" 
           placeholder="" 
           class="traveller-input false" 
           type="date" 
           id="${this.type}_dob${this.index}" 
           required 
           value="" 
           style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;"
           onfocus="setDateRestrictions(this,'${this.type}')">

                                                    </div>
                                                </div>
                                                ${passportDetails}
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <div><a class="fs-12 app-link-purple">Save Pax Details</a></div>
                                                <div><a class="fs-12 app-link-purple">Select Passengers</a></div>
                                            </div>
                                        </div>
        `
    }
}

class makePassengerArray {

    constructor(passengerType, fareBreakdown, index, paxType, airlineCode, flightNumber, passportAtBook, passportAtTicket, type) {
        this.passengerType = passengerType;
        this.fareBreakdown = fareBreakdown;
        this.index = index;
        this.paxType = paxType;
        this.airlineCode = airlineCode;
        this.flightNumber = flightNumber;
        this.passportAtBook = passportAtBook;
        this.passportAtTicket = passportAtTicket;
        this.type = type;

    }

    renderTBO() {

        console.log("oye")

        let flight = this.fareBreakdown;


        let obj = {
            "paxType": this.paxType,
            "profession": "yjgq",
            "title": document.getElementById(`${this.passengerType}_title${this.index}`).value,
            "firstName": document.getElementById(`${this.passengerType}_first_name${this.index}`).value,
            "middleName": "",
            "lastName": document.getElementById(`${this.passengerType}_last_name${this.index}`).value,
            "frequentFlyNo": "",
            "mcoAmount": 0,
            "markUp": 0,
            "gender": "Male",
            "dateOfBirth": `${document.getElementById(`${this.passengerType}_dob${this.index}`).value}`,
            "BaggageDetails": [],
            "MealsDetails": [],
            "SeatDetails": []
        }

        let passport = {};


        // if(this.passportAtBook === true && this.type === "HOLD")
        // {
        //     passport = {
        //         "CountryCode": document.getElementById(`${this.passengerType}_passport_place${this.index}`).value,
        //         "CellCountryCode": "+91",
        //         "PassportNo": document.getElementById(`${this.passengerType}_passport_number${this.index}`).value,
        //         "PassportExpiry": `${document.getElementById(`${this.passengerType}_passport_expiry${this.index}`).value}T00:00:00`,
        //         "PassportIssueDate": `${document.getElementById(`${this.passengerType}_passport_issue${this.index}`).value}T00:00:00`,
        //         "PassportIssueCountryCode": document.getElementById(`${this.passengerType}_passport_place${this.index}`).value,
        //     }
        //
        //     obj = {...obj , ...passport}
        //
        // }

        if (this.passportAtTicket === false || this.passportAtBook === false) {
            passport = {
                // "CountryCode": document.getElementById(`${this.passengerType}_passport_place${this.index}`).value,
                // "CellCountryCode": "+91",
                "passportNo": document.getElementById(`${this.passengerType}_passport_number${this.index}`).value,
                "passportExpiry": `${document.getElementById(`${this.passengerType}_passport_expiry${this.index}`).value}T00:00:00`,
                // "PassportIssueDate": `${document.getElementById(`${this.passengerType}_passport_issue${this.index}`).value}T00:00:00`,
                "passportIssueCountry": document.getElementById(`${this.passengerType}_passport_place${this.index}`).value,
            }
            obj = {...obj, ...passport}

        }


        return obj;
    }

}


function parseCustomDate(dateStr) {
    console.log("Raw date input: ", dateStr); // Debugging log

    // Use Date.parse() to attempt automatic parsing of the string
    const parsedDate = new Date(Date.parse(dateStr));

    // Check if the date is valid
    if (isNaN(parsedDate.getTime())) {
        console.error('Invalid date string:', dateStr);
        return null;
    }

    console.log("Parsed Date: ", parsedDate); // Debugging log
    return parsedDate;
}

function setDateRestrictions(input, paxType) {
    // Assuming arr.Origin.DepDate is in "21 Sept 2024" format
    console.log(arr.onwardFlight.Origin.DepDate)
    const depDateStr = arr.onwardFlight.Origin.DepDate;

    // Parse the custom date string
    const currentDate = parseCustomDate(depDateStr);

    if (!currentDate) {
        console.error('Invalid date in arr.Origin.DepDate:', depDateStr);
        return;
    }

    let maxDate, minDate;

    // Modify the max date based on this.type (use the type from your logic)
    const type = paxType; // This should come from your server-side logic or JS logic

    console.log("User type: ", type); // Debugging log

    if (type === 'Adult') {
        // Subtract 12 years from the current date for Adults
        maxDate = new Date(currentDate);
        maxDate.setFullYear(currentDate.getFullYear() - 12);
        // Subtract 18 years
    } else if (type === 'Child') {
        // Children must be between 2 and 12 years old, but can select a date 2 days less than 12 years ago
        maxDate = new Date(currentDate);
        minDate = new Date(currentDate);

        // Set max date (youngest child age, 2 years ago)
        maxDate.setFullYear(currentDate.getFullYear() - 2);

        // Set min date (oldest child age, 12 years ago minus 2 days)
        minDate.setFullYear(currentDate.getFullYear() - 12);
        minDate.setDate(minDate.getDate() + 2); // Subtract 2 days from the minimum date
    } else if (type === 'Infant') {
        maxDate = new Date(currentDate);
        minDate = new Date(currentDate);
        // Set min date (oldest child age, 18 years ago)
        // maxDate.setFullYear(currentDate);
        maxDate.setDate(maxDate.getDate() - 10);
        minDate.setFullYear(currentDate.getFullYear() - 2);
        minDate.setDate(minDate.getDate() + 2);
    } else {
        console.error('Unknown type:', type);
        return;
    }

    // Check if maxDate is correctly calculated
    if (maxDate) {
        console.log("Calculated Max Date: ", maxDate); // Debugging log
        const formattedMaxDate = maxDate.toISOString().split('T')[0];
        input.setAttribute('max', formattedMaxDate);
        console.log('Max Date Set:', formattedMaxDate); // Debugging log
    } else {
        console.error('Failed to calculate maxDate');
    }

    if (minDate) {
        const formattedMinDate = minDate.toISOString().split('T')[0];
        input.setAttribute('min', formattedMinDate);
        console.log('Min Date Set:', formattedMinDate); // Debugging log
    }
}
