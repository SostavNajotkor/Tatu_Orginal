import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestResult } from 'src/core/entity/test-result.entity';
import { Student } from 'src/core/entity/student.entity';
import { TestGroup } from 'src/core/entity/test-group.entity';
import { CreateTestResultDto } from './dto/create-test-result.dto';
import { UpdateTestResultDto } from './dto/update-test-result.dto';
import { ISuccess } from 'src/infrastructure/response/success.interface';
import { successRes } from 'src/infrastructure/response/success';

@Injectable()
export class TestResultService {
  constructor(
    @InjectRepository(TestResult)
    private readonly testResultRepo: Repository<TestResult>,
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(TestGroup)
    private readonly testGroupRepo: Repository<TestGroup>,
  ) {}

  async create(dto: CreateTestResultDto): Promise<ISuccess> {
    const student = await this.studentRepo.findOne({ where: { id: dto.studentId } });
    if (!student) throw new NotFoundException('Student not found');

    const testGroup = await this.testGroupRepo.findOne({ where: { id: dto.testGroupId } });
    if (!testGroup) throw new NotFoundException('TestGroup not found');

    const exists = await this.testResultRepo.findOne({
      where: { studentId: { id: dto.studentId }, testGroupId: { id: dto.testGroupId } },
    });
    if (exists) throw new ConflictException('Result for this student and test group already exists');

    const testResult = this.testResultRepo.create({
      studentId: student,
      testGroupId: testGroup,
      correctCount: dto.correctCount,
    });
    const saved = await this.testResultRepo.save(testResult);
    return successRes(saved);
  }

  async findAll(): Promise<ISuccess> {
    const data = await this.testResultRepo.find({
      relations: ['studentId', 'testGroupId'],
    });
    return successRes(data);
  }

  async findOne(id: string): Promise<ISuccess> {
    const testResult = await this.testResultRepo.findOne({
      where: { id },
      relations: ['studentId', 'testGroupId'],
    });
    if (!testResult) throw new NotFoundException('TestResult not found');
    return successRes(testResult);
  }

  async update(id: string, dto: UpdateTestResultDto): Promise<ISuccess> {
    const testResult = await this.testResultRepo.findOne({ where: { id } });
    if (!testResult) throw new NotFoundException('TestResult not found');

    if (dto.studentId) {
      const student = await this.studentRepo.findOne({ where: { id: dto.studentId } });
      if (!student) throw new NotFoundException('Student not found');
      testResult.studentId = student;
    }

    if (dto.testGroupId) {
      const testGroup = await this.testGroupRepo.findOne({ where: { id: dto.testGroupId } });
      if (!testGroup) throw new NotFoundException('TestGroup not found');
      testResult.testGroupId = testGroup;
    }

    if (dto.correctCount !== undefined) {
      testResult.correctCount = dto.correctCount;
    }

    const updated = await this.testResultRepo.save(testResult);
    return successRes(updated);
  }

  async remove(id: string): Promise<ISuccess> {
    const testResult = await this.testResultRepo.findOne({ where: { id } });
    if (!testResult) throw new NotFoundException('TestResult not found');
    await this.testResultRepo.remove(testResult);
    return successRes({});
  }
}
