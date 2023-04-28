import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { EnrollmentEntity } from '../../entities/enrollment.entity';
import { StudentService } from '../student/student.service';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(EnrollmentEntity)
    private readonly enrollmentRepository: Repository<EnrollmentEntity>,
    private readonly studentService: StudentService,
  ) {}

  async create(enrollmentDto: CreateEnrollmentDto) {
    const student = await this.studentService.findById(enrollmentDto.studentId);
    if (!student) throw new NotFoundException('Student not found');

    return this.enrollmentRepository.save({ ...enrollmentDto, student });
  }

  findPaged(
    options: IPaginationOptions,
  ): Promise<Pagination<EnrollmentEntity>> {
    return paginate<EnrollmentEntity>(this.enrollmentRepository, options);
  }

  async findById(id: string): Promise<EnrollmentEntity> {
    return await this.enrollmentRepository.findOneBy({ id });
  }

  async update(id: string, updateEnrollmentDto: UpdateEnrollmentDto) {
    return await this.enrollmentRepository.update(id, updateEnrollmentDto);
  }

  remove(id: number) {
    return `This action removes a #${id} enrollment`;
  }
}
