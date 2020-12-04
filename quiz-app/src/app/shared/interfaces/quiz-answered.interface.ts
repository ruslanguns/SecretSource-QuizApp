import { IAnswer, IQuestion } from './question.interface';

export interface IQuiz {
  id: number;
  answeredAt?: Date;
  quiz?: IQuestion;
  selectedAnswer?: IAnswer;
  question?: string;  
  answers?: IAnswer[];
  category?: string;
  createdAt?: Date;
  status?: boolean;
}