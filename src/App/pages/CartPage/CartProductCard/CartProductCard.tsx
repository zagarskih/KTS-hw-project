import React from 'react';
import { Text } from 'components/Text';
import plus from 'assets/icons/plus.svg';
import minus from 'assets/icons/minus.svg';
import trashCan from 'assets/icons/trashCan.svg';
import styles from './CartProductCard.module.scss';

const CartProductCard: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src="path" alt="ProductImg" />
      </div>

      <div className={styles.text}>
        <Text view="p-18" maxLines={1}>
          TitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitle
        </Text>
        <Text view="p-18">$30</Text>
      </div>

      <div className={styles.counter}>
        <button className={styles.button} id="decrement">
          <img src={minus} alt="minus" />
        </button>
        <Text view="p-18" className={styles.count}>
          1
        </Text>
        <button className={styles.button} id="increment">
          <img src={plus} alt="plus" />
        </button>
      </div>

      <div className={styles.delete}>
        <button className={styles.deleteButton}>
          <img src={trashCan} alt="delete" />
        </button>
      </div>
    </div>
  );
};

export default CartProductCard;
