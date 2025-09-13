import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from "class-validator";

export class CreateStaffDto {
  @ApiProperty({
    type: String,
    description: 'xodimning ismi',
    example: 'Fazliddin',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'Xodimning familiyasi',
    example: 'Karimov',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    type: String,
    description: 'Xodimning profil rasmi (URL manzili)',
    example: 'https://example.com/images/avatar.png',
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    type: String,
    description: 'Xodimning telefon raqami',
    example: '+998901234567',
  })
  @IsPhoneNumber()
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    type: String,
    description: 'Xodimning login nomi',
    example: 'fazliddin14',
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    type: String,
    description: 'Xodimning kuchli paroli',
    example: 'Fazliddin123!',
  })
  @IsStrongPassword()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: String,
    description: 'Xodimning elektron pochtasi',
    example: 'fazliddin@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Xodimning Telegram foydalanuvchi nomi',
    example: '@shuhrat_dev',
  })
  @IsString()
  @IsNotEmpty()
  telegramUsername: string;
}
