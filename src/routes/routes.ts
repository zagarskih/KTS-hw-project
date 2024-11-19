const RoutesConfig = {
  home: '/',
  products: {
    mask: '/products',
    id: (id: number | string) => `/products/${id}`,
  },
  categories: '/categories',
  about: '/about',
  cart: '/cart',
  signup: '/signup',
  login: '/login',
  notFound: '*',
};

export default RoutesConfig;
