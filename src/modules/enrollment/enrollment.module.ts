import { Module } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentController } from './enrollment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentEntity } from '../../entities/enrollment.entity';
import { StudentModule } from '../student/student.module';
import { RemoteModule } from '../remote/remote.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EnrollmentEntity]),
    StudentModule,
    RemoteModule,
  ],
  exports: [TypeOrmModule, EnrollmentService],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
})
export class EnrollmentModule {}
