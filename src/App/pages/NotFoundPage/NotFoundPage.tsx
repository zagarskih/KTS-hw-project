import React from 'react';
import { Text, Button } from 'components';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';
import RoutesConfig from 'routes';

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.root}>
      <Text view="title">Ooops!</Text>
      <Text view="title">Page not found</Text>
      <Text className={styles.secondaryText} color="secondary" view="p-18">
        Please visit our homepage to get where you need to go.
      </Text>
      <Link to={RoutesConfig.products.mask}>
        <Button className={styles.button}>Go to homepage</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
