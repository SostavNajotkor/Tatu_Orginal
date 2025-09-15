import { Column, Entity, OneToOne } from 'typeorm';
import { Student } from './student.entity';
import { TestGroup } from './test-group.entity';
import { BaseEntity } from 'src/common/database/base.entity';

@Entity('test-result')
export class TestResult extends BaseEntity {
  @OneToOne(() => Student, (student) => student.studentTestRes)
  studentId: Student;

  @OneToOne(() => TestGroup, (testGroup) => testGroup.testRes)
  testGroupId: TestGroup;

  @Column({ type: 'int' })
  correctCount: number;
}
