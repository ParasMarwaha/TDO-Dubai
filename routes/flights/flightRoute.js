const express = require('express');
const flightController=require("../../controllers/flights/flightController")
const routes = express.Router()
const {verify}=require('jsonwebtoken')


const authorizeAgentHTTP = (req, res, next) => {
    console.log(req.cookies.agentAuthToken)
    if (!req.cookies.agentAuthToken) {
        return res.redirect("/")
        // return res.json({responseCode: 440, message: 'Invalid Session'})
    }

    let token = req.cookies.agentAuthToken
    let secret = process.env.JWT_SECRET
    try {
        // Decoding and verifying the token
        req.agent = verify(token, secret)
        console.log("Req.Agent",req.agent)
        if (!req.agent.agentId || !req.agent.agentName) {
            // If agentId or agentName is missing in the decoded token, send a response
            return res.send({ responseCode: 1, message: "Invalid token structure" });
        }
        next();
    } catch (error) {
        console.error("Token verification failed:", error.message);
        return res.send({ responseCode: 1, message: "Token Missing or Invalid" });
    }
}

// routes.get("/", flightController.searchPage)
routes.get("/bookFlight", authorizeAgentHTTP,flightController.bookFlight)
routes.post("/makeSearchingSession",authorizeAgentHTTP, flightController.makeSearchingSession)
routes.post("/allCities", flightController.allCities)
// routes.get("/flightResults", flightController.flightResults)
routes.post("/flightResults", flightController.flightResultsApi)
routes.post("/AirSell", flightController.AirSell);
routes.post("/AirSell-2Way", flightController.AirSellTwoWay);
routes.post("/ticket",authorizeAgentHTTP, flightController.ticket)
routes.post("/ticket-custom",authorizeAgentHTTP, flightController.ticket_custom)
routes.post("/hold",authorizeAgentHTTP, flightController.hold)
// routes.post("/getAllFlights",flightController.GetAllFlights)
// ___________________________________________________________

routes.get("/",authorizeAgentHTTP, flightController.searchPage)

routes.get("/flightResults",authorizeAgentHTTP, flightController.flightResults)
// routes.get("/searchResults",authorizeAgentHTTP, flightController.searchResults);
routes.post("/getAllFlights", flightController.getAllFlights);
routes.post("/getAllFlightsRound", flightController.getAllFlightsRound);
routes.get("/book", authorizeAgentHTTP, flightController.book);
// routes.post("/allCities", flightController.allCities);
routes.get("/checkout/:tp",authorizeAgentHTTP,flightController.Checkout)
routes.get("/flightCheckout",authorizeAgentHTTP,flightController.flightCheckout)
routes.get('/viewTicket/:bookingId', authorizeAgentHTTP, flightController.viewTicket)
routes.post('/fetchTicketDetails', authorizeAgentHTTP, flightController.fetchTicketDetails)
routes.get('/viewTicketedBookings',authorizeAgentHTTP,flightController.ViewTicketedBookings)
routes.get('/viewHoldBookings',authorizeAgentHTTP,flightController.ViewHoldBookings)
routes.post('/goToCheckout', authorizeAgentHTTP, flightController.goToCheckout)
routes.post('/goToCheckoutReturn', authorizeAgentHTTP, flightController.goToCheckoutReturn)
routes.post('/razorpay-options', authorizeAgentHTTP, flightController.showRazorPayWindow);
routes.post("/flightPaymentSuccess/:insId/:tx/:payType/:gCharge",authorizeAgentHTTP, flightController.Success);
routes.get("/flightPaymentSuccess/:insId/:tx/:payType/:gCharge",authorizeAgentHTTP, flightController.Success);
routes.get("/getTicketedBookings",authorizeAgentHTTP,flightController.GetTicketedBookings)
routes.get("/getTicketedBookingsDetails/:booking_id",authorizeAgentHTTP,flightController.GetTicketedBookingsDetails)

routes.get("/getHoldBookings",authorizeAgentHTTP,flightController.GetHoldBookings)
routes.get("/getHoldBookingsDetails/:booking_id",authorizeAgentHTTP,flightController.GetHoldBookingsDetails)


routes.post("/addFlightSearchData",authorizeAgentHTTP,flightController.AddFlightSearchData)

routes.get("/roundFlightResults",authorizeAgentHTTP, flightController.RoundFlightResults)
routes.get('/returnFixedBook',authorizeAgentHTTP, flightController.returnFixedBook)
module.exports=routes
