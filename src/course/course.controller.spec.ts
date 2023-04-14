import { CourseEntity } from '../entities/course.entity';
import dataSource from '../db/data-source';
import { CourseService } from './course.service';
import { ProfessorService } from '../professor/professor.service';
import { ProfessorEntity } from '../entities/professor.entity';
import { CourseController } from './course.controller';

describe('CourseService', () => {
  let service: CourseService;
  let professorService: ProfessorService;
  let controller: CourseController;

  beforeEach(async () => {
    professorService = new ProfessorService(
      dataSource.getRepository(ProfessorEntity),
    );
    service = new CourseService(
      dataSource.getRepository(CourseEntity),
      professorService,
    );
    controller = new CourseController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('1 + 1', () => {
    expect(1 + 1).toBe(2);
  });
});
