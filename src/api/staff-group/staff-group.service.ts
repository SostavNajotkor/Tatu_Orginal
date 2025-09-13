import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateStaffGroupDto } from './dto/create-staff-group.dto';
import { UpdateStaffGroupDto } from './dto/update-staff-group.dto';
import { StaffGroup } from 'src/core/entity/staff-group.entity';
import { Staff } from 'src/core/entity/staff.entity';
import { Group } from 'src/core/entity/group.entity';

import { ISuccess } from 'src/infrastructure/response/success.interface';
import { successRes } from 'src/infrastructure/response/success';

@Injectable()
export class StaffGroupService {
  constructor(
    @InjectRepository(StaffGroup)
    private readonly staffGroupRepo: Repository<StaffGroup>,

    @InjectRepository(Staff)
    private readonly staffRepo: Repository<Staff>,

    @InjectRepository(Group)
    private readonly groupRepo: Repository<Group>,
  ) {}

  async create(dto: CreateStaffGroupDto): Promise<ISuccess> {
    const staff = await this.staffRepo.findOne({ where: { id: dto.staffId } });
    if (!staff) throw new NotFoundException('Staff not found');

    const group = await this.groupRepo.findOne({ where: { id: dto.groupId } });
    if (!group) throw new NotFoundException('Group not found');

    const exists = await this.staffGroupRepo.findOne({
      where: { staffId: { id: dto.staffId }, groupId: { id: dto.groupId } },
    });
    if (exists) {
      throw new ConflictException('This staff already assigned to this group');
    }

    const sg = this.staffGroupRepo.create({
      staffId:staff,
      groupId:group,
    });

    const saved = await this.staffGroupRepo.save(sg);
    return successRes(saved);
  }

  async findAll(): Promise<ISuccess> {
    const data = await this.staffGroupRepo.find({
      relations: ['staff', 'group'],
    });
    return successRes(data);
  }

  async findOne(id: string): Promise<ISuccess> {
    const data = await this.staffGroupRepo.findOne({
      where: { id },
      relations: ['staff', 'group'],
    });
    if (!data) throw new NotFoundException('StaffGroup not found');
    return successRes(data);
  }

  async update(id: string, dto: UpdateStaffGroupDto): Promise<ISuccess> {
    const sg = await this.staffGroupRepo.findOne({ where: { id } });
    if (!sg) throw new NotFoundException('StaffGroup not found');

    await this.staffGroupRepo.update(id, dto as any);
    const updated = await this.staffGroupRepo.findOne({
      where: { id },
      relations: ['staff', 'group'],
    });

    return successRes(updated);
  }

  async remove(id: string): Promise<ISuccess> {
    const sg = await this.staffGroupRepo.findOne({ where: { id } });
    if (!sg) throw new NotFoundException('StaffGroup not found');

    await this.staffGroupRepo.remove(sg);
    return successRes({});
  }
}
