import { makeAutoObservable, runInAction } from 'mobx';
import { ProductApi } from 'api/types';
import rootStore from './instance';
import { getProduct } from 'api';
import { ILocalStore } from '../hooks/ILocalStore';

const { productsStore } = rootStore;

export default class ProductStore implements ILocalStore {
  product: ProductApi | null = null;
  isLoadingProduct: boolean = false;
  productRequestAC: AbortController | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchProduct = async (id: number) => {
    const existingProduct = productsStore.getProductById(id);

    if (existingProduct) {
      this.product = existingProduct;
      return existingProduct;
    }

    if (this.productRequestAC) {
      this.productRequestAC.abort();
    }
    this.productRequestAC = new AbortController();
    this.isLoadingProduct = true;

    const data = await getProduct({ id });
    runInAction(() => {
      this.product = data;
    });
    this.productRequestAC = null;
    this.isLoadingProduct = false;
    return data;
  };

  destroy() {
    if (this.productRequestAC) {
      this.productRequestAC.abort();
      this.productRequestAC = null;
    }
    this.product = null;
    this.isLoadingProduct = false;
  }
}
