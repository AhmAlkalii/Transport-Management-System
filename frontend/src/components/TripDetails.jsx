import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthContext } from "../hooks/useAuthContext";

const TripDetails = () => {
  const { tripId } = useParams();
  const navigate = useNavigate(); 
  const { user } = useAuthContext(); 
  const [trip, setTrip] = useState(null);
  const [error, setError] = useState(null);
  const [seatNumbers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  const [seatClass, setSeatClass] = useState("Economy");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("Stripe"); 
  const [amount, setAmount] = useState("$10"); 

  const allowedAmounts = ["$10", "$5", "$40"];
  const paymentMethods = ["Visa", "MasterCard", "PayPal", "Blik", "Stripe"];

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

    if (tripId) {
      fetchTripDetails();
    } else {
      setError("Trip ID is not defined.");
    }
  }, [tripId]);

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleBooking = async () => {
    try {
      if (!selectedSeats.length) {
        toast.error("Please select at least one seat.");
        return;
      }
  
      if (!amount) {
        toast.error("Please select a valid amount.");
        return;
      }
  
      const bookingData = {
        TripID: trip._id,
        RouteID: trip.RouteID,
        UserID: user?.user?._id, 
        SeatNumber: selectedSeats,
        SeatClass: seatClass,
        Amount: amount,
        PaymentMethod: paymentMethod,
      };
  
      console.log(bookingData)
      // Make API call
      const response = await axios.post("http://localhost:4000/Trip/create", bookingData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
  
      toast.success("Booking successful!");
      navigate("/"); // Redirect to home page
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

      <div className="seat-options">
        <label htmlFor="seatClass">Class:</label>
        <select
          id="seatClass"
          value={seatClass}
          onChange={(e) => setSeatClass(e.target.value)}
        >
          <option value="Economy">Economy</option>
          <option value="Business">Business</option>
        </select>
      </div>

      <div className="payment-options">
        <label htmlFor="paymentMethod">Payment Method:</label>
        <select
          id="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          {paymentMethods.map((method) => (
            <option key={method} value={method}>{method}</option>
          ))}
        </select>
      </div>

      <div className="amount-options">
        <label htmlFor="amount">Amount:</label>
        <select
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        >
          {allowedAmounts.map((amt) => (
            <option key={amt} value={amt}>{amt}</option>
          ))}
        </select>
      </div>

      <button onClick={handleBooking} disabled={selectedSeats.length === 0}>
        Book Seats
      </button>
    </div>
  );
};

export default TripDetails;
