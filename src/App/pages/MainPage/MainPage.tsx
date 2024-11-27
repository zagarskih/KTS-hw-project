import React from 'react';
import { Text, Layout } from 'components';
import Content from './components/Content';
import useIsMobile from 'hooks/useIsMobile';

import styles from './MainPage.module.scss';

const MainPage: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <Layout className={styles.root} isMobile={isMobile}>
      <div className={styles.text}>
        <Text className={styles.title} view="title">
          Products
        </Text>
        <Text className={styles.description} view="p20" color="secondary">
          We display products based on the latest products we have, if you want to see our old products please enter the
          name of the item
        </Text>
      </div>
      <div className={styles.content}>
        <Content />
      </div>
    </Layout>
  );
};

export default MainPage;
