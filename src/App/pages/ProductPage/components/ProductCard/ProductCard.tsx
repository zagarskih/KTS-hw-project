import React, { useState, useEffect } from 'react';
import { ProductApi } from 'api/types';
import { Text, Button, ArrowDownIcon } from 'components';
import getFixedFallbackImage from 'utils/getFallbackImage';
import rootStore from 'stores/instance';
import { useNavigate } from 'react-router-dom';
import RoutesConfig from 'routes';
import classNames from 'classnames';

import styles from './Product.module.scss';

export type ProductCardProps = {
  product: ProductApi;
};

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { product } = props;
  const { cartStore } = rootStore;
  const images = product.images;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isImageValid, setIsImageValid] = useState(true);
  const navigate = useNavigate();

  const totalImages = images ? images.length : 0;

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

  const handleAddToCart = (product: ProductApi) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    cartStore.addToCart(product);
  };

  const handleBuyNow = (product: ProductApi) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    handleAddToCart(product)(e);
    navigate(RoutesConfig.cart);
  };

  const showNextImage = () => {
    if (currentIndex < totalImages - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const showPrevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.carousel}>
        {totalImages > 1 && isImageValid && (
          <button
            className={classNames(styles.imgButton, styles.prev, { [styles.disabled]: currentIndex === 0 })}
            onClick={showPrevImage}
            disabled={currentIndex === 0}
          >
            <ArrowDownIcon />
          </button>
        )}

        <div className={styles.imageContainer}>
          <div
            className={styles.imagesWrapper}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: 'transform 0.5s ease',
            }}
          >
            {images.length > 0 && (
              <>
                {isImageValid ? (
                  images.map((image, index) => (
                    <div key={index} className={styles.image}>
                      <img className={styles.image} src={image} alt={`Product ${index + 1}`} />
                    </div>
                  ))
                ) : (
                  <div className={styles.image}>
                    <img
                      className={styles.image}
                      src={getFixedFallbackImage(product.category.name, product.id)}
                      alt="Fallback"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {totalImages > 1 && isImageValid && (
          <button
            className={classNames(styles.imgButton, styles.next, {
              [styles.disabled]: currentIndex === totalImages - 1,
            })}
            onClick={showNextImage}
            disabled={currentIndex === totalImages - 1}
          >
            <ArrowDownIcon />
          </button>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.text}>
          <Text className={styles.title} view="title">
            {product.title}
          </Text>
          <Text view="p20" color="secondary">
            {product.description}
          </Text>
        </div>

        <div className={styles.actions}>
          <Text className={styles.price} view="title">{`$${product.price}`}</Text>
          <div className={styles.actionButtons}>
            <Button className={styles.priceButton} onClick={handleBuyNow(product)}>
              Buy now
            </Button>
            <Button onClick={handleAddToCart(product)} className={styles.addToCartButton}>
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
