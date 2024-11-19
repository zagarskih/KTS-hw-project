import { useCallback, useEffect, useState } from 'react';
import { searchParamsSchema } from 'config/schemas';
import { AppConfig } from 'config/constants';
import { useSafeSearchParams } from 'hooks/useSafeSearchParams';
import { omit } from 'utils/omit';

export const useSearch = (productsStore: any) => {
  const {
    fetchNextProducts,
    resetProducts,
    hasMoreProducts,
    isLoadingPrevProducts,
    fetchPrevProducts,
    canLoadPrevProducts,
  } = productsStore;

  const [searchParams, setSearchParams] = useSafeSearchParams(searchParamsSchema);
  const [searchDraft, setSearchDraft] = useState(searchParams?.search ?? '');

  useEffect(() => {
    if (!searchParams?.search) setSearchDraft('');
  }, [searchParams?.search]);

  useEffect(() => {
    resetProducts();
  }, [searchParams.search, searchParams.category]);

  useEffect(() => {
    fetchNextProducts({
      search: searchParams?.search,
      categoryId: searchParams?.category,
      limit: AppConfig.LIMIT,
      offset: searchParams.offset ?? 0,
    });
  }, [searchParams.search, searchParams.category, searchParams.offset]);

  const next = useCallback(() => {
    setSearchParams((prev) => ({
      ...prev,
      offset: (prev.offset ?? 0) + AppConfig.LIMIT,
    }));
  }, [setSearchParams]);

  const onSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setSearchParams((prev) => omit(searchDraft ? { ...prev, search: searchDraft } : omit(prev, 'search'), 'offset'));
    },
    [searchDraft, setSearchParams],
  );

  const handleSearchChange = useCallback((value: string) => setSearchDraft(value), []);

  const handleFilterChange = useCallback(
    (ids: number[]) =>
      setSearchParams((prev) => omit(ids.length ? { ...prev, category: ids[0] } : omit(prev, 'category'), 'offset')),
    [setSearchParams],
  );

  const loadPrevious = useCallback(() => {
    fetchPrevProducts({
      search: searchParams?.search,
      categoryId: searchParams?.category,
      limit: AppConfig.LIMIT,
      offset: searchParams.offset ?? 0,
    });
  }, [fetchPrevProducts, searchParams]);

  return {
    searchParams,
    searchDraft,
    setSearchDraft,
    hasMoreProducts,
    canLoadPrevProducts,
    isLoadingPrevProducts,
    products: productsStore.products,
    next,
    onSearch,
    handleSearchChange,
    handleFilterChange,
    loadPrevious,
  };
};
