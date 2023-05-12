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
  Req,
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { getFullUrl } from 'src/helper';
import { Request } from 'express';

@UseInterceptors(CacheInterceptor)
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  find(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Req() req: Request,
  ) {
    limit = limit > 100 ? 100 : limit;
    return this.studentService.findPaged({
      page,
      limit,
      route: getFullUrl(req),
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findById(id);
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  update(@Param('id') id: string, @Body() studentDto: UpdateStudentDto) {
    return this.studentService.update(id, studentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
