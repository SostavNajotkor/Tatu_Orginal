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
import { StaffSubjectService } from './staff-subject.service';
import { CreateStaffSubjectDto } from './dto/create-staff-subject.dto';
import { UpdateStaffSubjectDto } from './dto/update-staff-subject.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ISuccess } from 'src/infrastructure/response/success.interface';

@ApiTags('staffsubject api')
@Controller('staff-subjects')
export class StaffSubjectController {
  constructor(private readonly staffSubjectService: StaffSubjectService) {}

  @Post()
  @ApiOperation({ summary: 'yangi staffsubject yaratish' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'staffsubject muvaffaqiyatli yaratildi',
    schema: {
      example: {
        statusCode: 201,
        message: 'success',
        data: {
          id: 'uuid',
          staffId: 'staff uuid',
          subjectId: 'subject uuid',
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
  create(@Body() dto: CreateStaffSubjectDto): Promise<ISuccess> {
    return this.staffSubjectService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'barcha staffsubject yozuvlarini olish' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'barcha staffsubjectlar royxati',
    schema: {
      example: {
        statusCode: 200,
        message: 'success',
        data: [
          {
            id: 'uuid',
            staffId: 'staff uuid',
            subjectId: 'subject uuid',
          },
        ],
      },
    },
  })
  findAll(): Promise<ISuccess> {
    return this.staffSubjectService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'id orqali staffsubjectni olish' })
  @ApiParam({ name: 'id', description: 'staffsubject id', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'staffsubject topildi',
    schema: {
      example: {
        statusCode: 200,
        message: 'success',
        data: {
          id: 'uuid',
          staffId: 'staff uuid',
          subjectId: 'subject uuid',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'staffsubject topilmadi',
    schema: {
      example: {
        statusCode: 404,
        error: {
          message: 'staffsubject with id not found',
        },
      },
    },
  })
  findOne(@Param('id') id: string): Promise<ISuccess> {
    return this.staffSubjectService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'staffsubjectni yangilash' })
  @ApiParam({ name: 'id', description: 'staffsubject id', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'staffsubject muvaffaqiyatli yangilandi',
    schema: {
      example: {
        statusCode: 200,
        message: 'success',
        data: {
          id: 'uuid',
          staffId: 'staff uuid',
          subjectId: 'subject uuid',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'staffsubject topilmadi',
    schema: {
      example: {
        statusCode: 404,
        error: {
          message: 'staffsubject with id not found',
        },
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateStaffSubjectDto,
  ): Promise<ISuccess> {
    return this.staffSubjectService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'staffsubjectni ochirish' })
  @ApiParam({ name: 'id', description: 'staffsubject id', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'staffsubject muvaffaqiyatli ochirildi',
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
    description: 'staffsubject topilmadi',
    schema: {
      example: {
        statusCode: 404,
        error: {
          message: 'staffsubject with id not found',
        },
      },
    },
  })
  remove(@Param('id') id: string): Promise<ISuccess> {
    return this.staffSubjectService.remove(id);
  }
}
