import React from 'react';
import './ThemeCreator.css';

// Helper to convert RGB to hex for color input
const rgbToHex = (r, g, b) => {
    return "#" + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }).join('');
};

const ThemeCreator = ({
    newThemeName,
    setNewThemeName,
    newThemeColors,
    updateNewThemeColor,
    saveNewTheme,
    cancelNewTheme
}) => {
    return (
        <div className="theme-creator-modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Create New Theme</h3>
                    <button className="modal-close-btn" onClick={cancelNewTheme}>
                        <span className="close-icon">✕</span>
                    </button>
                </div>

                <div className="theme-name-input">
                    <div className="name-counter">
                        <label>Theme Name:</label>
                        <span className="char-count">{newThemeName.length}/10</span>
                    </div>
                    <input
                        type="text"
                        value={newThemeName}
                        onChange={(e) => setNewThemeName(e.target.value.slice(0, 10))}
                        placeholder="Enter theme name"
                        maxLength={10}
                    />
                </div>

                <div className="color-pickers-container">
                    <div className="color-pickers-row">
                        {newThemeColors.slice(0, 3).map((color, index) => (
                            <div key={index} className="color-picker">
                                <label>Color {index + 1}</label>
                                <div className="color-input">
                                    <input
                                        type="color"
                                        value={rgbToHex(color.r, color.g, color.b)}
                                        onChange={(e) => {
                                            const hex = e.target.value;
                                            const r = parseInt(hex.slice(1, 3), 16);
                                            const g = parseInt(hex.slice(3, 5), 16);
                                            const b = parseInt(hex.slice(5, 7), 16);
                                            updateNewThemeColor(index, { r, g, b });
                                        }}
                                    />
                                    <div className="rgb-values">
                                        {color.r}, {color.g}, {color.b}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="color-pickers-row centered-row">
                        {newThemeColors.slice(3, 5).map((color, index) => (
                            <div key={index + 3} className="color-picker">
                                <label>Color {index + 4}</label>
                                <div className="color-input">
                                    <input
                                        type="color"
                                        value={rgbToHex(color.r, color.g, color.b)}
                                        onChange={(e) => {
                                            const hex = e.target.value;
                                            const r = parseInt(hex.slice(1, 3), 16);
                                            const g = parseInt(hex.slice(3, 5), 16);
                                            const b = parseInt(hex.slice(5, 7), 16);
                                            updateNewThemeColor(index + 3, { r, g, b });
                                        }}
                                    />
                                    <div className="rgb-values">
                                        {color.r}, {color.g}, {color.b}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="modal-actions">
                    <button className="save-btn" onClick={saveNewTheme}>
                        Save Theme
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ThemeCreator;