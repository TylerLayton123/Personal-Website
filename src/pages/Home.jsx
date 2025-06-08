import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../App.css';
import '../components/Header.css';
import '../pages/Home.css';
import '../components/Footer.css';

const Home = () => {
  const navBar = [
    {
      title: 'Experience',
      icon: '💼',
      path: '/experience',
      color: 'rgb(20, 66, 114)'
    },
    {
      title: 'Projects',
      icon: '🚀',
      path: '/projects',
      color: 'rgb(32, 82, 149)'
    },
    {
      title: 'Skills',
      icon: '🔧',
      path: '/skills',
      color: 'rgb(44, 116, 179)'
    },
    {
      title: 'Course Work',
      icon: '📚',
      path: '/coursework',
      color: 'rgb(10, 38, 71)'
    }
  ];

  return (
    <div className="home-page">
      <Header />
      
      <div className="hero-section">
        <div className="name-overlay">
          <h1>Tyler Layton</h1>
          <p>Software Developer & Designer</p>
        </div>
      </div>
      
      <div className="nav-cards-container">
        {navBar.map((card, index) => (
          <Navbar 
            key={index}
            title={card.title}
            icon={card.icon}
            path={card.path}
            color={card.color}
          />
        ))}
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;