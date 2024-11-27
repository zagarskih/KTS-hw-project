import React, { useEffect, useState } from 'react';
import { Text, Button, Header } from 'components';
import rootStore from 'stores/instance';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Loading } from 'components';
import RoutesConfig from 'routes';
import useMediaQuery from 'hooks/useMediaQuery';
import { HeaderMobile } from 'components/Header/HeaderMobile';

import styles from './ProfilePage.module.scss';

const ProfilePage: React.FC = () => {
  const { authStore } = rootStore;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      authStore.fetchProfile().finally(() => setLoading(false));
    } else {
      setLoading(false);
      navigate(RoutesConfig.login);
    }
  }, [authStore, navigate]);

  const handleLogout = () => {
    authStore.logout();
    navigate(RoutesConfig.login);
  };

  if (!authStore.isAuth) {
    return null;
  }

  return (
    <div className={styles.root}>
      {isMobile ? <HeaderMobile /> : <Header className="header" />}
      {loading ? (
        <div className="loaderCenter">
          <Loading />
        </div>
      ) : (
        <>
          <div className={styles.title}>
            <Text view="title">Profile</Text>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
          <div className={styles.profile}>
            <div className={styles.imgContainer}>
              <img className={styles.img} src={authStore.user?.avatar} alt="User avatar" />
            </div>
            <div className={styles.textContainer}>
              <Text view="p20" weight="bold">
                {authStore.user?.name}
              </Text>
              <Text view="p16" color="secondary">
                {authStore.user?.email}
              </Text>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default observer(ProfilePage);
