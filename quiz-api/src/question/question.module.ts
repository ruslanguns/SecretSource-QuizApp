import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer, Question } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Answer])]
})
export class QuestionModule {}
