import { Pagination } from 'nestjs-typeorm-paginate';
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
  UsePipes,
  ValidationPipe,
  UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseEntity } from '../../entities/course.entity';

@UseInterceptors(CacheInterceptor)
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() courseDto: CreateCourseDto) {
    return this.courseService.create(courseDto);
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
      route: process.env.API_VALIDATOR_PATH,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findById(id);
  }

  @Get('/by_professor/:id')
  findByProfessorId(@Param('id') id: string) {
    return this.courseService.findByProfessorId(id);
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  update(@Param('id') id: string, @Body() courseDto: UpdateCourseDto) {
    return this.courseService.update(id, courseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
