import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthContext } from "../hooks/useAuthContext";
import { PopupComp } from "../../stripeComponents/PopupComp";

const TripDetails = () => {
  const { tripId } = useParams();
  const { user } = useAuthContext();
  const [trip, setTrip] = useState(null);
  const [error, setError] = useState(null);
  const [seatNumbers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatClass, setSeatClass] = useState("Economy");
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/Trip/${tripId}`);
        setTrip(response.data);
      } catch (err) {
        console.error("Error fetching trip details:", err);
        setError("Failed to load trip details.");
      }
    };

    if (tripId) fetchTripDetails();
  }, [tripId]);

  useEffect(() => {
    if (trip) {
     
      setTotalAmount(selectedSeats.length * trip.amount);
    }
  }, [selectedSeats, trip]);

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleBuyTicket = async () => {
    try {
      if (!trip) {
        toast.error("Trip details not loaded.");
        return;
      }

      if (selectedSeats.length === 0) {
        toast.error("Please select at least one seat.");
        return;
      }

      const bookingData = {
        TripID: trip._id,
        RouteID: trip.RouteID,
        UserID: user?.user?._id,
        SeatNumber: selectedSeats,
        SeatClass: seatClass,
        Amount: totalAmount, 
        PaymentMethod: "Stripe",
      };

      const response = await axios.post("http://localhost:4000/Trip/create", bookingData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      toast.success("Booking successful!");
    } catch (error) {
      console.error("Error booking seats:", error.response?.data?.error || error.message);
      toast.error(error.response?.data?.error || "Booking failed. Please try again.");
    }
  };

  if (error) return <p>{error}</p>;
  if (!trip) return <p>Loading trip details...</p>;

  return (
    <div className="trip-details">
      <h1>{trip.vehName}</h1>
      <p><strong>Type:</strong> {trip.vehType}</p>
      <p><strong>Origin:</strong> {trip.origins}</p>
      <p><strong>Destination:</strong> {trip.destinations}</p>
      <p><strong>Duration:</strong> {trip.duration}</p>
      <p><strong>Departure:</strong> {new Date(trip.departure_time * 1000).toLocaleString()}</p>

      <h2>Select Seats</h2>
      <div className="seat-grid">
        {seatNumbers.map((seat) => (
          <button
            key={seat}
            className={`seat ${selectedSeats.includes(seat) ? "selected" : ""}`}
            onClick={() => handleSeatClick(seat)}
          >
            {seat}
          </button>
        ))}
      </div>

      <div className="payment-section">
        <label htmlFor="seatClass">Class:</label>
        <select
          id="seatClass"
          value={seatClass}
          onChange={(e) => setSeatClass(e.target.value)}
        >
          <option value="Economy">Economy</option>
          <option value="Business">Business</option>
        </select>

        <PopupComp total={`$${totalAmount}`} handleBuyTicket={handleBuyTicket} />
      </div>
    </div>
  );
};

export default TripDetails;
