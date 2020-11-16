import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateQuestionDTO } from './dto';
import { QuestionService } from './question.service';

@ApiTags(`Question's Endpoint`)
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
