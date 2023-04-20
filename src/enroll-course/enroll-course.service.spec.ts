import { Repository } from 'typeorm';
import { Test } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EnrollCourseService } from './enroll-course.service';
import { EnrollCourseEntity } from '../entities/enrollcourse.entity';
import { CourseService } from '../course/course.service';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { CourseEntity } from '../entities/course.entity';
import { EnrollmentEntity } from '../entities/enrollment.entity';
import { mockerRepository } from '../helper';
import { ProfessorService } from '../professor/professor.service';
import { StudentService } from '../student/student.service';
import { ProfessorEntity } from '../entities/professor.entity';
import { StudentEntity } from '../entities/student.entity';
import { MetadataService } from '../metadata/metadata.service';
import { MetadataEntity } from '../entities/metadata.entity';
import ormConfigDev from '../config/orm.config.dev';
import ormConfigProd from '../config/orm.config.prod';

describe('EnrollCourseService', () => {
  let service: EnrollCourseService;
  let repo: Repository<EnrollCourseEntity>;
  let courseService: CourseService;
  let enrollmentService: EnrollmentService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: `${process.env.NODE_ENV}.env`,
          isGlobal: true,
          load: [ormConfigDev],
        }),
        TypeOrmModule.forRootAsync({
          useFactory:
            process.env.NODE_ENV === 'prod' ? ormConfigProd : ormConfigDev,
        }),
      ],
      providers: [
        EnrollCourseService,
        mockerRepository(EnrollCourseEntity),
        CourseService,
        mockerRepository(CourseEntity),
        ProfessorService,
        mockerRepository(ProfessorEntity),
        EnrollmentService,
        mockerRepository(EnrollmentEntity),
        StudentService,
        mockerRepository(StudentEntity),
        MetadataService,
        mockerRepository(MetadataEntity),
      ],
    }).compile();

    service = module.get<EnrollCourseService>(EnrollCourseService);
    repo = module.get<Repository<EnrollCourseEntity>>(
      getRepositoryToken(EnrollCourseEntity),
    );
    courseService = module.get<CourseService>(CourseService);
    enrollmentService = module.get<EnrollmentService>(EnrollCourseService);
  });

  it('should be define', () => {
    expect(service).toBeDefined();
    expect(repo).toBeDefined();
    expect(courseService).toBeDefined();
    expect(enrollmentService).toBeDefined();
  });

  it('should return page', async () => {
    
  });
});
