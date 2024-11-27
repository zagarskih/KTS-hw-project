import React, { useState } from 'react';
import clothes from 'assets/images/clothes.jpg';
import frame from 'assets/icons/frame.svg';
import { Header, Input, Text, Button } from 'components';
import { useNavigate } from 'react-router-dom';
import rootStore from 'stores/instance';
import RoutesConfig from 'routes';
import { Link } from 'react-router-dom';
import useMediaQuery from 'hooks/useMediaQuery';
import { HeaderMobile } from 'components/Header/HeaderMobile';

import styles from './LoginPage.module.scss';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isMobile = useMediaQuery('(max-width: 768px)');

  const navigate = useNavigate();
  const { authStore } = rootStore;

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      await authStore.login(email, password);
      navigate(RoutesConfig.home);
    } catch {
      setError('Wrong email and/or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isMobile ? <HeaderMobile /> : <Header className="header" />}
      <div className={styles.root}>
        <div className={styles.container}>
          {!isMobile && (
            <div className={styles.imgContainer}>
              <img className={styles.img} src={clothes} alt="loginImg" />
            </div>
          )}
          <div className={styles.loginContainer}>
            <img src={frame} alt="logoImg" />
            <form onSubmit={handleSubmit} className={styles.form}>
              <Input className={styles.input} value={email} placeholder="email" onChange={handleEmailChange} />
              <Input
                isPassword={true}
                className={styles.input}
                value={password}
                placeholder="password"
                onChange={handlePasswordChange}
              />
              <div className={styles.errorContainer}>
                {error && (
                  <Text view="p14" className="errorMessage">
                    {error}
                  </Text>
                )}
              </div>
              <Button disabled={loading}>Log in</Button>
            </form>
            <div className={styles.bottomText}>
              <Text view="p16" color="secondary">
                Don't have an account?
              </Text>
              <Link className="link" to={RoutesConfig.signup}>
                <Text view="p16" color="accent">
                  Sign up now!
                </Text>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
