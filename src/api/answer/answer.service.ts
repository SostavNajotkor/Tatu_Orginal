import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from 'src/core/entity/answer.entity';
import { BaseService } from 'src/infrastructure/base/base.service';
import { Question } from 'src/core/entity/question.entity';
import { ISuccess } from 'src/infrastructure/response/success.interface';
import { successRes } from 'src/infrastructure/response/success';

@Injectable()
export class AnswerService extends BaseService<
  CreateAnswerDto,
  UpdateAnswerDto,
  Answer
> {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {
    super(answerRepository);
  }

  async create(dto: CreateAnswerDto): Promise<ISuccess> {
    const question = await this.questionRepository.findOne({
      where: { id: dto.questionId },
    });
    if (!question) throw new NotFoundException('Question not found');

    const answer = this.answerRepository.create({
      answer: dto.answer,
      isTrue: dto.isTrue,
      questions: question,
    });

    await this.answerRepository.save(answer);
    return successRes(answer);
  }

  async findAll(): Promise<ISuccess> {
    const answers = await this.answerRepository.find({
      relations: ['questions'],
    });
    return successRes(answers);
  }

  async findOneById(id: string): Promise<ISuccess> {
    const answer = await this.answerRepository.findOne({
      where: { id },
      relations: ['questions'],
    });
    if (!answer) throw new NotFoundException('Answer not found');
    return successRes(answer);
  }

  async update(id: string, dto: UpdateAnswerDto): Promise<ISuccess> {
    const answer = await this.answerRepository.findOne({ where: { id } });
    if (!answer) throw new NotFoundException('Answer not found');

    Object.assign(answer, dto);
    await this.answerRepository.save(answer);

    return successRes(answer);
  }

  async delete(id: string): Promise<ISuccess> {
    const answer = await this.answerRepository.findOne({ where: { id } });
    if (!answer) throw new NotFoundException('Answer not found');

    await this.answerRepository.remove(answer);
    return successRes({});
  }
}
