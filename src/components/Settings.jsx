import React from 'react';
import './Settings.css';
import { useTheme } from './ThemeContext';

const SettingsPanel = ({ isOpen, onClose }) => {
    const { themes, setTheme } = useTheme();
    
    // Array of theme names to display
    const themeNames = [
        'theme1', 'theme2', 'theme3', 
        'theme4', 'theme5', 'theme6'
    ];
    
    // Function to render a color stripe
    const renderColorStripe = (color, width) => (
        <div 
            key={`${color.r}-${color.g}-${color.b}`}
            className="color-stripe"
            style={{
                backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
                width: `${width}%`
            }}
        />
    );

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
                        <div className="theme-options-grid">
                            {themeNames.map(themeName => (
                                <button
                                    key={themeName}
                                    className="theme-preview"
                                    onClick={() => setTheme(themeName)}
                                    aria-label={`Select ${themeName}`}
                                >
                                    <div className="theme-colors">
                                        {themes[themeName]?.slice(0, 5).map(color => 
                                            renderColorStripe(color, 100/5)
                                        )}
                                    </div>
                                    <span className="theme-name">{themeName.replace('theme', 'Theme ')}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="other-settings">
                        <h3>Other Options</h3>
                        {/* Other settings content here */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SettingsPanel;