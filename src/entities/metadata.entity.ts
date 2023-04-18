import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StudentEntity } from './student.entity';

@Entity('metadata')
export class MetadataEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ update: false })
  key: string;

  @Column({ update: false })
  value: string;

  @ManyToOne(() => StudentEntity, (student) => student.metadata)
  student: StudentEntity;
}
