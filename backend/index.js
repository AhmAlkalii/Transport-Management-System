require('dotenv').config()
const express =  require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const UserRoutes = require("./route/User")
const VehicleRoutes = require("./route/Vehicle")
const SeatRoutes = require("./route/Seat")
const RouteRoutess = require("./route/Route")
const TripRoutes = require('./route/Trip')
const PaymentRoutes = require('./route/Payment')
const StripeRoutes = require('./route/stripe')
const BookingRoutes = require('./route/Booking')
// const Booking = require("./model/Trip");
const app = express()


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


//Routes
app.use('/User', UserRoutes)
app.use('/Vehicle', VehicleRoutes)
app.use('/Seat', SeatRoutes)
app.use('/Route', RouteRoutess)
app.use('/Trip', TripRoutes)
app.use('/Payment', PaymentRoutes)
app.use('/Stripe',StripeRoutes);
app.use('/Booking',BookingRoutes);


// const deleteAllSeats = async () => {
//     try {
//       await Booking.deleteMany({});
//       console.log("All seats deleted successfully.");
//     } catch (error) {
//       console.error("Error deleting seats:", error);
//     }
//   };
//Connection String
mongoose.connect(process.env.MONGO_URI)
.then(() =>{
    app.listen(process.env.PORT, () => {
        console.log(`App running on`,process.env.PORT, `and Connect To MongoDB`)
    })

    // deleteAllSeats()
}).catch((error) => {
    console.log(error)
})




