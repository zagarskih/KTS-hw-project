import React from 'react';
// import { Link } from 'react-router-dom';
import { Text } from 'components';
import CategoryCard from '../CategoryCard';
import { CategoryApi } from 'api/types';
import { getCategories } from 'api/index';
import { useQuery } from '@tanstack/react-query';

import styles from './Content.module.scss';

const Content: React.FC = () => {

  const { data } = useQuery<CategoryApi[] | null>({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const countOfCategories = data ? data.length : 0;

  const fiveCategories = data?.slice(0, 5);

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <Text className={styles.title} view="title">
          Total categories
        </Text>
        <Text className={styles.counter} view="p-20" color="accent" weight="bold">
          {countOfCategories}
        </Text>
      </div>
      <div className={styles.cardsContainer}>
        {fiveCategories && fiveCategories.map((category) => {
          return (
            // <Link key={category.id} to={`/categories/${category.id}`} className={styles.link}>
              <CategoryCard
                className={styles.card}
                image={category.image}
                name={category.name}
              />
            // </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Content;
