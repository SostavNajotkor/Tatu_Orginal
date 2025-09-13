import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { BaseService } from 'src/infrastructure/base/base.service';
import { Subject } from 'src/core/entity/subject.entity';
import { ISuccess } from 'src/infrastructure/response/success.interface';
import { successRes } from 'src/infrastructure/response/success';


@Injectable()
export class SubjectService extends BaseService<
  CreateSubjectDto,
  UpdateSubjectDto,
  Subject
> {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {
    super(subjectRepository);
  }

  async create(createSubjectDto: CreateSubjectDto): Promise<ISuccess> {
    const subject = this.subjectRepository.create(createSubjectDto);
    await this.subjectRepository.save(subject);
    return successRes(subject);
  }

  async findAll(): Promise<ISuccess> {
    const subjects = await this.subjectRepository.find();
    return successRes(subjects);
  }

  async findOne(id: string): Promise<ISuccess> {
    const subject = await this.subjectRepository.findOne({ where: { id } });
    if (!subject)
      throw new NotFoundException(`Subject with ID ${id} not found`);
    return successRes(subject);
  }

  async update(
    id: string,
    updateSubjectDto: UpdateSubjectDto,
  ): Promise<ISuccess> {
    const subject = await this.subjectRepository.preload({
      id,
      ...updateSubjectDto,
    });
    if (!subject)
      throw new NotFoundException(`Subject with ID ${id} not found`);
    await this.subjectRepository.save(subject);
    return successRes(subject);
  }

  async remove(id: string): Promise<ISuccess> {
    const subject = await this.subjectRepository.findOne({ where: { id } });
    if (!subject)
      throw new NotFoundException(`Subject with ID ${id} not found`);
    await this.subjectRepository.remove(subject);
    return successRes('Subject removed successfully');
  }
}
