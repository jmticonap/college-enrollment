import { Injectable, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { EnrollmentEntity } from '../entities/enrollment.entity';
import { CreateUpdateInterceptor } from '../logging/createUpdate.interceptor';
import { StudentService } from '../student/student.service';
import { ErrorInterceptor } from '../logging/error.interceptor';

@UseInterceptors(ErrorInterceptor)
@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(EnrollmentEntity)
    private readonly enrollmentRepository: Repository<EnrollmentEntity>,
    private readonly studentService: StudentService,
  ) {}

  @UseInterceptors(CreateUpdateInterceptor)
  async create(enrollmentDto: CreateEnrollmentDto) {
    const student = await this.studentService.findById(enrollmentDto.studentId);
    if (!student) throw new Error('Student not found');

    const enrollment = new EnrollmentEntity();
    enrollment.program = enrollmentDto.program;
    enrollment.description = enrollmentDto.description;
    enrollment.student = student;

    try {
      return this.enrollmentRepository.save(enrollment);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  findPaged(
    options: IPaginationOptions,
  ): Promise<Pagination<EnrollmentEntity>> {
    try {
      return paginate<EnrollmentEntity>(this.enrollmentRepository, options);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findById(id: string): Promise<EnrollmentEntity> {
    try {
      return await this.enrollmentRepository.findOneBy({ id });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @UseInterceptors(CreateUpdateInterceptor)
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
