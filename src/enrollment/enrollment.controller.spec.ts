import dataSource from '../db/dataSource';
import { EnrollmentService } from './enrollment.service';
import { StudentService } from '../student/student.service';
import { StudentEntity } from '../entities/student.entity';
import { EnrollmentEntity } from '../entities/enrollment.entity';
import { EnrollmentController } from './enrollment.controller';

describe('EnrollmentService', () => {
  let service: EnrollmentService;
  let studentService: StudentService;
  let controller: EnrollmentController;

  beforeEach(async () => {
    studentService = new StudentService(
      dataSource.getRepository(StudentEntity),
    );
    service = new EnrollmentService(
      dataSource.getRepository(EnrollmentEntity),
      studentService,
    );
    controller = new EnrollmentController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('1 + 1', () => {
    expect(1 + 1).toBe(2);
  });
});
