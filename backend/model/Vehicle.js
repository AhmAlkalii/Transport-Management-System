const mongoose = require("mongoose")

const Schema = mongoose.Schema

const veNames = [
    'A1', 'A2', 'A3', 'B1', 'B2', 'B3','C1', 'C2', 'C3','D1'
]

const veTypes = ['Bus', 'Train']

const VehicleSchema = new Schema({
    VType:{
        type: String,
        enum: veTypes,
        required: true
    },
    VName:{
        type: String,
        enum: veNames,
        required: true
    },
    Capacity:{
        type: Number,
        defualt: 20
    }

},{timestamps: true})



VehicleSchema.statics.VCreate = async function(VType, VName){

    if(!VType || !VName){
        throw Error("One or More Fields are Empty")
    }

    if(!veTypes.includes(VType)){
        throw Error("No Such Vehicle Type!")
    }
    if(!veNames.includes(VName)){
        throw Error("Vehicle Name not valid!")
    }

    const vehicle = await this.create({VType, VName})

    return vehicle
}


module.exports = mongoose.model("Vehicle", VehicleSchema);