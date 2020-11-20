import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators';
import { CreateAnswerDTO, CreateQuestionDTO, EditQuestionDTO } from './dto';
import { QuestionService } from './question.service';

@ApiTags(`Question's Endpoints`)
@Controller('question')
export class QuestionController {

  constructor(
    private questionService: QuestionService
  ) {}

  /**
   * Create a question. This method is <b>ONLY</b> for Admins
   */
  @Auth('ADMIN')
  @Post()
  async createOneQuestion(
    @Body() dto: CreateQuestionDTO
  ) {
    return await this.questionService.createOneQuestion(dto);
  }

  /**
   * Get all questions, This method is <b>ONLY</b> for Admins
   */
  @Auth('ADMIN')
  @Get()
  async getManyQuestions() {
    return await this.questionService.getQuestions();
  }

  /**
   * Create an answer, This method is <b>ONLY</b> for Admins
   */
  @Auth('ADMIN')
  @Post(':questionId/answer')
  async createAnswer(
    @Param('questionId', ParseIntPipe) id: number,
    @Body() dto: CreateAnswerDTO
  ) {
    return await this.questionService.addAnswer(id, dto)
  }

  /**
   * Edit a question, This method is <b>ONLY</b> for Admins
   */
  @Auth('ADMIN')
  @Put(':questionId')
  async editQuestion(
    @Param('questionId', ParseIntPipe) id: number,
    @Body() dto: EditQuestionDTO
  ) {
    return await this.questionService.editQuestion(id, dto);
  }

  /**
   * Delete a question, This method is <b>ONLY</b> for Admins
   */
  @Auth('ADMIN')
  @Delete(':questionId')
  async deleteQuestion(
    @Param('questionId', ParseIntPipe) id: number
  ) {
    return await this.questionService.deleteQuestion(id);
  }
}
