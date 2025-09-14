import { Module } from '@nestjs/common';
import { StaffSubjectService } from './staff-subject.service';
import { StaffSubjectController } from './staff-subject.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffSubject } from 'src/core/entity/staff-subject.entity';
import { Staff } from 'src/core/entity/staff.entity';
import { Subject } from 'src/core/entity/subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StaffSubject, Staff, Subject])],
  controllers: [StaffSubjectController],
  providers: [StaffSubjectService],
  exports: [StaffSubjectService],
})
export class StaffSubjectModule {}
