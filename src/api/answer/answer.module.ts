import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerController } from './answer.controller';
import { Question } from 'src/core/entity/question.entity';
import { Answer } from 'src/core/entity/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Answer, Question])],
  controllers: [AnswerController],
  providers: [AnswerService],
  exports: [AnswerService],
})
export class AnswerModule {}
