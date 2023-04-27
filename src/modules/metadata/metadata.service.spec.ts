import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { MetadataService } from './metadata.service';
import { MetadataEntity } from '../../entities/metadata.entity';

describe('MetadataService', () => {
  let service: MetadataService;
  let repo: DeepMocked<Repository<MetadataEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MetadataService,
        {
          provide: getRepositoryToken(MetadataEntity),
          useValue: createMock<Repository<MetadataEntity>>(),
        },
      ],
    }).compile();

    service = module.get<MetadataService>(MetadataService);
    repo = module.get(getRepositoryToken(MetadataEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repo).toBeDefined();
  });

  it('It is a function', () => {
    expect(service.create).toBeInstanceOf(Function);
  });
});
