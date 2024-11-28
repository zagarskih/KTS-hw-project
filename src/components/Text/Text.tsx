import * as React from 'react';
import classNames from 'classnames';
import styles from './Text.module.scss';

export type TextProps = {
  className?: string;
  view?: 'title' | 'button' | 'p20' | 'p18' | 'p16' | 'p14';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  weight?: 'normal' | 'medium' | 'bold';
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'accent';
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({
  className,
  tag: Tag = 'p',
  children,
  maxLines,
  color = 'primary',
  view = 'p14',
  weight = '',
}) => {
  const inlineStyle = {
    fontWeight: weight === 'normal' ? 400 : weight === 'medium' ? 500 : weight === 'bold' ? 700 : weight,
    WebkitLineClamp: maxLines,
  };

  return (
    <Tag style={inlineStyle} className={classNames(className, styles.text, styles[color], styles[view])}>
      {children}
    </Tag>
  );
};

export default Text;
