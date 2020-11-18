import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth, User } from 'src/common/decorators';
import { User as UserEntity } from 'src/user/entities';
import { QuizService } from './quiz.service';


@ApiTags(`Quiz's Endpoints`)
@Controller('quiz')
export class QuizController {

  constructor(
    private readonly quizService: QuizService
  ) {}

  @Auth()
  @Post('answer/:answerId')
  async submitAnswer(
    @User() user: UserEntity,
    @Param('answerId', ParseIntPipe) answerId: number,
  ) {
    return await this.quizService.submitQuizAnswer(user, answerId);
  }

  @Auth()
  @Get('/answered')
  async getAnswered(
    @User() user: UserEntity,
  ) {
    return await this.quizService.getAnsweredQuestions(user);
  }

  @Auth()
  @Get('/unanswered')
  async getUnanswered(
    @User() user: UserEntity,
  ) {
    return await this.quizService.getUnansweredQuestions(user);
  }
}
