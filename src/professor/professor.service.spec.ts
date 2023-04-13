import { Test, TestingModule } from '@nestjs/testing';
import { ProfessorService } from './professor.service';
import { ProfessorController } from './professor.controller';

describe('ProfessorService', () => {
  let service: ProfessorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfessorController],
      providers: [ProfessorService],
    }).compile();

    service = module.get<ProfessorService>(ProfessorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
