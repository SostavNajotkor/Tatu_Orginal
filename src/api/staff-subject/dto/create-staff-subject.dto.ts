import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateStaffSubjectDto {
	@IsNumber()
	@IsNotEmpty()
	staffId: number;

	@IsNumber()
	@IsNotEmpty()
	subjectId: number;
}
