import React, { useState } from 'react';
import classNames from 'classnames';
import Text from 'components/Text';
import Placeholder from '../Placeholder';
import styles from './Card.module.scss';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = (props) => {
  const { className, image, title, captionSlot, subtitle, contentSlot, actionSlot, onClick } = props;

  const [imgError, setImgError] = useState(false);

  return (
    <div className={classNames(styles.card, className)} onClick={onClick ? onClick : undefined}>
      {image && !imgError ? (
        <img className={styles.img} src={image} alt="Product" onError={() => setImgError(true)} />
      ) : (
        <Placeholder height={360}/>
      )}
      <div className={styles.content}>
        <div className={styles.textContent}>
          {captionSlot && (
            <Text className={className} view="p-14" weight="medium" color="secondary">
              {captionSlot}
            </Text>
          )}
          <Text className={className} view="p-20" weight={'medium'} maxLines={2}>
            {title}
          </Text>
          <Text className={className} view="p-16" color="secondary" weight="normal" maxLines={3}>
            {subtitle}
          </Text>
        </div>
        <div className={styles.actions}>
          {contentSlot && (
            <Text className={classNames(className)} view="p-18" weight="bold">
              {contentSlot}
            </Text>
          )}
          {actionSlot}
        </div>
      </div>
    </div>
  );
};

export default Card;
