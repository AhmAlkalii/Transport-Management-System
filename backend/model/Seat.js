const mongoose = require("mongoose")

const Schema = mongoose.Schema

const sNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
const classes = ['Economy', 'Business']

const SeatSchema = new Schema({
    VehicleID:{
        type: Schema.Types.ObjectId,
        ref: 'vehicles'
    },
    SeatNumber:{
        type: Number,
        enum: sNumbers,
        required: true
    },
    SeatClass:{
        type: String,
        enum: classes,
        required: true
    }
},{timestamps: true})



    
SeatSchema.statics.CreateSeat = async function (VehicleID, SeatNumber, SeatClass) {
    // Validate inputs
    if (!VehicleID || !SeatNumber || !SeatClass) {
        throw Error("One or More Fields are incomplete.👎");
    }
    
    if (!sNumbers.includes(SeatNumber)) {
        throw Error("Seat does not exist.👎");
    }
    
    if (!classes.includes(SeatClass)) {
        throw Error("Class does not exist.👎");
    }
    
    const checkSeat = await this.findOne({ VehicleID, SeatNumber });
    if (checkSeat) {
        throw Error("Seat is already taken! Please select another.👎");
    }
    
    const seat = await this.create({ VehicleID, SeatNumber, SeatClass });
    return seat;
};

 

SeatSchema.statics.upDateSeat = async function (VehicleID, SeatNumber, SeatClass) {
    const filter = { VehicleID }; 
    const update = {};
  
    
    if (SeatNumber && !sNumbers.includes(SeatNumber)) {
      throw Error("Seat does not exist.👎");
    }
  

    if (SeatClass && !classes.includes(SeatClass)) {
      throw Error("Class does not exist.👎");
    }
  
  
    if (SeatNumber) update.SeatNumber = SeatNumber;
    if (SeatClass) update.SeatClass = SeatClass;
  

    if (Object.keys(update).length === 0) {
      throw Error("No updates provided.👎");
    }
  

    const seat = await this.findOneAndUpdate(filter, update, { new: true });
  

    if (!seat) {
      throw Error("Seat not found or update failed.👎");
    }
  
    return seat;
};
  
  

module.exports = mongoose.model("Seat", SeatSchema);