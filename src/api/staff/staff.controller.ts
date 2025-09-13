import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('Staff API')
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  @ApiOperation({ summary: 'yangi staff yaratish ' })
  @ApiCreatedResponse({ description: 'Staff successfully created' })
  @ApiBadRequestResponse({ description: 'Invalid request body' })
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @Get()
  @ApiOperation({ summary: 'barcha staff larni olish' })
  @ApiOkResponse({ description: 'List of all staff members' })
  findAll() {
    return this.staffService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'staflarni id boyicha olib kelish' })
  @ApiOkResponse({ description: 'Staff found successfully' })
  @ApiNotFoundResponse({ description: 'Staff not found' })
  findOne(@Param('id') id: string) {
    return this.staffService.findOneById(id); 
  }

  @Patch(':id')
  @ApiOperation({ summary: 'id boyicha ozgartirish' })
  @ApiOkResponse({ description: 'Staff updated successfully' })
  @ApiNotFoundResponse({ description: 'Staff not found' })
  update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.update(id, updateStaffDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'id boyicha uchurush' })
  @ApiOkResponse({ description: 'Staff deleted successfully' })
  @ApiNotFoundResponse({ description: 'Staff not found' })
  remove(@Param('id') id: string) {
    return this.staffService.remove(id);
  }
}
