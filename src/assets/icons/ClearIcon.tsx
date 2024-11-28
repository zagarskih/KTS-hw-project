import React from 'react';

type ClearIconProps = {
  width?: number;
  height?: number;
  className?: string;
  onClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
};

const ClearIcon: React.FC<ClearIconProps> = ({ width = 24, height = 24, className, onClick }) => {
  return (
    <svg
      onClick={onClick}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <path className={className} d="M18 6L6 18" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
      <path d="M6 6L18 18" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
    </svg>
  );
};

export default ClearIcon;
