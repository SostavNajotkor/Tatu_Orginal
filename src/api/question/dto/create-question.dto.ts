import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty({
    type: String,
    description: 'Savol matni',
    example: '5 + 5 = ?',
  })
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty({
    type: String,
    description: 'Test guruhining UUID ID raqami',
    example: 'a3f5c0b2-1d4e-4f9d-9b8e-6a2c7e123456',
  })
  @IsUUID()
  @IsNotEmpty()
  testGroupId: string;

  @ApiProperty({
    type: Boolean,
    description: 'Savolda bir nechta togri javob variantlari bormi',
    example: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  isMultiAnswer: boolean;
}
