import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class CreateGroupDto {
	@ApiProperty({
		type: 'string',
		description: 'name of the group',
		example: 'Frontend-2025'
	})
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty({
		type: 'string',
		format: 'date',
		description: 'start year of the group',
		example: '2025-09-01'
	})
	@Transform(({ value }) => new Date(value))
	@IsDate()
	@IsNotEmpty()
	startYear: Date;
}
