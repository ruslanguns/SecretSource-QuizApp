import { Body, Controller, Delete, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators';
import { EditAnswerDTO } from './dto';
import { QuestionService } from './question.service';

@ApiTags(`Answer's Endpoints`)
@Controller('answer')
export class AnswerController {

  constructor(
    private readonly questionService: QuestionService
  ) {}

  /**
   * Edit an answer, This method is <b>ONLY</b> for Admins
   */
  @Auth('ADMIN')
  @Put(':answerId')
  async editQuestionAnswer(
    @Param('answerId', ParseIntPipe) id: number,
    @Body() dto: EditAnswerDTO
  ) {
    return await this.questionService.editAnswer(id, dto)
  }

  /**
   * Delete an answer, This method is <b>ONLY</b> for Admins
   */
  @Auth('ADMIN')
  @Delete(':answerId')
  async deleteAnswer(
    @Param('answerId', ParseIntPipe) id: number,
  ) {
    return await this.questionService.deleteAnswer(id);
  }
}
