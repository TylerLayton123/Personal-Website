import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';

const ThemeContext = createContext();

const builtInThemes = {
    theme1: [ // Deep Ocean Blues
        { r: 10, g: 20, b: 30 },     // rgb(10, 20, 30) - Midnight Navy
        { r: 10, g: 38, b: 71 },     // rgb(10, 38, 71) - Deep Ocean
        { r: 20, g: 66, b: 114 },    // rgb(20, 66, 114) - Royal Blue
        { r: 120, g: 168, b: 232 },  // rgb(120, 168, 232) - Sky Blue
        { r: 169, g: 215, b: 255 }   // rgb(169, 215, 255) - Light Azure
    ],
    theme2: [ // Deep Navy & Teal Contrast
        { r: 11, g: 19, b: 43 },     // rgb(11, 19, 43) - Midnight Navy
        { r: 28, g: 37, b: 65 },     // rgb(28, 37, 65) - Deep Sapphire
        { r: 58, g: 80, b: 107 },    // rgb(58, 80, 107) - Steel Blue
        { r: 91, g: 192, b: 190 },   // rgb(91, 192, 190) - Turquoise Teal
        { r: 255, g: 107, b: 107 }   // rgb(255, 107, 107) - Coral Red
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
    ],
    theme7: [ // Prussian Blue & Teal
        { r: 11, g: 57, b: 84 },     // rgb(11, 57, 84)
        { r: 8, g: 126, b: 139 },    // rgb(8, 126, 139)
        { r: 191, g: 215, b: 234 },  // rgb(191, 215, 234)
        { r: 255, g: 90, b: 95 },    // rgb(255, 90, 95)
        { r: 200, g: 29, b: 37 }     // rgb(200, 29, 37)
    ],
    theme8: [ // Forest Greens
        { r: 0, g: 0, b: 0 },        // rgb(0, 0, 0) - Pure Black
        { r: 0, g: 52, b: 14 },      // rgb(0, 52, 14) - Pine Green
        { r: 0, g: 102, b: 22 },     // rgb(0, 102, 22) - Forest Green
        { r: 106, g: 168, b: 79 },   // rgb(106, 168, 79) - Sage Green
        { r: 147, g: 196, b: 125 }   // rgb(147, 196, 125) - Mint Green
    ],
    theme9: [ // Earthy Reds & Oranges
        { r: 34, g: 9, b: 1 },       // rgb(34, 9, 1)
        { r: 98, g: 23, b: 8 },      // rgb(98, 23, 8)
        { r: 148, g: 27, b: 12 },    // rgb(148, 27, 12)
        { r: 188, g: 57, b: 8 },     // rgb(188, 57, 8)
        { r: 246, g: 170, b: 28 }    // rgb(246, 170, 28)
    ]
};


export const ThemeProvider = ({ children }) => {
    const [activeTheme, setActiveTheme] = useState(() => {
        return localStorage.getItem('activeTheme') || 'theme1';
    });
    
    const [customThemes, setCustomThemes] = useState(() => {
        const saved = localStorage.getItem('customThemes');
        return saved ? JSON.parse(saved) : {};
    });
    
    const allThemes = useMemo(() => {
        return {
            ...builtInThemes,
            ...customThemes
        };
    }, [customThemes]);
    
    const [isAddingTheme, setIsAddingTheme] = useState(false);
    const [newThemeName, setNewThemeName] = useState('');
    const [newThemeColors, setNewThemeColors] = useState([
        { r: 255, g: 255, b: 255 },
        { r: 255, g: 255, b: 255 },
        { r: 255, g: 255, b: 255 },
        { r: 255, g: 255, b: 255 },
        { r: 255, g: 255, b: 255 }
    ]);

    useEffect(() => {
        localStorage.setItem('activeTheme', activeTheme);
        localStorage.setItem('customThemes', JSON.stringify(customThemes));
    }, [activeTheme, customThemes]);

    useEffect(() => {
        const currentTheme = allThemes[activeTheme];
        if (!currentTheme) return;
        
        for (let i = 0; i < 5; i++) {
            document.documentElement.style.setProperty(
                `--theme-color${i}`,
                `${currentTheme[i].r}, ${currentTheme[i].g}, ${currentTheme[i].b}`
            );
        }
    }, [activeTheme, allThemes]);

    const setTheme = (themeName) => {
        if (allThemes[themeName]) {
            setActiveTheme(themeName);
        }
    };

    const startAddingTheme = () => {
        setIsAddingTheme(true);
        setNewThemeName('');
        setNewThemeColors([
            { r: 255, g: 255, b: 255 },
            { r: 255, g: 255, b: 255 },
            { r: 255, g: 255, b: 255 },
            { r: 255, g: 255, b: 255 },
            { r: 255, g: 255, b: 255 }
        ]);
    };

    const updateNewThemeColor = (index, color) => {
        const updatedColors = [...newThemeColors];
        updatedColors[index] = color;
        setNewThemeColors(updatedColors);
    };

    const saveNewTheme = () => {
        if (!newThemeName.trim()) {
            alert("Please enter a theme name");
            return;
        }
        
        if (newThemeName.length > 10) {
            alert("Theme name must be 10 characters or less");
            return;
        }
        
        if (allThemes[newThemeName]) {
            alert("Theme name already exists");
            return;
        }
        
        const newTheme = {
            [newThemeName]: newThemeColors
        };
        
        setCustomThemes(prev => ({ ...prev, ...newTheme }));
        setIsAddingTheme(false);
        setTheme(newThemeName);
    };

    const deleteTheme = (themeName) => {
        if (builtInThemes[themeName]) {
            alert("Cannot delete built-in themes");
            return;
        }
        
        const newCustomThemes = { ...customThemes };
        delete newCustomThemes[themeName];
        setCustomThemes(newCustomThemes);
        
        if (activeTheme === themeName) {
            setTheme('theme1');
        }
    };

    return (
        <ThemeContext.Provider value={{
            currentTheme: allThemes[activeTheme],
            themes: allThemes,
            customThemes,
            setTheme,
            isAddingTheme,
            startAddingTheme,
            newThemeName,
            setNewThemeName,
            newThemeColors,
            updateNewThemeColor,
            saveNewTheme,
            cancelNewTheme: () => setIsAddingTheme(false),
            deleteTheme
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);