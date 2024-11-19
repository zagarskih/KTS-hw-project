import React, { useState } from 'react';
import { Text } from 'components/Text';
import { Button } from 'components/Button';
import { Input } from 'components/Input';

import styles from './TotalCard.module.scss';

const TotalCard: React.FC = () => {
  const [promocode, setPromocode] = useState('');

  const handleChangePromocode = (value: string) => {
    setPromocode(value);
  };

  const handleSubmitPromocode = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Promocode applied:', promocode);
  };

  return (
    <div className={styles.container}>
      <Text className={styles.title} view="p-18">
        Summary
      </Text>

      <hr className={styles.horizontalLine} />

      <Text view="p-16" color="secondary">
        Promocode
      </Text>
      <form className={styles.promocode} onSubmit={handleSubmitPromocode}>
        <Input
          className={styles.input}
          value={promocode}
          onChange={handleChangePromocode}
          placeholder="Your promocode"
        />
        <Button>Apply</Button>
      </form>

      <hr className={styles.horizontalLine} />

      <div className={styles.prices}>
        <div className={styles.text}>
          <Text view="p-16" color="secondary">
            Subtotal
          </Text>
          <Text view="p-16">$30</Text>
        </div>
        <div className={styles.text}>
          <Text view="p-16" color="secondary">
            Shipping
          </Text>
          <Text view="p-16">Free</Text>
        </div>
        <div className={styles.text}>
          <Text view="p-16" color="secondary">
            Discount
          </Text>
          <Text view="p-16">$0</Text>
        </div>
      </div>

      <hr className={styles.horizontalLine} />

      <div className={styles.text}>
        <Text view="p-18" weight="medium">
          Total
        </Text>
        <Text view="p-18" weight="medium">
          $30
        </Text>
      </div>

      <Button className={styles.checkoutButton}>Proceed to checkout</Button>
    </div>
  );
};

export default TotalCard;
