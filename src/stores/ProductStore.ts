import { makeAutoObservable, runInAction } from 'mobx';
import { ProductApi } from 'api/types';
import rootStore from './instance';
import { getProduct } from 'api';
import { ILocalStore } from 'hooks/ILocalStore';

const { productsStore } = rootStore;

export default class ProductStore implements ILocalStore {
  product: ProductApi | null | undefined = undefined;
  productRequestAC: AbortController | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchProduct = async (id: number) => {
    console.log('this.product 1', this.product);
    const existingProduct = productsStore.getProductById(id);

    if (existingProduct) {
      this.product = existingProduct;
      return;
    }

    if (this.productRequestAC) {
      this.productRequestAC.abort();
    }

    this.productRequestAC = new AbortController();

    const { data, isAborted } = await getProduct({ id, signal: this.productRequestAC.signal });

    console.log('isAborted', isAborted);

    if (isAborted) return;

    runInAction(() => {
      this.product = data;
    });
  };

  destroy() {
    if (this.productRequestAC) {
      this.productRequestAC.abort();
      this.productRequestAC = null;
    }
    this.product = undefined;
  }
}
