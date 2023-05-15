import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { EnrollmentEntity } from './enrollment.entity';
import { MetadataEntity } from './metadata.entity';

@Entity('student')
export class StudentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;
}
