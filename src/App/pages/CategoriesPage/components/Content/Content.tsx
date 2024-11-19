import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Text } from 'components';
import CategoryCard from '../CategoryCard';
import rootStore from 'stores/instance';
import { observer } from 'mobx-react-lite';
import RoutesConfig from 'routes';

import styles from './Content.module.scss';

const Content: React.FC = observer(() => {
  const { categories, fetchCategories, isLoading } = rootStore.categoriesStore;

  useEffect(() => {
    if (!categories) {
      fetchCategories();
    }
  }, [categories, fetchCategories]);

  const filteredCategories = categories?.filter((c) => c.name.toLowerCase() !== 'new category');

  if (isLoading) return '...loading';

  const countOfCategories = filteredCategories ? filteredCategories.length : 0;

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
        {filteredCategories &&
          filteredCategories.map((category) => {
            return (
              <Link
                key={category.id}
                to={{ pathname: RoutesConfig.products.mask, search: `?category=${category.id}` }}
                className={styles.link}
              >
                <CategoryCard key={category.id} className={styles.card} image={category.image} name={category.name} />
              </Link>
            );
          })}
      </div>
    </div>
  );
});

export default Content;
