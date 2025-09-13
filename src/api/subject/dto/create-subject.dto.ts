import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty({
    type: String,
    description: 'fan nomi beriladi',
    example: 'Matematika...',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'fan rasmi qopyiladi',
    example: 'matematika.png',
    required: false,
  })
  @IsOptional()
  @IsString()
  image: string;
}
