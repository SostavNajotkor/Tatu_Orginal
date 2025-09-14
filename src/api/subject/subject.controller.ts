import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { ISuccess } from 'src/infrastructure/response/success.interface';
import { AccessRoles } from 'src/common/decorator/roles.decorator';
import { Roles } from 'src/common/enum';
import { title } from 'process';

@ApiTags('subject api')
@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}
  
  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN)
  @Post()
  @ApiOperation({ summary: 'yangi subject yaratish' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiBody({
      schema: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            format: 'string',
          },
          image: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'subject muvaffaqiyatli yaratildi',
    schema: {
      example: {
        statusCode: 201,
        message: 'success',
        data: {
          id: 'uuid',
          title: 'Matematika',
          imageUrl: 'http://localhost:3000/files/matematika.png',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'subject yaratishda xato',
    schema: {
      example: {
        statusCode: 400,
        error: {
          message: 'title already exists',
        },
      },
    },
  })
  create(
    @Body() createSubjectDto: CreateSubjectDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<ISuccess> {
    return this.subjectService.create(createSubjectDto, image);
  }

  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN)
  @Get()
  @ApiOperation({ summary: 'barcha subjectlarni olish' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'barcha subjectlar royxati',
    schema: {
      example: {
        statusCode: 200,
        message: 'success',
        data: [
          {
            id: 'uuid',
            title: 'Matematika',
            imageUrl: 'http://localhost:3000/files/matematika.png',
          },
        ],
      },
    },
  })
  findAll(): Promise<ISuccess> {
    return this.subjectService.findAll();
  }

  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN)
  @Get(':id')
  @ApiOperation({ summary: 'subjectni id orqali olish' })
  @ApiParam({ name: 'id', description: 'subject id', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'subject topildi',
    schema: {
      example: {
        statusCode: 200,
        message: 'success',
        data: {
          id: 'uuid',
          title: 'Matematika',
          imageUrl: 'http://localhost:3000/files/matematika.png',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'subject topilmadi',
    schema: {
      example: {
        statusCode: 404,
        error: {
          message: 'subject with id not found',
        },
      },
    },
  })
  findOne(@Param('id') id: string): Promise<ISuccess> {
    return this.subjectService.findOne(id);
  }
  
  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'subjectni yangilash' })
  @ApiParam({ name: 'id', description: 'subject id', type: String })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'subject muvaffaqiyatli yangilandi',
    schema: {
      example: {
        statusCode: 200,
        message: 'success',
        data: {
          id: 'uuid',
          title: 'Fizika',
          imageUrl: 'http://localhost:3000/files/fizika.png',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'subject topilmadi',
    schema: {
      example: {
        statusCode: 404,
        error: {
          message: 'subject with id not found',
        },
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() updateSubjectDto: UpdateSubjectDto,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<ISuccess> {
    return this.subjectService.update(id, updateSubjectDto, image);
  }

  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'subjectni ochirish' })
  @ApiParam({ name: 'id', description: 'subject id', type: String })
  @ApiBody({
      schema: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            format: 'string',
          },
          image: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'subject muvaffaqiyatli ochirildi',
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
    description: 'subject topilmadi',
    schema: {
      example: {
        statusCode: 404,
        error: {
          message: 'subject with id not found',
        },
      },
    },
  })
  remove(@Param('id') id: string): Promise<ISuccess> {
    return this.subjectService.remove(id);
  }
}
