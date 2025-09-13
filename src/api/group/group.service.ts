import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Group } from 'src/core/entity/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

import { ISuccess } from 'src/infrastructure/response/success.interface';
import { successRes } from 'src/infrastructure/response/success';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepo: Repository<Group>,
  ) {}

  async create(dto: CreateGroupDto): Promise<ISuccess> {
    const exists = await this.groupRepo.findOne({ where: { name: dto.name } });
    if (exists) throw new ConflictException('Group already exists');

    const group = this.groupRepo.create(dto);
    const saved = await this.groupRepo.save(group);

    return successRes(saved);
  }

  async findAll(): Promise<ISuccess> {
    const data = await this.groupRepo.find({
      relations: ['student', 'staffGroup'],
    });
    return successRes(data);
  }

  async findOne(id: string): Promise<ISuccess> {
    const group = await this.groupRepo.findOne({
      where: { id },
      relations: ['student', 'staffGroup'],
    });
    if (!group) throw new NotFoundException('Group not found');
    return successRes(group);
  }

  async update(id: string, dto: UpdateGroupDto): Promise<ISuccess> {
    const group = await this.groupRepo.findOne({ where: { id } });
    if (!group) throw new NotFoundException('Group not found');

    await this.groupRepo.update(id, dto as any);
    const updated = await this.groupRepo.findOne({ where: { id } });

    return successRes(updated);
  }

  async remove(id: string): Promise<ISuccess> {
    const group = await this.groupRepo.findOne({ where: { id } });
    if (!group) throw new NotFoundException('Group not found');

    await this.groupRepo.remove(group);
    return successRes({});
  }
}
