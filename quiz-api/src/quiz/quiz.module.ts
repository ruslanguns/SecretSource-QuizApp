import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entities';
import { QuestionModule } from 'src/question/question.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Result]),
    QuestionModule
  ],
  providers: [QuizService],
  controllers: [QuizController]
})
export class QuizModule {}
