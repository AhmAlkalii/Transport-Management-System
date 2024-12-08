const Trip = require("../model/Trip")
const Vehicle = require('../model/Vehicle')
const RRoute = require('../model/Route')
const Seat = require("../model/Seat")
const Payment = require('../model/Payment')
const Booking = require("../model/Booking")



const getRandomVehicle = async (vtype) => {
    try {
        
        const total = await Vehicle.countDocuments({ VType: vtype });

        if (total > 0) {
            const random = Math.floor(Math.random() * total);  
            console.log('Random index:', random);

            
            const randomVehicle = await Vehicle.findOne({ VType: vtype }).skip(random);
            console.log('Random Vehicle:', randomVehicle);
            return randomVehicle;
        } else {
            console.log('No vehicles found for the specified type.');
            return null;
        }
    } catch (error) {
        console.error('Error getting vehicle:', error);
        throw error;
    }
};


const getRoute = async (origins, destinations, departure_time) => {
    const timeBuffer = 18000;

    const trips = await Trip.find({
        origins: { $regex: new RegExp(origins, 'i') },
        destinations: { $regex: new RegExp(destinations, 'i') },
        departure_time: { 
            $gte: departure_time - timeBuffer, 
            $lte: departure_time + timeBuffer 
        },
    });

    console.log(trips)
    return trips;
};

const getAllTrips = async (req, res) => {
    const trips = await Trip.find({})

    res.status(200).json(trips)
}

const getSingleRoute = async (id) => {
    const routes = await RRoute.findById({_id: id})
    return routes;
}

const getSpecTrips = async (req, res) => {
    const {origins, destinations, departure_time} = req.body 
    try{

        const departureTimeUnix =
            departure_time === "now"
                ? Math.floor(Date.now() / 1000)
                : departure_time
                ? Math.floor(new Date(departure_time).getTime() / 1000)
                : Math.floor(Date.now() / 1000);
        
        console.log(departureTimeUnix)

        const routes = await getRoute(origins, destinations, departureTimeUnix);
        
        res.status(200).json({routes})
    } catch (err) {
        res.status(400).json({err: err.message})
    }
}



const createTrip = async (req, res) => {
    const { RouteID, vtype, departure_time, UserID,  SeatNumber,
         SeatClass, Amount, PaymentMethod } = req.body;

    try {
        
        if (!RouteID || !vtype) {
            throw new Error("RouteID and Vehicle type are required");
        }

        const nRoute = await getSingleRoute(RouteID);
        const theVehicleType = await getRandomVehicle(vtype);
        console.log("this is the type",theVehicleType)

        const departureTimeUnix =
            departure_time === "now"
                ? Math.floor(Date.now() / 1000)
                : departure_time
                ? Math.floor(new Date(departure_time).getTime() / 1000)
                : Math.floor(Date.now() / 1000);

       
        const trip = await Trip.create({
            RouteID,
            VehicleID: theVehicleType._id,
            vehType: theVehicleType.VType,
            vehName: theVehicleType.VName,
            origins: nRoute.origins,
            destinations: nRoute.destinations,
            duration: nRoute.duration,
            departure_time: departureTimeUnix,
        });

        const seat = await Seat.CreateSeat(trip.VehicleID, SeatNumber, SeatClass)
        const payment = await Payment.MakePayment(UserID, Amount, PaymentMethod)

        const booking = await Booking.CreateBooking(
            UserID, trip._id, seat._id, payment._id, trip.vehType, trip.vehName,
            trip.origins, trip.destinations, trip.duration, SeatNumber, SeatClass
        )

        console.log(booking)
        
        res.status(201).json({ message: "Trip created successfully", trip });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};


  

module.exports = {getAllTrips, createTrip, getSpecTrips}