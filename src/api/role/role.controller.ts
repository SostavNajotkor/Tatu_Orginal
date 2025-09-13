import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { Role } from 'src/core/entity/role.entity';

@ApiTags('Role API')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi rol yaratish' })
  @ApiCreatedResponse({
    type: Role,
    description: 'Rol muvaffaqiyatli yaratildi',
  })
  @ApiBadRequestResponse({ description: 'Xato ma’lumot kiritildi' })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha rollarni olish' })
  @ApiOkResponse({
    type: [Role],
    description: 'Barcha ro‘llar ro‘yxati',
  })
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID orqali rolni olish' })
  @ApiOkResponse({
    type: Role,
    description: 'Rol topildi',
  })
  @ApiNotFoundResponse({ description: 'Rol topilmadi' })
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Rolni yangilash' })
  @ApiOkResponse({
    type: Role,
    description: 'Rol muvaffaqiyatli yangilandi',
  })
  @ApiNotFoundResponse({ description: 'Rol topilmadi' })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Rolni o‘chirish' })
  @ApiOkResponse({ description: 'Rol muvaffaqiyatli o‘chirildi' })
  @ApiNotFoundResponse({ description: 'Rol topilmadi' })
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }
}
