import { Injectable, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfessorEntity } from '../entities/professor.entity';
import { Repository } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { CreateProfessorDto } from './dto/professor.dto';

@Injectable()
export class ProfessorService {
  constructor(
    @InjectRepository(ProfessorEntity)
    private readonly professorRepository: Repository<ProfessorEntity>,
  ) {}

  @UseInterceptors(LoggingInterceptor)
  async create(createProfessor: CreateProfessorDto) {
    const professor = new ProfessorEntity();
    professor.firstname = createProfessor.firstname;
    professor.lastname = createProfessor.lastname;
    professor.dni = createProfessor.dni;
    professor.phone = createProfessor.phone;
    professor.address = createProfessor.address;

    return await this.professorRepository.save(professor);
  }

  async findPaged(
    options: IPaginationOptions,
  ): Promise<Pagination<ProfessorEntity>> {
    return paginate<ProfessorEntity>(this.professorRepository, options);
  }

  async findById(id: string): Promise<ProfessorEntity> {
    try {
      return this.professorRepository.findOneBy({ id });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @UseInterceptors(LoggingInterceptor)
  async update(
    id: string,
    professor: ProfessorEntity,
  ): Promise<ProfessorEntity> {
    await this.professorRepository.update(id, professor);
    return await this.professorRepository.findOneBy({ id });
  }

  async remove(id: string) {
    return await this.professorRepository.delete(id);
  }
}
