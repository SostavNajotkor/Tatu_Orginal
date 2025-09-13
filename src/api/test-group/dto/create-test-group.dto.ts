import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsDateString, IsDate } from 'class-validator';

export class CreateTestGroupDto {
  @ApiProperty({
    type: String,
    description: 'Subject id beriladi',
    example: 'uu-subject-id',
  })
  @IsString()
  @IsNotEmpty()
  subjectId: string;

  @ApiProperty({
    type: Number,
    description: 'Testlar soni beriladi',
    example: 30,
  })
  @IsNumber()
  @IsNotEmpty()
  testCount: number;

  @ApiProperty({
  type: String,
  description: 'test vaqti beriladi masalan: 30:00',
  example: '30:00',
})
@IsString()
@IsNotEmpty()
testTime: string;

}
