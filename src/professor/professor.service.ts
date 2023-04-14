import { Injectable, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { ProfessorEntity } from '../entities/professor.entity';
import { CreateProfessorDto } from './dto/professor.dto';
import { CreateUpdateInterceptor } from '../logging/createUpdate.interceptor';
import { ErrorInterceptor } from '../logging/error.interceptor';

@UseInterceptors(ErrorInterceptor)
@Injectable()
export class ProfessorService {
  constructor(
    @InjectRepository(ProfessorEntity)
    private readonly professorRepository: Repository<ProfessorEntity>,
  ) {}

  @UseInterceptors(CreateUpdateInterceptor)
  async create(createProfessor: CreateProfessorDto) {
    const professor = new ProfessorEntity();
    professor.firstname = createProfessor.firstname;
    professor.lastname = createProfessor.lastname;
    professor.dni = createProfessor.dni;
    professor.phone = createProfessor.phone;
    professor.address = createProfessor.address;

    try {
      return await this.professorRepository.save(professor);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findPaged(
    options: IPaginationOptions,
  ): Promise<Pagination<ProfessorEntity>> {
    try {
      return paginate<ProfessorEntity>(this.professorRepository, options);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findById(id: string): Promise<ProfessorEntity> {
    try {
      return this.professorRepository.findOneBy({ id });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @UseInterceptors(CreateUpdateInterceptor)
  async update(
    id: string,
    professor: ProfessorEntity,
  ): Promise<ProfessorEntity> {
    try {
      await this.professorRepository.update(id, professor);
      return await this.professorRepository.findOneBy({ id });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(id: string) {
    return await this.professorRepository.delete(id);
  }
}
