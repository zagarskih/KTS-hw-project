import React, { useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import RoutesConfig from 'routes';
import { MobileMenu } from './MobileMenu';

import styles from './HeaderMobile.module.scss';
import frame from 'assets/icons/frame.svg';
import menu from 'assets/icons/menu.svg';

type HeaderProps = {
  className?: string;
};

const HeaderMobile: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { className } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <>
      <header className={classNames(className, styles.container)}>
        <Link className="link" to={RoutesConfig.products.mask}>
          <img src={frame} alt="frame" />
        </Link>
        <img className={styles.menuIcon} src={menu} alt="menu" onClick={toggleMenu} />
      </header>
      <MobileMenu isOpen={isMenuOpen} onClose={toggleMenu} />
    </>
  );
};

export default HeaderMobile;
