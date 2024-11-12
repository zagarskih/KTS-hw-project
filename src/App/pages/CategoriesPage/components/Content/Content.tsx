import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Text } from 'components';
import CategoryCard from '../CategoryCard';
import rootStore from 'stores/instanse';
import { observer } from 'mobx-react-lite';

import styles from './Content.module.scss';

const Content: React.FC = observer(() => {
  const { categories, fetchCategories, isLoading } = rootStore.categoriesStore;

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (isLoading) return '...loading';

  const countOfCategories = categories ? categories.length : 0;

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <Text className={styles.title} view="title">
          Total categories
        </Text>
        <Text
          className={styles.counter}
          view="p-20"
          color="accent"
          weight="bold"
        >
          {countOfCategories}
        </Text>
      </div>
      <div className={styles.cardsContainer}>
        {categories &&
          categories.map((category) => {
            return (
              <Link key={category.id} to={{pathname: '/products', search: `?categories=%5B${category.id}%5D`}} className={styles.link}>
              <CategoryCard
                key={category.id}
                className={styles.card}
                image={category.image}
                name={category.name}
              />
              </Link>
            );
          })}
      </div>
    </div>
  );
});

export default Content;
