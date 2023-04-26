import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CourseEntity } from './course.entity';

@Entity('professor')
export class ProfessorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  firstname: string;

  @Column({ nullable: false })
  lastname: string;

  @Column({ unique: true })
  dni: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @OneToMany(() => CourseEntity, (course) => course.professor)
  courses: Promise<CourseEntity[]>;
}
