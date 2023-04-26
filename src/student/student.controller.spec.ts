import { Repository } from 'typeorm';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { createMock } from '@golevelup/ts-jest';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentEntity } from '../entities/student.entity';
import { MetadataService } from '../metadata/metadata.service';
import { MetadataEntity } from '../entities/metadata.entity';

describe('StudentController', () => {
  let service: StudentService;
  let controller: StudentController;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [CacheModule.register()],
      controllers: [StudentController],
      providers: [
        StudentService,
        MetadataService,
        {
          provide: getRepositoryToken(StudentEntity),
          useValue: createMock<Repository<StudentEntity>>,
        },
        {
          provide: getRepositoryToken(MetadataEntity),
          useValue: createMock<Repository<MetadataEntity>>,
        },
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
    controller = module.get<StudentController>(StudentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
