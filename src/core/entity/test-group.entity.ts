import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subject } from './subject.entity';
import { Question } from './question.entity';
import { TestResult } from './test-result.entity';

@Entity('test-group')
export class TestGroup extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Subject, (s) => s.TestGroups, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  subject: Subject;

  @Column({ type: 'float', default: 0 })
  testCount: number;

  @Column({ type: 'timestamp' })
  testTime: Date;

  @OneToMany(() => Question, (q) => q.testGroup)
  question: Question[];

  @OneToOne(() => TestResult, (testResult) => testResult.testGroupId, {
  	cascade: true,
  	eager: false
  })
  testRes: TestResult;
}
