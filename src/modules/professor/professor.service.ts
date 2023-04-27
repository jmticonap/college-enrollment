import { Injectable, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { ProfessorEntity } from '../../entities/professor.entity';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { CreateUpdateInterceptor } from '../../interceptors/createUpdate.interceptor';
import { ErrorInterceptor } from '../../interceptors/error.interceptor';
import { UpdateProfessorDto } from './dto/update-professor.dto';

@UseInterceptors(ErrorInterceptor)
@Injectable()
export class ProfessorService {
  constructor(
    @InjectRepository(ProfessorEntity)
    private readonly professorRepository: Repository<ProfessorEntity>,
  ) {}

  @UseInterceptors(CreateUpdateInterceptor)
  async create(createProfessor: CreateProfessorDto) {
    return await this.professorRepository.save(createProfessor);
  }

  async findPaged(
    options: IPaginationOptions,
  ): Promise<Pagination<ProfessorEntity>> {
    return paginate<ProfessorEntity>(this.professorRepository, options);
  }

  async findById(id: string): Promise<ProfessorEntity> {
    return this.professorRepository.findOneBy({ id });
  }

  @UseInterceptors(CreateUpdateInterceptor)
  async update(id: string, professorDto: UpdateProfessorDto) {
    return await this.professorRepository.update(id, professorDto);
  }

  async remove(id: string) {
    return await this.professorRepository.delete(id);
  }
}
