import { UserResponseDto } from './IUser';

export interface AuthResponseDto {
  user: UserResponseDto;
  accessToken: string;
}

export interface LoginBodyDto {
  username: string;
  password: string;
}

export interface RegisterBodyDto {
  username: string;
  password: string;
}
