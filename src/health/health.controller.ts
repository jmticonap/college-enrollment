import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  baseUri = `http://${process.env.APP_HOST}:${process.env.APP_PORT}`;

  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly db: TypeOrmHealthIndicator,
  ) {}

  @Get('db')
  @HealthCheck()
  checkDb() {
    return this.health.check([() => this.db.pingCheck('database')]);
  }

  @Get('professor')
  @HealthCheck()
  checkProfessor() {
    return this.health.check([
      () =>
        this.http.pingCheck('ProfessorController', `${this.baseUri}/professor`),
    ]);
  }

  @Get('student')
  @HealthCheck()
  checkStudent() {
    return this.health.check([
      () => this.http.pingCheck('StudentController', `${this.baseUri}/student`),
    ]);
  }

  @Get('enrollment')
  @HealthCheck()
  checkEnrollment() {
    return this.health.check([
      () =>
        this.http.pingCheck(
          'EnrollmentController',
          `${this.baseUri}/enrollment`,
        ),
    ]);
  }

  @Get('course')
  @HealthCheck()
  checkCourse() {
    return this.health.check([
      () => this.http.pingCheck('CourseController', `${this.baseUri}/course`),
    ]);
  }

  @Get('enroll-course')
  @HealthCheck()
  checkEnrollCourse() {
    return this.health.check([
      () =>
        this.http.pingCheck(
          'EnrollCourseController',
          `${this.baseUri}/enroll-course`,
        ),
    ]);
  }
}
