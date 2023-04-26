import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ProfessorEntity } from './professor.entity';
import { EnrollCourseEntity } from './enrollcourse.entity';

@Entity('course')
export class CourseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  fullname: string;

  @Column({ nullable: false, unique: true })
  abbreviation: string;

  @Column({ nullable: false, update: false })
  credits: number;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => ProfessorEntity, (professor) => professor.courses)
  professor: ProfessorEntity;

  @OneToMany(() => EnrollCourseEntity, (enrollcourse) => enrollcourse.course)
  enrollcourses: EnrollCourseEntity[];
}
