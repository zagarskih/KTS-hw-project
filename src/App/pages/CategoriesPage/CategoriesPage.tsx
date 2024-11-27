import React, { useEffect } from 'react';
import { Text, Layout } from 'components';
import Content from './components/Content';
import useIsMobile from 'hooks/useIsMobile';

import styles from './CategoriesPage.module.scss';

const CategoriesPage: React.FC = () => {
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout className={styles.root} isMobile={isMobile}>
      <div className={styles.text}>
        <Text className={styles.title} view="title">
          Categories
        </Text>
        <Text className={styles.description} view="p20" color="secondary">
          Choose the category that interests you, and find exactly what you're looking for with ease
        </Text>
      </div>
      <div className={styles.content}>
        <Content />
      </div>
    </Layout>
  );
};

export default CategoriesPage;
