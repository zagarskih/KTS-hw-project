import React from 'react';
import classNames from 'classnames';
import styles from './Placeholder.module.scss';

export type PlaceholderProps = {
  className?: string;
  height: number;
};

const Placeholder: React.FC<PlaceholderProps> = (props) => {
  const { className, height } = props;
  return <div className={classNames(className, styles.placeholder)} style={{ height: height }}></div>;
};

export default Placeholder;
