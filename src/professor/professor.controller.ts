import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CreateProfessorDto } from './dto/professor.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ProfessorEntity } from 'src/entities/professor.entity';
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
    return this.professorService.findPaged({
      page,
      limit,
      route: 'http://localhost:3000/professor',
    });
  }

  @Post()
  save(@Body() createProfessor: CreateProfessorDto): object {
    const professor = new ProfessorEntity();
    professor.firstname = createProfessor.fisrtname;
    professor.lastname = createProfessor.lastname;
    professor.dni = createProfessor.dni;
    professor.phone = createProfessor.phone;
    professor.address = createProfessor.address;

    return this.professorService.save(professor);
  }

  @Put()
  update(): string {
    return `Professor updated`;
  }

  @Delete(':id')
  delete(@Param('id') id: number): string {
    return `Professor: ${id} (deleted)`;
  }
}
