import React from 'react';
import frame from 'assets/icons/frame.svg';
import bag from 'assets/icons/bag.svg';
import user from 'assets/icons/user.svg';
import { Text } from 'components';
import classNames from 'classnames';
import styles from './Header.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { tabsEntries } from 'config/tabs';
import RoutesConfig from 'routes';

type HeaderProps = {
  className?: string;
};

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { className } = props;
  const location = useLocation();

  return (
    <div className={classNames(className, styles.container)}>
      <Link className="link" to={RoutesConfig.products.mask}>
        <img src={frame} alt="frame" />
      </Link>

      <div className={styles.textContainer}>
        {tabsEntries.map(([key, value]) => {
          return (
            <Link key={key} className="link" to={`/${key}`}>
              <div className={styles.textWrapper}>
                <Text
                  view="p-18"
                  className={classNames(location.pathname.startsWith(`/${key}`) && styles.highlightedtext)}
                  color={location.pathname.startsWith(`/${key}`) ? 'accent' : 'primary'}
                >
                  {value}
                </Text>
              </div>
            </Link>
          );
        })}
      </div>

      <div className={styles.icons}>
        <Link className="link" to={RoutesConfig.cart}>
          <img className={styles.bag} src={bag} alt="bag" />
        </Link>
        <Link className="link" to={RoutesConfig.signup}>
          <img className={styles.user} src={user} alt="user" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
