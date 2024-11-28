import React from 'react';
import { Loader } from 'components/Loader';

import styles from './Loading.module.scss';

type LoadingProps = {
  size?: 's' | 'm' | 'l';
};

const Loading: React.FC<LoadingProps> = ({ size = 'l' }) => {
  return <Loader size={size} className={styles.loader} />;
};

export default Loading;
