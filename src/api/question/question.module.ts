import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestGroup } from 'src/core/entity/test-group.entity';
import { Question } from 'src/core/entity/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, TestGroup])],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
