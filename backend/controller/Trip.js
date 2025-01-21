// controller/Trip.js
const Trip = require("../model/Trip");
const Vehicle = require("../model/Vehicle");
const RRoute = require("../model/Route");
const Seat = require("../model/Seat");
const Payment = require("../model/Payment");
const Booking = require("../model/Booking");

/**
 * Grab a random vehicle from the DB, given vtype.
 */
const getRandomVehicle = async (vtype) => {
  try {
    const total = await Vehicle.countDocuments({ VType: vtype });
    if (total > 0) {
      const random = Math.floor(Math.random() * total);
      const randomVehicle = await Vehicle.findOne({ VType: vtype }).skip(random);
      console.log("Random Vehicle:", randomVehicle);
      return randomVehicle;
    } else {
      console.log("No vehicles found for the specified type.");
      return null;
    }
  } catch (error) {
    console.error("Error getting vehicle:", error);
    throw error;
  }
};

/**
 * Query trips based on origins, destinations, and approximate departure_time
 * (±5 hours from the given time).

/**
 * Return all trips (if you want an admin or debug endpoint).
 */
const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find({});
    res.status(200).json(trips);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

/**
 * Fetch a single Route from the DB by ID (used to build a trip).
 */
const getSingleRoute = async (id) => {
  const route = await RRoute.findById({ _id: id });
  return route;
};

/**
 * This handles searching for trips by origins, destinations, and time.
 * NOTE: We read from req.query because we are using a GET request.
 */
// Search Trips
const getSpecTrips = async (req, res) => {
    try {
      const { origins, destinations, departure_time } = req.query;
  
      const departureTimeUnix =
        departure_time === "now"
          ? Math.floor(Date.now() / 1000)
          : Math.floor(new Date(departure_time).getTime() / 1000);
  

        //   * (±5 hours from the given time).
      const trips = await Trip.find({
        origins: new RegExp(origins, "i"),
        destinations: new RegExp(destinations, "i"),
        departure_time: {
          $gte: departureTimeUnix - 18000,
          $lte: departureTimeUnix + 18000,
        },
      });
  
      res.status(200).json({ routes: trips });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };


const populateTrip = async (req, res) => {
    try {
        const { RouteID, vtype, departure_time } = req.body;
    
        if (!RouteID || !vtype || !departure_time) {
          throw new Error("RouteID, vtype, and departure_time are required");
        }
    
        // Fetch route and vehicle
        const nRoute = await getSingleRoute(RouteID);
        if (!nRoute) throw new Error("No route found for the given RouteID");
    
        const theVehicleType = await getRandomVehicle(vtype);
        if (!theVehicleType) throw new Error("No vehicle found for the given type");
    
        // Convert departure_time to Unix timestamp (seconds)
        const departureTimeUnix = Math.floor(new Date(departure_time).getTime() / 1000);
    
        // Create the Trip
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
    
        res.status(201).json({ message: "Test Trip created successfully", trip });
      } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const findTrip = async (tripId) => {
  try {
    const trip = await Trip.findById(tripId);
    if (!trip) {
      throw new Error("Trip not found");
    }
    return trip;
  } catch (error) {
    console.error("Error getting trip:", error);
    throw error;
  }
};


const getTripDetails = async (req, res) => {
  const { tripId } = req.params;
  console.log("Received Trip ID:", tripId)
  try {
    const trip = await Trip.findById(tripId);

    if (!trip) {
      return res.status(404).json({ error: "Trip not found." });
    }

    res.status(200).json(trip);
  } catch (err) {
    console.error("Error fetching trip details:", err);
    res.status(500).json({ error: "Failed to fetch trip details." });
  }
};


const createBooking = async (req, res) => {
  const { TripID, RouteID, UserID, SeatNumber, SeatClass, Amount, PaymentMethod } = req.body;

  try {
    // Validate required fields
    if (!TripID || !RouteID || !UserID || !SeatNumber || !SeatClass || !Amount || !PaymentMethod) {
      throw new Error("All fields are required to create a booking");
    }

    // Fetch trip details
    const trip = await findTrip(TripID);
    const nRoute = await getSingleRoute(RouteID);
    if (!trip || !nRoute) {
      throw new Error("Invalid Trip or Route details");
    }

    // Create payment
    const payment = await Payment.MakePayment(UserID, Amount, PaymentMethod);

    // Initialize an array to store created bookings
    const createdBookings = [];

    // Iterate over SeatNumbers to create a seat and booking for each
    for (const seat of SeatNumber) {
      // Create individual seat
      const createdSeat = await Seat.CreateSeat(trip.VehicleID, [seat], SeatClass);

      // Create booking for this seat
      const booking = await Booking.CreateBooking(
        UserID,
        trip._id,
        createdSeat[0]._id, // Use the first (and only) seat created in this iteration
        payment._id,
        trip.vehType,
        trip.vehName,
        trip.origins,
        trip.destinations,
        trip.duration,
        seat, // Current seat number
        SeatClass
      );

      // Add the created booking to the array
      createdBookings.push(booking);
    }

    // Return the response with all created bookings
    res.status(201).json({ message: "Booking created successfully", bookings: createdBookings });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};





module.exports = { getAllTrips, createBooking, getSpecTrips, populateTrip, getTripDetails };
