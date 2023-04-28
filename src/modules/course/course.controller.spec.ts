import { Repository } from 'typeorm';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CourseEntity } from '../../entities/course.entity';
import { ProfessorEntity } from '../../entities/professor.entity';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { ProfessorService } from '../professor/professor.service';
import { mockerRepository } from '../../helper';
import { CacheModule } from '@nestjs/cache-manager';

describe('CourseService', () => {
  let service: CourseService;
  let repo: Repository<CourseEntity>;
  let professorService: ProfessorService;
  let controller: CourseController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CacheModule.register()],
      controllers: [CourseController],
      providers: [
        CourseService,
        ProfessorService,
        {
          provide: getRepositoryToken(CourseEntity),
          useValue: mockerRepository(CourseEntity),
        },
        {
          provide: getRepositoryToken(ProfessorEntity),
          useValue: mockerRepository(ProfessorEntity),
        },
      ],
    }).compile();
    professorService = module.get<ProfessorService>(ProfessorService);
    repo = module.get(getRepositoryToken(CourseEntity));
    service = module.get<CourseService>(CourseService);
    controller = module.get<CourseController>(CourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(repo).toBeDefined();
    expect(professorService).toBeDefined();
  });
});
