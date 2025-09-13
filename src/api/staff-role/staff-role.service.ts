import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStaffRoleDto } from './dto/create-staff-role.dto';
import { UpdateStaffRoleDto } from './dto/update-staff-role.dto';
import { StaffRole } from 'src/core/entity/staff-role.entity';
import { Staff } from 'src/core/entity/staff.entity';
import { Role } from 'src/core/entity/role.entity';

@Injectable()
export class StaffRoleService {
  constructor(
    @InjectRepository(StaffRole)
    private readonly staffRoleRepo: Repository<StaffRole>,

    @InjectRepository(Staff)
    private readonly staffRepo: Repository<Staff>,

    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) {}

  async create(createStaffRoleDto: CreateStaffRoleDto) {
    const { staffId, roleId } = createStaffRoleDto;

    const staff = await this.staffRepo.findOne({ where: { id: staffId } });
    if (!staff) {
      throw new NotFoundException(`Staff with id ${staffId} not found`);
    }

    const role = await this.roleRepo.findOne({ where: { id: roleId } });
    if (!role) {
      throw new NotFoundException(`Role with id ${roleId} not found`);
    }

    const staffRole = this.staffRoleRepo.create({
      staffId: staff,
      roleId: role,
    });

    return await this.staffRoleRepo.save(staffRole);
  }

  async findAll() {
    return await this.staffRoleRepo.find({
      relations: ['staffId', 'roleId'],
    });
  }

  async findOne(id: string) {
    const staffRole = await this.staffRoleRepo.findOne({
      where: { id },
      relations: ['staffId', 'roleId'],
    });

    if (!staffRole) {
      throw new NotFoundException(`StaffRole with id ${id} not found`);
    }

    return staffRole;
  }

  async update(id: string, updateStaffRoleDto: UpdateStaffRoleDto) {
    const staffRole = await this.staffRoleRepo.findOne({ where: { id } });
    if (!staffRole) {
      throw new NotFoundException(`StaffRole with id ${id} not found`);
    }

    if (updateStaffRoleDto.staffId) {
      const staff = await this.staffRepo.findOne({
        where: { id: updateStaffRoleDto.staffId },
      });
      if (!staff) {
        throw new NotFoundException(
          `Staff with id ${updateStaffRoleDto.staffId} not found`,
        );
      }
      staffRole.staffId = staff;
    }

    if (updateStaffRoleDto.roleId) {
      const role = await this.roleRepo.findOne({
        where: { id: updateStaffRoleDto.roleId },
      });
      if (!role) {
        throw new NotFoundException(
          `Role with id ${updateStaffRoleDto.roleId} not found`,
        );
      }
      staffRole.roleId = role;
    }

    return await this.staffRoleRepo.save(staffRole);
  }

  async remove(id: string) {
    const staffRole = await this.staffRoleRepo.findOne({ where: { id } });
    if (!staffRole) {
      throw new NotFoundException(`StaffRole with id ${id} not found`);
    }

    return await this.staffRoleRepo.remove(staffRole);
  }
}
