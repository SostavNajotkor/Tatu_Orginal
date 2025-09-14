import {
	BadRequestException,
	ConflictException,
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { BaseService } from 'src/infrastructure/base/base.service';
import { Student } from 'src/core/entity/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import type { StudentRepository } from 'src/core/repository/student.reprository';
import { CryptoService } from 'src/infrastructure/crypt/Crypto';
import { TokenService } from 'src/infrastructure/token/Token';
import { FileService } from 'src/infrastructure/file/FileService';
import { ISuccess } from 'src/infrastructure/response/success.interface';
import { successRes } from 'src/infrastructure/response/success';
import { Roles } from 'src/common/enum';
import { Response } from 'express';
import { IToken } from 'src/infrastructure/token/interface';
import path from 'path';

@Injectable()
export class StudentService extends BaseService<
	CreateStudentDto,
	UpdateStudentDto,
	Student
> {
	constructor(
		@InjectRepository(Student) private readonly studentRepo: StudentRepository,
		private readonly crypto: CryptoService,
		private readonly tokenService: TokenService,
		private readonly fileService: FileService,
	) {
		super(studentRepo);
	}

	async createStudent(
		createStudentDto: CreateStudentDto,
		file: Express.Multer.File,
	): Promise<ISuccess> {
		// const image = await this.fileService.create(file);
		const { username, password } = createStudentDto;
		const existsUsername = await this.studentRepo.findOne({
			where: { username },
		});
		if (existsUsername) {
			throw new ConflictException('Username alredy exits');
		}
		const hashedPassword = await this.crypto.encrypt(password);

		if (![Roles.ADMIN, Roles.SUPERADMIN].includes(createStudentDto.role)) {
			throw new ForbiddenException('Forbidden user.');
		}

		const newStudent = this.studentRepo.create({
			...createStudentDto,
			username,
			hashedPassword,
			image: file.filename ?? null,
		});

		await this.studentRepo.save(newStudent);
		return successRes(newStudent, 201);
	}

	async signIn(signInDto: CreateStudentDto, res: Response): Promise<ISuccess> {
		const { username, password } = signInDto;
		const student = await this.studentRepo.findOne({ where: { username } });
		const isMatchPassword = await this.crypto.decrypt(
			password,
			student?.hashedPassword || '',
		);
		if (!student || !isMatchPassword) {
			throw new BadRequestException('username or password incorrect');
		}
		const payload: IToken = {
			id: student.id,
			role: student.role,
		};
		const accessToken = await this.tokenService.accessToken(payload);
		const refreshToken = await this.tokenService.refreshToken(payload);
		await this.tokenService.writeCookie(res, 'studentToken', refreshToken, 30);
		return successRes({ token: accessToken });
	}

	async updateStudent(
		id: string,
		updateStudentDto: UpdateStudentDto,
		user: IToken,
		image: Express.Multer.File,
	): Promise<ISuccess> {
		const { username, password } = updateStudentDto;
		const student = await this.studentRepo.findOne({ where: { id } });
		if (!student) {
			throw new NotFoundException('Student not Found');
		}
		let imageUrl = student.image;
		if (image) {
			const uploadPath = path.join(__dirname, '..', '..', '..', 'uploads');
			const oldFilePath = student.image ? path.join(uploadPath, student.image) : null;

			if (oldFilePath && await this.fileService.exist(oldFilePath)) {
				await this.fileService.delete(oldFilePath);
			}

			imageUrl = await this.fileService.create(image);
		}

		if (username) {
			const existsUsername = await this.studentRepo.findOne({
				where: { username },
			});
			if (existsUsername && existsUsername.id !== id) {
				throw new ConflictException('username already exists');
			}
		}
		let hashedPassword = student?.hashedPassword;
		if (password) {
			if (student.role === Roles.ADMIN || student.role === Roles.SUPERADMIN) {
				hashedPassword = await this.crypto.encrypt(password);
			}
			if (student.role === Roles.STUDENT) {
				const isMatch = this.crypto.compare(password, student.hashedPassword);
				if (!isMatch) {
					throw new BadRequestException('Old password is incorrect');
				}
				hashedPassword = await this.crypto.encrypt(password);
			}
		}
		await this.studentRepo.update(
			{ id },
			{
				username,
				hashedPassword,
				image: imageUrl,
			},
		);
		return this.findOneById(id);
	}

	async remove(id: string): Promise<ISuccess> {
		const student = await this.studentRepo.findOne({
			where: { id },
		});
		if (!student) {
			throw new NotFoundException('Student not found');
		}
		if (student && student.role === Roles.STUDENT) {
			throw new ForbiddenException(
				'Students are prohibited from removing other students',
			);
		}
		if (await this.fileService.exist(student?.image)) {
			await this.fileService.delete(student.image);
		}
		return this.delete(id);
	}
}
