import { IUser } from './user.interface';

export interface IAuthLogin {
  user: IUser,
  accessToken: string;
}