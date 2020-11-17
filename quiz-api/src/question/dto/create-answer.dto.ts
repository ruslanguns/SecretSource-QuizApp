import { IsString, MaxLength, IsOptional, IsBoolean } from "class-validator";


export class CreateAnswerDTO {
  @IsString()
  @MaxLength(255)
  answer: string;

  @IsOptional()
  @IsBoolean()
  isCorrect?: boolean;
}
