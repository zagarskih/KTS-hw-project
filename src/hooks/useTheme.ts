import { ThemeContext } from 'contexts/theme';
import { useContext } from 'react';

export const useTheme = () => {
  const value = useContext(ThemeContext);
  if (value === null) throw new Error('Invalid context value');
  return value;
};
