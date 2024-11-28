import React from 'react';

type LogoProps = {
  stroke?: string;
};

const Menu: React.FC<LogoProps> = ({ stroke = '#151411' }) => {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.75 8.75H26.25" stroke={stroke} stroke-width="2" stroke-linecap="round" />
      <path d="M3.75 15H26.25" stroke={stroke} stroke-width="2" stroke-linecap="round" />
      <path d="M3.75 21.25H26.25" stroke={stroke} stroke-width="2" stroke-linecap="round" />
    </svg>
  );
};

export default Menu;
