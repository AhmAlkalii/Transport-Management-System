const express = require("express")
const { getAllBooking, getUserBooking } = require("../controller/Booking")
const requireAuth = require('../middleware/requireAuth')


const Router = express.Router()



Router.get('/', getAllBooking)

// Authentication for routes
Router.use(requireAuth)

Router.get('/Specific', getUserBooking)


module.exports = Router