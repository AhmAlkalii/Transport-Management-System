import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true); // Toggle between Sign In and Sign Up
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    PNumber: '',
    Password: '',
    Role: 'User',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    setFormData({
      Name: '',
      Email: '',
      PNumber: '',
      Password: '',
      Role: 'User',
    });
    setError(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignIn
      ? 'http://localhost:4000/User/login'
      : 'http://localhost:4000/User/signup';
    const payload = isSignIn
      ? { Email: formData.Email, Password: formData.Password }
      : {
          Name: formData.Name,
          Email: formData.Email,
          PNumber: formData.PNumber,
          Password: formData.Password,
          Role: formData.Role,
        };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        if (isSignIn) {
          localStorage.setItem('token', data.token); // Save JWT token
          navigate('/dashboard'); // Navigate to the dashboard or another route after login
        } else {
          alert('Signup successful. Please log in.');
          setIsSignIn(true); // Switch to the login form
        }
      } else {
        setError(data.err || 'An error occurred. Please try again.');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
    }
  };

  return (
    <section className="auth">
      <h2>{isSignIn ? 'Sign In' : 'Sign Up'}</h2>
      <button onClick={toggleForm} className="toggle-button">
        {isSignIn ? 'Switch to Sign Up' : 'Switch to Sign In'}
      </button>
      <form onSubmit={handleSubmit}>
        {!isSignIn && (
          <>
            <label>Name:</label>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              required
            />
            <label>Phone Number:</label>
            <input
              type="text"
              name="PNumber"
              value={formData.PNumber}
              onChange={handleChange}
              required
            />
            <label>Role:</label>
            <select name="Role" value={formData.Role} onChange={handleChange}>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </>
        )}
        <label>Email:</label>
        <input
          type="email"
          name="Email"
          value={formData.Email}
          onChange={handleChange}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          name="Password"
          value={formData.Password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isSignIn ? 'Sign In' : 'Sign Up'}</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </section>
  );
};

export default Auth;
