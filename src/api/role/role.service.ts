import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from 'src/core/entity/role.entity';
import { ISuccess } from 'src/infrastructure/response/success.interface';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<ISuccess> {
    const role = this.roleRepo.create(createRoleDto);
    const saved = await this.roleRepo.save(role);
    return { statusCode: HttpStatus.CREATED, message: 'success', data: saved };
  }

  async findAll(): Promise<ISuccess> {
    const roles = await this.roleRepo.find({ relations: ['roleStaff'] });
    return { statusCode: HttpStatus.OK, message: 'success', data: roles };
  }

  async findOne(id: string): Promise<ISuccess> {
    const role = await this.roleRepo.findOne({
      where: { id },
      relations: ['roleStaff'],
    });

    if (!role) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        error: { message: 'role with id not found' },
      });
    }

    return { statusCode: HttpStatus.OK, message: 'success', data: role };
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<ISuccess> {
    const role = await this.roleRepo.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        error: { message: 'role with id not found' },
      });
    }

    Object.assign(role, updateRoleDto);
    const updated = await this.roleRepo.save(role);
    return { statusCode: HttpStatus.OK, message: 'success', data: updated };
  }

  async remove(id: string): Promise<ISuccess> {
    const role = await this.roleRepo.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        error: { message: 'role with id not found' },
      });
    }

    await this.roleRepo.remove(role);
    return { statusCode: HttpStatus.OK, message: 'success', data: {} };
  }
}
