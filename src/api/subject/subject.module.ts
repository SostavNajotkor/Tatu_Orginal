import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from 'src/core/entity/subject.entity';
import { TestGroup } from 'src/core/entity/test-group.entity';
import { StaffSubject } from 'src/core/entity/staff-subject.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Subject, TestGroup, StaffSubject])],
  controllers: [SubjectController],
  providers: [SubjectService],
  exports: [SubjectService],
})
export class SubjectModule {}
