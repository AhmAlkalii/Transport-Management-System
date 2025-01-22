import React from 'react';

const About = () => {
  return (
    <div className="about">
      <h2>About TransportApp</h2>
      <p>
        TransportApp is dedicated to providing reliable and affordable transport solutions. 
        Our mission is to make travel easy and accessible for everyone, with real-time tracking, 
        secure payments, and a user-friendly booking experience.
      </p>
      <div className="about-details">
        <h3>Our Key Features</h3>
        <ul>
          <li><strong>Easy Booking:</strong> Book your tickets in just a few clicks from the comfort of your home.</li>
          <li><strong>Real-Time Tracking:</strong> Track your bus or train in real time and stay updated about your journey.</li>
          <li><strong>Secure Payments:</strong> Multiple payment options with the highest level of security.</li>
        </ul>
        <h3>Why Choose Us?</h3>
        <p>
          We prioritize customer satisfaction by offering a seamless and convenient travel experience. 
          Our team is constantly working to innovate and improve our platform, ensuring it meets the needs of modern travelers.
        </p>
        <p>
          With TransportApp, you can plan your trips with confidence, knowing that you're in good hands.
        </p>
      </div>
    </div>
  );
};

export default About;
