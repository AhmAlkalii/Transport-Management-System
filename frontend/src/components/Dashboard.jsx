import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [trips, setTrips] = useState([]);
  const [searchParams, setSearchParams] = useState({
    origins: '',
    destinations: '',
    departure_time: 'now',
  });

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await axios.get('/api/trips/'); // Updated route to match backend structure
      // Ensure the response is an array before setting the state
      if (Array.isArray(response.data)) {
        setTrips(response.data);
      } else {
        console.error('Fetched data is not an array:', response.data);
        setTrips([]); // Fallback to empty array if data is not in the expected format
      }
    } catch (error) {
      console.error('Error fetching trips:', error);
      setTrips([]); // Fallback to empty array on error
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/trips/spec', searchParams); // Adjusted to match controller logic
      // Ensure response.data.routes is an array before updating the state
      if (Array.isArray(response.data.routes)) {
        setTrips(response.data.routes);
      } else {
        console.error('Search results are not an array:', response.data.routes);
        setTrips([]); // Fallback to empty array if data is not in the expected format
      }
    } catch (error) {
      console.error('Error searching trips:', error);
      setTrips([]); // Fallback to empty array on error
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value,
    });
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
            <div className="trip-card" key={trip._id}>
              <h3>{trip.vehName}</h3>
              <p><strong>Type:</strong> {trip.vehType}</p>
              <p><strong>Origin:</strong> {trip.origins}</p>
              <p><strong>Destination:</strong> {trip.destinations}</p>
              <p><strong>Duration:</strong> {trip.duration}</p>
              <p><strong>Departure:</strong> {trip.departure_time === 'now' ? 'Now' : new Date(trip.departure_time * 1000).toLocaleString()}</p>
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
