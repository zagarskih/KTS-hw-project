import React from 'react';
import classNames from 'classnames';
import arrowRight from 'assets/icons/arrowRight.svg';
import { Button } from 'components';
import styles from './GoBack.module.scss';

type GoBackProps = {
  className: string;
  children: string;
}

const GoBack: React.FC<GoBackProps> = (props) => {
  const { className, children } = props;

  return (
    <div className={classNames(styles.container, className)}>
      <img className={styles.icon} src={arrowRight} alt="arrow" />
      <Button className={styles.button}>{children}</Button>
    </div>
  );
};

export default GoBack;
