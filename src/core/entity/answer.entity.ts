import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './question.entity';

@Entity('answer')
export class Answer extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  answer: string;

  @Column({ type: 'boolean', default: false })
  isTrue: boolean;

  @ManyToOne(() => Question, (q) => q.answers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  questions: Question;
}
