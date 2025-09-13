import { Column, Entity, OneToMany } from 'typeorm';
import { StaffRole } from './staff-role.entity';
import { BaseEntity } from 'src/common/database/base.entity';

@Entity('role')
export class Role extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @OneToMany(() => StaffRole, (staffRole) => staffRole.roleId)
  roleStaff: StaffRole[];
}
