import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MetadataService } from './metadata.service';
import { MetadataEntity } from '../entities/metadata.entity';
import { Repository } from 'typeorm';
import { createMock, DeepMocked } from '@golevelup/ts-jest';

describe('MetadataService', () => {
  let service: MetadataService;
  let metadataRepo: DeepMocked<Repository<MetadataEntity>>;

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
    metadataRepo = module.get(getRepositoryToken(MetadataEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('It is a function', () => {
    expect(service.create).toBeInstanceOf(Function);
  });

  it('Null parameter throws error', async () => {
    expect(await service.create(null)).toThrowError(
      'The object can not be null',
    );
  });
});
