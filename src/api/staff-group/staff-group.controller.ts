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
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiTags('Staff-Group Api')
@Controller('staff-group')
export class StaffGroupController {
  constructor(private readonly staffGroupService: StaffGroupService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi staff-group yaratish' })
  @ApiCreatedResponse({ description: 'Staff-Group muvaffaqiyatli yaratildi' })
  @ApiBadRequestResponse({ description: 'Noto‘g‘ri request body' })
  create(@Body() createStaffGroupDto: CreateStaffGroupDto) {
    return this.staffGroupService.create(createStaffGroupDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha staff-grouplarni olish' })
  @ApiOkResponse({ description: 'Barcha staff-grouplar ro‘yxati' })
  findAll() {
    return this.staffGroupService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta staff-groupni olish' })
  @ApiOkResponse({ description: 'Staff-Group topildi' })
  @ApiNotFoundResponse({ description: 'Staff-Group topilmadi' })
  findOne(@Param('id') id: string) {
    return this.staffGroupService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Staff-groupni yangilash' })
  @ApiOkResponse({ description: 'Staff-Group yangilandi' })
  @ApiNotFoundResponse({ description: 'Staff-Group topilmadi' })
  update(
    @Param('id') id: string,
    @Body() updateStaffGroupDto: UpdateStaffGroupDto,
  ) {
    return this.staffGroupService.update(id, updateStaffGroupDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Staff-groupni o‘chirish' })
  @ApiOkResponse({ description: 'Staff-Group o‘chirildi' })
  @ApiNotFoundResponse({ description: 'Staff-Group topilmadi' })
  remove(@Param('id') id: string) {
    return this.staffGroupService.remove(id);
  }
}
