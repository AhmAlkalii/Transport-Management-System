const Vehicle = require("../model/Vehicle")


const getVehicles = async(req, res) => {
    const vehicle = await Vehicle.find()

    res.status(200).json(vehicle)
}


const getVehicle = async(req, res) => {
    const {id} = req.params

    const vehicle = await Vehicle.findById({_id : id})

    res.status(200).json(vehicle)
}


const createVehicle = async (req, res) => {
    const {VType, VName} = req.body

    try{
        const vehicle = await Vehicle.VCreate(VType, VName)

        res.status(200).json({vehicle})
    }
    catch(err){
        res.status(400).json({err: err.message})
    }
}

const updateVehicle = async (req, res) => {
    const {id} = req.params
    const {VType, VName} = req.body

    const update = {}

    try{
        if(VType) update.VType = VType
        if(VName) update.VName = VName

        const vehicle = await Vehicle.findByIdAndUpdate({_id: id}, update, {
            new: true
        })

        res.status(200).json({vehicle})
    }
    catch(err){
        res.status(400).json({err: err.message})
    }
}


const deleteVehicle = async(req, res) => {
    const {id} = req.params
    try{
        const vehicle = await Vehicle.findByIdAndDelete({_id: id})

        res.status(204).json("Vehicle Deleted✅")
    }
    catch(err){
        res.status(400).json({err: err.message})
    }
}


module.exports = {
    getVehicles, getVehicle, createVehicle, updateVehicle, deleteVehicle
}