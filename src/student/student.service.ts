import { Injectable, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentEntity } from '../entities/student.entity';
import { CreateUpdateInterceptor } from '../logging/createUpdate.interceptor';
import { ErrorInterceptor } from '../logging/error.interceptor';

@UseInterceptors(ErrorInterceptor)
@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
  ) {}

  @UseInterceptors(CreateUpdateInterceptor)
  async create(studentDto: CreateStudentDto) {
    return await this.studentRepository.save(studentDto);
  }

  async findPaged(
    options: IPaginationOptions,
  ): Promise<Pagination<StudentEntity>> {
    return paginate<StudentEntity>(this.studentRepository, options);
  }

  async findById(id: string): Promise<StudentEntity> {
    return this.studentRepository.findOneBy({ id });
  }

  @UseInterceptors(CreateUpdateInterceptor)
  async update(id: string, studentDto: UpdateStudentDto) {
    return await this.studentRepository.update(id, studentDto);
  }

  async remove(id: string) {
    return await this.studentRepository.delete(id);
  }
}
