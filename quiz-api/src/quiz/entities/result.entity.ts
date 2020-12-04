import { Answer, Question } from 'src/question/entities';
import { User } from 'src/user/entities';
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


@Entity('results')
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE'})
  @JoinColumn({ name: 'user_id'})
  user: User;
  
  @ManyToOne(() => Answer, { onDelete: 'CASCADE'})
  @JoinColumn({ name: 'selected_answer_id'})
  selectedAnswer: Answer;

  @ManyToOne(() => Question, { onDelete: 'CASCADE'})
  @JoinColumn({ name: 'question_id'})
  question: Question;
 
  @CreateDateColumn({ name: 'answered_at', type: 'timestamp' })
  answeredAt: Date;
 
}