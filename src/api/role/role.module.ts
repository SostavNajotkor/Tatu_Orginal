import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/core/entity/role.entity';
import { StaffRole } from 'src/core/entity/staff-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, StaffRole])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
