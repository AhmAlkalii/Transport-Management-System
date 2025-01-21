const express = require("express")
const { getAllTrips, createBooking, getSpecTrips, populateTrip, getTripDetails } = require("../controller/Trip")


const Router = express.Router()



Router.get('/', getAllTrips)
Router.get('/spec', getSpecTrips)
Router.post('/create', createBooking)
Router.post('/populate', populateTrip)
Router.get('/:tripId', getTripDetails);


module.exports = Router