const express = require('express')
const paymentProccessing = require('../controllers/stripeController')

const router = express.Router()

router.post('/', paymentProccessing)


module.exports = router