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
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ISuccess } from 'src/infrastructure/response/success.interface';

@ApiTags('role api')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiOperation({ summary: 'yangi rol yaratish' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'rol muvaffaqiyatli yaratildi',
    schema: {
      example: {
        statusCode: 201,
        message: 'success',
        data: {
          id: 'uuid',
          name: 'rol nomi',
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
  create(@Body() createRoleDto: CreateRoleDto): Promise<ISuccess> {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({ summary: 'barcha rollarni olish' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'barcha rollar royxati',
    schema: {
      example: {
        statusCode: 200,
        message: 'success',
        data: [
          {
            id: 'uuid',
            name: 'rol nomi',
          },
        ],
      },
    },
  })
  findAll(): Promise<ISuccess> {
    return this.roleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'id orqali rolni olish' })
  @ApiParam({ name: 'id', description: 'rol id', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'rol topildi',
    schema: {
      example: {
        statusCode: 200,
        message: 'success',
        data: {
          id: 'uuid',
          name: 'rol nomi',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'rol topilmadi',
    schema: {
      example: {
        statusCode: 404,
        error: {
          message: 'role with id not found',
        },
      },
    },
  })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ISuccess> {
    return this.roleService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'rolni yangilash' })
  @ApiParam({ name: 'id', description: 'rol id', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'rol muvaffaqiyatli yangilandi',
    schema: {
      example: {
        statusCode: 200,
        message: 'success',
        data: {
          id: 'uuid',
          name: 'yangilangan rol nomi',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'rol topilmadi',
    schema: {
      example: {
        statusCode: 404,
        error: {
          message: 'role with id not found',
        },
      },
    },
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<ISuccess> {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'rolni ochirish' })
  @ApiParam({ name: 'id', description: 'rol id', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'rol muvaffaqiyatli ochirildi',
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
    description: 'rol topilmadi',
    schema: {
      example: {
        statusCode: 404,
        error: {
          message: 'role with id not found',
        },
      },
    },
  })
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<ISuccess> {
    return this.roleService.remove(id);
  }
}
