import ProductsStore from './ProductsStore';
import CategoriesStore from './CategoriesStore';
import AuthStore from './AuthStore';
import CartStore from './CartStore';

export default class RootStore {
  readonly productsStore = new ProductsStore();
  readonly categoriesStore = new CategoriesStore();
  readonly authStore = new AuthStore();
  readonly cartStore: CartStore;

  constructor() {
    this.cartStore = new CartStore();
  }
}
