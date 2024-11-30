const Trip = require("../model/Trip")
const Vehicle = require('../model/Vehicle')
const RRoute = require('../model/Route')



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

        const departureTimeUnix = departure_time
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
    const { RouteID, vtype, departure_time } = req.body;

    try {
        
        if (!RouteID || !vtype) {
            throw new Error("RouteID and Vehicle type are required");
        }

        const nRoute = await getSingleRoute(RouteID);
        const type = await getRandomVehicle(vtype);
        console.log("this is the type",type)

        const departureTimeUnix = departure_time
            ? Math.floor(new Date(departure_time).getTime() / 1000) 
            : Math.floor(Date.now() / 1000);

       
        const trip = await Trip.create({
            RouteID,
            VehicleID: type._id,
            vehType: type.VType,
            vehName: type.VName,
            origins: nRoute.origins,
            destinations: nRoute.destinations,
            duration: nRoute.duration,
            departure_time: departureTimeUnix,
        });

        res.status(201).json({ message: "Trip created successfully", trip });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};


  

module.exports = {getAllTrips, createTrip, getSpecTrips}