import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { ISuccess } from 'src/infrastructure/response/success.interface';

@ApiTags('Answer API')
@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  @ApiOperation({ summary: 'yangi answer yaratish' })
  @ApiCreatedResponse({ description: 'Answer muvaffaqiyatli yaratildi' })
  @ApiBadRequestResponse({ description: 'xato malumot kiritildi' })
  create(@Body() createAnswerDto: CreateAnswerDto): Promise<ISuccess> {
    return this.answerService.create(createAnswerDto);
  }

  @Get()
  @ApiOperation({ summary: 'barcha answerlarni olish' })
  @ApiOkResponse({ description: 'barcha answerlar royxati' })
  findAll(): Promise<ISuccess> {
    return this.answerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID orqali answerni olish' })
  @ApiOkResponse({ description: 'Answer topildi' })
  @ApiNotFoundResponse({ description: 'Answer topilmadi' })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ISuccess> {
    return this.answerService.findOneById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Answerni yangilash' })
  @ApiOkResponse({ description: 'Answer yangilandi' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAnswerDto: UpdateAnswerDto,
  ): Promise<ISuccess> {
    return this.answerService.update(id, updateAnswerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Answerni ochirish' })
  @ApiOkResponse({ description: 'Answer muvaffaqiyatli ochirildi' })
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<ISuccess> {
    return this.answerService.delete(id);
  }
}
