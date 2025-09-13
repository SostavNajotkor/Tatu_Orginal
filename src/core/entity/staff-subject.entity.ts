import { Column, Entity, ManyToOne } from "typeorm";
import { Staff } from "./staff.entity";
import { Subject } from "./subject.entity";
import { BaseEntity } from "src/common/database/base.entity";


@Entity('staff-subject')
export class StaffSubject extends BaseEntity {

	@ManyToOne(() => Staff, (staff) => staff.staffSubjectId, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	staffId: Staff;

	@ManyToOne(() => Subject, (sub) => sub.staffSubjectId, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	subjectId: Subject;
}
