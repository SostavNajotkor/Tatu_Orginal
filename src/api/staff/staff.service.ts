import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

import { ISuccess } from 'src/infrastructure/response/success.interface';
import { successRes } from 'src/infrastructure/response/success';

import { Staff } from 'src/core/entity/staff.entity';
import { Role } from 'src/core/entity/role.entity';
import { StaffRole } from 'src/core/entity/staff-role.entity';
import { Subject } from 'src/core/entity/subject.entity';
import { StaffSubject } from 'src/core/entity/staff-subject.entity';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff) private readonly staffRepo: Repository<Staff>,
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
    @InjectRepository(StaffRole) private readonly staffRoleRepo: Repository<StaffRole>,
    @InjectRepository(Subject) private readonly subjectRepo: Repository<Subject>,
    @InjectRepository(StaffSubject) private readonly staffSubjectRepo: Repository<StaffSubject>,
  ) {}

  async create(dto: CreateStaffDto): Promise<ISuccess> {
    const exists = await this.staffRepo.findOne({ where: { email: dto.email } });
    if (exists) throw new ConflictException('Email already in use');

    const hashed = await bcrypt.hash(dto.password, 10);
    const staff = this.staffRepo.create({ ...dto, hashedPassword: hashed });

    const saved = await this.staffRepo.save(staff);
    delete (saved as any).hashedPassword;
    return successRes(saved);
  }

  async findAll(user: any): Promise<ISuccess> {
    if (user.role === 'STAFF') {
      const self = await this.staffRepo.findOne({ where: { id: user.id } });
      return successRes(self);
    }
    const all = await this.staffRepo.find({
      relations: ['staffRole', 'staffRole.role', 'staffSubjectId', 'staffSubjectId.subject'],
    });
    return successRes(all);
  }

  async findOne(id: string, user: any): Promise<ISuccess> {
    if (user.role === 'STAFF' && user.id !== id) {
      throw new ForbiddenException('Access denied');
    }
    const staff = await this.staffRepo.findOne({
      where: { id },
      relations: ['staffRole', 'staffRole.role', 'staffSubjectId', 'staffSubjectId.subject'],
    });
    if (!staff) throw new NotFoundException('Staff not found');
    return successRes(staff);
  }

  async update(id: string, dto: UpdateStaffDto, user: any): Promise<ISuccess> {
    if (user.role === 'STAFF' && user.id !== id) {
      throw new ForbiddenException('You can update only your profile');
    }

    const staff = await this.staffRepo.findOne({ where: { id } });
    if (!staff) throw new NotFoundException('Staff not found');

    if (dto.password) {
      dto['hashedPassword'] = await bcrypt.hash(dto.password, 10);
      delete dto.password;
    }

    await this.staffRepo.update(id, dto as any);
    const updated = await this.staffRepo.findOne({ where: { id } });
    return successRes(updated);
  }

  async remove(id: string, user: any): Promise<ISuccess> {
    if (user.role === 'STAFF') {
      throw new ForbiddenException('Staff cannot delete accounts');
    }
    if (user.role === 'ADMIN') {
      const target = await this.staffRepo.findOne({ where: { id } });
      if (target && (target as any).role === 'SUPERADMIN') {
        throw new ForbiddenException('Admin cannot delete SuperAdmin');
      }
    }

    const staff = await this.staffRepo.findOne({ where: { id } });
    if (!staff) throw new NotFoundException('Staff not found');

    await this.staffRepo.remove(staff);
    return successRes({});
  }
}