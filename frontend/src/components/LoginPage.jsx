import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
        
  };

  return (
    <div className="one">
      <div className="wrapper">
        <h2>Log In</h2>
        <form className="login" onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <div className="input-box button">
            <input type="Submit" value="Log in" disabled={isLoading} />
          </div>
          {error && <div className="error">{error}</div>}
          <div className="text">
            <h3>Don't have an account? <Link to='/Sign-Up'>Login now</Link></h3>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;