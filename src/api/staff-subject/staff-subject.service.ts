import { Injectable } from '@nestjs/common';
import { CreateStaffSubjectDto } from './dto/create-staff-subject.dto';
import { UpdateStaffSubjectDto } from './dto/update-staff-subject.dto';

@Injectable()
export class StaffSubjectService {
  create(createStaffSubjectDto: CreateStaffSubjectDto) {
    return 'This action adds a new staffSubject';
  }

  findAll() {
    return `This action returns all staffSubject`;
  }

  findOne(id: number) {
    return `This action returns a #${id} staffSubject`;
  }

  update(id: number, updateStaffSubjectDto: UpdateStaffSubjectDto) {
    return `This action updates a #${id} staffSubject`;
  }

  remove(id: number) {
    return `This action removes a #${id} staffSubject`;
  }
}
