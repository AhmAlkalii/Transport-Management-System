const Seat = require("../model/Seat");


const getSeats = async (req, res) => {
    const seats = await Seat.find();
    res.status(200).json(seats);
};

const getSeat = async (req, res) => {
    const { id } = req.params;

    const seat = await Seat.findById({ _id: id });

    res.status(200).json(seat);
};

const createSeat = async (req, res) => {
    const { VehicleID, SeatNumber, SeatClass } = req.body;

    try {
        if (!VehicleID || !SeatNumber || !SeatClass) {
            throw new Error("All fields are required");
        }

        const seat = await Seat.CreateSeat(VehicleID, SeatNumber, SeatClass);
        res.status(200).json({ seat });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const updateSeat = async (req, res) => {
    const { VehicleID, SeatNumber, SeatClass } = req.body;

    try {
        const update = await Seat.updateSeats(VehicleID, SeatNumber, SeatClass);
        res.status(200).json({ update });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteSeat = async (req, res) => {
    const { id } = req.params;
    try {
        const seat = await Seat.findByIdAndDelete({ _id: id });
        res.status(204).json("Seat Deleted✅");
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = { getSeats, getSeat, createSeat, updateSeat, deleteSeat };
