import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    const alreadyResponded = await this.resultRepository.findOne({user, quiz: question})
    if (alreadyResponded) {
      throw new BadRequestException(`THIS QUIZ ALREADY RESPONDED`);
    }
    const result = this.resultRepository.create({user, selectedAnswer, quiz: question});
    return await this.resultRepository.save(result);
  }

  async getAnsweredQuestions(user: User, options?: FindManyOptions<Result>) {
    return await this.resultRepository.find({
      where: {
        user
      },
      relations: ['quiz', 'selectedAnswer'],
      ...options
    });
  }

  async getUnansweredQuestions(user: User, options?: FindManyOptions<Result>): Promise<Question[]> {
    const questions = await getRepository<Question>(Question).find();
    const answered = await this.getAnsweredQuestions(user);
    const answeredQuestions: Question[] = []
    
    answered && answered.map(x => answeredQuestions.push(x.quiz));

    return questions.filter((x) => !!x.status && !answeredQuestions.some((y) => y.id === x.id));
  }
}
