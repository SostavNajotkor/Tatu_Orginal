import { ApiProperty } from '@nestjs/swagger';
import {
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsPhoneNumber,
	IsString,
	IsStrongPassword,
} from 'class-validator';
import { Roles } from 'src/common/enum';

export class CreateStudentDto {
	@ApiProperty({
		type: 'string',
		description: 'first name for student',
		example: 'Eshmat',
	})
	@IsString()
	@IsNotEmpty()
	firstName: string;

	@ApiProperty({
		type: 'string',
		description: 'last name for student',
		example: 'Toshmatov',
	})
	@IsString()
	@IsNotEmpty()
	lastName: string;

	@ApiProperty({
		type: 'string',
		description: 'image for student',
		example: 'eshmat.jpg',
	})
	@IsString()
	@IsNotEmpty()
	image: string;

	@ApiProperty({
		type: 'string',
		description: 'phone number for student',
		example: '+998 90 629 62 81',
	})
	@IsPhoneNumber()
	@IsString()
	@IsNotEmpty()
	phoneNumber: string;

	@ApiProperty({
		type: 'string',
		description: 'unique username for student',
		example: 'eshmat',
	})
	@IsString()
	@IsNotEmpty()
	username: string;

	@ApiProperty({
		type: 'string',
		description:
			'strong password (min 8 chars, includes upper, lower, number, special)',
		example: 'Eshmat123!',
	})
	@IsStrongPassword()
	@IsString()
	@IsNotEmpty()
	password: string;

	@ApiProperty({
		enum: Roles,
		description: 'Role of Student',
		example: 'STUDENT'
	})
	@IsEnum(Roles)
	role: Roles;

	@ApiProperty({
		type: 'number',
		description: 'group ID that student belongs to',
		example: 1,
	})
	@IsNumber()
	@IsNotEmpty()
	groupId: number;
}
