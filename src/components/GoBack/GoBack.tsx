import React from 'react';
import classNames from 'classnames';
import { Button } from 'components';
import { useTheme } from 'hooks/useTheme';

import styles from './GoBack.module.scss';
import Arrow from 'assets/icons/Arrow';

type GoBackProps = {
  className?: string;
  children: string;
  onClick: () => void;
};

const GoBack: React.FC<GoBackProps> = (props) => {
  const { className, children, onClick } = props;
  const { theme } = useTheme();

  return (
    <div onClick={onClick} className={classNames(styles.container, className)}>
      <Arrow className={styles.icon} stroke={theme === 'dark' ? '#ffffff' : '#151411'} />
      <Button onClick={onClick} className={styles.button}>
        {children}
      </Button>
    </div>
  );
};

export default GoBack;
