const express = require('express')
const { getAllPayments, makePayment } = require('../controller/Payment')

const Router = express.Router()

Router.get('/', getAllPayments)
Router.post('/makePayment', makePayment)


module.exports = Router