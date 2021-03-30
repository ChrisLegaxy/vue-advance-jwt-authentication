import { AuthResponseDto, LoginBodyDto, RegisterBodyDto } from '@/interfaces/IAuth';
import { UserResponseDto } from '@/interfaces/IUser';
// import router from '@/router';
// eslint-disable-next-line import/no-cycle
import axios from '@/utils/axios';

export const login = async (loginBodyDto: LoginBodyDto): Promise<AuthResponseDto> => {
  const response = await axios({
    url: '/auth/login',
    method: 'POST',
    data: loginBodyDto,
    withCredentials: true,
  });

  return response.data;
};

export const register = async (registerBodyDto: RegisterBodyDto): Promise<AuthResponseDto> => {
  const response = await axios({
    url: '/auth/register',
    method: 'POST',
    data: registerBodyDto,
    withCredentials: true,
  });

  return response.data;
};

export const getCurrentUser = async (): Promise<UserResponseDto> => {
  try {
    const response = await axios({
      url: '/auth/current',
      method: 'GET',
    });

    return response.data;
  } catch (error) {
    /**
     * ! Add global error handling
     */
    return Promise.reject(error);
  }
};

export const refreshToken = async (): Promise<AuthResponseDto> => {
  try {
    const response = await axios({
      url: '/auth/refresh_token',
      method: 'GET',
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    /**
     * ! Add global error handling
     * * Only use case is when cookie is expired
     */

    return Promise.reject(error);
  }
};
