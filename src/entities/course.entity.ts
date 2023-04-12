import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ProfessorEntity } from './professor.entity';
import { EnrollCourseEntity } from './enrollcourse.entity';
import { EnrollmentEntity } from './enrollment.entity';

@Entity('course')
export class CourseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  fullname: string;

  @Column({ unique: true })
  abbreviation: string;

  @Column({ nullable: false })
  credits: number;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => ProfessorEntity, (professor) => professor.courses)
  professor: ProfessorEntity;

  @ManyToMany(() => EnrollmentEntity, (enrollment) => enrollment.courses)
  @JoinTable({ name: 'enroll_course' })
  enrollments: EnrollmentEntity[];

  @OneToMany(() => EnrollCourseEntity, (enrollcourse) => enrollcourse.course)
  enrollcourses: EnrollCourseEntity[];
}
