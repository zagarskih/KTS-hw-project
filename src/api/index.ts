import { transport } from 'helpers/transport';
import { ProductApi } from './types';
import { CategoryApi } from './types';

export const getProducts = async (args?: {
  search?: string;
  categoryId?: number;
  offset?: number;
  limit?: number;
  signal?: AbortSignal;
}): Promise<ProductApi[] | null> =>
  transport<ProductApi[]>('/products', {
    searchParams: {
      title: args?.search,
      categoryId: args?.categoryId?.toString(),
      offset: args?.offset?.toString(),
      limit: args?.limit?.toString(),
    },
    signal: args?.signal,
  });

export const getProduct = async (args: { id: number }) =>
  transport<ProductApi>(`/products/${args.id}`);

export const getCategories = async (args?: { signal: AbortSignal }) =>
  transport<CategoryApi[]>(`/categories`, { signal: args?.signal });

export const getCategory = async (args: { id: number }) =>
  transport<CategoryApi>(`/categories/${args.id}`);

export const getProductsByCategory = async (args: { id: number }) =>
  transport<ProductApi[]>(`/categories/${args.id}/products`);
