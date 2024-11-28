const mongoose = require("mongoose")

const Schema = mongoose.Schema

const RouteSchema = new Schema({
    Start_Location : {
        type: String,
        required: true
    },
    End_Location : {
        type: String,
        required: true
    },
    Estimated_Time : {
        type: String,
        required: true
    },
    Distance:{
        type: String,
        required: true
    }
},{timestamps: true})