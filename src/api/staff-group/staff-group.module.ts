import { Module } from '@nestjs/common';
import { StaffGroupService } from './staff-group.service';
import { StaffGroupController } from './staff-group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffGroup } from 'src/core/entity/staff-group.entity';
import { Staff } from 'src/core/entity/staff.entity';
import { Group } from 'src/core/entity/group.entity';

@Module({
	imports: [TypeOrmModule.forFeature([StaffGroup,Staff,Group])],
  controllers: [StaffGroupController],
  providers: [StaffGroupService],
  exports:[StaffGroupService]
})
export class StaffGroupModule {}
