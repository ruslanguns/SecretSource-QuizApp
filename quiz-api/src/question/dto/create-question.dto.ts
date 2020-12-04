import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateAnswerDTO } from './create-answer.dto';


export class CreateQuestionDTO {
  @IsString()
  @MaxLength(255)
  question: string;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(6)
  @ValidateNested()
  @Type((type) => CreateAnswerDTO)
  answers: CreateAnswerDTO[];

  @IsOptional()
  @IsString()
  @MaxLength(120)
  category: string;

  @IsOptional()
  @IsBoolean()
  status: boolean;
}
