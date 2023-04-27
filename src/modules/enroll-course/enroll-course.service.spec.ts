import { Repository } from 'typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { EnrollCourseService } from './enroll-course.service';
import { CreateEnrollCourseDto } from './dto/create-enroll-course.dto';
import { EnrollCourseModule } from './enroll-course.module';
import { mockerRepository, mockerRepositoryGolevelup } from '../../helper';
import { EnrollCourseEntity } from '../../entities/enrollcourse.entity';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { EnrollmentEntity } from '../../entities/enrollment.entity';
import { CourseService } from '../course/course.service';
import { CourseEntity } from '../../entities/course.entity';
import { ProfessorService } from '../professor/professor.service';
import { ProfessorEntity } from '../../entities/professor.entity';
import { StudentService } from '../student/student.service';
import { StudentEntity } from '../../entities/student.entity';
import { MetadataService } from '../metadata/metadata.service';
import { MetadataEntity } from '../../entities/metadata.entity';
import { ProfessorModule } from '../professor/professor.module';
import { StudentModule } from '../student/student.module';
import { CourseModule } from '../course/course.module';
import { MetadataModule } from '../metadata/metadata.module';
import { EnrollmentModule } from '../enrollment/enrollment.module';
import { CreateCourseDto } from '../course/dto/create-course.dto';
import ormConfigTest from '../../config/orm.config.test';
import { RemoteService } from '../remote/remote.service';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { AppDataSource } from 'src/db/data-source';

describe('EnrollCourseService', () => {
  let module: TestingModule;
  let service: EnrollCourseService;
  let repo: DeepMocked<Repository<EnrollCourseEntity>>;
  let courseService: CourseService;
  let enrollmentService: EnrollmentService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        CacheModule.register({
          isGlobal: true,
        }),
        ConfigModule.forRoot({
          envFilePath: `test.env`,
          isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
          useFactory: ormConfigTest,
        }),
        EnrollCourseModule,
        ProfessorModule,
        StudentModule,
        CourseModule,
        MetadataModule,
        EnrollmentModule,
      ],
      providers: [
        EnrollCourseService,
        mockerRepositoryGolevelup<EnrollCourseEntity>(EnrollCourseEntity),
        // mockerRepository(EnrollCourseEntity),
        CourseService,
        mockerRepositoryGolevelup<CourseEntity>(CourseEntity),
        // mockerRepository(CourseEntity),
        ProfessorService,
        mockerRepositoryGolevelup<ProfessorEntity>(ProfessorEntity),
        // mockerRepository(ProfessorEntity),
        EnrollmentService,
        mockerRepositoryGolevelup<EnrollmentEntity>(EnrollmentEntity),
        // mockerRepository(EnrollmentEntity),
        StudentService,
        mockerRepositoryGolevelup<StudentEntity>(StudentEntity),
        // mockerRepository(StudentEntity),
        MetadataService,
        mockerRepositoryGolevelup<MetadataEntity>(MetadataEntity),
        // mockerRepository(MetadataEntity),
        RemoteService,
      ],
    }).compile();

    service = module.get<EnrollCourseService>(EnrollCourseService);
    repo = module.get<DeepMocked<Repository<EnrollCourseEntity>>>(
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

  // it('should create and return', async () => {
  //   const newCourse: CourseEntity = await courseService.create({
  //     professorId: 'd5528d8a-b567-444f-b623-8b63ff7525b0',
  //     abbreviation: 'EF',
  //     fullname: 'Educación física',
  //     credits: 2,
  //     description: 'Deportes',
  //   } as CreateCourseDto);

  //   const createEnrollCourseDto = {
  //     courseId: newCourse.id,
  //     enrollmentId: '1fdc8477-0f85-4301-a307-cb9c4b6e1b35',
  //   } as CreateEnrollCourseDto;

  //   const spyCreate = jest.spyOn(service, 'create');
  //   const newEnrollCourse: EnrollCourseEntity = await service.create(
  //     createEnrollCourseDto,
  //   );

  //   expect(spyCreate).toBeCalledTimes(1);
  //   expect(spyCreate).toHaveBeenCalledWith(createEnrollCourseDto);
  //   expect(newEnrollCourse).toBeInstanceOf(EnrollCourseEntity);
  // });
});
