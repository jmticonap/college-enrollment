import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfessorEntity } from 'src/entities/professor.entity';
import { Repository } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class ProfessorService {
  constructor(
    @InjectRepository(ProfessorEntity)
    private professorRepository: Repository<ProfessorEntity>,
  ) {}

  async save(entity: ProfessorEntity) {
    return await this.professorRepository.save(entity);
  }

  async findPaged(
    options: IPaginationOptions,
  ): Promise<Pagination<ProfessorEntity>> {
    return paginate<ProfessorEntity>(this.professorRepository, options);
  }
}
