import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StaffRoleService } from './staff-role.service';
import { CreateStaffRoleDto } from './dto/create-staff-role.dto';
import { UpdateStaffRoleDto } from './dto/update-staff-role.dto';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { StaffRole } from 'src/core/entity/staff-role.entity';

@ApiTags('Staff-Role API')
@Controller('staff-role')
export class StaffRoleController {
  constructor(private readonly staffRoleService: StaffRoleService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi staffga rol biriktirish' })
  @ApiCreatedResponse({
    type: StaffRole,
    description: 'Staffga rol muvaffaqiyatli qo‘shildi',
  })
  @ApiBadRequestResponse({ description: 'Xato ma’lumot kiritildi' })
  create(@Body() createStaffRoleDto: CreateStaffRoleDto) {
    return this.staffRoleService.create(createStaffRoleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha staff-role yozuvlarini olish' })
  @ApiOkResponse({
    type: [StaffRole],
    description: 'Barcha staff-role ro‘yxati',
  })
  findAll() {
    return this.staffRoleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID orqali staff-role yozuvini olish' })
  @ApiOkResponse({
    type: StaffRole,
    description: 'Staff-role topildi',
  })
  @ApiNotFoundResponse({ description: 'Staff-role topilmadi' })
  findOne(@Param('id') id: string) {
    return this.staffRoleService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Staff-role yozuvini yangilash' })
  @ApiOkResponse({
    type: StaffRole,
    description: 'Staff-role muvaffaqiyatli yangilandi',
  })
  @ApiNotFoundResponse({ description: 'Staff-role topilmadi' })
  update(
    @Param('id') id: string,
    @Body() updateStaffRoleDto: UpdateStaffRoleDto,
  ) {
    return this.staffRoleService.update(id, updateStaffRoleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Staff-role yozuvini o‘chirish' })
  @ApiOkResponse({ description: 'Staff-role muvaffaqiyatli o‘chirildi' })
  @ApiNotFoundResponse({ description: 'Staff-role topilmadi' })
  remove(@Param('id') id: string) {
    return this.staffRoleService.remove(id);
  }
}
