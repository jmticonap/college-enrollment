import { Injectable, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { CreateEnrollCourseDto } from './dto/create-enroll-course.dto';
import { UpdateEnrollCourseDto } from './dto/update-enroll-course.dto';
import { EnrollCourseEntity } from '../entities/enrollcourse.entity';
import { CourseService } from '../course/course.service';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { CreateUpdateInterceptor } from '../logging/createUpdate.interceptor';
import { ErrorInterceptor } from '../logging/error.interceptor';

@UseInterceptors(ErrorInterceptor)
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
    const enrollment = await this.enrollmentService.findById(
      enrollCourseDto.enrollmentId,
    );
    if (!enrollment) throw new Error('Enrollment not found');

    const course = await this.courseService.findById(enrollCourseDto.courseId);
    if (!course) throw new Error('Course not found');

    const enrollcourse = new EnrollCourseEntity();
    enrollcourse.course = course;
    enrollcourse.enrollment = enrollment;

    return await this.enrollcourseRepository.save(enrollcourse);
  }

  async findPaged(
    options: IPaginationOptions,
  ): Promise<Pagination<EnrollCourseEntity>> {
    return await paginate<EnrollCourseEntity>(
      this.enrollcourseRepository,
      options,
    );
  }

  async findById(id: string) {
    return await this.enrollcourseRepository.findOneBy({ id });
  }

  async findByEnrollmentId(id: string) {
    return this.enrollcourseRepository.findBy({ enrollmentEntityId: id });
  }

  @UseInterceptors(CreateUpdateInterceptor)
  async update(id: string, enrollCourseDto: UpdateEnrollCourseDto) {
    return await this.enrollcourseRepository.update(id, enrollCourseDto);
  }

  remove(id: number) {
    return `This action removes a #${id} enrollCourse`;
  }
}
