import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateTestResultDto {
	@ApiProperty({
		type: 'number',
		description: 'ID of the student who took the test',
		example: 12
	})
	@IsNumber()
	@IsNotEmpty()
	studentId: number;

	@ApiProperty({
		type: 'number',
		description: 'ID of the test group',
		example: 5
	})
	@IsNumber()
	@IsNotEmpty()
	testGroupId: number;

	@ApiProperty({
		type: 'number',
		description: 'Number of correct answers given by the student',
		example: 18
	})
	@IsNumber()
	@IsNotEmpty()
	correctCount: number;
}
