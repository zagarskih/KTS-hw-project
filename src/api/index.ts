import { transport } from 'api/transport';
import { ProductApi } from './types';
import { CategoryApi } from './types';
import { TokensApi } from './types';
import { ProfileApi } from './types';

export const getProducts = async (args?: {
  search?: string;
  categoryId?: number;
  offset?: number;
  limit?: number;
  signal?: AbortSignal;
}) =>
  transport<ProductApi[]>('/products', {
    searchParams: {
      title: args?.search,
      categoryId: args?.categoryId?.toString(),
      offset: args?.offset?.toString(),
      limit: args?.limit?.toString(),
    },
    signal: args?.signal,
  });

export const getProduct = async (args: { id: number; signal: AbortSignal }) =>
  transport<ProductApi>(`/products/${args.id}`, { signal: args?.signal });

export const getCategories = async (args?: { signal: AbortSignal }) =>
  transport<CategoryApi[]>(`/categories`, { signal: args?.signal });

export const getCategory = async (args: { id: number }) => transport<CategoryApi>(`/categories/${args.id}`);

export const getProductsByCategory = async (args: { id: number }) =>
  transport<ProductApi[]>(`/categories/${args.id}/products`);

export const login = async (args: { email: string; password: string }) =>
  await transport<TokensApi>('/auth/login', {
    method: 'post',
    body: {
      email: args.email,
      password: args.password,
    },
  });

export const getProfile = async (token: string) =>
  await transport<ProfileApi>('/auth/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const refreshToken = async () =>
  await transport<TokensApi>('/auth/refresh-token', {
    method: 'post',
    body: {
      refreshToken: localStorage.getItem('refreshToken'),
    },
  });

export const getUsers = async () => await transport<ProfileApi[]>('/users');

export const createUser = async (args: { name: string; email: string; password: string; avatar: string }) => {
  await transport('/users', {
    method: 'post',
    body: args,
  });
};

export const changeImage = async (args: { id: number; avatar: string }) => {
  await transport<ProfileApi>(`/users/${args.id}`, {
    method: 'put',
    body: {
      avatar: args.avatar,
    },
  });
};
