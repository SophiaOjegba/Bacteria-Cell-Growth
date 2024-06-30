import React from 'react';

interface ThemeSwitcherProps {
  toggleTheme: () => void;
  theme: 'light' | 'dark';
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ toggleTheme, theme }) => {
  return (
    <button onClick={toggleTheme} className='ThemeSwitcher'>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
};

export default ThemeSwitcher;
