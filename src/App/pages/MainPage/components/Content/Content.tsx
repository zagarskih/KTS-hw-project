import React, { useState, useEffect } from 'react';
import { Text } from 'components';
import { CardsContainer } from 'components';
import Search from '../Search';
import Filter from '../Filter';
import { ProductApi } from 'api/types';
import { getProducts } from 'api/index';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './Content.module.scss';

const Content: React.FC = () => {
  const useQueryParams = () => {
    return new URLSearchParams(useLocation().search);
  };

  const navigate = useNavigate();
  const query = useQueryParams();

  const [searchTerm, setSearchTerm] = useState(query.get('search') || '');

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    navigate(`?${params.toString()}`);
  }, [searchTerm, navigate]);

  const { data } = useQuery<ProductApi[] | null>({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const countOfProducts = data ? data.length : 0;

  const filteredProducts = data
    ? data.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  return (
    <div className={styles.container}>
      <div className={styles.searchAndFilter}>
        <Search value={searchTerm} onChange={setSearchTerm} />
        <Filter />
      </div>
      <div className={styles.textContainer}>
        <Text className={styles.title} view="title">
          Total products
        </Text>
        <Text className={styles.counter} view="p-20" color="accent" weight="bold">
          {countOfProducts}
        </Text>
      </div>
      <div className={styles.cardsContainer}>
        <CardsContainer products={filteredProducts} />
      </div>
    </div>
  );
};

export default Content;
