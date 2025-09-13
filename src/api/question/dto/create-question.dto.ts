import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty({
    type: String,
    description: 'savollar matni beriladi',
    example: '5+5=?',
  })
  @IsString()
  question: string;

  @ApiProperty({
    type: String,
    description: 'test GROUP_ID beriladi',
    example: 'uu-testgroup-id',
  })
  @IsString()
  @IsNotEmpty()
  testGroupId: string;

  @ApiProperty({
    type: Boolean,
    example: false,
    description: 'javob variantlari bormi?',
  })
  @IsBoolean()
  @IsNotEmpty()
  isMultiAnswer: boolean;
}
