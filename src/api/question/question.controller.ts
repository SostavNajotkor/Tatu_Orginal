import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { ISuccess } from 'src/infrastructure/response/success.interface';

@ApiTags('question api')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @ApiOperation({ summary: 'yangi question yaratish' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'question muvaffaqiyatli yaratildi',
    schema: {
      example: {
        statusCode: 201,
        message: 'success',
        data: {
          id: 'uuid',
          content: 'savol matni',
          answer: 'javob matni',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'xato kiritildi',
    schema: {
      example: {
        statusCode: 400,
        error: {
          message: 'invalid data',
        },
      },
    },
  })
  create(@Body() createQuestionDto: CreateQuestionDto): Promise<ISuccess> {
    return this.questionService.create(createQuestionDto);
  }

  @Get()
  @ApiOperation({ summary: 'barcha questionlarni olish' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'barcha questionlar royxati',
    schema: {
      example: {
        statusCode: 200,
        message: 'success',
        data: [
          {
            id: 'uuid',
            content: 'savol matni',
            answer: 'javob matni',
          },
        ],
      },
    },
  })
  findAll(): Promise<ISuccess> {
    return this.questionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'id orqali questionni olish' })
  @ApiParam({ name: 'id', description: 'question id', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'question topildi',
    schema: {
      example: {
        statusCode: 200,
        message: 'success',
        data: {
          id: 'uuid',
          content: 'savol matni',
          answer: 'javob matni',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'question topilmadi',
    schema: {
      example: {
        statusCode: 404,
        error: {
          message: 'question with id not found',
        },
      },
    },
  })
  findOne(@Param('id') id: string): Promise<ISuccess> {
    return this.questionService.findOneById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'questionni yangilash' })
  @ApiParam({ name: 'id', description: 'question id', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'question yangilandi',
    schema: {
      example: {
        statusCode: 200,
        message: 'success',
        data: {
          id: 'uuid',
          content: 'yangilangan savol',
          answer: 'yangilangan javob',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'question topilmadi',
    schema: {
      example: {
        statusCode: 404,
        error: {
          message: 'question with id not found',
        },
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ): Promise<ISuccess> {
    return this.questionService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'questionni ochirish' })
  @ApiParam({ name: 'id', description: 'question id', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'question muvaffaqiyatli ochirildi',
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
    description: 'question topilmadi',
    schema: {
      example: {
        statusCode: 404,
        error: {
          message: 'question with id not found',
        },
      },
    },
  })
  remove(@Param('id') id: string): Promise<ISuccess> {
    return this.questionService.delete(id);
  }
}
