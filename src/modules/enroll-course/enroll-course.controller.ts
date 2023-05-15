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
} from '@nestjs/common';
import { EnrollCourseService } from './enroll-course.service';
import { CreateEnrollCourseDto } from './dto/create-enroll-course.dto';
import { UpdateEnrollCourseDto } from './dto/update-enroll-course.dto';

@Controller('enroll-course')
export class EnrollCourseController {
  constructor(private readonly enrollCourseService: EnrollCourseService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() enrollCourseDto: CreateEnrollCourseDto) {
    return await this.enrollCourseService.create(enrollCourseDto);
  }

  @Get()
  find(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    limit = limit > 100 ? 100 : limit;
    return this.enrollCourseService.findPaged({
      page,
      limit,
      route: 'http://localhost:3000/enroll-course', // TODO get host dinamically
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.enrollCourseService.findById(id);
  }

  @Get('/by_enrollment/:id')
  async findByEnrollmentId(@Param('id') id: string) {
    return await this.enrollCourseService.findByEnrollmentId(id);
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() enrollCourseDto: UpdateEnrollCourseDto,
  ) {
    return this.enrollCourseService.update(id, enrollCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enrollCourseService.remove(id);
  }
}
