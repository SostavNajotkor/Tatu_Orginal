import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiTags('Group Api')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi group yaratish' })
  @ApiCreatedResponse({ description: 'Group muvaffaqiyatli yaratildi' })
  @ApiBadRequestResponse({ description: 'Noto‘g‘ri request body' })
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha grouplarni olish' })
  @ApiOkResponse({ description: 'Grouplar ro‘yxati' })
  findAll() {
    return this.groupService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta groupni olish' })
  @ApiOkResponse({ description: 'Group topildi' })
  @ApiNotFoundResponse({ description: 'Group topilmadi' })
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Groupni yangilash' })
  @ApiOkResponse({ description: 'Group yangilandi' })
  @ApiNotFoundResponse({ description: 'Group topilmadi' })
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(id, updateGroupDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Groupni o‘chirish' })
  @ApiOkResponse({ description: 'Group o‘chirildi' })
  @ApiNotFoundResponse({ description: 'Group topilmadi' })
  remove(@Param('id') id: string) {
    return this.groupService.remove(id);
  }
}
