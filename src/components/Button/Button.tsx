import React from 'react';
import { Loader } from 'components';
import classNames from 'classnames';
import styles from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button: React.FC<ButtonProps> = (props) => {
  const { children, className, loading, disabled, onClick, ...buttonProps } = props;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading && onClick) {
      onClick(event);
    }
  };

  return (
    <button
      {...buttonProps}
      className={classNames(className, styles.button, disabled && styles.disabled)}
      disabled={disabled || loading}
      onClick={handleClick}
    >
      {loading && <Loader size={'s'} className={styles.loader} />}
      {children}
    </button>
  );
};

export default Button;
