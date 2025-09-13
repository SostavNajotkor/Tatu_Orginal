import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsUUID } from "class-validator";

export class CreateTestResultDto {
  @ApiProperty({
    type: String,
    description: 'Testni yechgan talabaning UUID ID raqami',
    example: 'a3f5c0b2-1d4e-4f9d-9b8e-6a2c7e123456',
  })
  @IsUUID()
  @IsNotEmpty()
  studentId: string;

  @ApiProperty({
    type: String,
    description: 'Test guruhi (TestGroup) UUID ID raqami',
    example: 'b7e8d9f0-2c3d-4a1b-8f6e-9c0d1b234567',
  })
  @IsUUID()
  @IsNotEmpty()
  testGroupId: string;

  @ApiProperty({
    type: Number,
    description: 'Talaba tomonidan berilgan to‘g‘ri javoblar soni',
    example: 18,
  })
  @IsNumber()
  @IsNotEmpty()
  correctCount: number;
}
