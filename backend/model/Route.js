const mongoose = require("mongoose")

const Schema = mongoose.Schema

const RouteSchema = new Schema({
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
    distance:{
        type: String,
        required: true
    }
},{timestamps: true})



module.exports = mongoose.model("Route", RouteSchema)