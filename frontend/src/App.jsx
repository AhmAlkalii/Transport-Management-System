import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import Footer from './components/Footer';
import About from './components/About';
import NotFound from './components/NotFound';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import TripDetails from './components/TripDetails';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <Features />
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/auth"
            element={<AuthRedirectWrapper />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trip-details/:tripId" element={<TripDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

const AuthRedirectWrapper = () => {
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    navigate('/dashboard');
  };

  return <Auth onAuthSuccess={handleAuthSuccess} />;
};

export default App;
