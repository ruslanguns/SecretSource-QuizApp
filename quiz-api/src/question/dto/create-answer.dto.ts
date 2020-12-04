import { IsString, MaxLength, IsOptional, IsBoolean, IsNumber } from "class-validator";


export class CreateAnswerDTO {

  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  @MaxLength(255)
  answer: string;

  @IsOptional()
  @IsBoolean()
  isCorrect?: boolean;
}
