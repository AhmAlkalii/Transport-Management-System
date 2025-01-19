import React from 'react';
import './App.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Features from './components/Features';

const App = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <Features />
    </div>
  );
};

export default App;