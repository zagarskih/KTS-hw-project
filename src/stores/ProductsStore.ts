import { makeAutoObservable, observable, runInAction } from 'mobx';
import { ProductApi } from 'api/types';
import { getProducts, getProductsByCategory } from 'api';

type FetchProductArgs = {
  search?: string;
  categoryId?: number;
  limit: number;
};

export default class ProductsStore {
  products = observable.map<number, ProductApi>();
  hasMoreProducts: boolean = true;
  productsRequestAC: AbortController | null = null;

  productsByCategory: ProductApi[] | null = null;
  isLoadingProductsByCategory: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchMoreProducts = async (args: FetchProductArgs) => {
    if (this.productsRequestAC) {
      this.productsRequestAC.abort();
      this.productsRequestAC = null;
    }

    const { search, categoryId, limit } = args ?? {};

    this.productsRequestAC = new AbortController();

    const data = await getProducts({
      search,
      categoryId,
      offset: this.products.size,
      limit,
      signal: this.productsRequestAC.signal,
    });

    runInAction(() => {
      this.productsRequestAC = null;
    });

    if (!data) return;

    runInAction(() => {
      this.hasMoreProducts = data.length === limit;
      data.forEach((product) => {
        this.products.set(product.id, product);
      });
    });
  };

  resetProducts = async () => {
    this.products.clear();
    this.hasMoreProducts = true;
  };

  getProductById = (id: number): ProductApi | undefined => {
    return this.products.get(id);
  };

  fetchProductsByCategory = async (id: number) => {
    const productsInCategory = Array.from(this.products.values()).filter(
      (product) => product.category.id === id,
    );

    if (productsInCategory.length > 3) {
      runInAction(() => {
        this.productsByCategory = productsInCategory;
      });
      return;
    }

    this.isLoadingProductsByCategory = true;

    const data = await getProductsByCategory({ id });

    runInAction(() => {
      this.productsByCategory = data;
      data?.forEach((product) => {
        if (!this.products.has(product.id)) {
          this.products.set(product.id, product);
          this.isLoadingProductsByCategory = false;
        }
      });
    });
  };
}
