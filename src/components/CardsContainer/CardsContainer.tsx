import React from 'react';
import { observer } from 'mobx-react-lite';
import { ProductApi } from 'api/types';
import { Card } from 'components';
import { Button } from 'components';
import { Link } from 'react-router-dom';
import RoutesConfig from 'routes';
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
          <Link key={product.id} to={`${RoutesConfig.products.mask}/${product.id}`} className="link">
            <Card
              className={styles.card}
              image={product.images[0]}
              captionSlot={product.category.name}
              title={product.title}
              subtitle={product.description}
              contentSlot={`$${product.price}`}
              actionSlot={
                <Button
                  className={styles.addButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    // TODO add to cart logic
                    console.log(`Product ${product.id} added to cart`);
                  }}
                >
                  Add to Cart
                </Button>
              }
            />
          </Link>
        );
      })}
    </div>
  );
});

export default CardsContainer;
