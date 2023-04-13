import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { StudentEntity } from '../entities/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity])],
  exports: [TypeOrmModule, StudentService],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
