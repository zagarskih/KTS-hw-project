import React from 'react';
import { Header, Text } from 'components';
import Content from './components/Content';
import styles from './CategoriesPage.module.scss';

const CategoriesPage: React.FC = () => {
  return (
    <div className={styles.root}>
      <Header className="header" />

      <div className={styles.text}>
        <Text className={styles.title} view="title">
          Categories
        </Text>
        <Text className={styles.description} view="p-20" color="secondary">
          Choose the category that interests you, and find exactly what you're looking for with ease
        </Text>
      </div>
      <div className={styles.content}>
        <Content />
      </div>
    </div>
  );
};

export default CategoriesPage;
