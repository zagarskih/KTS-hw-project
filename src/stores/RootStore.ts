import ProductsStore from './ProductsStore';
import CategoriesStore from './CategoriesStore';

export default class RootStore {
  readonly productsStore = new ProductsStore();
  readonly categoriesStore = new CategoriesStore();

  constructor() {
    this.productsStore = new ProductsStore();
    this.categoriesStore = new CategoriesStore();
  }
}
