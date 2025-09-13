import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateAnswerDto {
  @ApiProperty({ example: '4', description: 'Javob variantlari' })
  @IsString()
  @IsNotEmpty()
  answer: string;

  @ApiProperty({ example: true, description: 'Togri javobmi?' })
  @IsBoolean()
  @IsNotEmpty()
  isTrue: boolean;

  @ApiProperty({ example: 'uuid-question-id', description: 'QUESTION ID' })
  @IsString()
  @IsNotEmpty()
  questionId: string;
}
