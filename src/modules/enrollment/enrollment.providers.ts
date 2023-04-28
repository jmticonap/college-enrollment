import { DataSource } from 'typeorm';
import { EnrollmentEntity } from '../../entities/enrollment.entity';

export const enrollmentProviders = [
  {
    provide: 'ENROLLMENT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(EnrollmentEntity),
    inject: ['DATA_SOURCE'],
  },
];
