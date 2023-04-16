import { StudentService } from './student.service';
import dataSource from '../db/dataSource';
import { StudentEntity } from '../entities/student.entity';

describe('StudentService', () => {
  let service: StudentService;

  beforeEach(async () => {
    service = new StudentService(dataSource.getRepository(StudentEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('1 + 1', () => {
    expect(1 + 1).toBe(2);
  });
});
