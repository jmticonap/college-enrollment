import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { EnrollmentEntity } from './enrollment.entity';

@Entity('student')
export class StudentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  firstname: string;

  @Column({ nullable: false })
  lastname: string;

  @Column({ unique: true, nullable: false })
  dni: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @OneToMany(() => EnrollmentEntity, (enrollment) => enrollment.student)
  enrollments: Promise<EnrollmentEntity[]>;
}
