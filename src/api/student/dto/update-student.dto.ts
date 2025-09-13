import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateStudentDto } from './create-student.dto';
import { IsOptional, IsString, IsStrongPassword } from 'class-validator';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
	@ApiProperty({
		type: 'string',
		description: 'unique username for student',
		example: 'eshmat',
	})
	@IsString()
	@IsOptional()
	username?: string;

	@ApiProperty({
		type: 'string',
		description:
			'strong password (min 8 chars, includes upper, lower, number, special)',
		example: 'Eshmat123!',
	})
	@IsStrongPassword()
	@IsString()
	@IsOptional()
	password?: string;

	@ApiProperty({
		type: 'string',
		description: 'Studentning eski paroli',
		example: "Eshmat123!"
	})
	@IsStrongPassword()
	@IsString()
	@IsOptional()
	oldPassword?: string;
}
