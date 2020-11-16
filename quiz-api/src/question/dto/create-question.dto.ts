import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

class AnswerDTO {
  @IsString()
  @MaxLength(255)
  answer: string;

  @IsOptional()
  @IsBoolean()
  isCorrect?: boolean;
}

export class CreateQuestionDTO {
  @IsString()
  @MaxLength(255)
  question: string;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(6)
  @ValidateNested()
  @Type((type) => AnswerDTO)
  answers: AnswerDTO[];

  @IsOptional()
  @IsString()
  @MaxLength(120)
  category: string;

  @IsOptional()
  @IsBoolean()
  status: boolean;
}
