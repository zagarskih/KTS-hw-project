import React, { useState } from 'react';
import { Header } from 'components/Header';
import clothes from 'assets/clothes.jpg';
import frame from 'assets/icons/frame.svg';
import { Input } from 'components/Input';
import { Text } from 'components/Text';
import { Button } from 'components/Button';
import RoutesConfig from 'routes';

import styles from './LoginPage.module.scss';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  return (
    <>
      <Header />
      <div className={styles.root}>
        <div className={styles.container}>
          <div className={styles.imgContainer}>
            <img className={styles.img} src={clothes} alt="loginImg" />
          </div>
          <div className={styles.loginContainer}>
            <img src={frame} alt="logoImg" />
            <form className={styles.form}>
              <Input className={styles.input} value={email} placeholder="email" onChange={handleEmailChange} />
              <Input className={styles.input} value={password} placeholder="password" onChange={handlePasswordChange} />
              <Button>Log in</Button>
            </form>
            <div className={styles.bottomText}>
              <Text view="p-16" color="secondary">
                Don't have an account?
              </Text>
              <Link className="link" to={RoutesConfig.signup}>
                <Text view="p-16" color="accent">
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
