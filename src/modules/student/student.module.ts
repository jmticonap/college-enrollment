import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { StudentEntity } from '../../entities/student.entity';
import { MetadataModule } from '../metadata/metadata.module';
import { RemoteModule } from '../remote/remote.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentEntity]),
    MetadataModule,
    RemoteModule,
  ],
  exports: [TypeOrmModule, StudentService],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
