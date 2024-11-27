import React, { useEffect, useState } from 'react';
import { Text, Button, Layout } from 'components';
import rootStore from 'stores/instance';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Loading } from 'components';
import RoutesConfig from 'routes';
import useIsMobile from 'hooks/useIsMobile';

import styles from './ProfilePage.module.scss';

const ProfilePage: React.FC = () => {
  const { authStore } = rootStore;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [avatarLoading, setAvatarLoading] = useState(false);

  const isMobile = useIsMobile();

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

  const handleImageClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (event: Event) => {
      const inputElement = event.target as HTMLInputElement;
      if (inputElement?.files) {
        handleFileChange({
          target: inputElement,
          preventDefault: () => {},
          persist: () => {},
        } as React.ChangeEvent<HTMLInputElement>);
      }
    };
    input.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarLoading(true);
      setImagePreview(null);
      try {
        await authStore.changeAvatar(file);
      } catch (error) {
        console.error(error);
      } finally {
        setAvatarLoading(false);
      }
    }
  };

  if (!authStore.isAuth) {
    return null;
  }

  return (
    <Layout className={styles.root} isMobile={isMobile}>
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
              {avatarLoading ? (
                <div className={styles.imgLoading}>
                  <Loading />
                </div>
              ) : (
                <img
                  className={styles.img}
                  src={imagePreview || authStore.user?.avatar}
                  alt="User avatar"
                  onClick={handleImageClick}
                />
              )}
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
    </Layout>
  );
};

export default observer(ProfilePage);
