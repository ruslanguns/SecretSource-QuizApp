import { PartialType } from '@nestjs/swagger';
import { Question } from 'src/question/entities';


export class QuestionResultsDTO extends PartialType(Question) {
  answeredAt: Date;
}