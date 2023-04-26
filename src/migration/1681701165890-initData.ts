import { MigrationInterface, QueryRunner } from 'typeorm';
import { dbData } from '../db/initData';

export class InitData1681701165890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(dbData.professors);
    await queryRunner.query(dbData.students);
    await queryRunner.query(dbData.courses);
    await queryRunner.query(dbData.enrollments);
    await queryRunner.query(dbData.enrollCourses);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM public.enroll_course');
    await queryRunner.query('DELETE FROM public.enrollment');
    await queryRunner.query('DELETE FROM public.course');
    await queryRunner.query('DELETE FROM public.student');
    await queryRunner.query('DELETE FROM public.professor');
  }
}
