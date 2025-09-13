import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTestGroupDto } from './dto/create-test-group.dto';
import { UpdateTestGroupDto } from './dto/update-test-group.dto';
import { BaseService } from 'src/infrastructure/base/base.service';
import { TestGroup } from 'src/core/entity/test-group.entity';
import { Subject } from 'src/core/entity/subject.entity';
import { ISuccess } from 'src/infrastructure/response/success.interface';
import { successRes } from 'src/infrastructure/response/success';

@Injectable()
export class TestGroupService extends BaseService<
  CreateTestGroupDto,
  UpdateTestGroupDto,
  TestGroup
> {
  constructor(
    @InjectRepository(TestGroup)
    private readonly testGroupRepo: Repository<TestGroup>,

    @InjectRepository(Subject)
    private readonly subjectRepo: Repository<Subject>,
  ) {
    super(testGroupRepo);
  }

  async create(dto: CreateTestGroupDto): Promise<ISuccess> {
    const subject = await this.subjectRepo.findOne({
      where: { id: dto.subjectId },
    });
    if (!subject) throw new NotFoundException('Subject not found');

    const testgroub = this.testGroupRepo.create({
      subject,
      testCount: dto.testCount ?? 0,
      testTime: dto.testTime,
    });

    await this.testGroupRepo.save(testgroub);
    return successRes(testgroub);
  }

  async findAll(): Promise<ISuccess> {
    const testGroups = await this.testGroupRepo.find({
      relations: ['subject'],
    });
    return successRes(testGroups);
  }

  async findOneById(id: string): Promise<ISuccess> {
    const testgroub = await this.testGroupRepo.findOne({
      where: { id },
      relations: ['subject'],
    });
    if (!testgroub) throw new NotFoundException('testGroup not found');
    return successRes(testgroub);
  }

  async update(id: string, dto: UpdateTestGroupDto): Promise<ISuccess> {
    const testgroub = await this.testGroupRepo.preload({ id, ...dto });
    if (!testgroub) throw new NotFoundException('testGroup not found');
    await this.testGroupRepo.save(testgroub);
    return successRes(testgroub);
  }

  async delete(id: string): Promise<ISuccess> {
    const testgroub = await this.testGroupRepo.findOne({ where: { id } });
    if (!testgroub) throw new NotFoundException('testGroup not found');
    await this.testGroupRepo.remove(testgroub);
    return successRes({});
  }
}
