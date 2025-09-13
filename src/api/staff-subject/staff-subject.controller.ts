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
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { ISuccess } from 'src/infrastructure/response/success.interface';

@ApiTags('StaffSubject API')
@Controller('staff-subjects')
export class StaffSubjectController {
  constructor(private readonly staffSubjectService: StaffSubjectService) {}

  @Post()
  @ApiCreatedResponse({ description: 'StaffSubject created' })
  create(@Body() dto: CreateStaffSubjectDto): Promise<ISuccess> {
    return this.staffSubjectService.create(dto);
  }

  @Get()
  @ApiOkResponse({ description: 'Get all StaffSubjects' })
  findAll(): Promise<ISuccess> {
    return this.staffSubjectService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Get StaffSubject by id' })
  findOne(@Param('id') id: string): Promise<ISuccess> {
    return this.staffSubjectService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Update StaffSubject' })
  update(@Param('id') id: string, @Body() dto: UpdateStaffSubjectDto): Promise<ISuccess> {
    return this.staffSubjectService.update(id, dto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Delete StaffSubject' })
  remove(@Param('id') id: string): Promise<ISuccess> {
    return this.staffSubjectService.remove(id);
  }
}
