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
        type: Schema.Types.ObjectId,
        ref: 'payments'
    },
    vehType:{
        type: String,
        required: true
    },
    vehName:{
        type: String,
        required: true
    },
    origins : {
        type: String,
        required: true
    },
    destinations : {
        type: String,
        required: true
    },
    duration : {
        type: String,
        required: true
    },
    SeatNumber:{
        type: Number,
        required: true
    },
    SeatClass:{
        type: String,
        required: true
    }
}, {timestamps: true})


//He can get the booking date by accessing the createdAt


BookingSchema.statics.CreateBooking = async function (UserID, TripID, SeatID, PaymentID, vehType, vehName, 
origins, destinations, duration, SeatNumber, SeatClass) 
{
    if( !UserID|| !TripID|| !SeatID|| !PaymentID|| !vehType|| !vehName||
        !origins|| !destinations|| !duration|| !SeatNumber|| !SeatClass)
    {
        throw Error("All fields need to be filled in!!")
    }

    const booking = await this.create({
        UserID, TripID, SeatID, PaymentID, vehType, vehName, 
        origins, destinations, duration, SeatNumber, SeatClass
    })

    return booking;
}



module.exports = mongoose.model("Booking", BookingSchema)