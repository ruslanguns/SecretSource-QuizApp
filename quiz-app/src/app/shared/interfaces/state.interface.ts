import { IQuestion } from './question.interface';
import { IQuiz } from './quiz-answered.interface';
import { IUser } from './user.interface';

export interface IState {
  currentUser: IUser|undefined;
  accessToken: string|undefined;
  isAuthorized: boolean;
  questions: IQuestion[];
  users: IUser[];
  answeredQuizzes: IQuiz[],
  unansweredQuizzes: IQuestion[],
  selectedQuiz: IQuiz|null
}