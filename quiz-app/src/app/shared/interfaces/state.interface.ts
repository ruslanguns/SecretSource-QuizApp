import { IUser } from './user.interface';

export interface IState {
  user: IUser|null;
  accessToken: string|undefined;
  isLoggedIn: boolean;
  isLoading: boolean;
  errorMessage: string|null;
}