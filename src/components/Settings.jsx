

// src/components/SettingsPanel.jsx
import React from 'react';
import './Settings.css';

const SettingsPanel = ({ isOpen, onClose }) => {
    // rgb(32, 87, 129)
    // rgb(79, 149, 157)
    // rgb(152, 210, 192)
    // rgb(246, 248, 213)

    // rgb(10, 38, 71)
    // rgb(20, 66, 114)
    // rgb(32, 82, 149)
    // rgb(44, 116, 179)

    return (
        <>
            <div className={`settings-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>
            <div className={`settings-panel ${isOpen ? 'open' : ''}`}>
                <div className="settings-header">
                    <h2>Settings</h2>
                    <button className="close-btn" onClick={onClose}>
                        <span className="close-icon">✕</span>
                    </button>
                </div>

                <div className="settings-content">
                    <div className="theme-section">
                        <h3>Color Theme</h3>
                        <div className="theme-options">
                            <button className="theme-option theme-dark">Dark</button>
                            <button className="theme-option theme-light">Light</button>
                            <button className="theme-option theme-blue">Blue</button>
                        </div>
                    </div>

                    <div className="other-settings">
                        <h3>Other Options</h3>

                    </div>
                </div>
            </div>
        </>
    );
};

export default SettingsPanel;