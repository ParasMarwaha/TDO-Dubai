class FlightFixedCards {
    constructor(flight, index) {
        this.flight = flight;
        this.index = index;
       console.log(flight)
        //console.log("index",index)
    }

    render() {

        let card = `
        <div class="p-3 d-flex my-2 one-way-new-result-card">
    <div class="d-flex flight-info flex-column gap-0">
        <div class="spacing-0 flex-1 flight-info_flight-details pb-2 row" style="border-bottom: 1px solid rgb(233, 233, 233);">
            <div class="col-lg-4 col-md-4 col-sm-4 col-4">
                <div class="flight-info_flight-details">
                    <div class="d-flex">
                        <div class="d-flex mx-2 flight-image">
                            <img class="vertical-bottom" alt="Flight" src="https://static.iween.co.in/airlinelogos/${this.flight.onwardFlight.Origin.airlineCode}.jpg">
                        </div>
                    </div>
                </div>
                <div>
                    <div class="d-flex flex-column flight-name">
                        <span class="flight-company">${this.flight.onwardFlight.AirlineName}</span>
                        <span class="flight-company-secondary text-capitalize" title="Publish">Publish</span>
                        <span class="fs-10 flight-number">${this.flight.onwardFlight.Origin.airlineCode}-${this.flight.onwardFlight.Origin.FlightNumber}</span>
                    </div>
                </div>
            </div>
            <div class="col-lg-8 col-md-8 col-sm-8 col-8">
                <div class="row">
                    <div class="d-flex justify-content-start col-lg-4 col-md-4 col-sm-4 col-4">
                        <div class="d-flex flex-column">
                            <span class="title fw-600">${this.flight.onwardFlight.Origin.DepTime}</span>
                            <span class="fs-12">${this.flight.onwardFlight.Origin.DepDate}</span>
                            <span class="fs-10">${this.flight.onwardFlight.Origin.CityName}</span>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center col-lg-4 col-md-4 col-sm-4 col-4">
    <div class="d-flex flex-column text-center">
        <span class="fs-12 fw-500">${this.flight.onwardFlight.totalDuration.hours}h ${this.flight.onwardFlight.totalDuration.minutes}m</span>
        <div class="d-flex flex-column">
            <div class="cursor-pointer">
                <p class="multi-stop-seperator">
                    <span class="layover-pointer"></span>
                </p>
                <span class="fs-10 d-inline-block" style="margin-top: 7px;">${this.flight.onwardFlight.Stops}</span>
                <!-- Take-off plane icon beneath the stops -->
                <div class="mt-2">
                    <i class="fa fa-plane-departure fs-10"></i>
                    <!-- OR, if using an image -->
                    <!-- <img src="path-to-your-icon/plane-takeoff-icon.png" alt="Takeoff Icon" class="flight-icon" style="width: 16px; height: 16px;"> -->
                </div>
            </div>
        </div>
    </div>
</div>



                    <div class="d-flex justify-content-end col-lg-4 col-md-4 col-sm-4 col-4">
                        <div class="d-flex flex-column text-end">
                            <span class="title fw-600">${this.flight.onwardFlight.Destination.ArrTime}<span class="extra-days">+1</span></span>
                            <span class="fs-12">${this.flight.onwardFlight.Destination.ArrDate}</span>
                            <span class="fs-10">${this.flight.onwardFlight.Destination.CityName}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="spacing-0 flex-1 flight-info_flight-details mt-2 row" style="border-bottom: none;">
            <div class="col-lg-4 col-md-4 col-sm-4 col-4">
                <div class="flight-info_flight-details">
                    <div class="d-flex">
                        <div class="d-flex mx-2 flight-image">
                            <img class="vertical-bottom" alt="Flight" src="https://static.iween.co.in/airlinelogos/${this.flight.returnFlight.AirlineCode}.jpg">
                        </div>
                    </div>
                </div>
                <div>
                    <div class="d-flex flex-column flight-name">
                        <span class="flight-company">${this.flight.returnFlight.AirlineName}</span>
                        <span class="flight-company-secondary text-capitalize" title="Publish">Publish</span>
                        <span class="fs-10 flight-number">${this.flight.returnFlight.AirlineCode}-${this.flight.returnFlight.FlightNumber}</span>
                    </div>
                </div>
            </div>
            <div class="col-lg-8 col-md-8 col-sm-8 col-8">
                <div class="row">
                    <div class="d-flex justify-content-start col-lg-5 col-md-5 col-sm-5 col-4">
                        <div class="d-flex flex-column">
                            <span class="title fw-600">${this.flight.returnFlight.Origin.DepTime}</span>
                            <span class="fs-12">${this.flight.returnFlight.Origin.DepDate}</span>
                            <span class="fs-10">${this.flight.returnFlight.Origin.CityName}</span>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center px-0 col-lg-2 col-md-2 col-sm-2 col-4">
    <div class="d-flex flex-column text-center">
        <span class="fs-12 fw-500">${this.flight.returnFlight.totalDuration.hours}h ${this.flight.returnFlight.totalDuration.minutes}m</span>
        <div class="d-flex flex-column">
            <div class="cursor-pointer">
                <p class="multi-stop-seperator">
                    <span class="layover-pointer"></span>
                </p>
                <span class="fs-8 d-inline-block" style="margin-top: 7px;">${this.flight.returnFlight.Stops}</span>
                <!-- Landing plane icon beneath the stops -->
                <div class="mt-2">
                    <i class="fa fa-plane-arrival fs-10"></i>
                    <!-- OR, if using an image -->
                    <!-- <img src="path-to-your-icon/plane-landing-icon.png" alt="Landing Icon" class="flight-icon" style="width: 16px; height: 16px;"> -->
                </div>
            </div>
        </div>
    </div>
</div>

                    <div class="d-flex justify-content-end col-lg-5 col-md-5 col-sm-5 col-4">
                        <div class="d-flex flex-column text-end">
                            <span class="title fw-600">${this.flight.returnFlight.Destination.ArrTime}<span class="extra-days">+1</span></span>
                            <span class="fs-12">${this.flight.returnFlight.Destination.ArrDate}</span>
                            <span class="fs-10">${this.flight.returnFlight.Destination.CityName}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-3 ps-4">
            <a class="fs-14 fw-600 mt-3 app-link-black" onclick="renderSideBarFixed(${this.index})">Flight Details</a>
        </div>
    </div>
    <div class="d-flex fare-info">
        <div class="flex-1 spacing-0 row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                <div class="d-flex flex-column fare-info_details" id="twoFares">`

        const renderedFares = new Set(); // To track unique fare types


        for (let i = 0; i < Math.min(2, this.flight.onwardFlight.Segments.length); i++) {
            const segment = this.flight.onwardFlight.Segments[i];

            // Check if the fare type has already been rendered
            if (!renderedFares.has(segment.fare)) {
                let flightCards = new FareFixedCards(segment, i);
                card += flightCards.render(this.index);
                renderedFares.add(segment.fare); // Add the fare type to the Set
            }
        }

        card += `
</div>
<div class="d-flex flex-column fare-info_details hide" id="readyotherFares${this.index}">`;

        for (let i = 2; i < this.flight.returnFlight.Segments.length; i++) {
            const segment = this.flight.returnFlight.Segments[i];

            // Check if the fare type has already been rendered
            if (!renderedFares.has(segment.fare)) {
                let flightCards = new FareFixedCards(segment, i);
                card += flightCards.render(this.index);
                renderedFares.add(segment.fare); // Add the fare type to the Set
            }
        }


        card += `</div>`;


        card += `<div class="px-0 mt-1 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div class="d-flex justify-content-end pe-1">
                                                <div class="d-flex justify-content-between flex-1 gap-1">
<div class="d-flex align-items-center flex-1 justify-content-center">`;

        if (this.flight.returnFlight.Segments.length > 2) {
            card += `
        <a class="fs-12 fw-500 flex-1 app-link-grey" onclick="toggleVisibility('ready',${this.index})">
            <div class="d-flex align-items-center justify-content-center">
                <span>+ More fares</span>
                <svg stroke="currentColor" fill="currentColor"
                     stroke-width="0" viewBox="0 0 24 24" height="1em"
                     width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M7 10l5 5 5-5z"></path>
                </svg>
            </div>
        </a>`;
        }

        card += `
</div>
<button type="button"
                                                            class="app-btn app-btn-primary app-btn-medium px-3"
                                                            style="padding: 0.5rem; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 10px; font-weight: 600;" onclick="bookFixed(${this.index})">
                                                        Book
                                                    </button>
                                                </div>
                                            </div>
</div>
                                  </div>
                                </div>
                            </div>
                            </div>
`

        return card
    }

}

class FareFixedCards {

    constructor(flight, index) {
        this.flight = flight;
        this.index = index;
        console.log(this.flight)
    }

    render(index) {

        let fareCard = ``;


        if (this.index === 0) {
            fareCard = `<div class="fare-component position-relative">
                        <div class="spacing-0 row">
                            <div class="col-lg-6 col-md-6 col-sm-6 col-6"
                                 style="padding-left: 5px; padding-block: 10px;"><label
                                class=" d-flex  fw-500 align-items-center fs-12 cursor-pointer"
                                for="ready${this.index}${index}"
                                style="color: rgb(30, 30, 30);">
                                <input
                                class="cursor-pointer me-1"
                                id="ready${this.index}${index}"
                                type="radio"
                                value="${this.index}"
                                name = "ready${index}"
                                checked
                                >
                                <div class="d-flex flex-column"><span
                                    class="fs-12 text-capitalize dark-grey-color fw-600 text-break">${this.flight.fare}</span>

                                    <div class="fs-10 amenities-info"><span
                                        class="seats-left"><svg stroke="currentColor"
                                                                fill="currentColor"
                                                                stroke-width="0"
                                                                viewBox="0 0 24 24"
                                                                height="1em" width="1em"
                                                                xmlns="http://www.w3.org/2000/svg"><path
                                        fill="none" d="M0 0h24v24H0V0z"></path><path
                                        d="M5 12V3H3v9c0 2.76 2.24 5 5 5h6v-2H8c-1.66 0-3-1.34-3-3zm15.5 6H19v-7c0-1.1-.9-2-2-2h-5V3H6v8c0 1.65 1.35 3 3 3h7v7h4.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z"></path></svg><span
                                        class="seats-left_text">3</span></span><span
                                        class=" fs-10 refundable-info fw-600 green-color">RF</span><span
                                        class="cabin-baggage"><svg stroke="currentColor"
                                                                   fill="currentColor"
                                                                   stroke-width="0"
                                                                   viewBox="0 0 512 512"
                                                                   height="1em"
                                                                   width="1em"
                                                                   xmlns="http://www.w3.org/2000/svg"><path
                                        d="M454.65 169.4A31.82 31.82 0 00432 160h-64v-16a112 112 0 00-224 0v16H80a32 32 0 00-32 32v216c0 39 33 72 72 72h272a72.22 72.22 0 0050.48-20.55 69.48 69.48 0 0021.52-50.2V192a31.75 31.75 0 00-9.35-22.6zM176 144a80 80 0 01160 0v16H176z"></path></svg><span
                                        class="seats-left_text">15KG</span></span></div>
                                </div>
                            </label></div>
                            <div data-watermark="FW76315FW76315 FW76315FW76315 FW76315FW76315"
                                 class="p-2 d-flex justify-content-center align-items-end one-way-watermarked col-lg-6 col-md-6 col-sm-6 col-6">
                                <div class=" position-relative d-flex flex-column"><span
                                    class="fs-16 fw-600">AED ${(this.flight.FareBreakup.PublishedFare).toFixed(2)}</span><span
                                    class="netFare fs-12 fw-500 hidden">AED ${(this.flight.FareBreakup.OfferedFare).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>


        `;
        } else {
            fareCard = `<div class="fare-component position-relative">
                        <div class="spacing-0 row">
                            <div class="col-lg-6 col-md-6 col-sm-6 col-6"
                                 style="padding-left: 5px; padding-block: 10px;"><label
                                class=" d-flex  fw-500 align-items-center fs-12 cursor-pointer"
                                for="ready${this.index}${index}"
                                style="color: rgb(30, 30, 30);">
                                <input
                                class="cursor-pointer me-1"
                                id="ready${this.index}${index}"
                                value="${this.index}"
                                type="radio"
                                name = "ready${index}">
                                <div class="d-flex flex-column"><span
                                    class="fs-12 text-capitalize dark-grey-color fw-600 text-break">${this.flight.fare}</span>
                                    <div class="fs-10 amenities-info"><span
                                        class="seats-left"><svg stroke="currentColor"
                                                                fill="currentColor"
                                                                stroke-width="0"
                                                                viewBox="0 0 24 24"
                                                                height="1em" width="1em"
                                                                xmlns="http://www.w3.org/2000/svg"><path
                                        fill="none" d="M0 0h24v24H0V0z"></path><path
                                        d="M5 12V3H3v9c0 2.76 2.24 5 5 5h6v-2H8c-1.66 0-3-1.34-3-3zm15.5 6H19v-7c0-1.1-.9-2-2-2h-5V3H6v8c0 1.65 1.35 3 3 3h7v7h4.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z"></path></svg><span
                                        class="seats-left_text">3</span></span><span
                                        class=" fs-10 refundable-info fw-600 green-color">RF</span><span
                                        class="cabin-baggage"><svg stroke="currentColor"
                                                                   fill="currentColor"
                                                                   stroke-width="0"
                                                                   viewBox="0 0 512 512"
                                                                   height="1em"
                                                                   width="1em"
                                                                   xmlns="http://www.w3.org/2000/svg"><path
                                        d="M454.65 169.4A31.82 31.82 0 00432 160h-64v-16a112 112 0 00-224 0v16H80a32 32 0 00-32 32v216c0 39 33 72 72 72h272a72.22 72.22 0 0050.48-20.55 69.48 69.48 0 0021.52-50.2V192a31.75 31.75 0 00-9.35-22.6zM176 144a80 80 0 01160 0v16H176z"></path></svg><span
                                        class="seats-left_text">15KG</span></span></div>
                                </div>
                            </label></div>
                            <div data-watermark="FW76315FW76315 FW76315FW76315 FW76315FW76315"
                                 class="p-2 d-flex justify-content-center align-items-end one-way-watermarked col-lg-6 col-md-6 col-sm-6 col-6">
                                <div class=" position-relative d-flex flex-column"><span
                                    class="fs-16 fw-600">AED ${(this.flight.FareBreakup.PublishedFare).toFixed(2)}</span><span
                                    class="netFare fs-12 fw-500 hidden">AED ${(this.flight.FareBreakup.OfferedFare).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>


        `;
        }


        return fareCard;
    }
}


// class FareFixedCards {
//     constructor(flightDetails, index) {
//         this.flightDetails = flightDetails; // This is the entire object
//         this.index = index;
//         this.renderedFares = new Set();  // Track already rendered fare types
//     }
//
//     render() {
//         let fareCard = ``;
//
//         // Check if flightDetails is an array (you mentioned it's a list of flight details)
//         if (Array.isArray(this.flightDetails.flightDetails)) {
//             // Create a set of unique fare types
//             const fareTypes = new Set();
//
//             // Loop over the flightDetails array to get unique fare types
//             this.flightDetails.flightDetails.forEach(fare => {
//                 const fareType = this.flightDetails.fare; // "Normal Fare", "Flexi Fare", etc.
//
//                 // If the fare type has not been rendered, add it to the set and render it
//                 if (!this.renderedFares.has(fareType)) {
//                     this.renderedFares.add(fareType);  // Mark this fare as rendered
//                     fareTypes.add(fareType);           // Add to fareTypes to display it
//                 }
//             });
//
//             // Loop through the unique fare types and render them
//             fareTypes.forEach(fareType => {
//                 fareCard += `
//                     <div class="fare-component position-relative">
//                         <div class="spacing-0 row">
//                             <div class="col-lg-6 col-md-6 col-sm-6 col-6"
//                                  style="padding-left: 5px; padding-block: 10px;">
//                                 <label class="d-flex fw-500 align-items-center fs-12 cursor-pointer"
//                                        for="ready${this.index}"
//                                        style="color: rgb(30, 30, 30);">
//                                     <input class="cursor-pointer me-1"
//                                            id="ready${this.index}"
//                                            value="${this.index}"
//                                            type="radio"
//                                            name="ready${this.index}">
//                                     <div class="d-flex flex-column">
//                                         <span class="fs-12 text-capitalize dark-grey-color fw-600 text-break">${fareType}</span>
//                                         <div class="fs-10 amenities-info">
//                                             <span class="seats-left"><svg stroke="currentColor"
//                                                                           fill="currentColor"
//                                                                           stroke-width="0"
//                                                                           viewBox="0 0 24 24"
//                                                                           height="1em" width="1em"
//                                                                           xmlns="http://www.w3.org/2000/svg">
//                                                     <path fill="none" d="M0 0h24v24H0V0z"></path>
//                                                     <path d="M5 12V3H3v9c0 2.76 2.24 5 5 5h6v-2H8c-1.66 0-3-1.34-3-3zm15.5 6H19v-7c0-1.1-.9-2-2-2h-5V3H6v8c0 1.65 1.35 3 3 3h7v7h4.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z"></path>
//                                                 </svg><span class="seats-left_text">3</span></span>
//                                             <span class="fs-10 refundable-info fw-600 green-color">RF</span>
//                                             <span class="cabin-baggage"><svg stroke="currentColor"
//                                                                             fill="currentColor"
//                                                                             stroke-width="0"
//                                                                             viewBox="0 0 512 512"
//                                                                             height="1em"
//                                                                             width="1em"
//                                                                             xmlns="http://www.w3.org/2000/svg">
//                                                     <path d="M454.65 169.4A31.82 31.82 0 00432 160h-64v-16a112 112 0 00-224 0v16H80a32 32 0 00-32 32v216c0 39 33 72 72 72h272a72.22 72.22 0 0050.48-20.55 69.48 69.48 0 0021.52-50.2V192a31.75 31.75 0 00-9.35-22.6zM176 144a80 80 0 01160 0v16H176z"></path>
//                                                 </svg><span class="seats-left_text">${this.flightDetails.Baggage.Baggage}</span></span>
//                                         </div>
//                                     </div>
//                                 </label>
//                             </div>
//                             <div class="p-2 d-flex justify-content-center align-items-end one-way-watermarked col-lg-6 col-md-6 col-sm-6 col-6">
//                                 <div class="position-relative d-flex flex-column">
//                                     <span class="fs-16 fw-600">₹ ${(this.flightDetails.FareBreakup.PublishedFare).toFixed(2)}</span>
//                                     <span class="netFare fs-12 fw-500 hidden">₹ ${(this.flightDetails.FareBreakup.OfferedFare).toFixed(2)}</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 `;
//             });
//         } else {
//             console.error("flightDetails.flightDetails is not an array or is invalid");
//         }
//
//         return fareCard;
//     }
// }

class SegmentInformationFixed {
    constructor(flight, index, fare) {
        this.flight = flight;
        this.index = index;
        this.fare = fare;
    }

    render() {
        let segment = this.flight;
      //  console.log(segment)
        let segmentCard = '';

        segmentCard += `
        <div class="selected-flight-details__flight-leg my-2">`;
        if (segment.LayoverTime !== 0) {
            segmentCard += `
                <div class="selected-flight-details__flight-leg_layover py-1 my-2">
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"
                                     height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                                    <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
                                </svg>
                                <span class="selected-flight-details__flight-leg_layover__location ms-1">${segment.LayoverTime.hours}h ${segment.LayoverTime.minutes}m layover in ${segment.DepartureCityName}</span>
                            </div>
                `
        }
        segmentCard += `<div>
                                <div class="selected-flight-details__flight-leg_details d-flex gap-3">
                                    <div><img class="vertical-bottom" alt="Flight"
                                              src="https://static.iween.co.in/airlinelogos/${segment.AirlineCode}.jpg"></div>
                                    <div class="d-flex flex-column text-uppercase fs-12 justify-content-center">
                                        <div class="d-flex gap-2"><span class="primary-color">${segment.AirlineName}</span><span>${segment.AirlineCode}-${segment.FlightNumber}</span><span>BOOKING CLASS: ${segment.flightClass}</span>
                                        </div>
                                        <div>${this.fare}</div>
<!--                                        <div class="d-flex gap-2"><span>economy</span><span>32N</span></div>-->
                                    </div>
                                </div>
                                <div class="selected-flight-details__flight-leg_departure my-3">
                                    <div class="d-flex align-items-center"><img
                                            src="/flightWorthCSS/images/flight-details-line.svg" alt="" style="height: 50px;">
                                    </div>
                                    <div class="d-flex flex-column"><span class="dark-grey-color fs-14 fw-600">${segment.DepTime} (${segment.DepDate}) - ${segment.DepartureCityName} - Terminal ${segment.DepartureTerminal} </span><span
                                            class="fs-10 mb-2">${segment.DepartureAirportName}</span><span
                                            class="fs-12 grey-color mb-2">Travel Time: ${segment.Duration.hours}h ${segment.Duration.minutes}m</span><span
                                            class="dark-grey-color fs-14 fw-600">${segment.ArrTime} (${segment.ArrDate}) - ${segment.ArrivalCityName} - Terminal ${segment.ArrivalTerminal} </span><span
                                            class="fs-10">${segment.ArrivalAirportName}</span></div>
                                </div>
                                <div class="selected-flight-details__flight-leg_amenities"><span>Check In: ${segment.Baggage[0].Weight} ${segment.Baggage[0].Unit} </span>
                                </div>
                            </div>
                        
                        </div>
        `

        return segmentCard;
    }
}

function renderSideBarFixed(index) {
   // console.log(index)
    // Get the selected flight's segments
    // const selectedFlight = (filteredFlights.length > 0) ? filteredFlights[index] : flightData[index];
    const selectedFlight = flightData[index]
   // console.log(selectedFlight)

    let selectedValue;
    // Get all radio buttons with the name "gender"
    const radios = document.getElementsByName(`ready${index}`);

    // Iterate through the radio buttons
    for (let i = 0; i < radios.length; i++) {
        // Check if the current radio button is selected
        if (radios[i].checked) {
            // Display the value of the selected radio button
            selectedValue = radios[i].value;
            break;  // Exit the loop once a selected button is found
        }
    }

    //console.log(selectedValue)

    // Define dynamic content using template literals (backticks)
    let content = `
    <div class="fade modal-backdrop show" id="div1"></div>
    `;

    // Create a wrapper div to hold the content
    let wrapper = document.createElement("div");

    // Set the innerHTML of the wrapper to the dynamic content
    wrapper.innerHTML = content;

    // Insert the wrapper before the body content
    document.body.parentNode.insertBefore(wrapper, document.body);

    let mySideBar = `
      <div class="modal-dialog slide-from-right-animation modal-fullscreen" id="ans">
        <div class="modal-content">
            <div class="modal-header">
                <div class="app-sidebar__title modal-title h4">Flight Details</div>
                <button type="button" class="btn-close" aria-label="Close"  onclick="removeDiv()"></button>
            </div>
            <div class="flight-details-sidebar modal-body">
                <div class="flight-details_tabs">
                    <div class="flight-details_tabs_container">
                       <button class="tab-btn" data-target="flight-info">Flight Information</button>
                            <button class="tab-btn" data-target="fare-breakup">Fare Breakup</button>
                            <button class="tab-btn" data-target="baggage">Baggage</button>
                            <button class="tab-btn" data-target="fare-rules">Fare Rules</button>
                                   </div>
                </div>
                <div class="tab-content" id="flight-info">
                <div class="selected-flight-details__trip-details mt-2 ">
                    <div class="d-flex gap-2 trip-content align-items-center"><span class="sector-span">${selectedFlight.onwardFlight.Origin.CityName}(${selectedFlight.onwardFlight.Origin.CityCode}) -&gt; ${selectedFlight.onwardFlight.Destination.CityName}(${selectedFlight.onwardFlight.Destination.CityCode})</span><span
                            class="date-span">One Way  ${convertToDesiredFormat(`${selectedFlight.onwardFlight.Origin.DepDate}`)}</span></div>
                </div>
                <div class="p-0 p-lg-3">
                    <section class="selected-flight-details">`

    selectedFlight.onwardFlight.Segments[selectedValue].flightDetails.forEach((segment, index) => {
        const segmentCard = new SegmentInformationFixed(segment, index, selectedFlight.onwardFlight.Segments[selectedValue].fare)
        mySideBar += segmentCard.render()
    })


    mySideBar += `</section>
                </div>
 <div class="selected-flight-details__trip-details mt-2 ">
                    <div class="d-flex gap-2 trip-content align-items-center"><span class="sector-span">${selectedFlight.returnFlight.Origin.CityName}(${selectedFlight.returnFlight.Origin.CityCode}) -&gt; ${selectedFlight.returnFlight.Destination.CityName}(${selectedFlight.returnFlight.Destination.CityCode})</span><span
                            class="date-span">One Way  ${convertToDesiredFormat(`${selectedFlight.returnFlight.Origin.DepDate}`)}</span></div>
                </div>
                <div class="p-0 p-lg-3">
                    <section class="selected-flight-details">
`;

    selectedFlight.returnFlight.Segments[selectedValue].flightDetails.forEach((segment, index) => {
        const segmentCard = new SegmentInformationFixed(segment, index, selectedFlight.returnFlight.Segments[selectedValue].fare)
        mySideBar += segmentCard.render()
    })

    mySideBar += `
</section>
                </div>
                </div>
                <div class="tab-content" id="fare-breakup">
                 <div class="fare-breakup mt-3">
    <div class="fare-breakup_header">
        <div class="fare-breakup_header_title">FARE BREAKUP SUMMARY</div>
        <div class="fare-breakup_header_value">AMOUNT</div>
    </div>
    <div class="fare-breakup_content">
        <div class="fare-breakup_title">Base Fare</div>
        <div style="position: absolute;left: 47%;top;10% ">AED</div>
        <div class="fare-breakup_value">${(selectedFlight.onwardFlight.Segments[selectedValue].FareBreakup.BaseFare).toFixed(2)}</div>
    </div>
   <div class="fare-breakup_content">
        <div class="fare-breakup_title">YQ Tax</div>
        <div style="position: absolute;left: 47%;top;15% ">AED</div>
        <div class="fare-breakup_value">0.00</div>
    </div>
    <div class="fare-breakup_content">
        <div class="fare-breakup_title">OT Tax</div>
        <div style="position: absolute;left: 47%;top;20% ">AED</div>
        <div class="fare-breakup_value">${(selectedFlight.onwardFlight.Segments[selectedValue].FareBreakup.totalTax).toFixed(2)}</div>
    </div>
    <div class="fare-breakup_content">
        <div class="fare-breakup_title">K3</div>
        <div style="position: absolute;left: 47%;top;25% ">AED</div>
        <div class="fare-breakup_value">0.00</div>
    </div>
    <div class="fare-breakup_content">
        <div class="fare-breakup_title">GST</div>
        <div style="position: absolute;left: 47%;top;30% ">AED</div>
        <div class="fare-breakup_value">0.00</div>
    </div>
    <div class="fare-breakup_content">
        <div class="fare-breakup_title">HC</div>
        <div style="position: absolute;left: 47%;top;35% ">AED</div>
        <div class="fare-breakup_value">0.00</div>
    </div>
    <div class="fare-breakup_content">
        <div class="fare-breakup_title">TDS</div>
        <div style="position: absolute;left: 47%;top;40% ">AED</div>
        <div class="fare-breakup_value">0.00</div>
    </div>
    <div class="fare-breakup_content">
        <div class="fare-breakup_title">Discount</div>
        <div style="position: absolute;left: 47%;top;45% ">AED</div>
        <div class="fare-breakup_value">${(selectedFlight.onwardFlight.Segments[selectedValue].FareBreakup.Discount).toFixed(2)}</div>
    </div>
    <div class="fare-breakup_footer">
        <div class="fare-breakup_title">Grand Total</div>
        <div style="position: absolute;left: 47%;top;50% ">AED</div>
        <div class="fare-breakup_value">${(selectedFlight.onwardFlight.Segments[selectedValue].FareBreakup.PublishedFare).toFixed(2)}</div>
    </div>
    <div class="fare-breakup_footer">
        <div class="fare-breakup_title">Net Fare</div>
        <div style="position: absolute;left: 47%;top;55% ">AED</div>
        <div class="fare-breakup_value">${(selectedFlight.onwardFlight.Segments[selectedValue].FareBreakup.OfferedFare).toFixed(2)}</div>
    </div>
</div>
</div>
<div class="tab-content" id="baggage">
                 <div class="baggage-table p-0 p-lg-3 mt-3">
    <div><img src="/images/others/baggage-vector.svg" alt=""></div>
    <div class="my-2 d-flex flex-column">
        <div class="flex-column baggage-table_value_header mb-1">${selectedFlight.onwardFlight.Origin.CityCode}-${selectedFlight.onwardFlight.Destination.CityCode}</div>
        <div class="baggage-table_value"><span class="fw-500">Check In baggage</span><span class="fw-600">15Kg</span>
        </div>
    </div>
<!--    <div class="my-2 d-flex flex-column">-->
<!--        <div class="flex-column baggage-table_value_header mb-1">BOM-TRV</div>-->
<!--        <div class="baggage-table_value"><span class="fw-500">Check In baggage</span><span class="fw-600">ADT-15Kg CHD-15Kg</span>-->
<!--        </div>-->
<!--    </div>-->
<!--    <div class="my-2 d-flex flex-column">-->
<!--        <div class="flex-column baggage-table_value_header mb-1">TRV-BLR</div>-->
<!--        <div class="baggage-table_value"><span class="fw-500">Check In baggage</span><span class="fw-600">ADT-15Kg CHD-15Kg</span>-->
<!--        </div>-->
<!--    </div>-->
    <div style="line-height: 1rem;"><span class="fs-10 grey-color">Baggage Disclaimer:- . Hand Baggage: Airlines permits only one (1pc) bag weighing not more than 7 KGS. In addition to the one piece of Hand Baggage permitted, Few Airlines may permit Customer to carry one additional personal article such as ladies purse or a small bag containing laptop not weighing more than 3 KGS. . Infant Baggage: Passenger Traveling with Infant are allowed to carry 1 Pc of additional Hand Baggage not exceeding 7 KGS. . The baggage information is just for reference, Please check with airline for more specific information.</span>
    </div>
</div>
</div>
<div class="tab-content" id="fare-rules">
</div>
            </div>
        </div>
    </div>
      `;

    document.getElementById("div2").innerHTML = mySideBar

    // Add a class to the body
    document.body.classList.add("modal-open");

    // Add inline styles to body
    document.body.style.color = "overflow: hidden";
    document.body.style.fontSize = "padding-right: 17px";

    initializeTabs();

    // Display the first tab content by default
    const firstTabContent = document.querySelector('.tab-content');
    if (firstTabContent) {
        // Hide all tab content first
        document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = 'none';
        });
        firstTabContent.style.display = 'block';
    }

    // Add the 'selected-tab-btn' class to the first tab button
    const firstTabBtn = document.querySelector('.tab-btn');
    if (firstTabBtn) {
        firstTabBtn.classList.add('selected-tab-btn');
    }
}

async function bookFixed(index) {
    // Display loading animation using SweetAlert2
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

    console.log(filteredFlights)
    // Use filteredFlights if available, otherwise fallback to flightData
    let myArr = (filteredFlights.length > 0) ? filteredFlights : flightData;

    // Deep copy the selected flight to avoid modifying the original array
    let selectedFlight = JSON.parse(JSON.stringify(myArr[index]));

    // If using filteredFlights, access the nested flight data
    if (filteredFlights.length > 0 && selectedFlight.flight) {
        console.log("")
        selectedFlight = selectedFlight.flight;
    }

    //console.log("Selected Flight:", selectedFlight);
    //console.log("Flight Array (myArr):", myArr);
    //console.log("Selected Index:", index);

    // Get the selected segment index from radio buttons
    let selectedValue;
    const radios = document.getElementsByName(`ready${index}`);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            selectedValue = radios[i].value;
            break;
        }
    }

    // Validate the selected value and update Segments
    if (
        selectedFlight &&
        selectedFlight.onwardFlight &&
        Array.isArray(selectedFlight.onwardFlight.Segments) &&
        selectedFlight.onwardFlight.Segments[selectedValue]
    ) {
        selectedFlight.onwardFlight.Segments = [selectedFlight.onwardFlight.Segments[selectedValue]];
    } else {
        // console.error("Invalid segment selection or data structure issue");
        //console.log("Selected Value:", selectedValue);
        //console.log("Selected Flight Structure:", selectedFlight);
        Swal.close();
        alert("Invalid segment selected or data structure issue. Please try again.");
        return;
    }

    //console.log("Selected Flight after Segments update:", selectedFlight);

    // Prepare the form data for booking request
    let fd = new FormData();
    fd.append("agentEmail", localStorage.getItem("agentEmail"));
    fd.append(
        "traceId",
        (selectedFlight.onwardFlight.Supplier === "RIYA")
            ? selectedFlight.onwardFlight.TraceId
            : selectedFlight.onwardFlight.Segments[0]?.ResultIndex
    );
    fd.append("returnId", null);
    fd.append("book", JSON.stringify(selectedFlight));
    fd.append("returnBook", null);
    fd.append("markup", 0);
    fd.append("platformFee", 0);
    fd.append("platformTax", 0);

    // Close the loading animation
    Swal.close();

    // Save the selected flight to sessionStorage
    sessionStorage.setItem("selectedFlight", JSON.stringify(selectedFlight));

    // Redirect to the booking confirmation page
    window.location.href = '/flights/returnFixedBook';

    // Uncomment the below section if you want to make an API call for booking
    /*
    try {
        let response = await fetch("/flights/makeSearchingSession", {
            method: 'POST',
            body: fd
        });

        if (response.ok) {
            Swal.close();
            window.location.href = '/flights/returnFixedBook';
        } else {
            console.error("Booking request failed");
            alert("Problem with booking request. Please try again.");
        }
    } catch (error) {
        console.error("Booking error:", error);
        Swal.close();
        alert("An error occurred during booking. Please try again.");
    }
    */
}

// class TBOFareBreakupCardFixed {
//
//     constructor(fare, index) {
//         this.fare = fare;
//         this.index = index;
//         console.log(fare)
//     }
//
//
//     render() {
//
//
//         let flight = this.fare.Flights;
//
//         let totalFare = 0;
//
//         let adultFare = 0;
//         let adultCount = ``;
//         let childCount = ``;
//         let infantCount = ``;
//         let childFare = 0;
//         let infantFare = 0;
//         let adultBaseFare = 0;
//         let childBasefare = 0;
//         let infantBaseFare = 0;
//         let adultTotaltax = 0;
//         let childTotalTax = 0;
//         let infantTotalTax = 0;
//         let adultk3Tax = 0, adultyqTax = 0, adultyrTax = 0, adultTaxesSum = 0;
//         let childk3Tax = 0, childyqTax = 0, childyrTax = 0, childTaxesSum = 0;
//         let infantk3Tax = 0, infantyqTax = 0, infantyrTax = 0, infantTaxesSum = 0;
//
//         let adultCard = '';
//         let childCard = '';
//         let infantCard = '';
//
//         let totalPax = parseInt(arr.onwardFlight.adults) + parseInt(arr.onwardFlight.childs);
//
//         let markup_by_agent = parseFloat(arr.Segments[0].FareBreakup.MARKUP_ADDED_BY_AGENT);
//
//         const fareDifference = parseFloat((parseFloat(flight.Fare.PublishedFare || 0) - parseFloat(flight.Fare.OfferedFare || 0)).toFixed(2));
//
//         let markup_type = (fareDifference > 0) ? 'PLB' : 'Non PLB';
//
//         let markup_value = arr.Segments[0].FareBreakup.TDO_MARKUP_PLB,
//             markup_percentage = arr.Segments[0].FareBreakup.TDO_MARKUP_PERCENTAGE;
//
//         let totalMarkup = (markup_type === 'PLB') ? ((fareDifference * parseFloat(markup_percentage) / 100)).toFixed(2) : (markup_value + (parseFloat(flight.Fare.PublishedFare) * parseFloat(markup_percentage) / 100)).toFixed(2)
//
//         let totalPublishFare = (markup_type === 'PLB') ? parseFloat(flight.Fare.PublishedFare) : (parseFloat(flight.Fare.PublishedFare) + parseFloat(totalMarkup)).toFixed(2)
//
//         let totalNetFare = (markup_type === 'PLB') ? parseFloat(flight.Fare.OfferedFare) + parseFloat(totalMarkup) : parseFloat(flight.Fare.OfferedFare) + parseFloat(totalMarkup)
//
//         let commission = (fareDifference > 0) ? (fareDifference - totalMarkup).toFixed(2) : 0;
//
//         let netPrice = (markup_type === 'PLB') ? ((parseFloat(flight.Fare.PublishedFare) + parseFloat(totalMarkup)) - fareDifference).toFixed(2) : (parseFloat(flight.Fare.PublishedFare) + parseFloat(totalMarkup) - fareDifference).toFixed(2);
//
//         let tds = (commission > 0) ? parseFloat((commission * 0.05).toFixed(2)) : 0
//
//
//         let totalOtherTaxes = (markup_type === 'PLB') ? (
//                 (flight.Fare.OtherCharges +
//                     flight.Fare.ServiceFee +
//                     markup_by_agent +
//                     (flight?.Fare?.TransactionFee || 0)) / totalPax
//             ).toFixed(2) :
//             ((flight.Fare.OtherCharges +
//                     flight.Fare.ServiceFee +
//                     parseFloat(totalMarkup) +
//                     markup_by_agent +
//                     (flight?.Fare?.TransactionFee || 0)) / totalPax
//             ).toFixed(2);
//
//         for (let i = 0; i < flight.FareBreakdown.length; i++) {
//             if (flight?.FareBreakdown?.[i]?.PassengerType === 1) {
//
//                 adultFare = parseFloat(flight.FareBreakdown[i].BaseFare) + parseFloat(flight.FareBreakdown[i].Tax)
//
//                 adultBaseFare = parseFloat(flight.FareBreakdown[i].BaseFare);
//
//                 adultTotaltax = parseFloat(flight.FareBreakdown[i].Tax)
//
//                 flight?.FareBreakdown?.[i]?.TaxBreakUp?.forEach(tax => {
//                     switch (tax.key) {
//                         case 'K3':
//                             adultk3Tax += tax.value;
//                             break;
//                         case 'YQTax':
//                             adultyqTax += tax.value;
//                             break;
//                         case 'YR':
//                             adultyrTax += tax.value;
//                             break;
//                         default:
//                             if (tax.key !== 'TotalTax') {
//                                 adultTaxesSum += tax.value;
//                             }
//                             break;
//                     }
//                 });
//
//                 if (flight.FareBreakdown[i].Tax !== adultk3Tax + adultyqTax + adultyrTax + adultTaxesSum) {
//                     adultTaxesSum += Math.abs(flight.FareBreakdown[i].Tax - (adultk3Tax + adultyqTax + adultyrTax + adultTaxesSum));
//                 }
//
//                 adultCard = `<div class="row spacing-0 px-2 py-1 d-flex flex-column gap-2">
//                                             <div class="d-flex justify-content-between fw-600 mb-2">
//                                                 <span>Fare/Pax Type</span><span>Amount</span></div>
//                                             <div class="d-flex justify-content-between"><span>Adult:</span><span
//                                                         class="fw-500">${adultBaseFare / parseFloat(flight.FareBreakdown[i].PassengerCount)}</span></div>
//                                             <div class="d-flex justify-content-between"><span>YQ Tax:</span><span
//                                                         class="fw-500">${adultyqTax / parseFloat(flight.FareBreakdown[i].PassengerCount)}</span></div>
//                                             <div class="d-flex justify-content-between"><span>OtherTaxes:</span><span
//                                                         class="fw-500">${((adultTaxesSum / parseFloat(flight.FareBreakdown[i].PassengerCount)) + parseFloat(totalOtherTaxes)).toFixed(2)}</span></div>
//                                             <div class="d-flex justify-content-between"><span>K3/AirlineGST:</span><span
//                                                         class="fw-500">${adultk3Tax / parseFloat(flight.FareBreakdown[i].PassengerCount)}</span></div>
//                                             <div class="d-flex justify-content-between"><span>Fuel Charge:</span><span
//                                                         class="fw-500">${adultyrTax / parseFloat(flight.FareBreakdown[i].PassengerCount)}</span></div>
//                                             <div class="d-flex justify-content-between"><span>Adult Total:</span><span
//                                                         class="fw-600">${adultFare / parseFloat(flight.FareBreakdown[i].PassengerCount) + parseFloat(totalOtherTaxes)}</span></div>
//                                         </div>`
//
//
//                 adultCount = `<div class="d-flex justify-content-between"><span
//                                                         class="fw-500">${flight.FareBreakdown[i].PassengerCount} x Adult</span><span
//                                                         class="fw-600">${adultFare + (totalOtherTaxes * parseInt(arr.adults))}</span></div>`
//
//                 totalFare += adultFare;
//             }
//             if (flight.FareBreakdown[i].PassengerType === 2) {
//
//                 childFare = parseFloat(flight.FareBreakdown[i].BaseFare) + parseFloat(flight.FareBreakdown[i].Tax)
//
//                 childBasefare = parseFloat(flight.FareBreakdown[i].BaseFare);
//
//                 childTotalTax = parseFloat(flight.FareBreakdown[i].Tax)
//
//                 flight?.FareBreakdown?.[i]?.TaxBreakUp?.forEach(tax => {
//                     switch (tax.key) {
//                         case 'K3':
//                             childk3Tax += tax.value;
//                             break;
//                         case 'YQTax':
//                             childyqTax += tax.value;
//                             break;
//                         case 'YR':
//                             childyrTax += tax.value;
//                             break;
//                         default:
//                             if (tax.key !== 'TotalTax') {
//                                 childTaxesSum += tax.value;
//                             }
//                             break;
//                     }
//                 });
//
//                 if (flight.FareBreakdown[i].Tax !== childk3Tax + childyqTax + childyrTax + childTaxesSum) {
//                     childTaxesSum += Math.abs(flight.FareBreakdown[i].Tax - (childk3Tax + childyqTax + childyrTax + childTaxesSum));
//                 }
//
//                 childCard = `<div class="row spacing-0 px-2 py-1 d-flex flex-column gap-2">
//                                             <div class="d-flex justify-content-between fw-600 mb-2">
//                                                 <span>Fare/Pax Type</span><span>Amount</span></div>
//                                             <div class="d-flex justify-content-between"><span>Child:</span><span
//                                                         class="fw-500">${childBasefare / parseFloat(flight.FareBreakdown[i].PassengerCount)}</span></div>
//                                             <div class="d-flex justify-content-between"><span>YQ Tax:</span><span
//                                                         class="fw-500">${childyqTax / parseFloat(flight.FareBreakdown[i].PassengerCount)}</span></div>
//                                             <div class="d-flex justify-content-between"><span>OtherTaxes:</span><span
//                                                         class="fw-500">${((childTaxesSum / parseFloat(flight.FareBreakdown[i].PassengerCount)) + parseFloat(totalOtherTaxes)).toFixed(2)}</span></div>
//                                             <div class="d-flex justify-content-between"><span>K3/AirlineGST:</span><span
//                                                         class="fw-500">${childk3Tax / parseFloat(flight.FareBreakdown[i].PassengerCount)}</span></div>
//                                             <div class="d-flex justify-content-between"><span>Fuel Charge:</span><span
//                                                         class="fw-500">${childyrTax / parseFloat(flight.FareBreakdown[i].PassengerCount)}</span></div>
//                                             <div class="d-flex justify-content-between"><span>Child Total:</span><span
//                                                         class="fw-600">${childFare / parseFloat(flight.FareBreakdown[i].PassengerCount) + parseFloat(totalOtherTaxes)}</span></div>
//                                         </div>`
//
//
//                 childCount = `<div class="d-flex justify-content-between"><span
//                                                         class="fw-500">${flight.FareBreakdown[i].PassengerCount} x Child</span><span
//                                                         class="fw-600">${childFare + (totalOtherTaxes * parseInt(arr.childs))}</span></div>`
//
//                 totalFare += childFare;
//             }
//             if (flight.FareBreakdown[i].PassengerType === 3) {
//
//                 infantFare = parseFloat(flight.FareBreakdown[i].BaseFare) + parseFloat(flight.FareBreakdown[i].Tax)
//
//                 infantBaseFare = parseFloat(flight.FareBreakdown[i].BaseFare);
//
//                 infantTotalTax = parseFloat(flight.FareBreakdown[i].Tax)
//
//
//                 flight?.FareBreakdown?.[i]?.TaxBreakUp?.forEach(tax => {
//                     switch (tax.key) {
//                         case 'K3':
//                             infantk3Tax = tax.value;
//                             break;
//                         case 'YQTax':
//                             infantyqTax = tax.value;
//                             break;
//                         case 'YR':
//                             infantyrTax = tax.value;
//                             break;
//                         default:
//                             if (tax.key !== 'TotalTax') {
//                                 infantTaxesSum += tax.value;
//                             }
//                             break;
//                     }
//                 });
//
//                 if (flight.FareBreakdown[i].Tax !== infantk3Tax + infantyqTax + infantyrTax + infantTaxesSum) {
//                     infantTaxesSum += Math.abs(flight.FareBreakdown[i].Tax - (infantk3Tax + infantyqTax + infantyrTax + infantTaxesSum));
//                 }
//
//                 infantCard = `<div class="row spacing-0 px-2 py-1 d-flex flex-column gap-2">
//                                             <div class="d-flex justify-content-between fw-600 mb-2">
//                                                 <span>Fare/Pax Type</span><span>Amount</span></div>
//                                             <div class="d-flex justify-content-between"><span>Infant:</span><span
//                                                         class="fw-500">${infantBaseFare / parseFloat(flight.FareBreakdown[i].PassengerCount)}</span></div>
//                                             <div class="d-flex justify-content-between"><span>YQ Tax:</span><span
//                                                         class="fw-500">${infantyqTax / parseFloat(flight.FareBreakdown[i].PassengerCount)}</span></div>
//                                             <div class="d-flex justify-content-between"><span>OtherTaxes:</span><span
//                                                         class="fw-500">${infantTaxesSum / parseFloat(flight.FareBreakdown[i].PassengerCount)}</span></div>
//                                             <div class="d-flex justify-content-between"><span>K3/AirlineGST:</span><span
//                                                         class="fw-500">${infantk3Tax / parseFloat(flight.FareBreakdown[i].PassengerCount)}</span></div>
//                                             <div class="d-flex justify-content-between"><span>Fuel Charge:</span><span
//                                                         class="fw-500">${infantyrTax / parseFloat(flight.FareBreakdown[i].PassengerCount)}</span></div>
//                                             <div class="d-flex justify-content-between"><span>Adult Total:</span><span
//                                                         class="fw-600">${infantFare / parseFloat(flight.FareBreakdown[i].PassengerCount)}</span></div>
//                                         </div>`
//
//
//                 infantCount = `<div class="d-flex justify-content-between"><span
//                                                         class="fw-500">${flight.FareBreakdown[i].PassengerCount} x Infant</span><span
//                                                         class="fw-600">${infantFare * parseFloat(flight.FareBreakdown[i].PassengerCount)}</span></div>`
//
//                 totalFare += infantFare;
//             }
//         }
//
//
//         let calculatedTax = (platformFee * (platformTax / 100)).toFixed(2);
//
//         totalAmount = totalFare + (totalOtherTaxes * totalPax) + platformFee + parseFloat(calculatedTax);
//
//         let amountPayable = (parseFloat(netPrice) + tds + parseFloat(platformFee) + parseFloat(calculatedTax)).toFixed(2);
//
//         return `
//        <section class="flight-fare-summary-section">
//                                 <div class="fare-summary_container flex-1">
//                                     <div class="fare-summary_title d-flex justify-content-between align-items-center">
//                                         <span>FARE SUMMARY</span>
//                                         <button type="button" class="app-btn-transparent p-0 dark-grey-color fs-16" onclick="showPayment()"
//                                                 style="padding: 0.5rem; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 10px; font-weight: 600;">
//                                             <svg stroke="currentColor" fill="currentColor" stroke-width="0"
//                                                  viewBox="0 0 512 512" height="1em" width="1em"
//                                                  xmlns="http://www.w3.org/2000/svg">
//                                                 <path d="M256 105c-101.8 0-188.4 62.4-224 151 35.6 88.6 122.2 151 224 151s188.4-62.4 224-151c-35.6-88.6-122.2-151-224-151zm0 251.7c-56 0-101.8-45.3-101.8-100.7S200 155.3 256 155.3 357.8 200.6 357.8 256 312 356.7 256 356.7zm0-161.1c-33.6 0-61.1 27.2-61.1 60.4s27.5 60.4 61.1 60.4 61.1-27.2 61.1-60.4-27.5-60.4-61.1-60.4z"></path>
//                                             </svg>
//                                         </button>
//                                     </div>
//                                     <div class="fare-summary_table watermarked"
//                                          data-watermark="FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 ">
//                                         ${adultCard}
//                                         ${childCard}
//                                         ${infantCard}
//
//                                         <div class="row spacing-0 px-2 py-1 d-flex flex-column gap-2">
//                                             <div class="text-center fw-600 fs-14 ">Total Fare</div>
//                                             ${adultCount}
//                                             ${childCount}
//                                             ${infantCount}
//                                             <div class="d-flex justify-content-between"><span
//                                                         class="fw-500">Platform Fee</span><span class="fw-600">AED ${platformFee}</span></div>
//                                             <div class="d-flex justify-content-between"><span
//                                                         class="fw-500">Platform Tax</span><span class="fw-600">AED ${calculatedTax}</span></div>
//                                         </div>
//                                         <div class="row spacing-0 px-2 py-1 d-flex flex-column gap-2 paymentBreak hidden">
//                                         <div class="d-flex justify-content-between fw-600 mb-2">
//                                             <span>Payment Breakdown</span><span>Amount</span></div>
//                                             <div class="d-flex justify-content-between"><span>Gross Fare By Vendor:</span><span class="fw-500">${totalPublishFare}</span></div>
//                                             <div class="d-flex justify-content-between"><span>Magin Given to TDO by Vendor:</span><span class="fw-500">${fareDifference}</span></div>
//                                             <div class="d-flex justify-content-between"><span>Net Price For TDO:</span><span class="fw-500">${netPrice}</span></div>
//                                         <div class="d-flex justify-content-between"><span>TDO Markup(Already Added in Net):</span><span class="fw-500">${totalMarkup}</span></div>
//                                         <div class="d-flex justify-content-between"><span>Travel Agent Markup:</span><span class="fw-500">${markup_by_agent}</span></div>
//                                         <div class="d-flex justify-content-between"><span>Commission:</span><span class="fw-500">${commission}</span></div>
//                                         <div class="d-flex justify-content-between"><span>TDS On Commission:</span><span class="fw-500">${tds}</span></div>
//                                         <div class="d-flex justify-content-between"><span>Platform Fee:</span><span class="fw-500">${platformFee}</span></div>
//                                         <div class="d-flex justify-content-between"><span>Platform Tax:</span><span class="fw-500">${calculatedTax}</span></div>
//                                      <div class="d-flex justify-content-between">
//     <span>Net Payable by Travel Agent :</span>
//     <span class="fw-500">AED ${amountPayable}</span>
// </div>
//   <div class="d-flex justify-content-between"><span>Net Earned By TDO:</span><span class="fw-500">${(parseFloat(totalMarkup) + parseFloat(platformFee)).toFixed(2)}</span></div>
//   <div class="d-flex justify-content-between"><span>Net Earned By Agent:</span><span class="fw-500">${((parseFloat(totalPublishFare) + parseFloat(platformFee) + parseFloat(calculatedTax) - parseFloat(amountPayable)) + parseFloat(markup_by_agent)).toFixed(2)}</span></div>
//                                      </div>
//                                     </div>
//
//                                     <div class="fare-summary_footer watermarked">
//                                         <div class="row spacing-0"><span class="col fare-summary_footer_title">Net Payable</span><span
//                                                     class="col fare-summary_footer_value d-flex flex-column"><span id="totalAmountSpan">${(parseFloat(totalAmount)).toFixed(2)}</span></span>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div class="my-3 d-none d-sm-block">
//                                     <div class="booking-counter-background">
//                                         <div class="countdown-timer">
//                                             <div class="text-center">
//                                                 <div class="countdown-timer__timer">
//                                                     <div id="timer"><span class="me-1">00</span><span>:</span><span
//                                                                 class="ms-1">00</span></div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </section>
//        `
//
//
//     }
//
// }

// class TBOFareBreakupCardFixed {
//
//     constructor(fare,index)
//     {
//         this.fare = fare;
//         this.index = index;
//     }
//
//
//
//     render()
//     {
//
//
//
//         let flight = this.fare.Flights;
//
//         let totalFare = 0;
//
//         let adultFare = 0;
//         let childFare = 0;
//         let infantFare = 0;
//         let adultBaseFare = 0;
//         let childBasefare = 0;
//         let infantBaseFare = 0;
//         let adultTotaltax = 0;
//         let childTotalTax = 0;
//         let infantTotalTax = 0;
//         let adultk3Tax = 0, adultyqTax = 0, adultyrTax = 0, adultTaxesSum = 0;
//         let childk3Tax = 0, childyqTax = 0, childyrTax = 0, childTaxesSum = 0;
//         let infantk3Tax = 0, infantyqTax = 0, infantyrTax = 0, infantTaxesSum = 0;
//
//         let adultCard = '';
//         let childCard = '';
//         let infantCard = '';
//
//         let adultCount = ``;
//         let childCount = ``;
//         let infantCount = ``;
//
//         for (let i = 0; i < flight.length; i++){
//
//             for (let y = 0; y < flight[i].FlightPricingInfo.PaxFareDetails.length; y++) {
//
//                 let paxFare = flight[i].FlightPricingInfo.PaxFareDetails[y]
//
//                 if (paxFare.PaxType === 'ADT') {
//
//                     adultFare = parseFloat(paxFare.BasicFare) + parseFloat(paxFare.TotalTax)
//
//                     adultBaseFare = parseFloat(paxFare.BasicFare);
//
//                     adultTotaltax = parseFloat(paxFare.TotalTax)
//
//                     paxFare.PaxTaxDetails.forEach(tax => {
//                         if (tax.TaxCode === 'K3') {
//                             adultk3Tax = tax.TaxAmount;
//                         } else if (tax.TaxCode === 'YQ') {
//                             adultyqTax = tax.TaxAmount;
//                         } else if (tax.TaxCode === 'YR') {
//                             adultyrTax = tax.TaxAmount;
//                         } else if (tax.TaxAmount !== 'TotalTax') {
//                             // Sum other taxes excluding K3, YQTax, YR, and TotalTax
//                             adultTaxesSum += tax.TaxAmount;
//                         }
//                     });
//
//                     adultCard = `<div class="row spacing-0 px-2 py-1 d-flex flex-column gap-2">
//                                             <div class="d-flex justify-content-between fw-600 mb-2">
//                                                 <span>Fare/Pax Type</span><span>Amount</span></div>
//                                             <div class="d-flex justify-content-between"><span>Adult:</span><span
//                                                         class="fw-500">${adultBaseFare}</span></div>
//                                             <div class="d-flex justify-content-between"><span>YQ Tax:</span><span
//                                                         class="fw-500">${adultyqTax}</span></div>
//                                             <div class="d-flex justify-content-between"><span>OtherTaxes:</span><span
//                                                         class="fw-500">${adultTaxesSum}</span></div>
//                                             <div class="d-flex justify-content-between"><span>K3/AirlineGST:</span><span
//                                                         class="fw-500">${adultk3Tax}</span></div>
//                                             <div class="d-flex justify-content-between"><span>Fuel Charge:</span><span
//                                                         class="fw-500">${adultyrTax}</span></div>
//                                             <div class="d-flex justify-content-between"><span>Adult Total:</span><span
//                                                         class="fw-600">${adultFare}</span></div>
//                                         </div>`
//
//
//                     adultCount = `<div class="d-flex justify-content-between"><span
//                                                         class="fw-500">${parseInt(arr.onwardFlight.adults)} x Adult</span><span
//                                                         class="fw-600">${adultFare * parseInt(arr.onwardFlight.adults)}</span></div>`
//                 }
//
//                 if (paxFare.PaxType === 'CHD') {
//
//                     childFare = parseFloat(paxFare.BasicFare) + parseFloat(paxFare.TotalTax)
//
//                     childBasefare = parseFloat(paxFare.BasicFare);
//
//                     childTotalTax = parseFloat(paxFare.TotalTax)
//
//                     paxFare.PaxTaxDetails.forEach(tax => {
//                         if (tax.TaxCode === 'K3') {
//                             childk3Tax = tax.TaxAmount;
//                         } else if (tax.TaxCode === 'YQ') {
//                             childyqTax = tax.TaxAmount;
//                         } else if (tax.TaxCode === 'YR') {
//                             childyrTax = tax.TaxAmount;
//                         } else if (tax.TaxAmount !== 'TotalTax') {
//                             // Sum other taxes excluding K3, YQTax, YR, and TotalTax
//                             childTaxesSum += tax.TaxAmount;
//                         }
//                     });
//                     childCard = `<div class="row spacing-0 px-2 py-1 d-flex flex-column gap-2">
//                                             <div class="d-flex justify-content-between fw-600 mb-2">
//                                                 <span>Fare/Pax Type</span><span>Amount</span></div>
//                                             <div class="d-flex justify-content-between"><span>Child:</span><span
//                                                         class="fw-500">${childBasefare}</span></div>
//                                             <div class="d-flex justify-content-between"><span>YQ Tax:</span><span
//                                                         class="fw-500">${childyqTax}</span></div>
//                                             <div class="d-flex justify-content-between"><span>OtherTaxes:</span><span
//                                                         class="fw-500">${childTaxesSum}</span></div>
//                                             <div class="d-flex justify-content-between"><span>K3/AirlineGST:</span><span
//                                                         class="fw-500">${childk3Tax}</span></div>
//                                             <div class="d-flex justify-content-between"><span>Fuel Charge:</span><span
//                                                         class="fw-500">${childyrTax}</span></div>
//                                             <div class="d-flex justify-content-between"><span>Child Total:</span><span
//                                                         class="fw-600">${childFare}</span></div>
//                                         </div>`
//
//
//                     childCount = `<div class="d-flex justify-content-between"><span
//                                                         class="fw-500">${parseInt(arr.onwardFlight.childs)} x Child</span><span
//                                                         class="fw-600">${childFare * parseInt(arr.onwardFlight.childs)}</span></div>`
//                 }
//                 if (paxFare.PaxType === 'INF') {
//
//                     infantFare = parseFloat(paxFare.BasicFare) + parseFloat(paxFare.TotalTax)
//
//                     infantBaseFare = parseFloat(paxFare.BasicFare);
//
//                     infantTotalTax = parseFloat(paxFare.TotalTax)
//
//                     paxFare.PaxTaxDetails.forEach(tax => {
//                         if (tax.TaxCode === 'K3') {
//                             infantk3Tax = tax.TaxAmount;
//                         } else if (tax.TaxCode === 'YQ') {
//                             infantyqTax = tax.TaxAmount;
//                         } else if (tax.TaxCode === 'YR') {
//                             infantyrTax = tax.TaxAmount;
//                         } else if (tax.TaxAmount !== 'TotalTax') {
//                             // Sum other taxes excluding K3, YQTax, YR, and TotalTax
//                             infantTaxesSum += tax.TaxAmount;
//                         }
//                     });
//                     infantCard = `<div class="row spacing-0 px-2 py-1 d-flex flex-column gap-2">
//                                             <div class="d-flex justify-content-between fw-600 mb-2">
//                                                 <span>Fare/Pax Type</span><span>Amount</span></div>
//                                             <div class="d-flex justify-content-between"><span>Infant:</span><span
//                                                         class="fw-500">${infantBaseFare}</span></div>
//                                             <div class="d-flex justify-content-between"><span>YQ Tax:</span><span
//                                                         class="fw-500">${infantyqTax}</span></div>
//                                             <div class="d-flex justify-content-between"><span>OtherTaxes:</span><span
//                                                         class="fw-500">${infantTaxesSum}</span></div>
//                                             <div class="d-flex justify-content-between"><span>K3/AirlineGST:</span><span
//                                                         class="fw-500">${infantk3Tax}</span></div>
//                                             <div class="d-flex justify-content-between"><span>Fuel Charge:</span><span
//                                                         class="fw-500">${infantyrTax}</span></div>
//                                             <div class="d-flex justify-content-between"><span>Adult Total:</span><span
//                                                         class="fw-600">${infantFare}</span></div>
//                                         </div>`
//
//
//                     infantCount = `<div class="d-flex justify-content-between"><span
//                                                         class="fw-500">${parseInt(arr.onwardFlight.infants)} x Infant</span><span
//                                                         class="fw-600">${parseFloat(infantFare) * parseInt(arr.onwardFlight.infants)}</span></div>`
//                 }
//             }
//
//         }
//
//
//         // old
//         let totalPax = parseInt(arr.onwardFlight.adults) + parseInt(arr.onwardFlight.childs) + parseInt(arr.onwardFlight.infants);
//
//         let markup_by_agent  = 0;
//
//         const fareDifference = 0;
//         let markup_type = '';
//
//         let markup_value = 0;
//
//         let totalMarkup = 0;
//
//         let totalPublishFare = 0;
//
//         let totalNetFare = 0
//
//         let commission = 0
//
//         let netPrice = 0
//
//         let tds  = 0
//
//
//         let totalOtherTaxes = 0
//
//
//         let calculatedTax = 0;
//
//         totalAmount = (adultFare * parseInt(arr.onwardFlight.adults)) + (childFare * parseInt(arr.onwardFlight.childs)) + (infantFare * parseInt(arr.onwardFlight.infants)) + parseFloat(calculatedTax);
//
//         let amountPayable = (parseFloat(netPrice) + tds + parseFloat(calculatedTax)).toFixed(2);
//
//         return `
//        <section class="flight-fare-summary-section">
//                                 <div class="fare-summary_container flex-1">
//                                     <div class="fare-summary_title d-flex justify-content-between align-items-center">
//                                         <span>FARE SUMMARY</span>
//                                         <button type="button" class="app-btn-transparent p-0 dark-grey-color fs-16" onclick="showPayment()"
//                                                 style="padding: 0.5rem; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 10px; font-weight: 600;">
//                                             <svg stroke="currentColor" fill="currentColor" stroke-width="0"
//                                                  viewBox="0 0 512 512" height="1em" width="1em"
//                                                  xmlns="http://www.w3.org/2000/svg">
//                                                 <path d="M256 105c-101.8 0-188.4 62.4-224 151 35.6 88.6 122.2 151 224 151s188.4-62.4 224-151c-35.6-88.6-122.2-151-224-151zm0 251.7c-56 0-101.8-45.3-101.8-100.7S200 155.3 256 155.3 357.8 200.6 357.8 256 312 356.7 256 356.7zm0-161.1c-33.6 0-61.1 27.2-61.1 60.4s27.5 60.4 61.1 60.4 61.1-27.2 61.1-60.4-27.5-60.4-61.1-60.4z"></path>
//                                             </svg>
//                                         </button>
//                                     </div>
//                                     <div class="fare-summary_table watermarked"
//                                          data-watermark="FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 ">
//                                         ${adultCard}
//                                         ${childCard}
//                                         ${infantCard}
//
//                                         <div class="row spacing-0 px-2 py-1 d-flex flex-column gap-2">
//                                             <div class="text-center fw-600 fs-14 ">Total Fare</div>
//                                             ${adultCount}
//                                             ${childCount}
//                                             ${infantCount}
//                                             <div class="d-flex justify-content-between"><span
//                                                         class="fw-500">Platform Fee</span><span class="fw-600">₹0</span></div>
//                                             <div class="d-flex justify-content-between"><span
//                                                         class="fw-500">Platform Tax</span><span class="fw-600">₹${calculatedTax}</span></div>
//                                         </div>
//                                         <div class="row spacing-0 px-2 py-1 d-flex flex-column gap-2 paymentBreak hidden">
//                                         <div class="d-flex justify-content-between fw-600 mb-2">
//                                             <span>Payment Breakdown</span><span>Amount</span></div>
//                                             <div class="d-flex justify-content-between"><span>Gross Fare By Vendor:</span><span class="fw-500">${totalPublishFare}</span></div>
//                                             <div class="d-flex justify-content-between"><span>Magin Given to TDO by Vendor:</span><span class="fw-500">${fareDifference}</span></div>
//                                             <div class="d-flex justify-content-between"><span>Net Price For TDO:</span><span class="fw-500">${netPrice}</span></div>
//                                         <div class="d-flex justify-content-between"><span>TDO Markup(Already Added in Net):</span><span class="fw-500">${totalMarkup}</span></div>
//                                         <div class="d-flex justify-content-between"><span>Travel Agent Markup:</span><span class="fw-500">${markup_by_agent}</span></div>
//                                         <div class="d-flex justify-content-between"><span>Commission:</span><span class="fw-500">${commission}</span></div>
//                                         <div class="d-flex justify-content-between"><span>TDS On Commission:</span><span class="fw-500">${tds}</span></div>
//                                         <div class="d-flex justify-content-between"><span>Platform Fee:</span><span class="fw-500">0</span></div>
//                                         <div class="d-flex justify-content-between"><span>Platform Tax:</span><span class="fw-500">${calculatedTax}</span></div>
//                                      <div class="d-flex justify-content-between">
//     <span>Net Payable by Travel Agent :</span>
//     <span class="fw-500">₹${amountPayable}</span>
// </div>
//   <div class="d-flex justify-content-between"><span>Net Earned By TDO:</span><span class="fw-500">${(parseFloat(totalMarkup)).toFixed(2)}</span></div>
//   <div class="d-flex justify-content-between"><span>Net Earned By Agent:</span><span class="fw-500">${((parseFloat(totalPublishFare) - parseFloat(amountPayable)) + parseFloat(markup_by_agent)).toFixed(2)}</span></div>
//                                      </div>
//                                     </div>
//
//                                     <div class="fare-summary_footer watermarked">
//                                         <div class="row spacing-0"><span class="col fare-summary_footer_title">Net Payable</span><span
//                                                     class="col fare-summary_footer_value d-flex flex-column"><span id="totalAmountSpan">${(parseFloat(totalAmount)).toFixed(2)}</span></span>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div class="my-3 d-none d-sm-block">
//                                     <div class="booking-counter-background">
//                                         <div class="countdown-timer">
//                                             <div class="text-center">
//                                                 <div class="countdown-timer__timer">
//                                                     <div id="timer"><span class="me-1">00</span><span>:</span><span
//                                                                 class="ms-1">00</span></div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </section>
//        `
//
//
//     }
//
// }


class TBOFareBreakupCardFixed {
    constructor(fare, index) {
       // console.log(fare);
        this.fare = fare;
        this.index = index;
        this.adults = arr.onwardFlight.adults || 0; // Default to 0 if undefined
        this.childs = arr.onwardFlight.childs || 0;
        this.infants = arr.onwardFlight.infants || 0;
    }

    calculateTaxes(paxFare) {
        let taxes = { k3Tax: 0, yqTax: 0, yrTax: 0, otherTaxesSum: 0 };

        paxFare.PaxTaxDetails.forEach(tax => {
            switch (tax.TaxCode) {
                case 'K3': taxes.k3Tax = parseFloat(tax.TaxAmount) || 0; break;
                case 'YQ': taxes.yqTax = parseFloat(tax.TaxAmount) || 0; break;
                case 'YR': taxes.yrTax = parseFloat(tax.TaxAmount) || 0; break;
                default: taxes.otherTaxesSum += parseFloat(tax.TaxAmount) || 0; break;
            }
        });

        return taxes;
    }

    createFareCard(paxType, totalBaseFare, totalFare, totalTax, taxes) {
        // Removing decimals by rounding values
        totalBaseFare = Math.ceil(totalBaseFare);
        totalFare = Math.ceil(totalFare);
        totalTax = Math.ceil(totalTax);
        taxes.yqTax = Math.ceil(taxes.yqTax);
        taxes.otherTaxesSum = Math.ceil(taxes.otherTaxesSum);
        taxes.k3Tax = Math.ceil(taxes.k3Tax);
        taxes.yrTax = Math.ceil(taxes.yrTax);

        return `
        <div class="row spacing-0 px-2 py-1 d-flex flex-column gap-2">
            <div class="d-flex justify-content-between fw-600 mb-2">
                <span>Fare/Pax Type</span><span>Amount</span>
            </div>
            <div class="d-flex justify-content-between"><span>${paxType}:</span><span class="fw-500">${totalBaseFare}</span></div>
            <div class="d-flex justify-content-between"><span>YQ Tax:</span><span class="fw-500">${taxes.yqTax}</span></div>
            <div class="d-flex justify-content-between"><span>Other Taxes:</span><span class="fw-500">${totalTax}</span></div>
            <div class="d-flex justify-content-between"><span>K3/AirlineGST:</span><span class="fw-500">${taxes.k3Tax}</span></div>
            <div class="d-flex justify-content-between"><span>Fuel Charge:</span><span class="fw-500">${taxes.yrTax}</span></div>
            <div class="d-flex justify-content-between"><span>Total ${paxType}:</span><span class="fw-500">${totalFare}</span></div>
            <hr>
            <!-- Centered Total Fare and Net Payable -->
            
        </div>`;
    }

    createPassengerCountHtml(paxType, paxCount, paxFare, totalOtherTaxes) {
        // Calculate total amount per passenger type and round it off
        let totalAmount = Math.ceil(paxFare * paxCount);
        return `
<div class="row spacing-0 px-2 py-1 d-flex flex-column gap-2">
<div class="d-flex justify-content-between">
            <span>${paxCount} x ${paxType}</span>
            <span class="fw-500 text-end">${totalAmount}</span>
        </div>
</div>`;
    }

    render() {
        let flights = this.fare.Flights || [];
        let totalFares = { Adult: 0, Child: 0, Infant: 0 };
        let totalBaseFares = { Adult: 0, Child: 0, Infant: 0 };
        let totalTaxes = { Adult: 0, Child: 0, Infant: 0 };
        let totalCards = { Adult: '', Child: '', Infant: '' };
        let paxCounts = { Adult: this.adults, Child: this.childs, Infant: this.infants };

        flights.forEach(flight => {
            (flight.FlightPricingInfo.PaxFareDetails || []).forEach(paxFare => {
                let baseFare = Math.ceil(parseFloat(paxFare.BasicFare) || 0);
                let totalTax = Math.ceil(parseFloat(paxFare.TotalTax) || 0);
                let totalFare = baseFare + totalTax;
                let taxes = this.calculateTaxes(paxFare);

                switch (paxFare.PaxType) {
                    case 'ADT':
                        totalFares.Adult += totalFare;
                        totalBaseFares.Adult += baseFare;
                        totalTaxes.Adult += totalTax;
                        totalCards.Adult = this.createFareCard('Adult', totalBaseFares.Adult, totalFares.Adult, totalTaxes.Adult, taxes);
                        break;
                    case 'CHD':
                        totalFares.Child += totalFare;
                        totalBaseFares.Child += baseFare;
                        totalTaxes.Child += totalTax;
                        totalCards.Child = this.createFareCard('Child', totalBaseFares.Child, totalFares.Child, totalTaxes.Child, taxes);
                        break;
                    case 'INF':
                        totalFares.Infant += totalFare;
                        totalBaseFares.Infant += baseFare;
                        totalTaxes.Infant += totalTax;
                        totalCards.Infant = this.createFareCard('Infant', totalBaseFares.Infant, totalFares.Infant, totalTaxes.Infant, taxes);
                        break;
                }
            });
        });

         totalAmount = Math.ceil(
            (totalFares.Adult * paxCounts.Adult) +
            (totalFares.Child * paxCounts.Child) +
            (totalFares.Infant * paxCounts.Infant)
        );

       // console.log('Adult Fare:', totalFares.Adult, 'Adult Count:', paxCounts.Adult);
       // console.log('Total Base Fare Adult:', totalBaseFares.Adult);
       // console.log('Total Tax Adult:', totalTaxes.Adult);
       // console.log('Grand Total:', totalAmount);

        let adultCount = this.createPassengerCountHtml('Adult', paxCounts.Adult, totalFares.Adult, totalTaxes.Adult);
        let childCount = this.createPassengerCountHtml('Child', paxCounts.Child, totalFares.Child, totalTaxes.Child);
        let infantCount = this.createPassengerCountHtml('Infant', paxCounts.Infant, totalFares.Infant, totalTaxes.Infant);

        return `
        <section class="flight-fare-summary-section">
            <div style="background: white" class="fare-summary_container flex-1">
                <div class="fare-summary_title d-flex justify-content-between align-items-center">
                    <span>FARE SUMMARY</span>
                    <button type="button" class="app-btn-transparent p-0 dark-grey-color fs-16" onclick="showPayment()">...</button>
                </div>
                ${totalCards.Adult} 
                ${totalCards.Child}
                ${totalCards.Infant}
                <div class="d-flex justify-content-center">
                <span class="fw-600">Total Fare</span>
            </div>
                ${adultCount}
                ${childCount}
                ${infantCount}
                <div class="fare-summary_title d-flex justify-content-between align-items-center">
                    <span>Net Payable</span>
                    <span>${totalAmount}</span>
<!--                    <button type="button" class="app-btn-transparent p-0 dark-grey-color fs-16" onclick="showPayment()">...</button>-->
                </div>
            </div>
            
            <div class="my-3 d-none d-sm-block">
                <div class="booking-counter-background">
                    <div class="countdown-timer">
                        <div class="text-center">
                            <div class="countdown-timer__timer">
                                <div id="timer1"><span class="me-1">00</span><span>:</span><span class="ms-1">00</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>`;
    }
}


class TRIPJACKFareBreakupCardFixed {

    constructor(fare, adults, childs, infants) {
        this.fare = fare;
        this.adults = adults;
        this.childs = childs;
        this.infants = infants;
    }


    render() {

        let totalFare = 0;

        let adultFare = 0;
        let adultCount = ``;
        let childCount = ``;
        let infantCount = ``;
        let childFare = 0;
        let infantFare = 0;
        let adultBaseFare = 0;
        let childBasefare = 0;
        let infantBaseFare = 0;
        let adultTotaltax = 0;
        let childTotalTax = 0;
        let infantTotalTax = 0;
        let adultk3Tax = 0, adultyqTax = 0, adultyrTax = 0, adultTaxesSum = 0;
        let childk3Tax = 0, childyqTax = 0, childyrTax = 0, childTaxesSum = 0;
        let infantk3Tax = 0, infantyqTax = 0, infantyrTax = 0, infantTaxesSum = 0;

        let adultCard = '';
        let childCard = '';
        let infantCard = '';


        let totalPax = parseInt(arr.adults) + parseInt(arr.childs);

        let markup_by_agent = parseFloat(arr.Segments[0].FareBreakup.MARKUP_ADDED_BY_AGENT);

        const fareDifference = parseFloat((parseFloat(this.fare.totalPriceInfo.totalFareDetail.fC.TF || 0) - parseFloat(this.fare.totalPriceInfo.totalFareDetail.fC.NF || 0)).toFixed(2));

        let markup_type = (fareDifference > 0) ? 'PLB' : 'Non PLB';

        let markup_value = arr.Segments[0].FareBreakup.TDO_MARKUP_PLB,
            markup_percentage = arr.Segments[0].FareBreakup.TDO_MARKUP_PERCENTAGE;

        let totalMarkup = (markup_type === 'PLB') ? ((fareDifference * parseFloat(markup_percentage) / 100)).toFixed(2) : (markup_value + (parseFloat(this.fare.totalPriceInfo.totalFareDetail.fC.TF) * parseFloat(markup_percentage) / 100)).toFixed(2)

        let totalPublishFare = (markup_type === 'PLB') ? parseFloat(this.fare.totalPriceInfo.totalFareDetail.fC.TF) : (parseFloat(this.fare.totalPriceInfo.totalFareDetail.fC.TF) + parseFloat(totalMarkup)).toFixed(2)

        let totalNetFare = (markup_type === 'PLB') ? parseFloat(this.fare.totalPriceInfo.totalFareDetail.fC.NF) + parseFloat(totalMarkup) : parseFloat(this.fare.totalPriceInfo.totalFareDetail.fC.NF) + parseFloat(totalMarkup)

        let commission = (fareDifference > 0) ? (fareDifference - totalMarkup).toFixed(2) : 0;

        let netPrice = (markup_type === 'PLB') ? ((parseFloat(this.fare.totalPriceInfo.totalFareDetail.fC.TF) + parseFloat(totalMarkup)) - fareDifference).toFixed(2) : (parseFloat(this.fare.totalPriceInfo.totalFareDetail.fC.TF) + parseFloat(totalMarkup) - fareDifference).toFixed(2);

        let tds = (commission > 0) ? parseFloat((commission * 0.05).toFixed(2)) : 0


        let totalOtherTaxes = (
            (parseFloat(totalMarkup) +
                markup_by_agent) / totalPax
        ).toFixed(2);
        this.fare.tripInfos.forEach((flight, innerIndex) => {
            if (flight.totalPriceList[0].fd) {
                if ("ADULT" in flight.totalPriceList[0].fd) {
                    adultFare += flight?.totalPriceList?.[0]?.fd?.ADULT?.fC?.TF || 0
                    adultTotaltax += flight?.totalPriceList?.[0]?.fd?.ADULT?.fC?.TAF || 0
                    adultBaseFare += flight?.totalPriceList?.[0]?.fd?.ADULT?.fC?.BF || 0

                    const afCTaxes = flight?.totalPriceList?.[0]?.fd?.ADULT?.afC?.TAF || [];

                    for (const [taxName, taxValue] of Object.entries(afCTaxes)) {
                        if (taxName === "YQ") {
                            adultyqTax += taxValue;
                        } else if (taxName === "YR") {
                            adultyrTax += taxValue;
                        } else if (taxName === "K3") {
                            adultk3Tax += taxValue;
                        } else {
                            adultTaxesSum += taxValue;
                        }
                    }

                    adultCard = `<div class="row spacing-0 px-2 py-1 d-flex flex-column gap-2">
                                            <div class="d-flex justify-content-between fw-600 mb-2">
                                                <span>Fare/Pax Type</span><span>Amount</span></div>
                                            <div class="d-flex justify-content-between"><span>Adult:</span><span
                                                        class="fw-500">${adultBaseFare}</span></div>
                                            <div class="d-flex justify-content-between"><span>YQ Tax:</span><span
                                                        class="fw-500">${adultyqTax}</span></div>
                                            <div class="d-flex justify-content-between"><span>OtherTaxes:</span><span
                                                        class="fw-500">${(adultTaxesSum + parseFloat(totalOtherTaxes)).toFixed(2)}</span></div>
                                            <div class="d-flex justify-content-between"><span>K3/AirlineGST:</span><span
                                                        class="fw-500">${adultk3Tax}</span></div>
                                            <div class="d-flex justify-content-between"><span>Fuel Charge:</span><span
                                                        class="fw-500">${adultyrTax}</span></div>
                                            <div class="d-flex justify-content-between"><span>Adult Total:</span><span
                                                        class="fw-600">${(adultFare + parseFloat(totalOtherTaxes)).toFixed(2)}</span></div>
                                        </div>`


                    adultCount = `<div class="d-flex justify-content-between"><span
                                                        class="fw-500">${this.adults} x Adult</span><span
                                                        class="fw-600">${((adultFare * parseFloat(this.adults)) + (parseFloat(totalOtherTaxes) * parseFloat(this.adults))).toFixed(2)}</span></div>`


                }
                if ("CHILD" in flight.totalPriceList[0].fd) {
                    childFare += flight?.totalPriceList?.[0]?.fd?.CHILD?.fC?.TF || 0
                    childTotalTax += flight?.totalPriceList?.[0]?.fd?.CHILD?.fC?.TAF || 0;
                    childBasefare += flight?.totalPriceList?.[0]?.fd?.CHILD?.fC?.BF || 0;

                    const afCTaxes = flight?.totalPriceList?.[0]?.fd?.CHILD?.afC?.TAF || [];

                    for (const [taxName, taxValue] of Object.entries(afCTaxes)) {
                        if (taxName === "YQ") {
                            childyqTax += taxValue;
                        } else if (taxName === "YR") {
                            childyrTax += taxValue;
                        } else if (taxName === "K3") {
                            childk3Tax += taxValue;
                        } else {
                            childTaxesSum += taxValue;
                        }
                    }

                    childCard = `<div class="row spacing-0 px-2 py-1 d-flex flex-column gap-2">
                                            <div class="d-flex justify-content-between fw-600 mb-2">
                                                <span>Fare/Pax Type</span><span>Amount</span></div>
                                            <div class="d-flex justify-content-between"><span>Child:</span><span
                                                        class="fw-500">${childBasefare}</span></div>
                                            <div class="d-flex justify-content-between"><span>YQ Tax:</span><span
                                                        class="fw-500">${childyqTax}</span></div>
                                            <div class="d-flex justify-content-between"><span>OtherTaxes:</span><span
                                                        class="fw-500">${(childTaxesSum + parseFloat(totalOtherTaxes)).toFixed(2)}</span></div>
                                            <div class="d-flex justify-content-between"><span>K3/AirlineGST:</span><span
                                                        class="fw-500">${childk3Tax}</span></div>
                                            <div class="d-flex justify-content-between"><span>Fuel Charge:</span><span
                                                        class="fw-500">${childyrTax}</span></div>
                                            <div class="d-flex justify-content-between"><span>Child Total:</span><span
                                                        class="fw-600">${(childFare + parseFloat(totalOtherTaxes)).toFixed(2)}</span></div>
                                        </div>`


                    childCount = `<div class="d-flex justify-content-between"><span
                                                        class="fw-500">${this.childs} x Child</span><span
                                                        class="fw-600">${((childFare * parseFloat(this.childs)) + (parseFloat(totalOtherTaxes) * parseFloat(this.childs))).toFixed(2)}</span></div>`

                }
                if ("INFANT" in flight.totalPriceList[0].fd) {
                    infantFare += flight?.totalPriceList?.[0]?.fd?.INFANT?.fC?.TF || 0
                    infantTotalTax += flight?.totalPriceList?.[0]?.fd?.INFANT?.fC?.TAF || 0
                    infantBaseFare += flight?.totalPriceList?.[0]?.fd?.INFANT?.fC?.BF || 0;

                    const afCTaxes = flight?.totalPriceList?.[0]?.fd?.INFANT?.afC?.TAF || [];

                    for (const [taxName, taxValue] of Object.entries(afCTaxes)) {
                        if (taxName === "YQ") {
                            infantyqTax += taxValue;
                        } else if (taxName === "YR") {
                            infantyrTax += taxValue;
                        } else if (taxName === "K3") {
                            infantk3Tax += taxValue;
                        } else {
                            infantTaxesSum += taxValue;
                        }
                    }

                    infantCard = `<div class="row spacing-0 px-2 py-1 d-flex flex-column gap-2">
                                            <div class="d-flex justify-content-between fw-600 mb-2">
                                                <span>Fare/Pax Type</span><span>Amount</span></div>
                                            <div class="d-flex justify-content-between"><span>Infant:</span><span
                                                        class="fw-500">${infantBaseFare}</span></div>
                                            <div class="d-flex justify-content-between"><span>YQ Tax:</span><span
                                                        class="fw-500">${infantyqTax}</span></div>
                                            <div class="d-flex justify-content-between"><span>OtherTaxes:</span><span
                                                        class="fw-500">${infantTaxesSum}</span></div>
                                            <div class="d-flex justify-content-between"><span>K3/AirlineGST:</span><span
                                                        class="fw-500">${infantk3Tax}</span></div>
                                            <div class="d-flex justify-content-between"><span>Fuel Charge:</span><span
                                                        class="fw-500">${infantyrTax}</span></div>
                                            <div class="d-flex justify-content-between"><span>Adult Total:</span><span
                                                        class="fw-600">${infantFare}</span></div>
                                        </div>`


                    infantCount = `<div class="d-flex justify-content-between"><span
                                                        class="fw-500">${this.infants} x Infant</span><span
                                                        class="fw-600">${infantFare * parseFloat(this.infants)}</span></div>`


                }
            }
        })

        totalAmount = (adultFare * parseFloat(this.adults)) + infantFare * parseFloat(this.infants) + (childFare * parseFloat(this.childs));

        let calculatedTax = (platformFee * (platformTax / 100)).toFixed(2);

        totalAmount = (adultFare * parseFloat(this.adults)) + infantFare * parseFloat(this.infants) + (childFare * parseFloat(this.childs)) + (parseFloat(totalOtherTaxes) * parseInt(totalPax)) + platformFee + parseFloat(calculatedTax);

        let amountPayable = (parseFloat(netPrice) + parseFloat(tds) + parseFloat(platformFee) + parseFloat(calculatedTax)).toFixed(2);

        return `
       <section class="flight-fare-summary-section">
                                <div class="fare-summary_container flex-1">
                                    <div class="fare-summary_title d-flex justify-content-between align-items-center">
                                        <span>FARE SUMMARY</span>
                                        <button type="button" class="app-btn-transparent p-0 dark-grey-color fs-16" onclick="showPayment()"
                                                style="padding: 0.5rem; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 10px; font-weight: 600;">
                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0"
                                                 viewBox="0 0 512 512" height="1em" width="1em"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M256 105c-101.8 0-188.4 62.4-224 151 35.6 88.6 122.2 151 224 151s188.4-62.4 224-151c-35.6-88.6-122.2-151-224-151zm0 251.7c-56 0-101.8-45.3-101.8-100.7S200 155.3 256 155.3 357.8 200.6 357.8 256 312 356.7 256 356.7zm0-161.1c-33.6 0-61.1 27.2-61.1 60.4s27.5 60.4 61.1 60.4 61.1-27.2 61.1-60.4-27.5-60.4-61.1-60.4z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    <div class="fare-summary_table watermarked"
                                         data-watermark="FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 ">
                                        ${adultCard}
                                        ${childCard}
                                        ${infantCard}
                                        <div class="row spacing-0 px-2 py-1 d-flex flex-column gap-2">
                                            <div class="text-center fw-600 fs-14 ">Total Fare</div>
                                            ${adultCount}
                                            ${childCount}
                                            ${infantCount}
                                          <div class="d-flex justify-content-between"><span
                                                        class="fw-500">Platform Fee</span><span class="fw-600">AED ${platformFee}</span></div>
                                            <div class="d-flex justify-content-between"><span
                                                        class="fw-500">Platform Tax</span><span class="fw-600">AED ${calculatedTax}</span></div>
                                        </div>
                                        <div class="row spacing-0 px-2 py-1 d-flex flex-column gap-2 paymentBreak hidden">
                                        <div class="d-flex justify-content-between fw-600 mb-2">
                                            <span>Payment Breakdown</span><span>Amount</span></div>
                                            <div class="d-flex justify-content-between"><span>Gross Fare By Vendor:</span><span class="fw-500">${totalPublishFare}</span></div>
                                            <div class="d-flex justify-content-between"><span>Magin Given to TDO by Vendor:</span><span class="fw-500">${fareDifference}</span></div>
                                            <div class="d-flex justify-content-between"><span>Net Price For TDO:</span><span class="fw-500">${netPrice}</span></div>
                                        <div class="d-flex justify-content-between"><span>TDO Markup(Already Added in Net):</span><span class="fw-500">${totalMarkup}</span></div>
                                        <div class="d-flex justify-content-between"><span>Travel Agent Markup:</span><span class="fw-500">${markup_by_agent}</span></div>
                                        <div class="d-flex justify-content-between"><span>Commission:</span><span class="fw-500">${commission}</span></div>
                                        <div class="d-flex justify-content-between"><span>TDS On Commission:</span><span class="fw-500">${tds}</span></div>
                                        <div class="d-flex justify-content-between"><span>Platform Fee:</span><span class="fw-500">${platformFee}</span></div>
                                        <div class="d-flex justify-content-between"><span>Platform Tax:</span><span class="fw-500">${calculatedTax}</span></div>
                                     <div class="d-flex justify-content-between">
    <span>Net Payable by Travel Agent :</span>
    <span class="fw-500">AED ${amountPayable}</span>
</div>
  <div class="d-flex justify-content-between"><span>Net Earned By TDO:</span><span class="fw-500">${(parseFloat(totalMarkup) + parseFloat(platformFee)).toFixed(2)}</span></div>
  <div class="d-flex justify-content-between"><span>Net Earned By Agent:</span><span class="fw-500">${((parseFloat(totalPublishFare) + parseFloat(platformFee) + parseFloat(calculatedTax) - parseFloat(amountPayable)) + parseFloat(markup_by_agent)).toFixed(2)}</span></div>
                                     </div>
                                    </div>
                                    <div class="fare-summary_footer watermarked"
                                         data-watermark="FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 FW76315 ">
                                        <div class="row spacing-0"><span class="col fare-summary_footer_title">Total Fare</span><span
                                                    class="col fare-summary_footer_value d-flex flex-column"><span id="totalAmountSpan">${totalAmount}</span></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="my-3 d-none d-sm-block">
                                    <div class="booking-counter-background">
                                        <div class="countdown-timer">
                                            <div class="text-center">
                                                <div class="countdown-timer__timer">
                                                    <div id="timer1"><span class="me-1">00</span><span>:</span><span
                                                                class="ms-1">00</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
       `
    }

}

function AirlineFIlterFixed() {
    document.getElementById('airlineFilter').innerHTML = '';
    // Create a map to store counts for each airline
    const airlineCounts = new Map();

    // Calculate counts for each airline
    flightArray.forEach((flight) => {
        const airlineName = flight.flight.onwardFlight.AirlineName;

        airlineCounts.set(airlineName, (airlineCounts.get(airlineName) || 0) + 1);
    });


    // Create and append elements for each airline
    airlineCounts.forEach((count, airlineName) => {
        const checkboxId = `brand${airlineName.replace(/\s/g, '')}`;
        const checkbox = `  <label
                                            class=" d-flex  fw-500 align-items-center fs-12 cursor-pointer app-check-box"
                                            style="color: rgb(91, 91, 91);" for="${checkboxId}">
            <input id="${checkboxId}" value="${airlineName}" type="checkbox"
                   name="carrier"
                   style="margin-right: 7px; appearance: none; width: 15px; height: 15px; border-radius: 3px; border: 1px solid rgb(91, 91, 91);" onclick="applyFilters()">${airlineName}</label>
`;

        const div = `
           ${checkbox}
        `;


        document.getElementById("airlineSector").innerHTML = `${flightArray[0].flight.onwardFlight.Origin.CityCode} -> ${flightArray[0].flight.onwardFlight.Destination.CityCode}`
        document.getElementById("dTime").innerHTML = `${flightArray[0].flight.onwardFlight.Origin.CityCode} -> ${flightArray[0].flight.onwardFlight.Destination.CityCode}`
        document.getElementById("aTime").innerHTML = `${flightArray[0].flight.onwardFlight.Origin.CityCode} -> ${flightArray[0].flight.onwardFlight.Destination.CityCode}`
        document.getElementById("dFN").innerHTML = `Filter By Flight Number ${flightArray[0].flight.onwardFlight.Origin.CityCode} -> ${flightArray[0].flight.onwardFlight.Destination.CityCode}`
        document.getElementById('airlineFilter').innerHTML += div
    });
}

function AirlineFIlterReturnFixed() {
    document.getElementById('airlineFilterReturn').innerHTML = '';
    // Create a map to store counts for each airline
    const airlineCounts = new Map();

    // Calculate counts for each airline
    flightArray.forEach((flight) => {
        const airlineName = flight.flight.returnFlight.AirlineName;

        airlineCounts.set(airlineName, (airlineCounts.get(airlineName) || 0) + 1);
    });


    // Create and append elements for each airline
    airlineCounts.forEach((count, airlineName) => {
        const checkboxId = `brand${airlineName.replace(/\s/g, '')}`;
        const checkbox = `  <label
                                            class=" d-flex  fw-500 align-items-center fs-12 cursor-pointer app-check-box"
                                            style="color: rgb(91, 91, 91);" for="${checkboxId}Return">
            <input id="${checkboxId}Return" value="${airlineName}" type="checkbox"
                   name="carrierReturn"
                   style="margin-right: 7px; appearance: none; width: 15px; height: 15px; border-radius: 3px; border: 1px solid rgb(91, 91, 91);" onclick="applyFiltersReturn()">${airlineName}</label>
`;

        const div = `
           ${checkbox}
        `;


        document.getElementById("airlineSectorReturn").innerHTML = `${flightArray[0].flight.returnFlight.Origin.CityCode} -> ${flightArray[0].flight.returnFlight.Destination.CityCode}`
        document.getElementById("dTimeReturn").innerHTML = `${flightArray[0].flight.returnFlight.Origin.CityCode} -> ${flightArray[0].flight.returnFlight.Destination.CityCode}`
        document.getElementById("aTimeReturn").innerHTML = `${flightArray[0].flight.returnFlight.Origin.CityCode} -> ${flightArray[0].flight.returnFlight.Destination.CityCode}`
        document.getElementById("dFNR").innerHTML = `Filter By Flight Number ${flightArray[0].flight.returnFlight.Origin.CityCode} -> ${flightArray[0].flight.returnFlight.Destination.CityCode}`
        document.getElementById('airlineFilterReturn').innerHTML += div
    });
}

function fareFIlterFixed() {

    document.getElementById('fareFilter').innerHTML = '';
    // Create a map to store counts for each airline
    const fareCounts = new Map();

    // Calculate counts for each airline
    flightArray.forEach((flight) => {
        flight.flight.onwardFlight.Segments.forEach((segment, index) => {
            const airlineName = segment.fare;

            fareCounts.set(airlineName, (fareCounts.get(airlineName) || 0) + 1);
        })
    });

    // Create and append elements for each airline
    fareCounts.forEach((count, airlineName) => {
        const checkboxId = `brand${airlineName.replace(/\s/g, '')}`;
        const checkbox = `  <label
                                            class=" d-flex  fw-500 align-items-center fs-12 cursor-pointer app-check-box"
                                            style="color: rgb(91, 91, 91);" for="${checkboxId}">
            <input id="${checkboxId}" value="${airlineName}" type="checkbox"
                   name="allfares"
                   style="margin-right: 7px; appearance: none; width: 15px; height: 15px; border-radius: 3px; border: 1px solid rgb(91, 91, 91);" onclick="applyFilters()">${airlineName}</label>
`;

        const div = `
           ${checkbox}
        `;
        document.getElementById("fareSector").innerHTML = `${flightArray[0].flight.onwardFlight.Origin.CityCode} -> ${flightArray[0].flight.onwardFlight.Destination.CityCode}`
        document.getElementById('fareFilter').innerHTML += div
    });
}

function fareFIlterReturnFixed() {

    document.getElementById('fareFilterReturn').innerHTML = '';
    // Create a map to store counts for each airline
    const fareCounts = new Map();

    // Calculate counts for each airline
    flightArray.forEach((flight) => {
        flight.flight.returnFlight.Segments.forEach((segment, index) => {
            const airlineName = segment.fare;

            fareCounts.set(airlineName, (fareCounts.get(airlineName) || 0) + 1);
        })
    });

    // Create and append elements for each airline
    fareCounts.forEach((count, airlineName) => {
        const checkboxId = `brand${airlineName.replace(/\s/g, '')}`;
        const checkbox = `  <label
                                            class=" d-flex  fw-500 align-items-center fs-12 cursor-pointer app-check-box"
                                            style="color: rgb(91, 91, 91);" for="${checkboxId}Return">
            <input id="${checkboxId}Return" value="${airlineName}" type="checkbox"
                   name="allfaresReturn"
                   style="margin-right: 7px; appearance: none; width: 15px; height: 15px; border-radius: 3px; border: 1px solid rgb(91, 91, 91);" onclick="applyFiltersReturn()">${airlineName}</label>
`;

        const div = `
           ${checkbox}
        `;
        document.getElementById("fareSectorReturn").innerHTML = `${flightArray[0].flight.returnFlight.Origin.CityCode} -> ${flightArray[0].flight.returnFlight.Destination.CityCode}`
        document.getElementById('fareFilterReturn').innerHTML += div
    });
}

async function PriceFilterDivFixed() {
    const priceDiv = document.getElementById("priceFilter");
    priceDiv.innerHTML = '';
    const publishedFares = [];

    // Collect PublishedFares
    flightArray.forEach(flight => {
        // Iterate through each detail in the flight
        flight.flight.onwardFlight.Segments.forEach(detail => {
            // Push the PublishedFare to the publishedFares array
            publishedFares.push(detail.FareBreakup.PublishedFare);
        });
    });

    // Calculate min and max values from the array of PublishedFares
    const minPublishedFare = Math.min(...publishedFares);
    const maxPublishedFare = Math.max(...publishedFares);

    const div = `
        <div class="d-flex text-lh-1">
            <span>AED </span>
            <span id="rangeSliderExample3MinResult" class=""> </span>
            <span class="mx-0dot5"> — </span>
            <span>AED </span>
            <span id="rangeSliderExample3MaxResult" class=""> </span>
        </div>
        <input class="js-range-slider" type="text"
            data-extra-classes="u-range-slider height-35"
            data-result-min="#rangeSliderExample3MinResult"
            data-result-max="#rangeSliderExample3MaxResult">
    `;

    priceDiv.insertAdjacentHTML('beforeend', div);

    // Initialize ionRangeSlider for price filter
    $(document).ready(function () {
        $("#rangeSliderExample3MinResult").text(minPublishedFare);
        $("#rangeSliderExample3MaxResult").text(maxPublishedFare);
        $(".js-range-slider").ionRangeSlider({
            skin: "round",
            type: "double",
            grid: false,
            hide_from_to: true,
            hide_min_max: true,
            min: minPublishedFare,
            max: maxPublishedFare,
            from: minPublishedFare.toFixed(2),
            to: maxPublishedFare.toFixed(2),
            prefix: "AED ",
            onChange: function (data) {
                $("#rangeSliderExample3MinResult").text(data.from);
                $("#rangeSliderExample3MaxResult").text(data.to);

                // Call the applyFilters function with the range slider value
                applyFilters();
            }
        });
    });
}

async function stopsFilterFixed() {
    document.getElementById('stopFilter').innerHTML = '';
    // Create a map to store counts for each stops option
    const stopsCounts = new Map();

    // Calculate counts for each stops option
    flightArray.forEach((flight) => {
        const stops = `${flight.flight.onwardFlight.Stops}`;  // Use 'stops' property, default to 'Non Stop' if undefined
        stopsCounts.set(stops, (stopsCounts.get(stops) || 0) + 1);
    });

   // console.log(stopsCounts)

    // Create and append elements for each stops option
    stopsCounts.forEach((count, stopsOption) => {
       // console.log(stopsOption)
        const checkboxId = `stops${stopsOption.replace(/\s/g, '')}`;
       // console.log(checkboxId)
       // console.log(checkboxId)
        const checkbox = `  <label
                                            class=" d-flex  fw-500 align-items-center fs-12 cursor-pointer app-check-box"
                                            style="color: rgb(91, 91, 91);" for="${checkboxId}">
            <input id="${checkboxId}" value="${stopsOption}" type="checkbox"
                 name="stops" style="margin-right: 7px; appearance: none; width: 15px; height: 15px; border-radius: 3px; border: 1px solid rgb(91, 91, 91);" onclick="applyFilters()">${stopsOption}</label>
`;
        const div = `
            ${checkbox}
        `;


       // console.log(div);

        document.getElementById("stopSector").innerHTML = `${flightArray[0].flight.onwardFlight.Origin.CityCode} -> ${flightArray[0].flight.onwardFlight.Destination.CityCode}`
        document.getElementById('stopFilter').innerHTML += div;
    });
}

async function stopsFilterReturnFixed() {
    document.getElementById('stopFilterReturn').innerHTML = '';
    // Create a map to store counts for each stops option
    const stopsCounts = new Map();

    // Calculate counts for each stops option
    flightArray.forEach((flight) => {
        const stops = `${flight.flight.returnFlight.Stops}`;  // Use 'stops' property, default to 'Non Stop' if undefined
        stopsCounts.set(stops, (stopsCounts.get(stops) || 0) + 1);
    });

   // console.log(stopsCounts)

    // Create and append elements for each stops option
    stopsCounts.forEach((count, stopsOption) => {
       // console.log(stopsOption)
        const checkboxId = `stops${stopsOption.replace(/\s/g, '')}`;
       // console.log(checkboxId)
       // console.log(checkboxId)
        const checkbox = `  <label
                                            class=" d-flex  fw-500 align-items-center fs-12 cursor-pointer app-check-box"
                                            style="color: rgb(91, 91, 91);" for="${checkboxId}Return">
            <input id="${checkboxId}Return" value="${stopsOption}" type="checkbox"
                 name="stopsReturn" style="margin-right: 7px; appearance: none; width: 15px; height: 15px; border-radius: 3px; border: 1px solid rgb(91, 91, 91);" onclick="applyFiltersReturn()">${stopsOption}</label>
`;
        const div = `
            ${checkbox}
        `;


       // console.log(div);

        document.getElementById("stopSectorReturn").innerHTML = `${flightArray[0].flight.returnFlight.Origin.CityCode} -> ${flightArray[0].flight.returnFlight.Destination.CityCode}`
        document.getElementById('stopFilterReturn').innerHTML += div;
    });
}

