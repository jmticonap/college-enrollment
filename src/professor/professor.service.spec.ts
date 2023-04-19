import { getRepositoryToken } from '@nestjs/typeorm';
import { ProfessorService } from './professor.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ProfessorEntity } from '../entities/professor.entity';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { Repository } from 'typeorm';

describe('ProfessorService', () => {
  let module: TestingModule;
  let service: ProfessorService;
  let repo: DeepMocked<Repository<ProfessorEntity>>;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        ProfessorService,
        {
          provide: getRepositoryToken(ProfessorEntity),
          useValue: repo,
        },
      ],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<ProfessorService>(ProfessorService);
    repo = module.get(getRepositoryToken(ProfessorEntity));
  });

  afterAll(() => {
    module.close();
  });

  it('should be defined', (done) => {
    expect(service).toBeDefined();
    done();
  });

  it(' findPaged return an Promise<Pagination<ProfessorEntity>>', async (done) => {
    repo.findAndCount.mockResolvedValue([[], 0]);
    repo.find.mockResolvedValue([]);

    const resultPage = await service.findPaged({
      page: 1,
      limit: 10,
      route: 'http://localhost:3000/professor',
    });

    expect(resultPage).toBeTruthy();

    done();
  });
});
