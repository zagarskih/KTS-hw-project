import React from 'react';
import { observer } from 'mobx-react-lite';
import { CardsContainer } from 'components';
import rootStore from 'stores/instance';
import Search from './components/Search';
import Filter from './components/Filter';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearch } from 'hooks/useSearch';

import styles from './Content.module.scss';

const Content: React.FC = observer(() => {
  const { productsStore } = rootStore;

  const {
    products,
    searchParams,
    searchDraft,
    hasMoreProducts,
    canLoadPrevProducts,
    isLoadingPrevProducts,
    next,
    onSearch,
    handleSearchChange,
    handleFilterChange,
    loadPrevious,
  } = useSearch(productsStore);

  return (
    <div className={styles.container}>
      <div className={styles.searchAndFilter}>
        <form onSubmit={onSearch}>
          <Search value={searchDraft} onChange={handleSearchChange} />
        </form>
        <Filter onChange={handleFilterChange} value={searchParams?.category ? [searchParams.category] : []} />
      </div>
      <div className={styles.textContainer}>
        {canLoadPrevProducts && (
          <button className={styles.loadPrevButton} disabled={isLoadingPrevProducts} onClick={loadPrevious}>
            Load previous
          </button>
        )}
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
