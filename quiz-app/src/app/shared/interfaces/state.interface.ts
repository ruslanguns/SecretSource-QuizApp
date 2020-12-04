import { IQuestion } from './question.interface';
import { IQuizAnswered } from './quiz-answered.interface';
import { IUser } from './user.interface';

export interface IState {
  currentUser: IUser|undefined;
  accessToken: string|undefined;
  isAuthorized: boolean;
  isLoading: boolean;
  questions: IQuestion[];
  users: IUser[];
  answeredQuizzes: IQuizAnswered[],
  unansweredQuizzes: IQuestion[]
}