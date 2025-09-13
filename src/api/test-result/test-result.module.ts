import { Module } from '@nestjs/common';
import { TestResultService } from './test-result.service';
import { TestResultController } from './test-result.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestResult } from 'src/core/entity/test-result.entity';
import { TestGroup } from 'src/core/entity/test-group.entity';
import { Student } from 'src/core/entity/student.entity';

@Module({
	imports: [TypeOrmModule.forFeature([TestResult,TestGroup,Student])],
	controllers: [TestResultController],
	providers: [TestResultService],
	exports:[TestResultService]
})
export class TestResultModule { }
