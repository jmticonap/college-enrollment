import { ProfessorController } from './professor.controller';
import { ProfessorService } from './professor.service';
import { ProfessorEntity } from '../entities/professor.entity';
import dataSource from '../db/dataSource';

describe('ProfessorController', () => {
  let service: ProfessorService;
  let controller: ProfessorController;

  beforeEach(async () => {
    service = new ProfessorService(dataSource.getRepository(ProfessorEntity));
    controller = new ProfessorController(service);
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });
});
