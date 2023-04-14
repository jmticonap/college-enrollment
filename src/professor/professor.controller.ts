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
} from '@nestjs/common';
import { CreateProfessorDto } from './dto/professor.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ProfessorEntity } from '../entities/professor.entity';
import { ProfessorService } from './professor.service';

@Controller('professor')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Get()
  find(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<ProfessorEntity>> {
    limit = limit > 100 ? 100 : limit;
    try {
      return this.professorService.findPaged({
        page,
        limit,
        route: 'http://localhost:3000/professor',
      });
    } catch (error) {
      return error;
    }
  }

  @Post()
  save(@Body() createProfessor: CreateProfessorDto): object {
    try {
      return this.professorService.create(createProfessor);
    } catch (error) {
      return error;
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() professor: ProfessorEntity,
  ): Promise<ProfessorEntity> {
    try {
      return this.professorService.update(id, professor);
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  delete(@Param('id') id: number): string {
    return `Professor: ${id} (deleted)`;
  }
}
