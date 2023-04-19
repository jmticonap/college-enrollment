import { StudentService } from './student.service';
import dataSource from '../db/dataSource';
import { StudentEntity } from '../entities/student.entity';
import { MetadataService } from '../metadata/metadata.service';

describe('StudentService', () => {
  let service: StudentService;
  let metadataService: MetadataService;

  beforeEach(async () => {
    service = new StudentService(
      dataSource.getRepository(StudentEntity),
      metadataService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('1 + 1', () => {
    expect(1 + 1).toBe(2);
  });
});
