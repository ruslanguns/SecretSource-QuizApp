import { IAnswer, IQuestion } from './question.interface';

export interface IQuizAnswered {
  id: number;
  answeredAt: Date;
  question: IQuestion;
  selectedAnswer: IAnswer;
}