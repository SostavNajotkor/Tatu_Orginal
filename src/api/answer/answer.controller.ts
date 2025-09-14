import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ISuccess } from 'src/infrastructure/response/success.interface';

@ApiTags('answer api')
@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  @ApiOperation({ summary: 'yangi answer yaratish' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'answer muvaffaqiyatli yaratildi',
    schema: {
      example: {
        statusCode: 201,
        message: 'success',
        data: {
          id: 'uuid',
          content: 'javob matni',
          questionId: 'uuid',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'xato malumot kiritildi',
    schema: {
      example: {
        statusCode: 400,
        error: {
          message: 'invalid data',
        },
      },
    },
  })
  create(@Body() createAnswerDto: CreateAnswerDto): Promise<ISuccess> {
    return this.answerService.create(createAnswerDto);
  }

  @Get()
  @ApiOperation({ summary: 'barcha answerlarni olish' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'barcha answerlar royxati',
    schema: {
      example: {
        statusCode: 200,
        message: 'success',
        data: [
          {
            id: 'uuid',
            content: 'javob matni',
            questionId: 'uuid',
          },
        ],
      },
    },
  })
  findAll(): Promise<ISuccess> {
    return this.answerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'id orqali answerni olish' })
  @ApiParam({ name: 'id', description: 'answer id', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'answer topildi',
    schema: {
      example: {
        statusCode: 200,
        message: 'success',
        data: {
          id: 'uuid',
          content: 'javob matni',
          questionId: 'uuid',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'answer topilmadi',
    schema: {
      example: {
        statusCode: 404,
        error: {
          message: 'answer with id not found',
        },
      },
    },
  })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ISuccess> {
    return this.answerService.findOneById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'answerni yangilash' })
  @ApiParam({ name: 'id', description: 'answer id', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'answer yangilandi',
    schema: {
      example: {
        statusCode: 200,
        message: 'success',
        data: {
          id: 'uuid',
          content: 'yangilangan javob matni',
          questionId: 'uuid',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'answer topilmadi',
    schema: {
      example: {
        statusCode: 404,
        error: {
          message: 'answer with id not found',
        },
      },
    },
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAnswerDto: UpdateAnswerDto,
  ): Promise<ISuccess> {
    return this.answerService.update(id, updateAnswerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'answerni ochirish' })
  @ApiParam({ name: 'id', description: 'answer id', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'answer muvaffaqiyatli ochirildi',
    schema: {
      example: {
        statusCode: 200,
        message: 'success',
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'answer topilmadi',
    schema: {
      example: {
        statusCode: 404,
        error: {
          message: 'answer with id not found',
        },
      },
    },
  })
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<ISuccess> {
    return this.answerService.delete(id);
  }
}
