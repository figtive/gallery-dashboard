import { JWT_KEY } from './constants';
import { authStore } from './store';

export const login = (jwt: string) => {
  window.localStorage.setItem(JWT_KEY, jwt);
  authStore.update((value) => {
    return {
      ...value,
      isAuthenticated: true,
    };
  });
};

export const logout = () => {
  window.localStorage.removeItem(JWT_KEY);
  authStore.update((value) => {
    return {
      ...value,
      isAuthenticated: false,
    };
  });
};
