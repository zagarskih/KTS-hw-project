import { transport } from 'helpers/transport';
import { ProductApi } from './types';
import { CategoryApi } from './types';

export const getProducts = async () => transport<ProductApi[]>('/products');

export const getProduct = async (args: { id: number }) => transport<ProductApi>(`/products/${args.id}`);

export const getCategories = async () => transport<CategoryApi[]>(`/categories`);

export const getCategory = async (args: { id: number }) => transport<CategoryApi>(`/categories/${args.id}`);

export const getProductsByCategory = async (args: { id: number }) => transport<ProductApi[]>(`/categories/${args.id}/products`);
