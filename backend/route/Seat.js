const express = require("express")
const { getSeats, getSeat, createSeat, updateSeat, deleteSeat } = require("../controller/Seat")

const Router = express.Router()

Router.get('/', getSeats)
Router.get('/:id', getSeat)
Router.post('/create', createSeat)
Router.put('/edit', updateSeat)
Router.delete('/:id', deleteSeat)


module.exports = Router