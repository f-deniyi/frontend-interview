import React from 'react';
import { useThemeContext } from '../../context/ThemeProvider';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useThemeContext();

    return (

        <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-transform duration-500 ease-in-out"
        >
            {theme === 'light' ? (
                <FaMoon className="text-yellow-500 text-2xl transform scale-125" />
            ) : (
                <FaSun className="text-yellow-300 text-2xl transform scale-125" />
            )}
        </button>
    );
};

export default ThemeToggleButton;
