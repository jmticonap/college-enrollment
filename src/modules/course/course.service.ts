import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseEntity } from '../../entities/course.entity';
import { ProfessorService } from '../professor/professor.service';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
    private readonly professorService: ProfessorService,
  ) {}

  async create(courseDto: CreateCourseDto) {
    const professor = await this.professorService.findById(
      courseDto.professorId,
    );
    if (!professor) throw new NotFoundException('Professor not found');

    return await this.courseRepository.save({ ...courseDto, professor });
  }

  findPaged(options: IPaginationOptions): Promise<Pagination<CourseEntity>> {
    return paginate<CourseEntity>(this.courseRepository, options);
  }

  async findById(id: string) {
    return await this.courseRepository.findOneBy({ id });
  }

  async findByProfessorId(id: string) {
    return await this.courseRepository.findBy({
      professor: { id },
    });
  }

  async update(id: string, courseDto: UpdateCourseDto) {
    return this.courseRepository.update(id, courseDto);
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
