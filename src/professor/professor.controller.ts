import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CreateProfessorDto } from './dto/professor.dto';

@Controller('professor')
export class ProfessorController {
  @Get()
  findAll(): object {
    return { message: `All professors` };
  }

  @Post()
  save(@Body() createProfessor: CreateProfessorDto): object {
    return {
      id: String(Math.floor(Math.random() * 100000000)),
      ...createProfessor,
    };
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
