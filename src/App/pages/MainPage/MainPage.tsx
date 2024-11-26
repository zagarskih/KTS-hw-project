import React from 'react';
import { Header, Text } from 'components';
import Content from './components/Content';
import styles from './MainPage.module.scss';

const MainPage: React.FC = () => {
  return (
    <div className={styles.root}>
      <Header className={styles.header} />
      <div className={styles.text}>
        <Text className={styles.title} view="title">
          Products
        </Text>
        <Text className={styles.description} view="p-20" color="secondary">
          We display products based on the latest products we have, if you want to see our old products please enter the
          name of the item
        </Text>
      </div>
      <div className={styles.content}>
        <Content />
      </div>
    </div>
  );
};

export default MainPage;
