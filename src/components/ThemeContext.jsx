import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [activeTheme, setActiveTheme] = useState(() => {
        // Load active theme name from localStorage
        return localStorage.getItem('activeTheme') || 'theme1';
    });

    const themes = {
        theme1: [ // Deep Ocean Blues
            { r: 10, g: 20, b: 30 },     // rgb(10, 20, 30) - Midnight Navy
            { r: 10, g: 38, b: 71 },     // rgb(10, 38, 71) - Deep Ocean
            { r: 20, g: 66, b: 114 },    // rgb(20, 66, 114) - Royal Blue
            { r: 120, g: 168, b: 232 },  // rgb(120, 168, 232) - Sky Blue
            { r: 169, g: 215, b: 255 }   // rgb(169, 215, 255) - Light Azure
        ],
        theme2: [ // Forest Greens
            { r: 0, g: 0, b: 0 },        // rgb(0, 0, 0) - Pure Black
            { r: 0, g: 52, b: 14 },      // rgb(0, 52, 14) - Pine Green
            { r: 0, g: 102, b: 22 },     // rgb(0, 102, 22) - Forest Green
            { r: 106, g: 168, b: 79 },   // rgb(106, 168, 79) - Sage Green
            { r: 147, g: 196, b: 125 }   // rgb(147, 196, 125) - Mint Green
        ],
        theme3: [ // Muted Purples
            { r: 34, g: 34, b: 59 },     // rgb(34, 34, 59) - Dark Slate
            { r: 74, g: 78, b: 105 },    // rgb(74, 78, 105) - Deep Lilac
            { r: 154, g: 140, b: 152 },  // rgb(154, 140, 152) - Dusty Rose
            { r: 201, g: 173, b: 167 },  // rgb(201, 173, 167) - Soft Clay
            { r: 242, g: 233, b: 228 }   // rgb(242, 233, 228) - Warm Ivory
        ],
        theme4: [ // Gold & Navy Contrast
            { r: 0, g: 8, b: 20 },       // rgb(0, 8, 20) - Rich Black
            { r: 0, g: 29, b: 61 },      // rgb(0, 29, 61) - Oxford Blue
            { r: 0, g: 53, b: 102 },     // rgb(0, 53, 102) - Yale Blue
            { r: 255, g: 195, b: 0 },    // rgb(255, 195, 0) - Vibrant Gold
            { r: 255, g: 214, b: 10 }    // rgb(255, 214, 10) - Sunny Yellow
        ],
        theme5: [ // Ocean Greens
            { r: 34, g: 87, b: 122 },    // rgb(34, 87, 122) - Deep Teal
            { r: 56, g: 163, b: 165 },   // rgb(56, 163, 165) - Turquoise
            { r: 87, g: 204, b: 153 },   // rgb(87, 204, 153) - Emerald
            { r: 128, g: 237, b: 153 },  // rgb(128, 237, 153) - Light Mint
            { r: 199, g: 249, b: 204 }   // rgb(199, 249, 204) - Pale Green
        ],
        theme6: [ // Cool Grays
            { r: 224, g: 251, b: 252 },  // rgb(224, 251, 252) - Ice Blue
            { r: 194, g: 223, b: 227 },  // rgb(194, 223, 227) - Powder Blue
            { r: 157, g: 180, b: 192 },  // rgb(157, 180, 192) - Silver Gray
            { r: 92, g: 107, b: 115 },   // rgb(92, 107, 115) - Storm Gray
            { r: 37, g: 50, b: 55 }      // rgb(37, 50, 55) - Charcoal
        ]
    };

    useEffect(() => {
        // Save active theme to localStorage
        localStorage.setItem('activeTheme', activeTheme);

        // Apply theme variables to root element
        const currentTheme = themes[activeTheme];
        document.documentElement.style.setProperty(
            '--theme-color0',
            `${currentTheme[0].r}, ${currentTheme[0].g}, ${currentTheme[0].b}`
        );
        document.documentElement.style.setProperty(
            '--theme-color1',
            `${currentTheme[1].r}, ${currentTheme[1].g}, ${currentTheme[1].b}`
        );
        document.documentElement.style.setProperty(
            '--theme-color2',
            `${currentTheme[2].r}, ${currentTheme[2].g}, ${currentTheme[2].b}`
        );
        document.documentElement.style.setProperty(
            '--theme-color3',
            `${currentTheme[3].r}, ${currentTheme[3].g}, ${currentTheme[3].b}`
        );
        document.documentElement.style.setProperty(
            '--theme-color4',
            `${currentTheme[4].r}, ${currentTheme[4].g}, ${currentTheme[4].b}`
        );
    }, [activeTheme]);

    const setTheme = (themeName) => {
        if (themes[themeName]) {
            setActiveTheme(themeName);
        }
    };

    return (
        <ThemeContext.Provider value={{
            currentTheme: themes[activeTheme],
            themes,
            setTheme
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);