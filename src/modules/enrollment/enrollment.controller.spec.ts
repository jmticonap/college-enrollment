import { AppDataSource } from '../../db/data-source';
import { EnrollmentService } from './enrollment.service';
import { StudentService } from '../student/student.service';
import { StudentEntity } from '../../entities/student.entity';
import { EnrollmentEntity } from '../../entities/enrollment.entity';
import { EnrollmentController } from './enrollment.controller';
import { MetadataService } from '../metadata/metadata.service';
import { MetadataEntity } from '../../entities/metadata.entity';
import { RemoteService } from '../remote/remote.service';

describe('EnrollmentService', () => {
  let service: EnrollmentService;
  let studentService: StudentService;
  let controller: EnrollmentController;
  let remoteService: RemoteService;

  beforeEach(async () => {
    const meta = new MetadataService(
      AppDataSource.getRepository(MetadataEntity),
    );
    studentService = new StudentService(
      AppDataSource.getRepository(StudentEntity),
      meta,
      remoteService,
    );
    service = new EnrollmentService(
      AppDataSource.getRepository(EnrollmentEntity),
      studentService,
    );
    controller = new EnrollmentController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
