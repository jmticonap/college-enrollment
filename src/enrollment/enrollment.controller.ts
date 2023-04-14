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
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';

@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  async create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    try {
      return await this.enrollmentService.create(createEnrollmentDto);
    } catch (error) {
      return error;
    }
  }

  @Get()
  async find(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    limit = limit > 100 ? 100 : limit;
    try {
      return await this.enrollmentService.findPaged({
        page,
        limit,
        route: 'http://localhost:3000/enrollment',
      });
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.enrollmentService.findById(id);
    } catch (error) {
      return error;
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() enrollmentDto: UpdateEnrollmentDto,
  ) {
    try {
      return await this.enrollmentService.update(id, enrollmentDto);
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enrollmentService.remove(+id);
  }
}
