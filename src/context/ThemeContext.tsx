import React, { createContext, useState, ReactNode } from 'react';

// Визначаємо константи кольорів для обох тем згідно з вимогами чистоти коду
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

// Типізація для нашого контексту
type ThemeType = 'light' | 'dark';

interface ThemeContextProps {
  theme: ThemeType;
  colors: typeof THEME_COLORS.dark;
  toggleTheme: () => void;
}

// Створюємо сам контекст зі значеннями за замовчуванням
export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'dark',
  colors: THEME_COLORS.dark,
  toggleTheme: () => {},
});

// Створюємо Provider, який буде обгортати наш застосунок
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>('dark'); // Темна тема за замовчуванням

  // Функція зміни стану теми
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Динамічно підставляємо об'єкт з кольорами залежно від вибраної теми
  const currentColors = theme === 'light' ? THEME_COLORS.light : THEME_COLORS.dark;

  return (
    <ThemeContext.Provider value={{ theme, colors: currentColors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};