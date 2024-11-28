import React from 'react';
import { Text } from 'components';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { tabsEntries } from 'config/tabs';
import RoutesConfig from 'routes';
import { useTheme } from 'hooks/useTheme';

import styles from './Header.module.scss';
import Lalasia from 'assets/icons/Lalasia';
import Bag from 'assets/icons/Bag';
import User from 'assets/icons/User';
import Sun from 'assets/icons/Sun';
import Moon from 'assets/icons/Moon';

type HeaderProps = {
  className?: string;
};

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { className } = props;
  const location = useLocation();

  const { theme, toggleTheme } = useTheme();

  return (
    <div className={classNames(className, styles.container)}>
      <Link className="link" to={RoutesConfig.products.mask}>
        <Lalasia fill={theme === 'dark' ? '#ffffff' : '#151411'} />
      </Link>

      <div className={styles.textContainer}>
        {tabsEntries.map(([key, value]) => {
          return (
            <Link key={key} className="link" to={`/${key}`}>
              <div className={styles.textWrapper}>
                <Text
                  view="p18"
                  className={classNames(location.pathname.startsWith(`/${key}`) && styles.highlightedtext, styles.text)}
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
        <div className={styles.theme} onClick={toggleTheme}>
          {theme === 'dark' ? <Sun stroke="#ffffff" /> : <Moon />}{' '}
        </div>
        <Link className="link" to={RoutesConfig.cart}>
          <Bag className={styles.bag} stroke={theme === 'dark' ? '#ffffff' : '#151411'} />
        </Link>
        <Link className="link" to={RoutesConfig.profile}>
          <User className={styles.user} stroke={theme === 'dark' ? '#ffffff' : '#151411'} />
        </Link>
      </div>
    </div>
  );
};

export default Header;
