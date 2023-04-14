import { Injectable, UseInterceptors } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { CreateUpdateInterceptor } from '../logging/createUpdate.interceptor';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from '../entities/student.entity';
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

  @UseInterceptors(CreateUpdateInterceptor)
  async create(studentDto: CreateStudentDto) {
    const student = new StudentEntity();
    student.firstname = studentDto.firstname;
    student.lastname = studentDto.lastname;
    student.dni = studentDto.dni;
    student.phone = studentDto.phone;
    student.address = studentDto.address;

    try {
      return await this.studentRepository.save(student);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findPaged(
    options: IPaginationOptions,
  ): Promise<Pagination<StudentEntity>> {
    try {
      return paginate<StudentEntity>(this.studentRepository, options);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findById(id: string): Promise<StudentEntity> {
    try {
      return this.studentRepository.findOneBy({ id });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @UseInterceptors(CreateUpdateInterceptor)
  async update(id: string, studentDto: UpdateStudentDto) {
    try {
      await this.studentRepository.update(id, studentDto);
      return await this.studentRepository.findOneBy({ id });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(id: string) {
    return await this.studentRepository.delete(id);
  }
}
