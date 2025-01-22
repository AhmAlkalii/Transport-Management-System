const express = require('express')
const paymentProccessing = require('../controller/stripeController')

const router = express.Router()

router.post('/', paymentProccessing)


module.exports = router