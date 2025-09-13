import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiTags('Question API')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @ApiOperation({ summary: 'yangi question yaratish' })
  @ApiCreatedResponse({ description: 'question muvaffaqiyatli yaratildi' })
  @ApiBadRequestResponse({ description: 'xato  kiritildi' })
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @Get()
  @ApiOperation({ summary: 'barcha questionlarni olish' })
  @ApiOkResponse({ description: 'barcha questionlar royxati' })
  findAll() {
    return this.questionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID orqali questionni olish' })
  @ApiOkResponse({ description: 'question topildi' })
  @ApiNotFoundResponse({ description: 'question topilmadi' })
  findOne(@Param('id') id: string) {
    return this.questionService.findOneById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'questionni yangilash' })
  @ApiOkResponse({ description: 'question yangilandi' })
  @ApiNotFoundResponse({ description: 'question topilmadi' })
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'questionni o‘chirish' })
  @ApiOkResponse({ description: 'question muvaffaqiyatli ochirildi' })
  @ApiNotFoundResponse({ description: 'question topilmadi' })
  remove(@Param('id') id: string) {
    return this.questionService.delete(id);
  }
}
