import * as React from 'react';
import classNames from 'classnames';
import styles from './Text.module.scss';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const Text: React.FC<TextProps> = (props) => {
  const { className, tag, children, maxLines } = props;

  const Tag = tag ?? 'p';

  const color = props.color ?? 'inherit';
  const view = props.view ?? 'p-14';

  const inlineStyle = {
    fontWeight:
      props.weight === 'normal'
        ? 400
        : props.weight === 'medium'
        ? 500
        : props.weight === 'bold'
        ? 700
        : '',
    WebkitLineClamp: maxLines,
  };

  return (
    <Tag
      style={inlineStyle}
      className={classNames(className, styles.text, styles[color], styles[view])}
    >
      {children}
    </Tag>
  );
};

export default Text;
