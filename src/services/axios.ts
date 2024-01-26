import axios from 'axios';
import { useRecoilValue } from 'recoil';

import { tokenState } from '@/atoms/auth';

export const getAPIClient = () => {
  // const { 'nextauth.token': token } = parseCookies(ctx)
  // const token = useRecoilValue(tokenState);

  const token = `123`;

  const api = axios.create({
    baseURL: 'http://localhost:3333',
  });

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        // Ou outro código específico de token inválido
        logout();
      }
      return Promise.reject(error);
    },
  );

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }

  return api;
};
