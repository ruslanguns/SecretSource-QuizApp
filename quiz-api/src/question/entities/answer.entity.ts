import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './question.entity';


@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Question, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'question_id'})
  question: Question;

  @Column({ type: 'text'})
  answer: string;

  @Column({ name: 'is_correct', type: 'bool', default: false, select: false })
  isCorrect: boolean;
}