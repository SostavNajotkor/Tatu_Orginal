import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StaffSubjectService } from './staff-subject.service';
import { CreateStaffSubjectDto } from './dto/create-staff-subject.dto';
import { UpdateStaffSubjectDto } from './dto/update-staff-subject.dto';

@Controller('staff-subject')
export class StaffSubjectController {
  constructor(private readonly staffSubjectService: StaffSubjectService) {}

  @Post()
  create(@Body() createStaffSubjectDto: CreateStaffSubjectDto) {
    return this.staffSubjectService.create(createStaffSubjectDto);
  }

  @Get()
  findAll() {
    return this.staffSubjectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffSubjectService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStaffSubjectDto: UpdateStaffSubjectDto,
  ) {
    return this.staffSubjectService.update(+id, updateStaffSubjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffSubjectService.remove(+id);
  }
}
