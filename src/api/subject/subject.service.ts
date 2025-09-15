import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from 'src/core/entity/subject.entity';
import { FileService } from 'src/infrastructure/file/FileService';
import { ISuccess } from 'src/infrastructure/response/success.interface';
import { successRes } from 'src/infrastructure/response/success';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    private readonly fileService: FileService,
  ) {}

  async create(dto: CreateSubjectDto, file?: Express.Multer.File): Promise<ISuccess> {
    if (file) {
      dto.imageUrl = await this.fileService.create(file);
    }
    const subject = this.subjectRepository.create(dto);
    await this.subjectRepository.save(subject);
    return successRes(subject);
  }

  async findAll(): Promise<ISuccess> {
    const subjects = await this.subjectRepository.find();
    return successRes(subjects);
  }

  async findOne(id: string): Promise<ISuccess> {
    const subject = await this.subjectRepository.findOne({ where: { id } });
    if (!subject) throw new NotFoundException(`Subject with ID ${id} not found`);
    return successRes(subject);
  }

  async update(id: string, dto: UpdateSubjectDto, file?: Express.Multer.File): Promise<ISuccess> {
    const subject = await this.subjectRepository.preload({ id, ...dto });
    if (!subject) throw new NotFoundException(`Subject with ID ${id} not found`);

    if (file) {
      if (subject.imageUrl && (await this.fileService.exist(subject.imageUrl))) {
        await this.fileService.delete(subject.imageUrl);
      }
      subject.imageUrl = await this.fileService.create(file);
    }

    await this.subjectRepository.save(subject);
    return successRes(subject);
  }

  async remove(id: string): Promise<ISuccess> {
    const subject = await this.subjectRepository.findOne({ where: { id } });
    if (!subject) throw new NotFoundException(`Subject with ID ${id} not found`);

    if (subject.imageUrl && (await this.fileService.exist(subject.imageUrl))) {
      await this.fileService.delete(subject.imageUrl);
    }

    await this.subjectRepository.remove(subject);
    return successRes('Subject removed successfully');
  }
}
