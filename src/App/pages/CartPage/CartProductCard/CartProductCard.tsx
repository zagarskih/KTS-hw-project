import React, { useState } from 'react';
import { Text } from 'components/Text';
import rootStore from 'stores/instance';
import { observer } from 'mobx-react-lite';
import { ProductApi } from 'api/types';
import getFixedFallbackImage from 'utils/getFallbackImage';
import { QuantityConfig } from 'config/constants';
import { Link } from 'react-router-dom';
import RoutesConfig from 'routes';
import { useTheme } from 'hooks/useTheme';

import styles from './CartProductCard.module.scss';
import PlusIcon from 'assets/icons/PlusIcon';
import MinusIcon from 'assets/icons/MinusIcon';
import Delete from 'assets/icons/Delete';

type CartProductCardProps = {
  product: ProductApi;
  quantity: number;
};

const CartProductCard: React.FC<CartProductCardProps> = ({ product, quantity }) => {
  const { cartStore } = rootStore;
  const [imgError, setImgError] = useState(false);
  const { theme } = useTheme();

  const isDecrementDisabled = quantity === QuantityConfig.MIN_QUANTITY;
  const isIncrementDisabled = quantity === QuantityConfig.MAX_QUANTITY;

  return (
    <div className={styles.container}>
      <Link to={RoutesConfig.products.id(product.id)}>
        <div className={styles.imgContainer}>
          {product.images[0] && !imgError ? (
            <img className={styles.img} src={product.images[0]} alt="ProductImg" onError={() => setImgError(true)} />
          ) : (
            <img className={styles.img} src={getFixedFallbackImage(product.category.name, product.id)} />
          )}
        </div>
      </Link>

      <div className={styles.cardContent}>
        <div className={styles.text}>
          <Link className="link" to={RoutesConfig.products.id(product.id)}>
            <Text view="p18" weight="medium" maxLines={1}>
              {product.title}
            </Text>
          </Link>
          <Text view="p18">${product.price}</Text>
        </div>

        <div className={styles.actions}>
          <div className={styles.counter}>
            <button
              onClick={() => cartStore.decrementQuantity(product.id)}
              className={styles.button}
              id="decrement"
              disabled={isDecrementDisabled}
            >
              <MinusIcon className={styles.quantityIcon} />
            </button>
            <Text view="p16" className={styles.count}>
              {quantity}
            </Text>
            <button
              onClick={() => cartStore.incrementQuantity(product.id)}
              className={styles.button}
              id="increment"
              disabled={isIncrementDisabled}
            >
              <PlusIcon className={styles.quantityIcon} />
            </button>
          </div>

          <div className={styles.delete}>
            <button onClick={() => cartStore.removeFromCart(product.id)} className={styles.deleteButton}>
              <Delete stroke={theme === 'dark' ? '#ffffff' : '#151411'} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(CartProductCard);
