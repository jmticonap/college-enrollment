import { Injectable, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfessorEntity } from 'src/entities/professor.entity';
import { Repository } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { LoggingInterceptor } from 'src/logging/logging.interceptor';

@Injectable()
export class ProfessorService {
  private currentId = '';

  constructor(
    @InjectRepository(ProfessorEntity)
    private professorRepository: Repository<ProfessorEntity>,
  ) {}

  @UseInterceptors(LoggingInterceptor)
  async save(entity: ProfessorEntity) {
    return await this.professorRepository.save(entity);
  }

  async findPaged(
    options: IPaginationOptions,
  ): Promise<Pagination<ProfessorEntity>> {
    return paginate<ProfessorEntity>(this.professorRepository, options);
  }

  @UseInterceptors(LoggingInterceptor)
  async update(
    id: string,
    professor: ProfessorEntity,
  ): Promise<ProfessorEntity> {
    await this.professorRepository.update(id, professor);
    return await this.professorRepository.findOne({ where: { id } });
  }
}
