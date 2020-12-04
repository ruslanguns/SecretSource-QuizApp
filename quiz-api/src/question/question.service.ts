import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getDifferenceBetweenTwoArrayOfObjects } from 'src/common/helpers';
import { FindOneOptions, getConnection, Repository } from 'typeorm';
import { CreateQuestionDTO, CreateAnswerDTO, EditQuestionDTO, EditAnswerDTO } from './dto';
import { Answer, Question } from './entities';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {}

  async createOneQuestion(dto: CreateQuestionDTO) {
    const { answers, ...question } = dto;
    const savedQuestion = await this.questionRepository.save(question);
    const newAnswers = this.answerRepository.create(answers);
    newAnswers.map((answer) => (answer.question = savedQuestion));

    await this.answerRepository.save(newAnswers);
    return await this.questionRepository.findOne(savedQuestion.id);
  }

  async getQuestions() {
    return await this.questionRepository.find();
  }

  async getQuestionById(id: number): Promise<Question> {
    const question = await this.questionRepository.findOne(id);
    if (!question) {
      throw new NotFoundException('QUESTION WITH ID DOES NOT EXIST');
    }
    return question;
  }

  async getAnswerById(
    id: number,
    options?: FindOneOptions<Answer>,
  ): Promise<Answer> {
    const answer = await this.answerRepository.findOne(id, options);
    if (!answer) {
      throw new NotFoundException('ANSWER WITH ID DOES NOT EXIST');
    }
    return answer;
  }

  async addAnswer(questionId: number, dto: CreateAnswerDTO) {
    const question = await this.getQuestionById(questionId);
    const answer = this.answerRepository.create({ ...dto, question });
    return await this.answerRepository.save(answer);
  }

  async editQuestion(id: number, { answers, ...questionDto }: EditQuestionDTO): Promise<Question> {
    const question = await this.getQuestionById(id);

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    const answersToEditOrCreate: Answer[] = [];
    const answersToDelete: Answer[] = [];

    // Answers edited or ereated
    const taskAnswersToEditOrCreate = answers.map(async ({ id, ...a}) => {
      const answer = await this.answerRepository.findOne({ id });
      let answerToSave: Answer;
      (answer)
        ?  answerToSave = Object.assign(answer, { id, ...a })
        : answerToSave = this.answerRepository.create({ ...a, question })
      answerToSave && answersToEditOrCreate.push(answerToSave);
    });
    await Promise.all(taskAnswersToEditOrCreate)

    // Answers deleted
    const answersNotIncluded = getDifferenceBetweenTwoArrayOfObjects(question.answers, answers);
    const taskAnswersToDelete = answersNotIncluded.map(async (a) => {
      const answer = await this.answerRepository.findOne({ id: a.id });
      answersToDelete.push(answer);
    });
    await Promise.all(taskAnswersToDelete)

    // Edit question
    const questionToEdit = Object.assign(question, questionDto);

    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      
      await queryRunner.manager.save(questionToEdit)
      await queryRunner.manager.save(answersToEditOrCreate)
      await queryRunner.manager.remove(answersToDelete)

      await queryRunner.commitTransaction();

    } catch (error) {
      
      await queryRunner.rollbackTransaction();
      throw new BadGatewayException(error);

    } finally {
      
      await queryRunner.release();
      return await this.questionRepository.findOne(id);
    }
  }



  async editAnswer(id: number, dto: EditAnswerDTO) {
    const answer = await this.getAnswerById(id);
    const editedAnswer = Object.assign(answer, dto);
    return await this.answerRepository.save(editedAnswer);
  }

  async deleteQuestion(id: number) {
    const question = await this.getQuestionById(id);
    return await this.questionRepository.remove(question);
  }

  async deleteAnswer(id: number) {
    const answer = await this.getAnswerById(id);
    return await this.answerRepository.remove(answer);
  }
}
