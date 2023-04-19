import dataSource from '../db/dataSource';
import { EnrollmentService } from './enrollment.service';
import { StudentService } from '../student/student.service';
import { StudentEntity } from '../entities/student.entity';
import { EnrollmentEntity } from '../entities/enrollment.entity';
import { MetadataService } from '../metadata/metadata.service';
import { MetadataEntity } from '../entities/metadata.entity';

describe('EnrollmentService', () => {
  let service: EnrollmentService;
  let studentService: StudentService;

  beforeEach(async () => {
    const meta = new MetadataService(dataSource.getRepository(MetadataEntity));
    studentService = new StudentService(
      dataSource.getRepository(StudentEntity),
      meta,
    );
    service = new EnrollmentService(
      dataSource.getRepository(EnrollmentEntity),
      studentService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('1 + 1', () => {
    expect(1 + 1).toBe(2);
  });
});
