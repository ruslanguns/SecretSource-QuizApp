export interface IAnswer {
  id?: number;
  answer: string;
  isCorrect?: boolean;
}

export interface IQuestion {
  id?: number;
  question: string;
  answers: IAnswer[];
  category: string;
  status?: boolean;
}