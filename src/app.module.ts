import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfessorModule } from './professor/professor.module';
import { CourseEntity } from './entities/course.entity';
import { EnrollmentEntity } from './entities/enrollment.entity';
import { EnrollCourseEntity } from './entities/enrollcourse.entity';
import { ProfessorEntity } from './entities/professor.entity';
import { StudentEntity } from './entities/student.entity';

@Module({
  imports: [
    ProfessorModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'college-enrolment-db',
      entities: [
        ProfessorEntity,
        StudentEntity,
        EnrollmentEntity,
        CourseEntity,
        EnrollCourseEntity,
      ],
      poolSize: 10,
      synchronize: process.env.NODE_ENV === 'dev',
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
