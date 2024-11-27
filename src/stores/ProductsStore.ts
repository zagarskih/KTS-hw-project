import { makeAutoObservable, runInAction } from 'mobx';
import { ProductApi } from 'api/types';
import { getProducts, getProductsByCategory } from 'api';

type FetchPrevProductsArgs = {
  search?: string;
  categoryId?: number;
  limit: number;
  offset: number;
};

type FetchNextProductsArgs = {
  search?: string;
  categoryId?: number;
  limit: number;
  offset: number;
};

export default class ProductsStore {
  products: Map<number, ProductApi> = new Map();
  hasMoreProducts: boolean = true;
  prevProductsRequestAC: AbortController | null = null;
  nextProductsRequestAC: AbortController | null = null;

  productsByCategory: ProductApi[] | null = null;
  isLoadingProductsByCategory: boolean = false;

  isLoadingPrevProducts = false;
  canLoadPrevProducts = false;

  constructor() {
    makeAutoObservable(this);
  }

  // Cases:
  // 0000|****^**
  // 0000|****^****
  // 0000|****^
  private readonly getTailBatchSize = (limit: number) => {
    const tailBatchSizeIfNotFull = this.products.size % limit;
    if (!this.hasMoreProducts && tailBatchSizeIfNotFull === 0) {
      return 0;
    }

    return tailBatchSizeIfNotFull === 0 ? limit : tailBatchSizeIfNotFull;
  };

  private readonly getOffsetForPrevProducts = (limit: number, currentOffset: number) => {
    const tailBatchSize = this.getTailBatchSize(limit);
    const offset = currentOffset + tailBatchSize - this.products.size - limit;
    return offset;
  };

  private readonly hasOffsetForPrevProducts = (limit: number, currentOffset: number) => {
    const offset = this.getOffsetForPrevProducts(limit, currentOffset);
    return offset > -limit;
  };

  fetchPrevProducts = async (args: FetchPrevProductsArgs) => {
    this.prevProductsRequestAC?.abort();

    const { search, categoryId, limit } = args ?? {};

    this.nextProductsRequestAC = new AbortController();
    this.isLoadingPrevProducts = true;

    const { data } = await getProducts({
      search,
      categoryId,
      offset: Math.max(this.getOffsetForPrevProducts(args.limit, args.offset), 0),
      limit,
      signal: this.nextProductsRequestAC.signal,
    });

    runInAction(() => {
      this.isLoadingPrevProducts = false;
      if (!data) return;
      this.products = new Map([...data.map((p) => [p.id, p] as const), ...this.products]);
      this.canLoadPrevProducts = this.hasOffsetForPrevProducts(args.limit, args.offset);
    });
  };

  fetchNextProducts = async (args: FetchNextProductsArgs) => {
    this.nextProductsRequestAC?.abort();

    const { search, categoryId, limit } = args ?? {};

    this.nextProductsRequestAC = new AbortController();

    const { data } = await getProducts({
      search,
      categoryId,
      offset: args.offset,
      limit,
      signal: this.nextProductsRequestAC.signal,
    });

    runInAction(() => {
      if (!data) return;
      this.hasMoreProducts = data.length === limit;
      this.products = new Map([...this.products, ...data.map((p) => [p.id, p] as const)]);
      this.canLoadPrevProducts = this.hasOffsetForPrevProducts(args.limit, args.offset);
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
    const productsInCategory = Array.from(this.products.values()).filter((product) => product.category.id === id);

    if (productsInCategory.length > 3) {
      runInAction(() => {
        this.productsByCategory = productsInCategory;
      });
      return;
    }

    this.isLoadingProductsByCategory = true;

    const { data } = await getProductsByCategory({ id });

    runInAction(() => {
      this.productsByCategory = data;
      data?.forEach((product) => {
        if (!this.products.has(product.id)) {
          this.products.set(product.id, product);
        }
      });
      this.isLoadingProductsByCategory = false;
    });
  };
}
