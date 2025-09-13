import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffController } from './staff.controller';
import { RoleService } from '../role/role.service';
import { Staff } from 'src/core/entity/staff.entity';
import { Role } from 'src/core/entity/role.entity';
import { StaffRole } from 'src/core/entity/staff-role.entity';
import { StaffSubject } from 'src/core/entity/staff-subject.entity';
import { Subject } from 'src/core/entity/subject.entity';
import { StaffService } from './staff.service';

@Module({
  imports: [TypeOrmModule.forFeature([Staff, Role, StaffRole, StaffSubject, Subject])],
  controllers: [StaffController],
  providers: [StaffService, RoleService],
  exports: [StaffService],
})
export class StaffModule {}
