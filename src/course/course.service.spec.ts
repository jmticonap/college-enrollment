import { CourseEntity } from '../entities/course.entity';
import dataSource from '../db/data-source';
import { CourseService } from './course.service';
import { ProfessorService } from '../professor/professor.service';
import { ProfessorEntity } from '../entities/professor.entity';

describe('CourseService', () => {
  let service: CourseService;
  let professorService: ProfessorService;

  beforeEach(async () => {
    professorService = new ProfessorService(
      dataSource.getRepository(ProfessorEntity),
    );
    service = new CourseService(
      dataSource.getRepository(CourseEntity),
      professorService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('1 + 1', () => {
    expect(1 + 1).toBe(2);
  });
});
