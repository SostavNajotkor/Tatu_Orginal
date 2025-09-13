import { Entity, ManyToOne } from "typeorm";
import { Staff } from "./staff.entity";
import { Role } from "./role.entity";
import { BaseEntity } from "src/common/database/base.entity";

@Entity('staff-role')
export class StaffRole extends BaseEntity {

	// @ManyToOne(() => Staff, (staff) => staff.staffRole, {
	// 	onDelete: 'CASCADE',
	// 	onUpdate: 'CASCADE'
	// })
	// staffId: Staff;

	@ManyToOne(() => Role, (role) => role.roleStaff, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	roleId: Role;
}
