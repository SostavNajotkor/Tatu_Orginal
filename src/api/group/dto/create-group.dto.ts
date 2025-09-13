import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsDateString } from "class-validator";

export class CreateGroupDto {
  @ApiProperty({
    type: String,
    description: 'Guruh nomi',
    example: 'Frontend-2025',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    format: 'date',
    description: 'Guruh boshlanish sanasi (YYYY-MM-DD formatida)',
    example: '2025-09-01',
  })
  @IsDateString()
  @IsNotEmpty()
  startYear: string;
}
