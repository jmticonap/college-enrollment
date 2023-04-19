import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { EnrollCourseEntity } from './enrollcourse.entity';
import { CourseEntity } from './course.entity';
import { StudentEntity } from './student.entity';

@Entity('enrollment')
export class EnrollmentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  program: string; // Mathematics

  @Column({ nullable: false })
  description: string; //SEM-1-2023

  @ManyToOne(() => StudentEntity, (student) => student.enrollments, {
    // onDelete: 'CASCADE',
    eager: true,
  })
  student: StudentEntity;

  @ManyToMany(() => CourseEntity)
  /**
   * FIX
   * The db:init can not create schema with @JoinTable decorator
   * but after normal creation, turnming back decorator services
   * fetch successfully courses.
   */
  // @JoinTable({
  //   inverseJoinColumn: { name: 'courseId' },
  //   joinColumn: { name: 'enrollmentId' },
  //   name: 'enroll_course',
  // })
  courses: CourseEntity[];

  @OneToMany(
    () => EnrollCourseEntity,
    (enrollcourse) => enrollcourse.enrollment,
  )
  enrollcourses: EnrollCourseEntity[];
}
