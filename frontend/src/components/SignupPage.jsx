import React, { useState } from 'react';
import { useSignup } from "../hooks/useSignup";
import { Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(name, email, number, password);
  };

  return (
    <div className="one">
      <div className='wrapper'>
      <h2>Registration</h2>
      <form className="signup" onSubmit={handleSubmit}>
        <div className="input-box">
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
        
        <div className="input-box">
          <input
            type="text"
            placeholder="Enter your number"
            onChange={(e) => setNumber(e.target.value)}
            value={number}
            required
          />
        </div>
        <div className="input-box">
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Create password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <div className="input-box button">
          <input type="Submit" value="Register Now" disabled={isLoading} />
        </div>
        {error && <div className="error">{error}</div>}
        <div className="text">
          <h3>Already have an account? <Link to='/Login'>Login now</Link></h3>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Signup;
