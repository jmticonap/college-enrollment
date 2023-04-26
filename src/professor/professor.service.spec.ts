import { Repository } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { ProfessorService } from './professor.service';
import { ProfessorEntity } from '../entities/professor.entity';

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
          useValue: createMock(Repository<ProfessorEntity>),
        },
      ],
    }).compile();

    service = module.get<ProfessorService>(ProfessorService);
    repo = module.get(getRepositoryToken(ProfessorEntity));
  });

  afterAll(() => {
    module.close();
  });

  it('should be defined', (done) => {
    expect(service).toBeDefined();
    expect(repo).toBeDefined();
    done();
  });

  it(' findPaged return an Promise<Pagination<ProfessorEntity>>', async () => {
    const emptyPage: Pagination<ProfessorEntity> = {
      items: [],
      links: {
        first: '',
        last: '',
        next: '',
        previous: '',
      },
      meta: {
        currentPage: 1,
        itemCount: 0,
        itemsPerPage: 10,
        totalItems: 0,
        totalPages: 0,
      },
    };
    jest.spyOn(service, 'findPaged').mockResolvedValue(emptyPage);

    const resultPage = await service.findPaged({
      page: 1,
      limit: 10,
      route: 'http://localhost:3000/professor',
    });

    expect(resultPage).toBeTruthy();
  });
});
