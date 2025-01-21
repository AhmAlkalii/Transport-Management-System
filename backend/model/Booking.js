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


BookingSchema.statics.CreateBooking = async function (
    UserID, TripID, SeatID, vehType, vehName,
    origins, destinations, duration, SeatNumber, SeatClass
  ) {
    
  
    if (!UserID) throw Error("UserID is missing");
    if (!TripID) throw Error("TripID is missing");
    if (!SeatID) throw Error("SeatID is missing");
    if (!vehType) throw Error("Vehicle type is missing");
    if (!vehName) throw Error("Vehicle name is missing");
    if (!origins) throw Error("Origin is missing");
    if (!destinations) throw Error("Destination is missing");
    if (!duration) throw Error("Duration is missing");
    if (!SeatNumber) throw Error("Seat number is missing");
    if (!SeatClass) throw Error("Seat class is missing");
  
    const booking = await this.create({
      UserID, TripID, SeatID, vehType, vehName,
      origins, destinations, duration, SeatNumber, SeatClass
    });
  
    return booking;
  };
  


module.exports = mongoose.model("Booking", BookingSchema)