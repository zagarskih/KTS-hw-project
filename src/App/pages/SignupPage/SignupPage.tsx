import React, { useState } from 'react';
import { Input, Text, Button, Layout } from 'components';
import { useNavigate, Link } from 'react-router-dom';
import rootStore from 'stores/instance';
import RoutesConfig from 'routes';
import { signupSchema, SignupFormData } from 'config/schemas';
import useIsMobile from 'hooks/useIsMobile';

import styles from './SignupPage.module.scss';
import clothes from 'assets/images/clothes.jpg';
import frame from 'assets/icons/frame.svg';

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isMobile = useIsMobile();

  const navigate = useNavigate();

  const handleInputChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const result = signupSchema.safeParse(formData);

    if (!result.success) {
      setError(result.error.errors[0].message);
      setLoading(false);
      return;
    }

    const avatar = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

    try {
      await rootStore.authStore.register(formData.name, formData.email, formData.password, avatar);
      setSuccessMessage(`Registration successful. Redirecting to login page.`);
      setTimeout(() => {
        navigate(RoutesConfig.login);
      }, 3000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className={styles.root} isMobile={isMobile}>
      <div className={styles.container}>
        {!isMobile && (
          <div className={styles.imgContainer}>
            <img className={styles.img} src={clothes} alt="loginImg" />
          </div>
        )}
        <div className={styles.loginContainer}>
          <img src={frame} alt="logoImg" />
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input
              className={styles.input}
              value={formData.name}
              placeholder="name"
              onChange={(value) => handleInputChange(value, 'name')}
            />
            <Input
              className={styles.input}
              value={formData.email}
              placeholder="email"
              onChange={(value) => handleInputChange(value, 'email')}
            />
            <Input
              isPassword={true}
              className={styles.input}
              value={formData.password}
              placeholder="password"
              onChange={(value) => handleInputChange(value, 'password')}
            />
            <div className={styles.messagesContainer}>
              {error && (
                <Text view="p14" className="errorMessage">
                  {error}
                </Text>
              )}
              {successMessage && (
                <Text color="accent" view="p14">
                  {successMessage}
                </Text>
              )}
            </div>
            <Button disabled={loading}>Sign up</Button>
          </form>
          <div className={styles.bottomText}>
            <Text view="p16" color="secondary">
              Already have an account?
            </Text>
            <Link className="link" to={RoutesConfig.login}>
              <Text view="p16" color="accent">
                Log in now!
              </Text>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignupPage;
