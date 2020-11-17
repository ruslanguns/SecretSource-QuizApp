import { PartialType } from '@nestjs/swagger';
import { CreateAnswerDTO } from './create-answer.dto';

export class EditAnswerDTO extends PartialType(CreateAnswerDTO) {}