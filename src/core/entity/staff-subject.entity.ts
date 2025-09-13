import { Entity, ManyToOne } from "typeorm";
import { Staff } from "./staff.entity";
import { Subject } from "./subject.entity";
import { BaseEntity } from "src/common/database/base.entity";


@Entity('staff-subject')
export class StaffSubject extends BaseEntity {

	// @ManyToOne(() => Staff, (staff) => staff.staffSubject, {
	// 	onDelete: 'CASCADE',
	// 	onUpdate: 'CASCADE'
	// })
	// staffId: Staff;

	// @ManyToOne(() => Subject, (subject) => subject.ssSubject, {
	// 	onDelete: 'CASCADE',
	// 	onUpdate: 'CASCADE'
	// })
	// subjectId: Subject;
}
