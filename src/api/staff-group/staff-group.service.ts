import { Injectable } from '@nestjs/common';
import { CreateStaffGroupDto } from './dto/create-staff-group.dto';
import { UpdateStaffGroupDto } from './dto/update-staff-group.dto';

@Injectable()
export class StaffGroupService {
  create(createStaffGroupDto: CreateStaffGroupDto) {
    return 'This action adds a new staffGroup';
  }

  findAll() {
    return `This action returns all staffGroup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} staffGroup`;
  }

  update(id: number, updateStaffGroupDto: UpdateStaffGroupDto) {
    return `This action updates a #${id} staffGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} staffGroup`;
  }
}
