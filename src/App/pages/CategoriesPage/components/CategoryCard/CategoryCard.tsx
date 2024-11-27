import React, { useState } from 'react';
import classNames from 'classnames';
import { Text } from 'components';
import { CategoryApi } from 'api/types';
import getFixedFallbackImage from 'utils/getFallbackImage';

import styles from './CategoryCard.module.scss';

export type CategoryCardProps = {
  className?: string;
  onClick?: React.MouseEventHandler;
  category: CategoryApi;
};

const CategoryCard: React.FC<CategoryCardProps> = (props) => {
  const { className, onClick, category } = props;
  const [imgError, setImgError] = useState(false);

  return (
    <div className={classNames(styles.card, className)} onClick={onClick}>
      <div className={styles.imgContainer}>
        {category.image && !imgError ? (
          <img className={styles.img} src={category.image} alt="Category" onError={() => setImgError(true)} />
        ) : (
          <img className={styles.img} src={getFixedFallbackImage(category.name, undefined)} />
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.textContent}>
          <Text className={className} view="p20" weight={'medium'} maxLines={2}>
            {category.name}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CategoryCard);
