import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { BaseService } from 'src/infrastructure/base/base.service';
import { Question } from 'src/core/entity/question.entity';
import { TestGroup } from 'src/core/entity/test-group.entity';
import { ISuccess } from 'src/infrastructure/response/success.interface';
import { successRes } from 'src/infrastructure/response/success';


@Injectable()
export class QuestionService extends BaseService<
  CreateQuestionDto,
  UpdateQuestionDto,
  Question
> {
  constructor(
    @InjectRepository(Question)
    private readonly questRepo: Repository<Question>,
    @InjectRepository(TestGroup)
    private readonly testGroupRepo: Repository<TestGroup>,
  ) {
    super(questRepo);
  }

  async create(dto: CreateQuestionDto): Promise<ISuccess> {
    const question = await this.testGroupRepo.findOne({
      where: { id: dto.testGroupId },
    });
    if (!question) throw new NotFoundException('TestGroup not found');

    const quest = this.questRepo.create({
      question: dto.question,
      isMultiAnswer: dto.isMultiAnswer ?? false,
      testGroup: question,
    });

    const saved = await this.questRepo.save(quest);
    return successRes(saved);
  }

  async findAll(): Promise<ISuccess> {
    const data = await this.questRepo.find({
      relations: ['testGroup', 'answers'],
    });
    return successRes(data, 201);
  }

  async findOneById(id: string): Promise<ISuccess> {
    const question = await this.questRepo.findOne({
      where: { id },
      relations: ['testGroup', 'answers'],
    });
    if (!question) throw new NotFoundException('Question not found');
    return successRes(question);
  }

  async update(id: string, dto: UpdateQuestionDto): Promise<ISuccess> {
    const question = await this.questRepo.findOne({ where: { id } });
    if (!question) throw new NotFoundException('Question not found');

    Object.assign(question, dto);
    const updated = await this.questRepo.save(question);
    return successRes(updated);
  }

  async delete(id: string): Promise<ISuccess> {
    const question = await this.questRepo.findOne({ where: { id } });
    if (!question) throw new NotFoundException('Question not found');

    await this.questRepo.remove(question);
    return successRes({});
  }
}
