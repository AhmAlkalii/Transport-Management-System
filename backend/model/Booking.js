const mongoose = require("mongoose")


const Schema = mongoose.Schema

const BookingSchema = new Schema({
    UserID:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    TripID:{
        type: Schema.Types.ObjectId,
        ref: 'trips'
    },
    SeatID:{
        type: Schema.Types.ObjectId,
        ref: 'seats'
    },
    PaymentID:{

    }
}, {timestamps: true})


//He can get the booking date by accessing the createdAt


