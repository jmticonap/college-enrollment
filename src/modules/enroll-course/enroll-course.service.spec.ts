import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeepMocked } from '@golevelup/ts-jest';
import { EnrollCourseService } from './enroll-course.service';
import { CreateEnrollCourseDto } from './dto/create-enroll-course.dto';
import { mockerRepositoryGolevelup } from '../../helper';
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
import { CreateCourseDto } from '../course/dto/create-course.dto';
import { RemoteService } from '../remote/remote.service';
import { CourseState } from '../../entities/enrollcourse.entity';

describe('EnrollCourseService', () => {
  let module: TestingModule;
  let service: EnrollCourseService;
  let repo: DeepMocked<Repository<EnrollCourseEntity>>;
  let courseService: CourseService;
  let enrollmentService: EnrollmentService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        EnrollCourseService,
        mockerRepositoryGolevelup<EnrollCourseEntity>(EnrollCourseEntity),
        CourseService,
        mockerRepositoryGolevelup<CourseEntity>(CourseEntity),
        ProfessorService,
        mockerRepositoryGolevelup<ProfessorEntity>(ProfessorEntity),
        EnrollmentService,
        mockerRepositoryGolevelup<EnrollmentEntity>(EnrollmentEntity),
        StudentService,
        mockerRepositoryGolevelup<StudentEntity>(StudentEntity),
        MetadataService,
        mockerRepositoryGolevelup<MetadataEntity>(MetadataEntity),
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

  it('should create and return', async () => {
    const newCourse: CourseEntity = await courseService.create({
      professorId: 'd5528d8a-b567-444f-b623-8b63ff7525b0',
      abbreviation: 'EF',
      fullname: 'Educación física',
      credits: 2,
      description: 'Deportes',
    } as CreateCourseDto);

    const createEnrollCourseDto = {
      courseId: newCourse.id,
      enrollmentId: '1fdc8477-0f85-4301-a307-cb9c4b6e1b35',
    } as CreateEnrollCourseDto;
    const result = {
      id: '',
      course: newCourse,
      enrollment: {} as EnrollmentEntity,
      state: CourseState.TAKED as unknown,
    } as EnrollCourseEntity;

    const spyCreate = jest.spyOn(service, 'create').mockResolvedValue(result);
    const newEnrollCourse: EnrollCourseEntity = await service.create(
      createEnrollCourseDto,
    );

    expect(spyCreate).toBeCalledTimes(1);
    expect(spyCreate).toHaveBeenCalledWith(createEnrollCourseDto);
    expect(newEnrollCourse).toEqual(result);
  });
});
