import React from 'react';
import classNames from 'classnames';
import styles from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>((props) => {
  const { className, value, onChange, afterSlot, placeholder, disabled, ...inputProps } = props;
  return (
    <div className={classNames(styles.container, className)}>
      <input
        {...inputProps}
        className={styles.input}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      ></input>
      <div className={styles.icon}>{afterSlot}</div>
    </div>
  );
});

export default Input;
