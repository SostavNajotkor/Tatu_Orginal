import { Entity, ManyToOne } from 'typeorm';
import { Staff } from './staff.entity';
import { Group } from './group.entity';
import { BaseEntity } from 'src/common/database/base.entity';

@Entity('staff-group')
export class StaffGroup extends BaseEntity {
  @ManyToOne(() => Staff, (staff) => staff.staffGroup, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  staffId: Staff;

  @ManyToOne(() => Group, (group) => group.staffGroup)
  groupId: Group;
}
