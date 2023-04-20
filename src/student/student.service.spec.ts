import { Repository } from 'typeorm';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StudentService } from './student.service';
import { StudentEntity } from '../entities/student.entity';
import { MetadataService } from '../metadata/metadata.service';
import { MetadataEntity } from '../entities/metadata.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { mockerRepository } from '../helper';

describe('StudentService', () => {
  let service: StudentService;
  let repo: Repository<StudentEntity>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        StudentService,
        MetadataService,
        mockerRepository(StudentEntity),
        mockerRepository(MetadataEntity),
      ],
    }).compile();

    repo = module.get<Repository<StudentEntity>>(
      getRepositoryToken(StudentEntity),
    );
    service = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repo).toBeDefined();
  });

  it('should create a student and return it', async () => {
    const createDto: CreateStudentDto = {
      firstname: 'Matthew',
      lastname: 'Mitchell',
      dni: '94123481',
      phone: '416-555-4321,654',
      address: 'Twenty-Third St',
    };
    const expectedStudent = {
      firstname: 'Matthew',
      lastname: 'Mitchell',
      dni: '94123481',
      phone: '416-555-4321,654',
      address: 'Twenty-Third St',
      metadata: [],
    };

    const fetchRemoteStudentByDniSpy = jest
      .spyOn(service, 'fetchRemoteStudentByDni')
      .mockResolvedValue(expectedStudent);

    const createdStudent = await service.create(createDto);

    expect(fetchRemoteStudentByDniSpy).toHaveBeenCalledWith(createDto.dni);
    expect(repo.save).toHaveBeenCalledWith(createDto);
    expect(repo.save).toHaveBeenCalledWith({
      ...createDto,
      metadata: expect.any(Array),
    });
    expect(createdStudent).toEqual(expectedStudent);
  });
});
