import { Module } from '@nestjs/common';
import { StaffRoleService } from './staff-role.service';
import { StaffRoleController } from './staff-role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffRole } from 'src/core/entity/staff-role.entity';

@Module({
	imports: [TypeOrmModule.forFeature([StaffRole])],
  controllers: [StaffRoleController],
  providers: [StaffRoleService],
})
export class StaffRoleModule {}
