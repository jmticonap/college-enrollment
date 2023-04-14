import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CourseEntity } from '../entities/course.entity';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  find(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<CourseEntity>> {
    limit = limit > 100 ? 100 : limit;
    return this.courseService.findPaged({
      page,
      limit,
      route: 'http://localhost:3000/course',
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.courseService.findById(id);
    } catch (error) {
      return error;
    }
  }

  @Get('/by_professor/:id')
  findByProfessorId(@Param('id') id: string) {
    try {
      return this.courseService.findByProfessorId(id);
    } catch (error) {
      return error;
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() courseDto: UpdateCourseDto) {
    return this.courseService.update(id, courseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
