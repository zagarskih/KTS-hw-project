import React, { useState } from 'react';
import classNames from 'classnames';
import { Text, Placeholder } from 'components';
import styles from './CategoryCard.module.scss';

export type CategoryCardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Заголовок карточки */
  name: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
};

const CategoryCard: React.FC<CategoryCardProps> = (props) => {
  const { className, image, name, onClick } = props;

  const [imgError, setImgError] = useState(false);

  return (
    <div className={classNames(styles.card, className)} onClick={onClick ? onClick : undefined}>
      {image && !imgError ? (
        <img className={styles.img} src={image} alt="Category" onError={() => setImgError(true)} />
      ) : (
        <Placeholder circleForm={true} height={200} />
      )}
      <div className={styles.textContent}>
        <Text className={styles.title} view="p-20" weight={'medium'} maxLines={2}>
          {name}
        </Text>
      </div>
    </div>
  );
};

export default CategoryCard;
