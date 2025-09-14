import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    type: 'string',
    description: 'Username for admin',
    example: 'Shuxrat',
  })
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type: 'string',
    description: 'Email for admin',
    example: 'Shuxrat@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: 'string',
    description: 'User of phone number',
    example: '+998900004505',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    type: 'string',
    description: 'Password for admin',
    example: 'Shuxrat123!',
  })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
