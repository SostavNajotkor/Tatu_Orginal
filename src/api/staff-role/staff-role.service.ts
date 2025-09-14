import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStaffRoleDto } from './dto/create-staff-role.dto';
import { UpdateStaffRoleDto } from './dto/update-staff-role.dto';
import { StaffRole } from 'src/core/entity/staff-role.entity';
import { Staff } from 'src/core/entity/staff.entity';
import { Role } from 'src/core/entity/role.entity';
import { ISuccess } from 'src/infrastructure/response/success.interface';

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

  async create(createStaffRoleDto: CreateStaffRoleDto): Promise<ISuccess> {
    const { staffId, roleId } = createStaffRoleDto;

    const staff = await this.staffRepo.findOne({ where: { id: staffId } });
    if (!staff) {
      throw new NotFoundException(`staff with id ${staffId} not found`);
    }

    const role = await this.roleRepo.findOne({ where: { id: roleId } });
    if (!role) {
      throw new NotFoundException(`role with id ${roleId} not found`);
    }

    const staffRole = this.staffRoleRepo.create({
      staffId: staff,
      roleId: role,
    });

    const saved = await this.staffRoleRepo.save(staffRole);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'success',
      data: saved,
    };
  }

  async findAll(): Promise<ISuccess> {
    const data = await this.staffRoleRepo.find({
      relations: ['staffId', 'roleId'],
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
      data,
    };
  }

  async findOne(id: string): Promise<ISuccess> {
    const staffRole = await this.staffRoleRepo.findOne({
      where: { id },
      relations: ['staffId', 'roleId'],
    });

    if (!staffRole) {
      throw new NotFoundException(`staff role with id ${id} not found`);
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
      data: staffRole,
    };
  }

  async update(id: string, updateStaffRoleDto: UpdateStaffRoleDto): Promise<ISuccess> {
    const staffRole = await this.staffRoleRepo.findOne({ where: { id } });
    if (!staffRole) {
      throw new NotFoundException(`staff role with id ${id} not found`);
    }

    if (updateStaffRoleDto.staffId) {
      const staff = await this.staffRepo.findOne({
        where: { id: updateStaffRoleDto.staffId },
      });
      if (!staff) {
        throw new NotFoundException(
          `staff with id ${updateStaffRoleDto.staffId} not found`,
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
          `role with id ${updateStaffRoleDto.roleId} not found`,
        );
      }
      staffRole.roleId = role;
    }

    const updated = await this.staffRoleRepo.save(staffRole);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
      data: updated,
    };
  }

  async remove(id: string): Promise<ISuccess> {
    const staffRole = await this.staffRoleRepo.findOne({ where: { id } });
    if (!staffRole) {
      throw new NotFoundException(`staff role with id ${id} not found`);
    }

    await this.staffRoleRepo.remove(staffRole);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
      data: {},
    };
  }
}
