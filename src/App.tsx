import React, { useEffect } from 'react';
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

const App: React.FC = () => {
  const { cartStore } = rootStore;

  useEffect(() => {
    if (cartStore) {
      cartStore.loadCartFromStorage();
    }
  }, [cartStore]);

  return (
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
  );
};

export default App;
