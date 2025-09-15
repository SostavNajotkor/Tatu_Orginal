import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/core/entity/student.entity';
import { Group } from 'src/core/entity/group.entity';
import { TestResult } from 'src/core/entity/test-result.entity';
import { CryptoService } from 'src/infrastructure/crypt/Crypto';
import { TokenService } from 'src/infrastructure/token/Token';
import { FileService } from 'src/infrastructure/file/FileService';

@Module({
	imports: [TypeOrmModule.forFeature([Student, Group, TestResult])],
	controllers: [StudentController],
	providers: [StudentService, CryptoService, TokenService, FileService],
	exports: [StudentService],
})
export class StudentModule { }
