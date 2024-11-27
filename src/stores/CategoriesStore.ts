import { makeAutoObservable, runInAction } from 'mobx';
import { CategoryApi } from 'api/types';
import { getCategories } from 'api';

export default class CategoriesStore {
  categories: CategoryApi[] | null = null;
  isLoading: boolean = false;
  categoriesRequestAC: AbortController | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchCategories = async () => {
    if (this.categories || this.isLoading) return;

    if (this.categoriesRequestAC) {
      this.categoriesRequestAC.abort();
      this.categoriesRequestAC = null;
    }

    this.categoriesRequestAC = new AbortController();

    this.isLoading = true;
    const { data } = await getCategories({
      signal: this.categoriesRequestAC.signal,
    });

    runInAction(() => {
      this.categoriesRequestAC = null;
    });

    if (data) {
      runInAction(() => {
        this.categories = data;
      });
    }
    this.isLoading = false;
  };
}
