const Payment = require('../model/Payment')

const makePayment = async (req, res) => {
    const {UserID, Amount, PaymentMethod} = req.body

    try{
        const payment = await Payment.MakePayment(UserID, Amount, PaymentMethod)
    
        res.status(200).json({payment})
    }
    catch(err){
        res.status(400).json({err: err.message})
    }
}


const getAllPayments = async (req, res) => {
    const payment = await Payment.find({})

    res.status(200).json(payment)
}

module.exports = {makePayment, getAllPayments}