import { UserResponseDto } from '@/interfaces/IUser';
import axios from '@/utils/axios';

export const getUsers = async (): Promise<UserResponseDto[]> => {
  const response = await axios({
    url: '/users',
  });

  return response.data;
};
