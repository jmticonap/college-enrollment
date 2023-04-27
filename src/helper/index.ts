import { createMock } from '@golevelup/ts-jest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { Repository } from 'typeorm';
import { AppDataSource } from '../db/data-source';

export const mockerRepository = (entity: EntityClassOrSchema) => ({
  provide: getRepositoryToken(entity),
  useValue: {
    save: jest.fn(),
    createQueryBuilder: jest.fn(),
    delete: jest.fn(),
    where: jest.fn(),
    execute: jest.fn(),
  },
});

export function mockerRepositoryGolevelup<E>(entity: EntityClassOrSchema) {
  return {
    provide: getRepositoryToken(entity, AppDataSource),
    useValue: createMock(Repository<E>),
  };
}
