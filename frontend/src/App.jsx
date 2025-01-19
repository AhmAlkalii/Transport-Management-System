import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import Footer from './components/Footer';
import About from './components/About';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <Features />
            </>
          } />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;