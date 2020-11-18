import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/question/entities';
import { QuestionService } from 'src/question/question.service';
import { User } from 'src/user/entities';
import { getRepository, Repository } from 'typeorm';
import { QuestionResultsDTO } from './dto';
import { Result } from './entities';

@Injectable()
export class QuizService {

  constructor(
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
    private readonly questionService: QuestionService
  ) {}

  async submitQuizAnswer(user: User, answerId: number) {
    const { question, ...answer } = await this.questionService.getAnswerById(answerId, { relations: ['question']});
    const result = this.resultRepository.create({user, question, answer});
    return await this.resultRepository.save(result);
  }

  async getAnsweredQuestions(user: User): Promise<QuestionResultsDTO[]> {
    return await this.resultRepository.find({ user })
      .then(results => results.map(result => {
        result.question['answeredAt'] = result.answeredAt;
        return result.question as QuestionResultsDTO;
      }))
  }

  async getUnansweredQuestions(user: User) {
    const answered = await this.getAnsweredQuestions(user);
    let answeredIds: number[] = []; 
    answered.map(({id}) => answeredIds.push(id));
    
    return await getRepository<Question>(Question)
      .createQueryBuilder('question')
      .where(`question.id NOT IN (:...answeredIds)`, { answeredIds })
      .innerJoinAndSelect('question.answers', 'answers')
      .getMany()
  }
}
