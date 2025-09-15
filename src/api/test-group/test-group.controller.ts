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
import { TestGroupService } from './test-group.service';
import { CreateTestGroupDto } from './dto/create-test-group.dto';
import { UpdateTestGroupDto } from './dto/update-test-group.dto';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { ISuccess } from 'src/infrastructure/response/success.interface';

@ApiTags('TestGroup API')
@Controller('test-group')
export class TestGroupController {
  constructor(private readonly testGroupService: TestGroupService) {}

  @Post()
  @ApiOperation({ summary: 'yangi test-group yaratish' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'testGroup muvaffaqiyatli yaratildi',
    schema: {
      example: {
        statusCode: 201,
        message: 'success',
        data: {
          id: 'uuid',
          title: 'Matematika 1',
          description: 'test group description',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'hato malumot kiritildi',
    schema: {
      example: {
        statusCode: 400,
        error: {
          message: 'validation failed: title is required',
        },
      },
    },
  })
  create(@Body() dto: CreateTestGroupDto): Promise<ISuccess> {
    return this.testGroupService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'barcha test-grouplarni olish' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'barcha test-grouplar royxati',
    schema: {
      example: {
        statusCode: 200,
        message: 'success',
        data: [
          {
            id: 'uuid',
            title: 'Matematika 1',
            description: 'test group description',
          },
        ],
      },
    },
  })
  findAll(): Promise<ISuccess> {
    return this.testGroupService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'test-groupni ID orqali olish' })
  @ApiParam({ name: 'id', description: 'TestGroup ID', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'testGroup topildi',
    schema: {
      example: {
        statusCode: 200,
        message: 'success',
        data: {
          id: 'uuid',
          title: 'Matematika 1',
          description: 'test group description',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'testGroup topilmadi',
    schema: {
      example: {
        statusCode: 404,
        error: {
          message: 'testGroup with ID not found',
        },
      },
    },
  })
  findOne(@Param('id') id: string): Promise<ISuccess> {
    return this.testGroupService.findOneById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'test-groupni yangilash' })
  @ApiParam({ name: 'id', description: 'TestGroup ID', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'TestGroup yangilandi',
    schema: {
      example: {
        statusCode: 200,
        message: 'success',
        data: {
          id: 'uuid',
          title: 'Matematika 2',
          description: 'yangilangan description',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'testGroup topilmadi',
    schema: {
      example: {
        statusCode: 404,
        error: {
          message: 'testGroup with ID not found',
        },
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTestGroupDto,
  ): Promise<ISuccess> {
    return this.testGroupService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'test-groupni ochirish' })
  @ApiParam({ name: 'id', description: 'TestGroup ID', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'testGroup muvaffaqiyatli ochirildi',
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
    description: 'testGroup topilmadi',
    schema: {
      example: {
        statusCode: 404,
        error: {
          message: 'testGroup with ID not found',
        },
      },
    },
  })
  remove(@Param('id') id: string): Promise<ISuccess> {
    return this.testGroupService.delete(id);
  }
}
