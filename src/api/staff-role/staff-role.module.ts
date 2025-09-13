import { Module } from '@nestjs/common';
import { StaffRoleService } from './staff-role.service';
import { StaffRoleController } from './staff-role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffRole } from 'src/core/entity/staff-role.entity';
import { Staff } from 'src/core/entity/staff.entity';
import { Role } from 'src/core/entity/role.entity';

@Module({
	imports: [TypeOrmModule.forFeature([StaffRole,Staff,Role])],
  controllers: [StaffRoleController],
  providers: [StaffRoleService],
  exports:[StaffRoleService]
})
export class StaffRoleModule {}
