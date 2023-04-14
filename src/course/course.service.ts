import { Injectable, UseInterceptors } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from '../entities/course.entity';
import { Repository } from 'typeorm';
import { ProfessorService } from '../professor/professor.service';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { CreateUpdateInterceptor } from '../logging/createUpdate.interceptor';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
    private readonly professorService: ProfessorService,
  ) {}

  @UseInterceptors(CreateUpdateInterceptor)
  async create(courseDto: CreateCourseDto) {
    try {
      const professor = await this.professorService.findById(
        courseDto.professorId,
      );
      if (!professor) throw new Error('Professor not found');

      const course = new CourseEntity();
      course.fullname = courseDto.fullname;
      course.abbreviation = courseDto.abbreviation;
      course.description = courseDto.description;
      course.credits = courseDto.credits;
      course.professor = professor;

      return await this.courseRepository.save(course);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  findPaged(options: IPaginationOptions): Promise<Pagination<CourseEntity>> {
    try {
      return paginate<CourseEntity>(this.courseRepository, options);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findById(id: string) {
    try {
      return await this.courseRepository.findOneBy({ id });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findByProfessorId(id: string) {
    try {
      return await this.courseRepository.findBy({
        professor: { id },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @UseInterceptors(CreateUpdateInterceptor)
  async update(id: string, courseDto: UpdateCourseDto) {
    try {
      return this.courseRepository.update(id, courseDto);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
