import { API_HOST_KEY } from './constants';

const host = () => localStorage.getItem(API_HOST_KEY);
const baseUrl = () => host() + '/api/v1';

export const auth = {
  login: (jwt: string) => {
    return fetch(baseUrl() + '/auth/login', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  },
};
