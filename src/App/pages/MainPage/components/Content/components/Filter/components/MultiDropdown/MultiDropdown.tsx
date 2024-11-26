import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Input, ArrowDownIcon } from 'components';
import styles from './MultiDropDown.module.scss';

export type MultiDropdownOption<KeyT> = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: KeyT;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps<KeyT> = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: MultiDropdownOption<KeyT>[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: MultiDropdownOption<KeyT>[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: MultiDropdownOption<KeyT>[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: MultiDropdownOption<KeyT>[]) => string;

  mode?: 'single' | 'multi';
};

const MultiDropdown = <KeyT extends string | number>(
  props: MultiDropdownProps<KeyT>,
) => {
  const {
    className,
    options,
    value,
    onChange,
    disabled,
    getTitle,
    mode = 'multi',
  } = props;

  const [isOpened, setIsOpened] = useState(false);
  const [search, setSearch] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpened((prev) => !prev);
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (!(event.target instanceof Element)) return;

      const isOpen = containerRef.current.contains(event.target);
      if (!isOpen) {
        setIsOpened(false);
      }
    };

    window.document.addEventListener('click', handleClick);
    return () => {
      window.document.removeEventListener('click', handleClick);
    };
  }, [setIsOpened, value]);

  useEffect(() => {
    if (isOpened) {
      setSearch('');
    } else {
      setSearch(value.length ? getTitle(value) : '');
    }
  }, [isOpened, value, getTitle, setSearch]);

  const filteredOptions = options.filter((option) => {
    if (search === null) return true;
    return option.value
      .toLocaleLowerCase()
      .startsWith(search.toLocaleLowerCase());
  });

  return (
    <div ref={containerRef} className={classNames(styles.container, className)}>
      <div className={styles.inputWrapper} onClick={toggleDropdown}>
        <Input
          className={classNames(
            (isOpened || value.length === 0) && styles.input,
          )}
          value={search}
          onChange={(value) => setSearch(value)}
          placeholder={getTitle(value)}
          disabled={disabled}
          afterSlot={
            <ArrowDownIcon
              className={classNames(styles.icon, isOpened && styles.flipIcon)}
            />
          }
        />
      </div>
      {isOpened && !disabled && (
        <div className={styles.options}>
          {filteredOptions.map((option) => {
            const isSelected = value.some((v) => v.key === option.key);
            return (
              <div
                className={classNames(
                  styles.item,
                  isSelected && styles.item__selected,
                )}
                onClick={() => {
                  if (isSelected) {
                    onChange(value.filter((v) => v.key !== option.key));
                  } else {
                    onChange([...(mode === 'multi' ? value : []), option]);
                  }
                }}
                key={option.key}
              >
                {option.value}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;
