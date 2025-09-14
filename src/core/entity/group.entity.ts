import { Column, Entity, OneToMany } from 'typeorm';
import { Student } from './student.entity';
import { StaffGroup } from './staff-group.entity';
import { BaseEntity } from 'src/common/database/base.entity';

@Entity('group')
export class Group extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'date' })
  startYear: Date;

  @OneToMany(() => Student, (student) => student.group)
  student: Student[];

  @OneToMany(() => StaffGroup, (staffGroup) => staffGroup.groupId)
  staffGroup: StaffGroup[];
}
