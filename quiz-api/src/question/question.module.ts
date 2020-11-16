import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer, Question } from './entities';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Answer])],
  providers: [QuestionService],
  controllers: [QuestionController]
})
export class QuestionModule {}
