import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './App/pages/MainPage';
import ProductPage from './App/pages/ProductPage';
import CategoriesPage from './App/pages/CategoriesPage';
import AboutPage from './App/pages/AboutPage';
import CartPage from './App/pages/CartPage';
import LoginPage from './App/pages/LoginPage';
import SignupPage from './App/pages/SignupPage';
import ProfilePage from './App/pages/ProfilePage';

import RoutesConfig from 'routes';
import rootStore from 'stores/instance';

import 'styles/styles.scss';
import { ThemeContext } from 'contexts/theme';
import { getTheme, Theme } from 'utils/getTheme';

const App: React.FC = () => {
  const [theme, setThemeState] = useState(getTheme);

  const { cartStore } = rootStore;

  useEffect(() => {
    if (cartStore) {
      cartStore.loadCartFromStorage();
    }
  }, [cartStore]);

  const setTheme = useCallback(
    (value: Theme['value']) =>
      setThemeState({
        value,
        type: 'user',
      }),
    [setThemeState],
  );

  const toggleTheme = useCallback(
    () =>
      setThemeState((theme) => {
        const value = theme.value === 'light' ? 'dark' : 'light';
        return {
          value,
          type: 'user',
        };
      }),
    [setThemeState],
  );

  useEffect(() => {
    const { classList } = window.document.documentElement;
    classList.remove('light', 'dark');
    classList.add(theme.value);
    if (theme.type === 'user') {
      window.localStorage.setItem('theme', theme.value);
    } else {
      window.localStorage.removeItem('theme');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ setTheme, theme: theme.value, toggleTheme }}>
      <BrowserRouter>
        <Routes>
          <Route path={RoutesConfig.products.mask} element={<MainPage />} />
          <Route path={RoutesConfig.categories} element={<CategoriesPage />} />
          <Route path={RoutesConfig.about} element={<AboutPage />} />
          <Route path={RoutesConfig.cart} element={<CartPage />} />
          <Route path={RoutesConfig.signup} element={<SignupPage />} />
          <Route path={RoutesConfig.login} element={<LoginPage />} />
          <Route path={RoutesConfig.profile} element={<ProfilePage />} />
          <Route path={RoutesConfig.products.id(':id')} element={<ProductPage />} />
          <Route path={RoutesConfig.notFound} element={<Navigate to={RoutesConfig.products.mask} replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
};

export default App;
