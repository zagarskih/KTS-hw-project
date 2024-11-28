import React, { useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import RoutesConfig from 'routes';
import { MobileMenu } from './MobileMenu';
import { useTheme } from 'hooks/useTheme';

import styles from './HeaderMobile.module.scss';
import Lalasia from 'assets/icons/Lalasia';
import Sun from 'assets/icons/Sun';
import Moon from 'assets/icons/Moon';
import Menu from 'assets/icons/Menu';

type HeaderProps = {
  className?: string;
};

const HeaderMobile: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { className } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <header className={classNames(className, styles.container)}>
        <Link className="link" to={RoutesConfig.products.mask}>
          <Lalasia fill={theme === 'dark' ? '#ffffff' : '#151411'} />
        </Link>
        <div className={styles.icons}>
          <div className={styles.theme} onClick={toggleTheme}>
            {theme === 'dark' ? <Sun stroke="#ffffff" /> : <Moon />}
          </div>
          <div className={styles.menuIcon} onClick={toggleMenu}>
            <Menu stroke={theme === 'dark' ? '#ffffff' : '#151411'} />
          </div>
        </div>
      </header>
      <MobileMenu isOpen={isMenuOpen} onClose={toggleMenu} />
    </>
  );
};

export default HeaderMobile;
