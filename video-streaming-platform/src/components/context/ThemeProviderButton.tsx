import React from 'react';
import { useThemeContext } from '../../context/ThemeProvider';
import { FaMoon, FaSun } from 'react-icons/fa';
import { TbSunFilled } from "react-icons/tb";
import { BsFillMoonStarsFill } from "react-icons/bs"

const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useThemeContext();

    return (

        <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-transform duration-500 ease-in-out"
        >
            {theme === 'light' ? (
                <span
                    className={` transition-opacity duration-500 ease-in-out ${theme === 'light' ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <TbSunFilled className="text-yellow-500 text-2xl transform scale-125" />
                </span>
            ) : (
                <span
                className={` transition-opacity duration-500 ease-in-out ${
                    theme === 'dark' ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <BsFillMoonStarsFill className="text-yellow-300 text-2xl transform scale-125" />
                </span>
            )}
        </button>
    );
};

export default ThemeToggleButton;
