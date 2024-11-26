import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './App/pages/MainPage';
import ProductPage from './App/pages/ProductPage';
import CategoriesPage from './App/pages/CategoriesPage';
import AboutPage from './App/pages/AboutPage';

import 'styles/styles.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products" element={<MainPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products">
          <Route path=":id" element={<ProductPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/products" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
