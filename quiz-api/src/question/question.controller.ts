import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateAnswerDTO, CreateQuestionDTO, EditQuestionDTO } from './dto';
import { QuestionService } from './question.service';

@ApiTags(`Question's Endpoints`)
@Controller('question')
export class QuestionController {

  constructor(
    private questionService: QuestionService
  ) {}

  @Post()
  async createOneQuestion(
    @Body() dto: CreateQuestionDTO
  ) {
    return await this.questionService.createOneQuestion(dto);
  }

  @Get()
  async getManyQuestions() {
    return await this.questionService.getQuestions();
  }

  @Post(':questionId/answer')
  async createAnswer(
    @Param('questionId', ParseIntPipe) id: number,
    @Body() dto: CreateAnswerDTO
  ) {
    return await this.questionService.addAnswer(id, dto)
  }

  @Put(':questionId')
  async editQuestion(
    @Param('questionId', ParseIntPipe) id: number,
    @Body() dto: EditQuestionDTO
  ) {
    return await this.questionService.editQuestion(id, dto);
  }

  @Delete(':questionId')
  async deleteQuestion(
    @Param('questionId', ParseIntPipe) id: number
  ) {
    return await this.questionService.deleteQuestion(id);
  }
}
