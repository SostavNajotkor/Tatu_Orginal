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
import { TestResultService } from './test-result.service';
import { CreateTestResultDto } from './dto/create-test-result.dto';
import { UpdateTestResultDto } from './dto/update-test-result.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ISuccess } from 'src/infrastructure/response/success.interface';

@ApiTags('testresult api')
@Controller('test-result')
export class TestResultController {
  constructor(private readonly testResultService: TestResultService) {}

  @Post()
  @ApiOperation({ summary: 'yangi test natijasi yaratish' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'testresult muvaffaqiyatli yaratildi',
    schema: {
      example: {
        statusCode: 201,
        message: 'success',
        data: {
          id: 'uuid',
          studentId: 'student uuid',
          testGroupId: 'testgroup uuid',
          score: 95,
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
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'student yoki testgroup topilmadi',
    schema: {
      example: {
        statusCode: 404,
        error: {
          message: 'student or testgroup not found',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'ushbu student ushbu testga natija kiritgan',
    schema: {
      example: {
        statusCode: 409,
        error: {
          message: 'student already has test result for this testgroup',
        },
      },
    },
  })
  create(@Body() createDto: CreateTestResultDto): Promise<ISuccess> {
    return this.testResultService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'barcha test natijalarini olish' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'barcha testresultlar royxati',
    schema: {
      example: {
        statusCode: 200,
        message: 'success',
        data: [
          {
            id: 'uuid',
            studentId: 'student uuid',
            testGroupId: 'testgroup uuid',
            score: 95,
          },
        ],
      },
    },
  })
  findAll(): Promise<ISuccess> {
    return this.testResultService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'id orqali test natijasini olish' })
  @ApiParam({ name: 'id', description: 'testresult id', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'testresult topildi',
    schema: {
      example: {
        statusCode: 200,
        message: 'success',
        data: {
          id: 'uuid',
          studentId: 'student uuid',
          testGroupId: 'testgroup uuid',
          score: 95,
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'testresult topilmadi',
    schema: {
      example: {
        statusCode: 404,
        error: {
          message: 'testresult with id not found',
        },
      },
    },
  })
  findOne(@Param('id') id: string): Promise<ISuccess> {
    return this.testResultService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'test natijasini yangilash' })
  @ApiParam({ name: 'id', description: 'testresult id', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'testresult muvaffaqiyatli yangilandi',
    schema: {
      example: {
        statusCode: 200,
        message: 'success',
        data: {
          id: 'uuid',
          studentId: 'student uuid',
          testGroupId: 'testgroup uuid',
          score: 100,
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
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'testresult, student yoki testgroup topilmadi',
    schema: {
      example: {
        statusCode: 404,
        error: {
          message: 'testresult or student or testgroup not found',
        },
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateTestResultDto,
  ): Promise<ISuccess> {
    return this.testResultService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'test natijasini ochirish' })
  @ApiParam({ name: 'id', description: 'testresult id', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'testresult muvaffaqiyatli ochirildi',
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
    description: 'testresult topilmadi',
    schema: {
      example: {
        statusCode: 404,
        error: {
          message: 'testresult with id not found',
        },
      },
    },
  })
  remove(@Param('id') id: string): Promise<ISuccess> {
    return this.testResultService.remove(id);
  }
}
