import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [routes, setRoutes] = useState([]);
  const [searchParams, setSearchParams] = useState({
    origins: "",
    destinations: "",
    departure_time: "now",
  });
  const navigate = useNavigate();

  // Fetch routes when the component mounts
  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/routes/");
      setRoutes(response.data);
    } catch (error) {
      console.error("Error fetching routes:", error);
      setRoutes([]);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/routes/spec", // Assuming this endpoint exists for searching routes
        searchParams
      );
      setRoutes(response.data.routes || []);
    } catch (error) {
      console.error("Error searching routes:", error);
      setRoutes([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value,
    });
  };

  const handleRouteClick = (routeId) => {
    navigate(`/route-details/${routeId}`);
  };

  return (
    <div className="dashboard">
      <h1>Routes Dashboard</h1>
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
      <div className="route-cards">
        {routes.length > 0 ? (
          routes.map((route) => (
            <div
              className="route-card"
              key={route._id}
              onClick={() => handleRouteClick(route._id)}
            >
              <h3>{route.vehicleName}</h3>
              <p>
                <strong>Origin:</strong> {route.origin}
              </p>
              <p>
                <strong>Destination:</strong> {route.destination}
              </p>
              <p>
                <strong>Duration:</strong> {route.duration}
              </p>
              <p>
                <strong>Distance:</strong> {route.distance}
              </p>
              <p>
                <strong>Departure:</strong>{" "}
                {route.departure_time === "now"
                  ? "Now"
                  : new Date(route.departure_time * 1000).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p>No routes available. Try adjusting your search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
