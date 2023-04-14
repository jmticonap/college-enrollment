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
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentEntity } from '../entities/student.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    try {
      return this.studentService.create(createStudentDto);
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
      return this.studentService.findPaged({
        page,
        limit,
        route: 'http://localhost:3000/student',
      });
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.studentService.findById(id);
    } catch (error) {
      return error;
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() studentDto: UpdateStudentDto) {
    try {
      return this.studentService.update(id, studentDto);
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
