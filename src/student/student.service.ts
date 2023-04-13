import { Injectable, UseInterceptors } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { LoggingInterceptor } from 'src/logging/logging.interceptor';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from 'src/entities/student.entity';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
  ) {}

  @UseInterceptors(LoggingInterceptor)
  async create(studentDto: CreateStudentDto) {
    const student = new StudentEntity();
    student.firstname = studentDto.firstname;
    student.lastname = studentDto.lastname;
    student.dni = studentDto.dni;
    student.phone = studentDto.phone;
    student.address = studentDto.address;

    return await this.studentRepository.save(student);
  }

  async findPaged(
    options: IPaginationOptions,
  ): Promise<Pagination<StudentEntity>> {
    return paginate<StudentEntity>(this.studentRepository, options);
  }

  async findById(id: string): Promise<StudentEntity> {
    const student = this.studentRepository.findOneBy({ id });

    return student;
  }

  @UseInterceptors(LoggingInterceptor)
  async update(id: string, studentDto: UpdateStudentDto) {
    await this.studentRepository.update(id, studentDto);

    return await this.studentRepository.findOneBy({ id });
  }

  async remove(id: string) {
    return await this.studentRepository.delete(id);
  }
}
