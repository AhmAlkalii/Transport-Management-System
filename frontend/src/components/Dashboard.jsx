// Dashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [trips, setTrips] = useState([]);
  const [useNow, setUseNow] = useState(false);

  // For searching:
  const [searchParams, setSearchParams] = useState({
    origins: "",
    destinations: "",
    departure_time: "",
  });

  const navigate = useNavigate();

  // Handle Search
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      // Build final params
      const finalParams = {
        origins: searchParams.origins,
        destinations: searchParams.destinations,
        departure_time: useNow ? "now" : searchParams.departure_time,
      };


      console.log(finalParams)
      // Make GET request with query parameters
      const response = await axios.get("http://localhost:4000/Trip/spec", {
        params: finalParams, // 
      });

      setTrips(response.data.routes || []);
    } catch (error) {
      console.error("Error searching trips:", error);
      setTrips([]);
    }
  };

  // Handle Input Changes (origins, destinations, departure_time)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // On trip card click, navigate to details (if you have a route for that)
  const handleTripClick = (tripId) => {
    console.log("Trip ID:", tripId); 
    navigate(`/trip-details/${tripId}`);
  };

  return (
    <div className="dashboard">
      <h1>Trips Dashboard</h1>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          name="origins"
          placeholder="Origin"
          value={searchParams.origins}
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="destinations"
          placeholder="Destination"
          value={searchParams.destinations}
          onChange={handleInputChange}
        />

        <div className="checkbox-field">
          <input
            type="checkbox"
            id="useNow"
            checked={useNow}
            onChange={() => setUseNow(!useNow)}
          />
          <label htmlFor="useNow">Use current time (now)?</label>
        </div>

        {/* Show a date/time picker only if "useNow" is false */}
        {!useNow && (
          <input
            type="datetime-local"
            name="departure_time"
            placeholder="Select departure date/time"
            value={searchParams.departure_time}
            onChange={handleInputChange}
          />
        )}

        <button type="submit">Search</button>
      </form>

      <div className="trip-cards">
        {trips.length > 0 ? (
          trips.map((trip) => (
            <div
              className="trip-card"
              key={trip._id}
              onClick={() => handleTripClick(trip._id)}
            >
              <div className="card-header"><strong>Vehicle Name:</strong> {trip.vehName}</div>
                <ul className="list-group">
                  <li className="list-group-item">
                    <strong>Type:</strong> {trip.vehType}
                  </li>
                  <li className="list-group-item">
                    <strong>Origin:</strong> {trip.origins}
                  </li>
                  <li className="list-group-item">
                    <strong>Destination:</strong> {trip.destinations}
                  </li>
                  <li className="list-group-item">
                    <strong>Duration:</strong> {trip.duration}
                  </li>
                  <li className="list-group-item">
                    <strong>Departure:</strong>{" "}
                    {trip.departure_time === "now"
                      ? "Now"
                      : new Date(trip.departure_time * 1000).toLocaleString()}
                  </li>
                </ul>
            </div>
          ))
        ) : (
          <p>No trips to display. Please enter your search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
