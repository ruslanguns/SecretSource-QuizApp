import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Answer } from './answer.entity';


@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text'})
  question: string;

  @OneToMany(() => Answer, answer => answer.question, { eager: true })
  answers: Answer[];

  @Column({ type: 'bool', default: true })
  status: boolean;

  @Column({ type: 'varchar', length: 120, default: 'none', nullable: true })
  category: string;
  
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
}