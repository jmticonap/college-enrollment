import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import dataSource from '../db/dataSource';
import { StudentEntity } from '../entities/student.entity';
import { MetadataService } from '../metadata/metadata.service';
import { MetadataEntity } from '../entities/metadata.entity';

describe('StudentController', () => {
  let service: StudentService;
  let controller: StudentController;

  beforeEach(async () => {
    const meta = new MetadataService(dataSource.getRepository(MetadataEntity));
    service = new StudentService(dataSource.getRepository(StudentEntity), meta);
    controller = new StudentController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('1 + 1', () => {
    expect(1 + 1).toBe(2);
  });
});
