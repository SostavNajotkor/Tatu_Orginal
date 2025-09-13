import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/config';
import { AdminModule } from './admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TestGroupModule } from './test-group/test-group.module';
import { SubjectModule } from './subject/subject.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { TestResultModule } from './test-result/test-result.module';
import { StudentModule } from './student/student.module';
import { GroupModule } from './group/group.module';
import { StaffGroupModule } from './staff-group/staff-group.module';
import { StaffRoleModule } from './staff-role/staff-role.module';
import { RoleModule } from './role/role.module';
import { StaffModule } from './staff/staff.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.DB_URL,
      synchronize: config.DB_SYNC,
      entities: ['dist/core/entity/*.entity{.ts,.js}'],
      autoLoadEntities: true,
    }),
    JwtModule.register({
      global: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), '..', config.FILE_PATH),
      serveRoot: `/api/v1${config.FILE_PATH}`,
    }),
    AuthModule,
    AdminModule,
    SubjectModule,
    TestGroupModule,
    QuestionModule,
    AnswerModule,
    TestResultModule,
    StudentModule,
    GroupModule,
    StaffGroupModule,
    StaffRoleModule,
    RoleModule,
    StaffModule
  ],
})
export class AppModule {}
