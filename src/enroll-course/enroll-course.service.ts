import { Injectable, UseInterceptors } from '@nestjs/common';
import { CreateEnrollCourseDto } from './dto/create-enroll-course.dto';
import { UpdateEnrollCourseDto } from './dto/update-enroll-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EnrollCourseEntity } from '../entities/enrollcourse.entity';
import { Repository } from 'typeorm';
import { CourseService } from '../course/course.service';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { CreateUpdateInterceptor } from '../logging/createUpdate.interceptor';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class EnrollCourseService {
  constructor(
    @InjectRepository(EnrollCourseEntity)
    private readonly enrollcourseRepository: Repository<EnrollCourseEntity>,
    private readonly courseService: CourseService,
    private readonly enrollmentService: EnrollmentService,
  ) {}

  @UseInterceptors(CreateUpdateInterceptor)
  async create(enrollCourseDto: CreateEnrollCourseDto) {
    try {
      const enrollment = await this.enrollmentService.findById(
        enrollCourseDto.enrollmentId,
      );
      if (!enrollment) throw new Error('Enrollment not found');

      const course = await this.courseService.findById(
        enrollCourseDto.courseId,
      );
      if (!course) throw new Error('Course not found');

      const enrollcourse = new EnrollCourseEntity();
      enrollcourse.course = course;
      enrollcourse.enrollment = enrollment;

      return await this.enrollcourseRepository.save(enrollcourse);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findPaged(
    options: IPaginationOptions,
  ): Promise<Pagination<EnrollCourseEntity>> {
    try {
      return await paginate<EnrollCourseEntity>(
        this.enrollcourseRepository,
        options,
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findById(id: string) {
    try {
      return await this.enrollcourseRepository.findOneBy({ id });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findByEnrollmentId(id: string) {
    try {
      return this.enrollcourseRepository.findBy({ enrollmentEntityId: id });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @UseInterceptors(CreateUpdateInterceptor)
  async update(id: number, enrollCourseDto: UpdateEnrollCourseDto) {
    try {
      return await this.enrollcourseRepository.update(id, enrollCourseDto);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} enrollCourse`;
  }
}
