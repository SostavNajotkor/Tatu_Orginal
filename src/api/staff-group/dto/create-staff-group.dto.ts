import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateStaffGroupDto {
	@ApiProperty({
		type: 'number',
		description: 'ID of the staff',
		example: 3
	})
	@IsNumber()
	@IsNotEmpty()
	staffId: number;

	@ApiProperty({
		type: 'number',
		description: 'ID of the group',
		example: 1
	})
	@IsNumber()
	@IsNotEmpty()
	groupId: number;
}
