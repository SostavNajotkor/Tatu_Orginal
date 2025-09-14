import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

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
    description: 'xodimning familiyasi',
    example: 'Abduraximov',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    type: String,
    description: 'xodimning profil rasmi Urli',
    example: 'https://kun.uz/avatar.png',
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    type: String,
    description: 'xodimning telefon raqami',
    example: '+998900004505',
  })
  @IsPhoneNumber()
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    type: String,
    description: 'xodimning loginni',
    example: 'fazliddin123',
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    type: String,
    description: 'xodimning paroli',
    example: 'Fazliddin123!',
  })
  @IsStrongPassword()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: String,
    description: 'xodimning elektron pochtasi',
    example: 'fazliddin@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    description: 'xodimning Tg niki',
    example: '@Fazliddin_Abduraximov',
  })
  @IsString()
  @IsNotEmpty()
  telegramUsername: string;
}
