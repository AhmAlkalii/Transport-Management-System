import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext"; // Import context hook

const SeatSelection = ({ vehicleId, tripId }) => {
  const { user } = useAuthContext(); // Access user data from context
  const [seatNumbers, setSeatNumbers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  const [seatClass, setSeatClass] = useState("Economy");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState([]);

  // Fetch occupied seats for the vehicle
  useEffect(() => {
    const fetchOccupiedSeats = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/Seats/${vehicleId}`);
        setOccupiedSeats(response.data.map((seat) => seat.SeatNumber));
      } catch (error) {
        console.error("Error fetching occupied seats:", error);
      }
    };

    fetchOccupiedSeats();
  }, [vehicleId]);

  // Handle seat selection
  const handleSeatClick = (seatNumber) => {
    if (occupiedSeats.includes(seatNumber)) return; // Prevent selecting occupied seats
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber)); // Deselect seat
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]); // Select seat
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const bookingData = {
        VehicleID: vehicleId,
        TripID: tripId,
        SeatNumber: selectedSeats,
        SeatClass: seatClass,
        UserID: user?.user?._id, 
      };

      const response = await axios.post("http://localhost:4000/Seats/create", bookingData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      alert("Seats booked successfully!");
    } catch (error) {
      console.error("Error booking seats:", error.response?.data?.error || error.message);
    }
  };

  return (
    <div>
      <div className="seat-grid">
        {seatNumbers.map((seat) => (
          <button
            key={seat}
            className={`seat ${
              occupiedSeats.includes(seat) ? "occupied" : selectedSeats.includes(seat) ? "selected" : ""
            }`}
            onClick={() => handleSeatClick(seat)}
            disabled={occupiedSeats.includes(seat)}
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

      <button onClick={handleSubmit} disabled={selectedSeats.length === 0}>
        Book Seats
      </button>
    </div>
  );
};

export default SeatSelection;
