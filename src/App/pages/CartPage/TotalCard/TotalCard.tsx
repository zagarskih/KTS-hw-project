import React, { useState, useEffect } from 'react';
import { Text, Button, Input } from 'components';
import { observer } from 'mobx-react-lite';
import rootStore from 'stores/instance';
import { AmountConfig } from 'config/constants';

import styles from './TotalCard.module.scss';

const TotalCard: React.FC = () => {
  const [promocode, setPromocode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { cartStore } = rootStore;

  const delivery = AmountConfig.delivery ? `$${AmountConfig.delivery}` : 'Free';

  useEffect(() => {
    const savedPromocode = localStorage.getItem('appliedPromocode');
    if (savedPromocode) {
      setPromocode(savedPromocode);
    }
  }, []);

  const handleChangePromocode = (value: string) => {
    setPromocode(value);
    setError(null);
  };

  const handleSubmitPromocode = (event: React.FormEvent) => {
    event.preventDefault();
    try {
      cartStore.applyPromocode(promocode);
      setError(null);
    } catch {
      setError('is invalid');
    }
  };

  return (
    <div className={styles.container}>
      <Text className={styles.title} view="p18">
        Summary
      </Text>

      <hr className={styles.horizontalLine} />

      <div className={styles.promocodeText}>
        <Text className={styles.promoTitle} view="p16" color="secondary">
          Promocode
        </Text>
        {error && <Text className={styles.error}>{error}</Text>}
        {localStorage.getItem('appliedPromocode') === AmountConfig.PROMOCODE && (
          <Text className={styles.promoApplied} color="accent" view="p14">
            {AmountConfig.discount}% discount promocode applied
          </Text>
        )}
      </div>

      <form className={styles.promocode} onSubmit={handleSubmitPromocode}>
        <Input
          className={styles.input}
          value={promocode}
          onChange={handleChangePromocode}
          placeholder="Your promocode"
        />
        <Button type="submit">Apply</Button>
      </form>

      <hr className={styles.horizontalLine} />

      <div className={styles.prices}>
        <div className={styles.text}>
          <Text view="p16" color="secondary">
            Subtotal
          </Text>
          <Text view="p16">${cartStore.getTotalAmount().toFixed(2)}</Text>
        </div>
        <div className={styles.text}>
          <Text view="p16" color="secondary">
            Shipping
          </Text>
          <Text view="p16">{delivery}</Text>
        </div>
        <div className={styles.text}>
          <Text view="p16" color="secondary">
            Discount
          </Text>
          <Text view="p16">${cartStore.discount.toFixed(2)}</Text>
        </div>
      </div>

      <hr className={styles.horizontalLine} />

      <div className={styles.text}>
        <Text view="p18" weight="medium">
          Total
        </Text>
        <Text view="p18" weight="medium">
          ${cartStore.getFinalAmount().toFixed(2)}
        </Text>
      </div>

      <Button className={styles.checkoutButton}>Proceed to checkout</Button>
    </div>
  );
};

export default observer(TotalCard);
