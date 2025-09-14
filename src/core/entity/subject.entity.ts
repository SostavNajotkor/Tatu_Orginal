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

  @Column({ type: 'varchar', unique: true })
  title: string;

  @Column({ type: 'varchar' })
  imageUrl: string;

  @OneToMany(() => TestGroup, (tg) => tg.subject)
  TestGroups: TestGroup[];

  
  @OneToMany(() => StaffSubject, (sb_sf) => sb_sf.subjectId)
  staffSubjectId: StaffSubject[];
}
