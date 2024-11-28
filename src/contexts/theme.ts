import { createContext } from 'react';

type Theme = 'light' | 'dark';

type ContextValue = {
  setTheme: (value: Theme) => void;
  toggleTheme: () => void;
  theme: Theme;
};

export const ThemeContext = createContext<ContextValue | null>(null);
