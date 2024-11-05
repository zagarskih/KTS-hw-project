import React from 'react';
import frame from 'assets/icons/frame.svg';
import bag from 'assets/icons/bag.svg';
import user from 'assets/icons/user.svg';
import Text from '../Text';
import classNames from 'classnames';
import styles from './Header.module.scss';
import { Link, useLocation } from 'react-router-dom';

type HeaderProps = {
  className?: string;
};

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { className } = props;
  const location = useLocation();

  return (
    <div className={classNames(className, styles.container)}>
      <Link className={styles.link} to="/">
        <img src={frame} alt="frame" />
      </Link>

      <div className={styles.textContainer}>
        <Link className={styles.link} to="/">
          <div key="products" className={styles.textWrapper}>
            <Text
              view="p-18"
              className={classNames(location.pathname.startsWith('/products') && styles.highlightedtext)}
              color={location.pathname.startsWith('/products') ? 'accent' : 'primary'}
            >
              Products
            </Text>
          </div>
        </Link>

        <div key="categories" className={styles.text}>
          <Text view="p-18">Categories</Text>
        </div>

        <div key="about" className={styles.text}>
          <Text view="p-18">About Us</Text>
        </div>
      </div>

      <div className={styles.icons}>
        <img className={styles.bag} src={bag} alt="bag" />
        <img className={styles.user} src={user} alt="user" />
      </div>
    </div>
  );
};

export default Header;
