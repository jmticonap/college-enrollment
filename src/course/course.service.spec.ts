import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CourseEntity } from '../entities/course.entity';
import { CourseService } from './course.service';
import { ProfessorService } from '../professor/professor.service';
import { ProfessorEntity } from '../entities/professor.entity';
import { mockerRepository } from '../helper';

describe('CourseService', () => {
  let service: CourseService;
  let professorService: ProfessorService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
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
    service = module.get<CourseService>(CourseService);
  });

  it('should be defined: CourseService, ProfesorService', () => {
    expect(service).toBeDefined();
    expect(professorService).toBeDefined();
  });
});
