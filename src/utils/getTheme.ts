import { z } from 'zod';

const themeSchema = z.union([z.literal('dark'), z.literal('light')]);

export type Theme = {
  value: 'light' | 'dark';
  type: 'system' | 'user';
};

export const getTheme = (): Theme => {
  const savedTheme = themeSchema.safeParse(window.localStorage.getItem('theme')).data;
  if (savedTheme)
    return {
      value: savedTheme,
      type: 'user',
    };

  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const systemTheme = isDarkMode ? 'dark' : 'light';
  return { value: systemTheme, type: 'system' };
};
