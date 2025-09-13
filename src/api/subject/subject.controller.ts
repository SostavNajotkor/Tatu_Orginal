import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
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

@ApiTags('Subject API')
@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  @ApiOperation({ summary: 'yangi subject yaratish' })
  @ApiCreatedResponse({ description: 'subject yaratildi' })
  @ApiBadRequestResponse({ description: 'incorrect data ' })
  create(@Body() createSubjectDto: CreateSubjectDto): Promise<ISuccess> {
    return this.subjectService.create(createSubjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'hama subjectlarnoio olish' })
  @ApiOkResponse({ description: 'barcha subjectlar royxati' })
  findAll(): Promise<ISuccess> {
    return this.subjectService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'subject id orqali olish' })
  @ApiParam({ name: 'id', description: 'subject id', type: String })
  @ApiOkResponse({ description: 'subject topildi' })
  @ApiNotFoundResponse({ description: 'subject topilmadi' })
  findOne(@Param('id') id: string): Promise<ISuccess> {
    return this.subjectService.findOneById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'subjectni yangilash' })
  @ApiParam({ name: 'id', description: 'subject ID', type: String })
  @ApiOkResponse({ description: 'subject yangilandi' })
  @ApiNotFoundResponse({ description: 'subject topilmadi' })
  update(
    @Param('id') id: string,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ): Promise<ISuccess> {
    return this.subjectService.update(id, updateSubjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'subjectni ochirish' })
  @ApiParam({ name: 'id', description: 'subject ID', type: String })
  @ApiOkResponse({ description: 'subject muvaffaqiyatli ochirildi' })
  @ApiNotFoundResponse({ description: 'subject topilmadi' })
  remove(@Param('id') id: string): Promise<ISuccess> {
    return this.subjectService.delete(id);
  }
}
