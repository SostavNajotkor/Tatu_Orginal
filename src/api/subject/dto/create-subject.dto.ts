import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty({
    type: String,
    description: 'Fan nomi (sarlavhasi)',
    example: 'Matematika',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: String,
    description: 'Fan rasmi (URL yoki fayl nomi)',
    example: 'matematika.png',
    required: false,
  })
  @IsOptional()
  @IsString()
  imageUrl: string;
}
