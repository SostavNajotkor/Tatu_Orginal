import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/core/entity/group.entity';
import { StaffGroup } from 'src/core/entity/staff-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group, StaffGroup])],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
