import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStaffSubjectDto } from './dto/create-staff-subject.dto';
import { UpdateStaffSubjectDto } from './dto/update-staff-subject.dto';
import { StaffSubject } from 'src/core/entity/staff-subject.entity';
import { Staff } from 'src/core/entity/staff.entity';
import { ISuccess } from 'src/infrastructure/response/success.interface';
import { successRes } from 'src/infrastructure/response/success';
import { Subject } from 'src/core/entity/subject.entity';

@Injectable()
export class StaffSubjectService {
  constructor(
    @InjectRepository(StaffSubject)
    private readonly staffSubjectRepo: Repository<StaffSubject>,
    @InjectRepository(Staff)
    private readonly staffRepo: Repository<Staff>,
    @InjectRepository(Subject)
    private readonly subjectRepo: Repository<Subject>,
  ) {}

  async create(dto: CreateStaffSubjectDto): Promise<ISuccess> {
    const staff = await this.staffRepo.findOne({ where: { id: dto.staffId } });
    if (!staff) throw new NotFoundException('Staff not found');

    const subject = await this.subjectRepo.findOne({
      where: { id: dto.subjectId },
    });
    if (!subject) throw new NotFoundException('Subject not found');

    const exists = await this.staffSubjectRepo.findOne({
      where: { staffId: { id: dto.staffId }, subjectId: { id: dto.subjectId } },
    });
    if (exists)
      throw new ConflictException('This subject already assigned to staff');

    const subjectsstaff = this.staffSubjectRepo.create({
      staffId: staff,
      subjectId: subject,
    });
    const saved = await this.staffSubjectRepo.save(subjectsstaff);
    return successRes(saved);
  }

  async findAll(): Promise<ISuccess> {
    const data = await this.staffSubjectRepo.find({
      relations: ['staf', 'subject'],
    });
    return successRes(data);
  }

  async findOne(id: string): Promise<ISuccess> {
    const subjectsstaff = await this.staffSubjectRepo.findOne({
      where: { id },
      relations: ['staff', 'subject'],
    });
    if (!subjectsstaff) throw new NotFoundException('StaffSubject not found');
    return successRes(subjectsstaff);
  }

  async update(id: string, dto: UpdateStaffSubjectDto): Promise<ISuccess> {
    const subjectsstaff = await this.staffSubjectRepo.findOne({
      where: { id },
    });
    if (!subjectsstaff) throw new NotFoundException('StaffSubject not found');

    if (dto.staffId) {
      const staff = await this.staffRepo.findOne({
        where: { id: dto.staffId },
      });
      if (!staff) throw new NotFoundException('Staff not found');
      subjectsstaff.staffId = staff;
    }

    if (dto.subjectId) {
      const subject = await this.subjectRepo.findOne({
        where: { id: dto.subjectId },
      });
      if (!subject) throw new NotFoundException('Subject not found');
      subjectsstaff.subjectId = subject;
    }

    const updated = await this.staffSubjectRepo.save(subjectsstaff);
    return successRes(updated);
  }

  async remove(id: string): Promise<ISuccess> {
    const ss = await this.staffSubjectRepo.findOne({ where: { id } });
    if (!ss) throw new NotFoundException('StaffSubject not found');
    await this.staffSubjectRepo.remove(ss);
    return successRes({});
  }
}
