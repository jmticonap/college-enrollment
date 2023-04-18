import { MigrationInterface, QueryRunner } from 'typeorm';
import { dbSchema } from '../initData';

export class InitSchema1681700865993 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(dbSchema.professor);
    await queryRunner.query(dbSchema.student);
    await queryRunner.query(dbSchema.course);
    await queryRunner.query(dbSchema.metadata);
    await queryRunner.query(dbSchema.enrollment);
    await queryRunner.query(dbSchema.enrollCourse);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE public.enroll_course;');
    await queryRunner.query('DROP TABLE public.enrollment;');
    await queryRunner.query('DROP TABLE public.course;');
    await queryRunner.query('DROP TABLE public.professor;');
    await queryRunner.query('DROP TABLE public.student;');
  }
}
