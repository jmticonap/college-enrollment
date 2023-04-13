import { Test, TestingModule } from '@nestjs/testing';
import { EnrollCourseController } from './enroll-course.controller';
import { EnrollCourseService } from './enroll-course.service';

describe('EnrollCourseController', () => {
  let controller: EnrollCourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnrollCourseController],
      providers: [EnrollCourseService],
    }).compile();

    controller = module.get<EnrollCourseController>(EnrollCourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
