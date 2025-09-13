import { Injectable } from '@nestjs/common';
import { CreateStaffRoleDto } from './dto/create-staff-role.dto';
import { UpdateStaffRoleDto } from './dto/update-staff-role.dto';

@Injectable()
export class StaffRoleService {
  create(createStaffRoleDto: CreateStaffRoleDto) {
    return 'This action adds a new staffRole';
  }

  findAll() {
    return `This action returns all staffRole`;
  }

  findOne(id: number) {
    return `This action returns a #${id} staffRole`;
  }

  update(id: number, updateStaffRoleDto: UpdateStaffRoleDto) {
    return `This action updates a #${id} staffRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} staffRole`;
  }
}
