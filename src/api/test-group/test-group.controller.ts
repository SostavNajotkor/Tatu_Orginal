import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TestGroupService } from './test-group.service';
import { CreateTestGroupDto } from './dto/create-test-group.dto';
import { UpdateTestGroupDto } from './dto/update-test-group.dto';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { ISuccess } from 'src/infrastructure/response/success.interface';

@ApiTags('TestGroup API')
@Controller('test-group')
export class TestGroupController {
  constructor(private readonly testGroupService: TestGroupService) {}

  @Post()
  @ApiOperation({ summary: 'yangi test-group yaratish' })
  @ApiCreatedResponse({ description: 'testGroup muvaffaqiyatli yaratildi' })
  @ApiBadRequestResponse({ description: 'xato malumot kiritildi' })
  create(@Body() dto: CreateTestGroupDto): Promise<ISuccess> {
    return this.testGroupService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'barcha test-grouplarni olish' })
  @ApiOkResponse({ description: 'barcha test-grouplar royxati' })
  findAll(): Promise<ISuccess> {
    return this.testGroupService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID orqali test-groupni olish' })
  @ApiParam({ name: 'id', description: 'testGroup ID', type: String })
  @ApiOkResponse({ description: 'testGroup topildi' })
  @ApiNotFoundResponse({ description: 'testGroup topilmadi' })
  findOne(@Param('id') id: string): Promise<ISuccess> {
    return this.testGroupService.findOneById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'test-groupni yangilash' })
  @ApiParam({ name: 'id', description: 'testGroup ID', type: String })
  @ApiOkResponse({ description: 'testGroup yangilandi' })
  @ApiNotFoundResponse({ description: 'testGroup topilmadi' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTestGroupDto,
  ): Promise<ISuccess> {
    return this.testGroupService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'test-groupni ochirish' })
  @ApiParam({ name: 'id', description: 'testGroup ID', type: String })
  @ApiOkResponse({ description: 'testGroup muvaffaqiyatli ochirildi' })
  @ApiNotFoundResponse({ description: 'testGroup topilmadi' })
  remove(@Param('id') id: string): Promise<ISuccess> {
    return this.testGroupService.delete(id);
  }
}
