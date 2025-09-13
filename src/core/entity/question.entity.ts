import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TestGroup } from './test-group.entity';
import { Answer } from './answer.entity';

@Entity('question')
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  question: string;

  @Column({ type: 'boolean', default: false })
  isMultiAnswer: boolean;

  @ManyToOne(() => TestGroup, (tg) => tg.question, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  testGroup: TestGroup;

  @OneToMany(() => Answer, (a) => a.questions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  answers: Answer[];
}
