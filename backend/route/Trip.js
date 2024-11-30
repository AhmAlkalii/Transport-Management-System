const express = require("express")
const { getAllTrips, createTrip } = require("../controller/Trip")


const Router = express.Router()


Router.get('/', getAllTrips)
Router.post('/create', createTrip)


module.exports = Router