import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateQuestionDTO } from './dto';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {

  constructor(
    private questionService: QuestionService
  ) {}

  @Post()
  async createOne(
    @Body() dto: CreateQuestionDTO
  ) {
    return await this.questionService.createOne(dto);
  }

  @Get()
  async getMany() {
    return await this.questionService.getMany();
  }
}
