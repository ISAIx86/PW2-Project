import React, { useState } from 'react';
import { BiSun, BiMoon } from 'react-icons/bi';
import './ThemeSwitcher.css'; 

function ThemeSwitcher() {

    const [isDarkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {

        setDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-theme', isDarkMode);
        document.body.classList.toggle('light-theme', !isDarkMode);
    };

    return (

        <div className="theme-switcher">

            <button onClick={toggleTheme}>
                {isDarkMode ? <BiSun /> : <BiMoon />}
            </button>

        </div>
    );
}

export default ThemeSwitcher;