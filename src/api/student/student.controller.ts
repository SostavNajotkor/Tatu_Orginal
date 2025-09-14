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

@ApiTags('Student')
@Controller('students')
export class StudentController {
	constructor(private readonly studentService: StudentService) { }

	@Post()
	@ApiBearerAuth()
	@AccessRoles(Roles.ADMIN, Roles.SUPERADMIN)
	@UseGuards(AuthGuard, RolesGuard)
	@UseInterceptors(FileInterceptor('image'))
	@ApiConsumes('multipart/form-data')
	@ApiBody({ type: CreateStudentDto })
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
