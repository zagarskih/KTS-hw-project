import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Text } from 'components';
import { CardsContainer } from 'components';
import rootStore from 'stores/instanse';
import Search from './components/Search';
import Filter from './components/Filter';
import { z } from 'zod';
import { useSafeSearchParams } from 'hooks/useSafeSearchParams';
import InfiniteScroll from 'react-infinite-scroll-component';

import styles from './Content.module.scss';

const searchParamsSchema = z.object({
  search: z.string().optional(),
  categories: z.array(z.number()).optional(),
});

const LIMIT = 9;

const Content: React.FC = observer(() => {
  const { productsStore } = rootStore;
  const { products, fetchMoreProducts, resetProducts, hasMoreProducts } =
    productsStore;

  const [searchParams, setSearchParams] =
    useSafeSearchParams(searchParamsSchema);

  const [searchDraft, setSearchDraft] = useState(searchParams?.search ?? '');

  useEffect(() => {
    if (!searchParams?.search) setSearchDraft('');
  }, [searchParams?.search, setSearchDraft]);

  const next = useCallback(
    async () =>
      fetchMoreProducts({
        search: searchParams?.search,
        categoryId: searchParams?.categories?.[0],
        limit: LIMIT,
      }),
    [searchParams.search, searchParams.categories],
  );

  useEffect(() => {
    resetProducts();
    next();
  }, [next]);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();

    setSearchParams((prev) => {
      const { search, ...restPrev } = prev;

      if (!searchDraft) return restPrev;
      return {
        ...restPrev,
        search: searchDraft,
      };
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchDraft(value);
  };

  const countOfProducts = products.size;

  return (
    <div className={styles.container}>
      <div className={styles.searchAndFilter}>
        <form onSubmit={onSearch}>
          <Search value={searchDraft} onChange={handleSearchChange} />
        </form>
        <Filter
          onChange={(ids) => {
            setSearchParams((prev) => ({
              ...prev,
              categories: ids,
            }));
          }}
          value={searchParams?.categories ?? []}
        />
      </div>
      <div className={styles.textContainer}>
        <Text className={styles.title} view="title">
          Total products
        </Text>
        <Text
          className={styles.counter}
          view="p-20"
          color="accent"
          weight="bold"
        >
          {countOfProducts}
        </Text>
      </div>

      <InfiniteScroll
        dataLength={products.size}
        next={next}
        hasMore={hasMoreProducts}
        loader={<div>Loading more products...</div>}
      >
        <div className={styles.cardsContainer}>
          <CardsContainer products={Array.from(products.values())} />
        </div>
      </InfiniteScroll>
    </div>
  );
});

export default Content;
