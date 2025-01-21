import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";

const MyBookings = () => {
  const { user } = useAuthContext(); 
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:4000/Booking/Specific", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setBookings(response.data);
      } catch (err) {
        console.error("Error fetching bookings:", err.response?.data?.error || err.message);
        setError("Failed to load bookings. Please try again.");
        toast.error("Failed to load bookings. Please try again.");
      }
    };

    if (user) {
      fetchBookings();

      // Set up periodic refresh
      const intervalId = setInterval(fetchBookings, 1000);

      // Cleanup the interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [user]);

  if (error) return <p>{error}</p>;
  if (!bookings.length) return <p>No bookings found.</p>;

  return (
    <div className="my-bookings">
      <h1>My Bookings</h1>
      <div className="booking-list">
        {bookings.map((booking) => (
          <div key={booking._id} className="card" style={{ width: "18rem", margin: "1rem" }}>
            <div className="card-header">
              {booking.vehName}
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><strong>Type:</strong> {booking.vehType}</li>
              <li className="list-group-item"><strong>Origin:</strong> {booking.origins}</li>
              <li className="list-group-item"><strong>Destination:</strong> {booking.destinations}</li>
              <li className="list-group-item"><strong>Duration:</strong> {booking.duration}</li>
              <li className="list-group-item"><strong>Seat Number:</strong> {booking.SeatNumber}</li>
              <li className="list-group-item"><strong>Class:</strong> {booking.SeatClass}</li>
              <li className="list-group-item"><strong>Booking Date:</strong> {new Date(booking.createdAt).toLocaleDateString()}</li>
              <li className="list-group-item"><strong>Booking Time:</strong> {new Date(booking.createdAt).toLocaleTimeString()}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
