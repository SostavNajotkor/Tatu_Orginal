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
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ISuccess } from 'src/infrastructure/response/success.interface';

@ApiTags('group api')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @ApiOperation({ summary: 'yangi group yaratish' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'group muvaffaqiyatli yaratildi',
    schema: {
      example: {
        statusCode: 201,
        message: 'success',
        data: {
          id: 'uuid',
          name: 'group nomi',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'noto‘g‘ri request body',
    schema: {
      example: {
        statusCode: 400,
        error: {
          message: 'invalid data',
        },
      },
    },
  })
  create(@Body() createGroupDto: CreateGroupDto): Promise<ISuccess> {
    return this.groupService.create(createGroupDto);
  }

  @Get()
  @ApiOperation({ summary: 'barcha grouplarni olish' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'barcha grouplar royxati',
    schema: {
      example: {
        statusCode: 200,
        message: 'success',
        data: [
          {
            id: 'uuid',
            name: 'group nomi',
          },
        ],
      },
    },
  })
  findAll(): Promise<ISuccess> {
    return this.groupService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'id orqali bitta groupni olish' })
  @ApiParam({ name: 'id', description: 'group id', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'group topildi',
    schema: {
      example: {
        statusCode: 200,
        message: 'success',
        data: {
          id: 'uuid',
          name: 'group nomi',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'group topilmadi',
    schema: {
      example: {
        statusCode: 404,
        error: {
          message: 'group with id not found',
        },
      },
    },
  })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ISuccess> {
    return this.groupService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'groupni yangilash' })
  @ApiParam({ name: 'id', description: 'group id', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'group yangilandi',
    schema: {
      example: {
        statusCode: 200,
        message: 'success',
        data: {
          id: 'uuid',
          name: 'yangilangan group nomi',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'group topilmadi',
    schema: {
      example: {
        statusCode: 404,
        error: {
          message: 'group with id not found',
        },
      },
    },
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ): Promise<ISuccess> {
    return this.groupService.update(id, updateGroupDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'groupni ochirish' })
  @ApiParam({ name: 'id', description: 'group id', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'group muvaffaqiyatli ochirildi',
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
    description: 'group topilmadi',
    schema: {
      example: {
        statusCode: 404,
        error: {
          message: 'group with id not found',
        },
      },
    },
  })
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<ISuccess> {
    return this.groupService.remove(id);
  }
}
