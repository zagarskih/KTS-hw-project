import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Text } from 'components/Text';
import { tabsEntries } from 'config/tabs';
import RoutesConfig from 'routes';
import styles from './MobileMenu.module.scss';

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.menu}>
      <nav className={styles.nav}>
        {tabsEntries.map(([key, value]) => {
          return (
            <Link key={key} className="link" to={`/${key}`}>
              <Text view="p20" color={location.pathname.startsWith(`/${key}`) ? 'accent' : 'primary'}>
                {value}
              </Text>
            </Link>
          );
        })}
        <Link key="cart" className="link" to={RoutesConfig.cart}>
          <Text view="p20" color={location.pathname.startsWith(RoutesConfig.cart) ? 'accent' : 'primary'}>
            Cart
          </Text>
        </Link>
        <Link key="profile" className="link" to={RoutesConfig.profile}>
          <Text view="p20" color={location.pathname.startsWith(RoutesConfig.profile) ? 'accent' : 'primary'}>
            Profile
          </Text>
        </Link>
      </nav>
    </div>,
    document.body,
  );
};

export default MobileMenu;
