import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CourseEntity } from './course.entity';
import { EnrollmentEntity } from './enrollment.entity';

export enum CourseState {
  TAKED = 1,
  APPROVED = 2,
  DISAPPROVED = 3,
}

@Entity({ name: 'enroll_course' })
export class EnrollCourseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: CourseState, default: null, nullable: true })
  state: CourseState;

  @Column({ update: false })
  courseEntityId: string;

  @Column({ update: false })
  enrollmentEntityId: string;

  @ManyToOne(() => CourseEntity, (course) => course.enrollcourses)
  @JoinColumn({ name: 'courseEntityId' })
  course: CourseEntity;

  @ManyToOne(() => EnrollmentEntity, (enrollment) => enrollment.enrollcourses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'enrollmentEntityId' })
  enrollment: EnrollmentEntity;
}
