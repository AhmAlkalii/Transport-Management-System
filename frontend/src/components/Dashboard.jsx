import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [trips, setTrips] = useState([]);
  const [searchParams, setSearchParams] = useState({
    origins: "",
    destinations: "",
    departure_time: "now",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/trips/");
      setTrips(response.data);
    } catch (error) {
      console.error("Error fetching trips:", error);
      setTrips([]);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/trips/spec",
        searchParams
      );
      setTrips(response.data.routes || []);
    } catch (error) {
      console.error("Error searching trips:", error);
      setTrips([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value,
    });
  };

  const handleTripClick = (tripId) => {
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
        <input
          type="text"
          name="departure_time"
          placeholder="Departure Time (ISO or 'now')"
          value={searchParams.departure_time}
          onChange={handleInputChange}
        />
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
              <h3>{trip.vehName}</h3>
              <p>
                <strong>Type:</strong> {trip.vehType}
              </p>
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
                {trip.departure_time === "now"
                  ? "Now"
                  : new Date(trip.departure_time * 1000).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p>No trips available. Try adjusting your search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
