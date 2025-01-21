import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import Footer from './components/Footer';
import About from './components/About';
import NotFound from './components/NotFound';
import Dashboard from './components/Dashboard';
import TripDetails from './components/TripDetails';
import PaymentComponent from './components/PaymentComponent';
import { useAuthContext } from './hooks/useAuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/LoginPage';
import Signup from './components/SignupPage';
import MyBookings from './components/UserBookings';

const App = () => {
  const { user } = useAuthContext();

  return (
    <div className="app-wrapper">
      <Router>
        <Header />
        <div className="content-wrapper">
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
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/Login" />} />
            <Route path="/trip-details/:tripId" element={user ? <TripDetails /> : <Navigate to="/Login" />} />
            <Route path="/payment/:tripId" element={user ? <PaymentComponent /> : <Navigate to="/Login" />} />
            <Route path="/booking" element={user ? <MyBookings /> : <Navigate to="/Login" />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/Sign-Up" element={!user ? <Signup /> : <Navigate to="/" />} />
            <Route path="/Login" element={!user ? <Login /> : <Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </Router>
      <ToastContainer />
    </div>
  );
};

export default App;
