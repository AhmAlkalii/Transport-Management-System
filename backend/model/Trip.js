const mongoose = require("mongoose")

const Schema = mongoose.Schema


const TripSchema = new Schema({
    RouteID:{
        type: Schema.Types.ObjectId,
        ref: 'routes'
    },
    VehicleID:{
        type: Schema.Types.ObjectId,
        ref: 'vehicles'
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
    departure_time:{
        type: Number,
        default: 'now',
    }
}, {timestamps: true})


module.exports = mongoose.model("Trip", TripSchema)
