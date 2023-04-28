import { Repository } from 'typeorm';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StudentService } from './student.service';
import { StudentEntity } from '../../entities/student.entity';
import { MetadataEntity } from '../../entities/metadata.entity';
import { MetadataService } from '../metadata/metadata.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { mockerRepository } from '../../helper';
import { RemoteService } from '../remote/remote.service';

describe('StudentService', () => {
  let service: StudentService;
  let repo: Repository<StudentEntity>;
  let remoteService: RemoteService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        StudentService,
        mockerRepository(StudentEntity),
        MetadataService,
        mockerRepository(MetadataEntity),
        RemoteService,
        {
          provide: RemoteService,
          useValue: {
            findByDni: jest.fn(),
          },
        },
      ],
    }).compile();

    repo = module.get<Repository<StudentEntity>>(
      getRepositoryToken(StudentEntity),
    );
    service = module.get<StudentService>(StudentService);
    remoteService = module.get<RemoteService>(RemoteService);
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
      .spyOn(remoteService, 'findByDni')
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
