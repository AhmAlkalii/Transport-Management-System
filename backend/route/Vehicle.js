const express = require("express")
const { getVehicles, getVehicle, createVehicle, updateVehicle, deleteVehicle } = require("../controller/Vehicle")

const Router = express.Router()


Router.get('/', getVehicles)
Router.get('/:id', getVehicle)
Router.post('/create', createVehicle)
Router.put('/:id', updateVehicle)
Router.delete('/:id', deleteVehicle)


module.exports = Router