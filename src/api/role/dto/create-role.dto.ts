import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRoleDto {
  @ApiProperty({
    type: String,
    description: 'Rol nomi',
    example: 'Admin',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    description: 'Rol haqida qoshimcha malumot',
    example: 'Tizimdagi barcha resurslarga toliq kirish huquqiga ega',
    required: false,
  })
  @IsString()
  @IsOptional()
  description: string;
}
