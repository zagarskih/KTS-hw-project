import React from 'react';
import { observer } from 'mobx-react-lite';
import { CardsContainer, Loading, Text } from 'components';
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
    clearSearch,
  } = useSearch(productsStore);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchAndFilter}>
        <form onSubmit={onSearch}>
          <Search value={searchDraft} onChange={handleSearchChange} onClear={clearSearch} />
        </form>
        <Filter onChange={handleFilterChange} value={searchParams?.category ? [searchParams.category] : []} />
      </div>
      <div className={styles.textContainer}>
        {canLoadPrevProducts && (
          <button className={styles.textButton} disabled={isLoadingPrevProducts} onClick={loadPrevious}>
            Load previous
          </button>
        )}
      </div>

      <InfiniteScroll
        dataLength={products.size}
        next={next}
        hasMore={hasMoreProducts}
        loader={
          <div className={styles.loading}>
            <Loading size="m" />
          </div>
        }
      >
        <div className={styles.cardsContainer}>
          <CardsContainer products={Array.from(products.values())} />
        </div>
      </InfiniteScroll>
      {!hasMoreProducts && (
        <div className={styles.toTopContainer}>
          {products.size === 0 ? (
            <Text color="secondary" view="p16">
              No products loaded, please load previous.
            </Text>
          ) : (
            <>
              <Text color="secondary" view="p16">
                All Products Loaded
              </Text>
              <button className={styles.textButton} onClick={scrollToTop}>
                Back to Top
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
});

export default Content;
