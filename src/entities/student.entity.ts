import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { EnrollmentEntity } from './enrollment.entity';
import { MetadataEntity } from './metadata.entity';

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

  @OneToMany(() => MetadataEntity, (meta) => meta.student, { eager: true })
  metadata: MetadataEntity[];

  @OneToMany(() => EnrollmentEntity, (enrollment) => enrollment.student)
  enrollments: EnrollmentEntity[];
}
