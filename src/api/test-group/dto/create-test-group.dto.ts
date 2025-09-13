import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateTestGroupDto {
  @ApiProperty({
    type: String,
    description: 'Fan (subject) UUID ID raqami',
    example: 'a3f5c0b2-1d4e-4f9d-9b8e-6a2c7e123456',
  })
  @IsUUID()
  @IsNotEmpty()
  subjectId: string;

  @ApiProperty({
    type: Number,
    description: 'Testlar soni',
    example: 30,
  })
  @IsNumber()
  @IsNotEmpty()
  testCount: number;

  @ApiProperty({
    type: String,
    description: 'Test uchun beriladigan vaqt (mm:ss formatda)',
    example: '30:00',
  })
  @IsString()
  @IsNotEmpty()
  testTime: string;
}
