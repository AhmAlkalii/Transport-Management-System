import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <h1>TransportApp</h1>
    <nav>
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/about" className="nav-link">About</Link>
      <a href="#features" className="nav-link">Features</a>
      <a href="#" className="nav-link">Sign In</a>
    </nav>
  </header>
);

export default Header;