import axios, { AxiosError, AxiosInstance } from 'axios';

/* eslint-disable-next-line import/no-cycle */
import { refreshToken } from '@/api/auth';
import router from '@/router';
import { getAccessToken, removeAccessToken, setAccessToken } from '@/utils/auth';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${getAccessToken()}`;

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    /**
     * * Handle all http errors
     */
    if (error.response) {
      /** needs to check if error.response exist in order to destructure properly */
      const {
        config: originalRequestConfig,
        response: { status, data },
      }: AxiosError = error;

      /**
       * * Cases that need to be met in order to refresh token
       */
      const caseJwtExpired: boolean = (status === 401) && (data.message === 'jwt expired');
      const caseMissingAccessToken: boolean = (originalRequestConfig.url !== '/auth/refresh_token') && (getAccessToken() === null);

      if (caseJwtExpired || caseMissingAccessToken) {
        console.info('Refresing token.......');

        const user = await refreshToken();

        console.info('Refreshing token success');

        setAccessToken(user.accessToken);

        originalRequestConfig.headers.Authorization = `Bearer ${getAccessToken()}`;

        console.info('Refetching data.......');

        const retryOriginalRequest = await axios(originalRequestConfig);

        return retryOriginalRequest;
      }

      removeAccessToken();
      router.push('/login');

      console.info('Refresing token failed');
      console.warn('Please login again');

      return Promise.reject(error);
    }

    /**
     * * Handle errors aside from http errors
     */
    if (error.message) {
      switch (error.message) {
        case 'Network Error': {
          console.error("There's may be a problem with your network");
          break;
        }
        default: {
          console.error("There's an unexpected problem occur, please try again later");
          break;
        }
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;