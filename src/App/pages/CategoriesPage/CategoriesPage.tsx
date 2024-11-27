import React, { useEffect } from 'react';
import { Header, Text } from 'components';
import Content from './components/Content';
import useMediaQuery from 'hooks/useMediaQuery';
import { HeaderMobile } from 'components/Header/HeaderMobile';

import styles from './CategoriesPage.module.scss';

const CategoriesPage: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.root}>
      {isMobile ? <HeaderMobile /> : <Header className="header" />}
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
    </div>
  );
};

export default CategoriesPage;
