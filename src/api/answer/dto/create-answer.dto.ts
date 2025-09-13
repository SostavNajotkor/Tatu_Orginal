import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateAnswerDto {
  @ApiProperty({
    type: String,
    description: 'Javob varianti matni',
    example: '4',
  })
  @IsString()
  @IsNotEmpty()
  answer: string;

  @ApiProperty({
    type: Boolean,
    description: 'Bu javob togri javobmi?',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  isTrue: boolean;

  @ApiProperty({
    type: String,
    description: 'Savolning UUID ID raqami',
    example: 'a3f5c0b2-1d4e-4f9d-9b8e-6a2c7e123456',
  })
  @IsUUID()
  @IsNotEmpty()
  questionId: string;
}
