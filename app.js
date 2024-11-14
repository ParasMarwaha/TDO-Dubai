const express = require('express');
const app = express();
const fileupload=require("express-fileupload")
const cookieParser = require('cookie-parser');
const logger = require("morgan")

const dotenv = require('dotenv')
const cors = require('cors');
dotenv.config()
const session = require('express-session')

app.use(cors())
app.use(logger("dev"));
app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json())
app.set('view engine', 'ejs');
app.use(fileupload({}))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge : 6000000000 }
}))

app.use(express.urlencoded({extended:true}))
const agentRouter = require("./routes/client/agent")
const indexRouter = require("./routes/client")
const adminRouter = require("./routes/admin/index")
const flightsRoute = require("./routes/flights/flightRoute")
app.use("/agent", agentRouter);
app.use("/admin", adminRouter);
app.use("/flights", flightsRoute);
app.use("/", indexRouter);

// Handle all routes and render index.ejs for client-side routing
// app.get('*', (req, res) => {
//     res.render("agent/login") // Send the EJS file to handle client-side routing
// });

const PORT = process.env.PORT || 4000
app.listen(PORT,'0.0.0.0', () => console.log('Server is running on port: ',PORT));