import React from 'react';
import './Settings.css';
import { useTheme } from './ThemeContext';

const SettingsPanel = ({ isOpen, onClose }) => {
    const { themes, setTheme } = useTheme();

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
                            <button
                                className="theme-option"
                                onClick={() => setTheme('theme1')}
                                style={{ background: 'var(--theme-color0)' }}
                            >
                                Theme 1
                            </button>
                            <button
                                className="theme-option"
                                onClick={() => setTheme('theme2')}
                                style={{ background: 'var(--theme-color0)' }}
                            >
                                Theme 2
                            </button>
                            <button
                                className="theme-option"
                                onClick={() => setTheme('theme3')}
                                style={{ background: 'var(--theme-color0)' }}
                            >
                                Theme 3
                            </button>
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