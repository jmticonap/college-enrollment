import { Test, TestingModule } from '@nestjs/testing';
import { EnrollCourseService } from './enroll-course.service';

describe('EnrollCourseService', () => {
  let service: EnrollCourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnrollCourseService],
    }).compile();

    service = module.get<EnrollCourseService>(EnrollCourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
