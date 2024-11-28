import React from 'react';

type LogoProps = {
  stroke?: string;
};

const Sun: React.FC<LogoProps> = ({ stroke = '#151411' }) => {
  return (
    <svg width="50" height="50" viewBox="-6 -6 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="4" stroke={stroke} />
      <path d="M12 8V4" stroke={stroke} />
      <path d="M12 20V16" stroke={stroke} />
      <path d="M9.17157 9.1712L6.34314 6.34277" stroke={stroke} />
      <path d="M17.6568 17.6566L14.8284 14.8281" stroke={stroke} />
      <path d="M16 12L20 12" stroke={stroke} />
      <path d="M4 12L8 12" stroke={stroke} />
      <path d="M14.8283 9.1712L17.6567 6.34277" stroke={stroke} />
      <path d="M6.3432 17.6566L9.17163 14.8281" stroke={stroke} />
    </svg>
  );
};

export default Sun;
