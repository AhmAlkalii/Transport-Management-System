import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext(); 

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/Login'); 
    }
  };

  return (
    <section className="hero">
      <h2>Reliable and Affordable Transport Solutions</h2>
      <p>Book your next bus or train journey with ease and convenience.</p>
      <button className="hero-button" onClick={handleGetStarted}>
        Get Started
      </button>
    </section>
  );
};

export default HeroSection;
