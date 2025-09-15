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
import { StaffGroupService } from './staff-group.service';
import { CreateStaffGroupDto } from './dto/create-staff-group.dto';
import { UpdateStaffGroupDto } from './dto/update-staff-group.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ISuccess } from 'src/infrastructure/response/success.interface';

@ApiTags('staff-group api')
@Controller('staff-group')
export class StaffGroupController {
  constructor(private readonly staffGroupService: StaffGroupService) {}

  @Post()
  @ApiOperation({ summary: 'yangi staff-group yaratish' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'staff-group muvaffaqiyatli yaratildi',
    schema: {
      example: {
        statusCode: 201,
        message: 'success',
        data: {
          id: 'uuid',
          name: 'staff group nomi',
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
  create(@Body() createStaffGroupDto: CreateStaffGroupDto): Promise<ISuccess> {
    return this.staffGroupService.create(createStaffGroupDto);
  }

  @Get()
  @ApiOperation({ summary: 'barcha staff-grouplarni olish' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'barcha staff-grouplar royxati',
    schema: {
      example: {
        statusCode: 200,
        message: 'success',
        data: [
          {
            id: 'uuid',
            name: 'staff group nomi',
          },
        ],
      },
    },
  })
  findAll(): Promise<ISuccess> {
    return this.staffGroupService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'id orqali staff-groupni olish' })
  @ApiParam({ name: 'id', description: 'staff-group id', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'staff-group topildi',
    schema: {
      example: {
        statusCode: 200,
        message: 'success',
        data: {
          id: 'uuid',
          name: 'staff group nomi',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'staff-group topilmadi',
    schema: {
      example: {
        statusCode: 404,
        error: {
          message: 'staff group with id not found',
        },
      },
    },
  })
  findOne(@Param('id') id: string): Promise<ISuccess> {
    return this.staffGroupService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'staff-groupni yangilash' })
  @ApiParam({ name: 'id', description: 'staff-group id', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'staff-group muvaffaqiyatli yangilandi',
    schema: {
      example: {
        statusCode: 200,
        message: 'success',
        data: {
          id: 'uuid',
          name: 'yangilangan staff group nomi',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'staff-group topilmadi',
    schema: {
      example: {
        statusCode: 404,
        error: {
          message: 'staff group with id not found',
        },
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() updateStaffGroupDto: UpdateStaffGroupDto,
  ): Promise<ISuccess> {
    return this.staffGroupService.update(id, updateStaffGroupDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'staff-groupni ochirish' })
  @ApiParam({ name: 'id', description: 'staff-group id', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'staff-group muvaffaqiyatli ochirildi',
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
    description: 'staff-group topilmadi',
    schema: {
      example: {
        statusCode: 404,
        error: {
          message: 'staff group with id not found',
        },
      },
    },
  })
  remove(@Param('id') id: string): Promise<ISuccess> {
    return this.staffGroupService.remove(id);
  }
}
