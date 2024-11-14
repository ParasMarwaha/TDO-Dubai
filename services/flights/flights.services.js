const connectToDatabase = require("../../db/connection");

const flightsServices = {}


flightsServices.airlines = async (connection, searchQuery) => {
    return connection.execute(`
        SELECT AirportName, AirportCode, CityName
        FROM Airport
        WHERE AirportName LIKE CONCAT('%', ?, '%') 
        OR AirportCode LIKE CONCAT('%', ?, '%')
        OR CityName LIKE CONCAT('%', ?, '%')
        ORDER BY 
            CASE 
                WHEN AirportCode LIKE CONCAT('%', ?, '%') THEN 0
                WHEN AirportName LIKE CONCAT('%', ?, '%') THEN 1
                WHEN CityName LIKE CONCAT('%', ?, '%') THEN 2
                ELSE 3
            END,
            CASE 
                WHEN AirportCode LIKE CONCAT('%', ?, '%') THEN AirportCode
                ELSE CityName
            END
    `, [searchQuery, searchQuery, searchQuery, searchQuery, searchQuery, searchQuery, searchQuery]);
};

flightsServices.checkSearchingSession = async (connection, traceId, agentEmail) => {
    return connection.execute(`  SELECT traceId, agentEmail 
            FROM searchingSession
            WHERE traceId = ? AND agentEmail = ?;`, [traceId, agentEmail]);
}

flightsServices.updateSearchingSession = async (connection, markupValue, searchObject, platformFee, platformTax, returnBook, returnMarkup, returnId, traceId, agentEmail) => {
    return connection.execute(` UPDATE searchingSession
                SET markupValue = ?, 
                    searchObject = ?, 
                    platformFee = ?, 
                    platformTax = ?, 
                    returnBook = ?, 
                    returnMarkup = ?, 
                    returnId = ?
                WHERE traceId = ? AND agentEmail = ?;`, [markupValue, searchObject, platformFee, platformTax, returnBook, returnMarkup, returnId, traceId, agentEmail])
}

flightsServices.insertSearchingSession = async (connection, agentEmail, traceId, markupValue, searchObject, platformFee, platformTax, returnBook, returnMarkup, returnId) => {
    console.log('Inserting values:', [agentEmail, traceId, markupValue, searchObject, platformFee, platformTax, returnBook, returnMarkup, returnId]);
    return connection.execute(`
        INSERT INTO searchingSession (
            agentEmail,
            traceId,
            markupValue,
            searchObject,
            platformFee,
            platformTax,
            returnBook,
            returnMarkup,
            returnId
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `, [agentEmail, traceId, markupValue, searchObject, platformFee, platformTax, returnBook, returnMarkup, returnId]);
};

flightsServices.makeBookingSession = async (connection, traceId, data, trip) => {
    console.log('Inserting values:', [traceId, data, trip]);
    return connection.execute(`
        INSERT INTO bookingSession (
            traceId,
            data,
            tripType
        ) 
        VALUES (?, ?, ?);
    `, [traceId, data, trip]);
};

flightsServices.bookFlight = async (connection, traceId, agentEmail) => {
    console.log(`${traceId} ------- ${agentEmail}`)
    return connection.execute(`select * from searchingSession  where traceId= ? and agentEmail = ?`, [traceId, agentEmail]);
}

flightsServices.success = async (connection, traceId) => {
    console.log(`${traceId} -------`)
    return connection.execute(`select * from bookingSession  where traceId= ?`, [traceId]);
}

flightsServices.ticketDetail = async (connection, bookingId) => {
    return connection.execute(`
        SELECT 
            b.total_no_of_pax,
            b.booking_id,
            b.total_adult,
            b.total_child,
            b.GDSPNR as PNR,
            b.airline_pnr as Airline_PNR,
            b.total_infant,
            DATE_FORMAT(b.booking_date_time, '%d-%b-%Y %H:%i:%s') AS booking_date_time,
            b.response_json,
            b.total_base_fare,
            b.total_tax,
            b.total_gross_fare,
            b.total_net_fare,
            bd.booking_detail_id,
            bd.title,
            bd.first_name,
            bd.last_name,
            bd.date_of_birth,
            bd.passport_no,
            bd.passport_expiry_date,
            bd.passport_issue_date,
            bd.barcode,
            bd.origin,
            bd.destination,
            bd.flight_number,
            bd.flight_name,
            bd.iata_code,
            DATE_FORMAT(bd.departure_date, '%d-%b-%Y %H:%i:%s') AS departure_date,
            DATE_FORMAT(bd.arrival_date, '%d-%b-%Y %H:%i:%s') AS arrival_date,
            bd.duration,
            bd.departure_terminal,
            bd.arrival_terminal,
            bd.fare_name,
            bd.booking_status,
            bd.ticket_status,
            -- Using JSON_OBJECT to create JSON for each flight sector
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'sectorO', bs.origin,
                    'sectorD', bs.destination,
                    'departureDate', DATE_FORMAT(bs.departure, '%d-%b-%Y %H:%i:%s'),
                    'arrivalDate', DATE_FORMAT(bs.arrival, '%d-%b-%Y %H:%i:%s'),
                    'duration', bs.duration
                )
            ) AS flight_sectors
        FROM flight_booking b
        JOIN flight_booking_details bd ON b.booking_id = bd.booking_id
        JOIN flight_sectors bs ON b.booking_id = bs.booking_id
        WHERE b.booking_id = ?
        GROUP BY b.booking_id, bd.booking_detail_id;
    `, [bookingId]);
};

flightsServices.addFlightBookingData = async (connection,agentId,total_no_of_pax, totalAdult, totalChild, totalInfant, gdspnr, booking_date_time, response_json, total_base_fare, total_tax, total_gross_fare, total_net_fare, pnr) => {
    return connection.execute(`insert into flight_booking(agent_id,total_no_of_pax, total_adult, total_child, total_infant, GDSPNR, booking_date_time, response_json, total_base_fare, total_tax, total_gross_fare, total_net_fare, airline_pnr)
Values(${agentId},${total_no_of_pax},${totalAdult},${totalChild},${totalInfant},'${gdspnr}', '${booking_date_time}','${response_json}',${total_base_fare},${total_tax},${total_gross_fare},${total_net_fare}, '${pnr}')`);
};


flightsServices.getBookingId = async (connection) => {
    return connection.execute(`SELECT booking_id FROM flight_booking ORDER BY booking_id DESC LIMIT 1`);
};


flightsServices.addFlightBookingDetails = async (connection, booking_id, title, firstName, lastName,paxType, dateOfBirth, passportNo, passportExpiry, passportIssueCountry, barcodes, origin, destination, flightNumber, flightName, iataCode, departureDate, arrivalDate, duration, departureTerminal, arrivalTerminal, fareName, bookingStatus, ticketStatus) => {
    return connection.execute(`insert into flight_booking_details(booking_id, title, first_name, last_name,pax_type, date_of_birth, passport_no, passport_expiry_date, passport_issue_date, barcode, origin, destination, flight_number, flight_name, iata_code, departure_date, arrival_date, duration,departure_terminal,arrival_terminal,fare_name,booking_status,ticket_status)
Values(${booking_id},'${title}','${firstName}','${lastName}','${paxType}','${dateOfBirth}','${passportNo}','${passportExpiry}','${passportIssueCountry}','${barcodes}','${origin}','${destination}','${flightNumber}','${flightName}','${iataCode}','${departureDate}','${arrivalDate}','${duration}','${departureTerminal}','${arrivalTerminal}','${fareName}','${bookingStatus}','${ticketStatus}')`);
};


flightsServices.addTrip = async (connection, booking_id, origin, destination, departure, arrival, duration, basicFare, totalTax, totalFare, netAmount, grossFare, airlinePNR, baggage, cabinBaggage, departureTerminal, arrivalTerminal, flightKey, fareType, airlineCode) => {

    return connection.execute(`insert into flight_sectors(booking_id, origin, destination, departure, arrival, duration, basic_fare, total_fare, total_tax, net_amount, gross_fare, airline_pnr, baggage, cabin_baggage, departure_terminal, arrival_terminal, flight_key, fare_type, airline_code)
        Values(${booking_id}, '${origin}', '${destination}', '${departure}', '${arrival}', '${duration}', ${basicFare}, ${totalTax}, ${totalFare}, ${netAmount}, ${grossFare}, '${airlinePNR}', '${baggage}', '${cabinBaggage}', '${departureTerminal}', '${arrivalTerminal}', '${flightKey}', '${fareType}', '${airlineCode}')`)

}

flightsServices.getTicketedBookings = async (connection,agentId) => {
    return connection.execute(`SELECT fb.booking_id, fb.agent_id, fb.total_no_of_pax, fb.total_adult, fb.total_child, fb.total_infant, 
       fb.GDSPNR as PNR, 
       DATE_FORMAT(fb.booking_date_time, '%d-%b-%Y %H:%i:%s') AS booking_date_time, 
       fb.total_base_fare, fb.total_tax, fb.total_gross_fare, fb.total_net_fare
FROM flight_booking fb
JOIN flight_booking_details fbd ON fb.booking_id = fbd.booking_id
WHERE fb.agent_id = ${agentId}
  AND fbd.booking_status = 'Ticketed'
  AND fbd.ticket_status = 'Ticketed'
GROUP BY fb.booking_id
ORDER BY fb.booking_id DESC;
`);
};

flightsServices.getHoldBookings = async (connection,agentId) => {
    return connection.execute(`SELECT fb.booking_id, fb.agent_id, fb.total_no_of_pax, fb.total_adult, fb.total_child, fb.total_infant, 
       fb.GDSPNR as PNR, 
       DATE_FORMAT(fb.booking_date_time, '%d-%b-%Y %H:%i:%s') AS booking_date_time, 
       fb.total_base_fare, fb.total_tax, fb.total_gross_fare, fb.total_net_fare
FROM flight_booking fb
JOIN flight_booking_details fbd ON fb.booking_id = fbd.booking_id
WHERE fb.agent_id = ${agentId}
  AND fbd.booking_status = 'HOLD'
  AND fbd.ticket_status = 'HOLD'
ORDER BY fb.booking_id DESC`);
};

flightsServices.getTicketedBookingsDetails = async (connection,booking_id) => {
    return connection.execute(`Select booking_detail_id, booking_id, title, first_name, last_name,  DATE_FORMAT(date_of_birth, '%d-%b-%Y') AS date_of_birth, passport_no, passport_expiry_date, passport_issue_date, barcode, origin, destination, flight_number, flight_name, iata_code, DATE_FORMAT(departure_date, '%d-%b-%Y %H:%i:%s') AS departure_date, DATE_FORMAT(arrival_date, '%d-%b-%Y %H:%i:%s') AS arrival_date, duration, departure_terminal, arrival_terminal, fare_name, booking_status, ticket_status from flight_booking_details where booking_id =${booking_id}`);
};

flightsServices.addFlightSearchData = async (connection,agentId,from,to,total_no_of_pax,adult,child,infant,travel_date,return_date,journey_type,fare_type,time,clientIp) => {
    return connection.execute(`insert into flight_search_log(agent_id, \`from\`, \`to\`, total_no_of_pax, no_of_adults, no_of_childs, no_of_infants, departure_date, return_date, journey_type, class, search_date_time, client_ip)
Values(${agentId},'${from}','${to}',${total_no_of_pax},${adult},${child},${infant},'${travel_date}','${return_date}','${journey_type}','${fare_type}','${time}','${clientIp}')`);
};


flightsServices.GetCountry = async (connection,from,to) =>{
    return connection.execute(`SELECT 
    CASE 
        WHEN (SELECT CountryCode FROM Airport WHERE CityCode = '${from}' ORDER BY CountryCode LIMIT 1) = 
             (SELECT CountryCode FROM Airport WHERE CityCode = '${to}' ORDER BY CountryCode LIMIT 1)
        THEN 'D' ELSE 'I' 
    END AS JourneyType;`)
}
module.exports = flightsServices;