import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import myLogo from '../assets/images/logoImage.png';
import schoolLogo from '../assets/images/schoolLogo2.png';
// import resumePDF from '../assets/TylerLaytonResume25_26.pdf';
import Settings from '../components/settings/Settings';
import './Header.css';

const Header = ({ settingsOpen, setSettingsOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openResume = () => {
    window.open('/TylerLaytonResume25_26.pdf', '_blank');
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
          <button
            className="settings-btn"
            onClick={() => setSettingsOpen(true)}
          >
            <svg
              className="settings-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="12"
                r="3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <Settings
          isOpen={settingsOpen}
          onClose={() => setSettingsOpen(false)}
        />
      </div>
    </header>
  );
};

export default Header;