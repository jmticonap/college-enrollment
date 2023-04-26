import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import * as fs from 'node:fs';
import * as path from 'node:path';

let dataSource: DataSource;

const loadFixtures = async (sqlFileName: string) => {
  const sql = fs.readFileSync(
    path.join(__dirname, 'fixtures', sqlFileName),
    'utf8',
  );

  const queryRunner = dataSource.driver.createQueryRunner('master'); // connection.driver.createQueryRunner('master');

  for (const c of sql.split(';')) {
    await queryRunner.query(c);
  }
};

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    dataSource = app.get(getDataSourceToken());
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/professor (GET)', async () => {
    const res = request(app.getHttpServer())
      .get('/professor')
      .expect(200)
      .expect('Content-Type', /json/);

    return res;
  });

  it('/student (GET) empty db', async () => {
    const res = await request(app.getHttpServer())
      .get('/student')
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body.items.length).toBe(0);
    return res;
  });

  it('/student (GET) populate db', async () => {
    await loadFixtures('init-data.sql');

    const res = await request(app.getHttpServer())
      .get('/student')
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body.items.length).toBeGreaterThan(0);
    return res;
  });
});
