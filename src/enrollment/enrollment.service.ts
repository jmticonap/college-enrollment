import { Injectable, UseInterceptors } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { EnrollmentEntity } from '../entities/enrollment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggingInterceptor } from 'src/logging/logging.interceptor';
import { StudentService } from 'src/student/student.service';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(EnrollmentEntity)
    private readonly enrollmentRepository: Repository<EnrollmentEntity>,
    private readonly studentService: StudentService,
  ) {}

  @UseInterceptors(LoggingInterceptor)
  async create(enrollmentDto: CreateEnrollmentDto) {
    const student = await this.studentService.findById(enrollmentDto.studentId);
    if (!student) throw new Error('Student not found');

    const enrollment = new EnrollmentEntity();
    enrollment.program = enrollmentDto.program;
    enrollment.description = enrollmentDto.description;
    enrollment.student = student;

    return this.enrollmentRepository.save(enrollment);
  }

  findPaged(
    options: IPaginationOptions,
  ): Promise<Pagination<EnrollmentEntity>> {
    return paginate<EnrollmentEntity>(this.enrollmentRepository, options);
  }

  async findById(id: string): Promise<EnrollmentEntity> {
    try {
      return await this.enrollmentRepository.findOneBy({ id });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @UseInterceptors(LoggingInterceptor)
  async update(id: string, enrollmentDto: UpdateEnrollmentDto) {
    try {
      return await this.enrollmentRepository.update(id, enrollmentDto);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} enrollment`;
  }
}
