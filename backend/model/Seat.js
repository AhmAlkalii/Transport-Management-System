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
  if (!VehicleID || !SeatClass || !SeatNumber || !Array.isArray(SeatNumber)) {
    throw Error("Fields are incomplete.👎");
  }

  if (!classes.includes(SeatClass)) {
    throw Error("Invalid SeatClass.👎");
  }

  for (let seat of SeatNumber) {
    if (!sNumbers.includes(seat)) {
      throw Error(`SeatNumber ${seat} is invalid.👎`);
    }

    const existingSeat = await this.findOne({ VehicleID, SeatNumber: seat, SeatClass });
    if (existingSeat) {
      throw Error(`SeatNumber ${seat} in ${SeatClass} class is already taken!👎`);
    }
  }

  const createdSeats = [];
  for (let seat of SeatNumber) {
    const newSeat = await this.create({ VehicleID, SeatNumber: seat, SeatClass });
    createdSeats.push(newSeat);
  }

  return createdSeats;
};


 

SeatSchema.statics.updateSeats = async function (VehicleID, SeatNumber, SeatClass) {
    // Validate inputs
    if (!VehicleID || !SeatNumber || !Array.isArray(SeatNumber) || !SeatClass) {
      throw Error("Fields are incomplete.👎");
    }
  
    if (!classes.includes(SeatClass)) {
      throw Error("Class does not exist.👎");
    }
  
    for (let seat of SeatNumber) {
      if (!sNumbers.includes(seat)) {
        throw Error(`SeatNumber ${seat} is invalid.👎`);
      }
    }
  
    // Check if seats exist
    const existingSeats = await this.find({ VehicleID, SeatNumber: { $in: SeatNumber } });
    if (existingSeats.length !== SeatNumber.length) {
      throw Error("One or more seats do not exist or are not found in this vehicle.👎");
    }
  
    // Update each seat
    const updatedSeats = [];
    for (let seatNumber of SeatNumber) {
      const updatedSeat = await this.findOneAndUpdate(
        { VehicleID, SeatNumber: seatNumber },
        { SeatClass },
        { new: true }
      );
      updatedSeats.push(updatedSeat);
    }
  
    return updatedSeats;
  };
  
  
  

module.exports = mongoose.model("Seat", SeatSchema);