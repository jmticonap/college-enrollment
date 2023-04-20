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
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { ErrorInterceptor } from '../logging/error.interceptor';
import { CacheInterceptor } from '@nestjs/cache-manager';

@UseInterceptors(CacheInterceptor)
@UseInterceptors(ErrorInterceptor)
@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    return await this.enrollmentService.create(createEnrollmentDto);
  }

  @Get()
  async find(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    limit = limit > 100 ? 100 : limit;
    return await this.enrollmentService.findPaged({
      page,
      limit,
      route: 'http://localhost:3000/enrollment',
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.enrollmentService.findById(id);
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() enrollmentDto: UpdateEnrollmentDto,
  ) {
    return await this.enrollmentService.update(id, enrollmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enrollmentService.remove(+id);
  }
}
