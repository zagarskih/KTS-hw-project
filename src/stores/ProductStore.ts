import { makeAutoObservable, runInAction } from 'mobx';
import { ProductApi } from 'api/types';
import rootStore from './instanse';
import { getProduct } from 'api';

const { productsStore } = rootStore;

class ProductStore {
  product: ProductApi | null = null;
  isLoadingProduct: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchProduct = async (id: number) => {
    const existingProduct = productsStore.getProductById(id);
    if (existingProduct) {
      this.product = existingProduct;
      return this.product;
    }

    this.isLoadingProduct = true;
    const data = await getProduct({ id });
    runInAction(() => {
      this.product = data;
      if (data) {
        productsStore.products.set(data.id, data);
        this.isLoadingProduct = false;
      }
    });
    return data;
  };
}

const productStore = new ProductStore();
export default productStore;
