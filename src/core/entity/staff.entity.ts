import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StaffGroup } from './staff-group.entity';
import { StaffRole } from './staff-role.entity';
import { StaffSubject } from './staff-subject.entity';
import { BaseEntity } from 'src/common/database/base.entity';

@Entity('staff')
export class Staff extends BaseEntity {
  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'text' })
  image: string;

  @Column({ type: 'varchar' })
  phoneNumber: string;

  @Column({ type: 'varchar' })
  login: string;

  @Column({ type: 'varchar' })
  hashedPassword: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  telegramUsername: string;

  @OneToMany(() => StaffGroup, (staffGroup) => staffGroup.staffId)
  staffGroup: StaffGroup[];

  @OneToMany(() => StaffRole, (staffRole) => staffRole.staffId)
  staffRole: StaffRole[];


  @OneToMany(() => StaffSubject, (staf_sb) => staf_sb.subjectId)
  staffSubjectId: StaffSubject[];
}
