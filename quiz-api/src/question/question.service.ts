import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionDTO } from './dto';
import { Answer, Question } from './entities';

@Injectable()
export class QuestionService {

  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>
  ) {}

  async createOne(dto: CreateQuestionDTO) {
    const { answers, ...question } = dto;
    const savedQuestion = await this.questionRepository.save(question);
    const newAnswers = this.answerRepository.create(answers);
    newAnswers.map(answer => answer.question = savedQuestion);

    await this.answerRepository.save(newAnswers);
    return await this.questionRepository.findOne(savedQuestion.id);
  }

  async getMany() {
    return this.questionRepository.find();
  }

}
