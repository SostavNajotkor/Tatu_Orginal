import { Module } from '@nestjs/common';
import { TestGroupService } from './test-group.service';
import { TestGroupController } from './test-group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestGroup } from 'src/core/entity/test-group.entity';
import { Subject } from 'src/core/entity/subject.entity';
import { Question } from 'src/core/entity/question.entity';


@Module({
  imports: [TypeOrmModule.forFeature([TestGroup, Subject, Question])],
  controllers: [TestGroupController],
  providers: [TestGroupService],
  exports: [TestGroupService],
})
export class TestGroupModule { }
