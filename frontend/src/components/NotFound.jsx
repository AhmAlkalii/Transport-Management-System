import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <section className="not-found">
    <h2>404 - Page Not Found</h2>
    <p>Sorry, the page you're looking for does not exist.</p>
    <Link to="/" className="not-found-link">Go back to Home</Link>
  </section>
);

export default NotFound;