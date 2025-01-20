import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TripDetails = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchTripDetails();
    fetchSeats();
  }, [tripId]);

  const fetchTripDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/Trip/${tripId}`);
      setTrip(response.data);
    } catch (error) {
      console.error("Error fetching trip details:", error);
    }
  };

  const fetchSeats = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/seats?VehicleID=${tripId}`
      );
      setSeats(response.data);
    } catch (error) {
      console.error("Error fetching seats:", error);
    }
  };

  const handleSeatSelection = (seat) => {
    setSelectedSeat(seat);
    setErrorMessage("");
  };

  const handleConfirmSeat = async () => {
    if (!selectedSeat) {
      setErrorMessage("Please select a seat.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/seats/create", {
        VehicleID: tripId,
        SeatNumber: [selectedSeat.SeatNumber],
        SeatClass: selectedSeat.SeatClass,
      });
      setSuccessMessage(`Seat ${selectedSeat.SeatNumber} booked successfully!`);
      setSelectedSeat(null);
      fetchSeats(); // Refresh seat availability
    } catch (error) {
      console.error("Error booking seat:", error);
      setErrorMessage("Failed to book the seat. Please try again.");
    }
  };

  if (!trip) {
    return <div>Loading trip details...</div>;
  }

  return (
    <div>
      <h1>Trip Details</h1>
      <h2>{trip.vehName}</h2>
      <p>
        <strong>Origin:</strong> {trip.origins}
      </p>
      <p>
        <strong>Destination:</strong> {trip.destinations}
      </p>
      <p>
        <strong>Duration:</strong> {trip.duration}
      </p>
      <p>
        <strong>Departure:</strong>{" "}
        {new Date(trip.departure_time * 1000).toLocaleString()}
      </p>

      <h2>Select a Seat</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <div className="seat-grid">
        {seats.map((seat) => (
          <button
            key={seat._id}
            className={`seat-button ${
              seat.isBooked
                ? "booked"
                : selectedSeat?.SeatNumber === seat.SeatNumber
                ? "selected"
                : ""
            }`}
            disabled={seat.isBooked}
            onClick={() => handleSeatSelection(seat)}
          >
            {seat.SeatNumber} ({seat.SeatClass})
          </button>
        ))}
      </div>
      <button onClick={handleConfirmSeat}>Confirm Seat</button>
    </div>
  );
};

export default TripDetails;
