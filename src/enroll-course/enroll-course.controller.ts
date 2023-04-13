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
import { EnrollCourseService } from './enroll-course.service';
import { CreateEnrollCourseDto } from './dto/create-enroll-course.dto';
import { UpdateEnrollCourseDto } from './dto/update-enroll-course.dto';

@Controller('enroll-course')
export class EnrollCourseController {
  constructor(private readonly enrollCourseService: EnrollCourseService) {}

  @Post()
  async create(@Body() enrollCourseDto: CreateEnrollCourseDto) {
    try {
      return await this.enrollCourseService.create(enrollCourseDto);
    } catch (error) {
      return error;
    }
  }

  @Get()
  find(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    limit = limit > 100 ? 100 : limit;
    try {
      return this.enrollCourseService.findPaged({
        page,
        limit,
        route: 'http://localhost:3000/enroll-course',
      });
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.enrollCourseService.findById(id);
    } catch (error) {
      return error;
    }
  }

  @Get('/by_enrollment/:id')
  async findByEnrollmentId(@Param('id') id: string) {
    try {
      return await this.enrollCourseService.findByEnrollmentId(id);
    } catch (error) {
      return error;
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() enrollCourseDto: UpdateEnrollCourseDto,
  ) {
    try {
      return this.enrollCourseService.update(+id, enrollCourseDto);
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enrollCourseService.remove(+id);
  }
}
