import { makeAutoObservable, runInAction } from 'mobx';
import { login, getProfile, refreshToken, createUser } from 'api';
import { ProfileApi } from 'api/types';

export default class AuthStore {
  user: ProfileApi | null = null;
  isAuth: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  login = async (email: string, password: string) => {
    try {
      const { data: tokens } = await login({ email, password });

      if (tokens) {
        localStorage.setItem('accessToken', tokens.access_token);
        localStorage.setItem('refreshToken', tokens.refresh_token);

        runInAction(() => {
          this.isAuth = true;
        });
        await this.fetchProfile();
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error: unknown) {
      runInAction(() => {
        this.isAuth = false;
      });
      throw error;
    }
  };

  fetchProfile = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      runInAction(() => {
        this.user = null;
        this.isAuth = false;
      });
      return;
    }

    const { data: user } = await getProfile(accessToken);
    if (user) {
      runInAction(() => {
        this.user = user;
        this.isAuth = true;
      });
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      runInAction(() => {
        this.user = null;
        this.isAuth = false;
      });
    }
  };

  register = async (name: string, email: string, password: string, avatar: string) => {
    try {
      const newUser = await createUser({ name, email, password, avatar });
      return newUser;
    } catch {
      throw new Error('Error during registration. Please try again.');
    }
  };

  refreshToken = async () => {
    await refreshToken();
  };

  logout() {
    runInAction(() => {
      this.user = null;
      this.isAuth = false;
    });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
