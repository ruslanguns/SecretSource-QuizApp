import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateQuestionDTO } from './create-question.dto';

export class EditQuestionDTO extends PartialType(
  OmitType(CreateQuestionDTO, ['answers'] as const)
) {}