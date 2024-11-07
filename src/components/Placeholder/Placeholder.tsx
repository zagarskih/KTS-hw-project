import React from 'react';
import classNames from 'classnames';
import styles from './Placeholder.module.scss';

export type PlaceholderProps = {
  className?: string;
  height: number;
  circleForm?: boolean;
};

const Placeholder: React.FC<PlaceholderProps> = (props) => {
  const { className, height, circleForm } = props;
  return <div className={classNames(className, styles.placeholder, circleForm && styles.circle )} style={{ height: height }}></div>;
};

export default Placeholder;
