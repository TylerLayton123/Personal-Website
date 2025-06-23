import React from 'react';
import './Settings.css';
import { useTheme } from './ThemeContext';
import ThemeCreator from './ThemeCreator';

const SettingsPanel = ({ isOpen, onClose }) => {
    const {
        themes,
        setTheme,
        isAddingTheme,
        startAddingTheme,
        newThemeName,
        setNewThemeName,
        newThemeColors,
        updateNewThemeColor,
        saveNewTheme,
        cancelNewTheme,
        deleteTheme
    } = useTheme();

    const builtInThemeNames = [
        'theme1', 'theme2', 'theme3',
        'theme4', 'theme5', 'theme6',
        'theme7', 'theme8', 'theme9'
    ];

    const customThemeNames = Object.keys(themes)
        .filter(name => !builtInThemeNames.includes(name));

    const renderColorStripe = (color, width) => (
        <div
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
                            {/* Built-in themes */}
                            {builtInThemeNames.map(themeName => (
                                <button
                                    key={themeName}
                                    className="theme-preview"
                                    onClick={() => setTheme(themeName)}
                                >
                                    <div className="theme-colors">
                                        {themes[themeName]?.slice(0, 5).map((color, idx) =>
                                            renderColorStripe(color, 100 / 5)
                                        )}
                                    </div>
                                    <span className="theme-name">{themeName.replace('theme', 'Theme ')}</span>
                                </button>
                            ))}

                            {/* Custom themes */}
                            {customThemeNames.map(themeName => (
                                <div key={themeName} className="theme-preview-container">
                                    <button
                                        className="theme-preview"
                                        onClick={() => setTheme(themeName)}
                                    >
                                        <div className="theme-colors">
                                            {themes[themeName]?.slice(0, 5).map((color, idx) =>
                                                renderColorStripe(color, 100 / 5)
                                            )}
                                        </div>
                                        <span className="theme-name">{themeName}</span>
                                    </button>
                                    <button
                                        className="delete-theme-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteTheme(themeName);
                                        }}
                                        aria-label={`Delete ${themeName}`}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}

                            {/* Add theme buttons */}
                            {Array.from({ length: 3 }).map((_, idx) => (
                                <button
                                    key={`add-${idx}`}
                                    className="add-theme"
                                    onClick={startAddingTheme}
                                >
                                    <div className="add-icon">+</div>
                                    <span className="add-text">Add Theme</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Theme creator modal */}
                    {isAddingTheme && (
                        <ThemeCreator
                            newThemeName={newThemeName}
                            setNewThemeName={setNewThemeName}
                            newThemeColors={newThemeColors}
                            updateNewThemeColor={updateNewThemeColor}
                            saveNewTheme={saveNewTheme}
                            cancelNewTheme={cancelNewTheme}
                        />
                    )}

                    <div className="other-settings">
                        <h3>Other Options</h3>
                        {/* Other settings content here */}
                    </div>
                </div>
            </div >
        </>
    );
};

export default SettingsPanel;