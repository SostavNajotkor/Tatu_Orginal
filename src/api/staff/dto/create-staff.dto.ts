import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

export class CreateStaffDto {
	@IsString()
	@IsNotEmpty()
	firstName: string;

	@IsString()
	@IsNotEmpty()
	lastName: string;

	@IsString()
	@IsNotEmpty()
	image: string;

	@IsPhoneNumber()
	@IsString()
	@IsNotEmpty()
	phoneNumber: string;

	@IsString()
	@IsNotEmpty()
	login: string;

	@IsStrongPassword()
	@IsString()
	@IsNotEmpty()
	password: string;

	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	telegramUsername: string;
}
