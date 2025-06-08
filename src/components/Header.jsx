import React from 'react';
import './Header.css'; // We'll create this CSS file
import settingsImage from '../assets/images/settings-button.png'; // Import your custom image

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <div className="logo">TL</div>
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