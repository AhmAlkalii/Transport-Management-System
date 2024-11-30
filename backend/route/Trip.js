const express = require("express")
const { getAllTrips, createTrip, getSpecTrips } = require("../controller/Trip")


const Router = express.Router()



Router.get('/', getAllTrips)
Router.get('/spec', getSpecTrips)
Router.post('/create', createTrip)


module.exports = Router