import React, { useState, useEffect } from 'react';
import { ProductApi } from 'api/types';
import { Text, Button, Placeholder } from 'components';
import styles from './Product.module.scss';

export type ProductCardProps = {
  product: ProductApi;
};

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { product } = props;

  const images = product.images;

  const [isImageValid, setIsImageValid] = useState(true);

  useEffect(() => {
    if (!images || images.length === 0) {
      setIsImageValid(false);
      return;
    }

    const img = new Image();
    img.src = images[0];

    img.onload = () => setIsImageValid(true);
    img.onerror = () => setIsImageValid(false);
  }, [images]);

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        {isImageValid ? <img className={styles.image} src={images[0]} alt="product" /> : <Placeholder height={600} />}
      </div>
      <div className={styles.content}>
        <div className={styles.text}>
          <Text className={styles.title} view="title">
            {product.title}
          </Text>
          <Text view="p-20" color="secondary">
            {product.description}
          </Text>
        </div>

        <div className={styles.actions}>
          <Text className={styles.price} view="title">{`$${product.price}`}</Text>
          <Button className={styles.priceButton}>Buy now</Button>
          <Button className={styles.addToCartButton}>Add to cart</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
