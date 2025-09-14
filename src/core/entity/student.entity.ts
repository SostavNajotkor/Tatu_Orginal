import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Group } from './group.entity';
import { TestResult } from './test-result.entity';
import { BaseEntity } from 'src/common/database/base.entity';
import { Roles } from 'src/common/enum';


@Entity('student')
export class Student extends BaseEntity {
  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'text', nullable: true, default: '' })
  image: string;

  @Column({ type: 'varchar' })
  phoneNumber: string;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  hashedPassword: string;


  @Column({ type: 'enum', enum: Roles, default: Roles.STUDENT })
  role: Roles;

  @ManyToOne(() => Group, (group) => group.student)
  @JoinColumn({ name: 'groupId' })
  group: Group;


  @OneToOne(() => TestResult, (testResult) => testResult.studentId, {
    cascade: true,
  })
  studentTestRes: TestResult;
}
