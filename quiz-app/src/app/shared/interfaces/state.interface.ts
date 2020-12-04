import { IQuestion } from './question.interface';
import { IUser } from './user.interface';

export interface IState {
  currentUser: IUser|undefined;
  accessToken: string|undefined;
  isAuthorized: boolean;
  isLoading: boolean;
  questions: IQuestion[];
  users: IUser[];
}