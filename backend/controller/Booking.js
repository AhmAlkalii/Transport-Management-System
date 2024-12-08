const Booking = require("../model/Booking")


const getAllBooking = async (req, res) => {
    const booking = await Booking.find({})

    res.status(200).json(booking)
}


const getUserBooking = async (req, res) => {
    const UserID = req.user._id;
    

    try{
        const booking = await Booking.find({UserID}).sort({date: -1, time: -1})
        res.status(200).json(booking)
    }
    catch(err){
        res.status(400).json({err: err.message})
    }
}



module.exports = {getAllBooking, getUserBooking}