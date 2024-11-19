import React from 'react';
import { Header } from 'components/Header';
import CartProductCard from './CartProductCard';
import TotalCard from './TotalCard';
import { Link } from 'react-router-dom';
import GoBack from 'components/GoBack';
import RoutesConfig from 'routes';

import styles from './CartPage.module.scss';

const CartPage: React.FC = () => {
  return (
    <>
      <Header className="header" />
      <Link className="link" to={RoutesConfig.products.mask}>
        <GoBack className="goBack" children="Continue shopping" />
      </Link>
      <div className={styles.container}>
        <div className={styles.products}>
          <CartProductCard />
        </div>
        <div className={styles.totalCard}>
          <TotalCard />
        </div>
      </div>
    </>
  );
};

export default CartPage;
