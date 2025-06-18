import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import settingsImage from '../assets/images/settings-button.png'; 
import myLogo from '../assets/images/logoImage.png';
import schoolLogo from '../assets/images/schoolLogo.png';
import resumePDF from '../assets/Resume24-25.pdf';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openResume = () => {
    // Replace with your actual resume URL
    window.open(resumePDF, '_blank');
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="left-group"> 
        <div className="logo-container">
          <Link to="/">
            <img 
              src={myLogo} 
              alt="Tyler Layton Logo" 
              className="logo-image"
            />
          </Link>
        </div>
        <div className="school-container">
          <a 
            href="https://www.rpi.edu/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <img 
              src={schoolLogo} 
              alt="RPI Logo" 
              className="school-logo"
            />
          </a>
        </div>
      </div>
      <div className="header-right">
        <div className="resume-container">
          <button 
            className="resume-btn"
            onClick={openResume}
          >
            Resume
          </button>
        </div>
        <div className="settings-container">
          <button className="settings-btn">
            <img 
              src={settingsImage} 
              alt="Settings" 
              className="settings-icon"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;