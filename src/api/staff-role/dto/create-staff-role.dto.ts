import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateStaffRoleDto {
  @ApiProperty({
    type: String,
    description: 'Xodimning UUID ID raqami',
    example: 'a3f5c0b2-1d4e-4f9d-9b8e-6a2c7e123456',
  })
  @IsUUID()
  @IsNotEmpty()
  staffId: string;

  @ApiProperty({
    type: String,
    description: 'Rolning UUID ID raqami',
    example: 'b7e8d9f0-2c3d-4a1b-8f6e-9c0d1b234567',
  })
  @IsUUID()
  @IsNotEmpty()
  roleId: string;
}
