import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

import { ISuccess } from 'src/infrastructure/response/success.interface';
import { BaseService } from 'src/infrastructure/base/base.service';
import { successRes } from 'src/infrastructure/response/success';
import { StaffSubject } from 'src/core/entity/staff-subject.entity';
import { Staff } from 'src/core/entity/staff.entity';
import { Role } from 'src/core/entity/role.entity';
import { StaffRole } from 'src/core/entity/staff-role.entity';
import { Subject } from 'src/core/entity/subject.entity';

@Injectable()
export class StaffService extends BaseService<
  CreateStaffDto,
  UpdateStaffDto,
  Staff
> {
  constructor(
    @InjectRepository(Staff) private readonly staffRepo: Repository<Staff>,
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
    @InjectRepository(StaffRole)
    private readonly staffRoleRepo: Repository<StaffRole>,
    @InjectRepository(Subject) private readonly subjectRepo: Repository<Subject> ,
     @InjectRepository(StaffSubject)private readonly staffSubjectRepo: Repository<StaffSubject>,

  ) {
    super(staffRepo);
  }

  
  async create(dto: CreateStaffDto): Promise<ISuccess> {
    const exists = await this.staffRepo.findOne({
      where: { email: dto.email },
    });
    if (exists) throw new ConflictException('Email already in use');

    const hashed = await bcrypt.hash(dto.password, 10);
    const staff = this.staffRepo.create({
      ...dto,
      hashedPassword: hashed,
    });

    const saved = await this.staffRepo.save(staff);
    delete (saved as any).hashedPassword;

    return successRes( saved);
  }

  
  async findAll(): Promise<ISuccess> {
    const data = await this.staffRepo.find({
      relations: [
        'staffRole',
        'staffRole.role',
        'staffSubjectId',
        'staffSubjectId.subject',
      ],
    });
    return successRes( data);
  }

  
  async findOneById(id: string): Promise<ISuccess> {
    const data = await this.staffRepo.findOne({
      where: { id },
      relations: [
        'staffRole',
        'staffRole.role',
        'staffSubjectId',
        'staffSubjectId.subject',
      ],
    });
    if (!data) throw new NotFoundException('Staff not found');
    return successRes(data);
  }

 
  async update(id: string, dto: UpdateStaffDto): Promise<ISuccess> {
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

  
  async remove(id: string): Promise<ISuccess> {
    const staff = await this.staffRepo.findOne({ where: { id } });
    if (!staff) throw new NotFoundException('Staff not found');

    await this.staffRepo.remove(staff);
    return successRes({});
  }

  /**
   * ✅ ROLE biriktirish
   */
  // async assignRole(staffId: string, roleId: string): Promise<ISuccess> {
  //   const staff = await this.staffRepo.findOne({ where: { id: staffId } });
  //   if (!staff) throw new NotFoundException('Staff not found');

  //   const role = await this.roleRepo.findOne({ where: { id: roleId } });
  //   if (!role) throw new NotFoundException('Role not found');

  //   const exists = await this.staffRoleRepo.findOne({
  //     where: { staffId: { id: staffId }, roleId: { id: roleId } },
  //   });
  //   if (exists)
  //     throw new ConflictException('Role already assigned to this staff');

  //   const sr = this.staffRoleRepo.create({ staffId, roleId });
  //   const saved = await this.staffRoleRepo.save(sr);

  //   return successRes(saved);
  // }

  // async removeRole(staffRoleId: string): Promise<ISuccess> {
  //   const sr = await this.staffRoleRepo.findOne({
  //     where: { id: staffRoleId },
  //     relations: ['staff', 'role'],
  //   });
  //   if (!sr) throw new NotFoundException('StaffRole not found');

  //   await this.staffRoleRepo.remove(sr);
  //   return successRes('Role removed');
  // }

  /**
   * ✅ SUBJECT biriktirish
   */
  // async assignSubject(staffId: string, subjectId: string): Promise<ISuccess> {
  //   const staff = await this.staffRepo.findOne({ where: { id: staffId } });
  //   if (!staff) throw new NotFoundException('Staff not found');

  //   const subject = await this.subjectRepo.findOne({ where: { id: subjectId } });
  //   if (!subject) throw new NotFoundException('Subject not found');

  //   const exists = await this.staffSubjectRepo.findOne({
  //     where: { staffId: { id: staffId }, subjectId: { id: subjectId } },
  //   });
  //   if (exists)
  //     throw new ConflictException('Subject already assigned to this staff');

  //   const ss = this.staffSubjectRepo.create({ staffId, subject });
  //   const saved = await this.staffSubjectRepo.save(ss);

  //   return successRes(saved);
  // }

  // async removeSubject(staffSubjectId: string): Promise<ISuccess> {
  //   const ss = await this.staffSubjectRepo.findOne({
  //     where: { id: staffSubjectId },
  //     relations: ['staff', 'subject'],
  //   });
  //   if (!ss) throw new NotFoundException('StaffSubject not found');

  //   await this.staffSubjectRepo.remove(ss);
  //   return successRes({});
  // }
}
