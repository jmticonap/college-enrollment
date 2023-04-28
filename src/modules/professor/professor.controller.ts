import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ProfessorEntity } from '../../entities/professor.entity';
import { ProfessorService } from './professor.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@UseInterceptors(CacheInterceptor)
@Controller('professor')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Get()
  find(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<ProfessorEntity>> {
    limit = limit > 100 ? 100 : limit;
    return this.professorService.findPaged({
      page,
      limit,
      route: 'http://localhost:3000/professor',
    });
  }

  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() createProfessor: CreateProfessorDto): object {
    return this.professorService.create(createProfessor);
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async update(@Param('id') id: string, @Body() professor: ProfessorEntity) {
    return this.professorService.update(id, professor);
  }

  @Delete(':id')
  delete(@Param('id') id: number): string {
    return `Professor: ${id} (deleted)`;
  }
}
