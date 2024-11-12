import React from 'react';
import { observer } from 'mobx-react-lite';
import { ProductApi } from 'api/types';
import { Card } from 'components';
import { Button } from 'components';
import { Link } from 'react-router-dom';
import styles from './CardsContainer.module.scss';

type CardsContainer = {
  products: ProductApi[] | null;
};

const CardsContainer: React.FC<CardsContainer> = observer(({ products }) => {
  if (!products) return null;

  return (
    <div className={styles.cardsContainer}>
      {products.map((product) => {
        return (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="link"
          >
            <Card
              className={styles.card}
              image={product.images[0]}
              captionSlot={product.category.name}
              title={product.title}
              subtitle={product.description}
              contentSlot={`$${product.price}`}
              actionSlot={
                <Button className={styles.addButton}>Add to Cart</Button>
              }
            />
          </Link>
        );
      })}
    </div>
  );
});

export default CardsContainer;
