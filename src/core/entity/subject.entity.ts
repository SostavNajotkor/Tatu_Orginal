import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StaffSubject } from './staff-subject.entity';
import { TestGroup } from './test-group.entity';

@Entity('subject')
export class Subject extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type:'varchar', unique: true })
  title: string;

  @Column({ type: 'text' })
  image: string;

  @OneToMany(() => TestGroup, (tg) => tg.subject)
  TestGroups: TestGroup[];

  // @OneToMany(() => StaffSubject, (staffSubject) => staffSubject.subjectId)
  // ssSubject: StaffSubject[];

  // fazlidin aka ulab bolib ochib qoyin
}
