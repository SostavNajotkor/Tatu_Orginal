import {
	Controller,
	Post,
	Get,
	Param,
	Body,
	Patch,
	Delete,
	UseGuards,
	UploadedFile,
	UseInterceptors,
	Res,
	Req,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/common/enum';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import express from 'express';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { RolesGuard } from 'src/common/guard/role.guard';
import { AccessRoles } from 'src/common/decorator/roles.decorator';
import { diskStorage } from 'multer';
import * as path from 'path';
import { extname } from 'path';
import * as fs from 'fs';

@ApiTags('Student')
@Controller('students')
export class StudentController {
	constructor(private readonly studentService: StudentService) { }

	@Post()
	@ApiBearerAuth()
	@AccessRoles(Roles.ADMIN, Roles.SUPERADMIN)
	@UseGuards(AuthGuard, RolesGuard)
	@UseInterceptors(
		FileInterceptor('image', {
			storage: diskStorage({
				destination: (req, file, cb) => {
					const uploadPath = path.join(process.cwd(), 'uploads');
					if (!fs.existsSync(uploadPath)) {
						fs.mkdirSync(uploadPath, { recursive: true });
					}
					cb(null, uploadPath);
				},
				filename: (req, file, cb) => {
					const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
					const ext = extname(file.originalname);
					cb(null, uniqueSuffix + ext);
				},
			}),
		}),
	)
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				firstName: { type: 'string' },
				lastName: { type: 'string' },
				username: { type: 'string' },
				password: { type: 'string' },
				role: { type: 'string', enum: Object.values(Roles) },
				image: {
					type: 'string',
					format: 'binary',
				},
				phoneNumber: { type: 'string' },
				groupId: { type: 'string' },
			},
		},
	})
	async createStudent(
		@Body() dto: CreateStudentDto,
		@UploadedFile() file: Express.Multer.File,
	) {
		return this.studentService.createStudent(dto, file);
	}

	@Post('signin')
	async signIn(
		@Body() dto: CreateStudentDto,
		@Res({ passthrough: true }) res: express.Response,
	) {
		return this.studentService.signIn(dto, res);
	}

	@Get()
	@ApiBearerAuth()
	@AccessRoles(Roles.ADMIN, Roles.SUPERADMIN)
	@UseGuards(AuthGuard, RolesGuard)
	async findAll() {
		return this.studentService.findAll();
	}

	@Get(':id')
	@ApiBearerAuth()
	@UseGuards(AuthGuard)
	async findOne(@Param('id') id: string) {
		return this.studentService.findOneById(id);
	}

	@Patch(':id')
	@ApiBearerAuth()
	@UseGuards(AuthGuard)
	@UseInterceptors(FileInterceptor('image'))
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				username: { type: 'string' },
				password: { type: 'string' },
				role: { type: 'string', enum: Object.values(Roles) },
				image: {
					type: 'string',
					format: 'binary',
				},
			},
		},
	})
	async updateStudent(
		@Param('id') id: string,
		@Body() dto: UpdateStudentDto,
		@Req() req: any,
		@UploadedFile() file: Express.Multer.File,
	) {
		return this.studentService.updateStudent(id, dto, req.user, file);
	}

	@Delete(':id')
	@ApiBearerAuth()
	@AccessRoles(Roles.ADMIN, Roles.SUPERADMIN)
	@UseGuards(AuthGuard, RolesGuard)
	async remove(@Param('id') id: string) {
		return this.studentService.remove(id);
	}
}
  