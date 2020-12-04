import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getDifferenceBetweenTwoArrayOfObjects } from 'src/common/helpers';
import { Question } from 'src/question/entities';
import { QuestionService } from 'src/question/question.service';
import { User } from 'src/user/entities';
import { FindManyOptions, getRepository, In, Not, Repository } from 'typeorm';
import { Result } from './entities';

@Injectable()
export class QuizService {

  constructor(
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
    private readonly questionService: QuestionService
  ) {}

  async submitQuizAnswer(user: User, answerId: number) {
    const {question, ...selectedAnswer} = await this.questionService.getAnswerById(answerId, { relations: ['question']});
    const alreadyResponded = await this.resultRepository.findOne({user, question})
    if (alreadyResponded) {
      throw new BadRequestException(`THIS QUIZ ALREADY RESPONDED`);
    }
    const result = this.resultRepository.create({user, selectedAnswer, question});
    return await this.resultRepository.save(result);
  }

  async getAnsweredQuestions(user: User, options?: FindManyOptions<Result>) {
    return await this.resultRepository.find({
      where: {
        user
      },
      relations: ['question', 'selectedAnswer'],
      ...options
    });
  }

  async getUnansweredQuestions(user: User, options?: FindManyOptions<Result>): Promise<Question[]> {
    const questions = await getRepository<Question>(Question).find();
    const answered = await this.getAnsweredQuestions(user);
    const answeredQuestions: Question[] = []
    
    answered && answered.map(x => answeredQuestions.push(x.question));

    return questions.filter((x) => !!x.status && !answeredQuestions.some((y) => y.id === x.id));
  }
}
