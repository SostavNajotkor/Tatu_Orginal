import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StaffGroupService } from './staff-group.service';
import { CreateStaffGroupDto } from './dto/create-staff-group.dto';
import { UpdateStaffGroupDto } from './dto/update-staff-group.dto';

@Controller('staff-group')
export class StaffGroupController {
  constructor(private readonly staffGroupService: StaffGroupService) {}

  @Post()
  create(@Body() createStaffGroupDto: CreateStaffGroupDto) {
    return this.staffGroupService.create(createStaffGroupDto);
  }

  @Get()
  findAll() {
    return this.staffGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffGroupService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStaffGroupDto: UpdateStaffGroupDto,
  ) {
    return this.staffGroupService.update(+id, updateStaffGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffGroupService.remove(+id);
  }
}
