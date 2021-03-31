import { AuthResponseDto, LoginBodyDto, RegisterBodyDto } from '@/interfaces/IAuth';
import { UserResponseDto } from '@/interfaces/IUser';

/* eslint-disable-next-line import/no-cycle */
import axios from '@/utils/axios';
import { AxiosResponse } from 'axios';

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

export const logout = async (): Promise<AxiosResponse> => {
  const response = await axios({
    url: '/auth/logout',
    method: 'GET',
    // needs to set credential true here, else it won't know it's the right cookie to clear
    withCredentials: true,
  });

  return response;
};
