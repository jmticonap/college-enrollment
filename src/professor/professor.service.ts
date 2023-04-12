import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfessorEntity } from 'src/entities/professor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfessorService {
  constructor(
    @InjectRepository(ProfessorEntity)
    private professorRepository: Repository<ProfessorEntity>,
  ) {}
}
