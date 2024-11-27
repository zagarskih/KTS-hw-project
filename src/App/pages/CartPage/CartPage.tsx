import React, { useEffect } from 'react';
import { Header } from 'components/Header';
import CartProductCard from './CartProductCard';
import TotalCard from './TotalCard';
import { observer } from 'mobx-react-lite';
import GoBack from 'components/GoBack';
import rootStore from 'stores/instance';
import { Text } from 'components';
import RoutesConfig from 'routes';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from 'hooks/useMediaQuery';
import { HeaderMobile } from 'components/Header/HeaderMobile';
import classNames from 'classnames';

import styles from './CartPage.module.scss';

const CartPage: React.FC = () => {
  const { cartStore } = rootStore;
  const navigate = useNavigate();

  const isMobile = useMediaQuery('(max-width: 768px)');

  const goShopping = () => {
    navigate(RoutesConfig.home);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.root}>
      {isMobile ? <HeaderMobile /> : <Header className="header" />}
      <GoBack onClick={goShopping} className={classNames(styles.goBackButton, 'goBack')} children="Continue shopping" />
      <div className={styles.container}>
        {cartStore.cartItems.length === 0 && (
          <Text className={styles.noItems} view="p18">
            No items in your cart yet.
          </Text>
        )}
        <div className={styles.cards}>
          {cartStore.cartItems.map((item) => (
            <div key={item.product.id} className={styles.product}>
              <CartProductCard product={item.product} quantity={item.quantity} />
            </div>
          ))}
        </div>
        <div className={styles.totalCard}>
          <TotalCard />
        </div>
      </div>
    </div>
  );
};

export default observer(CartPage);
