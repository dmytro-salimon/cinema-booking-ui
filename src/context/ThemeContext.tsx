import React, { createContext, useState, ReactNode } from 'react';

export const THEME_COLORS = {
  dark: {
    background: '#010101',
    surface: '#1F2024',
    text: '#FFFFFF',
    textSecondary: '#71727A',
    primary: '#006FFD',
  },
  light: {
    background: '#FFFFFF',
    surface: '#F4F4F5',
    text: '#010101',
    textSecondary: '#71727A',
    primary: '#006FFD',
  }
};

type ThemeType = 'light' | 'dark';

interface ThemeContextProps {
  theme: ThemeType;
  colors: typeof THEME_COLORS.dark;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'dark',
  colors: THEME_COLORS.dark,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>('dark');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const currentColors = theme === 'light' ? THEME_COLORS.light : THEME_COLORS.dark;

  return (
    <ThemeContext.Provider value={{ theme, colors: currentColors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};