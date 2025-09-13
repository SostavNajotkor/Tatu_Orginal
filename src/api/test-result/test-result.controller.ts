import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TestResultService } from './test-result.service';
import { CreateTestResultDto } from './dto/create-test-result.dto';
import { UpdateTestResultDto } from './dto/update-test-result.dto';
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('TestResult Api')
@Controller('test-result')
export class TestResultController {
  constructor(private readonly testResultService: TestResultService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi test natijasi qo‘shish' })
  @ApiCreatedResponse({ description: 'TestResult muvaffaqiyatli yaratildi' })
  @ApiBadRequestResponse({ description: 'Yaroqsiz ma’lumot kiritildi' })
  @ApiNotFoundResponse({ description: 'Student yoki TestGroup topilmadi' })
  @ApiConflictResponse({ description: 'Ushbu student ushbu testga natija kiritgan' })
  create(@Body() createDto: CreateTestResultDto) {
    return this.testResultService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha test natijalarini olish' })
  @ApiOkResponse({ description: 'TestResultlar muvaffaqiyatli olindi' })
  findAll() {
    return this.testResultService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID orqali test natijasini olish' })
  @ApiOkResponse({ description: 'TestResult topildi' })
  @ApiNotFoundResponse({ description: 'TestResult topilmadi' })
  findOne(@Param('id') id: string) {
    return this.testResultService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Test natijasini yangilash' })
  @ApiOkResponse({ description: 'TestResult muvaffaqiyatli yangilandi' })
  @ApiBadRequestResponse({ description: 'Yaroqsiz ma’lumot kiritildi' })
  @ApiNotFoundResponse({ description: 'TestResult, Student yoki TestGroup topilmadi' })
  update(@Param('id') id: string, @Body() updateDto: UpdateTestResultDto) {
    return this.testResultService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Test natijasini o‘chirish' })
  @ApiOkResponse({ description: 'TestResult muvaffaqiyatli o‘chirildi' })
  @ApiNotFoundResponse({ description: 'TestResult topilmadi' })
  remove(@Param('id') id: string) {
    return this.testResultService.remove(id);
  }
}
