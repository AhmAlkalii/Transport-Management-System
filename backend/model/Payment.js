const mongoose = require("mongoose")
const User = require('./User')

const Schema = mongoose.Schema


const prizes = ["$10", "$5", "$40"]
const paymentMethods =  ['Visa', 'MasterCard', 'PayPal', 'Blik', 'Stripe']


const PaymentSchema = new Schema({
    UserID:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    Amount:{
        type: String,
        enum: prizes,
        required: true
    },
    PaymentMethod:{
        type: String,
        enum: paymentMethods,
        required: true
    }
},{timestamps: true})


PaymentSchema.statics.MakePayment = async function (UserID, Amount, PaymentMethod) {
    
    if(!UserID || !Amount || !PaymentMethod){
        throw Error("All fields need to be filled in!!")
    }

    if(!prizes.includes(Amount)){
        throw Error("Amount does not exist! Please use the given amounts, $10, $5, $40")
    }

    if(!paymentMethods.includes(PaymentMethod)){
        throw Error("Sorry payment method is not currently avaialable for our application")
    }

    const checkUser = await User.findById({_id: UserID})

    if(!checkUser){
        throw Error("User does not exist")
    }

    const payment = await this.create({UserID, Amount, PaymentMethod})

    return payment;
}

module.exports = mongoose.model("Payment", PaymentSchema)