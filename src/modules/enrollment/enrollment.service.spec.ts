import { Repository } from 'typeorm';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { EnrollmentEntity } from '../../entities/enrollment.entity';
import { StudentService } from '../student/student.service';
import { StudentEntity } from '../../entities/student.entity';
import { MetadataService } from '../metadata/metadata.service';
import { MetadataEntity } from '../../entities/metadata.entity';
import { mockerRepository } from '../../helper';
import { RemoteService } from '../remote/remote.service';

describe('EnrollmentService', () => {
  let service: EnrollmentService;
  let repo: Repository<EnrollmentEntity>;
  let studentService: StudentService;
  let studentRepo: Repository<StudentEntity>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        EnrollmentService,
        mockerRepository(EnrollmentEntity),
        StudentService,
        mockerRepository(StudentEntity),
        MetadataService,
        mockerRepository(MetadataEntity),
        RemoteService,
      ],
    }).compile();

    repo = module.get<Repository<EnrollmentEntity>>(
      getRepositoryToken(EnrollmentEntity),
    );
    studentRepo = module.get<Repository<StudentEntity>>(
      getRepositoryToken(StudentEntity),
    );
    studentService = module.get<StudentService>(StudentService);
    service = module.get<EnrollmentService>(EnrollmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repo).toBeDefined();
    expect(studentService).toBeDefined();
    expect(studentRepo).toBeDefined();
  });

  it('create sould fail', async () => {
    const enrollmentDto: CreateEnrollmentDto = {
      studentId: '99d4474e-be2e-4dc3-a1b3-d0eec8451dea',
      program: '',
      lstCourse: [],
      description: '',
    };
    const expectResult = new NotFoundException('Student not found');
    jest.spyOn(studentService, 'findById').mockResolvedValue(null);
    try {
      await service.create(enrollmentDto);
    } catch (error) {
      expect(error).toStrictEqual(expectResult);
    }
  });
});
