import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { ProductApi } from 'api/types';
import { Card } from 'components';
import { Button } from 'components';
import { Link } from 'react-router-dom';
import RoutesConfig from 'routes';
import rootStore from 'stores/instance';
import styles from './CardsContainer.module.scss';

type CardsContainerProps = {
  products: ProductApi[] | null;
};

const CardsContainer: React.FC<CardsContainerProps> = observer(({ products }) => {
  const { cartStore } = rootStore;

  const handleAddToCart = useCallback(
    (product: ProductApi) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
      cartStore.addToCart(product);
    },
    [cartStore],
  );

  if (!products) return null;

  return (
    <div className={styles.cardsContainer}>
      {products.map((product) => {
        return (
          <Link key={product.id} to={`${RoutesConfig.products.id(product.id)}`} className="link">
            <Card
              product={product}
              className={styles.card}
              actionSlot={
                <Button className={styles.addButton} onClick={handleAddToCart(product)}>
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
