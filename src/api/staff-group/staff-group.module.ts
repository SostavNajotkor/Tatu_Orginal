import { Module } from '@nestjs/common';
import { StaffGroupService } from './staff-group.service';
import { StaffGroupController } from './staff-group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffGroup } from 'src/core/entity/staff-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StaffGroup])],
  controllers: [StaffGroupController],
  providers: [StaffGroupService],
})
export class StaffGroupModule {}
