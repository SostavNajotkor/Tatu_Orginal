import { Module } from '@nestjs/common';
import { StaffSubjectService } from './staff-subject.service';
import { StaffSubjectController } from './staff-subject.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffSubject } from 'src/core/entity/staff-subject.entity';

@Module({
	imports: [TypeOrmModule.forFeature([StaffSubject])],
  controllers: [StaffSubjectController],
  providers: [StaffSubjectService],
})
export class StaffSubjectModule {}
