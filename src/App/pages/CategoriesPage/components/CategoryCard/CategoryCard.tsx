import React, { useState } from 'react';
import classNames from 'classnames';
import { Text, Placeholder } from 'components';
import styles from './CategoryCard.module.scss';

export type CategoryCardProps = {
  className?: string;
  image: string;
  name: React.ReactNode;
  onClick?: React.MouseEventHandler;
};

const CategoryCard: React.FC<CategoryCardProps> = (props) => {
  const { className, image, name, onClick } = props;

  const [imgError, setImgError] = useState(false);

  return (
    <div className={classNames(styles.card, className)} onClick={onClick}>
      {image && !imgError ? (
        <div className={styles.imgContainer}>
          <img className={styles.img} src={image} alt="Category" onError={() => setImgError(true)} />
        </div>
      ) : (
        <Placeholder height={260} />
      )}
      <div className={styles.content}>
        <div className={styles.textContent}>
          <Text className={className} view="p-20" weight={'medium'} maxLines={2}>
            {name}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CategoryCard);
