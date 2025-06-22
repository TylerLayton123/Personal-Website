import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [activeTheme, setActiveTheme] = useState(() => {
        // Load active theme name from localStorage
        return localStorage.getItem('activeTheme') || 'theme1';
    });

    // rgb(10, 20, 30)';
    // 'rgb(10, 38, 71)';
    // 'rgb(20, 66, 114)';
    // 'rgb(120, 168, 232)';
    // 'rgb(169, 215, 255)';

    // { r: 59, g: 6, b: 10 },
    // { r: 138, g: 0, b: 0 },
    // { r: 200, g: 63, b: 18 },
    // { r: 255, g: 242, b: 135 }

    // rgb(32, 87, 129)
    // rgb(79, 149, 157)
    // rgb(152, 210, 192)
    // rgb(246, 248, 213)
    // 

    const themes = {
        theme1: [
            { r: 10, g: 20, b: 30 },    // Darkest navy
            { r: 10, g: 38, b: 71 },    // Deep blue
            { r: 20, g: 66, b: 114 },   // Medium blue
            { r: 120, g: 168, b: 232 },   // Bright blue
            { r: 169, g: 215, b: 255 }   // Light blue
        ],
        theme2: [
            { r: 0, g: 0, b: 0 },        // Pure black (#000000)
            { r: 0, g: 52, b: 14 },      // Dark green (#00340e)
            { r: 0, g: 102, b: 22 },     // Medium green (#006616)
            { r: 106, g: 168, b: 79 },   // Light green (#6aa84f)
            { r: 147, g: 196, b: 125 }   // Pastel green (#93c47d)
        ],
        theme3: [
            { r: 34, g: 34, b: 59 },      // Space Cadet
            { r: 74, g: 78, b: 105 },     // Ultra Violet
            { r: 154, g: 140, b: 152 },   // Rose Quartz
            { r: 201, g: 173, b: 167 },   // Pale Dogwood
            { r: 242, g: 233, b: 228 }    // Isabelline
        ]
        // theme3: [
        //     { r: 32, g: 87, b: 129 },
        //     { r: 79, g: 149, b: 157 },
        //     { r: 152, g: 210, b: 192 },
        //     { r: 246, g: 248, b: 213 }
        // ]

        // Add more themes as needed
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