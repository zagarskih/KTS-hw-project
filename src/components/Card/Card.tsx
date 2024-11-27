import React, { useState } from 'react';
import classNames from 'classnames';
import { Text } from 'components';
import getFixedFallbackImage from 'utils/getFallbackImage';
import { ProductApi } from 'api/types';
import styles from './Card.module.scss';

export type CardProps = {
  className?: string;
  onClick?: React.MouseEventHandler;
  actionSlot?: React.ReactNode;
  product?: ProductApi;
};

const Card: React.FC<CardProps> = (props) => {
  const { className, actionSlot, onClick, product } = props;
  const [imgError, setImgError] = useState(false);

  return (
    <div className={classNames(styles.card, className)} onClick={onClick ? onClick : undefined}>
      {product?.images[0] && !imgError ? (
        <div className={styles.imgContainer}>
          <img className={styles.img} src={product.images[0]} alt="Product 1" onError={() => setImgError(true)} />
          {product.images[1] && (
            <img className={styles.img} src={product.images[1]} alt="Product 2" onError={() => setImgError(true)} />
          )}
        </div>
      ) : (
        <div className={styles.imgContainer}>
          <img className={styles.fbImg} src={getFixedFallbackImage(product?.category.name, product?.id)} />
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.textContent}>
          {product?.category.name && (
            <Text className={className} view="p14" weight="medium" color="secondary">
              {product?.category.name}
            </Text>
          )}
          <Text className={className} view="p20" weight={'medium'} maxLines={2}>
            {product?.title}
          </Text>
          <Text className={className} view="p16" color="secondary" weight="normal" maxLines={3}>
            {product?.description}
          </Text>
        </div>
        <div className={styles.actions}>
          {product?.price && (
            <Text className={classNames(className)} view="p18" weight="bold">
              {`$${product.price}`}
            </Text>
          )}
          {actionSlot}
        </div>
      </div>
    </div>
  );
};

export default Card;
