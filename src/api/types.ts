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
}