import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateStaffRoleDto {
  @IsNumber()
  @IsNotEmpty()
  staffId: number;

  @IsNumber()
  @IsNotEmpty()
  roleId: number;
}
