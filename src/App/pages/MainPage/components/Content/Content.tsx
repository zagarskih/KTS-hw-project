import React from 'react';
import { Link } from 'react-router-dom';
import Text from 'components/Text';
import Card from 'components/Card';
import Button from 'components/Button';
import { ProductApi } from 'api/types';
import { getProducts } from 'api/index';
import { useQuery } from '@tanstack/react-query';

import styles from './Content.module.scss';

const Content: React.FC = () => {

  const { data } = useQuery<ProductApi[] | null>({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const countOfProducts = data ? data.length : 0;

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <Text className={styles.title} view="title">
          Total products
        </Text>
        <Text className={styles.counter} view="p-20" color="accent" weight="bold">
          {countOfProducts}
        </Text>
      </div>
      <div className={styles.cardsContainer}>
        {data && data.map((product) => {
          return (
            <Link key={product.id} to={`/products/${product.id}`} className={styles.link}>
              <Card
                className={styles.card}
                image={product.images[0]}
                captionSlot={product.category.name}
                title={product.title}
                subtitle={product.description}
                contentSlot={`$${product.price}`}
                actionSlot={<Button className={styles.addButton}>Add to Cart</Button>}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Content;
