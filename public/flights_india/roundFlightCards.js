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

class FlightRoundCards {
    constructor(flight, index) {
        this.flight = flight;
        this.index = index;
        // console.log(this.flight)
    }

    render()
    {

        let card = ` <div class="p-3 d-flex my-2 one-way-new-result-card round-trip-width flex-column ">
                                        <div class="d-flex flight-info ">
                                            <div class="spacing-0 flex-1 flight-info_flight-details row">
                                                <div class="col-lg-3 col-md-3 col-sm-3 col-3">
                                                    <div class="flight-info_flight-details">
                                                        <div class="d-flex">
                                                            <div class="d-flex me-2 flight-image"><img
                                                                        class="vertical-bottom" alt="Flight"
                                                                        src="https://static.iween.co.in/airlinelogos/${this.flight.AirlineCode}.jpg">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex flex-column flight-name"><span
                                                                class="flight-company">${this.flight.AirlineName}</span><span
                                                                class="flight-company-secondary text-capitalize"
                                                                title="Coupon">${this.flight.Supplier}</span><span
                                                                class="fs-10 flight-number">${this.flight.AirlineCode}-${this.flight.FlightNumber}</span></div>
                                                </div>
                                                <div class="col-lg-9 col-md-9 col-sm-9 col-9">
                                                    <div class="row">
                                                        <div class="d-flex justify-content-start col-lg-5 col-md-5 col-sm-5 col-4">
                                                            <div class="d-flex flex-column"><span class="title fw-600">${this.flight.Origin.DepTime}</span><span
                                                                        class="fs-12">${this.flight.Origin.DepDate}</span><span
                                                                        class="fs-10">${this.flight.Origin.CityName}</span></div>
                                                        </div>
                                                        <div class="d-flex justify-content-center px-0 col-lg-2 col-md-2 col-sm-2 col-4">
                                                            <div class="d-flex flex-column text-center"><span
                                                                        class="fs-12 fw-500">${this.flight.totalDuration.hours}h ${this.flight.totalDuration.minutes}m</span>
                                                                <div class="d-flex flex-column"><p
                                                                            class="non-stop-seperator "></p><span
                                                                            class="fs-8">${this.flight.Stops}</span></div>
                                                            </div>
                                                        </div>
                                                        <div class="d-flex justify-content-end col-lg-5 col-md-5 col-sm-5 col-4">
                                                            <div class="d-flex flex-column text-end"><span
                                                                        class="title fw-600">${this.flight.Destination.ArrTime}</span><span
                                                                        class="fs-12">${this.flight.Destination.ArrDate}</span><span
                                                                        class="fs-10">${this.flight.Destination.CityName}</span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex justify-content-end"><a
                                                        class="fs-14 fw-600 mt-3 app-link-black" onclick="renderSideBar(${this.index})">Flight Details</a>
                                            </div>
                                        </div>
                                        <div class=" d-flex fare-info">
                                            <div class="flex-1 spacing-0 row">
                                                <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div class="d-flex flex-column fare-info_details" id="twoFares">`;
        <!-- fare Component -->
        for (let i = 0; i < Math.min(2, this.flight.Segments.length); i++) {
            let flightCards = new FareCards(this.flight.Segments[i], i, "d")
            card += flightCards.render(this.index)
        }

        card += `
</div>
<div class="d-flex flex-column fare-info_details hide" id="dotherFares${this.index}">
`;

        for (let i = 2; i < this.flight.Segments.length; i++) {
            let flightCards = new FareCards(this.flight.Segments[i], i, "d")
            card += flightCards.render(this.index)
        }


        card += `</div>
  </div>
                                                <div class="px-0 mt-1 col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div class="d-flex justify-content-end pe-1">
                                                        <div class="d-flex justify-content-between flex-1 gap-1">
                                                            <div class="d-flex align-items-center flex-1 justify-content-center">
`;


        if (this.flight.Segments.length > 2) {
            card += `
        <a class="fs-12 fw-500 flex-1 app-link-grey" onclick="toggleVisibility('d',${this.index})">
            <div class="d-flex align-items-center justify-content-center">
                <span>+${this.flight.Segments.length - 2} More fares</span>
                <svg stroke="currentColor" fill="currentColor"
                     stroke-width="0" viewBox="0 0 24 24" height="1em"
                     width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M7 10l5 5 5-5z"></path>
                </svg>
            </div>
        </a>`;
        }


        card+=`
                                              
                                                          </div>
                                                            <button type="button" onclick="departFlightDetails(${this.index})"
                                                                    class="app-btn app-btn-primary app-btn-medium px-3"
                                                                    style="padding: 0.5rem; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 10px; font-weight: 600;">
                                                                Book
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
`

        return card
    }


    renderReturn()
    {

        let card = ` <div class="p-3 d-flex my-2 one-way-new-result-card round-trip-width flex-column ">
                                        <div class="d-flex flight-info ">
                                            <div class="spacing-0 flex-1 flight-info_flight-details row">
                                                <div class="col-lg-3 col-md-3 col-sm-3 col-3">
                                                    <div class="flight-info_flight-details">
                                                        <div class="d-flex">
                                                            <div class="d-flex me-2 flight-image"><img
                                                                        class="vertical-bottom" alt="Flight"
                                                                        src="https://static.iween.co.in/airlinelogos/${this.flight.AirlineCode}.jpg">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex flex-column flight-name"><span
                                                                class="flight-company">${this.flight.AirlineName}</span><span
                                                                class="flight-company-secondary text-capitalize"
                                                                title="Coupon">RIYA</span><span
                                                                class="fs-10 flight-number">${this.flight.AirlineCode}-${this.flight.FlightNumber}</span></div>
                                                </div>
                                                <div class="col-lg-9 col-md-9 col-sm-9 col-9">
                                                    <div class="row">
                                                        <div class="d-flex justify-content-start col-lg-5 col-md-5 col-sm-5 col-4">
                                                            <div class="d-flex flex-column"><span class="title fw-600">${this.flight.Origin.DepTime}</span><span
                                                                        class="fs-12">${this.flight.Origin.DepDate}</span><span
                                                                        class="fs-10">${this.flight.Origin.CityName}</span></div>
                                                        </div>
                                                        <div class="d-flex justify-content-center px-0 col-lg-2 col-md-2 col-sm-2 col-4">
                                                            <div class="d-flex flex-column text-center"><span
                                                                        class="fs-12 fw-500">${this.flight.totalDuration.hours}h ${this.flight.totalDuration.minutes}m</span>
                                                                <div class="d-flex flex-column"><p
                                                                            class="non-stop-seperator "></p><span
                                                                            class="fs-8">${this.flight.Stops}</span></div>
                                                            </div>
                                                        </div>
                                                        <div class="d-flex justify-content-end col-lg-5 col-md-5 col-sm-5 col-4">
                                                            <div class="d-flex flex-column text-end"><span
                                                                        class="title fw-600">${this.flight.Destination.ArrTime}</span><span
                                                                        class="fs-12">${this.flight.Destination.ArrDate}</span><span
                                                                        class="fs-10">${this.flight.Destination.CityName}</span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex justify-content-end"><a
                                                        class="fs-14 fw-600 mt-3 app-link-black" onclick="renderSideBarReturn(${this.index})">Flight Details</a>
                                            </div>
                                        </div>
                                        <div class=" d-flex fare-info">
                                            <div class="flex-1 spacing-0 row">
                                                <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div class="d-flex flex-column fare-info_details" id="twoFares">`;

        for (let i = 0; i < Math.min(2, this.flight.Segments.length); i++) {
            let flightCards = new FareCards(this.flight.Segments[i], i, "r")
            card += flightCards.render(this.index)
        }

        card += `
</div>
<div class="d-flex flex-column fare-info_details hide" id="rotherFares${this.index}">
`;
        for (let i = 2; i < this.flight.Segments.length; i++) {
            let flightCards = new FareCards(this.flight.Segments[i], i, "r")
            card += flightCards.render(this.index)
        }


        card += `</div>
  </div>
                                                <div class="px-0 mt-1 col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div class="d-flex justify-content-end pe-1">
                                                        <div class="d-flex justify-content-between flex-1 gap-1">
                                                            <div class="d-flex align-items-center flex-1 justify-content-center">
`;


        if (this.flight.Segments.length > 2) {
            card += `
        <a class="fs-12 fw-500 flex-1 app-link-grey" onclick="toggleVisibility('r',${this.index})">
            <div class="d-flex align-items-center justify-content-center">
                <span>+${this.flight.Segments.length - 2} More fares</span>
                <svg stroke="currentColor" fill="currentColor"
                     stroke-width="0" viewBox="0 0 24 24" height="1em"
                     width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M7 10l5 5 5-5z"></path>
                </svg>
            </div>
        </a>`;
        }


        card+=`
                                              
                                                          </div>
                                                            <button type="button" onclick="returnFlightDetails(${this.index})"

                                                                    class="app-btn app-btn-primary app-btn-medium px-3"
                                                                    style="padding: 0.5rem; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 10px; font-weight: 600;">
                                                                Book
                                                            </button>
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

class FareCards {

    constructor(flight, index, type) {
        this.flight = flight;
        this.index = index;
        this.type = type;
        //console.log(index)
    }

    render(index) {

        let fareCard = ``;


        if(this.index === 0)
        {
            fareCard = `<div class="fare-component position-relative">
                        <div class="spacing-0 row">
                            <div class="col-lg-6 col-md-6 col-sm-6 col-6"
                                 style="padding-left: 5px; padding-block: 10px;"><label
                                class=" d-flex  fw-500 align-items-center fs-12 cursor-pointer"
                                for="${this.type}${this.index}${index}"
                                style="color: rgb(30, 30, 30);">
                                <input
                                class="cursor-pointer me-1"
                                id="${this.type}${this.index}${index}"
                                type="radio"
                                value="${this.index}"
                                name = "${this.type}${index}"
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
        }
        else
        {
            fareCard = `<div class="fare-component position-relative">
                        <div class="spacing-0 row">
                            <div class="col-lg-6 col-md-6 col-sm-6 col-6"
                                 style="padding-left: 5px; padding-block: 10px;"><label
                                class=" d-flex  fw-500 align-items-center fs-12 cursor-pointer"
                                for="${this.type}${this.index}${index}"
                                style="color: rgb(30, 30, 30);">
                                <input
                                class="cursor-pointer me-1"
                                id="${this.type}${this.index}${index}"
                                value="${this.index}"
                                type="radio"
                                name = "${this.type}${index}"
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
        }


        return fareCard;
    }
}

class SegmentInformation
{
    constructor(flight,index, fare) {
        this.flight = flight;
        this.index = index;
        this.fare = fare;
        console.log(this.flight)
    }

    render()
    {
        let segment = this.flight;

        let segmentCard = '';

        segmentCard+=`
        <div class="selected-flight-details__flight-leg my-2">`;
        if(segment.LayoverTime !== 0)
        {
            segmentCard+=`
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
        segmentCard+=`<div>
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
                                    <div class="d-flex flex-column"><span class="dark-grey-color fs-14 fw-600">${segment.DepTime} (${segment.DepDate}) - ${segment.DepartureCityName} - ${segment.DepartureTerminal}</span><span
                                            class="fs-10 mb-2">${segment.DepartureAirportName}</span><span
                                            class="fs-12 grey-color mb-2">Travel Time: ${segment.Duration.hours}h ${segment.Duration.minutes}m</span><span
                                            class="dark-grey-color fs-14 fw-600">${segment.ArrTime} (${segment.ArrDate}) - ${segment.ArrivalCityName} - ${segment.ArrivalTerminal}</span><span
                                            class="fs-10">${segment.ArrivalAirportName}</span></div>
                                </div>
                                <div class="selected-flight-details__flight-leg_amenities"><span>Check In: ${segment.Baggage[0].Weight}  ${segment.Baggage[0].Unit}</span>
                                </div>
                            </div>
                        
                        </div>
        `

        return  segmentCard;
    }
}

function renderSideBar(index) {
    // Get the selected flight's segments
    const selectedFlight = (filteredFlights.length > 0) ? filteredFlights[index] :  flightData.onwardFlights[index];
    //  console.log(selectedFlight)

    let selectedValue;
    // Get all radio buttons with the name "gender"
    const radios = document.getElementsByName(`d${index}`);

    // Iterate through the radio buttons
    for (let i = 0; i < radios.length; i++) {
        // Check if the current radio button is selected
        if (radios[i].checked) {
            // Display the value of the selected radio button
            selectedValue = radios[i].value;
            break;  // Exit the loop once a selected button is found
        }
    }

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
                    <div class="d-flex gap-2 trip-content align-items-center"><span class="sector-span">${selectedFlight.Origin.CityName}(${selectedFlight.Origin.CityCode}) -&gt; ${selectedFlight.Destination.CityName}(${selectedFlight.Destination.CityCode})</span><span
                            class="date-span">One Way  ${convertToDesiredFormat(`${selectedFlight.Origin.DepDate}`)}</span></div>
                </div>
                <div class="p-0 p-lg-3">
                    <section class="selected-flight-details">`

    selectedFlight.Segments[selectedValue].flightDetails.forEach((segment, index) => {
        const segmentCard = new SegmentInformation(segment, index, selectedFlight.Segments[selectedValue].fare)
        mySideBar+= segmentCard.render()
    })


    mySideBar +=`</section>
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
        <div class="fare-breakup_value">AED ${selectedFlight.Segments[selectedValue].FareBreakup.BaseFare}</div>
    </div>
    <div class="fare-breakup_content">
        <div class="fare-breakup_title">YQ Tax</div>
        <div class="fare-breakup_value">AED 0.00</div>
    </div>
    <div class="fare-breakup_content">
        <div class="fare-breakup_title">OT Tax</div>
        <div class="fare-breakup_value">AED ${selectedFlight.Segments[selectedValue].FareBreakup.totalTax}</div>
    </div>
    <div class="fare-breakup_content">
        <div class="fare-breakup_title">K3</div>
        <div class="fare-breakup_value">AED 0.00</div>
    </div>
    <div class="fare-breakup_content">
        <div class="fare-breakup_title">GST</div>
        <div class="fare-breakup_value">AED 0.00</div>
    </div>
    <div class="fare-breakup_content">
        <div class="fare-breakup_title">HC</div>
        <div class="fare-breakup_value">AED 0.00</div>
    </div>
    <div class="fare-breakup_content">
        <div class="fare-breakup_title">TDS</div>
        <div class="fare-breakup_value">AED 0.00</div>
    </div>
    <div class="fare-breakup_content">
        <div class="fare-breakup_title">Discount</div>
        <div class="fare-breakup_value">AED ${selectedFlight.Segments[selectedValue].FareBreakup.Discount}</div>
    </div>
    <div class="fare-breakup_footer">
        <div class="fare-breakup_title">Grand Total</div>
        <div class="fare-breakup_value">AED ${selectedFlight.Segments[selectedValue].FareBreakup.PublishedFare}</div>
    </div>
    <div class="fare-breakup_footer">
        <div class="fare-breakup_title">Net Fare</div>
        <div class="fare-breakup_value">AED ${selectedFlight.Segments[selectedValue].FareBreakup.OfferedFare}</div>
    </div>
</div>
</div>
<div class="tab-content" id="baggage">
                 <div class="baggage-table p-0 p-lg-3 mt-3">
    <div><img src="/images/others/baggage-vector.svg" alt=""></div>
    <div class="my-2 d-flex flex-column">
        <div class="flex-column baggage-table_value_header mb-1">${selectedFlight.Origin.CityCode}-${selectedFlight.Destination.CityCode}</div>
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

function renderSideBarReturn(index) {
    // Get the selected flight's segments
    const selectedFlight = (filteredFlightsReturn.length > 0) ? filteredFlightsReturn[index] :  flightData.returnFlights[index];
    // console.log(selectedFlight)

    let selectedValue;
    // Get all radio buttons with the name "gender"
    const radios = document.getElementsByName(`r${index}`);

    // Iterate through the radio buttons
    for (let i = 0; i < radios.length; i++) {
        // Check if the current radio button is selected
        if (radios[i].checked) {
            // Display the value of the selected radio button
            selectedValue = radios[i].value;
            break;  // Exit the loop once a selected button is found
        }
    }

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
                    <div class="d-flex gap-2 trip-content align-items-center"><span class="sector-span">${selectedFlight.Origin.CityName}(${selectedFlight.Origin.CityCode}) -&gt; ${selectedFlight.Destination.CityName}(${selectedFlight.Destination.CityCode})</span><span
                            class="date-span">One Way  ${convertToDesiredFormat(`${selectedFlight.Origin.DepDate}`)}</span></div>
                </div>
                <div class="p-0 p-lg-3">
                    <section class="selected-flight-details">`

    selectedFlight.Segments[selectedValue].flightDetails.forEach((segment, index) => {
        const segmentCard = new SegmentInformation(segment, index, selectedFlight.Segments[selectedValue].fare)
        mySideBar+= segmentCard.render()
    })


    mySideBar +=`</section>
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
        <div class="fare-breakup_value">AED ${selectedFlight.Segments[selectedValue].FareBreakup.BaseFare}</div>
    </div>
    <div class="fare-breakup_content">
        <div class="fare-breakup_title">YQ Tax</div>
        <div class="fare-breakup_value">AED 0.00</div>
    </div>
    <div class="fare-breakup_content">
        <div class="fare-breakup_title">OT Tax</div>
        <div class="fare-breakup_value">AED ${selectedFlight.Segments[selectedValue].FareBreakup.totalTax}</div>
    </div>
    <div class="fare-breakup_content">
        <div class="fare-breakup_title">K3</div>
        <div class="fare-breakup_value">AED 0.00</div>
    </div>
    <div class="fare-breakup_content">
        <div class="fare-breakup_title">GST</div>
        <div class="fare-breakup_value">AED 0.00</div>
    </div>
    <div class="fare-breakup_content">
        <div class="fare-breakup_title">HC</div>
        <div class="fare-breakup_value">AED 0.00</div>
    </div>
    <div class="fare-breakup_content">
        <div class="fare-breakup_title">TDS</div>
        <div class="fare-breakup_value">AED 0.00</div>
    </div>
    <div class="fare-breakup_content">
        <div class="fare-breakup_title">Discount</div>
        <div class="fare-breakup_value">AED ${selectedFlight.Segments[selectedValue].FareBreakup.Discount}</div>
    </div>
    <div class="fare-breakup_footer">
        <div class="fare-breakup_title">Grand Total</div>
        <div class="fare-breakup_value">AED ${selectedFlight.Segments[selectedValue].FareBreakup.PublishedFare}</div>
    </div>
    <div class="fare-breakup_footer">
        <div class="fare-breakup_title">Net Fare</div>
        <div class="fare-breakup_value">AED ${selectedFlight.Segments[selectedValue].FareBreakup.OfferedFare}</div>
    </div>
</div>
</div>
<div class="tab-content" id="baggage">
                 <div class="baggage-table p-0 p-lg-3 mt-3">
    <div><img src="/images/others/baggage-vector.svg" alt=""></div>
    <div class="my-2 d-flex flex-column">
        <div class="flex-column baggage-table_value_header mb-1">${selectedFlight.Origin.CityCode}-${selectedFlight.Destination.CityCode}</div>
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

function convertToDesiredFormat(dateString) {
    // Parse the input date string
    const date = new Date(dateString);

    // Format: "16 Sep, 2024"
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', options);

    return formattedDate;
}

function AirlineFIlter()
{
    document.getElementById('airlineFilter').innerHTML = '';
    // Create a map to store counts for each airline
    const airlineCounts = new Map();

    // Calculate counts for each airline
    flightData.onwardFlights.forEach((flight) => {
        const airlineName = flight.AirlineName;
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


        document.getElementById("airlineSector").innerHTML = `${flightData.onwardFlights[0].Origin.CityCode} -> ${flightData.onwardFlights[0].Destination.CityCode}`
        document.getElementById("dTime").innerHTML = `${flightData.onwardFlights[0].Origin.CityCode} -> ${flightData.onwardFlights[0].Destination.CityCode}`
        document.getElementById("aTime").innerHTML = `${flightData.onwardFlights[0].Origin.CityCode} -> ${flightData.onwardFlights[0].Destination.CityCode}`
        document.getElementById("dFN").innerHTML = `Filter By Flight Number ${flightData.onwardFlights[0].Origin.CityCode} -> ${flightData.onwardFlights[0].Destination.CityCode}`
        document.getElementById('airlineFilter').innerHTML += div
    });
}

function AirlineFIlterReturn()
{
    document.getElementById('airlineFilterReturn').innerHTML = '';
    // Create a map to store counts for each airline
    const airlineCounts = new Map();

    // Calculate counts for each airline
    flightData.returnFlights.forEach((flight) => {
        const airlineName = flight.AirlineName;
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


        document.getElementById("airlineSectorReturn").innerHTML = `${flightData.returnFlights[0].Origin.CityCode} -> ${flightData.returnFlights[0].Destination.CityCode}`
        document.getElementById("dTimeReturn").innerHTML = `${flightData.returnFlights[0].Origin.CityCode} -> ${flightData.returnFlights[0].Destination.CityCode}`
        document.getElementById("aTimeReturn").innerHTML = `${flightData.returnFlights[0].Origin.CityCode} -> ${flightData.returnFlights[0].Destination.CityCode}`
        document.getElementById("dFNR").innerHTML = `Filter By Flight Number ${flightData.returnFlights[0].Origin.CityCode} -> ${flightData.returnFlights[0].Destination.CityCode}`
        document.getElementById('airlineFilterReturn').innerHTML += div
    });
}

function fareFIlter()
{

    document.getElementById('fareFilter').innerHTML = '';
    // Create a map to store counts for each airline
    const fareCounts = new Map();

    // Calculate counts for each airline
    flightData.onwardFlights.forEach((flight) => {
        flight.Segments.forEach((segment, index) => {
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
        document.getElementById("fareSector").innerHTML = `${flightData.onwardFlights[0].Origin.CityCode} -> ${flightData.onwardFlights[0].Destination.CityCode}`
        document.getElementById('fareFilter').innerHTML += div
    });
}

function fareFIlterReturn()
{

    document.getElementById('fareFilterReturn').innerHTML = '';
    // Create a map to store counts for each airline
    const fareCounts = new Map();

    // Calculate counts for each airline
    flightData.returnFlights.forEach((flight) => {
        flight.Segments.forEach((segment, index) => {
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
        document.getElementById("fareSectorReturn").innerHTML = `${flightData.returnFlights[0].Origin.CityCode} -> ${flightData.returnFlights[0].Destination.CityCode}`
        document.getElementById('fareFilterReturn').innerHTML += div
    });
}

async function PriceFilterDiv() {
    const priceDiv = document.getElementById("priceFilter");
    priceDiv.innerHTML = '';
    const publishedFares = [];

    // Collect PublishedFares
    flightData.onwardFlights.forEach(flight => {
        // Iterate through each detail in the flight
        flight.Segments.forEach(detail => {
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
            <span id="rangeSliderExample3MAEDesult" class=""></span>
            <span class="mx-0dot5"> — </span>
            <span>AED </span>
            <span id="rangeSliderExample3MaxResult" class=""></span>
        </div>
        <input class="js-range-slider" type="text"
            data-extra-classes="u-range-slider height-35"
            data-result-min="#rangeSliderExample3MAEDesult"
            data-result-max="#rangeSliderExample3MaxResult">
    `;

    priceDiv.insertAdjacentHTML('beforeend', div);

    // Initialize ionRangeSlider for price filter
    $(document).ready(function () {
        $("#rangeSliderExample3MAEDesult").text(minPublishedFare.toFixed(2));
        $("#rangeSliderExample3MaxResult").text(maxPublishedFare.toFixed(2));
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
                $("#rangeSliderExample3MAEDesult").text((data.from).toFixed(2));
                $("#rangeSliderExample3MaxResult").text((data.to).toFixed(2));

                // Call the applyFilters function with the range slider value
                applyFilters();
                applyFiltersReturn()
            }
        });
    });
}


async function stopsFilter() {
    document.getElementById('stopFilter').innerHTML = '';
    // Create a map to store counts for each stops option
    const stopsCounts = new Map();

    // Calculate counts for each stops option
    flightData.onwardFlights.forEach((flight) => {
        const stops = `${flight.Stops}`;  // Use 'stops' property, default to 'Non Stop' if undefined
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


        //  console.log(div);

        document.getElementById("stopSector").innerHTML = `${flightData.onwardFlights[0].Origin.CityCode} -> ${flightData.onwardFlights[0].Destination.CityCode}`
        document.getElementById('stopFilter').innerHTML += div;
    });
}

async function stopsFilterReturn() {
    document.getElementById('stopFilterReturn').innerHTML = '';
    // Create a map to store counts for each stops option
    const stopsCounts = new Map();

    // Calculate counts for each stops option
    flightData.returnFlights.forEach((flight) => {
        const stops = `${flight.Stops}`;  // Use 'stops' property, default to 'Non Stop' if undefined
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

        document.getElementById("stopSectorReturn").innerHTML = `${flightData.returnFlights[0].Origin.CityCode} -> ${flightData.returnFlights[0].Destination.CityCode}`
        document.getElementById('stopFilterReturn').innerHTML += div;
    });
}


function applyFilters() {
    let arr = [];
    let flightKey = '';
    let renderResults = '';
    // Cache the renderResults element
    arr = flightArray;
    renderResults = document.getElementById("renderResults");
    flightKey = 'FlightNumber'

    if(res.Custom === 'YES') {
        arr = flightData.onwardFlights;
        renderResults = document.getElementById("myOnward");
        flightKey = 'FlightNumber'
    }


    const flightNumberValue = document.getElementById("fSearch").value.trim();
    // console.log(flightNumberValue)
    // Get checked airlines and fares
    const checkedAirlines = Array.from(document.querySelectorAll('input[name="carrier"]:checked'))
        .map(checkbox => checkbox.value);
    const checkedFares = Array.from(document.querySelectorAll('input[name="allfares"]:checked'))
        .map(checkbox => checkbox.value);
    const checkedStops = Array.from(document.querySelectorAll('input[name="stops"]:checked'))
        .map(checkbox => checkbox.value);

    const selectedChip = document.querySelector('.app-chip-selected');
    const aselectedChip = document.querySelector('.a-app-chip-selected');

    let selectedId = null;
    if (selectedChip) {
        selectedId = selectedChip.getAttribute('id');
        // console.log("Selected ID:", selectedId);
    }

    let aselectedId = null;
    if (aselectedChip) {
        aselectedId = aselectedChip.getAttribute('id');
        // console.log("Selected ID:", aselectedId);
    }
    // Get the range slider instance and its current values
    const sliderInstance = $(".js-range-slider").data("ionRangeSlider");
    const minPrice = sliderInstance.result.from;
    const maxPrice = sliderInstance.result.to;
    console.log(arr)
    // Filter flights based on airlines, fares, price, and selected time ID


    if(res.Custom === 'YES') {
        filteredFlights = arr.filter(flight => {
            const flightNumberMatch = flightNumberValue ? flight[flightKey].includes(flightNumberValue) : true; // Match flight number using "like"
            const airlineMatch = checkedAirlines.length === 0 || checkedAirlines.includes(flight.AirlineName);
            const airlineStops = checkedStops.length === 0 || checkedStops.includes(flight.Stops);
            const fareMatch = checkedFares.length === 0 || flight.Segments.some(segment => checkedFares.includes(segment.fare));
            const priceMatch = flight.Segments.some(segment => {
                const publishedFare = segment.FareBreakup.PublishedFare;
                return publishedFare >= minPrice && publishedFare <= maxPrice;
            });

            // Check if flight's time ID matches the selected chip ID
            const timeMatch = selectedId ? flight.Origin.Time === selectedId : true;
            const atimeMatch = aselectedId ? flight.Destination.Time === aselectedId : true;

            return airlineMatch && fareMatch && priceMatch && timeMatch && atimeMatch && airlineStops && flightNumberMatch ;
        });

    } else {
        filteredFlights = arr.filter(flight => {
            const flightNumberMatch = flightNumberValue ? flight.flight.onwardFlight[flightKey].includes(flightNumberValue) : true; // Match flight number using "like"
            const airlineMatch = checkedAirlines.length === 0 || checkedAirlines.includes(flight.flight.onwardFlight.AirlineName);
            const airlineStops = checkedStops.length === 0 || checkedStops.includes(flight.flight.onwardFlight.Stops);
            const fareMatch = checkedFares.length === 0 || flight.flight.onwardFlight.Segments.some(segment => checkedFares.includes(segment.fare));
            const priceMatch = flight.flight.onwardFlight.Segments.some(segment => {
                const publishedFare = segment.FareBreakup.PublishedFare;
                return publishedFare >= minPrice && publishedFare <= maxPrice;
            });

            // Check if flight's time ID matches the selected chip ID
            const timeMatch = selectedId ? flight.flight.onwardFlight.Origin.Time === selectedId : true;
            const atimeMatch = aselectedId ? flight.flight.onwardFlight.Destination.Time === aselectedId : true;

            return airlineMatch && fareMatch && priceMatch && timeMatch && atimeMatch && airlineStops && flightNumberMatch;
        });
    }

    // console.log("ff",filteredFlights)
    renderResults.innerHTML = ''; // Clear previous results

    // Check if there are filtered flights and render appropriately
    if (filteredFlights.length > 0) {
        // Efficient DOM manipulation using Document Fragment
        const fragment = document.createDocumentFragment();
        filteredFlights.forEach((flight, index) => {
            // Append each card to the fragment
            if(res.Custom === 'YES')
            {
                const flightCard = new FlightRoundCards(flight, index);
                const cardElement = document.createElement('div');
                cardElement.innerHTML = flightCard.render();
                fragment.appendChild(cardElement); // Append each card to the fragment
            }
            else
            {
                flight=flight.flight
                // console.log("fff",flight)
                const flightCard = new FlightFixedCards(flight, index);
                const cardElement = document.createElement('div');
                cardElement.innerHTML = flightCard.render();
                fragment.appendChild(cardElement);
            }
        });

        renderResults.appendChild(fragment); // Append the entire fragment to the DOM in one go
    } else {
        // If no matches found, render a message
        renderResults.innerHTML = '<div class="no-results">No flights found matching your criteria.</div>';
    }
}

function applyFiltersReturn() {
    let arr = [];
    let flightKey = '';
    let renderResults = '';


    arr = flightArray;
    renderResults = document.getElementById("renderResults");
    flightKey = 'FlightNumber'

    if(res.Custom === 'YES') {
        arr = flightData.returnFlights;
        renderResults = document.getElementById("myReturn");
        flightKey = 'FlightNumber'
    }


    const flightNumberValue = document.getElementById("fSearchReturn").value.trim();

    // Get checked airlines and fares
    const checkedAirlines = Array.from(document.querySelectorAll('input[name="carrierReturn"]:checked'))
        .map(checkbox => checkbox.value);
    // console.log(checkedAirlines)
    const checkedFares = Array.from(document.querySelectorAll('input[name="allfaresReturn"]:checked'))
        .map(checkbox => checkbox.value);
    const checkedStops = Array.from(document.querySelectorAll('input[name="stopsReturn"]:checked'))
        .map(checkbox => checkbox.value);

    const selectedChip = document.querySelector('.app-chip-selected-return');
    const aselectedChip = document.querySelector('.a-app-chip-selected-return');

    let selectedId = null;
    if (selectedChip) {
        selectedId = selectedChip.getAttribute('id');
        // console.log("Selected ID:", selectedId);
    }

    let aselectedId = null;
    if (aselectedChip) {
        aselectedId = aselectedChip.getAttribute('id');
        // console.log("Selected ID:", aselectedId);
    }
    // Get the range slider instance and its current values
    const sliderInstance = $(".js-range-slider").data("ionRangeSlider");
    const minPrice = sliderInstance.result.from;
    const maxPrice = sliderInstance.result.to;

    // Filter flights based on airlines, fares, price, and selected time ID

    if(res.Custom === 'YES'){

        const filtered = arr.filter(flight => {
            const flightNumberMatch = flightNumberValue ? flight[flightKey].includes(flightNumberValue) : true; // Match flight number using "like"
            const airlineMatch = checkedAirlines.length === 0 || checkedAirlines.includes(flight.AirlineName);
            const airlineStops = checkedStops.length === 0 || checkedStops.includes(flight.Stops);
            const fareMatch = checkedFares.length === 0 || flight.Segments.some(segment => checkedFares.includes(segment.fare));
            const priceMatch = flight.Segments.some(segment => {
                const publishedFare = segment.FareBreakup.PublishedFare;
                return publishedFare >= minPrice && publishedFare <= maxPrice;
            });

            // Check if flight's time ID matches the selected chip ID
            const timeMatch = selectedId ? flight.Origin.Time === selectedId : true;
            const atimeMatch = aselectedId ? flight.Destination.Time === aselectedId : true;

            return airlineMatch && fareMatch && priceMatch && timeMatch && atimeMatch && airlineStops && flightNumberMatch ;

        });
        filteredFlightsReturn = filtered;

    } else {
        const filtered = arr.filter(flight => {
            const flightNumberMatch = flightNumberValue ? flight.flight.returnFlight[flightKey]?.includes(flightNumberValue) : true;
            // console.log("flightNumberMatch:", flightNumberMatch);

            const airlineMatch = checkedAirlines.length === 0 || checkedAirlines.includes(flight.flight.returnFlight.AirlineName);
            // console.log("airlineMatch:", airlineMatch, "Airline:", flight.flight.returnFlight.AirlineName);

            const airlineStops = checkedStops.length === 0 || checkedStops.includes(flight.flight.returnFlight.Stops);
            // console.log("airlineStops:", airlineStops, "Stops:", flight.flight.returnFlight.Stops);

            const fareMatch = checkedFares.length === 0 || flight.flight.returnFlight.Segments?.some(segment => {
                const isFareMatch = checkedFares.includes(segment.fare);
                // console.log("fareMatch:", isFareMatch, "Fare:", segment.fare);
                return isFareMatch;
            });
            // console.log("fareMatch Result:", fareMatch);

            const priceMatch = flight.flight.returnFlight.Segments.some(segment => {
                const publishedFare = segment.FareBreakup?.PublishedFare;
                return (publishedFare === 0 || (publishedFare >= minPrice && publishedFare <= maxPrice));
            });

            // console.log("priceMatch Result:", priceMatch);

            const timeMatch = selectedId ? flight.flight.returnFlight.Origin.Time === selectedId : true;
            // console.log("timeMatch:", timeMatch, "Origin Time:", flight.flight.returnFlight.Origin.Time, "Selected ID:", selectedId);

            const atimeMatch = aselectedId ? flight.flight.returnFlight.Destination.Time === aselectedId : true;
            // console.log("atimeMatch:", atimeMatch, "Destination Time:", flight.flight.returnFlight.Destination.Time, "Selected ID:", aselectedId);

            const shouldInclude = airlineMatch && fareMatch && priceMatch && timeMatch && atimeMatch && airlineStops && flightNumberMatch;
            // console.log("Should Include Flight:", shouldInclude, "Flight:", flight);

            return shouldInclude;
        });
        filteredFlights = filtered
    }


    renderResults.innerHTML = ''; // Clear previous results


    if(res.Custom === 'YES'){
        if (filteredFlightsReturn.length > 0) {
            // Efficient DOM manipulation using Document Fragment
            const fragment = document.createDocumentFragment();
            filteredFlightsReturn.forEach((flight, index) => {
                const flightCard = new FlightRoundCards(flight, index);
                const cardElement = document.createElement('div');
                cardElement.innerHTML = flightCard.renderReturn();
                fragment.appendChild(cardElement); // Append each card to the fragment
            });

            renderResults.appendChild(fragment); // Append the entire fragment to the DOM in one go
        } else {
            // If no matches found, render a message
            renderResults.innerHTML = '<div class="no-results">No flights found matching your criteria.</div>';
        }
    }else {
        if (filteredFlights.length > 0) {
            // Efficient DOM manipulation using Document Fragment
            const fragment = document.createDocumentFragment();
            filteredFlights.forEach((flight, index) => {
                flight=flight.flight
                //console.log("fff",flight)
                const flightCard = new FlightFixedCards(flight, index);
                const cardElement = document.createElement('div');
                cardElement.innerHTML = flightCard.render();
                fragment.appendChild(cardElement); // Append each card to the fragment
            });

            renderResults.appendChild(fragment); // Append the entire fragment to the DOM in one go
        } else {
            // If no matches found, render a message
            renderResults.innerHTML = '<div class="no-results">No flights found matching your criteria.</div>';
        }
    }

}


async function Book() {
    // Check if both departure and return flights are selected
    if (flightSelection.departureFlight && flightSelection.returnFlight) {
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

        try {
            const obj = {
                Custom: 'Yes',
                onwardFlight: flightSelection.departureFlight,
                returnFlight: flightSelection.returnFlight
            };

            let fd = new FormData();
            fd.append("agentEmail", localStorage.getItem("agentEmail"));
            fd.append("returnId", null);
            fd.append("book", JSON.stringify(obj));
            fd.append("returnBook", null);
            fd.append("markup", 0);
            fd.append("platformFee", 0);
            fd.append("platformTax", 0);

            sessionStorage.setItem("selectedFlight", JSON.stringify(obj));

            // Simulating any async tasks (like server API calls)
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Stop the loader after the task is complete
            Swal.close();

            // Redirect to the booking page
            window.location.href = '/flights/returnFixedBook';
        } catch (error) {
            console.error("Error during booking:", error);
            Swal.close(); // Ensure the loader is stopped in case of errors
            toastMixin.fire({
                animation: true,
                icon: 'error',
                title: 'An error occurred. Please try again.'
            });
        }
    } else {
        toastMixin.fire({
            animation: true,
            icon: 'warning',
            title: 'Please Select Both Journeys Flights.'
        });
    }
}


class TRIPJACKFareBreakupCard {

    constructor(fare,adults,childs,infants)
    {
        this.fare = fare;
        this.adults = adults;
        this.childs = childs;
        this.infants = infants;
    }



    render()
    {

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

        // for departure
        let totalPublishedFare1 =  0;
        let totalOfferedFare1 = 0;

        if (this.fare.tripInfos[0].totalPriceList[0].fd) {
            if ("ADULT" in this.fare.tripInfos[0].totalPriceList[0].fd) {
                totalPublishedFare1 += parseFloat(this.fare.tripInfos[0].totalPriceList[0].fd.ADULT.fC.TF) * parseInt(this.adults)
                totalOfferedFare1 += parseFloat(this.fare.tripInfos[0].totalPriceList[0].fd.ADULT.fC.NF) * parseInt(this.adults)
            }
            if ("CHILD" in this.fare.tripInfos[0].totalPriceList[0].fd) {
                totalPublishedFare1 += parseFloat(this.fare.tripInfos[0].totalPriceList[0].fd.CHILD.fC.TF) * parseInt(this.childs)
                totalOfferedFare1 += parseFloat(this.fare.tripInfos[0].totalPriceList[0].fd.CHILD.fC.NF) * parseInt(this.childs)
            }
            if ("INFANT" in this.fare.tripInfos[0].totalPriceList[0].fd) {
                totalPublishedFare1 += parseFloat(this.fare.tripInfos[0].totalPriceList[0].fd.INFANT.fC.TF) * parseInt(this.infants);
                totalOfferedFare1 += parseFloat(this.fare.tripInfos[0].totalPriceList[0].fd.INFANT.fC.NF) * parseInt(this.infants);
            }
        }

        // for return

        let totalPublishedFare2 =  0
        let totalOfferedFare2 = 0;

        if (this.fare.tripInfos[1].totalPriceList[0].fd) {
            if ("ADULT" in this.fare.tripInfos[1].totalPriceList[0].fd) {
                totalPublishedFare2 += parseFloat(this.fare.tripInfos[1].totalPriceList[0].fd.ADULT.fC.TF) * parseInt(this.adults)
                totalOfferedFare2 += parseFloat(this.fare.tripInfos[1].totalPriceList[0].fd.ADULT.fC.NF) * parseInt(this.adults)
            }
            if ("CHILD" in this.fare.tripInfos[1].totalPriceList[0].fd) {
                totalPublishedFare2 += parseFloat(this.fare.tripInfos[1].totalPriceList[0].fd.CHILD.fC.TF) * parseInt(this.childs)
                totalOfferedFare2 += parseFloat(this.fare.tripInfos[1].totalPriceList[0].fd.CHILD.fC.NF) * parseInt(this.childs)
            }
            if ("INFANT" in this.fare.tripInfos[1].totalPriceList[0].fd) {
                totalPublishedFare2 += parseFloat(this.fare.tripInfos[1].totalPriceList[0].fd.INFANT.fC.TF) * parseInt(this.infants);
                totalOfferedFare2 += parseFloat(this.fare.tripInfos[1].totalPriceList[0].fd.INFANT.fC.NF) * parseInt(this.infants);
            }
        }


        // console.log(totalPublishedFare1)
        let totalPax = parseInt(arr.departureFlight.adults) + parseInt(arr.departureFlight.childs);


        // departure calculations


        let markup_by_agent_d  = (parseFloat(arr.departureFlight.Segments[0].FareBreakup.MARKUP_ADDED_BY_AGENT)).toFixed(2);

        const fareDifference_d = parseFloat((parseFloat(totalPublishedFare1 || 0) - parseFloat(totalOfferedFare1 || 0)).toFixed(2));

        let markup_type_d = (fareDifference_d > 0) ? 'PLB' : 'Non PLB';

        let markup_value_d = (parseFloat(arr.departureFlight.Segments[0].FareBreakup.TDO_MARKUP_PLB)).toFixed(2), markup_percentage_d = arr.departureFlight.Segments[0].FareBreakup.TDO_MARKUP_PERCENTAGE

        let totalMarkup_d = (markup_type_d === 'PLB') ? ((fareDifference_d * parseFloat(markup_percentage_d) / 100)).toFixed(2) : (parseFloat(markup_value_d) + (parseFloat(totalPublishedFare1) * markup_percentage_d/ 100)).toFixed(2)


        let totalPublishFare_d = (markup_type_d === 'PLB') ? parseFloat(totalPublishedFare1) : (parseFloat(totalPublishedFare1) + parseFloat(totalMarkup_d)).toFixed(2)

        let totalNetFare_d = (markup_type_d === 'PLB') ? parseFloat(totalOfferedFare1) + parseFloat(totalMarkup_d) : parseFloat(totalOfferedFare1) + parseFloat(totalMarkup_d)

        let commission_d = (fareDifference_d > 0) ? (fareDifference_d - totalMarkup_d).toFixed(2) : 0;

        let netPrice_d = (markup_type_d === 'PLB') ? ((parseFloat(totalPublishedFare1) + parseFloat(totalMarkup_d)) - fareDifference_d).toFixed(2) : (parseFloat(totalPublishedFare1) + parseFloat(totalMarkup_d) - fareDifference_d).toFixed(2);

        let tds_d  = (commission_d > 0) ? parseFloat((commission_d * 0.05).toFixed(2)) : 0


        let totalOtherTaxes_d = (markup_type_d === 'PLB') ? (
                (
                    parseFloat(markup_by_agent_d)) / totalPax
            ).toFixed(2) :
            ((
                    parseFloat(totalMarkup_d) +
                    parseFloat(markup_by_agent_d)) / totalPax
            ).toFixed(2);



        // for return



        let markup_by_agent_r  = (parseFloat(arr.returnFlight.Segments[0].FareBreakup.MARKUP_ADDED_BY_AGENT_RETURN)).toFixed(2);

        const fareDifference_r = parseFloat((parseFloat(totalPublishedFare2 || 0) - parseFloat(totalOfferedFare2 || 0)).toFixed(2));

        let markup_type_r = (fareDifference_r > 0) ? 'PLB' : 'Non PLB';

        let markup_value_r = (parseFloat(arr.returnFlight.Segments[0].FareBreakup.TDO_MARKUP_PLB_RETURN)).toFixed(2), markup_percentage_r = arr.returnFlight.Segments[0].FareBreakup.TDO_MARKUP_PERCENTAGE_RETURN

        let totalMarkup_r = (markup_type_r === 'PLB') ? ((fareDifference_r * parseFloat(markup_percentage_r) / 100)).toFixed(2) : (parseFloat(markup_value_r) + (parseFloat(totalPublishedFare2) * markup_percentage_r/ 100)).toFixed(2)


        let totalPublishFare_r = (markup_type_r === 'PLB') ? parseFloat(totalPublishedFare2) : (parseFloat(totalPublishedFare2) + parseFloat(totalMarkup_r)).toFixed(2)

        let totalNetFare_r = (markup_type_r === 'PLB') ? parseFloat(totalOfferedFare2) + parseFloat(totalMarkup_r) : parseFloat(totalOfferedFare2) + parseFloat(totalMarkup_r)

        let commission_r = (fareDifference_r > 0) ? (fareDifference_r - totalMarkup_r).toFixed(2) : 0;

        let netPrice_r = (markup_type_r === 'PLB') ? ((parseFloat(totalPublishedFare2) + parseFloat(totalMarkup_r)) - fareDifference_r).toFixed(2) : (parseFloat(totalPublishedFare2) + parseFloat(totalMarkup_r) - fareDifference_r).toFixed(2);

        let tds_r  = (commission_r > 0) ? parseFloat((commission_r * 0.05).toFixed(2)) : 0


        let totalOtherTaxes_r = (markup_type_r === 'PLB') ? (
                (
                    parseFloat(markup_by_agent_r)) / totalPax
            ).toFixed(2) :
            ((
                    parseFloat(totalMarkup_r) +
                    parseFloat(markup_by_agent_r)) / totalPax
            ).toFixed(2);

        // total
        let markup_by_agent  = (parseFloat(markup_by_agent_d) + parseFloat(markup_by_agent_r)).toFixed(2);

        const fareDifference = parseFloat((parseFloat(fareDifference_d) + parseFloat(fareDifference_r)).toFixed(2));


        let markup_value = (parseFloat(markup_by_agent_d) + parseFloat(markup_by_agent_r)).toFixed(2), markup_percentage = (parseFloat(markup_percentage_d) + parseFloat(markup_percentage_r)).toFixed(2)

        // console.log("markup"+markup_percentage)

        let totalMarkup = (parseFloat(totalMarkup_d) + parseFloat(totalMarkup_r)).toFixed(2)
        // console.log(totalMarkup);
        let totalPublishFare = (parseFloat(totalPublishFare_d) + parseFloat(totalPublishFare_r)).toFixed(2)

        // console.log(totalPublishFare);
        let totalNetFare = (parseFloat(totalNetFare_d) + parseFloat(totalNetFare_r)).toFixed(2)

        let commission = (parseFloat(commission_d) + parseFloat(commission_r)).toFixed(2)
        let netPrice = (parseFloat(netPrice_d) + parseFloat(netPrice_r)).toFixed(2)
        let tds  = (parseFloat(tds_d) + parseFloat(tds_r)).toFixed(2)

        let totalOtherTaxes = (parseFloat(totalOtherTaxes_d) + parseFloat(totalOtherTaxes_r)).toFixed(2)

        this.fare.tripInfos.forEach((flight, innerIndex) => {
            if (flight.totalPriceList[0].fd) {
                if ("ADULT" in flight.totalPriceList[0].fd) {
                    adultFare += flight.totalPriceList[0].fd.ADULT.fC.TF
                    adultTotaltax += flight.totalPriceList[0].fd.ADULT.fC.TAF
                    adultBaseFare += flight.totalPriceList[0].fd.ADULT.fC.BF

                    const afCTaxes = flight.totalPriceList[0].fd.ADULT.afC.TAF;

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
                    childFare += flight.totalPriceList[0].fd.CHILD.fC.TF
                    childTotalTax +=flight.totalPriceList[0].fd.CHILD.fC.TAF;
                    childBasefare += flight.totalPriceList[0].fd.CHILD.fC.BF;

                    const afCTaxes = flight.totalPriceList[0].fd.CHILD.afC.TAF;

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
                    infantFare += flight.totalPriceList[0].fd.INFANT.fC.TF
                    infantTotalTax += flight.totalPriceList[0].fd.INFANT.fC.TAF
                    infantBaseFare += flight.totalPriceList[0].fd.INFANT.fC.BF;

                    const afCTaxes = flight.totalPriceList[0].fd.INFANT.afC.TAF;

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

        totalAmount =  (adultFare * parseFloat(this.adults)) + infantFare * parseFloat(this.infants) + (childFare * parseFloat(this.childs));

        let calculatedTax = (platformFee * (platformTax/100)).toFixed(2);

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
                                                        class="fw-500">Platform Fee</span><span class="fw-600">AED A${platformFee}</span></div>
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
                                                    <div id="timer"><span class="me-1">00</span><span>:</span><span
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

class PassengerForm
{
    constructor(type, index, passportAtHold, passportAtTicket)
    {
        this.type = type;
        this.index = index;
        this.passportAtHold = passportAtHold;
        this.passportAtTicket = passportAtTicket;
    }

    render()
    {
        let title = '';

        if(this.type === 'Adult')
        {
            title = `  <select  class="traveller-input false" name="${this.type}_title${this.index}" id="${this.type}_title${this.index}" required style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;">
              <option value="MR">Mr</option>
              <option value="MS">Ms</option>
              <option value="MRS">Mrs</option>
              <option value="MSTR">Master</option>
          </select>`;
        }
        if(this.type === 'Child')
        {
            title = `  <select  class="traveller-input false" name="${this.type}_title${this.index}" id="${this.type}_title${this.index}" required style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;">
                  <option value="MSTR">Mstr</option>
                  <option value="MS">Ms</option>
              </select>`;
        }
        if(this.type === 'Infant')
        {
            title = `  <select  class="traveller-input false" name="${this.type}_title${this.index}" id="${this.type}_title${this.index}" required style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;">
                  <option value="MS">Ms</option>
                      <option value="MSTR">Mstr</option>
                  </select>`;
        }


        let passportDetails = ``;

        if(this.passportAtHold === true && this.passportAtTicket === true)
        {
            passportDetails+=`<div class="col-lg-3 col-md-3 col-sm-3 col-12">
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
        else if(this.passportAtHold === true)
        {
            passportDetails+=`<div class="col-lg-3 col-md-3 col-sm-3 col-12">
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
        else if(this.passportAtTicket === true)
        {
            passportDetails+=`<div class="col-lg-3 col-md-3 col-sm-3 col-12">
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

class PassengerForm1
{
    constructor(type, index, passportAtHold, passportAtTicket)
    {
        this.type = type;
        this.index = index;
        this.passportAtHold = passportAtHold;
        this.passportAtTicket = passportAtTicket;
    }

    render()
    {
        let title = '';

        if(this.type === 'Adult')
        {
            title = `  <select  class="traveller-input false" name="${this.type}_title${this.index}" id="${this.type}_title${this.index}" required style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;">
              <option value="Mr">Mr</option>
              <option value="Ms">Ms</option>
              <option value="MRS">Mrs</option>
          </select>`;
        }
        if(this.type === 'Child')
        {
            title = `  <select  class="traveller-input false" name="${this.type}_title${this.index}" id="${this.type}_title${this.index}" required style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;">
                  <option value="Master">Master</option>
                  <option value="Ms">Ms</option>
              </select>`;
        }
        if(this.type === 'Infant')
        {
            title = `  <select  class="traveller-input false" name="${this.type}_title${this.index}" id="${this.type}_title${this.index}" required style="height: 42px; border: 0.0625rem solid rgb(221, 221, 221); padding: 12px; border-radius: 6px; width: 100%;">
                  <option value="Ms">Ms</option>
                      <option value="Master">Master</option>
                  </select>`;
        }


        let passportDetails = ``;

        if(this.passportAtHold === true && this.passportAtTicket === true)
        {
            passportDetails+=`<div class="col-lg-3 col-md-3 col-sm-3 col-12">
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
        else if(this.passportAtHold === true)
        {
            passportDetails+=`<div class="col-lg-3 col-md-3 col-sm-3 col-12">
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
        else if(this.passportAtTicket === true)
        {
            passportDetails+=`<div class="col-lg-3 col-md-3 col-sm-3 col-12">
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

class makePassengerArray
{

    constructor(passengerType, fareBreakdown, index, paxType, airlineCode, flightNumber, passportAtBook, passportAtTicket, type, gst, tripIndex)
    {
        this.passengerType = passengerType;
        this.fareBreakdown = fareBreakdown;
        this.index = index;
        this.paxType = paxType;
        this.airlineCode = airlineCode;
        this.flightNumber = flightNumber;
        this.passportAtBook  = passportAtBook;
        this.passportAtTicket = passportAtTicket;
        this.type = type;
        this.gst = gst;
        this.tripIndex = tripIndex;
    }

    renderTBO()
    {

        let meal  = [];
        let bag = [];

        let mealkey = ssrResponse?.response?.[this.tripIndex]?.MealDynamic ? 'MealDynamic' : ssrResponse?.response?.[this.tripIndex]?.Meal ? 'Meal' : 'Meal'



        if(mealArray.length > 0)
        {
            let mealObj = mealArray.filter(meal => meal.id === `${this.passengerType}_first_name${this.index}` && meal.trip === this.tripIndex);

            if(mealObj.length === 0)
            {
                meal = null;
            }
            else
            {
                if(mealkey === 'Meal')
                {
                    mealObj.forEach(myMeal => {
                        meal = myMeal.mealObject;
                    })
                }
                else
                {
                    mealObj.forEach(myMeal => {
                        meal.push(myMeal.mealObject);
                    })
                }

            }
        }
        else
        {
            meal = null;
        }


        if(baggageArray.length > 0)
        {
            let bagObj = baggageArray.filter(meal => meal.id === `${this.passengerType}_first_name${this.index}` && meal.trip === this.tripIndex);

            if(bagObj.length === 0)
            {
                bag = null;
            }
            else
            {
                bagObj.forEach(myBag => {
                    bag.push(myBag.baggageObject);
                })

            }
        }
        else
        {
            bag = null;
        }



        let flight = this.fareBreakdown;

        let paxBaseFare = 0;
        let paxTax  = 0;

        flight.FareBreakdown.forEach((fare) => {
            if (fare.PassengerType === this.paxType) {
                paxBaseFare = fare.BaseFare;
                paxTax = fare.Tax;

            }

        });

        let YQTax = flight.Fare.YQTax;
        let AdditionalTxnFeeOfrd = flight.Fare.AdditionalTxnFeeOfrd;
        let AdditionalTxnFeePub = flight.Fare.AdditionalTxnFeePub;
        let OtherCharges = flight.Fare.OtherCharges;

        let obj = {
            "Title": document.getElementById(`${this.passengerType}_title${this.index}`).value,
            "FirstName": document.getElementById(`${this.passengerType}_first_name${this.index}`).value,
            "LastName": document.getElementById(`${this.passengerType}_last_name${this.index}`).value,
            "PaxType": this.paxType,
            "Gender": 1,
            "DateOfBirth": `${document.getElementById(`${this.passengerType}_dob${this.index}`).value}T00:00:00`,
            "AddressLine1": "TDO Address",
            "Fare": {
                "BaseFare": paxBaseFare,
                "Tax": paxTax,
                "YQTax": YQTax,
                "AdditionalTxnFeePub": AdditionalTxnFeePub,
                "AdditionalTxnFeeOfrd": AdditionalTxnFeeOfrd,
                "OtherCharges": OtherCharges
            },
            "City": "Amritsar",
            "ContactNo": document.getElementById(`mobile`).value,
            "Email": document.getElementById(`leademail`).value,
            "IsLeadPax": true,
            "FFAirlineCode": `${this.airlineCode}`,
            "FFNumber": `${this.flightNumber}`,
            [mealkey] : meal,
            "Baggage" : bag
        }

        let passport = {};


        if(this.passportAtBook === true && this.type === "HOLD")
        {
            passport = {
                "CountryCode": document.getElementById(`${this.passengerType}_passport_place${this.index}`).value,
                "CellCountryCode": "+91",
                "PassportNo": document.getElementById(`${this.passengerType}_passport_number${this.index}`).value,
                "PassportExpiry": `${document.getElementById(`${this.passengerType}_passport_expiry${this.index}`).value}T00:00:00`,
                "PassportIssueDate": `${document.getElementById(`${this.passengerType}_passport_issue${this.index}`).value}T00:00:00`,
                "PassportIssueCountryCode": document.getElementById(`${this.passengerType}_passport_place${this.index}`).value,
            }

            obj = {...obj , ...passport}

        }

        if(this.passportAtTicket === true && this.type === "TICKET")
        {
            passport = {
                "CountryCode": document.getElementById(`${this.passengerType}_passport_place${this.index}`).value,
                "CellCountryCode": "+91",
                "PassportNo": document.getElementById(`${this.passengerType}_passport_number${this.index}`).value,
                "PassportExpiry": `${document.getElementById(`${this.passengerType}_passport_expiry${this.index}`).value}T00:00:00`,
                "PassportIssueDate": `${document.getElementById(`${this.passengerType}_passport_issue${this.index}`).value}T00:00:00`,
                "PassportIssueCountryCode": document.getElementById(`${this.passengerType}_passport_place${this.index}`).value,
            }
            obj = {...obj , ...passport}

        }

        if(this.gst !== "NOT NEEDED")
        {
            obj = {
                ...obj, // Spread the existing properties of obj
                "GSTNumber": this.gst.gstNumber,
                "GSTCompanyName": this.gst.companyName,
                "GSTCompanyEmail": this.gst.companyEmail,
                "GSTCompanyContactNumber": this.gst.gstPhone,
                "GSTCompanyAddress": this.gst.gstAddress
            };
        }


        return  obj;
    }

    renderTRIPJACK()
    {


        let meal  = [];
        let bag = [];

        if(mealArray.length > 0)
        {
            let mealObj = mealArray.filter(meal => meal.id === `${this.passengerType}_first_name${this.index}`);

            if(mealObj.length === 0)
            {
                meal = null;
            }
            else
            {
                mealObj.forEach(myMeal => {
                    let obj = {
                        "key" : myMeal.segmentId,
                        "code" : myMeal.code
                    }
                    meal.push(obj);
                })

            }
        }
        else
        {
            meal = null;
        }


        if(baggageArray.length > 0)
        {
            let bagObj = baggageArray.filter(meal => meal.id === `${this.passengerType}_first_name${this.index}`);

            if(bagObj.length === 0)
            {
                bag = null;
            }
            else
            {
                bagObj.forEach(myBag => {
                    let obj = {
                        "key" : myBag.segmentId,
                        "code" : myBag.code
                    }
                    bag.push(obj);
                })

            }
        }
        else
        {
            bag = null;
        }


        let flight = this.fareBreakdown;




        let paxBaseFare = 0;
        let paxTax  = 0;


        let obj = {
            "ti": document.getElementById(`${this.passengerType}_title${this.index}`).value,
            "fN": document.getElementById(`${this.passengerType}_first_name${this.index}`).value,
            "lN": document.getElementById(`${this.passengerType}_last_name${this.index}`).value,
            "pt": `${this.passengerType.toUpperCase()}`,
            "dob": `${document.getElementById(`${this.passengerType}_dob${this.index}`).value}`,
            "ssrMealInfos": meal,
            "ssrBaggageInfos": bag
        }

        let passport = {};

        if(this.passportAtBook === true && this.type === "HOLD")
        {
            passport = {
                "pNum": document.getElementById(`${this.passengerType}_passport_number${this.index}`).value,
                "eD": `${document.getElementById(`${this.passengerType}_passport_expiry${this.index}`).value}`,
                "pNat": document.getElementById(`${this.passengerType}_passport_place${this.index}`).value,
                "pid": `${document.getElementById(`${this.passengerType}_passport_issue${this.index}`).value}`
            }

            obj = {...obj , ...passport}
        }

        if(this.passportAtTicket === true && this.type === "TICKET")
        {
            passport = {
                "pNum": document.getElementById(`${this.passengerType}_passport_number${this.index}`).value,
                "eD": `${document.getElementById(`${this.passengerType}_passport_expiry${this.index}`).value}`,
                "pNat": document.getElementById(`${this.passengerType}_passport_place${this.index}`).value,
                "pid": `${document.getElementById(`${this.passengerType}_passport_issue${this.index}`).value}`
            }
            obj = {...obj , ...passport}

        }

        return  obj;
    }

}

class mealSectors
{
    constructor(sector, index, trip)
    {
        this.sector  = sector;
        this.index = index;
        this.trip = trip;
    }
    renderMealSectors()
    {
        let active = '';

        active = (this.index === 0 && this.trip === 0) ? 'meal-sector active-meal-sector' : 'meal-sector';

        return `<div class="${active}" id="${this.sector.Origin}-${this.sector.Destination}">${this.sector.Origin} - ${this.sector.Destination}</div>`;
    }
}

class baggageSectors
{
    constructor(sector, index, trip)
    {
        this.sector  = sector;
        this.index = index;
        this.trip = trip;
    }
    renderBaggageSectors()
    {
        let active = '';

        active = (this.index === 0 && this.trip === 0) ? 'baggage-sector active-baggage-sector' : 'baggage-sector';

        return `<div class="${active}" id="${this.sector.Origin}-${this.sector.Destination}">${this.sector.Origin} - ${this.sector.Destination}</div>`;
    }
}

class mealOptions
{
    constructor(meal, index, traveller, origin, destination, segmentIndex, trip)
    {

        this.meal = meal;
        this.index = index;
        this.traveller = traveller;
        this.origin = origin;
        this.destination = destination;
        this.segmentIndex = segmentIndex;
        this.trip = trip;
    }

    renderMealDynamicOptions()
    {

        let price = this.meal?.Price || this.meal?.amount || 0;
        let button = '';

        let traveller =    mealArray.findIndex(meal => meal.id === this.traveller && meal.index === this.index && meal.origin === this.origin && meal.destination === this.destination);

        if(traveller !== -1) {
            button = `<button type="button"
                           class="app-btn app-btn-primary app-btn-medium ssr-card__add-btn" onclick="removeMeal(${traveller}, ${this.index}, ${this.segmentIndex},'${this.traveller}')"
                           style="padding: 0.5rem; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 10px; font-weight: 600;">
              Remove
          </button>`;
        }
        else
        {
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
                    <p class="ssr-card__meal-name">AED ${this.meal?.Price || this.meal?.amount || 0}</p>
                  ${button}
                </div>
            </div>
        </div>
    </div>
</div>

        `;
    }

    renderMealOptions()
    {

        let price = this.meal?.Price || 0;
        let button = '';

        let traveller =    mealArray.findIndex(meal => meal.id === this.traveller && meal.index === this.index && meal.origin === this.origin && meal.destination === this.destination);

        if(traveller !== -1) {
            button = `<button type="button"
                           class="app-btn app-btn-primary app-btn-medium ssr-card__add-btn" onclick="removeMeal(${traveller}, ${this.index}, ${this.segmentIndex},'${this.traveller}',${this.trip})"
                           style="padding: 0.5rem; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 10px; font-weight: 600;">
              Remove
          </button>`;
        }
        else
        {
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
                    <p class="ssr-card__meal-name">AED ${this.meal?.Price || 0}</p>
                  ${button}
                </div>
            </div>
        </div>
    </div>
</div>

        `;
    }
}

class baggageOptions
{
    constructor(baggage, index, traveller, origin, destination, segmentIndex, trip)
    {

        this.baggage = baggage;
        this.index = index;
        this.traveller = traveller;
        this.origin = origin;
        this.destination = destination;
        this.segmentIndex = segmentIndex;
        this.trip = trip;
    }

    renderBaggageOptions()
    {
        if(this.segmentIndex === 0)
        {

            let price = this.baggage?.Price || this.baggage?.amount || 0;
            let button = '';

            let traveller =    baggageArray.findIndex(meal => meal.id === this.traveller && meal.index === this.index && meal.origin === this.origin && meal.destination === this.destination);

            if(traveller !== -1) {
                button = `<button type="button"
                           class="app-btn app-btn-primary app-btn-medium ssr-card__add-btn" onclick="removeBaggage(${traveller}, ${this.index}, ${this.segmentIndex},'${this.traveller}',${this.trip})"
                           style="padding: 0.5rem; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 10px; font-weight: 600;">
              Remove
          </button>`;
            }
            else
            {
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
                    <p class="ssr-card__meal-name">AED ${this.baggage?.Price || this.baggage?.amount || 0}</p>
                  ${button}
                </div>
            </div>
        </div>
    </div>
</div>

        `;
        }
        else
        {
            let amount = this.baggage?.amount || 0
            if(amount === 0)
            {

                let price = this.baggage?.Price || this.baggage?.amount || 0;
                let button = '';

                let traveller =    baggageArray.findIndex(meal => meal.id === this.traveller && meal.index === this.index && meal.origin === this.origin && meal.destination === this.destination);

                if(traveller !== -1) {
                    button = `<button type="button"
                           class="app-btn app-btn-primary app-btn-medium ssr-card__add-btn" onclick="removeBaggage(${traveller}, ${this.index}, ${this.segmentIndex},'${this.traveller}')"
                           style="padding: 0.5rem; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 10px; font-weight: 600;">
              Remove
          </button>`;
                }
                else
                {
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
            }
            else
            {

                let price = this.baggage?.Price || this.baggage?.amount || 0;
                let button = '';

                let traveller =    baggageArray.findIndex(meal => meal.id === this.traveller && meal.index === this.index && meal.origin === this.origin && meal.destination === this.destination);

                if(traveller !== -1) {
                    button = `<button type="button"
                           class="app-btn app-btn-primary app-btn-medium ssr-card__add-btn" onclick="removeBaggage(${traveller}, ${this.index}, ${this.segmentIndex},'${this.traveller}')"
                           style="padding: 0.5rem; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 10px; font-weight: 600;">
              Remove
          </button>`;
                }
                else
                {
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
                    <p class="ssr-card__meal-name">AED ${this.baggage?.Price || this.baggage?.amount || 0}</p>
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

class mealPassengers
{
    constructor(pax, index)
    {
        this.pax = pax;
        this.index = index;
    }

    renderMealPassengers()
    {
        let active = '';

        active = (this.pax === "Adult" && this.index === 1) ? 'traveller-name active-traveller' : 'traveller-name';

        return `
    <div class="${active}" id="${this.pax}_first_name${this.index}">${document.getElementById(`${this.pax}_first_name${this.index}`).value}
    <div class="text-center m-2 separator" id="${this.pax}_first_name${this.index}separator">AED 0</div>
    </div>
    
`;

    }
}

class baggagePassengers
{
    constructor(pax, index)
    {
        this.pax = pax;
        this.index = index;
    }

    renderBaggagePassengers()
    {
        let active = '';

        active = (this.pax === "Adult" && this.index === 1) ? 'baggage-traveller-name active-traveller' : 'baggage-traveller-name';

        return `
    <div class="${active}" id="${this.pax}_first_name${this.index}">${document.getElementById(`${this.pax}_first_name${this.index}`).value}
    <div class="text-center m-2 separator" id="${this.pax}_first_name${this.index}baggage">AED 0</div>
    </div>
`;

    }
}


class TBOFareBreakupCard {

    constructor(fare,index)
    {
        this.fare = fare;
        this.index = index;
    }



    render()
    {

        let totalFare = 0;

        let adultFare = 0;
        let adultCount = ``;
        let childCount = ``;
        let infantCount = ``;
        let childFare = 0;
        let infantFare = 0;
        let osTax = 0;
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

        // for departure
        let totalPublishedFare1 =  parseFloat(this.fare[0].Results.Fare.PublishedFare || 0);
        let totalOfferedFare1 = parseFloat(this.fare[0].Results.Fare.OfferedFare || 0);
        let totalServiceFee =  parseFloat(this.fare[0].Results.Fare.ServiceFee || 0);
        let totalOtherCharges = parseFloat(this.fare[0].Results.Fare.OtherCharges || 0);
        let totalTransactionFee = parseFloat(this.fare[0].Results.Fare.TransactionFee || 0);

        // for return

        let totalPublishedFare2 =  parseFloat(this.fare[1].Results.Fare.PublishedFare || 0);
        let totalOfferedFare2 = parseFloat(this.fare[1].Results.Fare.OfferedFare || 0);
        let totalServiceFee1 =  parseFloat(this.fare[1].Results.Fare.ServiceFee || 0);
        let totalOtherCharges1 = parseFloat(this.fare[1].Results.Fare.OtherCharges || 0);
        let totalTransactionFee1 = parseFloat(this.fare[1].Results.Fare.TransactionFee || 0);



        // console.log(totalPublishedFare1)
        let totalPax = parseInt(arr.departureFlight.adults) + parseInt(arr.departureFlight.childs);


        // departure calculations


        let markup_by_agent_d  = (parseFloat(arr.departureFlight.Segments[0].FareBreakup.MARKUP_ADDED_BY_AGENT)).toFixed(2);

        const fareDifference_d = parseFloat((parseFloat(totalPublishedFare1 || 0) - parseFloat(totalOfferedFare1 || 0)).toFixed(2));

        let markup_type_d = (fareDifference_d > 0) ? 'PLB' : 'Non PLB';

        let markup_value_d = (parseFloat(arr.departureFlight.Segments[0].FareBreakup.TDO_MARKUP_PLB)).toFixed(2), markup_percentage_d = arr.departureFlight.Segments[0].FareBreakup.TDO_MARKUP_PERCENTAGE

        let totalMarkup_d = (markup_type_d === 'PLB') ? ((fareDifference_d * parseFloat(markup_percentage_d) / 100)).toFixed(2) : (parseFloat(markup_value_d) + (parseFloat(totalPublishedFare1) * markup_percentage_d/ 100)).toFixed(2)


        let totalPublishFare_d = (markup_type_d === 'PLB') ? parseFloat(totalPublishedFare1) : (parseFloat(totalPublishedFare1) + parseFloat(totalMarkup_d)).toFixed(2)

        let totalNetFare_d = (markup_type_d === 'PLB') ? parseFloat(totalOfferedFare1) + parseFloat(totalMarkup_d) : parseFloat(totalOfferedFare1) + parseFloat(totalMarkup_d)

        let commission_d = (fareDifference_d > 0) ? (fareDifference_d - totalMarkup_d).toFixed(2) : 0;

        let netPrice_d = (markup_type_d === 'PLB') ? ((parseFloat(totalPublishedFare1) + parseFloat(totalMarkup_d)) - fareDifference_d).toFixed(2) : (parseFloat(totalPublishedFare1) + parseFloat(totalMarkup_d) - fareDifference_d).toFixed(2);

        let tds_d  = (commission_d > 0) ? parseFloat((commission_d * 0.05).toFixed(2)) : 0


        let totalOtherTaxes_d = (markup_type_d === 'PLB') ? (
                (totalOtherCharges +
                    totalServiceFee +
                    parseFloat(markup_by_agent_d) +
                    (totalTransactionFee || 0)) / totalPax
            ).toFixed(2) :
            ((totalOtherCharges +
                    totalServiceFee +
                    parseFloat(totalMarkup_d) +
                    parseFloat(markup_by_agent_d) +
                    (totalTransactionFee || 0)) / totalPax
            ).toFixed(2);



        // for return



        let markup_by_agent_r  = (parseFloat(arr.returnFlight.Segments[0].FareBreakup.MARKUP_ADDED_BY_AGENT_RETURN)).toFixed(2);

        const fareDifference_r = parseFloat((parseFloat(totalPublishedFare2 || 0) - parseFloat(totalOfferedFare2 || 0)).toFixed(2));

        let markup_type_r = (fareDifference_r > 0) ? 'PLB' : 'Non PLB';

        let markup_value_r = (parseFloat(arr.returnFlight.Segments[0].FareBreakup.TDO_MARKUP_PLB_RETURN)).toFixed(2), markup_percentage_r = arr.returnFlight.Segments[0].FareBreakup.TDO_MARKUP_PERCENTAGE_RETURN

        let totalMarkup_r = (markup_type_r === 'PLB') ? ((fareDifference_r * parseFloat(markup_percentage_r) / 100)).toFixed(2) : (parseFloat(markup_value_r) + (parseFloat(totalPublishedFare2) * markup_percentage_r/ 100)).toFixed(2)


        let totalPublishFare_r = (markup_type_r === 'PLB') ? parseFloat(totalPublishedFare2) : (parseFloat(totalPublishedFare2) + parseFloat(totalMarkup_r)).toFixed(2)

        let totalNetFare_r = (markup_type_r === 'PLB') ? parseFloat(totalOfferedFare2) + parseFloat(totalMarkup_r) : parseFloat(totalOfferedFare2) + parseFloat(totalMarkup_r)

        let commission_r = (fareDifference_r > 0) ? (fareDifference_r - totalMarkup_r).toFixed(2) : 0;

        let netPrice_r = (markup_type_r === 'PLB') ? ((parseFloat(totalPublishedFare2) + parseFloat(totalMarkup_r)) - fareDifference_r).toFixed(2) : (parseFloat(totalPublishedFare2) + parseFloat(totalMarkup_r) - fareDifference_r).toFixed(2);

        let tds_r  = (commission_r > 0) ? parseFloat((commission_r * 0.05).toFixed(2)) : 0


        let totalOtherTaxes_r = (markup_type_r === 'PLB') ? (
                (totalOtherCharges1 +
                    totalServiceFee1 +
                    parseFloat(markup_by_agent_r) +
                    (totalTransactionFee1 || 0)) / totalPax
            ).toFixed(2) :
            ((totalOtherCharges1 +
                    totalServiceFee1 +
                    parseFloat(totalMarkup_r) +
                    parseFloat(markup_by_agent_r) +
                    (totalTransactionFee1 || 0)) / totalPax
            ).toFixed(2);

        // total
        let markup_by_agent  = (parseFloat(markup_by_agent_d) + parseFloat(markup_by_agent_r)).toFixed(2);

        const fareDifference = parseFloat((parseFloat(fareDifference_d) + parseFloat(fareDifference_r)).toFixed(2));


        let markup_value = (parseFloat(markup_by_agent_d) + parseFloat(markup_by_agent_r)).toFixed(2), markup_percentage = (parseFloat(markup_percentage_d) + parseFloat(markup_percentage_r)).toFixed(2)

        // console.log("markup"+markup_percentage)

        let totalMarkup = (parseFloat(totalMarkup_d) + parseFloat(totalMarkup_r)).toFixed(2)
        // console.log(totalMarkup);
        let totalPublishFare = (parseFloat(totalPublishFare_d) + parseFloat(totalPublishFare_r)).toFixed(2)

        // console.log(totalPublishFare);
        let totalNetFare = (parseFloat(totalNetFare_d) + parseFloat(totalNetFare_r)).toFixed(2)

        let commission = (parseFloat(commission_d) + parseFloat(commission_r)).toFixed(2)
        let netPrice = (parseFloat(netPrice_d) + parseFloat(netPrice_r)).toFixed(2)
        let tds  = (parseFloat(tds_d) + parseFloat(tds_r)).toFixed(2)

        let totalOtherTaxes = (parseFloat(totalOtherTaxes_d) + parseFloat(totalOtherTaxes_r)).toFixed(2)

        this.fare.forEach((flightt, innerIndex) => {

            let flight = flightt.Results;

            for (let i = 0; i < flight.FareBreakdown.length; i++) {
                if (flight?.FareBreakdown?.[i]?.PassengerType === 1) {

                    adultFare += parseFloat(flight.FareBreakdown[i].BaseFare) + parseFloat(flight.FareBreakdown[i].Tax)

                    adultBaseFare += parseFloat(flight.FareBreakdown[i].BaseFare);

                    adultTotaltax += parseFloat(flight.FareBreakdown[i].Tax)

                    flight?.FareBreakdown?.[i]?.TaxBreakUp?.forEach(tax => {
                        switch(tax.key) {
                            case 'K3':
                                adultk3Tax += tax.value;
                                break;
                            case 'YQTax':
                                adultyqTax += tax.value;
                                break;
                            case 'YR':
                                adultyrTax += tax.value;
                                break;
                            default:
                                if (tax.key !== 'TotalTax') {
                                    adultTaxesSum += tax.value;
                                }
                                break;
                        }
                    });

                    if (flight.FareBreakdown[i].Tax !== adultk3Tax + adultyqTax + adultyrTax + adultTaxesSum) {
                        adultTaxesSum += Math.abs(flight.FareBreakdown[i].Tax - (adultk3Tax + adultyqTax + adultyrTax + adultTaxesSum));
                    }


                    adultCard = `<div class="row spacing-0 px-2 py-1 d-flex flex-column gap-2">
                                            <div class="d-flex justify-content-between fw-600 mb-2">
                                                <span>Fare/Pax Type</span><span>Amount</span></div>
                                            <div class="d-flex justify-content-between"><span>Adult:</span><span
                                                        class="fw-500">${adultBaseFare/parseFloat(flight.FareBreakdown[i].PassengerCount)}</span></div>
                                            <div class="d-flex justify-content-between"><span>YQ Tax:</span><span
                                                        class="fw-500">${adultyqTax/parseFloat(flight.FareBreakdown[i].PassengerCount)}</span></div>
                                            <div class="d-flex justify-content-between"><span>OtherTaxes:</span><span
                                                        class="fw-500">${((adultTaxesSum/parseFloat(flight.FareBreakdown[i].PassengerCount)) + parseFloat(totalOtherTaxes)).toFixed(2)}</span></div>
                                            <div class="d-flex justify-content-between"><span>K3/AirlineGST:</span><span
                                                        class="fw-500">${adultk3Tax/parseFloat(flight.FareBreakdown[i].PassengerCount)}</span></div>
                                            <div class="d-flex justify-content-between"><span>Fuel Charge:</span><span
                                                        class="fw-500">${adultyrTax/parseFloat(flight.FareBreakdown[i].PassengerCount)}</span></div>
                                            <div class="d-flex justify-content-between"><span>Adult Total:</span><span
                                                        class="fw-600">${adultFare/parseFloat(flight.FareBreakdown[i].PassengerCount) + parseFloat(totalOtherTaxes)}</span></div>
                                        </div>`


                    adultCount = `<div class="d-flex justify-content-between"><span
                                                        class="fw-500">${flight.FareBreakdown[i].PassengerCount} x Adult</span><span
                                                        class="fw-600">${adultFare + (totalOtherTaxes * parseInt(arr.departureFlight.adults))}</span></div>`


                }
                if (flight.FareBreakdown[i].PassengerType === 2) {

                    childFare += parseFloat(flight.FareBreakdown[i].BaseFare) + parseFloat(flight.FareBreakdown[i].Tax)

                    childBasefare += parseFloat(flight.FareBreakdown[i].BaseFare);

                    childTotalTax += parseFloat(flight.FareBreakdown[i].Tax)

                    flight?.FareBreakdown?.[i]?.TaxBreakUp?.forEach(tax => {
                        switch(tax.key) {
                            case 'K3':
                                childk3Tax += tax.value;
                                break;
                            case 'YQTax':
                                childyqTax += tax.value;
                                break;
                            case 'YR':
                                childyrTax += tax.value;
                                break;
                            default:
                                if (tax.key !== 'TotalTax') {
                                    childTaxesSum += tax.value;
                                }
                                break;
                        }
                    });

                    if (flight.FareBreakdown[i].Tax !== childk3Tax + childyqTax + childyrTax + childTaxesSum) {
                        childTaxesSum += Math.abs(flight.FareBreakdown[i].Tax - (childk3Tax + childyqTax + childyrTax + childTaxesSum));
                    }

                    childCard = `<div class="row spacing-0 px-2 py-1 d-flex flex-column gap-2">
                                            <div class="d-flex justify-content-between fw-600 mb-2">
                                                <span>Fare/Pax Type</span><span>Amount</span></div>
                                            <div class="d-flex justify-content-between"><span>Child:</span><span
                                                        class="fw-500">${childBasefare/parseFloat(flight.FareBreakdown[i].PassengerCount)}</span></div>
                                            <div class="d-flex justify-content-between"><span>YQ Tax:</span><span
                                                        class="fw-500">${childyqTax/parseFloat(flight.FareBreakdown[i].PassengerCount)}</span></div>
                                            <div class="d-flex justify-content-between"><span>OtherTaxes:</span><span
                                                        class="fw-500">${((childTaxesSum/parseFloat(flight.FareBreakdown[i].PassengerCount)) + parseFloat(totalOtherTaxes)).toFixed(2)}</span></div>
                                            <div class="d-flex justify-content-between"><span>K3/AirlineGST:</span><span
                                                        class="fw-500">${childk3Tax/parseFloat(flight.FareBreakdown[i].PassengerCount)}</span></div>
                                            <div class="d-flex justify-content-between"><span>Fuel Charge:</span><span
                                                        class="fw-500">${childyrTax/parseFloat(flight.FareBreakdown[i].PassengerCount)}</span></div>
                                            <div class="d-flex justify-content-between"><span>Child Total:</span><span
                                                        class="fw-600">${childFare/parseFloat(flight.FareBreakdown[i].PassengerCount) + parseFloat(totalOtherTaxes)}</span></div>
                                        </div>`


                    childCount = `<div class="d-flex justify-content-between"><span
                                                        class="fw-500">${flight.FareBreakdown[i].PassengerCount} x Child</span><span
                                                        class="fw-600">${childFare + (totalOtherTaxes * parseInt(arr.departureFlight.childs))}</span></div>`


                }
                if (flight.FareBreakdown[i].PassengerType === 3) {

                    infantFare += parseFloat(flight.FareBreakdown[i].BaseFare) + parseFloat(flight.FareBreakdown[i].Tax)

                    infantBaseFare += parseFloat(flight.FareBreakdown[i].BaseFare);

                    infantTotalTax += parseFloat(flight.FareBreakdown[i].Tax)


                    flight?.FareBreakdown?.[i]?.TaxBreakUp?.forEach(tax => {
                        switch(tax.key) {
                            case 'K3':
                                infantk3Tax += tax.value;
                                break;
                            case 'YQTax':
                                infantyqTax += tax.value;
                                break;
                            case 'YR':
                                infantyrTax += tax.value;
                                break;
                            default:
                                if (tax.key !== 'TotalTax') {
                                    infantTaxesSum += tax.value;
                                }
                                break;
                        }
                    });

                    if (flight.FareBreakdown[i].Tax !== infantk3Tax + infantyqTax + infantyrTax + infantTaxesSum) {
                        infantTaxesSum += Math.abs(flight.FareBreakdown[i].Tax - (infantk3Tax + infantyqTax + infantyrTax + infantTaxesSum));
                    }


                    infantCard = `<div class="row spacing-0 px-2 py-1 d-flex flex-column gap-2">
                                            <div class="d-flex justify-content-between fw-600 mb-2">
                                                <span>Fare/Pax Type</span><span>Amount</span></div>
                                            <div class="d-flex justify-content-between"><span>Infant:</span><span
                                                        class="fw-500">${infantBaseFare/parseFloat(flight.FareBreakdown[i].PassengerCount)}</span></div>
                                            <div class="d-flex justify-content-between"><span>YQ Tax:</span><span
                                                        class="fw-500">${infantyqTax/parseFloat(flight.FareBreakdown[i].PassengerCount)}</span></div>
                                            <div class="d-flex justify-content-between"><span>OtherTaxes:</span><span
                                                        class="fw-500">${infantTaxesSum/parseFloat(flight.FareBreakdown[i].PassengerCount)}</span></div>
                                            <div class="d-flex justify-content-between"><span>K3/AirlineGST:</span><span
                                                        class="fw-500">${infantk3Tax/parseFloat(flight.FareBreakdown[i].PassengerCount)}</span></div>
                                            <div class="d-flex justify-content-between"><span>Fuel Charge:</span><span
                                                        class="fw-500">${infantyrTax/parseFloat(flight.FareBreakdown[i].PassengerCount)}</span></div>
                                            <div class="d-flex justify-content-between"><span>Adult Total:</span><span
                                                        class="fw-600">${infantFare/parseFloat(flight.FareBreakdown[i].PassengerCount)}</span></div>
                                        </div>`


                    infantCount = `<div class="d-flex justify-content-between"><span
                                                        class="fw-500">${flight.FareBreakdown[i].PassengerCount} x Infant</span><span
                                                        class="fw-600">${infantFare * parseFloat(flight.FareBreakdown[i].PassengerCount)}</span></div>`


                }
            }



            totalFare =  adultFare + childFare + infantFare;
        })


        let calculatedTax = (platformFee * (platformTax/100)).toFixed(2);

        totalAmount = totalFare + (parseFloat(totalOtherTaxes) * parseInt(totalPax)) + platformFee + parseFloat(calculatedTax);

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
                                                    <div id="timer"><span class="me-1">00</span><span>:</span><span
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

// Add click event listener to all elements with the class 'app-chip'
document.querySelectorAll('.app-chip').forEach(function (chip) {
    chip.addEventListener('click', function (event) {
        // Check if the clicked chip is already selected
        const isSelected = event.currentTarget.classList.contains('app-chip-selected');

        // Remove 'app-chip-selected' class from all chips
        document.querySelectorAll('.app-chip').forEach(function (traveller) {
            traveller.classList.remove('app-chip-selected');
        });

        // If the clicked chip was not selected, add the class
        if (!isSelected) {
            event.currentTarget.classList.add('app-chip-selected');
        }

        // Call applyFilters (no parameters needed)
        applyFilters();
    });
});

function showPayment() {
    const netFareElements = document.querySelectorAll('.paymentBreak');

    // Toggle the class that controls visibility for each element
    netFareElements.forEach(element => {
        element.classList.toggle('hidden');
    });
}

// Add click event listener to all elements with the class 'app-chip'
document.querySelectorAll('.a-app-chip').forEach(function (chip) {
    chip.addEventListener('click', function (event) {
        // Check if the clicked chip is already selected
        const isSelected = event.currentTarget.classList.contains('a-app-chip-selected');

        // Remove 'app-chip-selected' class from all chips
        document.querySelectorAll('.a-app-chip').forEach(function (traveller) {
            traveller.classList.remove('a-app-chip-selected');
        });

        // If the clicked chip was not selected, add the class
        if (!isSelected) {
            event.currentTarget.classList.add('a-app-chip-selected');
        }

        // Call applyFilters (no parameters needed)
        applyFilters();
    });
});


// Add click event listener to all elements with the class 'app-chip'
document.querySelectorAll('.app-chip-return').forEach(function (chip) {
    chip.addEventListener('click', function (event) {
        // Check if the clicked chip is already selected
        const isSelected = event.currentTarget.classList.contains('app-chip-selected-return');

        // Remove 'app-chip-selected' class from all chips
        document.querySelectorAll('.app-chip-return').forEach(function (traveller) {
            traveller.classList.remove('app-chip-selected-return');
        });

        // If the clicked chip was not selected, add the class
        if (!isSelected) {
            event.currentTarget.classList.add('app-chip-selected-return');
        }

        // Call applyFilters (no parameters needed)
        applyFiltersReturn();
    });
});

// Add click event listener to all elements with the class 'app-chip'
document.querySelectorAll('.a-app-chip-return').forEach(function (chip) {
    chip.addEventListener('click', function (event) {
        // Check if the clicked chip is already selected
        const isSelected = event.currentTarget.classList.contains('a-app-chip-selected-return');

        // Remove 'app-chip-selected' class from all chips
        document.querySelectorAll('.a-app-chip-return').forEach(function (traveller) {
            traveller.classList.remove('a-app-chip-selected-return');
        });

        // If the clicked chip was not selected, add the class
        if (!isSelected) {
            event.currentTarget.classList.add('a-app-chip-selected-return');
        }

        // Call applyFilters (no parameters needed)
        applyFiltersReturn();
    });
});

function sortAir() {
    // Reset other sorting flags
    sortArrival.isAscending = false;
    sortDeparture.isAscending = false;
    sortPrice.isAscending = false;

    console.log("Original flightData:", flightData);

    // Use `filteredFlights` if available, otherwise fall back to `flightArray`
    let myArr = (filteredFlights.length > 0) ? filteredFlights : flightArray;
    console.log("Before Sorting myArr:", myArr);

    // Ensure myArr is an array
    if (!Array.isArray(myArr)) {
        console.error("Expected myArr to be an array, but got:", typeof myArr);
        return;
    }

    // Perform sorting based on onwardFlight.AirlineName
    if (!sortAir.isAscending) {
        // Sort by AirlineName in ascending order
        filteredFlights = myArr.sort((a, b) =>
            a.flight.onwardFlight?.AirlineName.localeCompare(b.flight.onwardFlight?.AirlineName)
        );
    } else {
        // Sort by AirlineName in descending order
        filteredFlights = myArr.sort((a, b) =>
            b.flight.onwardFlight?.AirlineName.localeCompare(a.flight.onwardFlight?.AirlineName)
        );
    }

    // Toggle the sorting order flag
    sortAir.isAscending = !sortAir.isAscending;

    console.log("Sorted Flights:", filteredFlights);

    // Cache the renderResults element
    const renderResults = document.getElementById("renderResults");
    if (!renderResults) {
        console.error("Element with ID 'renderResults' not found");
        return;
    }

    renderResults.innerHTML = ''; // Clear previous results

    // Efficient DOM manipulation using Document Fragment
    const fragment = document.createDocumentFragment();

    filteredFlights.forEach((flight, index) => {
        const flightCard = new FlightFixedCards(flight.flight, index);
        const cardElement = document.createElement('div');
        cardElement.innerHTML = flightCard.render();
        fragment.appendChild(cardElement); // Append each card to the fragment
    });

    renderResults.appendChild(fragment); // Append the entire fragment to the DOM in one go
}

function sortAirReturn(element) {
    toggleArrowDirection(element, 'airline-arrow');
    sortArrival.isAscending = false;
    sortDeparture.isAscending = false;
    sortPrice.isAscending = false;

    let myArr =  (filteredFlightsReturn.length > 0) ? filteredFlightsReturn : flightData.returnFlights;

    // Toggle between ascending and descending sorting orders
    if (!sortAir.isAscending) {
        myArr.sort((a, b) => a.AirlineName.localeCompare(b.AirlineName)); // Ascending order
    } else {
        myArr.sort((a, b) => b.AirlineName.localeCompare(a.AirlineName)); // Descending order
    }

    // Invert the sorting order flag
    sortAir.isAscending = !sortAir.isAscending;

    // Cache the renderResults element
    const renderResults = document.getElementById("myReturn");
    renderResults.innerHTML = ''; // Clear previous results

    // Efficient DOM manipulation using Document Fragment
    const fragment = document.createDocumentFragment();
    myArr.forEach((flight, index) => {
        const flightCard = new FlightRoundCards(flight, index);
        const cardElement = document.createElement('div');
        cardElement.innerHTML = flightCard.renderReturn();
        fragment.appendChild(cardElement); // Append each card to the fragment
    });

    renderResults.appendChild(fragment); // Append the entire fragment to the DOM in one go

}

function sortAirOnward(element) {
    toggleArrowDirection1(element, 'airline-arrow1');

    sortArrival.isAscending = false;
    sortDeparture.isAscending = false;
    sortPrice.isAscending = false;

    let myArr =  (filteredFlights.length > 0) ? filteredFlights : flightData.onwardFlights;

    // Toggle between ascending and descending sorting orders
    if (!sortAir.isAscending) {
        myArr.sort((a, b) => a.AirlineName.localeCompare(b.AirlineName)); // Ascending order
    } else {
        myArr.sort((a, b) => b.AirlineName.localeCompare(a.AirlineName)); // Descending order
    }

    // Invert the sorting order flag
    sortAir.isAscending = !sortAir.isAscending;

    // Cache the renderResults element
    const renderResults = document.getElementById("myOnward");
    renderResults.innerHTML = ''; // Clear previous results

    // Efficient DOM manipulation using Document Fragment
    const fragment = document.createDocumentFragment();
    myArr.forEach((flight, index) => {
        const flightCard = new FlightRoundCards(flight, index);
        const cardElement = document.createElement('div');
        cardElement.innerHTML = flightCard.render();
        fragment.appendChild(cardElement); // Append each card to the fragment
    });

    renderResults.appendChild(fragment); // Append the entire fragment to the DOM in one go

}

// Set initial sorting order flag
sortAir.isAscending = true;

function setDateRestrictions(input,paxType) {
    // Assuming arr.Origin.DepDate is in "21 Sept 2024" format
    const depDateStr = arr.onwardFlight.Origin.DepDate;

    // Parse the custom date string
    const currentDate = parseCustomDate(depDateStr);

    if (!currentDate) {
        console.error('Invalid date in arr.Origin.DepDate:', depDateStr);
        return;
    }

    let maxDate,minDate;

    // Modify the max date based on this.type (use the type from your logic)
    const type = paxType; // This should come from your server-side logic or JS logic

    // console.log("User type: ", type); // Debugging log

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
    }else if(type==='Infant')
    {
        maxDate = new Date(currentDate);
        minDate = new Date(currentDate);
        // Set min date (oldest child age, 18 years ago)
        // maxDate.setFullYear(currentDate);
        maxDate.setDate(maxDate.getDate() - 10);
        minDate.setFullYear(currentDate.getFullYear()-2);
        minDate.setDate(minDate.getDate() + 2);
    }
    else {
        console.error('Unknown type:', type);
        return;
    }

    // Check if maxDate is correctly calculated
    if (maxDate) {
        // console.log("Calculated Max Date: ", maxDate); // Debugging log
        const formattedMaxDate = maxDate.toISOString().split('T')[0];
        input.setAttribute('max', formattedMaxDate);
        // console.log('Max Date Set:', formattedMaxDate); // Debugging log
    } else {
        console.error('Failed to calculate maxDate');
    }

    if (minDate) {
        const formattedMinDate = minDate.toISOString().split('T')[0];
        input.setAttribute('min', formattedMinDate);
        // console.log('Min Date Set:', formattedMinDate); // Debugging log
    }
}

function sortPrice() {
    // Reset other sorting flags
    sortDeparture.isAscending = false;
    sortAir.isAscending = false;
    sortArrival.isAscending = false;

    // Use `filteredFlights` if available, otherwise fall back to `flightArray`
    let myArr = (filteredFlights.length > 0) ? filteredFlights : flightArray;

    // Toggle between ascending and descending sorting orders
    if (!sortPrice.isAscending) {
        // Sort by PublishedFare in ascending order
        filteredFlights = myArr.sort((a, b) =>
            a.flight.onwardFlight.Segments[0].FareBreakup.PublishedFare - b.flight.onwardFlight.Segments[0].FareBreakup.PublishedFare
        );
    } else {
        // Sort by PublishedFare in descending order
        filteredFlights = myArr.sort((a, b) =>
            b.flight.onwardFlight.Segments[0].FareBreakup.PublishedFare - a.flight.onwardFlight.Segments[0].FareBreakup.PublishedFare
        );
    }

    // Invert the sorting order flag
    sortPrice.isAscending = !sortPrice.isAscending;

    console.log("Sorted by Price:", filteredFlights);

    // Cache the renderResults element
    const renderResults = document.getElementById("renderResults");
    if (!renderResults) {
        console.error("Element with ID 'renderResults' not found");
        return;
    }

    renderResults.innerHTML = ''; // Clear previous results

    // Efficient DOM manipulation using Document Fragment
    const fragment = document.createDocumentFragment();
    filteredFlights.forEach((flight, index) => {
        const flightCard = new FlightFixedCards(flight.flight, index);
        const cardElement = document.createElement('div');
        cardElement.innerHTML = flightCard.render();
        fragment.appendChild(cardElement); // Append each card to the fragment
    });

    renderResults.appendChild(fragment); // Append the entire fragment to the DOM in one go
}

function sortPriceReturn(element) {
    toggleArrowDirection(element, 'price-arrow');

    sortDeparture.isAscending = false;
    sortAir.isAscending = false;
    sortArrival.isAscending = false;


    let myArr =  (filteredFlightsReturn.length > 0) ? filteredFlightsReturn : flightData.returnFlights;
    // Toggle between ascending and descending sorting orders
    if (!sortPrice.isAscending) {
        myArr.sort((a, b) => a.Segments[0].FareBreakup.PublishedFare - b.Segments[0].FareBreakup.PublishedFare); // Ascending order
    } else {
        myArr.sort((a, b) => b.Segments[0].FareBreakup.PublishedFare - a.Segments[0].FareBreakup.PublishedFare); // Descending order
    }

    // Invert the sorting order flag
    sortPrice.isAscending = !sortPrice.isAscending;

    // Render the sorted items
    // Cache the renderResults element
    const renderResults = document.getElementById("myReturn");
    renderResults.innerHTML = ''; // Clear previous results


    // Efficient DOM manipulation using Document Fragment
    const fragment = document.createDocumentFragment();
    myArr.forEach((flight, index) => {
        const flightCard = new FlightRoundCards(flight, index);
        const cardElement = document.createElement('div');
        cardElement.innerHTML = flightCard.renderReturn();
        fragment.appendChild(cardElement); // Append each card to the fragment
    });

    renderResults.appendChild(fragment); // Append the entire fragment to the DOM in one go

}

function sortPriceOnward(element) {
    toggleArrowDirection1(element, 'price-arrow1');
    sortDeparture.isAscending = false;
    sortAir.isAscending = false;
    sortArrival.isAscending = false;


    let myArr =  (filteredFlights.length > 0) ? filteredFlights : flightData.onwardFlights;
    // Toggle between ascending and descending sorting orders
    if (!sortPrice.isAscending) {
        myArr.sort((a, b) => a.Segments[0].FareBreakup.PublishedFare - b.Segments[0].FareBreakup.PublishedFare); // Ascending order
    } else {
        myArr.sort((a, b) => b.Segments[0].FareBreakup.PublishedFare - a.Segments[0].FareBreakup.PublishedFare); // Descending order
    }

    // Invert the sorting order flag
    sortPrice.isAscending = !sortPrice.isAscending;

    // Render the sorted items
    // Cache the renderResults element
    const renderResults = document.getElementById("myOnward");
    renderResults.innerHTML = ''; // Clear previous results


    // Efficient DOM manipulation using Document Fragment
    const fragment = document.createDocumentFragment();
    myArr.forEach((flight, index) => {
        const flightCard = new FlightRoundCards(flight, index);
        const cardElement = document.createElement('div');
        cardElement.innerHTML = flightCard.render();
        fragment.appendChild(cardElement); // Append each card to the fragment
    });

    renderResults.appendChild(fragment); // Append the entire fragment to the DOM in one go

}


// Set initial sorting order flag
sortPrice.isAscending = true;

function sortDeparture() {
    // Reset other sorting flags
    sortPrice.isAscending = false;
    sortAir.isAscending = false;
    sortArrival.isAscending = false;

    // Use `filteredFlights` if available, otherwise fall back to `flightArray`
    let myArr = (filteredFlights.length > 0) ? filteredFlights : flightArray;

    // Toggle between ascending and descending sorting orders
    if (!sortDeparture.isAscending) {
        // Sort by Departure Time (DepTime) in ascending order
        filteredFlights = myArr.sort((a, b) =>
            a.flight.onwardFlight.Origin.DepTime.localeCompare(b.flight.onwardFlight.Origin.DepTime)
        );
    } else {
        // Sort by Departure Time (DepTime) in descending order
        filteredFlights = myArr.sort((a, b) =>
            b.flight.onwardFlight.Origin.DepTime.localeCompare(a.flight.onwardFlight.Origin.DepTime)
        );
    }

    // Invert the sorting order flag
    sortDeparture.isAscending = !sortDeparture.isAscending;

    console.log("Sorted by Departure:", filteredFlights);

    // Cache the renderResults element
    const renderResults = document.getElementById("renderResults");
    if (!renderResults) {
        console.error("Element with ID 'renderResults' not found");
        return;
    }

    renderResults.innerHTML = ''; // Clear previous results

    // Efficient DOM manipulation using Document Fragment
    const fragment = document.createDocumentFragment();
    filteredFlights.forEach((flight, index) => {
        const flightCard = new FlightFixedCards(flight.flight, index);
        const cardElement = document.createElement('div');
        cardElement.innerHTML = flightCard.render();
        fragment.appendChild(cardElement); // Append each card to the fragment
    });

    renderResults.appendChild(fragment); // Append the entire fragment to the DOM in one go
}

function sortDepartureReturn(element) {
    toggleArrowDirection(element, 'departure-arrow');
    sortPrice.isAscending = false;
    sortAir.isAscending = false;
    sortArrival.isAscending = false;

    let myArr =  (filteredFlightsReturn.length > 0) ? filteredFlightsReturn : flightData.returnFlights;

    // Toggle between ascending and descending sorting orders
    if (!sortDeparture.isAscending) {
        myArr.sort((a, b) => a.Origin.DepTime.localeCompare(b.Origin.DepTime)); // Ascending order
    } else {
        myArr.sort((a, b) => b.Origin.DepTime.localeCompare(a.Origin.DepTime)); // Descending order
    }

    // Invert the sorting order flag
    sortDeparture.isAscending = !sortDeparture.isAscending;

    // Render the sorted items
    // Cache the renderResults element
    const renderResults = document.getElementById("myReturn");
    renderResults.innerHTML = ''; // Clear previous results


    // Efficient DOM manipulation using Document Fragment
    const fragment = document.createDocumentFragment();
    myArr.forEach((flight, index) => {
        const flightCard = new FlightRoundCards(flight, index);
        const cardElement = document.createElement('div');
        cardElement.innerHTML = flightCard.renderReturn();
        fragment.appendChild(cardElement); // Append each card to the fragment
    });

    renderResults.appendChild(fragment); // Append the entire fragment to the DOM in one go

}

function sortDepartureOnward(element) {
    toggleArrowDirection1(element, 'departure-arrow1');

    sortPrice.isAscending = false;
    sortAir.isAscending = false;
    sortArrival.isAscending = false;

    let myArr =  (filteredFlights.length > 0) ? filteredFlights : flightData.onwardFlights;

    // Toggle between ascending and descending sorting orders
    if (!sortDeparture.isAscending) {
        myArr.sort((a, b) => a.Origin.DepTime.localeCompare(b.Origin.DepTime)); // Ascending order
    } else {
        myArr.sort((a, b) => b.Origin.DepTime.localeCompare(a.Origin.DepTime)); // Descending order
    }

    // Invert the sorting order flag
    sortDeparture.isAscending = !sortDeparture.isAscending;

    // Render the sorted items
    // Cache the renderResults element
    const renderResults = document.getElementById("myOnward");
    renderResults.innerHTML = ''; // Clear previous results


    // Efficient DOM manipulation using Document Fragment
    const fragment = document.createDocumentFragment();
    myArr.forEach((flight, index) => {
        const flightCard = new FlightRoundCards(flight, index);
        const cardElement = document.createElement('div');
        cardElement.innerHTML = flightCard.render();
        fragment.appendChild(cardElement); // Append each card to the fragment
    });

    renderResults.appendChild(fragment); // Append the entire fragment to the DOM in one go

}

// Set initial sorting order flag
sortDeparture.isAscending = true;

function sortArrival() {
    // Reset other sorting flags
    sortPrice.isAscending = false;
    sortAir.isAscending = false;
    sortDeparture.isAscending = false;

    // Use `filteredFlights` if available, otherwise fall back to `flightArray`
    let myArr = (filteredFlights.length > 0) ? filteredFlights : flightArray;

    // Toggle between ascending and descending sorting orders
    if (!sortArrival.isAscending) {
        // Sort by Arrival Time (ArrTime) in ascending order
        filteredFlights = myArr.sort((a, b) =>
            a.flight.onwardFlight.Destination.ArrTime.localeCompare(b.flight.onwardFlight.Destination.ArrTime)
        );
    } else {
        // Sort by Arrival Time (ArrTime) in descending order
        filteredFlights = myArr.sort((a, b) =>
            b.flight.onwardFlight.Destination.ArrTime.localeCompare(a.flight.onwardFlight.Destination.ArrTime)
        );
    }

    // Invert the sorting order flag
    sortArrival.isAscending = !sortArrival.isAscending;

    console.log("Sorted by Arrival:", filteredFlights);

    // Cache the renderResults element
    const renderResults = document.getElementById("renderResults");
    if (!renderResults) {
        console.error("Element with ID 'renderResults' not found");
        return;
    }

    renderResults.innerHTML = ''; // Clear previous results

    // Efficient DOM manipulation using Document Fragment
    const fragment = document.createDocumentFragment();
    filteredFlights.forEach((flight, index) => {
        const flightCard = new FlightFixedCards(flight.flight, index);
        const cardElement = document.createElement('div');
        cardElement.innerHTML = flightCard.render();
        fragment.appendChild(cardElement); // Append each card to the fragment
    });

    renderResults.appendChild(fragment); // Append the entire fragment to the DOM in one go
}

function sortArrivalReturn(element) {
    toggleArrowDirection(element, 'arrival-arrow');
    sortPrice.isAscending = false;
    sortAir.isAscending = false;
    sortDeparture.isAscending = false;

    let myArr =  (filteredFlightsReturn.length > 0) ? filteredFlightsReturn : flightData.returnFlights;
    // Toggle between ascending and descending sorting orders
    if (!sortArrival.isAscending) {
        myArr.sort((a, b) => a.Destination.ArrTime.localeCompare(b.Destination.ArrTime)); // Ascending order
    } else {
        myArr.sort((a, b) => b.Destination.ArrTime.localeCompare(a.Destination.ArrTime)); // Descending order
    }

    // Invert the sorting order flag
    sortArrival.isAscending = !sortArrival.isAscending;

    // Cache the renderResults element
    const renderResults = document.getElementById("myReturn");
    renderResults.innerHTML = ''; // Clear previous results

    // Efficient DOM manipulation using Document Fragment
    const fragment = document.createDocumentFragment();
    myArr.forEach((flight, index) => {
        const flightCard = new FlightRoundCards(flight, index);
        const cardElement = document.createElement('div');
        cardElement.innerHTML = flightCard.renderReturn();
        fragment.appendChild(cardElement); // Append each card to the fragment
    });

    renderResults.appendChild(fragment); // Append the entire fragment to the DOM in one go

}

function sortArrivalOnward(element) {
    toggleArrowDirection1(element, 'arrival-arrow1');

    sortPrice.isAscending = false;
    sortAir.isAscending = false;
    sortDeparture.isAscending = false;

    let myArr =  (filteredFlights.length > 0) ? filteredFlights : flightData.onwardFlights;
    // Toggle between ascending and descending sorting orders
    if (!sortArrival.isAscending) {
        myArr.sort((a, b) => a.Destination.ArrTime.localeCompare(b.Destination.ArrTime)); // Ascending order
    } else {
        myArr.sort((a, b) => b.Destination.ArrTime.localeCompare(a.Destination.ArrTime)); // Descending order
    }

    // Invert the sorting order flag
    sortArrival.isAscending = !sortArrival.isAscending;

    // Cache the renderResults element
    const renderResults = document.getElementById("myOnward");
    renderResults.innerHTML = ''; // Clear previous results

    // Efficient DOM manipulation using Document Fragment
    const fragment = document.createDocumentFragment();
    myArr.forEach((flight, index) => {
        const flightCard = new FlightRoundCards(flight, index);
        const cardElement = document.createElement('div');
        cardElement.innerHTML = flightCard.render();
        fragment.appendChild(cardElement); // Append each card to the fragment
    });

    renderResults.appendChild(fragment); // Append the entire fragment to the DOM in one go

}

// Set initial sorting order flag
sortArrival.isAscending = true;

function sortDuration() {
    // Reset other sorting flags
    sortPrice.isAscending = false;
    sortAir.isAscending = false;
    sortDeparture.isAscending = false;
    sortArrival.isAscending = false;

    // Use `filteredFlights` if available, otherwise fall back to `flightArray`
    let myArr = (filteredFlights.length > 0) ? filteredFlights : flightArray;

    // Helper function to convert duration (hh:mm) to total minutes
    const parseDuration = (duration) => {
        const [hours, minutes] = duration.split(':').map(Number);
        return hours * 60 + minutes;
    };

    // Toggle between ascending and descending sorting orders
    if (!sortDuration.isAscending) {
        // Sort by Duration in ascending order
        filteredFlights = myArr.sort((a, b) =>
            parseDuration(a.flight.onwardFlight.Duration) - parseDuration(b.flight.onwardFlight.Duration)
        );
    } else {
        // Sort by Duration in descending order
        filteredFlights = myArr.sort((a, b) =>
            parseDuration(b.flight.onwardFlight.Duration) - parseDuration(a.flight.onwardFlight.Duration)
        );
    }

    // Invert the sorting order flag
    sortDuration.isAscending = !sortDuration.isAscending;

    console.log("Sorted by Duration:", filteredFlights);

    // Cache the renderResults element
    const renderResults = document.getElementById("renderResults");
    if (!renderResults) {
        console.error("Element with ID 'renderResults' not found");
        return;
    }

    renderResults.innerHTML = ''; // Clear previous results

    // Efficient DOM manipulation using Document Fragment
    const fragment = document.createDocumentFragment();
    filteredFlights.forEach((flight, index) => {
        const flightCard = new FlightFixedCards(flight.flight, index);
        const cardElement = document.createElement('div');
        cardElement.innerHTML = flightCard.render();
        fragment.appendChild(cardElement); // Append each card to the fragment
    });

    renderResults.appendChild(fragment); // Append the entire fragment to the DOM in one go
}

function sortDurationReturn(element) {
    toggleArrowDirection(element, 'duration-arrow');

    // Reset other sorting flags
    sortPrice.isAscending = false;
    sortAir.isAscending = false;
    sortDeparture.isAscending = false;
    sortArrival.isAscending = false;
    console.log(flightData)
    let myArr = (filteredFlightsReturn.length > 0) ? filteredFlightsReturn : flightData.returnFlights;

    // Helper function to convert duration into total minutes
    // console.log(myArr)
    const parseDuration = (duration) => {
        //console.log("Parsing duration:", duration);
        return duration.hours * 60 + duration.minutes;
    };

    // Toggle between ascending and descending sorting orders
    if (!sortDuration.isAscending) {
        myArr.sort((a, b) => parseDuration(a.totalDuration) - parseDuration(b.totalDuration)); // Ascending
    } else {
        myArr.sort((a, b) => parseDuration(b.totalDuration) - parseDuration(a.totalDuration)); // Descending
    }

    // Invert the sorting order flag
    sortDuration.isAscending = !sortDuration.isAscending;

    // Cache the renderResults element
    const renderResults = document.getElementById("myReturn");
    renderResults.innerHTML = ''; // Clear previous results

    // Efficient DOM manipulation using Document Fragment
    const fragment = document.createDocumentFragment();
    myArr.forEach((flight, index) => {
        const flightCard = new FlightRoundCards(flight, index);
        const cardElement = document.createElement('div');
        cardElement.innerHTML = flightCard.render();
        fragment.appendChild(cardElement); // Append each card to the fragment
    });

    renderResults.appendChild(fragment); // Append the entire fragment to the DOM in one go
}

function sortDurationOnward(element) {
    toggleArrowDirection1(element, 'duration-arrow1');

    // Reset other sorting flags
    sortPrice.isAscending = false;
    sortAir.isAscending = false;
    sortDeparture.isAscending = false;
    sortArrival.isAscending = false;

    let myArr = (filteredFlights.length > 0) ? filteredFlights : flightData.onwardFlights;

    //console.log(myArr)
    const parseDuration = (duration) => {
        //console.log("Parsing duration:", duration);
        return duration.hours * 60 + duration.minutes;
    };


    // Toggle between ascending and descending sorting orders
    if (!sortDuration.isAscending) {
        myArr.sort((a, b) => parseDuration(a.totalDuration) - parseDuration(b.totalDuration)); // Ascending
    } else {
        myArr.sort((a, b) => parseDuration(b.totalDuration) - parseDuration(a.totalDuration)); // Descending
    }

    // Invert the sorting order flag
    sortDuration.isAscending = !sortDuration.isAscending;

    // Cache the renderResults element
    const renderResults = document.getElementById("myOnward");
    renderResults.innerHTML = ''; // Clear previous results

    // Efficient DOM manipulation using Document Fragment
    const fragment = document.createDocumentFragment();
    myArr.forEach((flight, index) => {
        const flightCard = new FlightRoundCards(flight, index);
        const cardElement = document.createElement('div');
        cardElement.innerHTML = flightCard.render();
        fragment.appendChild(cardElement); // Append each card to the fragment
    });

    renderResults.appendChild(fragment); // Append the entire fragment to the DOM in one go
}

sortDuration.isAscending = true;
