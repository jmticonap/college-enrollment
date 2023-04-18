import { Injectable, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentEntity } from '../entities/student.entity';
import { CreateUpdateInterceptor } from '../logging/createUpdate.interceptor';
import { ErrorInterceptor } from '../logging/error.interceptor';
import { getDiference } from './helper';
import { MetadataService } from '../metadata/metadata.service';
import { MetadataEntity } from '../entities/metadata.entity';

@UseInterceptors(ErrorInterceptor)
@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
    private metadataService: MetadataService,
  ) {}

  @UseInterceptors(CreateUpdateInterceptor)
  async create(studentDto: CreateStudentDto) {
    const remoteStudent = await this.fetchRemoteStudentByDni(studentDto.dni);
    if (!remoteStudent)
      throw new Error(`Student with dni: ${studentDto.dni} does not exist`);

    await this.studentRepository.save(studentDto);
    studentDto['metadata'] = [];

    const metadata = getDiference(studentDto, remoteStudent);
    for (const key in metadata) {
      const meta = new MetadataEntity();
      meta.key = key;
      meta.value = metadata[key];
      await this.metadataService.create(meta);

      studentDto.metadata.push(meta);
    }
    await this.studentRepository.save(studentDto);

    return studentDto;
  }

  async findPaged(
    options: IPaginationOptions,
  ): Promise<Pagination<StudentEntity>> {
    return paginate<StudentEntity>(this.studentRepository, options);
  }

  async findById(id: string): Promise<StudentEntity> {
    return this.studentRepository.findOneBy({ id });
  }

  @UseInterceptors(CreateUpdateInterceptor)
  async update(id: string, studentDto: UpdateStudentDto) {
    return await this.studentRepository.update(id, studentDto);
  }

  async remove(id: string) {
    return await this.studentRepository.delete(id);
  }

  async fetchRemoteStudentByDni(dni: string) {
    const rowData = await fetch(`${process.env.API_VALIDATOR_PATH}?dni=${dni}`);
    const data = await rowData.json();

    return data.length > 0 ? data[0] : null;
  }
}
