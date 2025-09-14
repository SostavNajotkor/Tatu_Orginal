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
import { StaffRoleService } from './staff-role.service';
import { CreateStaffRoleDto } from './dto/create-staff-role.dto';
import { UpdateStaffRoleDto } from './dto/update-staff-role.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ISuccess } from 'src/infrastructure/response/success.interface';

@ApiTags('staff-role api')
@Controller('staff-role')
export class StaffRoleController {
  constructor(private readonly staffRoleService: StaffRoleService) {}

  @Post()
  @ApiOperation({ summary: 'yangi staffga rol biriktirish' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'staffga rol muvaffaqiyatli qoshib qushildi',
    schema: {
      example: {
        statusCode: 201,
        message: 'success',
        data: {
          id: 'uuid',
          staffId: 'uuid',
          roleId: 'uuid',
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
  create(@Body() createStaffRoleDto: CreateStaffRoleDto): Promise<ISuccess> {
    return this.staffRoleService.create(createStaffRoleDto);
  }

  @Get()
  @ApiOperation({ summary: 'barcha staff-role yozuvlarini olish' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'barcha staff-role yozuvlari royxati',
    schema: {
      example: {
        statusCode: 200,
        message: 'success',
        data: [
          {
            id: 'uuid',
            staffId: 'uuid',
            roleId: 'uuid',
          },
        ],
      },
    },
  })
  findAll(): Promise<ISuccess> {
    return this.staffRoleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'id orqali staff-role yozuvini olish' })
  @ApiParam({ name: 'id', description: 'staff-role id', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'staff-role topildi',
    schema: {
      example: {
        statusCode: 200,
        message: 'success',
        data: {
          id: 'uuid',
          staffId: 'uuid',
          roleId: 'uuid',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'staff-role topilmadi',
    schema: {
      example: {
        statusCode: 404,
        error: {
          message: 'staff role with id not found',
        },
      },
    },
  })
  findOne(@Param('id') id: string): Promise<ISuccess> {
    return this.staffRoleService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'staff-role yozuvini yangilash' })
  @ApiParam({ name: 'id', description: 'staff-role id', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'staff-role muvaffaqiyatli yangilandi',
    schema: {
      example: {
        statusCode: 200,
        message: 'success',
        data: {
          id: 'uuid',
          staffId: 'uuid',
          roleId: 'uuid',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'staff-role topilmadi',
    schema: {
      example: {
        statusCode: 404,
        error: {
          message: 'staff role with id not found',
        },
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() updateStaffRoleDto: UpdateStaffRoleDto,
  ): Promise<ISuccess> {
    return this.staffRoleService.update(id, updateStaffRoleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'staff-role yozuvini ochirish' })
  @ApiParam({ name: 'id', description: 'staff-role id', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'staff-role muvaffaqiyatli ochirildi',
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
    description: 'staff-role topilmadi',
    schema: {
      example: {
        statusCode: 404,
        error: {
          message: 'staff role with id not found',
        },
      },
    },
  })
  remove(@Param('id') id: string): Promise<ISuccess> {
    return this.staffRoleService.remove(id);
  }
}
