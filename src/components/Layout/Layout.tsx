import React, { ReactNode } from 'react';
import { HeaderMobile } from 'components/Header/HeaderMobile';
import { Header } from 'components';

type HeaderLayoutProps = {
  className: string;
  isMobile: boolean;
  children: ReactNode;
};

const HeaderLayout: React.FC<HeaderLayoutProps> = ({ className, isMobile, children }) => {
  return (
    <div className={className}>
      {isMobile ? <HeaderMobile /> : <Header className="header" />}
      {children}
    </div>
  );
};

export default HeaderLayout;
