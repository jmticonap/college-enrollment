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
  CURRENT = 1,
  APPROVED = 2,
  DISAPPROVED = 3,
}

@Entity({ name: 'enroll_course' })
export class EnrollCourseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: CourseState, default: CourseState.CURRENT })
  state: CourseState;

  @Column()
  public courseEntityId: string;

  @Column()
  public enrollmentEntityId: string;

  @ManyToOne(() => CourseEntity, (course) => course.enrollcourses)
  @JoinColumn({ name: 'courseEntityId' })
  course: CourseEntity;

  @ManyToOne(() => EnrollmentEntity, (enrollment) => enrollment.enrollcourses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'enrollmentEntityId' })
  enrollment: EnrollmentEntity;
}
