import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { RolesGuard } from 'src/common/guard/role.guard';
import { AccessRoles } from 'src/common/decorator/roles.decorator';
import { Roles } from 'src/common/enum';



@ApiTags('Staff Api')
@Controller('staff')
@UseGuards(AuthGuard, RolesGuard)
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Yangi staff yaratish' })
  @ApiCreatedResponse({ description: 'Staff successfully created' })
  @ApiBadRequestResponse({ description: 'Invalid request body' })
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN, Roles.STAFF)
  @Get()
  @ApiOperation({ summary: 'Stafflar royxati' })
  @ApiOkResponse({ description: 'List of all staff members' })
  findAll(@Req() req: any) {
    return this.staffService.findAll(req.user);
  }

  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN, Roles.STAFF)
  @Get(':id')
  @ApiOperation({ summary: 'Bitta staffni olish' })
  @ApiOkResponse({ description: 'Staff found successfully' })
  @ApiNotFoundResponse({ description: 'Staff not found' })
  @ApiForbiddenResponse({ description: 'Access denied' })
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.staffService.findOne(id, req.user);
  }

  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN, Roles.STAFF)
  @Patch(':id')
  @ApiOperation({ summary: 'Staffni yangilash' })
  @ApiOkResponse({ description: 'Staff updated successfully' })
  @ApiNotFoundResponse({ description: 'Staff not found' })
  @ApiForbiddenResponse({ description: 'Access denied' })
  update(@Param('id') id: string, @Body() dto: UpdateStaffDto, @Req() req: any) {
    return this.staffService.update(id, dto, req.user);
  }

  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Staffni ochirish' })
  @ApiOkResponse({ description: 'Staff deleted successfully' })
  @ApiNotFoundResponse({ description: 'Staff not found' })
  @ApiForbiddenResponse({ description: 'Access denied' })
  remove(@Param('id') id: string, @Req() req: any) {
    return this.staffService.remove(id, req.user);
  }
}