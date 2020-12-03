import { OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { CreateQuestionDTO } from './create-question.dto';
import { EditAnswerDTO } from './edit-answer.dto';

export class EditQuestionDTO extends PartialType(
  OmitType(CreateQuestionDTO, ['answers'] as const)
) {
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(6)
  @ValidateNested()
  @Type((type) => EditAnswerDTO)
  answers: EditAnswerDTO[];
}