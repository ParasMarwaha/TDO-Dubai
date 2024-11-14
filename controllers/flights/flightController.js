const flightController = {};
const moment = require("moment");
require("moment-timezone")
const connectToDatabase = require("../../db/connection");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const {sign} = require("jsonwebtoken");
const flightServices = require("../../services/flights/flights.services");
const axios = require('axios');
const adminService = require("../../services/admin/admin.service");
const mailFunc = require("../../utils/mails");
const agentServices = require("../../services/client/index.services");

flightController.searchPage = (req, res) => {
    res.render("flights/searchPage", {agentEmail: req.agent.agentEmail, userType: req.agent.userType})
}

flightController.bookFlight = (req, res) => {
    res.render("flights/bookFlight", {agentEmail: req.agent.agentEmail, userType: req.agent.userType})
}

flightController.bookFlight = async (req, res) => {
    let tdate = req.session.tdate;
    let agentEmail = req.agent.agentEmail;
    let traceId = req.session.traceId;
    console.log("&&&&&&")
    console.log(req.session)

    const connection = await connectToDatabase();
    // const password = generatePassword(8);

    let [recordset] = await flightServices.bookFlight(connection, traceId, agentEmail);

    if (recordset.length === 0) {
        res.json({error: true, message: "data nhi mila", recordset: []});
    } else {


        res.render("flights/bookFlight", {
            agentEmail: agentEmail,
            markup: recordset[0].markupValue,
            data: recordset[0].searchObject,
            platformFee: recordset[0].platformFee,
            platformTax: recordset[0].platformTax,
            tdate,
            traceId: recordset[0].traceId,
            userType: req.agent.userType
        })


    }

}


flightController.flightResults = (req, res) => {
    res.render("flights/searchResults", {
        agentEmail: req.agent.agentEmail,
        userType: req.agent.userType
    })
}

flightController.roundFlightResults = (req, res) => {
    res.render("flights/roundtripSearchResults", {
        agentEmail: req.agent.agentEmail,
        userType: req.agent.userType
    })
}

flightController.AirSell = async (req, res) => {
    console.log(req.body);

    let {traceId, flightKey, adult, child, infant, flight} = req.body

    let flights = JSON.parse(flight)
    let response = '';

    let payload = ''

    try {

        let apiUrl = `http://trvlnxtgateway.parikshan.net/api/AirSell`;


        payload = {
            "trackID": `${traceId}`,
            "flightKeys": [
                `${flightKey}`
            ],
            "paxType": {
                "adult": adult,
                "child": child,
                "infant": infant
            },
            "flights": flights
        }

        response = await axios.post(apiUrl, payload, {
            headers: {
                'ApiKey': `VFJBVkVMIERFQUwgT25saW5lIC0gQ1VTVDMwMDcyNA==`,
                'Content-Type': 'application/json'
            }
        });

        console.log(response);

        if (response.data.ResponseStatusType.Success === true) {
            res.json({error: false, ResponseStatus: 1, message: "AirSell Success", response: {response: response.data}})
        } else {
            res.json({error: true, ResponseStatus: 14, response: {response: response.data}})
        }

    } catch (e) {
        console.log(e)
        res.json({error: true, ResponseStatus: 14, response: e})
    }

}


flightController.AirSellTwoWay = async (req, res) => {
    console.log(req.body);

    let {traceId, flightKeyOnward, flightKeyReturn, adult, child, infant, flights} = req.body

    // let flights = flight
    let response = '';

    let payload = ''

    console.log("123")
    try {

        let apiUrl = `http://trvlnxtgateway.parikshan.net/api/AirSell`;


        //console.log("123")
        payload = {
            "trackID": `${traceId}`,
            "flightKeys": [
                `${flightKeyOnward}`,
                `${flightKeyReturn}`,
            ],
            "paxType": {
                "adult": adult,
                "child": child,
                "infant": infant
            },
            "flights": JSON.parse(flights)
        }

        console.log(payload)
        response = await axios.post(apiUrl, payload, {
            headers: {
                'ApiKey': `VFJBVkVMIERFQUwgT25saW5lIC0gQ1VTVDMwMDcyNA==`,
                'Content-Type': 'application/json'
            }
        });

        console.log(response);

        if (response.data.ResponseStatusType.Success === true) {
            res.json({error: false, ResponseStatus: 1, message: "AirSell Success", response: {response: response.data}})
        } else {
            res.json({error: true, ResponseStatus: 14, response: {response: response.data}})
        }

    } catch (e) {
        console.log(e)
        res.json({error: true, ResponseStatus: 14, response: e})
    }

}

flightController.ticket = async (req, res) => {
    console.log(req.body)
    let {agentId} = req.agent
    let {
        traceId,
        flight,
        sellKey,
        passengers,
        email,
        mobile,
        hold,
        revised,
        totalAdult,
        totalChild,
        totalInfant,
        riyaTrip
    } = req.body
    let response = '';
    let flights = JSON.parse(flight);
    let pax = JSON.parse(passengers);
    let connection
    let holdOption = (hold === "true") ? true : false;

    let revisedOption = (revised === "true") ? true : false;
    try {
        let apiUrl = `http://trvlnxtgateway.parikshan.net/api/Booking`;
        response = await axios.post(apiUrl, {
            "trackID": `${traceId}`,
            "sellKey": `${sellKey}`,
            "tripType": `${riyaTrip}`,
            "paymentMode": "1",
            "IsHold": false,
            "Isfarerevised": revisedOption,
            "paxType": {
                "adult": totalAdult,
                "child": totalChild,
                "infant": totalInfant
            },
            "flights": flights,
            "passengers": pax,
            "addressDetail": {
                "contactNumber": `${mobile}`,
                "emailId": `${email}`
            },
            "baggageDetails": [],
            "mealsDetails": [],
            "seatDetails": []
        }, {
            headers: {
                'Accept-Encoding': 'gzip, deflate',
                'ApiKey': `VFJBVkVMIERFQUwgT25saW5lIC0gQ1VTVDMwMDcyNA==`,
                'Content-Type': 'application/json'
            }
        });

        console.log(response);

        if (response.data.ResponseStatusType.Success === true) {

            // add to database all information


            try {
                let total_no_of_pax = parseInt(totalAdult) + parseInt(totalChild) + parseInt(totalInfant);
                let pnr = response.data.Flights[0].AirlinePNR
                let gdspnr = response.data.GDSPNR
                const booking_date_time = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
                let response_json = response.data
                response_json = JSON.stringify(response_json)
                let total_base_fare = 0;
                let total_tax = 0;
                let total_gross_fare = 0;
                let total_net_fare = 0;

                response.data.Flights.forEach(flight => {
                    total_base_fare += flight.BasicFare;
                    total_tax += flight.TotalTax;
                    total_gross_fare += flight.GrossFare;
                    total_net_fare += flight.NetAmount;
                });

                console.log("Total Base Fare:", total_base_fare);
                console.log("Total Tax:", total_tax);
                console.log("Total Gross Fare:", total_gross_fare);
                console.log("Total Net Fare:", total_net_fare);
                console.log(total_no_of_pax, pnr, total_base_fare, total_tax, total_gross_fare, total_net_fare)
                console.log(response.data.Passengers[0].FirstName)
                connection = await connectToDatabase();

                let [addData] = await flightServices.addFlightBookingData(connection, agentId, total_no_of_pax, totalAdult, totalChild, totalInfant, gdspnr, booking_date_time, response_json, total_base_fare, total_tax, total_gross_fare, total_net_fare, pnr);
                let [getbookingId] = await flightServices.getBookingId(connection)
                let booking_id = getbookingId[0].booking_id

                for (let trip = 0; trip < response.data.Flights.length; trip++) {
                    let origin = response.data.Flights[trip].OriginDestination.Departure
                    let destination = response.data.Flights[trip].OriginDestination.Arrival
                    let flightNumber = response.data.Flights[trip].Segments[0].FlightNumber
                    let flightName = response.data.Flights[trip].Segments[0].Carrier
                    let iataCode = response.data.Flights[trip].Segments[0].Carrier
                    let departureDate = response.data.Flights[trip].OriginDestination.DepartureDateTime
                    let arrivalDate = response.data.Flights[trip].OriginDestination.ArrivalDateTime
                    let duration = response.data.Flights[trip].OriginDestination.TotalTime
                    let departureTerminal = response.data.Flights[trip].Segments[0].DepartureTerminal
                    let arrivalTerminal = response.data.Flights[trip].Segments[0].ArrivalTerminal
                    let fareName = response.data.Flights[trip].FareName
                    let basicFare = response.data.Flights[trip].BasicFare
                    let totalTax = response.data.Flights[trip].TotalTax
                    let totalFare = response.data.Flights[trip].TotalFare
                    let netAmount = response.data.Flights[trip].NetAmount
                    let grossFare = response.data.Flights[trip].GrossFare
                    let airlinePNR = response.data.Flights[trip].AirlinePNR
                    let flightKey = response.data.Flights[trip].FlightKey
                    let airlineCode = response.data.Flights[trip].ValidatingCarrier;
                    let baggage = `${response?.data?.Flights?.[trip]?.Segments[0]?.Baggages?.[0]?.Weight || '15'}${response?.data?.Flights?.[trip]?.Segments?.[0]?.Baggages?.[0]?.Unit || 'KG'}`
                    let cabinBaggage = response.data.Flights[trip].Segments[0].CabinBaggage

                    for (let i = 0; i < response.data.Passengers.length; i++) {
                        let passengerInfo = response.data.Passengers[i]
                        let title = passengerInfo.Title
                        let firstName = passengerInfo.FirstName
                        let lastName = passengerInfo.LastName
                        let paxType = passengerInfo.PaxType
                        let dateOfBirth = passengerInfo.DateOfBirth
                        let passportNo = passengerInfo.PassportDetail.PassportNo
                        let passportExpiry = passengerInfo.PassportDetail.PassportExpiry
                        let passportIssueCountry = passengerInfo.PassportDetail.PassportIssueCountry
                        let barcodes = passengerInfo.BarCodes[trip]
                        barcodes = JSON.stringify(barcodes)
                        let bookingStatus = "Ticketed"
                        let ticketStatus = "Ticketed"
                        let [addBookingDetails] = await flightServices.addFlightBookingDetails(connection, booking_id, title, firstName, lastName, paxType, dateOfBirth, passportNo, passportExpiry, passportIssueCountry, barcodes, origin, destination, flightNumber, flightName, iataCode, departureDate, arrivalDate, duration, departureTerminal, arrivalTerminal, fareName, bookingStatus, ticketStatus)
                    }
                    let [addTrip] = await flightServices.addTrip(connection, booking_id, origin, destination, departureDate, arrivalDate, duration, basicFare, totalTax, totalFare, netAmount, grossFare, airlinePNR, baggage, cabinBaggage, departureTerminal, arrivalTerminal, flightKey, fareName, airlineCode)

                }
                res.json({error: false, response: response.data, message: "Ticket Successfully", bookingNo: booking_id})
            } catch (e) {
                console.log('-----', e.message)
                return res.send({
                    responseCode: 1,
                    error: true,
                    warning: false,
                    message: "Error Occurred - " + e.message
                });
            } finally {
                if (connection) connection.release();  // Return the connection to the pool
            }


            // res.json({error: false, response: response.data.response, message: "Ticket Successfully"})
        } else {
            res.json({error: true, response: response.data, message: "Ticket Failed"})
        }
    } catch (e) {
        console.log(e);
        res.json({error: true, response: response.data, message: e.message})
    } finally {
        if (connection) connection.release();  // Return the connection to the pool
    }


}

flightController.hold = async (req, res) => {
    console.log(req.body)
    let {agentId} = req.agent
    let {
        traceId,
        flight,
        sellKey,
        passengers,
        email,
        mobile,
        hold,
        revised,
        totalAdult,
        totalChild,
        totalInfant
    } = req.body
    let response = '';
    let flights = JSON.parse(flight);
    let pax = JSON.parse(passengers);
    let connection
    let holdOption = (hold === "true") ? true : false;

    let revisedOption = (revised === "true") ? true : false;
    try {
        let apiUrl = `http://trvlnxtgateway.parikshan.net/api/Booking`;
        response = await axios.post(apiUrl, {
            "trackID": `${traceId}`,
            "sellKey": `${sellKey}`,
            "tripType": "O",
            "paymentMode": "1",
            "IsHold": true,
            "Isfarerevised": revisedOption,
            "paxType": {
                "adult": totalAdult,
                "child": totalChild,
                "infant": totalInfant
            },
            "flights": flights,
            "passengers": pax,
            "addressDetail": {
                "contactNumber": `${mobile}`,
                "emailId": `${email}`
            },
            "baggageDetails": [],
            "mealsDetails": [],
            "seatDetails": []
        }, {
            headers: {
                'Accept-Encoding': 'gzip, deflate',
                'ApiKey': `VFJBVkVMIERFQUwgT25saW5lIC0gQ1VTVDMwMDcyNA==`,
                'Content-Type': 'application/json'
            }
        });

        console.log(response);

        if (response.data.ResponseStatusType.Success === true) {

            // add to database all information


            try {
                let total_no_of_pax = parseInt(totalAdult) + parseInt(totalChild) + parseInt(totalInfant);
                let pnr = response.data.Flights[0].AirlinePNR
                const booking_date_time = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
                let response_json = response.data
                response_json = JSON.stringify(response_json)
                let total_base_fare = response.data.Flights[0].BasicFare
                let total_tax = response.data.Flights[0].TotalTax
                let total_gross_fare = response.data.Flights[0].GrossFare
                let total_net_fare = response.data.Flights[0].NetAmount
                console.log(total_no_of_pax, pnr, total_base_fare, total_tax, total_gross_fare, total_net_fare)
                console.log(response.data.Passengers[0].FirstName)
                connection = await connectToDatabase();

                let [addData] = await flightServices.addFlightBookingData(connection, agentId, total_no_of_pax, totalAdult, totalChild, totalInfant, pnr, booking_date_time, response_json, total_base_fare, total_tax, total_gross_fare, total_net_fare);
                let [getbookingId] = await flightServices.getBookingId(connection)
                let booking_id = getbookingId[0].booking_id
                for (let i = 0; i < response.data.Passengers.length; i++) {
                    let passengerInfo = response.data.Passengers[i]
                    let title = passengerInfo.Title
                    let firstName = passengerInfo.FirstName
                    let lastName = passengerInfo.LastName
                    let paxType = passengerInfo.PaxType
                    let dateOfBirth = passengerInfo.DateOfBirth
                    let passportNo = passengerInfo.PassportDetail.PassportNo
                    let passportExpiry = passengerInfo.PassportDetail.PassportExpiry
                    let passportIssueCountry = passengerInfo.PassportDetail.PassportIssueCountry
                    let barcodes = passengerInfo.BarCodes[0]
                    barcodes = JSON.stringify(barcodes)
                    let origin = response.data.Flights[0].OriginDestination.Departure
                    let destination = response.data.Flights[0].OriginDestination.Arrival
                    let flightNumber = response.data.Flights[0].Segments[0].FlightNumber
                    let flightName = response.data.Flights[0].Segments[0].Carrier
                    let iataCode = response.data.Flights[0].Segments[0].Carrier
                    let departureDate = response.data.Flights[0].OriginDestination.DepartureDateTime
                    let arrivalDate = response.data.Flights[0].OriginDestination.ArrivalDateTime
                    let duration = response.data.Flights[0].OriginDestination.TotalTime
                    let departureTerminal = response.data.Flights[0].Segments[0].DepartureTerminal
                    let arrivalTerminal = response.data.Flights[0].Segments[0].ArrivalTerminal
                    let fareName = response.data.Flights[0].FareName
                    let bookingStatus = "HOLD"
                    let ticketStatus = "HOLD"
                    let [addBookingDetails] = await flightServices.addFlightBookingDetails(connection, booking_id, title, firstName, lastName, paxType, dateOfBirth, passportNo, passportExpiry, passportIssueCountry, barcodes, origin, destination, flightNumber, flightName, iataCode, departureDate, arrivalDate, duration, departureTerminal, arrivalTerminal, fareName, bookingStatus, ticketStatus)
                }

                res.json({error: false, response: response.data, message: "HOLD Successfully", bookingNo: booking_id})
            } catch (e) {
                console.log('-----', e.message)
                return res.send({
                    responseCode: 1,
                    error: true,
                    warning: false,
                    message: "Error Occurred - " + e.message
                });
            } finally {
                if (connection) connection.release();  // Return the connection to the pool
            }


            // res.json({error: false, response: response.data.response, message: "Ticket Successfully"})
        } else {
            res.json({error: true, response: response.data, message: "Ticket Failed"})
        }
    } catch (e) {
        console.log(e);
        res.json({error: true, response: response.data, message: e.message})
    } finally {
        if (connection) connection.release();  // Return the connection to the pool
    }


}

flightController.flightResultsApi = async (req, res) => {
    let {from, to, travelDate, fare_type, adults, child, infants, ResultFareType} = req.body;
    console.log(req.body);

    try {

        let apiUrl = `http://trvlnxtgateway.parikshan.net/api/Availability`;
        let response = await axios.post(apiUrl, {
            "Departure": `${from}`,
            "Arrival": `${to}`,
            "departureDate": `${travelDate}T00:00:00`,
            "cabin": "Y",
            "tripType": "O",
            "preferredAirline": "",
            "paxType": {
                "adult": adults,
                "child": child,
                "infant": infants
            },
            "stop": {
                "oneStop": false,
                "twoStop": false,
                "nonStop": false
            }
        }, {
            headers: {
                'Accept-Encoding': 'gzip, deflate',
                'ApiKey': `VFJBVkVMIERFQUwgT25saW5lIC0gQ1VTVDMwMDcyNA==`,
                'Content-Type': 'application/json'
            }
        });

        req.session.tdate = travelDate;
        if (response.data.ResponseStatusType.Success === true) {
            res.json({
                "ResponseStatus": 1,
                "response": response.data,
                "TraceId": response.data.TrackID
            })
        } else {
            res.json({
                "ResponseStatus": 2,
                "response": response.data,
                "TraceId": ""
            })
        }
    } catch (e) {
        console.log(e)
        res.json({"ResponseStatus": 14, "response": e})
    }
}

flightController.getAllFlights = async (req, res) => {
    try {
        let markup = [];
        let agentMarkup = [];
        console.log(req.body)
        let {from, to, travelDate, fare_type, adults, child, infants, ResultFareType} = req.body;


        let apiUrl = `http://trvlnxtgateway.parikshan.net/api/Availability`;

        let flightClass = ""

        if (parseInt(fare_type) === 2) {
            flightClass = "ECONOMY"
        } else if (parseInt(fare_type) === 6) {
            flightClass = "FIRST CLASS"
        } else if (parseInt(fare_type) === 6) {
            flightClass = "PREMIUM ECONOMY"
        } else {
            flightClass = "BUSINESS"
        }

        const tboRequest = await axios.post(apiUrl, {
            "Departure": `${from}`,
            "Arrival": `${to}`,
            "departureDate": `${travelDate}T00:00:00`,
            "cabin": "Y",
            "tripType": "O",
            "preferredAirline": "",
            "paxType": {
                "adult": adults,
                "child": child,
                "infant": infants
            },
            "stop": {
                "oneStop": false,
                "twoStop": false,
                "nonStop": false
            }
        }, {
            headers: {
                'Accept-Encoding': 'gzip, deflate',
                'ApiKey': `VFJBVkVMIERFQUwgT25saW5lIC0gQ1VTVDMwMDcyNA==`,
                'Content-Type': 'application/json'
            }
        });


        // Execute both requests concurrently and handle individual errors
        const [tboResponse] = await Promise.allSettled([tboRequest]);

        let parsedTBOData = [];


        // Check if Travelopedia API request was successful
        if (tboResponse.status === "fulfilled") {

            if (tboResponse.value.data.ResponseStatusType.Success === true) {
                // Assuming tboResponse.value.data.Response.Results[0] is your flights array

// Group flights by AirlineCode and FlightNumber
                let groupedFlights = tboResponse.value.data.Journeys[0].Flights.reduce((acc, flight) => {

                    let mySegments = flight.Segments;

                    let airlineCode = flight.ValidatingCarrier;
                    let airlineName = flight.SupplierName;
                    let flightNumber = mySegments[0].FlightNumber;
                    let stops = `${mySegments.length - 1} Stops`;
                    let key = `${airlineCode}_${flightNumber}`;
                    // Add segments to the grouped object
                    let deptTime = flight.OriginDestination.DepartureDateTime;
                    let ArrTime = flight.OriginDestination.ArrivalDateTime;

                    let formattedDuration = calculateDuration(deptTime, ArrTime);

                    let Origin = {
                        CityCode: mySegments[0].OriginDestination.Departure,
                        CityName: mySegments[0].OriginDestination.Departure,
                        AirportCode: mySegments[0].OriginDestination.Departure,
                        AirportName: mySegments[0].OriginDestination.Departure,
                        airlineCode: mySegments[0].Carrier,
                        airlineName: mySegments[0].Carrier,
                        Terminal: mySegments[0].DepartureTerminal,
                        FlightNumber: mySegments[0].FlightNumber,
                        DepDateTime: deptTime,
                        DepTime: convertToTime(deptTime),
                        DepDate: convertToDesiredFormat(deptTime),
                        Time: getTimeOfDay(deptTime)
                    }
                    let Destination = {
                        CityCode: mySegments[mySegments.length - 1].OriginDestination.Arrival,
                        CityName: mySegments[mySegments.length - 1].OriginDestination.Arrival,
                        AirportCode: mySegments[mySegments.length - 1].OriginDestination.Arrival,
                        AirportName: mySegments[mySegments.length - 1].OriginDestination.Arrival,
                        Terminal: mySegments[mySegments.length - 1].ArrivalTerminal,
                        airlineCode: mySegments[mySegments.length - 1].Carrier,
                        airlineName: mySegments[mySegments.length - 1].Carrier,
                        FlightNumber: mySegments[mySegments.length - 1].FlightNumber,
                        ArrDateTime: ArrTime,
                        ArrTime: convertToTime(ArrTime),
                        ArrDate: convertToDesiredFormat(ArrTime),
                        Time: getTimeOfDay(ArrTime)
                    }

                    if (!acc[key]) {
                        acc[key] = {
                            Supplier: "RIYA",
                            adults: adults,
                            childs: child,
                            infants: infants,
                            formattedDuration: formattedDuration,
                            Origin: Origin,
                            Stops: stops,
                            Destination: Destination,
                            AirlineCode: airlineCode,
                            AirlineName: airlineName,
                            FlightNumber: flightNumber,
                            Details: []
                        };
                    }


                    let flightDetails = [];
                    // Fix: Wrap the object in parentheses
                    let previousArrivalTime = null;

                    // Add segments
                    let segments = mySegments.map(segment => {
                        let layoverTime = 0;
                        // Calculate layover time only for segments after the first one
                        if (previousArrivalTime) {
                            layoverTime = calculateDuration(previousArrivalTime, segment.OriginDestination.DepartureDateTime); // Add 1 to the calculated duration
                        }

                        // Update previous arrival time for the next iteration
                        previousArrivalTime = segment.OriginDestination.ArrivalDateTime;

                        flightClass = segment?.OriginDestination?.Cabin || 'Not Mentioned'


                        let obj = {
                            ArrivalCityCode: segment.OriginDestination.Arrival,
                            ArrivalCityName: segment.OriginDestination.Arrival,
                            DepartureCityCode: segment.OriginDestination.Departure,
                            DepartureCityName: segment.OriginDestination.Departure,
                            flightClass: flightClass,
                            Baggage: segment.Baggages,
                            FlightNumber: segment.FlightNumber,
                            CabinBaggage: segment.CabinBaggage,
                            AirlineCode: segment.Carrier,
                            AirlineName: segment.Carrier,
                            DepartureAirportCode: segment.OriginDestination.Departure,
                            ArrivalAirportCode: segment.OriginDestination.Arrival,
                            DepartureAirportName: segment.OriginDestination.Departure,
                            ArrivalAirportName: segment.OriginDestination.Arrival,
                            DepDateTime: segment.OriginDestination.DepartureDateTime,
                            ArrDateTime: segment.OriginDestination.ArrivalDateTime,
                            DepTime: convertToTime(segment.OriginDestination.DepartureDateTime),
                            ArrTime: convertToTime(segment.OriginDestination.ArrivalDateTime),
                            DepDate: convertToDesiredFormat(segment.OriginDestination.DepartureDateTime),
                            ArrDate: convertToDesiredFormat(segment.OriginDestination.ArrivalDateTime),
                            Duration: calculateDuration(segment.OriginDestination.DepartureDateTime, segment.OriginDestination.ArrivalDateTime),
                            LayoverTime: layoverTime || 0,
                            DepartureTerminal: segment.DepartureTerminal,
                            ArrivalTerminal: segment.ArrivalTerminal
                        }
                        flightDetails.push(obj);
                    });


                    let fare = flight.FareName;


                    let ResultIndex = flight.FlightKey

                    let k3Tax = 0, yqTax = 0, yrTax = 0, otherTaxesSum = 0;

// Loop through the TaxBreakup array
                    flight?.FlightPricingInfo?.FlightTaxDetails?.forEach(tax => {
                        if (tax?.TaxCode === 'K3') {
                            k3Tax = tax?.TaxAmount;
                        } else if (tax?.TaxCode === 'YQ') {
                            yqTax = tax?.TaxAmount;
                        } else if (tax?.TaxCode === 'YR') {
                            yrTax = tax?.TaxAmount;
                        } else if (tax?.TaxAmount !== 'TotalTax') {
                            // Sum other taxes excluding K3, YQ, YR, and TotalTax
                            otherTaxesSum += tax?.TaxAmount;
                        }
                    });


                    let adultFare = 0;
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

                    for (let i = 0; i < flight.FlightPricingInfo.PaxFareDetails.length; i++) {

                        let paxFare = flight.FlightPricingInfo.PaxFareDetails[i]

                        if (paxFare.PaxType === 'ADT') {

                            adultFare = parseFloat(paxFare.BasicFare) + parseFloat(paxFare.TotalTax)

                            adultBaseFare = parseFloat(paxFare.BasicFare);

                            adultTotaltax = parseFloat(paxFare.TotalTax)

                            paxFare?.PaxTaxDetails?.forEach(tax => {
                                if (tax?.TaxCode === 'K3') {
                                    adultk3Tax = tax?.TaxAmount;
                                } else if (tax?.TaxCode === 'YQ') {
                                    adultyqTax = tax?.TaxAmount;
                                } else if (tax?.TaxCode === 'YR') {
                                    adultyrTax = tax?.TaxAmount;
                                } else if (tax?.TaxAmount !== 'TotalTax') {
                                    // Sum other taxes excluding K3, YQ, YR, and TotalTax
                                    adultTaxesSum += tax?.TaxAmount;
                                }
                            });

                        }

                        if (paxFare.PaxType === 'CHD') {

                            childFare = parseFloat(paxFare.BasicFare) + parseFloat(paxFare.TotalTax)

                            childBasefare = parseFloat(paxFare.BasicFare);

                            childTotalTax = parseFloat(paxFare.TotalTax)

                            paxFare?.PaxTaxDetails?.forEach(tax => {
                                if (tax?.TaxCode === 'K3') {
                                    childk3Tax = tax?.TaxAmount;
                                } else if (tax?.TaxCode === 'YQ') {
                                    childyqTax = tax?.TaxAmount;
                                } else if (tax?.TaxCode === 'YR') {
                                    childyrTax = tax?.TaxAmount;
                                } else if (tax?.TaxAmount !== 'TotalTax') {
                                    // Sum other taxes excluding K3, YQ, YR, and TotalTax
                                    childTaxesSum += tax?.TaxAmount;
                                }
                            });

                        }
                        if (paxFare.PaxType === 'INF') {

                            infantFare = parseFloat(paxFare.BasicFare) + parseFloat(paxFare.TotalTax)

                            infantBaseFare = parseFloat(paxFare.BasicFare);

                            infantTotalTax = parseFloat(paxFare.TotalTax)

                            paxFare?.PaxTaxDetails?.forEach(tax => {
                                if (tax?.TaxCode === 'K3') {
                                    infantk3Tax = tax?.TaxAmount;
                                } else if (tax?.TaxCode === 'YQ') {
                                    infantyqTax = tax?.TaxAmount;
                                } else if (tax?.TaxCode === 'YR') {
                                    infantyrTax = tax?.TaxAmount;
                                } else if (tax?.TaxAmount !== 'TotalTax') {
                                    // Sum other taxes excluding K3, YQ, YR, and TotalTax
                                    infantTaxesSum += tax?.TaxAmount;
                                }
                            });

                        }
                    }

                    // let fareDifference = parseFloat(flight.Fare.PublishedFare) - parseFloat(flight.Fare.OfferedFare);

                    // let markup_type = (fareDifference > 0) ? 'PLB' : 'Non PLB';

                    // let markup_value = 0, markup_percentage = 0;

                    // let journey_type = (markup?.[0]?.CountryCode === 'IN') ? 'Domestic' : 'International';


                    let commission = parseFloat(flight.GrossFare) - parseFloat(flight.NetAmount)

                    let tds = (parseInt(commission) === 0) ? 0 : (commission * 5 / 100).toFixed(2);

                    let fareBreakup = {
                        BaseFare: flight.BasicFare,
                        totalTax: flight.TotalTax,
                        k3Tax: k3Tax,
                        yqTax: yqTax,
                        yrTax: yrTax,
                        otherTaxesSum: otherTaxesSum,
                        PublishedFare: parseFloat(flight.TotalFare),
                        CommissionEarned: commission,
                        TdsOnCommission: tds,
                        IncentiveEarned: 0,
                        OfferedFare: flight.NetAmount,
                        Discount: 0,
                        ServiceFee: 0,
                        OtherCharges: 0,
                        Adult: {
                            adultBaseFare: adultBaseFare,
                            adultTotaltax: adultTotaltax,
                            adultyqTax: adultyqTax,
                            adultk3Tax: adultk3Tax,
                            adultyrTax: adultyrTax,
                            adultTaxesSum: adultTaxesSum
                        },
                        child: {
                            childBaseFare: childBasefare,
                            childTotalTax: childTotalTax,
                            childyqTax: childyqTax,
                            childk3Tax: childk3Tax,
                            childyrTax: childyrTax,
                            childTaxesSum: childTaxesSum
                        },
                        infant: {
                            infantBaseFare: infantBaseFare,
                            infantTotalTax: infantTotalTax,
                            infantyqTax: infantyqTax,
                            infantk3Tax: infantk3Tax,
                            infantyrTax: infantyrTax,
                            infantTaxesSum: infantTaxesSum
                        }
                    }

                    let Baggage = {
                        Baggage: `${mySegments[0].Baggage.Weight}-${mySegments[0].Baggage.Unit}`,
                        CabinBaggage: mySegments[0].CabinBaggage
                    }


                    acc[key].Details.push({
                        flightDetails,
                        fare: fare,
                        FareBreakup: fareBreakup,
                        Baggage: Baggage,
                        ResultIndex: ResultIndex
                    });


                    return acc;
                }, {});


// Convert grouped flights object to array
                parsedTBOData = Object.values(groupedFlights).map(group => {
                    return {
                        Supplier: group.Supplier,
                        adults: group.adults,
                        childs: group.childs,
                        infants: group.infants,
                        Stops: group.Stops,
                        TraceId: tboResponse.value.data.TrackID,
                        totalDuration: group.formattedDuration,
                        Origin: group.Origin,
                        Destination: group.Destination,
                        AirlineCode: group.AirlineCode,
                        AirlineName: group.AirlineName,
                        FlightNumber: group.FlightNumber,
                        Segments: group.Details
                    };
                });


            }


        }


        // Combine parsed data
        const combinedResponse = {
            ResponseStatus: 1,
            data: [...parsedTBOData]
        };

        req.session.tdate = travelDate;

        res.json(combinedResponse);

    } catch (e) {
        console.log(e);
        res.json({
            ResponseStatus: 14,
            response: e.message
        });
    }
};


flightController.getAllFlightsRound = async (req, res) => {
    try {
        let markup = [];
        let agentMarkup = [];
        console.log(req.body)
        let {from, to, travelDate, travelReturnDate, fare_type, adults, child, infants, ResultFareType} = req.body;

        let connection ;

        try{
            const connection = await connectToDatabase();
            const [country] = await flightServices.GetCountry(connection,from,to)
        }


        let apiUrl = `http://trvlnxtgateway.parikshan.net/api/Availability`;

        let flightClass = ""

        if (parseInt(fare_type) === 2) {
            flightClass = "ECONOMY"
        } else if (parseInt(fare_type) === 6) {
            flightClass = "FIRST CLASS"
        } else if (parseInt(fare_type) === 6) {
            flightClass = "PREMIUM ECONOMY"
        } else {
            flightClass = "BUSINESS"
        }

        const tboRequest = await axios.post(apiUrl, {
            "Departure": `${from}`,
            "Arrival": `${to}`,
            "departureDate": `${travelDate}T00:00:00`,
            "arrivalDate": `${travelReturnDate}T00:00:00`,
            "cabin": "Y",
            "tripType": "R",
            "preferredAirline": "",
            "paxType": {
                "adult": adults,
                "child": child,
                "infant": infants
            },
            "stop": {
                "oneStop": false,
                "twoStop": false,
                "nonStop": false
            }
        }, {
            headers: {
                'Accept-Encoding': 'gzip, deflate',
                'ApiKey': `VFJBVkVMIERFQUwgT25saW5lIC0gQ1VTVDMwMDcyNA==`,
                'Content-Type': 'application/json'
            }
        });


        // Execute both requests concurrently and handle individual errors
        const [tboResponse] = await Promise.allSettled([tboRequest]);

        let parsedTBOData = [];


        // Check if Travelopedia API request was successful
        if (tboResponse.status === "fulfilled") {

            if (tboResponse.value.data.ResponseStatusType.Success === true) {
                // Assuming tboResponse.value.data.Response.Results[0] is your flights array

// Group flights by AirlineCode and FlightNumber
                let groupedFlights = tboResponse.value.data.Journeys[0].Flights.reduce((acc, flight) => {

                    let mySegments = flight.Segments;

                    let airlineCode = flight.ValidatingCarrier;
                    let airlineName = flight.SupplierName;
                    let flightNumber = mySegments[0].FlightNumber;
                    let stops = `${mySegments.length - 1} Stops`;
                    let key = `${airlineCode}_${flightNumber}`;
                    // Add segments to the grouped object
                    let deptTime = flight.OriginDestination.DepartureDateTime;
                    let ArrTime = flight.OriginDestination.ArrivalDateTime;

                    let formattedDuration = calculateDuration(deptTime, ArrTime);

                    let Origin = {
                        CityCode: mySegments[0].OriginDestination.Departure,
                        CityName: mySegments[0].OriginDestination.Departure,
                        AirportCode: mySegments[0].OriginDestination.Departure,
                        AirportName: mySegments[0].OriginDestination.Departure,
                        airlineCode: mySegments[0].Carrier,
                        airlineName: mySegments[0].Carrier,
                        Terminal: mySegments[0].DepartureTerminal,
                        FlightNumber: mySegments[0].FlightNumber,
                        DepDateTime: deptTime,
                        DepTime: convertToTime(deptTime),
                        DepDate: convertToDesiredFormat(deptTime),
                        Time: getTimeOfDay(deptTime)
                    }
                    let Destination = {
                        CityCode: mySegments[mySegments.length - 1].OriginDestination.Arrival,
                        CityName: mySegments[mySegments.length - 1].OriginDestination.Arrival,
                        AirportCode: mySegments[mySegments.length - 1].OriginDestination.Arrival,
                        AirportName: mySegments[mySegments.length - 1].OriginDestination.Arrival,
                        Terminal: mySegments[mySegments.length - 1].ArrivalTerminal,
                        airlineCode: mySegments[mySegments.length - 1].Carrier,
                        airlineName: mySegments[mySegments.length - 1].Carrier,
                        FlightNumber: mySegments[mySegments.length - 1].FlightNumber,
                        ArrDateTime: ArrTime,
                        ArrTime: convertToTime(ArrTime),
                        ArrDate: convertToDesiredFormat(ArrTime),
                        Time: getTimeOfDay(ArrTime)
                    }

                    if (!acc[key]) {
                        acc[key] = {
                            Supplier: "RIYA",
                            adults: adults,
                            childs: child,
                            infants: infants,
                            formattedDuration: formattedDuration,
                            Origin: Origin,
                            Stops: stops,
                            Destination: Destination,
                            AirlineCode: airlineCode,
                            AirlineName: airlineName,
                            FlightNumber: flightNumber,
                            Details: []
                        };
                    }


                    let flightDetails = [];
                    // Fix: Wrap the object in parentheses
                    let previousArrivalTime = null;

                    // Add segments
                    let segments = mySegments.map(segment => {
                        let layoverTime = 0;
                        // Calculate layover time only for segments after the first one
                        if (previousArrivalTime) {
                            layoverTime = calculateDuration(previousArrivalTime, segment.OriginDestination.DepartureDateTime); // Add 1 to the calculated duration
                        }

                        // Update previous arrival time for the next iteration
                        previousArrivalTime = segment.OriginDestination.ArrivalDateTime;

                        flightClass = segment?.OriginDestination?.Cabin || 'Not Mentioned'


                        let obj = {
                            ArrivalCityCode: segment.OriginDestination.Arrival,
                            ArrivalCityName: segment.OriginDestination.Arrival,
                            DepartureCityCode: segment.OriginDestination.Departure,
                            DepartureCityName: segment.OriginDestination.Departure,
                            flightClass: flightClass,
                            Baggage: segment.Baggages,
                            FlightNumber: segment.FlightNumber,
                            CabinBaggage: segment.CabinBaggage,
                            AirlineCode: segment.Carrier,
                            AirlineName: segment.Carrier,
                            DepartureAirportCode: segment.OriginDestination.Departure,
                            ArrivalAirportCode: segment.OriginDestination.Arrival,
                            DepartureAirportName: segment.OriginDestination.Departure,
                            ArrivalAirportName: segment.OriginDestination.Arrival,
                            DepDateTime: segment.OriginDestination.DepartureDateTime,
                            ArrDateTime: segment.OriginDestination.ArrivalDateTime,
                            DepTime: convertToTime(segment.OriginDestination.DepartureDateTime),
                            ArrTime: convertToTime(segment.OriginDestination.ArrivalDateTime),
                            DepDate: convertToDesiredFormat(segment.OriginDestination.DepartureDateTime),
                            ArrDate: convertToDesiredFormat(segment.OriginDestination.ArrivalDateTime),
                            Duration: calculateDuration(segment.OriginDestination.DepartureDateTime, segment.OriginDestination.ArrivalDateTime),
                            LayoverTime: layoverTime || 0,
                            DepartureTerminal: segment.DepartureTerminal,
                            ArrivalTerminal: segment.ArrivalTerminal
                        }
                        flightDetails.push(obj);
                    });


                    let fare = flight.FareName;


                    let ResultIndex = flight.FlightKey

                    let k3Tax = 0, yqTax = 0, yrTax = 0, otherTaxesSum = 0;

// Loop through the TaxBreakup array
                    flight?.FlightPricingInfo?.FlightTaxDetails?.forEach(tax => {
                        if (tax?.TaxCode === 'K3') {
                            k3Tax = tax?.TaxAmount;
                        } else if (tax?.TaxCode === 'YQ') {
                            yqTax = tax?.TaxAmount;
                        } else if (tax?.TaxCode === 'YR') {
                            yrTax = tax?.TaxAmount;
                        } else if (tax?.TaxAmount !== 'TotalTax') {
                            // Sum other taxes excluding K3, YQ, YR, and TotalTax
                            otherTaxesSum += tax?.TaxAmount;
                        }
                    });


                    let adultFare = 0;
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

                    for (let i = 0; i < flight.FlightPricingInfo.PaxFareDetails.length; i++) {

                        let paxFare = flight.FlightPricingInfo.PaxFareDetails[i]

                        if (paxFare.PaxType === 'ADT') {

                            adultFare = parseFloat(paxFare.BasicFare) + parseFloat(paxFare.TotalTax)

                            adultBaseFare = parseFloat(paxFare.BasicFare);

                            adultTotaltax = parseFloat(paxFare.TotalTax)

                            paxFare?.PaxTaxDetails?.forEach(tax => {
                                if (tax?.TaxCode === 'K3') {
                                    adultk3Tax = tax?.TaxAmount;
                                } else if (tax?.TaxCode === 'YQ') {
                                    adultyqTax = tax?.TaxAmount;
                                } else if (tax?.TaxCode === 'YR') {
                                    adultyrTax = tax?.TaxAmount;
                                } else if (tax?.TaxAmount !== 'TotalTax') {
                                    // Sum other taxes excluding K3, YQ, YR, and TotalTax
                                    adultTaxesSum += tax?.TaxAmount;
                                }
                            });

                        }

                        if (paxFare.PaxType === 'CHD') {

                            childFare = parseFloat(paxFare.BasicFare) + parseFloat(paxFare.TotalTax)

                            childBasefare = parseFloat(paxFare.BasicFare);

                            childTotalTax = parseFloat(paxFare.TotalTax)

                            paxFare?.PaxTaxDetails?.forEach(tax => {
                                if (tax?.TaxCode === 'K3') {
                                    childk3Tax = tax?.TaxAmount;
                                } else if (tax?.TaxCode === 'YQ') {
                                    childyqTax = tax?.TaxAmount;
                                } else if (tax?.TaxCode === 'YR') {
                                    childyrTax = tax?.TaxAmount;
                                } else if (tax?.TaxAmount !== 'TotalTax') {
                                    // Sum other taxes excluding K3, YQ, YR, and TotalTax
                                    childTaxesSum += tax?.TaxAmount;
                                }
                            });

                        }
                        if (paxFare.PaxType === 'INF') {

                            infantFare = parseFloat(paxFare.BasicFare) + parseFloat(paxFare.TotalTax)

                            infantBaseFare = parseFloat(paxFare.BasicFare);

                            infantTotalTax = parseFloat(paxFare.TotalTax)

                            paxFare?.PaxTaxDetails?.forEach(tax => {
                                if (tax?.TaxCode === 'K3') {
                                    infantk3Tax = tax?.TaxAmount;
                                } else if (tax?.TaxCode === 'YQ') {
                                    infantyqTax = tax?.TaxAmount;
                                } else if (tax?.TaxCode === 'YR') {
                                    infantyrTax = tax?.TaxAmount;
                                } else if (tax?.TaxAmount !== 'TotalTax') {
                                    // Sum other taxes excluding K3, YQ, YR, and TotalTax
                                    infantTaxesSum += tax?.TaxAmount;
                                }
                            });

                        }
                    }

                    // let fareDifference = parseFloat(flight.Fare.PublishedFare) - parseFloat(flight.Fare.OfferedFare);

                    // let markup_type = (fareDifference > 0) ? 'PLB' : 'Non PLB';

                    // let markup_value = 0, markup_percentage = 0;

                    // let journey_type = (markup?.[0]?.CountryCode === 'IN') ? 'Domestic' : 'International';


                    let commission = parseFloat(flight.GrossFare) - parseFloat(flight.NetAmount)

                    let tds = (parseInt(commission) === 0) ? 0 : (commission * 5 / 100).toFixed(2);

                    let fareBreakup = {
                        BaseFare: flight.BasicFare,
                        totalTax: flight.TotalTax,
                        k3Tax: k3Tax,
                        yqTax: yqTax,
                        yrTax: yrTax,
                        otherTaxesSum: otherTaxesSum,
                        PublishedFare: parseFloat(flight.TotalFare),
                        CommissionEarned: commission,
                        TdsOnCommission: tds,
                        IncentiveEarned: 0,
                        OfferedFare: flight.NetAmount,
                        Discount: 0,
                        ServiceFee: 0,
                        OtherCharges: 0,
                        Adult: {
                            adultBaseFare: adultBaseFare,
                            adultTotaltax: adultTotaltax,
                            adultyqTax: adultyqTax,
                            adultk3Tax: adultk3Tax,
                            adultyrTax: adultyrTax,
                            adultTaxesSum: adultTaxesSum
                        },
                        child: {
                            childBaseFare: childBasefare,
                            childTotalTax: childTotalTax,
                            childyqTax: childyqTax,
                            childk3Tax: childk3Tax,
                            childyrTax: childyrTax,
                            childTaxesSum: childTaxesSum
                        },
                        infant: {
                            infantBaseFare: infantBaseFare,
                            infantTotalTax: infantTotalTax,
                            infantyqTax: infantyqTax,
                            infantk3Tax: infantk3Tax,
                            infantyrTax: infantyrTax,
                            infantTaxesSum: infantTaxesSum
                        }
                    }

                    let Baggage = {
                        Baggage: `${mySegments[0].Baggage.Weight}-${mySegments[0].Baggage.Unit}`,
                        CabinBaggage: mySegments[0].CabinBaggage
                    }


                    acc[key].Details.push({
                        flightDetails,
                        fare: fare,
                        FareBreakup: fareBreakup,
                        Baggage: Baggage,
                        ResultIndex: ResultIndex
                    });


                    return acc;
                }, {});

                let groupedReturnFlights = tboResponse.value.data.Journeys[1].Flights.reduce((acc, flight) => {

                    let mySegments = flight.Segments;

                    let airlineCode = flight.ValidatingCarrier;
                    let airlineName = flight.SupplierName;
                    let flightNumber = mySegments[0].FlightNumber;
                    let stops = `${mySegments.length - 1} Stops`;
                    let key = `${airlineCode}_${flightNumber}`;
                    // Add segments to the grouped object
                    let deptTime = flight.OriginDestination.DepartureDateTime;
                    let ArrTime = flight.OriginDestination.ArrivalDateTime;

                    let formattedDuration = calculateDuration(deptTime, ArrTime);

                    let Origin = {
                        CityCode: mySegments[0].OriginDestination.Departure,
                        CityName: mySegments[0].OriginDestination.Departure,
                        AirportCode: mySegments[0].OriginDestination.Departure,
                        AirportName: mySegments[0].OriginDestination.Departure,
                        airlineCode: mySegments[0].Carrier,
                        airlineName: mySegments[0].Carrier,
                        Terminal: mySegments[0].DepartureTerminal,
                        FlightNumber: mySegments[0].FlightNumber,
                        DepDateTime: deptTime,
                        DepTime: convertToTime(deptTime),
                        DepDate: convertToDesiredFormat(deptTime),
                        Time: getTimeOfDay(deptTime)
                    }
                    let Destination = {
                        CityCode: mySegments[mySegments.length - 1].OriginDestination.Arrival,
                        CityName: mySegments[mySegments.length - 1].OriginDestination.Arrival,
                        AirportCode: mySegments[mySegments.length - 1].OriginDestination.Arrival,
                        AirportName: mySegments[mySegments.length - 1].OriginDestination.Arrival,
                        Terminal: mySegments[mySegments.length - 1].ArrivalTerminal,
                        airlineCode: mySegments[mySegments.length - 1].Carrier,
                        airlineName: mySegments[mySegments.length - 1].Carrier,
                        FlightNumber: mySegments[mySegments.length - 1].FlightNumber,
                        ArrDateTime: ArrTime,
                        ArrTime: convertToTime(ArrTime),
                        ArrDate: convertToDesiredFormat(ArrTime),
                        Time: getTimeOfDay(ArrTime)
                    }

                    if (!acc[key]) {
                        acc[key] = {
                            Supplier: "RIYA",
                            adults: adults,
                            childs: child,
                            infants: infants,
                            formattedDuration: formattedDuration,
                            Origin: Origin,
                            Stops: stops,
                            Destination: Destination,
                            AirlineCode: airlineCode,
                            AirlineName: airlineName,
                            FlightNumber: flightNumber,
                            Details: []
                        };
                    }


                    let flightDetails = [];
                    // Fix: Wrap the object in parentheses
                    let previousArrivalTime = null;

                    // Add segments
                    let segments = mySegments.map(segment => {
                        let layoverTime = 0;
                        // Calculate layover time only for segments after the first one
                        if (previousArrivalTime) {
                            layoverTime = calculateDuration(previousArrivalTime, segment.OriginDestination.DepartureDateTime); // Add 1 to the calculated duration
                        }

                        // Update previous arrival time for the next iteration
                        previousArrivalTime = segment.OriginDestination.ArrivalDateTime;

                        flightClass = segment?.OriginDestination?.Cabin || 'Not Mentioned'


                        let obj = {
                            ArrivalCityCode: segment.OriginDestination.Arrival,
                            ArrivalCityName: segment.OriginDestination.Arrival,
                            DepartureCityCode: segment.OriginDestination.Departure,
                            DepartureCityName: segment.OriginDestination.Departure,
                            flightClass: flightClass,
                            Baggage: segment.Baggages,
                            FlightNumber: segment.FlightNumber,
                            CabinBaggage: segment.CabinBaggage,
                            AirlineCode: segment.Carrier,
                            AirlineName: segment.Carrier,
                            DepartureAirportCode: segment.OriginDestination.Departure,
                            ArrivalAirportCode: segment.OriginDestination.Arrival,
                            DepartureAirportName: segment.OriginDestination.Departure,
                            ArrivalAirportName: segment.OriginDestination.Arrival,
                            DepDateTime: segment.OriginDestination.DepartureDateTime,
                            ArrDateTime: segment.OriginDestination.ArrivalDateTime,
                            DepTime: convertToTime(segment.OriginDestination.DepartureDateTime),
                            ArrTime: convertToTime(segment.OriginDestination.ArrivalDateTime),
                            DepDate: convertToDesiredFormat(segment.OriginDestination.DepartureDateTime),
                            ArrDate: convertToDesiredFormat(segment.OriginDestination.ArrivalDateTime),
                            Duration: calculateDuration(segment.OriginDestination.DepartureDateTime, segment.OriginDestination.ArrivalDateTime),
                            LayoverTime: layoverTime || 0,
                            DepartureTerminal: segment.DepartureTerminal,
                            ArrivalTerminal: segment.ArrivalTerminal
                        }
                        flightDetails.push(obj);
                    });


                    let fare = flight.FareName;


                    let ResultIndex = flight.FlightKey

                    let k3Tax = 0, yqTax = 0, yrTax = 0, otherTaxesSum = 0;

// Loop through the TaxBreakup array
                    flight?.FlightPricingInfo?.FlightTaxDetails?.forEach(tax => {
                        if (tax?.TaxCode === 'K3') {
                            k3Tax = tax?.TaxAmount;
                        } else if (tax?.TaxCode === 'YQ') {
                            yqTax = tax?.TaxAmount;
                        } else if (tax?.TaxCode === 'YR') {
                            yrTax = tax?.TaxAmount;
                        } else if (tax?.TaxAmount !== 'TotalTax') {
                            // Sum other taxes excluding K3, YQ, YR, and TotalTax
                            otherTaxesSum += tax?.TaxAmount;
                        }
                    });


                    let adultFare = 0;
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

                    for (let i = 0; i < flight.FlightPricingInfo.PaxFareDetails.length; i++) {

                        let paxFare = flight.FlightPricingInfo.PaxFareDetails[i]

                        if (paxFare.PaxType === 'ADT') {

                            adultFare = parseFloat(paxFare.BasicFare) + parseFloat(paxFare.TotalTax)

                            adultBaseFare = parseFloat(paxFare.BasicFare);

                            adultTotaltax = parseFloat(paxFare.TotalTax)

                            paxFare?.PaxTaxDetails?.forEach(tax => {
                                if (tax?.TaxCode === 'K3') {
                                    adultk3Tax = tax?.TaxAmount;
                                } else if (tax?.TaxCode === 'YQ') {
                                    adultyqTax = tax?.TaxAmount;
                                } else if (tax?.TaxCode === 'YR') {
                                    adultyrTax = tax?.TaxAmount;
                                } else if (tax?.TaxAmount !== 'TotalTax') {
                                    // Sum other taxes excluding K3, YQ, YR, and TotalTax
                                    adultTaxesSum += tax?.TaxAmount;
                                }
                            });

                        }

                        if (paxFare.PaxType === 'CHD') {

                            childFare = parseFloat(paxFare.BasicFare) + parseFloat(paxFare.TotalTax)

                            childBasefare = parseFloat(paxFare.BasicFare);

                            childTotalTax = parseFloat(paxFare.TotalTax)

                            paxFare?.PaxTaxDetails?.forEach(tax => {
                                if (tax?.TaxCode === 'K3') {
                                    childk3Tax = tax?.TaxAmount;
                                } else if (tax?.TaxCode === 'YQ') {
                                    childyqTax = tax?.TaxAmount;
                                } else if (tax?.TaxCode === 'YR') {
                                    childyrTax = tax?.TaxAmount;
                                } else if (tax?.TaxAmount !== 'TotalTax') {
                                    // Sum other taxes excluding K3, YQ, YR, and TotalTax
                                    childTaxesSum += tax?.TaxAmount;
                                }
                            });

                        }
                        if (paxFare.PaxType === 'INF') {

                            infantFare = parseFloat(paxFare.BasicFare) + parseFloat(paxFare.TotalTax)

                            infantBaseFare = parseFloat(paxFare.BasicFare);

                            infantTotalTax = parseFloat(paxFare.TotalTax)

                            paxFare?.PaxTaxDetails?.forEach(tax => {
                                if (tax?.TaxCode === 'K3') {
                                    infantk3Tax = tax?.TaxAmount;
                                } else if (tax?.TaxCode === 'YQ') {
                                    infantyqTax = tax?.TaxAmount;
                                } else if (tax?.TaxCode === 'YR') {
                                    infantyrTax = tax?.TaxAmount;
                                } else if (tax?.TaxAmount !== 'TotalTax') {
                                    // Sum other taxes excluding K3, YQ, YR, and TotalTax
                                    infantTaxesSum += tax?.TaxAmount;
                                }
                            });

                        }
                    }

                    // let fareDifference = parseFloat(flight.Fare.PublishedFare) - parseFloat(flight.Fare.OfferedFare);

                    // let markup_type = (fareDifference > 0) ? 'PLB' : 'Non PLB';

                    // let markup_value = 0, markup_percentage = 0;

                    // let journey_type = (markup?.[0]?.CountryCode === 'IN') ? 'Domestic' : 'International';


                    let commission = parseFloat(flight.GrossFare) - parseFloat(flight.NetAmount)

                    let tds = (parseInt(commission) === 0) ? 0 : (commission * 5 / 100).toFixed(2);

                    let fareBreakup = {
                        BaseFare: flight.BasicFare,
                        totalTax: flight.TotalTax,
                        k3Tax: k3Tax,
                        yqTax: yqTax,
                        yrTax: yrTax,
                        otherTaxesSum: otherTaxesSum,
                        PublishedFare: parseFloat(flight.TotalFare),
                        CommissionEarned: commission,
                        TdsOnCommission: tds,
                        IncentiveEarned: 0,
                        OfferedFare: flight.NetAmount,
                        Discount: 0,
                        ServiceFee: 0,
                        OtherCharges: 0,
                        Adult: {
                            adultBaseFare: adultBaseFare,
                            adultTotaltax: adultTotaltax,
                            adultyqTax: adultyqTax,
                            adultk3Tax: adultk3Tax,
                            adultyrTax: adultyrTax,
                            adultTaxesSum: adultTaxesSum
                        },
                        child: {
                            childBaseFare: childBasefare,
                            childTotalTax: childTotalTax,
                            childyqTax: childyqTax,
                            childk3Tax: childk3Tax,
                            childyrTax: childyrTax,
                            childTaxesSum: childTaxesSum
                        },
                        infant: {
                            infantBaseFare: infantBaseFare,
                            infantTotalTax: infantTotalTax,
                            infantyqTax: infantyqTax,
                            infantk3Tax: infantk3Tax,
                            infantyrTax: infantyrTax,
                            infantTaxesSum: infantTaxesSum
                        }
                    }

                    let Baggage = {
                        Baggage: `${mySegments[0].Baggage.Weight}-${mySegments[0].Baggage.Unit}`,
                        CabinBaggage: mySegments[0].CabinBaggage
                    }


                    acc[key].Details.push({
                        flightDetails,
                        fare: fare,
                        FareBreakup: fareBreakup,
                        Baggage: Baggage,
                        ResultIndex: ResultIndex
                    });


                    return acc;
                }, {});


// Convert grouped flights object to array
                let onwardFlights = Object.values(groupedFlights).map(group => {
                    return {
                        Supplier: group.Supplier,
                        adults: group.adults,
                        childs: group.childs,
                        infants: group.infants,
                        Stops: group.Stops,
                        TraceId: tboResponse.value.data.TrackID,
                        totalDuration: group.formattedDuration,
                        Origin: group.Origin,
                        Destination: group.Destination,
                        AirlineCode: group.AirlineCode,
                        AirlineName: group.AirlineName,
                        FlightNumber: group.FlightNumber,
                        Segments: group.Details
                    };
                });

                let returnFlights = Object.values(groupedReturnFlights).map(group => {
                    return {
                        Supplier: group.Supplier,
                        adults: group.adults,
                        childs: group.childs,
                        infants: group.infants,
                        Stops: group.Stops,
                        TraceId: tboResponse.value.data.TrackID,
                        totalDuration: group.formattedDuration,
                        Origin: group.Origin,
                        Destination: group.Destination,
                        AirlineCode: group.AirlineCode,
                        AirlineName: group.AirlineName,
                        FlightNumber: group.FlightNumber,
                        Segments: group.Details
                    };
                });

                parsedTBOData = {
                    onwardFlights,
                    returnFlights
                }

            }


        }


        // Combine parsed data
        const combinedResponse = {
            ResponseStatus: 1,
            response: {data: parsedTBOData},
            data: parsedTBOData
        };

        req.session.tdate = travelDate;

        res.json(combinedResponse);

    } catch (e) {
        console.log(e);
        res.json({
            ResponseStatus: 14,
            response: e.message
        });
    }
};

function calculateDuration(deptTime, arrTime) {
    const departure = new Date(deptTime);
    const arrival = new Date(arrTime);

    // Calculate the difference in milliseconds
    const durationMs = arrival - departure;

    // Convert milliseconds to hours and minutes
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

    return {hours, minutes};
}

function convertToTime(dateString) {
    // Parse the input date string
    const date = new Date(dateString);

    // Extract hours and minutes and format as "HH:MM"
    const hours = String(date.getHours()).padStart(2, '0');  // Pad with '0' if necessary
    const minutes = String(date.getMinutes()).padStart(2, '0');  // Pad with '0' if necessary

    return `${hours}:${minutes}`;
}

function convertToDesiredFormat(dateString) {
    // Parse the input date string
    const date = new Date(dateString);

    // Format: "16 Sep, 2024"
    const options = {day: '2-digit', month: 'short', year: 'numeric'};
    const formattedDate = date.toLocaleDateString('en-GB', options);

    return formattedDate;
}

function formatDuration(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);  // Get the number of full hours
    const minutes = totalMinutes % 60;  // Get the remaining minutes

    return {hours, minutes};
}

function getTimeOfDay(dateTimeString) {
    const date = new Date(dateTimeString);
    const hours = date.getHours();

    if (hours >= 0 && hours < 6) {
        return 'Night';
    } else if (hours >= 6 && hours < 12) {
        return 'Early Morning';
    } else if (hours >= 12 && hours < 17) {
        return 'Afternoon';
    } else if (hours >= 17 && hours < 21) {
        return 'Evening';
    } else {
        return 'Night';
    }
}

flightController.roundFlightResultsApi = async (req, res) => {
    let {from, to, travelDate, travelReturnDate, fare_type, adults, child, infants, ResultFareType} = req.body;
    console.log(req.body);

    try {

        let apiUrl = `http://trvlnxtgateway.parikshan.net/api/Availability`;
        let response = await axios.post(apiUrl, {
            "Departure": `${from}`,
            "Arrival": `${to}`,
            "departureDate": `${travelDate}T00:00:00`,
            "arrivalDate": `${travelReturnDate}T00:00:00`,
            "cabin": "Y",
            "tripType": "R",
            "preferredAirline": "",
            "paxType": {
                "adult": adults,
                "child": child,
                "infant": infants
            },
            "stop": {
                "oneStop": false,
                "twoStop": false,
                "nonStop": false
            }
        }, {
            headers: {
                'Accept-Encoding': 'gzip, deflate',
                'ApiKey': `VFJBVkVMIERFQUwgT25saW5lIC0gQ1VTVDMwMDcyNA==`,
                'Content-Type': 'application/json'
            }
        });

        req.session.tdate = travelReturnDate;
        if (response.data.ResponseStatusType.Success === true) {
            res.json({
                "ResponseStatus": 1,
                "travelDate": travelDate,
                "travelReturnDate": travelReturnDate,
                "from": from,
                "to": to,
                "response": response.data,
                "TraceId": response.data.TrackID
            })
        } else {
            res.json({
                "ResponseStatus": 2,
                "travelDate": travelDate,
                "travelReturnDate": travelReturnDate,
                "from": from,
                "to": to,
                "response": response.data,
                "TraceId": ""
            })
        }
    } catch (e) {
        console.log(e)
        res.json({
            "ResponseStatus": 14, "travelDate": travelDate,
            "travelReturnDate": travelReturnDate,
            "from": from,
            "to": to, "response": e
        })
    }
}
flightController.agentSearchLogs = async (req, res) => {
    console.log(req.body)
    let {agentId} = req.agent
    const {adults, child, infants, ResultFareType, travelDate, travelReturnDate, fare_type, from, to, trip} = req.body;
    let connection;
    try {
        const search_date_time = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
        const connection = await connectToDatabase();

        const [data] = await flightServices.agentSearchLogs(connection,
            agentId,
            adults,
            child,
            infants,
            ResultFareType,
            travelDate,
            travelReturnDate,
            fare_type,
            from,
            to,
            trip,
            search_date_time
        );

        return res.json({error: false, message: "DATA inserted sUCCESSFULLY"});
    } catch (e) {
        console.log(e);
        return res.json({error: true, message: e.message});
    } finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}

flightController.allCities = async (req, res) => {
    let connection
    try {
        const {q} = req.body

        connection = await connectToDatabase();
        // const password = generatePassword(8);

        let [data] = await flightServices.airlines(connection, q);
        console.log(data);
        return res.json({data});
    } catch (err) {
        console.log(err)
        res.json({error: true, message: err});
    } finally {
        if (connection) connection.release();  // Return the connection to the pool
    }

}

flightController.makeSearchingSession = async (req, res) => {
    let tdate = req.session.tdate;
    req.session.agentEmail = req.agent.agentEmail;

    req.session.traceId = req.body.traceId;
    console.log(req.session.agentEmail);
    console.log(req.session.traceId)
    const connection = await connectToDatabase();

    try {


        const [checkResult] = await flightServices.checkSearchingSession(connection, req.body.traceId, req.agent.agentEmail)

        if (checkResult.length > 0) {
            // Update existing record

            const [data] = await flightServices.updateSearchingSession(connection,
                req.body.markup,
                JSON.stringify(req.body.book),
                req.body.platformFee,
                req.body.platformTax,
                JSON.stringify(req.body.returnBook),
                req.body.returnMarkup,
                req.body.returnId,
                req.body.traceId,
                req.agent.agentEmail,
            );
        } else {
            // Insert new record
            const [data] = await flightServices.insertSearchingSession(connection,
                req.agent.agentEmail,
                req.body.traceId,
                req.body.markup,
                JSON.stringify(req.body.book),
                req.body.platformFee,
                req.body.platformTax,
                JSON.stringify(req.body.returnBook),
                req.body.returnMarkup,
                req.body.returnId
            );
        }


        req.session.test = req.body;
        res.status(200).send('Redirecting...');
    } catch (error) {
        // Handle error
        console.error('Error:', error);

        res.status(500).send('Internal Server Error');
    } finally {
        await connection.close();
    }
};
//--------------------------------------------------------------------------
//
// flightController.searchPage = (req, res) => {
//     res.render("flights/searchPage", {agentEmail: req.agent.agentEmail})
// }
// flightController.flightResults = (req, res) => {
//
//     res.render("flights/searchResults", {agentEmail: req.agent.agentEmail})
// }
flightController.ViewTicketedBookings = (req, res) => {
    res.render("flights/ticketedBookings", {agentEmail: req.agent.agentEmail,userType: req.agent.userType})
}

flightController.ViewHoldBookings = (req, res) => {
    res.render("flights/holdBookings", {agentEmail: req.agent.agentEmail,userType: req.agent.userType})
}


// flightController.getAllFlights=async(req,res) => {
//     console.log(req.body)
//     try{
//         let{from, to, travelDate, fare_type, adults, child, infants}=req.body
//         let response=''
//         let apiUrl = `http://157.119.40.184/flights/getAllFlights`;

//         response = await axios.post(apiUrl,{
//             from: from,
//             to:to,
//             travelDate:travelDate,
//             fare_type:fare_type,
//             adults:adults,
//             child:child,
//             infants:infants
//         },{
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//             console.log(response.data.ResponseStatus)
//             console.log(response.data)
//         if(response.data.ResponseStatus === 1){
//             res.json({error: false, ResponseStatus: 1, message : "Success", response: response.data})
//         }
//         else
//         {
//             res.json({error: true, ResponseStatus : 14, response : []})
//         }
//     }
//     catch(e)
//     {
//         console.log(e)
//         res.json({error: true, ResponseStatus : 14, response : []})
//     }
// }

flightController.Checkout = async (req, res) => {
    let {tp} = req.params
    res.render("flights/flight_checkout", {traceId: 1, total: tp})
}

flightController.book = async (req, res) => {
    let tdate = '13-05-2002';
    // let agentEmail = req.agent.agentEmail;
    // let traceId = req.session.traceId;
    // let selectSQL = `select * from Flights.searchingSession  where traceId='${traceId}' and agentEmail = '${agentEmail}'`
    // let platformSQL = `select * from dbo.platform_fees  where type = 'Flights'`
    // let request = new sql.Request();
    // let platformResult = await request.query(platformSQL);
    // console.log(selectSQL)
    // request.query(selectSQL, (err, rows) => {
    //     if (err) {
    //         res.json({error: true, message: err.message, recordset: []});
    //     }
    //     else {
    //         console.log(rows);
    //         let {recordset} = rows;
    res.render("flights/flightBook", {
        markup: 1,
        book: 1,
        platformFee: 1,
        platformTax: 1,
        tdate,
        traceId: 1,
        agentEmail: req.agent.agentEmail,
        userType: req.agent.userType
    })
    // res.render("flights/flightBook", {markup: recordset[0].markupValue, book: recordset[0].searchObject, platformFee: platformResult.recordset[0].fee, platformTax: platformResult.recordset[0].tax, tdate, traceId : recordset[0].traceId})
    //     }
    // })

}

// flightController.searchResults = async (req,res) => {
//     res.render('flights_india/flightResults',{agentEmail:req.agent.agentEmail});
// }
// flightController.getAllFlights = async (req, res) => {
//     console.log(req.body);
//     try {
//         let markup = [];
//         let agentMarkup = [];
//         console.log(req.body)
//         let { from, to, travelDate, fare_type, adults, child, infants, ResultFareType } = req.body;
//
//         let selectSQL = `
//         SELECT
//     ad.AgencyId,
//     ad.UserId,
//     ad.CompanyName,
//     ug.GroupName,
//     ug.Description AS GroupDescription,
//     COALESCE(MAX(a.Code), 'All') AS AirlineName,  -- Replace NULL with 'All' and ensure only one airline name per agency
//     fc.markup_type,
//     fc.markup_plb,
//     fc.markup_percentage,
//     fc.vendor,
//     fc.markup_type,
//     fc.fare_type,
// 	fc.booking_type,
//     MAX(ap.CountryName) AS CountryName,  -- Select one country name per agency
//     MAX(ap.CountryCode) AS CountryCode
// FROM dbo.AgencyDetails ad
// JOIN dbo.UserGroup ug ON ad.GroupType = ug.GroupName  -- Map GroupType with GroupName
// JOIN Flights.flight_commercials fc ON ug.GroupID = fc.group_type  -- Use GroupID from userGroups for join
// LEFT JOIN Flight.Airlines a ON fc.airline = a.AirlineIndex  -- Use LEFT JOIN to include rows with airline = 0
// LEFT JOIN Flight.Airport ap ON ap.CityCode = '${to}'  -- Join Airport table using CityCode ('to' column in flight_commercials)
// WHERE ad.UserId = '${req.agent.agentId}' AND fc.product = 'Air Ticket' -- Replace with your desired UserId
// GROUP BY
//     ad.AgencyId,
//     ad.UserId,
//     ad.CompanyName,
//     ug.GroupName,
//     ug.Description,
//     fc.markup_type,
//     fc.markup_plb,
//     fc.markup_percentage,
//     fc.vendor,
//     fc.markup_type,
//     fc.fare_type,
// 	fc.booking_type;
//         `
//         console.log(selectSQL)
//
//
//         let request = new sql.Request();
//
//         let travelAgentSql = `select * from dbo.travelAgent_markup where agentId = '${req.user.JWT_EMAIL}' and planType = 'Flights'`
//
//         let travelAgentMarkup = await request.query(travelAgentSql);
//
//         if(travelAgentMarkup.recordset.length > 0){
//             agentMarkup = travelAgentMarkup.recordset;
//             console.log(agentMarkup)
//         }
//         else
//         {
//             agentMarkup = [];
//         }
//
//
//         request.query(selectSQL, async (err, rows) => {
//             if (err) {
//                 res.json({error: true, message: err.message, recordset: []});
//             }
//             else {
//                 console.log(rows);
//                 if (rows.recordset.length > 0) {
//                     markup = rows.recordset;
//                 } else {
//                     markup = [];
//                 }
//                 let apiUrl = `${config.tflightUrl}Search`;
//                 let tripJackApiUrl = `${config.bookURL}`;
//
//
//                 let flightClass = ""
//
//                 if (parseInt(fare_type) === 2) {
//                     flightClass = "ECONOMY"
//                 } else if (parseInt(fare_type) === 6) {
//                     flightClass = "FIRST CLASS"
//                 } else if (parseInt(fare_type) === 6) {
//                     flightClass = "PREMIUM ECONOMY"
//                 } else {
//                     flightClass = "BUSINESS"
//                 }
//
//                 const tboRequest = axios.post(apiUrl, {
//                     "EndUserIp": "192.168.10.10",
//                     "TokenId": `${req.token}`,
//                     "AdultCount": `${adults}`,
//                     "ChildCount": `${child}`,
//                     "InfantCount": `${infants}`,
//                     "DirectFlight": "false",
//                     "OneStopFlight": "false",
//                     "JourneyType": "1",
//                     "PreferredAirlines": null,
//                     "Segments": [
//                         {
//                             "Origin": `${from}`,
//                             "Destination": `${to}`,
//                             "FlightCabinClass": `${fare_type}`,
//                             "PreferredDepartureTime": `${travelDate}T00: 00: 00`
//                         }
//                     ],
//                     "Sources": null
//                 }, {
//                     headers: {
//                         'Accept-Encoding': 'gzip, deflate'
//                     }
//                 });
//
//                 const tripJackRequest = axios.post(tripJackApiUrl, {
//                     "searchQuery": {
//                         "cabinClass": `${flightClass}`,
//                         "paxInfo": {
//                             "ADULT": `${adults}`,
//                             "CHILD": `${child}`,
//                             "INFANT": `${infants}`
//                         },
//                         "routeInfos": [
//                             {
//                                 "fromCityOrAirport": {
//                                     "code": `${from}`
//                                 },
//                                 "toCityOrAirport": {
//                                     "code": `${to}`
//                                 },
//                                 "travelDate": `${travelDate}`
//                             }
//                         ],
//                         "searchModifiers": {
//                             "isDirectFlight": false,
//                             "isConnectingFlight": false
//                         }
//                     }
//                 }, {
//                     headers: {
//                         'Accept-Encoding': 'gzip, deflate',
//                         'apikey': config.tripJackApiKey,
//                         'Content-Type': 'application/json'
//                     }
//                 });
//
//
//                 // Execute both requests concurrently and handle individual errors
//                 const [tboResponse, tripjackResponse] = await Promise.allSettled([tboRequest, tripJackRequest]);
//
//                 let parsedTBOData = [];
//                 let parsedTripjackData = [];
//
//                 // Check if Travelopedia API request was successful
//                 if (tboResponse.status === "fulfilled") {
//
//                     if (tboResponse.value.data.Response.ResponseStatus === 1) {
//                         // Assuming tboResponse.value.data.Response.Results[0] is your flights array
//
// // Group flights by AirlineCode and FlightNumber
//                         let groupedFlights = tboResponse.value.data.Response.Results[0].reduce((acc, flight) => {
//                             let airlineCode = flight.Segments[0][0].Airline.AirlineCode;
//                             let airlineName = flight.Segments[0][0].Airline.AirlineName;
//                             let flightNumber = flight.Segments[0][0].Airline.FlightNumber;
//                             let stops = `${flight.Segments[0].length - 1} Stops`;
//                             let key = `${airlineCode}_${flightNumber}`;
//                             // Add segments to the grouped object
//                             let deptTime = flight.Segments[0][0].Origin.DepTime;
//                             let ArrTime = flight.Segments[0][flight.Segments[0].length - 1].Destination.ArrTime;
//
//                             let formattedDuration = calculateDuration(deptTime, ArrTime);
//
//                             let Origin = {
//                                 CityCode: flight.Segments[0][0].Origin.Airport.CityCode,
//                                 CityName: flight.Segments[0][0].Origin.Airport.CityName,
//                                 AirportCode: flight.Segments[0][0].Origin.Airport.AirportCode,
//                                 AirportName: flight.Segments[0][0].Origin.Airport.AirportName,
//                                 airlineCode: flight.Segments[0][0].Airline.AirlineCode,
//                                 airlineName: flight.Segments[0][0].Airline.AirlineName,
//                                 Terminal: flight.Segments[0][0].Origin.Airport.Terminal,
//                                 FlightNumber: flight.Segments[0][0].Airline.FlightNumber,
//                                 DepDateTime: deptTime,
//                                 DepTime: convertToTime(deptTime),
//                                 DepDate: convertToDesiredFormat(deptTime),
//                                 Time: getTimeOfDay(deptTime)
//                             }
//                             let Destination = {
//                                 CityCode: flight.Segments[0][flight.Segments[0].length - 1].Destination.Airport.CityCode,
//                                 CityName: flight.Segments[0][flight.Segments[0].length - 1].Destination.Airport.CityName,
//                                 AirportCode: flight.Segments[0][flight.Segments[0].length - 1].Destination.Airport.AirportCode,
//                                 AirportName: flight.Segments[0][flight.Segments[0].length - 1].Destination.Airport.AirportName,
//                                 Terminal: flight.Segments[0][flight.Segments[0].length - 1].Destination.Airport.Terminal,
//                                 airlineCode: flight.Segments[0][flight.Segments[0].length - 1].Airline.AirlineCode,
//                                 airlineName: flight.Segments[0][flight.Segments[0].length - 1].Airline.AirlineName,
//                                 FlightNumber: flight.Segments[0][flight.Segments[0].length - 1].Airline.FlightNumber,
//                                 ArrDateTime: ArrTime,
//                                 ArrTime: convertToTime(ArrTime),
//                                 ArrDate: convertToDesiredFormat(ArrTime),
//                                 Time: getTimeOfDay(ArrTime)
//                             }
//
//                             if (!acc[key]) {
//                                 acc[key] = {
//                                     Supplier: "TBO",
//                                     adults: adults,
//                                     childs: child,
//                                     infants: infants,
//                                     formattedDuration: formattedDuration,
//                                     Origin: Origin,
//                                     Stops: stops,
//                                     Destination: Destination,
//                                     AirlineCode: airlineCode,
//                                     AirlineName: airlineName,
//                                     FlightNumber: flightNumber,
//                                     Details: []
//                                 };
//                             }
//
//
//                             let flightDetails = [];
//                             // Fix: Wrap the object in parentheses
//                             let previousArrivalTime = null;
//
//                             // Add segments
//                             let segments = flight.Segments[0].map(segment => {
//                                 let layoverTime = 0;
//                                 // Calculate layover time only for segments after the first one
//                                 if (previousArrivalTime) {
//                                     layoverTime = calculateDuration(previousArrivalTime, segment.Origin.DepTime); // Add 1 to the calculated duration
//                                 }
//
//                                 // Update previous arrival time for the next iteration
//                                 previousArrivalTime = segment.Destination.ArrTime;
//
//                                 if (segment.CabinClass === 2) {
//                                     flightClass = "ECONOMY"
//                                 } else if (segment.CabinClass === 3) {
//                                     flightClass = "PremiumEconomy"
//                                 } else if (segment.CabinClass === 4) {
//                                     flightClass = "Business"
//                                 } else if (segment.CabinClass === 5) {
//                                     flightClass = "PremiumBusiness"
//                                 } else if (segment.CabinClass === 6) {
//                                     flightClass = "First"
//                                 } else {
//                                     flightClass = "All"
//                                 }
//
//
//                                 let obj = {
//                                     ArrivalCityCode: segment.Destination.Airport.CityCode,
//                                     ArrivalCityName: segment.Destination.Airport.CityName,
//                                     DepartureCityCode: segment.Origin.Airport.CityCode,
//                                     DepartureCityName: segment.Origin.Airport.CityName,
//                                     flightClass: flightClass,
//                                     Baggage: segment.Baggage,
//                                     FlightNumber: segment.Airline.FlightNumber,
//                                     CabinBaggage: segment.CabinBaggage,
//                                     AirlineCode: segment.Airline.AirlineCode,
//                                     AirlineName: segment.Airline.AirlineName,
//                                     DepartureAirportCode: segment.Origin.Airport.AirportCode,
//                                     ArrivalAirportCode: segment.Destination.Airport.AirportCode,
//                                     DepartureAirportName: segment.Origin.Airport.AirportName,
//                                     ArrivalAirportName: segment.Destination.Airport.AirportName,
//                                     DepDateTime: segment.Origin.DepTime,
//                                     ArrDateTime: segment.Destination.ArrTime,
//                                     DepTime: convertToTime(segment.Origin.DepTime),
//                                     ArrTime: convertToTime(segment.Destination.ArrTime),
//                                     DepDate: convertToDesiredFormat(segment.Origin.DepTime),
//                                     ArrDate: convertToDesiredFormat(segment.Destination.ArrTime),
//                                     Duration: calculateDuration(segment.Origin.DepTime, segment.Destination.ArrTime),
//                                     LayoverTime: layoverTime || 0,
//                                     DepartureTerminal: segment.Origin.Airport.Terminal,
//                                     ArrivalTerminal: segment.Destination.Airport.Terminal
//                                 }
//                                 flightDetails.push(obj);
//                             });
//
//                             let fare = '';
//
//                             if ('FareClassification' in flight) {
//                                 fare = flight.FareClassification.Type
//                             }
//
//                             let ResultIndex = flight.ResultIndex
//
//                             let k3Tax = 0, yqTax = 0, yrTax = 0, otherTaxesSum = 0;
//
// // Loop through the TaxBreakup array
//                             flight.Fare.TaxBreakup.forEach(tax => {
//                                 if (tax.key === 'K3') {
//                                     k3Tax = tax.value;
//                                 } else if (tax.key === 'YQTax') {
//                                     yqTax = tax.value;
//                                 } else if (tax.key === 'YR') {
//                                     yrTax = tax.value;
//                                 } else if (tax.key !== 'TotalTax') {
//                                     // Sum other taxes excluding K3, YQTax, YR, and TotalTax
//                                     otherTaxesSum += tax.value;
//                                 }
//                             });
//
//                             let adultFare = 0;
//                             let childFare = 0;
//                             let infantFare = 0;
//                             let adultBaseFare = 0;
//                             let childBasefare = 0;
//                             let infantBaseFare = 0;
//                             let adultTotaltax = 0;
//                             let childTotalTax = 0;
//                             let infantTotalTax = 0;
//                             let adultk3Tax = 0, adultyqTax = 0, adultyrTax = 0, adultTaxesSum = 0;
//                             let childk3Tax = 0, childyqTax = 0, childyrTax = 0, childTaxesSum = 0;
//                             let infantk3Tax = 0, infantyqTax = 0, infantyrTax = 0, infantTaxesSum = 0;
//
//                             for (let i = 0; i < flight.FareBreakdown.length; i++) {
//                                 if (flight.FareBreakdown[i].PassengerType === 1) {
//
//                                     adultFare = parseFloat(flight.FareBreakdown[i].BaseFare) + parseFloat(flight.FareBreakdown[i].Tax)
//
//                                     adultBaseFare = parseFloat(flight.FareBreakdown[i].BaseFare);
//
//                                     adultTotaltax = parseFloat(flight.FareBreakdown[i].Tax)
//
//                                     flight.FareBreakdown[i].TaxBreakUp.forEach(tax => {
//                                         if (tax.key === 'K3') {
//                                             adultk3Tax = tax.value;
//                                         } else if (tax.key === 'YQTax') {
//                                             adultyqTax = tax.value;
//                                         } else if (tax.key === 'YR') {
//                                             adultyrTax = tax.value;
//                                         } else if (tax.key !== 'TotalTax') {
//                                             // Sum other taxes excluding K3, YQTax, YR, and TotalTax
//                                             adultTaxesSum += tax.value;
//                                         }
//                                     });
//                                 }
//                                 if (flight.FareBreakdown[i].PassengerType === 2) {
//
//                                     childFare = parseFloat(flight.FareBreakdown[i].BaseFare) + parseFloat(flight.FareBreakdown[i].Tax)
//
//                                     childBasefare = parseFloat(flight.FareBreakdown[i].BaseFare);
//
//                                     childTotalTax = parseFloat(flight.FareBreakdown[i].Tax)
//
//                                     if ('TaxBreakUp' in flight.FareBreakdown[i]) {
//                                         flight.FareBreakdown[i].TaxBreakUp.forEach(tax => {
//                                             if (tax.key === 'K3') {
//                                                 childk3Tax = tax.value;
//                                             } else if (tax.key === 'YQTax') {
//                                                 childyqTax = tax.value;
//                                             } else if (tax.key === 'YR') {
//                                                 childyrTax = tax.value;
//                                             } else if (tax.key !== 'TotalTax') {
//                                                 // Sum other taxes excluding K3, YQTax, YR, and TotalTax
//                                                 childTaxesSum += tax.value;
//                                             }
//                                         });
//                                     }
//                                 }
//                                 if (flight.FareBreakdown[i].PassengerType === 3) {
//
//                                     infantFare = parseFloat(flight.FareBreakdown[i].BaseFare) + parseFloat(flight.FareBreakdown[i].Tax)
//
//                                     infantBaseFare = parseFloat(flight.FareBreakdown[i].BaseFare);
//
//                                     infantTotalTax = parseFloat(flight.FareBreakdown[i].Tax)
//
//                                     if ('TaxBreakUp' in flight.FareBreakdown[i]) {
//                                         if (flight.FareBreakdown[i].TaxBreakUp !== null) {
//                                             flight.FareBreakdown[i].TaxBreakUp.forEach(tax => {
//                                                 if (tax.key === 'K3') {
//                                                     infantk3Tax = tax.value;
//                                                 } else if (tax.key === 'YQTax') {
//                                                     infantyqTax = tax.value;
//                                                 } else if (tax.key === 'YR') {
//                                                     infantyrTax = tax.value;
//                                                 } else if (tax.key !== 'TotalTax') {
//                                                     // Sum other taxes excluding K3, YQTax, YR, and TotalTax
//                                                     infantTaxesSum += tax.value;
//                                                 }
//                                             });
//                                         }
//                                     }
//                                 }
//                             }
//
//                             let fareDifference = parseFloat(flight.Fare.PublishedFare) - parseFloat(flight.Fare.OfferedFare);
//
//                             let markup_type = (fareDifference > 0) ? 'PLB' : 'Non PLB';
//
//                             let markup_value = 0, markup_percentage = 0;
//
//                             let journey_type = (markup?.[0]?.CountryCode === 'IN') ? 'Domestic' : 'International';
//
//
//                             let agent_markup_value = 0;
//
//                             for (let index = 0; index < markup.length; index++) {
//                                 const tax = markup[index];
//                                 const airlineNameTrimmed = tax.AirlineName.trim().toUpperCase();
//                                 const airlineCodeTrimmed = airlineCode.trim().toUpperCase();
//                                 const fareType = tax.fare_type.toUpperCase();
//                                 const vendor = tax.vendor.toUpperCase();
//
//                                 if (airlineNameTrimmed === airlineCodeTrimmed && tax.markup_type[0] === markup_type
//                                     && fareType === fare.toUpperCase() && tax.booking_type === journey_type && vendor === "TBO") {
//
//                                     markup_value = tax.markup_plb;
//                                     markup_percentage = tax.markup_percentage;
//                                     console.log("1 wala");
//                                     break;
//                                 }
//                                 else if (airlineNameTrimmed === airlineCodeTrimmed && tax.markup_type[0] === markup_type
//                                     && fareType === "ALL" && tax.booking_type === journey_type && vendor === "TBO") {
//
//                                     markup_value = tax.markup_plb;
//                                     markup_percentage = tax.markup_percentage;
//                                     console.log("2 wala");
//                                     break;
//                                 }
//                                 else if (airlineNameTrimmed === "ALL" && tax.markup_type[0] === markup_type
//                                     && fareType === fare.toUpperCase() && tax.booking_type === journey_type && vendor === "TBO") {
//
//                                     markup_value = tax.markup_plb;
//                                     markup_percentage = tax.markup_percentage;
//                                     console.log("3 wala");
//                                     break;
//                                 }
//                                 else if (airlineNameTrimmed === "ALL" && tax.markup_type[0] === markup_type
//                                     && fareType === "ALL" && tax.booking_type === journey_type && vendor === "TBO") {
//
//                                     markup_value = tax.markup_plb;
//                                     markup_percentage = tax.markup_percentage;
//                                     console.log("4 wala");
//                                     break;
//                                 }
//                                 else if (airlineNameTrimmed === airlineCodeTrimmed && tax.markup_type[0] === markup_type
//                                     && fareType === fare.toUpperCase() && tax.booking_type === journey_type && vendor === "ALL") {
//
//                                     markup_value = tax.markup_plb;
//                                     markup_percentage = tax.markup_percentage;
//                                     console.log("1 wala - ALL vendor");
//                                     break;
//                                 }
//                                 else if (airlineNameTrimmed === airlineCodeTrimmed && tax.markup_type[0] === markup_type
//                                     && fareType === "ALL" && tax.booking_type === journey_type && vendor === "ALL") {
//
//                                     markup_value = tax.markup_plb;
//                                     markup_percentage = tax.markup_percentage;
//                                     console.log("-->" + markup_value);
//                                     console.log("need wala");
//                                     break;
//                                 }
//                                 else if (airlineNameTrimmed === "ALL" && tax.markup_type[0] === markup_type
//                                     && fareType === fare.toUpperCase() && tax.booking_type === journey_type && vendor === "ALL") {
//
//                                     markup_value = tax.markup_plb;
//                                     markup_percentage = tax.markup_percentage;
//                                     console.log("3 wala - ALL vendor");
//                                     break;
//                                 }
//                                 else if (airlineNameTrimmed === "ALL" && tax.markup_type[0] === markup_type
//                                     && fareType === "ALL" && tax.booking_type === journey_type && vendor === "ALL") {
//
//                                     markup_value = tax.markup_plb;
//                                     markup_percentage = tax.markup_percentage;
//                                     console.log("4 wala - ALL vendor");
//                                     break;
//                                 }
//                                 else {
//                                     markup_value = 0;
//                                     markup_percentage = 0;
//                                     console.log("NO");
//                                 }
//                             }
//
//
//                             for (let a = 0; a < agentMarkup.length; a++) {
//                                 const tax = agentMarkup[a];
//                                 const airlineNameTrimmed = tax.airline.trim().toUpperCase();
//                                 const airlineCodeTrimmed = airlineCode.trim().toUpperCase();
//                                 const markup_type = tax.markupType;
//
//                                 if (airlineNameTrimmed === airlineCodeTrimmed && tax.tripType.toUpperCase() === "ALL") {
//                                     if (markup_type === 'Fixed') {
//                                         agent_markup_value = tax.markupAmount;
//                                     } else {
//                                         agent_markup_value = (parseFloat(flight?.Fare?.PublishedFare || 0) * (parseFloat(tax?.markupAmount || 0) / 100)).toFixed(2);
//                                     }
//                                     break; // Exit the loop once a match is found
//                                 }
//                                 else if (airlineNameTrimmed === "ALL" && tax.tripType.toUpperCase() === "ALL") {
//                                     if (markup_type === 'Fixed') {
//                                         agent_markup_value = tax.markupAmount;
//                                     } else {
//                                         agent_markup_value = (parseFloat(flight?.Fare?.PublishedFare || 0) * (parseFloat(tax?.markupAmount || 0) / 100)).toFixed(2);
//                                     }
//                                     break; // Exit the loop once a match is found
//                                 }
//                                 else if (airlineNameTrimmed === airlineCodeTrimmed && tax.tripType === journey_type) {
//                                     if (markup_type === 'Fixed') {
//                                         agent_markup_value = tax.markupAmount;
//                                     } else {
//                                         agent_markup_value = (parseFloat(flight?.Fare?.PublishedFare || 0) * (parseFloat(tax?.markupAmount || 0) / 100)).toFixed(2);
//                                     }
//                                     break; // Exit the loop once a match is found
//                                 }
//                                 else if (airlineNameTrimmed === "ALL" && tax.tripType === journey_type) {
//                                     if (markup_type === 'Fixed') {
//                                         agent_markup_value = tax.markupAmount;
//                                     } else {
//                                         agent_markup_value = (parseFloat(flight?.Fare?.PublishedFare || 0) * (parseFloat(tax?.markupAmount || 0) / 100)).toFixed(2);
//                                     }
//                                     break; // Exit the loop once a match is found
//                                 }
//                                 else {
//                                     agent_markup_value = 0;
//                                 }
//                             }
//
//
//                             let fareBreakup = {
//                                 BaseFare: flight.Fare.BaseFare,
//                                 totalTax: flight.Fare.Tax,
//                                 k3Tax: k3Tax,
//                                 yqTax: yqTax,
//                                 yrTax: yrTax,
//                                 otherTaxesSum: otherTaxesSum,
//                                 TDO_MARKUP_PLB : (markup_type === "PLB") ? 0 : markup_value,
//                                 MARKUP_TYPE : markup_type,
//                                 MARKUP_ADDED_BY_AGENT : agent_markup_value,
//                                 TDO_MARKUP_PERCENTAGE : markup_percentage,
//                                 PublishedFare: (markup_type === "PLB") ? (parseFloat(flight.Fare.PublishedFare) + parseFloat(agent_markup_value)).toFixed(2)  : (parseFloat(flight.Fare.PublishedFare) + parseFloat(markup_value) + parseFloat(agent_markup_value) + (parseFloat(flight.Fare.PublishedFare) * parseFloat(markup_percentage) / 100)).toFixed(2),
//                                 CommissionEarned: flight.Fare.CommissionEarned,
//                                 TdsOnCommission: flight.Fare.TdsOnCommission,
//                                 IncentiveEarned: flight.Fare.IncentiveEarned,
//                                 OfferedFare: (markup_type === "PLB") ? (parseFloat(flight.Fare.OfferedFare) + (fareDifference * parseFloat(markup_percentage) / 100)).toFixed(2)  : (parseFloat(flight.Fare.OfferedFare) + parseFloat(markup_value) + parseFloat(agent_markup_value) + (parseFloat(flight.Fare.PublishedFare) * parseFloat(markup_percentage) / 100)).toFixed(2),
//                                 Discount: flight.Fare.Discount,
//                                 ServiceFee: flight.Fare.ServiceFee,
//                                 OtherCharges: flight.Fare.OtherCharges,
//                                 Adult: {
//                                     adultBaseFare: adultBaseFare,
//                                     adultTotaltax: adultTotaltax,
//                                     adultyqTax: adultyqTax,
//                                     adultk3Tax: adultk3Tax,
//                                     adultyrTax: adultyrTax,
//                                     adultTaxesSum: adultTaxesSum
//                                 },
//                                 child: {
//                                     childBaseFare: childBasefare,
//                                     childTotalTax: childTotalTax,
//                                     childyqTax: childyqTax,
//                                     childk3Tax: childk3Tax,
//                                     childyrTax: childyrTax,
//                                     childTaxesSum: childTaxesSum
//                                 },
//                                 infant: {
//                                     infantBaseFare: infantBaseFare,
//                                     infantTotalTax: infantTotalTax,
//                                     infantyqTax: infantyqTax,
//                                     infantk3Tax: infantk3Tax,
//                                     infantyrTax: infantyrTax,
//                                     infantTaxesSum: infantTaxesSum
//                                 }
//                             }
//
//                             let Baggage = {
//                                 Baggage: flight.Segments[0][0].Baggage,
//                                 CabinBaggage: flight.Segments[0][0].CabinBaggage
//                             }
//
//
//                             acc[key].Details.push({
//                                 flightDetails,
//                                 fare: fare,
//                                 FareBreakup: fareBreakup,
//                                 Baggage: Baggage,
//                                 ResultIndex: ResultIndex
//                             });
//
//
//                             return acc;
//                         }, {});
//
// // Convert grouped flights object to array
//                         parsedTBOData = Object.values(groupedFlights).map(group => {
//                             return {
//                                 Supplier: group.Supplier,
//                                 adults: group.adults,
//                                 childs: group.childs,
//                                 infants: group.infants,
//                                 Stops: group.Stops,
//                                 TraceId: tboResponse.value.data.Response.TraceId,
//                                 totalDuration: group.formattedDuration,
//                                 Origin: group.Origin,
//                                 Destination: group.Destination,
//                                 AirlineCode: group.AirlineCode,
//                                 AirlineName: group.AirlineName,
//                                 FlightNumber: group.FlightNumber,
//                                 Segments: group.Details
//                             };
//                         });
//
//
//
//                     }
//
//
//                 }
//
//                 if (tripjackResponse.status === "fulfilled") {
//
//                     // Assuming tboResponse.value.data.Response.Results[0] is your flights array
//
// // Group flights by AirlineCode and FlightNumber
//                     let groupedFlights = tripjackResponse.value.data.searchResult.tripInfos.ONWARD.reduce((acc, flight) => {
//                         let airlineCode = flight.sI[0].fD.aI.code;
//                         let airlineName = flight.sI[0].fD.aI.name;
//                         let flightNumber = flight.sI[0].fD.fN;
//                         let key = `${airlineCode}_${flightNumber}`;
//                         let stops = `${flight.sI.length - 1} Stops`
//                         // Add segments to the grouped object
//                         let deptTime = flight.sI[0].dt;
//                         let ArrTime = flight.sI[flight.sI.length - 1].at;
//                         let sId = flight.sI[0].id
//
//                         let formattedDuration = calculateDuration(deptTime, ArrTime);
//
//                         let Origin = {
//                             CityName: flight.sI[0].da.city,
//                             CityCode: flight.sI[0].da.cityCode,
//                             AirportCode: flight.sI[0].da.code,
//                             AirportName: flight.sI[0].da.name,
//                             airlineCode: flight.sI[0].fD.aI.code,
//                             airlineName: flight.sI[0].fD.aI.name,
//                             Terminal: flight.sI[0].da.terminal,
//                             FlightNumber: flight.sI[0].fD.fN,
//                             DepDateTime: deptTime,
//                             DepTime: convertToTime(deptTime),
//                             DepDate: convertToDesiredFormat(deptTime),
//                             Time: getTimeOfDay(deptTime)
//                         }
//                         let Destination = {
//                             CityName: flight.sI[flight.sI.length - 1].aa.city,
//                             CityCode: flight.sI[flight.sI.length - 1].aa.cityCode,
//                             AirportCode: flight.sI[flight.sI.length - 1].aa.code,
//                             AirportName: flight.sI[flight.sI.length - 1].aa.name,
//                             airlineCode: flight.sI[flight.sI.length - 1].fD.aI.code,
//                             airlineName: flight.sI[flight.sI.length - 1].fD.aI.name,
//                             Terminal: flight.sI[flight.sI.length - 1].aa.terminal,
//                             FlightNumber: flight.sI[flight.sI.length - 1].fD.fN,
//                             ArrDateTime: ArrTime,
//                             ArrTime: convertToTime(ArrTime),
//                             ArrDate: convertToDesiredFormat(ArrTime),
//                             Time: getTimeOfDay(ArrTime)
//                         }
//
//                         if (!acc[key]) {
//                             acc[key] = {
//                                 Supplier: "TRIPJACK",
//                                 adults: adults,
//                                 childs: child,
//                                 infants: infants,
//                                 formattedDuration: formattedDuration,
//                                 Origin: Origin,
//                                 Stops: stops,
//                                 Destination: Destination,
//                                 AirlineCode: airlineCode,
//                                 AirlineName: airlineName,
//                                 FlightNumber: flightNumber,
//                                 Details: []
//                             };
//                         }
//
//
//                         let flightDetails = [];
//                         // Fix: Wrap the object in parentheses
//                         let previousArrivalTime = null;
//
//
//                         // Add segments
//                         let segments = flight?.sI?.map(segment => {
//
//                             let layoverTime = 0;
//                             // Calculate layover time only for segments after the first one
//                             if (previousArrivalTime) {
//                                 layoverTime = calculateDuration(previousArrivalTime, segment.dt); // Add 1 to the calculated duration
//                             }
//
//                             // Update previous arrival time for the next iteration
//                             previousArrivalTime = segment.at;
//                             let obj = {
//                                 ArrivalCityCode: segment.aa.cityCode,
//                                 ArrivalCityName: segment.aa.city,
//                                 DepartureCityCode: segment.da.cityCode,
//                                 DepartureCityName: segment.da.city,
//                                 AirlineCode: segment.fD.aI.code,
//                                 AirlineName: segment.fD.aI.name,
//                                 FlightNumber: segment.fD.fN,
//                                 flightClass: flight.totalPriceList[0].fd.ADULT.cc,
//                                 Baggage: flight.totalPriceList[0]?.tai?.tbi?.[segment.id]?.[0]?.ADULT?.iB,
//                                 CabinBaggage: flight?.totalPriceList[0]?.tai?.tbi?.[segment.id]?.[0]?.ADULT?.cB,
//                                 DepartureAirportCode: segment.da.code,
//                                 ArrivalAirportCode: segment.aa.code,
//                                 DepartureAirportName: segment.da.name,
//                                 ArrivalAirportName: segment.aa.name,
//                                 DepDateTime: segment.dt,
//                                 ArrDateTime: segment.at,
//                                 DepTime: convertToTime(segment.dt),
//                                 ArrTime: convertToTime(segment.at),
//                                 DepDate: convertToDesiredFormat(segment.dt),
//                                 ArrDate: convertToDesiredFormat(segment.at),
//                                 Duration: calculateDuration(segment.dt, segment.at),
//                                 LayoverTime: layoverTime || 0,
//                                 DepartureTerminal: segment.da.terminal,
//                                 ArrivalTerminal: segment.aa.terminal
//                             }
//                             flightDetails.push(obj);
//                         });
//
//
//                         let fare = flight.totalPriceList[0].fareIdentifier
//
//                         let ResultIndex = flight.totalPriceList[0].id
//
//                         let k3Tax = 0, yqTax = 0, yrTax = 0, otherTaxesSum = 0;
//                         let adultk3Tax = 0, adultyqTax = 0, adultyrTax = 0, adultotherTaxesSum = 0;
//                         let childk3Tax = 0, childyqTax = 0, childyrTax = 0, childotherTaxesSum = 0;
//                         let infantk3Tax = 0, infantyqTax = 0, infantyrTax = 0, infantotherTaxesSum = 0;
//
//
//                         let publishedFare = 0;
//                         let totalTax = 0;
//                         let totalBaseFare = 0;
//                         let offeredFare = 0;
//
//                         let adultFare = 0, adultBaseFare = 0, adultTotalTax = 0;
//                         let childFare = 0, childBaseFare = 0, childTotalTax = 0;
//                         let infantFare = 0, infantBaseFare = 0, infantTotalTax = 0;
//
//                         if (flight.totalPriceList[0].fd) {
//                             if ("ADULT" in flight.totalPriceList[0].fd) {
//                                 publishedFare += flight.totalPriceList[0].fd.ADULT.fC.TF * parseInt(adults);
//                                 adultFare = flight.totalPriceList[0].fd.ADULT.fC.TF
//                                 totalTax += flight.totalPriceList[0].fd.ADULT.fC.TAF * parseInt(adults);
//                                 adultTotalTax = flight.totalPriceList[0].fd.ADULT.fC.TAF
//                                 totalBaseFare += flight.totalPriceList[0].fd.ADULT.fC.BF * parseInt(adults);
//                                 adultBaseFare = flight.totalPriceList[0].fd.ADULT.fC.BF
//                                 offeredFare += flight.totalPriceList[0].fd.ADULT.fC.NF * parseInt(adults);
//
//                                 const afCTaxes = flight.totalPriceList[0].fd.ADULT.afC.TAF;
//
//                                 for (const [taxName, taxValue] of Object.entries(afCTaxes)) {
//                                     if (taxName === "YQ") {
//                                         yqTax += taxValue;
//                                         adultyqTax = taxValue;
//                                     } else if (taxName === "YR") {
//                                         yrTax += taxValue;
//                                         adultyrTax = taxValue;
//                                     } else if (taxName === "K3") {
//                                         k3Tax += taxValue;
//                                         adultk3Tax = taxValue;
//                                     } else {
//                                         otherTaxesSum += taxValue;
//                                         adultotherTaxesSum = taxValue;
//                                     }
//                                 }
//                             }
//                             if ("CHILD" in flight.totalPriceList[0].fd) {
//                                 publishedFare += flight.totalPriceList[0].fd.CHILD.fC.TF * parseInt(child);
//                                 childFare = flight.totalPriceList[0].fd.CHILD.fC.TF
//                                 totalTax += flight.totalPriceList[0].fd.CHILD.fC.TAF * parseInt(child);
//                                 childTotalTax = flight.totalPriceList[0].fd.CHILD.fC.TAF;
//                                 totalBaseFare += flight.totalPriceList[0].fd.CHILD.fC.BF * parseInt(child);
//                                 childBaseFare = flight.totalPriceList[0].fd.CHILD.fC.BF;
//                                 offeredFare += flight.totalPriceList[0].fd.CHILD.fC.NF * parseInt(child);
//
//                                 const afCTaxes = flight.totalPriceList[0].fd.CHILD.afC.TAF;
//
//                                 for (const [taxName, taxValue] of Object.entries(afCTaxes)) {
//                                     if (taxName === "YQ") {
//                                         yqTax += taxValue;
//                                         childyqTax = taxValue;
//                                     } else if (taxName === "YR") {
//                                         yrTax += taxValue;
//                                         childyrTax = taxValue;
//                                     } else if (taxName === "K3") {
//                                         k3Tax += taxValue;
//                                         childk3Tax = taxValue;
//                                     } else {
//                                         otherTaxesSum += taxValue;
//                                         childotherTaxesSum = taxValue;
//                                     }
//                                 }
//                             }
//                             if ("INFANT" in flight.totalPriceList[0].fd) {
//                                 publishedFare += flight.totalPriceList[0].fd.INFANT.fC.TF * parseInt(infants);
//                                 infantFare = flight.totalPriceList[0].fd.INFANT.fC.TF
//                                 totalTax += flight.totalPriceList[0].fd.INFANT.fC.TAF * parseInt(infants);
//                                 infantTotalTax = flight.totalPriceList[0].fd.INFANT.fC.TAF
//                                 totalBaseFare += flight.totalPriceList[0].fd.INFANT.fC.BF * parseInt(infants);
//                                 infantBaseFare = flight.totalPriceList[0].fd.INFANT.fC.BF;
//                                 offeredFare += flight.totalPriceList[0].fd.INFANT.fC.NF * parseInt(infants);
//
//                                 const afCTaxes = flight.totalPriceList[0].fd.INFANT.afC.TAF;
//
//                                 for (const [taxName, taxValue] of Object.entries(afCTaxes)) {
//                                     if (taxName === "YQ") {
//                                         yqTax += taxValue;
//                                         infantyqTax = taxValue;
//                                     } else if (taxName === "YR") {
//                                         yrTax += taxValue;
//                                         infantyrTax = taxValue;
//                                     } else if (taxName === "K3") {
//                                         k3Tax += taxValue;
//                                         infantk3Tax = taxValue;
//                                     } else {
//                                         otherTaxesSum += taxValue;
//                                         infantotherTaxesSum = taxValue;
//                                     }
//                                 }
//                             }
//                         }
//
//
//                         let fareDifference = publishedFare - offeredFare;
//
//                         let markup_type = (fareDifference > 0) ? 'PLB' : 'Non PLB';
//
//                         let markup_value = 0, markup_percentage = 0;
//
//                         let journey_type = (markup?.[0]?.CountryCode === 'IN') ? 'Domestic' : 'International';
//
//
//                         let agent_markup_value = 0;
//
//                         for (let index = 0; index < markup.length; index++) {
//                             const tax = markup[index];
//                             const airlineNameTrimmed = tax.AirlineName.trim().toUpperCase();
//                             const airlineCodeTrimmed = airlineCode.trim().toUpperCase();
//                             const fareType = tax.fare_type.toUpperCase();
//                             const vendor = tax.vendor.toUpperCase();
//
//                             if (airlineNameTrimmed === airlineCodeTrimmed && tax.markup_type[0] === markup_type
//                                 && fareType === fare.toUpperCase() && tax.booking_type === journey_type && vendor === "TRIPJACK") {
//
//                                 markup_value = tax.markup_plb;
//                                 markup_percentage = tax.markup_percentage;
//                                 console.log("1t wala");
//                                 break;
//                             }
//                             else if (airlineNameTrimmed === airlineCodeTrimmed && tax.markup_type[0] === markup_type
//                                 && fareType === "ALL" && tax.booking_type === journey_type && vendor === "TRIPJACK") {
//
//                                 markup_value = tax.markup_plb;
//                                 markup_percentage = tax.markup_percentage;
//                                 console.log("2t wala");
//                                 break;
//                             }
//                             else if (airlineNameTrimmed === "ALL" && tax.markup_type[0] === markup_type
//                                 && fareType === fare.toUpperCase() && tax.booking_type === journey_type && vendor === "TRIPJACK") {
//
//                                 markup_value = tax.markup_plb;
//                                 markup_percentage = tax.markup_percentage;
//                                 console.log("3t wala");
//                                 break;
//                             }
//                             else if (airlineNameTrimmed === "ALL" && tax.markup_type[0] === markup_type
//                                 && fareType === "ALL" && tax.booking_type === journey_type && vendor === "TRIPJACK") {
//
//                                 markup_value = tax.markup_plb;
//                                 markup_percentage = tax.markup_percentage;
//                                 console.log("4t wala");
//                                 break;
//                             }
//                             else if (airlineNameTrimmed === airlineCodeTrimmed && tax.markup_type[0] === markup_type
//                                 && fareType === fare.toUpperCase() && tax.booking_type === journey_type && vendor === "ALL") {
//
//                                 markup_value = tax.markup_plb;
//                                 markup_percentage = tax.markup_percentage;
//                                 console.log("1t wala - ALL vendor");
//                                 break;
//                             }
//                             else if (airlineNameTrimmed === airlineCodeTrimmed && tax.markup_type[0] === markup_type
//                                 && fareType === "ALL" && tax.booking_type === journey_type && vendor === "ALL") {
//
//                                 markup_value = tax.markup_plb;
//                                 markup_percentage = tax.markup_percentage;
//                                 console.log("-->" + markup_value);
//                                 console.log("need wala t");
//                                 break;
//                             }
//                             else if (airlineNameTrimmed === "ALL" && tax.markup_type[0] === markup_type
//                                 && fareType === fare.toUpperCase() && tax.booking_type === journey_type && vendor === "ALL") {
//
//                                 markup_value = tax.markup_plb;
//                                 markup_percentage = tax.markup_percentage;
//                                 console.log("3t wala - ALL vendor");
//                                 break;
//                             }
//                             else if (airlineNameTrimmed === "ALL" && tax.markup_type[0] === markup_type
//                                 && fareType === "ALL" && tax.booking_type === journey_type && vendor === "ALL") {
//
//                                 markup_value = tax.markup_plb;
//                                 markup_percentage = tax.markup_percentage;
//                                 console.log("4t wala - ALL vendor");
//                                 break;
//                             }
//                             else {
//                                 markup_value = 0;
//                                 markup_percentage = 0;
//                                 console.log("NOt");
//                             }
//                         }
//
//
//                         for (let a = 0; a < agentMarkup.length; a++) {
//                             const tax = agentMarkup[a];
//                             const airlineNameTrimmed = tax.airline.trim().toUpperCase();
//                             const airlineCodeTrimmed = airlineCode.trim().toUpperCase();
//                             const markup_type = tax.markupType;
//
//                             if (airlineNameTrimmed === airlineCodeTrimmed && tax.tripType.toUpperCase() === "ALL") {
//                                 if (markup_type === 'Fixed') {
//                                     agent_markup_value = tax.markupAmount;
//                                 } else {
//                                     agent_markup_value = (parseFloat(publishedFare || 0) * (parseFloat(tax?.markupAmount || 0) / 100)).toFixed(2);
//                                 }
//                                 break; // Exit the loop once the condition is satisfied
//                             }
//                             else if (airlineNameTrimmed === "ALL" && tax.tripType.toUpperCase() === "ALL") {
//                                 if (markup_type === 'Fixed') {
//                                     agent_markup_value = tax.markupAmount;
//                                 } else {
//                                     agent_markup_value = (parseFloat(publishedFare || 0) * (parseFloat(tax?.markupAmount || 0) / 100)).toFixed(2);
//                                 }
//                                 break; // Exit the loop once the condition is satisfied
//                             }
//                             else if (airlineNameTrimmed === airlineCodeTrimmed && tax.tripType === journey_type) {
//                                 if (markup_type === 'Fixed') {
//                                     agent_markup_value = tax.markupAmount;
//                                 } else {
//                                     agent_markup_value = (parseFloat(publishedFare || 0) * (parseFloat(tax?.markupAmount || 0) / 100)).toFixed(2);
//                                 }
//                                 break; // Exit the loop once the condition is satisfied
//                             }
//                             else if (airlineNameTrimmed === "ALL" && tax.tripType === journey_type) {
//                                 if (markup_type === 'Fixed') {
//                                     agent_markup_value = tax.markupAmount;
//                                 } else {
//                                     agent_markup_value = (parseFloat(publishedFare || 0) * (parseFloat(tax?.markupAmount || 0) / 100)).toFixed(2);
//                                 }
//                                 break; // Exit the loop once the condition is satisfied
//                             }
//                             else {
//                                 agent_markup_value = 0;
//                             }
//                         }
//
//
//                         let fareBreakup = {
//                             BaseFare: totalBaseFare,
//                             k3Tax: k3Tax,
//                             yqTax: yqTax,
//                             yrTax: yrTax,
//                             otherTaxesSum: otherTaxesSum,
//                             TDO_MARKUP_PLB : (markup_type === "PLB") ? 0 : markup_value,
//                             MARKUP_TYPE : markup_type,
//                             MARKUP_ADDED_BY_AGENT : agent_markup_value,
//                             TDO_MARKUP_PERCENTAGE : markup_percentage,
//                             totalTax: totalTax,
//                             PublishedFare:  (markup_type === "PLB") ? publishedFare + agent_markup_value  : (parseFloat(publishedFare) + parseFloat(markup_value) + (parseFloat(publishedFare) * parseFloat(markup_percentage) / 100)).toFixed(2),
//                             CommissionEarned: 0,
//                             TdsOnCommission: 0,
//                             IncentiveEarned: 0,
//                             OfferedFare: (markup_type === "PLB") ? (parseFloat(offeredFare) + (fareDifference * parseFloat(markup_percentage) / 100)).toFixed(2)  : (parseFloat(offeredFare) + parseFloat(markup_value) + (parseFloat(publishedFare) * parseFloat(markup_percentage) / 100)).toFixed(2),
//                             Discount: 0,
//                             ServiceFee: 0,
//                             OtherCharges: 0,
//                             Adult: {
//                                 adultBaseFare: adultBaseFare,
//                                 adultTotaltax: adultTotalTax,
//                                 adultyqTax: adultyqTax,
//                                 adultk3Tax: adultk3Tax,
//                                 adultyrTax: adultyrTax,
//                                 adultTaxesSum: adultotherTaxesSum
//                             },
//                             Child: {
//                                 childBaseFare: childBaseFare,
//                                 childTotaltax: childTotalTax,
//                                 childyqTax: childyqTax,
//                                 childk3Tax: childk3Tax,
//                                 childyrTax: childyrTax,
//                                 childTaxesSum: childotherTaxesSum
//                             },
//                             Infant: {
//                                 infantBaseFare: infantBaseFare,
//                                 infantTotaltax: infantTotalTax,
//                                 infantyqTax: infantyqTax,
//                                 infantk3Tax: infantk3Tax,
//                                 infantyrTax: infantyrTax,
//                                 infantTaxesSum: infantotherTaxesSum
//                             }
//                         }
//
//                         let Baggage = {
//                             Baggage: flight.totalPriceList?.[0].fd?.ADULT?.bI?.iB || 'NO BAGGAGE',
//                             CabinBaggage: flight.totalPriceList[0].fd.ADULT.bI.cB
//                         }
//
//
//                         acc[key].Details.push({
//                             flightDetails,
//                             fare: fare,
//                             FareBreakup: fareBreakup,
//                             Baggage: Baggage,
//                             ResultIndex: ResultIndex
//                         });
//
//
//                         return acc;
//                     }, {});
//
// // Convert grouped flights object to array
//                     parsedTripjackData = Object.values(groupedFlights).map(group => {
//                         return {
//                             TraceId: `${Date.now()}`,
//                             Supplier: group.Supplier,
//                             adults: group.adults,
//                             childs: group.childs,
//                             infants: group.infants,
//                             totalDuration: group.formattedDuration,
//                             Origin: group.Origin,
//                             Stops: group.Stops,
//                             Destination: group.Destination,
//                             AirlineCode: group.AirlineCode,
//                             AirlineName: group.AirlineName,
//                             FlightNumber: group.FlightNumber,
//                             Segments: group.Details
//                         };
//                     });
//
//
//                 }
//
//
//                 // Combine parsed data
//                 const combinedResponse = {
//                     ResponseStatus: 1,
//                     data: [...parsedTBOData, ...parsedTripjackData]
//                 };
//
//                 req.session.tdate = travelDate;
//
//                 res.json(combinedResponse);
//             }
//         })
//     } catch (e) {
//         console.log(e);
//         res.json({
//             ResponseStatus: 14,
//             response: e.message
//         });
//     }
// };

flightController.Success = async (req, res) => {
    let connection;
    try {
        let {insId, tx, payType, gCharge} = req.params;
        let {agentEmail,userType} = req.agent
        const connection = await connectToDatabase();

        let [recordset] = await flightServices.success(connection, insId);

        if (recordset.length === 0) {
            res.json({error: true, message: "data nhi mila", recordset: []});
        } else {
            res.render("flights/flightPaymentSuccess", {
                agentEmail: agentEmail,
                userType: userType,
                insId: insId,
                tx: tx,
                gCharge: gCharge,
                payType: payType,
                test1: JSON.stringify(recordset[0].data)
            })


        }

    } catch (err) {
        res.json({error: true, message: err, recordset: []});
    }

    // const transaction = new sql.Transaction();
    //     await transaction.begin();
    //
    //     try {
    //         let updateSQL = `update insurance.insuranceInfo set paymentStatus='success',transactionID=${tx},paymentType='${payType}' where insuranceId = ${insId}`;
    //         console.log(updateSQL);
    //
    //         const request = new sql.Request(transaction);
    //         request.query(updateSQL, function (err, result) {
    //             if (err) {
    //                 console.error('Error in query:', err);
    //                 transaction.rollback();
    //                 // return res.json({responseCode: 1, error: true, message: err.message });
    //                 return res.render("paymentSuccess", {error: true})
    //
    //             }
    //
    //             transaction.commit();
    //             res.render("paymentSuccess", {error: false})
    //         });
    //     } catch (error) {
    //         console.error('Error in transaction:', error);
    //         transaction.rollback();
    //         // return res.json({responseCode: 1, error: true, message: 'An error occurred' });
    //         return res.render("paymentSuccess", {error: true})
    //     }

    // console.log(req.payType)

}

flightController.viewTicket = async (req, res) => {
    res.render('flights/printTicketWithoutPrice', {bookingId: req.params.bookingId})
}

flightController.fetchTicketDetails = async (req, res) => {
    let connection;
    try {
        let {bookingId} = req.body;

        const connection = await connectToDatabase();

        let [recordset] = await flightServices.ticketDetail(connection, bookingId);

        if (recordset.length === 0) {
            res.json({error: true, message: "Data Not Available", recordset: []});
        } else {
            res.json({error: false, message: "data mil gya", recordset: recordset});
        }

    } catch (err) {
        console.log(err)
        res.json({error: true, message: err, recordset: []});

    } finally {
        if (connection) connection.release();  // Return the connection to the pool
    }

    // const transaction = new sql.Transaction();
    //     await transaction.begin();
    //
    //     try {
    //         let updateSQL = `update insurance.insuranceInfo set paymentStatus='success',transactionID=${tx},paymentType='${payType}' where insuranceId = ${insId}`;
    //         console.log(updateSQL);
    //
    //         const request = new sql.Request(transaction);
    //         request.query(updateSQL, function (err, result) {
    //             if (err) {
    //                 console.error('Error in query:', err);
    //                 transaction.rollback();
    //                 // return res.json({responseCode: 1, error: true, message: err.message });
    //                 return res.render("paymentSuccess", {error: true})
    //
    //             }
    //
    //             transaction.commit();
    //             res.render("paymentSuccess", {error: false})
    //         });
    //     } catch (error) {
    //         console.error('Error in transaction:', error);
    //         transaction.rollback();
    //         // return res.json({responseCode: 1, error: true, message: 'An error occurred' });
    //         return res.render("paymentSuccess", {error: true})
    //     }

    // console.log(req.payType)

}


flightController.GetTicketedBookings = async (req, res) => {
    let connection;
    try {
        // let {bookingId}= req.body;
        let {agentId} = req.agent
        const connection = await connectToDatabase();

        let [recordset] = await flightServices.getTicketedBookings(connection, agentId);

        if (recordset.length === 0) {
            res.send({error: true, message: "data nhi mila", recordset: []});
        } else {
            res.send({error: false, message: "data mil gya", recordset: recordset});
        }

    } catch (err) {
        console.log(err)
        res.json({error: true, message: err, recordset: []});

    } finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}

flightController.GetTicketedBookingsDetails = async (req, res) => {
    let connection;
    try {
        // let {bookingId}= req.body;
        let {booking_id} = req.params
        let {agentId} = req.agent
        const connection = await connectToDatabase();

        let [recordset] = await flightServices.getTicketedBookingsDetails(connection, booking_id);

        if (recordset.length === 0) {
            res.send({error: true, message: "data nhi mila", data: []});
        } else {
            res.send({error: false, message: "data mil gya", data: recordset});
        }

    } catch (err) {
        console.log(err)
        res.json({error: true, message: err, recordset: []});

    } finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}


// flightController.GetHoldBookings = async (req, res) => {
//     let connection;
//     try {
//         let {agentId} = req.agent
//         const connection = await connectToDatabase();
//
//         let [recordset] = await flightServices.getHoldBookings(connection, agentId);
//         console.log("Data here",recordset)
//         if (recordset.length === 0) {
//             return res.send({responseCode: 1, error: false, warning: true, message: "Data Not Available"});
//             // res.send({error: true, message: "Data Not Available"});
//         } else {
//             return res.send({responseCode: 1, error: false, warning: false, recordset: recordset});
//
//         }
//
//     } catch (err) {
//         console.log(err)
//         return res.send({responseCode: 1, error: true, warning: false,  message: err});
//
//     } finally {
//         if (connection) connection.release();  // Return the connection to the pool
//     }
// }
flightController.GetHoldBookings = async (req, res) => {
    let connection;
    try {
        const { agentId } = req.agent;
        connection = await connectToDatabase();

        const [recordset] = await flightServices.getHoldBookings(connection, agentId);
        console.log("Data here", recordset);

        if (recordset.length === 0) {
            return res.send({ responseCode: 1, error: false, warning: true, recordset: [] });
        } else {
            return res.send({ responseCode: 1, error: false, warning: false, recordset: recordset });
        }
    } catch (err) {
        console.log(err);
        return res.send({ responseCode: 1, error: true, warning: false, message: err.message });
    } finally {
        if (connection) connection.release();
    }
};

flightController.GetHoldBookingsDetails = async (req, res) => {
    let connection;
    try {
        // let {bookingId}= req.body;
        let {booking_id} = req.params
        let {agentId} = req.agent
        const connection = await connectToDatabase();

        let [recordset] = await flightServices.getTicketedBookingsDetails(connection, booking_id);

        if (recordset.length === 0) {
            res.send({error: true, message: "Data Not Available", data: []});
        } else {
            res.send({error: false, message: "data mil gya", data: recordset});
        }

    } catch (err) {
        console.log(err)
        res.json({error: true, message: err, recordset: []});

    } finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}


flightController.AddFlightSearchData = async (req, res) => {
    console.log(req.body);
    let connection;
    try {
        // Extract data from request
        let clientIp = req.headers['x-forwarded-for']?.split(',').shift() || req.connection?.remoteAddress || req.socket?.remoteAddress;
        let {agentId} = req.agent;
        let {from, to, adult, child, infant, travel_date, return_date, fare_type} = req.body;

        // Determine journey type
        let journey_type = return_date ? "roundtrip" : "oneway";

        // Calculate total number of passengers
        let total_no_of_pax = parseInt(adult) + parseInt(child) + parseInt(infant);
        const time = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss");

        // Establish connection to the database
        connection = await connectToDatabase();

        // Call service to add flight search data
        let [recordset] = await flightServices.addFlightSearchData(
            connection, agentId, from, to, total_no_of_pax, adult, child, infant,
            travel_date, return_date, journey_type, fare_type, time, clientIp
        );

        // Send response back to the client
        res.send({error: false, message: "success", data: recordset});
    } catch (err) {
        console.error(err);
        res.json({error: true, message: err.message, recordset: []});
    } finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
};

flightController.showRazorPayWindow = async (req, res) => {
    console.log(req.body)
    const tx = new Date().getTime().toString();
    const {finalAmt, name, email, gCharge, contact, CompanyId, paymentMethod, payType, insId} = req.body;
    // console.log(data)
    if (paymentMethod === "wallet") {
        console.log("oye")
        console.log(req.body)
        let connection
        try {
            let {agentId} = req.agent
            const time = moment().tz(process.env["TIME_ZONE"]).format("YYYY-MM-DD HH:mm:ss")
            connection = await connectToDatabase();
            let [getWalletId] = await agentServices.getWalletId(connection, agentId)
            let [result] = await agentServices.addWalletDetails(connection, getWalletId[0].id, 'Debit', finalAmt, time, 'Wallet', 'Flight Booked', 'self')

            res.redirect(`/flights/flightPaymentSuccess/${insId}/${tx}/${paymentMethod}/${gCharge}`);
        } catch (e) {
            console.log('-----', e.message)
            res.redirect(`/flights/flightPaymentFail/${insId}/${tx}/${paymentMethod}`)
        } finally {
            if (connection) connection.release();  // Return the connection to the pool
        }
    } else {
        console.log("oye1")
        const options = {
            key: 'rzp_test_VWMHIe8lj7h1ib', // Use environment variable
            amount: parseInt(finalAmt) * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Travel Deals Online", // your business name
            description: "Test Transaction",
            image: "https://www.traveldealsonline.com/Content/images/logo.png",
            prefill: {
                "name": `${name}`, //your customer's name
                "email": `${email}`,
                "contact": `${contact}` //Provide the customer's phone number for better conversion rates
            },
            config: {
                display: {
                    blocks: {
                        banks: {
                            name: `Pay via ${paymentMethod}`,
                            instruments: [
                                {
                                    method: `${payType}`
                                }
                            ],
                        },
                    },
                    sequence: ['block.banks'],
                    preferences: {
                        show_default_blocks: false,
                    },
                },
            },
            callback_url: `${process.env.CALL_BACK_URL}/flights/flightPaymentSuccess/${insId}/${tx}/${paymentMethod}/${gCharge}`,

            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#ff0000"
            }
        };
        res.json(options);
    }
};


flightController.flightCheckout = async (req, res) => {

    console.log(req.session.test);
    res.render("flights/flight_checkout", req.session.test);
}

flightController.goToCheckout = async (req, res) => {
    console.log(req.body);
    let connection
    try {

        connection = await connectToDatabase();

        let [addData] = await flightServices.makeBookingSession(connection, req.body.traceId, JSON.stringify(req.body), req.body.trip);

        req.session.test = req.body;
        res.status(200).send('Redirecting...');
    } catch (error) {
        // Handle error
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    } finally {
        if (connection) connection.release();  // Return the connection to the pool
    }
}

flightController.RoundFlightResults = (req, res) => {

    res.render("flights/roundSearchResults", {agentEmail: req.agent.agentEmail,userType: req.agent.userType})
}

flightController.returnFixedBook = async (req, res) => {
    let tdate = req.session.tdate;
    // let agentEmail = req.user.JWT_EMAIL;
    // let traceId = req.session.traceId;
    // let selectSQL = select * from Flights.searchingSession  where traceId='${traceId}' and agentEmail = '${agentEmail}'
    // console.log(selectSQL)
    // let request = new sql.Request();
    // request.query(selectSQL, (err, rows) => {
    //     if (err) {
    //         res.json({error: true, message: err.message, recordset: []});
    //     }
    //     else {
    //         console.log(rows);
    //         let {recordset} = rows;

    res.render("flights/roundFixedFlightBook", {
        markup: '1',
        book: '1',
        platformFee: '1',
        platformTax: 1,
        tdate,
        traceId: 1,
        agentEmail: req.agent.agentEmail,
        userType: req.agent.userType
    })

    //
    //     }
    // })
}
module.exports = flightController;
