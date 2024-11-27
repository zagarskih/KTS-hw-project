import React, { ChangeEvent, forwardRef } from 'react';
import classNames from 'classnames';

import styles from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  value: string;
  onChange: (value: string) => void;
  afterSlot?: React.ReactNode;
  isPassword?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, value, onChange, afterSlot, placeholder, disabled, isPassword, ...inputProps } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={classNames(styles.container, className)}>
      <input
        {...inputProps}
        ref={ref}
        className={styles.input}
        type={isPassword ? 'password' : 'text'}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
      ></input>
      <div className={styles.icon}>{afterSlot}</div>
    </div>
  );
});

export default Input;
