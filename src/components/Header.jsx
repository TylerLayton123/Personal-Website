import React from 'react';
import './Header.css'; 
import { Link } from 'react-router-dom';
import settingsImage from '../assets/images/settings-button.png'; 
import myLogo from '../assets/images/logoImage.png';
import schoolLogo from '../assets/images/schoolLogo.png';

const Header = () => {
  return (
    <header className="header">
      <div className="left-group"> 
        <div className="logo-container">
          <Link to="/">
            <img 
              src={myLogo} 
              alt="TaskLeap Logo" 
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
      <div className="settings-container">
        <button className="settings-btn">
          <img 
            src={settingsImage} 
            alt="Settings" 
            className="settings-icon"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;