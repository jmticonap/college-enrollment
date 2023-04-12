import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { EnrollCourseEntity } from './enrollcourse.entity';
import { CourseEntity } from './course.entity';
import { StudentEntity } from './student.entity';

@Entity('enrollment')
export class EnrollmentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  fullname: string;

  @Column({ unique: true, nullable: false })
  abbreviation: string;

  @Column({ nullable: false })
  credits: number;

  @Column({ nullable: false })
  description: string;

  @ManyToOne(() => StudentEntity, (student) => student.enrollments, {
    onDelete: 'CASCADE',
  })
  student: StudentEntity;

  @ManyToMany(() => CourseEntity, (course) => course.enrollments, {
    onDelete: 'CASCADE',
  })
  courses: CourseEntity[];

  @OneToMany(
    () => EnrollCourseEntity,
    (enrollcourse) => enrollcourse.enrollment,
  )
  enrollcourses: EnrollCourseEntity[];
}
