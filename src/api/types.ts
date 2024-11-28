export type CategoryApi = {
  id: number;
  name: string;
  image: string;
};

export type ProductApi = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: CategoryApi;
  images: string[];
};

export type TokensApi = {
  access_token: string;
  refresh_token: string;
};

export type ProfileApi = {
  id: number;
  email: string;
  password: string;
  name: string;
  role: 'customer' | 'admin';
  avatar: string;
};
