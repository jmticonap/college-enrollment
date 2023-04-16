import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import dataSource from '../db/dataSource';
import { StudentEntity } from '../entities/student.entity';

describe('StudentController', () => {
  let service: StudentService;
  let controller: StudentController;

  beforeEach(async () => {
    service = new StudentService(dataSource.getRepository(StudentEntity));
    controller = new StudentController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('1 + 1', () => {
    expect(1 + 1).toBe(2);
  });
});
