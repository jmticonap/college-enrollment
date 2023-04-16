import { ProfessorService } from './professor.service';
import dataSource from '../db/dataSource';
import { ProfessorEntity } from '../entities/professor.entity';

describe('ProfessorService', () => {
  let service: ProfessorService;

  beforeEach(async () => {
    service = new ProfessorService(dataSource.getRepository(ProfessorEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
